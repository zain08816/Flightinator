<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css" href="css/login.css">

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Deleting system support</title>
</head>
<body>
<link rel="stylesheet" type="text/css" href="../css/login.css">

	<%
	
	//Get parameters from the HTML form at the login.jsp
	String newName = request.getParameter("param");

	//Create a connection string
	String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
	//Load JDBC driver - the interface standardizing the connection procedure. Look at WEB-INF\lib for a mysql connector jar file, otherwise it fails.
	Class.forName("com.mysql.jdbc.Driver");
	//Create a connection to your DB
	Connection con = null;
    PreparedStatement pst = null;

	try {


		con = DriverManager.getConnection(url, "bbq", "12345678");
		//Create a SQL statement
		Statement stmt = con.createStatement();
		
	
	    String deleteStr = "DELETE FROM system_support WHERE user_name='" + newName + "'";
		System.out.println(deleteStr);
		pst = con.prepareStatement(deleteStr);
        pst.executeUpdate();

		//out.print("new user has been created!");


	} catch (Exception ex) {
		System.out.println("delete error");
		%> 
		<!-- if error, show the alert and go back to admin page --> 
		<script> 
		    alert("Sorry, something went wrong on our server, failed to delete the selected account");
		    window.location.href = "admin.jsp";
		</script>
		<%
		
	}finally{
		System.out.println("finally here");
		%>
		<script> 
		    alert("The system support account: " + newName + " has been deleted!");
	    	window.location.href = "admin.jsp";
		</script>
		<p class="message">The system support account has been deleted! <a href="admin.jsp">Go Back</a></p>
		
		<%
		
		pst.close();
		con.close();
	}
	%>
</body>
</html>