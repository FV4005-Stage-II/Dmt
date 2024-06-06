package com.example.mainpageservice.endpoint;




import com.example.mainpageservice.model.UserProfile;
import com.example.mainpageservice.repository.UserProfileRepository;
import com.example.mainpageservice.service.MainPageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/main-page")
@AllArgsConstructor
@Slf4j
public class MainPageController {

    final private MainPageService mainPageService;

    @PostMapping("/add-profile")
    public ResponseEntity<String> addProfile(@RequestBody UserProfile userProfile) {
        mainPageService.saveUserProfile(userProfile);
        log.info("addProfile");
        return new ResponseEntity<>("User profile created", HttpStatus.CREATED);
    }


    @GetMapping("/profiles")
    public ResponseEntity<List<UserProfile>> getAllProfiles() {
        List<UserProfile> profiles = mainPageService.getAllProfiles();
        log.info("getAllProfiles");
        return new ResponseEntity<>(profiles, HttpStatus.OK);
    }

    @GetMapping("/profiles/{id}")
    public ResponseEntity<UserProfile> getProfileById(@PathVariable String id) {
        Optional<UserProfile> userProfile = mainPageService.getProfileById(id);
        log.info("getProfileById for id: {}", id);
        return userProfile.map(profile -> new ResponseEntity<>(profile, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/profiles/search")
    public ResponseEntity<List<UserProfile>> searchProfilesByUsername(@RequestParam String username) {
        List<UserProfile> profiles = mainPageService.searchProfilesByUsername(username);
        log.info("searchProfilesByUsername for username: {}", username);
        return new ResponseEntity<>(profiles, HttpStatus.OK);
    }

    @PostMapping("/profiles/by-ids")
    public ResponseEntity<List<UserProfile>> getProfilesByIds(@RequestBody List<String> ids) {
        List<UserProfile> profiles = mainPageService.getProfilesByIds(ids);
        return ResponseEntity.ok(profiles);
    }


//    @GetMapping("/profiles/{id}")
//    public ResponseEntity<UserProfile> getProfileById(@PathVariable String id) {
//        Optional<UserProfile> userProfile = mainPageService.getProfileById(id);
//        log.info("getProfileById for id: {}", id);
//        if (userProfile.isPresent()) {
//            return new ResponseEntity<>(userProfile.get(), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @GetMapping("/profiles/search")
//    public ResponseEntity<List<UserProfile>> searchProfilesByUsername(@RequestParam String username) {
//        List<UserProfile> profiles = mainPageService.searchProfilesByUsername(username);
//        log.info("searchProfilesByUsername for username: {}", username);
//        return new ResponseEntity<>(profiles, HttpStatus.OK);
//    }

}
