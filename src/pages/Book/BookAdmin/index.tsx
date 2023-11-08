import {
  addBookUsingPOST,
  deleteBookUsingPOST,
  listBookByPageUsingPOST,
  updateBookUsingPOST,
} from '@/services/lib-backend/bookController';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { ProFormUploadButton } from '@ant-design/pro-form';
import { ProFormDigit } from '@ant-design/pro-form/lib';
import { Button, Card, Divider, Form, Image, Input, message, Modal, Space, Table, Tag } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const BookAdmin: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 5,
    bookName: '',
    type: '',
    bookAuthor: '',
    sortField: 'createTime',
    sortOrder: 'desc',
  };
  const [searchParams, setSearchParams] = useState<API.BookQueryRequest>({ ...initSearchParams });
  const [bookList, setBookList] = useState<API.Book[]>();
  const [total, setTotal] = useState<number>(0);
  const [searchForm] = Form.useForm();
  const loadData = async () => {
    try {
      const res = await listBookByPageUsingPOST(searchParams);
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

  const [editForm] = Form.useForm<API.Book>();

  const { confirm } = Modal;
  const showConfirm = (value: API.DeleteRequest) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确定删除该书吗？',
      async onOk() {
        const res = await deleteBookUsingPOST(value);
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

  const columns: ColumnsType<API.Book> = [
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
      render: (text) => <Tag color="green">{text}</Tag>,
    },
    {
      title: '作者',
      dataIndex: 'bookAuthor',
      key: 'bookAuthor',
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
      render: (bookCover) => <Image width={100} src={bookCover} />,
    },
    {
      title: '位置',
      dataIndex: 'bookLocation',
      key: 'bookLocation',
    },
    {
      title: '数量',
      dataIndex: 'bookNumber',
      key: 'bookNumber',
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
            title="修改图书"
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
              const res = await updateBookUsingPOST({ id: record.id, ...values });
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
              name="bookName"
              label="书名"
              placeholder="请输入书名"
              initialValue={record.bookName}
              rules={[
                {
                  required: true,
                  message: '请输入书名',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="bookAuthor"
              label="作者"
              placeholder="请输入作者"
              initialValue={record.bookAuthor}
              rules={[
                {
                  required: true,
                  message: '请输入作者',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="type"
              label="图书类型"
              placeholder="请输入图书类型"
              initialValue={record.type}
              rules={[
                {
                  required: true,
                  message: '请输入图书类型',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="bookLocation"
              label="图书位置"
              placeholder="请输入图书位置"
              initialValue={record.bookLocation}
              rules={[
                {
                  required: true,
                  message: '请输入图书位置',
                },
              ]}
            />
            <ProFormDigit
              width="md"
              name="bookNumber"
              label="图书数量"
              placeholder="请输入图书数量"
              initialValue={record.bookNumber}
              rules={[
                {
                  required: true,
                  message: '请输入图书数量',
                },
              ]}
            />
            <ProFormUploadButton
              name="bookCover"
              label="封面"
              max={2}
              fieldProps={{
                name: 'file',
              }}
            />
            <ProFormTextArea
              width="md"
              name="bookTra"
              label="简介"
              placeholder="请输入简介"
              initialValue={record.bookTra}
              rules={[
                {
                  required: true,
                  message: '请输入简介',
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

  const [addForm] = Form.useForm<API.BookAddRequest>();
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
        <ModalForm<API.BookAddRequest>
          width="380px"
          title="新增图书"
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
            values.bookCover = values?.bookCover[0].thumbUrl;
            const res = await addBookUsingPOST(values);
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
            name="bookName"
            label="书名"
            placeholder="请输入书名"
            rules={[
              {
                required: true,
                message: '请输入书名',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="bookAuthor"
            label="作者"
            placeholder="请输入作者"
            rules={[
              {
                required: true,
                message: '请输入作者',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="type"
            label="图书类型"
            placeholder="请输入图书类型"
            rules={[
              {
                required: true,
                message: '请输入图书类型',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="bookLocation"
            label="图书位置"
            placeholder="请输入图书位置"
            rules={[
              {
                required: true,
                message: '请输入图书位置',
              },
            ]}
          />
          <ProFormDigit
            width="md"
            name="bookNumber"
            label="图书数量"
            placeholder="请输入图书数量"
            initialValue={1}
            rules={[
              {
                required: true,
                message: '请输入图书数量',
              },
            ]}
          />
          <ProFormUploadButton
            name="bookCover"
            label="封面"
            max={2}
            fieldProps={{
              name: 'file',
            }}
            rules={[
              {
                required: true,
                message: '请上传封面',
              },
            ]}
          />
          <ProFormTextArea
            width="md"
            name="bookTra"
            label="简介"
            placeholder="请输入简介"
            rules={[
              {
                required: true,
                message: '请输入简介',
              },
            ]}
          />
        </ModalForm>

        <Table
          style={{ marginTop: '10px' }}
          columns={columns}
          rowKey={(record) => `${record.id}`}
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
