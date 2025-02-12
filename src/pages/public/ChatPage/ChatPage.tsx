import { useWebSocket } from '@/hooks/useWebSocket';
import { useCallback } from 'react';
import { IChatMessage } from '@/types/chat';
import ChatForm from './ChatForm';
import { MessagesDisplay } from './MessagesDisplay';
import { useChatMessagesStore } from '@/store/ChatMessagesStore';

const wsAddress = 'ws://localhost:8080/ws';

const ChatPage = () => {
  const { messages, setChatMessages } = useChatMessagesStore();
  const onMessage = useCallback(
    (updatedHistory: IChatMessage[]) => {
      setChatMessages(updatedHistory);
    },
    [setChatMessages]
  );

  const { ws } = useWebSocket({ wsAddress, onMessage });

  return (
    <div className="w-full h-screen grid grid-cols-6 gap-6">
      <nav className="col-span-2">This is the side nav</nav>
      <section className="col-span-4 py-6 pr-8 space-y-4 flex flex-col items-center justify-between">
        <h1 className="text-center text-2xl">Chat</h1>

        {messages.length === 0 ? (
          <h2>Hi, welcome to the chat</h2>
        ) : (
          <MessagesDisplay/>
        )}
        <section>
          <ChatForm ws={ws} />
        </section>
      </section>
    </div>
  );
};

export default ChatPage;
