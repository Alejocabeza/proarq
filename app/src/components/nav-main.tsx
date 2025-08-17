import { NAVIGATION } from "@app/lib/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export const NavMain = () => {
  const t = useTranslations();
  return (
    <>
      {NAVIGATION.map(
        (item: {
          title: string;
          icon?: LucideIcon;
          link?: string;
          group?: boolean;
          items?: { title: string; url: string; icon: LucideIcon }[];
        }) => {
          if (!item.group) {
            return (
              <SidebarGroup key={item.title}>
                <SidebarGroupContent>
                  <SidebarMenuItem key={item.title} className="list-none">
                    <SidebarMenuButton asChild>
                      <Link href={item.link || "#"}>
                        {item.icon && <item.icon className="shrink-0" />}
                        {t("general." + item.title)}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          } else {
            return (
              <SidebarGroup key={item.title}>
                <SidebarGroupLabel>
                  {t("general." + item.title)}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items &&
                      item.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link href={item.url}>
                              {item.icon && <item.icon className="shrink-0" />}
                              {t("general." + item.title)}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          }
        }
      )}
    </>
  );
};
