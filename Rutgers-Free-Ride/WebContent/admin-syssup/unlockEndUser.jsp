<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css" href="css/login.css">

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Unlocking an end-user</title>
</head>
<body>
<link rel="stylesheet" type="text/css" href="../css/login.css">

	<%
	
	//Get parameters from the HTML form at the login.jsp
	String newEmail = request.getParameter("ru_email");
	out.print("<p>unlocking account "+newEmail+"</p>");
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
		
		String str = "SELECT * FROM end_user e WHERE e.ru_email='" + newEmail + "'";
		ResultSet result = stmt.executeQuery(str);
		if(!result.next()){
			%>
			<script> 
			    alert("The account email is not found!");
		    	window.location.href = "systemSupport.jsp";
			</script>
			<p class="message">The account not found! <a href="systemSupport.jsp">Go Back</a></p>
			
			<%
			
		}
		else{
		    String updateStr = "UPDATE end_user SET locked=0 WHERE ru_email='" + newEmail + "'";
			System.out.println(updateStr);
			pst = con.prepareStatement(updateStr);
	        pst.executeUpdate();
			pst.close();

			//out.print("new user has been created!");
			%>
			<script> 
			    alert("The account: " + newEmail + " has been unlocked!");
		    	window.location.href = "systemSupport.jsp";
			</script>
			<p class="message">The account has been successfully unlocked! <a href="systemSupport.jsp">Go Back</a></p>
			
			<%
		}
	} catch (Exception ex) {
		System.out.println("unlock error");
		%> 
		<!-- if error, show the alert and go back to admin page --> 
		<script> 
		    alert("Sorry, operation failed! Check again your input");
		    window.location.href = "systemSupport.jsp";
		</script>
		<%
		
	}finally{
		con.close();
	}
	%>
</body>
</html>