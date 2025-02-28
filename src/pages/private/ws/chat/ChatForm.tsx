import { useWebSocketStore } from "@/store/WsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { useAppStore } from "@/store/AppStore";
import { TChatWebSocket } from "@/types/websockets";
import { Button } from "@/components/shadcn/button";
import { IChatMessage } from "@/types/chat";
import { useChatMessagesStore } from "@/store/ChatMessagesStore";
import { SendHorizonal } from "lucide-react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
const formSchema = z.object({
  message: z.string().min(1, "Message is required."),
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
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      clearError();
      setIsLoading(true);
      const message: IChatMessage = {
        message: values.message,
        code: 1,
      };

      const payload = { payload: message };
      appendMessage(message);

      if (ws.current) {
        ws.current.send(JSON.stringify(payload));
      }
      form.reset();

      // The setIsLoading state to false has to be handled by the ws.onmessage event, as the message is sent asynchronously.
    } catch {
      setError("An error occurred. Please try again.");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex items-center rounded-full border">
          <div className="rounded-full mx-1 flex-grow">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={
                        !isConnected
                          ? "Connecting to server..."
                          : "Type a message"
                      }
                      {...field}
                      className="border-0 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button
              variant={"secondary"}
              type="submit"
              disabled={!isConnected || isLoading}
              className="m-1 rounded-full p-3"
            >
              {!isConnected || isLoading ? (
                <LoadingSpinner />
              ) : (
                <SendHorizonal />
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ChatForm;
