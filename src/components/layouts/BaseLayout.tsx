import { ReactNode } from "react";
import AppErrorToast from "./AppErrorToast";
import { SidebarProvider, SidebarTrigger } from "../shadcn/sidebar";

interface Props {
  sideNav: ReactNode;
  children: ReactNode;
}
export const BaseLayout = ({ sideNav, children }: Props) => {
  return (
    <>
      <AppErrorToast />
      <SidebarProvider>
        <div className="flex h-screen w-full gap-6">
          <nav>{sideNav}</nav>
          <main className="relative h-full w-full max-w-7xl py-12">
            <div className="absolute left-4 top-4">
              <SidebarTrigger />
            </div>
            <div className="flex h-full w-full flex-col items-center">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};
//   <div className="w-full h-screen grid grid-cols-6 gap-6">
//     <nav className="col-span-2">{sideNav}</nav>
//     <main className="col-span-4 py-6">{children}</main>
//   </div>;
