import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleCreatePost = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('summary', summary);
      formData.append('content', content);
      formData.append('file', file);

      const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        console.error('Error creating post:', response.status);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleCreatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(event) => setSummary(event.target.value)}
      />
      <input
        type="file"
        onChange={(event) => setFile(event.target.files[0])}
      />
      <ReactQuill value={content} onChange={(value) => setContent(value)} />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePostPage;