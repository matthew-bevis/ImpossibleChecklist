export interface ErrorDisplayProps {
    error: string;
    onRetry?: () => void;
    showRetry?: boolean;
}