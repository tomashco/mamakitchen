
import React from "react";
import { useSelector } from "react-redux";
import { useFirebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import KitchenCard from './KitchenCard'
import {createUseStyles} from 'react-jss'
import sizes from "./styles/sizes";

const kitchensQuery = {
  path: "kitchens"
};

const useStyles = createUseStyles({
  kitchenList: {
    display:"flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    [sizes.down("md")]:{
      justifyContent: "space-between",
    },
  }
});

function KitchenList({history}) {
  const classes = useStyles()
  // Attach item listener
  useFirebaseConnect(() => [kitchensQuery]);

  // Get items from redux state
  const kitchens = useSelector(state => state.firebase.ordered.kitchens);

  // Show a message while items are loading
  if (!isLoaded(kitchens)) {
    return (
      <div className={classes.kitchenList}>
        {"Kitchen list will be Loaded soon"}
      </div>
      );
    }

    // Show a message if there are no items
    if (isEmpty(kitchens)) {
      return (
        <div className={classes.kitchenList}>
          {"Kitchen list is empty"}
        </div>
      );
  }

  return (
    <div className={classes.kitchenList}>
      {kitchens
        .map(({ value: kitchen, key }, ind) => (
          <KitchenCard
          key={`${key}-${ind}`}
          uid={key}
          history={history}
          {...kitchen}
          />)
        )}
      </div>
  )
}

export default KitchenList;
