import { Separator } from "@/components/shadcn/separator";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  Sidebar,
} from "@/components/shadcn/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Home, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Account",
    url: "#",
    icon: Settings,
  },
];

const logoutText = {
  title: "Log out",
  icon: LogOut,
};

const PrivateNavbar = () => {
  const { removeAuthToken } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    removeAuthToken();
    navigate("/", {
      replace: true,
    });
  };
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Separator />
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onLogout} className='mt-2'>
                  <logoutText.icon />
                  <span>{logoutText.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default PrivateNavbar;
