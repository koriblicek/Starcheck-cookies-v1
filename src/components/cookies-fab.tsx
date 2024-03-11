import { Fab, Zoom } from "@mui/material";
import { mdiCookieOutline } from '@mdi/js';
import { useTranslation } from "react-i18next";
import Icon from '@mdi/react';

export interface ICookiesFabProps {
    isOpened: boolean;
    onClick: () => void;
}

export function CookiesFab({ isOpened, onClick }: ICookiesFabProps) {

    const { t } = useTranslation();

    return (
        <Zoom in={isOpened}>
            <Fab sx={{ position: 'fixed', bottom: 10, left: 10 }} size='small' color="primary" title={t('titles.cookie_settings')} onClick={onClick}>
                <Icon path={mdiCookieOutline} size={1} />
            </Fab>
        </Zoom>
    );
}
