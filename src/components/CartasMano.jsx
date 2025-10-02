import { useState } from 'react'
import '../App.css'

function CartasMano({obj, zindex}) {
  const [elegida, setElegida] = useState(0)

  const elegirCarta =() => {
    if(elegida == 0)
        setElegida(20)
    else 
        setElegida(0)
  }
  return (
    <>
    <img className='card' onClick={elegirCarta} src={obj.image} style={{zIndex: zindex, position: 'relative', right: zindex==0?0:40*zindex, bottom: elegida}} />
    </>
  )
}

export default CartasMano