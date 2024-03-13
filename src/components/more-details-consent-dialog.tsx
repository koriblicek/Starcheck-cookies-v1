import { Button, Dialog, DialogActions, DialogContent, Grid, IconButton, Slide, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import { mdiChevronRight } from '@mdi/js';
import { mdiClose } from '@mdi/js';
import { BUTTON_ICON_SIZE, EnumUserAction, STARCHECK_LINK } from 'src/types';
import { forwardRef, useEffect, useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { useTranslation } from 'react-i18next';
import { CookieDeclaration } from './cookie-declaration';
import { useDispatch } from 'react-redux';
import { cookiesUserDataActions } from 'src/store/data/cookiesUserDataSlice';
import { useAppSelector } from 'src/store/hooks';
import Icon from '@mdi/react';
import TabPanel from './shared/tab-panel';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export interface IMainConsentDialogProps {
    isOpened: boolean;
    onClose: () => void;
}

export function MoreDetailsConsentDialog({ isOpened, onClose }: IMainConsentDialogProps) {

    const dispatch = useDispatch();

    const [value, setValue] = useState<number>(1);

    const { userData } = useAppSelector(state => state.cookiesUserData);

    const [isChanged, setIsChanged] = useState<boolean>(userData.action !== EnumUserAction.NO_ACTION);

    useEffect(() => {
        setIsChanged(userData.data.length > 1);
    }, [userData]);


    const theme = useTheme();
    const fullScreenMode = useMediaQuery(theme.breakpoints.down('sm'));
    //const buttonsFullWidth = useMediaQuery("(max-width:300px)");

    const { t } = useTranslation();

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Dialog
            open={isOpened}
            fullScreen={fullScreenMode}
            TransitionComponent={Transition}
            maxWidth="sm"
            slotProps={{ backdrop: { sx: { backgroundColor: '#ffffff66' } } }}
            sx={{ "& .MuiDialog-container": { alignItems: 'flex-end' } }}
        >
            <Grid container justifyContent='space-between' alignItems='center' sx={{ p: 1 }}>
                <Grid item >
                    <Button
                        size="small"
                        onClick={() => window.open(STARCHECK_LINK, "_blank")}
                        sx={{ borderRadius: 0 }}
                        title={t('titles.starcheck_sk')}
                    >
                        {t('controls.created_by_starcheck_sk')}
                    </Button>
                </Grid>
                <Grid item sx={{ position: 'absolute', right: 8 }}>
                    <IconButton
                        aria-label="close"
                        title={t('controls.close')}
                        onClick={onClose}
                    >
                        <Icon path={mdiClose} size={1} />
                    </IconButton>

                </Grid>
            </Grid>
            <DialogContent dividers >
                <Typography variant='h6'>{t('dialogs.using_cookies_title')}</Typography>
                <Typography variant='subtitle2'>{t('dialogs.using_cookies_text')}</Typography>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                >
                    <Tab label={t('controls.cookie_declaration')} {...a11yProps(0)} />
                    <Tab label={t('controls.about_cookies')} {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <CookieDeclaration onChange={() => {
                        setIsChanged(true);
                    }}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Typography variant="subtitle2">{t('dialogs.about_cookies_text')}</Typography>
                </TabPanel>
            </DialogContent >
            <DialogActions sx={{ p: 1, flexGrow: 0 }}>
                <Grid container justifyContent='flex-end' flexDirection={fullScreenMode ? 'column' : 'row'} gap={1}>
                    {value === 1 &&
                        <Grid item xs>
                            <Button fullWidth={fullScreenMode} variant='outlined' endIcon={<Icon path={mdiChevronRight} size={BUTTON_ICON_SIZE} />} sx={{ borderRadius: 0 }}
                                onClick={() => {
                                    setValue(0);
                                }}
                            >
                                {t('controls.customize')}
                            </Button>
                        </Grid>
                    }
                    <Grid item>
                        <Button fullWidth={fullScreenMode} variant='outlined' sx={{ borderRadius: 0 }}
                            onClick={() => {
                                dispatch(cookiesUserDataActions.saveUserCookies({ action: EnumUserAction.REJECTED }));
                                setIsChanged(true);
                                onClose();
                            }}
                        >
                            {t('controls.reject_all')}
                        </Button>
                    </Grid>
                    <Grid item>
                        {
                            isChanged
                                ?

                                <Button fullWidth={fullScreenMode} color="primary" variant="contained" sx={{ borderRadius: 0 }}
                                    onClick={() => {
                                        dispatch(cookiesUserDataActions.saveUserCookies({ action: EnumUserAction.ACCEPTED_SELECTED }));
                                        setIsChanged(true);
                                        onClose();
                                    }}
                                >
                                    {t('controls.save_and_close')}
                                </Button>
                                :
                                <Button fullWidth={fullScreenMode} variant='contained' sx={{ borderRadius: 0 }}
                                    onClick={() => {
                                        dispatch(cookiesUserDataActions.saveUserCookies({ action: EnumUserAction.ACCEPTED_ALL }));
                                        setIsChanged(true);
                                        onClose();
                                    }}
                                >
                                    {t('controls.accept_all')}
                                </Button>
                        }
                    </Grid>
                </Grid>
            </DialogActions >
        </ Dialog >
    );
}
