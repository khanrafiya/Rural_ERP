import { useEffect } from 'react';
import { requestNotificationPermission, onMessageListener } from '../lib/firebase';
import { toast } from 'sonner';

export const useNotifications = () => {
  useEffect(() => {
    requestNotificationPermission();

    const listen = async () => {
      while (true) {
        const payload: any = await onMessageListener();
        toast(payload.notification.title, {
          description: payload.notification.body,
          duration: 5000,
        });
      }
    };

    listen();
  }, []);
};