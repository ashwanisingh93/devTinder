# DevTinnder APIs

### authRouter
- POST /signup
- POST /login
- POST /logout

### profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // forgot password api

### connectionRequestRouter
- POST /request/send/:status/:userId
- POST /request/review/status/:requestId


### userRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - gets you the profiles of either users in platform

Status : ignore,interested,accepted,rejected

