import React from 'react';
import { observer } from 'mobx-react-lite';

import Store from './store';
import Toasts from './components/Toasts';
import offlineIcon from './assets/offline_icon.svg';
import './offline-ux.css';

import './App.css';

const store = new Store();

const App = () => {
  const uiStore = store.useUIStore();

  return (
    <div className="App" >
      <header className="App-header" >

        {
          /*
          * We always request the offline icon and hide it with css,
          * so when we go offline we'll have it in cache.
          */
        }
        <img
          src={offlineIcon}
          className={[
            'offline-icon',
            uiStore.isOnline ? 'offline-icon-hidden' : '',
          ].join(' ')}
          alt="offline" />

        <p>
          Offline UX/UI for PWA
        </p>
      </header>
      <Toasts store={store} />
    </div>
  );
};

export default observer(App);
