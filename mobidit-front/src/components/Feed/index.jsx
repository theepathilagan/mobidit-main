import React, { useState, useContext, useEffect } from "react";
import { FeedButton, FeedContainer, FeedContent, FeedHeader, FeedTitle } from "./FeedElements";
import { LikeOutlined, DislikeOutlined, CommentOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Card, Input, Button, Form } from 'antd';
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { createPost, getAllPosts } from "../../services/PostService";

const { Meta } = Card;
const { TextArea } = Input;

const Feed = () => {
    const { isAuth, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (isAuth === false) {
            navigate("/login");
        }
    }, [isAuth])

    useEffect(() => {
        getAllPosts(user.username).then((response) => {
            setPosts(response.data.slice().reverse())
        })
    }, [])

    function onFinish(value) {
        var params = {
            "text": value.postText,
            "user_id": user.id,
            "likes": 0,
            "dislike": 0
        }
        createPost(params).then((response) => {
            console.log(response)
        })
    }

    return (
        <FeedContainer>
            <FeedHeader>
                <Avatar size={50} src={user.img_url} style={{cursor: "pointer"}} onClick={() => navigate("/profil", { state : { img: user.img_url, username: user.username }})}/>
                <FeedTitle>Mobidit</FeedTitle>
                <FeedButton></FeedButton>
            </FeedHeader>
            <FeedContent>
                <Form onFinish={onFinish}>
                    <Card
                        style={{ width: 400, marginBottom: 15, }}
                    >
                        <Meta
                            avatar={<Avatar src={user.img_url} style={{cursor: "pointer"}} onClick={() => navigate("/profil", { state : { img: user.img_url, username: user.username }})}/>}
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

                {posts && posts.map((post) => {
                    console.log(post)
                    return <Card
                        key={post.id}
                        style={{ width: 400, marginBottom: 15 }}
                        actions={[
                            <LikeOutlined key="like" />,
                            <DislikeOutlined key="dislike" />,
                            <CommentOutlined key="comment" onClick={() => navigate("/post", { state : { img: post.users.img_url, username: post.users.username, text: post.text, id: post.id }})} />,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={post.users.img_url} style={{cursor: "pointer"}} onClick={() => navigate("/profil", { state : { img: post.users.img_url, username: post.users.username }})} />}
                            title={post.users.username}
                            description={post.text}
                        />
                    </Card>
                })}

            </FeedContent>
        </FeedContainer>
    )
}

export default Feed;