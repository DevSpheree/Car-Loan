import { create } from 'zustand';

// Definir la estructura del estado
interface AuthState {
    userRole: string | null;
    setUserRole: (role: string | null) => void;
    clearUserRole: () => void;
}

// Crear el store con los tipos definidos
const useAuthStore = create<AuthState>((set) => ({
    userRole: null, // Estado inicial
    setUserRole: (role) => set({ userRole: role }), // Función para actualizar el estado
    clearUserRole: () => set({ userRole: null }), // Función para limpiar el estado
}));

export default useAuthStore;
