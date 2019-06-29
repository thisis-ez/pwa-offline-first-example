import { observable, action } from 'mobx';

export type ToastButton = 'refresh';

export type ToastLevel = 'success' | 'info' | 'warn' | 'error';

export type ToastOptions = {
  button?: ToastButton;
  level?: ToastLevel;
  img?: string;
}

export class Toast {
  message: string;
  img?: string;
  level?: string;
  button?: ToastButton;

  constructor(message: string, opts?: ToastOptions) {
    this.message = message;
    this.level = opts && opts.level ? opts.level : 'info';
    this.img = opts && opts.img ? opts.img : undefined;

    /* TODO: implement button support */
    // this.button = opts ? opts.button : undefined;
  }
}

class ToastStore {
  @observable
  toasts = observable<Toast>([]);

  @action
  addToast(toast: Toast) {
    this.toasts.push(toast);
  }

  @action
  removeToast(toast: Toast) {
    this.toasts.remove(toast);
  }
}

export default ToastStore;
