package com.ecommerce.demo.service;

import com.ecommerce.demo.controller.AuthController;
import com.ecommerce.demo.entity.Role;
import com.ecommerce.demo.entity.User;
import com.ecommerce.demo.repo.RoleRepository;
import com.ecommerce.demo.repo.UserRepository;
import com.ecommerce.demo.util.RoleScopes;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerUser(AuthController.LoginRequest loginRequest){
        LOGGER.info("Register user: {}", loginRequest);
        String roleName = "ROLE_" + loginRequest.role().getValue().toUpperCase();
        
        Role role = roleRepository.findByName(roleName)
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName(roleName);
                    newRole.setScopes(RoleScopes.getScopesForRole(loginRequest.role().getValue()));
                    return roleRepository.save(newRole);
                });
        
        User user = new User();
        user.setUsername(loginRequest.username());
        user.setPassword(passwordEncoder.encode(loginRequest.password()));
        user.setRole(role);
        userRepository.save(user);
        LOGGER.info("User created");
    }

}
