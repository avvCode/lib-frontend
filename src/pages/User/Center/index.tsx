import { getInitialState } from '@/app';
import { listBookBorrowRecordVOByPageUsingPOST } from '@/services/lib-backend/bookBorrowRecordController';
import { returnBookUsingPOST } from '@/services/lib-backend/bookController';
import { updateMyUserUsingPOST } from '@/services/lib-backend/userController';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Form, message, Modal, Space, Table, Tag, Upload } from 'antd';
import { ColumnsType } from 'antd/es/table';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const Center: React.FC = () => {
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const getRole = (en: string) => {
    switch (en) {
      case 'user':
        return '普通用户';
      case 'bookAdmin':
        return '图书管理员';
      case 'meetingRoomAdmin':
        return '会议室管理员';
      case 'superAdmin':
        return '超级管理员';
      case 'ban':
        return '黑名单';
    }
  };
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: '你的头像',
      status: 'done',
      url: currentUser?.userAvatar,
    },
  ]);
  const { confirm } = Modal;
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    console.log(newFileList);
    if (fileList[0] && fileList[0].status === 'uploading') {
      const fileBase64 = fileList[0].thumbUrl;
      if (fileBase64) {
        const res = await updateMyUserUsingPOST({ userAvatar: fileBase64 });
        if (res.code === 0) {
          const newUser = await getInitialState();
          fileList[0].status = 'done';
          setInitialState(newUser);
          message.success('修改成功');
        } else {
          message.error(res.message);
        }
      }
    }
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>修改头像</div>
    </div>
  );
  const [editForm] = Form.useForm<API.User>();

  const initSearchParams = {
    current: 1,
    pageSize: 8,
    sortField: 'createTime',
    sortOrder: 'desc',
  };
  const [searchParams] = useState<API.BookBorrowRecordQueryRequest>({ ...initSearchParams });
  const [record, setRecord] = useState<API.BookBorrowRecordVO[]>();
  const loadData = async () => {
    try {
      const res = await listBookBorrowRecordVOByPageUsingPOST(searchParams);
      if (res.data) {
        setRecord(res.data.records ?? []);
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
  const showConfirm = (value: API.BookBorrowRecordVO) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '还书？',
      async onOk() {
        const res = await returnBookUsingPOST({ borrowBookRecordId: value.id });
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
  };
  const columns: ColumnsType<API.BookBorrowRecordVO> = [
    {
      title: '书名',
      dataIndex: 'bookVO',
      key: 'bookVO',
      render: (bookVO) => <>{bookVO.bookName}</>,
    },
    {
      title: '起始时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '借出天数',
      dataIndex: 'borrowDays',
      key: 'borrowDays',
    },
    {
      title: '是否归还',
      dataIndex: 'isReturned',
      key: 'isReturned',
      render: (isReturned) =>
        isReturned === 0 ? <Tag color="red">未归还</Tag> : <Tag color="green">已还</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle" key={record.id}>
          <Button onClick={() => showConfirm(record)}>还书</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <ProCard split="vertical" boxShadow>
        <ProCard colSpan="30%">
          <>
            <Upload
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            <p>姓名：{currentUser?.username}</p>
            <p>身份证：{currentUser?.idCard}</p>
            <p>账号：{currentUser?.account}</p>
            <p>角色：{getRole(currentUser?.role ?? 'user')}</p>
            <ModalForm<API.User>
              width="380px"
              title="修改用户"
              trigger={
                <Button type="primary" size="large" style={{ marginTop: '150px' }}>
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
                const res = await updateMyUserUsingPOST({ id: currentUser?.id, ...values });
                if (res.code === 0) {
                  message.success('提交成功');
                  const newUser = await getInitialState();
                  setInitialState(newUser);
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
                initialValue={currentUser?.username}
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
                initialValue={currentUser?.idCard}
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
                disabled
                initialValue={currentUser?.account}
              />
              <ProFormSelect
                width="md"
                name="role"
                label="权限"
                disabled
                initialValue={currentUser?.role === 'superAdmin' ? '超级管理员' : currentUser?.role}
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
          </>
        </ProCard>
        <ProCard title="借书记录" headerBordered>
          <Table columns={columns} dataSource={record} />
        </ProCard>
      </ProCard>
    </div>
  );
};
export default Center;
