import { useEffect } from "react";
import { useNotifications } from "@/contexts/notifications"

export const useHandleError = (error: Error | null) => {
  const { add, remove } = useNotifications();

  // `add` and `remove` are stable and won't cause a re-effect
  useEffect(() => {
    let notificationId = '';

    if (error) {
      notificationId = add('error', error.message);
      // Good place to do error tracking/monitoring
    }

    return () => {
      if (error) {
        remove(notificationId);
      }
    };
  }, [add, error, remove]);
}