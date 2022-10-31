import Button from '../components/Button';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('TOKEN');
  const isLoggedIn = token === null ? false : true;
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate(`/login`);
    }
  }, []);

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append(
      'post',
      JSON.stringify({
        title: title,
        text: text
      })
    );
    formData.append('userId', userId);
    formData.append('image', image);
    fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then((data) => {
        navigate('/');
      })
      .catch((err) => {
        console.log('error');
        console.log(err);
        alert(err);
      });
  };

  return (
    <div className="pageCreate">
      <h1>Create</h1>
      <form className="create" onSubmit={handleSubmit}>
        <label htmlFor="Mail">Title :</label>
        <input
          type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
          minLength="4"
          maxLength="30"
          size="10"
          className="titleCreate"
          placeholder="Title"
          value={title}
        />
        <label htmlFor="description">Contenu :</label>
        <textarea
          id="description"
          name="description"
          onChange={(e) => setText(e.target.value)}
          value={text}
          rows={10}
          cols={50}
          className="contenuCreate"
          placeholder="What's up ?"
        />
        <label htmlFor="post" className="pictureCreate">
          Choose a picture:
        </label>
        <input
          type="file"
          className="sendPictureCreate"
          onChange={onImageChange}
          name="pictureCreate"
          accept="image/png, image/jpeg"
        />
        <img src={previewImage} alt="" />
        <Button buttonName="Create" />
      </form>
    </div>
  );
};

export default Create;
