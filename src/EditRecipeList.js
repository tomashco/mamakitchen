import React from "react";
import {
  isLoaded,
  isEmpty,
  useFirebaseConnect,
  useFirebase,
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import { createUseStyles } from "react-jss";
import { Typography, InputNumber } from "antd";

const { Title, Text } = Typography;

const useStyles = createUseStyles({
  recipeRow: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "1rem",
    "& img": {
      width: 100,
      height: 100,
    },
  },
  recipeContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  recipeContentRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    padding: "0.5rem 0 0 1rem",
  },
});

const RecipeList = ({ kitchenId }) => {
  const classes = useStyles();
  const firebase = useFirebase();

  useFirebaseConnect(() => [
    {
      path: `kitchens/${kitchenId}/recipes`,
    },
  ]);

  // Get recipes from redux state
  const recipes = useSelector(
    (state) => state.firebase.data.kitchens[kitchenId].recipes
  );

  // Show a message while recipes are loading
  if (!isLoaded(recipes)) {
    return "Loading";
  }

  // Show a message if there are no recipes
  if (isEmpty(recipes)) {
    return "Recipe list is empty";
  }

  return Object.keys(recipes)
    .map(function (key) {
      return { key: key, value: recipes[key] };
    })
    .map(({ value: recipe, key }, ind) => (
      <div key={key} className={classes.recipeRow}>
        <img alt={recipe.name} src={recipe.src} />

        <div className={classes.recipeContent}>
          <div className={classes.recipeContentRow}>
            <Title level={4}>{recipe.name}</Title>
            <button
              onClick={() =>
                firebase.remove(`kitchens/${kitchenId}/recipes/${key}`)
              }
            >
              Delete
            </button>
          </div>
          <div className={classes.recipeContentRow}>
            <Text strong>Quantity:</Text>
            <InputNumber
              min={1}
              max={10}
              defaultValue={recipe.quantity}
              onChange={(newQuantity) => {
                firebase.update(`kitchens/${kitchenId}/recipes/${key}`, {
                  quantity: newQuantity,
                });
              }}
            />
          </div>
        </div>
      </div>
    ));
};

export default RecipeList;
