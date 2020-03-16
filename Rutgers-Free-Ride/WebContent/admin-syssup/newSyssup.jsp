<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!--Import some libraries that have classes that we need -->
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import=" java.util.regex.Pattern"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Creating new system support ...</title>
</head>
<body>
<link rel="stylesheet" type="text/css" href="../css/login.css">

	<%
	
	//Get parameters from the HTML form at the login.jsp
	String newName = request.getParameter("user_name");
	String newPswd = request.getParameter("password");
	
	
	
	try {

		//Create a connection string
		String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
		//Load JDBC driver - the interface standardizing the connection procedure. Look at WEB-INF\lib for a mysql connector jar file, otherwise it fails.
		Class.forName("com.mysql.jdbc.Driver");

		//Create a connection to your DB
		Connection con = DriverManager.getConnection(url, "bbq", "12345678");

		//Create a SQL statement
		Statement stmt = con.createStatement();
		
		// 1. check empty
		if( newName.equals("") || newPswd.equals("") ){
			System.out.println("empty detected!");
			%> 
			<!-- if error, show the alert and go back to login page --> 
			<script> 
			    alert("Sorry, but all fields must be filled to create a new account.");
			    window.location.href = "admin.jsp";
			</script>
			<%
			//response.sendRedirect("emptyInput.html");
			return;
		}

		// 2. check if name already used
	    String checkNameStr = "SELECT * FROM system_support s WHERE s.user_name='" + newName + "'";
		System.out.println(checkNameStr);

		ResultSet checkNameResult = stmt.executeQuery(checkNameStr);
		if( checkNameResult.next() ){
			System.out.println("user name used!");
			%> 
			<!-- if error, show the alert and go back to login page --> 
			<script> 
			    alert("Sorry, but the user name you entered has been used");
			    window.location.href = "admin.jsp";
			</script>
			<%
			return;
		}
		
		// 3. check the password length
		if( newPswd.length() < 6 ){
			System.out.println("password too short!");
			%> 
			<!-- if error, show the alert and go back to login page --> 
			<script> 
			    alert("Sorry, the password should be at least 6 characters");
			    window.location.href = "admin.jsp";
			</script>
			<%
			return;			
		}
		else if( newPswd.length() > 45 ){
			System.out.println("password too long!");
			%> 
			<!-- if error, show the alert and go back to login page --> 
			<script> 
			    alert("Sorry, the password should be at most 45 characters");
			    window.location.href = "admin.jsp";
			</script>
			<%
			return;			
		}
		
		//Make an insert statement for the Sells table:
		String insert = "INSERT INTO system_support (user_name, password)"
				+ " VALUES (?, ?)";
		//Create a Prepared SQL statement allowing you to introduce the parameters of the query
		PreparedStatement ps = con.prepareStatement(insert);
		System.out.println(insert);

		//Add parameters of the query. Start with 1, the 0-parameter is the INSERT statement itself
		ps.setString(1, newName);
		ps.setString(2, newPswd);
		//Run the query against the DB
		
		ps.executeUpdate();

		//Close the connection. Don't forget to do it, otherwise you're keeping the resources of the server allocated.
		con.close();


		//out.print("new user has been created!");

		%>
		<script> 
		    alert("Great! New system support account has been created!");
	    	window.location.href = "admin.jsp";
		</script>
		<%
	} catch (Exception ex) {
		System.out.println("insert error");
		%> 
		<!-- if error, show the alert and go back to login page --> 
		<script> 
		    alert("Sorry, something went wrong on our server, failed to create your account");
		    window.location.href = "admin.jsp";
		</script>
		<%
		return;
	}
%>
</body>
</html>