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
<link rel="stylesheet" type="text/css" href="../../css/login.css">

</head>
<body>

<%
	
	String a_id = request.getParameter("ad_id");
	
	String op = request.getParameter("operation");

	//out.print(a_id);
	
	try{										
		String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection(url, "bbq", "12345678");
		Statement stmt = con.createStatement();
		
		if(op.equals('1')){
			String delete = "delete from advertisement where ad_id='" + a_id + "'";
			stmt.executeUpdate(delete);
			
			%>
			<script> 
			alert("Success! The advertisement has been deleted!");
			window.location.href = "../systemSupport.jsp";
			</script>
			<%
		}
		
		else{
			
			String select = "select * from advertisement where ad_id ='" + a_id +"'";
			ResultSet res = stmt.executeQuery(select);
			
			int priority = 0;
			int time_length = 0;
			
			String ad_name = "";
			
			if(res.next()){
				priority = res.getInt("ad_order");
				time_length = res.getInt("ad_timeLength");
				
				ad_name = res.getString("ad_title");
			}
			
			int totalRides = 0;
			select = "select count(*) as total from finished_ride_info";
			res = stmt.executeQuery(select);
			if(res.next()){
				totalRides = res.getInt("total");
			}
			// calculate total times of all rideing, 
			// we assume that all advertisements are played in turn
			// so just use total ride time divided by all advertisement's time 
			// is able to calculate how many times each ad been played
			int total_time = totalRides * 600;
			
			int total_ad_time = 0;
			select = "select sum(a.ad_timeLength) as total from advertisement a";
			res = stmt.executeQuery(select);
			if(res.next()){
				total_ad_time = res.getInt("total");
			}
			
			int play_time = total_time / total_ad_time;
			
			out.print("<div class='form'>");
			
			out.print( "the total play times for advertisement: " + ad_name);
			out.print("<br/><br/>");

			out.println(Integer.toString(play_time));

			out.print("	<p class=\"message\">For go back please <a href=\"../systemSupport.jsp\">click here</a></p></div>");
			
			
			
		}
		
		con.close();
		
	}catch(Exception e){
		out.println("Failed(in deleteAd.jsp)");
	}
	//session.setAttribute("offer_id", "null");	
%>

</body>
</html>