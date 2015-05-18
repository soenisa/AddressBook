package elemClass;
import java.util.Scanner;
import java.util.ArrayList;
import elemClass.Contact;

public class Console {
	
	public static void main(String args[]) {
		
		Scanner scanIn = new Scanner(System.in);
		String userIn;
		ArrayList<Contact> contacts = new ArrayList<Contact>();
		boolean exit = true;
		
		
		while(exit == false) {
			System.out.println("Enter a command:");
			userIn = scanIn.next();
			
			if(userIn.lowercase().equals("createcontact")) {
				Contact temp = new Contact();
				contacts.add(temp);
				System.out.println("First name:");
				temp.setFirstName(scanIn.next());
				System.out.println("Last name:");
				temp.setLastName(scanIn.next());
				System.out.println("Phone Number:");
				temp.setPhoneNum(scanIn.next().parseInt());
				System.out.println("Contact Created!");
			} else if(userIn.lowercase().equals("exit")) {
				exit = false;
			} else {
				System.out.println("That command is not recognized :(");
			}
		}
	}
	
}
