<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Your Car List</title>
</head>
<link rel="stylesheet" type="text/css" href="../css/carList.css">
<body>
<p class="app-name"> Rutgers Free Ride! </p>   


		 <script>
				function checkClicked(plate)
				{
										
					alert(plate);
					window.location.href = "editCar.jsp?" + plate;
									   	
					
				}
	     </script>
					
	
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
							
								  String getList = String.format("SELECT * FROM car c WHERE owner = '%s'",session.getAttribute("user_name").toString());
								    ResultSet allCars = stmt.executeQuery(getList);
								   
								    //Print the car list
								    int number = 1;
								   String tableTitle = String.format("<caption> %s's Vehicles</caption>", session.getAttribute("user_name").toString());
								   String tableHeader = " <div style=\"overflow-x:auto;\"> <table class=\"center\">"
								   	 + tableTitle	
								   	 +"<tr><th>number</th><th>Car Type</th><th>Plate Number</th><th>Max Passenger Seat</th><th></></tr>";
								   out.print(tableHeader);
								   while(allCars.next() == true){
									   String plate = allCars.getString("plate_number");
									  
								    	String eachRow = String.format("<tr><td>%d</td><td>%s</td><td>%s</td><td>%d</td><td> "
								    			,number,allCars.getString("make"),allCars.getString("plate_number"),allCars.getInt("seat_number"));
								    	
								 	  out.print(eachRow);
								 	  out.print("<button id=\'button\' onclick=\"checkClicked(\'" + plate +"\') \" class=\'Edit\'>Edit</button>");
								 	  out.print("</td></tr>");
								   }
								  
								   
								   
								   out.print("</table></div>");
						 
							
							
						
							}catch(Exception e){
								out.println("Failed(in showCarList.jsp)");
							}
						
					
					%>
					<p class="message">Back to homepage? <a href="driverHomePage.jsp">Go back</a></p>
</body>
</html>