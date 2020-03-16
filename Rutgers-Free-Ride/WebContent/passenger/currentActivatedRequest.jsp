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
<meta http-equiv="refresh" content="10" />

<link rel="stylesheet" type="text/css" href="../css/login.css">

<title>current activated request</title>

<script>
function submitter(r_id, flag, d_id) {
    var myForm = document.forms["activatedRequestForm"];
    myForm.elements["request_id"].value = r_id;
    myForm.elements["accept"].value = flag;
    //alert(flag);
    myForm.elements["offer_id"].value = d_id;
    myForm.submit();
}

function acceptOrDeny(btn) {
    var param = btn.parentElement.parentElement.id;
    var myForm = document.forms["activatedRequestForm"];
    myForm.elements["param"].value = param;
    myForm.submit();
}


</script>

</head>
<body>


	<p class="app-name"> current activated requests </p> 
	
	
	<div class='requestTable'>
		<br />
	
		<%
			String user_email = session.getAttribute("user_email").toString();
			
			try {

				String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
				//Load JDBC driver - the interface standardizing the connection procedure. Look at WEB-INF\lib for a mysql connector jar file, otherwise it fails.
				Class.forName("com.mysql.jdbc.Driver");

				//Create a connection to your DB
				Connection con = DriverManager.getConnection(url, "bbq", "12345678");
			
				//Create a SQL statement
				Statement stmt = con.createStatement();
			
				//Make a SELECT query from the sells table with the price range specified by the 'price' parameter at the HelloWorld.jsp
				String str = "SELECT * FROM  activated_request WHERE user_email='"+user_email + "'";
				//Run the query against the database.
				ResultSet result = stmt.executeQuery(str);
	
				
				if(!result.next()){
					out.print("<p class=\"message-red\">there are current no request</p>");
				}
				else{
					//Make an HTML table to show the results in:
					out.print("<form action='checkRequestDetail.jsp' id='activatedRequestForm' >");
					out.print("<input type='hidden' name='request_id' />");
					out.print("<input type='hidden' name='accept' />");
					out.print("<input type='hidden' name='offer_id' />");
					out.print("<table id='activatedRequestTable'>");
					
					out.print("<tr><td>Departure location</td><td>Destination location</td><td>Departure time</td><td>Passenger Number</td><td>status</td><td></td><td>operation</td></tr>");
					//parse out the results
					result = stmt.executeQuery(str);
					while (result.next()) {
						//make a row
						out.print("<tr>");
						//System.out.println(result.getString("id"));
						//make a column
						out.print("<td>");
						out.print(result.getString("departure_location"));
						out.print("</td>");
						
						out.print("<td>");
						out.print(result.getString("destination_location"));
						out.print("</td>");
						
						out.print("<td>");
						out.print(result.getObject("departure_time").toString().substring(0, 5));
						out.print("</td>");
						
						out.print("<td>");
						out.print(result.getObject("passenger_number").toString());
						out.print("</td>");
						
						out.print("<td>");
						
						String r_id = result.getString("id").toString();

						if(result.getString("driver_email").toString().equals("none")){
							out.print("not matched");
							out.print("</td><td></td>");
							out.print("<td><input class='delete-button' type='button' value='cancel' onclick='submitter("+ r_id + ", " + "\"delete\", \"none\")'/></td>");
							out.print("</tr>");
						}
						else{
							out.print("match found");
							out.print("</td>");

							String d_id = result.getString("offer_id").toString();
							
							out.print("<td><input class='delete-button' type='button' value='cancel' onclick='submitter("+ r_id + ", " + "\"delete\", "+ d_id + ")'/></td>");
							out.print("<td><input class='delete-button' type='button' value='accept' onclick='submitter("+ r_id + ", " + "\"yes\", "+ d_id + ")'/></td><td><input class='delete-button' type='button' value='deny' onclick='submitter("+ r_id + ", " + "\"no\", "+ d_id + ")'/></td>");
							out.print("</tr>");
							
							
							// if a driver accept the request, will print another row,
							// shows the driver's email and rate
							
							String driver_email = result.getString("driver_email").toString();
							Statement new_stmt = con.createStatement();
							String getUser = "select * from end_user e where e.ru_email='" + driver_email +"'";
							ResultSet driver_result = new_stmt.executeQuery(getUser);
							
							if(driver_result.next()){
								int d_rate = driver_result.getInt("rate");
								String d_email = driver_result.getString("ru_email");
								out.print("<tr><td>Driver email: "+driver_email+"</td><td> driver rate: "+d_rate+"</td></tr>");
							}
						}
						
						
						
					}
					out.print("</table>");
					out.print("</form>");
				}
			    //close the connection.
				con.close();

			} catch (Exception e) {
			}
		%>
	<p class="message">Go back? <a href="passengerHomePage.jsp">Go back</a></p>
	</div>

</body>
</html>