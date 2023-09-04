import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import Powered from '../components/Powered'
import axios from 'axios'
import { faArrowLeft, faCircleInfo, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const Professor = () => {

  const [peopleList, setPeopleList] = useState([]);
  const [buttonEdit, setButtonEdit] = useState("Editar información");
  const [buttonDelete, setButtonDelete] = useState("Eliminar registro");
  const [showTable, setShowTable] = useState(true);
  const [typeRecord, setTypeRecord] = useState('SOLO PERSONA');
  const [nameFieldDisabled, setNameFieldDisabled] = useState(true);
  const [emailFieldDisabled, setEmailFieldDisabled] = useState(true);
  const [salaryFieldDisabled, setSalaryFieldDisabled] = useState(true);
  const [editAddressDisplay, setEditAddressDisplay] = useState('none'); 
  const [search, setSearch] = useState('');  
  const [filterPeople, setFilterPeople] = useState(peopleList);  
  const [validateForm, setValidateForm] = useState('none');
  const [border, setBorder] = useState('');
  const [profBorder, setProfBorder] = useState(false);
  const [message, setMessage] = useState('none');
  const [validEmail, setValidEmail] = useState('none');


  //useStates for objects recovered from database
  const [idPerson, setIdPerson] = useState(0);
  const [name, setName] = useState(''); 
  const [emailAddress, setEmailAddress] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState(0);
  const [country, setCountry] = useState('');
  const [salary, setSalary] =useState(0);
  const [displayFields, setDisplayFields] = useState('none'); 

  const additInfoRef = useRef(null);
  const salaryFieldRef = useRef(null);
  const nameRef = useRef(null);
  const emailAddressRef = useRef(null);

  const recoverPerson = (person) =>{
    setSalary(0);
    setTypeRecord('PROFESOR');
    setIdPerson(person.idPerson);
    setName(person.name);
    setEmailAddress(person.emailAddress);
    setPostalCode(person.address.postalCode);
    setCountry(person.address.country);
    setSalary(person.salary);
    changeShowTable();
    if (person.address != null){
      setStreet(person.address.street);
      setCity(person.address.city);
      setState(person.address.state);
    }
  }

  const getPeople = () =>{
    axios.get("http://129.153.211.34:8080/api/professor/all")
    .then((res) => {
      setPeopleList(res.data);
      console.log(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validate = () => {  
    if (name=="" || emailAddress=="" || salary==0){
      setValidateForm('block');
      setBorder('1px solid rgb(219, 45, 45)');
      setProfBorder(true);
      return false;
    }
    if (peopleList.find(person => person.name==name.trim())!=null && peopleList.find(person => person.emailAddress==emailAddress.trim())!=null && peopleList.find(person => person.salary==salary)!=null ){
      setMessage('block');
      return false;
    }
    if (!validateEmail(emailAddress.trim())){
      setValidEmail('block');
      return false;
    }
    return true;
  }

  const updatePerson = () => {
    if (validate()){
      const confirmation = window.confirm("¿Está seguro de querer guardar los cambios?");
      if (confirmation){
        axios.put("http://129.153.211.34:8080/api/professor/upd",
          {
            idPerson: idPerson,
            name: name,
            emailAddress: emailAddress,
            salary: salary
          }).then((res)=>{
            getPeople();
            console.log(res);
          }).catch((error)=>{
            console.log(error);
          });
      }
      if (showTable==false){
        changeShowTable();
      }
      alert("Cambios guardados");
      setButtonEdit("Editar información");
      setButtonDelete("Eliminar registro");
      setNameFieldDisabled(true);
      setEmailFieldDisabled(true);
      setSalaryFieldDisabled(true);
      setEditAddressDisplay('none');
    }
  }

  const deletePerson = (id) => {
    const confirmation = window.confirm("¿Desea eliminar este registro?");
    if (confirmation){
      axios.delete("http://129.153.211.34:8080/api/person/del/"+id)
      .then((res) => {
        getPeople();
        if (showTable==false){
          changeShowTable();
        }
        alert('Registro eliminado')
        console.log(res.data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  useEffect(() => {
    getPeople();
  }, []);

  const emptyAddress = (person) =>{
    if (person.address!=null){
      return(
        <th>{person.address.city + ", " + person.address.state + ", " + person.address.country}</th>
      );
    }else{
      return(
      <th>
        <Link to='/new-address'>
          Agregar dirección
        </Link>
      </th>);
    }
  } 

  const changeShowTable = () =>{
    showTable ? setShowTable(false) : setShowTable(true);
    }

  const enableDisableFields = () =>{
    if (buttonEdit =="Editar información"){
      setDisplayFields('block');
      setButtonEdit("Guardar cambios");
      setButtonDelete("Cancelar");
      setNameFieldDisabled(false);
      setEmailFieldDisabled(false);
      setSalaryFieldDisabled(false);
      setEditAddressDisplay('block'); 
    } 
  }

  const back = () => {
    setDisplayFields('none');
    setButtonEdit("Editar información");
    setButtonDelete("Eliminar registro");
    setNameFieldDisabled(true);
    setEmailFieldDisabled(true);
    setSalaryFieldDisabled(true);
    setEditAddressDisplay('none');
    setMessage('none');
    setValidEmail('none')
    changeShowTable(); 
  }

  const cancel = () => {
    if (buttonDelete == "Cancelar"){
      const confirmation = window.confirm('¿Seguro que desea cancelar el proceso?')
      if (confirmation){
        back(); 
      }
    }
  }

  const showHideFiels = () =>{
    additInfoRef.current.style.display = 'block';
    salaryFieldRef.current.style.display = 'block';
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(()=>{
    setFilterPeople(
      peopleList.filter((elem)=>{
        return JSON.stringify(elem).toLowerCase().includes(search.toLowerCase());
      }));
    }, [search, peopleList]);
  
  useEffect(() => {
    showHideFiels();
  }, [recoverPerson]);

  const thColor = {
    backgroundColor: "rgb(18, 18, 110)", 
    color: '#fff'
  }

  return (
    <div className='d-flex'>
      <Sidebar />
      <div style={ showTable ? { display: 'none' } : {width:'80%', padding: "0 1%", display: 'block'} }>
        <h2 style={{paddingTop: 30, paddingBottom: 10}}>Información del profesor:</h2>
        <form onSubmit={ (e)=> handlerSubmit(e) } className="row g-2">
          <span style={{marginBottom: '1%', display: `${displayFields}`}}>
            Los campos marcados con <span style={{color: 'rgb(219, 45, 45)'}}>*</span> son obligatorios.
          </span>
          <div className="col-md-2">
            <label htmlFor="typeRecord" className="form-label">Tipo registro<span style={{color: 'rgb(219, 45, 45)'}}>*</span></label>
            <input type="text" className="form-control" id="typeRecord" value={typeRecord} disabled={true}/>
          </div>
          <div className="col-md-5">
            <label htmlFor="name" className="form-label">Nombre completo<span style={{color: 'rgb(219, 45, 45)'}}>*</span></label>
            <input type="text" className="form-control" id="name" value={name} disabled={nameFieldDisabled} style={{border: `${border}`}}
              onChange={(e)=>{setName(e.target.value); setBorder(''); setValidateForm('none'); setMessage('none');}} ref={nameRef}/>
          </div>
          <div className="col-md-5">
            <label htmlFor="emailAddress" className="form-label">Email<span style={{color: 'rgb(219, 45, 45)'}}>*</span></label>
            <input type="email" className="form-control" id="emailAddress" value={emailAddress} disabled={emailFieldDisabled} style={{border: `${border}`}}
              onChange={(e)=>{setEmailAddress(e.target.value); setBorder(''); setValidateForm('none'); setMessage('none'); setValidEmail('none');}} ref={emailAddressRef}/>
          </div>
          <label><strong>Dirección:</strong></label>
          <label style={{display: editAddressDisplay}}>
            Para editar la dirección diríjase al apartado de <Link to='/address'><strong>Direcciones</strong></Link>
          </label>
          <div className="col-4">
            <label htmlFor="street" className="form-label">Calle</label>
            <input type="text" className="form-control" id="street" value={street} disabled={true} />
          </div>
          <div className="col-4">
            <label htmlFor="city" className="form-label">Ciudad</label>
            <input type="text" className="form-control" id="city" value={city} disabled={true}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="state" className="form-label">Estado/departamento</label>
            <input type="text" className="form-control" id="state" value={state} disabled={true}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="postalCode" className="form-label">Código postal</label>
            <input type="number" className="form-control" id="postalCode" value={postalCode} disabled={true}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="country" className="form-label">País</label>
            <input type="text" className="form-control" id="country" value={country} disabled={true}/>
          </div>
          <label ref={additInfoRef}><strong>Información adicional:</strong></label>
          <div className="col-md-4" ref={salaryFieldRef}>
            <label htmlFor="salary" className="form-label">Salario<span style={{color: 'rgb(219, 45, 45)'}}>*</span></label>
            <input type="number" className="form-control" id="salary" value={salary} disabled={salaryFieldDisabled} style={ profBorder ? {border: `${border}`} : {border: ''} }
              onChange={(e)=>{setSalary(e.target.value); setBorder(''); setProfBorder(false); setValidateForm('none'); setMessage('none');}}/>
          </div>
          <div style={{color: 'rgb(219, 45, 45)', display:`${validateForm}`}} >Debe completar los campos obligatorios (*).</div>
          <div style={{color: 'rgb(219, 45, 45)', display:`${message}`}} >Ya existe una persona con el nombre y/o correo asociados.</div>
          <div style={{color: 'rgb(219, 45, 45)', display:`${validEmail}`}} >Por favor ingrese un email válido.</div>
          <div className="col-11" style={{marginTop: '2%'}}>
            <button type="button" className="btn btn-info" onClick={()=>{back(); setSearch(''); setMessage('none');}}>
              <span className='tt' data-bs-placement='bottom' title='Regresar'>
                <FontAwesomeIcon icon={faArrowLeft}/>
              </span>
            </button>
            <button type="button" 
              className="btn btn-primary" 
              style={{marginLeft: '4%'}} onClick={() => {(buttonEdit=="Guardar cambios") ? updatePerson() : enableDisableFields()}}>{buttonEdit}</button>
            <button type="button" 
              onClick={()=>{ (buttonDelete == "Eliminar registro") ? deletePerson(idPerson) : cancel()}}
              className="btn btn-primary" 
              style={{marginLeft: '4%', backgroundColor: 'rgb(219, 45, 45)', border: 'none'}}>{buttonDelete}</button>
          </div>
        </form>
      </div>
      <div style={ showTable ? {height: 630, width:'80%', textAlign: 'center', padding: "0 1%", display: 'block', overflowY: 'scroll'} : {display: 'none'} }>
        <h2 style={{paddingTop: 50, paddingBottom: 20}}>Listado de Profesores</h2>
        <div style={{marginBottom: '1%',display: 'flex', justifyContent: 'left'}}>
          <Link to='/new'>
            <button type="button" className="btn btn-primary">Agregar nuevo registro</button>
          </Link>
          <input style={{width: '50%', marginLeft:"10%", borderRadius: '5px', border: '1px solid gray'}} 
              type="text" placeholder='Buscar profesor por N°, nombre, email, etc.' 
              value={search}
              onChange={(e) => {setSearch(e.target.value)}}/>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" style={thColor}>N°</th>
              <th scope="col" style={thColor}>Nombre</th>
              <th scope="col" style={thColor}>Email</th>
              <th scope="col" style={thColor}>Ciudad, estado, país</th>
              <th scope="col" style={thColor}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              filterPeople.map((row, key) => {
                return (
                  <tr key={row.idPerson}>
                    <th scope='row'>{row.idPerson}</th>
                    <th>{row.name}</th>
                    <th>{row.emailAddress}</th>
                    {emptyAddress(row)}
                    <th>
                      <div className="btn-group">
                        <span className='tt' data-bs-placement='bottom' title='Consultar información completa'>
                          <button type='button'
                            onClick={() => recoverPerson(row)}
                            style={{backgroundColor: 'green', height: 40, width: 45, border: 'none', borderRadius: '15%', color: '#fff', fontSize: '130%', margin: '0 10px'}}>
                            <FontAwesomeIcon  icon={faCircleInfo}/>              
                          </button>
                        </span>
                        <span className='tt' data-bs-placement='bottom' title='Eliminar registro'>
                          <button type='button' 
                            onClick={()=>deletePerson(row.idPerson)}
                            style={{backgroundColor: 'rgb(219, 45, 45)', height: 40, width: 45, border: 'none', borderRadius: '15%', color: '#fff', fontSize: '130%', margin: '0 10px'}}>
                            <FontAwesomeIcon  icon={faTrash}/>              
                          </button>
                        </span>
                      </div>
                    </th>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <Powered />      
    </div>
  )
}

export default Professor;