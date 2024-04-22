'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const CommentSection = ({productId,comments,setcomments}) => {
    const [review,setreview]=useState("");
    console.log('yeh aare h mere comments ',comments)
    const userId=useSelector((state)=>state.auth.userId);
    const addComment=async()=>{
        const comment=await axios.post(`${process.env.API_URL}/api/review/createReview`,{productId,userId,review});
        if(comment.status==200){
            const comments=await axios.post(`${process.env.API_URL}/api/review/getReview`,{productId});
            if(comments.status==200){
            setcomments(comments.data.reviews.reverse());
            setreview("")
        }
        } 
    }
  return (
    <div className='flex flex-col gap-4'>
    <div className='flex flex-col gap-6'>
    <h1 className='font-bold text-3xl'>Reviews</h1>
    {userId && (
        <span className='relative w-72'>
            <input
                value={review}
                onChange={(e) => setreview(e.target.value)}
                className=" h-8 px-2 py-2 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500 pl-10 pr-10"
                placeholder="Search..."
                aria-label="Search"
            />
            {review !== "" && (
                <span onClick={addComment}  className="absolute top-1/2 transform -translate-y-1/2 right-3">
                    <img src='/check.png' className='h-5' alt="Search" />
                </span>
            )}
        </span>
    )}
</div>

<div>
    {comments?.map((comment) => (
        <div className='flex flex-col mb-4' key={comment._id}>
            <div className='flex items-center gap-2'>
                <img src={`/${comment.userId?.profilepic}`} className='h-8 w-8 rounded-full' alt="Profile Pic" />
                <h1 className='font-bold'>{comment.userId?.username}</h1>
            </div>
            <p className='ml-10'>{comment.review}</p>
        </div>
    ))}
</div>

    </div>
  )
}

export default CommentSection
