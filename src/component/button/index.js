import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ButtonComponent(props) {

  const { color , action,title} = props; 
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <Button variant="contained" color={color} onClick={action}>
        {title}
      </Button>
    </div>
  );
}
