<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<%
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
			String car_type = request.getParameter("car_type");
			String plate_number = request.getParameter("plate_number");
			String departure_location = request.getParameter("departure_location");
			String departure_time = request.getParameter("departure_time");
			String destination_location = request.getParameter("destination_location");
			String max_passenger = request.getParameter("max_passenger");
			
			System.out.print(departure_time);
			
			//storeInfo into database
			String check_if_exist = "SELECT* FROM driver_offer d"
					+ String.format(" WHERE d.car_plate='%s' and d.car_owner_email='%s'", plate_number,session.getAttribute("user_email"))
					+ String.format("and d.departure_time='%s' and d.departure_location='%s'",departure_time, departure_location)
					+ String.format("and d.destination='%s';",destination_location);
			//out.println(check_if_exist);
			ResultSet allMatching = stmt.executeQuery(check_if_exist);
			
			
			if(allMatching.next() == true) {	%>
				<script> 
			    	alert("You already posted an offer with same attributes\n");
			    	window.location.href = "postOffer.jsp";
				</script>
				<%
			}
			
			//
			final String numbers = "0123456789";
			String ID = "";
			int count = 0;
			Random rand = new Random(System.currentTimeMillis());
			while(count++ < 9){			
				
				int value = rand.nextInt();
				int index = Math.abs(value) % 10;
				
				char idToken = numbers.charAt(index);
				ID+=idToken;					
			}
				
			
			//out.println(ID);
			String insert = "INSERT INTO driver_offer (car_plate, car_owner_email, departure_time,departure_location, destination, offer_id)"
				+String.format(" VALUES ('%s','%s','%s','%s','%s',%d)",plate_number, session.getAttribute("user_email"),departure_time,departure_location,destination_location,Integer.parseInt(ID));
			out.println();
			out.print(insert);
			stmt.executeUpdate(insert);
			con.close();
			
		}catch(Exception e){
		
			out.print(e.getMessage());
			
		}
	%>
		
</body>
</html>