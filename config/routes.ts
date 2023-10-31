export default [
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
  { path: '/welcome', icon: 'smile', name: '首页', component: './Welcome' },
  {
    path: '/admin',
    icon: 'crown',
    access: 'superAdmin',
    name: '超级管理页',
    routes: [{ path: '/admin/userAdmin', name: '用户管理', component: './SuperAdmin/UserAdmin' }],
  },
  {
    path: '/book/show',
    icon: 'table',
    name: '图书页',
    component: './Book/BooksShow',
  },
  {
    path: '/book/admin',
    icon: 'crown',
    access: 'bookAdmin',
    name: '图书管理页',
    component: './Book/BookAdmin',
  },
  //{ icon: 'table', path: '/list',name:'列表' ,component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
