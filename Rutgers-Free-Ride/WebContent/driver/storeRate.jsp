<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/login.css">
<title>Storing Rate</title>
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

			  	
			    String getList = String.format("SELECT DISTINCT * FROM finished_ride_people WHERE id = '%s'",id);
				System.out.print(getList);
			    ResultSet allPassenger = stmt.executeQuery(getList);
			
				if(allPassenger != null){
					
					while(allPassenger.next()){
						System.out.println("In the while loop\n");
						String email = allPassenger.getString("passenger_email");
						int rate = Integer.parseInt(request.getParameter(email));
						String updateRow = "UPDATE finished_ride_people " 
								+ String.format("SET rate_To_Passenger = %d ",rate)
								+ String.format("WHERE id = '%s' and passenger_email = '%s'",id,email);
						System.out.print(updateRow);
						Statement stmt_rate = con.createStatement();
						stmt_rate.executeUpdate(updateRow);
						
					}
		
				}

	
			con.close();
			
		}catch(Exception e){
	
			out.print("fail(in storeRate(driver).jsp)");
		
		}
		
	%>
	<script>
		alert("Thank you for your feedback! Happy free ride!");
		window.location.href("driverHomePage.jsp");
	</script>
</body>
</html>