<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="../../css/login.css">
<title>Add a Vehicle</title>
</head>

<body>
  	<div class="form">
  		
  		<p class='message-red'>Add a New Vehicle</p>
   		<form class="post-offer-form" method="post" action="storeCarInfo.jsp">
      
     		<input type="text" placeholder="Car type" name="car_type"/>
      		<%-- How to make car type determine max passenger --%>
      			 
      		<input type="text" placeholder="Plate #" name="plate_number"/>       
      		<input type="text" placeholder="Max_passenger_seat" name="max_passenger_seat"/>
      		<button>submit</button>
      
      		<p class="message">Back to homepage? <a href="manageCarList.jsp">Go back</a></p>
    	</form>
	</div>
</body>
</html>