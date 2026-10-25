package com.ecommerce.demo.service;

import com.ecommerce.demo.entity.User;
import com.ecommerce.demo.repo.RoleRepository;
import com.ecommerce.demo.repo.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerUserDetailService implements UserDetailsService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CustomerUserDetailService.class);

    private final UserRepository userRepository;
//    private final RoleRepository roleRepository;

    public CustomerUserDetailService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LOGGER.info("Entering loadUserByUsername");
        LOGGER.info("Input: {}", username);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));

        List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority(user.getRole().getName()));

        user.getRole().getScopes().forEach(scope ->
                authorityList.add(new SimpleGrantedAuthority(scope)));

        LOGGER.info("Exiting loadUserByUsername");
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities(authorityList)
                .build();
    }
}
