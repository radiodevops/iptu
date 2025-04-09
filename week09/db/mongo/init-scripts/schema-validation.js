// MongoDB Schema Validation
// This script adds JSON Schema validation to MongoDB collections

// Connect to the database
db = db.getSiblingDB('school_db_mongo');

// Students collection validation
db.runCommand({
  collMod: "students",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "age"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "must be a valid email address and is required"
        },
        age: {
          bsonType: "int",
          minimum: 10,
          maximum: 100,
          description: "must be an integer between 10 and 100 and is required"
        },
        address: {
          bsonType: "object",
          required: ["city", "state"],
          properties: {
            street: {
              bsonType: "string",
              description: "must be a string if the field exists"
            },
            city: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            state: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            zip: {
              bsonType: "string",
              description: "must be a string if the field exists"
            }
          }
        }
      }
    }
  },
  validationLevel: "moderate",
  validationAction: "warn"
});

// Courses collection validation
db.runCommand({
  collMod: "courses",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "credits"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        description: {
          bsonType: "string",
          description: "must be a string if the field exists"
        },
        credits: {
          bsonType: "int",
          minimum: 1,
          maximum: 6,
          description: "must be an integer between 1 and 6 and is required"
        },
        professor: {
          bsonType: "string",
          description: "must be a string if the field exists"
        }
      }
    }
  },
  validationLevel: "moderate",
  validationAction: "warn"
});

// Enrollments collection validation
db.runCommand({
  collMod: "enrollments",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["studentId", "courseId", "enrollmentDate"],
      properties: {
        studentId: {
          bsonType: "objectId",
          description: "must be an objectId and is required"
        },
        courseId: {
          bsonType: "objectId",
          description: "must be an objectId and is required"
        },
        enrollmentDate: {
          bsonType: "date",
          description: "must be a date and is required"
        },
        grade: {
          bsonType: ["double", "null"],
          minimum: 0,
          maximum: 100,
          description: "must be a number between 0 and 100 if the field exists"
        },
        status: {
          enum: ["active", "completed", "dropped", "pending"],
          description: "can only be one of the enum values"
        }
      }
    }
  },
  validationLevel: "moderate",
  validationAction: "warn"
});
