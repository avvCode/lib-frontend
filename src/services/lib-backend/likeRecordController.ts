// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addLikeRecord POST /api/likeRecord/add */
export async function addLikeRecordUsingPOST(
  body: API.LikeRecordAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/likeRecord/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteLikeRecord POST /api/likeRecord/delete */
export async function deleteLikeRecordUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/likeRecord/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listLikeRecordByPage POST /api/likeRecord/list/page */
export async function listLikeRecordByPageUsingPOST(
  body: API.LikeRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageLikeRecord_>('/api/likeRecord/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listLikeRecordVOByPage POST /api/likeRecord/list/page/vo */
export async function listLikeRecordVOByPageUsingPOST(
  body: API.LikeRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageLikeRecordVO_>('/api/likeRecord/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
