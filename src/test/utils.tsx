import { ReactNode } from 'react';
import { RootProvider } from '@/components/providers/RootProvider';

export function TestWrapper({ children }: { children: ReactNode }) {
  return <RootProvider fontClasses="">{children}</RootProvider>;
}
