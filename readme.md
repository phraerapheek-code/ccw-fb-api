CCW-Fakebook-API
===
### env guide
>PORT=8899  
>DATABASE_URL=  
>JWT_SECRET=

---
### Service

|path |method |authen |params |query |body |
|:-- |:-- |:-- |:-- |:-- |:-- |
|/api/auth/login|post|-|-|-| {identity, password}
|/api/auth/register|post|-|-|-| {identity, firstName, lastName, password, confirmPassword}
|/api/auth/me|get|y|-|-|-|
|/api/post|get|y|-|-|-|
|/api/post|post|y|-|-|{message, image(file)}
|/api/post/:id|put|y|id|-|{message, image(file)}
|/api/post/:id|delete|y|id|-|-
|/api/post/:id/comment|post|y|id|-|{message}
|/api/post/comment/:id|delete|y|id|-|
|/api/post/:id/like|post|y|id|-|
|/api/post/:id/like|delete|y|id|-|-
