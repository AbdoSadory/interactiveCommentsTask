import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import MainComment from './components/mainComment/MainComment'
import './App.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment, fetchedData } from './redux/store'
import AddComment from './components/addComment/AddComment'
function App() {
  let [confirmDelete, setConfirmDelete] = useState(false)
  const dataInState = useSelector((state) => state.comments.initialState)
  const dispatch = useDispatch()
  let commentID
  const fetchData = async () => {
    if (Boolean(JSON.parse(localStorage.getItem('data')))) {
      dispatch(fetchedData(JSON.parse(localStorage.getItem('data'))))
    } else {
      fetch('./data.json')
        .then((res) => {
          if (!res.ok) {
            throw new Error("couldn't fetch")
          }
          return res.json()
        })
        .then((result) => {
          localStorage.setItem('data', JSON.stringify(result))
          dispatch(fetchedData(result))
        })
        .catch((err) => console.log(err.message))
    }
  }
  const getCommentIDToDelete = (id) => {
    commentID = id
  }
  const deleteCommentfromData = (commentID) => {
    dispatch(
      deleteComment({
        id: commentID,
      })
    )
    confirmDelete ? setConfirmDelete(false) : setConfirmDelete(true)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main>
      <div className="container">
        <div className="commentsParentContainer">
          {dataInState && Object.keys(dataInState).length > 0 ? (
            dataInState.comments.map((comment) => (
              <MainComment
                key={comment.id}
                commentDetails={comment}
                getCommentIDToDelete={getCommentIDToDelete}
              />
            ))
          ) : (
            <div>no comments</div>
          )}
          {dataInState && <AddComment replyState={true} />}
        </div>
      </div>
      <div>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2
                  className="modal-title fs-5 text-capitalize"
                  id="staticBackdropLabel"
                >
                  Delete comment
                </h2>
              </div>
              <div className="modal-body text-capitalize">
                are you sure to delete this comment ? it's permenant deletion
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary text-capitalize"
                  data-bs-dismiss="modal"
                >
                  no, cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteCommentfromData(commentID)
                  }}
                  className="btn btn-primary text-capitalize"
                  data-bs-dismiss="modal"
                >
                  yes, delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
