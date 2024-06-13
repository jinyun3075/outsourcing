package com.example.refrigerate.service.construct;

import java.util.List;

import com.example.refrigerate.domain.Member.dto.RefrigerateDTO;

public interface RefrigerateService {
    List<RefrigerateDTO> selectRefrigerate(Long user_id) throws Exception;
}
