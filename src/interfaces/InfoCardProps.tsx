export interface InfoCardProps {
  title?: string;
  content: string;
  size?: "1" | "2" | "3" | "4" | "5";
  button?: boolean
  onClick?: () => void;
}
