import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function UpdatePage(props) {

  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    name: props.list.name,
    email: props.list.email
  });

  const onChangeValue = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]:e.target.value
    });
  }

  const submitCustomer = async(event) => {
    try
    {
      event.preventDefault();
      event.persist();
      axios.post(`http://localhost/itrain/devooti/customers_v1/backend/customer_update.php`, {
        customer_name: customerInfo.customer_name,
        customer_email: customerInfo.customer_email,
        customer_ids: props.list.customer_id,
      })
      .then(res => {
        console.log(res.data);
        navigate(`/`);

        return;
      })

    }
    catch(error) {throw error;}
  };

  return (
    <div className="container mt-4">
      <h3>Update Customer</h3>
      {/* // ? Update form  */}
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
            value={customerInfo.customer_name}
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
            value={customerInfo.customer_email}
            onChange={onChangeValue}
            required
          />
          <input className="btn btn-info mt-4" type="submit" value="Update" />       
        </div>
      </form>      
    </div>
  )
}
