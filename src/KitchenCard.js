import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Card, Button } from 'antd';
import {createUseStyles} from 'react-jss'
import sizes from "./styles/sizes";

const { Meta } = Card;

const useStyles = createUseStyles({
  container: {
    width: "30%",
    margin: "0.8rem",
    [sizes.down("md")]:{
      width: "43%",
      margin: "1rem",
    },
    [sizes.down("xs")]:{
      width: "100%",
    }
  },
  button: {
    marginTop:"1rem",
    display: "flex",
    justifyContent: "flex-end"
  }
});


const KitchenCard = ({kitchenName,src}) => {
  const classes = useStyles()
  return (
    <Card
    hoverable
    className={classes.container}
    cover={<img alt="example" src={src} />}
    >
    <Meta title={kitchenName} description="Coming Soon" />
    High level description of the kitchen
    <div className={classes.button}>
      <Button type="primary" classname={classes.button}>See More</Button>
    </div>
    </Card>
  );
}

export default KitchenCard;
