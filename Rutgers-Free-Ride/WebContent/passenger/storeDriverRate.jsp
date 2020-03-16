<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/login.css">
<title>Store rate</title>
</head>
<body>
	<% try{
	
		String id = request.getParameter("offer_id");
		System.out.println();
		System.out.print(id);
	
	
			//Create a connection string
			String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
			//Load JDBC driver - the interface standardizing the connection procedure. Look at WEB-INF\lib for a mysql connector jar file, otherwise it fails.
			Class.forName("com.mysql.jdbc.Driver");

			//Create a connection to your DB
			Connection con = DriverManager.getConnection(url, "bbq", "12345678");
		
			//Create a SQL statement
			Statement stmt = con.createStatement();
			int rate = Integer.parseInt(request.getParameter("Rate"));
			String your_email = session.getAttribute("user_email").toString();
			String update = "UPDATE finished_ride_people " 
					+ String.format("SET rate_To_Driver = %d ",rate)
					+ String.format("WHERE id = '%s' and passenger_email = '%s'",id,your_email);
			stmt.executeUpdate(update);
			con.close();			
	}catch(Exception e){

		out.print("fail(in storeRate(Passenger).jsp)");
	
	}
	
%>
	<script>
		alert("Thank you for your feedback! Happy free ride!");
		window.location.href("passengerHomePage.jsp");
	</script>
</body>
</html>