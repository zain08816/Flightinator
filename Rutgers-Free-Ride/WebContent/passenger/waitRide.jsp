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
		// ************* this page needs refresh to make sure driver starts the ride
	
		String offer_id = session.getAttribute("offer_id").toString();
		out.print(offer_id);
		try{										
			String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection(url, "bbq", "12345678");
			Statement stmt = con.createStatement();
			
			String check = "select * from ongoing_ride_people where ride_id='" + offer_id + "' and passenger_email='" +session.getAttribute("user_email").toString()+ "'";
			ResultSet result = stmt.executeQuery(check);
			
			if(result.next()){
				out.println("ride started!");
				con.close();
				%>
				<script> 
			    	//alert("User not found, or you entered a wrong password.");
			    	window.location.href = "startRide.jsp";
				</script>
				<%
				return;
			}else{
				out.println("waiting for driver to start the ride");
			}
			
			con.close();
		}
		catch(Exception e){
			
			out.print(e.getMessage());
					
		}
	
	%>


</body>
</html>