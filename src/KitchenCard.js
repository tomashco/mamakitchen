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
    width: "22%",
    margin: "0.8rem",
    [sizes.down("md")]:{
      width: "43%",
      margin: "1rem",
    },
    [sizes.down("xs")]:{
      width: "100%",
    }
  },
  content: {
    height: "130px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardImg: {
    width: "100%",
    height: "200px",
    objectFit: "cover"
  },
  button: {
    marginBottom: "1rem"
  }
});

const KitchenCard = ({uid, history}) => {
  const kitchen = useSelector(state => state.firebase.data.kitchens[uid]);
  const {id, src, name} = kitchen;

  const goToKitchen = () => {
    history.push({
      pathname:`/kitchen/${id}`,
      uid: uid});
  }

  const classes = useStyles()
  return (
    <Card
      hoverable
      className={classes.container}
      cover={<img className={classes.cardImg} alt={src} src={src} />}
      >
      <div className={classes.content}>
      <Title
      style={{margin: "0 auto"}}
      level={4}>{name}</Title>
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
