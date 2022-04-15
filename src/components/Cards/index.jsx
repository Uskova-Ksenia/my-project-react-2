import React, { useContext } from "react";
import { Card, Col, Row } from 'antd';
import Post from "../Post";
import { Link } from "react-router-dom";

const Cards = ({
  posts, 
  updateLikesOnPost,
  editPost,
  deletePostById
}) => {
  return (
      <div className="site-card-wrapper">
        <Row gutter={[16, 16]}>
          {posts.map(post => (
            <Col span={8} key={post._id}>  
              <Link to={`/post/${post._id}`}>
                <Card 
                    title={post.title} 
                    bordered={false}
                    >  
                    <Post 
                        post={post}
                        updateLikesOnPost={updateLikesOnPost}
                        editPost={editPost}
                        deletePostById={deletePostById}
                    />
                </Card>
              </Link>
            </Col> 
          ))}
      </Row>
    </div>
  );
};

export default Cards;
