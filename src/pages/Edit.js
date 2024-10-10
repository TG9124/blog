import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import EditorComponent from '../Editor';

const EditPostPage = () => {
  const { postId } = useParams();
  const [postTitle, setPostTitle] = useState('');
  const [postSummary, setPostSummary] = useState('');
  const [postContent, setPostContent] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [redirect, setRedirectStatus] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/post/${postId}`);
        const postData = await response.json();
        setPostTitle(postData.title);
        setPostSummary(postData.summary);
        setPostContent(postData.content);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostData();
  }, [postId]);

  const handleUpdatePost = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', postTitle);
    formData.append('summary', postSummary);
    formData.append('content', postContent);
    if (uploadedFiles) {
      formData.append('file', uploadedFiles[0]);
    }
    try {
      const response = await fetch(`http://localhost:4000/post/${postId}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });
      if (response.ok) {
        setRedirectStatus(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (redirect) {
    return <Navigate to={`/post/${postId}`} />;
  }

  return (
    <form onSubmit={handleUpdatePost}>
      <input
        type="text"
        placeholder="Post Title"
        value={postTitle}
        onChange={(event) => setPostTitle(event.target.value)}
      />
      <input
        type="text"
        placeholder="Post Summary"
        value={postSummary}
        onChange={(event) => setPostSummary(event.target.value)}
      />
      <input
        type="file"
        onChange={(event) => setUploadedFiles(event.target.files)}
      />
      <EditorComponent value={postContent} onChange={setPostContent} />
      <button type="submit">Update Post</button>
    </form>
  );
};

export default EditPostPage;