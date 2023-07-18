# API Docs

## list available endpoints

- `POST /user/register`
- `POST /user/login`
- `POST /user/googlelogin`
- `POST /user/addBucket`
- `GET /user/Bucket`
- `DELETE /user/delete/:id`
- `POST /weather`
- `POST /weather/geo`
- `POST /chatGPT`

## 1. POST /user/register
### Request
- body
```json
    {
      "username": <string>,
      "email": <string>,
      "password": <string>,
    }
```
### Response
- Body ( 201 - OK )
    ```json
{
    "id": 7,
    "userName": "testes",
    "email": "tes@tes33.com",
    "password": "$2a$10$FJt7OGcgMrBUK.O0phZ/M.g8SEeZ5Ga/KTLrZ1GQ0YOMR8Knm2D4C",
    "updatedAt": "2023-06-08T03:38:52.931Z",
    "createdAt": "2023-06-08T03:38:52.931Z"
}
    ```

- Body ( 400 - BadRequest )
```json
{
    "message": [
        "email must not be empty",
        "password is required"
    ]
}
```

## 2. POST /user/login
### Request
- body
```json
    {
      "email": <string>,
      "password": <string>
    }
```
### Response
- Body ( 200 - OK )
    ```json
   {
    "accesToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdGFmZkB0ZXMuY29tIiwiaWF0IjoxNjg0MjM5MjAyfQ.D1BRQFBT5DN-nvW_S2aid8NHClcruwODm6KeeMe2_lU"
    }
    ```

- Body ( 400 - BadRequest )
```json
{
    "message": [
        "email must not be empty",
        "password is required"
    ]
}
```

- Body ( 401 - Unauthorized )
```json
{
    "message": "Email or password is invalid"
}
```

## 3. POST /user/addBucket
### Response
- Body ( 201 - Created )
```json
{
    "id": 12,
    "activity": "tes kodingan",
    "time": "2023-06-06T11:00:00.000Z",
    "place": "kost",
    "UserId": 1,
    "updatedAt": "2023-06-08T03:43:35.961Z",
    "createdAt": "2023-06-08T03:43:35.961Z"
}
```
- Body ( 400 - Bad Request )
```json
{
    "message": [
        "name is required",
        "description is required",
        "description is required",
        "image URL is required"
    ]
}
```

## 4. GET /user/Bucket
### Request
- header
 ```json
   {
    "accesToken": <string>
    }
```
### Response
- body (200 - OK)
```json
[
    {
        "id": 1,
        "activity": "tes kodingan",
        "place": "kost",
        "time": "2023-06-06T11:00:00.000Z",
        "UserId": 1,
        "createdAt": "2023-06-06T16:18:01.737Z",
        "updatedAt": "2023-06-06T16:18:01.737Z"
    },
    {
        "id": 12,
        "activity": "tes kodingan",
        "place": "kost",
        "time": "2023-06-06T11:00:00.000Z",
        "UserId": 1,
        "createdAt": "2023-06-08T03:43:35.961Z",
        "updatedAt": "2023-06-08T03:43:35.961Z"
    }
]
```
- Body ( 401 - Unauthorized )
```json
{
    "message": "Invalid Token"
}
```
## 5. DELETE /user/delete/:id
### Request

- header
 ```json
   {
    "accesToken": <string>
    }
```
- Params
    ```json
    { id: <integer> }
    ```
### Response
- Body ( 200 - OK )

```json
{ message: menu with name <cuisine name> success to delete }
```
- Body ( 404 - NotFound )
```json
{
    "message": "Data not found"
}
```
- Body ( 401 - Unauthorized )
```json
{
    "message": "Invalid Token"
}
```

## 6. POST /weather
### Request


- Body
    ```json
    { lat: <integer>,
    lon : <integer>    
     }
    ```
### Response
- Body ( 200 - OK )
```json
[
    {
        "dt": 1686204000,
        "main": {
            "temp": 302.77,
            "feels_like": 303.11,
            "temp_min": 302.77,
            "temp_max": 304.2,
            "pressure": 1011,
            "sea_level": 1011,
            "grnd_level": 1009,
            "humidity": 46,
            "temp_kf": -1.43
        },
        "weather": []
    }
]
```

## 8. POST /weather/geo
### Request
- Body
    ```json
    { cityName: <string> }
    ```
## Response
- Body ( 200 - OK )
```json
    { lat: <integer>,
    lon : <integer>    
     }
```
## 9. POST /chatGPT
### Request
- Body
```json
{
    weatherCondition:<string>,
    cityName: <string>
}
```
# Response
- Body ( 200 - OK )
```json
    {
    "id": "cmpl-7P1ECUNZK6Gxn4WzHtx46c0IzHHUg",
    "object": "text_completion",
    "created": 1686197276,
    "model": "text-davinci-003",
    "choices": [
        {
            "text": "\n\nVisit Mpu Tantular Museum to learn about Surabaya's history.",
            "index": 0,
            "logprobs": null,
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 22,
        "completion_tokens": 17,
        "total_tokens": 39
    }
}
```
## Globals

### Errors
- Body ( 500 - Internal Server Error )

```json
{ "message": "internal server error"}
```

