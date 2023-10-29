// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addBook POST /api/book/add */
export async function addBookUsingPOST(body: API.BookAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseVoid_>('/api/book/add', {
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

/** getBooks GET /api/book/get/books */
export async function getBooksUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListBookVO_>('/api/book/get/books', {
    method: 'GET',
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
