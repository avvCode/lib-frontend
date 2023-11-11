import { listMeetingRoomBorrowRecordVOByPageUsingPOST } from '@/services/lib-backend/meetingRoomBorrowController';
import { useModel } from '@@/exports';
import { Image, message, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const MeetingRoomBorrowRecord: React.FC = () => {
  const [meetingRoomBorrowRecordList, setMeetingRoomBorrowRecord] =
    useState<API.MeetingRoomBorrowRecordVO[]>();
  const [total, setTotal] = useState<number>(0);
  const initSearchParams = {
    current: 1,
    pageSize: 5,
    sortField: 'createTime',
    sortOrder: 'desc',
  };
  const [searchParams, setSearchParams] = useState<API.MeetingRoomBorrowRecordQueryRequest>({
    ...initSearchParams,
  });
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const loadData = async () => {
    try {
      const res = await listMeetingRoomBorrowRecordVOByPageUsingPOST({
        ...searchParams,
        userId: currentUser?.id,
      });
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
      render: (meetingRoomVO) => (
        <a href={`meetingRoom/apply/admin/${meetingRoomVO.id}`}>{meetingRoomVO.name}</a>
      ),
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
  ];
  return (
    <div>
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
export default MeetingRoomBorrowRecord;
