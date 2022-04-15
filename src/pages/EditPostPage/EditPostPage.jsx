import React, { useCallback } from "react";
import Form from "../../components/Form/Form.jsx";
import { Button } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../utils/hooks/useApi";
import api from "../../utils/Api";

const EditPostPage = ({
    posts,
    editPost
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
            <Form 
                formTitle="Edit post"
                actionType={"Edit"}
                action={editPost}
                post={getPost(postID)}
                {...data} 
            />
        </>
    )
};
export default EditPostPage;