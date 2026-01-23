import { Category } from './category';
import { DropResult } from '@hello-pangea/dnd';

export interface CategoryListProps {
    categories: Category[];
    onDragEnd: (result: DropResult) => void;
}