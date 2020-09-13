import React from "react";
import { useSelector } from "react-redux";
import { Card, Button, Typography } from "antd";
import { createUseStyles } from "react-jss";
import kitchenCardStyle from "./styles/kitchenCardStyle";
import "antd/dist/antd.css";
import "./index.css";

const { Title } = Typography;

const useStyles = createUseStyles(kitchenCardStyle);

const KitchenCard = ({ uid, history }) => {
  const kitchen = useSelector((state) => state.firebase.data.kitchens[uid]);
  const { id, src, name } = kitchen;

  const goToKitchen = () => {
    history.push({
      pathname: `/kitchen/${id}`,
      uid: uid,
    });
  };

  const classes = useStyles();
  return (
    <Card
      hoverable
      className={classes.container}
      cover={<img className={classes.cardImg} alt={src} src={src} />}
    >
      <div className={classes.content}>
        <Title style={{ margin: "0 auto" }} level={4}>
          {name}
        </Title>
        <Button type="primary" className={classes.button} onClick={goToKitchen}>
          See More
        </Button>
      </div>
    </Card>
  );
};

export default KitchenCard;
