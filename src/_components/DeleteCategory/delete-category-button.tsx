import React, { useState } from "react";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteCategoryButtonProps } from './interfaces/delete-category-button-props';
import { useCategories } from '../../contexts/CategoriesContext';
import DeleteCategoryPopup from "./delete-category-popup";


const DeleteCategoryButton: React.FC<DeleteCategoryButtonProps> = ({ category }) => {
    const { deleteCategory } = useCategories();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleOpenPopup = () => {
        setDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        deleteCategory(category.id);
        setDeleteDialogOpen(false);
    };

    return (
        <>
            <IconButton
                onClick={handleOpenPopup}
                color="error"
                size='small'
                aria-label={`Delete category ${category.title}`}
            >
                <DeleteIcon />
            </IconButton>
            <DeleteCategoryPopup
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                category={category}
                deleteCategory={handleDelete}
            />
        </>
    );
}

export default DeleteCategoryButton;