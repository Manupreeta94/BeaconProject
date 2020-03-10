import axios from "axios";
import { merge } from "lodash";
import { AsyncStorage } from "react-native";

//Dev URL
//const baseURL = "https://mobi.acubetechnologies.in/api/";

//UAT URL
//const baseURL = "http://7b824ff6-prod-ingress-d9e2-637451461.eu-west-1.elb.amazonaws.com/";

const baseURL = "http://dev.vncbeacon.tk/";

//localhost:8002



const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
};

async function request(method, url, axiosConfig = {}) {
  const options = merge(
    {},
    {
      method,
      url,
      // withCredentials,
      baseURL,
      headers
    },
    axiosConfig
  );
  if (options.headers.Authorization === "no") {
    delete options.headers.Authorization;
  } else {
    let accessToken = await AsyncStorage.getItem("access_token");
    options.headers.Authorization = `Bearer ${accessToken}`;
  }
  return axios(options);
}
export function post(url, { data = {}, headers = {} }) {
  return request("post", url, { data, headers });
}

export function put(url, { data = {}, headers = {} }) {
  return request("put", url, { data, headers });
}

export function get(url, { params = {}, headers = {} }) {
  return request("get", url, { params, headers });
}

export function destroy(url, { headers = {} }) {
  // delete
  return request("delete", url, { headers });
}

