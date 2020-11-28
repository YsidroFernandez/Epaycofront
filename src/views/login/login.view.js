import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ButtonComponent from '../../component/button'
import login from '../../API/login';
import CustomizedSnackbars from '../../component/toast'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#c66073',
    height: '100%',
    width: '100%',
    textAlign: 'center',
  },
  form: {
    '& > *': {
      margin: theme.spacing(2),
      width: '60%',
    },
  },
  paper: {
    display: 'flex',
    textAlign: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: '17%',
      width: '60%',
      height: '50%',
      borderRadius: 10,
    },
  },
  label: {
    textAlign: 'left',
    marginLeft: theme.spacing(5),
  },

}));


export default function LoginView(props) {

  const { history } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const classes = useStyles();


  function handleLogin() {

    console.log(email + ' : ' + password);
    let value = {
      email: email,
      password: password
    };

    login.post(value)
      .then(resp => {
        console.log(resp);
        if (resp.data.status === 200) {
          console.log('Logued')

          localStorage.setItem('id', resp.data.user._id);
          localStorage.setItem('tkn', resp.data.token);
          localStorage.setItem('email', resp.data.user.email);
          localStorage.setItem('name', resp.data.user.name);
          localStorage.setItem('last_name', resp.data.user.last_name);
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


  function handleregister() {

    history.push('/register');

  };

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <Paper >
          <form className={classes.form} noValidate autoComplete="off">

            <TextField
              id="email"
              label="Email"
              value={email}
              onChange={handleChangeEmail}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={handleChangePassword}
            />



          </form>
          <div>
            <ButtonComponent color="primary" title="Login" action={handleLogin} />

            <CustomizedSnackbars open={open} severity={severity} close={handleClose} message={message} />
            <ButtonComponent color="secondary" title="Registarse" action={handleregister} />
          </div>


        </Paper>
      </div>
    </div>
  



  );
}
