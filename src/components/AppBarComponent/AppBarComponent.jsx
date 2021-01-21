import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, TextField, Tooltip } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
  link: {
    color: 'white',
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
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

// ---------------------------------- Constants ----------------------------------

const AppBarComponent = props => {
  const classes = useStyles();
  const { shoppingList } = useSelector(state => state.shoppingList);

  // const [anchorEl, setAnchorEl] = useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  // const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const onMobileMenuOpen = (event) => { setMobileMoreAnchorEl(event.currentTarget); };

  // const onMenuClose = () => {
  //   setAnchorEl(null);
  //   onMobileMenuClose();
  // };

  // const onMobileMenuClose = () => { setMobileMoreAnchorEl(null); };
  // const onProfileMenuOpen = (event) => { setAnchorEl(event.currentTarget); };

  // ---------------------------------- Render AppBarComponent ----------------------------------
  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <img className={classes.appBarLogo} src={`${process.env.PUBLIC_URL}/assets/logos/logo-smaller.png`} />
          </Link>
          <AutoCompleteComponent />
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Link to="/" className={classes.link}>
            <Tooltip title="Home">
              <IconButton aria-label="home" color="inherit">
                <Badge color="secondary">
                  <HomeIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Link>
          <Link to="/shopping-list" className={classes.link}>
            <Tooltip title="Cart">
              <IconButton aria-label="cart-notifications" color="inherit">
                {!shoppingList.length && <AddShoppingCartIcon />}
                {
                  shoppingList.length &&
                  <Badge badgeContent={getProductsAmount(shoppingList)} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                }
              </IconButton>
            </Tooltip>
          </Link>
          {/* <Tooltip title="Account">
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={onProfileMenuOpen}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip> */}
        </div>
        {/* <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={onMobileMenuOpen}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </div> */}
        </Toolbar>
      </AppBar>
      {/* { renderMobileMenu} */ }
  {/* { renderMenu} */ }
    </div >
  );


  // const menuId = 'primary-search-account-menu';
  // const mobileMenuId = 'primary-search-account-menu-mobile';

  // ---------------------------------- renderMenu ----------------------------------

  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     open={isMenuOpen}
  //     onClose={onMenuClose}
  //   >
  //     <MenuItem onClick={onMenuClose}>Sign In</MenuItem>
  //     <MenuItem onClick={onMenuClose}>Register</MenuItem>
  //   </Menu>
  // );


  // ---------------------------------- renderMobileMenu ----------------------------------

  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl={mobileMoreAnchorEl}
  //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     id={mobileMenuId}
  //     keepMounted
  //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     open={isMobileMenuOpen}
  //     onClose={onMobileMenuClose}
  //   >
  //     <MenuItem onClick={onMobileMenuClose}>
  //       <IconButton aria-label="home" color="inherit">
  //         <Badge color="secondary">
  //           <HomeIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Home</p>
  //     </MenuItem>
  //     <MenuItem onClick={onMobileMenuClose}>
  //       <IconButton aria-label="cart-notifications" color="inherit">
  // { !shoppingList.length && <AddShoppingCartIcon />}
  //         {
  //          shoppingList.length &&
  //           <Badge badgeContent={shoppingList.length} color="secondary">
  //             <ShoppingCartIcon />
  //           </Badge>
  //         }
  //       </IconButton>
  //     </MenuItem>
  //     <MenuItem onClick={onProfileMenuOpen}>
  //       <IconButton
  //         aria-label="account of current user"
  //         aria-controls="primary-search-account-menu"
  //         aria-haspopup="true"
  //         color="inherit"
  //       >
  //         <AccountCircleIcon />
  //       </IconButton>
  //       <p>Profile</p>
  //     </MenuItem>
  //   </Menu>
  // );
}



export default AppBarComponent;
