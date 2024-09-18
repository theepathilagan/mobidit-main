import React, { useContext, useEffect, useState } from "react"
import { PostContainer } from "./PostElements";
import { LikeOutlined, DislikeOutlined, CommentOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Card, Input, Button, Form } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { createPost, getPostById } from "../../services/PostService";
import { comment } from "postcss";

const { Meta } = Card;
const { TextArea } = Input;

const Post = () => {
    const { isAuth, user } = useContext(AuthContext);

    const navigate = useNavigate()
    const {state} = useLocation();
    const { img, username, text, id } = state

    const [comments, setComments] = useState([])

    useEffect(() => {
        if (isAuth === false) {
            navigate("/login");
        }
    }, [isAuth])

    useEffect(() => {
        getPostById(id).then((response) => {
            setComments(response.subPost.slice().reverse())
        })
    }, [])

    function onFinish (value) {
        var params = {
            "text": value.postText,
            "user_id": user.id,
            "parent_id": id,
            "likes": 0,
            "dislike": 0
        }
        createPost(params).then((response) => {
            console.log(response)
        })
    }

    return (
        <PostContainer>
            <Card
                style={{ width: 400, height: "fit-content", marginTop: 15, marginBottom: 15 }}
            >
                <Meta
                    avatar={<Avatar src={img} style={{ cursor: "pointer" }} />}
                    title={username}
                    description={text}
                />
                <Form onFinish={onFinish}>
                    <Card
                        style={{ width: "100%", marginTop: 15, }}
                    >
                        <Meta
                            avatar={<Avatar src={user.img_url} style={{ cursor: "pointer" }} />}
                            title={user.username}
                        />
                        <Form.Item
                            name="postText"
                            rules={[{ required: true, message: '' }]}
                        >
                            <TextArea
                                showCount
                                maxLength={150}
                                style={{ height: 100, resize: 'none', marginTop: 15 }}
                                placeholder="Une envie de dire quelque chose ?"
                            />
                        </Form.Item>
                        <Button type="primary" shape="circle" icon={<PlusOutlined />} size={'large'} style={{ justifySelf: "center" }} htmlType="submit" />
                    </Card>
                </Form>

                {comments && comments.map((comment) => {
                    return <Card
                    key={comment.id}
                    style={{ width: "100%", height: "fit-content", marginTop: 15 }}
                >
                    <Meta
                        avatar={<Avatar src={comment.users.img_url} style={{ cursor: "pointer" }} />}
                        title={comment.users.username}
                        description={comment.text}
                    />
                </Card>
                })}
            </Card>
        </PostContainer>
    )
}

export default Post;