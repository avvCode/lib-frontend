declare namespace API {
  type Announcement = {
    content?: string;
    createTime?: string;
    creatorId?: number;
    id?: number;
    isDelete?: number;
    updateTime?: string;
  };

  type AnnouncementAddRequest = {
    content?: string;
  };

  type AnnouncementQueryRequest = {
    account?: string;
    content?: string;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type AnnouncementUpdateRequest = {
    content?: string;
    id?: number;
  };

  type AnnouncementVO = {
    content?: string;
    createTime?: string;
    id?: number;
    userVO?: UserVO;
  };

  type Appeal = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    status?: number;
    updateTime?: string;
    userId?: number;
    userReason?: string;
  };

  type AppealAddRequest = {
    account?: string;
    idCard?: string;
    password?: string;
    userId?: number;
    userReason?: string;
    username?: string;
  };

  type AppealQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    userId?: number;
  };

  type AppealUpdateRequest = {
    id?: number;
    status?: number;
    userReason?: string;
  };

  type AppealVO = {
    appealUser?: UserVO;
    createTime?: string;
    id?: number;
    status?: number;
    userReason?: string;
  };

  type BaseResponse = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponseAnnouncementVO_ = {
    code?: number;
    data?: AnnouncementVO;
    message?: string;
  };

  type BaseResponseBookVO_ = {
    code?: number;
    data?: BookVO;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
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

  type BaseResponseMeetingRoomVO_ = {
    code?: number;
    data?: MeetingRoomVO;
    message?: string;
  };

  type BaseResponsePageAnnouncement_ = {
    code?: number;
    data?: PageAnnouncement_;
    message?: string;
  };

  type BaseResponsePageAnnouncementVO_ = {
    code?: number;
    data?: PageAnnouncementVO_;
    message?: string;
  };

  type BaseResponsePageAppeal_ = {
    code?: number;
    data?: PageAppeal_;
    message?: string;
  };

  type BaseResponsePageAppealVO_ = {
    code?: number;
    data?: PageAppealVO_;
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

  type BaseResponsePageLikeRecord_ = {
    code?: number;
    data?: PageLikeRecord_;
    message?: string;
  };

  type BaseResponsePageLikeRecordVO_ = {
    code?: number;
    data?: PageLikeRecordVO_;
    message?: string;
  };

  type BaseResponsePageMeetingRecord_ = {
    code?: number;
    data?: PageMeetingRecord_;
    message?: string;
  };

  type BaseResponsePageMeetingRecordVO_ = {
    code?: number;
    data?: PageMeetingRecordVO_;
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

  type BlacklistMoveOutRequest = {
    id?: number;
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

  type BlacklistVO = {
    blackUser?: User;
    id?: number;
  };

  type Book = {
    bookAuthor?: string;
    bookCover?: string;
    bookLocation?: string;
    bookName?: string;
    bookNumber?: number;
    bookRemaining?: number;
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
    bookRemaining?: number;
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
    createTime?: string;
    id?: number;
    isReturned?: number;
    userVO?: UserVO;
  };

  type BookBorrowRequest = {
    bookId?: number;
    borrowDays?: number;
    idCard?: string;
    username?: string;
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

  type BookReturnRequest = {
    borrowBookRecordId?: number;
  };

  type BookUpdateRequest = {
    bookAuthor?: string;
    bookCover?: string;
    bookLocation?: string;
    bookName?: string;
    bookNumber?: number;
    bookRemaining?: number;
    bookTra?: string;
    id?: number;
    type?: string;
  };

  type BookVO = {
    bookAuthor?: string;
    bookCover?: string;
    bookLocation?: string;
    bookName?: string;
    bookNumber?: number;
    bookTra?: string;
    createTime?: string;
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
    likeNumber?: number;
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
    content?: string;
    id?: number;
    isChecked?: number;
  };

  type CommentsVO = {
    bookVO?: BookVO;
    checkUserVO?: UserVO;
    content?: string;
    id?: number;
    isChecked?: number;
    like?: boolean;
    likeNumber?: number;
    userVO?: UserVO;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getAnnouncementByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getBookByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getMeetingRoomBorrowOwnerUsingGETParams = {
    /** meetingRoomId */
    meetingRoomId?: string;
  };

  type getMeetingRoomByIdUsingGETParams = {
    /** id */
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

  type LikeRecord = {
    commentId?: number;
    createTime?: string;
    id?: number;
    updateTime?: string;
    userId?: number;
  };

  type LikeRecordAddRequest = {
    commentId?: number;
  };

  type LikeRecordQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type LikeRecordVO = {
    commentsVO?: CommentsVO;
    id?: number;
    userVO?: UserVO;
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

  type MeetingRecord = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    meetingRoomId?: number;
    participantId?: number;
    status?: number;
    updateTime?: string;
  };

  type MeetingRecordAddRequest = {
    meetingRoomId?: number;
    participantId?: number;
  };

  type MeetingRecordQueryRequest = {
    account?: string;
    current?: number;
    meetingRoomId?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
  };

  type MeetingRecordUpdateRequest = {
    id?: number;
    meetingRoomId?: number;
    status?: number;
  };

  type MeetingRecordVO = {
    id?: number;
    meetingRoomVO?: MeetingRoomVO;
    participantVO?: UserVO;
    status?: number;
  };

  type MeetingRoom = {
    capacity?: number;
    createTime?: string;
    id?: number;
    isDelete?: number;
    isEmpty?: number;
    name?: string;
    updateTime?: string;
  };

  type MeetingRoomAddRequest = {
    capacity?: number;
    name?: string;
  };

  type MeetingRoomBorrowRecord = {
    checkUserId?: string;
    createTime?: string;
    endTime?: string;
    id?: number;
    isDelete?: number;
    meetingRoomId?: number;
    startTime?: string;
    status?: number;
    updateTime?: string;
    userId?: number;
  };

  type MeetingRoomBorrowRecordAddRequest = {
    endTime?: string;
    idCard?: string;
    meetingRoomId?: number;
    startTime?: string;
    username?: string;
  };

  type MeetingRoomBorrowRecordQueryRequest = {
    current?: number;
    endTime?: string;
    meetingRoomId?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
    status?: number;
    userId?: number;
  };

  type MeetingRoomBorrowRecordUpdateRequest = {
    checkUserId?: string;
    endTime?: string;
    id?: number;
    startTime?: string;
    status?: number;
  };

  type MeetingRoomBorrowRecordVO = {
    checkUser?: UserVO;
    endTime?: string;
    id?: number;
    meetingRoomVO?: MeetingRoomVO;
    startTime?: string;
    status?: number;
    userVO?: UserVO;
  };

  type MeetingRoomQueryRequest = {
    current?: number;
    isEmpty?: number;
    name?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type MeetingRoomUpdateRequest = {
    capacity?: number;
    id?: number;
    isEmpty?: number;
    name?: string;
  };

  type MeetingRoomVO = {
    capacity?: number;
    createTime?: string;
    id?: number;
    isEmpty?: number;
    name?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageAnnouncement_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Announcement[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageAnnouncementVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: AnnouncementVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageAppeal_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Appeal[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageAppealVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: AppealVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
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

  type PageLikeRecord_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: LikeRecord[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageLikeRecordVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: LikeRecordVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageMeetingRecord_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: MeetingRecord[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageMeetingRecordVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: MeetingRecordVO[];
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
    userAvatar?: string;
    username?: string;
  };
}
