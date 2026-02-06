import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material';
import { DeleteItemPopupProps } from './interfaces/delete-item-popup-props';

const DeleteItemPopup: React.FC<DeleteItemPopupProps> = ({ open, onClose, item, deleteItem }) => {
    const handleDelete = () => {
        deleteItem();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the item "{item.text}"? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteItemPopup;