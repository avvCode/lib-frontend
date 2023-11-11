import {
  addMeetingRoomUsingPOST,
  deleteMeetingRoomUsingPOST,
  listMeetingRoomVOByPageUsingPOST,
  updateMeetingRoomUsingPOST,
} from '@/services/lib-backend/meetingRoomController';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { ProFormDigit } from '@ant-design/pro-form/lib';
import { Button, Card, Divider, Form, Input, message, Modal, Space, Table, Tag } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const MeetingRoomAdmin: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 5,
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
  const loadData = async () => {
    try {
      const res = await listMeetingRoomVOByPageUsingPOST(searchParams);
      if (res.data) {
        setTotal(res.data.total ?? 0);
        setMeetingRoomList(res.data.records ?? []);
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
  const onFinish = async (values: API.MeetingRoomQueryRequest) => {
    setSearchParams({
      ...searchParams,
      name: values.name,
    });
  };
  const reset = () => {
    setSearchParams(initSearchParams);
  };

  const [editForm] = Form.useForm<API.Book>();

  const { confirm } = Modal;
  const showConfirm = (value: API.DeleteRequest) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确定删除该会议室吗？',
      async onOk() {
        const res = await deleteMeetingRoomUsingPOST(value);
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
  };

  const columns: ColumnsType<API.MeetingRoomVO> = [
    {
      title: '会议室编号',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '位置数量',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: '借用',
      dataIndex: 'isEmpty',
      render: (isEmpty) => {
        if (isEmpty) {
          return <Tag color="red">已被占用</Tag>;
        } else {
          return <Tag color="green">未占用</Tag>;
        }
      },
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
          <ModalForm<API.Book>
            width="380px"
            title="修改会议室"
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
              const res = await updateMeetingRoomUsingPOST({ id: record.id, ...values });
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
              name="name"
              label="会议室编号"
              placeholder="会议室编号"
              initialValue={record.name}
              rules={[
                {
                  required: true,
                  message: '请输入会议室编号',
                },
              ]}
            />
            <ProFormDigit
              width="md"
              name="capacity"
              label="位置数量"
              placeholder="位置数量"
              initialValue={record.capacity ?? 0}
              rules={[
                {
                  required: true,
                  message: '请输入位置数量',
                },
              ]}
            />
            <ProFormSelect
              width="md"
              name="isEmpty"
              label="状态"
              placeholder="会议室状态"
              initialValue={record.isEmpty ?? 0}
              rules={[
                {
                  required: true,
                  message: '请选择会议室状态',
                },
              ]}
              options={[
                {
                  value: 0,
                  label: '空',
                },
                {
                  value: 1,
                  label: '已占用',
                },
              ]}
            />
          </ModalForm>
          <a style={{ color: 'red' }} onClick={() => showConfirm(record)}>
            删除
          </a>
        </Space>
      ),
    },
  ];

  const [addForm] = Form.useForm<API.MeetingRoomAddRequest>();
  return (
    <div>
      <Card>
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
        <ModalForm<API.MeetingRoomAddRequest>
          width="380px"
          title="新增会议室"
          trigger={
            <Button type="primary">
              <PlusOutlined />
              新增会议室
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
            const res = await addMeetingRoomUsingPOST(values);
            if (res.code === 0) {
              message.success('提交成功');
              setSearchParams({ ...initSearchParams });
              return true;
            } else {
              message.error(res.message);
              return false;
            }
          }}
        >
          <ProFormText
            width="md"
            name="name"
            label="会议室编号"
            placeholder="会议室编号"
            rules={[
              {
                required: true,
                message: '请输入会议室编号',
              },
            ]}
          />
          <ProFormDigit
            width="md"
            name="capacity"
            label="位置数量"
            placeholder="位置数量"
            initialValue={1}
            rules={[
              {
                required: true,
                message: '位置数量',
              },
            ]}
          />
        </ModalForm>

        <Table
          style={{ marginTop: '10px' }}
          columns={columns}
          rowKey={(record) => `${record.id}`}
          dataSource={meetingRoomList}
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
export default MeetingRoomAdmin;
