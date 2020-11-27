import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import user from '../../API/user';

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
        height: '150px',
    };


class ScrollableHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            name : '',
            last_name :''
        }

        this.handleChange = this.handleChange.bind(this);
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
                            last_name : resp.data.user.last_name
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

    render() {
        const { value, name, last_name } = this.state

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
                        <Tab label="Recharge Balance" icon={<AccountBalanceWalletIcon />} {...a11yProps(1)} />
                        <Tab label="Check Balance" icon={<AttachMoneyIcon />} {...a11yProps(2)} />
                        <Tab label="Exit" icon={<PersonPinIcon />} {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Paper style={root}>
                        <Typography variant="h5" >
                            Bienvenido Sr(a) : {name}{' '}{last_name}
                        </Typography>
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={1}>
                            Item Two
                            
                </TabPanel>
                <TabPanel value={value} index={2}>
                            Item Three
                </TabPanel>
                <TabPanel value={value} index={3}>
                            Item Four
                </TabPanel>

            </div>
        );
    };

}

export default ScrollableHome;