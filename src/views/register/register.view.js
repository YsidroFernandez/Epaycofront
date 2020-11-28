import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ButtonComponent from '../../component/button';
import singup from '../../API/singup';
import CustomizedSnackbars from '../../component/toast';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#c66073',
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      marginLeft: theme.spacing(50),
      marginTop: theme.spacing(10),
      width: '50%',
      height: theme.spacing(90),
    },
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      textAlign:'center'
    },
  },
  paper: {
    display: 'flex',
    textAlign: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: '17%',
      width: '60%',
      height: '60%',
      borderRadius: 10,
    },
  },
  textField: {
    width: '40ch',
  },
  button :{
    textAlign: 'center'
  }
}));

export default function RegisterView(props) {

  const {history} = props;
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [document, setDocument] = useState('');
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');

  function handleRegister() {

    
    let value = {
      email: email,
      password: password,
      name : name,
      last_name : last_name,
      document : document,
      phone : phone
    };

    login.post(value)
      .then(resp => {
        console.log(resp);
        if (resp.data.status === 200) {
          console.log('Logued')

          localStorage.setItem('id', resp.data.user._id);
          localStorage.setItem('tkn', resp.data.token);
          localStorage.setItem('email', resp.data.user.email);
          setOpen(true);
          setMessage(resp.data.message);
          setSeverity("success");
          history.push('/home');
        } else {
          setOpen(true);
          setMessage(resp.data.message);
          setSeverity("error");
        }

      })
      .catch(function (error) {

        setOpen(true);
        setMessage("Error al procesar la solicitud");
        setSeverity("error");

        if (error.response) {

          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {

          console.log(error.request);
        } else {

          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  function handleCancel(){
    history.push('');
  }


  return (
    <div className={classes.root}>
      <div className={classes.paper}>

        <Paper className={classes.paper}>

          <form className={classes.form} noValidate autoComplete="off">
            <div >
              <TextField
                id="standard-basic"
                label="Standard"
                className={classes.textField}
              />
            </div>
            <div >
              <TextField
                id="standard-basic"
                label="Standard"
                className={classes.textField}
              />
            </div>
            <div >
              <TextField
                id="standard-basic"
                label="Standard"
                className={classes.textField}
              />
            </div>
            <div >
              <TextField
                id="standard-basic"
                label="Standard"
                className={classes.textField}
              />
            </div>
            <div  className={classes.textField}>
              <ButtonComponent color="secondary" title="Registarse" action={handleRegister} />
              <ButtonComponent color="secondary" title="Cancelar" action={handleCancel} />
              <CustomizedSnackbars open={open} severity={severity} close={handleClose} message={message} />
            </div>
          </form>
          
        </Paper>
      </div>


    </div>

  );
}