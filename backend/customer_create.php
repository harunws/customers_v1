<?php 
  require "customer_dbconnection.php";

  $data = json_decode(file_get_contents("php://input"));

  if (isset($data->customer_name)
     && isset($data->customer_email)
     && !empty(trim($data->customer_name))
     && !empty(trim($data->customer_email))) 

  {
    $customer_name = mysqli_real_escape_string($db_conn, trim($data->customer_name));
    $customer_email = mysqli_real_escape_string($db_conn, trim($data->customer_email));
    $customer_date = date('Y-m-d');

    $create = mysqli_query($db_conn, " INSERT INTO customers (customer_name, customer_email, customer_date) VALUES ('$customer_name','$customer_email','$customer_date')");

    if($create)
    {
      $last_id = mysqli_insert_id($db_conn);
      echo json_encode(["success"=>true, "insertid"=>$last_id]);

      return;
    } 
    else 
    {
      echo json_encode(["success"=>false,"msg"=>"Server Problem. Please Try Again"]);

      return;
    }

  } 
  else 
  {
    echo json_encode(["success"=>false, "msg"=>"Please fill all the reuired fields"]);

    return;
  }
?>