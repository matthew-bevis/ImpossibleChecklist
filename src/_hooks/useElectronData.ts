import { useState, useEffect, useCallback, useRef } from 'react';
import { Category } from '../_components/ListDisplay/interfaces/category';
import { ElectronData } from '../types/electron';

interface UseElectronDataReturn {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
    isSaving: boolean;
    justSaved: boolean;
    
    // Actions
    updateCategories: (newCategories: Category[]) => void;
    addCategory: (categoryName: string) => void;
    reloadData: () => Promise<void>;
}

export const useElectronData = (): UseElectronDataReturn => {
    // State management
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [justSaved, setJustSaved] = useState(false);
    
    // Debounce timer for autosave
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Load data from Electron storage
    const loadData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Check if running in Electron environment
            if (!window.electronAPI) {
                setCategories([]);
                setIsLoading(false);
                return;
            }
            
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

    // Auto-save function with debouncing
    const autoSave = useCallback(async (categoriesToSave: Category[]) => {
        // Clear existing timeout
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        
        // Set up new save with 500ms delay
        saveTimeoutRef.current = setTimeout(async () => {
            try {
                setIsSaving(true);
                
                // Check if running in Electron environment
                if (!window.electronAPI) {
                    console.warn('ElectronAPI not available - cannot autosave');
                    return;
                }
                
                const dataToSave: ElectronData = { categories: categoriesToSave };
                const result = await window.electronAPI.saveData(dataToSave);
                
                if (result.success) {
                    setJustSaved(true);
                    // Hide the "saved" indicator after 2 seconds
                    setTimeout(() => setJustSaved(false), 2000);
                    console.log('Data auto-saved successfully!');
                } else {
                    console.error('Auto-save failed:', result.error);
                }
            } catch (err) {
                console.error('Auto-save error:', err);
            } finally {
                setIsSaving(false);
            }
        }, 500);
    }, []);

    // Update categories and trigger autosave
    const updateCategories = useCallback((newCategories: Category[]) => {
        setCategories(newCategories);
        autoSave(newCategories);
    }, [autoSave]);

    // Add new category and trigger autosave
    const addCategory = useCallback((categoryName: string) => {
        const newCategory: Category = {
            id: `category-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            title: categoryName,
            order: categories.length,
            items: []
        };
        
        const updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        autoSave(updatedCategories);
    }, [categories, autoSave]);

    // Reload data (for retry functionality)
    const reloadData = useCallback(async () => {
        await loadData();
    }, [loadData]);

    // Load data on mount
    useEffect(() => {
        loadData();
    }, [loadData]);

    // Cleanup timeout on unmount
    useEffect(() => {
        const timeoutRef = saveTimeoutRef.current;
        return () => {
            if (timeoutRef) {
                clearTimeout(timeoutRef);
            }
        };
    }, []);

    return {
        // State
        categories,
        isLoading,
        error,
        isSaving,
        justSaved,
        
        // Actions
        updateCategories,
        addCategory,
        reloadData
    };
};