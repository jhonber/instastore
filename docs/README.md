## Questions

1. What is the expected format for each of the following fields?

- storeId
- storeName
- isOpen
- coordinates
- nextDeliveryTime

2. For this functional requirement "We need to keep track of each call to the endpoint", is it necessary to use a persistent storage like a DB or is it possible a non-persistent strategy like in-memory?

## Answers

1. The format for those fields:

```
storeId : UUID or String
storeName: String
isOpen: Boolean
coordinates: Array or object with latitude and longitude
nextDeliveryTime: UTC Date
```

2. For the purpose of this exercise you can use whatever you want, just tell us why are you using that strategy (time constraints are a valid reason for that decision).

## Architecture

<img src="architecture.png" width="40%">
   
| url                     | method   | description                | params |
| ----------------------- | -------- | -------------------------- | ------------- |
| /closest-store          | GET      | given a position, returns the closest **store** to it | Array[latitude, longitude] |

### Store

A store is an object with the following keys:

```javascript
{
   storeId : String
   storeName: String
   isOpen: Boolean
   coordinates: Array[latitude, longitude]
   nextDeliveryTime: UTC Date
}
```

## Layout frontend

<img src="layout-frontend.png" width="40%">

## App flow

1. User visit frontend page
2. Ask to user your current position
3. Make a request to backend for the given position
4. Show user position and closest store on the map

## Delivery time

From wednesday to friday morning
