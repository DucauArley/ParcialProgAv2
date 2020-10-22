import React, { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPokeById } from '../Redux/ducks/peliDucks';
import PeliculaPage from '../pages/PeliculaPage';

export default function Pelicula()
{
    const dispatch = useDispatch();
    let { id } = useParams(); 
    const { peli } = useSelector(state => state);
    const { detalle } = peli;
    let det = [];
    
    useEffect(() => {
        dispatch(getPokeById(id));
      }, [id])

      console.log("El detalles")
      console.log(detalle);

      if(detalle != "")
      {
        let i = -1;
        detalle.map(response=>{
          
          response.then(result => {
            i++;
            det[i] = result;
  
          }).catch( err => console.log(err));
          
        })
        
      }

      return(
        <PeliculaPage peliculas={det}></PeliculaPage>
        
    )
}