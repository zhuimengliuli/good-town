declare namespace API {
  type Assistance = {
    createTime?: string;
    description?: string;
    id?: number;
    isDelete?: number;
    picture?: string;
    promotionId?: number;
    state?: number;
    updateTime?: string;
    userId?: number;
  };

  type AssistanceAddRequest = {
    description?: string;
    picture?: string;
    promotionId?: number;
    userId?: number;
  };

  type AssistanceEditRequest = {
    description?: string;
    id?: number;
    picture?: string;
    promotionId?: number;
    state?: number;
    userId?: number;
  };

  type AssistanceQueryRequest = {
    current?: number;
    description?: string;
    id?: number;
    notId?: number;
    pageSize?: number;
    picture?: string;
    promotionId?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    state?: number;
    userId?: number;
  };

  type AssistanceUpdateRequest = {
    description?: string;
    id?: number;
    picture?: string;
    promotionId?: number;
    state?: number;
    userId?: number;
  };

  type AssistanceVO = {
    createTime?: string;
    description?: string;
    id?: number;
    picture?: string;
    promotionId?: number;
    state?: number;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type BaseResponseAssistanceVO_ = {
    code?: number;
    data?: AssistanceVO;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseListAssistanceVO_ = {
    code?: number;
    data?: AssistanceVO[];
    message?: string;
  };

  type BaseResponseListInt_ = {
    code?: number;
    data?: number[];
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

  type BaseResponsePageAssistance_ = {
    code?: number;
    data?: PageAssistance_;
    message?: string;
  };

  type BaseResponsePageAssistanceVO_ = {
    code?: number;
    data?: PageAssistanceVO_;
    message?: string;
  };

  type BaseResponsePagePromotion_ = {
    code?: number;
    data?: PagePromotion_;
    message?: string;
  };

  type BaseResponsePagePromotionVO_ = {
    code?: number;
    data?: PagePromotionVO_;
    message?: string;
  };

  type BaseResponsePageTown_ = {
    code?: number;
    data?: PageTown_;
    message?: string;
  };

  type BaseResponsePageTownVO_ = {
    code?: number;
    data?: PageTownVO_;
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

  type BaseResponsePromotionVO_ = {
    code?: number;
    data?: PromotionVO;
    message?: string;
  };

  type BaseResponseTownVO_ = {
    code?: number;
    data?: TownVO;
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

  type DeleteRequest = {
    id?: number;
  };

  type getAssistanceUserCountUsingGETParams = {
    /** year */
    year?: number;
  };

  type getAssistanceVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getMyAssistanceListByStateUsingGETParams = {
    /** state */
    state?: number;
  };

  type getPromotionUserCountUsingGETParams = {
    /** year */
    year?: number;
  };

  type getPromotionVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getTownVOByIdUsingGETParams = {
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

  type listMyPromotionVOByPageUsingPOSTParams = {
    current?: number;
    description?: string;
    id?: number;
    notId?: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    themeName?: string;
    townId?: number;
    type?: string;
    userId?: number;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    phone?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userIDCard?: string;
    userIDCardType?: string;
    userName?: string;
    userNickName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageAssistance_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Assistance[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageAssistanceVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: AssistanceVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePromotion_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Promotion[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePromotionVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PromotionVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageTown_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Town[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageTownVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: TownVO[];
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

  type Promotion = {
    createTime?: string;
    description?: string;
    id?: number;
    isDelete?: number;
    picture?: string;
    state?: number;
    themeName?: string;
    townId?: number;
    type?: string;
    updateTime?: string;
    userId?: number;
    video?: string;
  };

  type PromotionAddRequest = {
    description?: string;
    picture?: string[];
    themeName?: string;
    townName?: string;
    type?: string;
    video?: string[];
  };

  type PromotionEditRequest = {
    description?: string;
    id?: number;
    picture?: string[];
    state?: number;
    themeName?: string;
    type?: string;
    video?: string[];
  };

  type PromotionQueryRequest = {
    current?: number;
    description?: string;
    id?: number;
    notId?: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    themeName?: string;
    townId?: number;
    type?: string;
    userId?: number;
  };

  type PromotionUpdateRequest = {
    description?: string;
    id?: number;
    picture?: string;
    state?: number;
    themeName?: string;
    type?: string;
    video?: string;
  };

  type PromotionVO = {
    assistanceList?: AssistanceVO[];
    createTime?: string;
    description?: string;
    id?: number;
    picture?: string;
    themeName?: string;
    townName?: string;
    type?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
    video?: string;
  };

  type Town = {
    city?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    province?: string;
    townName?: string;
    updateTime?: string;
  };

  type TownQueryRequest = {
    city?: string;
    current?: number;
    id?: number;
    notId?: number;
    pageSize?: number;
    province?: string;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    townName?: string;
    userId?: number;
  };

  type TownUpdateRequest = {
    city?: string;
    id?: number;
    province?: string;
    townName?: string;
  };

  type TownVO = {
    content?: string;
    createTime?: string;
    id?: number;
    tagList?: string[];
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type User = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    phone?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userIDCard?: string;
    userIDCardType?: string;
    userName?: string;
    userNickName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userName?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    phone?: string;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    userAvatar?: string;
    userName?: string;
    userNickName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    phone?: string;
    userAccount?: string;
    userIDCard?: string;
    userIDCardType?: string;
    userName?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    phone?: string;
    userPassword?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    phone?: string;
    userAvatar?: string;
    userIDCard?: string;
    userIDCardType?: string;
    userName?: string;
    userNickName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
