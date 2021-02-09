import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import { LoadingComponent } from '../../components/ExceptionComponents/ExceptionComponents';
import TextField from '@material-ui/core/TextField';
import { cloneDeep } from 'lodash';
import { STRIPE_PUBLISH_KEY, BASE_API_URL } from '../../utils/keys';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Typography, Paper, Grid, Button, CssBaseline } from '@material-ui/core';
import axios from 'axios';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';

const stripePromise = loadStripe(STRIPE_PUBLISH_KEY);

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
        paddingBottom: '40px',
    },
    tableContainer: {
        margin: '0 auto',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        width: '700px',
    },
    image: {
        height: '100px',
        width: '100px',
        borderRadius: "50%",
    },
    centerTableCell: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    amountField: {
        width: '50%',
    },
    paper: {
        paddingTop: theme.spacing(3),
        paddingRight: theme.spacing(8),
        paddingLeft: theme.spacing(8),
        paddingBottom: theme.spacing(3),
    },
    form: {
        width: '700px',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]:{
            width: '320px',
        },
    },
    paymentCard: {
        margin: '20px',
        [theme.breakpoints.down('sm')]:{
            margin: 0,
            marginTop: '20px',
            marginBottom: '20px',
            width:'110%',
        },
    }
}));


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

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

const PaymentPage = props => {
    const classes = useStyles();
    const { product: initProduct, isLoading: productLoading } = useSelector(state => state.product);
    const { shoppingList, isLoading: listLoading, paymentPage } = useSelector(state => state.shoppingList);
    const [product, setProduct] = useState(cloneDeep(initProduct));

    const onAmountChange = (event, product) => {
        product.amount = event.target.value;
        product.newPrice = product.amount * product.price;
        setProduct(cloneDeep(product));
    }
    const isMobileMode = useCheckMobileScreen();
    
    return (
        <Container >
            {
                productLoading || listLoading ? <LoadingComponent />
                    : product && paymentPage === "product-page" && !isMobileMode &&
                    (
                        <TableContainer elevation={3} className={classes.tableContainer} component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Image</TableCell>
                                        <TableCell align="center">Caption</TableCell>
                                        <TableCell align="center">Size</TableCell>
                                        <TableCell align="center">Amount</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={product.uuid}>
                                        <TableCell className={classes.centerTableCell} component="th" scope="row">
                                            <img className={classes.image} src={product.imageUrl} />
                                        </TableCell>
                                        <TableCell align="center">{product.caption}</TableCell>
                                        <TableCell align="center">{product.selectedSize ? product.selectedSize : "-"}</TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                className={classes.amountField}
                                                id="standard-number"
                                                inputProps={{ min: 1, style: { textAlign: 'center' } }}
                                                type="number"
                                                defaultValue={product.amount}
                                                onChange={event => onAmountChange(event, product)}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            {`${product.newPrice ? product.newPrice : product.price}$`}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
            }
            <Elements stripe={stripePromise}>
                {product && paymentPage === "product-page" && <CheckoutForm items={[product]} />}
                {shoppingList && paymentPage === "shopping-list-page" && <CheckoutForm items={shoppingList} />}
            </Elements>
        </Container>
    );
}


const CheckoutForm = ({ items }) => {
    const classes = useStyles();
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');

    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const totalPrice = items.reduce((acc, item) => acc + (item.amount * item.price), 0);

    const onSubmit = async event => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (!error) {
            const { id } = paymentMethod;
            try {
                const { data } = await axios.post(`${BASE_API_URL}/payment`, { id, amount: 1099 });
                if (data.isConfirm) setOpenDialog(true);
            } catch (err) {
                console.log(err)
            }
        } else {
            console.log(error)
        }
    }

    const validateEmail = email => {
        if (email === '') return true;
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }

    return (
        <div className={classes.root}>
            <form onSubmit={onSubmit} className={classes.form}>
                <Paper elevation={5} className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}><Typography >Total Charges: {totalPrice}$</Typography></Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="full-name"
                                        size="small"
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        size="small"
                                        variant="outlined"
                                        required
                                        error={!validateEmail(email)}
                                        onChange={event => setEmail(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Delivery Address"
                                        name="address"
                                        size="small"
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <CssBaseline />
                    <CardElement className={classes.paymentCard} />
                    <Grid item xs={12}>
                        <Button
                            color="primary"
                            fullWidth
                            disabled={!stripe}
                            type="submit"
                            variant="contained">
                            Pay
                    </Button>
                    </Grid>
                    <Dialog
                        open={openDialog}
                        onClose={handleClose}
                    >
                        <DialogTitle id="alert-dialog-title" onClose={handleClose}>
                            Payment Confirmation
                        </DialogTitle>
                        <DialogContent dividers>
                            <DialogContentText id="dialog">
                                This is a dummy payment. Payment process is still in development.
                                </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </Paper>
            </form >
        </div >
    )
}

export default PaymentPage;