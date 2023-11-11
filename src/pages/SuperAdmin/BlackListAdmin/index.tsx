import {
  deleteBlacklistUsingPOST,
  listBlacklistVOByPageUsingPOST,
  moveOutBlackListUsingPOST,
} from '@/services/lib-backend/blackListController';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, message, Modal, Space, Table } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const BlackListAdmin: React.FC = () => {
  const { confirm } = Modal;
  const initSearchParams = {
    current: 1,
    pageSize: 5,
    username: '',
    sortField: 'createTime',
    sortOrder: 'desc',
  };
  const [searchParams, setSearchParams] = useState<API.BlacklistQueryRequest>({
    ...initSearchParams,
  });
  const [userList, setUserList] = useState<API.BlacklistVO[]>();
  const [total, setTotal] = useState<number>(0);

  const loadData = async () => {
    try {
      const res = await listBlacklistVOByPageUsingPOST(searchParams);
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

  const showConfirm = (value: API.BlacklistVO, flag: number) => {
    if (flag) {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: '确定彻底删除该用户吗？',
        async onOk() {
          console.log('OK');
          const res = await deleteBlacklistUsingPOST(value);
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
        content: '确定取消拉黑该用户吗？',
        async onOk() {
          console.log('OK');
          const res = await moveOutBlackListUsingPOST({
            id: value.id,
            userId: value.blackUser?.id,
          });
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
    }
  };

  const columns: ColumnsType<API.BlacklistVO> = [
    {
      title: '姓名',
      dataIndex: 'blackUser',
      key: 'username',
      render: (blackUser) => <a>{blackUser.username}</a>,
    },
    {
      title: '身份证号',
      dataIndex: 'blackUser',
      key: 'blackUser.idCard',
      render: (blackUser) => blackUser.idCard,
    },
    {
      title: '账号',
      dataIndex: 'blackUser',
      key: 'blackUser.account',
      render: (blackUser) => blackUser.account,
    },
    {
      title: '角色',
      dataIndex: 'blackUser',
      key: 'blackUser.role',
      render: (blackUser) => blackUser.role,
    },
    {
      title: '违规次数',
      dataIndex: 'blackUser',
      key: 'blackUser.foulTimes',
      render: (blackUser) => blackUser.foulTimes,
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
          <Button type="text" size="small" onClick={() => showConfirm(record, 0)}>
            取消拉黑
          </Button>
          <a style={{ color: 'red' }} onClick={() => showConfirm(record, 1)}>
            删除
          </a>
        </Space>
      ),
    },
  ];
  const [searchForm] = Form.useForm();

  const onFinish = async (values: any) => {
    setSearchParams({
      ...searchParams,
      username: values.username,
      idCard: values.idCard,
    });
  };
  const reset = () => {
    setSearchParams(initSearchParams);
  };
  return (
    <div>
      <Card>
        <Form layout="inline" form={searchForm} onFinish={onFinish}>
          <FormItem label="姓名" name="username">
            <Input allowClear />
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
export default BlackListAdmin;
