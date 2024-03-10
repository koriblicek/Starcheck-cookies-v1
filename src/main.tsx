import ReactDOM from 'react-dom/client';
import { AppGetUserCookie } from './AppGetUserCookie.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <AppGetUserCookie />
  </Provider>
  // </React.StrictMode>,
);
