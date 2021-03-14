import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FiltersComponent from "../../components/FiltersComponent/FiltersComponent";
import ProductCardComponent from "../../components/ProductCardComponent/ProductCardComponent";
import {
  LoadingComponent,
  ErrorComponent,
} from "../../components/ExceptionComponents/ExceptionComponents";
import { useSelector, useDispatch } from "react-redux";
import { fetchCollectionAction } from "../../store/actions/collectionActions";

const useStyles = makeStyles((theme) => ({
  loading: {
    marginTop: "50px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 10,
  },
  card: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const CollectionPage = ({ subCategory }) => {
  const classes = useStyles();
  const { collection, isLoading, error } = useSelector(
    (state) => state.collection
  );
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, []);

  const refetch = (params) => {
    dispatch(fetchCollectionAction(subCategory, params));
  };

  if (isLoading) {
    return (
      <div className={classes.loading}>
        <LoadingComponent />
      </div>
    );
  }

  if (!collection) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <div className={classes.root}>
      {collection?.products && (
        <>
          <FiltersComponent collection={collection} refetch={refetch} />
          <Grid container spacing={1}>
            {collection?.products?.map((product) => (
              <Grid key={product._id} item xs={12} sm={3}>
                <ProductCardComponent
                  key={product._id}
                  className={classes.card}
                  product={product}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default CollectionPage;
