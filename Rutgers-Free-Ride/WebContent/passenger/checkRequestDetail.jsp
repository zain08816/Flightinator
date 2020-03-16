<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css" href="../css/login.css">

<meta http-equiv="refresh" content="10" />
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Locking an end-user</title>
</head>
<body>

	<%
	
	//Get parameters from the HTML form at the login.jsp
	String r_id = request.getParameter("request_id");
	String accept = request.getParameter("accept");
	String d_id = request.getParameter("offer_id");
	
	//System.out.print(id);
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
		
		String str = "SELECT * FROM activated_request WHERE id='" + r_id + "'";
		ResultSet result = stmt.executeQuery(str);
		if(!result.next()){
			%>
			<script> 
			    alert("The request is not found!");
		    	window.location.href = "currentActivatedRequest.jsp";
			</script>			
			<%
			
		}
		else{
		    //out.print(" <p>" + id + " </p>");
		    //out.print(" <p>" + accept + " </p>");
		    
		    if(accept.equals("delete")){
		    	String deleteOfferStr = "delete from activated_request where id='" + r_id + "'";
				stmt.executeUpdate(deleteOfferStr);
				
		    	deleteOfferStr = "delete from tmp_ride_match where offer_id='" +d_id+"' and passenger_email='"+session.getAttribute("user_email")+"'";
				stmt.executeUpdate(deleteOfferStr);
		    }
		    
		    else if(accept.equals("yes")){
		    	String update = "update tmp_ride_match set passenger_accept='yes' where offer_id='" +d_id+"' and passenger_email='"+session.getAttribute("user_email")+"'";
		    	stmt.executeUpdate(update);
		    	
		    	session.setAttribute("request_id", d_id);
		    	session.setAttribute("offer_id", d_id);
				%>
				<script> 
			    	//alert("User not found, or you entered a wrong password.");
			    	window.location.href = "waitRide.jsp";
				</script>
				<%
		    }
		    
		    else if(accept.equals("no")){
		    	String update = "delete from tmp_ride_match where offer_id='" +d_id+"' and passenger_email='"+result.getString("user_email")+"'";
		    	stmt.executeUpdate(update);
		    	
		    	update = "update activated_request set driver_email='none', offer_id='none' where id='" + r_id + "'";
		    	stmt.executeUpdate(update);
		    }
		    
		    
		}
	} catch (Exception ex) {
		System.out.println("request find error");
		%> 
		<!-- if error, show the alert and go back to admin page --> 
		<script> 
		    alert("Sorry, operation failed!");
		    window.location.href = "currentActivatedRequest.jsp";
		</script>
		<%
		
	}finally{
		con.close();
		%> 
		<script> 
		    window.location.href = "currentActivatedRequest.jsp";
		</script>
		<%
	}
	%>
</body>
</html>