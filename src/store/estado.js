import { create } from 'zustand'
import cartasMazo from '../JSON/cartasMazo';
import cartasMonstruos from '../JSON/monstruos';

function shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
}

export const useEstado = create((set, get, store) => ({ 
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
    poderActual: 0,

    setEstadoPrincipal: (estadoPrincipal) => set({ estadoPrincipal}),
    setEstadoTurnoJugador: (estadoTurnoJugador) => set({ estadoTurnoJugador}),
    setPoderActual: (poderActual) => set({ poderActual}),
    setMazo: (mazo) => set({ mazo}),
    getMazo: () =>{
        const currentMazo = get().mazo;
        return currentMazo;
    },
    repartirCartasIniciales: () => set((state) => {
        if (state.mazo.length>7){
            for (let i= 0; i<8; i++){
                state.mano.push(state.mazo.pop());
            }
        } else {
            for (let i= 0; state.mazo.length<8; i++){
                state.mano.push(state.mazo.pop());
            }
        }
    }),
    resetMazo: () => set({mazo: cartasMazo}),
    resetMonstruos: () => set({monstruos: cartasMonstruos}),
    resetMazoDescartes: () => set({mazoDescartes: []}),
    resetMano: () => set({mano: []}),
    resetCartasSeleccionadas: () => set({cartasSeleccionadas: []}),
    resetCartasJugadas: () => set({cartasJugadas: []}),
    reset: () => {
    // getInitialState() obtiene el objeto de estado inicial (count: 0, username: 'Invitado')
        set(store.getInitialState(), true);
    },
    setVidaMonstruo: (vidaMonstruo) => set({vidaMonstruo}),
    setAtaqueJugador: (ataqueJugador) => set({ataqueJugador}),
    setDefensaJugador: (defensaJugador) => set({defensaJugador}),
    setMonstruos: (monstruos) => set({ monstruos}),
    shuffleMazo: () => set((state) => {
        const newArray = state.mazo.filter(carta => carta.valorDefensa < 15);
        shuffleArray(newArray)
        return {mazo: newArray}
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
    addNCartasMano: (cartas) => set((state) => ({
        mano: [...state.mano, ...cartas]
    })),
    addCartaSeleccionada: (carta) => set((state) => ({
        cartasSeleccionadas: [...state.cartasSeleccionadas, carta]
    })),
    addCartaDescartes: (carta) => set((state) => ({
        mazoDescartes: [...state.mazoDescartes, carta]
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
    addCartaMonstruo: (carta) => set((state) => ({
        monstruos: [...state.monstruos, carta]
    })),
    removeCartaJugada: (cartaEliminar) => set((state) => ({
        cartasJugadas: state.cartasJugadas.filter(carta => carta.image != cartaEliminar.image)
    })),
    popLastNMazoDescartes: (n) => {
        // Obtener el estado actual del array
        const currentItems = get().mazoDescartes;
        const remainingItems = currentItems.slice(0, -n);
        const removedElements = currentItems.slice(-n);
        set({ mazoDescartes: remainingItems });

        // 4. Retornar los elementos eliminados
        return removedElements;
    },
    popLastNMazo: (n) => {
        // Obtener el estado actual del array
        const currentItems = get().mazo;
        const remainingItems = currentItems.slice(0, -n);
        const removedElements = currentItems.slice(-n);
        set({ mazo: remainingItems });

        // 4. Retornar los elementos eliminados
        return removedElements;
    },
    popLastNMano: (n) => {
        // Obtener el estado actual del array
        const currentItems = get().mano;
        const remainingItems = currentItems.slice(0, -n);
        const removedElements = currentItems.slice(-n);
        set({ mano: remainingItems });

        // 4. Retornar los elementos eliminados
        return removedElements;
    },
    addNCartasFinalMazo: (cartas) => set((state) => ({
        mazo: [...state.mazo, ...cartas]
    })),
    addNCartasFinalMazoDescartes: (cartas) => set((state) => ({
        mazoDescartes: [...state.mazoDescartes, ...cartas]
    })),
    addCartaFinalMazo: (carta) => set((state) => ({
        mazo: [...state.mazo, carta]
    })),
}))