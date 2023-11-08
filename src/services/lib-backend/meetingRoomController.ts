// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addMeetingRoom POST /api/meetingRoom/add */
export async function addMeetingRoomUsingPOST(
  body: API.MeetingRoomAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/meetingRoom/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteMeetingRoom POST /api/meetingRoom/delete */
export async function deleteMeetingRoomUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/meetingRoom/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getMeetingRoomById GET /api/meetingRoom/get */
export async function getMeetingRoomByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMeetingRoomByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseMeetingRoomVO_>('/api/meetingRoom/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listMeetingRoomByPage POST /api/meetingRoom/list/page */
export async function listMeetingRoomByPageUsingPOST(
  body: API.MeetingRoomQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMeetingRoom_>('/api/meetingRoom/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMeetingRoomVOByPage POST /api/meetingRoom/list/page/vo */
export async function listMeetingRoomVOByPageUsingPOST(
  body: API.MeetingRoomQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMeetingRoomVO_>('/api/meetingRoom/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateMeetingRoom POST /api/meetingRoom/update */
export async function updateMeetingRoomUsingPOST(
  body: API.MeetingRoomUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/meetingRoom/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
