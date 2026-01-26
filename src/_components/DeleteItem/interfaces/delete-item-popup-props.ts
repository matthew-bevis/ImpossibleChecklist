export interface DeleteItemPopupProps {
    open: boolean;
    onClose: () => void;
    item: {
        id: string;
        text: string;
    };
    deleteItem: () => void;
}