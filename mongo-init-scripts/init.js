print("Initialization script starts...");

// Connect to the admin database
var adminDB = db.getSiblingDB('admin');
// adminDB.auth('root', 'root'); // Uncomment if authentication is needed

// Create or Connect to the 'dorm' database
var newDB = adminDB.getSiblingDB('dorm');

// Create a new user with specified roles
newDB.createUser({
  user: 'dormlord',
  pwd: 'dormlord',
  roles: [
    { role: 'clusterAdmin', db: 'admin' },
    { role: 'readAnyDatabase', db: 'admin' },
    { role: 'readWrite', db: 'dorm' }
  ]
});

// Switch to the 'dorm' database
db = newDB;

// Authenticate as the new user (if needed)
// db.auth('dormlord', 'dormlord');

// Enable sharding on the 'dorm' database
sh.enableSharding('dorm');

db.createCollection("students", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["firstName", "lastName", "DOB", "gender", "nationality", "emailAddress", "phoneNumber", "roomNumber", "block", "checkInDate", "checkOutDate", "university", "faculty"],
      properties: {
        firstName: { bsonType: "string" },
        lastName: { bsonType: "string" },
        DOB: { bsonType: "date" },
        gender: { bsonType: "string" },
        nationality: { bsonType: "string" },
        emailAddress: { bsonType: "string" },
        phoneNumber: { bsonType: "string" },
        roomNumber: { bsonType: "int" },
        block: { bsonType: "string" },
        checkInDate: { bsonType: "date" },
        checkOutDate: { bsonType: "date" },
        university: { bsonType: "string" },
        faculty: { bsonType: "string" },
      }
    }
  }
});
sh.shardCollection("dorm.students", { "block": 1, "roomNumber": 1 });

db.createCollection("rooms", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["roomNumber", "block", "roomType", "maxCapacity", "currentOccupancy", "amenities"],
      properties: {
        roomNumber: { bsonType: "int" },
        block: { bsonType: "string" },
        roomType: {
          bsonType: ["string"],
          enum: ["Single", "Double", "Triple", "Quad"]
        },
        maxCapacity: { bsonType: "int" },
        currentOccupancy: {
          bsonType: "array",
          items: { bsonType: "objectId" }
        },
        amenities: {
          bsonType: "array",
          items: {
            bsonType: "string",
            enum: ["Air Conditioning", "Heater", "Refrigerator", "Multicooker", "Fan", "Toaster", "Electric Kettle", "Washbasin", "Toilet", "Shower"]
          }
        }
      }
    }
  }
});
sh.shardCollection("dorm.rooms", { "block": 1 });

db.createCollection("dormitoryBlocks", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["maxCapacity", "rooms", "floors"],
      properties: {
        name: {
          bsonType: "string",
          enum: ["A", "B", "C", "D", "E", "F"]
        },
        maxCapacity: { bsonType: "int" },
        rooms: {
          bsonType: "array",
          items: { bsonType: "objectId" }
        },
        floors: {
          bsonType: "int",
          minimum: 1,
          maximum: 5
        }
      }
    }
  }
});
sh.shardCollection("dorm.dormitoryBlocks", { "name": 1 });

db.createCollection("events", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["eventName", "dateOfEvent", "description", "organizer"],
      properties: {
        eventName: { bsonType: "string" },
        dateOfEvent: { bsonType: "date" },
        description: { bsonType: "string" },
        organizer: { bsonType: "objectId" }
      }
    }
  }
});
sh.shardCollection("dorm.events", { "dateOfEvent": 1 });

db.createCollection("visitors", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["studentId", "firstName", "lastName", "DOB", "gender", "nationality", "emailAddress", "phoneNumber", "purpose"],
      properties: {
        studentId: { bsonType: "objectId" },
        firstName: { bsonType: "string" },
        lastName: { bsonType: "string" },
        DOB: { bsonType: "date" },
        gender: { bsonType: "string" },
        nationality: { bsonType: "string" },
        emailAddress: { bsonType: "string" },
        phoneNumber: { bsonType: "string" },
        purpose: { bsonType: "string" }
      }
    }
  }
});
sh.shardCollection("dorm.visitors", { "studentId": 1 });

db.createCollection("maintenanceRequests", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["studentID", "roomID", "dateReported", "dateResolved", "status"],
      properties: {
        studentID: { bsonType: "objectId" },
        roomID: { bsonType: "objectId" },
        dateReported: { bsonType: "date" },
        dateResolved: { bsonType: "date" },
        status: { 
          bsonType: "string", 
          enum: ["Pending", "In progress", "Resolved"] 
        }
      }
    }
  }
});
sh.shardCollection("dorm.maintenanceRequests", { "dateReported": 1 });


print("Initialization script ends...");
