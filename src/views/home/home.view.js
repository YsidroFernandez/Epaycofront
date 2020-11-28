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
import Grid from '@material-ui/core/Grid';


import ModalPay from '../../component/modal_pay';
import ButtonComponent from '../../component/button'
import CustomizedSnackbars from '../../component/toast'
import RechargeBalanceComponent from '../../component/recharge_balance';
import CheckBalanceComponent from '../../component/check_balance'
import LoadingBackdropComponent from '../../component/loading';

import user from '../../API/user';
import registerPurchase from '../../API/register_purchase';
import recharge from '../../API/recharge_balance';
import confirmPurchase from '../../API/confirm_purchase';
import chechBlance from '../../API/check_balance';


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
            name: '',
            last_name: '',
            open: false,
            amount: 0,
            confirm: false,
            message: '',
            token: '',
            session: '',
            open_toast: false,
            severity: '',
            message_toast: '',
            document: '',
            phone: '',
            balance: 0,
            balance_purchase:0,
            email:'',
            phone_check:'',
            openLoading:false


        }

    }


    /********************** CHANGE STATE TO PROPS ****************************** */
   

    handleChange = (event, newValue) => {

        this.setState({ value: newValue })

        if(newValue===1){
           localStorage.clear();
           this.props.history.push('/')
        }
    };

    handleClose = () => {

        this.setState({ 
            value: 0,
            name: '',
            last_name: '',
            open: false,
            amount: 0,
            confirm: false,
            message: '',
            token: '',
            session: '',
            open_toast: false,
            severity: 'success',
            message_toast: '',
            document: '',
            phone: '',
            balance: 0,
            balance_purchase:0,
            email:'',
            phone_check:''
        
        })
    };

    handelModalPay = () => {

        this.setState({ open: true })
    };

    handleCloseModalPay = () => {

        this.setState({ open: false })
    };

    handleChangeAmount = (event) => {
        this.setState({ amount: event.target.value });
    };

    handleChangeToken = (event) => {
        this.setState({ token: event.target.value });
    };

    handleChangeSession = (event) => {
        this.setState({ session: event.target.value });
    };

    handleChangeDocument = (event) => {
        this.setState({ document: event.target.value });
    };

    handleChangePhone = (event) => {
        this.setState({ phone: event.target.value });
    };

    handleChangeBalance = (event) => {
        this.setState({ balance: event.target.value });
    };

    handleChangeEmail = (event) => {
        this.setState({ email: event.target.value });
    };

    handleChangePhoneBalance = (event) => {
        this.setState({ phone_check: event.target.value });
    };

    handleLogout = () => {
        localStorage.clear();
        this.props.history.push('/');
    };


    /*********************SERVICES APIREST****************************** */

    componentDidMount() {
        
        this.setState({ openLoading : true});
        console.log('cargando');
        let tkn = localStorage.getItem('tkn');
        let id = localStorage.getItem('id');

        console.log(id)

        user.getOne(id, null, tkn)
            .then(resp => {
                console.log(resp);
                if (resp.data.status === 200) {
                    this.setState(
                        {
                            openLoading: false,
                            name: resp.data.user.name,
                            last_name: resp.data.user.last_name,
                            message_toast: resp.data.message
                        }
                    )
                }else{
                    this.setState({ openLoading : false});
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

    handleSavePurchase = () => {
        this.setState({ openLoading : true});
        let data = {
            id_user: localStorage.getItem('id'),
            email: localStorage.getItem('email'),
            amount: this.state.amount
        };

        let token = localStorage.getItem('tkn');

        registerPurchase.post(data, null, token)
            .then(resp => {
                console.log(resp);
                if (resp.data.status === 200) {
                    this.setState(
                        {
                            openLoading: false,
                            confirm: true,
                            message: resp.data.message,
                            balance_purchase : this.state.amount
                        }
                    )
                } else {
                    this.setState(
                        {
                            openLoading:false,
                            open_toast: true,
                            severity: 'error',
                            message_toast: resp.data.message

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

        this.setState({ openLoading : true});

        let body = {    
            session : this.state.session,
            token : this.state.token,
            id_user : localStorage.getItem('id'),
            amount : this.state.balance_purchase
        };

        let tkn = localStorage.getItem('tkn');

        confirmPurchase.post(body,null,tkn)
            .then(resp => {
                console.log(resp);
                if (resp.data.status === 200) {
                    this.setState(
                        {
                            openLoading: false,
                            open_toast:true,
                            open: false,
                            severity:"success",
                            message_toast: resp.data.message,
                            session:'',
                            token:'',
                            confirm:false,
                            balance_purchase:0,
                            amount:0
                        }
                    )
                }else{

                    this.setState(
                        {
                            openLoading:false,
                            open_toast:true,
                            severity:"error",
                            message_toast: resp.data.message
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


    handleRecharge =()=>{

        this.setState({ openLoading : true});
        let body = {    
            document : this.state.document,
            phone : this.state.phone,
            balance : this.state.balance
        };

        let tkn = localStorage.getItem('tkn');

        recharge.post(body,null,tkn)
            .then(resp => {
                console.log(resp);
                if (resp.data.status === 200) {
                    this.setState(
                        {
                            openLoading: false,
                            open_toast:true,
                            severity:"success",
                            message_toast: resp.data.message,
                            document:'',
                            phone:'',
                            balance:0
                        }
                    )
                }else{

                    this.setState(
                        {
                            openLoading: false,
                            open_toast:true,
                            severity:"error",
                            message_toast: resp.data.message
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


    handleCheckBalance =()=>{
        this.setState({ openLoading : true});
        let body = {    
            document : this.state.email,
            phone : this.state.phone_check
        };

        let tkn = localStorage.getItem('tkn');

        chechBlance.post(body,null,tkn)
            .then(resp => {
                console.log(resp);
                if (resp.data.status === 200) {

                    let data = resp.data.account[0];

                    this.setState(
                        {
                            openLoading: false,
                            open_toast:true,
                            severity:"success",
                            message_toast: 'Su saldo es: '+ data.balance,
                            email:'',
                            phone_check:''
                        }
                    )
                }else{

                    this.setState(
                        {
                            openLoading: false,
                            open_toast:true,
                            severity:"error",
                            message_toast: resp.data.message
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

    


   


    render() {
        const { value, name, last_name, open, amount, confirm, message, token, session, open_toast, severity, message_toast,
            document, phone, balance, balance_purchase, email, phone_check, openLoading } = this.state

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

                        <Grid container item xs={12} spacing={3}>
                            <React.Fragment>
                                <Grid item xs={4} >
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
                                </Grid>
                                <Grid item xs={4}>
                                    <RechargeBalanceComponent
                                        document={document}
                                        handleChangeDocument={this.handleChangeDocument}
                                        phone={phone}
                                        handleChangePhone={this.handleChangePhone}
                                        balance={balance}
                                        handleChangeBalance={this.handleChangeBalance}
                                        handleRecharge={this.handleRecharge}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <CheckBalanceComponent
                                        email={email}
                                        handleChangeEmail={this.handleChangeEmail}
                                        phone={phone_check}
                                        handleChangePhoneBalance={this.handleChangePhoneBalance}
                                        handleCheckBalance={this.handleCheckBalance}
                                    />
                                </Grid>
                            </React.Fragment>
                        </Grid>

                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ButtonComponent color="primary" title="Salir" action={this.handleLogout} />

                </TabPanel>
                <CustomizedSnackbars open={open_toast} severity={severity} close={this.handleClose} message={message_toast} />

                <LoadingBackdropComponent openLoading={openLoading}  color="secondary"/>
            </div>
        );
    };

}

export default ScrollableHome;