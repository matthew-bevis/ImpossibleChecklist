import React, { useState } from "react";
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteCategoryButtonProps } from './interfaces/delete-category-button-props';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useCategories } from '../../contexts/CategoriesContext';


const DeleteCategoryButton: React.FC<DeleteCategoryButtonProps> = ({ category }) => {
    const { deleteCategory } = useCategories();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteCategory(category.id);
        setDeleteDialogOpen(false);
    };

    return (
        <>
            <IconButton
                onClick={handleDeleteClick}
                color="error"
                size='small'
                aria-label={`Delete category ${category.title}`}
            >
                <DeleteIcon />
            </IconButton>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
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
            </Dialog>
        </>
    );
}

export default DeleteCategoryButton;