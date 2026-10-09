// Mock Data for Tesseract Esports Society Website

export const INITIAL_ANNOUNCEMENT = {
  id: "ann-01",
  title: "⚡ TESSERACT ESPORTS LEAGUE SEASON 3 ANNOUNCED!",
  description: "Registrations are officially open for the flagship inter-house tournament featuring Valorant, BGMI, and Chess. Over ₹25,000 in prizes and exclusive IITM Tesseract jerseys!",
  image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
  ctaText: "Register for Season 3",
  ctaUrl: "#events",
  startDate: "2026-10-01",
  endDate: "2026-10-31",
  enabled: true,
  displayFrequency: "once_per_user" // or "every_visit"
};

export const INITIAL_GAMES = [
  {
    id: "game-valorant",
    title: "Valorant",
    category: "Esports",
    mode: "5v5 Tactical FPS",
    artwork: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    description: "High-stakes tactical hero shooter. Compete in our bi-weekly custom 10-man scrims and collegiate tournaments.",
    activePlayers: 420,
    rules: [
      "Standard 5v5 competitive settings (MR12)",
      "Vanguard anti-cheat strictly enforced",
      "All agents unlocked in tournament realm",
      "Overtime: Win by 2 rounds"
    ],
    upcomingEventId: "ev-01",
    featured: true
  },
  {
    id: "game-bgmi",
    title: "Battlegrounds Mobile India (BGMI)",
    category: "Esports",
    mode: "Battle Royale (Squad)",
    artwork: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
    description: "Squad battle royale on Erangel and Miramar. Custom rooms with official esports point matrix and anti-teaming protocols.",
    activePlayers: 580,
    rules: [
      "Official BGIS point table: 1st (10pts), 2nd (6pts)... 1 pt per kill",
      "No iPads or tablet devices allowed; smartphones only",
      "Screen recording submission mandatory for top 3 squads"
    ],
    upcomingEventId: "ev-02",
    featured: true
  },
  {
    id: "game-chess",
    title: "Chess Masters",
    category: "Mind Games",
    mode: "1v1 Rapid / Blitz",
    artwork: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80",
    description: "Rapid and Blitz tournaments hosted on Lichess / Chess.com with FIDE-rated time controls and fair-play detection.",
    activePlayers: 310,
    rules: [
      "Time control: 5 min + 3 sec blitz, 10 min rapid",
      "Lichess fair-play cheat detection system active",
      "Webcam monitoring for semifinals and finals"
    ],
    upcomingEventId: "ev-03",
    featured: true
  },
  {
    id: "game-scribbl",
    title: "Skribbl.io & Party Games",
    category: "Casual / Party",
    mode: "Multiplayer Party (up to 12)",
    artwork: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description: "Casual drawing, guessing, and voice-lounge party games hosted every Friday evening on the Tesseract Discord server.",
    activePlayers: 190,
    rules: [
      "Custom IITM BS and tech/esports word packs",
      "No writing words directly on canvas",
      "Points based on speed of correct guess"
    ],
    upcomingEventId: null,
    featured: false
  },
  {
    id: "game-typewars",
    title: "Type Wars Speed Typing",
    category: "Casual / Party",
    mode: "1v1 Real-Time Typing Race",
    artwork: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    description: "Keyboard warriors clash in real-time speed typing duels using competitive programming code snippets and game quotes.",
    activePlayers: 145,
    rules: [
      "MonkeyType and TypeRacer custom lobbies",
      "Minimum 60-second test duration",
      "Accuracy penalty multiplier enabled"
    ],
    upcomingEventId: null,
    featured: false
  },
  {
    id: "game-rocketleague",
    title: "Rocket League",
    category: "Esports",
    mode: "3v3 Soccar",
    artwork: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    description: "High-octane rocket-powered vehicular football. Cross-platform play supported across PC, PlayStation, and Xbox.",
    activePlayers: 210,
    rules: [
      "Standard 3v3 Soccar arena",
      "Default mutators, standard boost",
      "Best of 3 series for group stage; Best of 5 for finals"
    ],
    upcomingEventId: null,
    featured: false
  }
];

export const INITIAL_EVENTS = [
  {
    id: "ev-01",
    title: "Valorant IITM BS Championship 2026",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
    eventType: "Tournament",
    game: "Valorant",
    date: "October 24 - 26, 2026",
    time: "7:00 PM IST",
    status: "Upcoming",
    registrationDeadline: "October 22, 2026",
    prizePool: "₹12,000",
    prizeBreakdown: "1st: ₹7,000 + Trophy | 2nd: ₹3,500 | 3rd: ₹1,500",
    format: "5v5 Single Elimination Bracket",
    eligibility: "Enrolled IIT Madras BS Students with verified student email.",
    googleFormUrl: "https://forms.gle/tesseractValorant2026SampleForm",
    description: "The biggest tactical FPS showdown of the term! Bring your 5-stack or sign up as a free agent. Streamed live with student casters on YouTube & Discord.",
    rules: [
      "All squad members must be verified IITM BS students.",
      "Tournament match server: Mumbai (AWS).",
      "Teams must check in 20 minutes before match start.",
      "Toxicity or harassment will lead to immediate disqualification."
    ],
    schedule: [
      "Oct 22: Registration Closes & Brackets Published",
      "Oct 24: Round of 16 & Quarterfinals (BO1)",
      "Oct 25: Semifinals (BO3)",
      "Oct 26: Grand Finals (BO5) & Broadcast"
    ]
  },
  {
    id: "ev-02",
    title: "Erangel Squad Showdown — BGMI",
    banner: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1000&q=80",
    eventType: "Tournament",
    game: "BGMI",
    date: "November 02, 2026",
    time: "6:30 PM IST",
    status: "Upcoming",
    registrationDeadline: "October 30, 2026",
    prizePool: "₹10,000",
    prizeBreakdown: "1st: ₹6,000 | 2nd: ₹3,000 | Top Fragger: ₹1,000",
    format: "Squads (4 matches across Erangel & Miramar)",
    eligibility: "Open to all verified IIT Madras BS Students.",
    googleFormUrl: "https://forms.gle/tesseractBGMIShowdownSampleForm",
    description: "Four intense custom rooms. 20 squads battle for dominance. Every frag counts towards your placement point total.",
    rules: [
      "Smartphones only. Emulators and iPad/Tablets are banned.",
      "Official room passwords shared 15 mins prior in Discord.",
      "POV recording must be preserved for top 3 teams."
    ],
    schedule: [
      "Match 1: Erangel (Daylight)",
      "Match 2: Miramar (Daylight)",
      "Match 3: Sanhok",
      "Match 4: Erangel (Finals)"
    ]
  },
  {
    id: "ev-03",
    title: "Autumn Blitz Chess Championship",
    banner: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1000&q=80",
    eventType: "Gaming Event",
    game: "Chess",
    date: "October 18, 2026",
    time: "8:00 PM IST",
    status: "Upcoming",
    registrationDeadline: "October 17, 2026",
    prizePool: "₹5,000",
    prizeBreakdown: "1st: ₹3,000 | 2nd: ₹1,500 | 3rd: ₹500",
    format: "9-Round Swiss System (3+2 Blitz)",
    eligibility: "Verified IITM BS Community.",
    googleFormUrl: "https://forms.gle/tesseractChessAutumn2026",
    description: "Fast-paced blitz chess tournament hosted on Lichess team arena. Test your positional mastery under time pressure.",
    rules: [
      "FIDE Arena Blitz regulations apply.",
      "Participants must join the official Tesseract Lichess Team.",
      "Anti-cheating algorithm will audit all games post-match."
    ],
    schedule: [
      "Round 1-5: 8:00 PM - 9:15 PM",
      "Short Break: 15 minutes",
      "Round 6-9: 9:30 PM - 10:45 PM"
    ]
  },
  {
    id: "ev-04",
    title: "Esports Cast & Content Creation Masterclass",
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80",
    eventType: "Workshop",
    game: "General Esports",
    date: "November 08, 2026",
    time: "5:00 PM IST",
    status: "Upcoming",
    registrationDeadline: "November 07, 2026",
    prizePool: "Certificate & Merch",
    prizeBreakdown: "Top 3 student casters get appointed as Official Tesseract Casters",
    format: "Interactive 2-Hour Google Meet Workshop",
    eligibility: "All IITM BS Students interested in commentary & stream production.",
    googleFormUrl: "https://forms.gle/tesseractCastingWorkshop",
    description: "Learn play-by-play commentary, OBS studio stream production, and live tournament graphics management from collegiate esports veterans.",
    rules: ["Active microphone recommended for hands-on casting drills."],
    schedule: [
      "Part 1: The Art of Shoutcasting & Game Knowledge",
      "Part 2: Production Setup in OBS & Discord Audio Routing",
      "Part 3: Live 1-Minute Casting Practice & Feedback"
    ]
  }
];

export const INITIAL_QUIZZES = [
  {
    id: "quiz-01",
    title: "IITM BS Esports & Pop Culture Trivia 2026",
    description: "Test your knowledge of gaming lore, esports tournament history, gaming hardware, and IIT Madras BS trivia!",
    durationMinutes: 5,
    totalQuestions: 6,
    marksPerQuestion: 4,
    negativeMarks: 1,
    status: "Active",
    startDate: "2026-10-01",
    endDate: "2026-10-31",
    leaderboardEnabled: true,
    questions: [
      {
        id: "q1",
        question: "In Valorant, which agent has the ability 'Recon Bolt' that reveals enemy positions in line of sight?",
        options: ["Fade", "Sova", "Cypher", "Gekko"],
        correctAnswer: 1,
        explanation: "Sova is the Russian initiator who uses his custom bow to fire Recon and Shock bolts."
      },
      {
        id: "q2",
        question: "Which Indian team represented the nation at the PUBG Mobile Global Championship (PMGC) 2021 Finals?",
        options: ["Team SouL", "GodLike Esports", "Entity Gaming", "Reckoning Esports"],
        correctAnswer: 1,
        explanation: "GodLike Esports secured the coveted Indian invite slot for the PMGC 2021 Grand Finals."
      },
      {
        id: "q3",
        question: "What is the standard time control for an Armageddon game in competitive chess tie-breaks?",
        options: [
          "5 mins for White, 4 mins for Black (Black wins with a draw)",
          "3 mins for both sides with 2 sec increment",
          "10 mins sudden death",
          "6 mins for White, 5 mins for Black with no draw advantage"
        ],
        correctAnswer: 0,
        explanation: "In an Armageddon game, White typically gets 5 minutes to Black's 4 minutes, but Black has draw odds (draw counts as a win for Black)."
      },
      {
        id: "q4",
        question: "In Counter-Strike, what is the default bomb countdown timer before detonation in competitive matchmaking?",
        options: ["35 seconds", "40 seconds", "45 seconds", "50 seconds"],
        correctAnswer: 1,
        explanation: "Since CS:GO late updates and CS2, the standard competitive C4 timer is exactly 40 seconds."
      },
      {
        id: "q5",
        question: "In what year was the IIT Madras BS Degree in Data Science & Applications program first launched?",
        options: ["2018", "2020", "2021", "2022"],
        correctAnswer: 1,
        explanation: "The pioneering online BS Degree in Data Science was launched by IIT Madras in June 2020."
      },
      {
        id: "q6",
        question: "Which term describes intentionally playing worse or losing matches to face easier opponents in ranked matchmaking?",
        options: ["Throwing", "Smurfing", "Griefing", "Sandbagging"],
        correctAnswer: 3,
        explanation: "Sandbagging is concealing or diminishing one's ability to lower ratings/rankings."
      }
    ]
  },
  {
    id: "quiz-02",
    title: "Tactical FPS Lore & Weapon Mechanics",
    description: "Deep dive into recoil patterns, economy rounds, utility usage, and map callouts.",
    durationMinutes: 4,
    totalQuestions: 4,
    marksPerQuestion: 3,
    negativeMarks: 1,
    status: "Active",
    startDate: "2026-10-05",
    endDate: "2026-10-28",
    leaderboardEnabled: true,
    questions: [
      {
        id: "q2-1",
        question: "How many credits does a full Light Shield cost in Valorant?",
        options: ["400 credits", "500 credits", "350 credits", "450 credits"],
        correctAnswer: 0,
        explanation: "Light Shields provide 25 HP absorption and cost 400 credits."
      },
      {
        id: "q2-2",
        question: "Which sniper rifle in CS2 can kill with a single shot to the stomach or chest through full body armor?",
        options: ["SSG 08", "AWP", "SCAR-20", "G3SG1"],
        correctAnswer: 1,
        explanation: "The Arctic Warfare Police (AWP) delivers lethal damage to torso areas regardless of armor."
      },
      {
        id: "q2-3",
        question: "What does the gaming acronym 'ADR' stand for on competitive scoreboard metrics?",
        options: ["Average Damage per Round", "Armor Damage Ratio", "Assists Delivered Regularly", "Aim Deflection Rate"],
        correctAnswer: 0,
        explanation: "ADR stands for Average Damage per Round."
      },
      {
        id: "q2-4",
        question: "In competitive gaming, what is 'peeker's advantage' attributed to?",
        options: ["Monitor refresh rates only", "Network latency / interpolation delay", "In-game footstep audio", "Character hitbox size"],
        correctAnswer: 1,
        explanation: "Peeker's advantage occurs because of network latency (ping) and client-server interpolation."
      }
    ]
  }
];

export const INITIAL_LEADERBOARD = [
  { rank: 1, student: "Aditya Narayan", email: "23f1001923@ds.study.iitm.ac.in", score: 24, time: "02:14", quizId: "quiz-01", date: "2026-10-06" },
  { rank: 2, student: "Jayanta Mondal", email: "23f2000841@ds.study.iitm.ac.in", score: 24, time: "02:48", quizId: "quiz-01", date: "2026-10-07" },
  { rank: 3, student: "Priya Sharma", email: "22f3001290@es.study.iitm.ac.in", score: 20, time: "01:59", quizId: "quiz-01", date: "2026-10-06" },
  { rank: 4, student: "Rohan Varma", email: "23f1004510@ds.study.iitm.ac.in", score: 19, time: "03:12", quizId: "quiz-01", date: "2026-10-08" },
  { rank: 5, student: "Sneha Mukherjee", email: "24f1000219@study.iitm.ac.in", score: 15, time: "02:30", quizId: "quiz-01", date: "2026-10-07" },
  { rank: 6, student: "Karan Iyer", email: "23f2003882@ds.study.iitm.ac.in", score: 14, time: "03:45", quizId: "quiz-01", date: "2026-10-08" }
];

export const INITIAL_POLLS = [
  {
    id: "poll-01",
    question: "Which main tournament should Tesseract host for the upcoming Winter Fest 2026?",
    description: "Your vote shapes the prize pool allocation and tournament schedule for next month's fest.",
    startDate: "2026-10-01",
    endDate: "2026-10-25",
    allowAnonymous: true,
    showResultsLive: true,
    options: [
      { id: "opt-1", label: "Valorant (5v5 Custom Bracket)", votes: 248 },
      { id: "opt-2", label: "Battlegrounds Mobile India (BGMI Squads)", votes: 195 },
      { id: "opt-3", label: "Rocket League (3v3 Crossplay)", votes: 84 },
      { id: "opt-4", label: "Tekken 8 / Street Fighter 6 (1v1 FGC)", votes: 62 }
    ],
    totalVotes: 589
  },
  {
    id: "poll-02",
    question: "What is your preferred tournament match timing on weekends?",
    description: "Help us schedule matches without clashing with IITM BS quizzes and OPPE exam schedules.",
    startDate: "2026-10-05",
    endDate: "2026-10-28",
    allowAnonymous: false,
    showResultsLive: true,
    options: [
      { id: "opt-21", label: "Saturday Evening (7:00 PM – 10:30 PM)", votes: 164 },
      { id: "opt-22", label: "Sunday Afternoon (2:00 PM – 5:30 PM)", votes: 52 },
      { id: "opt-23", label: "Sunday Night (8:00 PM – 11:30 PM)", votes: 218 }
    ],
    totalVotes: 434
  }
];

export const INITIAL_TEAM_MEMBERS = [
  {
    id: "tm-01",
    name: "Subhabrata Mondal",
    role: "Founder & Society Lead",
    category: "Leadership",
    program: "BS in Data Science (Diploma Level)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Passionate esports strategist and competitive FPS player. Building the digital gaming infrastructure for IITM BS.",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      discord: "subhabrata#0001"
    }
  },
  {
    id: "tm-02",
    name: "Jayanta Mondal",
    role: "WebOps & Tech Lead",
    category: "Council / Core Team",
    program: "BS in Data Science",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Full-stack engineer crafting responsive, fast, and secure platforms for society events, leaderboards, and quizzes.",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      discord: "jayanta#1337"
    }
  },
  {
    id: "tm-03",
    name: "Ananya Deshmukh",
    role: "Events & Tournament Director",
    category: "Council / Core Team",
    program: "BS in Electronic Systems",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    bio: "Oversees tournament brackets, rulebook enforcements, and referee operations across all titles.",
    socials: {
      linkedin: "https://linkedin.com",
      discord: "ananya_d#4040"
    }
  },
  {
    id: "tm-04",
    name: "Rishi Chawla",
    role: "Design & Creative Lead",
    category: "Council / Core Team",
    program: "BS in Data Science",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "Creator of Tesseract's cyber aesthetic, visual branding, stream overlays, and tournament posters.",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  {
    id: "tm-05",
    name: "Vikramaditya Rao",
    role: "Community & Broadcast Manager",
    category: "Council / Core Team",
    program: "BS in Data Science",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    bio: "Manages Discord lounges, student shoutcasters, and official YouTube esports livestreams.",
    socials: {
      discord: "vikram_live#9999",
      linkedin: "https://linkedin.com"
    }
  }
];

export const INITIAL_USER = {
  name: "Jayanta Mondal",
  email: "23f2000841@ds.study.iitm.ac.in",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
  gamerTag: "CYBER_NEXUS",
  bio: "BS Data Science undergrad • Duelist main in Valorant & Chess Blitz enthusiast.",
  favoriteGames: ["Valorant", "Chess", "BGMI"],
  gamingInterests: ["Tactical FPS", "Speed Typing", "Mind Games", "LAN Tournaments"],
  verified: true,
  role: "admin", // 'guest', 'student', 'admin'
  registeredEvents: ["ev-01"],
  quizAttempts: [
    {
      quizId: "quiz-01",
      quizTitle: "IITM BS Esports & Pop Culture Trivia 2026",
      score: 24,
      totalPossible: 24,
      timeTaken: "02:48",
      rank: 2,
      completedAt: "2026-10-07"
    }
  ],
  pollVotes: {
    "poll-01": "opt-1"
  }
};

export const ALLOWED_EMAIL_DOMAINS = [
  "@study.iitm.ac.in",
  "@ds.study.iitm.ac.in",
  "@es.study.iitm.ac.in"
];
