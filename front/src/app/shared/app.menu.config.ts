import { MenuRootItem } from "ontimize-web-ngx";

export const MENU_CONFIG: MenuRootItem[] = [
  {
    id: "home",
    name: "HOME",
    icon: "home",
    route: "/main/home",
  },
  {
    id: "expenses",
    name: "EXPENSES",
    route: "/main/expenses",
    icon: "trending_down",
    confirm: "yes",
  },
  {
    id: "incomes",
    name: "INCOMES",
    route: "/main/incomes",
    icon: "trending_up",
    confirm: "yes",
  },
  {
    id: "groups",
    name: "GROUPS",
    route: "/main/groups",
    icon: "diversity_1",
    confirm: "yes",
  },
  {
    id: "goals",
    name: "GOALS",
    route: "/main/goals",
    icon: "flag",
    confirm: "yes",
  },
  {
    id: "logout",
    name: "LOGOUT",
    route: "/login",
    icon: "power_settings_new",
    confirm: "yes",
  },
];
