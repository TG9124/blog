import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';
import { UserContext } from '../User Context';
import { Link } from 'react-router-dom';

const PostPage = () => {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/post/${id}`);
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostData();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <time>{formatISO9075(new Date(post.createdAt))}</time>
      <div className="author">by @{post.author.username}</div>
      {userInfo.id === post.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${post._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
      <div className="image">
        <img src={`http://localhost:4000/${post.cover}`} alt="" />
      </div>
      <div className="content">
        {post.content}
      </div>
    </div>
  );
};

export default PostPage;