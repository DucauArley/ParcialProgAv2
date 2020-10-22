import React, { useEffect, useState } from 'react';
import PokeLista from "../pages/PokeLista";
import { useDispatch } from 'react-redux';
import {getPokemones} from '../Redux/ducks/appDucks';
import { useSelector } from 'react-redux';

//"https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"
//https://pokeapi.co/api/v2/pokemon/

//Pasarle a los detalles la url como se me cante, pero tengo que guardar por redux los detalles 20:24

export default function Pokemons(props)
{
    
    const { app } = useSelector(state => state);
    const {pokemons, next, previous, detalles } = app;
    const dispatch = useDispatch();
    let[url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [ cantidadPokes, setCantidadPokes ] = useState(10);
    let det = [];

    useEffect(()=>
    {
        dispatch(getPokemones(url, cantidadPokes));
        
    },[dispatch, url, cantidadPokes]);

    if(detalles != undefined)
    {
      console.log("Entra en los detalles undefined")
      let i = -1;
      detalles.map(response=>{
        
        response.then(result => {
          i++;
          det[i] = result;
          det.map(response=>
            {
            })
        }).catch( err => console.log(err));
        
      })
      
    }

    const handleCantidad = (event) => {
        setCantidadPokes(event.target.value);
        console.log("Entra cantidad");
      }

    const handleClick = (url) => {
        setUrl(url);
        console.log("Entra cantidad");
      }
  
  return(
        <PokeLista pokemons={pokemons} 
        cantidadPokes={cantidadPokes} 
        handleCantidad={handleCantidad}
        previous={previous}
        next={next}
        handleClick={handleClick}
        det={det}
        />
    )
}  