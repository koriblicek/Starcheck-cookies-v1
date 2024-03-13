import { Theme, createTheme, getContrastRatio } from "@mui/material";
import { getErrorColor, getSuccessColor, getWarningColor, triadic } from "./utils";

export class CustomTheme {
    __color: string;
    __theme: Theme;

    constructor(color: string) {
        this.__color = color;
        const { primary: primaryBase, left: secondaryBase, right: infoBase } = triadic(color);
        const errorBase = getErrorColor(primaryBase);
        const successBase = getSuccessColor(primaryBase);
        const warningBase = getWarningColor(primaryBase);
        this.__theme = createTheme({
            palette: {
                primary: {
                    main: primaryBase,
                    contrastText: getContrastRatio(primaryBase, '#fff') > 4.5 ? '#fff' : '#111',
                },
                secondary: {
                    main: secondaryBase,
                    contrastText: getContrastRatio(secondaryBase, '#fff') > 4.5 ? '#fff' : '#111',
                },
                info: {
                    main: infoBase,
                    contrastText: getContrastRatio(infoBase, '#fff') > 4.5 ? '#fff' : '#111',
                },
                success: {
                    main: successBase,
                    contrastText: getContrastRatio(successBase, '#fff') > 4.5 ? '#fff' : '#111',
                },
                error: {
                    main: errorBase,
                    contrastText: getContrastRatio(errorBase, '#fff') > 4.5 ? '#fff' : '#111',
                },
                warning: {
                    main: warningBase,
                    contrastText: getContrastRatio(warningBase, '#fff') > 4.5 ? '#fff' : '#111',
                },
                tonalOffset: 0.25
            },
            components: {
                MuiButton: {
                    styleOverrides: {
                        root: {
                            // color: '',
                            "&:hover": {
                                color: primaryBase,
                            }
                        },
                        outlined: {
                            "&:hover": {
                                color: primaryBase,
                            }
                        },
                        contained: {
                            "&:hover": {
                                color: getContrastRatio(primaryBase, '#fff') > 4.5 ? '#fff' : '#111',
                            }
                        },
                        text: {
                            "&:hover": {
                                color: primaryBase,
                            }
                        }
                    }
                },
                MuiIconButton: {
                    styleOverrides: {
                        root: {
                            color: 'inherit',
                            "&:hover": {
                                color: 'inherit'
                            }

                        }
                    }
                },
                MuiFab: {
                    styleOverrides: {
                        root: {
                            color: getContrastRatio(primaryBase, '#fff') > 4.5 ? '#fff' : '#111',
                            "&:hover": {
                                color: getContrastRatio(primaryBase, '#fff') > 4.5 ? '#fff' : '#111',
                            }
                        }
                    }
                },
                MuiTab: {
                    styleOverrides: {
                        root: {
                            color: primaryBase,
                            '&:hover': {
                                color: primaryBase,
                                backgroundColor: 'white'
                            }
                        }
                    }
                }
            }
        });
    }

    getTheme(): Theme {
        return this.__theme;
    }
}