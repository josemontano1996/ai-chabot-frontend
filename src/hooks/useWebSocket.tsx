import { useWebSocketStore } from '@/store/WsStore';
import { useCallback, useEffect, useRef } from 'react';

interface Args<T> {
  wsAddress: string;
  onMessage: (data: T) => void;
  onError?: (error: unknown) => void;
  onOpen?: () => void;
  onClose?: (event: CloseEvent) => void;
}

export type TChatWebSocket = React.RefObject<WebSocket | null>;

export function useWebSocket<T>({
  wsAddress,
  onMessage,
  onError,
  onOpen,
  onClose,
}: Args<T>): {
  ws: TChatWebSocket;
} {
  const ws = useRef<WebSocket | null>(null);
  const { setIsLoading } = useWebSocketStore();

  // Create a closure that encapsulates WebSocket logic
  const createWebSocketHandler = useCallback(() => {
    setIsLoading(true);
    // This closure will have access to the `onMessage`, `onError`, `onOpen`, and `onClose` callbacks
    return () => {
      ws.current = new WebSocket(wsAddress);

      ws.current.onopen = () => {
        console.log('Connected to WebSocket server');
        setIsLoading(false);
        if (onOpen) {
          onOpen();
        }
      };

      ws.current.onmessage = (event) => {
        console.log('Raw message from server:', event.data); // Log the raw message
        try {
          const data = JSON.parse(event.data) as T; // Parse the WebSocket message
          onMessage(data); // Call the callback with the parsed message
        } catch (error) {
          console.error('Error parsing WebSocket message:', error); // Log parsing errors
          if (onError) {
            onError(error);
          }
        } finally {
          setIsLoading(false);
        }
      };

      ws.current.onerror = (error) => {
        if (onError) {
          onError(error);
        }
        setIsLoading(false);
      };

      ws.current.onclose = (event) => {
        console.log(
          'Disconnected from WebSocket server',
          event.code,
          event.reason
        );
        ws.current = null;
        setIsLoading(true);

        if (onClose) {
          onClose(event);
        }
        if (!event.wasClean) {
          console.log('Disconnected, attempting to reconnect...');
          setTimeout(createWebSocketHandler(), 3000); // Reconnect using the closure
        }
      };
    };
  }, [wsAddress, onMessage, onError, onOpen, onClose, setIsLoading]);

  // Initialize WebSocket connection
  useEffect(() => {
    const connect = createWebSocketHandler();
    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [createWebSocketHandler]);

  return { ws };
}
