import { useLayoutEffect, useState } from 'react'
import CartasMano from './components/CartasMano.jsx';
import CartasMonstruos from './components/CartasMonstruos.jsx';
import CartasMazo from './components/CartasMazo.jsx';
import cartasMazo from './JSON/cartasMazo';
import monstruos from './JSON/monstruos';
import { useEstado } from './store/estado.js';
import './App.css'
import CartasMazoDescartes from './components/CartasMazoDescartes.jsx';
import iconHeart from '../public/heart.svg'

function App() {
  //const [mano, setMano] = useState([]);
  const [mazoDescarte, setMazoDescarte] = useState([]);
  const [cartasJugadasGuardadas, setCartasJugadasGuardadas] = useState([]);
  const mazo = useEstado((state) => state.mazo);
  const monstruos = useEstado((state) => state.monstruos);
  const mano = useEstado((state) => state.mano);
  const cartasSeleccionadas = useEstado((state) => state.cartasSeleccionadas);
  const cartasJugadas = useEstado((state) => state.cartasJugadas);
  const mazoDescartes = useEstado((state) => state.mazoDescartes);
  const mezclarMonstruos = useEstado((state) => state.shuffleMonstruos);
  const mezclarMazo = useEstado((state) => state.shuffleMazo);
  const aniadirCartaMano = useEstado((state) => state.addCartaMano);
  const addCartaJugada = useEstado((state) => state.addCartaJugada);
  const removeCartaMano = useEstado((state) => state.removeCartaMano);
  const estadoPrincipal = useEstado((state) => state.estadoPrincipal);
  const setEstadoPrincipal = useEstado((state) => state.setEstadoPrincipal);
  const setEstadoTurnoJugador = useEstado((state) => state.setEstadoTurnoJugador);
  const estadoTurnoJugador = useEstado((state) => state.estadoTurnoJugador);
  const estado = useEstado();

  function shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
  }

  useLayoutEffect(()=> {
    if(estadoPrincipal==0) {
      mezclarMazo();
      mezclarMonstruos();
      console.log("Monstruos", mazo)
      for (let i=0; i<8; i++){
        aniadirCartaMano(mazo.pop());
      }
      setEstadoPrincipal(1)
    }
    console.log(mazo.length)
    
  },[])
  useLayoutEffect(() => {
    console.log("Cartas jugadas",cartasJugadas)
  },[cartasJugadas])

  function jugarCartas() {
    for (const carta of cartasSeleccionadas) {
      addCartaJugada(carta);
      removeCartaMano(carta);
    }
    setEstadoTurnoJugador(1);
    
  }
  return (
    <>
    <div className='container-mazos'>
      <div className='container-mazo-monstruos'>
        <p>MONSTRUOS ({monstruos.length})</p>
        <CartasMonstruos obj={monstruos[monstruos.length-1]}/>
      </div>
      <div className='container-mazo-principal'>
        <p>MAZO PRINCIPAL ({mazo.length})</p>
        <CartasMazo />
      </div>
      <div className='container-mazo-descartes'>
        <p>DESCARTES ({mazoDescartes.length})</p>
        <CartasMazoDescartes descartes={mazoDescartes} />
      </div>
      <div className='container-vidas'>
        <p>VIDAS</p>
        <div className='vidas'>
          <img src="heart.svg" className="imagen-vida" />
          <img src="heart.svg" className="imagen-vida" />
        </div>
      </div>
    </div>
    <div className='container-cartas-jugadas'>
      {cartasJugadas.map((carta, index) => (
        <CartasMano obj={carta} zindex={index} />
      ))}
    </div>
      <div className='container-mano'>
        <div className='container-button-echar-cartas'>
          <button className='button-echar-cartas' onClick={jugarCartas}>Jugar cartas</button>
        </div>
        <div className='cartas-mano'>
          {mano.map((carta, index) => (
            <CartasMano obj={carta} zindex={index} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
