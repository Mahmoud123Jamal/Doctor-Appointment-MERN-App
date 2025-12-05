declare module "react-slick" {
  import { ComponentType } from "react";

  export interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    [key: string]: any;
  }

  const Slider: ComponentType<{
    children?: React.ReactNode;
    [key: string]: any;
  }>;

  export default Slider;
}
