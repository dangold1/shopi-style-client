import React, { useState } from "react";
import {
  LoadingComponent,
  ErrorComponent,
} from "../../components/ExceptionComponents/ExceptionComponents";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseProductAmountAction,
  deleteProductAction,
  editProductSizeAction,
  increaseProductAmountAction,
  selectPaymentPageAction,
} from "../../store/actions/shoppingListActions";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { CssBaseline, Grid, Tooltip, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import { capitalized } from "../../services/dataTypes.service";
import "./ShoppingListPage.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  listItem: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
    width: 700,
    [theme.breakpoints.down("sm")]: {
      width: 350,
      margin: theme.spacing(0),
      marginTop: theme.spacing(3),
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
  },
  link: {
    textDecoration: "none !important",
  },
  inLineText: {
    paddingLeft: 15,
    paddingRight: 5,
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginRight: theme.spacing(7),
    border: "1px solid #ccc",
    boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(2),
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  },
  listItemPrimary: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
    },
  },
  listItemSecondary: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  select: {
    marginLeft: 20,
    padding: 5,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 30,
      padding: 2,
    },
  },
}));

const ShoppingListPage = (props) => {
  const classes = useStyles();

  const { shoppingList, isLoading, error } = useSelector(
    (state) => state.shoppingList
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const totalPrice = shoppingList.reduce(
    (acc, item) => acc + item.amount * item.price,
    0
  );

  const onDeleteProduct = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
    // Wait for user => onCancel() || onConfirm()
  };

  const onCancel = () => {
    setOpenDialog(false);
  };

  const onConfirm = (uuid) => {
    dispatch(deleteProductAction(uuid));
    // TODO: remove product from DB
    setOpenDialog(false);
  };

  const onEditProductSize = (event, index) => {
    const newSize = event.target.value;
    dispatch(editProductSizeAction(index, newSize));
    // TODO: edit product from DB
  };

  const onIncreaseAmount = (index) => {
    dispatch(increaseProductAmountAction(index));
    // TODO: increase product amount at DB
  };

  const onDecreaseAmount = (index) => {
    dispatch(decreaseProductAmountAction(index));
    // TODO: decrease product amount at DB
  };
  const onPayClick = (event, history) => {
    dispatch(selectPaymentPageAction("shopping-list-page"));
    history.push("/payment-page");
  };

  if (isLoading) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorComponent message={error} />
      </div>
    );
  }

  return (
    <div>
      <div className={classes.root}>
        <h1 className="gradient-title">
          {shoppingList?.length > 0 ? "Shopping Bag" : "Your Cart Is Empty"}
        </h1>
        <CssBaseline />
        {shoppingList?.length > 0 && (
          <Grid item xs={12}>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              onClick={(event) => onPayClick(event, history)}
            >
              {`Pay (Total Price: ${totalPrice}$)`}
            </Button>
          </Grid>
        )}
        <div className={shoppingList?.length > 0 ? classes.list : null}>
          <List>
            {shoppingList?.map((product, index) => (
              <ListItem className={classes.listItem} key={product.uuid}>
                <ListItemAvatar>
                  <Avatar src={product.imageUrl} className={classes.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      className={classes.listItemPrimary}
                    >
                      {product.caption}
                    </Typography>
                  }
                  secondary={
                    <span className={classes.listItemSecondary}>
                      {`Price: ${product.price * product.amount}$`}
                    </span>
                  }
                />
                {product.selectedSize && (
                  <select
                    name="size"
                    id="size"
                    className={classes.select}
                    key={"select-icon-" + index}
                    onChange={(event) => onEditProductSize(event, index)}
                    value={product.selectedSize}
                  >
                    <option selected="selected" className={classes.options}>
                      {product.selectedSize}
                    </option>
                    {product.sizes.map((size) =>
                      isNaN(size) ? (
                        <option className={classes.options}>
                          {capitalized(size)}
                        </option>
                      ) : (
                        <option className={classes.options}>{size}</option>
                      )
                    )}
                  </select>
                )}
                <Tooltip title="Delete">
                  <IconButton edge="end" aria-label="remove">
                    <DeleteIcon
                      key={"delete-icon-" + product.uuid}
                      onClick={() => onDeleteProduct(product)}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Reduce">
                  <IconButton edge="end" aria-label="reduce">
                    <RemoveIcon
                      key={"reduce-icon-" + index}
                      onClick={() => onDecreaseAmount(index)}
                    />
                  </IconButton>
                </Tooltip>
                <span className={classes.inLineText}>{product.amount}</span>
                <Tooltip title="Add">
                  <IconButton edge="end" aria-label="add">
                    <AddIcon
                      key={"add-icon-" + index}
                      onClick={() => onIncreaseAmount(index)}
                    />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </div>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{"Delete Product Alert"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Are you sure that you want to delete ${
                selectedProduct ? selectedProduct.caption : ""
              }?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                onConfirm(selectedProduct ? selectedProduct.uuid : null)
              }
              color="secondary"
            >
              Confirm
            </Button>
            <Button onClick={() => onCancel()} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ShoppingListPage;
