import { useState, useEffect } from 'react'
import { useEstado } from '../store/estado.js';
import '../App.css'

function CartasMano({obj, zindex}) {
  const [elegida, setElegida] = useState(0)
  const addCartaSeleccionada = useEstado((state) => state.addCartaSeleccionada);
  const removeCartaSeleccionada = useEstado((state) => state.removeCartaSeleccionada);
  const estado = useEstado();
  const estadoTurnoJugador = useEstado((state) => state.estadoTurnoJugador);

  //console.log("Estado: ", estado.cartasSeleccionadas);
  //console.log("Cartas jugadas",estado.cartasJugadas)

  useEffect(() => {
    if (estadoTurnoJugador!=0)
      setElegida(0);
  },[estadoTurnoJugador])

  const elegirCarta =() => {
    if(elegida == 0) {
        setElegida(20)
        addCartaSeleccionada(obj);
    } else {
        setElegida(0)
        removeCartaSeleccionada(obj);
    }
  }
  return (
    <>
    <img className='card' onClick={elegirCarta} src={obj.image} style={{zIndex: zindex, position: 'relative', right: zindex==0?0:40*zindex, bottom: elegida}} />
    </>
  )
}

export default CartasMano