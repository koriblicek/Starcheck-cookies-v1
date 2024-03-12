import { Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Link, Slide, Stack, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { BUTTON_ICON_SIZE, EnumCookieCategories, EnumUserAction, STARCHECK_LINK } from 'src/types';
import { mdiClose } from '@mdi/js';
import { mdiCog } from '@mdi/js';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';
import { useTranslation } from 'react-i18next';
import { cookiesUserDataActions } from 'src/store/data/cookiesUserDataSlice';
import Icon from '@mdi/react';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} unmountOnExit />;
});

export interface IBasicConsentDialogProps {
    isOpened: boolean;
    onClose: () => void;
    onMoreDetails: () => void;
}

export function BasicConsentDialog({ isOpened, onClose, onMoreDetails }: IBasicConsentDialogProps) {

    const dispatch = useDispatch();

    const { userData } = useAppSelector(state => state.cookiesUserData);

    const [isChanged, setIsChanged] = useState<boolean>(userData.action !== EnumUserAction.NO_ACTION);

    useEffect(() => {
        setIsChanged(userData.data.length > 1);
    }, [userData]);

    const { t } = useTranslation();

    return (
        <Dialog
            open={isOpened}
            TransitionComponent={Transition}
            slotProps={{ backdrop: { style: { visibility: 'hidden' } } }}
            PaperProps={{ elevation: 10 }}
            sx={{ maxWidth: 350, "& .MuiDialog-container": { alignItems: 'flex-end', justifyContent: 'flex-start' } }}
        >
            <Grid container justifyContent='space-between' alignItems='center' sx={{ p: 1 }}>
                <Grid item>
                    <DialogTitle variant='body1' sx={{ p: 0 }}>
                        {t('dialogs.using_cookies_title')}
                    </DialogTitle>
                </Grid>
                <Grid item sx={{ position: 'absolute', right: 8 }}>
                    <IconButton
                        aria-label="close"
                        size='small'
                        title={t('controls.close')}
                        onClick={onClose}
                    >
                        <Icon path={mdiClose} size={BUTTON_ICON_SIZE} />
                    </IconButton>

                </Grid>
            </Grid>
            <DialogContent dividers sx={{ p: 1 }}>
                <Typography variant='subtitle2'>
                    {t('dialogs.using_cookies_text')}
                </Typography>
                <Stack direction='column' gap={0}>
                    {Object.values(EnumCookieCategories).map((value) => {
                        const isNecessary = value === EnumCookieCategories.NECESSARY;
                        return (
                            <FormControlLabel
                                key={value}
                                control={
                                    <Checkbox
                                        size='medium'
                                        sx={{ p: .5, ml: 1 }}
                                        disabled={isNecessary}
                                        checked={userData.data.includes(value)}
                                        onChange={() => {
                                            dispatch(cookiesUserDataActions.toggleCategory({ category: value }));
                                            setIsChanged(true);
                                        }}
                                        color={isNecessary ? 'default' : 'primary'}
                                    />
                                }
                                label={t(`controls.cookie_${value}`)}
                            />
                        );
                    })
                    }
                </Stack>
                <Stack direction='column' gap={1}>
                    <Button color="primary" variant="text" size="small" sx={{ borderRadius: 0 }} startIcon={<Icon path={mdiCog} size={BUTTON_ICON_SIZE} />}
                        onClick={() => {
                            onMoreDetails();
                        }}
                    >
                        {t('controls.more_details')}
                    </Button>
                    {
                        isChanged
                            ?

                            <Button color="primary" variant="contained" sx={{ borderRadius: 0 }}
                                onClick={() => {
                                    dispatch(cookiesUserDataActions.saveUserCookies({ action: EnumUserAction.ACCEPTED_SELECTED }));
                                    setIsChanged(true);
                                    onClose();
                                }}
                            >
                                {t('controls.save_and_close')}
                            </Button>
                            :
                            <Button color="primary" variant="contained" sx={{ borderRadius: 0 }}
                                onClick={() => {
                                    dispatch(cookiesUserDataActions.saveUserCookies({ action: EnumUserAction.ACCEPTED_ALL }));
                                    setIsChanged(true);
                                    onClose();
                                }}
                            >
                                {t('controls.accept_all')}
                            </Button>
                    }
                    <Button color="primary" variant="outlined" sx={{ borderRadius: 0 }}
                        onClick={() => {
                            dispatch(cookiesUserDataActions.saveUserCookies({ action: EnumUserAction.REJECTED }));
                            setIsChanged(true);
                            onClose();
                        }}
                    >
                        {t('controls.reject_all')}
                    </Button>
                    <Link variant='caption' underline='hover' textAlign={'center'} target='_blank' href={STARCHECK_LINK}>{t('controls.created_by_starcheck_sk')}</Link>
                </Stack>
            </DialogContent>
        </Dialog>);
}
