import { ReactNode } from 'react';
import { BaseLayout } from '../BaseLayout';
import PublicNavbar from './PublicNavbar';
interface Props {
  children: ReactNode;
}
const PublicLayout = ({ children }: Props) => {
  return <BaseLayout sideNav={<PublicNavbar />}>{children}</BaseLayout>;
};

export default PublicLayout;
