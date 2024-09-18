import React, { useEffect, useState, useContext } from 'react'
import { ProfilContainer, ProfilContent, ProfilHeader, ProfilTitle } from './ProfilElements'
import { Avatar, Card } from 'antd';
import { LikeOutlined, DislikeOutlined, CommentOutlined } from '@ant-design/icons';
import { AuthContext } from '../../contexts/AuthContext';
import { useLocation, useNavigate } from "react-router-dom";
import { getUserPosts } from '../../services/PostService';

const { Meta } = Card;

const Profil = () => {
    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const {state} = useLocation();
    const { img, username } = state
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (isAuth === false) {
            navigate("/login");
        }
    }, [isAuth])

    useEffect(() => {
        getUserPosts(username).then((response) => {
            setPosts(response.data.posts.slice().reverse())
        })
    }, [])
    
    return(
        <ProfilContainer>
            <ProfilHeader>
                <Avatar size={100} src={img}/>
                <ProfilTitle>{username}</ProfilTitle>
            </ProfilHeader>
            <ProfilContent>
                {posts && posts.map((post) => {
                    return <Card
                    key={post.id}
                    style={{ width: 400, marginBottom: 15 }}
                    actions={[
                        <LikeOutlined key="like" />,
                        <DislikeOutlined key="dislike" />,
                        <CommentOutlined key="comment" />,
                    ]}
                >
                    <Meta
                        avatar={<Avatar src={img} />}
                        title={username}
                        description={post.text}
                    />
                </Card>
                })}
            </ProfilContent>
        </ProfilContainer>
    )
}

export default Profil