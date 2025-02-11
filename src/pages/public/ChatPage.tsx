import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  message: z.string().min(1, 'Message is required.'),
});

type FormFields = z.infer<typeof schema>;

const ChatPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const submitForm: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
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
          <li>hoa</li>
          <li>mesg2</li>
        </ul>
      </section>
      <section>
        <form onSubmit={handleSubmit(submitForm)}>
          <input {...register('message')} className="border rounded-md" />
          {errors.message && (
            <span className="text-red-500">{errors.message.message}</span>
          )}
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-green-600 px-2 py-1 rounded-md hover:cursor-pointer"
          >
            {isSubmitting ? 'Loading' : 'Send'}
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
