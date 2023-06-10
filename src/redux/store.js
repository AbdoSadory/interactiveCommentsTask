import { configureStore, createSlice } from '@reduxjs/toolkit'
const commentsSlice = createSlice({
  name: 'comments',
  initialState: {},
  reducers: {
    fetchedData(state, payload = {}) {
      state.initialState = payload.payload
    },
    addComment(state, payload = {}) {
      state.initialState = {
        ...state.initialState,
        comments: [...state.initialState.comments, payload.payload],
      }
      localStorage.setItem('data', JSON.stringify(state.initialState))
    },
    addReply(state, payload = {}) {
      let newCommentsArray = state.initialState.comments.map((comment) => {
        if (comment.id === payload.payload.commentID) {
          comment.replies =
            comment.replies.length > 0
              ? [...comment.replies, payload.payload.newReply]
              : [payload.payload.newReply]
        } else {
          if (comment.replies) {
            for (let reply of comment.replies) {
              if (reply.id === payload.payload.commentID) {
                comment.replies = [...comment.replies, payload.payload.newReply]
                break
              }
            }
          }
        }
        return comment
      })
      state.initialState = {
        ...state.initialState,
        comments: [...newCommentsArray],
      }
      localStorage.setItem('data', JSON.stringify(state.initialState))
    },
    commentScore(state, payload = {}) {
      if (payload.payload.action === 'upvote') {
        let newCommentsArray = state.initialState.comments.map((comment) => {
          if (comment.id === payload.payload.id) {
            comment.score = comment.score + 1
          } else {
            if (comment.replies) {
              for (let reply of comment.replies) {
                if (reply.id === payload.payload.id) {
                  reply.score = reply.score + 1
                  break
                }
              }
            }
          }
          return comment
        })
        state.initialState = {
          ...state.initialState,
          comments: [...newCommentsArray],
        }
      }
      if (payload.payload.action === 'downvote') {
        let newCommentsArray = state.initialState.comments.map((comment) => {
          if (comment.id === payload.payload.id) {
            comment.score = comment.score - 1
          } else {
            if (comment.replies) {
              for (let reply of comment.replies) {
                if (reply.id === payload.payload.id) {
                  reply.score = reply.score - 1
                  break
                }
              }
            }
          }
          return comment
        })
        state.initialState = {
          ...state.initialState,
          comments: [...newCommentsArray],
        }
      }
      localStorage.setItem('data', JSON.stringify(state.initialState))
    },
    editComment(state, payload = {}) {
      let newCommentsArray = state.initialState.comments.map((comment) => {
        if (comment.id === payload.payload.id) {
          comment.content = payload.payload.newComment
        } else {
          if (comment.replies) {
            for (let reply of comment.replies) {
              if (reply.id === payload.payload.id) {
                reply.content = payload.payload.newComment
                break
              }
            }
          }
        }
        return comment
      })
      state.initialState = {
        ...state.initialState,
        comments: [...newCommentsArray],
      }
      localStorage.setItem('data', JSON.stringify(state.initialState))
    },
    deleteComment(state, payload = {}) {
      let newCommentsArray = state.initialState.comments
        .filter((comment) => comment.id !== payload.payload.id)
        .filter((comment) => {
          let newReplies = []
          if (comment.replies) {
            newReplies = comment.replies.filter(
              (reply) => reply.id !== payload.payload.id
            )
          }
          return (comment.replies = newReplies)
        })

      state.initialState = {
        ...state.initialState,
        comments: [...newCommentsArray],
      }
      localStorage.setItem('data', JSON.stringify(state.initialState))
    },
  },
})
const store = configureStore({
  reducer: { comments: commentsSlice.reducer },
})

export const {
  fetchedData,
  addComment,
  addReply,
  commentScore,
  editComment,
  deleteComment,
} = commentsSlice.actions
export default store
