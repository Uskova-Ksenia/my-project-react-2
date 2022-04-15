import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/index.jsx";
import FormButton from "../FormButton/index.jsx";
import s from "./index.modules.css";

function Form({
    formTitle,
    actionType,
    action,
    // post
  }) {
    const {
      register,
      handleSubmit,
      formState: { 
        errors }
    } = useForm({ mode: "onBlur" });
  
    const onSubmit = (data) => {
        const newPost = {
        title: data.title,
        text: data.text,
        image: data.image,
        tags: data.tags.split(",")
      }
      action(newPost)
      console.log(data); 
    };
    
    const defaultState = {
      title: "",
      text: "",
      image: "",
      tags: ""
    };

    const [post, setPost] = useState(defaultState);

    const handleChange = (e) => {
      setPost({ ...post, [e.target.name]: e.target.value });
    };
    
    // const showValueIfExists = (value) => {
    //   if (value != undefined) {
    //     return value;
    //   }
    //   return "";
    // };

    return (
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={s.title}>{formTitle}</h1>  
         <FormInput
          id="title"
          type="title"
          placeholder={"title"}
          // value={showValueIfExists(post.title)}
          value={post.title} 
          {...register("title", {
            required: "Поле обязательно к заполнению",
            pattern: {
              message: "Поле обязательно к заполнению",
            },
          })}
          onChange={handleChange}
        />
          {errors?.title && <p className={s.error}>{errors?.title?.message}</p>}  
         <FormInput
          id="text"
          type="text"
          placeholder={"text"}
          // value={showValueIfExists(post.text)}
          value={post.text}
          {...register("text", {
            required: "Поле обязательно к заполнению",
            pattern: {
              message: "Поле обязательно к заполнению",
            },
          })}
          onChange={handleChange}
        />
        {errors?.text && <p className={s.error}>{errors?.text?.message}</p>}
        <FormInput
          id="image"
          type="text"
          // value={showValueIfExists(post.image)}
          value={post.image}
          placeholder={"image"}
          {...register("image")}
          onChange={handleChange}
        />
        <FormInput
          id="tags"
          type="[]"
          // value={showValueIfExists(post.tags.toString())}
          value={post.tags}
          placeholder={"tags"}
          {...register("tags")}
          onChange={handleChange}
        />
        <FormButton
          text={actionType}
          type={"primary"}
        />
      </form>
    )
  };

export default Form;