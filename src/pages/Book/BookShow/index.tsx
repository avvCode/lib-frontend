import { borrowBookUsingPOST, getBookByIdUsingGET } from '@/services/lib-backend/bookController';
import {
  addCommentsUsingPOST,
  listCommentsVOByPageUsingPOST,
} from '@/services/lib-backend/commentController';
import { doLikeUsingPOST } from '@/services/lib-backend/likeRecordController';
import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import { ModalForm, ProCard, ProFormText } from '@ant-design/pro-components';
import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Image,
  List,
  message,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import TextArea from 'antd/es/input/TextArea';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const { Paragraph } = Typography;

interface DataType {
  bookVO?: API.BookVO;
  checkUserVO?: API.UserVO;
  content?: string;
  id?: number;
  isChecked?: number;
  userVO?: API.UserVO;
  likeNumber?: number;
  like?: boolean;
  loading?: boolean;
}

const BookShow: React.FC = () => {
  const params = useParams();
  const [book, setBook] = useState<API.BookVO>();
  const initSearchParams = {
    current: 1,
    pageSize: 3,
    content: '',
    sortField: 'createTime',
    sortOrder: 'ascend',
  };

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<DataType[]>([]);
  const [comment, setComment] = useState<string>('');
  const [count, setCount] = useState(0);
  const [data, setData] = useState<DataType[]>([]);
  const loadData = async () => {
    try {
      if (params.id) {
        const res = await getBookByIdUsingGET({ id: params.id });
        if (res.code === 0) {
          setBook(res.data);
          const res1 = await listCommentsVOByPageUsingPOST({
            bookId: res.data?.id,
            isChecked: 1,
            ...initSearchParams,
          });
          if (res1.code === 0) {
            setList(res1.data?.records ?? []);
            setData(res1.data?.records ?? []);
            setCount(res1.data?.total ?? 0);
            setInitLoading(false);
          } else {
            message.error('获取评论数据失败');
          }
        } else {
          message.error(res.message);
        }
      }
    } catch (e: any) {
      message.error('获取图书数据失败' + e.message);
    }
  };
  const [current, setCurrent] = useState(2);
  const sentComment = async () => {
    const res = await addCommentsUsingPOST({ bookId: params.id, content: comment });
    if (res.code === 0) {
      message.success('发表成功');
      setCurrent(2);
      loadData();
    } else {
      message.error('发表失败');
    }
  };
  useEffect(() => {
    setInitLoading(true);
    loadData();
  }, [params]);

  const onLoadMore = async () => {
    if (list.length <= count) {
      setLoading(true);
      const res = await listCommentsVOByPageUsingPOST({
        ...initSearchParams,
        bookId: book?.id,
        isChecked: 1,
        current: current,
      });
      setCurrent(current + 1);
      if (res.code === 0) {
        const newData = data.concat(res.data?.records ?? []);
        newData.map((item) => {
          return {
            ...item,
            loading: true,
          };
        });
        setList(newData);
        setData(newData);

        setLoading(false);
      } else {
        message.error('获取评论数据失败');
      }
      window.dispatchEvent(new Event('resize'));
    } else {
      message.warning('已经加载完毕');
    }
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
  const { RangePicker } = DatePicker;
  const [dates, setDates] = useState<RangeValue>(null);
  type RangeValue = [Dayjs | null, Dayjs | null] | null;
  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current <= dayjs().endOf('day');
  };
  const datePicker = (dateStrings: [string, string], values: RangeValue) => {
    setDates(values);
  };
  const [addForm] = Form.useForm<API.BookBorrowRecordAddRequest>();

  return (
    <div>
      <ProCard
        headerBordered
        bordered
        split="vertical"
        extra={
          <ModalForm<API.BookBorrowRequest>
            width="380px"
            title="申请借书"
            trigger={<Button type="primary">申请借书</Button>}
            form={addForm}
            autoFocusFirstInput
            modalProps={{
              destroyOnClose: true,
              onCancel: () => {
                console.log('cancel option');
              },
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
              console.log(values);
              console.log(dates);
              let borrowDays;
              if (dates) {
                borrowDays = moment(dates[1]).diff(dates[0], 'days');
              }
              const res = await borrowBookUsingPOST({
                borrowDays: borrowDays,
                ...values,
                bookId: params.id,
              });
              if (res.code === 0) {
                message.success('提交成功');
                return true;
              } else {
                message.error(res.message);
                return false;
              }
            }}
          >
            <ProFormText
              width="md"
              name="username"
              label="姓名"
              placeholder="请输入真实姓名"
              rules={[
                {
                  required: true,
                  message: '请输入姓名',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="idCard"
              label="身份证号"
              placeholder="请输入真实身份证号"
              rules={[
                {
                  required: true,
                  message: '请输入身份证',
                },
              ]}
            />
            <RangePicker disabledDate={disabledDate} onChange={datePicker} />
          </ModalForm>
        }
      >
        <Image src={book?.bookCover} />

        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <ProCard title="作者">{book?.bookAuthor}</ProCard>
              <ProCard title="上架时间">{moment(book?.createTime).format('YYYY-MM-DD')}</ProCard>
              <ProCard title="类型">{book?.type}</ProCard>
            </ProCard>
            <ProCard split="vertical" title="简介">
              <Typography style={{ marginLeft: '22px', marginTop: '10px' }}>
                <Paragraph>{book?.bookTra}</Paragraph>
              </Typography>
            </ProCard>
          </ProCard>
        </ProCard>
      </ProCard>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.userVO?.userAvatar} />}
                title={<a href="#">{item.userVO?.username}</a>}
                description={item.content}
              />
            </Skeleton>
            {item.like ? (
              <Button
                onClick={async () => {
                  const res = await doLikeUsingPOST({ commentId: item.id });
                  if (res.code === 0) {
                    await loadData();
                    message.success('取消成功');
                  } else {
                    message.error('取消失败');
                  }
                }}
              >
                <Space>
                  <LikeFilled />
                  {item.likeNumber ?? 0}
                </Space>
              </Button>
            ) : (
              <Button
                onClick={async () => {
                  const res = await doLikeUsingPOST({ commentId: item.id });
                  if (res.code === 0) {
                    await loadData();
                    message.success('点赞成功');
                  } else {
                    message.error('点赞失败', res.message);
                  }
                }}
              >
                <Space>
                  <LikeOutlined />
                  {item.likeNumber ?? 0}
                </Space>
              </Button>
            )}
          </List.Item>
        )}
      />

      <div style={{ marginTop: '100px' }}>
        <TextArea
          rows={4}
          placeholder="最长不超过200字"
          maxLength={200}
          allowClear
          showCount
          onChange={(e) => {
            const { value: inputValue } = e.target;
            setComment(inputValue);
          }}
        />
        <Button onClick={sentComment}>发表评论</Button>
      </div>
    </div>
  );
};

export default BookShow;
