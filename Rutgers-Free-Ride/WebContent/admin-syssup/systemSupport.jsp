<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="../css/admin.css">
<title>system support</title>

<script>
function submitter(ad_id, op) {
    var myForm = document.forms["deleteAdForm"];
    //alert(ad_id);
    myForm.elements["ad_id"].value = ad_id;
    myForm.elements["operation"].value = op;
    myForm.submit();
}
</script>

</head>
<body>

	<%
		if(session.getAttribute("user_type")==null){
	    	%><script>
    			alert("system-support authority check failed!");
    			window.location.href = "../login.jsp";
    		</script>
    		<%
		}
		else{
			String user_type = session.getAttribute("user_type").toString();
			String user_name = session.getAttribute("user_name").toString();
			if( user_type.equals("syssup")){
				out.print( "<p class='header' > welcome : " + user_name + "</p>");
			}
			else{
	    		%>
	    		<script>
	    			alert("system-support authority check failed!");
	    			window.location.href = "../login.jsp";
	    		</script>
	    		<%
			}
		}
	%>
	
	<a href="asLogin.jsp" >
         <p class="sub2-header">log out</p>
    </a>


	<div>
		<p class='sub-header' >Manage advertisement</p>

	    <form class="lock-form" method="post" action="advertisement/addNewAd.jsp">
      		<p class='message'>add a new advertisement</p>
      			<p class="sub2-header"> ad title: <input type="text" placeholder="ad title" name="ad_title"/></p>
     			<p class="sub2-header"> ad content: <input type="text" placeholder="ad content" name="ad_content"/>
     			<p class="sub2-header"> ad company: <input type="text" placeholder="ad company" name="ad_company"/>
     			<p class="sub2-header"> ad time (seconds): <input type="text" placeholder="ad time" name="ad_time"/>
     			<p class="sub2-header"> ad priority: <input type="text" placeholder="ad priority" name="ad_order"/>
      		<br />
      		<button>add</button>
      
    	</form>
    	
    	<p class='message'>Current advertisements</p>
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
			String str = "SELECT * FROM advertisement a ORDER BY a.ad_order";
			//Run the query against the database.
			ResultSet result = stmt.executeQuery(str);

			//Make an HTML table to show the results in:
			out.print("<form action='advertisement/operateAd.jsp' id='deleteAdForm'>");
			out.print("<input type='hidden' name='ad_id' />");
			out.print("<input type='hidden' name='operation' />");
			out.print("<table id='ad-table'>");
			
			out.print("<tr>");
			//make a column
			out.print("<td>ad_title</td>");
			out.print("<td>ad_time</td>");
			out.print("<td>ad_content</td>");
			out.print("<td>ad_company</td>");
			out.print("<td>ad_priority</td>");
			out.print("<td>operation 1</td>");
			out.print("<td>operation 2</td>");
			out.print("</tr>");
			
			//parse out the results
			int rowNbr = 0;
			while (result.next()) {
				//make a row
				out.print("<tr id='" + result.getString("ad_id") + "'>");

				out.print("<td>");
				out.print(result.getString("ad_title"));
				out.print("</td>");
				
				out.print("<td>");
				out.print(result.getInt("ad_timeLength"));
				out.print("</td>");

				out.print("<td>");
				out.print(result.getString("ad_content"));
				out.print("</td>");
				
				out.print("<td>");
				out.print(result.getString("ad_company"));
				out.print("</td>");
				
				out.print("<td>");
				out.print(result.getInt("ad_order"));
				out.print("</td>");
				
				out.print("<td><input class='delete-button' type='button' value='delete' onclick='submitter("+ result.getString("ad_id") + ", 1)'/></td>");
				out.print("<td><input class='report-button' type='button' value='get-report' onclick='submitter("+ result.getString("ad_id") + ", 2)'/></td>");
				
				out.print("</tr>");
				rowNbr ++;
			}
			out.print("</table>");
			out.print("</form>");
			//close the connection.
			con.close();

		} catch (Exception e) {
		}
		%>
    	
	</div>



        
	<div class="lockEndUser">

	
		<p class='sub-header' >Reset password for an end-user</p>

	    <form class="lock-form" method="post" action="resetPasswordEnduser.jsp">
      		<p class="message">input the ru-email of the user you have to lock</p>
      			<input type="text" placeholder="account ru-email" name="ru_email"/>
      			<input type="text" placeholder="account new-password" name="password"/>
      		<button>change</button>
      
    	</form>
	
	


		<p class='sub-header' >Lock an end-user</p>

	    <form class="lock-form" method="post" action="lockEndUser.jsp">
      		<p class="message">input the ru-email of the user you have to lock</p>
      		<input type="text" placeholder="account ru-email" name="ru_email"/>
      
      		<button>lock</button>
      
    	</form>
 
	    <form class="unlock-form" method="post" action="unlockEndUser.jsp">
      		<p class="message">input the ru-email of the user you have to unlock</p>
      		<input type="text" placeholder="account ru-email" name="ru_email"/>
      
      		<button>unlock</button>
      
    	</form>
    	    	
		<p class='sub-header' >current locked users</p>
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
			String str = "SELECT * FROM end_user e WHERE e.locked=1";
			//Run the query against the database.
			ResultSet result = stmt.executeQuery(str);

			//Make an HTML table to show the results in:
			out.print("<form action='unlockEndUser.jsp' id='lockedEndUserForm'>");
			out.print("<input type='hidden' name='param' />");
			out.print("<table id='syssup-table'>");
			
			out.print("<tr>");
			//make a column
			out.print("<td>ru_email</td>");
			out.print("<td>user_name</td>");
			out.print("</tr>");
			
			//parse out the results
			int rowNbr = 0;
			while (result.next() && rowNbr < 10) {
				//make a row
				out.print("<tr id='" + result.getString("ru_email") + "'>");
				//make a column
				out.print("<td>");
				//Print out current bar name:
				out.print(result.getString("ru_email"));
				out.print("</td>");
				out.print("<td>");
				//Print out current bar name:
				out.print(result.getString("user_name"));
				out.print("</td>");
				out.print("</tr>");
				rowNbr ++;
			}
			out.print("</table>");
			out.print("</form>");
			//close the connection.
			con.close();

		} catch (Exception e) {
		}
		%>
	
	</div>
	
	


</body>
</html>