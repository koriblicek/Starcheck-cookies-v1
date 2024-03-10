import { Alert, AlertTitle, Grid, LinearProgress, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import useGetAxiosFunction from "./hooks/useGetAxiosFunction";
import App from "./App";
import './translations/i18n';
import { useDispatch } from "react-redux";
import { IApiData } from "./types";
import { cookiesDataActions } from "./store/data/cookiesDataSlice";

export function AppDataLoader() {

    const dispatch = useDispatch();

    const { error, response, isLoading, axiosFetch } = useGetAxiosFunction<IApiData>();

    const [proceed, setProceed] = useState<boolean>(false);

    useEffect(() => {
        axiosFetch("http://localhost:3000/cookies-api");
    }, [axiosFetch]);

    useEffect(() => {
        if (response) {
            //initialize loaded data
            dispatch(cookiesDataActions.initializerData({ data: response.cookies }));
            setProceed(true);
        }
        if (error) {
            console.log(error);
        }
    }, [response, error, dispatch]);

    return (
        <Fragment>
            {proceed && <App />}
            {isLoading &&
                <Grid container p={1}>
                    <Grid item xs textAlign='center'>
                        <Typography>Loading css classes...</Typography>
                        <LinearProgress />
                    </Grid>
                </Grid>
            }
            {
                error &&
                <Alert variant="standard" color="error">
                    <AlertTitle>{error.code}</AlertTitle>
                    <Typography variant="body1">{error.message}</Typography>
                    <Typography variant="subtitle1">{error.url}</Typography>
                </Alert>
            }
        </Fragment>
    );

}
