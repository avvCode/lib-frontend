// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addBlacklist POST /api/blacklist/add */
export async function addBlacklistUsingPOST(
  body: API.BlacklistAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/blacklist/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteBlacklist POST /api/blacklist/delete */
export async function deleteBlacklistUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/blacklist/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listBlacklistByPage POST /api/blacklist/list/page */
export async function listBlacklistByPageUsingPOST(
  body: API.BlacklistQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageBlacklist_>('/api/blacklist/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listBlacklistVOByPage POST /api/blacklist/list/page/vo */
export async function listBlacklistVOByPageUsingPOST(
  body: API.BlacklistQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageBlacklistVO_>('/api/blacklist/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateBlacklist POST /api/blacklist/update */
export async function updateBlacklistUsingPOST(
  body: API.BlacklistUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/blacklist/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
