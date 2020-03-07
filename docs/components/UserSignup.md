# UserSignup

> Handles the process of users signing themselves up.

## Commands

Stream name: `userSignup:command-${userId}`

### Signup

Signs up a user for our application.

```json
{
  "type": "Signup",
  "metadata": {
    "userId": "dl16jZ5ZvrD5vRdn"
  },
  "data": {
    "email": "user@example.com",
    "password": "$2b$10$fgH3ukmMRFwkW8i45y7SjuIMxnOa8smSl4l7rhwwzZVKulZ6jUCvG",
    "userId": "dl16jZ5ZvrD5vRdn"
  }
}
```

## Events

Stream name: `userSignup-${userId}`

### SignedUp

Denotes that a user has successfully signed up.

```json
{
  "type": "SignedUp",
  "metadata": {
    "userId": "dl16jZ5ZvrD5vRdn"
  },
  "data": {
    "email": "user@example.com",
    "password": "$2b$10$fgH3ukmMRFwkW8i45y7SjuIMxnOa8smSl4l7rhwwzZVKulZ6jUCvG",
    "userId": "dl16jZ5ZvrD5vRdn"
  }
}
```

### SignupFailed

Denotes that a user has failed to signup.

```json
{
  "type": "SignupFailed",
  "metadata": {
    "userId": "dl16jZ5ZvrD5vRdn"
  },
  "data": {
    "email": "user@example.com",
    "reason": "email already in use",
    "userId": "dl16jZ5ZvrD5vRdn"
  }
}
```
