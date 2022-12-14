import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react';

type NotificationType = 'error' | 'success';

type Add = (type: NotificationType, message: string) => string;

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

const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const add: Add = useCallback<Add>((type, message) => {
    const id = Date.now().toString();

    setNotifications(prevNotifications => [
      ...prevNotifications,
      { id, message, type }
    ]);

    return id;
  }, []);

  const remove: Remove = useCallback<Remove>(id => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(n => n.id !== id)
    );
  }, []);

  return (
    <NotificationsContext.Provider value={{ add, notifications, remove }}>
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
