import React from 'react';
import { isLoaded, isEmpty, useFirebaseConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import {createUseStyles} from 'react-jss'
import { Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Title } = Typography;

const useStyles = createUseStyles({
recipeRow: {
  display: "flex",
  justifyContent: "flex-start",
  padding: "1rem",
  '& img': {
    width: 100,
    height: 100
  }
},
recipeContent: {
  padding: "1rem"
}
});

// const IconText = ({ icon, text }) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );

const RecipeList = ({kitchenId}) => {
  const classes = useStyles()
  // useFirebaseConnect(() => [{
  //   path: `kitchens/${kitchenId}/recipes`
  // }]);

  // Get todos from redux state
  const recipes = useSelector(state => state.firebase.data.kitchens[kitchenId].recipes);

// Show a message while todos are loading
  if (!isLoaded(recipes)) {
    return "Loading";
  }

  // Show a message if there are no todos
  if (isEmpty(recipes)) {
    return "Recipe list is empty";
  }

  return Object.keys(recipes)
    .map(function(key) {
      return {key: key, value: recipes[key]};
    })
    .map(({ value: recipe, key }, ind) => (
      <div key={key} className={classes.recipeRow}>
         <img
          // width={100}
          alt={recipe.name}
          src={recipe.src}
          />
          <div className={classes.recipeContent}>
            <Title level={4}>{recipe.name}</Title>
            {/* <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" /> */}
          </div>
        </div>

    ));
  }

export default RecipeList;
