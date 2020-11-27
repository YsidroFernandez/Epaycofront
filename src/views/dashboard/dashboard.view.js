import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import user from '../../API/user';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        }
    }
  });
  
class DashboardView extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        console.log('cargando');
        let tkn = localStorage.getItem('tkn');
        let id = localStorage.getItem('id');

        console.log(id)

        await user.getOne(id,'application/json',tkn)
            .then(resp => {
                console.log(resp);
                
            })
            .catch(function (error) {
        
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

    render() {
        return (
            <Paper >
                <Typography variant="h5" >
                    Bienvenido Sr(a) : 
                </Typography>
            </Paper>
           
        );
    };

}
export default DashboardView;