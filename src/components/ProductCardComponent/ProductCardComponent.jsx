import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { capitalFirstLetter } from '../../services/dataTypes.service';

import { useDispatch } from 'react-redux';
import { updateSelectedProductAction } from '../../store/actions/productsActions';

const useStyles = makeStyles((theme) => ({
    card: {
        margin: 30,
        padding: theme.spacing(1),
        maxWidth: 300,
        transition: 'transform .2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0px 0px 4px 4px rgba(0,0,0,0.2)',
        },
    },
    media: {
        height: 280,
        backgroundSize: 'contain',
    },
    cardContent: {
        backgroundColor: '#424242',
        padding: theme.spacing(1),
        color: "#FFFFFF"
    },
    link: {
        textDecoration: 'none !important'
    }
}));

const ProductCardComponent = ({ product }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { _id, category, caption, price, imageUrl } = product;

    return (
        <Card className={classes.card}>
            <Link to={`/${category}/${_id}`} className={classes.link}>
                <CardActionArea onClick={() => dispatch(updateSelectedProductAction(product))}>
                    <CardMedia
                        className={classes.media}
                        image={imageUrl}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom align="center" variant="subtitle2" component="h2">
                            {capitalFirstLetter(caption)}
                        </Typography >
                        <Typography align="center" variant="subtitle1" component="h2">
                            {`${price}$`}
                        </Typography >
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    )
};

export default ProductCardComponent;

