import { useWebSocketStore } from '@/store/WsStore';
import { TChatWebSocket } from '@/types/websockets';
import { useCallback, useEffect, useRef } from 'react';

interface Args<T> {
  wsAddress: string;
  onMessage: (data: T) => void;
  onError?: (error: unknown) => void;
  onOpen?: () => void;
  onClose?: (event: CloseEvent) => void;
}

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
  const { setIsLoading, setIsConnected } = useWebSocketStore();

  // Create a closure that encapsulates WebSocket logic
  const createWebSocketHandler = useCallback(() => {
    // This closure will have access to the `onMessage`, `onError`, `onOpen`, and `onClose` callbacks
    return () => {
      ws.current = new WebSocket(wsAddress);

      ws.current.onopen = () => {
        console.log('Connected to WebSocket server');
        setIsConnected(true);
        if (onOpen) {
          onOpen();
        }
      };

      ws.current.onmessage = (event) => {
        try {
          setIsLoading(true);
          const data = JSON.parse(event.data) as T;
          onMessage(data);
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
        setIsConnected(false);
        if (onError) {
          onError(error);
        }
      };

      ws.current.onclose = (event) => {
        setIsConnected(false);
        console.log(
          'Disconnected from WebSocket server',
          event.code,
          event.reason
        );
        ws.current = null;
        if (onClose) {
          onClose(event);
        }
        if (!event.wasClean) {
          console.log('Disconnected, attempting to reconnect...');
          setTimeout(createWebSocketHandler(), 3000); // Reconnect using the closure
        }
      };
    };
  }, [wsAddress, onMessage, onError, onOpen, onClose, setIsLoading, setIsConnected]);

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
