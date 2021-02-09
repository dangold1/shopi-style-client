import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Tooltip } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AutoCompleteComponent from '../AutoCompleteComponent/AutoCompleteComponent';
import { getProductsAmount } from '../../services/shoppingList.service';

// ---------------------------------- useStyles ----------------------------------

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#212121'
  },
  appBarLink: {
    color: 'white',
    textDecoration: 'none',
  },
  menuLink: {
    color: 'black',
    textDecoration: 'none',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  appBarLogo: {
    padding: '5px',
    paddingTop: '15px',
    transition: 'transform .2s ease-in-out',
    "&:hover": {
      transform: 'scale(1.1)',
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 7, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  autoCompleteRoot: {
    width: '600px',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  autoCompleteLabel: {
    "&$autoCompleteFocusedLabel": {
      color: "white"
    },
  },
  autoCompleteFocusedLabel: {},
  list: {
    width: 250,
  },
  textFieldRoot: {
    color: "white"
  },
  notchedOutline: {
    borderWidth: "0.5px",
    borderColor: "white !important"
  },
  fullList: {
    width: 'auto',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

// ---------------------------------- Constants ----------------------------------

const AppBarComponent = props => {
  const classes = useStyles();
  const { shoppingList } = useSelector(state => state.shoppingList);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const onMobileMenuOpen = (event) => { setMobileMoreAnchorEl(event.currentTarget); };

  const onMobileMenuClose = () => { setMobileMoreAnchorEl(null); };

  const isMobileMode = useCheckMobileScreen();

  // ---------------------------------- renderMobileMenu ----------------------------------
  const mobileMenuId = 'menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={onMobileMenuClose}
    >
      <MenuItem onClick={onMobileMenuClose}>
        <Link to="/" className={classes.menuLink}>
          <IconButton aria-label="home" color="inherit">
            <Badge color="secondary">
              <HomeIcon />
            </Badge>
          </IconButton>
          Home
        </Link>
      </MenuItem>
      <MenuItem onClick={onMobileMenuClose}>
        <Link to="/shopping-list" className={classes.menuLink}>
          <IconButton aria-label="cart-notifications" color="inherit">
            {!shoppingList.length && <AddShoppingCartIcon />}
            {
              shoppingList.length > 0 &&
              <Badge badgeContent={getProductsAmount(shoppingList)} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            }
          </IconButton>
          Cart
        </Link>
      </MenuItem>
    </Menu>
  );

  // ---------------------------------- Render AppBarComponent ----------------------------------
  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {
            !isMobileMode &&
            <Link to="/">
              <img className={classes.appBarLogo} src={`${process.env.PUBLIC_URL}/assets/logos/logo-smaller.png`} />
            </Link>
          }
          <AutoCompleteComponent />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/" className={classes.appBarLink}>
              <Tooltip title="Home">
                <IconButton aria-label="home" color="inherit">
                  <Badge color="secondary">
                    <HomeIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Link>
            <Link to="/shopping-list" className={classes.appBarLink}>
              <Tooltip title="Cart">
                <IconButton aria-label="cart-notifications" color="inherit">
                  {!shoppingList.length && <AddShoppingCartIcon />}
                  {
                    shoppingList.length > 0 &&
                    <Badge badgeContent={getProductsAmount(shoppingList)} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  }
                </IconButton>
              </Tooltip>
            </Link>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={onMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      { renderMobileMenu}
    </div >
  );
}



export default AppBarComponent;
