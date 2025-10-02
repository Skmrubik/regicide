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
  const [estadoPrincipal, setEstadoPrincipal] =useState(0)
  const [estadoTurnoJugador, setEstadoTurnoJugador] = useState(0)
  //const [mano, setMano] = useState([]);
  const [mazoDescarte, setMazoDescarte] = useState([]);
  const [cartasJugadas, setCartasJugadas] = useState([]);
  const [cartasJugadasGuardadas, setCartasJugadasGuardadas] = useState([]);
  const mazo = useEstado((state) => state.mazo);
  const monstruos = useEstado((state) => state.monstruos);
  const mano = useEstado((state) => state.mano);
  const mazoDescartes = useEstado((state) => state.mazoDescartes);
  const mezclarMonstruos = useEstado((state) => state.shuffleMonstruos);
  const mezclarMazo = useEstado((state) => state.shuffleMazo);
  const aniadirCartaMano = useEstado((state) => state.addCartaMano);
  

  function shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
  }

  useLayoutEffect(()=> {
    if(estadoPrincipal==0) {
      mezclarMazo(mazo);
      mezclarMonstruos(monstruos);
      console.log("Monstruos", monstruos)
      for (let i=0; i<8; i++){
        aniadirCartaMano(mano, mazo.pop());
      }
    }
    console.log(mazo.length)
    setEstadoPrincipal(1)
  },[])

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

    </div>
      <div className='container-mano'>
        <div className='container-button-echar-cartas'>
          <button className='button-echar-cartas'>Jugar cartas</button>
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
