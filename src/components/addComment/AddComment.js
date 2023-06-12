import React, { useEffect, useRef } from 'react'
import styles from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment/moment'
import { addComment, addReply } from '../../redux/store'

const AddComment = ({
  replyState,
  changeReplyState,
  defaultNameValue = '',
  commentID = 0,
}) => {
  const dataInState = useSelector((state) => state.comments.initialState)
  const dispatch = useDispatch()
  const addCommentRef = useRef()
  const addNewComment = (e, commentID) => {
    e.preventDefault()
    let newCommentID = parseFloat(
      (Math.random() * Math.random()).toPrecision(6)
    )
    switch (commentID) {
      case 0:
        let newComment = {
          id: newCommentID,
          content: e.target.elements[0].value,
          createdAt: moment().format('llll'),
          score: 0,
          user: {
            image: {
              png: './images/avatars/image-juliusomo.png',
              webp: './images/avatars/image-juliusomo.webp',
            },
            username: 'juliusomo',
          },
        }
        dispatch(addComment(newComment))
        break
      default:
        let newReply = {
          id: newCommentID,
          content: e.target.elements[0].value,
          createdAt: moment().format('llll'),
          score: 0,
          replyingTo: defaultNameValue,
          user: {
            image: {
              png: './images/avatars/image-juliusomo.png',
              webp: './images/avatars/image-juliusomo.webp',
            },
            username: 'juliusomo',
          },
        }
        dispatch(addReply({ newReply, commentID }))
        changeReplyState()
        break
    }
    e.target.reset()
  }
  useEffect(() => {
    replyState
      ? (addCommentRef.current.style.display = 'block')
      : (addCommentRef.current.style.display = 'none')
  }, [replyState])
  return (
    <section
      ref={addCommentRef}
      className={`${styles.addCommentContainer} mt-3`}
    >
      <h2 className="d-none">{defaultNameValue}</h2>
      <form
        onSubmit={(e) => {
          addNewComment(e, commentID)
        }}
      >
        <div className={`${styles.formContentParent}`}>
          <div className={`${styles.userImage}`}>
            <img
              src={require('../../assets/' +
                dataInState.currentUser.image.png.slice(2))}
              alt="current user"
            />
          </div>
          <div className={`${styles.commentTextarea}`}>
            <textarea
              rows="5"
              defaultValue={defaultNameValue && `@${defaultNameValue},`}
              placeholder={'Add New Comment'}
              required
            ></textarea>
          </div>
          <div className={`${styles.sendBtn}`}>
            <button type="submit" aria-labelledby="submitTheComment">
              {defaultNameValue === '' ? 'send' : 'reply'}
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default AddComment
