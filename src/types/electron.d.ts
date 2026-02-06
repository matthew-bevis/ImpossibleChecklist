// Global type declarations for Electron API
import { Category } from '../components/List/ListDisplay/interfaces/category';

export interface ElectronData {
  categories: Category[];
}

export interface ElectronAPI {
  saveData: (data: ElectronData) => Promise<{ success: boolean; error?: string }>;
  loadData: () => Promise<{ success: boolean; data?: ElectronData; error?: string }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};