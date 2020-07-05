import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import 'antd/dist/antd.css';
import {createUseStyles} from 'react-jss'
import RecipeList from './RecipeList'
import {
  Typography,
  Rate,
  Space,
  Tag,
  Button
} from 'antd';

const { Title, Text } = Typography;

const useStyles = createUseStyles({
  title: {
    display: "flex",
    justifyContent: "space-between"
  }
});

function Kitchen() {

  const { id } = useParams()
  const classes = useStyles()
  useFirebaseConnect([
    { path: '/kitchens', queryParams: [ 'orderByChild=id', 'parsed', `equalTo=${id}` ] }
  ])
  const kitchen = useSelector(({ firebase: { data } }) => data.kitchens)
  const profile = useSelector(state => state.firebase.profile)

  if (!isLoaded(kitchen)) {
    return (
      <div className={classes.kitchenList}>
        {"Kitchen will be Loaded soon"}
      </div>
      );
    }

    if (isEmpty(kitchen)) {
      return (
        <div className={classes.kitchenList}>
          {"oops, there is no kitchen"}
        </div>
      );
  }
  const {name, description, chefDesc} = kitchen[Object.getOwnPropertyNames(kitchen)[0]]
  return (
      <Space direction="vertical">
        <Space className={classes.title}>
          <Title level={1}>{name}</Title>
          { profile.kitchenId === Object.getOwnPropertyNames(kitchen)[0] &&
          <Button type="primary" htmlType="submit">
            <Link to={`/kitchen/edit/${id}`}>Modify</Link>
          </Button>
          }
        </Space>
        <Space direction="horizontal">
        <Tag>Vegan</Tag>
        <Tag>Salty</Tag>
        <Tag>gluten free</Tag>
        </Space>
        <Rate allowHalf defaultValue={2.5} />
        <Text>{description}</Text>
        <Title level={3}>About the Chef</Title>
          {chefDesc}
      </Space>
  );
}

export default Kitchen;
