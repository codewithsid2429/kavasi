-- Run this in phpMyAdmin SQL tab if you already imported the old database.sql
-- This adds the missing application_id column to Applicants table

ALTER TABLE Applicants
  ADD COLUMN IF NOT EXISTS application_id VARCHAR(20) UNIQUE AFTER id;
