import React, { createContext, useContext, useState, ReactNode } from 'react';
import Components from '../components';

type ToastProps = {
  id?: string;
  title: string;
  message: string;
  variant?: 'success' | 'error' | 'info';
};

interface ToastContextType {
  showToast: (toast: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toastData, setToastData] = useState<ToastProps | null>(null);

  const showToast = (toast: ToastProps) => {
    setToastData(toast);
    setTimeout(() => {
      setToastData(null); // auto-hide after 3s
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastData && (
        <Components.CustomToastMessage
          id={toastData.id || 'global_toast'}
          title={toastData.title}
          message={toastData.message}
          variant={toastData.variant || 'info'}
          onPress={() => setToastData(null)}
        />
      )}
    </ToastContext.Provider>
  );
};
