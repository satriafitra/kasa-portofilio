package com.portfolio.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class ContactMessage {
    private String id;

    @NotBlank(message = "Callsign / Name is required")
    private String senderName;

    @NotBlank(message = "Frequency / Email is required")
    @Email(message = "Invalid frequency / email format")
    private String email;

    @NotBlank(message = "Transmission / Message content is required")
    private String message;

    private LocalDateTime sentAt;

    public ContactMessage() {
        this.sentAt = LocalDateTime.now();
    }

    public ContactMessage(String id, String senderName, String email, String message) {
        this.id = id;
        this.senderName = senderName;
        this.email = email;
        this.message = message;
        this.sentAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSenderName() { return senderName; }
    public void setSenderName(String senderName) { this.senderName = senderName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getSentAt() { return sentAt; }
    public void setSentAt(LocalDateTime sentAt) { this.sentAt = sentAt; }
}
