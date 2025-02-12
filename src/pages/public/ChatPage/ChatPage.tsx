import { useWebSocket } from '@/hooks/useWebSocket';
import { useCallback, useState } from 'react';
import { IChatMessage } from '@/types/chat';
import ChatForm from './ChatForm';

const wsAddress = 'ws://localhost:8080/ws';

const ChatPage = () => {
  const [messageHistory, setMessageHistory] = useState<IChatMessage[]>([]);
  const onMessage = useCallback(
    (updatedHistory: IChatMessage[]) => {
      setMessageHistory(updatedHistory);
    },
    [setMessageHistory]
  );

  const { ws } = useWebSocket({ wsAddress, onMessage });
  console.log(messageHistory);
  return (
    <div className="max-w-xl py-12 gap-4">
      <h1>Chat</h1>
      <section>
        <h2>Chat conversation</h2>
        <ul>
          {messageHistory.map((message, i) => {
            if (message.type > 0) {
              return (
                <li key={i} className="text-right">
                  {message.message}
                </li>
              );
            } else {
              return (
                <li key={i} className="text-left">
                  {message.message}
                </li>
              );
            }
          })}
        </ul>
      </section>
      <section>
        <ChatForm ws={ws} />
      </section>
    </div>
  );
};

export default ChatPage;
