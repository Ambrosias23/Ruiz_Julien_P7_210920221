import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Post(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem('TOKEN');
  const userId = localStorage.getItem('userId');
  const admin = localStorage.getItem('admin');

  const handleDelete = (event) => {
    event.preventDefault();
    if (window.confirm('Voulez-vous supprimer votre publication?')) {
      fetch(`http://localhost:3000/api/posts/${props.id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token }
      })
        .then((data) => {
          navigate();
          document.getElementById(`post-${props.id}`).remove();
        })
        .catch((err) => {
          console.log(err.message);
          console.error('There was an error!', err);
        });
    }
  };

  const handleLike = (id) => {
    fetch(`http://localhost:3000/api/posts/${id}/${userId}/like`, {
      method: 'POST',
      body: JSON.stringify({
        postId: id,
        userId: userId
      }),
      headers: { Authorization: 'Bearer ' + token }
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })

      .then((post) => {
        console.log(post);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div id={`post-${props.id}`} className="post card">
      <img src={props.imageUrl} alt={props.title} className="logo" />
      <div className="rightDescription">
        <h2 className="title">{props.title}</h2>
        <div>{new Date(props.publishedAt).toLocaleString()}</div>
        <div className="description">{props.text}</div>
        <div className="actionCard">
          <div
            onClick={() => {
              handleLike(props.id);
            }}
            className="like">
            Like : {props.likes}
          </div>
          {(userId === props.userId || admin === 'true') && (
            <Link to={`update/${props.id}`} className="link">
              Update
            </Link>
          )}
          {(userId === props.userId || admin === 'true') && (
            <div onClick={handleDelete}>Delete</div>
          )}
        </div>
      </div>
    </div>
  );
}
