import { listMeetingRoomVOByPageUsingPOST } from '@/services/lib-backend/meetingRoomController';
import { Link } from '@@/exports';
import { Button, Card, Divider, Form, Input, List, message, Space, Tag } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, { useEffect, useState } from 'react';

const MeetingRoomsShow: React.FC = () => {
  const { Meta } = Card;

  const initSearchParams = {
    current: 1,
    pageSize: 8,
    name: '',
    sortField: 'createTime',
    sortOrder: 'desc',
  };
  const [searchParams, setSearchParams] = useState<API.MeetingRoomQueryRequest>({
    ...initSearchParams,
  });
  const [meetingRoomList, setMeetingRoomList] = useState<API.MeetingRoomVO[]>();
  const [total, setTotal] = useState<number>(0);
  const [searchForm] = Form.useForm();
  const onFinish = async (values: any) => {
    setSearchParams({
      ...searchParams,
      name: values.name,
    });
  };
  const reset = () => {
    setSearchParams(initSearchParams);
  };
  const loadData = async () => {
    try {
      const res = await listMeetingRoomVOByPageUsingPOST(searchParams);
      if (res.data) {
        setTotal(res.data.total ?? 0);
        setMeetingRoomList(res.data.records ?? []);
      } else {
        message.error('获取会议室数据失败');
      }
    } catch (e: any) {
      message.error('获取会议室数据失败' + e.message);
    }
  };
  useEffect(() => {
    loadData();
  }, [searchParams]);
  return (
    <div>
      <Form layout="inline" form={searchForm} onFinish={onFinish}>
        <FormItem label="编号" name="name">
          <Input allowClear />
        </FormItem>
        <Form.Item>
          <Space size="large">
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button type="default" htmlType="reset" onClick={reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <Divider />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
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
          align: 'center',
        }}
        dataSource={meetingRoomList}
        renderItem={(item) => (
          <List.Item>
            <Card hoverable bordered size="small" cover={<img alt="example" src="/img.png" />}>
              <Link
                to={`/meetingRoom/show/${item.id}`}
                style={{ marginLeft: '9px', fontSize: '20px' }}
              >
                {item.name}
              </Link>
              <Meta
                title={
                  item.isEmpty ? <Tag color="red">已借用</Tag> : <Tag color="green">未借用</Tag>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default MeetingRoomsShow;
