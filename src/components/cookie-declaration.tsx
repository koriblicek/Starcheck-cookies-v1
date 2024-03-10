import { Grid, Switch, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import { cookiesUserDataActions } from "src/store/data/cookiesUserDataSlice";
import { useAppSelector } from "src/store/hooks";
import { EnumCookieCategories, ICookiesData } from "src/types";
import { isInstance } from "src/utils";

interface ICookieDeclarationItem {
    id: string;
    data: ICookiesData;
    onChange: () => void;
}
function CookieDeclarationItem({ id, data, onChange }: ICookieDeclarationItem) {

    console.log(data);
    
    const dispatch = useDispatch();

    const { userData } = useAppSelector(state => state.cookiesUserData);

    const { t } = useTranslation();

    return (
        <Fragment>
            <Typography variant="h6">{t(`controls.cookie_${id}`)}</Typography>
            <Grid container gap={1} alignItems='center' justifyContent='space-between'>
                <Grid item xs >
                    <Typography variant="caption">{t(`dialogs.cookie_${id}_explanation`)}</Typography>
                </Grid>
                <Grid item>
                    {(isInstance(id, EnumCookieCategories) as boolean) &&
                        <Switch disabled={id === EnumCookieCategories.NECESSARY} checked={userData.data.includes(id as EnumCookieCategories)}
                            onChange={() => {
                                dispatch(cookiesUserDataActions.toggleCategory({ category: id as EnumCookieCategories }));
                                onChange();
                            }}
                        />
                    }
                </Grid>

            </Grid>
        </Fragment>
    );
}
interface ICookieDeclaration {
    onChange: () => void;
}
export function CookieDeclaration({ onChange }: ICookieDeclaration) {

    const { data } = useAppSelector(state => state.cookiesData);

    return (
        <Grid container gap={1}>
            <Grid item>
                <CookieDeclarationItem id={EnumCookieCategories.NECESSARY} data={data} onChange={onChange} />
            </Grid>
            <Grid item>
                <CookieDeclarationItem id={EnumCookieCategories.PREFERENCES} data={data} onChange={onChange} />
            </Grid>
            <Grid item>
                <CookieDeclarationItem id={EnumCookieCategories.STATISTICS} data={data} onChange={onChange} />
            </Grid>
            <Grid item>
                <CookieDeclarationItem id={EnumCookieCategories.MARKETING} data={data} onChange={onChange} />
            </Grid>
            <Grid item>
                <CookieDeclarationItem id="unclasified" data={data} onChange={onChange} />
            </Grid>
        </Grid>
    );
}
