package com.seonbi.api.controller;

import com.seonbi.api.model.ProductDto;
import com.seonbi.api.model.ReceiverProductDto;
import com.seonbi.api.model.RecommendReceiverDto;
import com.seonbi.api.request.GiveFriendProductReq;
import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.response.ProductAllRes;
import com.seonbi.api.response.ReceiverProductAllRes;
import com.seonbi.api.response.RecommendReceiverAllRes;
import com.seonbi.api.service.*;
import com.seonbi.db.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequestMapping("/api/shop")
public class ShopController {

    @Autowired
    MemberService memberService;

    @Autowired
    MemberAuthService memberAuthService;

    @Autowired
    RecommendService recommendService;

    @Autowired
    ReceiverService receiverService;

    @Autowired
    WishlistService wishlistService;

    @Autowired
    ProductService productService;

    @GetMapping()
    public ResponseEntity<? extends BaseResponseBody> getProductAll(){
        List<ProductDto> productDtoList=productService.getProductAll();

        return ResponseEntity.status(200).body(ProductAllRes.of(200, "success", productDtoList));
    }

    @PostMapping()
    public ResponseEntity<? extends BaseResponseBody> addGiveProduct(
            @RequestBody GiveFriendProductReq giveProductReq, @ApiIgnore Authentication authentication){

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));
        }

        int addGiveProductCode=recommendService.addGiveProduct(member.getMemberId(), giveProductReq.getFriendId(), giveProductReq.getProductId());
        if (addGiveProductCode==401)    return ResponseEntity.status(401).body(BaseResponseBody.of(401, "유효하지 않은 사용자입니다."));
        if (addGiveProductCode==403)    return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<? extends BaseResponseBody> addWishProduct(
            @PathVariable Long productId, @ApiIgnore Authentication authentication){

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));
        }

        wishlistService.addWishlist(member.getMemberId(), productId);
        return ResponseEntity.status(200).body(ReceiverProductAllRes.of(200, "success"));
    }


}
