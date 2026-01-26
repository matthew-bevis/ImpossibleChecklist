import React, {useState} from 'react'
import { EditCategoryButtonProps } from './interfaces/edit-category-button-props'
import { useCategories } from '../../contexts/CategoriesContext';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


const EditCategoryButton: React.FC<EditCategoryButtonProps> = ({ category }) => {
    const { updateCategoryTitle } = useCategories();
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [newTitle, setNewTitle] = useState(category.title);

    const handleEditClick = () => {
        setNewTitle(category.title);
        setEditDialogOpen(true);
    };

    const handleSaveEdit = () => {
        if (newTitle.trim() !== '') {
            updateCategoryTitle(category.id, newTitle.trim());
        }
        setEditDialogOpen(false);
        setNewTitle('');
    };

    const handleCancelEdit = () => {
        setEditDialogOpen(false);
        setNewTitle('');
    };

    return (
        <>
            <IconButton
                onClick={handleEditClick}
                color="primary"
                size='small'
                aria-label={`Edit category ${category.title}`}
            >
                <EditIcon />
            </IconButton>
            <Dialog open={editDialogOpen} onClose={handleCancelEdit}>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Category Title"
                        type="text"
                        fullWidth
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelEdit} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} color="primary" variant="contained" disabled={newTitle.trim() === ''}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default EditCategoryButton;