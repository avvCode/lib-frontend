import { addBlacklistUsingPOST } from '@/services/lib-backend/blackListController';
import {
  addUserUsingPOST,
  deleteUserUsingPOST,
  listUserByPageUsingPOST,
  updateUserUsingPOST,
} from '@/services/lib-backend/userController';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Card, Divider, Form, Input, message, Modal, Select, Space, Table } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const UserAdmin: React.FC = () => {
  const { confirm } = Modal;
  const initSearchParams = {
    current: 1,
    pageSize: 5,
    username: '',
    role: '',
    sortField: 'createTime',
    sortOrder: 'desc',
  };
  const [searchParams, setSearchParams] = useState<API.UserQueryRequest>({ ...initSearchParams });
  const [userList, setUserList] = useState<API.User[]>();
  const [total, setTotal] = useState<number>(0);

  const loadData = async () => {
    try {
      const res = await listUserByPageUsingPOST(searchParams);
      if (res.data) {
        setTotal(res.data.total ?? 0);
        setUserList(res.data.records ?? []);
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

  const showConfirm = (value: API.DeleteRequest, flag: number) => {
    if (flag) {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: '确定删除该用户吗？',
        async onOk() {
          console.log('OK');
          const res = await deleteUserUsingPOST(value);
          if (res.code === 0) {
            await loadData();
            message.success('删除成功');
          } else {
            message.error('');
          }
        },
        async onCancel() {
          console.log('Cancel');
        },
      });
    } else {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: '确定拉黑该用户吗？',
        async onOk() {
          console.log('OK');
          const res = await addBlacklistUsingPOST({ userId: value?.id });
          if (res.code === 0) {
            await loadData();
            message.success('拉黑成功');
          } else {
            message.error('');
          }
        },
        async onCancel() {
          console.log('Cancel');
        },
      });
    }
  };

  const [editForm] = Form.useForm<API.User>();

  const columns: ColumnsType<API.User> = [
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
      key: 'idCard',
    },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '违规次数',
      dataIndex: 'foulTimes',
      key: 'foulTimes',
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
                {
                  value: 'ban',
                  label: '封号',
                },
              ]}
            />
            <ProFormText width="md" name="password" label="新密码" placeholder="请设置新密码" />
          </ModalForm>
          <a style={{ color: 'red' }} onClick={() => showConfirm(record, 0)}>
            拉黑
          </a>
          <a style={{ color: 'red' }} onClick={() => showConfirm(record, 1)}>
            删除
          </a>
        </Space>
      ),
    },
  ];

  const handleChange = (value: string) => {
    setSearchParams({ ...searchParams, role: value });
  };
  const [searchForm] = Form.useForm();

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
  const [addForm] = Form.useForm<API.UserAddRequest>();

  return (
    <div>
      <Card>
        <Form layout="inline" form={searchForm} onFinish={onFinish}>
          <FormItem label="姓名" name="username">
            <Input allowClear />
          </FormItem>

          <FormItem label="角色" name="role">
            <Select allowClear onChange={handleChange} size="middle" style={{ width: 200 }}>
              <Select.Option value="user">用户</Select.Option>
              <Select.Option value="bookAdmin">图书管理员</Select.Option>
              <Select.Option value="meetingRoomAdmin">会议室管理员</Select.Option>
            </Select>
          </FormItem>
          <FormItem label="身份证" name="idCard">
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
        <ModalForm<API.UserAddRequest>
          width="380px"
          title="新增用户"
          trigger={
            <Button type="primary">
              <PlusOutlined />
              新增
            </Button>
          }
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
            const res = await addUserUsingPOST(values);
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
          <ProFormText
            width="md"
            name="account"
            label="账号"
            placeholder="请输入账号"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="password"
            label="密码"
            placeholder="请设置密码"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          />
        </ModalForm>
        <Table
          style={{ marginTop: '10px' }}
          columns={columns}
          rowKey={(record) => `${record.id}`}
          dataSource={userList}
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
export default UserAdmin;
