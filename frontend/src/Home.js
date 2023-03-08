import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import axios from "axios";

export default function Home() {

  //? Functions Start
  //UseEffect:
  useEffect( ()=> {
    window.scrollTo(0, 0);
    allCustomer();
  }, []);

  const [customer, setCustomer] = useState([]);
  const allCustomer = async (customer_ids) => {
    try {
      axios.get(`http://localhost/itrain/customers_v1/backend/customer_readall.php`)

      
      
      .then(res => {     

        setCustomer(res.data.list.data);
      })

    }catch(error){throw error;}
  }

  const deleteConfirm = (id) => {
    if(window.confirm("Are you sure?")) {
      deleteCustomer(id);
    }
  };

  const deleteCustomer = async (id) => {
    try
    {
      axios.post(``, {
        customer_ids: id,
      })
      .then(res => {
        setCustomer([]);
        allCustomer();
      })

    }
    catch(error){throw error;}
  }

  //? Functions End
  return (
    <div>           
      <div className="customers_list mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {customer.map((item, index) => (  
            <tbody key={item.customer_id}>
              <tr>
                <th scope="row">{item.customer_id}</th>
                <td>{item.customer_name}</td>
                <td>{item.customer_email}</td>
                <td>{item.customer_date}</td>   
                <td>
                  <i> 
                    <Link  to={`update/${item.customer_id}`} className="bi bi-pencil-square text-info"></Link> 
                  </i>

                  <i> 
                    <Link to={"#"}
                      onClick={() => deleteConfirm(item.customer_id)} className="bi bi-trash3-fill ps-3 text-danger">
                    </Link>
                  </i> 
                </td>               
              </tr>                 
            </tbody>
          ))}
        </table>
      </div>      
    </div>
  )
}
