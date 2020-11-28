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
      width: '50%',
      height: '100%',
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
      height: '70%',
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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');


  function handleRegister() {

    
    let value = {
      email: email,
      password: password,
      name : name,
      last_name : last_name,
      document : document,
      phone : phone
    };

    singup.post(value)
      .then(resp => {
        console.log(resp);
        if (resp.data.status === 200) {
          
          setOpen(true);
          setMessage(resp.data.message);
          setSeverity("success");
          history.push('/');

        } else {

          setOpen(true);
          setMessage(resp.data.message);
          setSeverity("error");

        }

      })
      .catch(function (error){

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

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    setOpen(false);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    setOpen(false);
  };


  const handleChangeDocument = (event) => {
    setDocument(event.target.value);
    setOpen(false);
  };

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
    setOpen(false);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
    setOpen(false);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.paper}>

        <Paper className={classes.paper}>

          <form className={classes.form} noValidate autoComplete="off">
          <div >
              <TextField
                id="name"
                label="Nombre"
                onChange={handleChangeName}
                className={classes.textField}
              />
            </div>
            <div >
              <TextField
                id="last_name"
                label="Apellido"
                onChange={handleChangeLastName}
                className={classes.textField}
              />
            </div>
            <div >
              <TextField
                id="email"
                label="Email"
                onChange={handleChangeEmail}
                className={classes.textField}
              />
            </div>
            <div >
              <TextField
                id="password"
                label="Password"
                onChange={handleChangePassword}
                className={classes.textField}
              />
            </div>
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
                id="telefono"
                label="Teléfono"
                onChange={handleChangePhone}
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