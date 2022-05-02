package com.seonbi.api.service;

import com.seonbi.db.repository.ImageRepositorySupport;
import com.seonbi.db.repository.MemberRepositorySupport;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import com.seonbi.api.model.MemberDto;
import com.seonbi.api.request.MemberLoginReq;
import com.seonbi.db.entity.Member;
import com.seonbi.db.repository.MemberRepository;
import com.seonbi.util.JwtTokenProvider;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberRepositorySupport memberRepositorySupport;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    PasswordEncoder passwordEncoder;



    @Override
    public MemberDto getMemberByNickname(String nickname) {
        Member member=memberRepository.findByNicknameAndIsDeleted(nickname, false);
        if (member==null){
            return null;
        }
        return modelMapper.map(member, MemberDto.class);
    }

    @Override
    public MemberDto getMemberByEmail(String email) {
        Member member=memberRepository.findByEmailAndIsDeleted(email, false);
        if (member==null){
            return null;
        }
        return modelMapper.map(member, MemberDto.class);
    }

    @Override
    public MemberDto getMemberByMemberId(Long memberId) {
        Member member=memberRepository.findByMemberIdAndIsDeleted(memberId, false);
        if (member==null){
            return null;
        }
        return modelMapper.map(member, MemberDto.class);
    }

    @Override
    public List<MemberDto> getMemberList() {
        return null;
    }

    @Override
    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

//    @Override
//    public MemberDto memberEntityToDto(Member member) {
//        MemberDto memberDto=new MemberDto();
//
//        return null;
//    }

    @Override
    public void updateMember(Member member) {
        memberRepository.save(member);
    }

    @Override
    public int emailCheck(String email) {
        if(email==null)
            return 401;
        Pattern emailPattern = Pattern.compile("^[0-9a-zA-Z_-]+@[0-9a-zA-Z]+\\.[a-zA-Z]{2,6}$");
        Matcher emailMatcher = emailPattern.matcher(email);
        if(!emailMatcher.find()){        // 유효성 검사
            return 401;
        }
        if (memberRepository.findByEmailAndIsDeleted(email, false)!=null) {      // 중복 검사
            return 402;
        }

        return 200;
    }

    @Override
    public int passwordCheck(String password) {
        if(password == null)
            return 401;
        // 비밀번호 포맷 확인(영문, 숫자포함 8~16자리)
        Pattern passPattern = Pattern.compile("^(?=.*[a-zA-Z])(?=.*\\d).{8,16}$");
        Matcher passMatcher = passPattern.matcher(password);
        if(!passMatcher.find()){
            return 402;
        }
        return 200;
    }

    @Override
    public int nicknameCheck(String nickname) {
        if (nickname.length()<2 || nickname.length()>12){
            return 401;
        }
        if (memberRepository.existsByNicknameAndIsDeleted(nickname, false)){
            return 402;
        }
        return 200;
    }

    @Override
    public int loginCheck(MemberLoginReq memberLoginReq) {
        String email = memberLoginReq.getEmail();
        String password = memberLoginReq.getPassword();
        Member member=memberRepository.findByEmailAndIsDeleted(email, false);
        if (member==null) {
            return 401;
        }

        if (passwordEncoder.matches(password,member.getPassword())) {
            return 200;
        }
        return 402;
    }

    @Override
    public int nicknameCheckExceptMe(String nickname, String curNickname) {
        if (nickname.length()<2 || nickname.length()>12){
            return 401;
        }

        Member member=memberRepository.findByNicknameAndIsDeleted(nickname, false);
        System.out.println(curNickname+" "+member.getNickname());
        if (member==null || curNickname.equals(member.getNickname())){      // 닉네임 중복이 없거나 본인인 경우
            return 200;
        }
        return 402;
    }

    @Override
    public void deleteMember(Long memberId) {
        memberRepositorySupport.deleteMember(memberId);
    }

    @Override
    public String kakaoToken(String code) {
        String restapiKey="946bfa1b0c2ba70a70f6070dba9642d3";
        String access_Token= "";
        String refresh_Token="";
        String requestURL="https://kauth.kakao.com/oauth/token";
        String redirectURI="http://localhost:8080/kakao";

        try {
            URL url=new URL(requestURL);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb=new StringBuilder();

            sb.append("grant_type=authorization_code");
            sb.append("&client_id="+restapiKey);
            sb.append("&redirect_uri="+redirectURI);
            sb.append("&code="+code);
            bw.write(sb.toString());
            bw.flush();


            BufferedReader br=new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line="";
            String result="";

            while((line=br.readLine())!=null)
            {
                result+=line;
            }
            System.out.println("응답값이 잘 넘어오는가?");
            System.out.println(result);
            JSONParser parser = new JSONParser();
            JSONObject element = (JSONObject) parser.parse(result);

            access_Token = element.get("access_token").toString();
            refresh_Token= element.get("refresh_token").toString();


            br.close();
            bw.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("access_token="+access_Token);
        System.out.println("refresh_token="+refresh_Token);
        return access_Token;

    }

    @Override
    public String getKakaoUserInfo(String accessToken) {

        String requestURL="https://kapi.kakao.com/v2/user/me";
        Map<String, String> response = new HashMap<>();
        String email=null;
        String token=null;
        try {
            URL url=new URL(requestURL);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);

            BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            bw.flush();


            BufferedReader br=new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line="";
            String result="";

            while((line=br.readLine())!=null)
            {
                result+=line;
            }

            System.out.println("--------------사용자 정보-----------------------");
            System.out.println(result);
            JSONParser parser = new JSONParser();
            JSONObject element = (JSONObject) parser.parse(result);
            JSONObject kakao_account = (JSONObject) element.get("kakao_account");

            boolean hasEmail = (boolean) kakao_account.get("has_email");


            if(hasEmail) {
                email = kakao_account.get("email").toString();
            }

            response.put("email",email);

            System.out.println("받아온 이메일 정보="+email);

            br.close();
            bw.close();


        } catch (Exception e) {
            e.printStackTrace();
        }


        if(email!=null) //카카오 유저정보로 이메일을 받아옴
        {
            //이미 가입된 회원인지 확인
            Member member = memberRepository.findByEmailAndIsDeletedAndIsKakao(email, false, true);

            if(member==null) // 처음 온 유저라면 db에 저장
            {

                member= new Member();
                member.setEmail(email);
                member.setIsKakao(true);
                memberRepository.save(member);


                System.out.println("----------기본키-------");
                System.out.println(member.getMemberId());
            }

           token=  JwtTokenProvider.getToken(email);
            System.out.println("access token="+token);




        }


      return token;
    }


}