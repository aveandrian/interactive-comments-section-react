import '../styles/Comment.css'

export default function Comment(){
    return (
        <div className="comment">
            <div className="comment-score">
                <img src="/images/icon-plus.svg" alt="" />
                <p className='comment-score-text'>12</p>
                <img src="/images/icon-minus.svg" alt="" />
            </div>
            <div className="comment-content">
                <div className="comment-header">
                    <img className="comment-avatar" src="/images/avatars/image-amyrobson.png"/>
                    <p className="comment-author">amyrobson</p>
                    <p className="comment-time">1 month ago</p>
                    <div className="comment-actions">
                        <div className="delete-action">
                            <img className="delete-icon" src='/images/icon-delete.svg' />
                            <p className="delete-text">Delete</p>
                        </div>
                        <div className="edit-action">
                            <img className="edit-icon" src='/images/icon-edit.svg'/>
                            <p className="edit-text">Edit</p>
                        </div>
                        <div className="reply-action">
                            <img className="reply-icon" src='/images/icon-reply.svg' />
                            <p className="reply-text">Reply</p>
                        </div>
                    </div>
                </div>
                <div className="comment-text">
                    Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.
                </div>
            </div>
        </div>
    )
}