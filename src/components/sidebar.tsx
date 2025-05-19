"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FileText, Folder, Settings, LogOut, MessageCircle, Briefcase, Zap } from "lucide-react";
import { signOut } from "next-auth/react";

const links = [
  { href: "/blogs", label: "Blogs", icon: FileText },
  { href: "/projects", label: "Projects", icon: Folder },
  { href: "/message", label: "Messages", icon: MessageCircle },
  { href: "/experience", label: "Experiences", icon: Briefcase },
  { href: "/skills", label: "Skills", icon: Zap },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r bg-muted p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 p-2 rounded hover:bg-muted-foreground/10 transition",
              pathname === href && "bg-muted-foreground/10 font-medium"
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
        {/* Logout button */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 p-2 rounded hover:bg-muted-foreground/10 transition text-left"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </aside>
  );
}
