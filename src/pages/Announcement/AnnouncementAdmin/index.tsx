import {
  addAnnouncementUsingPOST,
  deleteAnnouncementUsingPOST,
  listAnnouncementVOByPageUsingPOST,
  updateAnnouncementUsingPOST,
} from '@/services/lib-backend/announcementController';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ModalForm, ProFormTextArea } from '@ant-design/pro-components';
import { Button, Card, Divider, Form, Input, message, Modal, Space, Table } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const AnnouncementAdmin: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 5,
    name: '',
    content: '',
    sortField: 'createTime',
    sortOrder: 'desc',
  };
  const [searchParams, setSearchParams] = useState<API.AnnouncementQueryRequest>({
    ...initSearchParams,
  });
  const [AnnouncementList, setAnnouncementList] = useState<API.AnnouncementVO[]>();

  const loadData = async () => {
    try {
      const res = await listAnnouncementVOByPageUsingPOST(searchParams);
      if (res.data) {
        setAnnouncementList(res.data.records ?? []);
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

  const reset = () => {
    setSearchParams(initSearchParams);
  };
  const [searchForm] = Form.useForm();
  const onFinish = async (values: API.AnnouncementQueryRequest) => {
    setSearchParams({
      ...searchParams,
      name: values.name,
      content: values.content,
    });
  };
  const [editForm] = Form.useForm<API.AnnouncementVO>();

  const { confirm } = Modal;
  const showConfirm = (value: API.DeleteRequest) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确定删除该公告吗？',
      async onOk() {
        const res = await deleteAnnouncementUsingPOST(value);
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
  const columns: ColumnsType<API.AnnouncementVO> = [
    {
      title: '发布人',
      dataIndex: 'userVO',
      key: 'userVO',
      render: (userVO) => <a>{userVO?.username ?? ''}</a>,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '时间',
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
            title="修改公告"
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
              const res = await updateAnnouncementUsingPOST({ id: record.id, ...values });
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
            <ProFormTextArea
              width="md"
              name="content"
              label="公告"
              placeholder="请输入公告"
              initialValue={record.content}
              rules={[
                {
                  required: true,
                  message: '请输入公告',
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
  const [newAnnouncement, setNewAnnouncement] = useState<string>('');
  const addAnnouncement = async () => {
    const res = await addAnnouncementUsingPOST({ content: newAnnouncement });
    if (res.code === 0) {
      setSearchParams({ ...initSearchParams });
      message.success('发布成功');
    } else {
      message.error('发布失败');
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewAnnouncement(e.target.value);
  };
  return (
    <div>
      <Card>
        <TextArea
          showCount
          maxLength={1000}
          onChange={onChange}
          style={{ height: 120, resize: 'none' }}
        />
        <Divider />
        <Button onClick={addAnnouncement}>发布</Button>
        <Divider />
        <Form layout="inline" form={searchForm} onFinish={onFinish}>
          <FormItem label="内容" name="content">
            <Input allowClear />
          </FormItem>
          <FormItem label="发布者" name="username">
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
        <Table dataSource={AnnouncementList} columns={columns} />
      </Card>
    </div>
  );
};
export default AnnouncementAdmin;
