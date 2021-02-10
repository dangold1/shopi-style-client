import React, { Fragment } from 'react';
import { Switch, Route } from "react-router-dom";
import Container from '@material-ui/core/Container';
import categories from '../utils/data';
import ProductPage from '../pages/ProductPage/ProductPage';
import CollectionPage from '../pages/CollectionPage/CollectionPage';
import HomePage from '../pages/HomePage/HomePage';
import ShoppingListPage from '../pages/ShoppingListPage/ShoppingListPage';
import PaymentPage from '../pages/PaymentPage/PaymentPage';


const PagesRouts = props => {
    return (
        <Fragment>
            <Container>
                <Switch>
                    <Route path="/:collection/:productID" component={ProductPage} />
                    {
                        Object.keys(categories).map(category =>
                            categories[category].map(subCategory =>
                                <Route key={subCategory} path={`/${subCategory}`}>
                                    <CollectionPage key={subCategory} subCategory={subCategory} />
                                </Route>
                            ))
                    }
                    <Route path="/shopping-list" component={ShoppingListPage} />
                </Switch >
            </Container>
            <Switch>
                <Route exact path="/payment-page" component={PaymentPage} />
                <Route exact path="/" component={HomePage} />
            </Switch>
        </Fragment>
    )
}

export default PagesRouts;
