package com.demo.ecommerce.service;

import com.demo.ecommerce.controller.AuthController;
import com.demo.ecommerce.entity.Role;
import com.demo.ecommerce.entity.User;
import com.demo.ecommerce.repo.RoleRepository;
import com.demo.ecommerce.repo.UserRepository;
import com.demo.ecommerce.util.RoleScopes;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepo, RoleRepository roleRepo, PasswordEncoder passwordEncoder){
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void registerUser(AuthController.LoginRequest loginRequest) {
        LOGGER.info("Register User: {}", loginRequest);

        String roleName = "ROLE_" + loginRequest.role().getValue().toUpperCase();

        Role role = roleRepo.findByName(roleName)
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName(roleName);
                    // Dynamically map scopes based on the incoming role string
                    newRole.setScopes(RoleScopes.getScopesForRole(loginRequest.role().getValue()));
                    return roleRepo.save(newRole);
                });

        User user = new User();
        user.setUsername(loginRequest.username());
        user.setPassowrd(passwordEncoder.encode(loginRequest.password()));
        user.setRole(role);
        userRepo.save(user);
        LOGGER.info("User created");
    }

}
