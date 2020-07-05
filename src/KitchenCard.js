import React from 'react';
import { useSelector } from "react-redux";
import { Card, Button, Typography } from 'antd';
import {createUseStyles} from 'react-jss'
import sizes from "./styles/sizes";
import 'antd/dist/antd.css';
import './index.css';

const { Title } = Typography;

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

const KitchenCard = ({uid, history}) => {
  const kitchen = useSelector(state => state.firebase.data.kitchens[uid]);
  const {id, src, name, description} = kitchen;

  const goToKitchen = () => {
    history.push(`/kitchen/${id}`);
  }

  const classes = useStyles()
  return (
    <Card
      hoverable
      className={classes.container}
      cover={<img alt={src} src={src} />}
      >
      <Title level={3}>{name}</Title>
      {description}
      <div className={classes.button}>
        <Button
          type="primary"
          className={classes.button}
          onClick={goToKitchen}
          >See More</Button>
      </div>
    </Card>
  );
}

export default KitchenCard;
