export interface SaveButtonProps {
    hasUnsavedChanges: boolean;
    isSaving: boolean;
    onSave: () => Promise<boolean>;
    disabled?: boolean;
}