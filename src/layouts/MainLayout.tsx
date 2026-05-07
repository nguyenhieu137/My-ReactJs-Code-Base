import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Rocket } from "lucide-react";
import { MENU_ITEMS, MenuItem } from "./navigation";
import { cn } from "@/shared/utils";

interface NavItemProps {
  item: MenuItem;
  onNavigate: () => void;
  level?: number;
}

const NavItem = ({ item, onNavigate, level = 0 }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;

  const isChildActive = (menuItem: MenuItem): boolean => {
    if (menuItem.path && location.pathname.includes(menuItem.path)) return true;
    if (menuItem.children) {
      return menuItem.children.some(isChildActive);
    }
    return false;
  };

  const active = item.path
    ? location.pathname === item.path
    : isChildActive(item);

  // Styling logic based on level
  const isRoot = level === 0;

  if (hasChildren) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "group flex items-center justify-between py-2 text-sm font-medium rounded-lg transition-all duration-200",
            isRoot ? "px-3 mt-1" : "px-3",
            active 
              ? "text-primary-700" 
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
            !isRoot && "border-l border-slate-200 rounded-none ml-3 pl-4"
          )}
        >
          <div className="flex items-center gap-3">
            {item.icon && <span className={cn("text-slate-500", active && "text-primary-600")}>{item.icon}</span>}
            <span>{item.title}</span>
          </div>
          <ChevronDown
            size={14}
            className={cn(
              "text-slate-400 transition-transform duration-200",
              isOpen ? "rotate-0" : "-rotate-90",
              active && "text-primary-600"
            )}
          />
        </button>
        
        {/* Child items container */}
        <div 
           className={cn(
             "grid transition-all duration-300 ease-in-out",
             isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
           )}
        >
          <div className="overflow-hidden">
            <div className={cn("flex flex-col mt-1", isRoot ? "ml-2" : "ml-0")}>
              {item.children!.map((child, index) => (
                <NavItem
                  key={index}
                  item={child}
                  onNavigate={onNavigate}
                  level={level + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <NavLink
      to={item.path || "#"}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 mt-1",
          isRoot ? "px-3" : "py-2 px-3 border-l ml-3 rounded-none pl-4",
          isActive
            ? isRoot 
                ? "bg-primary-50 text-primary-700 shadow-sm" 
                : "border-primary-600 text-primary-700 bg-primary-50/50"
            : isRoot
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                : "border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
        )
      }
    >
      {item.icon && (
        <span className={cn("text-slate-500", active && "text-primary-600")}>
          {item.icon}
        </span>
      )}
      <span>{item.title}</span>
    </NavLink>
  );
};

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col shadow-sm lg:shadow-none",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo/Header */}
        <div className="flex items-center h-16 px-6 border-b border-slate-100 bg-white shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white shadow-sm">
              <Rocket size={18} />
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              Antigravity UI
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">
            Menu
          </div>
          <div className="space-y-1">
            {MENU_ITEMS.map((item, index) => (
              <NavItem
                key={index}
                item={item}
                onNavigate={() => setIsSidebarOpen(false)}
              />
            ))}
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50/50">
        {/* Top Navbar */}
        <header className="h-16 px-4 lg:px-8 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center shrink-0 shadow-sm sticky top-0 z-20">
          <button
            className="lg:hidden p-2 mr-3 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="flex-1 flex justify-between items-center">
            <div className="text-sm font-medium text-slate-600 hidden sm:block">
              Welcome back
            </div>
            {/* Header Right Content (Profile, Notifications, etc.) */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                {/* Profile Placeholder */}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
