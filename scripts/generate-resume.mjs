import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 10.5pt; color: #222; background: #fff; padding: 36px 48px; line-height: 1.4; }

  .name { font-size: 22pt; font-weight: 700; color: #1a1a1a; letter-spacing: 1px; text-transform: uppercase; }
  .title { font-size: 11pt; color: #4a4a4a; margin-top: 2px; }
  .contact { font-size: 9.5pt; color: #444; margin-top: 5px; }
  .contact a { color: #444; text-decoration: none; }

  .divider { border: none; border-top: 2px solid #2d2d2d; margin: 10px 0 6px 0; }
  .thin-divider { border: none; border-top: 1px solid #ddd; margin: 6px 0; }

  .section-title {
    font-size: 10.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #1a1a1a;
    margin-bottom: 6px;
    margin-top: 12px;
  }

  .summary { font-size: 10pt; color: #333; line-height: 1.5; }

  .skills-row { margin-bottom: 3px; font-size: 10pt; }
  .skills-row strong { color: #1a1a1a; }

  .job-header { display: flex; justify-content: space-between; align-items: baseline; }
  .job-title { font-weight: 700; font-size: 10.5pt; color: #1a1a1a; }
  .job-date { font-size: 9.5pt; color: #555; white-space: nowrap; }
  .job-company { font-size: 10pt; color: #444; margin-bottom: 4px; }
  .job-company span { font-style: italic; }

  .project-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
  .project-title { font-weight: 700; font-size: 10.5pt; color: #1a1a1a; }
  .project-live { font-size: 9.5pt; color: #555; }
  .project-stack { font-size: 9.5pt; color: #444; margin-bottom: 3px; }
  .project-stack strong { color: #1a1a1a; }

  ul { padding-left: 16px; margin-top: 3px; }
  ul li { font-size: 10pt; color: #333; margin-bottom: 2px; line-height: 1.45; }

  .edu-header { display: flex; justify-content: space-between; align-items: baseline; }
  .edu-title { font-weight: 700; font-size: 10.5pt; }
  .edu-grade { font-size: 9.5pt; color: #555; }
  .edu-school { font-size: 10pt; color: #444; margin-bottom: 2px; }

  .cert-item { font-size: 10pt; color: #333; margin-bottom: 2px; }
  .cert-item strong { color: #1a1a1a; }

  .additional-row { font-size: 10pt; color: #333; margin-bottom: 2px; }
  .additional-row strong { color: #1a1a1a; }

  .section { margin-bottom: 4px; }
</style>
</head>
<body>

  <!-- Header -->
  <div class="name">Sibat Sajjad</div>
  <div class="title">Full Stack Developer | AI-Integrated Applications</div>
  <div class="contact">
    Islamabad, Pakistan &nbsp;|&nbsp; +92 336 1987271 &nbsp;|&nbsp; sajjadsibat33@gmail.com &nbsp;|&nbsp;
    linkedin.com/in/sibat-sajjad-a096731a9 &nbsp;|&nbsp; github.com/SibatSajjad20
  </div>
  <hr class="divider">

  <!-- Career Summary -->
  <div class="section">
    <div class="section-title">Career Summary</div>
    <div class="summary">
      Results-driven Full Stack Developer specializing in MERN stack and AI-integrated web applications. Experienced in building production-ready, scalable applications powered by LLMs, computer vision, and real-time systems. Currently pursuing BSCS while gaining hands-on experience through internships and independently shipped AI projects. Passionate about leveraging cutting-edge AI APIs to build tools that solve real-world problems with clean, maintainable code.
    </div>
  </div>
  <hr class="thin-divider">

  <!-- Technical Skills -->
  <div class="section">
    <div class="section-title">Technical Skills</div>
    <div class="skills-row"><strong>Frontend:</strong> React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, Framer Motion, Redux, React Router</div>
    <div class="skills-row"><strong>Backend:</strong> Node.js, Express.js, Next.js API Routes, RESTful APIs, Socket.IO, JWT Authentication, Bcrypt</div>
    <div class="skills-row"><strong>Database:</strong> PostgreSQL, Neon (Serverless PostgreSQL), MongoDB, Mongoose, MongoDB Atlas</div>
    <div class="skills-row"><strong>AI &amp; LLM Integration:</strong> Google Gemini API (@google/genai SDK), Prompt Engineering, LLM Response Handling, Hugging Face API, CLIP Embeddings, Retry Logic &amp; Rate Limit Handling</div>
    <div class="skills-row"><strong>Languages:</strong> JavaScript, TypeScript, C++, Java, Python (Beginner)</div>
    <div class="skills-row"><strong>Tools &amp; DevOps:</strong> Git, GitHub, VS Code, Postman, npm, Vite, Vercel, Render, Cloudinary</div>
    <div class="skills-row"><strong>Other:</strong> Responsive Design, Real-time Communication, Serverless Architecture, Cloud Deployment, Agile Development</div>
  </div>
  <hr class="thin-divider">

  <!-- Work Experience -->
  <div class="section">
    <div class="section-title">Work Experience</div>

    <div class="job-header">
      <div class="job-title">Full Stack Developer Intern</div>
      <div class="job-date">Feb 2025 – Nov 2025</div>
    </div>
    <div class="job-company">BurakAI &nbsp;|&nbsp; <span>Islamabad, Pakistan (Hybrid)</span></div>
    <ul>
      <li>Developed and maintained full-stack web applications using MERN stack in an AI-focused startup environment</li>
      <li>Collaborated with cross-functional teams to deliver high-quality, production-ready software solutions</li>
      <li>Implemented responsive UI components and RESTful APIs following best practices</li>
      <li>Participated in code reviews and agile development sprints</li>
    </ul>

    <div style="margin-top:8px;">
      <div class="job-header">
        <div class="job-title">Freelance Web Developer</div>
        <div class="job-date">2023 – Present</div>
      </div>
      <div class="job-company">Self-Employed &nbsp;|&nbsp; <span>Remote</span></div>
      <ul>
        <li>Built custom websites and full-stack web applications for clients across various industries</li>
        <li>Delivered end-to-end solutions from requirement gathering to cloud deployment on Vercel and Render</li>
        <li>Specialized in MERN stack and Next.js development with responsive, accessible design</li>
        <li>Managed client communications and project timelines independently</li>
      </ul>
    </div>
  </div>
  <hr class="thin-divider">

  <!-- Projects -->
  <div class="section">
    <div class="section-title">Featured Projects</div>

    <div class="project-header">
      <div class="project-title">FlashHire — AI-Powered Resume Optimizer</div>
      <div class="project-live">Live: flashhire.vercel.app &nbsp;|&nbsp; github.com/SibatSajjad20/flashhire</div>
    </div>
    <div class="project-stack"><strong>Tech Stack:</strong> Next.js 16, React 19, Google Gemini AI, PostgreSQL, Neon, Tailwind CSS, Vercel</div>
    <ul>
      <li>Engineered an AI-powered resume optimizer that rewrites resume bullets to maximize ATS keyword matching using Google Gemini 2.5 Flash acting as a Senior Technical Recruiter persona</li>
      <li>Designed a multi-constraint prompt engineering system with 4 hard rules ensuring output quality, keyword density, and professional formatting without fabricating experience</li>
      <li>Built a serverless Next.js API route with exponential backoff retry logic (3 attempts, 1s/2s delays) handling Gemini API 503 overload errors gracefully</li>
      <li>Architected a PostgreSQL schema on Neon serverless database with 3 relational tables storing full optimization history with cascading deletes</li>
      <li>Deployed full-stack application on Vercel with environment-secured API keys, achieving sub-3s optimization response times</li>
    </ul>

    <div style="margin-top:8px;">
      <div class="project-header">
        <div class="project-title">CampusFound — AI-Powered Lost &amp; Found Platform</div>
      </div>
      <div class="project-stack"><strong>Tech Stack:</strong> React, TypeScript, Node.js, MongoDB, Socket.IO, Tailwind CSS, Hugging Face API</div>
      <ul>
        <li>Built full-stack platform with AI visual search using CLIP embeddings and perceptual hashing for image similarity matching</li>
        <li>Implemented real-time chat system with Socket.IO for instant user-to-user communication</li>
        <li>Developed admin approval workflow and enterprise-grade security (JWT, bcrypt, rate limiting, XSS protection)</li>
        <li>Impact: Designed for 5000+ students, reduces item recovery time by 70%</li>
      </ul>
    </div>

    <div style="margin-top:8px;">
      <div class="project-title">Expense Manager — Personal Finance Tracker</div>
      <div class="project-stack"><strong>Tech Stack:</strong> MongoDB, Express.js, React, Node.js, Chart.js</div>
      <ul>
        <li>Developed comprehensive expense tracking app with visual analytics, budget alerts, and category-wise reporting</li>
        <li>Built RESTful API with full CRUD operations, JWT authentication, and monthly/yearly financial reports</li>
      </ul>
    </div>
  </div>
  <hr class="thin-divider">

  <!-- Education -->
  <div class="section">
    <div class="section-title">Education</div>
    <div class="edu-header">
      <div class="edu-title">Bachelor of Science in Computer Science (BSCS)</div>
      <div class="edu-grade">Ongoing</div>
    </div>
    <div class="edu-school">Foundation University School of Science &amp; Technology (FUSST)</div>
    <div style="font-size:9.5pt;color:#555;margin-bottom:6px;">Relevant Coursework: Data Structures, Algorithms, OOP, DBMS, Web Technologies</div>

    <div class="edu-header">
      <div class="edu-title">Intermediate (FSc Pre-Engineering)</div>
      <div class="edu-grade">83%</div>
    </div>
    <div class="edu-school" style="margin-bottom:6px;">Army Public School (APS) Fort Road, Rawalpindi</div>

    <div class="edu-header">
      <div class="edu-title">Matriculation (SSC)</div>
      <div class="edu-grade">91%</div>
    </div>
    <div class="edu-school">Army Public School (APS) Askari-14, Rawalpindi</div>
  </div>
  <hr class="thin-divider">

  <!-- Certifications -->
  <div class="section">
    <div class="section-title">Certifications &amp; Achievements</div>
    <div class="cert-item"><strong>AI Integration:</strong> Independently built and deployed 2 production AI-powered applications (Gemini API, Hugging Face)</div>
    <div class="cert-item"><strong>MERN Stack Development:</strong> Completed comprehensive full-stack bootcamp</div>
    <div class="cert-item"><strong>Problem Solving:</strong> Solved 100+ coding challenges on competitive platforms</div>
    <div class="cert-item"><strong>Dean's List:</strong> Maintained high academic performance throughout university</div>
    <div class="cert-item"><strong>Open Source:</strong> Active GitHub profile with multiple public repositories</div>
    <div class="cert-item"><strong>Hackathon Participant:</strong> Built functional prototypes under time constraints</div>
  </div>
  <hr class="thin-divider">

  <!-- Additional -->
  <div class="section">
    <div class="section-title">Additional Information</div>
    <div class="additional-row"><strong>Languages:</strong> English (Fluent), Urdu (Native)</div>
    <div class="additional-row"><strong>Availability:</strong> Immediate | Open to full-time, part-time, and freelance opportunities</div>
    <div class="additional-row"><strong>Interests:</strong> AI/LLM Integration, Prompt Engineering, Cloud Computing, Open Source, UI/UX Design</div>
    <div class="additional-row"><strong>Soft Skills:</strong> Team Collaboration, Communication, Time Management, Adaptability</div>
  </div>

</body>
</html>`;

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.pdf({
  path: path.join(__dirname, '..', 'Sibat_Sajjad_Resume_Updated.pdf'),
  format: 'A4',
  margin: { top: '0', bottom: '0', left: '0', right: '0' },
  printBackground: true,
});
await browser.close();
console.log('PDF generated: Sibat_Sajjad_Resume_Updated.pdf');
