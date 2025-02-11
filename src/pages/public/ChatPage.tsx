import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ChatMessage, useChatStore } from '../../store/ChatStore';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useAppStore } from '@/store/AppStore';
import { useCallback } from 'react';

const schema = z.object({
  message: z.string().min(1, 'Message is required.'),
});

type FormFields = z.infer<typeof schema>;

const wsAddress = 'ws://localhost:8080/ws';

const ChatPage = () => {
  const chatMessages = useChatStore((state) => state.messages);
  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const addMessage = useChatStore((state) => state.addMessage);

  const onMessage = useCallback(
    (msg: ChatMessage) => {
      addMessage(msg);
    },
    [addMessage]
  );
  const { ws } = useWebSocket({ wsAddress, onMessage });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const submitForm: SubmitHandler<FormFields> = async (data) => {
    try {
      setIsLoading(true);
      const payload = {
        message: data.message,
        type: 'user',
      };
      console.log(JSON.stringify(payload));
      if (ws.current) {
        ws.current.send(JSON.stringify(payload));
      }
    } catch {
      setError('root', {
        message: 'An error ocurred',
      });
    }
  };
  return (
    <div className="flex flex-col items-center py-12 gap-4">
      <h1>Chat</h1>
      <section>
        <h2>Chat conversation</h2>
        <ul>
          <li>{JSON.stringify(chatMessages).toString()}</li>
        </ul>
      </section>
      <section>
        <form onSubmit={handleSubmit(submitForm)}>
          <input {...register('message')} className="border rounded-md" />
          {errors.message && (
            <span className="text-red-500">{errors.message.message}</span>
          )}
          <button
            disabled={isLoading}
            type="submit"
            className="bg-green-600 px-2 py-1 rounded-md hover:cursor-pointer"
          >
            {isLoading ? 'Loading' : 'Send'}
          </button>
          {errors.root && (
            <span className="text-red-500">{errors.root.message}</span>
          )}
        </form>
      </section>
    </div>
  );
};

export default ChatPage;
