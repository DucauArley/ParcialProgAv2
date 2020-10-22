import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Spinner() {
  return (
    <CircularProgress 
      style={{
        width: "60px",
        height: "60px",
        margin: "40%"
      }}
    />
  )
}
