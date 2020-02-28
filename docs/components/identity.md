# identity

> Handles everything related to identifying users.

## Commands

Stream name: `identity:command-${userId}`

### Register

Registers a user for our application.

```json
{
  "type": "Register",
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

Stream name: `identity-${userId}`

### AccountLocked

Denotes that a user's account has been locked.

```json
{
  "type": "AccountLocked",
  "metadata": {
    "userId": "dl16jZ5ZvrD5vRdn"
  },
  "data": {
    "lockedTime": "2020-02-28T05:34:33.880Z",
    "userId": "dl16jZ5ZvrD5vRdn"
  }
}
```

### Registered

Denotes that a user has successfully registered.

```json
{
  "type": "Registered",
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

### RegistrationFailed

Denotes that a user has failed to register.

```json
{
  "type": "RegistrationFailed",
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
