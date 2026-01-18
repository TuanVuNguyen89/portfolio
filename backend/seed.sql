-- Profile
INSERT INTO profile (name, tagline, summary, email, phone, location, linkedin, github, website) VALUES (
  'Nguyen Tuan Vu',
  'Software Engineer',
  'Software Engineer with strong backend and algorithmic foundations. Currently a VPBank Young Talent working as a Fullstack Developer in the GenAI department, building backend systems and AI-powered applications for banking use cases. Experienced with .NET, Java, Python, microservices, and production systems.',
  'nguyentuanvu@gmail.com',
  '(+84) 886647741',
  'Ha Noi, Viet Nam',
  'https://linkedin.com/in/ntuanvu89',
  'https://github.com/TuanVuNguyen89',
  '#'
);

-- Skills
INSERT INTO skill (category, name, proficiency) VALUES 
('Languages', 'C/C++', 90),
('Languages', 'C#', 90),
('Languages', 'Java', 85),
('Languages', 'Python', 85),
('Languages', 'JavaScript', 80),
('Frameworks', '.NET', 90),
('Frameworks', 'ReactJS', 80),
('Frameworks', 'ASP.NET', 90),
('Frameworks', 'FastAPI', 85),
('Frameworks', 'SpringBoot', 80),
('Frameworks', 'NodeJS', 80),
('Databases', 'PostgreSQL', 85),
('Databases', 'MySQL', 85),
('Databases', 'MongoDB', 80),
('DevOps', 'Docker', 80),
('DevOps', 'Git/Github', 90);

-- Experience
INSERT INTO experience (company, role, start_date, end_date, description, location) VALUES 
(
  'VPBank Young Talent', 
  'Fullstack Developer (GenAI)', 
  'Oct 2025', 
  'Present', 
  '- Selected as Top 20 in the VPBank Hackathon 2025.\n- Developed and maintained backend services and fullstack features for internal banking applications.\n- Collaborated with the GenAI team to integrate LLM-based solutions into real banking workflows.\n- Built production-ready services with focus on scalability, reliability, and clean architecture.',
  'Ha Noi'
),
(
  'Viettel Digital Talent Program', 
  'Software Engineering Track', 
  'Apr 2025', 
  'Sep 2025', 
  '- Selected for Viettel’s flagship tech talent program (500 positions across 9 high-tech domains).\n- Received intensive training in software engineering fundamentals, system design, and best practices.\n- Completed a 2-month internship at Viettel Digital Services, contributing to real-world internal systems.',
  'Ha Noi'
),
(
  'Intercom Vietnam Engineers', 
  'Backend Engineer Intern', 
  'Dec 2024', 
  'May 2025', 
  '- Built and maintained backend services using C# and .NET in a production environment.\n- Worked extensively with PostgreSQL, LINQ, and clean architecture following industry standards.\n- Contributed to backend system performance, stability, and maintainability.',
  'Ha Noi'
);

-- Projects
INSERT INTO project (title, description, tech_stack, live_url, repo_url, content) VALUES 
(
  'Facebook Agents', 
  'Facebook Messenger chatbot system with seamless handoff between AI and human agents.',
  '["FastAPI", "Elasticsearch", "NLP", "Facebook Messenger API"]',
  '#',
  'https://github.com/PiVKT/rag_chatbot',
  'Built a Facebook Messenger chatbot system with seamless handoff between AI and human agents. Applied RAG (Retrieval-Augmented Generation) to deliver context-aware responses using real-time data. Implemented intent recognition and conversation monitoring.'
),
(
  'Open MSocial', 
  'Microservices Social Media Platform',
  '["Java 21", "Node.js", "Docker", "MySQL", "MongoDB", "Cloudinary", "Kafka"]',
  '#',
  'https://github.com/TuanVuNguyen89/open-msocial',
  'Designed and implemented a microservices-based social media platform. Built 8 core services: API Gateway, Identity, Profile, Post, Comment, Media, Notification, and Web App. Implemented asynchronous communication using Kafka.'
),
(
  'FU Online Judge', 
  'Online code judging system for FPT students',
  '["ASP.NET", "ReactJS", "PostgreSQL", "Azure"]',
  '#',
  'https://github.com/TuanVuNguyen89/online-judge-fuoj',
  'Developed an online code judging system supporting submissions and contests. Designed backend APIs for code execution, evaluation, and contest scheduling.'
);
