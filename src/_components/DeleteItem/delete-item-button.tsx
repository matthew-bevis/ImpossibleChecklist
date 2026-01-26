import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteItemPopup from './delete-item-popup';
import { DeleteItemButtonProps } from './interfaces/delete-item-button-props';
import { useCategories } from '../../contexts/CategoriesContext';

const DeleteItemButton: React.FC<DeleteItemButtonProps> = ({ categoryId, item }) => {
    const { deleteItem } = useCategories();
    const [popupOpen, setPopupOpen] = useState(false);

    const handleDeleteItem = () => {
        deleteItem(categoryId, item.id);
    };

    return (
        <>
            <IconButton
                onClick={() => setPopupOpen(true)}
                color="error"
                size='small'
                aria-label={`Delete item ${item.text}`}
            >
                <DeleteIcon />
            </IconButton>
            <DeleteItemPopup
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                item={item}
                deleteItem={handleDeleteItem}
            />
        </>
    );
}

export default DeleteItemButton;