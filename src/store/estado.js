import { create } from 'zustand'
import cartasMazo from '../JSON/cartasMazo';
import cartasMonstruos from '../JSON/monstruos';

function shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
}

export const useEstado = create((set, get) => ({ 
    estadoPrincipal: 0,
    estadoTurnoJugador: 0,
    mazo: cartasMazo,
    mazoDescartes: [],
    monstruos: cartasMonstruos,
    mano: [],
    cartasSeleccionadas: [],
    cartasJugadas: [],
    vidaMonstruo: 0,
    ataqueJugador: 0,
    defensaJugador: 0,

    setEstadoPrincipal: (estadoPrincipal) => set({ estadoPrincipal}),
    setEstadoTurnoJugador: (estadoTurnoJugador) => set({ estadoTurnoJugador}),
    setMazo: (mazo) => set({ mazo}),
    setVidaMonstruo: (vidaMonstruo) => set({vidaMonstruo}),
    setAtaqueJugador: (ataqueJugador) => set({ataqueJugador}),
    setDefensaJugador: (defensaJugador) => set({defensaJugador}),
    setMonstruos: (monstruos) => set({ monstruos}),
    shuffleMazo: () => set((state) => {
        shuffleArray(state.mazo)
        return {mazo: state.mazo}
    }),
    shuffleMazoDescartes: () => set((state) => {
        shuffleArray(state.mazoDescartes)
        return {mazoDescartes: state.mazoDescartes}
    }),
    shuffleMonstruos: () => set((state) => {
        let js = state.monstruos.slice(0, 4)
        let qs = state.monstruos.slice(4, 8);
        let ks = state.monstruos.slice(8, 12);
        shuffleArray(js);
        shuffleArray(qs);
        shuffleArray(ks);
        return {monstruos: [...ks,...qs,...js] }
    }),
    addCartaMano: (carta) => set((state) => ({
        mano: [...state.mano, carta]
    })),
    addCartaSeleccionada: (carta) => set((state) => ({
        cartasSeleccionadas: [...state.cartasSeleccionadas, carta]
    })),
    removeCartaSeleccionada: (cartaEliminar) => set((state) => ({
        cartasSeleccionadas: state.cartasSeleccionadas.filter(carta => carta.image != cartaEliminar.image)
    })),
    removeCartaMano: (cartaEliminar) => set((state) => ({
        mano: state.mano.filter(carta => carta.image != cartaEliminar.image)
    })),
    addCartaJugada: (carta) => set((state) => ({
        cartasJugadas: [...state.cartasJugadas, carta]
    })),
    addCartaFinalMazo: (carta) => set((state) => ({
        mazo: [...state.mazo, carta]
    })),
}))