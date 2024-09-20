import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch,useSelector} from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from './redux/authSlice'
import {Outlet} from 'react-router-dom'
import {Header,Footer} from './components/index'

function App() {
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(()=>{
      authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login({userData}))
        }
        else{
          dispatch(logout())
        }
      })
      .finally(()=> setLoading(false))
  },[])

  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-slate-400'>
      <div className='w-full border-l-amber-800'>
        <Header></Header>
        <Footer></Footer>
      </div>
    </div>
  ) : (null)
}

export default App
