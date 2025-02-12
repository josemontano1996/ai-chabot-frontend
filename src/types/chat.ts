export interface IChatMessage {
  // Greater than 0 represents a user message
  // Less than 0 represents a bot message
  type: number;
  message: string;
}
