// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addComments POST /api/comment/add */
export async function addCommentsUsingPOST(
  body: API.CommentsAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/comment/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteComments POST /api/comment/delete */
export async function deleteCommentsUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/comment/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listCommentsByPage POST /api/comment/list/page */
export async function listCommentsByPageUsingPOST(
  body: API.CommentsQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageComments_>('/api/comment/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listCommentsVOByPage POST /api/comment/list/page/vo */
export async function listCommentsVOByPageUsingPOST(
  body: API.CommentsQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCommentsVO_>('/api/comment/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** passComment POST /api/comment/pass */
export async function passCommentUsingPOST(body: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse>('/api/comment/pass', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** unPassComment POST /api/comment/unPass */
export async function unPassCommentUsingPOST(body: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse>('/api/comment/unPass', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateComments POST /api/comment/update */
export async function updateCommentsUsingPOST(
  body: API.CommentsUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/comment/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
