import React from 'react'
import Sidebar from '../components/Sidebar'
import Powered from '../components/Powered'

const Index = () => {
  return (
    <div className='d-flex'>
      <Sidebar />
      <div className='d-flex flex-column align-items-center' style={{paddingTop:40, display: 'block', width: '80%', textAlign: 'center'}}>
        <span style={{fontSize: 40, fontWeight: 'bold'}}>
          ¡Bienvenido a la App de Personas!
        </span>
        <span style={{fontSize: 30, paddingTop: 60}}>
          Puede consultar entre Personas, Estudiantes, Profesores o Direcciones
        </span>
      </div>
      <Powered />
    </div>
  )
}

export default Index
