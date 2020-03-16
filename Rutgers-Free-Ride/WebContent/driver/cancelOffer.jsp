<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="refresh" content="30" />
<title>Waiting for passengers</title>
<link rel="stylesheet" type="text/css" href="../css/driverWaitingPage.css">
<link rel="stylesheet" type="text/css" href="../css/login.css">

</head>
<body>

<%
	
	String offer_id = session.getAttribute("offer_id").toString();
	try{										
		String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection(url, "bbq", "12345678");
		Statement stmt = con.createStatement();
			
		String deleteOfferStr = "delete from activated_offer where id='" + offer_id + "'";
		stmt.executeUpdate(deleteOfferStr);
		
		
		String updateRequest = "update activated_request set driver_email='none', offer_id='none' where offer_id='" + offer_id + "'";
		stmt.executeUpdate(updateRequest);
		
		String updateTmpMatch = "delete from tmp_ride_match where offer_id='" +offer_id+ "'";
		stmt.executeUpdate(updateTmpMatch);
		
	}catch(Exception e){
		out.println("Failed(in cancelOffer.jsp)");
	}
	session.setAttribute("offer_id", "null");	
%>
	<script> 
		window.location.href = "driverHomePage.jsp";
	</script>
</body>
</html>