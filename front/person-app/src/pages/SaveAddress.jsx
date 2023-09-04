import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Powered from '../components/Powered'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

const SaveAddress = () => {

  //States
  const [addressList, setAddressList] = useState([]);
  const [filterAddress, setFilterAddress] = useState(addressList);
  const [streetRec, setStreetRec] = useState('');
  const [cityRec, setCityRec] = useState('');
  const [stateRec, setStateRec] = useState('');
  const [postalCodeRec, setPostalCodeRec] = useState(0);
  const [idPersonRec, setIdPersonRec] = useState(0);
  const [countryRec, setCountryRec] = useState('');
  const [validateForm, setValidateForm] = useState('none');
  const [border, setBorder] = useState('');

  const handlerSubmit = (e) => {
    e.preventDefault();
  }

  const validate = () => {  
    if (streetRec == "" || cityRec=="" || stateRec=="" || countryRec=="" || postalCodeRec==0 || idPersonRec==0){
      setValidateForm('block');
      setBorder('1px solid rgb(219, 45, 45)');
      return false;
      }
    return true;
  }

  const addAddress = () =>{
    if (validate()){
      const confirmation = window.confirm("¿Seguro que quiere agregar esta dirección?");
      if (confirmation){
        axios.post("http://129.153.211.34:8080/api/address/add",
          {
            street: streetRec,
            city: cityRec,
            state: stateRec,
            postalCode: postalCodeRec,
            country: countryRec,
            person: {
              idPerson: idPersonRec
            }
          }).then((res)=>{
            redirect();
            console.log(res);
          }).catch((error)=>{
            console.log(error);
          });
      }
    }
  }

  const redirect = () =>{
    window.history.back();
  }

  const getPeople = () =>{
    axios.get("http://129.153.211.34:8080/api/person/all")
    .then((res) => {
      setAddressList(res.data);
      console.log(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getPeople();
  }, []);

  useEffect(()=>{
    setFilterAddress(
      addressList.filter(person => person.address==null));
    }, [addressList]);
  
  const back = () =>{
    setStreetRec('');
    setCityRec('');
    setStateRec('');
    setPostalCodeRec(0);
    setIdPersonRec(0);
    setCountryRec('');
    setValidateForm('none');
    setBorder('');
    redirect();
  }

  const cancel = () =>{
    const confirmation = window.confirm("¿Seguro que desea cancelar el proceso?");
    if (confirmation){
      alert("Proceso cancelado");
      back();
    }
  }

  return (
    <div className='d-flex'>
      <Sidebar />
      <div style={ {width:'80%', padding: "0 1%", display: 'block'} }>
        <h2 style={{ paddingTop: 30, paddingBottom: 10 }}>Información de la dirección:</h2>
        <form onSubmit={ (e)=> handlerSubmit(e) } className="row g-2">
          <span style={{marginBottom: '1%'}}>
            Los campos marcados con <span style={{color: 'rgb(219, 45, 45)'}}>*</span> son obligatorios.
          </span>
          <div className="col-4">
            <label htmlFor="street" className="form-label">Calle<span style={{color: 'rgb(219, 45, 45)'}}>*</span></label>
            <input type="text" className="form-control" id="street" style={{ border: `${border}`}}
              value={streetRec} onChange={(e) => { setStreetRec(e.target.value); setValidateForm('none'); setBorder(''); }} />
          </div>
          <div className="col-4">
            <label htmlFor="city" className="form-label">Ciudad<span style={{color: 'rgb(219, 45, 45)'}}>*</span></label>
            <input type="text" className="form-control" id="city" style={{ border: `${border}`}}
              value={cityRec} onChange={(e) => { setCityRec(e.target.value); setValidateForm('none'); setBorder(''); }}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="state" className="form-label">Estado/departamento<span style={{color: 'rgb(219, 45, 45)'}}>*</span></label>
            <input type="text" className="form-control" id="state" style={{ border: `${border}`}}
              value={stateRec} onChange={(e) => { setStateRec(e.target.value); setValidateForm('none'); setBorder(''); }}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="postalCode" className="form-label">Código postal<span style={{color: 'rgb(219, 45, 45)'}}>*</span></label>
            <input type="number" className="form-control" id="postalCode" style={{ border: `${border}`}}
              value={postalCodeRec} onChange={(e) => { setPostalCodeRec(e.target.value); setValidateForm('none'); setBorder(''); }}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="country" className="form-label">País<span style={{color: 'rgb(219, 45, 45)'}}>*</span></label>
            <input type="text" className="form-control" id="country" style={{ border: `${border}`}}
              value={countryRec} onChange={(e) => { setCountryRec(e.target.value); setValidateForm('none'); setBorder(''); }}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="person" className="form-label">Asignar a la persona<span style={{color: 'rgb(219, 45, 45)'}}>*</span></label>
            <select className="form-select" id="person" value={idPersonRec} 
              style={{ border: `${border}`}} onChange={(e) => {setIdPersonRec(e.target.value); setValidateForm('none'); setBorder('');}} > 
              <option value={0}>Seleccione la persona</option>
              {
                filterAddress.map((row)=>{
                  return(
                    <option key={row.idPerson} value={row.idPerson}>{row.name}</option>  
                  );                
                })
              }
            </select>
          </div>
          <div style={{color: 'rgb(219, 45, 45)', display:`${validateForm}`}} >Debe completar los campos obligatorios (*).</div>
          <div className="col-7" style={{ marginTop: '4%' }}>
            <button type="button" className="btn btn-info" onClick={back}>
              <span className='tt' data-bs-placement='bottom' title='Regresar'>
                <FontAwesomeIcon icon={faArrowLeft} />
              </span>
            </button>
            <button type="button" 
              className="btn btn-primary" style={{ marginLeft: '4%' }} onClick={addAddress}>Guardar dirección</button>
            <button type="button" 
              className="btn btn-primary" onClick={cancel}
              style={{marginLeft: '4%', backgroundColor: 'rgb(219, 45, 45)', border: 'none'}}>Cancelar</button>
          </div>
        </form>
      </div>
      <Powered />
    </div>
  );
}

export default SaveAddress;