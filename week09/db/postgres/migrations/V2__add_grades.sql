-- V2__add_grades.sql
-- Add grades to enrollments table

ALTER TABLE enrollments ADD COLUMN grade DECIMAL(5,2) CHECK (grade >= 0 AND grade <= 100);
ALTER TABLE enrollments ADD COLUMN status VARCHAR(20) DEFAULT 'active';

-- Create index for faster queries
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
