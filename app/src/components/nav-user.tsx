"use client";

import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@app/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@app/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@app/components/ui/sidebar";
import { useProfileQuery } from "@app/services/user.service";
import { logoutAction } from "@app/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { AvatarImage } from "@radix-ui/react-avatar";

export function NavUser() {
  const t = useTranslations();
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { data, isLoading } = useProfileQuery(null);

  const handleLogoutSession = async () => {
    const res = await logoutAction();
    if (res.error) {
      toast.error(res.title, {
        description: res.message,
      });
      return;
    }
    toast.success(res.title, {
      description: res.message,
    });
    router.push("/");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {isLoading ? (
          <div className="flex items-center h-12 gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2 w-full flex-1">
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-full bg-white flex justify-center items-center">
                    <AvatarImage src={data.avatar} alt={data.name} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{data.name}</span>
                    <span className="truncate text-xs">{data.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-full bg-white flex justify-center items-center">
                      <AvatarImage src={data.avatar} alt={data.name} />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {data.name}
                      </span>
                      <span className="truncate text-xs">{data.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User />
                      {t("general.profile")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings />
                      {t("general.settings")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogoutSession}
                  className="cursor-pointer"
                >
                  <LogOut />
                  {t("general.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
