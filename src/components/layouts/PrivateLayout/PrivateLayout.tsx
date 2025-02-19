import { BaseLayout } from "../BaseLayout";
import PrivateNavbar from "./PrivateNavbar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const PrivateLayout = ({ children }: Props) => {
  return <BaseLayout sideNav={<PrivateNavbar />}>{children}</BaseLayout>;
};

export default PrivateLayout;
