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
<title>Storing request</title>
</head>
<body>
	<%
	
		String[] locations = new String[]{  
				"Busch-lot64", "Busch-Lot67", "Busch-Lot65C", "Busch-Lot63", "Busch-Lot51", "Busch-Lot54", "Busch-Lot58",
				"Liv-YellowLot", "Liv-Lot112", "Liv-Lot101", "Liv-Lot105", "Liv-Lot103",
				"C&D-Lot79", "C&D-Lot70", "C&D-Lot97", "C&D-Lot99",	"C&D-Lot80", 
				"CAC-Lot1", "CAC-Lot16", "CAC-Lot11", "CAC-Lot37", "CAC-Deck", "CAC-Lot30"
		};
	
		try{
			//Create a connection string
			String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
			//Load JDBC driver - the interface standardizing the connection procedure. Look at WEB-INF\lib for a mysql connector jar file, otherwise it fails.
			Class.forName("com.mysql.jdbc.Driver");

			//Create a connection to your DB
			Connection con = DriverManager.getConnection(url, "bbq", "12345678");
			
			//Create a SQL statement
			Statement stmt = con.createStatement();
			
			//get the information submitted by end_user
			String user_email = session.getAttribute("user_email").toString();
			
			String departure_location = locations[ Integer.parseInt(request.getParameter("departure_location")) ];
			
			String destination_location = locations[ Integer.parseInt(request.getParameter("destination_location"))];
			
			int max_passenger = Integer.parseInt( request.getParameter("max_passenger").toString() ) ;
			
			String tmp_time = request.getParameter("departure_time");
			String departure_time = "";
			if(tmp_time.charAt(6) == 'P'){
				String hour = Integer.toString( (Integer.parseInt(tmp_time.substring(0,2)) + 12));
				departure_time = hour + tmp_time.substring(2,5) + ":00"; 
			}else{
				departure_time = tmp_time.substring(0,5) + ":00";
			}
			
			String recurring = request.getParameter("recurring");
			
			long id_nbr = (long) Math.floor(Math.random() * 9000000000L) + 1000000000L;
			String id = Long.toString(id_nbr);
			
			if(recurring.equals("2")){
				//System.out.println(" do the recurring operation");
				String recurStr = "INSERT INTO recurring_request (user_email, departure_time, departure_location, destination_location, passenger_number, id)"
						+String.format(" VALUES ('%s','%s','%s','%s','%d', '%s')", user_email, departure_time, departure_location, destination_location, max_passenger, id);	
				stmt.executeUpdate(recurStr);
				String actStr = "INSERT INTO activated_request (user_email, departure_time, departure_location, destination_location, passenger_number, id)"
						+String.format(" VALUES ('%s','%s','%s','%s','%d', '%s')", user_email, departure_time, departure_location, destination_location, max_passenger, id);
				stmt.executeUpdate(actStr);
				con.close();
				%>
				<script> 
			 	    //alert("Success! New request created.");
		    		window.location.href = "currentActivatedRequest.jsp";
				</script>
				<%		
			}
			else{
				//System.out.println(" do the not recurring operation");
				String actStr = "INSERT INTO activated_request (user_email, departure_time, departure_location, destination_location, passenger_number, id)"
						+String.format(" VALUES ('%s','%s','%s','%s','%d', '%s')", user_email, departure_time, departure_location, destination_location, max_passenger, id);
				stmt.executeUpdate(actStr);
				con.close();
				%>
				<script> 
			 	    //alert("Success! New request created.");
		    		window.location.href = "currentActivatedRequest.jsp";
				</script>
				<%	
			}
			
		}catch(Exception e){
		
			out.print(e.getMessage());
			
		}
	%>
		
</body>
</html>