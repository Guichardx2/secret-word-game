import type { DefaultLayoutProps } from "./DefaultLayoutProps";

export interface HeaderProps extends Partial<DefaultLayoutProps>  {
    checked: boolean;
    handleSwitchChange: () => void;
    theme: "dark" | "light";
}