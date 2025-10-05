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
  const [puntosDescarte, setPuntosDescarte] = useState(0);
  const [superaDescarte, setSuperaDescarte] = useState(true);
  const [mensajeDescartarJugador,setMensajeDescartarJugador] = useState("");
  const [mensajeBoton,setMensajeBoton] = useState("Jugar cartas");
  const [defensaMayorAtaqueMonstruo, setDefensaMayorAtaqueMonstruo] = useState(false);
  const [enabledVida, setEnabledVida] = useState(true);
  const [numeroVidas, setNumeroVidas] = useState(2);
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
  const removeCartaJugada = useEstado((state) => state.removeCartaJugada);
  const removeCartaSeleccionada = useEstado((state) => state.removeCartaSeleccionada);
  const removeCartaMano = useEstado((state) => state.removeCartaMano);
  const estadoPrincipal = useEstado((state) => state.estadoPrincipal);
  const setEstadoPrincipal = useEstado((state) => state.setEstadoPrincipal);
  const setEstadoTurnoJugador = useEstado((state) => state.setEstadoTurnoJugador);
  const estadoTurnoJugador = useEstado((state) => state.estadoTurnoJugador);
  const setVidaMonstruo = useEstado((state) => state.setVidaMonstruo);
  const vidaMonstruo = useEstado((state) => state.vidaMonstruo);
  const shuffleMazoDescartes = useEstado((state) => state.shuffleMazoDescartes);
  const setAtaqueJugador = useEstado((state) => state.setAtaqueJugador);
  const setDefensaJugador = useEstado((state) => state.setDefensaJugador);
  const defensaJugador = useEstado((state) => state.defensaJugador);
  const ataqueJugador = useEstado((state) => state.ataqueJugador);
  const addCartaFinalMazo = useEstado((state) => state.addCartaFinalMazo);
  const addCartaDescartes = useEstado((state) => state.addCartaDescartes);
  const addCartaMonstruo = useEstado((state) => state.addCartaMonstruo);
  const resetMazo = useEstado((state) => state.resetMazo);
  const resetMonstruos = useEstado((state) => state.resetMonstruos);
  const resetMazoDescartes = useEstado((state) => state.resetMazoDescartes);
  const resetCartasMano = useEstado((state) => state.resetMano);
  const resetCartasSeleccionadas = useEstado((state) => state.resetCartasSeleccionadas);
  const resetCartasJugadas = useEstado((state) => state.resetCartasJugadas);
  const {reset}= useEstado();
  const setPoderActual = useEstado((state) => state.setPoderActual);
  const poderActual = useEstado((state) => state.poderActual);
  const repartirCartasIniciales = useEstado((state) => state.repartirCartasIniciales);
  const popLastNMazoDescartes = useEstado((state) => state.popLastNMazoDescartes);
  const popLastNMazo = useEstado((state) => state.popLastNMazo);
  const popLastNMano = useEstado((state) => state.popLastNMano);
  const addNCartasFinalMazo = useEstado((state) => state.addNCartasFinalMazo);
  const addNCartasFinalMazoDescartes = useEstado((state) => state.addNCartasFinalMazoDescartes);
  const addNCartasMano = useEstado((state) => state.addNCartasMano);
  const getMazo = useEstado((state) => state.getMazo);

  useLayoutEffect(()=> {
    if(estadoPrincipal==0) {
      for(const carta of mazo){
        if (carta.valorDefensa>15){
          addCartaMonstruo(carta);
        }
      }
      mezclarMazo();
      mezclarMonstruos();
      addNCartasMano(popLastNMazo(8));

      if (monstruos.length>8) setVidaMonstruo(20);
      else if (monstruos.length>4) setVidaMonstruo(30);
      else setVidaMonstruo(40);
      setEstadoPrincipal(1)
      console.log(monstruos);
    }
  },[estadoPrincipal])

  //estado turno 1 FASE DE APLICAR PODERES Y ATACAR
  useLayoutEffect(() => {
    if(estadoPrincipal==1 && estadoTurnoJugador == 1) {
      console.log("Estado Turno 1")
      pasoPoderYAtaque();
    }
  },[cartasJugadas])

  //estado turno 2 FASE DE ATAQUE DE MONSTRUO Y DESCARTE
  useLayoutEffect(() => {
    if(estadoPrincipal==1 && estadoTurnoJugador == 2) {
      console.log("Estado Turno 2")
      const ataqueMonstruo = monstruos[monstruos.length-1].valorAtaque;
      let puntosADescartar = 0;
      //Es posible cambiar este if por el if-else siguiente?
      //if (defensaJugador>=ataqueMonstruo){        
      //  if(!defensaMayorAtaqueMonstruo){
      //    setSuperaDescarte(true);
      //    setDefensaMayorAtaqueMonstruo(true);
      //  } 
      //  setMensajeDescartarJugador("Has superado con tu defensa el ataque del rival. Turno de jugar cartas de nuevo.")
      //  setMensajeBoton("Jugar cartas");
      //  descartarCartasMano();
      //  descartarCartasJugadas();
      //  setEstadoTurnoJugador(0);
      //}

      //Si acabamos de superar con la defensa al ataque del monstruo
      if (defensaJugador>=ataqueMonstruo && !defensaMayorAtaqueMonstruo){        
        setSuperaDescarte(true);
        setMensajeDescartarJugador("Has superado con tu defensa el ataque del rival. Turno de jugar cartas de nuevo.")
        
        setMensajeBoton("Jugar cartas");
        setDefensaMayorAtaqueMonstruo(true);
        descartarCartasMano();
        descartarCartasJugadas();
        setEstadoTurnoJugador(0);
      } //Si ya superamos en alguna ronda anterior la defensa respecto del ataque del monstruo
      else if(defensaJugador>=ataqueMonstruo && defensaMayorAtaqueMonstruo){
        setMensajeDescartarJugador("Has superado con tu defensa el ataque del rival. Turno de jugar cartas de nuevo.")
        setMensajeBoton("Jugar cartas");
        descartarCartasMano();
        descartarCartasJugadas();
        setEstadoTurnoJugador(0);
      } // Si aun no hemos superado con la defensa al ataque del monstruo
      else {
        puntosADescartar=ataqueMonstruo-defensaJugador;
        setSuperaDescarte(false);
        setMensajeDescartarJugador("Debes descartarte de "+ puntosADescartar +" puntos")
        setMensajeBoton("Descartar cartas");
        let totalDescarte = 0;
        //Sumar puntos de descarte 
        for(const carta of cartasSeleccionadas){
          totalDescarte+=carta.valorAtaque;
        }
        //Comprobar si podemos aplicar el descarte
        if (totalDescarte>= puntosADescartar){
          setSuperaDescarte(true);
          setPuntosDescarte(totalDescarte);
        } else {
          setPuntosDescarte(totalDescarte);
        }
      } 
      
    }
  },[estadoTurnoJugador, cartasSeleccionadas])

  //estado turno 3
  useLayoutEffect(() => {
    if(estadoPrincipal==1 && estadoTurnoJugador == 4) {
      console.log("Estado Turno 3")
      setEnabledVida(true);
      setEstadoTurnoJugador(0);
    }
  },[mazoDescartes, estadoTurnoJugador])

  //estado turno 4
  useLayoutEffect(() => {
    if(estadoPrincipal==2) {
      console.log("Estado Turno 3")
      descartarCartasMano();
      descartarCartasJugadas();
      if (vidaMonstruo==0){
        addCartaFinalMazo(monstruos.pop())
      } else {
        addCartaDescartes(monstruos.pop())
      }
      setEstadoTurnoJugador(0);
      setAtaqueJugador(0);
      setDefensaJugador(0);
      setVidaMonstruo(monstruos[monstruos.length-1].valorDefensa);
      setDefensaMayorAtaqueMonstruo(false);
      setPuntosDescarte(0);
      setMensajeDescartarJugador("")
      setEnabledVida(true);
      setEstadoPrincipal(1);
      setEstadoTurnoJugador(0);
    }
  },[vidaMonstruo, estadoPrincipal])

  //Descartar cartas mano
  function descartarCartasMano(){
    for (const carta of cartasSeleccionadas){
        addCartaDescartes(carta);
        removeCartaSeleccionada(carta);
        removeCartaMano(carta);
      }
  }
  //Añadir al mazo de descartes las cartas de la mesa
  function descartarCartasJugadas(){
    for (const carta of cartasJugadas) {
        removeCartaJugada(carta);
        addCartaDescartes(carta);
      }
  }
  //Paso 1 Turno
  //Ataque al enemigo y aplicar poderes
  function pasoPoderYAtaque(){
    console.log("PODER ACTUAL ", poderActual)
    //C, D, T, P
    let cartasPorPoder = [0,0,0,0];
    let cartasPorPuntos = [0,0,0,0];
    let cartasPorDefensa = [0,0,0,0];
    let defensaTotal = 0;
    let ataqueTotal = 0;
    let cartasCoger = 0;
    let cartasDescarte = 0;
    for(const carta of cartasSeleccionadas){
      removeCartaSeleccionada(carta);
    }
    //Almacenamos los puntos de la jugada
    for(const carta of cartasJugadas){
      if (carta.poder == 'C'){
        cartasPorPoder[0]++;
        cartasPorPuntos[0]+=carta.valorAtaque;
        cartasPorDefensa[0]+=carta.valorDefensaMano;
        ataqueTotal+=carta.valorAtaque;
      } else if (carta.poder == 'D'){
        cartasPorPoder[1]++;
        cartasPorPuntos[1]+=carta.valorAtaque;
        cartasPorDefensa[1]+=carta.valorDefensaMano;
        ataqueTotal+=carta.valorAtaque;
      } else if (carta.poder == 'T'){
        cartasPorPoder[2]++;
        cartasPorPuntos[2]+=carta.valorAtaque;
        cartasPorDefensa[2]+=carta.valorDefensaMano;
        ataqueTotal+=carta.valorAtaque;
      } else {
        cartasPorPoder[3]++;
        cartasPorPuntos[3]+=carta.valorAtaque;
        cartasPorDefensa[3]+=carta.valorDefensaMano;
        ataqueTotal+=carta.valorAtaque;
        defensaTotal+=carta.valorDefensaMano;
      }
    }
    //Jugamos mas de una carta
    if (cartasJugadas.length>1) {
      // PODER TREBOLES
      if (cartasPorPoder[2]>0 && poderActual!=2){
        ataqueTotal=ataqueTotal*2;
      }
      //PODER PICAS
      if (cartasPorPoder[3]>0 && poderActual!=3){
        defensaTotal=cartasPorDefensa[0]+cartasPorDefensa[1]+cartasPorDefensa[2]+cartasPorDefensa[3];
        setDefensaJugador(defensaJugador+defensaTotal);
      }
      if (cartasPorPoder[1]>0){
        cartasCoger=cartasPorPuntos[0]+cartasPorPuntos[1]+cartasPorPuntos[2]+cartasPorPuntos[3];
      }
      if (cartasPorPoder[0]>0){
        cartasDescarte=cartasPorPuntos[0]+cartasPorPuntos[1]+cartasPorPuntos[2]+cartasPorPuntos[3];
      }
    } else { //jugamos una carta
      cartasCoger= cartasPorPuntos[1];
      cartasDescarte = cartasPorPuntos[0];
      //PODER TREBOLES
      if (cartasPorPoder[2]>0 && poderActual!=2){
        ataqueTotal=ataqueTotal*2;
      } //PODER PICAS 
      else if (cartasPorPoder[3]>0  && poderActual!=3) {
        setDefensaJugador(defensaJugador+defensaTotal);
      }
    }
    console.log("Descarte ", cartasDescarte)
    
    setAtaqueJugador(ataqueTotal);
    //Quitamos vida al monstruo
    const vidaRestanteMonstruo=vidaMonstruo-ataqueTotal;
    setVidaMonstruo(vidaRestanteMonstruo)

    //Devolvemos cartas al mazo de descartes (PODER CORAZONES)
    if(cartasPorPoder[0]>0 && poderActual!=0){
      if(mazoDescartes.length>cartasDescarte){
        shuffleMazoDescartes();
        addNCartasFinalMazo(popLastNMazoDescartes(cartasDescarte));
      } else if(mazoDescartes.length>0 && mazoDescartes.length<=cartasDescarte){
        shuffleMazoDescartes();
        addNCartasFinalMazo(popLastNMazoDescartes(mazoDescartes.length))
      } 
    } 
    //Cogemos cartas del mazo (PODER DIAMANTES)
    if (cartasPorPoder[1]>0 && poderActual!=1){
      const cartasFaltanMano = 8-mano.length;
      if (cartasCoger <= cartasFaltanMano) {
        addNCartasMano(popLastNMazo(cartasCoger));
      } else {
        addNCartasMano(popLastNMazo(cartasFaltanMano));
      }
    }

    if (vidaRestanteMonstruo<=0){
      setEstadoPrincipal(2);
    } else {
      setEstadoTurnoJugador(2); 
    }
  }
  
  function jugarODescartarCartas() {
    //Paso 0 Turno
    if(estadoTurnoJugador==0){
      const poderMonstruo = monstruos[monstruos.length-1].poder;
      if (poderMonstruo == 'C')       setPoderActual(0);
      else if (poderMonstruo == 'D')  setPoderActual(1);
      else if (poderMonstruo == 'T')  setPoderActual(2);
      else if (poderMonstruo == 'P')  setPoderActual(3);

      setEnabledVida(false);
      for (const carta of cartasSeleccionadas) {
        addCartaJugada(carta);
        removeCartaMano(carta);
      }
      setEstadoTurnoJugador(1); 
    } //DESCARTARSE DE CARTAS Y DESCARTAR LAS CARTAS JUGADAS
    else if (estadoTurnoJugador==2 || estadoTurnoJugador==3){
      descartarCartasMano();
      descartarCartasJugadas();

      setAtaqueJugador(0)
      setMensajeBoton("Jugar cartas");
      setPuntosDescarte(0);
      setMensajeDescartarJugador("")
      setEstadoTurnoJugador(4);
    } 
    
  }
  function resetMano(){
    addNCartasFinalMazoDescartes(popLastNMano(mano.length))
    mazo.length>7?addNCartasMano(popLastNMazo(8)):addNCartasMano(popLastNMazo(mazo.length));
    setNumeroVidas(numeroVidas-1);
  }
  function nuevaPartida(){
    for(const carta of mano){
      addCartaFinalMazo(carta)
    }
    for(const carta of mazoDescartes){
      addCartaFinalMazo(carta)
    }
    resetMonstruos(); 
    resetMazoDescartes(); 
    resetCartasMano(); 
    resetCartasSeleccionadas(); 
    resetCartasJugadas();
    setMensajeDescartarJugador("");
    setSuperaDescarte(true);
    setMensajeBoton("Jugar cartas");
    setEstadoPrincipal(0);
    setEstadoTurnoJugador(0);
  }

  return (
    <>
    <div className='container-mazos'>
      <div className='container-mazo-monstruos'>
        <p>VIDA: {vidaMonstruo}</p>
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
        <button className='button-partida-nueva' onClick={nuevaPartida}>NUEVA PARTIDA</button>
        <p>VIDAS</p>
        <div className='vidas'>
        {numeroVidas>1 && <button className={enabledVida?'button-vida':'button-vida-disabled'} disabled={!enabledVida} onClick={resetMano}>
          <img src="heart.svg" className="imagen-vida" />
        </button>}
        {numeroVidas!=0 && <button className={enabledVida?'button-vida':'button-vida-disabled'} disabled={!enabledVida} onClick={resetMano}>
          <img src="heart.svg" className="imagen-vida" />
        </button>}
        </div>
      </div>
    </div>
    <div className='container-cartas-jugadas'>
      <div className='puntos-jugador'>
        <p>Ataque: {ataqueJugador}</p>
        <p>Defensa: {defensaJugador}</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        {cartasJugadas.map((carta, index) => (
        <CartasMano obj={carta} zindex={index} />
      ))}
      </div>
      
    </div>
      <div className='container-mano'>
        <div className='container-button-echar-cartas'>
          {puntosDescarte != 0 && <p>Llevas {puntosDescarte} acumulados</p>}
          <button className={superaDescarte?'button-echar-cartas':'button-echar-cartas-disabled'} 
          onClick={jugarODescartarCartas} disabled={!superaDescarte}>{mensajeBoton}</button>
        </div>
        <div className='cartas-mano'>
          <p style={{color: 'white', marginBottom: 40}}>{mensajeDescartarJugador}</p>
          {mano.map((carta, index) => (
            <CartasMano obj={carta} zindex={index} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
