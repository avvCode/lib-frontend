// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addMeetingRecord POST /api/meetingRecord/add */
export async function addMeetingRecordUsingPOST(
  body: API.MeetingRecordAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/meetingRecord/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteMeetingRecord POST /api/meetingRecord/delete */
export async function deleteMeetingRecordUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/meetingRecord/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMeetingRecordByPage POST /api/meetingRecord/list/page */
export async function listMeetingRecordByPageUsingPOST(
  body: API.MeetingRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMeetingRecord_>('/api/meetingRecord/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMeetingRecordVOByPage POST /api/meetingRecord/list/page/vo */
export async function listMeetingRecordVOByPageUsingPOST(
  body: API.MeetingRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMeetingRecordVO_>('/api/meetingRecord/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateMeetingRecord POST /api/meetingRecord/update */
export async function updateMeetingRecordUsingPOST(
  body: API.MeetingRecordUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/meetingRecord/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
