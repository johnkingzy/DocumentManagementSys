
#### Available API Endpoints and their Functionality

EndPoint                                            |   Functionality
----------------------------------------------------|------------------------
POST /users/login                                   |   Logs a user in.
POST /users/logout                                  |   Logs a user out.
POST /users/                                        |   Creates a new user.
GET /users/                                         |   Find matching instances of user.
GET /users/<id>                                     |   Find user.
PUT /users/<id>                                     |   Update user attributes.
DELETE /users/<id>                                  |   Delete user.
GET /users/?limit={interger}&offset={interger}      | Pagination for users
POST /documents/                                    |   Creates a new document instance.
GET /documents/                                     |   Find matching instances of document.
GET /documents/<id>                                 |   Find document.
GET /documents/?limit={interger}&offset={interger}  | Pagination for documents
PUT /documents/<id>                                 |   Update document attributes.
DELETE /documents/<id>                              |   Delete document.
GET /users/<id>/documents                           |   Find all documents belonging to the user.
GET /search/users/?q={username}                     |   Gets all users with username contain the search term
GET /search/documents/?q={doctitle}                 | Get all documents with title containing the search query
GET /users/:id/alldocuments                         |   Get all document owned or accessible by `userId`
GET /api/users/:identifier                          |Find user with email or username containing the identifier parameter

#### Role

###### POST HTTP Request
-   `POST /roles`
-   Requires: Admin Authentication
    ###### HTTP Response
-   HTTP Status: `201: created`
-   JSON data
```json
{
  "success": true,
  "message": "Role created succesfully",
  "role": {
    "id": 5,
    "title": "writer",
    "updatedAt": "2017-06-13T17:09:41.119Z",
    "createdAt": "2017-06-13T17:09:41.119Z"
  }
}
```
###### GET HTTP Request
-   `GET /roles/:id`
-   Requires: Authentication
    ###### HTTP Response
-   HTTP Status: `200: OK`
-   JSON data
```json
{
  "message": "This role has been retrieved successfully",
  "role": {
    "id": 1,
    "title": "admin",
    "createdAt": "2017-05-30T12:16:24.052Z",
    "updatedAt": "2017-05-30T12:16:24.052Z"
  }
}
```
###### GET HTTP Request
-   `GET /roles`
-   Requires: Admin Authentication
    ###### HTTP Response
-   HTTP Status: `200: OK`
-   JSON data
```json
{
  "success": true,
  "message": "All roles was retrieved successfully",
  "roles": [
    {
      "id": 1,
      "title": "admin",
      "createdAt": "2017-05-30T12:16:24.052Z",
      "updatedAt": "2017-05-30T12:16:24.052Z"
    },
    {
      "id": 2,
      "title": "regular",
      "createdAt": "2017-05-30T12:16:24.052Z",
      "updatedAt": "2017-05-30T12:16:24.052Z"
    },
    {
      "id": 3,
      "title": "moderator",
      "createdAt": "2017-06-07T23:01:27.191Z",
      "updatedAt": "2017-06-07T23:01:27.191Z"
    },
    {
      "id": 4,
      "title": "guest",
      "createdAt": "2017-06-07T23:05:06.433Z",
      "updatedAt": "2017-06-07T23:05:06.433Z"
    }
  ]
}
```
###### PUT HTTP Request
-   `PUT /roles/:id`
-   Requires: Admin Authentication
    ###### HTTP Response
-   HTTP Status: `200: OK`
-   JSON data
```json
{
  "role": {
    "id": 5,
    "title": "writers",
    "createdAt": "2017-06-13T17:09:41.119Z",
    "updatedAt": "2017-06-13T17:10:32.755Z"
  },
  "message": "Role updated successfully."
}
```
###### DELETE HTTP Request
-   `DELETE /roles/:id`
-   Requires: Admin Authentication
    ###### HTTP Response
-   HTTP Status: `200: OK`
-   JSON data
```json
{
  "message": "This role has been deleted successfully"
}
```

#### Users
###### POST HTTP Request
-   `POST /users`
    ###### HTTP response
-   HTTP Status: `200: created`
-   JSON data
```json
{
  "message": "User was created Successfully",
  "user": {
    "roleId": 2,
    "active": true,
    "id": 49,
    "username": "maximuf",
    "firstname": "Kingsley",
    "lastname": "John",
    "email": "johnkingzy@gmail.com",
    "updatedAt": "2017-06-13T17:11:35.673Z",
    "createdAt": "2017-06-13T17:11:35.673Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGVJZCI6MiwiYWN0aXZlIjp0cnVlLCJpZCI6NDksInVzZXJuYW1lIjoibWF4aW11ZiIsImZpcnN0bmFtZSI6IktpbmdzbGV5IiwibGFzdG5hbWUiOiJKb2huIiwiZW1haWwiOiJqb2hua2luZ3p5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEEvWXNJQWNGRzVvcW5RR2MzUU9YTHUzWkxDdUFSTWo2OE40SVJhaEFDN3FVTXdkTG8wVVFpIiwidXBkYXRlZEF0IjoiMjAxNy0wNi0xM1QxNzoxMTozNS42NzNaIiwiY3JlYXRlZEF0IjoiMjAxNy0wNi0xM1QxNzoxMTozNS42NzNaIn0sImlhdCI6MTQ5NzM3Mzg5NSwiZXhwIjoxNDk3Mzc3ODk1fQ.1qUXCI9N1zHNPtrWl-oiAoDFIyBAs8IVry8zQ182abE"
}
```
###### Login HTTP Request
-   `POST /users/login`
    ###### HTTP Response
-   HTTP status: `200: OK`
-   JSON Data
```json
{
  "message": "User authenticated successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNSwibmFtZSI6ImFkbWluIHVzZXIiLCJ1c2VybmFtZSI6ImFkbWluMSIsImVtYWlsIjoiYWRtaW4yQGFkbWluMi5jb20iLCJyb2xlSWQiOjF9LCJpYXQiOjE0OTY0MzEwMDcsImV4cCI6MTQ5NjUxNzQwN30.M5UKTYZb9m4YHeIRXlyRPQb8y66hMF65v7tV1SGmLfg"
}
```

#### Get Users
###### GET HTTP Request
-   `GET /users`
-   Requires: Admin Authentication
    ###### HTTP Response
-   HTTP status: `200: OK`
-   JSON Data
```json
{
  "message": "You have successfully retrieved all users",
  "users": {
    "rows": [
      {
        "id": 49,
        "username": "maximuf",
        "firstname": "Kingsley",
        "lastname": "John",
        "email": "johnkingzy@gmail.com",
        "roleId": 2
      },
      {
        "id": 48,
        "username": "kingzy",
        "firstname": "Kinhgsley",
        "lastname": "Maximuf",
        "email": "kingzy@gm.com",
        "roleId": 2
      },
      {
        "id": 21,
        "username": "kingsleyjkj",
        "firstname": "solomon",
        "lastname": "solomonjohn",
        "email": "maximuf@gmy.com",
        "roleId": 2
      },
      {
        "id": 19,
        "username": "johnkingzy",
        "firstname": "Emmanuel",
        "lastname": "David",
        "email": "mkingzy1@gmail.com",
        "roleId": 2
      },
      {
        "id": 1,
        "username": "pythagoras",
        "firstname": "MaximufJohn",
        "lastname": "KingsleyJohn",
        "email": "Solomon@gmail.com",
        "roleId": 1
      }
    ]
  },
  "pagination": {
    "page_count": null,
    "page": null,
    "page_size": null,
    "total_count": 5
  }
}
```
#### Get User
###### GET HTTP Request
-   `GET /users/:id`
-   Requires: Admin Authentication
    ###### HTTP Response
-   HTTP status: `200: OK`
-   JSON Data
```json
{
  "user": {
    "id": 1,
    "username": "pythagoras",
    "firstname": "MaximufJohn",
    "lastname": "KingsleyJohn",
    "email": "Solomon@gmail.com",
    "roleId": 1,
    "active": true,
    "createdAt": "2017-05-30T12:16:24.053Z",
    "updatedAt": "2017-06-13T15:53:54.732Z"
  }
}
```
#### Update User
###### PUT HTTP Request
-   `PUT /users/:id`
-   Requires: Authentication
    ###### HTTP Response
-   HTTP status: `200: OK`
-   JSON Data
```json
{
  "user": {
    "id": 49,
    "username": "maximuf",
    "firstname": "Kingsley",
    "lastname": "John",
    "email": "johnkingzy@gmail.com",
    "roleId": 2,
    "active": true,
    "createdAt": "2017-06-13T17:11:35.673Z",
    "updatedAt": "2017-06-13T17:11:35.673Z"
  },
  "success": true,
  "message": "Profile Info Updated Successfully"
}
```
#### Delete User
###### DELETE HTTP Request
-   `DELETE /users/:id`
-   Requires: Admin Authentication
    ###### HTTP Response
-   HTTP status: `200: OK`
-   JSON Data
```json
{
  "success": true,
  "message": "User was deleted successfully"
}
```


#### Documents
###### POST HTTP Request
-   `POST /documents`
-   Requires: Authentication
    ###### HTTP response
-   HTTP Status: `201: created`
-   JSON data
```json
{
  "success": true,
  "document": {
    "id": 37,
    "title": "writers",
    "content": "What i do for a living is non of your fucking business i will advice you to keep off as iot non of your business",
    "access": "private",
    "ownerId": 1,
    "ownerRoleId": "1",
    "updatedAt": "2017-06-13T17:30:06.300Z",
    "createdAt": "2017-06-13T17:30:06.300Z"
  },
  "message": "Your document was created successfully"
}
```
###### GET HTTP Request
-   `GET /documents`
    ###### HTTP response
-   HTTP Status: `200: 0k`
-   JSON data
```json
{
  "document": {
    "rows": [
      {
        "id": 14,
        "ownerId": 1,
        "title": "editedTitle",
        "content": "<p>jkhhgdxbvbsmnxbjhmbfcvxmbfvzcbmn</p>",
        "access": "public",
        "ownerRoleId": "1",
        "createdAt": "2017-06-02T14:06:02.675Z",
        "updatedAt": "2017-06-12T12:46:29.480Z",
        "User": {
          "id": 1,
          "username": "pythagoras",
          "firstname": "MaximufJohn",
          "lastname": "KingsleyJohn",
          "email": "Solomon@gmail.com",
          "roleId": 1
        }
      },
      {
        "id": 2,
        "ownerId": 1,
        "title": "public seed document test",
        "content": "Laborum consectetur iusto suscipit similique dolores vero harum. Quo qui perspiciatis harum pariatur fugit. Non doloremque et sit eveniet ut corrupti aut.",
        "access": "public",
        "ownerRoleId": "1",
        "createdAt": "2017-05-30T12:16:24.083Z",
        "updatedAt": "2017-06-07T21:00:52.377Z",
        "User": {
          "id": 1,
          "username": "pythagoras",
          "firstname": "MaximufJohn",
          "lastname": "KingsleyJohn",
          "email": "Solomon@gmail.com",
          "roleId": 1
        }
      },
  ]
}
},
  "pagination": {
    "page_count": null,
    "page": null,
    "page_size": null,
    "total_count": 18
  },
  "message": "Document was retrieved successfully"
}
```

###### GET HTTP Request
-   `GET /documents/:id`
-   Requires: Authentication
    ###### HTTP response
-   HTTP Status: `200: 0k`
-   JSON data
```json
{
  "success": true,
  "document": {
  "id": 14,
  "ownerId": 1,
  "title": "editedTitle",
  "content": "<p>jkhhgdxbvbsmnxbjhmbfcvxmbfvzcbmn</p>",
  "access": "public",
  "ownerRoleId": "1",
  "createdAt": "2017-06-02T14:06:02.675Z",
  "updatedAt": "2017-06-12T12:46:29.480Z"
}
}
```
#### Update Document
###### PUT HTTP Request
-   `PUT /documents/:id`
-   Requires: Authentication
    ###### HTTP response
-   HTTP Status: `200: 0k`
-   JSON data
```json
{
  "updatedDoc": {
    "id": 3,
    "title": "Hello Document Ngene - Modified",
    "docContent": "<p>Ngene created this document</p>",
    "docType": null,
    "viewAccess": "private",
    "role": "2",
    "createdAt": "2017-05-18T15:34:26.700Z",
    "updatedAt": "2017-06-05T12:05:29.738Z",
    "userId": 4
  },
  "message": "Document updated successfully"
}
```
#### Delete Document
###### DELETE HTTP Request
-   `DELET /documents/:id`
-   Requires: Authentication
    ###### HTTP response
-   HTTP Status: `200: 0k`
-   JSON data
```json
{
  "success": true,
  "message": "Document was deleted successfully"
}
```

#### Limitations
Currently, we can't say our API can handle larger requests, this may be a problem when our user base grows to over million.
