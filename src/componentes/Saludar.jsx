import React, { useState } from 'react'

export default function Saludar(props)
{
    console.log(props);

    let[contador, setContador] = useState(0);

    const cambiarEstado=e=>
    {
        setContador((value)=>
        {
            console.log(value);
            return value +1;
        });
    }

    return(
        <div>
            <h1>Hola {props.nombre}</h1>
            <h1>Contador: {contador}</h1>
            <input type="button" value="State" onClick={cambiarEstado}></input>
        </div>
    )

}