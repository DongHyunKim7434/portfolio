package com.example.portfolio;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class GitHubController {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String GITHUB_USER = "DongHyunKim7434";

    @GetMapping("/github/repos")
    public ResponseEntity<String> getRepos() {
        String url = "https://api.github.com/users/" + GITHUB_USER + "/repos?sort=updated&per_page=6";
        String result = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(result);
    }
}
