const onResponse = (response) => {
  if (response.ok) {
      return response.json()
  }
  return Promise.reject({
      message: 'Сервер не доступен',
      error: response
  })
}

class Api {
  constructor ({baseUrl, token}) {
    this._token = token;
    this._baseUrl = baseUrl; 
  }

  getAllPosts() {
      return fetch (`${this._baseUrl}/posts`, {
          headers: {
              authorization: this._token,
          }
      }).then(onResponse);
  }
  
  getPost(id) {
    return fetch(`${this._baseUrl}/posts/${id}`, {
      headers: {
        authorization: this._token,
      },
    }).then(onResponse);
  }

  createPost(newPost) {
    const requestOptions = {
      method: 'POST',
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(newPost)
    };

    return fetch (`${this._baseUrl}/posts`, requestOptions).then(onResponse);
  }

  editPost(post) {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(post)
    };
    console.log("POST!", post);
    return fetch (`${this._baseUrl}/posts/${post._id}`, requestOptions).then(onResponse);
  }

  // editPost(post) {
  //     return fetch (`${this._baseUrl}/posts/users/me`, {
  //       method: "PATCH",
  //       headers: {
  //         authorization: this._token,
  //         "Content-type": "application/json"
  //     },
  //     body: JSON.stringify(post)
  //   }
  // )}

  deletePostById(_id) {
    return fetch (`${this._baseUrl}/posts/${_id}`, {
      method: "DELETE",  
      headers: {
            authorization: this._token,
        }
    })
    .then(onResponse);
  }

  getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: this._token,
        },
      })
      .then(onResponse);
    }

  updateLikesOnPost(isLiked, postId) {
    return fetch (`${this._baseUrl}/posts/likes/${postId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
    }).then(onResponse);
  }
}

const config = {
    baseUrl: "https://api.react-learning.ru",
    token:
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiNmZmYzA5YjEyZjgwZjRjMTBiYjIiLCJpYXQiOjE2NDcwMTM4ODUsImV4cCI6MTY3ODU0OTg4NX0.BDDhJ5w_kY6O9APgNyMHmjSjC-LgE7gG9liVVbCse2E",
};

const api = new Api(config);

export default api;