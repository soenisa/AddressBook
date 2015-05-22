package DB;

import java.sql.*;

public class SQLiteHelper {
	
	 private static Connection c = null;
	
	public static void connectDB() {
		    try {
		      Class.forName("org.sqlite.JDBC");
		      c = DriverManager.getConnection("jdbc:sqlite:addressBook.db");
		    } catch ( Exception e ) {
		      System.err.println( e.getClass().getName() + ": " + e.getMessage() );
		      System.exit(0);
		    }
		    System.out.println("Opened database successfully");
	}
	
	public static void disconnectDB() {
		try {
			c.close();
		} catch (Exception e) {
			System.err.println(e.getClass().getName() + ":" + e.getMessage());
			System.exit(0);
		}
		
	}
	
	public static void createTable(String tableName) {
		 Statement stmt = null;
		 try {
			 stmt = c.createStatement();
		      String sql = "CREATE TABLE "+ tableName.toUpperCase() + " " +
		                   "(ID INTEGER PRIMARY KEY," +
		                   " FNAME           TEXT    NOT NULL, " + 
		                   " LNAME            TEXT     NOT NULL, " + 
		                   " PHONENUM        INT)"; 
		      stmt.executeUpdate(sql);
		      stmt.close();
		 } catch ( Exception e ) {
		      System.err.println( e.getClass().getName() + ": " + e.getMessage() );
		      System.exit(0);
		    }
		    System.out.println("Table created successfully");
	}
	
	
	public static void insertContact(String fname, String lname, int phonenum) {
		 try {
			 PreparedStatement pstmt = c.prepareStatement("INSERT INTO CONTACTS "
					 									+ "(FNAME, LNAME, PHONENUM) VALUES(?,?,?)");
			 pstmt.setString(1, fname);
			 pstmt.setString(2, lname);
			 pstmt.setInt(3, phonenum);
		     pstmt.executeUpdate();
		     pstmt.close();
		 } catch ( Exception e ) {
		      System.err.println( e.getClass().getName() + ": " + e.getMessage() );
		      System.exit(0);
		    }
		    System.out.println("Table created successfully");
	}

}
