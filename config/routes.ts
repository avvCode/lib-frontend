﻿export default [
  { path: '/welcome', icon: 'smile', name: '首页', component: './Welcome' },
  {
    path: '/books/show',
    icon: 'read',
    name: '图书',
    component: './Book/BooksShow',
  },
  {
    path: '/meetingRooms/show',
    icon: 'table',
    name: '会议室',
    component: './MeetingRoom/MeetingRoomsShow',
  },
  {
    path: '/meetingRoom/show/:id',
    hideInMenu: true,
    name: '会议',
    component: './MeetingRoom/MeetingRoomShow',
  },
  {
    path: '/book/show/:id',
    icon: 'table',
    hideInMenu: true,
    name: '图书',
    component: './Book/BookShow',
  },
  {
    path: '/meetingRoom/admin',
    icon: 'bank',
    name: '会议室管理',
    access: 'meetingRoomAdmin',
    component: './MeetingRoom/MeetingRoomAdmin',
  },
  {
    path: '/meetingRoom/record/admin',
    icon: 'crown',
    name: '会议室申请管理',
    access: 'meetingRoomAdmin',
    component: './MeetingRoom/MeetingRoomBorrowRecordAdmin',
  },
  {
    path: '/user/meetingRoomRecordList',
    hideInMenu: true,
    name: '会议室申请记录',
    component: './MeetingRoom/MeetingRoomBorrowRecord',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  {
    path: 'user/center',
    name: '个人中心',
    component: './User/Center',
    hideInMenu: true,
    access: 'login',
  },
  {
    path: 'user/meetingRoom/apply/admin/:id',
    name: '参会人管理',
    component: './MeetingRoom/MeetingRoomApplyAdmin',
    hideInMenu: true,
    access: 'login',
  },
  {
    path: '/admin',
    icon: 'crown',
    access: 'superAdmin',
    name: '超级管理',
    routes: [
      { path: '/admin/userAdmin', name: '用户管理', component: './SuperAdmin/UserAdmin' },
      {
        path: '/admin/blackListAdmin',
        name: '黑名单管理',
        component: './SuperAdmin/BlackListAdmin',
      },
    ],
  },
  {
    path: '/announcement/admin',
    icon: 'crown',
    access: 'bookAdmin',
    name: '公告管理',
    component: './Announcement/AnnouncementAdmin',
  },
  {
    path: '/book/admin',
    icon: 'crown',
    access: 'bookAdmin',
    name: '图书管理',
    component: './Book/BookAdmin',
  },
  {
    path: '/book/comment/admin',
    icon: 'crown',
    access: 'bookAdmin',
    name: '图书评论管理',
    component: './Book/BookCommentAdmin',
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
