import React from 'react'
import LogoImage from './LogoImage';
import '../styles/styles.css'
import { faUser, faSchool, faChalkboardTeacher, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="sidebar d-flex flex-column align-items-center">
      <Link to='/' className='d-flex flex-column align-items-center' style={{textDecoration: 'none', color: 'black'}}>
        <LogoImage />    
      </Link>
      <ul style={{padding: '15% 0 0 0'}}>
        <Route route='/people' icono={ faUser } name='Personas' /> 
        <Route route='/students' icono={ faSchool } name='Estudiantes' />
        <Route route='/professors' icono={ faChalkboardTeacher } name='Profesores' />
        <Route route='/address' icono={ faLocationDot } name='Direcciones' />
      </ul>
    </nav>
  )
}

const Route = ({icono, route, name}) => {
  return (
    <li>
      <Link to={route}>
        <button className="btn btn-primary my-2 btn-lg" style={{width : 250, fontWeight: 'bold'}}>
          <FontAwesomeIcon icon={ icono } style={{paddingRight: 10}} />
          {name}
        </button>
      </Link>
    </li>
  )
}

export default Sidebar;