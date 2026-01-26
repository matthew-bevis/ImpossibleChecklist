import * as React from 'react'
import { useState } from 'react'
import { Fab, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import classes from '../../_styles/mui-styles'
import AddCategoryPopup from './add-category-popup'
import { useCategories } from '../../contexts/CategoriesContext'


const AddCategoryButton: React.FC = () => {
    const { addCategory } = useCategories();
    const [open, setOpen] = useState(false);

    const handleOpenPopup = () => {
        setOpen(true);
    };

    const handleClosePopup = () => {
        setOpen(false);
    };

    const handleAddCategory = (categoryName: string) => {
        addCategory(categoryName);
    };

    return (
        <Box sx={classes.addCategoryButtonContainer}>
            <Fab
                color="primary"
                sx={classes.categoryButton}
                aria-label="add category"
                onClick={handleOpenPopup}
            >
                <AddIcon />
            </Fab>
            <AddCategoryPopup
                open={open}
                onClose={handleClosePopup}
                onAddCategory={handleAddCategory}
            />
        </Box>
    )
};

export default AddCategoryButton;