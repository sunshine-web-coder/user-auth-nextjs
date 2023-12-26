"use client"

import { useState } from "react";

export default function useToggleSideBar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return { isSidebarOpen, openSidebar, closeSidebar, toggleSidebar };
}
