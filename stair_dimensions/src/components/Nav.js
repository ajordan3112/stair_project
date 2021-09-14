import React from 'react'

const Nav = () => {
  return (
    <div>
      <ul class='nav container' style={navStyle}>
        <li class='nav-item'>
          <a class='nav-link' href='/'>
            Home
          </a>
        </li>
        <li class='nav-item'>
          <a class='nav-link' href='/'>
            Contact
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Nav

const navStyle = {
  fontSize: '25px',
  color: '#6b9fcf',
}
