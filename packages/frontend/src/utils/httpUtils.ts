import { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';

class AxiosServiceController extends Axios {
  constructor() {
    super({ baseURL: ROOT_URL });
    this.initInterceptors();
  }
  private initInterceptors() {
    this.interceptors.request.use(this.contentTypeInterceptor);
  }
  // add interceptor functions and initInterceptors()
  // when we need them

  private contentTypeInterceptor(config: AxiosRequestConfig) {
    if (typeof config.data == 'string') config.headers = { 'content-type': 'application/json' };

    // Add more as needed, might change the ifs with a switch

    return config;
  }
  public handleFetch(response: AxiosResponse<string>) {
    if (response.status == 200 || response.status == 201) {
      return JSON.parse(response.data);
    } else throw JSON.parse(response.data);
  }
}

export const ROOT_URL = 'http://localhost:3000/';

type gvmInnerError = {
  code: string;
  innerError: gvmInnerError;
};

type gvmError = {
  code: string;
  message: string;
  target?: string;
  details?: gvmError[] | null;
  innerError?: gvmInnerError | null;
};

//needs to be console.loggable
export class gvmHttpErrorResponse {
  constructor(public error: gvmError, public code: number, public message: string, public url: string) {}
}

export const AxiosService = new AxiosServiceController();
