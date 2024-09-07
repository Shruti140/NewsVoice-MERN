import React, { useState } from 'react';
import { toast } from "react-toastify";
import { BiLike,BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

const Vote = ({ article }) => {
  const [voteStatus, setVoteStatus] = useState({
    liked: false,
    disliked: false,
    likes: 0,
    dislikes: 0,
  });

  const handleLike = () => {
    if (!voteStatus.liked && !voteStatus.disliked) {
      setVoteStatus(prevStatus => ({
        ...prevStatus,
        liked: true,
        likes: prevStatus.likes + 1,
        }));
    } else if (voteStatus.disliked) {
      setVoteStatus(prevStatus => ({
        ...prevStatus,
        liked: true,
        disliked: false,
        likes: prevStatus.likes + 1,
        dislikes: prevStatus.dislikes - 1,
      }));
    };
    toast.success("Liked an article", {
      position: "top-center",
    });
    <BiSolidLike/>
  };

  const handleDislike = () => {
    if (!voteStatus.liked && !voteStatus.disliked) {
      setVoteStatus(prevStatus => ({
        ...prevStatus,
        disliked: true,
        dislikes: prevStatus.dislikes + 1,
      }));
    } else if (voteStatus.liked) {
      setVoteStatus(prevStatus => ({
        ...prevStatus,
        liked: false,
        disliked: true,
        likes: prevStatus.likes - 1,
        dislikes: prevStatus.dislikes + 1,
      }));
    };
    toast.success("Disliked an article", {
      position: "top-center",
    });
  };

  return (
    <div>
      <div style={{display:"flex"}}>
        < BiLike className='card_icons' onClick={handleLike} disabled={voteStatus.liked} />
        <p>{voteStatus.likes}</p>
        < BiDislike className='card_icons' onClick={handleDislike} disabled={voteStatus.disliked} />
        <p>{voteStatus.dislikes}</p>
      </div>
    </div>
  );
};

export default Vote;
