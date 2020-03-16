<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ page import="java.util.Date"%>

<!DOCTYPE html >
<html>
<head>
<link rel="stylesheet" type="text/css" href="../../css/login.css">

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Running statistics</title>

</head>
<body>
	<%

		String user_email = request.getParameter("user_name");
		
		
	
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
			
			String query= "select count(*) as total from finished_ride_people where passenger_email='" + user_email + "'";
			//String str = "SELECT * FROM end_user";
			
			int matchedNbr = 0;
			
			ResultSet res = stmt.executeQuery(query);
			
			if(res.next()){
				matchedNbr = res.getInt("total");
			}
			
			con.close();
			
			out.print("<div class='form'>");
			
			out.print( "the total rides for user: " + user_email);
			out.print("<br/><br/>");

			out.println(matchedNbr);

			out.print("	<p class=\"message\">For go back please <a href=\"../admin.jsp\">click here</a></p></div>");
			
		} catch (Exception e) {
			out.print("failed");
		}
	%>

	

	
</body>
</html>