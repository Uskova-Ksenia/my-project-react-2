import React, { useCallback, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from 'antd';
import Post from "../../components/Post";
import api from "../../utils/Api";
import useApi from "../../utils/hooks/useApi";
import NotFoundPage from "../404/404";

const PostPage = ({
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

  return (
    <>
      <Button 
        onClick={() => navigate(-1)}>
          Back
      </Button>
      {!error ?
        <Post 
          post={getPost(postID)}
          {...data} 
          updateLikesOnPost={updateLikesOnPost}
          editPost={editPost}
          deletePostById={deletePostById}
        /> : 
        <NotFoundPage text={error} />
      }
    </>
  );
};

export default PostPage;