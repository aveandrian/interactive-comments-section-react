import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { compareDates } from '../compareDate'
import '../styles/Comment.css'

export default function Comment(props){
    const [isEditing, setIsEditing] = useState(false)
    const [isReplying, setisReplying] = useState(false)
    const [commentTextValue, setCommentTextValue] = useState("")
    const [replyingTextValue, setReplyingTextValue] = useState("")
    
  const [isDeleteModal, setIsDeleteModal] = useState(false)
    function toggleDeleteModal(){
        setIsDeleteModal(prev => !prev)
      }

    function handleReplyingTextValueChange(e){
        setReplyingTextValue(e.target.value)
    }

    function toggleisReplying(){
        setReplyingTextValue("@" + props.user.username + " ")
        setisReplying(prev=>!prev)
    }

    function toggleIsEditing(){
        if(props.content != commentTextValue){
            setCommentTextValue(props.content)
        }
        if(props.isReply){
            setCommentTextValue("@" + props.replyingTo + " " + props.content)
        }
        setIsEditing(prev => !prev)
    }

    function handleChange(e){
        setCommentTextValue(e.target.value)
    }
    return (
        <>
        {isDeleteModal &&  
        <div className='delete-modal-wrapper'>
            <div className='delete-modal'>
                <h1 className='delete-modal-title'>Delete comment</h1>
                <p className='delete-modal-text'>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
                <div className='delete-btn-container'>
                <button className='delete-back-btn' onClick={toggleDeleteModal}>No, back</button>
                <button className='delete-btn' onClick={() => props.handleDelete(props.id, props.isReply, props.parentId)}>Yes, delete</button>
                </div>
            </div>
        </div>
      }
        <div className="comment">
            <div className='comment-section'>
                <div className="comment-score">
                    <FontAwesomeIcon icon={faPlus} size='xs'  alt="Upvote" className='upvote action' onClick={()=>props.handleUpvote(props.id, props.isReply, props.parentId)}/>
                    <p className='comment-score-text'>{props.score}</p>
                    <FontAwesomeIcon icon={faMinus} size='xs'  alt="Downvote" className='downvote action' onClick={()=>props.handleDownvote(props.id, props.isReply, props.parentId)}/>
                </div>
                <div className='comment-user-info'>
                    <img className="comment-avatar" src={props.user.image.png}/>
                    <p className="comment-author">{props.user.username}</p>
                    {props.currentUser.username == props.user.username && <p className='self-tag'>you</p>}
                    <p className="comment-time">{compareDates(props.createdAt)}</p>
                </div>
                <div className="comment-actions">
                    {props.currentUser.username == props.user.username ? 
                    <>
                        <div className="delete-action action" onClick={toggleDeleteModal} >
                            <img className="delete-icon" src='/images/icon-delete.svg' />
                            <p className="delete-text">Delete</p>
                        </div>
                        <div className="edit-action action" onClick={toggleIsEditing}>
                            <img className="edit-icon" src='/images/icon-edit.svg'/>
                            <p className="edit-text">Edit</p>
                        </div>
                    </>
                    :
                    <div className="reply-action action"  onClick={toggleisReplying}>
                        <img className="reply-icon" src='/images/icon-reply.svg' />
                        <p className="reply-text">Reply</p>
                    </div>
                    }
                </div>
                {isEditing ? 
                <div className='edit-wrapper'>
                    <textarea rows={4} className="edit-comment-text" value={commentTextValue} name='commentText' onChange={handleChange}/>
                    <button className='save-edit btn' onClick={()=>{props.updateComment(props.id, commentTextValue, props.isReply, props.parentId ); toggleIsEditing();}}>Update</button>
                </div>
                : 
                <div className="comment-text">
                    {props.replyingTo && <span className='replyTo'>@{props.replyingTo},</span>} {props.content}
                </div>
                }
            </div>
            {isReplying && 
                <div className='replying-section'>
                    <img className="comment-avatar" src={props.currentUser.image.png}/>
                    <textarea rows={4} className="reply-comment-text" value={replyingTextValue} onChange={handleReplyingTextValueChange}/>
                    <button className='reply-edit btn' 
                    onClick={()=>{props.handleReply(props.parentId, replyingTextValue, props.user.username); toggleisReplying()}}>Reply</button>
                </div>
            }
        {props.replies?.length > 0 && (
            <div className='replies-section'>
                <div className='replies-divider'></div>
                <div className='replies-content'>
                    {props.replies.map(reply => <Comment 
                        key={reply.id} 
                        {...reply} 
                        isReply={true} 
                        currentUser={props.currentUser} 
                        updateComment={props.updateComment} 
                        parentId={props.parentId} 
                        handleReply={props.handleReply} 
                        handleDelete={props.handleDelete}
                        handleUpvote={props.handleUpvote}
                        handleDownvote={props.handleDownvote}
                    />)}
                </div>
            </div>) }
        </div>
        </>
    )
}