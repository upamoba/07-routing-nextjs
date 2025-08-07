'use client';

import { PropsWithChildren, ReactNode } from 'react';

interface ModalLayoutProps {
  children?: ReactNode;
}
export default function ModalLayout({ children }: PropsWithChildren<ModalLayoutProps>) {
  if (!children) return null;
  return <>{children}</>;
}