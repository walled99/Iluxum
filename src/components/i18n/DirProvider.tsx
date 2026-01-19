'use client';

import React, { createContext, useContext, useEffect } from 'react';

type Direction = 'ltr' | 'rtl';

const DirContext = createContext<{ dir: Direction }>({ dir: 'ltr' });

export const useDir = () => useContext(DirContext);

export function DirProvider({ 
  children, 
  dir 
}: { 
  children: React.ReactNode; 
  dir: Direction;
}) {
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = dir === 'rtl' ? 'ar' : 'en'; // Simple mapping for now
  }, [dir]);

  return (
    <DirContext.Provider value={{ dir }}>
      {children}
    </DirContext.Provider>
  );
}
