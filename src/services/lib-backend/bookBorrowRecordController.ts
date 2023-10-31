// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addBookBorrowRecord POST /api/borrowRecord/book/add */
export async function addBookBorrowRecordUsingPOST(
  body: API.BookBorrowRecordAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/borrowRecord/book/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteBorrowRecord POST /api/borrowRecord/book/delete */
export async function deleteBorrowRecordUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/borrowRecord/book/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listBookBorrowRecordByPage POST /api/borrowRecord/book/list/page */
export async function listBookBorrowRecordByPageUsingPOST(
  body: API.BookBorrowRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageBookBorrowRecord_>('/api/borrowRecord/book/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listBookBorrowRecordVOByPage POST /api/borrowRecord/book/list/page/vo */
export async function listBookBorrowRecordVOByPageUsingPOST(
  body: API.BookBorrowRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageBookBorrowRecordVO_>('/api/borrowRecord/book/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateBorrowRecord POST /api/borrowRecord/book/update */
export async function updateBorrowRecordUsingPOST(
  body: API.BookBorrowRecordUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/borrowRecord/book/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
