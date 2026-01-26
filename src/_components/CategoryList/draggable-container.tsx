import React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Paper, Typography, Box } from '@mui/material';
import CheckboxList from '../Checkbox/checkbox';
import classes from '../../_styles/mui-styles';
import { DraggableContainerProps } from './interfaces/draggable-container-props';
import DeleteCategoryButton from '../DeleteCategory/delete-category-button';
import EditCategoryButton from '../EditCategory/edit-category-button';
import AddItemButton from '../AddItem/add-item-button';

const DraggableContainer: React.FC<DraggableContainerProps> = ({ category, index }) => {
    return (
        <Draggable key={category.id} draggableId={category.id} index={index}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <Paper 
                    sx={{
                        ...classes.categoryPaper,
                        boxShadow: snapshot.isDragging ? 6 : '0 2px 4px rgba(0,0,0,0.1)',
                        opacity: snapshot.isDragging ? 0.9 : 1,
                        zIndex: snapshot.isDragging ? 1000 : 1,
                        transition: snapshot.isDragging ? 'none' : 'all 0.2s ease',
                    }} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps} 
                    ref={provided.innerRef}
                >
                    <Box sx={classes.categoryHeader}>
                        <Typography sx={classes.categoryText}>
                            {category.title}
                        </Typography>
                        <Box>
                            <AddItemButton categoryId={category.id} />
                            <EditCategoryButton category={category} />
                            <DeleteCategoryButton category={category} />
                        </Box>
                    </Box>
                    <hr />
                    <Box sx={classes.itemBox}>
                        <CheckboxList category={category} />
                    </Box>
                </Paper>
            )}
        </Draggable>
    );
};

export default DraggableContainer;