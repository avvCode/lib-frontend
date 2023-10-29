declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseListBookVO_ = {
    code?: number;
    data?: BookVO[];
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

  type BaseResponseString_ = {
    code?: number;
    data?: string;
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

  type BookAddRequest = {
    bookLocation?: string;
    bookName?: string;
    bookNumber?: number;
    type?: string;
  };

  type BookUpdateRequest = {
    bookId?: number;
    bookLocation?: string;
    bookName?: string;
    bookNumber?: number;
    type?: string;
  };

  type BookVO = {
    bookId?: number;
    bookLocation?: string;
    bookName?: string;
    bookNumber?: number;
    type?: string;
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

  type OrderItem = {
    asc?: boolean;
    column?: string;
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
    userAvatar?: string;
    userProfile?: string;
    username?: string;
  };

  type UserUpdateRequest = {
    id?: number;
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
