import axios from "axios";

import HttpClient from "./HttpClient";

export default class AxiosHttpClient implements HttpClient {
  async makeRequest<TResponse, TBody = unknown>(req: {
    url: string;
    params?: Record<string, string>;
    body?: TBody | undefined;
  }): Promise<TResponse> {
    return axios.request<TBody, TResponse>({
      url: req.url,
      params: req.params,
      headers: {
        'Content-Type': 'application/json'
      },
      ...(req.body && { data: req.body })
    })
  }
}
