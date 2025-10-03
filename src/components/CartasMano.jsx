import { useState, useEffect } from 'react'
import { useEstado } from '../store/estado.js';
import '../App.css'

function CartasMano({obj, zindex}) {
  const [elegida, setElegida] = useState(0)
  const addCartaSeleccionada = useEstado((state) => state.addCartaSeleccionada);
  const removeCartaSeleccionada = useEstado((state) => state.removeCartaSeleccionada);
  const cartasSeleccionadas = useEstado((state) => state.cartasSeleccionadas);
  const estado = useEstado();
  const estadoTurnoJugador = useEstado((state) => state.estadoTurnoJugador);

  //console.log("Estado: ", estado.cartasSeleccionadas);
  //console.log("Cartas jugadas",estado.cartasJugadas)

  useEffect(() => {
    if (estadoTurnoJugador!=0)
      setElegida(0);
  },[estadoTurnoJugador])

  const elegirCarta =() => {
    if(elegida == 0 && estadoTurnoJugador == 0) {
        let sumaValores = 0;
        for (const carta of cartasSeleccionadas) {
          sumaValores +=carta.valorAtaque;
        }

        const hayUnAs = cartasSeleccionadas.some(carta => {
          return carta.valorAtaque === 1;
        })
        const hayUnaIgual = cartasSeleccionadas.some(carta => {
          return carta.valorAtaque === obj.valorAtaque;
        })

        if (cartasSeleccionadas.length == 0){
          setElegida(20);
          addCartaSeleccionada(obj);
        }
        else if (hayUnAs && obj.valorAtaque >1 && cartasSeleccionadas.length==1) {
          setElegida(20);
          addCartaSeleccionada(obj);
        }
        else if (!hayUnAs && cartasSeleccionadas.length==1 && cartasSeleccionadas[0].valorAtaque>1 && obj.valorAtaque == 1){
          setElegida(20);
          addCartaSeleccionada(obj);
        }
        else if (!hayUnAs && hayUnaIgual && sumaValores+obj.valorAtaque<=10) {
          //console.log("hay", sumaValores);
          //console.log("aniadiendo", sumaValores+obj.valorAtaque);
          setElegida(20);
          addCartaSeleccionada(obj);
        }
    } else if (elegida==0 && estadoTurnoJugador==2){
      setElegida(20);
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