import { listBookVOByPageUsingPOST } from '@/services/lib-backend/bookController';
import { Button, Card, Divider, Form, Input, List, message, Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, { useEffect, useState } from 'react';
import { Link } from 'umi';

const BookShow: React.FC = () => {
  const { Meta } = Card;

  const initSearchParams = {
    current: 1,
    pageSize: 8,
    bookName: '',
    type: '',
    bookAuthor: '',
    sortField: 'createTime',
    sortOrder: 'desc',
  };
  const [searchParams, setSearchParams] = useState<API.BookQueryRequest>({ ...initSearchParams });
  const [bookList, setBookList] = useState<API.BookVO[]>();
  const [total, setTotal] = useState<number>(0);
  const [searchForm] = Form.useForm();
  const onFinish = async (values: any) => {
    setSearchParams({
      ...searchParams,
      bookName: values.bookName,
      type: values.type,
      bookAuthor: values.bookAuthor,
    });
  };
  const reset = () => {
    setSearchParams(initSearchParams);
  };
  const loadData = async () => {
    try {
      const res = await listBookVOByPageUsingPOST(searchParams);
      if (res.data) {
        setTotal(res.data.total ?? 0);
        setBookList(res.data.records ?? []);
      } else {
        message.error('获取图书数据失败');
      }
    } catch (e: any) {
      message.error('获取图书数据失败' + e.message);
    }
  };
  useEffect(() => {
    loadData();
  }, [searchParams]);
  return (
    <div>
      <Form layout="inline" form={searchForm} onFinish={onFinish}>
        <FormItem label="书名" name="bookName">
          <Input allowClear />
        </FormItem>
        <FormItem label="类型" name="type">
          <Input allowClear />
        </FormItem>
        <FormItem label="作者" name="bookAuthor">
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
        dataSource={bookList}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              bordered
              size="small"
              cover={<img alt="example" src={item.bookCover} />}
            >
              <Meta title={<Link to="#">{item.bookName}</Link>} description={item.bookAuthor} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default BookShow;
