import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Post(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem('TOKEN');
  const userId = localStorage.getItem('userId');

  const handleDelete = (event) => {
    event.preventDefault();
    console.log('handleDelete()');
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
        //window.location.reload();
      })
      .catch((error) => console.log(error));
  };
  const handleDislike = (id) => {
    fetch(`http://localhost:3000/api/posts/${id}/${userId}/dislike`, {
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
        //window.location.reload();
      })
      .catch((error) => console.log(error));
  };
  const [isEdited, setisEdited] = useState(false);

  function editPost(_postId) {
    if (isEdited) {
      setisEdited(false);
    } else {
      console.log(`post id from edited post = ${_postId}`);
      setisEdited(true);
      setPostId(_postId);
    }
  }

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
            }}>
            Like ({props.likes})
          </div>
          <div
            onClick={() => {
              handleDislike(props.id);
            }}>
            dislike ({props.dislikes})
          </div>
          {isEdited && (userId === Post.userId || isAdmin === true) && (
            <Link to={`update/${props.id}`} className="link" onClick="update">
              Update
            </Link>
          )}
          <div onClick={handleDelete}>Delete</div>
        </div>
      </div>
    </div>
  );
}
