import React, { useEffect, useRef } from 'react'
import styles from './style.module.scss'

const AddComment = ({ replyState }) => {
  const addCommentRef = useRef()
  useEffect(() => {
    console.log(replyState)
    replyState
      ? (addCommentRef.current.style.display = 'block')
      : (addCommentRef.current.style.display = 'none')
  }, [replyState])
  return (
    <section
      ref={addCommentRef}
      className={`${styles.addCommentContainer} mt-3`}
    >
      <form>
        <div className={`${styles.formContentParent}`}>
          <div className={`${styles.userImage}`}>
            <img
              src="../../src/assets/images/avatars/image-amyrobson.png"
              alt="current user"
            />
          </div>
          <div className={`${styles.commentTextarea}`}>
            <textarea rows="5" defaultValue="@Ahmed,"></textarea>
          </div>
          <div className={`${styles.sendBtn}`}>
            <button type="submit">reply</button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default AddComment
