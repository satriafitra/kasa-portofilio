package com.portfolio.service;

import com.portfolio.model.ContactMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class ContactService {

    private final List<ContactMessage> messages = new CopyOnWriteArrayList<>();

    public ContactService() {
        messages.add(new ContactMessage(
                UUID.randomUUID().toString(),
                "RECRUITER_ALPHA",
                "talent@futurecorp.tech",
                "Impression score: MAXIMUM! Loved the Flappy Dev arcade flow. Looking forward to discussing Lead Architect roles with you."
        ));
    }

    public synchronized ContactMessage saveMessage(ContactMessage message) {
        if (message.getId() == null) {
            message.setId(UUID.randomUUID().toString());
        }
        messages.add(0, message); // newest first
        return message;
    }

    public List<ContactMessage> getAllMessages() {
        return new ArrayList<>(messages);
    }
}
