<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
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



<title>Post a request</title>
	
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
  			<p class="message-red">Post Request </p>
  		
   			 <form class="post-request-form" method="post" action="storeRequestInfo.jsp">
      
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
      			 
      			<br /><br />
        		<button>submit</button>
      
      			<p class="message">Go back? <a href="passengerHomePage.jsp">Go back</a></p>
    		</form>
    
  </div>

</div>
</body>
</html>