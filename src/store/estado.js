import { create } from 'zustand'
import cartasMazo from '../JSON/cartasMazo';
import cartasMonstruos from '../JSON/monstruos';

function shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
}

export const useEstado = create((set, get) => ({ 
    mazo: cartasMazo,
    mazoDescartes: [],
    monstruos: cartasMonstruos,
    mano: [],

    setMazo: (mazo) => set({ mazo}),
    setMonstruos: (monstruos) => set({ monstruos}),
    shuffleMazo: (mazo) => {
        shuffleArray(mazo)
    },
    shuffleMonstruos: (monstruos) => {
        let js = monstruos.slice(0, 4);
        let qs = monstruos.slice(4, 8);
        let ks = monstruos.slice(8, 12);
        shuffleArray(js);
        shuffleArray(qs);
        shuffleArray(ks);
        set({ monstruos: [...ks,...qs,...js] })
    },
    addCartaMano: (mano, carta) => {
        mano.push(carta);
        set({mano})
    }
}))