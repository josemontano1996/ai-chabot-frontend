import { useWebSocketStore } from '@/store/WsStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/shadcn/form';
import { Input } from '@/components/shadcn/input';
import { useAppStore } from '@/store/AppStore';
import { TChatWebSocket } from '@/types/websockets';
import { Button } from '@/components/shadcn/button';
import { IChatMessage } from '@/types/chat';
import { useChatMessagesStore } from '@/store/ChatMessagesStore';
const formSchema = z.object({
  message: z.string().min(1, 'Message is required.'),
});

interface Props {
  ws: TChatWebSocket;
}
const ChatForm = ({ ws }: Props) => {
  const { isLoading, isConnected, setIsLoading } = useWebSocketStore();
  const { appendMessage } = useChatMessagesStore();
  const { setError, clearError } = useAppStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      clearError();
      setIsLoading(true);
      const message: IChatMessage = {
        message: values.message,
        type: 1,
      };
      
      appendMessage(message);
      
      setTimeout(() => {
           if (ws.current) {
             ws.current.send(JSON.stringify(message));
           }
      }, 5000);
      // if (ws.current) {
      //  ws.current.send(JSON.stringify(message));
      // }
      // The setIsLoading state to false has to be handled by the ws.onmessage event, as the message is sent asynchronously.
    } catch {
      setError('An error occurred. Please try again.');
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!isConnected || isLoading}>
          Send
        </Button>
      </form>
    </Form>
  );
};

export default ChatForm;
