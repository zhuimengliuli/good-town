// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** addAssistance POST /api/assistance/add */
export async function addAssistanceUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addAssistanceUsingPOSTParams,
  body: {},
  picture?: File,
  video?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (picture) {
    formData.append("picture", picture);
  }

  if (video) {
    formData.append("video", video);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === "object" && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ""));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseLong_>("/api/assistance/add", {
    method: "POST",
    params: {
      ...params,
    },
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}

/** deleteAssistance POST /api/assistance/delete */
export async function deleteAssistanceUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/assistance/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** editAssistance POST /api/assistance/edit */
export async function editAssistanceUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editAssistanceUsingPOSTParams,
  body: {},
  picture?: File,
  video?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (picture) {
    formData.append("picture", picture);
  }

  if (video) {
    formData.append("video", video);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === "object" && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ""));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseBoolean_>("/api/assistance/edit", {
    method: "POST",
    params: {
      ...params,
    },
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}

/** getAssistanceUserCount GET /api/assistance/get/count */
export async function getAssistanceUserCountUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssistanceUserCountUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListInt_>("/api/assistance/get/count", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getMyAssistanceListByState GET /api/assistance/get/state */
export async function getMyAssistanceListByStateUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyAssistanceListByStateUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListAssistanceVO_>(
    "/api/assistance/get/state",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** getAssistanceVOById GET /api/assistance/get/vo */
export async function getAssistanceVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssistanceVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseAssistanceVO_>("/api/assistance/get/vo", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listAssistanceByPage POST /api/assistance/list/page */
export async function listAssistanceByPageUsingPost(
  body: API.AssistanceQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageAssistance_>("/api/assistance/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** listAssistanceVOByPage POST /api/assistance/list/page/vo */
export async function listAssistanceVoByPageUsingPost(
  body: API.AssistanceQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageAssistanceVO_>(
    "/api/assistance/list/page/vo",
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

/** listMyAssistanceVOByPage POST /api/assistance/my/list/page/vo */
export async function listMyAssistanceVoByPageUsingPost(
  body: API.AssistanceQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageAssistanceVO_>(
    "/api/assistance/my/list/page/vo",
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

/** updateAssistance POST /api/assistance/update */
export async function updateAssistanceUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateAssistanceUsingPOSTParams,
  body: {},
  picture?: File,
  video?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (picture) {
    formData.append("picture", picture);
  }

  if (video) {
    formData.append("video", video);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === "object" && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ""));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseBoolean_>("/api/assistance/update", {
    method: "POST",
    params: {
      ...params,
    },
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}
