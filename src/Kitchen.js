import React from "react";
import { Link, useParams } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
import { createUseStyles } from "react-jss";
import RecipeList from "./RecipeList";
import kitchenStyle from "./styles/kitchenStyle";
import { Typography, Rate, Space, Tag, Button } from "antd";

const { Title, Text } = Typography;

const useStyles = createUseStyles(kitchenStyle);

function Kitchen({ location }) {
  const { id } = useParams();
  const kitchenId = location.uid;
  const classes = useStyles();

  const kitchen = useSelector(
    ({ firebase: { data } }) => data.kitchens[kitchenId]
  );

  const profile = useSelector((state) => state.firebase.profile);
  if (!isLoaded(kitchen)) {
    return (
      <div className={classes.kitchenList}>{"Kitchen will be Loaded soon"}</div>
    );
  }

  if (isEmpty(kitchen)) {
    return (
      <div className={classes.kitchenList}>{"oops, there is no kitchen"}</div>
    );
  }
  const { name, description, chefDesc } = kitchen;
  return (
    <Space direction="vertical">
      <Space className={classes.title}>
        <Title level={1}>{name}</Title>
        {profile.kitchenId === kitchenId && (
          <Button type="primary" htmlType="submit">
            <Link to={`/kitchen/edit/${id}`}>Modify</Link>
          </Button>
        )}
      </Space>
      <Space direction="horizontal">
        <Tag>Vegan</Tag>
        <Tag>Salty</Tag>
        <Tag>gluten free</Tag>
      </Space>
      <Rate allowHalf defaultValue={2.5} />
      <Text>{description}</Text>
      <RecipeList kitchenId={kitchenId} />
      <Title level={3}>About the Chef</Title>
      {chefDesc}
    </Space>
  );
}

export default Kitchen;
