package com.ecommerce.accounts;

import com.ecommerce.accounts.dto.AccountsContactInfoDto;
import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.models.annotations.OpenAPI31;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
@EnableConfigurationProperties(value = {AccountsContactInfoDto.class})
@OpenAPIDefinition(
        info = @Info(
                title="Accounts microservice REST API Documentation",
                description = "Ecommerce Accounts microservice REST API Documentation",
                version = "v1",
                contact = @Contact(
                        name = "Joe",
                        email = "abc@gmail.com",
                        url = "https://www.abc.com"
                ),
                license = @License(
                        name = "Apache 2.0",
                        url = "https://www.abc.com"
                )
        ),
        externalDocs = @ExternalDocumentation(
                description = "Ecommerce Accounts microservice REST API Documentation",
                url = "https://www.abc.com"
        )
)
public class AccountsApplication {

	public static void main(String[] args) {
		SpringApplication.run(AccountsApplication.class, args);
	}

}
