<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="refresh" content="30" />
<title>operating on ad</title>
<link rel="stylesheet" type="text/css" href="../../css/driverWaitingPage.css">
<link rel="stylesheet" type="text/css" href="../css/login.css">

</head>
<body>

<%
	
	String user_email = session.getAttribute("user_email").toString();

	//out.print(a_id);
	
	try{										
		String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection(url, "bbq", "12345678");
		Statement stmt = con.createStatement();
		
	
		String select = "select count(*) as total from finished_ride_info where driver_email ='" + user_email +"'";
		ResultSet res = stmt.executeQuery(select);
		
		int totalRides = 0;
		if(res.next()){
			totalRides = res.getInt("total");
		}
		
		int total_money = totalRides * 2;
		
			
		out.print("<div class='form'>");
			
		out.print( "the total rewards you get from advertisement: " + total_money);
		

		out.print("	<p class=\"message\">For go back please <a href=\"driverHomePage.jsp\">click here</a></p></div>");
			
			
			
		
		
		con.close();
		
	}catch(Exception e){
		out.println("Failed(in deleteAd.jsp)");
	}
	//session.setAttribute("offer_id", "null");	
%>

</body>
</html>