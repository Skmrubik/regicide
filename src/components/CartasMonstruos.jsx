import { useState } from 'react'
import '../App.css'

function CartasMonstruos({obj}) {

  return (
    <>
    <img className='card' src={obj.image} />
    </>
  )
}

export default CartasMonstruos