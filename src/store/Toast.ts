type ToastButton = 'refresh';

export type ToastLevel = 'success' | 'info' | 'warn' | 'error';

export type ToastOptions = {
  button?: ToastButton;
  level?: ToastLevel;
  img?: string;
}

class Toast {
  message: string;
  img?: string;
  level?: string;
  button?: ToastButton;

  constructor(message: string, opts?: ToastOptions) {
    this.message = message;
    this.level = opts && opts.level ? opts.level : 'info';
    this.img = opts && opts.img ? opts.img : undefined;

    /* TODO: implement button */
    // this.button = opts ? opts.button : undefined;
  }
}

export default Toast;
