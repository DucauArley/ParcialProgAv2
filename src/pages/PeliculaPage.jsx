import React, { useEffect, useState } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function PeliculaPage({peliculas}) 
{
    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });
    let[moves, setMoves] = useState([]);

    useEffect(() => {
        setTimeout(()=>
          {
            setMoves(peliculas);
            console.log("MOves");
            console.log(moves)
          }, 800);
      }, [moves])

    const classes = useStyles();
    
    const style =
    {
      width: "60%",
      justifyContent:'center', 
      alignItems:'center'
    }

    return (
        <div id='poke'>     
       <h1>Peliculas:</h1>
       {
       (Array.isArray(moves) && moves.length > 0)
       &&
       <Grid style={style}>
       <TableContainer component={Paper}>
                   <Table className={classes.table} size="small" aria-label="simple table">
                       <TableHead>
                        <TableRow>
                            <TableCell align="center">Movimiento</TableCell>
                            <TableCell align="center">Level learned at</TableCell>
                            <TableCell align="right">Move learn method</TableCell>
                            <TableCell align="right">Version group</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                       {
                        (moves != undefined && moves != [])
                        && moves.map((row) => (
                           <TableRow key={row.move.name}>
                           <TableCell align="center" component="th" scope="row">
                               {row.move.name}
                           </TableCell>
                           <TableCell align="center">
                                {row.version_group_details[0].level_learned_at}
                            </TableCell>
                            <TableCell align="right">
                                {row.version_group_details[0].move_learn_method.name}
                            </TableCell>
                            <TableCell align="right">
                                {row.version_group_details[0].version_group.name}
                            </TableCell>
                           </TableRow>
                       ))}
                       </TableBody>
                   </Table>
               </TableContainer>

              <br></br>
            <div>
           
          </div>
           </Grid>
       }
   </div>
        
    )

}