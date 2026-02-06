import React, { useState } from "react";
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from '@mui/material';
import { AddItemPopupProps } from './interfaces/add-item-popup-props';
import classes from "../../styles/mui-styles";

const AddItemPopup: React.FC<AddItemPopupProps> = ({ open, onClose, onAddItem }) => {
    const [itemContent, setItemContent] = useState('');
    const handleAdd = () => {
        onAddItem(itemContent);
        setItemContent('');
        onClose();
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <Box sx={classes.popupWindow}>
                <DialogTitle>Add New Item</DialogTitle>
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
                    <Button onClick={handleAdd} color="primary" disabled={!itemContent.trim()}>
                        Add
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

export default AddItemPopup;