import React, { useState } from "react";
import { useFirebaseConnect, useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
import { createUseStyles } from "react-jss";
import { Typography, Space, Input, Form, Button, message } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import kitchenAddStyle from "./styles/kitchenAddStyle";

const { Title, Text } = Typography;
const { TextArea } = Input;

const useStyles = createUseStyles(kitchenAddStyle);

const KitchenAdd = (props) => {
  const [kitchenDesc, setKitchenDesc] = useState("");
  const [newChefDesc, setChefDesc] = useState("");
  const [kitchenName, setKitchenName] = useState("");
  const [kitchenId, setKitchenId] = useState("");
  const [kitchenImg, setKitchenImg] = useState("");
  const classes = useStyles();

  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);
  useFirebaseConnect([
    {
      path: "/users",
      queryParams: ["orderByChild=email", "parsed", `equalTo=${profile.email}`],
    },
  ]);

  const user = useSelector(({ firebase: { data } }) => data.users);

  const userId = user ? Object.getOwnPropertyNames(user)[0] : "";

  const setKitchenNameId = (e) => {
    setKitchenName(e.target.value);
    setKitchenId(
      e.target.value === undefined
        ? ""
        : e.target.value.toLowerCase().split(" ").join("-")
    );
  };

  const onFinish = () => {
    const postData = {
      name: kitchenName,
      src: kitchenImg,
      chefDesc: newChefDesc,
      description: kitchenDesc,
      id: kitchenId,
      userId: userId,
    };

    return firebase
      .push("kitchens", postData)
      .then((value) => {
        message.success("kitchen modified!");
        firebase.update(`users/${userId}`, {
          kitchenId: value.path.pieces_[1],
        });
        setTimeout(() => props.history.push(`/kitchen/${kitchenId}`), 500);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <Space direction="vertical" className={classes.space}>
      <Title level={1}>Create your kitchen</Title>
      <Form name="setKitchen" onFinish={onFinish}>
        <Form.Item name="name">
          <div className={classes.formItem}>
            <div className={classes.verticalSpace} />
            <Title className={classes.formTitle} level={4}>
              Kitchen name:
            </Title>
            <Input
              style={{ flexGrow: 2 }}
              placeholder="kitchen name"
              value={kitchenName}
              onChange={(e) => setKitchenNameId(e)}
            />
          </div>
          <Text strong>/kitchen/{kitchenId}</Text>
        </Form.Item>
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
          <div className={classes.verticalSpace} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default KitchenAdd;
