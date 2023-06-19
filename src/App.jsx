import { useState } from 'react'
import Comment from './components/Comment'
import data from './data.json'
import './App.css'

function App() {
  const currentUser = useState(data.currentUser)
  const [comments, setComments] = useState(data.comments)
  return (
    <>
      <Comment />
      <div class="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="#">Your Name Here</a>.
      </div>
    </>
  )
}

export default App
