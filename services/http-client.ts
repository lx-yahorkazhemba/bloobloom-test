import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

let client: AxiosInstance;

export function setClient(axios: AxiosInstance) {
  client = axios;
}

function call(method: string, ...args: any[]) {
  return (client as any)[method](...args).then((res: AxiosResponse) => res.data);
}

export default {
  get(path: string, config?: AxiosRequestConfig) {
    return call("get", path, config);
  },

  post(path: string, data?: any, config?: AxiosRequestConfig) {
    return call("post", path, data, config);
  },

  put(path: string, data?: any, config?: AxiosRequestConfig) {
    return call("put", path, data, config);
  },

  patch(path: string, data?: any, config?: AxiosRequestConfig) {
    return call("patch", path, data, config);
  },

  delete(path: string, config?: AxiosRequestConfig) {
    return call("delete", path, config);
  },

  options(path: string, config?: AxiosRequestConfig) {
    return call("options", path, config);
  },

  head(path: string, config?: AxiosRequestConfig) {
    return call("head", path, config);
  },

  request(config: AxiosRequestConfig) {
    return call("request", config);
  },

  client() {
    return client;
  },
};
