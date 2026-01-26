export interface EditItemPopupProps {
    open: boolean;
    onClose: () => void;
    item: {
        id: string;
        text: string;
    };
    updateItemText: (newContent: string) => void;
}