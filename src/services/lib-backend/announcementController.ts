// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addAnnouncement POST /api/announcement/add */
export async function addAnnouncementUsingPOST(
  body: API.AnnouncementAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/announcement/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteAnnouncement POST /api/announcement/delete */
export async function deleteAnnouncementUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/announcement/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getAnnouncementById GET /api/announcement/get */
export async function getAnnouncementByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAnnouncementByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseAnnouncementVO_>('/api/announcement/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getNewAnnouncement GET /api/announcement/getNew */
export async function getNewAnnouncementUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseAnnouncementVO_>('/api/announcement/getNew', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listAnnouncementByPage POST /api/announcement/list/page */
export async function listAnnouncementByPageUsingPOST(
  body: API.AnnouncementQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAnnouncement_>('/api/announcement/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listAnnouncementVOByPage POST /api/announcement/list/page/vo */
export async function listAnnouncementVOByPageUsingPOST(
  body: API.AnnouncementQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAnnouncementVO_>('/api/announcement/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateAnnouncement POST /api/announcement/update */
export async function updateAnnouncementUsingPOST(
  body: API.AnnouncementUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/announcement/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
