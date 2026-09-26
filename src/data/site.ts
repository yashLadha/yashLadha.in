import {
  FileText,
  MessageSquare,
  SquareStack,
  type LucideIcon,
} from "lucide-react";
import { Github, Linkedin, Twitter } from "../lib/brandIcons";

export const EMAIL = "admin@yashladha.in";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  keywords?: string;
};

export const navItems: NavItem[] = [
  { href: "/projects", label: "Projects", icon: SquareStack },
  { href: "/blog", label: "Blog", icon: FileText },
  {
    href: "/contactme",
    label: "Collaborate",
    icon: MessageSquare,
    keywords: "contact hire",
  },
];

export type Social = {
  label: string;
  handle: string;
  href: string;
  icon: LucideIcon;
  keywords?: string;
};

export const github: Social = {
  label: "GitHub",
  handle: "yashLadha",
  href: "https://github.com/yashLadha",
  icon: Github,
};

export const socials: Social[] = [
  github,
  {
    label: "LinkedIn",
    handle: "in/yashladha",
    href: "https://www.linkedin.com/in/yashladha/",
    icon: Linkedin,
  },
  {
    label: "X",
    handle: "@yashladha_",
    href: "https://twitter.com/yashladha_",
    icon: Twitter,
    keywords: "twitter",
  },
];
