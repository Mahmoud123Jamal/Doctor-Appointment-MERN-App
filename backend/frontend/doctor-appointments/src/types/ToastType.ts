type ToastPosition =
  | "top-right"
  | "top-center"
  | "top-left"
  | "bottom-right"
  | "bottom-center"
  | "bottom-left";

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  autoClose?: number | false;
}
