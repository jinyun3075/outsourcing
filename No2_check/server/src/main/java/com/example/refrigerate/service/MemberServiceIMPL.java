package com.example.refrigerate.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.refrigerate.domain.Member.dto.MemberDTO;
import com.example.refrigerate.domain.Member.entity.Member;
import com.example.refrigerate.domain.Member.repository.MemberRepository;
import com.example.refrigerate.service.construct.MemberService;
import com.example.refrigerate.util.exception.ServiceExceptionCheck;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceIMPL extends ServiceExceptionCheck implements MemberService{

    public final MemberRepository memberRepository;
    @Override
    public MemberDTO insertUser(MemberDTO dto) throws Exception{
        Optional<Member> entity = memberRepository.findByUserid(dto.getUser_id());
        
        if(dto.getUser_id().equals(dto.getUser_nm()) ){
            Member res = memberRepository.save(dtoToEntity(dto));
            return entityToDto(res);
        }else if(entity.isPresent()){
            return entityToDto(entity.get());

        }else {
            checkInsertUserDTO(dto);
            Member res = memberRepository.save(dtoToEntity(dto));
            return entityToDto(res);
        }
    }
    
    @Override
    public String checkUser(String strCheck) throws Exception {
        String type = strCheck.split("\\^")[0];
        String key = strCheck.split("\\^")[1];
        Optional<Member> entity = null;

        if(type.equals("ID")){
            entity = memberRepository.findByUserid(key);

        }else if(type.equals("NICK")){
            entity = memberRepository.findByName(key);
        }else {
            entity = memberRepository.findByEmail(key);
        }

        checkUserEntity(entity);
        return "true";
    }

    @Override
    public MemberDTO selectUser(MemberDTO dto) throws Exception {
        Optional<Member> entity = memberRepository.findByUserid(dto.getUser_id());
        checkUserEntity(entity);
        checkLogin(dto.getUser_pw(), entity);
        return entityToDto(entity.get());
    }

    @Override
    public MemberDTO updateUser(Long member_id, String image) throws Exception {
        memberRepository.updateImage(member_id, image);
        Optional<Member> entity = memberRepository.findById(member_id);
        return entityToDto(entity.get());
    }
}
