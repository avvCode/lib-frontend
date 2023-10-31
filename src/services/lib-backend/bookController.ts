// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addBook POST /api/book/add */
export async function addBookUsingPOST(body: API.BookAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/book/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteBook POST /api/book/delete */
export async function deleteBookUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/book/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listBookByPage POST /api/book/list/page */
export async function listBookByPageUsingPOST(
  body: API.BookQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageBook_>('/api/book/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listBookVOByPage POST /api/book/list/page/vo */
export async function listBookVOByPageUsingPOST(
  body: API.BookQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageBookVO_>('/api/book/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateBook POST /api/book/update */
export async function updateBookUsingPOST(
  body: API.BookUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/book/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
