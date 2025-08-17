import {
  Activity,
  Briefcase,
  Building,
  CircleDollarSign,
  Contact,
  HandCoins,
  Home,
  Layers,
  ListCheck,
  MapPin,
  Receipt,
  ShieldCheck,
  Tag,
  Tags,
  TriangleAlert,
  Truck,
  Users,
} from "lucide-react";

export const NAVIGATION = [
  {
    title: "dashboard",
    icon: Home,
    link: "/dashboard",
    group: false,
  },
  {
    title: "manage_clients",
    group: true,
    items: [
      {
        title: "branches",
        url: "/branches",
        icon: Building,
      },
      {
        title: "clients",
        url: "/clients",
        icon: Users,
      },
    ],
  },
  {
    title: "manage_quotes",
    group: true,
    items: [
      {
        title: "providers",
        url: "/providers",
        icon: Truck,
      },
      {
        title: "prices",
        url: "/prices",
        icon: CircleDollarSign,
      },
      {
        title: "activities",
        url: "/activities",
        icon: Activity,
      },
      {
        title: "service_categories",
        url: "/service_categories",
        icon: Tag,
      },
      {
        title: "services",
        url: "/services",
        icon: Tags,
      },
      {
        title: "quotes",
        url: "/quotes",
        icon: Layers,
      },
    ],
  },
  {
    title: "manage_projects",
    group: true,
    items: [
      {
        title: "employees",
        url: "/employees",
        icon: Contact,
      },
      {
        title: "projects",
        url: "/projects",
        icon: Briefcase,
      },
      {
        title: "tasks",
        url: "/tasks",
        icon: ListCheck,
      },
    ],
  },
  {
    title: "settings",
    group: true,
    items: [
      {
        title: "addresses",
        url: "/addresses",
        icon: MapPin,
      },
      {
        title: "vats",
        url: "/vats",
        icon: HandCoins,
      },
      {
        title: "admin_expenses",
        url: "/admin_expenses",
        icon: ShieldCheck,
      },
      {
        title: "contingency_expenses",
        url: "/contingency_expenses",
        icon: TriangleAlert,
      },
      {
        title: "utility_expenses",
        url: "/utility_expenses",
        icon: Receipt,
      },
    ],
  },
];
