import { useState } from 'react'
import '../App.css'
import { useEstado } from '../store/estado.js';

function CartasMazoDescartes({descartes}) {
  const mazoDescartes = useEstado((state) => state.mazoDescartes);
  return (
    <>
    {mazoDescartes.length == 0 && <div className='card-empty'></div>}
    {mazoDescartes.length >0 && <img className='card' src={mazoDescartes[mazoDescartes.length-1].image} />}
    </>
  )
}

export default CartasMazoDescartes