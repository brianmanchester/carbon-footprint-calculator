import React, { createContext, useCallback, useContext, useState } from 'react';

type NotificationType = 'error' | 'success';

type Add = (type: NotificationType, message: string) => void;

type Remove = (id: string) => void;

type Notification = {
  id: string;
  message: string;
  type: NotificationType;
};

type Notifications = {
  add: Add;
  notifications: Notification[];
  remove: Remove;
};

const NotificationsContext = createContext<Notifications | undefined>(
  undefined
);

const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const add: Add = useCallback<Add>((type, message) => {
    setNotifications(prevNotifications => [
      ...prevNotifications,
      { id: Date.now().toString(), message, type }
    ]);
  }, []);

  const remove: Remove = useCallback<Remove>(id => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(n => n.id !== id)
    );
  }, []);

  const value: Notifications = {
    add,
    notifications,
    remove
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

const useNotifications = () => {
  const context = useContext(NotificationsContext);

  if (context === undefined) {
    throw new Error(
      'useNotifications must be used within a NotificationsProvider'
    );
  }

  return context;
};

export { NotificationsProvider, useNotifications };
