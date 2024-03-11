import { AppGetUserCookie } from './AppGetUserCookie.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { CustomTheme } from './theme/theme.ts';
import { ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';

const theme = new CustomTheme('#2a7163').getTheme();

ReactDOM.createRoot(document.getElementById('APICOOKIES-root')!).render(
    // <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <AppGetUserCookie />
        </ThemeProvider>
    </Provider>
    // </React.StrictMode>,
);
