<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="../../css/login.css">
<title>Manage My Cars</title>
</head>
<body>
	<p class="app-name"> Rutgers Free Ride! </p>   
	
	<div class="driver-home-page">
		<div class="form">
				
			<%
				String user_name = session.getAttribute("user_name").toString();
				out.print( String.format("<p class='message' > %s's Car List : </p>", user_name));
			%>
				<p class='message-red'>Operations</p>
	
			<form>
				<button formaction='addCar.jsp'> Add a Vehicle </button>
				<br/><br/>
				<button  formaction='showCarList.jsp'> View List </button>					
				<p class="message">Go back? <a href="../driverHomePage.jsp">Go back</a></p>
			</form>
		</div>
	</div>
		
</body>
</html>