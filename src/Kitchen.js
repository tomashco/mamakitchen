import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import {createUseStyles} from 'react-jss'
import RecipeList from './RecipeList'
import {
  Typography,
  Rate,
  Space,
  Tag,
  Button,
  Result
} from 'antd';
import {useAuth} from './Contexts/userContext'
import firebase from 'firebase'

const { Title, Text } = Typography;

const useStyles = createUseStyles({
  title: {
    display: "flex",
    justifyContent: "space-between"
  }
});

const Kitchen = ({kitchenInfo, recipes}) => {
  const {name, description, chefDesc, id} = kitchenInfo;
  const classes = useStyles()
  const { user } = useAuth()
  const [userKitchenId, setUserKitchenId] = useState("")
  const [kitchenId, setKitchenId] = useState("")

  useEffect(() => {
    firebase.database().ref(`/kitchens/`).once('value').then(function(snapshot) {
      snapshot.forEach(el => {
        if(user && el.val().userId === user.uid){
          setUserKitchenId(el.val().id)
        }
      })
    })
    firebase.database().ref(`/kitchens/`).once('value').then(function(snapshot) {
      snapshot.forEach(el => {
        if(el.val().id === id){
        setKitchenId(el.val().id)
        }
      })
    })
  })
  //console.log(kitchenId, userKitchenId)

  return (
      <Space direction="vertical">
        <Space className={classes.title}>
          <Title level={1}>{name}</Title>
          {userKitchenId === kitchenId &&
          <Button type="primary" htmlType="submit">
            <Link to={`/kitchen/edit/${id}`}>Modify</Link>
          </Button>}
        </Space>
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
          {chefDesc}
      </Space>
  );
}

export default Kitchen;
