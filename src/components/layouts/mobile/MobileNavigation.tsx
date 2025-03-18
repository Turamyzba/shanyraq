"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MobileNavigation.module.scss";
import { HomeIcon, FileTextIcon, PlusIcon, MessageSquareIcon, UserIcon } from "lucide-react";

export default function MobileNavigation() {
  const pathname = usePathname();

  const navItems = [
    { name: "Главная", path: "/", icon: HomeIcon },
    { name: "Мои объявления", path: "/my-announcements", icon: FileTextIcon },
    { name: "Создать", path: "/my-announcements/create-announcements", icon: PlusIcon },
    { name: "Мои отклики", path: "/my-responses", icon: MessageSquareIcon },
    { name: "Профиль", path: "/profile", icon: UserIcon },
  ];

  return (
    <nav className={styles.mobileNav}>
      {navItems.map((item) => {
        const isActive =
          pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
        return (
          <Link
            href={item.path}
            key={item.path}
            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
          >
            <item.icon size={24} className={styles.icon} color={isActive ? "#1AA683" : "#9CA3AF"} />
            <span className={styles.label}>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
