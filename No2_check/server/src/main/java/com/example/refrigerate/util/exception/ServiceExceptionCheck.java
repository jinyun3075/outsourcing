package com.example.refrigerate.util.exception;

import java.util.Optional;
import java.util.regex.Pattern;

import com.example.refrigerate.domain.Member.dto.MemberDTO;
import com.example.refrigerate.domain.Member.entity.Member;
import com.example.refrigerate.domain.Member.entity.Recipe;

public class ServiceExceptionCheck {
    public void checkRecipeEntity(Optional<Recipe> entity) throws Exception{
        if (!entity.isPresent()) {
            throw new Exception("존재하지 않는 레시피입니다.");
        }
    }
    public void checkUserEntity(Optional<Member> entity) throws Exception {
        if (!entity.isPresent()) {
            throw new Exception("사용가능합니다.");
        }
    }
    public void checkInsertUserDTO(MemberDTO dto) throws Exception {
        if (dto.getUser_nm().equals("") 
            || dto.getUser_id().equals("") 
            || dto.getUser_email().equals("") 
            || dto.getUser_pw().equals("")) {
            throw new Exception("모든 요구사항을 입력해주세요.");
        }

        String passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\\\d)(?=.*[!@#$%^&*])[A-Za-z\\\\d!@#$%^&*]{8,}$";
        if (Pattern.matches(passwordPattern, dto.getUser_pw())) {
            throw new Exception("8자 이상, 영문 대/소문자, 숫자, 특수문자 포함 시켜주세요");
        }

        String emailPattern = "^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-z]+$";
        if (!Pattern.matches(emailPattern, dto.getUser_email())) {
            throw new Exception("이메일 형식이 아닙니다.");
        }
    }
    public void checkLogin(String password, Optional<Member> entity) throws Exception{
        String passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\\\d)(?=.*[!@#$%^&*])[A-Za-z\\\\d!@#$%^&*]{8,}$";
        if(Pattern.matches(passwordPattern, password) && !entity.get().getPwd().equals(password)){
            throw new Exception("비밀번호가 틀립니다.");
        }
    }
}
