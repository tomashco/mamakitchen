import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {createUseStyles} from 'react-jss'
import {
  Typography,
  Space,
  Input,
  Form,
  Button,
  message
} from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import {useAuth} from './Contexts/userContext'
import firebase from 'firebase'
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

const KitchenEdit = ({kitchenInfo, history}) => {

  const {name, description, src, chefDesc} = kitchenInfo;
  const [kitchenDesc, setKitchenDesc] = useState(description)
  const [newChefDesc, setChefDesc] = useState(chefDesc)
  const [kitchenName, setKitchenName] = useState(name)
  const [kitchenImg, setKitchenImg] = useState(src)
  const classes = useStyles()
  const { user } = useAuth()

//  const firebase = useContext(FirebaseContext)

  const kitchenId = kitchenName === undefined ? "" : kitchenName.toLowerCase().replaceAll(" ", "-");

  const onFinish = () => {

    const postData = {
      name: kitchenName,
      src: kitchenImg,
      chefDesc: newChefDesc,
      description: kitchenDesc,
      id: kitchenId,
      userId: user.uid
    };

    // if user has kitchenId --> use that kitchen key else newKitchenKey
    var kitchenKey = firebase.database().ref().child('kitchens').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates[`/kitchens/${kitchenKey}`] = postData;
  updates[`/users/${user.uid}/kitchenId`] = kitchenKey;

  return firebase
          .database().ref().update(updates)
          .then(authUser => {
            message.success('kitchen modified!');
            setTimeout(() =>
              history.push(`/kitchen/${kitchenId}`), 500);
            })
          .catch(error => {
            message.error(error.message);
          });
  };
  return (
      <Space direction="vertical" className={classes.space}>
        <Title level={1}>Edit the kitchen</Title>
        <Form
        name="setKitchen"
        //className="login-form"
        //initialValues={{ remember: true }}
        onFinish={onFinish}
        >
          <Form.Item name="name"
            >
          <Input
            placeholder="Kitchen name"
            className={classes.kitchenName}
            value={kitchenName}
            onChange={e => setKitchenName(e.target.value)}
          />
          <Text strong>/kitchen/{kitchenId}</Text>
          </Form.Item>
          <Form.Item name="kitchenImg"
            >
            <div style={{display: "flex", alignItems: "center"}}>
              <Title style={{marginRight: "1rem"}} level={4}>Image:</Title>
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
          <TextArea
            placeholder="kitchen description"
            value={kitchenDesc}
            onChange={e => setKitchenDesc(e.target.value)}
            autoSize />
          <div style={{ margin: '24px 0' }} />
          </Form.Item>
          <Form.Item >
          <Title level={4}>Chef description:</Title>

          <TextArea
            placeholder="Chef description"
            value={newChefDesc}
            onChange={e => setChefDesc(e.target.value)}
            autoSize />
          <div style={{ margin: '24px 0' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit"> {/* className="login-form-button"> */}
              Update
            </Button>
          </Form.Item>
        </Form>
      </Space>
  );
}

export default KitchenEdit;
