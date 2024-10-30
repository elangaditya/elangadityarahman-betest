# Code.ID Backend Server Test

## User schema

```
userSchema = new Schema<IUser>({
  _id: {
    type: String,
    default: () => {
      return new mongo.ObjectId();
    },
    required: true,
  },
  userName: { type: String, required: true },
  accountNumber: { type: Number, required: true },
  emailAddress: { type: String, required: true },
  identityNumber: { type: Number, required: true },
});

userSchema.index({ accountNumber: 1, identityNumber: 1 }, { unique: true });

```

## Routes
All routes except for get JWT token are private.

### Get JWT
```GET /api/jwt```
Route used to get a JWT token.

Example response:
```
{
	"err": false,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0xMC0zMFQwNzo1NTo1OC40MTZaIiwiaWF0IjoxNzMwMjc0OTU4LCJleHAiOjE3MzAyNzU1NTh9.Al_cUgt8Gd71Flo_73CsJXwvE7fWvQ_9S-cnLBHTKbA"
}
```

### Create User

```POST /api/users/create```
Will create a new user and return that user as a response.

Example body:
```
{
    "userName": "TestUser",
    "emailAddress": "testuser@gmail.com",
    "accountNumber": 0,
    "identityNumber": 0,
}
```

Example response:
```
{
    "err": false,
    {
        "userName": "TestUser",
        "emailAddress": "testuser@gmail.com",
        "accountNumber": 0,
        "identityNumber": 0,
        "_id": "6721e8f861f66da1f0a523fb",
		"__v": 0
    }
}
```

### Get User by Account Number
```GET /api/users/find/accountNumber/:accountNumber```
Gets a user by account number. Response will show whether the data is taken from the database or from cache.

Example url: ```/api/users/find/accountNumber/0```

Example response:
```
{
    "err": false,
    {
        "userName": "TestUser",
        "emailAddress": "testuser@gmail.com",
        "accountNumber": 0,
        "identityNumber": 0,
        "_id": "6721e8f861f66da1f0a523fb",
		"__v": 0
    }
}
```

### Get User by Identity Number
```GET /api/users/find/identityNumber/:identityNumber```
Gets a user by identity number. Response will show whether the data is taken from the database or from cache.

Example url: ```/api/users/find/identityNumber/0```

Example response:
```
{
    "err": false,
    {
        "userName": "TestUser",
        "emailAddress": "testuser@gmail.com",
        "accountNumber": 0,
        "identityNumber": 0,
        "_id": "6721e8f861f66da1f0a523fb",
		"__v": 0
    }
}
```

### Update User
```PATCH /api/users/:userId```
Updates user data using patch. Will only update fields that are specified in the request body.

Example request:
```
PATCH /api/users/6721e8f861f66da1f0a523fb
{
	"userName": "newUserName",
	"identityNumber": 2,
	"accountNumber": 2
}
```

Example response:
```
{
    "err": false,
    {
        "userName": "newUserName",
        "emailAddress": "testuser@gmail.com",
        "accountNumber": 0,
        "identityNumber": 0,
        "_id": "6721e8f861f66da1f0a523fb",
        "__v": 0
    }
}
```

### Delete User
```DELETE /api/users/:userId```
Delete user with userId

Example request:
```
DELETE /api/users/:userId
```

Example response:
```
{
	"err": false,
	"deletedId": "6721e8f861f66da1f0a523fb"
}
```
