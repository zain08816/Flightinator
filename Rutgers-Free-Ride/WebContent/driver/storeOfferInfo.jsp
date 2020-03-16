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
			
			String car_plate = request.getParameter("car").toString();
			System.out.print(car_plate);
			
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
				String recurStr = "INSERT INTO recurring_offer (user_email, departure_time, departure_location, destination_location, passenger_number,id, car_plate)"
						+String.format(" VALUES ('%s','%s','%s','%s','%d','%s' ,'%s')", user_email, departure_time, departure_location, destination_location, max_passenger,id, car_plate);	
				stmt.executeUpdate(recurStr);
				
			}
			
			//System.out.println(" do the not recurring operation");
			String activateStr = "INSERT INTO activated_offer (user_email, departure_time, departure_location, destination_location, passenger_number,id, car_plate)"
					+String.format(" VALUES ('%s','%s','%s','%s','%d','%s','%s')", user_email, departure_time, departure_location, destination_location, max_passenger,id, car_plate);	
			stmt.executeUpdate(activateStr);
			
			con.close();
			
			session.setAttribute("offer_id", id);
				
		}catch(Exception e){
		
			out.print(e.getMessage());
			
		}
		
		session.setAttribute("selected_passenger_number", 0);
	%>
		<script>
			//alert("Offer posted\n");
			window.location.href = "driverWaitingPage.jsp";
		</script>
</body>
</html>