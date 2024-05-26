package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Manager;
import za.ac.cput.repository.ManagerRepository;
import za.ac.cput.service.IManagerService;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public  class ManagerService implements IManagerService {
    private ManagerRepository managerRepository;

    @Autowired
    ManagerService(ManagerRepository managerRepository){
        this.managerRepository = managerRepository;
    }
    @Override
    public Manager create (Manager manager){
        return managerRepository.save( manager);
    }
    @Override
    public Manager read(String EmployeeNumber){
        return this.managerRepository.findById(Integer.valueOf(EmployeeNumber)).orElse(null);

    }
    @Override
    public Manager update(Manager manager){
        return managerRepository.save(manager);
    }
    @Override
    public void delete(String EmplyoeeNumber){
        managerRepository.deleteById(Integer.valueOf(EmplyoeeNumber));
    }
    @Override
    public Set<Manager> getAll(){
        return managerRepository.findAll().stream().collect(Collectors.toSet());
    }
}
