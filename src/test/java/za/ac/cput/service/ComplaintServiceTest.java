package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Complaint;
import za.ac.cput.domain.Customer;
import za.ac.cput.repository.ComplaintRepository;
import za.ac.cput.repository.CustomerRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * ComplaintServiceTest.java
 * Service Test class for ComplaintService.
 */
@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest
class ComplaintServiceTest {

    @Autowired
    private ComplaintService complaintService;

    @Autowired
    private CustomerRepository customerRepository;

    private Complaint complaint;
    private Customer customer;

    //@BeforeEach
    void setUp() {
        // Creating a new customer and saving it
        customer = new Customer.Builder()
                .setFirstName("John")
                .setLastName("Doe")
                .setEmail("john.doe@example.com")
                .setCellNo("1234567890")
                .setLicense("ABCD1234")
                .setPassword("securepassword")
                .build();

        customer = customerRepository.save(customer);

        // Creating a complaint associated with the customer
        complaint = new Complaint.Builder()
                .setDescription("Damaged truck")
                .setComplaintDate(LocalDate.now())
                .setStatus("Pending")
                .setCustomer(customer)
                .build();

        // Pass the entire Complaint object
        complaint = complaintService.create(complaint);
        assertNotNull(complaint, "Complaint should be created and not null");
    }


    @Test
    void a_create() {
        // Create a complaint and ensure it was created successfully
        assertNotNull(complaint, "Complaint should not be null after creation");
        assertEquals("Pending", complaint.getStatus(), "Default complaint status should be 'Pending'");
        System.out.println("Created Complaint: " + complaint);
    }

    @Test
    void b_read() {
        // Read the created complaint by ID
        Complaint readComplaint = complaintService.read(complaint.getComplaintId());
        assertNotNull(readComplaint, "Complaint should be present after reading");
        assertEquals(complaint.getComplaintId(), readComplaint.getComplaintId(), "Read complaint ID should match created complaint ID");
        System.out.println("Read Complaint: " + readComplaint);

    }

   /* @Test
    void c_updateStatus() {
        // Update the status of the existing complaint
        String newStatus = "Resolved";
        Complaint updatedComplaint = complaintService.updateComplaintStatus(complaint.getComplaintId(), newStatus);

        assertNotNull(updatedComplaint, "Updated complaint should not be null");
        assertEquals(newStatus, updatedComplaint.getStatus(), "Complaint status should be updated to 'Resolved'");
        System.out.println("Updated Complaint: " + updatedComplaint);
    }*/

    /*@Test
    @Disabled("Test disabled until delete functionality is confirmed to work correctly")
    void e_delete() {
        // Delete the created complaint and verify it no longer exists
        complaintService.delete(complaint.getComplaintId());
        Complaint deletedComplaint = complaintService.read(complaint.getComplaintId());
        assertTrue(deletedComplaint.isEmpty(), "Complaint should not exist after deletion");
        System.out.println("Complaint deleted successfully.");
    }*/

    @Test
    void d_getAll() {
        // Get all complaints and verify that there are complaints present
        List<Complaint> allComplaints = complaintService.getAll();
        assertNotNull(allComplaints, "All complaints list should not be null");
        assertFalse(allComplaints.isEmpty(), "There should be at least one complaint present");
        System.out.println("All Complaints: " + allComplaints);
    }

    @Test
    void f_getComplaintsByCustomerId() {
        // Get all complaints for the specific customer and validate
        List<Complaint> customerComplaints = complaintService.getComplaintsByCustomerId(customer.getCustomerID());
        assertNotNull(customerComplaints, "Customer complaints list should not be null");
        assertFalse(customerComplaints.isEmpty(), "Customer should have at least one complaint");
        System.out.println("Complaints for Customer: " + customerComplaints);
    }
}
