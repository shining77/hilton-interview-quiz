/*
 Navicat Premium Data Transfer

 Source Server         : localMongo
 Source Server Type    : MongoDB
 Source Server Version : 50009
 Source Host           : 127.0.0.1:27017
 Source Schema         : hilton

 Target Server Type    : MongoDB
 Target Server Version : 50009
 File Encoding         : 65001

 Date: 08/10/2023 13:32:44
*/


// ----------------------------
// Collection structure for employees
// ----------------------------
db.getCollection("employees").drop();
db.createCollection("employees");

// ----------------------------
// Documents of employees
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("hilton");
db.getCollection("employees").insert([ {
    _id: ObjectId("652144349062ce0ffc0d398b"),
    name: "peter",
    code: "7BCC9D69323376B47E2221CDB0A495FF"
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for guests
// ----------------------------
db.getCollection("guests").drop();
db.createCollection("guests");

// ----------------------------
// Documents of guests
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("hilton");
db.getCollection("guests").insert([ {
    _id: ObjectId("65211cec9062ce0ffc0d3989"),
    phone: "13112345678"
} ]);
db.getCollection("guests").insert([ {
    _id: ObjectId("65211cfe9062ce0ffc0d398a"),
    phone: 13112345689
} ]);
db.getCollection("guests").insert([ {
    _id: ObjectId("65223596b96c907ead105696"),
    phone: "18018699131",
    __v: NumberInt("0")
} ]);
db.getCollection("guests").insert([ {
    _id: ObjectId("652237a91619d8856e9cc10b"),
    __v: NumberInt("0")
} ]);
db.getCollection("guests").insert([ {
    _id: ObjectId("652238a0e107fc6d39db8ab4"),
    __v: NumberInt("0")
} ]);
db.getCollection("guests").insert([ {
    _id: ObjectId("6522394ae107fc6d39db8abc"),
    __v: NumberInt("0")
} ]);
db.getCollection("guests").insert([ {
    _id: ObjectId("65223972e107fc6d39db8ac1"),
    __v: NumberInt("0")
} ]);
db.getCollection("guests").insert([ {
    _id: ObjectId("65223a6be107fc6d39db8ad1"),
    __v: NumberInt("0")
} ]);
db.getCollection("guests").insert([ {
    _id: ObjectId("65223cb4824b3827038640de"),
    __v: NumberInt("0")
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for orders
// ----------------------------
db.getCollection("orders").drop();
db.createCollection("orders");

// ----------------------------
// Documents of orders
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("hilton");
db.getCollection("orders").insert([ {
    _id: ObjectId("65221a2cd77a0be8d596af73"),
    "guests_id": "65211cec9062ce0ffc0d3989",
    username: "peter wang",
    time: "10:30",
    date: "2023-10-09",
    table: "1",
    phone: "13156987456",
    status: NumberInt("1"),
    __v: NumberInt("0")
} ]);
db.getCollection("orders").insert([ {
    _id: ObjectId("65221abcd15cb0d08d179fdb"),
    "guests_id": "65211cec9062ce0ffc0d3989",
    username: "alice zhao",
    time: "11:00",
    date: "2023-10-11",
    table: "2",
    phone: "1315698768",
    status: NumberInt("2"),
    __v: NumberInt("0")
} ]);
db.getCollection("orders").insert([ {
    _id: ObjectId("65221c9075f7bed331f3d129"),
    "guests_id": "65211cec9062ce0ffc0d3989",
    username: "jack lee",
    time: "11:00",
    date: "2023-10-02",
    table: "1",
    phone: "13123564985",
    status: NumberInt("2"),
    __v: NumberInt("0")
} ]);
db.getCollection("orders").insert([ {
    _id: ObjectId("65223643e5db9159ce0f443c"),
    "guests_id": "65223596b96c907ead105696",
    username: "shiningSun",
    time: "10:30",
    date: "2023-10-17",
    table: "5",
    phone: "18018699131",
    status: NumberInt("1"),
    __v: NumberInt("0")
} ]);
db.getCollection("orders").insert([ {
    _id: ObjectId("65223cb9824b3827038640e1"),
    "guests_id": "65211cec9062ce0ffc0d3989",
    username: "wannda niu",
    time: "10:30",
    date: "2023-10-09",
    table: "1",
    phone: "13156987466",
    status: NumberInt("2"),
    __v: NumberInt("0")
} ]);
session.commitTransaction(); session.endSession();
