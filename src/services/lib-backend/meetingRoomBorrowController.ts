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

/** deleteMeetingRoomBorrowRecord POST /api/borrowRecord/meetingRoom/delete */
export async function deleteMeetingRoomBorrowRecordUsingPOST(
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

/** getMeetingRoomBorrowOwner GET /api/borrowRecord/meetingRoom/get/owner */
export async function getMeetingRoomBorrowOwnerUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMeetingRoomBorrowOwnerUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/borrowRecord/meetingRoom/get/owner', {
    method: 'GET',
    params: {
      ...params,
    },
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

/** updateMeetingRoomBorrowRecord POST /api/borrowRecord/meetingRoom/update */
export async function updateMeetingRoomBorrowRecordUsingPOST(
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
