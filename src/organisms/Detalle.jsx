import React, { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPokeById } from '../Redux/ducks/pokeDucks';
import DetallePage from '../pages/DetallePage';

export default function Detalle()
{
    const dispatch = useDispatch();
    let { id } = useParams(); 
    const { poke } = useSelector(state => state);
    const { detalle, habilidades } = poke;
    let hab = [];
    
    useEffect(() => {
        dispatch(getPokeById(id));
      }, [id])

      if(habilidades != "")
      {
        let i = -1;
        habilidades.map(response=>{
          
          response.then(result => {
            i++;
            hab[i] = result;
            /*hab.map(response=>
              {
                console.log("Response");
                console.log(response);
              })*/
  
          }).catch( err => console.log(err));
          
        })
        
      }


      return(
        <DetallePage detalle={detalle}
        hab={hab}
        />
    )
}