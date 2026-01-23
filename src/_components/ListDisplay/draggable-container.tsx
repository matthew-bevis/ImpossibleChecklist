import React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Paper, Typography, Box } from '@mui/material';
import CheckboxList from './checkbox';
import classes from '../../_styles/mui-styles';
import { DraggableContainerProps } from './interfaces/draggable-container-props';

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
                    <Typography variant="h5" sx={classes.categoryText}>
                        {category.title}<br /><hr />
                    </Typography>
                    <Box sx={classes.itemBox}>
                        <CheckboxList category={category} />
                    </Box>
                </Paper>
            )}
        </Draggable>
    );
};

export default DraggableContainer;