CREATE DATABASE IF NOT EXISTS kavasi_db;
USE kavasi_db;

-- Admins Table
CREATE TABLE IF NOT EXISTS Admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contacts Table
CREATE TABLE IF NOT EXISTS Contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  projectType VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE IF NOT EXISTS Projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  imageUrl VARCHAR(255) NOT NULL,
  projectLink VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- TeamMembers Table
CREATE TABLE IF NOT EXISTS TeamMembers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  imageUrl VARCHAR(255) NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Jobs Table (Careers/Internships)
CREATE TABLE IF NOT EXISTS Jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type ENUM('Full-Time', 'Part-Time', 'Internship', 'Contract') NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Applicants Table
CREATE TABLE IF NOT EXISTS Applicants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_id VARCHAR(20) NOT NULL UNIQUE,
  job_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(20),
  portfolio VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES Jobs(id) ON DELETE CASCADE
);

-- Insert Mock Data
INSERT IGNORE INTO Admins (email, password, name) VALUES ('admin@kavasi.com', '$2b$10$GCfJiHGLime5JjLJ6uNV7OOl04rPUN8V0ZAiafFuPyXBXbXbDSlNS', 'Mock Admin');

INSERT IGNORE INTO Projects (name, description, imageUrl, projectLink) VALUES 
('AeroSpace ERP UI', 'A massive internal enterprise resource planning system redesign for an aerospace company. Built in Next.js and Tailwind.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', 'https://example.com'),
('AutoCRM AI', 'An automated CRM that leverages local LLMs to categorize and reply to thousands of customer emails automatically.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', 'https://example.com'),
('Fintech Dashboard', 'High performance data visualization dashboard tracking crypto and fiat assets in real time.', 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800', 'https://example.com');

INSERT IGNORE INTO TeamMembers (name, role, imageUrl, display_order) VALUES 
('Siddhartha', 'Founder & CEO', '/images/founder.jpg', 1),
('Kashish', 'Lead Developer', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', 2),
('Rahul Singh', 'AI Specialist', 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400', 3),
('Rohit Singh', 'UI/UX Designer', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', 4);

INSERT IGNORE INTO Jobs (id, title, type, description) VALUES 
(1, 'Senior Next.js Developer', 'Full-Time', 'Join our team to build high-performance web applications using Next.js 15, Turbopack, and TailwindCSS.'),
(2, 'AI Automation Intern', 'Internship', 'Learn and deploy intelligent workflows using LangChain, OpenAI APIs, and custom Python backend systems.');

INSERT IGNORE INTO Applicants (application_id, job_id, name, email, mobile, portfolio) VALUES
('KAVASI-000001', 1, 'Alex Johnson', 'alex@example.com', '9876543210', 'https://github.com/alex'),
('KAVASI-000002', 2, 'Maria Garcia', 'maria@example.com', '9876543211', 'https://maria.dev');
