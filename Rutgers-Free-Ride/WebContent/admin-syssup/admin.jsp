<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="../css/admin.css">
<link rel="stylesheet" type="text/css" href="../css/timepicki.css">
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
<title>Administrator</title>

<script src="js/jquery.min.js"></script>
<script src="js/timepicki.js"></script>
<script src="js/bootstrap.min.js"></script> 

<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">

<script>
function submitter(btn) {
    var param = btn.parentElement.parentElement.id;
    var myForm = document.forms["syssupForm"];
    myForm.elements["param"].value = param;
    myForm.submit();
}
</script>

  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="/resources/demos/style.css">
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  
  <script>
  $( function() {
    $( "#datepicker1" ).datepicker();
  } );
  </script>
  
  <script>
  $( function() {
    $( "#datepicker2" ).datepicker();
  } );
  </script>
  
  <script>
  $(function(){
	    $('#timepicker1').timepicker({
	        timeFormat: 'h:mm p',
	        interval: 60,
	        minTime: '1',
	        maxTime: '11:00pm',
	        defaultTime: '7',
	        startTime: '7:00',
	        dynamic: false,
	        dropdown: true,
	        scrollbar: true
	    });
  });
  </script>
  
  <script>
  $(function(){
	    $('#timepicker2').timepicker({
	        timeFormat: 'h:mm p',
	        interval: 60,
	        minTime: '7',
	        maxTime: '12:00pm',
	        defaultTime: '12:00pm',
	        startTime: '7:00',
	        dynamic: false,
	        dropdown: true,
	        scrollbar: true
	    });
  });
  </script>
  
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

<script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>

	<%
		if(session.getAttribute("user_type")==null){
	    	%><script>
    			alert("admin authority check failed!");
    			window.location.href = "../login.jsp";
    		</script>
    		<%
		}
		else if(session.getAttribute("user_type").toString()=="admin"){
			String user_name = session.getAttribute("user_name").toString();
			if( user_name.equals("admin")){
				out.print( "<p class='header' > welcome : " + user_name + "</p>");
			}
			else{
	    		%>
	    		<script>
	    			alert("admin authority check failed!");
	    			window.location.href = "../login.jsp";
	    		</script>
	    		<%
			}
		}
	%>

	<a href="asLogin.jsp" >
         <p class="sub2-header">log out</p>
    </a>
    	
	<div class="createsyssup">
		<p class='sub-header' >create new system support</p>

	    <form class="register-form" method="post" action="newSyssup.jsp">
      
	      	<input type="text" placeholder="account name" name="user_name"/>
	      
	      	<input type="password" placeholder="password" name="password"/>
	
	      	<button>create</button>
      
    	</form>
    	
		<p class='sub-header' >current system supports</p>
		<%
			try {

			String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
			//Load JDBC driver - the interface standardizing the connection procedure. Look at WEB-INF\lib for a mysql connector jar file, otherwise it fails.
			Class.forName("com.mysql.jdbc.Driver");

			//Create a connection to your DB
			Connection con = DriverManager.getConnection(url, "bbq", "12345678");
			
			//Create a SQL statement
			Statement stmt = con.createStatement();
			
			//Make a SELECT query from the sells table with the price range specified by the 'price' parameter at the HelloWorld.jsp
			String str = "SELECT * FROM system_support";
			//Run the query against the database.
			ResultSet result = stmt.executeQuery(str);

			//Make an HTML table to show the results in:
			out.print("<form action='deleteSyssup.jsp' id='syssupForm'>");
			out.print("<input type='hidden' name='param' />");
			out.print("<table id='syssup-table'>");
			
			//parse out the results
			int rowId = 0;
			while (result.next()) {
				//make a row
				out.print("<tr id='" + result.getString("user_name") + "'>");
				//make a column
				out.print("<td>");
				//Print out current bar name:
				out.print(result.getString("user_name"));
				out.print("</td>");
				out.print("<td><input class='delete-button' type='button' value='delete' onclick='submitter(this)'/></td>");
				out.print("</tr>");
				rowId ++;
			}
			out.print("</table>");
			out.print("</form>");
			//close the connection.
			con.close();

		} catch (Exception e) {
		}
		%>
	
	</div>
	
	<div class="statistics">
	
		<p class='sub-header' >run statistics</p>
	
			
			<p class="sub2-header"> 1.  total rides made by date and time </p>
				<p> select a time range </p>
				<form class="ride-statistics" method="post" action="adminStatistics/showRidesByDate.jsp">
					<p>From Date: <input type="text" id="datepicker1" name="start_date"></p>
					
					<p>To   Date: <input type="text" id="datepicker2" name="end_date"></p>
					
			   		<p>From Time: <input type="text" name="start_time" id="timepicker1"/></p>	
			   			   		
			   		<p>To   Time: <input type="text" name="end_time" id="timepicker2"/></p>
			   		
			   		<input type="submit" value="Show result">
					
			</form>
	
			<br /><br />
			
			<form class="ride-statistics" method="post" action="adminStatistics/showRidesByUser.jsp">
			<p class="sub2-header"> 2.  total rides made by user </p>
				<p> input the user e-mail </p>
					<input type="text" name="user_name">	
			   		<input type="submit" value="Show result">
					
			</form>
			
			<br /><br />
			
			<form class="ride-statistics" method="post" action="adminStatistics/showRidesByLocation.jsp">
			<p class="sub2-header"> 3.  total rides made by location </p>
				<p> input the locations </p>
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
					<input type="submit" value="Show result">
			</form>
	<br /><br />
	</div>

</body>
</html>