import { useWebSocket } from "@/hooks/useWebSocket";
import { useCallback } from "react";
import { IChatWebSocketResponse } from "@/types/chat";
import ChatForm from "./ChatForm";
import { MessagesDisplay } from "./MessagesDisplay";
import { useChatMessagesStore } from "@/store/ChatMessagesStore";
import { useAppStore } from "@/store/AppStore";

const wsAddress = "localhost:8080/api/private/ws/chat";

const ChatPage = () => {
  const { messages, appendMessage } = useChatMessagesStore();
  useAppStore();
  const { setError } = useAppStore();
  const onMessage = useCallback(
    (incommingMessage: IChatWebSocketResponse) => {
      if (incommingMessage.error) {
        setError(incommingMessage.error);
        return;
      }
      appendMessage(incommingMessage.payload);
    },
    [appendMessage, setError],
  );

  const { ws } = useWebSocket({ wsAddress, onMessage });

  return (
      <section className="flex h-full w-full max-w-2xl flex-col items-center justify-between space-y-4">
        <h1 className="text-center text-2xl">Chat</h1>

        {messages.length === 0 ? (
          <h2>Hi, welcome to the chat</h2>
        ) : (
          <MessagesDisplay />
        )}
        <ChatForm ws={ws} />
      </section>
  );
};

export default ChatPage;
