import React, {useState} from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

const AddCategoryPopup: React.FC<{
    open: boolean,
    onClose: () => void,
    onAddCategory: (categoryName: string) => void,
}> = ({ open, onClose, onAddCategory }) => {
    const [categoryName, setCategoryName] = useState('')
    const handleAdd = () => {
        console.log('AddCategoryPopup handleAdd called with:', categoryName);
        onAddCategory(categoryName)
        setCategoryName('')
        onClose()
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        autoFocus
                        label="Category Name"
                        fullWidth
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleAdd} color="primary" disabled={!categoryName.trim()}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default AddCategoryPopup;