import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ButtonComponent from '../button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({

    form: {
       
    },
    card: {
        maxWidth: 345,
        width: 250,
        margin: theme.spacing(10),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function CheckBalanceComponent(props) {

    const { email, phone, handleCheckBalance, handleChangeEmail, handleChangePhoneBalance } = props;
    const classes = useStyles();


    return (

        // <div className={classes.root} >

        <Card className={classes.card}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Consultar Saldo
          </Typography>
                    <form noValidate autoComplete="off">
                        <div >
                            <TextField
                                id="email"
                                label="Documento"
                                value={email}
                                onChange={handleChangeEmail}

                            />
                        </div>
                        <div >
                            <TextField
                                id="phone"
                                label="Teléfono"
                                value={phone}
                                onChange={handleChangePhoneBalance}

                            />
                        </div>
                    </form>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <ButtonComponent color="secondary" title="Consultar" action={handleCheckBalance} />
            </CardActions>
        </Card>




        // </div >


    );
}