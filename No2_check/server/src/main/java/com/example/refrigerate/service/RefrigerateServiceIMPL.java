package com.example.refrigerate.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.example.refrigerate.domain.Member.dto.RefrigerateDTO;
import com.example.refrigerate.domain.Member.entity.Refrigerate;
import com.example.refrigerate.domain.Member.repository.RefigerateRepository;
import com.example.refrigerate.service.construct.RefrigerateService;
import com.example.refrigerate.util.exception.ServiceExceptionCheck;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefrigerateServiceIMPL extends ServiceExceptionCheck implements RefrigerateService  {

    public final RefigerateRepository refigerateRepository;

    @Override
    public List<RefrigerateDTO> selectRefrigerate(Long user_id) throws Exception {
        List<Refrigerate> list = refigerateRepository.findByMemberIdx(user_id);
        return list.stream()
            .map(o -> RefrigerateDTO.builder()
                .member_id(o.getMember().getIdx())
                .recipe_id(o.getRecipe().getIdx()).build()
            ).toList();
    }
    
}
