import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import { EditItemPopupProps } from './interfaces/edit-item-popup-props';

const EditItemPopup: React.FC<EditItemPopupProps> = ({ open, onClose, item, updateItemText }) => {
    const [itemContent, setItemContent] = useState(item.text);

    const handleEdit = () => {
        updateItemText(itemContent);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        autoFocus
                        label="Item Content"
                        fullWidth
                        value={itemContent}
                        onChange={(e) => setItemContent(e.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleEdit} color="primary" disabled={!itemContent.trim()}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditItemPopup;