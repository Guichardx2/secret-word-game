import type { ReactNode } from "react";

export interface DefaultLayoutProps {
  children: ReactNode;
  checked: boolean;
  handleSwitchChange: any;
  theme: "dark" | "light";
}