import React, {useEffect, useState} from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";
import UpdateCustomer from "./UpdateCustomer";

export default function Update() {

  let params = useParams();

  useEffect(() => {
    window.scrollTo(0,0);
    updateCustomerList(params.ids);
  }, [params.ids]);

  const [customer, setCustomer] = useState([]);
  const [loadCustomer, setLoadCustomer] = useState(false);
  const updateCustomerList = async(ids) => {
    try
    {
      axios.post(`http://localhost/itrain/devooti/customers_v1/backend/customer_readall.php`, {
        customer_ids: ids,
      })
      .then(res => {
        setCustomer(res.data.customerList.customerdata[0]);
        setLoadCustomer(true);
      })
    }
    catch(error){throw error;}
  }

  return (
    <div>
        {loadCustomer &&
          <UpdateCustomer list={customer} />
        }
    </div>
  )
}
