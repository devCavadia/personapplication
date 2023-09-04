import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Powered from '../components/Powered'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

const SaveRecord = () => {

  //States
  const [nameRec, setNameRec] = useState(''); 
  const [emailAddressRec, setEmailAddressRec] = useState('');
  const [salaryRec, setSalaryRec] =useState(0);
  const [studentNumberRec, setStudentNumberRec] =useState(0);
  const [averageMarkRec, setAverageMarkRec] =useState(0);
  const [disableSalary, setDisableSalary] = useState(false);
  const [disableStudentNumber, setDisableStudentNumber] = useState(false);
  const [disableAverageMark, setDisableAverageMark] = useState(false);
  const [salaryObl, setSalaryObl] = useState('none');
  const [validateForm, setValidateForm] = useState('none');
  const [studentNumberObl, setStudentNumberObl] = useState('none');
  const [averageMarkObl, setAverageMarkObl] = useState('none');
  const [border, setBorder] = useState('');
  const [profBorder, setProfBorder] = useState(false);
  const [studBorder, setStudBorder] = useState(false);
  const [peopleList, setPeopleList] = useState([]);
  const [message, setMessage] = useState('none');
  const [validEmail, setValidEmail] = useState('none');
  
  //References for inputs
  const typeRecordRef = useRef();
  const nameRef = useRef();
  const emailAddressRef = useRef();
  const salaryRef = useRef(null);
  const studentNumberRef = useRef(null);
  const averageMarkRef = useRef(null);

  const disableFields = () => {
    if (typeRecordRef.current.value == "person"){
      setDisableSalary(true);
      setDisableStudentNumber(true);
      setDisableAverageMark(true);
      setSalaryObl('none');
      setStudentNumberObl('none');
      setAverageMarkObl('none');
    } else if (typeRecordRef.current.value == "professor"){
      setDisableSalary(false);
      setDisableStudentNumber(true);
      setDisableAverageMark(true);
      setSalaryObl('block');
      setStudentNumberObl('none');
      setAverageMarkObl('none');
    } else if (typeRecordRef.current.value == "student"){
      setDisableSalary(true);
      setDisableStudentNumber(false);
      setDisableAverageMark(false);
      setSalaryObl('none');
      setStudentNumberObl('block');
      setAverageMarkObl('block');
    }
  }

  useEffect(() => {
    setDisableSalary(true);
    setDisableStudentNumber(true);
    setDisableAverageMark(true);
    setSalaryObl('none');
    setStudentNumberObl('none');
    setAverageMarkObl('none');
  }, []);

  const handlerSubmit = (e) => {
    e.preventDefault();
  }

  const redirect = () => {
    window.history.back();
  }

  const cancel = () => {
    const confirmation = window.confirm("¿Desea cancelar el registro?");
    if (confirmation){
      redirect();
    } 
  }

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validate = () => {  
    if (typeRecordRef.current.value == "person"){
      if (nameRec=="" || emailAddressRec==""){
        setValidateForm('block');
        setBorder('1px solid rgb(219, 45, 45)');
        return false;
      }
    }
    if (typeRecordRef.current.value == "professor"){
      if (nameRec=="" || emailAddressRec=="" || salaryRec==0){
        setValidateForm('block');
        setBorder('1px solid rgb(219, 45, 45)');
        setProfBorder(true);
        return false;
      }
    }
    if (typeRecordRef.current.value == "student"){
      if (nameRec=="" || emailAddressRec=="" || studentNumberRec==0 || averageMarkRec==0){
        setValidateForm('block');
        setBorder('1px solid rgb(219, 45, 45)');
        setStudBorder(true);
        return false;
      }
    }
    if (peopleList.find(person => person.name==nameRec.trim())!=null || peopleList.find(person => person.emailAddress==emailAddressRec.trim())!=null){
      setMessage('block');
      return false;
    }
    if (!validateEmail(emailAddressRec.trim())){
      setValidEmail('block');
      return false;
    }
    return true;
  }
  
  const getPeople = () =>{
    axios.get("http://129.153.211.34:8080/api/person/all")
    .then((res) => {
      setPeopleList(res.data);
      console.log(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  //To save a record

  function addRecord() {
    if (validate()) {
      const confirmation = window.confirm("¿Está seguro de querer guardar este registro?")
      if (confirmation) {
        if (typeRecordRef.current.value == "person") {
          axios.post("http://129.153.211.34:8080/api/person/add",
            {
              name: nameRec,
              emailAddress: emailAddressRec
            }).then((res) => {
              redirect()
              console.log(res)
            }).catch((error) => {
              console.log(error)
            })
        } else if (typeRecordRef.current.value == "professor") {
          axios.post("http://129.153.211.34:8080/api/professor/add",
            {
              name: nameRec,
              emailAddress: emailAddressRec,
              salary: salaryRec
            }).then((res) => {
              redirect()
              console.log(res)
            }).catch((error) => {
              console.log(error)
            })
        } else if (typeRecordRef.current.value == "student") {
          axios.post("http://129.153.211.34:8080/api/student/add",
            {
              name: nameRec,
              emailAddress: emailAddressRec,
              studentNumber: studentNumberRec,
              averageMark: averageMarkRec
            }).then((res) => {
              redirect()
              console.log(res)
            }).catch((error) => {
              console.log(error)
            })
        }
      }
    }
  }

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div className='d-flex'>
      <Sidebar />
      <div style={{ width: '80%', padding: "0 1%", display: 'block' }}>
        <h2 style={{ paddingTop: 30, paddingBottom: 10 }}>Información de la persona:</h2>
        <form onSubmit={ (e)=> handlerSubmit(e) } className="row g-2">
          <span style={{ marginBottom: '1%' }}>
            Los campos marcados con <span style={{ color: 'rgb(219, 45, 45)' }}>*</span> son obligatorios.
          </span>
          <div className="col-md-2">
            <label htmlFor="typeRecord" className="form-label">Tipo registro<span style={{ color: 'rgb(219, 45, 45)' }}>*</span></label>
            <select id="typeRecord" className="form-select" ref={typeRecordRef} onChange={disableFields}>
              <option value='person' selected>SOLO PERSONA</option>
              <option value='professor'>PROFESOR</option>
              <option value='student'>ESTUDIANTE</option>
            </select>
          </div>
          <div className="col-md-5">
            <label htmlFor="name" className="form-label">Nombre completo<span style={{ color: 'rgb(219, 45, 45)' }}>*</span></label>
            <input type="text" className="form-control" id="name" style={{border: `${border}`}}
              ref={nameRef} value={nameRec} onChange={(e) => { setNameRec(e.target.value); setBorder(''); setValidateForm('none'); setMessage('none'); }}/>
          </div>
          <div className="col-md-5">
            <label htmlFor="emailAddress" className="form-label">Email<span style={{ color: 'rgb(219, 45, 45)' }}>*</span></label>
            <input type="email" className="form-control" id="emailAddress" style={{border: `${border}`}}
              ref={emailAddressRef} value={emailAddressRec} onChange={(e) => { setEmailAddressRec(e.target.value); setBorder(''); setValidateForm('none'); setMessage('none'); setValidEmail('none'); }}/>
          </div>
          <label><strong>Información adicional:</strong></label>
          <div className="col-md-4">
            <label htmlFor="salary" className="form-label" >Salario<span style={{ color: 'rgb(219, 45, 45)', display:`${salaryObl}` }} >*</span></label>
            <input type="number" className="form-control" id="salary" style={ profBorder ? {border: `${border}`} : {border: ''} }
              disabled={disableSalary} ref={salaryRef} value={salaryRec} onChange={(e) => { setSalaryRec(e.target.value); setBorder(''); setProfBorder(false); setValidateForm('none'); setMessage('none'); }}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="studentNumber" className="form-label">N° de estudiante<span style={{ color: 'rgb(219, 45, 45)', display:`${studentNumberObl}` }}>*</span></label>
            <input type="number" className="form-control" id="studentNumber" style={ studBorder ? {border: `${border}`} : {border: ''}}
              disabled={disableStudentNumber} ref={studentNumberRef} value={studentNumberRec} onChange={(e) => { setStudentNumberRec(e.target.value); setBorder(''); setStudBorder(false); setValidateForm('none'); setMessage('none'); }}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="averageMark" className="form-label">Promedio<span style={{ color: 'rgb(219, 45, 45)', display:`${averageMarkObl}` }}>*</span></label>
            <input type="number" className="form-control" id="averageMark" style={ studBorder ? {border: `${border}`} : {border: ''}}
              disabled={disableAverageMark} ref={averageMarkRef} value={averageMarkRec} onChange={(e) => { setAverageMarkRec(e.target.value); setBorder(''); setStudBorder(false); setValidateForm('none'); setMessage('none'); }}/>
          </div>
          <div style={{color: 'rgb(219, 45, 45)', display:`${validateForm}`}} >Debe completar los campos obligatorios (*).</div>
          <div style={{color: 'rgb(219, 45, 45)', display:`${message}`}} >Ya existe una persona con el nombre y/o correo asociados.</div>
          <div style={{color: 'rgb(219, 45, 45)', display:`${validEmail}`}} >Por favor ingrese un email válido.</div>
          <div className="col-7" style={{ marginTop: '4%' }}>
            <button type="button" className="btn btn-info" onClick={redirect}>
              <span className='tt' data-bs-placement='bottom' title='Regresar'>
                <FontAwesomeIcon icon={faArrowLeft} />
              </span>
            </button>
            <button type="button" 
              className="btn btn-primary" style={{ marginLeft: '4%' }} onClick={addRecord}>Guardar registro</button>
            <button type="button" 
              className="btn btn-primary" 
              style={{marginLeft: '4%', backgroundColor: 'rgb(219, 45, 45)', border: 'none'}} onClick={cancel}>Cancelar</button> 
          </div>
        </form>
      </div>
      <Powered />
    </div>
  )
}

export default SaveRecord;