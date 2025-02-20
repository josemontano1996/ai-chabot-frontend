import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "../shadcn/sidebar";
import AppStatusProvider from '../providers/AppStatusProvider';

interface Props {
  sideNav: ReactNode;
  children: ReactNode;
}
export const BaseLayout = ({ sideNav, children }: Props) => {
  return (
    <AppStatusProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-full gap-6">
          <nav>{sideNav}</nav>
          <main className="relative h-full w-full max-w-7xl py-12">
            <SidebarTrigger />
            <div className="absolute left-4 top-4"></div>
            <div className="flex h-full w-full flex-col items-center">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </AppStatusProvider>
  );
};
//   <div className="w-full h-screen grid grid-cols-6 gap-6">
//     <nav className="col-span-2">{sideNav}</nav>
//     <main className="col-span-4 py-6">{children}</main>
//   </div>;
