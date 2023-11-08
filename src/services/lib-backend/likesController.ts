// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addLikes POST /api/likes/add */
export async function addLikesUsingPOST(
  body: API.LikesAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/likes/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** cancelLike POST /api/likes/cancel */
export async function cancelLikeUsingPOST(
  body: API.LikesCancelRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/likes/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteLikes POST /api/likes/delete */
export async function deleteLikesUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/likes/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** like POST /api/likes/like */
export async function likeUsingPOST(body: API.LikesAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseVoid_>('/api/likes/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listLikesByPage POST /api/likes/list/page */
export async function listLikesByPageUsingPOST(
  body: API.LikesQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageLikes_>('/api/likes/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listLikesVOByPage POST /api/likes/list/page/vo */
export async function listLikesVOByPageUsingPOST(
  body: API.LikesQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageLikesVO_>('/api/likes/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
