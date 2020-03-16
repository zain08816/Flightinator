<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="refresh" content="10" />
<title>Waiting for passengers</title>

<link rel="stylesheet" type="text/css" href="../css/driverWaitingPage.css">
<link rel="stylesheet" type="text/css" href="../css/login.css">

</head>
<body>
	<div class="loader"></div>
		
	<script>
	function driverAccept(request_id, offer_id, p_email)
	{
							
		var myForm = document.forms["requestForm"];
		myForm.elements["request_id"].value = request_id;
		myForm.elements["offer_id"].value = offer_id;
		myForm.elements["p_email"].value = p_email;
		alert(p_email);
	    myForm.submit();
		
	}
	function driveStart(offer_id)
	{					
		var myForm = document.forms["startForm"];	
		myForm.elements["offer_id"].value = offer_id;
		myForm.submit();
	}
	</script>
	
	<p class="app-name"> current passenger requests </p> 
		<div class='driverRequestList'>

	<%	
	
		int max_passenger_nbr = 0;
		
		if(session.getAttribute("offer_id")==null || session.getAttribute("offer_id")=="null"){
			out.print("<p class=\"message-offer\">You currently have no offer posted</p>");
		}else{
			String offer_id = session.getAttribute("offer_id").toString();
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
				String max_passenger = "";
				while(result.next()){
					//String user_email = session.getAttribute("user_email").toString();
					departure_time = result.getObject("departure_time").toString().substring(0,5);
					departure_location = result.getString("departure_location");
					destination_location = result.getString("destination_location");
					max_passenger = result.getObject("passenger_number").toString();
					
					max_passenger_nbr = result.getInt("passenger_number");
					
					session.setAttribute("max_passenger_number", max_passenger_nbr);
					
					out.print("<p class=\"message-offer\">Below are all the passenger requests that match your offer: </p>" );
					out.print("<p class=\"message-offer\"> From "+ departure_location + " to " + destination_location + " at " + departure_time +" with max seats " + max_passenger+" </p>");
					out.print("<p class=\"message-offer\"> Want to cancel this offer? <a href=\"cancelOffer.jsp\">click here</a></p>");
				}
				
				String getList = "SELECT * FROM activated_request WHERE driver_email = 'none' ";
				ResultSet allRequests = stmt.executeQuery(getList);
				
				/*********
				convert time to total minutes, thus able to compare them, for example:
					16:40 means 16 hours and 40 minutes, so in total 16*60 + 40 = 1000 minuts,
					16:50 means 1010 minuts, 1000 - 1010 = -10, so 16:40 is 10 minutes ahead of 16:50
				**********
				*/
				int d_time_min = Integer.parseInt(departure_time.substring(0,2))*60 + Integer.parseInt(departure_time.substring(3,5));	
				
				int request_number = 0;
				if(allRequests != null){
					//out.print(" <col span=\"1\" class=\"wide\">");
					String tableTitle = String.format("<caption> List of requests</caption>");
					String tableHeader = " <div style=\"overflow-x:auto;\"> <table class=\"center\">"
										 + " <col span=\"1\" class=\"wide\">"
									   	 + tableTitle	
									   	 +"<tr><th>Passenger email</th><th>Passenger rate</th><th>departure location</th><th>destination location</th><th>departure time</th><th>Passenger numbers</th><th>Operation</th></tr>";
					out.print(tableHeader);
					
					while(allRequests.next()){	
						
						String p_time = allRequests.getObject("departure_time").toString().substring(0,5);
						int p_time_min = Integer.parseInt(p_time.substring(0,2))*60 + Integer.parseInt(p_time.substring(3,5));
						
						String p_depart = allRequests.getString("departure_location");
						String p_dest = allRequests.getString("destination_location");
						int p_nbr = allRequests.getInt("passenger_number");
						
						//filter all the matched requests
						
						if( p_depart.equals(departure_location) &&
							p_dest.equals(destination_location) &&
							p_nbr <= Integer.parseInt(max_passenger) &&
							(d_time_min - p_time_min) < 30 &&
							(d_time_min - p_time_min) > 0 )
						{
							request_number ++;
							
							String p_email = allRequests.getString("user_email");
							Statement new_stmt = con.createStatement();
							String getUser = "select e.rate from end_user e where e.ru_email='" + p_email +"'";
							ResultSet rate_result = new_stmt.executeQuery(getUser);
							int user_rate = 5;
							if(rate_result.next()){
								user_rate = rate_result.getInt("rate");
							}
							String eachRow = String.format("<tr> <td>%s</td> <td>%d</td> <td>%s</td> <td>%s</td> <td>%s</td> <td>%d</td> <td> "
									    ,allRequests.getString("user_email"), user_rate, allRequests.getString("departure_location"), allRequests.getString("destination_location"),
									    allRequests.getTime(4),	allRequests.getInt("passenger_number"));
									    	  
							String r_id = allRequests.getString("id");
							
							out.print(eachRow);
														
							//out.print("<button id=\'button\' onclick=\"driverAccept("+r_id+", "+offer_id+", "+p_email+") \" class=\'Edit\'>Accept</button>");
							//out.print("</td><td>");
							out.print("<form action=\"match.jsp\" id=\"requestForm\" ><input type=\"hidden\" name=\"request_id\" value=\""+r_id+"\"/><input type=\"hidden\" name=\"offer_id\" value=\""+offer_id+"\"/><input type=\"hidden\" name=\"p_email\" value=\""+p_email+"\" /><button>accept</button></form>");
							//out.print("<button id=\'button\' onclick=\"driverReject() \" class=\'Edit\'>Reject</button>");
							out.print("</td></tr>");
						}			 	
					}
					out.print("</table></div>");
					
					if(request_number==0){
						out.print("<p class=\"message-red\">Sorry, there are currently no request matches your offer</p>" );
					}else{
						// somehow it doesn't work, dont know why
						//out.print("<form action=\"match.jsp\" id=\"requestForm\" ><input type=\"hidden\" name=\"request_id\" /><input type=\"hidden\" name=\"offer_id\" /><input type=\"hidden\" name=\"p_email\" /></form>");
					}	
				}
				
				
				/*
					Create another table, that shows all the selected requests by driver
				*/
				String selectedRequest = "select * from tmp_ride_match where offer_id='" +offer_id+ "'";
				ResultSet selectedRequests = stmt.executeQuery(selectedRequest);
				
				out.print("<br /> <p class=\"message-red\">Passenger requests that you accepted: </p>" );
				
				if(selectedRequests.next()){
					selectedRequests = stmt.executeQuery(selectedRequest);
					out.print("<table class='emailTable'> <col span=\"3\" class=\"wide\"><tr><td>Passenger email  </td><td> </td><td>  Passenger accepted or not</td></tr>");
					while(selectedRequests.next()){
						out.print("<tr><td>"+selectedRequests.getString("passenger_email")+"</td><td> </td><td>"+selectedRequests.getString("passenger_accept")+"</td></tr>");
						//out.print("<button id=\'button\' onclick=\"driverAccept("+r_id+", "+offer_id+") \" class=\'Edit\'>Accept</button>");
					}
					out.print("</table>");
				}
				
				
				//out.print("<br /> <p class=\"message\">When every passenger accept the offer, a start button will show up</p>" );
				
				/*
					check if every passenger is ready to go
				*/
				selectedRequest = "select * from tmp_ride_match where offer_id='" +offer_id+ "'";
				selectedRequests = stmt.executeQuery(selectedRequest);
				
				int total_passenger = 0;
				int accepted_passenger = 0;
				while(selectedRequests.next()){
					total_passenger+=1;
					if(selectedRequests.getString("passenger_accept").toString().equals("yes")){
						accepted_passenger+=1;
					}
				}
				if(accepted_passenger==total_passenger && total_passenger!=0){
					out.print("<form id=\"startForm\" action=\"startRide.jsp\"><input type='hidden' name='offer_id'></form>");
					out.print("<button class='start' onclick=\"driveStart("+offer_id+")\"> START RIDE!</button>");
				}else{
					out.print("<br /> <p class=\"message\">When every passenger accept the offer, a start button will show up</p>" );
				}
				
				session.setAttribute("selected_passenger_number", accepted_passenger);
				
				con.close();

			}catch(Exception e){
				out.println("Failed(in driverWaitingPage.jsp)");
			}finally{
				
			}
		}
					
			%>
			<p class="message">Back to homepage? <a href="driverHomePage.jsp">Go back</a></p>
			</div>
</body>
</html>