import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import user from '../../API/user';
import ModalPay from '../../component/modal_pay';
import registerPurchase from '../../API/register_purchase';
import ButtonComponent from '../../component/button'
import CustomizedSnackbars from '../../component/toast'
import RechargeBalanceComponent from '../../component/check_balance';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography variant="h1">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const root = {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        height: '550px',
    };


class ScrollableHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            name : '',
            last_name :'',
            open:false,
            amount:0,
            confirm : false,
            message:'',
            token:'',
            session:'',
            open_toast : false,
            severity: '',
            message_toast:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }



    componentDidMount(){
        console.log('Mounted');

        console.log('cargando');
        let tkn = localStorage.getItem('tkn');
        let id = localStorage.getItem('id');

        console.log(id)

        user.getOne(id,null,tkn)
            .then(resp => {
                console.log(resp);
                if(resp.data.status === 200){
                    this.setState(
                        {
                            name : resp.data.user.name,
                            last_name : resp.data.user.last_name,
                            message_toast : resp.data.message
                        }
                    )
                }
                
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

    handleChange = (event, newValue) => {

        this.setState({ value: newValue })
    };

    handleClose = () => {

        this.setState({ open_toast: false })
    };

    handelModalPay = () => {

        this.setState({ open: true })
    };

    handleCloseModalPay = () => {

        this.setState({ open: false })
    };

    handleChangeAmount = (event) => {
        this.setState({amount:event.target.value});
      };

    handleChangeToken = (event) => {
        this.setState({token:event.target.value});
    };

    handleChangeSession = (event) => {
        this.setState({session:event.target.value});
    };


    handleSavePurchase = () => {

        let data={
            id_user : localStorage.getItem('id'),
            email : localStorage.getItem('email'),
            amount : this.state.amount
        };

        let token = localStorage.getItem('tkn');

        registerPurchase.post(data,null,token)
            .then(resp => {
                console.log(resp);
                if(resp.data.status === 200){
                    this.setState(
                        { 
                            confirm : true ,
                            message : resp.data.message
                        }
                    )
                }else{
                    this.setState(
                        { 
                            open_toast : true ,
                            severity : 'error',
                            message_toast : resp.data.message

                        }
                    )
                }
                
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
        
    };

    handleConfirmPay = () => {

        console.log('Confirm')
    };

    handleLogout = () => {
        localStorage.clear();
        this.props.history.push('/');
    };




    render() {
        const { value, name, last_name, open, amount,confirm,message ,token,session, open_toast, severity,message_toast} = this.state

        return (
            <div >
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example"
                    >
                        <Tab label="Dashboard" icon={<AccountBalanceIcon />} {...a11yProps(0)} />
                        <Tab label="Exit" icon={<PersonPinIcon />} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Paper style={root}>
                        <Typography variant="h5" >
                            Bienvenido Sr(a) : {name}{' '}{last_name}
                        </Typography>

                        <ModalPay 
                            title_modal="Realizar pago"
                            open={open} 
                            amount={amount}
                            change_amount={this.handleChangeAmount}
                            button_open="Realizar pago"
                            title_button="Pagar"
                            title_button_cancel="Cancelar"
                            open_modal={this.handelModalPay}
                            close={this.handleCloseModalPay}
                            cancel={this.handleCloseModalPay}
                            save={this.handleSavePurchase}
                            confirm={confirm}
                            message={message}
                            token={token}
                            session={session}
                            change_token={this.handleChangeToken}
                            change_session={this.handleChangeSession}
                            confirm_pay={this.handleConfirmPay}
                            title_confirm="Confirmar"
                        />
                        <CustomizedSnackbars open={open_toast} severity={severity} close={this.handleClose} message={message_toast} />

                        <RechargeBalanceComponent/>
                        
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ButtonComponent color="primary" title="Salir" action={this.handleLogout} />
                            
                </TabPanel>

            </div>
        );
    };

}

export default ScrollableHome;