import { useState } from 'react'
import Comment from './components/Comment'
import { nanoid } from 'nanoid'
import data from './data.json'
import './App.css'

function App() {
  const currentUser = data.currentUser
  const [comments, setComments] = useState(data.comments)

  function handleReply(parentId, content, toUser){   
    console.log("To user", toUser)
    setComments(comments => comments.map(comment => {
      return comment.id ==  parentId ? {...comment, replies: [...comment.replies, 
        {
          id: nanoid(),
          content: content,
          score: 0,
          replyingTo: toUser,
          user: currentUser,
          createdAt: 'now'
        }
      ]} : comment
    }))
  }

  function updateComment(id, content, isReply, parentId){
    console.log(id, content, isReply, parentId)
    isReply ? 
    setComments(comments => comments.map(comment => {
      return comment.id == parentId ? 
      {...comment, replies: comment.replies.map(reply => {
        return reply.id == id ? {...reply, content: content} : reply
      })}
      : comment
    })) 
    : setComments(comments => comments.map(comment => {
      return comment.id == id ? {...comment, content: content} : comment
    }))
  }

  console.log(comments)
  return (
    <>
      <div className='comments-section'>
        {comments.map(comment => <Comment 
          currentUser={currentUser} 
          isReply={false} 
          key={comment.id} 
          {...comment} 
          parentId={comment.id} 
          handleReply={handleReply}
          updateComment={updateComment}
        />)}
      </div>
      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="#">Your Name Here</a>.
      </div>
    </>
  )
}

export default App
