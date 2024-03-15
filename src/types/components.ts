import { SlideProps } from "@mui/material/Slide";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactNode } from "react";
import { FVoidType } from "./functions";

import { CakeType } from "./cakes";

export type TransitionProps = Omit<SlideProps, "direction">;
type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

export type InputType = {
  name?: string;
  [key: string]: unknown;
};

export type IconBpType = {
  iconName?: string;
  onClick?: FVoidType;
  [key: string]: unknown;
};

export type ButtonType = {
  children?: ReactNode;
  [key: string]: unknown;
};

export type DividerType = {
  children?: ReactNode;
  [key: string]: unknown;
};

export type DialogType = {
  children?: ReactNode;
  stats: [boolean, Dispatch<SetStateAction<boolean>>];
  handleBeforeOpen?: FVoidType;
  handleClose: FVoidType;
  [key: string]: unknown;
};

export type AlertType = {
  children?: ReactNode;
  stats?: boolean;
  handleBeforeOpen?: FVoidType;
  handleClose?: FVoidType;
  autoHideDuration?: number;
  [key: string]: unknown;
};

export type TabPaneType = {
  baseName?: string;
  children?: ReactNode;
  value: number;
  index: number;
  [key: string]: unknown;
};

export type CakeManagerType = {
  [key: string]: unknown;
};

export type CakeEditManagerType = {
  cake: CakeType | null | undefined;
  [key: string]: unknown;
};

export type TabsType = {
  baseName?: string;
  tabs: string[];
  children?: ReactNode;
  defaultTab?: [number, Dispatch<SetStateAction<number>>];
  handleClose?: FVoidType;
  onTabClick?: FVoidType;
  onChange?: FVoidType;
  [key: string]: unknown;
};

export type SvgIconComponent = typeof SvgIcon;
