import { ChatMessage, useChatStore } from '../../store/ChatStore';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useCallback } from 'react';
import ChatForm from '@/components/forms/ChatForm';

const wsAddress = 'ws://localhost:8080/ws';

const ChatPage = () => {
  const { messages, addMessage } = useChatStore();

  const onMessage = useCallback(
    (msg: ChatMessage) => {
      addMessage(msg);
    },
    [addMessage]
  );

  const { ws } = useWebSocket({ wsAddress, onMessage });

  return (
    <div className="flex flex-col items-center py-12 gap-4">
      <h1>Chat</h1>
      <section>
        <h2>Chat conversation</h2>
        <ul>
          <li>{JSON.stringify(messages).toString()}</li>
        </ul>
      </section>
      <section>
        <ChatForm ws={ws} />
      </section>
    </div>
  );
};

export default ChatPage;
