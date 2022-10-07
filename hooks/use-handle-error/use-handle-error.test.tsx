import {
  NotificationsProvider,
  useNotifications
} from '../../contexts/notifications';
import { render, screen } from '@testing-library/react';
import { useHandleError } from './index';

describe('tests for useHandleError', () => {
  it('should add a notification if there is an error', () => {
    const AddNotification = () => {
      const { notifications } = useNotifications();
      const error = new Error('Test error');
      useHandleError(error);

      return (
        <div data-testid='add-notification'>{notifications[0].message}</div>
      );
    };

    render(
      <NotificationsProvider>
        <AddNotification />
      </NotificationsProvider>
    );

    const addNotificationDiv = screen.getByTestId('add-notification');
    expect(addNotificationDiv.textContent).toEqual('Test error');
  });
});
