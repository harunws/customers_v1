import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Create() {

  // ? All functions goes here
  const navigate = useNavigate();
  const [customerInfo, setcustomerInfo] = useState({
    customer_name: '',
    customer_email: '',
  });

  const onChangeValue = (e) => {
    setcustomerInfo({
      ...customerInfo, 
      [e.target.name]:e.target.value
    });
  }


  //? Inserting new customer into the database
  const submitCustomer = async(event) =>{
    try 
    {
      event.preventDefault();
      event.persist();

      axios.post(`http://localhost/itrain/customers_v1/backend/customer_create.php`,
      {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
      })
      .then(res => {
        console.log(res.data);
        navigate(`/`);
        return;
      })
    } 
    catch (error) {throw error;}
  };

  return (
    <div className="container mt-4">
      <h3>Add new customer</h3>
      {/* // ? Create form  */}
      <form className="form-control" onSubmit={submitCustomer}>
        <div className="mb-3">
          <label htmlFor="_name" className="form-label">Name :</label>
          <input 
            className="form-control"          
            placeholder="Your Full Name"
            autoComplete="off"
            type="text" 
            id="_name" 
            name="name"
            onChange={onChangeValue}
            required
          />          
        </div>
        <div className="mb-3">
          <label htmlFor="_email" className="form-label">Email :</label>
          <input 
            className="form-control"          
            placeholder="name@example.com"
            autoComplete="off"
            type="email" 
            id="_email" 
            name="email"
            onChange={onChangeValue}
            required
          />
          <input className="btn btn-info mt-4" type="submit" value="Create" />       
        </div>
      </form>      
    </div>
  );
};


















