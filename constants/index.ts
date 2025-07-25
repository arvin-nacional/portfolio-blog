import { SidebarLink } from "@/types";

export const themes = [
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  // Light mode has been removed as per user request
  // { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  // { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    label: "Home",
    route: "/",
  },
  {
    imgURL: "/assets/icons/about.svg",
    label: "About",
    route: "/#about",
  },
  {
    imgURL: "/assets/icons/portfolio.svg",
    label: "Portfolio",
    route: "/projects",
  },
  {
    imgURL: "/assets/icons/blog.svg",
    label: "Blog",
    route: "/blog",
  },
  {
    imgURL: "/assets/icons/services.svg",
    label: "Services",
    route: "/#services",
  },
  {
    imgURL: "/assets/icons/send-2.svg",
    label: "Contact",
    route: "/contact",
  },
];
