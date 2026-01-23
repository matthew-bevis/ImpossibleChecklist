import React from "react"
import { DropResult } from "@hello-pangea/dnd"
import { Category } from './interfaces/category'
import CategoryList from './category-list'
import LoadingSpinner from '../LoadingSpinner/loading-spinner'
import SaveButton from '../SaveButton/save-button'
import { Box, Typography, Button } from '@mui/material'

interface ListDisplayProps {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
    hasUnsavedChanges: boolean;
    isSaving: boolean;
    updateCategories: (newCategories: Category[]) => void;
    saveData: () => Promise<boolean>;
    reloadData: () => Promise<void>;
}

const ListDisplay: React.FC<ListDisplayProps> = ({
    categories,
    isLoading,
    error,
    hasUnsavedChanges,
    isSaving,
    updateCategories,
    saveData,
    reloadData
}) => {

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(categories);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const updatedCategories = items.map((category, index) => ({
            ...category,
            order: index + 1,
        }));

        updateCategories(updatedCategories);
    };

    // Loading state
    if (isLoading) {
        return <LoadingSpinner message="Loading your checklist..." size="large" />;
    }

    // Error state
    if (error) {
        return (
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                height="200px"
                gap={2}
            >
                <Typography variant="h6" color="error">
                    Error loading data: {error}
                </Typography>
                <Button variant="contained" onClick={reloadData}>
                    Try Again
                </Button>
            </Box>
        );
    }

    return (
        <>
            <SaveButton 
                hasUnsavedChanges={hasUnsavedChanges}
                isSaving={isSaving}
                onSave={saveData}
            />
            <CategoryList 
                categories={categories} 
                onDragEnd={handleOnDragEnd} 
            />
        </>
    );
};

export default ListDisplay;
