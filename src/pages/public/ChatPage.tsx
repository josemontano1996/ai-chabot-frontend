import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  message: z.string().min(1, 'Message is required.'),
});

interface WSMessage {
  type: string;
  message: string;
}

type History = WSMessage[];

type FormFields = z.infer<typeof schema>;

const wsAddress = 'ws://localhost:8080/ws';

const ChatPage = () => {
  const ws = useRef<WebSocket | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<History>([]);

  const connectWebSocket = useCallback(() => {
    // Function to establish and re-establish connection
    ws.current = new WebSocket(wsAddress);

    ws.current.onopen = () => {
      console.log('connected to ws');
    };

    ws.current.onmessage = (event) => {
      try {
        const parsedMessage = JSON.parse(event.data);
        setHistory((prevMessages) => [...prevMessages, parsedMessage]); // Access the message field
      } catch (error) {
        console.error('Error parsing message:', error, event.data);
      } finally {
        setIsLoading(false);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = (event) => {
      console.log(
        'Disconnected from WebSocket server',
        event.code,
        event.reason
      );
      ws.current = null;
      if (!event.wasClean) {
        console.log('Disconnnected, attempting to reconnect...');
        setTimeout(connectWebSocket, 3000);
      }
    };
  }, []);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connectWebSocket]);

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
          <li>{JSON.stringify(history).toString()}</li>
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
