declare module "react-icons/*" {
  import type { IconType } from "react-icons";
  const content: { [key: string]: IconType } & { default?: any };
  export = content;
}
