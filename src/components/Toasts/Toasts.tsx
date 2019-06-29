import React from 'react';
import { observer } from 'mobx-react-lite';

import ToastStore, { Toast } from '../../store/Toast.store';
import closeIcon from '../../assets/close_icon.svg';
import Store from '../../store';
import './Toasts.css';

type ToastNotificationProps = {
  toast: Toast;
  toastStore: ToastStore;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ toastStore, toast }) => {
  return (
    <div className="toast">

      <div className="toast-content">
        {toast.img ? (
          <div className="toast-image">
            <img src={toast.img} alt="" />
          </div>
        ) : null}

        <div className={['toast-message', `toast-message-${toast.level}`].join(' ')}>
          {toast.message}
        </div>
      </div>

      <button
        type="button"
        className="toast-close-button"
        onClick={() => toastStore.removeToast(toast)}>
        <img src={closeIcon} alt="close" />
      </button>
    </div>
  );
};

export type ToastsProps = {
  store: Store;
}

const Toasts: React.FC<ToastsProps> = ({ store }) => {
  const toastStore = store.useToastStore();

  return (
    <React.Fragment>
      <div className="toasts-container">
        {toastStore.toasts
          .map((toast, idx) => (<ToastNotification key={idx} toast={toast} toastStore={toastStore} />))}
      </div>

      {
        /*
        * We always request the close icon and hide it with css,
        * so when we go offline we'll have it in cache for sure.
        */
      }
      <div className="hidden-toast-close-button">
        <img src={closeIcon} alt="close" />
      </div>
    </React.Fragment>
  );
}

export default observer(Toasts);
