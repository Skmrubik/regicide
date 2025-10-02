import { useState } from 'react'
import '../App.css'

function CartasMazoDescartes({descartes}) {

  return (
    <>
    {descartes.length == 0 && <div className='card-empty'></div>}
    {descartes.length >0 && <img className='card' src={descartes[descartes.length-1].obj.image} />}
    </>
  )
}

export default CartasMazoDescartes