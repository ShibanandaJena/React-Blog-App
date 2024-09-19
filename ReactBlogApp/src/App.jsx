import { useState } from 'react'
import './App.css'


function App() {
  console.log(process.env.REACT_APP_APPWRITE_URL)
  const [count, setCount] = useState(0)

  return (
    <> 
      <div>
        <h1>This is a blog app</h1>
      </div>
    </>
  )
}

export default App
