// Create a separate ToastPortal component
"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ToastProvider } from '@heroui/react';

export function ToastPortal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0,
      pointerEvents: 'none',
      zIndex: 100000 
    }}>
      <div style={{ pointerEvents: 'auto' }}>
        <ToastProvider 
          placement="top-center"
          toastProps={{
            classNames: {
              base: "top-0 z-[100000]"
            }
          }}
        />
      </div>
    </div>,
    document.body
  ) : null;
}