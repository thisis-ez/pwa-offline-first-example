import React, { useContext } from 'react';
import { configure } from 'mobx';

/* Stores */
import UIStore from './UI.store';
import ToastStore from './Toast.store';

class Store {
  // public for service worker notifications
  public toastStoreInstance: ToastStore;

  private uiStore: React.Context<UIStore>;
  private toastStore: React.Context<ToastStore>;

  constructor() {
    /* MobX general configuration */
    configure({ enforceActions: 'always' });

    /* Initislize stores */
    const toastStore = new ToastStore();
    const uiStore = new UIStore(toastStore);

    this.uiStore = React.createContext(uiStore);
    this.toastStore = React.createContext(toastStore);
    this.toastStoreInstance = toastStore; // only for service worker notifications
  }

  public useUIStore = () => useContext(this.uiStore);
  public useToastStore = () => useContext(this.toastStore);
}

export default Store;
