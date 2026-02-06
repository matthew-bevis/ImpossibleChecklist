import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ErrorDisplayProps } from './interfaces/error-display-props';

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
    error, 
    onRetry, 
    showRetry = true 
}) => {
    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            height="200px"
            gap={2}
        >
            <Typography variant="h6" color="error">
                Error: {error}
            </Typography>
            {showRetry && onRetry && (
                <Button variant="contained" onClick={onRetry}>
                    Try Again
                </Button>
            )}
        </Box>
    );
};

export default ErrorDisplay;