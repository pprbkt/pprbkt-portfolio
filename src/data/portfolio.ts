export const portfolioData = {
    hero: {
        name: "Dhanush",
        role: "AI/ML Engineer & Full Stack Developer",
        headline: "Building intelligent systems & scalable web applications.",
        location: "Mysore, Karnataka, India",
        cta: {
            primary: "See My Work",
            secondary: "Contact Me",
        },
    },
    socials: {
        email: "dhanushhs1@outlook.com",
        linkedin: "https://linkedin.com/in/paperbukit",
        github: "https://github.com/pprbkt",
        website: "https://pprbkt.netlify.app",
        x: "https://x.com/paperbukit",
        phone: "+91 8660833055"
    },
    about: {
        title: "About Me",
        description:
            "I am a Bachelor of Engineering student in Artificial Intelligence & Machine Learning at Vidyavardhaka College of Engineering, Mysore. I specialize in building AI-powered applications and scalable web solutions, with a strong foundation in Data Structures, Algorithms, and Neural Networks.",
        skills: {
            languages: ["Python", "Java", "JavaScript", "TypeScript", "C", "SQL"],
            frameworks: ["LangChain", "Groq Llama 3", "FAISS", "NLTK", "Scikit-learn", "Pandas", "NumPy", "Tesseract OCR"],
            web: ["React.js", "Next.js", "Streamlit", "Node.js", "TailwindCSS", "Firebase", "Supabase"],
            tools: ["Git", "GitHub", "VS Code", "Postman", "Linux"]
        },
        education: [
            {
                school: "Vidyavardhaka College of Engineering",
                degree: "B.E. in Artificial Intelligence & Machine Learning",
                period: "Aug. 2023 – June 2027 (Expected)",
                location: "Mysore, India",
                coursework: "Data Structures & Algorithms, DBMS, Neural Networks, Web Technologies, OOP"
            }
        ],
        achievements: [
            {
                title: "Machine Learning Specialization",
                issuer: "University of Washington (Coursera)",
                date: "Aug. 2025",
                desc: "Covered Regression, Classification, Clustering, and Information Retrieval."
            },
            {
                title: "Google Cloud Skills Boost",
                issuer: "Diamond League Member",
                date: "Nov. 2025",
                desc: "Badges in Gen AI (Gemini), Kubernetes (GKE), BigQuery, and Serverless Firebase."
            },
            {
                title: "Problem Solving",
                issuer: "LeetCode / HackerRank",
                date: "Present",
                desc: "Solved 100+ algorithmic problems (Arrays, Strings, DP)."
            }
        ]
    },
    projects: [
        {
            title: "PDF Chatbot with Groq Llama 3",
            description: "A multi-PDF RAG chatbot using Streamlit and Groq Llama 3 (8B) for instant Q&A with chat history export. Features Tesseract OCR and FAISS vector retrieval.",
            tags: ["Python", "Streamlit", "LangChain", "Groq Llama 3", "FAISS"],
            link: "https://github.com/pprbkt", // Placeholder if no specific link
            image: "/placeholder-project.jpg",
        },
        {
            title: "College Club Platform",
            description: "Scalable club portal with RBAC via Firebase, dynamic blogs, and project showcases. Built with Next.js App Router and TypeScript.",
            tags: ["Next.js", "TypeScript", "Firebase", "TailwindCSS"],
            link: "https://github.com/pprbkt",
            image: "/placeholder-project.jpg",
        },
        {
            title: "AI Discord Chatbot",
            description: "Interactive bot using NLTK for NLP and Nomi AI for persona-based conversations. Modular command system with Discord.py.",
            tags: ["Python", "Discord.py", "NLTK", "Nomi AI"],
            link: "https://github.com/pprbkt",
            image: "/placeholder-project.jpg",
        },
        {
            title: "Eco-Friendly Reward System",
            description: "Gamified web app incentivizing sustainable behaviors. Node.js backend tracks activities and calculates reward points.",
            tags: ["React.js", "Node.js", "Web Development"],
            link: "https://github.com/pprbkt",
            image: "/placeholder-project.jpg",
        },
    ],
};
