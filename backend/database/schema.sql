-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Departments
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users (Admin, Doyen, Chef, Prof, Student)
CREATE TYPE user_role AS ENUM ('admin', 'doyen', 'chef_departement', 'professeur', 'etudiant');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    department_id UUID REFERENCES departments(id),
    matricule VARCHAR(100) UNIQUE, -- For students and profs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Formations (Study Programs)
CREATE TABLE formations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    department_id UUID REFERENCES departments(id) NOT NULL,
    level VARCHAR(50), -- e.g., Licence 1, Master 2
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Professors (Details)
CREATE TABLE professors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    department_id UUID REFERENCES departments(id) NOT NULL,
    specialty VARCHAR(255),
    UNIQUE(user_id)
);

-- Students (Details)
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    formation_id UUID REFERENCES formations(id) NOT NULL,
    promotion_year INTEGER, -- e.g., 2025
    UNIQUE(user_id)
);

-- Rooms (Amphis, Salles)
CREATE TYPE room_type AS ENUM ('amphi', 'salle_td', 'labo');

CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    capacity INTEGER NOT NULL,
    type room_type NOT NULL,
    building VARCHAR(100),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Modules (Subjects)
CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    credits INTEGER NOT NULL,
    formation_id UUID REFERENCES formations(id) NOT NULL,
    semester INTEGER, -- 1 or 2
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sessions (Exam Periods)
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL, -- e.g., "Session Hiver 2025"
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Exams (The event to be scheduled)
CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES modules(id) NOT NULL,
    session_id UUID REFERENCES sessions(id) NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 90,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Time Slots (Available slots for exams)
CREATE TABLE time_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES sessions(id) NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    UNIQUE(date, start_time, end_time)
);

-- Exam Schedule (The Result)
CREATE TYPE exam_status AS ENUM ('draft', 'validated', 'published');

CREATE TABLE exam_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID REFERENCES exams(id) NOT NULL,
    room_id UUID REFERENCES rooms(id) NOT NULL,
    time_slot_id UUID REFERENCES time_slots(id) NOT NULL,
    supervisor_id UUID REFERENCES professors(id), -- Main supervisor
    status exam_status DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(room_id, time_slot_id), -- Room cannot be double booked
    UNIQUE(supervisor_id, time_slot_id) -- Prof cannot be double booked
);

-- Constraints (Configuration)
CREATE TABLE constraints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    weight INTEGER DEFAULT 1, -- Priority
    is_hard_constraint BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
