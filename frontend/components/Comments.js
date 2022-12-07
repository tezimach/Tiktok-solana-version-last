import React , {useState, useEffect} from 'react'
import styles from '../styles/Comments.module.css'
import CommentCard from './CommentCard'
const Comments =({
    onHide,
    index,
    createComment,
    getComments,
    commentCount
})=>{

    const [comments, setComments]= useSate([])
    const [newComments, setNewComments]= useSate('')

    useEffect(()=>{
        gettingComments()
    },[index])

    const gettingComments= async ()=>{
        let comments= await getComments(address, commentCount)
        comments.sort((a,b)=>b.videoTime.toNumber()- a.videoTime.toNumber())
        setComments(comments)
    }

    const replyClicked = async()=>{
        await createComment(address, commentCount,newComments)
        setNewComments('')
    }
    return(
        <div className={style.wrapper}>
            <div className={style.commentHeader}>
                <p>{commentCount} comments</p>
                <p className={styles.colseButton} onClick={onHide}>
                    &times;
                </p>
            </div>
            {comments.map(comment=>{
                return(
                    <CommentCard
                    key={commet.index.toNumber()}
                    username={commet.CommenterName}
                    comment={comment.text}
                    avatar={comment.commenterUrl}
                    timestamp={comment.videoTime.toNumber()}
                    />
                )
            })}
            <div classNmae={styles.commentInputWrapper}>
                <input
                type='text'
                onChange={e=>setNewComment(e.target.value)}
               value={setNewComment}
               placeholder='Leav a comment ...'
               />
               <button className={styles.button} onClick={replyClicked}>
                Reply
                </button>
            </div>
        </div>
    )
}

export default Comments;