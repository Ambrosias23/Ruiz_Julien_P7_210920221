import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';

export default function Home(props) {
  const [posts, setPosts] = useState();
  const navigate = useNavigate();

  const token = localStorage.getItem('TOKEN');
  const isLoggedIn = token === null ? false : true;

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate(`/login`);
    } else {
      fetch(`http://localhost:3000/api/posts`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setPosts(data);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  }, []);

  return (
    <div className="body">
      <main>
        <div className="posts">
          {posts &&
            posts.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                title={post.title}
                text={post.text}
                imageUrl={post.imageUrl}
                likes={post.likes}
                dislikes={post.dislikes}
                userId={post.userId}
                userName="@moi"
                publishedAt={post.updatedAt}
                avatar=""
              />
            ))}
        </div>
      </main>
    </div>
  );
}
