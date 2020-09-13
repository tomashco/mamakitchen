import React from "react";
import { createUseStyles } from "react-jss";
import mamakitchenStyle from "./styles/mamakitchenStyle";

const useStyles = createUseStyles(mamakitchenStyle);

function MamaKitchen() {
  const classes = useStyles();

  return (
    <div className={classes.fullPage}>
      <div className={classes.content}>
        <div className={classes.title}>
          <h1>Mamakitchen</h1>
          <h3>The homemade recipes marketplace</h3>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default MamaKitchen;
