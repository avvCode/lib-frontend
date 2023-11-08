import {
  listMeetingRecordVOByPageUsingPOST,
  updateMeetingRecordUsingPOST,
} from '@/services/lib-backend/meetingRecordController';
import { getMeetingRoomByIdUsingGET } from '@/services/lib-backend/meetingRoomController';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button, Image, message, Modal, Space, Table, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const { Paragraph } = Typography;

const MeetingRoomApplyAdmin: React.FC = () => {
  const params = useParams();
  const [meetingRoom, setMeetingRoom] = useState<API.MeetingRoomVO>();
  const [list, setList] = useState<API.MeetingRecordVO[]>([]);
  const [total] = useState<number>(0);
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
  const loadData = async () => {
    try {
      if (params.id) {
        const res = await getMeetingRoomByIdUsingGET({ id: params.id });
        if (res.code === 0) {
          setMeetingRoom(res.data);
          const res1 = await listMeetingRecordVOByPageUsingPOST({ meetingRoomId: res.data?.id });
          if (res1.data) {
            setList(res1.data.records ?? []);
          } else {
            message.error(res.message);
          }
        } else {
          message.error(res.message);
        }
      }
    } catch (e: any) {
      message.error('获取数据失败' + e.message);
    }
  };

  useEffect(() => {
    loadData();
  }, [params]);

  const showConfirm = (value: API.DeleteRequest, access: boolean) => {
    console.log(value);
    if (access) {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: '确定通过该入会申请吗？',
        async onOk() {
          const res = await updateMeetingRecordUsingPOST({
            id: value.id,
            status: 1,
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
        content: '确定不通过该入会申请吗？？',
        async onOk() {
          const res = await updateMeetingRecordUsingPOST({
            id: value.id,
            status: 2,
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
  const columns: ColumnsType<API.MeetingRecordVO> = [
    {
      title: '会议室编号',
      dataIndex: 'meetingRoomVO',
      key: 'meetingRoomVO',
      render: (meetingRoomVO) => <a>{meetingRoomVO.name}</a>,
    },
    {
      title: '申请人',
      dataIndex: 'participantVO',
      key: 'participantVO',
      render: (participantVO) => <Tag color="green">{participantVO.username}</Tag>,
    },
    {
      title: '头像',
      dataIndex: 'participantVO',
      key: 'participantVO',
      render: (participantVO) => <Image width={100} src={participantVO.userAvatar} />,
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
      <ProCard headerBordered bordered split="vertical">
        <Image src={'/img.png'} />

        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <ProCard title="会议室编号">{meetingRoom?.name}</ProCard>
              <ProCard title="上架时间">
                {moment(meetingRoom?.createTime).format('YYYY-MM-DD')}
              </ProCard>
            </ProCard>
            <ProCard split="vertical" title="">
              <Typography style={{ marginLeft: '22px', marginTop: '10px' }}>
                <Paragraph>{meetingRoom?.Tra}</Paragraph>
              </Typography>
            </ProCard>
          </ProCard>
        </ProCard>
      </ProCard>
      <Table
        style={{ marginTop: '10px' }}
        columns={columns}
        rowKey={(record) => `${record.id}`}
        dataSource={list}
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
export default MeetingRoomApplyAdmin;
