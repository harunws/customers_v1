<?php
  require "customer_dbconnection.php";

  $data = json_decode(file_get_contents("php://input"));

  if(isset($data->customer_name)
    && isset($data->customer_email)
    && isset($data->customer_ids)

    && !empty(trim($data->customer_name))
    && !empty(trim($data->customer_email))
    && !empty(trim($data->customer_ids))  
  )
  {
    $customer_name = mysqli_real_escape_string($db_conn, trim($data->customer_name));
    $customer_email = mysqli_real_escape_string($db_conn, trim($data->customer_email));
    $customer_ids= mysqli_real_escape_string($db_conn, trim($data->customer_ids));

    $create = mysqli_query($db_conn, "UPDATE customers SET name = '$customer_name', email='$customer_email' WHERE customer_id = '$customer_ids'");

    if($create)
    {
      echo_json_encode(["success" => true]);
      return;
    }
    else
    {
      echo json_encode(["success" => false, "msg" => "Server Problem. Please Try Again!"]);
      return;
    }
  }
  else
  {
    echo json_encode(["success" => false, "msg" => "Please fill all the required fields"]);
    return;
  }

?>