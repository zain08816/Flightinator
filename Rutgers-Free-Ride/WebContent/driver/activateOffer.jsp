<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@page import = "java.time.LocalTime" %>
<%@page import = "java.text.SimpleDateFormat, java.util.Date" %>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Activating Recurring Offer</title>
</head>
<body>
	<%
	
		String id = request.getParameter("param");
		//System.out.print(id);
		try{
			//Create a connection string
			String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
			//Load JDBC driver - the interface standardizing the connection procedure. Look at WEB-INF\lib for a mysql connector jar file, otherwise it fails.
			Class.forName("com.mysql.jdbc.Driver");

			//Create a connection to your DB
			Connection con = DriverManager.getConnection(url, "bbq", "12345678");
			
			//Create a SQL statement
			Statement stmt = con.createStatement();
			
			String str = "SELECT * FROM recurring_offer WHERE id='" + id + "'";
			ResultSet result = stmt.executeQuery(str);
			if(!result.next()){
				%>
				<script> 
				    alert("The offer is not found!");
			    	window.location.href = "recurringOffer.jsp";
				</script>			
				<%
				
			}
			else{
			
				String user_email = session.getAttribute("user_email").toString();

				String departure_time = result.getObject("departure_time").toString().substring(0,5) + ":00";

				String departure_location = result.getString("departure_location");

				String destination_location = result.getString("destination_location");
				
				int max_passenger = Integer.parseInt(result.getObject("passenger_number").toString());
				
				
				long id_nbr = (long) Math.floor(Math.random() * 9000000000L) + 1000000000L;
				String new_id = Long.toString(id_nbr);
				
				String actStr = "INSERT INTO activated_offer (user_email, departure_time, departure_location, destination_location, passenger_number, id)"
						+String.format(" VALUES ('%s','%s','%s','%s','%d', '%s')", user_email, departure_time, departure_location, destination_location, max_passenger, new_id);
								
				stmt.executeUpdate(actStr);
				con.close();
				
				session.setAttribute("offer_id", new_id);
				session.setAttribute("selected_passenger_number", 0);
				
				%>
				<script> 
			 	    //alert("Success! New offer created.");
		    		window.location.href = "driverWaitingPage.jsp";
		    		
				</script>
				<%		
			}
			
		}catch(Exception e){
		
			out.print(e.getMessage());
			
		}
	%>
		
</body>
</html>