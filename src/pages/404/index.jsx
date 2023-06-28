import React from 'react';
import { Box, Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

const primary = lightBlue[500];

const Page404 = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: primary,
            }}
        >
            <Typography variant="h1" style={{ color: 'white' }}>
                404
            </Typography>
        </Box>
    );
}

export default Page404;
