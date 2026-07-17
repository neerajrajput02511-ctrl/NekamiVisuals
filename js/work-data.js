/* ================================================================
   NekamiVisuals — Project Data Store
   All portfolio projects with full metadata
================================================================ */

export const projects = [

  /* ── VIDEO · LONG FORM ────────────────────────────────── */
  {
    id: "cinematic-brand-reveal",
    title: "Cinematic Brand Reveal",
    category: "video",
    subcategory: "long-form",
    platform: "YouTube",
    client: "TechBrand Co.",
    year: 2025,
    duration: "2:45",
    featured: true,
    popular: true,
    thumbnail: "assets/images/project-01.jpg",
    videoPreview: null,
    software: ["premiere", "aftereffects", "davinci"],
    tags: ["cinematic", "brand", "commercial", "motion"],
    description: "A cinematic brand film crafted to launch TechBrand's new product line with dramatic visual storytelling and precision editing.",
    overview: "TechBrand approached NekamiVisuals with one clear directive: create a product launch film that would rival major studio productions. The result is a 2-minute 45-second cinematic journey that weaves product showcases with human emotion, building deep investment in the brand before the first word is spoken. Shot across three locations over two days, this film redefines what brand content can feel like.",
    challenge: "The client was entering a crowded market where hundreds of brand videos launch every single day. The challenge was creating something that would stop viewers mid-scroll, hold their attention for the full runtime, and leave them with a lasting impression of the brand's values — premium quality, precision, and innovation.",
    process: {
      planning: "Three weeks of pre-production: storyboarding every shot, building a comprehensive mood board, and developing a 48-scene shot list.",
      editing: "Non-linear editing workflow managing 240GB of raw footage, meticulously distilled into a precise 2:45 cut with every frame intentional.",
      sound: "Custom layered sound design combined with a licensed orchestral score to build cinematic tension and emotional release.",
      motion: "Kinetic typography sequences and particle systems built in After Effects to reinforce the brand's cutting-edge identity.",
      color: "Full DaVinci Resolve colour grade with a signature teal/amber split-toning to give the film a premium, instantly-recognisable aesthetic.",
      optimization: "H.265 multi-pass compression with platform-specific exports for YouTube 4K, Instagram and web embedding."
    },
    gallery: ["assets/images/project-01.jpg","assets/images/project-03.jpg","assets/images/project-06.jpg"],
    link: "#",
    order: 1
  },

  {
    id: "documentary-deep-dive",
    title: "The Maker's Story",
    category: "video",
    subcategory: "long-form",
    platform: "YouTube",
    client: "CraftHouse Films",
    year: 2025,
    duration: "18:30",
    featured: false,
    popular: true,
    thumbnail: "assets/images/project-03.jpg",
    videoPreview: null,
    software: ["premiere", "davinci", "audition"],
    tags: ["documentary", "interview", "storytelling", "long-form"],
    description: "An 18-minute documentary profiling an artisan craftsman, blending intimate interviews with cinematic B-roll to tell a deeply human story.",
    overview: "The Maker's Story follows a master woodworker across his journey from apprentice to artisan. This documentary required a delicate balance: intimate enough to feel personal, cinematic enough to command attention for 18 minutes. Every interview was filmed with a three-camera setup; every B-roll sequence was composed like a still photograph brought to life.",
    challenge: "Sustaining viewer engagement across 18 minutes of talking-head and B-roll content without resorting to cheap tricks. The story had to carry itself through pure editing craft, pacing and emotional arc construction.",
    process: {
      planning: "Two days on-location scouting, timeline outlining, and interview question development with the subject.",
      editing: "Assembly cut from 6 hours of material down to 18:30 through three rounds of review and refinement.",
      sound: "Location sound cleaned in Adobe Audition; ambient textures layered underneath to maintain the workshop atmosphere.",
      motion: "Subtle lower-thirds and chapter title cards designed to guide the viewer without breaking immersion.",
      color: "Warm, film-emulation grade to honour the handcrafted, analogue subject matter.",
      optimization: "YouTube-optimised export with chapter markers and closed captions prepared."
    },
    gallery: ["assets/images/project-03.jpg","assets/images/project-02.jpg","assets/images/project-05.jpg"],
    link: "#",
    order: 3
  },

  {
    id: "travel-film-india",
    title: "India Unseen",
    category: "video",
    subcategory: "long-form",
    platform: "YouTube",
    client: "Personal Project",
    year: 2024,
    duration: "11:20",
    featured: true,
    popular: false,
    thumbnail: "assets/images/project-06.jpg",
    videoPreview: null,
    software: ["premiere", "davinci", "aftereffects"],
    tags: ["travel", "cinematic", "india", "film"],
    description: "A sweeping 11-minute travel film capturing the hidden visual poetry of India's lesser-known landscapes and street life.",
    overview: "India Unseen is a personal passion project born from months of solo travel with a single camera and a sense of wonder. The film deliberately avoids the clichés of Indian travel content — no Taj Mahal, no tiger safari — and instead finds the extraordinary in ordinary moments: a chai vendor's hands, morning light on a crumbling wall, the geometry of a crowded marketplace.",
    challenge: "Making a travel film that feels genuinely fresh in an era of oversaturated travel content required restraint. No drone shots. No fast cuts. Just careful composition, patient observation, and an edit that breathes.",
    process: {
      planning: "No traditional pre-production — the film was planned as a structured improvisation, with only a loose emotional arc predetermined.",
      editing: "80+ hours of travel footage reduced to 11:20 through instinctive editing that prioritised feeling over information.",
      sound: "All location audio preserved and layered — no music for the first three minutes to establish authentic atmosphere.",
      motion: "Zero motion graphics. Typography only appears in the title card, designed to be invisible.",
      color: "Film emulation grade inspired by Kodak Vision3 500T stock, giving the footage a timeless, textured quality.",
      optimization: "4K HDR master with SDR delivery for YouTube."
    },
    gallery: ["assets/images/project-06.jpg","assets/images/project-01.jpg","assets/images/project-04.jpg"],
    link: "#",
    order: 5
  },

  /* ── VIDEO · SHORT FORM ───────────────────────────────── */
  {
    id: "fitness-reel-launch",
    title: "Zero to Peak",
    category: "video",
    subcategory: "short-form",
    platform: "Instagram",
    client: "Peak Athletics",
    year: 2025,
    duration: "0:45",
    featured: false,
    popular: true,
    thumbnail: "assets/images/project-03.jpg",
    videoPreview: null,
    software: ["premiere", "capcut", "aftereffects"],
    tags: ["fitness", "reels", "instagram", "sports", "motivation"],
    description: "A 45-second motivational fitness reel that became the brand's highest-performing Instagram post with 2.4M views.",
    overview: "Peak Athletics needed content that would cut through the noise of the fitness space on Instagram. Zero to Peak was built from the ground up for the algorithm and for the human eye simultaneously — a fast-paced edit that rewards repeat viewing with details you didn't catch the first time.",
    challenge: "45 seconds. 2.4 million eyeballs. The pressure was to deliver a reel that felt premium enough for the brand, punchy enough for the platform, and emotionally resonant enough to earn the share.",
    process: {
      planning: "Shot list developed around the platform's proven engagement patterns: hook in 0–3 seconds, peak at 25 seconds, call to action at 40.",
      editing: "CapCut for rapid assembly; Premiere Pro for precision fine-cut and audio sync.",
      sound: "Custom music edit with beat-synced cuts and layered SFX hits for maximum impact.",
      motion: "Energetic transitions and glitch effects built in After Effects to match the athletic intensity.",
      color: "High-contrast, desaturated grade with crushed blacks to make the subject pop off any phone screen.",
      optimization: "Delivered in 9:16 vertical, 1:1 square and 16:9 landscape formats for cross-platform use."
    },
    gallery: ["assets/images/project-03.jpg","assets/images/project-01.jpg"],
    link: "#",
    order: 4
  },

  {
    id: "gaming-highlight-reel",
    title: "Ranked: The Reel",
    category: "video",
    subcategory: "short-form",
    platform: "YouTube Shorts",
    client: "StreamForge",
    year: 2024,
    duration: "0:58",
    featured: false,
    popular: false,
    thumbnail: "assets/images/project-06.jpg",
    videoPreview: null,
    software: ["premiere", "aftereffects", "capcut"],
    tags: ["gaming", "shorts", "youtube", "highlights", "esports"],
    description: "A lightning-fast gaming highlight compilation for a top-ranked esports streamer, built for YouTube Shorts virality.",
    overview: "StreamForge's audience demands content that celebrates the moments every gamer lives for — the clutch plays, the impossible shots, the reactions. Ranked: The Reel packages six months of highlights into 58 seconds of pure dopamine, each cut timed to a custom sound design track.",
    challenge: "Gaming content is hyper-competitive. The edit had to feel new even to an audience that's seen thousands of highlight reels. The solution was rhythm — every cut, every SFX hit, every text pop-up was mapped to a musical grid before a single clip was placed.",
    process: {
      planning: "Highlight selection from 400+ hours of stream VODs, categorised by moment type and emotional intensity.",
      editing: "Music-first editing methodology — the audio track was finalised before any video was placed on the timeline.",
      sound: "Original sound design track with custom SFX library built specifically for gaming content.",
      motion: "Animated score bugs, player tags and ranked icons built in After Effects.",
      color: "Vibrant, saturated grade dialled back from the raw screen-capture footage for a clean, broadcast-quality finish.",
      optimization: "YouTube Shorts-optimised export with thumbnail extracted from the reel's peak moment."
    },
    gallery: ["assets/images/project-06.jpg","assets/images/project-03.jpg"],
    link: "#",
    order: 7
  },

  {
    id: "real-estate-reel",
    title: "Prestige Living",
    category: "video",
    subcategory: "short-form",
    platform: "Instagram",
    client: "Skyline Properties",
    year: 2025,
    duration: "1:00",
    featured: false,
    popular: false,
    thumbnail: "assets/images/project-04.jpg",
    videoPreview: null,
    software: ["premiere", "davinci", "aftereffects"],
    tags: ["realestate", "luxury", "instagram", "lifestyle"],
    description: "A luxury real estate showcase reel that sold the property before the listing even went public — driven purely by the content.",
    overview: "Skyline Properties required a 60-second reel that could make a ₹8 crore apartment feel worth every rupee through a phone screen. Prestige Living delivers that feeling through slow, deliberate camera movements, warm cinematic light, and an audio experience that evokes affluence before a single room is shown.",
    challenge: "Selling luxury through a 6-inch screen to buyers who may be thousands of miles away. Every frame had to sell a lifestyle, not just a floor plan.",
    process: {
      planning: "Location assessment, golden-hour scheduling, and a shot list designed to flow room-to-room like a guided tour.",
      editing: "Slow, deliberate cuts with breathing room — this reel does not rush. The pacing itself communicates luxury.",
      sound: "Minimal ambient sound design with a single, elegant piano piece that never overpowers.",
      motion: "Subtle address and price overlays using premium sans-serif typography.",
      color: "Warm, golden-hour grade with lifted shadows to give every room a sense of space and light.",
      optimization: "Delivered in 9:16 and 16:9 for Instagram and WhatsApp sharing respectively."
    },
    gallery: ["assets/images/project-04.jpg","assets/images/project-01.jpg","assets/images/project-03.jpg"],
    link: "#",
    order: 9
  },

  /* ── VOICE ARTISTRY ───────────────────────────────────── */
  {
    id: "documentary-narration-wild",
    title: "Voice of Wilderness",
    category: "voice",
    subcategory: null,
    platform: "YouTube",
    client: "WildVision Media",
    year: 2025,
    duration: "22:00",
    featured: true,
    popular: true,
    thumbnail: "assets/images/project-02.jpg",
    videoPreview: null,
    software: ["audition", "premiere"],
    tags: ["narration", "documentary", "nature", "voice-over"],
    description: "Full narration for a 22-minute wildlife documentary, voiced with gravitas and warmth to guide viewers through untamed landscapes.",
    overview: "Voice of Wilderness required a narrator who could hold reverent silence as effectively as spoken words. WildVision Media needed a voice that felt like the wilderness itself — expansive, unhurried, deeply present. The 22-minute documentary explores the hidden ecosystem of the Western Ghats through a narration style that never competes with the imagery.",
    challenge: "Wildlife documentary narration demands absolute precision: too much voice and you obscure the natural soundscape; too little and you lose the narrative thread. The performance had to breathe with the visuals.",
    process: {
      planning: "Script analysis, character notes, and temp track recording before the official session.",
      editing: "Three full recording sessions across two days; Adobe Audition for noise reduction, EQ and room treatment.",
      sound: "Final mix aligned to the film's audio mix with precise dB matching and silence calibration.",
      motion: "N/A",
      color: "N/A",
      optimization: "Delivered as 24-bit WAV stems: narration track, room tone, and final mixed version."
    },
    gallery: ["assets/images/project-02.jpg","assets/images/project-05.jpg"],
    link: "#",
    order: 2
  },

  {
    id: "commercial-voice-tech",
    title: "The Future, Spoken",
    category: "voice",
    subcategory: null,
    platform: "Commercial",
    client: "NovaTech Solutions",
    year: 2025,
    duration: "0:30",
    featured: false,
    popular: true,
    thumbnail: "assets/images/project-05.jpg",
    videoPreview: null,
    software: ["audition"],
    tags: ["commercial", "voice-over", "tech", "advertisement"],
    description: "A 30-second commercial voice-over for a tech brand's flagship product launch — authoritative, warm, future-forward.",
    overview: "NovaTech needed a voice that communicated the promise of cutting-edge technology without sounding cold or robotic. The brief: sound like the future, but feel like a human being who's already been there. The 30-second script required seven distinct tonal shifts across its runtime — a technical and artistic challenge in equal measure.",
    challenge: "Thirty seconds to earn the viewer's trust in an entirely new technology product. Every word had to land with the weight it deserved.",
    process: {
      planning: "Client brief review, script annotation, and reference voice listening session.",
      editing: "Recorded 12 full takes; final performance assembled from the strongest moments of four takes.",
      sound: "Professional dry recording treated for broadcast delivery: 16-bit, 48kHz, -23 LUFS.",
      motion: "N/A", color: "N/A",
      optimization: "Delivered as broadcast-ready WAV and MP3 with alternate line reads provided."
    },
    gallery: ["assets/images/project-05.jpg","assets/images/project-02.jpg"],
    link: "#",
    order: 6
  },

  {
    id: "elearning-narration",
    title: "Learn Without Limits",
    category: "voice",
    subcategory: null,
    platform: "E-Learning",
    client: "EduPath Academy",
    year: 2024,
    duration: "4:20:00",
    featured: false,
    popular: false,
    thumbnail: "assets/images/project-02.jpg",
    videoPreview: null,
    software: ["audition", "premiere"],
    tags: ["e-learning", "narration", "education", "long-form", "course"],
    description: "Complete narration for a 240-module online course — clear, engaging and designed for sustained listener focus across hours of content.",
    overview: "EduPath Academy needed a voice that could sustain learner attention across 14 hours of course content without ever sounding tired or monotonous. Learn Without Limits was recorded across four days with session pacing designed to keep the vocal performance consistently energetic from first module to last.",
    challenge: "14 hours of narration is a physical and artistic endurance challenge. Maintaining consistent pacing, energy and clarity across 240 modules required disciplined session management and a methodical recording process.",
    process: {
      planning: "Full script read-through and annotation; pronunciation guide developed for technical terms.",
      editing: "Real-time punch-and-roll recording with same-session corrections for minimum post-production.",
      sound: "EQ and gentle compression applied to maintain consistent audio character across all sessions.",
      motion: "N/A", color: "N/A",
      optimization: "Delivered as individual MP3 files per module, 128kbps, with a master WAV archive."
    },
    gallery: ["assets/images/project-02.jpg","assets/images/project-05.jpg"],
    link: "#",
    order: 10
  },

  /* ── GRAPHIC DESIGN ───────────────────────────────────── */
  {
    id: "luxury-brand-identity",
    title: "Noir & Co. Identity",
    category: "design",
    subcategory: null,
    platform: "Branding",
    client: "Noir & Co.",
    year: 2025,
    duration: null,
    featured: true,
    popular: true,
    thumbnail: "assets/images/project-04.jpg",
    videoPreview: null,
    software: ["illustrator", "photoshop", "aftereffects"],
    tags: ["branding", "logo", "identity", "luxury", "minimal"],
    description: "A complete visual identity system for a luxury lifestyle brand — wordmark, symbol, colour system, and full brand guidelines.",
    overview: "Noir & Co. is a luxury lifestyle brand positioning itself at the intersection of craftsmanship and minimalism. The identity needed to communicate premium quality through restraint: no decorative flourishes, no unnecessary elements — just precise typographic architecture and a considered colour palette that commands attention in any context.",
    challenge: "Creating a luxury identity that feels genuinely premium without relying on gold, serifs or visual clichés that signal 'luxury' in obvious ways. True luxury is invisible; you sense it before you can name it.",
    process: {
      planning: "Brand discovery session, competitive audit, and three distinct strategic directions presented before refinement.",
      editing: "N/A",
      sound: "N/A",
      motion: "Brand animation guidelines and motion logo created in After Effects.",
      color: "Bespoke colour palette: near-black primary (#0D0D0D), warm off-white (#F5F0E8), single accent (#C9A96E).",
      optimization: "Full brand guidelines document (48 pages) plus all asset files delivered in AI, EPS, SVG and PNG formats."
    },
    gallery: ["assets/images/project-04.jpg","assets/images/project-06.jpg","assets/images/project-01.jpg"],
    link: "#",
    order: 8
  },

  {
    id: "kinetic-typography",
    title: "Words in Motion",
    category: "design",
    subcategory: null,
    platform: "Instagram",
    client: "Speakeasy Podcast",
    year: 2025,
    duration: "0:60",
    featured: false,
    popular: false,
    thumbnail: "assets/images/project-06.jpg",
    videoPreview: null,
    software: ["aftereffects", "illustrator", "premiere"],
    tags: ["kinetic", "typography", "motion", "podcast", "design"],
    description: "A series of 12 kinetic typography clips for a podcast brand — each designed to function as a standalone social media asset.",
    overview: "Speakeasy Podcast needed a visual identity for their social media clips that felt as intelligent as their content. Words in Motion is a series of 12 animated typography pieces, each between 30 and 60 seconds, designed to give a spoken conversation a visual heartbeat.",
    challenge: "Typography in motion is one of the most technically demanding design disciplines — every kerning pair, every animation curve, every frame holds its own. The challenge was creating 12 pieces that felt like a cohesive series while each remaining distinct.",
    process: {
      planning: "Type system selection, animation vocabulary defined, and storyboards created for all 12 pieces before production.",
      editing: "N/A",
      sound: "Minimal sound design — subtle type 'click' sounds that reward listeners without demanding them.",
      motion: "All animation built in After Effects with expression-driven timing for perfect consistency across pieces.",
      color: "Strict two-colour system (black and off-white) with a single variable accent colour per episode.",
      optimization: "Delivered as 9:16 H.264 at 60fps for social, plus 1:1 square variants."
    },
    gallery: ["assets/images/project-06.jpg","assets/images/project-04.jpg"],
    link: "#",
    order: 11
  },

  {
    id: "youtube-thumbnail-series",
    title: "Click Magnets",
    category: "design",
    subcategory: null,
    platform: "YouTube",
    client: "Prism Creative",
    year: 2024,
    duration: null,
    featured: false,
    popular: true,
    thumbnail: "assets/images/project-04.jpg",
    videoPreview: null,
    software: ["photoshop", "illustrator"],
    tags: ["thumbnail", "youtube", "design", "ctr", "social"],
    description: "A 30-thumbnail series for a major YouTube channel that drove average CTR from 3.2% to 8.7% in 60 days.",
    overview: "Prism Creative's YouTube channel had great content but thumbnails that weren't converting. The brief was simple: make people click. The solution was a complete thumbnail system built on psychology, colour science and typographic contrast — a system designed to win the algorithm and the human eye simultaneously.",
    challenge: "Improving click-through rate on an established channel without alienating the existing audience. Every design decision had to feel like an evolution of the brand, not a departure.",
    process: {
      planning: "CTR audit of existing thumbnails; A/B test framework designed before new thumbnails were created.",
      editing: "N/A",
      sound: "N/A",
      motion: "N/A",
      color: "Channel-specific colour palette optimised for visibility at 336×188px — the size most users see thumbnails at.",
      optimization: "Delivered as 1280×720 PNG with layered Photoshop source files for future self-editing."
    },
    gallery: ["assets/images/project-04.jpg","assets/images/project-06.jpg"],
    link: "#",
    order: 12
  }

];

/* Software metadata */
export const softwareMap = {
  premiere:     { name: "Premiere Pro",  icon: "Pr", color: "#9999FF" },
  aftereffects: { name: "After Effects", icon: "Ae", color: "#9999FF" },
  davinci:      { name: "DaVinci Resolve", icon: "Dv", color: "#F27A1A" },
  audition:     { name: "Audition",      icon: "Au", color: "#00D6B5" },
  photoshop:    { name: "Photoshop",     icon: "Ps", color: "#31A8FF" },
  illustrator:  { name: "Illustrator",   icon: "Ai", color: "#FF9A00" },
  capcut:       { name: "CapCut",        icon: "Cc", color: "#FFFFFF" },
  finalcut:     { name: "Final Cut Pro", icon: "Fc", color: "#E8E8E8" },
};

/* Category display labels */
export const categoryLabels = {
  video:     "Video Editing",
  "short-form": "Short Form",
  "long-form":  "Long Form",
  voice:     "Voice Artistry",
  design:    "Graphic Design",
};

/* Get project by ID */
export function getProjectById(id) {
  return projects.find(p => p.id === id) || null;
}

/* Get related projects (same category, different ID) */
export function getRelatedProjects(project, limit = 3) {
  return projects
    .filter(p => p.id !== project.id && p.category === project.category)
    .slice(0, limit);
}

/* Get next project */
export function getNextProject(currentId) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex(p => p.id === currentId);
  return sorted[(idx + 1) % sorted.length];
}
