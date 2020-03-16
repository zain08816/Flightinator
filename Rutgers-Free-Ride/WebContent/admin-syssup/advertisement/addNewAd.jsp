<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="refresh" content="30" />
<title>add an ad</title>
<link rel="stylesheet" type="text/css" href="../css/driverWaitingPage.css">
<link rel="stylesheet" type="text/css" href="../css/login.css">

</head>
<body>

<%
	
	String ad_title = request.getParameter("ad_title");
	String ad_content = request.getParameter("ad_content");
	String ad_company = request.getParameter("ad_company");
	String ad_time = request.getParameter("ad_time");
	String ad_order = request.getParameter("ad_order");
	
	
	try{										
		String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection(url, "bbq", "12345678");
		Statement stmt = con.createStatement();
			
		long id_nbr = (long) Math.floor(Math.random() * 9000000000L) + 1000000000L;
		String ad_id = Long.toString(id_nbr);
		String insert = "insert into advertisement (ad_id, ad_title, ad_content, ad_company, ad_timeLength, ad_order) values ('"+ad_id+"', '"+ad_title+"', '"+ad_content+"', '"+ad_company+"', "+ad_time+", "+ad_order+")";
		stmt.executeUpdate(insert);
		con.close();	
	}catch(Exception e){
		out.println("Failed(in cancelOffer.jsp)");
	}
%>
	<script> 
		alert("Success! New advertisement has been added!");
		window.location.href = "../systemSupport.jsp";
	</script>
</body>
</html>