import React, { useState } from "react";
import { isLoaded, isEmpty, useFirebaseConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { createUseStyles } from "react-jss";
import { Typography, InputNumber, Button, Modal, message, Form } from "antd";
import recipeListStyle from "./styles/recipeListStyle";

const { Title, Text } = Typography;

const useStyles = createUseStyles(recipeListStyle);

const RecipeList = ({ kitchenId }) => {
  const classes = useStyles();
  const [recipeCheckout, addRecipeToCheckout] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [form] = Form.useForm();

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

  const ProceedToCheckout = () => {
    setModalVisibility(true);
  };

  const modalHandleOk = (e) => {
    console.log(e);
    message.success("Order placed!");
    setModalVisibility(false);
    form.resetFields();
  };

  const modalHandleCancel = (e) => {
    setModalVisibility(false);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      onFinish={ProceedToCheckout}
    >
      {Object.keys(recipes)
        .map(function (key) {
          return { key: key, value: recipes[key] };
        })
        .map(({ value: recipe, key }, ind) => (
          <div key={key} className={classes.recipeRow}>
            <img alt={recipe.name} src={recipe.src} />
            <div className={classes.recipeContent}>
              <div className={classes.recipeContentRow}>
                <Title level={4}>{recipe.name}</Title>
              </div>
              <div className={classes.recipeContentRow}>
                <Text strong>Quantity:</Text>
                <Form.Item name={recipe.name} initialValue={0}>
                  <InputNumber
                    min={0}
                    max={recipe.quantity}
                    onChange={(orderQuantity) => {
                      const recipeIndex = recipeCheckout.findIndex(
                        (obj) => obj.recipe === recipe
                      );
                      if (recipeIndex === -1) {
                        addRecipeToCheckout([
                          ...recipeCheckout,
                          {
                            recipe: recipe,
                            quantity: orderQuantity,
                          },
                        ]);
                      } else {
                        addRecipeToCheckout(
                          recipeCheckout.map((obj) => {
                            if (obj.recipe === recipe)
                              return {
                                recipe: recipe,
                                quantity: orderQuantity,
                              };
                            return obj;
                          })
                        );
                      }
                    }}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        ))}
      <div className={classes.checkoutButton}>
        {recipeCheckout.length > 0 && (
          <>
            <Button type="primary" htmlType="submit">
              Proceed to Checkout
            </Button>
            <Modal
              title="Checkout"
              visible={modalVisibility}
              onOk={modalHandleOk}
              onCancel={modalHandleCancel}
            >
              {recipeCheckout.map((obj) => {
                return (
                  <div key={obj.recipe.name} className={classes.recipeRow}>
                    <img alt={obj.recipe.name} src={obj.recipe.src} />

                    <div className={classes.recipeContent}>
                      <div className={classes.recipeContentRow}>
                        <Title level={4}>{obj.recipe.name}</Title>
                      </div>
                      <div className={classes.recipeContentRow}>
                        <Text strong>Quantity:</Text>
                        <Text strong>{obj.quantity}</Text>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Modal>
          </>
        )}
      </div>
    </Form>
  );
};

export default RecipeList;
