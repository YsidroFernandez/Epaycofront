import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ButtonComponent from '../../component/button';
import singup from '../../API/singup';
import CustomizedSnackbars from '../../component/toast';


const useStyles = makeStyles((theme) => ({
  
  form: {
    
    backgroundColor:'#c66073',
    textAlign:'center',
    marginLeft :'50px'

  },
  textField: {
    width: '5ch',
  },
  button :{
    textAlign: 'center'
  }
}));

export default function RechargeBalanceComponent(props) {

  const {history,handleRecharge, handleChangeDocument, handleChangePhone, handleChangeAmount} = props;
  const classes = useStyles();


  return (



        <div className={classes.form} >
          <form noValidate autoComplete="off">
          <div >
              <TextField
                id="document"
                label="Documento"
                onChange={handleChangeDocument}
                className={classes.textField}
              />
            </div>
            <div >
              <TextField
                id="phone"
                label="Teléfono"
                onChange={handleChangePhone}
                className={classes.textField}
              />
            </div>
            <div >
              <TextField
                id="amount"
                label="Monto"
                type="number"
                onChange={handleChangeAmount}
                className={classes.textField}
              />
            </div>
           
            <div  className={classes.textField}>
              <ButtonComponent color="secondary" title="Recargar Saldo" action={handleRecharge} />
            </div>
          </form>
        
          </div >


  );
}