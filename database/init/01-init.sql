-- Initial database setup script
-- This script runs automatically when PostgreSQL container is first created

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add any initial database setup here
-- Tables will be created by Sequelize models

-- Example: Create a basic health check table
CREATE TABLE IF NOT EXISTS health_check (
  id SERIAL PRIMARY KEY,
  status VARCHAR(50) NOT NULL DEFAULT 'healthy',
  checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial health check record
INSERT INTO health_check (status) VALUES ('healthy');

