package com.ecommerce.accounts.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Schema(
        name = "Response",
        description = "Schema to hold successful response information"
)
@Data @AllArgsConstructor
public class ResponseDto {

    @Schema(
            description = "status code in the response",
            example = "200"
    )
    private String statusCode;

    @Schema(
            description = "status message in the response",
            example = "Request sent successfully"
    )
    private String statusMsg;
    
}
