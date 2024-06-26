import axios from "axios";
import { fetchFromLocalStorage, addQueryArg, getDateInEpoch, isPublicSearch } from "./commons";
import { toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import store from "../ui-redux/store";
import {
  getAccessToken,
  getTenantId,
  getLocale
} from "egov-ui-kit/utils/localStorageUtils";

const instance = axios.create({
  baseURL: window.location.origin,
  headers: {
    "Content-Type": "application/json"
  }
});

const wrapRequestBody = (requestBody, action) => {
  const authToken = getAccessToken();
  let RequestInfo = {
    apiId: "Mihy",
    ver: ".01",
    // ts: getDateInEpoch(),
    action: action,
    did: "1",
    key: "",
    msgId: `20170310130900|${getLocale()}`,
    requesterId: "",
    authToken: authToken
  };
  if(isPublicSearch()) delete RequestInfo.authToken;
  return Object.assign(
    {},
    {
      RequestInfo
    },
    requestBody
  );
};

export const httpRequest = async (
  method = "get",
  endPoint,
  action,
  queryObject = [],
  requestBody = {},
  headers = []
) => {
  store.dispatch(toggleSpinner());
  let apiError = "Api Error";
  headers = {
    'X-Frame-Options': 'sameorigin',
    'Cache-Control': "no-cache, no-store, no-transform, must-revalidate, max-age=0",
  }
  if (headers)
    instance.defaults = Object.assign(instance.defaults, {
      headers
    });

  endPoint = addQueryArg(endPoint, queryObject);
  var response;
  try {
    switch (method) {
      case "post":
        response = await instance.post(
          endPoint,
          wrapRequestBody(requestBody, action)
        );
        break;
      default:
        response = await instance.get(endPoint);
    }
    const responseStatus = parseInt(response.status, 10);
    store.dispatch(toggleSpinner());
    if (responseStatus === 200 || responseStatus === 201) {
      return response.data;
    }
  } catch (error) {
    const { data, status } = error.response;
    if (status === 400 && data === "") {
      apiError = "INVALID_TOKEN";
    } else {
      apiError =
        (data.hasOwnProperty("Errors") &&
          data.Errors &&
          data.Errors.length &&
          data.Errors[0].message) ||
        (data.hasOwnProperty("error") &&
          data.error.fields &&
          data.error.fields.length &&
          data.error.fields[0].message) ||
        (data.hasOwnProperty("error_description") && data.error_description) ||
        apiError;
    }

    store.dispatch(toggleSpinner());
  }
  // unhandled error
  throw new Error(apiError);
};

export const loginRequest = async (username = null, password = null) => {
  let apiError = "Api Error";
  headers = {
    'X-Frame-Options': 'sameorigin',
    'Cache-Control': "no-cache, no-store, no-transform, must-revalidate, max-age=0",
  }
  try {
    // api call for login
    alert("Logged in");
    return;
  } catch (e) {
    apiError = e.message;
    // alert(e.message);
  }

  throw new Error(apiError);
};

export const logoutRequest = async () => {
  let apiError = "Api Error";
  headers = {
    'X-Frame-Options': 'sameorigin',
    'Cache-Control': "no-cache, no-store, no-transform, must-revalidate, max-age=0",
  }
  try {
    alert("Logged out");
    return;
  } catch (e) {
    apiError = e.message;
    // alert(e.message);
  }

  throw new Error(apiError);
};

export const prepareForm = params => {
  let formData = new FormData();
  for (var k in params) {
    formData.append(k, params[k]);
  }
  return formData;
};

export const uploadFile = async (endPoint, module, file, ulbLevel) => {
  // Bad idea to fetch from local storage, change as feasible
  store.dispatch(toggleSpinner());
  const tenantId = getTenantId()
    ? ulbLevel
      ? getTenantId().split(".")[0]
      : getTenantId().split(".")[0]
    : "";
  const uploadInstance = axios.create({
    baseURL: window.location.origin,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  const requestParams = {
    tenantId,
    module,
    file
  };
  const requestBody = prepareForm(requestParams);

  try {
    const response = await uploadInstance.post(endPoint, requestBody);
    const responseStatus = parseInt(response.status, 10);
    let fileStoreIds = [];
    store.dispatch(toggleSpinner());
    if (responseStatus === 201) {
      const responseData = response.data;
      const files = responseData.files || [];
      fileStoreIds = files.map(f => f.fileStoreId);
      return fileStoreIds[0];
    }
  } catch (error) {
    store.dispatch(toggleSpinner());
    throw new Error(error);
  }
};
