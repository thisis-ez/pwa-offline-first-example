import { observable, action, runInAction } from 'mobx';

import * as serviceWorker from '../serviceWorker';
import onlineIcon from '../assets/online_icon.svg';
import offlineIcon from '../assets/offline_icon.svg';
import availableOfflineIcon from '../assets/available_offline_icon.svg';
import ToastStore, { Toast } from './Toast.store';

class UIStore {
  @observable public isOnline = true;

  private newVersionNotified = false;

  constructor(private toastStore: ToastStore) {
    /* Service Worker UI Updates */
    serviceWorker.register({
      onSuccess: () => {
        toastStore.addToast(
          new Toast('YAY! App is now available for offline use.', {
            level: 'success',
            img: availableOfflineIcon,
          }));
      },
      onUpdate: () => {
        if (!this.newVersionNotified) {
          toastStore.addToast(
            new Toast('New version is available. To see updates, close all existing tabs and re-open.',
              {
                /*
                 * TODO: for reload toast, use custom service-worker in cra and implement http://bit.ly/2X07jtd
                 * button: 'refresh',
                 */
              }));

          this.newVersionNotified = true;
        }
      },
    });

    /* Offline/Online status */
    runInAction(() => this.isOnline = navigator.onLine || true);
    window.addEventListener('online', this.handleOnlineStatusChanged);
    window.addEventListener('offline', this.handleOnlineStatusChanged);
  }

  @action
  private handleOnlineStatusChanged = () => {
    if (this.isOnline === navigator.onLine) {
      return;
    }

    if (navigator.onLine) {
      /* switched to online */
      this.toastStore.addToast(
        new Toast(
          'You are online now.',
          { img: onlineIcon }));
    } else {
      /* switched to offline */
      this.toastStore.addToast(
        new Toast(
          'You are offline. No worries! changes you make will sync when you go back online.',
          { img: offlineIcon }));
    }

    this.isOnline = navigator.onLine;
  }
}

export default UIStore;
