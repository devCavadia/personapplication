import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Powered from '../components/Powered'
import axios from 'axios'
import { faArrowLeft, faCircleInfo, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const Address = () => {

  const [addressList, setAddressList] = useState([]);
  const [buttonEdit, setButtonEdit] = useState("Editar dirección");
  const [buttonDelete, setButtonDelete] = useState("Eliminar dirección");
  const [showTable, setShowTable] = useState(true);
  const [streetDisabled, setStreetDisabled] = useState(true);
  const [cityDisabled, setCityDisabled] = useState(true);
  const [stateDisabled, setStateDisabled] = useState(true);
  const [countryDisabled, setCountryDisabled] = useState(true);
  const [postalCodeDisabled, setPostalCodeDisabled] = useState(true);
  const [displayFields, setDisplayFields] = useState('none'); 
  const [search, setSearch] = useState('');  
  const [filterAddress, setFilterAddress] = useState(addressList);  
  const [validateForm, setValidateForm] = useState('none');
  const [border, setBorder] = useState('');

  //States
  const [idAddress, setIdAddress] = useState(0);
  const [streetRec, setStreetRec] = useState('');
  const [cityRec, setCityRec] = useState('');
  const [stateRec, setStateRec] = useState('');
  const [postalCodeRec, setPostalCodeRec] = useState(0);
  const [personRec, setPersonRec] = useState('');
  const [countryRec, setCountryRec] = useState('');
  const [idPerson, setIdPerson] = useState(0);

  const recoverAddress = (address) =>{
    setStreetRec('');
    setCityRec('');
    setStateRec('');
    setPostalCodeRec(0);
    setPersonRec('');
    setCountryRec('');
    setIdAddress(address.idAddress);
    setStreetRec(address.street);
    setCityRec(address.city);
    setStateRec(address.state);
    setPostalCodeRec(address.postalCode);
    setPersonRec(address.person.name);
    setCountryRec(address.country);
    setIdPerson(address.person.idPerson)
    changeShowTable();
  }

  const getAddress = () =>{
    axios.get("http://129.153.211.34:8080/api/address/all")
    .then((res) => {
      setAddressList(res.data);
      console.log(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  const validate = () => {  
    if (streetRec == "" || cityRec=="" || stateRec=="" || countryRec=="" || postalCodeRec==0){
      setValidateForm('block');
      setBorder('1px solid rgb(219, 45, 45)');
      return false;
      }
    return true;
  }

  const updateAddress = () => {
    if (validate()){
      const confirmation = window.confirm("¿Está seguro de querer guardar los cambios?");
      if (confirmation){
        axios.put("http://129.153.211.34:8080/api/address/upd",
          {
            idAddress: idAddress,
            street: streetRec,
            city: cityRec,
            state: stateRec,
            postalCode: postalCodeRec,
            country: countryRec,
            person: {
              idPerson: idPerson
            }         
          }).then((res)=>{
            getAddress();
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
      setStreetDisabled(true);
      setCityDisabled(true);
      setStateDisabled(true);
      setCountryDisabled(true);
      setPostalCodeDisabled(true);
      setValidateForm('none');
    }
  }

  const deleteAddress = (id) => {
    const confirmation = window.confirm("¿Desea eliminar esta dirección?");
    if (confirmation){
      axios.delete("http://129.153.211.34:8080/api/person/del/"+id)
      .then((res) => {
        getAddress();
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
    getAddress();
  }, []);

  const changeShowTable = () =>{
    showTable ? setShowTable(false) : setShowTable(true);
    }

  const enableDisableFields = () =>{
    if (buttonEdit =="Editar dirección"){
      setDisplayFields('block');
      setButtonEdit("Guardar cambios");
      setButtonDelete("Cancelar");
      setStreetDisabled(false);
      setCityDisabled(false);
      setStateDisabled(false);
      setCountryDisabled(false);
      setPostalCodeDisabled(false);
    } 
  }

  const back = () => {
    setDisplayFields('none');
    setButtonEdit("Editar dirección");
    setButtonDelete("Eliminar dirección");
    setStreetDisabled(true);
    setCityDisabled(true);
    setStateDisabled(true);
    setCountryDisabled(true);
    setPostalCodeDisabled(true);
    setValidateForm('none');
    setBorder('');
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

  const handlerSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(()=>{
    setFilterAddress(
      addressList.filter((elem)=>{
        return JSON.stringify(elem).toLowerCase().includes(search.toLowerCase());
      }));
    }, [search, addressList]);
  
  const thColor = {
    backgroundColor: "rgb(18, 18, 110)", 
    color: '#fff'
  }

  return (
    <div className='d-flex'>
      <Sidebar />
      <div style={ showTable ? { display: 'none' } : {width:'80%', padding: "0 1%", display: 'block'} }>
        <h2 style={{ paddingTop: 30, paddingBottom: 10 }}>Información de la dirección:</h2>
        <form onSubmit={ (e)=> handlerSubmit(e) } className="row g-2">
          <span style={{marginBottom: '1%', display: `${displayFields}`}}>
            Los campos marcados con <span style={{color: 'rgb(219, 45, 45)'}}>*</span> son obligatorios.
          </span>
          <div className="col-4">
            <label htmlFor="street" className="form-label">Calle<span style={{color: 'rgb(219, 45, 45)'}}>*</span></label>
            <input type="text" className="form-control" id="street" disabled={streetDisabled} style={{ border: `${border}`}}
              value={streetRec} onChange={(e) => { setStreetRec(e.target.value); setValidateForm('none'); setBorder(''); }} />
          </div>
          <div className="col-4">
            <label htmlFor="city" className="form-label">Ciudad<span style={{color: 'rgb(219, 45, 45)'}}>*</span></label>
            <input type="text" className="form-control" id="city" disabled={cityDisabled} style={{ border: `${border}`}}
              value={cityRec} onChange={(e) => { setCityRec(e.target.value); setValidateForm('none'); setBorder(''); }}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="state" className="form-label">Estado/departamento<span style={{color: 'rgb(219, 45, 45)'}}>*</span></label>
            <input type="text" className="form-control" id="state" disabled={stateDisabled} style={{ border: `${border}`}}
              value={stateRec} onChange={(e) => { setStateRec(e.target.value); setValidateForm('none'); setBorder(''); }}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="postalCode" className="form-label">Código postal<span style={{color: 'rgb(219, 45, 45)'}}>*</span></label>
            <input type="number" className="form-control" id="postalCode" disabled={postalCodeDisabled} style={{ border: `${border}`}}
              value={postalCodeRec} onChange={(e) => { setPostalCodeRec(e.target.value); setValidateForm('none'); setBorder(''); }}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="country" className="form-label">País<span style={{color: 'rgb(219, 45, 45)'}}>*</span></label>
            <input type="text" className="form-control" id="country" disabled={countryDisabled} style={{ border: `${border}`}}
              value={countryRec} onChange={(e) => { setCountryRec(e.target.value); setValidateForm('none'); setBorder(''); }}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="person" className="form-label">Persona</label>
            <input type="text" className="form-control" id="person" disabled={true} value={personRec}/>
          </div>
          <div style={{color: 'rgb(219, 45, 45)', display:`${validateForm}`}} >Debe completar los campos obligatorios (*).</div>
          <div className="col-7" style={{ marginTop: '4%' }}>
            <button type="button" className="btn btn-info" onClick={()=>{back()}}>
              <span className='tt' data-bs-placement='bottom' title='Regresar'>
                <FontAwesomeIcon icon={faArrowLeft} />
              </span>
            </button>
            <button type="button" 
              className="btn btn-primary" style={{ marginLeft: '4%' }} 
              onClick={() => {(buttonEdit=="Guardar cambios") ? updateAddress() : enableDisableFields()}}>{buttonEdit}</button>
            <button type="button" 
              className="btn btn-primary" 
              style={{marginLeft: '4%', backgroundColor: 'rgb(219, 45, 45)', border: 'none'}} 
              onClick={()=>{(buttonDelete=="Eliminar dirección") ? deleteAddress(idAddress) : cancel()}}>{buttonDelete}</button>
          </div>
        </form>
      </div>
      <div style={ showTable ? {height: 630, width:'80%', textAlign: 'center', padding: "0 1%", display: 'block', overflowY: 'scroll'} : {display: 'none'} }>
        <h2 style={{paddingTop: 50, paddingBottom: 20}}>Listado de Direcciones</h2>
        <div style={{marginBottom: '1%',display: 'flex', justifyContent: 'left'}}>
          <Link to='/new-address'>
            <button type="button" className="btn btn-primary">Agregar nueva dirección</button>
          </Link>
          <input style={{width: '50%', marginLeft:"10%", borderRadius: '5px', border: '1px solid gray'}} 
              type="text" placeholder='Buscar dirección por N°, ciudad, país, etc.' 
              value={search}
              onChange={(e) => {setSearch(e.target.value)}}/>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" style={thColor}>N°</th>
              <th scope="col" style={thColor}>Calle</th>
              <th scope="col" style={thColor}>Ciudad, estado, país</th>
              <th scope="col" style={thColor}>Código postal</th>
              <th scope="col" style={thColor}>Persona</th>
              <th scope="col" style={thColor}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              filterAddress.map((row, key) => {
                return (
                  <tr key={row.idAddress}>
                    <th scope='row'>{row.idAddress}</th>
                    <th>{row.street}</th>
                    <th>{row.city + ", " + row.state + ", " + row.country}</th>
                    <th>{row.postalCode}</th>
                    <th>{row.person.name}</th>
                    <th>
                      <div className="btn-group">
                        <span className='tt' data-bs-placement='bottom' title='Consultar información completa'>
                          <button type='button'
                            onClick={() => recoverAddress(row)}
                            style={{backgroundColor: 'green', height: 40, width: 45, border: 'none', borderRadius: '15%', color: '#fff', fontSize: '130%', margin: '0 10px'}}>
                            <FontAwesomeIcon  icon={faCircleInfo}/>              
                          </button>
                        </span>
                        <span className='tt' data-bs-placement='bottom' title='Eliminar registro'>
                          <button type='button' 
                            onClick={()=>deleteAddress(row.idAddress)}
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

export default Address;