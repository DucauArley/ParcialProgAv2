import React, { useEffect, useState } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export default function PokeList({pokemons, cantidadPokes, handleCantidad, previous, next, handleClick, det}) 
{
    let[detalles, setDetalles] = useState([]);

      useEffect(() => {
        setTimeout(()=>
          {
            setDetalles(det);
          }, 800);
      }, [detalles])

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    const dispatch = useDispatch();

    console.log(detalles);


    useEffect(()=>
    {
        //dispatch(getPokemones(pokemons, cantidadPokes));
    },[]);


    const classes = useStyles();
    
    const style =
    {
      width: "60%",
      justifyContent:'center', 
      alignItems:'center'
    }

    return (

        <div id='poke'>     
       <h1>Pokemones:</h1>
       {
       (Array.isArray(pokemons) && pokemons.length > 0)
       &&
       <Grid style={style}>
         <label style={ { marginRight: "10px" } }>Cantidad de pokemones: </label>
           <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={cantidadPokes}
              onChange={handleCantidad}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
       <TableContainer component={Paper}>
                   <Table className={classes.table} size="small" aria-label="simple table">
                       <TableBody>
                       {pokemons.map((row) => (
                           <TableRow key={row.name}>
                           <TableCell component="th" scope="row">
                               {row.name}
                           </TableCell>
                           <TableCell align="right">
                               <Button
                              color="secondary"
                              href={"/detalle/" + getId(row.url)}
                              size="medium"
                            >
                              Detalle!
                            </Button>
                            </TableCell>
                            <TableCell align="right">
                               <Button
                              color="primary"
                              href={"/pelicula/" + getId(row.url)}
                              size="medium"
                            >
                              Pelicula!
                            </Button>
                            </TableCell>
                           </TableRow>
                       ))}
                       </TableBody>
                   </Table>
               </TableContainer>

              <br></br>
            <div>
            {
              previous !== null
              && <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => handleClick(previous)}
                className={next ? "route-buttons-style" : "previous-button-style"}
              >
                PREVIOUS
              </Button>
            }
            {
              next !== null
              && <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => handleClick(next)}
                className={previous ? "route-buttons-style" : "next-button-style"}
              >
                NEXT
              </Button>
            }
          </div>
            <br></br>

           </Grid>
       }
   </div>

    )

}

function getId(url) {
    const arr = url.split('/');
    const id = arr[arr.length - 2];
    return id;
}