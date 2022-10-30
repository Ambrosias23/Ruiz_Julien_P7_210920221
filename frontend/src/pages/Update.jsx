import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function Update() {
  const token = localStorage.getItem('TOKEN');
  const postData = useParams();
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${postData.id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setText(data.text);
        setPreviewImage(data.imageUrl);
        setUserId(data.userId);
        setTitle(data.title);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setPreviewImage(URL.createObjectURL(file));
    setImageUrl(e.target.files[0]);
  };

  const handleModify = (e) => {
    e.preventDefault();
    const bodyPost = new FormData();
    bodyPost.append('userId', userId);
    bodyPost.append('image', imageUrl);
    bodyPost.append('text', text);
    bodyPost.append('title', title);

    fetch(`http://localhost:3000/api/posts/${postData.id}`, {
      method: 'PUT',
      body: bodyPost,
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('Vous avez modifié une publication');
        navigate('/');
      })

      .catch((error) => {
        console.log(error);
        console.log("Vous n'avez pas modifié votre publication");
      });
  };
  return (
    <div className="pageCreate">
      <h1>Modifier</h1>

      <form className="create" onSubmit={handleModify}>
        <label htmlFor="Mail">Titre :</label>
        <input
          className="titleCreate"
          placeholder="Votre Titre"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="text">Contenu :</label>
        <textarea
          className="contenuCreate"
          placeholder="Quoi de neuf ?"
          type="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label htmlFor="post" className="pictureCreate">
          Choisissez une photo:
        </label>
        <input
          id="file-input"
          
          className="sendPictureCreate"
          name="file"
          type="file"
          onChange={onImageChange}
          accept="image/png, image/jpeg"
        />
        <img src={previewImage} alt="" />
        <Button buttonName="Modifier" />
      </form>
    </div>
  );
}
export default Update;
