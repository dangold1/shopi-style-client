import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LoadingComponent } from "../../components/ExceptionComponents";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductAction,
  updateSelectedProductAction,
} from "../../store/actions/products";
import {
  addNewProductToCartAction,
  increaseProductAmountAction,
  selectPaymentPageAction,
} from "../../store/actions/shopping-list";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import {
  capitalized,
  capitalFirstLetter,
} from "../../services/data-types";
import { cloneDeep } from "lodash";
import { isProductExists } from "../../services/shopping-list";
import { v4 as uuidv4 } from "uuid";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useParams, useHistory } from "react-router-dom";
import Popover from "@material-ui/core/Popover";

import "./ProductPage.css";
import { Alert } from "@material-ui/lab";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    height: "500",
    boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.2)",
    [theme.breakpoints.down("sm")]: {
      height: 500,
    },
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: "40px",
    paddingBottom: "40px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: 20,
      flexDirection: "column",
      alignItems: "center",
      marginTop: 0,
    },
  },
  media: {
    height: 400,
    width: 400,
    backgroundSize: "contain",
    [theme.breakpoints.down("sm")]: {
      margin: 20,
      border: 0,
      borderRadius: 0,
      height: 150,
      width: 150,
    },
  },
  title: {
    fontFamily: "Acme, sans-serif",
    [theme.breakpoints.down("sm")]: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 17,
      flexWrap: "wrap",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "1px solid #ccc",
    borderRadius: "25px",
    width: "500px",
    [theme.breakpoints.down("sm")]: {
      border: 0,
      borderRadius: 0,
      marginTop: "40px",
      height: 150,
      width: "100%",
    },
  },
  button: {
    margin: 5,
    width: "230px",
    [theme.breakpoints.down("sm")]: {
      marin: "0 auto",
      width: "230px",
    },
  },
  popover: {
    width: "200px",
  },
}));

const ProductPage = (props) => {
  const classes = useStyles();
  const { collection, productID } = useParams();
  const { product: initProduct, isLoading } = useSelector(
    (state) => state.product
  );
  const { shoppingList } = useSelector((state) => state.shoppingList);
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

  const onSizeClick = (event) => {
    const newProduct = cloneDeep(product);
    newProduct.selectedSize = event.target.value;
    setProduct(newProduct);
  };

  const onAddToCartClick = (event) => {
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
  };

  const onBuyNowClick = (event, history) => {
    if (!validateSize(product)) {
      setErrorPopover(event.currentTarget);
      return;
    }
    product.amount = 1;
    dispatch(updateSelectedProductAction(product));
    dispatch(selectPaymentPageAction("product-page"));
    history.push("/payment-page");
  };

  const addNewProductToCart = (product) => {
    product.uuid = uuidv4();
    dispatch(addNewProductToCartAction(product));
  };

  const increaseProductAmount = (productIndex) => {
    dispatch(increaseProductAmountAction(productIndex));
  };

  const validateSize = (product) =>
    !(!product.selectedSize && product.sizes.length > 1);

  let history = useHistory();

  if (isLoading) {
    return <div style={{ textAlign: "center" }}><LoadingComponent /></div>;
  }

  return (
    <Card className={classes.root}>
      {
        <div className={classes.cardContainer}>
          <CardMedia className={classes.media} image={product?.imageUrl} />
          <CardContent className={classes.details}>
            <Typography
              gutterBottom
              align="center"
              variant="h5"
              className={classes.title}
            >
              {capitalFirstLetter(`${product?.caption}`)}
            </Typography>
            {product?.sizes && product?.sizes.length > 1 && (
              <Typography gutterBottom align="center" variant="caption">
                {capitalized("select size")}
              </Typography>
            )}
            <div className="radio-buttons-group">
              {product?.sizes &&
                product?.sizes.length > 1 &&
                product?.sizes.map((size, i) => {
                  if (typeof size === "string") {
                    size = capitalized(size);
                  }
                  return (
                    <label className="size-label" key={"size_label" + i}>
                      <input
                        type="radio"
                        key={"radio" + i}
                        name="size"
                        value={size}
                        onClick={(event) => onSizeClick(event)}
                      />
                      <div className="radio-button" key={"radio_button" + i}>
                        {size}
                      </div>
                    </label>
                  );
                })}
            </div>
            <Typography gutterBottom align="center" variant="subtitle1">
              {capitalFirstLetter(`${product?.price}$`)}
            </Typography>
            <div className="actions-buttons">
              <Button
                className={classes.button}
                id="buy-now"
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                onClick={(event) => onBuyNowClick(event, history)}
              >
                Buy Now
              </Button>
              <Button
                className={classes.button}
                id="add-to-cart"
                variant="contained"
                color="secondary"
                startIcon={<FavoriteBorder />}
                onClick={onAddToCartClick}
              >
                Add to cart
              </Button>
            </div>
          </CardContent>
        </div>
      }
      <Popover
        id="success-popover"
        open={openSuccess}
        anchorEl={anchorSuccessPopover}
        onClose={() => setSuccessPopover(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
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
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="error">Please Select Size!</Alert>
      </Popover>
    </Card>
  );
};

export default ProductPage;
