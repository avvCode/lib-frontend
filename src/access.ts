/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.LoginUserVO } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    superAdmin: () => currentUser && currentUser.role === 'superAdmin',
    bookAdmin: () => currentUser && currentUser.role === 'bookAdmin',
    meetingRoomAdmin: () => currentUser && currentUser.role === 'meetingRoomAdmin',
    login: () => currentUser && currentUser.role !== 'ban',
  };
}
