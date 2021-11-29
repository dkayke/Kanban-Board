import Axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { config } from 'config';
import Cookies from 'js-cookie';

export default class Connector {
  private static _instance?: Connector;
  private _axios: AxiosInstance;

  private constructor() {
    this._axios = Connector.createAxios();
    (this._axios.defaults.headers as any)["Accept"] = 'application/json, text/plain, */*';

    const allRequest = (requestConfig: AxiosRequestConfig) => {
      (requestConfig.headers as any).common['Authorization'] = Cookies.get("token");
      return requestConfig;
    }

    const allResponse = async (response: AxiosResponse) => {
      return response;
    };

    const errorResponse = async (error: any) => {
      return Promise.reject(error);
    };

    this._axios.interceptors.response.use(allResponse, errorResponse);
    this._axios.interceptors.request.use(allRequest);
  }

  get axios() {
    return this._axios;
  }

  private static createAxios() {
    const axios = Axios.create({
      baseURL: config.backendUrl,
      timeout: config.timeout
    });

    return axios;
  }

  public execute<Response>(config: AxiosRequestConfig): Promise<AxiosResponse<Response>> {
    return this._axios.request<Response>(config);
  }

  public static getInstance(): Connector {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  public static clearInstance(): void {
    delete this._instance;
  }
}
