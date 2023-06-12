import React, { useRef, useState } from 'react'
import styles from './style.module.scss'
import AddComment from '../addComment/AddComment'
import replyImg from '../../assets/images/icon-reply.svg'
import editImg from '../../assets/images/icon-edit.svg'
import deleteImg from '../../assets/images/icon-delete.svg'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { commentScore, editComment } from '../../redux/store'

const MainComment = ({ commentDetails, getCommentIDToDelete }) => {
  let dispatch = useDispatch()
  const [voteState, setVoteState] = useState('')
  const [replyState, setReplyState] = useState(false)
  const [editState, setEditState] = useState(false)
  const editCommentbutton = useRef()
  const editCommentTextarea = useRef()
  const updateBtnContainer = useRef()
  const displayAddCommentForm = () => {
    replyState ? setReplyState(false) : setReplyState(true)
  }
  const changeReplyState = () => {
    replyState ? setReplyState(false) : setReplyState(true)
  }
  const changeEditState = (e) => {
    if (!editState) {
      setEditState(true)
      editCommentbutton.current.style.display = 'none'
      updateBtnContainer.current.style.display = 'block'
      editCommentTextarea.current.style.outline = '2px solid black'
      editCommentTextarea.current.style.height = '100px'
      editCommentTextarea.current.toggleAttribute('readOnly')
    }
  }

  const updateCurrentUserComment = () => {
    setEditState(false)
    editCommentbutton.current.style.display = 'unset'
    updateBtnContainer.current.style.display = 'none'
    editCommentTextarea.current.style.outline = 'none'
    editCommentTextarea.current.style.height = 'unset'
    editCommentTextarea.current.toggleAttribute('readOnly')
  }
  return (
    <>
      <section>
        <h2 className="d-none">{commentDetails.user.username}</h2>
        <div className={`${styles.commentParent}`}>
          <div className={`${styles.commentCounter}`}>
            <div>
              <button
                aria-labelledby="toUpvote"
                disabled={
                  commentDetails.user.username === 'juliusomo' ? true : false
                }
                onClick={() => {
                  if (voteState === '') {
                    dispatch(
                      commentScore({ action: 'upvote', id: commentDetails.id })
                    )
                    setVoteState('upvote')
                  }
                  if (voteState === 'downvote') {
                    dispatch(
                      commentScore({ action: 'upvote', id: commentDetails.id })
                    )
                    setVoteState('')
                  }
                }}
              >
                <svg width={11} height={11} xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                    fill="#C5C6EF"
                  />
                </svg>
              </button>
              <p>{commentDetails.score}</p>
              <button
                aria-labelledby="toDownvote"
                disabled={
                  commentDetails.user.username === 'juliusomo' ? true : false
                }
                onClick={() => {
                  if (voteState === '') {
                    dispatch(
                      commentScore({
                        action: 'downvote',
                        id: commentDetails.id,
                      })
                    )
                    setVoteState('downvote')
                  }
                  if (voteState === 'upvote') {
                    dispatch(
                      commentScore({
                        action: 'downvote',
                        id: commentDetails.id,
                      })
                    )
                    setVoteState('')
                  }
                }}
              >
                <svg width={11} height={3} xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                    fill="#C5C6EF"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className={`${styles.commentUserInfo}`}>
            <img
              src={require('../../assets/' +
                commentDetails.user.image.png.slice(2))}
              alt={commentDetails.user.username}
            />
            <h2 className="text-capitalize">{commentDetails.user.username}</h2>
            <span>
              {moment(commentDetails.createdAt).isValid()
                ? moment(commentDetails.createdAt, 'llll').startOf().fromNow()
                : commentDetails.createdAt}
            </span>
          </div>
          <div className={`${styles.commentContent}`}>
            {commentDetails.user.username === 'juliusomo' ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  updateCurrentUserComment()
                  dispatch(
                    editComment({
                      newComment: e.target.elements[0].value,
                      id: commentDetails.id,
                    })
                  )
                }}
              >
                <label for="comment" className="d-none"></label>
                <textarea
                  ref={editCommentTextarea}
                  defaultValue={commentDetails.content}
                  name="comment"
                  readOnly
                  required
                  cols="60"
                ></textarea>
                <div
                  ref={updateBtnContainer}
                  className={`${styles.updateBtnContainer}`}
                >
                  <button type="submit" aria-labelledby="updateTheComment">
                    update
                  </button>
                </div>
              </form>
            ) : (
              <p>{commentDetails.content}</p>
            )}
          </div>
          <div className={styles.commentOperations}>
            {commentDetails.user.username === 'juliusomo' ? (
              <>
                <button
                  className={`${styles.deleteBtn}`}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => {
                    getCommentIDToDelete(commentDetails.id)
                  }}
                  aria-labelledby="toDelete"
                >
                  <img src={deleteImg} alt="delete SVG img" />
                  <span className="text-capitalize">delete</span>
                </button>
                <button
                  onClick={(e) => {
                    changeEditState(e)
                  }}
                  ref={editCommentbutton}
                  aria-labelledby="toEdit"
                >
                  <img src={editImg} alt="edit SVG img" />
                  <span className="text-capitalize">edit</span>
                </button>
              </>
            ) : (
              <button onClick={displayAddCommentForm} aria-labelledby="toReply">
                <img src={replyImg} alt="reply SVG img" />
                <span className="text-capitalize">reply</span>
              </button>
            )}
          </div>
        </div>
      </section>
      <AddComment
        replyState={replyState}
        changeReplyState={changeReplyState}
        defaultNameValue={commentDetails.user.username}
        commentID={commentDetails.id}
      />
      <div className={`${styles.replyContainer}`}>
        {commentDetails.replies &&
          commentDetails.replies.map((reply) => (
            <MainComment
              key={reply.id}
              commentDetails={reply}
              getCommentIDToDelete={getCommentIDToDelete}
            />
          ))}
      </div>
    </>
  )
}

export default MainComment
