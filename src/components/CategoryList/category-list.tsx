import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import DraggableContainer from './draggable-container';
import DroppableContainer from './droppable-container';
import { CategoryListProps } from './interfaces/category-list-props';


const CategoryList: React.FC<CategoryListProps> = ({ categories, onDragEnd }) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <DroppableContainer droppableId="categories">
                {() => (
                    <>
                        {categories.map((category, index) => (
                            <DraggableContainer 
                                key={category.id} 
                                category={category} 
                                index={index}
                            />
                        ))}
                    </>
                )}
            </DroppableContainer>
        </DragDropContext>
    );
};

export default CategoryList;