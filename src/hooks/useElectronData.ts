import { useState, useEffect, useCallback, useRef } from 'react';
import { Category } from '../components/ListDisplay/interfaces/category';
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
    deleteCategory: (categoryId: string) => void;
    updateCategoryTitle: (categoryId: string, newTitle: string) => void;
    addItem: (categoryId: string, itemContent: string) => void;
    updateItemText: (categoryId: string, itemId: string, newContent: string) => void;
    updateItemCompletion: (categoryId: string, itemId: string, completed: boolean) => void;
    deleteItem: (categoryId: string, itemId: string) => void;
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

    //Update category title and trigger autosave
    const updateCategoryTitle = useCallback((categoryId: string, newTitle: string) => {
        const updatedCategories = categories.map(cat =>
            cat.id === categoryId ? { ...cat, title: newTitle } : cat
        );

        setCategories(updatedCategories);
        autoSave(updatedCategories);
    }, [categories, autoSave]);

    // Delete category by ID and trigger autosave
    const deleteCategory = useCallback((categoryId: string) => {
        const updatedCategories = categories
            .filter(cat => cat.id !== categoryId)
            .map((cat, index) => ({ ...cat, order:index })); // Reorder after deletion

        setCategories(updatedCategories);
        autoSave(updatedCategories);
    }, [categories, autoSave]);

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

    // Add new item to category and trigger autosave
    const addItem = useCallback((categoryId: string, itemContent: string) => {
        const updatedCategories = categories.map(cat => {
            if (cat.id === categoryId) {
                const newItem = {
                    id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                    order: cat.items.length,
                    text: itemContent,
                    completed: false,
                    createdAt: new Date().toISOString(),
                };
                return { ...cat, items: [...cat.items, newItem] };
            }
            return cat;
        });

        setCategories(updatedCategories);
        autoSave(updatedCategories);
    }, [categories, autoSave]);

    // Update item text and trigger autosave
    const updateItemText = useCallback((categoryId: string, itemId: string, newContent: string) => {
        const updatedCategories = categories.map(cat => {
            if (cat.id === categoryId) {
                const updatedItems = cat.items.map(item =>
                    item.id === itemId ? { ...item, text: newContent } : item
                );
                return { ...cat, items: updatedItems };
            }
            return cat;
        });

        setCategories(updatedCategories);
        autoSave(updatedCategories);
    }, [categories, autoSave]);

    // Save item completion status and trigger autosave
    const updateItemCompletion = useCallback((categoryId: string, itemId: string, completed: boolean) => {
        const updatedCategories = categories.map(cat => {
            if (cat.id === categoryId) {
                const updatedItems = cat.items.map(item =>
                    item.id === itemId ? { ...item, completed } : item
                );
                return { ...cat, items: updatedItems };
            }
            return cat;
        });

        setCategories(updatedCategories);
        autoSave(updatedCategories);
    }, [categories, autoSave]);

    // Delete item from category and trigger autosave
    const deleteItem = useCallback((categoryId: string, itemId: string) => {
        const updatedCategories = categories.map(cat => {
            if (cat.id === categoryId) {
                const filteredItems = cat.items.filter(item => item.id !== itemId);
                return { ...cat, items: filteredItems };
            }
            return cat;
        });
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
        deleteCategory,
        updateCategoryTitle,
        updateItemText,
        updateItemCompletion,
        reloadData,
        addItem,
        deleteItem,
    };
};