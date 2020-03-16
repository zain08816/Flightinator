<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta charset="UTF-8">

<link rel="stylesheet" type="text/css" href="../css/timepicki.css">
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="../css/login.css">


<script src="js/jquery.min.js"></script>
<script src="js/timepicki.js"></script>
<script src="js/bootstrap.min.js"></script> 



<title>Post an offer</title>
	
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
	
	<div class="Interaction-page">
	
	<br/><br/><br/>
  	
  		<div class="form">
  			<p class="message-red">Post Offer </p>
  		
   			 <form class="post-request-form" method="post" action="storeOfferInfo.jsp">
      
      		 	<p>Departure location: </p>
      			<select name="departure_location" size=1 >
      			<% 
      				for (int i=0; i<locations.length; i++){
      					out.print("<option value=\"" + Integer.toString(i) + "\">" + locations[i] + "</option>");		
      				}
      			%>
				</select>
      			 
      			<p>Destination location: </p>
      			<select name="destination_location" size=1 >
      			<% 
      				for (int i=0; i<locations.length; i++){
      					out.print("<option value=\"" + Integer.toString(i) + "\">" + locations[i] + "</option>");	
      				}
      			%>
				</select>
      			
      			<p>Departure time: </p> 
      			<input type="text" placeholder="00:00 PM" name="departure_time" id="timepicker1"/>
					<script>
					    $('#timepicker1').timepicki({increase_direction:'up'});
					</script>
      			 
      			<p>Passenger number: </p>
      			<select name="max_passenger" size=1 >
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				    <option value="4">4</option>
				</select>
				
				<p>Set as recurring request: </p>
      			<select name="recurring" size=1 >      			 
					<option value="1">No</option>
					<option value="2">Yes</option>
				</select>
      			
      			<%
      				String user_email = session.getAttribute("user_email").toString();
      				
      				try{										
    					String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
    					Class.forName("com.mysql.jdbc.Driver");
    					Connection con = DriverManager.getConnection(url, "bbq", "12345678");
    					Statement stmt = con.createStatement();
    				
    					String getCarStr = "select * from car where owner='" + user_email + "'";
    					ResultSet result = stmt.executeQuery(getCarStr);
    					if(!result.next()){
    						out.print("<p class=\"message\">You have no saved car info, please add a car <a href=\"car/addCar.jsp\">at here</a></p>");
    						return;
    					}
    					else{
    						out.print("<p>Select a car: </p>");
    						out.print("<select name=\"car\" size=1>");

    						result = stmt.executeQuery(getCarStr);
    						int i = 1;
    						while(result.next()){
    							String car = result.getString("make") +" - "+ result.getString("plate_number");
    							out.print("<option value=" + result.getString("plate_number") + ">" + car + "</option>");
    							i ++;
    						}
    						out.print("</select>");
    						
    					}
      				}catch(Exception e){
						out.println("Failed(in postOffer.jsp)");
					}
      			%>
      			 
      			<br /><br />
        		<button>submit</button>
      
      			<p class="message">Go back? <a href="driverHomePage.jsp">Go back</a></p>
    		</form>
    
  </div>

</div>
</body>
</html>