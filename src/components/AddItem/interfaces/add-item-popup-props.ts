export interface AddItemPopupProps {
    categoryId: string;
    onClose: () => void;
    onAddItem: (itemContent: string) => void;
    open: boolean;
}