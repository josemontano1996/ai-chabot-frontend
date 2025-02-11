import { useAppStore } from '@/store/AppStore';
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
  ws: React.RefObject<WebSocket | null>;
} {
  const ws = useRef<WebSocket | null>(null);
  const setIsLoadingStore = useAppStore((state) => state.setIsLoading);
  
  // Create a closure that encapsulates WebSocket logic
  const createWebSocketHandler = useCallback(() => {
    setIsLoadingStore(true);
    // This closure will have access to the `onMessage`, `onError`, `onOpen`, and `onClose` callbacks
    return () => {
      ws.current = new WebSocket(wsAddress);

      ws.current.onopen = () => {
        console.log('Connected to WebSocket server');
        setIsLoadingStore(false);
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
          setIsLoadingStore(false);
        }
      };

      ws.current.onerror = (error) => {
        if (onError) {
          onError(error);
        }
        setIsLoadingStore(false);
      };

      ws.current.onclose = (event) => {
        console.log(
          'Disconnected from WebSocket server',
          event.code,
          event.reason
        );
        ws.current = null;
        setIsLoadingStore(true);

        if (onClose) {
          onClose(event);
        }
        if (!event.wasClean) {
          console.log('Disconnected, attempting to reconnect...');
          setTimeout(createWebSocketHandler(), 3000); // Reconnect using the closure
        }
      };
    };
  }, [wsAddress, onMessage, onError, onOpen, onClose, setIsLoadingStore]);

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
