import { SkeletonPlaceholder } from '@/components/SkeletonPlaceholder';
import { useChatMessagesStore } from '@/store/ChatMessagesStore';
import { useWebSocketStore } from '@/store/WsStore';

export const MessagesDisplay = () => {
  const { messages } = useChatMessagesStore();
  const { isLoading } = useWebSocketStore();
  console.log(messages);
  return (
    <ul className="h-full w-full flex flex-col gap-4 py-2">
      {messages.map((message, i) => {
        if (message.type > 0) {
          return (
            <li key={i} className="text-right italic">
              {message.message}
            </li>
          );
        } else {
          return (
            <li key={i} className="text-left bg-muted px-2 py-2 rounded-md">
              {message.message}
            </li>
          );
        }
      })}
      {isLoading && <SkeletonPlaceholder />}
    </ul>
  );
};
