import React, { useContext } from "react";
import { UserContext } from "../../utils/context/UserContext";
import { ReactComponent as LikeComponent } from "./img/like.svg";
import { Button, Space, Avatar, Timeline, Tag } from 'antd';
import classNames from "classnames";
import postStyle from "./index.modules.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Post = ({
    post,
    updateLikesOnPost,
    editPost,
    deletePostById
}) => {
    const navigate = useNavigate();
    const user = useContext(UserContext);  
    const isFavourite = post.likes.some((el) => el === useContext(UserContext)._id);
    const disabled = user._id !== post.author._id;

    const handleClick = (e) => {
        e.preventDefault();
        updateLikesOnPost(!isFavourite, post._id);
    };
      
    const handleEdit = (e) => {
        // editPost(post);// todo: change to open form
        navigate(`/post/edit/${post._id}`)
        // navigate(-1);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deletePostById(post._id);
        navigate(-1);
    };

    if (user?._id != undefined) {
        return (
            <Space direction="vertical" size="middle" style={{ display: 'flex'}} >
                <Space>
                    <div className="avatar"> 
                        <Avatar size="large" icon={<img src={post.author.avatar}/>}/>  
                    </div>
                    <h4 className="e_mail"> {post.author.email} </h4>
                </Space>
                <Space className="text"> {post.text} </Space>
                <Space>
                    <div className="tags">
                        Tags: 
                        <Tag> {post.tags} </Tag>
                    </div>
                </Space>
                <Space>
                    <Timeline>
                        <Timeline.Item className="created_at"> {post.created_at} </Timeline.Item>
                        <Timeline.Item color="green" className="updated_at"> {post.updated_at} </Timeline.Item>
                    </Timeline>
                </Space>
                <Space style={{width: '100%', justifyContent:'space-between'}}>
                    {/* <Link to={`/post/edit/${post._id}`}> */}
                        <Button 
                            disabled={disabled}
                            className="button" 
                            onClick={handleEdit}>
                            Edit post
                        </Button >
                    {/* </Link> */}
                    <Button 
                        disabled={disabled}
                        className="button" 
                        onClick={handleDelete}>
                        Delete post
                    </Button >
                    <Space>
                        <LikeComponent
                            onClick={handleClick}
                            className={
                                classNames(
                                    postStyle.favourite, 
                                    {[postStyle.checked]: isFavourite, }
                                )
                            }
                        />
                        <div  className="like_counter">
                            {post.likes.length}
                        </div>
                    </Space>
                </Space>
            </Space> 
        )    
    } else {
        return <></>
    }
    
};

export default Post;


