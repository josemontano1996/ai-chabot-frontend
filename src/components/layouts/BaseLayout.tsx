import { ReactNode } from 'react';
import AppErrorToast from './AppErrorToast';

interface Props {
  sideNav: ReactNode;
  children: ReactNode;
}
export const BaseLayout = ({ sideNav, children }: Props) => {
  return (
    <>
      <AppErrorToast />
      <div className="w-full h-screen grid grid-cols-6 gap-6">
        <nav className="col-span-2">{sideNav}</nav>
        <main className="col-span-4 py-6">{children}</main>
      </div>
    </>
  );
};
