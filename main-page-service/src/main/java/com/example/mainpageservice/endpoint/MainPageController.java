package com.example.mainpageservice.endpoint;


import com.example.mainpageservice.service.MainPageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/main-page")
@AllArgsConstructor
@Slf4j
public class MainPageController {

    final private MainPageService mainPageService;


    @GetMapping("/{username}")
    ResponseEntity<?> getMainPage(@PathVariable String username) {
        return new ResponseEntity<>(mainPageService.findByUsername(username), HttpStatus.OK);
    }
}
