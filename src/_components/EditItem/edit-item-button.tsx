import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditItemPopup from './edit-item-popup';
import { EditItemButtonProps } from './interfaces/edit-item-button-props';
import { useCategories } from '../../contexts/CategoriesContext';

const EditItemButton: React.FC<EditItemButtonProps> = ({ categoryId, item }) => {
    const { updateItemText } = useCategories();
    const [popupOpen, setPopupOpen] = useState(false);

    const handleEditItem = (newContent: string) => {
        updateItemText(categoryId, item.id, newContent);
    };

    return (
        <>
            <IconButton
                onClick={() => setPopupOpen(true)}
                color="primary"
                size='small'
                aria-label={`Edit item ${item.text}`}
            >
                <EditIcon />
            </IconButton>
            <EditItemPopup
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                item={item}
                updateItemText={handleEditItem}
            />
        </>
    );
}

export default EditItemButton;