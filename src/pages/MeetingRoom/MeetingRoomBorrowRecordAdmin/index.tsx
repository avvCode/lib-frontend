import {
  listMeetingRoomBorrowRecordVOByPageUsingPOST,
  updateMeetingRoomBorrowRecordUsingPOST,
} from '@/services/lib-backend/meetingRoomBorrowController';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Divider, Image, message, Modal, Radio, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const MeetingRoomBorrowRecordAdmin: React.FC = () => {
  const [meetingRoomBorrowRecordList, setMeetingRoomBorrowRecord] =
    useState<API.MeetingRoomBorrowRecordVO[]>();
  const [total, setTotal] = useState<number>(0);
  const initSearchParams = {
    current: 1,
    pageSize: 5,
    status: 0,
    sortField: 'createTime',
    sortOrder: 'desc',
  };
  const [searchParams, setSearchParams] = useState<API.MeetingRoomBorrowRecordQueryRequest>({
    ...initSearchParams,
  });
  const { confirm } = Modal;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const loadData = async () => {
    try {
      const res = await listMeetingRoomBorrowRecordVOByPageUsingPOST(searchParams);
      if (res.data) {
        setTotal(res.data.total ?? 0);
        setMeetingRoomBorrowRecord(res.data.records ?? []);
      } else {
        message.error('获取会议室申请数据失败');
      }
    } catch (e: any) {
      message.error('获取会议室申请数据失败' + e.message);
    }
  };
  useEffect(() => {
    loadData();
  }, [searchParams]);

  const showConfirm = (value: API.DeleteRequest, access: boolean) => {
    console.log(value);
    if (access) {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: '确定通过该会议室申请吗？',
        async onOk() {
          const res = await updateMeetingRoomBorrowRecordUsingPOST({
            id: value.id,
            status: 1,
            checkUserId: currentUser?.id,
          });
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
        content: '确定不通过该会议室申请吗？？',
        async onOk() {
          const res = await updateMeetingRoomBorrowRecordUsingPOST({
            id: value.id,
            status: 2,
            checkUserId: currentUser?.id,
          });
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
  const columns: ColumnsType<API.MeetingRoomBorrowRecordVO> = [
    {
      title: '会议室编号',
      dataIndex: 'meetingRoomVO',
      key: 'meetingRoomVO',
      render: (meetingRoomVO) => <a>{meetingRoomVO.name}</a>,
    },
    {
      title: '申请人',
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
      title: '起始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '审核人',
      dataIndex: 'checkUser',
      key: 'checkUser',
      render: (checkUser) => <Tag color="green">{checkUser.username}</Tag>,
    },
    {
      title: '审核',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getS(status),
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
      render: (_, record) =>
        record.status === 0 && (
          <Space size="middle">
            <Button onClick={() => showConfirm({ ...record }, true)}>通过</Button>
            <Button danger onClick={() => showConfirm({ ...record }, false)}>
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
          setSearchParams({ ...searchParams, status: value });
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
        dataSource={meetingRoomBorrowRecordList}
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
export default MeetingRoomBorrowRecordAdmin;
