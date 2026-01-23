import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Save } from '@mui/icons-material';
import { SaveButtonProps } from './interfaces/save-button-props';

const SaveButton: React.FC<SaveButtonProps> = ({ 
    hasUnsavedChanges, 
    isSaving, 
    onSave, 
    disabled = false 
}) => {
    const handleSave = async () => {
        await onSave();
    };

    return (
        <Button
            variant="contained"
            startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <Save />}
            onClick={handleSave}
            disabled={disabled || !hasUnsavedChanges || isSaving}
            sx={{
                position: 'fixed',
                top: 16,
                right: 16,
                zIndex: 1100,
                backgroundColor: hasUnsavedChanges ? '#1976d2' : '#ccc',
                '&:hover': {
                    backgroundColor: hasUnsavedChanges ? '#115293' : '#ccc'
                },
                '&:disabled': {
                    backgroundColor: '#ccc',
                    color: '#999'
                }
            }}
        >
            {isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Saved'}
        </Button>
    );
};

export default SaveButton;
