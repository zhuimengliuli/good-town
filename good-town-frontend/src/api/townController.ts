// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** getTownVOById GET /api/town/get/vo */
export async function getTownVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTownVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseTownVO_>("/api/town/get/vo", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listTownByPage POST /api/town/list/page */
export async function listTownByPageUsingPost(
  body: API.TownQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageTown_>("/api/town/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** listTownVOByPage POST /api/town/list/page/vo */
export async function listTownVoByPageUsingPost(
  body: API.TownQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageTownVO_>("/api/town/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyTownVOByPage POST /api/town/my/list/page/vo */
export async function listMyTownVoByPageUsingPost(
  body: API.TownQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageTownVO_>("/api/town/my/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** updateTown POST /api/town/update */
export async function updateTownUsingPost(
  body: API.TownUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/town/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
