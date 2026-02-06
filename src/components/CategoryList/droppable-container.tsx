import React from 'react';
import { Droppable, DroppableProvided, DroppableStateSnapshot } from '@hello-pangea/dnd';
import { Box } from '@mui/material';
import classes from '../../styles/mui-styles';

interface DroppableContainerProps {
    children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactNode;
    droppableId: string;
}

const DroppableContainer: React.FC<DroppableContainerProps> = ({ children, droppableId }) => {
    return (
        <Droppable droppableId={droppableId}>
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <Box 
                    sx={{...classes.categoryContainer}} 
                    {...provided.droppableProps} 
                    ref={provided.innerRef}
                >
                    {children(provided, snapshot)}
                    
                    <Box sx={{
                        ...(snapshot.isDraggingOver && {
                            ...classes.categoryPaper,
                            border: '2px dotted #1976d2',
                            backgroundColor: 'rgba(25, 118, 210, 0.05)',
                            borderRadius: '8px',
                            minHeight: '120px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                        })
                    }}>
                        {provided.placeholder as React.ReactElement}
                    </Box>
                </Box>
            )}
        </Droppable>
    );
};

export default DroppableContainer;