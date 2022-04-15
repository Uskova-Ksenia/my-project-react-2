import React, { useContext, useCallback } from "react";
import { UserContext } from "../../utils/context/UserContext";
import { Layout, Pagination, Breadcrumb, Button } from 'antd';
import { Link } from "react-router-dom";
import Cards from "../../components/Cards";
import "./FeedPage.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/Api";
import useApi from "../../utils/hooks/useApi";

const { Content } = Layout;

const FeedPage = ({
    posts,
    updateLikesOnPost, 
    editPost,
    deletePostById
}) => {
    const { postID } = useParams();
    const navigate = useNavigate();

    const handler = useCallback(() => {
        return api.getPost(postID);
    }, [posts]);
    const { data, loading, error } = useApi(handler);
    const getPost = (postID) => {
        return posts.filter((e) =>
        e._id === postID
        )[0];
    };
    
    const user = useContext(UserContext);  
    if (user._id != undefined) {
        return (
            <Content className="container">
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">All posts</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Link to={`/post/create`}>
                    <Button 
                        style={{ marginBottom: 16 , marginTop: 16}} 
                        className="button" 
                        onClick={() => console.log("Есть контакт!")}
                    >
                        Create post
                    </Button>
                </Link>
                <Cards 
                    className="cards" 
                    posts={posts}
                    updateLikesOnPost={updateLikesOnPost}
                    editPost={editPost}
                    deletePostById={deletePostById}/>
                <Pagination className="pages" defaultCurrent={1} total={50}/>
            </Content>    
        );
    } else {
        return <></>
    }
};

export default FeedPage;