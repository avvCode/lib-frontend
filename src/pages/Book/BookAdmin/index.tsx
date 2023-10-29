import {
  listUserByPageUsingPOST,
  updateUserUsingPOST,
} from '@/services/lib-backend/userController';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Card, Divider, Form, Input, message, Space, Table } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const BookAdmin: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 5,
    bookName: '',
    bookType: '',
    author: '',
    sortField: 'createTime',
    sortOrder: 'desc',
  };
  const [searchParams, setSearchParams] = useState<API.UserQueryRequest>({ ...initSearchParams });
  const [bookList, setBookList] = useState<API.User[]>();
  const [total, setTotal] = useState<number>(0);
  const [searchForm] = Form.useForm();
  const loadData = async () => {
    try {
      const res = await listUserByPageUsingPOST(searchParams);
      if (res.data) {
        setTotal(res.data.total ?? 0);
        setBookList(res.data.records ?? []);
      } else {
        message.error('获取用户数据失败');
      }
    } catch (e: any) {
      message.error('获取用户数据失败' + e.message);
    }
  };
  useEffect(() => {
    loadData();
  }, [searchParams]);
  const onFinish = async (values: any) => {
    setSearchParams({
      ...searchParams,
      username: values.username,
      role: values.role,
      idCard: values.idCard,
    });
  };
  const reset = () => {
    setSearchParams(initSearchParams);
  };

  const [editForm] = Form.useForm<API.User>();

  const columns: ColumnsType<API.User> = [
    {
      title: '书名',
      dataIndex: 'bookName',
      key: 'bookName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '数量',
      dataIndex: 'bookNum',
      key: 'bookNum',
    },
    {
      title: '简介',
      dataIndex: 'bookTra',
      key: 'bookTra',
    },
    {
      title: '封面',
      dataIndex: 'bookCover',
      key: 'bookCover',
    },
    {
      title: '位置',
      dataIndex: 'bookLocation',
      key: 'bookLocation',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle" key={record.id}>
          <ModalForm<API.User>
            width="380px"
            title="修改用户"
            trigger={
              <Button type="text" size="small">
                编辑
              </Button>
            }
            form={editForm}
            autoFocusFirstInput
            modalProps={{
              destroyOnClose: true,
              onCancel: () => {
                console.log('run');
              },
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
              const res = await updateUserUsingPOST({ id: record.id, ...values });
              if (res.code === 0) {
                message.success('提交成功');
                loadData();
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
              initialValue={record.username}
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
              initialValue={record.idCard}
              placeholder="请输入真实身份证号"
              rules={[
                {
                  required: true,
                  message: '请输入身份证',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="account"
              label="账号"
              initialValue={record.account}
              placeholder="请输入账号"
              rules={[
                {
                  required: true,
                  message: '请输入账号',
                },
              ]}
            />
            <ProFormSelect
              width="md"
              name="role"
              label="设置权限"
              initialValue={record.role}
              placeholder="设置权限"
              allowClear
              options={[
                {
                  value: 'user',
                  label: '普通用户',
                },
                {
                  value: 'bookAdmin',
                  label: '图书管理员',
                },
                {
                  value: 'meetRoomAdmin',
                  label: '会议室管理员',
                },
              ]}
            />
            <ProFormText width="md" name="password" label="新密码" placeholder="请设置新密码" />
          </ModalForm>
          <a style={{ color: 'red' }}>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Form layout="inline" form={searchForm} onFinish={onFinish}>
          <FormItem label="书名" name="bookName">
            <Input allowClear />
          </FormItem>
          <FormItem label="类型" name="type">
            <Input allowClear />
          </FormItem>
          <FormItem label="作者" name="author">
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

        <Table
          style={{ marginTop: '10px' }}
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={bookList}
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
      </Card>
    </div>
  );
};
export default BookAdmin;
