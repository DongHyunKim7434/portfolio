package com.example.portfolio;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ContactController {

    private final List<ContactMessage> messages = new ArrayList<>();

    @PostMapping("/contact")
    public ResponseEntity<String> receiveMessage(@RequestBody ContactMessage message) {
        messages.add(message);
        return ResponseEntity.ok("메시지가 저장되었습니다.");
    }

    @GetMapping("/contact")
    public ResponseEntity<List<ContactMessage>> getMessages() {
        return ResponseEntity.ok(messages);
    }
}
