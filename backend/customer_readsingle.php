<?php

require "customer_dbconnection.php";

$data = json_decode(file_get_contents("php://input"));
if(isset($data->customer_ids) 
	&& !empty(trim($data->customer_ids))
	){
  $create_customer_id = mysqli_real_escape_string($db_conn, trim($data->customer_ids));

	$allCustomers = mysqli_query($db_conn,"SELECT * FROM customers where customer_id = '".$create_customer_id."'");
	if(mysqli_num_rows($allCustomers) > 0){
		while($row = mysqli_fetch_array($allCustomers)){
      $viewjson["customer_id"] = $row['customer_id'];
      $viewjson["customer_name"] = $row['customer_name'];
      $viewjson["customer_email"] = $row['customer_email'];
      $viewjson["customer_date"] = $row['customer_date'];
      $json_array["customerdata"][] = $viewjson;
		}
		echo json_encode(["success"=>true,"customerlist"=>$json_array]);
		return;
			
	}
	else{
		echo json_encode(["success"=>false]);
		return;
	}
		
}
?>