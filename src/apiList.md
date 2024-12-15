# FlickFlirt APIs

## authRouter

- POST /auth/signup
- POST /auth/login
- Post /auth/logout

# profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

# connectionRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/recieve/accepted/:userId
- POST /request/recieve/declined/:userId

# userRouter

- GET /user/sentRequests
- GET /user/receivedRequests
- GET /user/allUsers
- POST /user/chat
