declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageBlacklist_ = {
    code?: number;
    data?: PageBlacklist_;
    message?: string;
  };

  type BaseResponsePageBlacklistVO_ = {
    code?: number;
    data?: PageBlacklistVO_;
    message?: string;
  };

  type BaseResponsePageBook_ = {
    code?: number;
    data?: PageBook_;
    message?: string;
  };

  type BaseResponsePageBookBorrowRecord_ = {
    code?: number;
    data?: PageBookBorrowRecord_;
    message?: string;
  };

  type BaseResponsePageBookBorrowRecordVO_ = {
    code?: number;
    data?: PageBookBorrowRecordVO_;
    message?: string;
  };

  type BaseResponsePageBookVO_ = {
    code?: number;
    data?: PageBookVO_;
    message?: string;
  };

  type BaseResponsePageComments_ = {
    code?: number;
    data?: PageComments_;
    message?: string;
  };

  type BaseResponsePageCommentsVO_ = {
    code?: number;
    data?: PageCommentsVO_;
    message?: string;
  };

  type BaseResponsePageMeetingRoom_ = {
    code?: number;
    data?: PageMeetingRoom_;
    message?: string;
  };

  type BaseResponsePageMeetingRoomBorrowRecord_ = {
    code?: number;
    data?: PageMeetingRoomBorrowRecord_;
    message?: string;
  };

  type BaseResponsePageMeetingRoomBorrowRecordVO_ = {
    code?: number;
    data?: PageMeetingRoomBorrowRecordVO_;
    message?: string;
  };

  type BaseResponsePageMeetingRoomVO_ = {
    code?: number;
    data?: PageMeetingRoomVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BaseResponseVoid_ = {
    code?: number;
    message?: string;
  };

  type Blacklist = {
    blackUserId?: number;
    createTime?: string;
    id?: number;
    isDelete?: number;
    updateTime?: string;
  };

  type BlacklistAddRequest = {
    userId?: number;
  };

  type BlacklistQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type BlacklistUpdateRequest = {
    id?: number;
    userId?: number;
  };

  type BlacklistVO = true;

  type Book = {
    bookAuthor?: string;
    bookCover?: string;
    bookLocation?: string;
    bookName?: string;
    bookNumber?: number;
    bookTra?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    type?: string;
    updateTime?: string;
  };

  type BookAddRequest = {
    bookAuthor?: string;
    bookCover?: string;
    bookLocation?: string;
    bookName?: string;
    bookNumber?: number;
    bookTra?: string;
    type?: string;
  };

  type BookBorrowRecord = {
    bookId?: number;
    borrowDays?: number;
    createTime?: string;
    id?: number;
    isDelete?: number;
    isReturned?: number;
    updateTime?: string;
    userId?: number;
  };

  type BookBorrowRecordAddRequest = {
    bookId?: number;
    borrowDays?: number;
  };

  type BookBorrowRecordQueryRequest = {
    bookId?: number;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type BookBorrowRecordUpdateRequest = {
    bookBorrowRecordId?: number;
  };

  type BookBorrowRecordVO = {
    bookVO?: BookVO;
    borrowDays?: number;
    id?: number;
    startTime?: string;
    userVO?: UserVO;
  };

  type BookQueryRequest = {
    bookAuthor?: string;
    bookName?: string;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    type?: string;
  };

  type BookUpdateRequest = {
    bookAuthor?: string;
    bookCover?: string;
    bookId?: number;
    bookLocation?: string;
    bookName?: string;
    bookNumber?: number;
    bookTra?: string;
    type?: string;
  };

  type BookVO = {
    bookAuthor?: string;
    bookCover?: string;
    bookLocation?: string;
    bookName?: string;
    bookNumber?: number;
    bookTra?: string;
    id?: number;
    type?: string;
  };

  type Comments = {
    bookId?: number;
    checkUserId?: number;
    content?: string;
    createTime?: string;
    id?: number;
    isChecked?: number;
    isDelete?: number;
    updateTime?: string;
    userId?: number;
  };

  type CommentsAddRequest = {
    bookId?: number;
    content?: string;
  };

  type CommentsQueryRequest = {
    bookId?: number;
    content?: string;
    current?: number;
    isChecked?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type CommentsUpdateRequest = {
    id?: number;
    isChecked?: number;
  };

  type CommentsVO = {
    bookVO?: BookVO;
    checkUserId?: string;
    content?: string;
    id?: number;
    isChecked?: number;
    userVO?: UserVO;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    account?: string;
    createTime?: string;
    id?: number;
    idCard?: string;
    role?: string;
    userAvatar?: string;
    username?: string;
  };

  type MeetingRoom = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    updateTime?: string;
  };

  type MeetingRoomAddRequest = {
    meetingRoomName?: string;
  };

  type MeetingRoomBorrowRecord = {
    borrowTime?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    isReturn?: number;
    meetingRoomId?: number;
    updateTime?: string;
    userId?: number;
  };

  type MeetingRoomBorrowRecordAddRequest = {
    borrowTime?: string;
    meetingRoomId?: number;
  };

  type MeetingRoomBorrowRecordQueryRequest = {
    borrowTime?: string;
    current?: number;
    meetingRoomId?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type MeetingRoomBorrowRecordUpdateRequest = {
    meetingRoomBorrowRecordId?: number;
  };

  type MeetingRoomBorrowRecordVO = {
    borrowTime?: string;
    meetingRoomRecordId?: number;
    meetingRoomVO?: MeetingRoomVO;
    userVO?: UserVO;
  };

  type MeetingRoomQueryRequest = {
    current?: number;
    meetingRoomName?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type MeetingRoomUpdateRequest = {
    meetingRoomId?: number;
    meetingRoomName?: string;
  };

  type MeetingRoomVO = {
    id?: number;
    name?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageBlacklist_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Blacklist[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageBlacklistVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: BlacklistVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageBook_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Book[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageBookBorrowRecord_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: BookBorrowRecord[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageBookBorrowRecordVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: BookBorrowRecordVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageBookVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: BookVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageComments_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Comments[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageCommentsVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CommentsVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageMeetingRoom_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: MeetingRoom[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageMeetingRoomBorrowRecord_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: MeetingRoomBorrowRecord[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageMeetingRoomBorrowRecordVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: MeetingRoomBorrowRecordVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageMeetingRoomVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: MeetingRoomVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type User = {
    account?: string;
    createTime?: string;
    foulTimes?: number;
    id?: number;
    idCard?: string;
    isDelete?: number;
    password?: string;
    role?: string;
    updateTime?: string;
    userAvatar?: string;
    username?: string;
  };

  type UserAddRequest = {
    account?: string;
    idCard?: string;
    password?: string;
    role?: string;
    username?: string;
  };

  type UserLoginRequest = {
    account?: string;
    password?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    idCard?: string;
    pageSize?: number;
    role?: string;
    sortField?: string;
    sortOrder?: string;
    username?: string;
  };

  type UserRegisterRequest = {
    account?: string;
    checkPassword?: string;
    idCard?: string;
    password?: string;
    username?: string;
  };

  type UserUpdateMyRequest = {
    account?: string;
    idCard?: string;
    userAvatar?: string;
    username?: string;
  };

  type UserUpdateRequest = {
    account?: string;
    id?: number;
    idCard?: string;
    role?: string;
    userAvatar?: string;
    username?: string;
  };

  type UserVO = {
    account?: string;
    foulTimes?: number;
    id?: number;
    role?: string;
    username?: string;
  };
}
