// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addMeetingRoomBorrowRecord POST /api/borrowRecord/meetingRoom/add */
export async function addMeetingRoomBorrowRecordUsingPOST(
  body: API.MeetingRoomBorrowRecordAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/borrowRecord/meetingRoom/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteMeetingRoom POST /api/borrowRecord/meetingRoom/delete */
export async function deleteMeetingRoomUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/borrowRecord/meetingRoom/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMeetingRoomBorrowRecordByPage POST /api/borrowRecord/meetingRoom/list/page */
export async function listMeetingRoomBorrowRecordByPageUsingPOST(
  body: API.MeetingRoomBorrowRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMeetingRoomBorrowRecord_>(
    '/api/borrowRecord/meetingRoom/list/page',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** listMeetingRoomBorrowRecordVOByPage POST /api/borrowRecord/meetingRoom/list/page/vo */
export async function listMeetingRoomBorrowRecordVOByPageUsingPOST(
  body: API.MeetingRoomBorrowRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMeetingRoomBorrowRecordVO_>(
    '/api/borrowRecord/meetingRoom/list/page/vo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** updateMeetingRoom POST /api/borrowRecord/meetingRoom/update */
export async function updateMeetingRoomUsingPOST(
  body: API.MeetingRoomBorrowRecordUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/borrowRecord/meetingRoom/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
