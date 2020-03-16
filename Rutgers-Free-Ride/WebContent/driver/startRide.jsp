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
<link rel="stylesheet" type="text/css" href="../css/login.css">
<link rel="stylesheet" type="text/css" href="../css/duringRide.css">
<title>ride</title>

<script>
function submitter(r_id, flag, d_id) {
    var myForm = document.forms["activatedRequestForm"];
    myForm.elements["request_id"].value = r_id;
    myForm.elements["accept"].value = flag;
    myForm.elements["offer_id"].value = d_id;
    myForm.submit();
}

</script>

</head>
<body>

	<%
		String offer_id = "";
		offer_id = request.getParameter("offer_id");
	
		
		
		
		//out.print(offer_id);
	
		//long id_nbr = (long) Math.floor(Math.random() * 9000000000L) + 1000000000L;
		//String ride_id = Long.toString(id_nbr);
		
		try{										
			String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection(url, "bbq", "12345678");
			Statement stmt = con.createStatement();
			
		
			
			String getOfferStr = "select * from activated_offer where id='" + offer_id + "'";
			ResultSet result = stmt.executeQuery(getOfferStr);
			
			String departure_time = "";
			String departure_location ="";
			String destination_location = "";
			String car_plate = "";
			String driver_email = "";
			

			
			if(result.next()){
				//String user_email = session.getAttribute("user_email").toString();
				departure_time = result.getObject("departure_time").toString();
				departure_location = result.getString("departure_location");
				destination_location = result.getString("destination_location");
				car_plate = result.getString("car_plate");
				driver_email = result.getString("user_email");
			}
		
			//out.print(driver_email);

			/*
				there are two tables, ongoing_ride_people and ongoing_ride_info
				one used to store only driver email and user email
				one used to store location and other information
			*/
			// save the ride into table on_going_ride
			String selectedRequest = "select * from tmp_ride_match where offer_id='" +offer_id+ "'";
			ResultSet selectedRequests = stmt.executeQuery(selectedRequest);
			
			Statement people_stmt = con.createStatement();

			String update = "";
			String p_email = "";
			int passengerNbr = 0;
			if(selectedRequests.next()){
				selectedRequests = stmt.executeQuery(selectedRequest);
				while(selectedRequests.next()){
					passengerNbr += 1;
					
					p_email = selectedRequests.getString("passenger_email");
					update = "insert into ongoing_ride_people (passenger_email, driver_email, ride_id) values ('"+p_email+"', '"+driver_email+"', '"+offer_id+"')";
					people_stmt.executeUpdate(update);
				}
			}
			
			//***** notice that I use offer_id directly as the ride_id in ongoing ride info, 
			//***** because only in this passenger can know the ride_id, so passenger can know whether the starts or not
            //***** by checking if there is a new row in table ongoing_ride
            
			String saveRideInfo = "insert into ongoing_ride_info (ride_id, departure_time, departure_location, destination_location, car_plate, passenger_number, driver_email ) values ('"+offer_id+"', '"+departure_time+"', '"+departure_location+"', '"+destination_location+"', '"+car_plate+"', "+passengerNbr+", '"+driver_email+"' )";
			//out.println(saveRideInfo);
			stmt.executeUpdate(saveRideInfo);
	
		
		//out.println("to-do: display some advertisement \n");
		
		//out.println("to-do: create a button to finish ride, the ride will then be written into table finished_ride , and users should rate each other");
		out.print("<p class=\"app-name\"> Happy Free Ride </p> ");
		
		
		%>
		
		
		
		<%
		
		
		
		out.print("<div class=\'loader\'></div>");
	/*
		out.print(String.format("%s,%s,%s,%s",offer_id, driver_email, departure_location, destination_location));
		String button = "";
		button = "<button class='end' onclick=\"driverEnd("
		+ "\'" + offer_id + "\'"
		+ ",\'" + driver_email+"\'"
		+ ",\'" + departure_location+"\'"
		+ ",\'" + destination_location+"\'"
		+ ")\"" + "> Ride Complete!</button>";
		out.print(button);
	*/
		
		
			out.print("<form method = 'post' action='storeCompleteRide.jsp' id='driverCompleteRide'>");
			out.print("<input type='hidden' name='offer_id' />");
			out.print("<input type='hidden' name='driver_email' />");
			out.print("<input type='hidden' name='departure_location' />");
			out.print("<input type='hidden' name='destination_location' />");
			String button = String.format( "<input type = \'button\' value = \'Ride Complete!\' onclick = \"driverEnd('%s','%s','%s','%s')\">",offer_id, driver_email, departure_location, destination_location );
			out.print(button);
			out.print("</form>");
	%>
		<script>

		
		function driverEnd(offer_id, driver_email, departure_location, destination_location){			
			
			var myForm = document.forms["driverCompleteRide"];
			myForm.elements["offer_id"].value = offer_id;
			myForm.elements["driver_email"].value = driver_email;
			myForm.elements["departure_location"].value = departure_location;
			myForm.elements["destination_location"].value = destination_location;
			myForm.submit();
			
		}
		</script>
		
		<% 
	
		
			
		
			con.close();			
		}catch(Exception e){
				
			out.print(e.getMessage());
				
		}
	%>

</body>
</html>