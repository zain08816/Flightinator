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

<title>recurring request</title>

<script>
function submitter(btn) {
    var param = btn.parentElement.parentElement.id;
    var myForm = document.forms["activateRequestForm"];
    myForm.elements["param"].value = param;
    myForm.submit();
}
</script>

</head>
<body>

	<p class="app-name"> recurring requests </p> 
	
	
	<div class="form" class='requestTable'>
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
			
				//Make a SELECT query
				String str = "SELECT * FROM  recurring_request WHERE user_email='" + user_email + "'";
				//Run the query against the database.
				ResultSet result = stmt.executeQuery(str);
	
				
				if(!result.next()){
					out.print("<p class=\"message-red\">there are currently no request</p>");
				}
				else{
					//Make an HTML table to show the results in:
					out.print("<form action='activateRequest.jsp' id='activateRequestForm' >");
					out.print("<input type='hidden' name='param' />");
					out.print("<table id='recurringRequestTable'>");
					
					out.print("<tr><td>Departure location</td><td>Destination location</td><td>Departure time</td><td>Passenger Number</td><td>operation</td></tr>");

					result = stmt.executeQuery(str);
					while (result.next()) {
						//make a row
						out.print("<tr id='" + result.getString("id").toString() + "' >");
						
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
						
						out.print("<td><input class='delete-button' type='button' value='activate' onclick='submitter(this)'/></td>");
						out.print("</tr>");
					
					}
					out.print("</table>");
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