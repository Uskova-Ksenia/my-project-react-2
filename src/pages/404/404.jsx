import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';

const NotFoundPage = ({ text }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button 
        onClick={() => navigate(-1)}>
          Back
      </Button>
      <h1>{text || "THIS PAGE DOESN'T EXIST"}</h1>
    </>
  );
};

export default NotFoundPage;
