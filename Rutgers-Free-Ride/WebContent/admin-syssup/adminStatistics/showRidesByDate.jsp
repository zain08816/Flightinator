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

		String start_date = request.getParameter("start_date");
		String end_date = request.getParameter("end_date");
		String start_time = request.getParameter("start_time");
		String end_time = request.getParameter("end_time");
		
		int s_date = (Integer.parseInt(start_date.substring(0,2))-1) * 30 + Integer.parseInt(start_date.substring(3,5)) + (Integer.parseInt(start_date.substring(6,10))*365);
		int e_date = (Integer.parseInt(end_date.substring(0,2))-1) * 30 + Integer.parseInt(end_date.substring(3,5)) + (Integer.parseInt(end_date.substring(6,10))*365);
		
		int s_time = 0;
		if(start_time.charAt(6) == 'P'){
			s_time = (Integer.parseInt(start_time.substring(0,2)) + 12)*60 + Integer.parseInt(start_time.substring(3,5)) ;
		}else if(start_time.charAt(5) == 'P'){
			s_time = (Integer.parseInt(start_time.substring(0,1)) + 12)*60 + Integer.parseInt(start_time.substring(2,4)) ;
		}else if(start_time.charAt(6) == 'A'){
			s_time = Integer.parseInt(start_time.substring(0,2))*60 + Integer.parseInt(start_time.substring(3,5)) ;			
		}else{
			s_time = Integer.parseInt(start_time.substring(0,1))*60 + Integer.parseInt(start_time.substring(2,4)) ;
		}
		
		int e_time = 0;
		if(end_time.charAt(6) == 'P'){
			e_time = (Integer.parseInt(end_time.substring(0,2)) + 12)*60 + Integer.parseInt(end_time.substring(3,5)) ;
		}else if(end_time.charAt(5) == 'P'){
			e_time = (Integer.parseInt(end_time.substring(0,1)) + 12)*60 + Integer.parseInt(end_time.substring(2,4)) ;
		}else if(end_time.charAt(6) == 'A'){
			e_time = Integer.parseInt(end_time.substring(0,2))*60 + Integer.parseInt(end_time.substring(3,5)) ;			
		}else{
			e_time = Integer.parseInt(end_time.substring(0,1))*60 + Integer.parseInt(end_time.substring(2,4)) ;
		}
		
		//out.println(s_time);
		//out.println(e_time);
		
		
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
			
			String query= "select * from finished_ride_info";
			//String str = "SELECT * FROM end_user";
			
			int matchedNbr = 0;
			
			ResultSet result = stmt.executeQuery(query);
			while(result.next()){
				if(result.getString("finish_time") != null){
					String date = result.getString("finish_time");
					
					int tmp_date = Integer.parseInt(date.substring(0,4))*365 + (Integer.parseInt(date.substring(5,7))-1)*30 + Integer.parseInt(date.substring(8,10));
					
					int tmp_time = Integer.parseInt(date.substring(11,13))*60 + Integer.parseInt(date.substring(14,16));
					
					if( tmp_date >= s_date && tmp_date <= e_date && tmp_time >= s_time && tmp_time <= e_time){
						matchedNbr += 1;
					}
					
					//out.print(tmp_date);
					//out.print(tmp_time);
				}
			}
			
			con.close();
			
			out.print("<div class='form'>");
			
			out.print( "the total rides between "+ start_date + " and " + end_date);
			out.print("<br/>");
			out.print("while at each day");
			out.print("<br/>");
			out.print("between the time range " + start_time + " to " + end_time + " is:");
			out.print("<br/>");out.print("<br/>");
			out.println(matchedNbr);

			out.print("	<p class=\"message\">For go back please <a href=\"../admin.jsp\">click here</a></p></div>");
			
		} catch (Exception e) {
			out.print("failed");
		}
	%>

	

	
</body>
</html>