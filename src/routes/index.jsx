import React from "react";
import { Switch, Route } from "react-router-dom";
import categories from "../utils/data";
import Container from "@material-ui/core/Container"
import ProductPage from "../pages/ProductPage"
import CollectionPage from "../pages/CollectionPage"
import HomePage from "../pages/HomePage"
import ShoppingListPage from "../pages/ShoppingListPage"
import PaymentPage from "../pages/PaymentPage"

const PagesRouts = () => {
  return (
    <>
      <Container>
        <Switch>
          <Route path="/:collection/:productID" component={ProductPage} />
          {Object.keys(categories).map((category) =>
            categories[category]?.map((subCategory) => (
              <Route key={subCategory} path={`/${subCategory}`}>
                <CollectionPage key={subCategory} subCategory={subCategory} />
              </Route>
            ))
          )}
          <Route path="/shopping-list" component={ShoppingListPage} />
        </Switch>
      </Container>
      <Switch>
        <Route exact path="/payment-page" component={PaymentPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </>
  );
};

export default PagesRouts;
