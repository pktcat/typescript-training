export interface HandlerEvent<TRequest> {
  request: TRequest;
}

export interface HandlerResponse<TBody = string> {
  statusCode: number;
  body: TBody;
}

export type Handler<TRequest, TResponseBody = string> = (
  event: HandlerEvent<TRequest>
) => Promise<HandlerResponse<TResponseBody>>;
