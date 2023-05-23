import 'bootstrap/dist/css/bootstrap.min.css'
import MainComment from './components/mainComment/MainComment'
import './App.css'
import { useEffect, useState } from 'react'
function App() {
  let [data, setData] = useState(null)
  const fetchData = async () => {
    fetch('./data.json')
      .then((res) => {
        console.log(res)
        if (!res.ok) {
          throw new Error("couldn't fetch")
        }
        return res.json()
      })
      .then((result) => {
        setData(result)
        console.log(result)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <main>
      <div className="container">
        <div className="commentsParentContainer">
          {data !== null && data.comments.length > 0 ? (
            data.comments.map((comment) => <MainComment />)
          ) : (
            <div>no comments</div>
          )}
        </div>
      </div>
    </main>
  )
}

export default App
