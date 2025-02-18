import { useToast } from '@/hooks/use-toast';
import { Toaster } from '../shadcn/toaster';
import { useAppStore } from '@/store/AppStore';
import { useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

const AppErrorToast = () => {
  const { toast } = useToast();
  let { error } = useAppStore();
  error = 'Error message';
  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: <ErrorDescription error={error} />,
      });
    }
  }, [error, toast]);

  return <Toaster />;
};

const ErrorDescription = ({ error }: { error: string }) => {
  return (
    <div className="flex items-center text-lg gap-2">
      <ShieldAlert />
      <p>{error}</p>
    </div>
  );
};

export default AppErrorToast;
