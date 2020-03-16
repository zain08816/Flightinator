<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ page import="java.text.*, java.util.Date, java.util.Enumeration" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="../css/driverWaitingPage.css">
<link rel="stylesheet" type="text/css" href="../css/login.css">
<title>Offers I provided </title>
</head>
<body>
<%
try{
	String filter = request.getParameter("filter");
	
	if(filter == null || filter.equals("3")) filter = "all";
	System.out.println(filter);
	String your_email = session.getAttribute("user_email").toString();
	//Create a connection string
	String url = "jdbc:mysql://cs336project.crnaoqpbquqk.us-east-1.rds.amazonaws.com:3306/cs336project";
	//Load JDBC driver - the interface standardizing the connection procedure. Look at WEB-INF\lib for a mysql connector jar file, otherwise it fails.
	Class.forName("com.mysql.jdbc.Driver");

	//Create a connection to your DB
	Connection con = DriverManager.getConnection(url, "bbq", "12345678");
	
	//Create a SQL statement
	Statement stmt = con.createStatement();
	String tableTitle = "<caption> Offer History:</caption>";
	
	String select = "<p>filter: </p>"
		+ "<select name=\"filter\" size=1 >"    			 
		+ "<option value=\"1\">by month (past month)</option>"
		+ "<option value=\"2\">by semester(past semester)</option>"
		+ "<option value=\"3\">all</option>"
		+ "</select>"
		+ "<button>submit</button>";
	String rowHeader =  "<div style=\"overflow-x:auto;\"><form class=\"filter-form\" method=\"post\" action=\"offerHistory.jsp\"><table class = \'center\''>"
			 + " <col span=\"3\" class=\"wide\">"  
			 + tableTitle
			 + "<br/>" + "<br/>" + "<br/>"
			 +select
			 + "<tr><th>departure_location</th><th>destination</th><th>finish time</th><th>Number of Passengers</th></tr>";
	out.print(rowHeader);
	String getRides = "";
	String getInt = "";
	int total = 0;
	
	TimeZone.setDefault(TimeZone.getTimeZone("EST"));
	DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	Calendar calobj = Calendar.getInstance();
	String now = df.format(calobj.getTime());
	
	
	
	if(filter.equals("1")){
		int month = Integer.parseInt(now.substring(5,7)) - 1;
		String newTime = now.substring(0,5) + Integer.toString(month) + now.substring(7);
		System.out.println(newTime);
		 getRides = "SELECT DISTINCT * "
					+ "FROM finished_ride_info "
					+ String.format("WHERE driver_email = '%s' and finish_time > '%s'",your_email, newTime);
		 getInt = "SELECT DISTINCT COUNT(*) AS num "
					+ "FROM finished_ride_info "
					+ String.format("WHERE driver_email = '%s' and finish_time > '%s'",your_email, newTime);
	}
	else if(filter.equals("all")){
		
		 getRides = "SELECT DISTINCT * "
					+ "FROM finished_ride_info "
					+ String.format("WHERE driver_email = '%s' ",your_email);
		 getInt = "SELECT DISTINCT COUNT(*) AS num "
					+ "FROM finished_ride_info "
					+ String.format("WHERE driver_email = '%s'",your_email);
	}else if(filter.equals("2")){
		int month = Integer.parseInt(now.substring(5,7));
		int initMonth = 0;
		int endMonth = 0;
		if(month>=9 && month<=12){	//fall semester
			initMonth = 9;
			endMonth = 12;
			
		}else if(month>=1 && month<=5){//spring semester
			initMonth = 1;
			endMonth = 5;
		}else if(month>=6 && month<9){//summer
			initMonth = 6;
			endMonth = 9;			
		}
		String newInitTime = now.substring(0,5) + Integer.toString(initMonth) + now.substring(7);
		String newEndTime = now.substring(0,5) + Integer.toString(endMonth) + now.substring(7);
		 getRides = "SELECT DISTINCT * "
					+ "FROM finished_ride_info "
					+ String.format("WHERE driver_email = '%s' and finish_time > '%s' and finish_time < '%s'",your_email, newInitTime,newEndTime);
		 getInt = "SELECT DISTINCT COUNT(*) AS num "
					+ "FROM finished_ride_info "
					+ String.format("WHERE driver_email = '%s' and finish_time > '%s' and finish_time < '%s'",your_email, newInitTime,newEndTime);
	}
	System.out.println(getRides);
	System.out.println(getInt);
	Statement stmt2 = con.createStatement();
	ResultSet number1 = stmt2.executeQuery(getInt);
	number1.next();
	total = number1.getInt("num");
	
	 ResultSet allRides = stmt.executeQuery(getRides);
		out.print("<p>TOTAL NUMBER OF RIDES COMPLETED(Under current filter condition, As driver): "+ total+ "</p>");
		
		if(allRides != null){
			
			while(allRides.next()){
			String id = allRides.getString("id");
			Statement stmt1 = con.createStatement();
			String findPassengerNumber = "SELECT DISTINCT COUNT(*) AS num "
					+ "FROM finished_ride_people "
					+ String.format("WHERE id = '%s'",id);
			
			ResultSet number = stmt1.executeQuery(findPassengerNumber);
			number.next();
			int num = number.getInt("num");
					
			String departure = allRides.getString("departure_location");
			String destination = allRides.getString("destination_location");
			String time = allRides.getString("finish_time");
			String eachRow = String.format("<tr><td>%s</td><td>%s</td><td>%s</td><td>%d</td></tr>",departure,destination,time,num);
			out.print(eachRow);
			}
		}	
		
	out.print("</table>");

	out.print("<p class=\"message\">Go back? <a href=\"driverHomePage.jsp\">Go back</a></p>");
	out.print("</form></div>");

	
	con.close();		
}catch(Exception e){

	out.print(e.getMessage());
	
}



%>
</body>
</html>