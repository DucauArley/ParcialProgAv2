import { getPokes } from "../../utils/http";
import { loadingApp, loadedApp} from "./appDucks";


const FETCH_DETALLE = 'FETCH_DETALLE';

const defaultState = {
   detalle: "",
   habilidades: ""
 };

//const LOADING_APP = 'LOADING_APP'
//const LOADED_APP = 'LOADED_APP'


export default function reducer(state = defaultState, action)
{
 const{type, payload} = action;

 switch(type)
 {
   case FETCH_DETALLE:
      return{
         state,
         detalle: payload.detalle,
         habilidades: payload.habilidades
      }
   default:
      return state;
 }
 
}

function fetchDetalle({ id, name, abilities, sprites, base_experience, height, weight }, abilitiesDef) {
   return {
     type: FETCH_DETALLE,
     payload: {
       detalle: {
         id,
         name,
         abilities,
         imgUrl: [
           sprites.front_default,
           sprites.back_shiny,
           sprites.back_default,
           sprites.front_shiny
         ],
         range: base_experience,
         height: height,
         weight: weight
       },
       habilidades:abilitiesDef
     }
   }
 }


 export function getPokeById(id) {
   return async (dispatch, state) => {
     dispatch(loadingApp());
     try {
       const pokes = await getPokes("https://pokeapi.co/api/v2/pokemon/" + id);
       
       const abilities = pokes.abilities.map(async response => {
         const abilityInfo = await getPokes(response.ability.url);
         return abilityInfo;
       });
       
       dispatch(loadedApp(false, false, null));
       dispatch(fetchDetalle(pokes, abilities));
     } catch (error) {
       console.log("error: ", error);
       dispatch(loadedApp(false, true, "No se pudieron cargar los pokemons"));
     }
   }

 }
 