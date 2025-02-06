import { create } from 'zustand';

// Definir la estructura del estado
interface VehicleListState {
    updateVehicleList: true | false;
    setVehicleList: (state: true | false) => void;
}

// Crear el store con los tipos definidos
const useUpdateVehicleList = create<VehicleListState>((set) => ({
    updateVehicleList: false, // Estado inicial
    setVehicleList: (state) => set({ updateVehicleList: state }), // Función para actualizar el estado
}));

export default useUpdateVehicleList;
