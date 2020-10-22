import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Avatar from '@material-ui/core/Avatar';



export default function DetallePage({detalle, hab})
{
    let[habs, setHabs] = useState([]);

    useEffect(() => {
      setTimeout(()=>
        {
          setHabs(hab);
        }, 800);
    }, [habs])

    const style = 
    {
      width: "150px",
      height: "150px",
      margin: "auto"
    }

    const card = 
    {
      justifyContent:'center', 
      alignItems:'center',
      backgroundColor: "red"
    }

    return(
        <div>
        {
        detalle != ""
        && (
            <div >
              <Card >
                <CardContent style={card}>
                  <h1>{detalle.name}</h1>
                  <GridList cellHeight={160}cols={2}>
                    {detalle.imgUrl.map((img) => (
                      <GridListTile key={img}>
                       <Avatar style={style}
                        alt={detalle.name}
                        src={img} 
                        />
                      </GridListTile>
                    ))}
                  </GridList>
                  <h4>{detalle.range}</h4>
                  <h3>{detalle.abilities.length>0 ? "Habilidades:" : "Este pokemon no tiene abilities"}</h3>
                  {
                    (detalle.abilities.length > 0 && habs != undefined)
                    && 
                      habs.map(response=>
                        {
                          console.log("Entra");

                            return(
                            <div>
                              <h3 key={response.name}>{response.name}</h3>
                              <h4 key={response.id}>{response.effect_entries[0].effect}</h4>
                            </div>)
                        })
                  }
                </CardContent>
              </Card>
            </div>
          )
        }
        </div>
    )
}