import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LoadingComponent } from '../../components/ExceptionComponents/ExceptionComponents';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductAction, updateSelectedProductAction } from '../../store/actions/productsActions';
import {
    addNewProductToCartAction,
    increaseProductAmountAction,
    selectPaymentPageAction
} from '../../store/actions/shoppingListActions';
import { Box, Button, Typography, Card, CardContent, CardMedia } from '@material-ui/core';
import { capitalized, capitalFirstLetter } from '../../services/dataTypes.service';
import { cloneDeep } from 'lodash';
import { isProductExists } from '../../services/shoppingList.service';
import { v4 as uuidv4 } from 'uuid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useParams, useHistory } from "react-router-dom";
import Popover from '@material-ui/core/Popover';

import './ProductPage.css';
import { Alert } from '@material-ui/lab';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 30,
        height: 500,
        boxShadow: '0px 0px 2px 2px rgba(0,0,0,0.2)',
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50,
    },
    media: {
        border: '2px solid #ccc',
        borderRadius: '25px',
        height: 400,
        width: 400,
    },
    title: {
        fontFamily: 'Acme, sans-serif',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '1px solid #ccc',
        borderRadius: '25px',
    },
    button: {
        width: '200px',
    },
    popover: {
        width: '200px',
    }
}));

const ProductPage = (props) => {
    const classes = useStyles();
    const { collection, productID } = useParams();
    const { product: initProduct, isLoading } = useSelector(state => state.product);
    const { shoppingList } = useSelector(state => state.shoppingList);
    const [product, setProduct] = useState(cloneDeep(initProduct));

    const [anchorSuccessPopover, setSuccessPopover] = useState(null);
    const [anchorErrorPopover, setErrorPopover] = useState(null);

    const openSuccess = Boolean(anchorSuccessPopover);
    const openError = Boolean(anchorErrorPopover);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductAction(collection, productID));
    }, [collection, productID]);

    useEffect(() => {
        if (initProduct) setProduct(cloneDeep(initProduct));
    }, [initProduct]);

    const onSizeClick = event => {
        const newProduct = cloneDeep(product);
        newProduct.selectedSize = event.target.value;
        setProduct(newProduct);
    }

    const onAddToCartClick = event => { 
        if (!validateSize(product)) {
            setErrorPopover(event.currentTarget);
            return;
        }
        // isProductExists return isFound index
        const productIndex = isProductExists(shoppingList, product);
        if (productIndex !== -1) {
            increaseProductAmount(productIndex);
        } else {
            addNewProductToCart(product);
        }
        setSuccessPopover(event.currentTarget);
    }

    const onBuyNowClick = (event, history) => {
        if (!validateSize(product)) {
            setErrorPopover(event.currentTarget);
            return;
        }
        product.amount = 1;
        dispatch(updateSelectedProductAction(product));
        dispatch(selectPaymentPageAction("product-page"));
        history.push("/payment-page");
    }

    const addNewProductToCart = (product) => {
        product.uuid = uuidv4();
        dispatch(addNewProductToCartAction(product));
    }

    const increaseProductAmount = (productIndex) => {
        dispatch(increaseProductAmountAction(productIndex));
    }

    const validateSize = (product) => !(!product.selectedSize && product.sizes.length > 1)

    let history = useHistory();

    return (
        <Card className={classes.root}>
            {
                <div className={classes.cardContainer}>
                    {
                        isLoading ? <LoadingComponent />
                            : <Fragment>
                                <CardMedia
                                    className={classes.media}
                                    image={product.imageUrl}
                                />
                                <CardContent className={classes.details}>
                                    <Typography gutterBottom align="center" variant="h5" className={classes.title}>
                                        {capitalFirstLetter(`${product.caption}`)}
                                    </Typography >
                                    {
                                        product.sizes && product.sizes.length > 1 &&
                                        <Typography gutterBottom align="center" variant="caption">
                                            {capitalized("select size")}
                                        </Typography >
                                    }
                                    <div className="radio-buttons-group">
                                        {
                                            product.sizes && product.sizes.length > 1 &&
                                            product.sizes.map((size, i) => {
                                                if (typeof size === 'string') { size = capitalized(size); }
                                                return (
                                                    <label className="size-label" key={'size_label' + i}>
                                                        <input
                                                            type="radio" key={'radio' + i} name="size" value={size}
                                                            onClick={event => onSizeClick(event)}
                                                        />
                                                        <div className="radio-button" key={'radio_button' + i}>{size}</div>
                                                    </label>
                                                )
                                            })
                                        }
                                    </div>
                                    <Typography gutterBottom align="center" variant="subtitle1">
                                        {capitalFirstLetter(`${product.price}$`)}
                                    </Typography >
                                    <Box
                                        m={1}
                                        display="flex"
                                        justifyContent="center"
                                    >
                                        <form>
                                            <Button
                                                className={classes.button}
                                                id="buy-now"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                startIcon={<ShoppingCartIcon />}
                                                onClick={event => onBuyNowClick(event, history)}
                                            >
                                                Buy Now
                                        </Button >
                                        </form>
                                    </Box>
                                    <Box
                                        m={1}
                                        display="flex"
                                        justifyContent="center"
                                    >
                                        <Button
                                            className={classes.button}
                                            id='add-to-cart'
                                            fullWidth
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<FavoriteBorder />}
                                            onClick={onAddToCartClick}
                                        >
                                            Add to cart
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Fragment>
                    }
                </div>
            }
            <Popover
                id="success-popover"
                open={openSuccess}
                anchorEl={anchorSuccessPopover}
                onClose={() => setSuccessPopover(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Alert severity="success">Product Added.</Alert>
            </Popover>
            <Popover
                id="success-popover"
                open={openError}
                anchorEl={anchorErrorPopover}
                onClose={() => setErrorPopover(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Alert severity="error">Please Select Size!</Alert>
            </Popover>
        </Card >
    );
}

export default ProductPage;
