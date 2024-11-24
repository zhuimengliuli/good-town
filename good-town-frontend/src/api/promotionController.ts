// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** addPromotion POST /api/promotion/add */
export async function addPromotionUsingPost(
  body: API.PromotionAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/promotion/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** deletePromotion POST /api/promotion/delete */
export async function deletePromotionUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/promotion/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** editPromotion POST /api/promotion/edit */
export async function editPromotionUsingPost(
  body: API.PromotionEditRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/promotion/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** getPromotionUserCount GET /api/promotion/get/count */
export async function getPromotionUserCountUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPromotionUserCountUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListInt_>("/api/promotion/get/count", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getPromotionVOById GET /api/promotion/get/vo */
export async function getPromotionVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPromotionVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePromotionVO_>("/api/promotion/get/vo", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listPromotionByPage POST /api/promotion/list/page */
export async function listPromotionByPageUsingPost(
  body: API.PromotionQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePagePromotion_>("/api/promotion/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** listPromotionVOByPage POST /api/promotion/list/page/vo */
export async function listPromotionVoByPageUsingPost(
  body: API.PromotionQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePagePromotionVO_>(
    "/api/promotion/list/page/vo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** listMyPromotionVOByPage POST /api/promotion/my/list/page/vo */
export async function listMyPromotionVoByPageUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listMyPromotionVOByPageUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePagePromotionVO_>(
    "/api/promotion/my/list/page/vo",
    {
      method: "POST",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** updatePromotion POST /api/promotion/update */
export async function updatePromotionUsingPost(
  body: API.PromotionUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/promotion/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
