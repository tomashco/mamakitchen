import React from 'react';
import KitchenCard from './KitchenCard'
import {createUseStyles} from 'react-jss'
import sizes from "./styles/sizes";

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

const KitchenList = ({kitchens}) => {
  const classes = useStyles()

  return (
    <div className={classes.kitchenList}>
    {kitchens.map((kitchen) => <KitchenCard key={kitchen.id} {...kitchen} />)}
    </div>
  );
}

export default KitchenList;
