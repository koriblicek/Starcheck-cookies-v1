import { AppGetUserCookie } from './AppGetUserCookie.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import ReactDOM from 'react-dom/client';
import './translations/i18n';

const rootElement = document.getElementById('APICOOKIES-root');

console.log("COOKIEAPI-Visual is running...");

if (rootElement) {

    // const dataId = document.currentScript?.getAttribute("data-id");
    const dataColor = rootElement.getAttribute("data-color");
    const dataLng = rootElement.getAttribute("data-lng");

    ReactDOM.createRoot(rootElement).render(
        // <React.StrictMode>
        <Provider store={store}>
            {/* <CacheProvider value={cache}> */}
                <AppGetUserCookie lng={dataLng ? dataLng : "gb"} color={dataColor ? dataColor : "#000000"} />
            {/* </CacheProvider> */}
        </Provider>
        // </React.StrictMode>,
    );
}