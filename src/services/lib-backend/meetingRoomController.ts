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
export async function deleteMeetingRoomUsingPOST1(
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
export async function updateMeetingRoomUsingPOST1(
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
