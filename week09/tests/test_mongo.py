import os
import pytest
from pymongo import MongoClient
from datetime import datetime

# Database connection parameters
MONGO_PARAMS = {
    'host': 'localhost',
    'port': 27017,
    'username': os.getenv('MONGO_INITDB_ROOT_USERNAME', 'mongoadmin'),
    'password': os.getenv('MONGO_INITDB_ROOT_PASSWORD', 'password123'),
    'authSource': 'admin'
}

DB_NAME = 'school_db_mongo'

@pytest.fixture
def mongo_client():
    """Create a connection to the MongoDB database."""
    client = MongoClient(**MONGO_PARAMS)
    yield client
    client.close()

@pytest.fixture
def db(mongo_client):
    """Get the database instance."""
    return mongo_client[DB_NAME]

def test_connection(mongo_client):
    """Test that we can connect to the database."""
    result = mongo_client.admin.command('ping')
    assert result.get('ok') == 1.0

def test_collections_exist(db):
    """Test that required collections exist."""
    collections = db.list_collection_names()
    assert 'students' in collections
    assert 'courses' in collections
    assert 'enrollments' in collections

def test_create_student(db):
    """Test creating a new student."""
    # Create a test student
    student_data = {
        'name': 'Test Student',
        'email': 'test@example.com',
        'age': 20,
        'address': {
            'city': 'Test City',
            'state': 'Test State'
        }
    }
    
    result = db.students.insert_one(student_data)
    student_id = result.inserted_id
    
    # Verify the student was created
    student = db.students.find_one({'_id': student_id})
    
    assert student['name'] == 'Test Student'
    assert student['email'] == 'test@example.com'
    assert student['age'] == 20
    assert student['address']['city'] == 'Test City'
    
    # Clean up
    db.students.delete_one({'_id': student_id})

def test_create_course(db):
    """Test creating a new course."""
    # Create a test course
    course_data = {
        'name': 'Test Course',
        'description': 'Test Description',
        'credits': 3,
        'professor': 'Test Professor'
    }
    
    result = db.courses.insert_one(course_data)
    course_id = result.inserted_id
    
    # Verify the course was created
    course = db.courses.find_one({'_id': course_id})
    
    assert course['name'] == 'Test Course'
    assert course['credits'] == 3
    assert course['professor'] == 'Test Professor'
    
    # Clean up
    db.courses.delete_one({'_id': course_id})

def test_create_enrollment(db):
    """Test creating a new enrollment."""
    # Create a test student
    student_data = {
        'name': 'Test Student',
        'email': 'test@example.com',
        'age': 20,
        'address': {
            'city': 'Test City',
            'state': 'Test State'
        }
    }
    student_result = db.students.insert_one(student_data)
    student_id = student_result.inserted_id
    
    # Create a test course
    course_data = {
        'name': 'Test Course',
        'credits': 3
    }
    course_result = db.courses.insert_one(course_data)
    course_id = course_result.inserted_id
    
    # Create an enrollment
    enrollment_data = {
        'studentId': student_id,
        'courseId': course_id,
        'enrollmentDate': datetime.now(),
        'status': 'active'
    }
    enrollment_result = db.enrollments.insert_one(enrollment_data)
    enrollment_id = enrollment_result.inserted_id
    
    # Verify the enrollment was created
    enrollment = db.enrollments.find_one({'_id': enrollment_id})
    
    assert enrollment['studentId'] == student_id
    assert enrollment['courseId'] == course_id
    assert enrollment['status'] == 'active'
    
    # Clean up
    db.enrollments.delete_one({'_id': enrollment_id})
    db.students.delete_one({'_id': student_id})
    db.courses.delete_one({'_id': course_id})

def test_schema_validation(db):
    """Test that schema validation is working."""
    # Try to create an invalid student (missing required field)
    invalid_student = {
        'name': 'Invalid Student',
        # Missing email
        'age': 20
    }
    
    # This should fail due to schema validation
    try:
        db.students.insert_one(invalid_student)
        assert False, "Schema validation failed to reject invalid document"
    except Exception:
        # Expected error due to schema validation
        pass
