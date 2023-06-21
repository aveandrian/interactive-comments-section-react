import { useEffect, useState } from 'react'
import Comment from './components/Comment'
import { nanoid } from 'nanoid'
import data from './data.json'
import './App.css'

function App() {
  const currentUser = data.currentUser
  const [comments, setComments] = useState(null)
  const [newComment, setNewComment] = useState("")

  useEffect(()=>{
    let chatJson = window.localStorage.getItem('chatJson')
    if(JSON.parse(chatJson)) {
      setComments(JSON.parse(chatJson))
    }
    else {
      setComments(data.comments)
    }
  }, [])

  useEffect(()=>{
    if(comments)
      window.localStorage.setItem('chatJson', JSON.stringify(comments))
  }, [comments])
  
  function handleUpvote(id, isReply, parentId){
    isReply ? 
    setComments(comments => comments.map(comment => {
      return comment.id == parentId ? 
      {...comment, replies: comment.replies.map(reply => {
        return reply.id == id ? {...reply, score: reply.score+1} : reply
      })}
      : comment
    })) 
    : setComments(comments => comments.map(comment => {
      return comment.id == id ? {...comment, score: comment.score+1} : comment
    }))
  }

  function handleDownvote(id, isReply, parentId){
    isReply ? 
    setComments(comments => comments.map(comment => {
      return comment.id == parentId ? 
      {...comment, replies: comment.replies.map(reply => {
        return reply.id == id ? {...reply, score: reply.score-1} : reply
      })}
      : comment
    })) 
    : setComments(comments => comments.map(comment => {
      return comment.id == id ? {...comment, score: comment.score-1} : comment
    }))
  }

  function handleChangeNewComment(e){
    setNewComment(e.target.value)
  }

  function handleAddComment(){
    if(newComment == "")
      return;
    setComments(comments => [...comments,
      {
        id: nanoid(),
        content: newComment,
        createdAt: new Date(),
        score: 0,
        user: currentUser,
        replies: []
      }]
    )
    setNewComment("")
  }

  function handleDelete(id, isReply, parentId){
    isReply ?
    setComments(comments => comments.map(comment => {
      return comment.id == parentId ? 
      {...comment, replies: comment.replies.filter(reply => reply.id != id )}
      : comment
    })) 
    : setComments(comments => comments.filter(comment => comment.id != id ))
  }

  function handleReply(parentId, content, toUser){   
    setComments(comments => comments.map(comment => {
      return comment.id ==  parentId ? {...comment, replies: [...comment.replies, 
        {
          id: nanoid(),
          content: content.startsWith("@" + toUser + " ") ? content.split("@" + toUser + " ")[1] : content,
          score: 0,
          replyingTo: toUser,
          user: currentUser,
          createdAt: new Date()
        }
      ]} : comment
    }))
  }

  function updateComment(id, content, isReply, parentId){
    isReply ? 
    setComments(comments => comments.map(comment => {
      return comment.id == parentId ? 
      {...comment, replies: comment.replies.map(reply => {
        return reply.id == id ? 
        {
          ...reply, 
          content: content.startsWith("@" + reply.replyingTo + " ") ? content.split("@" + reply.replyingTo + " ")[1] : content,
        } 
        : reply
      })}
      : comment
    })) 
    : setComments(comments => comments.map(comment => {
      return comment.id == id ? {...comment, content: content} : comment
    }))
  }

  return (
    <>
      {comments &&<div className='comments-section'>
        {comments.map(comment => <Comment 
          currentUser={currentUser} 
          isReply={false} 
          key={comment.id} 
          {...comment} 
          parentId={comment.id} 
          handleReply={handleReply}
          updateComment={updateComment}
          handleDelete={handleDelete}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
        />)}
      </div>}
      <div className='new-comment-section'>
        <img className='current-user-avatar' src={currentUser.image.png}></img>
        <textarea rows={4} className='new-comment-input' placeholder='Add a comment...' name='new-comment' value={newComment} onChange={handleChangeNewComment}></textarea>
        <button className='new-comment-btn btn' onClick={handleAddComment}>Send</button>
      </div>
      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="https://github.com/aveandrian">aveandrian</a>.
      </div>
    </>
  )
}

export default App
