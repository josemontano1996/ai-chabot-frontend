export interface IChatMessage {
  // Greater than 0 represents a user message
  // Less than 0 represents a bot message
  code: number;
  message: string;
}

export interface IChatWebSocketResponse {
  payload: IChatMessage;
  error: string;
}
