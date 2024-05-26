package za.ac.cput.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Manager;
import za.ac.cput.service.ManagerService;
import java.util.List;
/**
 * Ayanda Phumzile Khoza (218057172)
 * Date: 25 May 2024
 * */

@RestController
@RequestMapping("/Manager")
public class ManagerController {
    @Autowired
    private ManagerService ManagerService;
    private String Manager;

    @PostMapping("/create")
    public Manager create(@RequestBody Manager Manager){
        return ManagerService.create(Manager);
    }
    @GetMapping("/read/{Manager}")
    public Manager read(@PathVariable int Manager){
        return ManagerService.read(String.valueOf(Manager));
    }
    @DeleteMapping("/delete/{EmployeeNumber}")
    public void delete(@PathVariable int Manager){
        ManagerService.delete(String.valueOf(Manager));
    }
    @PostMapping("/update")
    public Manager update(@RequestBody Manager Manager){
        return ManagerService.update(Manager);
    }
    @GetMapping("/getAll")
    public List<Manager> getAll(){
        return ManagerService.getAll();
    }
}
