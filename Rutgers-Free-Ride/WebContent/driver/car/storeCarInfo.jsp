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
		String user_email = session.getAttribute("user_email").toString();
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
			int max_passenger_seat = Integer.parseInt(request.getParameter("max_passenger_seat"));
			String owner =  session.getAttribute("user_name").toString();
			
			//storeInfo into database
			String check_if_exist = "SELECT * FROM car c"
					+ String.format(" WHERE c.plate_number='%s' and c.make='%s'", plate_number,car_type)
					+ String.format("and c.seat_number = %d and c.owner='%s'",max_passenger_seat, user_email);
					
			//out.println(check_if_exist);
			ResultSet allMatching = stmt.executeQuery(check_if_exist);
			
			
			if(allMatching.next() == true) {	%>
				<script> 
			    	alert("You already uploaded this car\n");
			    	window.location.href = "showCarList.jsp";
				</script>
				<%
			}
			String insert = "INSERT INTO car (make, seat_number, plate_number, owner)"
					+String.format(" VALUES ('%s',%d,'%s','%s')",car_type, max_passenger_seat, plate_number, user_email);
				
			stmt.executeUpdate(insert);
			con.close();
			
			%>
			<script> 
		    	//alert("Success! new car info saved\n");
		    	window.location.href = "showCarList.jsp";
			</script>
			<%
			
		}catch(Exception e){
		
			out.print(e.getMessage());
			
		}
	%>
</body>
</html>