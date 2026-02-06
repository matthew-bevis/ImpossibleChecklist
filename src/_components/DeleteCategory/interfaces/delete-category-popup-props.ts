export interface DeleteCategoryPopupProps {
    category: { id: string; title: string };
    onClose: () => void;
    deleteCategory: (categoryId: string) => void;
    open: boolean;
}