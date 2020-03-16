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

<%// <meta http-equiv="refresh" content="10" />%>


<link rel="stylesheet" type="text/css" href="../css/login.css">
<link rel="stylesheet" type="text/css" href="../css/driverWaitingPage.css">
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
		//out.print("<p> Ride started by driver </p>");

		//*** at this point, offer_id has become ride_id, see what's going on at driver side
		//*** you can not check the ride info at table ongoing_ride_info and ongoing_ride_people
		
		String ride_id = session.getAttribute("offer_id").toString();
		//out.println(ride_id);
		
		//Create a connection string
		String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
		//Load JDBC driver - the interface standardizing the connection procedure. Look at WEB-INF\lib for a mysql connector jar file, otherwise it fails.
		Class.forName("com.mysql.jdbc.Driver");

		//Create a connection to your DB
		Connection con = DriverManager.getConnection(url, "bbq", "12345678");
	
		//Create a SQL statement
		Statement stmt = con.createStatement();
		
	    String getList = String.format("SELECT DISTINCT * FROM finished_ride_people WHERE id = '%s'",ride_id);
		System.out.print(getList);
	    ResultSet allPassenger = stmt.executeQuery(getList);
	
		if(allPassenger != null){
			out.print("<p> Ride started by driver </p>");
			while(allPassenger.next()){
				 String your_email = session.getAttribute("user_email").toString();
				 String email = allPassenger.getString("passenger_email");
				 if(!your_email.equals(email)) {
					 continue;
			     }else{
			    
			    	 String rowHeader =  "<div style=\"overflow-x:auto;\"> <form method = 'post' action='storeDriverRate.jsp' id='passengerSubmitRate'>";
						
			    	 String select = "<select name=\"Rate\" size=1 >"
								+ "<option value=\"1\">1</option>"
								+ "<option value=\"2\">2</option>"
								+ "<option value=\"3\">3</option>"
							    + "<option value=\"4\">4</option>"
							    + "<option value=\"5\">5</option>"
							    + "</select>";
					out.print(rowHeader);
			   		out.print("<p> Please rate the driver when Ride is complete:</p>");	
			   		out.print(select);
			   		out.print(String.format("<input type='hidden' name='offer_id'  value = \'%s\'   '/>",ride_id));
			   		
			   		out.print("<button>submit</button>");
			   		out.print("</form>");
			    	out.print("</div>");
			    	 
			     }
			/*	
				String email = allPassenger.getString("passenger_email");
				int rate = Integer.parseInt(request.getParameter(email));
				String updateRow = "UPDATE finished_ride_people " 
						+ String.format("SET rate_To_Driver = %d ",rate)
						+ String.format("WHERE id = '%s' and passenger_email = '%s'",ride_id,email);
				System.out.print(updateRow);
				Statement stmt_rate = con.createStatement();
				stmt_rate.executeUpdate(updateRow);
			*/
			}

		}
	
		out.print("<p class=\"app-name\"> Happy Free Ride </p> ");
		//out.println("to-do: display some advertisement \n");
		
		//out.println("to-do: create a button to finish ride, the ride will then be written into table finished_ride , and users should rate each other");
			String getAd = "select * from advertisement";
			ResultSet adResult = stmt.executeQuery(getAd);
			
			while(adResult.next()){
				String content = adResult.getString("ad_content");
				content = content.substring(17, content.length());
				out.print("<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/"+content +"\" frameborder=\"0\" allowfullscreen></iframe>");
			}
	%>


</body>
</html>