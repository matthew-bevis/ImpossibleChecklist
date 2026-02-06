export interface DeleteCategoryPopupProps {
    category: { id: string; title: string };
    onClose: () => void;
    deleteCategory: () => void;
    open: boolean;
}