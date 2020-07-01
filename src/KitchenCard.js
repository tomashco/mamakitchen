import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Card, Button, Typography } from 'antd';
import {createUseStyles} from 'react-jss'
import sizes from "./styles/sizes";

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

const KitchenCard = ({kitchenInfo, history}) => {
  const {name, src, description, id} = kitchenInfo;

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
