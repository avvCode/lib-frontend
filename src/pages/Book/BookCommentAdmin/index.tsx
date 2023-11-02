import { deleteBookUsingPOST } from '@/services/lib-backend/bookController';
import { listCommentsVOByPageUsingPOST } from '@/services/lib-backend/commentController';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Image, message, Modal, Radio, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const BookCommentAdmin: React.FC = () => {
  const [commentsList, setCommentsList] = useState<API.Comments[]>();
  const [total, setTotal] = useState<number>(0);
  const initSearchParams = {
    current: 1,
    pageSize: 5,
    isChecked: 0,
    content: '',
    sortField: 'createTime',
    sortOrder: 'desc',
  };
  const [searchParams, setSearchParams] = useState<API.CommentsQueryRequest>({
    ...initSearchParams,
  });
  const { confirm } = Modal;

  const loadData = async () => {
    try {
      const res = await listCommentsVOByPageUsingPOST(searchParams);
      if (res.data) {
        setTotal(res.data.total ?? 0);
        setCommentsList(res.data.records ?? []);
      } else {
        message.error('获取评论数据失败');
      }
    } catch (e: any) {
      message.error('获取评论数据失败' + e.message);
    }
  };
  useEffect(() => {
    loadData();
  }, [searchParams]);

  const showConfirm = (value: API.DeleteRequest, access: boolean) => {
    if (access) {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: '确定通过该评论吗？',
        async onOk() {
          const res = await deleteBookUsingPOST(value);
          if (res.code === 0) {
            await loadData();
            message.success('已通过');
          } else {
            message.error('');
          }
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    } else {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: '确定不通过该评论吗？',
        async onOk() {
          const res = await deleteBookUsingPOST(value);
          if (res.code === 0) {
            await loadData();
            message.success('已不通过');
          } else {
            message.error('');
          }
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  };
  const getS = (isCheck: number) => {
    switch (isCheck) {
      case 0:
        return <Tag color="red">{'未审核'}</Tag>;
      case 1:
        return <Tag color="green">{'审核通过'}</Tag>;
      case 2:
        return <Tag color="blue">{'未通过'}</Tag>;
    }
  };
  const columns: ColumnsType<API.CommentsVO> = [
    {
      title: '书名',
      dataIndex: 'bookVO',
      key: 'bookVO',
      render: (bookVO) => <a>{bookVO.bookName}</a>,
    },
    {
      title: '评论人',
      dataIndex: 'userVO',
      key: 'userVO.username',
      render: (userVO) => <Tag color="green">{userVO.username}</Tag>,
    },
    {
      title: '头像',
      dataIndex: 'userVO',
      key: 'userVO.userAvatar',
      render: (userVO) => <Image width={100} src={userVO.userAvatar} />,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '审核人',
      dataIndex: 'checkUserVO',
      key: 'checkUserVO',
    },
    {
      title: '审核',
      dataIndex: 'isChecked',
      key: 'isChecked',
      render: (isChecked) => getS(isChecked),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle" key={record.id}>
          <Button onClick={() => showConfirm(record, true)}>通过</Button>
          <Button danger onClick={() => showConfirm(record, false)}>
            不通过
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          console.log(value);
          setSearchParams({ ...searchParams, isChecked: value });
        }}
        defaultValue={0}
      >
        <Radio value={0}>未审核</Radio>
        <Radio value={1}>审核通过</Radio>
        <Radio value={2}>审核不通过</Radio>
      </Radio.Group>

      <Divider />
      <Table
        style={{ marginTop: '10px' }}
        columns={columns}
        rowKey={(record) => `${record.id}`}
        dataSource={commentsList}
        bordered={true}
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize,
            });
          },
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
        }}
      />
    </div>
  );
};
export default BookCommentAdmin;
