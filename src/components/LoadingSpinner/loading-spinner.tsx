import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LoadingSpinnerProps } from './interfaces/loading-spinner-props';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message, size = 'medium' }) => {
    return (
        <Box 
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
        >
            <CircularProgress 
                size={size === 'small' ? 40 : size === 'large' ? 80 : 60}
            />
            {message && (
                <Typography 
                    variant="body1"
                    sx={{ marginTop: 2 }}
                >
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default LoadingSpinner;