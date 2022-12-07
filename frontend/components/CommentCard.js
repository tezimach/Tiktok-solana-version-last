import React from 'react'
import styles from '../styles/CommentCard.module.css'
import Image from 'next/image'
import HeartOutLined from '../assets/HeartOutLined'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-US')

const CommentCard =({
    key,
    username,
    comment,
    avatar,
    timestamp
})=>{
    return(
        <div className={styles.wrapper}>
            <div>
                <Image
                width={34}
                height={34}
                classNmae={styles.avatar}
                src={avatar}
                alt={username}    
                />
            </div>
            <div className={styles.textContainer}>
                <div>
                    <p className={styles.username}>{username}</p>
                    <p className={styles.commentText}>{comment}</p>
                
                    <span>
                       {timeAgo.format(new Date(timestamp * 1000), 'twitter-now')}
                    </span>
                </div>
            </div>
            <div className={styles.button}>
                <div>
                   <Image
                   width={24}
                   heigth={24}
                   src={HeartOutLined}
                   /> 
                </div>
            </div>
        </div>
    )
}

export default CommentCard