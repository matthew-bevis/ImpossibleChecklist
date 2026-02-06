import React, { useState } from "react";
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddItemPopup from './add-item-popup';
import { AddItemButtonProps } from './interfaces/add-item-button-props';
import { useCategories } from '../../contexts/CategoriesContext';

const AddItemButton: React.FC<AddItemButtonProps> = ({ categoryId }) => {
    const { addItem } = useCategories();
    const [popupOpen, setPopupOpen] = useState(false);

    const handleAddItem = (itemContent: string) => {
        addItem(categoryId, itemContent);
    };

    return (
        <>
            <IconButton
                onClick={() => setPopupOpen(true)}
                color="primary"
                size='small'
                aria-label={`Add item to category ${categoryId}`}
            >
                <AddIcon />
            </IconButton>
            <AddItemPopup
                categoryId={categoryId}
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                onAddItem={handleAddItem}
            />
        </>
    );
}

export default AddItemButton;