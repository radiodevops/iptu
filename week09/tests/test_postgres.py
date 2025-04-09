import os
import pytest
import psycopg2
from psycopg2.extras import RealDictCursor

# Database connection parameters
DB_PARAMS = {
    'dbname': os.getenv('POSTGRES_DB', 'school_db'),
    'user': os.getenv('POSTGRES_USER', 'teacher'),
    'password': os.getenv('POSTGRES_PASSWORD', 'password123'),
    'host': 'localhost',
    'port': 5432
}

@pytest.fixture
def db_connection():
    """Create a connection to the PostgreSQL database."""
    conn = psycopg2.connect(**DB_PARAMS)
    conn.autocommit = True
    yield conn
    conn.close()

@pytest.fixture
def db_cursor(db_connection):
    """Create a cursor for database operations."""
    cursor = db_connection.cursor(cursor_factory=RealDictCursor)
    yield cursor
    cursor.close()

def test_connection(db_connection):
    """Test that we can connect to the database."""
    assert db_connection.closed == 0

def test_students_table_exists(db_cursor):
    """Test that the students table exists."""
    db_cursor.execute("SELECT to_regclass('public.students') IS NOT NULL as exists")
    result = db_cursor.fetchone()
    assert result['exists']

def test_courses_table_exists(db_cursor):
    """Test that the courses table exists."""
    db_cursor.execute("SELECT to_regclass('public.courses') IS NOT NULL as exists")
    result = db_cursor.fetchone()
    assert result['exists']

def test_enrollments_table_exists(db_cursor):
    """Test that the enrollments table exists."""
    db_cursor.execute("SELECT to_regclass('public.enrollments') IS NOT NULL as exists")
    result = db_cursor.fetchone()
    assert result['exists']

def test_create_student(db_cursor):
    """Test creating a new student."""
    # Create a test student
    db_cursor.execute(
        "INSERT INTO students (name, email, age) VALUES (%s, %s, %s) RETURNING id",
        ("Test Student", "test@example.com", 20)
    )
    student_id = db_cursor.fetchone()['id']
    
    # Verify the student was created
    db_cursor.execute("SELECT * FROM students WHERE id = %s", (student_id,))
    student = db_cursor.fetchone()
    
    assert student['name'] == "Test Student"
    assert student['email'] == "test@example.com"
    assert student['age'] == 20
    
    # Clean up
    db_cursor.execute("DELETE FROM students WHERE id = %s", (student_id,))

def test_create_course(db_cursor):
    """Test creating a new course."""
    # Create a test course
    db_cursor.execute(
        "INSERT INTO courses (name, credits) VALUES (%s, %s) RETURNING id",
        ("Test Course", 3)
    )
    course_id = db_cursor.fetchone()['id']
    
    # Verify the course was created
    db_cursor.execute("SELECT * FROM courses WHERE id = %s", (course_id,))
    course = db_cursor.fetchone()
    
    assert course['name'] == "Test Course"
    assert course['credits'] == 3
    
    # Clean up
    db_cursor.execute("DELETE FROM courses WHERE id = %s", (course_id,))

def test_create_enrollment(db_cursor):
    """Test creating a new enrollment."""
    # Create a test student and course
    db_cursor.execute(
        "INSERT INTO students (name, email, age) VALUES (%s, %s, %s) RETURNING id",
        ("Test Student", "test@example.com", 20)
    )
    student_id = db_cursor.fetchone()['id']
    
    db_cursor.execute(
        "INSERT INTO courses (name, credits) VALUES (%s, %s) RETURNING id",
        ("Test Course", 3)
    )
    course_id = db_cursor.fetchone()['id']
    
    # Create an enrollment
    db_cursor.execute(
        "INSERT INTO enrollments (student_id, course_id, enrollment_date) VALUES (%s, %s, %s) RETURNING id",
        (student_id, course_id, "2025-04-05")
    )
    enrollment_id = db_cursor.fetchone()['id']
    
    # Verify the enrollment was created
    db_cursor.execute("SELECT * FROM enrollments WHERE id = %s", (enrollment_id,))
    enrollment = db_cursor.fetchone()
    
    assert enrollment['student_id'] == student_id
    assert enrollment['course_id'] == course_id
    
    # Clean up
    db_cursor.execute("DELETE FROM enrollments WHERE id = %s", (enrollment_id,))
    db_cursor.execute("DELETE FROM students WHERE id = %s", (student_id,))
    db_cursor.execute("DELETE FROM courses WHERE id = %s", (course_id,))
