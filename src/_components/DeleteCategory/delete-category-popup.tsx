import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, Box } from '@mui/material';
import { DeleteCategoryPopupProps } from './interfaces/delete-category-popup-props';
import classes from '../../_styles/mui-styles';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteCategoryPopup: React.FC<DeleteCategoryPopupProps> = ({ open, onClose, category, deleteCategory }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleConfirmDelete = () => {
        deleteCategory(category.id);
        setDeleteDialogOpen(false);
    };
    return (
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
            <Box sx={classes.popupWindow}>
                <DialogTitle>Delete Category</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete the category "{category.title}" and all of its items? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default DeleteCategoryPopup;


