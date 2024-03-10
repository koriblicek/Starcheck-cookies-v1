import { Box } from '@mui/material';
import { PropsWithChildren } from 'src/types';

interface ITabPanelProps {
    index: number;
    value: number;
}

export default function TabPanel({ children, value, index, ...other }: PropsWithChildren<ITabPanelProps>) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}