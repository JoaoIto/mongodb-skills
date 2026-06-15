// TODO: Create a variable, db, and store a reference to 'sample_analytics' database
const db = db.getSiblingDB("sample_analytics");

let result = db.customers.insertMany([
  {
    _id: ObjectId("63b747ac6caf50c84843089a"),
    username: "brookscape",
    name: "Brooks Merrill",
    address: "315 Gatling Place, Wedgewood, Oregon, 6016",
    birthdate: ISODate("1987-06-26T22:35:00.000Z"),
    email: "brooksmerrill@gmail.com",
    accounts: [27017, 649673, 21625],
    tier_and_details: {}
  },
  {
    _id: ObjectId("63b747ace9f9c5ae45e08781"),
    username: "wigsRus",
    name: "Wiggins Cobb",
    address: "489 Wythe Place, Farmers, Pennsylvania, 4705",
    birthdate: ISODate("1973-07-26T22:35:00.000Z"),
    email: "wigginscobb@gmail.com",
    accounts: [295731, 756933],
    tier_and_details: {}
  },
  {
    _id: ObjectId("63b747ac76f08d239c0a2120"),
    username: "the_warden",
    name: "Ward Atkins",
    address: "196 Navy Street, Bellamy, Montana, 5396",
    birthdate: ISODate("1977-02-26T22:35:00.000Z"),
    email: "wardatkins@gmail.com",
    accounts: [845724, 937857, 234814],
    tier_and_details: {}
  }
]);

// TODO: Print the result of the insert operation to the console
printjson(result);
