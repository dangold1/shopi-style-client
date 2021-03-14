import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { LoadingComponent } from "../components/ExceptionComponents/ExceptionComponents";
import categories from "../utils/data";
const Container = lazy(() => import("@material-ui/core/Container"));
const ProductPage = lazy(() => import("../pages/ProductPage/ProductPage"));
const CollectionPage = lazy(() =>
  import("../pages/CollectionPage/CollectionPage")
);
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const ShoppingListPage = lazy(() =>
  import("../pages/ShoppingListPage/ShoppingListPage")
);
const PaymentPage = lazy(() => import("../pages/PaymentPage/PaymentPage"));

const PagesRouts = (props) => {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: "center" }}>
          <LoadingComponent />
        </div>
      }
    >
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
    </Suspense>
  );
};

export default PagesRouts;
