<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="../../css/login.css">
<title>Edit Vehicle</title>
</head>
<body>

	<%
		if(request.getParameter("car_plate")==null){
			out.print("null");
		}
		else{
			String car_plate = request.getParameter("car_plate").toString();
			String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
			//Load JDBC driver - the interface standardizing the connection procedure. Look at WEB-INF\lib for a mysql connector jar file, otherwise it fails.
			Class.forName("com.mysql.jdbc.Driver");

			//Create a connection to your DB
			Connection con = DriverManager.getConnection(url, "bbq", "12345678");
		
			//Create a SQL statement
			Statement stmt = con.createStatement();
		
			//Make a SELECT query
			String str = "DELETE FROM car WHERE plate_number='" + car_plate + "'";	
			stmt.executeUpdate(str);
			
			con.close();
			%>
			<script> 
		 	   //alert("login success!");
	    		window.location.href = "showCarList.jsp";
			</script>
			<%			
		}
	%>

</body>
</html>