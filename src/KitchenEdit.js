import React, { useState } from "react";
import { isLoaded, isEmpty, useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import {
  Typography,
  Space,
  Input,
  Form,
  Button,
  message,
  InputNumber,
} from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { createUseStyles } from "react-jss";
import EditRecipeList from "./EditRecipeList";

import sizes from "./styles/sizes";

const { Title } = Typography;
const { TextArea } = Input;

const useStyles = createUseStyles({
  space: {
    display: "flex",
    width: "50%",
    margin: "0 auto",
    [sizes.down("md")]: {
      width: "100%",
    },
  },
  kitchenName: {
    fontSize: "2rem",
    textWeight: "bold",
  },
  formItem: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  formQuantity: {
    display: "flex",
    alignItems: "left",
    flexDirection: "row",
  },
  formQuantityTitle: {
    width: "20%",
  },
  formTitle: {
    marginRight: "1rem",
    width: "100%",
  },
  verticalSpace: {
    margin: "24px 0",
  },
  recipeFormSubmitRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const KitchenEdit = (props) => {
  const classes = useStyles();

  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);
  const kitchen = useSelector(
    ({ firebase: { data } }) => data.kitchens[profile.kitchenId]
  );

  const { name, description, chefDesc, src, userId } = kitchen;

  const [kitchenDesc, setKitchenDesc] = useState(description);
  const [newChefDesc, setChefDesc] = useState(chefDesc);
  const [kitchenImg, setKitchenImg] = useState(src);
  const [recipeName, setRecipeName] = useState("");
  const [recipeQuantity, setRecipeQuantity] = useState(1);
  const [recipeImg, setRecipeImg] = useState("");

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

  const onFinish = () => {
    const postData = {
      src: kitchenImg,
      chefDesc: newChefDesc,
      description: kitchenDesc,
      userId: userId,
    };

    return firebase
      .update(`kitchens/${profile.kitchenId}`, postData)
      .then(() => {
        message.success("kitchen modified!");
        setTimeout(() => props.history.push(`/kitchen/${kitchen.id}`), 500);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const addNewRecipe = () => {
    const recipeData = {
      src: recipeImg,
      name: recipeName,
      quantity: recipeQuantity,
    };

    return firebase
      .push(`kitchens/${profile.kitchenId}/recipes`, recipeData)
      .then(() => {
        message.success("new recipe added!");
        setRecipeName("");
        setRecipeImg("");
        setRecipeQuantity(1);
      });
  };

  return (
    <Space direction="vertical" className={classes.space}>
      <Title level={1}>Edit the kitchen</Title>
      <Form name="setKitchen" onFinish={onFinish}>
        <Title level={2}>{name}</Title>
        <Form.Item name="kitchenImg">
          <div className={classes.formItem}>
            <div className={classes.verticalSpace} />
            <Title className={classes.formTitle} level={4}>
              Image:
            </Title>
            <Input
              style={{ flexGrow: 2 }}
              placeholder="kitchen image"
              prefix={<FileImageOutlined className="site-form-item-icon" />}
              value={kitchenImg}
              onChange={(e) => setKitchenImg(e.target.value)}
            />
          </div>
        </Form.Item>
        <Form.Item>
          <div className={classes.formItem}>
            <Title className={classes.formTitle} level={4}>
              Kitchen Description:
            </Title>
            <TextArea
              placeholder="kitchen description"
              value={kitchenDesc}
              onChange={(e) => setKitchenDesc(e.target.value)}
              autoSize
            />
          </div>
        </Form.Item>
        <Form.Item>
          <div className={classes.formItem}>
            <Title className={classes.formTitle} level={4}>
              Chef description:
            </Title>
            <TextArea
              placeholder="Chef description"
              value={newChefDesc}
              onChange={(e) => setChefDesc(e.target.value)}
              autoSize
            />
          </div>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
      <Title className={classes.formTitle} level={4}>
        Add a new recipe
      </Title>
      <Form name="setRecipe" onFinish={addNewRecipe}>
        <Form.Item
          name="recipeName"
          rules={[
            {
              required: true,
              message: "Please input the recipe name!",
            },
          ]}
        >
          <div className={classes.formItem}>
            <Input
              placeholder="Recipe name"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </div>
        </Form.Item>
        <div className={classes.verticalSpace} />
        <Form.Item
          name="recipeImg"
          rules={[
            {
              required: true,
              message: "Please input a valid image!",
            },
          ]}
        >
          <div className={classes.formItem}>
            <Input
              placeholder="Recipe image src"
              value={recipeImg}
              onChange={(e) => setRecipeImg(e.target.value)}
            />
          </div>
        </Form.Item>
        <div className={classes.verticalSpace} />
        <div className={classes.recipeFormSubmitRow}>
          <Form.Item label="Quantity:">
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              onChange={(value) => setRecipeQuantity(value)}
            />
          </Form.Item>
          <Button type="secondary" htmlType="submit">
            Add
          </Button>
        </div>
      </Form>
      <EditRecipeList kitchenId={profile.kitchenId} />
    </Space>
  );
};

export default KitchenEdit;
