import { SkeletonPlaceholder } from '@/components/shared/SkeletonPlaceholder';
import { useChatMessagesStore } from '@/store/ChatMessagesStore';
import { useWebSocketStore } from '@/store/WsStore';
import { SafeHTMLParser } from '@/components/shared/SafeHTMLParser';

export const MessagesDisplay = () => {
  const { messages } = useChatMessagesStore();
  const { isLoading } = useWebSocketStore();
  console.log(messages);
  return (
    <ul className="h-full w-full flex flex-col gap-4 py-2">
      {messages.map((message, i) => {
        if (message.code === 1) {
          return (
            <li key={i} className="text-right italic">
              {message.message}
            </li>
          );
        } else {
          {
            console.log(message.message);
          }
          return (
            <li key={i} className="text-left bg-muted px-4 py-6 rounded-md">
              <SafeHTMLParser htmlString={message.message} />
            </li>
          );
        }
      })}
      {isLoading && <SkeletonPlaceholder />}
    </ul>
  );
};
