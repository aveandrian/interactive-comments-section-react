import { useState } from 'react'
import '../styles/Comment.css'

export default function Comment(props){
    console.log(props)
    const [isEditing, setIsEditing] = useState(false)
    const [isReplying, setisReplying] = useState(false)
    const [commentTextValue, setCommentTextValue] = useState('@'+props.replyingTo + " " + props.content)
    const [replyingTextValue, setReplyingTextValue] = useState("")

    function handleReplyingTextValueChange(e){
        setReplyingTextValue(e.target.value)
    }

    function toggleisReplying(){
        setReplyingTextValue('@'+ props.user.username + " ")
        setisReplying(prev=>!prev)
    }

    function toggleIsEditing(){
        if(props.content != commentTextValue){
            setCommentTextValue(props.content)
        }
        setIsEditing(prev => !prev)
    }

    function handleChange(e){
        setCommentTextValue(e.target.value)
    }
    return (
        <>
        <div className="comment">
            <div className='comment-section'>
                <div className="comment-score">
                    <img src="/images/icon-plus.svg" alt="" />
                    <p className='comment-score-text'>{props.score}</p>
                    <img src="/images/icon-minus.svg" alt="" />
                </div>
                <div className="comment-content">
                    <div className="comment-header">
                        <img className="comment-avatar" src={props.user.image.png}/>
                        <p className="comment-author">{props.user.username}</p>
                        {props.currentUser.username == props.user.username && <p className='self-tag'>you</p>}
                        <p className="comment-time">{props.createdAt}</p>
                        <div className="comment-actions">
                           {props.currentUser.username == props.user.username ? <>
                            <div className="delete-action">
                                <img className="delete-icon" src='/images/icon-delete.svg' />
                                <p className="delete-text">Delete</p>
                            </div>
                            <div className="edit-action" onClick={toggleIsEditing}>
                                <img className="edit-icon" src='/images/icon-edit.svg'/>
                                <p className="edit-text">Edit</p>
                            </div>
                            </>
                             :
                            <div className="reply-action"  onClick={toggleisReplying}>
                                <img className="reply-icon" src='/images/icon-reply.svg' />
                                <p className="reply-text">Reply</p>
                            </div>}
                        </div>
                    </div>
                    
                    {isEditing ? 
                    (<>
                        <textarea rows={4} className="edit-comment-text" value={commentTextValue} name='commentText' onChange={handleChange}/>
                        <button className='save-edit btn' onClick={()=>{props.updateComment(props.id, commentTextValue, props.isReply, props.parentId ); toggleIsEditing();}}>Update</button>
                    </>
                    )
                    : (
                    <div className="comment-text">
                        {props.replyingTo && <span className='replyTo'>@{props.replyingTo},</span>} {props.content}
                    </div>)
                    }
                </div>
                
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
                    {props.replies.map(reply => <Comment key={reply.id} currentUser={props.currentUser} updateComment={props.updateComment} parentId={props.parentId} isReply={true} {...reply} handleReply={props.handleReply}/>)}
                </div>
            </div>) }
        </div>
        </>
    )
}