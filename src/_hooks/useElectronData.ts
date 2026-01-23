import { useState, useEffect, useCallback } from 'react';
import { Category } from '../_components/ListDisplay/interfaces/category';
import { ElectronData } from '../types/electron';

interface UseElectronDataReturn {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
    hasUnsavedChanges: boolean;
    isSaving: boolean;
    
    // Actions
    updateCategories: (newCategories: Category[]) => void;
    addCategory: (categoryName: string) => void;
    saveData: () => Promise<boolean>;
    reloadData: () => Promise<void>;
    resetUnsavedChanges: () => void;
}

export const useElectronData = (): UseElectronDataReturn => {
    // State management
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Load data from Electron storage
    const loadData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const result = await window.electronAPI.loadData();
            
            if (result.success && result.data) {
                const sortedCategories = result.data.categories
                    .sort((a: Category, b: Category) => a.order - b.order);
                setCategories(sortedCategories);
            } else {
                throw new Error(result.error || 'Failed to load data');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
            setError(errorMessage);
            console.error('Load data error:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Save data to Electron storage
    const saveData = useCallback(async (): Promise<boolean> => {
        try {
            setIsSaving(true);
            
            const dataToSave: ElectronData = { categories };
            const result = await window.electronAPI.saveData(dataToSave);
            
            if (result.success) {
                setHasUnsavedChanges(false);
                console.log('Data saved successfully!');
                return true;
            } else {
                throw new Error(result.error);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Save failed';
            console.error('Save error:', err);
            alert(`Failed to save: ${errorMessage}`);
            return false;
        } finally {
            setIsSaving(false);
        }
    }, [categories]);

    // Update categories and mark as changed
    const updateCategories = useCallback((newCategories: Category[]) => {
        setCategories(newCategories);
        setHasUnsavedChanges(true);
    }, []);

    // Add new category
    const addCategory = useCallback((categoryName: string) => {
        console.log('addCategory called with:', categoryName);
        console.log('Current categories count:', categories.length);
        
        const newCategory: Category = {
            id: `category-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            title: categoryName,
            order: categories.length, // Add to end
            items: []
        };
        
        console.log('New category created:', newCategory);
        
        const updatedCategories = [...categories, newCategory];
        console.log('Updated categories array:', updatedCategories);
        
        setCategories(updatedCategories);
        setHasUnsavedChanges(true);
    }, [categories]);

    // Reload data (for retry functionality)
    const reloadData = useCallback(async () => {
        await loadData();
    }, [loadData]);

    // Reset unsaved changes flag
    const resetUnsavedChanges = useCallback(() => {
        setHasUnsavedChanges(false);
    }, []);

    // Load data on mount
    useEffect(() => {
        loadData();
    }, [loadData]);

    return {
        // State
        categories,
        isLoading,
        error,
        hasUnsavedChanges,
        isSaving,
        
        // Actions
        updateCategories,
        addCategory,
        saveData,
        reloadData,
        resetUnsavedChanges
    };
};