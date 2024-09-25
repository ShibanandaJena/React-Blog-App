import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import Container from './Container'
import Logo from './Logo'


function Header() {

  const authStatus = useSelector((state)=>state.auth.status)

  const navigate = useNavigate()

  const navItems = [
    {
      name:'Home',
      slug:"/",
      active:true
    }
    ,
    {
      name: 'Sign Up',
      slug: '/signup',
      active: !authStatus  // Only active if not logged in
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus  // Only active if not logged in
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus  // Only active if logged in
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus // Always active
    }
  ]
  return (
    <header className="py-3 shadow bg-slate-400 animate-fadeIn">
  <Container>
    <nav>
      <div className="flex justify-between items-center">
        <div className="mr-4">
          <Link to="/">
            <Logo width="70px" />
          </Link>
        </div>

        <ul className="flex space-x-4">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  className="text-sm font-medium hover:underline hover:scale-105 transition-transform duration-300"
                  onClick={() => navigate(item.slug)}
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
        </ul>

        {authStatus && (
          <ul className="ml-4">
            <li>
              <LogoutBtn />
            </li>
          </ul>
        )}
      </div>
    </nav>
  </Container>
</header>

  )
}

export default Header