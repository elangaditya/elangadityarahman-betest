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
All routes except for get JWT token are private

### Get JWT
```/api/jwt```
Route used to get a JWT token

Example response:
```
{
	"err": false,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0xMC0zMFQwNzo1NTo1OC40MTZaIiwiaWF0IjoxNzMwMjc0OTU4LCJleHAiOjE3MzAyNzU1NTh9.Al_cUgt8Gd71Flo_73CsJXwvE7fWvQ_9S-cnLBHTKbA"
}
```

### Create User

```/api/users/create```
Will create a new user and return that user as a response

Example body:
```
{
	"userName": "TestUser",
	"emailAddress": "testuser@gmail.com",
	"accountNumber": 0,
	"identityNumber": 0
}
```

Example response:
```
{
	"userName": "TestUser",
	"accountNumber": 0,
	"emailAddress": "testuser@gmail.com",
	"identityNumber": 0,
	"_id": "6721e7e2260738954e5817c5",
	"__v": 0
}
```
