<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="java.text.*, java.util.Date, java.util.Enumeration" %> 
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/login.css">

<link rel="stylesheet" type="text/css" href="../css/driverWaitingPage.css">
<title>Finish Ride</title>
</head>
<body>
	<% try{
	
		String id = request.getParameter("offer_id");
		String driver_email = request.getParameter("driver_email");
		String departure_location = request.getParameter("departure_location");
		String destination_location = request.getParameter("destination_location");
		
		
		//System.out.printf("%s,%s,%s,%s",id, driver_email, departure_location, destination_location);
	
			//Create a connection string
			String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
			//Load JDBC driver - the interface standardizing the connection procedure. Look at WEB-INF\lib for a mysql connector jar file, otherwise it fails.
			Class.forName("com.mysql.jdbc.Driver");

			//Create a connection to your DB
			Connection con = DriverManager.getConnection(url, "bbq", "12345678");
		
			//Create a SQL statement
			Statement stmt = con.createStatement();
			
			TimeZone.setDefault(TimeZone.getTimeZone("EST"));
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Calendar calobj = Calendar.getInstance();
			String now = df.format(calobj.getTime());
			
		
			String storeFinishedRide = "INSERT INTO finished_ride_info (id, driver_email,departure_location,destination_location,finish_time)"
										+ String.format("VALUES('%s','%s','%s','%s','%s');", id, driver_email,departure_location,destination_location,now);
			System.out.println(storeFinishedRide);
			stmt.executeUpdate(storeFinishedRide);
			
		//
			Statement stmt_rate = con.createStatement();
		    String getList1 = String.format("SELECT DISTINCT * FROM ongoing_ride_people WHERE ride_id = '%s'",id);
			ResultSet allPassenger1 = stmt.executeQuery(getList1);
		
			if(allPassenger1 != null){
				
				while(allPassenger1.next()){
					String email = allPassenger1.getString("passenger_email");
					String insertToRidePeople = "INSERT INTO finished_ride_people (id, passenger_email, rate_to_passenger,rate_to_driver)"
							+ String.format("VALUES('%s','%s',0,0)",id,email);
					System.out.print(insertToRidePeople);
					stmt_rate.executeUpdate(insertToRidePeople);
				}
	
			}

		//
		

			String tableTitle = "<caption> Please rate the passengers:</caption>";
			
			 out.print("<form class=\"post-rate-form\" method=\"post\" action=\"storeRate.jsp\">");
			String rowHeader =  "<div style=\"overflow-x:auto;\"> <form method = 'post' action='storeCompleteRide.jsp' id='driverSubmitRate'><table>"
					 + " <col span=\"1\" class=\"wide\">"  
					 + tableTitle
					 + "<tr><th>Passenger_email</th><th>Rate</th></tr>";
					 	
  			
			  	
			    String getList = String.format("SELECT DISTINCT * FROM ongoing_ride_people WHERE ride_id = '%s'",id);
				ResultSet allPassenger = stmt.executeQuery(getList);
			
				if(allPassenger != null){
					out.print(rowHeader);
					while(allPassenger.next()){
						String email = allPassenger.getString("passenger_email");
						String select = String.format("<select name=\"%s\" size=1 >",email)
								+ "<option value=\"1\">1</option>"
								+ "<option value=\"2\">2</option>"
								+ "<option value=\"3\">3</option>"
							    + "<option value=\"4\">4</option>"
							    + "<option value=\"5\">5</option>"
							    + "</select>";
						String eachRow = String.format("<tr><td>%s</td><td>%s</td></tr>",email,select);
						out.print(eachRow);
						
					}
					out.print("</table></div>");
					
					
				//	out.print("<input type='hidden' name='offer_id' />");
				/*
					String button = "<input type = \'button\' value = \'Submit\' onclick = \"driverSubmitRate()\"" ;
					out.print(button);
					out.print("</form>");
				*/
				out.print(String.format("<input type='hidden' name='offer_id'  value = \'%s\'   '/>",id));
				out.print("<button>submit</button>");
				out.print("</form>");
				}

	
			con.close();
			
		}catch(Exception e){
	
			out.print("fail(in storeCompleteRide.jsp)");
		
		}
		
	%>
	<script>
	function driveSubmitRate()
	{					
		
	}
	
	</script>
			
</body>
</html>