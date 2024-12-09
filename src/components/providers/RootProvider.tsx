'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface RootProviderProps {
  children: React.ReactNode;
  fontClasses: string;
}

export function RootProvider({ children, fontClasses }: RootProviderProps) {
  return (
    <html lang="en">
      <body className={`${fontClasses} antialiased`}>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </body>
    </html>
  );
}
