import React from "react";
import Form from "../../components/Form/Form.jsx";
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";

const NewPostPage = ({
    createPost
  }) => {
    const navigate = useNavigate();
  
    return (
        <>
            <Button 
                onClick={() => navigate(-1)}>
            Back
            </Button>
            <Form 
                formTitle="Create new post"
                actionType={"Create"}
                action={createPost} 
            />
        </>
    )
};
export default NewPostPage;