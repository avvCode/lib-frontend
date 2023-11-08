import {
  addMeetingRecordUsingPOST,
  listMeetingRecordVOByPageUsingPOST,
} from '@/services/lib-backend/meetingRecordController';
import { addMeetingRoomBorrowRecordUsingPOST } from '@/services/lib-backend/meetingRoomBorrowController';
import { getMeetingRoomByIdUsingGET } from '@/services/lib-backend/meetingRoomController';
import { Link, useModel } from '@@/exports';
import { ModalForm, ProCard, ProFormText } from '@ant-design/pro-components';
import {
  Avatar,
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Image,
  List,
  message,
  Typography,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const { Paragraph } = Typography;

const MeetingRoomShow: React.FC = () => {
  const params = useParams();
  const [meetingRoom, setMeetingRoom] = useState<API.MeetingRoomVO>();

  const [list, setList] = useState<API.MeetingRecordVO[]>([]);
  const loadData = async () => {
    try {
      if (params.id) {
        const res = await getMeetingRoomByIdUsingGET({ id: params.id });
        if (res.code === 0) {
          setMeetingRoom(res.data);
          const res1 = await listMeetingRecordVOByPageUsingPOST({
            meetingRoomId: res.data?.id,
            status: 1,
          });
          if (res1.data) {
            setList(res1.data.records ?? []);
          }
        } else {
          message.error(res.message);
        }
      }
    } catch (e: any) {
      message.error('获取图书数据失败' + e.message);
    }
  };

  useEffect(() => {
    loadData();
  }, [params]);
  const { RangePicker } = DatePicker;
  const [startTime, setStartTime] = useState<Dayjs>();
  const [endTime, setEndTime] = useState<Dayjs>();

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current <= dayjs().endOf('day');
  };

  const [addForm] = Form.useForm<API.MeetingRoomBorrowRecordAddRequest>();
  const [addApplyForm] = Form.useForm<API.MeetingRecordAddRequest>();

  const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    console.log('Selected Time: ', value);
    console.log('format Time: ', dateString);
    setStartTime(value[0]);
    setEndTime(value[1]);
  };
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  return (
    <div>
      <ProCard
        headerBordered
        bordered
        split="vertical"
        extra={
          meetingRoom?.isEmpty === 0 ? (
            <ModalForm<API.MeetingRoomBorrowRecordAddRequest>
              width="380px"
              title="申请会议室"
              trigger={<Button type="primary">申请会议室</Button>}
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
                const res = await addMeetingRoomBorrowRecordUsingPOST({
                  ...values,
                  meetingRoomId: params.id,
                  startTime: startTime,
                  endTime: endTime,
                });
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
              <RangePicker
                disabledDate={disabledDate}
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                onChange={onChange}
              />
            </ModalForm>
          ) : (
            <ModalForm<API.MeetingRecordAddRequest>
              width="380px"
              title="申请加入会议室"
              trigger={<Button type="primary">申请加入会议室</Button>}
              form={addApplyForm}
              autoFocusFirstInput
              modalProps={{
                destroyOnClose: true,
                onCancel: () => {
                  console.log('cancel option');
                },
              }}
              submitTimeout={2000}
              onFinish={async () => {
                const res = await addMeetingRecordUsingPOST({
                  meetingRoomId: params.id,
                  participantId: currentUser?.id,
                });
                if (res.code === 0) {
                  message.success('提交成功');
                  return true;
                } else {
                  message.error(res.message);
                  return false;
                }
              }}
            ></ModalForm>
          )
        }
      >
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

      {meetingRoom?.isEmpty === 1 && (
        <List
          itemLayout="horizontal"
          dataSource={list}
          header={<Link to={`#`}>参会人</Link>}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.participantVO?.userAvatar} />}
                title={<a href="#">{item.participantVO?.username}</a>}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};
export default MeetingRoomShow;
