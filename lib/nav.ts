export const NAV_ITEMS = [
  { label: "Home", href: "/#home", target: "home", sections: ["home"] },
  { label: "About", href: "/#about", target: "about", sections: ["about"] },
  { label: "Courses", href: "/#courses", target: "courses", sections: ["method", "courses"] },
  { label: "Community", href: "/#community", target: "community", sections: ["community", "join"] },
  { label: "Partners", href: "/#partners", target: "partners", sections: ["partners"] },
  { label: "Blog", href: "/blog", target: "blog", sections: ["blog"] },
  { label: "Contact", href: "/#contact", target: "contact", sections: ["contact"] },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
