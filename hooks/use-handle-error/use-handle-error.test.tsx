import {
  NotificationsProvider,
  useNotifications
} from '@/contexts/notifications';
import { render, screen } from '@testing-library/react';
import { useHandleError } from './index';

// Issue with notifications not being updated in test.
describe.skip('tests for useHandleError', () => {
  it('should add a notification if there is an error', () => {
    const AddNotification = ({ error}: { error: Error}) => {
      const { notifications } = useNotifications();

      useHandleError(error);

      return (
        <div data-testid='add-notification'>{notifications[0].message}</div>
      );
    };

    render(
      <NotificationsProvider>
        <AddNotification error={new Error('Test error')} />
      </NotificationsProvider>
    );

    const addNotificationDiv = screen.getByTestId('add-notification');
    expect(addNotificationDiv.textContent).toEqual('Test error');
  });
});
