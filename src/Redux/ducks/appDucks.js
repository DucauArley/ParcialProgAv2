import {getPokes} from '../../utils/http'


const LOADING_APP = 'LOADING_APP';
const LOADED_APP = 'LOADED_APP';
const FETCH_POKE= 'FETCH_POKE';

const defaultState=
{
 appName: "Pokemons",
 loading: false, 
 error: false,
 errorMsg:"",
 pokemons:[],
 previous: '',
 count: 0,
 next: '',
 detalles: []
}

export default function reducer(state = defaultState, action)
{
 const{type, payload} = action;

 switch(type)
 {
   case LOADING_APP:
      return{
       state,
       loading: true,
       error: false,
       errorMsg:""}
   case LOADED_APP:
      return{
       state,
       loading: payload.loading,
       error: payload.error,
       errorMsg:payload.errorMsg}
   case FETCH_POKE:
      const {
         count, next, previous, results   
       } = payload;
      return{
         state,
         detalles: payload.detalles,
         pokemons: results,
         count,
         previous,
         next
      }

   default:
      return {};
 }
}

export function loadingApp()
{
 return{
  type:LOADING_APP
 }
}

export function loadedApp(loading, error, errorMsg)
{
 return{
  type:LOADED_APP,
  payload:{loading, error, errorMsg}
 }
}

function fetchData({ count, next, previous, results }, detalles)
{
 return{
  type:FETCH_POKE,
  payload:{
   results,
   count,
   next,
   previous,
   detalles
 }
 }
}

export function getPokemones(url, cantidad)
{
   return async (dispatch, state)=>{
      dispatch(loadingApp());

      try
      {
         let pokes;
         let detalles

         if(url.length <35)
         {
            pokes = await getPokes(url+"?offset=0&limit=" + cantidad);
            detalles = pokes.results.map(poke=>
               {
                  return getPokes(poke.url);
               })
                }
         else
         {
            const { base, offset } = getUrlAsObj(url);
            const newUrl = `${base}?offset=${offset}&limit=${cantidad}`;
            pokes = await getPokes(newUrl);

            detalles = pokes.results.map(poke=>
               {
                  return getPokes(poke.url);
               })
         }

         dispatch(loadedApp(false,false, null));
         dispatch(fetchData(pokes, detalles));
         
      }
      catch(error)
      {
         console.log("Error", error);
         dispatch(loadedApp(false,true, "No se pudieron cargar los pokemons"));
      }
   }
}

//https://stackoverflow.com/questions/49107703/render-a-simple-list-in-react-with-promises

export function getUrlAsObj(url) {
   if(url.length > 35)
   {
   const urlBase = url.split('?');
   const caracteres = urlBase[1].split('&');
   let limit, offset;
   
   const pCaracter = caracteres[0].split('=');
   const sCaracter = caracteres[1].split('=');
   
   if (pCaracter[0] === 'limit') {
       limit = pCaracter[1];
       offset = sCaracter[1];
   } else {
       limit = sCaracter[1];
       offset = pCaracter[1];
   }

   return {
       base: urlBase[0],
       limit,
       offset
   }
   }
}