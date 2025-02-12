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
const formSchema = z.object({
  message: z.string().min(1, 'Message is required.'),
});

interface Props {
  ws: TChatWebSocket;
}
const ChatForm = ({ ws }: Props) => {
  const { isLoading, setIsLoading } = useWebSocketStore();
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
      const payload = {
        message: values.message,
        type: 1,
      };
      console.log(JSON.stringify(payload));
      if (ws.current) {
        ws.current.send(JSON.stringify(payload));
      }
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

        <Button type="submit" disabled={isLoading}>
          Send
        </Button>
      </form>
    </Form>
  );
};

export default ChatForm;
