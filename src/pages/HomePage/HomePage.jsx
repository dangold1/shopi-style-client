import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Grid, CardHeader } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import categories from '../../utils/data';
import { capitalFirstLetter } from '../../services/dataTypes.service';
import FooterComponent from '../../components/FooterComponent/FooterComponent';

const useStyles = makeStyles((theme) => ({
    backgroundImage: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/main.jpg)`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundText: {
        boxShadow: '0px 0px 8px 8px rgba(0,0,0,0.2)',
        backgroundColor: 'rgb(0,0,0)', /* Fallback color */
        backgroundColor: 'rgba(0,0,0, 0.4)', /* Black w/opacity/see-through */
        color: 'white',
        fontSize: '60px',
        fontFamily: 'Acme, sans-serif',
        border: '3px solid #f1f1f1',
        position: 'absolute',
        top: '270px',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        padding: 20,
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '95%',
            padding: 0,
            top: '230px',
        },
    },
    link: {
        textDecoration: 'none !important',
    },
    categoriesContainer: {
        marginTop: 350,
    },
    card: {
        minWidth: 200,
        maxWidth: 400,
        padding: 10,
        boxShadow: '0px 0px 8px 8px rgba(0,0,0,0.2)',
        transition: 'transform .2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.1)'
        },
    },
    cardHeader: {
        textAlign: 'center',
        fontFamily: 'Acme, sans-serif',
        fontSize: 20,
        color: 'black',
    },
    cardMedia: {
        height: 300,
    },
}));

const setImagePath = filename => `${process.env.PUBLIC_URL}/assets/images/categories/${filename}.jpg`;

const HomePage = props => {
    const classes = useStyles();
    return (
        <Fragment>
            <div className={classes.backgroundImage}>
                <CssBaseline />
                <h1 className={classes.backgroundText}>
                    Shopping From <br />Anywhere.
                </h1>
                <Container className={classes.categoriesContainer}>
                    <Grid container spacing={4}>
                        {
                            Object.keys(categories).map(category =>
                                categories[category].map((subCategory, i) =>
                                    <Grid item md={4} xs={12} >
                                        <Card className={classes.card}>
                                            <Link to={`/${subCategory}`} key={i} className={classes.link}>
                                                <CardHeader
                                                    className={classes.cardHeader}
                                                    titleTypographyProps={{ variant: 'inherit' }}
                                                    title={capitalFirstLetter(subCategory)}
                                                />
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.cardMedia}
                                                        image={setImagePath(subCategory)}
                                                    />
                                                </CardActionArea>
                                            </Link>
                                        </Card>
                                    </Grid>
                                )
                            )
                        }
                    </Grid>
                </Container>
            </div>
            <FooterComponent />
        </Fragment>
    )
}

export default HomePage;
