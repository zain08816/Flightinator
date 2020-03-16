<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css" href="../css/login.css">

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<%

		try {
			//Create a connection string
			String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
			//Load JDBC driver - the interface standardizing the connection procedure. Look at WEB-INF\lib for a mysql connector jar file, otherwise it fails.
			Class.forName("com.mysql.jdbc.Driver");

			//Create a connection to your DB
			Connection con = DriverManager.getConnection(url, "bbq", "12345678");
			
			//Create a SQL statement
			Statement stmt = con.createStatement();
			//Get the combobox from the HelloWorld.jsp
			
			//Get parameters from the HTML form at the login.jsp
		    String newName = request.getParameter("user_name");
		    String newPswd = request.getParameter("password");
		    
		    //if it is an admin
		    if((newName.equals("admin"))&&(newPswd.equals("admin"))){
		    	session.setAttribute("user_name", "admin");
		    	session.setAttribute("user_type", "admin");
		    	%><script>
		    	window.location.href = "admin.jsp";
		    	</script>
		    	<%
		    	return;
		    }
		    
			if ((newName.equals(""))||(newPswd.equals(""))){
				%>
				<script> 
				    alert("Please enter your account name and password");
				    window.location.href = "asLogin.jsp";
				</script>
				<% 
			} else {
				String str = "SELECT * FROM system_support s WHERE s.user_name='" + newName + "' and s.password='" + newPswd + "'";
	
				//Run the query against the database.
				ResultSet result = stmt.executeQuery(str);
				System.out.println(str);
	
				if (result.next()) {
					//out.print("login success! Welcome: ");
					//out.print(result.getString("user_name"));
					
					session.setAttribute("user_name", result.getString("user_name"));
					session.setAttribute("user_type", "syssup");
					//session.setAttribute("user_email", newEmail);
					%>
					<script> 
					    //alert("login success!");
				    	window.location.href = "systemSupport.jsp";
					</script>
					<%
					
					//close the connection.
				} else {
					out.print("Login error");
					%>
					<script> 
				    	alert("User and password mismatch, please enter a valid email and password");
				    	window.location.href = "asLogin.jsp";
					</script>
					<%
				}
			}
			con.close();

		} catch (Exception e) {
			out.print("failed");
		}
	%>

</body>
</html>