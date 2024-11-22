/* eslint-disable @typescript-eslint/no-explicit-any */
type Request<TBody> = {
  url: string
  params?: Record<string, string>
  body?: TBody
}

export default interface HttpClient {
  makeRequest<TResponse = any, TBody = any>(req: Request<TBody>): Promise<TResponse>
}