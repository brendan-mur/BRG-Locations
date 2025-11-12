-- This file runs when MySQL container starts for the first time
-- Ensure the database and user exist
CREATE DATABASE IF NOT EXISTS brg;
CREATE USER IF NOT EXISTS 'webroot'@'%' IDENTIFIED BY 'L3tm31n!';
GRANT ALL PRIVILEGES ON brg.* TO 'webroot'@'%';
FLUSH PRIVILEGES;