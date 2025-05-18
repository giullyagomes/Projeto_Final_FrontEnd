import { create } from 'zustand';

const useLocalizacao = create((set) => ({
    navegadorSuportaGeolocalizacao: false,
    cidade: "cidade tal",
    estado: null,
    setNavegadorSuportaGeolocalizacao: (suporta) => set({ navegadorSuportaGeolocalizacao: suporta }),
}));

export default useLocalizacao;