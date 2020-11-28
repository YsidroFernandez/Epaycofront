import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
   div: {
    '& > *': {
      margin: theme.spacing(10),
      width: '30ch',
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  label: {
    textAlign: 'left',
    marginLeft: theme.spacing(5),
  },
  form: {
    '& > *': {
      margin: theme.spacing(2),
      width: '50ch',
    },
  },

});


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
  confirm: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },

}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ModalPay(props) {

  const { amount, change_amount, open, save, title_button, title_modal,
    close, open_modal, button_open, title_button_cancel, cancel, confirm,
    message, token, change_token, session, change_session, confirm_pay, title_confirm } = props

  const classes = useStyles();


  return (
    // <div className={styles.div}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Realizar Pago
          </Typography>
            <Button variant="outlined" color="primary" onClick={open_modal}>
              {button_open}
            </Button>
            <Dialog onClose={close} aria-labelledby="customized-dialog-title" open={open}>
              <DialogTitle id="customized-dialog-title" onClose={close}>
                {title_modal}
              </DialogTitle>
              <DialogContent dividers>
                {
                  confirm ?
                    <form className={classes.confirm} noValidate autoComplete="off">
                      <Typography variant="subtitle1">{message}</Typography>
                      <div>
                        <TextField
                          id="token"
                          label="Token"
                          value={token}
                          onChange={change_token}
                        />
                      </div>
                      <div>
                        <TextField
                          id="amount"
                          label="Sesión"
                          value={session}
                          onChange={change_session}
                        />

                      </div>



                    </form>
                    :
                    <form className={classes.form} noValidate autoComplete="off">
                      <TextField
                        id="amount"
                        label="amount"
                        type="number"
                        value={amount}
                        onChange={change_amount}
                      />

                    </form>
                }

              </DialogContent>

              {
                confirm ?
                  <DialogActions>

                    <Button autoFocus onClick={confirm_pay} color="secondary">
                      {title_confirm}
                    </Button>

                  </DialogActions>
                  :
                  <DialogActions>
                    <Button autoFocus onClick={save} color="primary">
                      {title_button}
                    </Button>
                    <Button autoFocus onClick={cancel} color="primary">
                      {title_button_cancel}
                    </Button>

                  </DialogActions>

              }


            </Dialog>
          </CardContent>
        </CardActionArea>
      </Card>
    // </div>
  );
}
