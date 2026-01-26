import React, { createContext, useContext, ReactNode } from 'react';
import { useElectronData } from '../_hooks/useElectronData';
import { Category } from '../_components/ListDisplay/interfaces/category';

interface CategoriesContextType {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
    isSaving: boolean;
    justSaved: boolean;
    updateCategories: (newCategories: Category[]) => void;
    addCategory: (categoryName: string) => void;
    deleteCategory: (categoryId: string) => void;
    reloadData: () => Promise<void>;
    updateCategoryTitle: (categoryId: string, newTitle: string) => void;
    addItem: (categoryId: string, itemContent: string) => void;
    updateItemText: (categoryId: string, itemId: string, newContent: string) => void;
    deleteItem: (categoryId: string, itemId: string) => void;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

interface CategoriesProviderProps {
    children: ReactNode;
}

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({ children }) => {
    const electronData = useElectronData();

    return (
        <CategoriesContext.Provider value={electronData}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = (): CategoriesContextType => {
    const context = useContext(CategoriesContext);
    if (context === undefined) {
        throw new Error('useCategories must be used within a CategoriesProvider');
    }
    return context;
};