import React, {useState } from 'react';
import { isLoaded, isEmpty, useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Typography, Space, Input, Form, Button, message } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {createUseStyles} from 'react-jss'
import RecipeList from './RecipeList'

import sizes from "./styles/sizes";

const { Title, Text } = Typography;
const { TextArea } = Input;

const useStyles = createUseStyles({
  space: {
    display: "flex",
    width: "50%",
    margin: "0 auto",
    [sizes.down("sm")]:{
      width: "100%",
    }
  },
  kitchenName: {
    fontSize: "2rem",
    textWeight: "bold"
  }
});

const KitchenEdit = (props) => {

  const classes = useStyles()

  const firebase = useFirebase();
  const profile = useSelector(state => state.firebase.profile)
  const kitchen = useSelector(({ firebase: { data } }) => data.kitchens[profile.kitchenId])

  const {name, description, chefDesc, src, userId, } = kitchen

  const [kitchenDesc, setKitchenDesc] = useState(description)
  const [newChefDesc, setChefDesc] = useState(chefDesc)
  const [kitchenImg, setKitchenImg] = useState(src)
  const [recipeName, setRecipeName] = useState("")
  const [recipeImg, setRecipeImg] = useState("")

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

  const onFinish = () => {
    const postData = {
      src: kitchenImg,
      chefDesc: newChefDesc,
      description: kitchenDesc,
      userId: userId
    };

    return firebase.update(`kitchens/${profile.kitchenId}`, postData)
      .then(() => {
      message.success('kitchen modified!');
      setTimeout(() =>
      props.history.push(`/kitchen/${kitchen.id}`),500)
      })
    .catch(error => {
      message.error(error.message);
    })
  };

  const addNewRecipe = () => {
    const recipeData = {
      src: recipeImg,
      name: recipeName
    };

    return firebase.push(`kitchens/${profile.kitchenId}/recipes`, recipeData)
      .then(() => {
      message.success('new recipe added!');
      setRecipeName("")
      setRecipeImg("")
      })
  }

  return (
      <Space direction="vertical" className={classes.space}>
        <Title level={1}>Edit the kitchen</Title>
        <Form
        name="setKitchen"
        onFinish={onFinish}
        >
          <Title level={2}>{name}</Title>
          <Form.Item name="kitchenImg">
            <div style={{display: "flex", alignItems: "center"}}>
              <div style={{ margin: '24px 0' }} />
              <Title style={{marginRight: "1rem", width: "20%"}} level={4}>Image:</Title>
                <Input
                  style={{flexGrow: 2}}
                  placeholder="kitchen image"
                  prefix={<FileImageOutlined className="site-form-item-icon" />}
                  value={kitchenImg}
                  onChange={e => setKitchenImg(e.target.value)}
                />
            </div>
          </Form.Item>
          <Form.Item >
          <div style={{display: "flex", alignItems: "center"}}>
              <Title style={{marginRight: "1rem", width: "20%"}} level={4}>Kitchen Description:</Title>
          <TextArea
            placeholder="kitchen description"
            value={kitchenDesc}
            onChange={e => setKitchenDesc(e.target.value)}
            autoSize />
          </div>
          </Form.Item>
          <Form.Item>
          <div style={{display: "flex", alignItems: "center"}}>
              <Title style={{marginRight: "1rem", width: "20%"}} level={4}>Chef description:</Title>
          <TextArea
            placeholder="Chef description"
            value={newChefDesc}
            onChange={e => setChefDesc(e.target.value)}
            autoSize />
            </div>
          {/* <div style={{ margin: '24px 0' }} /> */}
          </Form.Item>
            <Form.Item>
                <Title style={{marginRight: "1rem"}} level={4}>Add a new recipe</Title>
                <div style={{display: "flex", alignItems: "center"}}>
                  <Text strong style={{marginRight: "1rem", width: "20%"}}>Name:</Text>
                    <Input
                    placeholder="Recipe name"
                    value={recipeName}
                    onChange={e => setRecipeName(e.target.value)}
                    />
                </div>
                <div style={{ margin: '24px 0' }} />
                <div style={{display: "flex", alignItems: "center"}}>
                  <Text strong style={{marginRight: "1rem", width: "20%"}}>Image:</Text>
                    <Input
                    placeholder="Recipe image src"
                    value={recipeImg}
                    onChange={e => setRecipeImg(e.target.value)}
                    />
                </div>
                <div style={{ margin: '24px 0' }} />
                    <Button type="secondary" onClick={addNewRecipe}>
                      Add
                    </Button>

            </Form.Item>
          <RecipeList kitchenId={profile.kitchenId}/>
            <div style={{ margin: '24px 0' }} />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Space>
  );
}

export default KitchenEdit;
