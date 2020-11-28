import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ButtonComponent from '../../component/button';
import singup from '../../API/singup';
import CustomizedSnackbars from '../../component/toast';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({

  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
  card: {
    maxWidth: 345,
    width:250,
    margin: theme.spacing(10),
  },
}));

export default function RechargeBalanceComponent(props) {

  const { history, document, phone,balance,handleRecharge, handleChangeDocument, handleChangePhone, handleChangeBalance } = props;
  const classes = useStyles();


  return (

    // <div className={classes.root} >

      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Recargar Saldo
          </Typography>
            <form noValidate autoComplete="off">
              <div >
                <TextField
                  id="document"
                  label="Documento"
                  value={document}
                  onChange={handleChangeDocument}

                />
              </div>
              <div >
                <TextField
                  id="phone"
                  label="Teléfono"
                  value={phone}
                  onChange={handleChangePhone}

                />
              </div>
              <div >
                <TextField
                  id="amount"
                  label="Monto"
                  type="number"
                  value={balance}
                  onChange={handleChangeBalance}

                />
              </div>


            </form>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <ButtonComponent color="secondary" title="Recargar Saldo" action={handleRecharge} />
        </CardActions>
      </Card>




    // </div >


  );
}