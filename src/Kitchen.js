import React from 'react';
import 'antd/dist/antd.css';
import {createUseStyles} from 'react-jss'
import RecipeList from './RecipeList'
import { Typography, Rate, Space, Tag } from 'antd';

const { Title, Text } = Typography;


const useStyles = createUseStyles({

});


const Kitchen = ({kitchenInfo, recipes}) => {
  const {name, description} = kitchenInfo;
  // const routeId=routeProps.match.params.id;
  const classes = useStyles()
  return (
      <Space direction="vertical">
        <Title level={1}>{name}</Title>
        <Space direction="horizontal">
        <Tag>Vegan</Tag>
        <Tag>Salty</Tag>
        <Tag>gluten free</Tag>
        </Space>
        <Rate allowHalf defaultValue={2.5} />
        <Text>{description}</Text>
        <Title level={2}>Recipes</Title>
          <RecipeList recipes={recipes}/>
        <Title level={3}>About the Chef</Title>
      </Space>
  );
}

export default Kitchen;
