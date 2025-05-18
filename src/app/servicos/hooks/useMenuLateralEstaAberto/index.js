import { create } from 'zustand';

const useMenuLateralEstaAberto = create((set) => ({
    menuLateralAberto: false,
    setMenuLateralAberto: () =>
        set((estado) => ({ menuLateralAberto: !estado.menuLateralAberto })),
}));

export default useMenuLateralEstaAberto;