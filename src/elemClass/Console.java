package elemClass;
import java.util.Scanner;
import java.util.ArrayList;
import elemClass.Contact;

public class Console {
	
	public static void main(String args[]) {
		
		Scanner scanIn = new Scanner(System.in);
		String userIn;
		ArrayList<Contact> contacts = new ArrayList<Contact>();
		boolean exit = false;
		
		
		while(exit == false) {
			System.out.println("Enter a command:");
			userIn = scanIn.next();
			
			if(userIn.toLowerCase().equals("createcontact")) {
				Contact temp = new Contact();
				contacts.add(temp);
				System.out.println("First name:");
				temp.setFirstName(scanIn.next());
				System.out.println("Last name:");
				temp.setLastName(scanIn.next());
				System.out.println("Phone Number:");
				temp.setPhoneNum(Integer.parseInt(scanIn.next()));
				System.out.println("Contact Created!");
			} else if(userIn.toLowerCase().equals("getcontact")) {
				System.out.println("What contact?");
				// make a hashmap of all the conacts and map them by first and last names. list all of the same name
			} else if(userIn.toLowerCase().equals("exit")) {
				exit = true;
				System.out.println("Goodbye :'(");
			} else {
				System.out.println("That command is not recognized :(");
			}
		}
	}
	
}
