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

	String[] locations = new String[]{  
			"Busch-lot64", "Busch-Lot67", "Busch-Lot65C", "Busch-Lot63", "Busch-Lot51", "Busch-Lot54", "Busch-Lot58",
			"Liv-YellowLot", "Liv-Lot112", "Liv-Lot101", "Liv-Lot105", "Liv-Lot103",
			"C&D-Lot79", "C&D-Lot70", "C&D-Lot97", "C&D-Lot99",	"C&D-Lot80", 
			"CAC-Lot1", "CAC-Lot16", "CAC-Lot11", "CAC-Lot37", "CAC-Deck", "CAC-Lot30"
	};

%>
	<%

		String departure_location = locations[ Integer.parseInt(request.getParameter("departure_location"))];
		String destination_location = locations[ Integer.parseInt(request.getParameter("destination_location"))];
		
		
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
			
			String query= "select count(*) as total from finished_ride_info where departure_location='"+departure_location+"' and destination_location='"+destination_location+"'";
			//String str = "SELECT * FROM end_user";
			
			int matchedNbr = 0;
			
			ResultSet result = stmt.executeQuery(query);
			while(result.next()){
				matchedNbr = result.getInt("total");
			}
			
			con.close();
			
			out.print("<div class='form'>");
			
			out.print( "the total rides that <br /> depart from: "+ departure_location + "<br />go to: " + destination_location);
			out.print("<br/>");
			
			out.print("<br/>");
			
			out.println(matchedNbr);

			out.print("	<p class=\"message\">For go back please <a href=\"../admin.jsp\">click here</a></p></div>");
			
		} catch (Exception e) {
			out.print("failed");
		}
	%>

	

	
</body>
</html>