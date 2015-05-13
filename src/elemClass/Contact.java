package elemClass;

public class Contact {
	
	public String firstName;
	public String lastName;
	public int phoneNum;
	
	public Contact(String firstName, String lastName, int phoneNum) {
		
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNum = phoneNum;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public int getPhoneNum() {
		return phoneNum;
	}
	public void setPhoneNum(int phoneNum) {
		this.phoneNum = phoneNum;
	}
}
