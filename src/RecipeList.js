import React from 'react';
import {createUseStyles} from 'react-jss'
import { Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Title } = Typography;

const useStyles = createUseStyles({
recipeRow: {
  display: "flex",
  justifyContent: "flex-start",
  padding: "1rem"
},
recipeContent: {
  padding: "1rem"
}
});

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const RecipeList = ({recipes}) => {
  const classes = useStyles()

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.name} className={classes.recipeRow}>
         <img
          width={100}
          alt={recipe.name}
          src={recipe.src}
          />
          <div className={classes.recipeContent}>
            <Title level={4}>{recipe.name}</Title>
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
