import React, { useEffect, useState, useCallback }from "react";
import { UserContext } from "./utils/context/UserContext";
import { Layout } from "antd";
import api from "./utils/Api";
import Header from "./components/Header";
import NotFoundPage from "./pages/404/404";
import FeedPage from "./pages/FeedPage/FeedPage";
import PostPage from "./pages/PostPage/PostPage";
import NewPostPage from "./pages/NewPostPage/NewPostPage";
import EditPostPage from "./pages/EditPostPage/EditPostPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";

const { Footer } = Layout;

const App = () => {

  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => { 
    Promise.all([
      api.getUserInfo(),                
      api.getAllPosts()
    ]).then(
        ([user, posts]) => {
        setPosts(posts);
        setCount(posts.length);
        setUser(user);
        }
    );
    }, []);

  const deletePostById = (postId) => {
    api.deletePostById(postId).then(() => {
      api.getAllPosts().then((posts) => {
        setPosts(posts);
      });
    });
  };

  const updateLikesOnPost = (isLiked, postId) => {
      api.updateLikesOnPost(isLiked, postId).then((newPost) => {
          const newPosts = posts.map((el) =>
          el._id === postId ? newPost : el
          );
          setPosts(newPosts);
      });
  };
  
  const createPost = (newPost) => {
    api.createPost(newPost).then(() => {
      navigate(-1)
      
      api.getAllPosts().then((posts) => {
        console.log(posts)
        setPosts(posts);
      });
    });
  };

  const editPost = (post) => {
    api.editPost(post).then(() => {
      api.getAllPosts().then((posts) => {
        setPosts(posts);
      });
    });
  };

  return (
  <UserContext.Provider value={user}>
    <Layout>
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={
            <FeedPage
              posts={posts}
              updateLikesOnPost={updateLikesOnPost}
              editPost={editPost}
              deletePostById={deletePostById}
            />
          }
        />
        <Route 
          path="/post/:postID" 
          element={
            <PostPage  
              posts={posts}
              updateLikesOnPost={updateLikesOnPost}
              editPost={editPost}
              deletePostById={deletePostById}
            />
          } 
        />
        <Route 
          path="*" 
          element={<NotFoundPage />} 
        />
        <Route 
          path="/post/create" 
          element={
            <NewPostPage 
              createPost={createPost}
            />
          } 
        />
        <Route 
          path="/post/edit/:postID" 
          element={
            <EditPostPage 
              posts={posts}
              editPost={editPost}
            />
          } 
        />
      </Routes>
      <Footer></Footer>
    </Layout>
  </UserContext.Provider>
  )
};

export default App;