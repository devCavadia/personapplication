import React from 'react'
import logo from '../assets/personIcon.png'

const LogoImage = () => {
  return (
    <div className='d-flex flex-column align-items-center' style={{paddingTop: '15%'}}>
      <img className='img-fluid' src={logo} alt="Logo of Person App" style={{maxWidth: '60%'}} />
      <span style={{fontSize: '200%', fontWeight: 'bold'}}>
        App Personas
      </span>
    </div>
  )
}

export default LogoImage;
