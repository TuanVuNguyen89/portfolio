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
  'https://ntuanvu89.id.vn'
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

-- Education
INSERT INTO education (institution, major, start_date, end_date, description, achievements) VALUES 
(
  'University of FPT',
  'Software Engineering',
  'Sept 2023',
  'now',
  'GPA: 3.4/4.0\nAwarded a **100% scholarship** covering the entirety of the study period and actively participated in various university activities.',
  '["Participated in the ICPC Asia-Pacific Regional Contest 2023", "Third Prize in the ICPC National Round 2024", "First Prize in the ICPC Northern Regional Round 2024", "Second Prize in the Specialized Informatics Olympiad 2023", "Third Prize in the Super Cup Olympiad 2024"]'
),
(
  'Bien Hoa high school for the gifted',
  'Infomatics',
  'Sep 2020',
  'May 2023',
  'National Consolation Prize in 2022 and 2023\nFirst Prize at the Provincial Level in 2023',
  NULL
);

-- Projects
INSERT INTO project (title, description, tech_stack, live_url, repo_url, content, achievement, images) VALUES 
(
  'Facebook Agents - VPBank Hackathon 2025', 
  'Facebook Messenger chatbot system with seamless handoff between AI and human agents.',
  '["FastAPI", "Elasticsearch", "NLP", "Facebook Messenger API"]',
  '#',
  'https://github.com/PiVKT/rag_chatbot',
  'A Facebook Messenger chatbot system with seamless AI-to-human agent handoff.\nApplied RAG (Retrieval-Augmented Generation) for context-aware responses from real-time data.\nImplemented intent recognition and conversation monitoring for customer support.',
  'Achieved Top 20 in VPBank Hackathon 2025',
  '[]'
),
(
  'Open MSocial - Microservices Social Media Platform', 
  'Microservices Social Media Platform',
  '["Java 21", "Node.js", "Docker", "MySQL", "MongoDB", "Cloudinary", "Kafka"]',
  '#',
  'https://github.com/TuanVuNguyen89/open-msocial',
  'A microservices-based social media platform comprising 8 core services: API Gateway, Identity, Profile, Post, Comment, Media, Notification, and Web App.\nUses Kafka for asynchronous communication for notifications and events.\nServices are deployed and managed using Docker Compose.',
  NULL,
  '[]'
),
(
  'FU Online Judge', 
  'Online code judging system for FPT students',
  '["ASP.NET", "ReactJS", "PostgreSQL", "Azure"]',
  '#',
  'https://github.com/TuanVuNguyen89/online-judge-fuoj',
  'An online code judging system for FPT students, supporting submissions and contests.\nIncludes backend APIs for code execution, evaluation, and contest scheduling.',
  NULL,
  '[]'
);
