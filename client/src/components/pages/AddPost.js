import React, { useState } from 'react';
import AddNews from './AddNews';
import ShowNews from './ShowNews';

function AddPost() {
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostSaved = () => {
    setSelectedPost(null);
  };

  return (
    <div>
      <h1>News Application</h1>
      <AddNews selectedPost={selectedPost} onPostSaved={handlePostSaved} />
      <ShowNews onPostSelected={setSelectedPost} />
    </div>
  );
}

export default AddPost;
