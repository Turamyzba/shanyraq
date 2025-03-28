'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef(store);
  
  return <Provider store={storeRef.current}>{children}</Provider>;
}