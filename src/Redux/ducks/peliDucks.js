import { getPokes } from "../../utils/http";
import { loadingApp, loadedApp } from "./appDucks";


const FETCH_PELI = 'FETCH_PELI';

const defaultState = {
   detalle: ""
 };


export default function reducer(state = defaultState, action)
{
 const{type, payload} = action;

 switch(type)
 {
   case FETCH_PELI:
      return{
         state,
         detalle: payload.detalle
      }
   default:
      return state;
 }
 
}

function fetchDetalle(moves) {
   return {
     type: FETCH_PELI,
     payload: {
        detalle: moves
     }
   }
  
 }

 export function getPokeById(id) {
   return async (dispatch, state) => {
     dispatch(loadingApp());
     try {

       const pokes = await getPokes("https://pokeapi.co/api/v2/pokemon/" + id);

       const moves = pokes.moves.map(async response => {
        const movesInfo = response
        return movesInfo;
      });
       
       dispatch(loadedApp(false, false, null));
       dispatch(fetchDetalle(moves));
     } catch (error) {
       console.log("error: ", error);
       dispatch(loadedApp(false, true, "No se pudieron cargar los pokemons"));
     }
   }
 }
 