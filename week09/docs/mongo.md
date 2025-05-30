# MongoDB CRUD Examples (school_db_mongo)

## Table of Contents
- [Connection Examples](#connection-examples)
  - [CLI](#cli)
  - [Python](#python)
  - [Node.js](#nodejs)
- [CRUD Operations](#crud-operations)
- [Indexing Recommendations](#indexing-recommendations)
- [Performance Tips](#performance-tips)
- [Troubleshooting](#troubleshooting)

## Connection Examples

### CLI
```bash
docker exec -it mongo-demo mongosh -u mongoadmin -p password123 --authenticationDatabase admin school_db_mongo
```

### Python
```python
from pymongo import MongoClient

client = MongoClient(
    host="localhost",
    port=27017,
    username="mongoadmin",
    password="password123",
    authSource="admin"
)
db = client.school_db_mongo
```

### Node.js
```javascript
const { MongoClient } = require('mongodb');

const client = new MongoClient(
  'mongodb://mongoadmin:password123@localhost:27017/?authSource=admin'
);

await client.connect();
const db = client.db('school_db_mongo');
```

## Connecting to the Database

You can connect to the MongoDB container using `mongosh`. First, find the container name (e.g., `mongo-demo`) using `docker ps`.

```bash
# Connect to the running mongo container
docker exec -it mongo-demo mongosh -u mongoadmin -p password123 --authenticationDatabase admin school_db_mongo

# Explanation:
# -u mongoadmin: Username defined in docker-compose.yaml
# -p password123: Password defined in docker-compose.yaml
# --authenticationDatabase admin: The database where the user was created
# school_db_mongo: The target database to use (created by init script or MONGO_INITDB_DATABASE)
```

Once connected, you will be in the `mongosh` shell for the `school_db_mongo` database, and you can run the commands below.

## CREATE (Insert Documents)

### Insert a new student
```javascript
db.students.insertOne({
  firstName: 'Alice',
  lastName: 'Green',
  email: 'alice.g@school.edu',
  birthDate: new Date('2007-03-12'),
  gradeLevel: 9,
  createdAt: new Date()
});
```

### Insert a new course
```javascript
db.courses.insertOne({
  courseName: 'Art History',
  description: 'Survey of major art movements',
  creditHours: 3,
  teacherName: 'Ms. Evans'
});
```

### Enroll an existing student in an existing course
```javascript
// First, find the ObjectIds for the student and course
let aliceId = db.students.findOne({ email: 'alice.g@school.edu' })._id;
let artHistoryId = db.courses.findOne({ courseName: 'Art History' })._id;

// Then, insert the enrollment document
db.enrollments.insertOne({
  studentId: aliceId,
  courseId: artHistoryId,
  enrollmentDate: new Date(),
  grade: null // Grade can be updated later
});
```

## READ (Query Documents)

### Find all students
```javascript
db.students.find();
// For better formatting:
db.students.find().pretty();
```

### Find a specific student by email
```javascript
db.students.findOne({ email: 'john.smith@school.edu' });
```

### Find all courses taught by a specific teacher
```javascript
db.courses.find({ teacherName: 'Dr. Roberts' }).pretty();
```

### Find students and the courses they are enrolled in (using $lookup - more advanced)
```javascript
// This simulates a JOIN
db.enrollments.aggregate([
  {
    $lookup:
      {
        from: "students",
        localField: "studentId",
        foreignField: "_id",
        as: "studentInfo"
      }
  },
  {
    $lookup:
      {
        from: "courses",
        localField: "courseId",
        foreignField: "_id",
        as: "courseInfo"
      }
  },
  {
    $unwind: "$studentInfo"
  },
  {
    $unwind: "$courseInfo"
  },
  {
    $project: {
      _id: 0, // Exclude the enrollment _id
      studentName: { $concat: ["$studentInfo.firstName", " ", "$studentInfo.lastName"] },
      courseName: "$courseInfo.courseName",
      grade: "$grade"
    }
  }
]).pretty();
```

### Find students enrolled in a specific course (e.g., 'Mathematics 101')
```javascript
// Find the course ID first
let mathCourseId = db.courses.findOne({ courseName: 'Mathematics 101' })._id;

// Find enrollments for that course
let enrollmentDocs = db.enrollments.find({ courseId: mathCourseId }).toArray();

// Extract student IDs
let studentIds = enrollmentDocs.map(e => e.studentId);

// Find the students with those IDs
db.students.find({ _id: { $in: studentIds } }).pretty();
```

## UPDATE (Modify Documents)

### Update a student's grade level
```javascript
// Update John Smith's grade level
db.students.updateOne(
  { email: 'john.smith@school.edu' }, // Filter criteria
  { $set: { gradeLevel: 11 } }       // Update operation
);
```

### Change a course description
```javascript
// Update Biology course description
db.courses.updateOne(
  { courseName: 'Biology' },
  { $set: { description: 'Advanced study of cellular biology and genetics' } }
);
```

### Update a grade for an enrollment
```javascript
// Find John Smith's ID and Math 101's ID
let johnId = db.students.findOne({ email: 'john.smith@school.edu' })._id;
let mathId = db.courses.findOne({ courseName: 'Mathematics 101' })._id;

// Update the grade for that specific enrollment
db.enrollments.updateOne(
  { studentId: johnId, courseId: mathId },
  { $set: { grade: 'A+' } }
);
```

## DELETE (Remove Documents)

### Delete a student by email
```javascript
// First, find the student's ID
let studentToDelete = db.students.findOne({ email: 'alice.g@school.edu' });

if (studentToDelete) {
  let studentIdToDelete = studentToDelete._id;

  // Delete enrollments associated with the student
  db.enrollments.deleteMany({ studentId: studentIdToDelete });

  // Delete the student document
  db.students.deleteOne({ _id: studentIdToDelete });

  print("Deleted student and their enrollments.");
} else {
  print("Student not found.");
}
```
*(Note: MongoDB doesn't have automatic cascading deletes like SQL foreign keys. You need to handle related data deletion manually or through application logic.)*

### Delete a course
```javascript
// Find the course ID
let courseToDelete = db.courses.findOne({ courseName: 'Art History' });

if (courseToDelete) {
  let courseIdToDelete = courseToDelete._id;

  // Check if any enrollments exist for this course
  let enrollmentsExist = db.enrollments.countDocuments({ courseId: courseIdToDelete });

  if (enrollmentsExist > 0) {
    print("Cannot delete course: Students are still enrolled. Delete enrollments first.");
    // Optional: Delete enrollments first if desired
    // db.enrollments.deleteMany({ courseId: courseIdToDelete });
    // print("Deleted associated enrollments.");
  } else {
    // Delete the course document
    db.courses.deleteOne({ _id: courseIdToDelete });
    print("Deleted course.");
  }
} else {
  print("Course not found.");
}
```

### Unenroll a student from a course
```javascript
// Find the IDs
let studentId = db.students.findOne({ email: 'john.smith@school.edu' })._id;
let courseId = db.courses.findOne({ courseName: 'Biology' })._id;

// Delete the specific enrollment document
db.enrollments.deleteOne({ studentId: studentId, courseId: courseId });

```

## Indexing Recommendations

1. **Essential Indexes**:
```javascript
// Single field index
db.students.createIndex({ name: 1 });

// Compound index
db.enrollments.createIndex({ studentId: 1, courseId: 1 });
```

2. **Query Optimization**:
- Use `.explain('executionStats')` to analyze queries
- Project only needed fields: `db.students.find({}, { name: 1, email: 1 })`
- Use `$limit` for initial data exploration

3. **Performance Monitoring**:
- Check current operations: `db.currentOp()`
- View query stats: `db.stats()`

## Performance Tips

### Optimize Queries

- Use indexes for frequent queries
- Avoid using `$ne` and `$not` for large datasets
- Use `$in` instead of multiple `$or` conditions

### Optimize Data Retrieval

- Use projection to retrieve only necessary fields
- Use `$limit` to reduce data transfer
- Avoid using `find()` with large datasets

### Optimize Data Storage

- Use efficient data types (e.g., `Date` instead of string)
- Avoid using large strings or binary data
- Use compression for large datasets

## Troubleshooting

### Common Issues

**Connection Issues**
- Verify MongoDB is running: `docker ps`
- Check port mapping: `docker inspect mongo-demo`

**Authentication Errors**
- Ensure credentials match `.env` file
- Verify authentication database: `use admin`

**Slow Performance**
- Check for missing indexes with `.explain()`
- Monitor slow queries: `db.setProfilingLevel(1, 50)`
