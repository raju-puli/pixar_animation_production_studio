export interface SceneData {
  id: number;
  timeRange: string;
  startSec: number;
  endSec: number;
  title: string;
  tagline: string;
  imageSrc: string;
  camera: {
    shotType: string;
    motion: string;
    lens: string;
    framing: string;
  };
  lighting: {
    primary: string;
    ambient: string;
    atmosphere: string;
  };
  characters: {
    name: string;
    action: string;
    emotion: string;
    details: string;
  }[];
  videoPrompt: {
    universal: string;
    veo2: string;
    sora: string;
    midjourney: string;
  };
  voScript: {
    text: string;
    subtext: string;
    pacing: string;
  };
  sfxCues: {
    timestamp: string;
    cue: string;
    type: string;
  }[];
  directorNotes: string;
}

export interface ProductionPackage {
  title: string;
  logline: string;
  duration: string;
  resolution: string;
  frameRate: string;
  renderEngine: string;
  artStyle: string;
  aspectRatio: string;
  scenes: SceneData[];
  voiceover: {
    narratorProfile: string;
    tone: string;
    targetPace: string;
    microphoneChain: string;
    fullScript: {
      timestamp: string;
      line: string;
      direction: string;
    }[];
  };
  music: {
    title: string;
    genre: string;
    tempo: string;
    key: string;
    instrumentation: string[];
    structure: {
      time: string;
      section: string;
      description: string;
    }[];
    sunoPrompt: string;
    udioTags: string[];
  };
  sfxOverview: {
    foleyLayer: string;
    ambientLayer: string;
    magicalLayer: string;
  };
  toolRecommendations: {
    category: string;
    primaryTool: string;
    alternativeTools: string[];
    pipelineRole: string;
    recommendedSettings: string;
  }[];
}

export const productionPackageData: ProductionPackage = {
  title: "Pip & Dot: A Tiny Light in the Deep Woods",
  logline: "In the dewy shadows of twilight, a tiny bioluminescent firefly named Pip illuminates the path for a lost baby ladybug, guiding her home to her family nestled beneath a giant glowing mushroom.",
  duration: "20.0 Seconds",
  resolution: "4K UHD (3840 x 2160)",
  frameRate: "60 fps",
  renderEngine: "Unreal Engine 5.4 Subsurface Scattering & Lumen GI",
  artStyle: "Pixar / Feature Animation Quality, Hyper-detailed textures, Vibrant whimsical palette",
  aspectRatio: "16:9",
  scenes: [
    {
      id: 1,
      timeRange: "0:00 - 0:05",
      startSec: 0,
      endSec: 5,
      title: "Lost in the Dewdrops",
      tagline: "A tiny teardrop in an overwhelming forest",
      imageSrc: "/src/assets/images/scene1_pip_finds_dot_1794292633629.jpg",
      camera: {
        shotType: "Macro Close-Up (65mm equivalent macro lens)",
        motion: "Gentle creeping dolly forward with slow rack focus from glistening dewdrop to Dot's trembling face",
        lens: "f/2.8 shallow depth of field, creamy spherical bokeh",
        framing: "Rule of thirds; Dot occupies bottom-left, opening space upper-right where Pip's golden illumination enters"
      },
      lighting: {
        primary: "Warm amber-gold bioluminescent point light cast by Pip's pulsing abdomen lamp (3200K)",
        ambient: "Cool deep twilight sapphire woodland wash (6500K) with soft volumetric ground mist",
        atmosphere: "Drifting micro-pollen motes catching rim highlights; hyper-detailed light refraction through water droplets"
      },
      characters: [
        {
          name: "Dot (Baby Ladybug)",
          action: "Curled up on a glistening shamrock clover leaf, tiny black-gloved tarsal feet tucked close, antennae quivering",
          emotion: "Vulnerable, lonely, teary-eyed; single glossy tear droplet clinging to her round cheek",
          details: "Glossy scarlet elytra with three velvet-black spots, tactile micro-scratches on carapace, giant expressive brown eyes"
        },
        {
          name: "Pip (Firefly)",
          action: "Drifting down gracefully from upper canopy like a floating fairy lantern, head cocked with empathy",
          emotion: "Warm, gentle curiosity, instant comforting protector energy",
          details: "Translucent iridescent wings beating softly with motion blur, honey-amber glowing abdomen pulsing soothingly"
        }
      ],
      videoPrompt: {
        universal: "4K, 60fps, Unreal Engine 5 render, hyper-detailed, vibrant colors, Pixar style. Macro cinematic close-up of a lost baby ladybug named Dot with glossy red shell and three black spots sitting on a dew-covered clover leaf, big glistening teary eyes looking up. A tiny cute glowing firefly named Pip with translucent wings and warm golden bioluminescent belly gently flutters down to comfort her. Deep magical twilight forest background with soft blue hues, luminous golden bokeh, subsurface scattering on skin, pristine water drop refractions, photorealistic animation, crisp edges --ar 16:9 --v 6.0",
        veo2: "Pixar 3D animation style, 4K resolution, 60fps. Macro camera dollies in smoothly on an adorable baby ladybug with shiny red shell weeping on a giant dewdrop clover leaf. A friendly glowing firefly hovers down into frame, casting a warm golden glow onto the ladybug's glossy face. Magical enchanted woods, volumetric blue fog, Unreal Engine 5 lighting, crisp edges, cinematic 16:9.",
        sora: "Cinematic Pixar-style 3D render at 60fps 4k. High-end macro lens focusing on Dot, a tiny baby ladybug sniffling with giant glossy eyes on a dewy clover leaf. Pip the friendly firefly descends like a warm living lantern, illuminating the forest moss with soft amber light. Photorealistic textures, velvet moss, vibrant colors, ultra-detailed --ar 16:9.",
        midjourney: "Pixar style 3D animation key visual, 4k 60fps Unreal Engine 5 render. A tiny lost baby ladybug named Dot with glossy red shell and three black spots sitting on a dew-covered clover leaf, large teary adorable eyes. Hovering just in front of her is Pip, a cute glowing firefly with translucent emerald-gold wings and a soft warm bioluminescent golden belly illuminating the dewy moss. Lush magical twilight forest background with deep cobalt blues, warm golden light bokeh, hyper-detailed textures, cinematic macro depth of field --ar 16:9 --v 6.0, ultra-high definition, 4k resolution, cinematic lighting, photorealistic animation, crisp edges"
      },
      voScript: {
        text: "In the hush of twilight, little Dot felt all alone in the great big woods...",
        subtext: "Establish empathy; speak softly like opening a vintage storybook under warm covers.",
        pacing: "Slow, reassuring cadence, breathing room between words"
      },
      sfxCues: [
        { timestamp: "0:01", cue: "Gentle evening woodland cricket bed with distant gentle breeze through leaves", type: "Foley / Ambience" },
        { timestamp: "0:02", cue: "Tiny high-pitched sniffling whimper from Dot", type: "Character Vocal" },
        { timestamp: "0:03", cue: "Soft ethereal fluttering of firefly wings with warm low sine-wave hum", type: "Creature / Magic" },
        { timestamp: "0:04", cue: "Delicate sparkle chime as Pip's glow illuminates the teardrop", type: "Accent / Emotion" }
      ],
      directorNotes: "Key note for animators: Dot's tear must refract Pip's golden light before rolling down. Pip's glow pulse should sync with a reassuring head nod."
    },
    {
      id: 2,
      timeRange: "0:05 - 0:10",
      startSec: 5,
      endSec: 10,
      title: "A Spark in the Dark",
      tagline: "Hope lights the trail through the mossy thicket",
      imageSrc: "/src/assets/images/scene2_lantern_journey_1794292635506.jpg",
      camera: {
        shotType: "Dynamic Low-Angle Tracking Dolly (Macro Slider)",
        motion: "Smooth horizontal tracking shot moving left-to-right parallel to a fallen mossy oak log",
        lens: "45mm cine-macro, f/3.2, maintaining sharp focus on both traveling characters",
        framing: "Pip leads in upper-third emitting light trail; Dot scurries in lower-third following the light"
      },
      lighting: {
        primary: "Dynamic moving amber lantern beam from Pip's abdomen casting real-time shadows on tree bark",
        ambient: "Bioluminescent cyan and turquoise glow from clusters of tiny fairy mushrooms along the log",
        atmosphere: "Floating golden dust particles tracing Pip's flight path; damp morning mist swirling around log edges"
      },
      characters: [
        {
          name: "Pip (Firefly)",
          action: "Zooming forward playfully, doing a tiny joyful mid-air barrel loop while looking backward to encourage Dot",
          emotion: "Spirited, encouraging, proud big brother guide",
          details: "Translucent wing flaps visible at high frame rate, glowing golden trail of micro-sparks left in his wake"
        },
        {
          name: "Dot (Baby Ladybug)",
          action: "Scampering with rapid little pitter-patter legs across spongy moss, antennae perked high with delight",
          emotion: "Hopeful, giggling, determined, totally enamored by Pip's light",
          details: "Glossy wings fluttering slightly open with excitement, tiny cute smile replacing tears"
        }
      ],
      videoPrompt: {
        universal: "4K, 60fps, Unreal Engine 5 render, hyper-detailed, vibrant colors, Pixar style. Dynamic low-angle tracking shot along an ancient fallen oak log carpeted in velvet green moss and glowing turquoise mushrooms. Pip the firefly flies ahead like a glowing golden lantern, leaving a magical trail of stardust sparks. Tiny baby ladybug Dot happily scurries behind him, her little legs moving fast and her shiny red shell glistening. Cinematic motion blur, warm amber rim lighting, photorealistic animation, crisp edges --ar 16:9 --v 6.0",
        veo2: "Pixar animation 4K 60fps tracking camera shot. A glowing firefly darts along an old mossy log leaving a soft glittering golden particle trail. An adorable baby ladybug with red wings trots cheerfully behind it through glowing teal mushrooms. Unreal Engine 5 realistic foliage, cinematic depth of field, warm fairy tale colors --ar 16:9.",
        sora: "Smooth tracking shot at ground level, Pixar 3D animated feature quality, 4k 60fps. Tiny glowing bug Pip flies as a guide, lighting the path on a damp mossy log. Baby ladybug Dot waddles excitedly in pursuit. Bioluminescent fungus glows in soft blue-green, golden light washes over rich textures, hyper-detailed --ar 16:9.",
        midjourney: "Pixar style 3D animation key visual, 4k 60fps Unreal Engine 5 render. Pip the cheerful glowing firefly flies like a radiant warm lantern guide, leaving a soft sparkling trail of golden light particles. Following closely behind is Dot the tiny baby ladybug, happily scurrying along an ancient fallen oak log carpeted with soft green moss and tiny glowing turquoise fairy mushrooms. Macro tracking shot, vibrant colors, warm rim lighting, cinematic depth of field, hyper-detailed bark and dew textures --ar 16:9 --v 6.0, ultra-high definition, 4k resolution, cinematic lighting, photorealistic animation, crisp edges"
      },
      voScript: {
        text: "...until Pip arrived with a spark of hope, lighting up the secret path.",
        subtext: "Uplifting and warm; let the voice smile as Pip takes flight.",
        pacing: "Brisk yet gentle rhythm matching Dot's happy scamper"
      },
      sfxCues: [
        { timestamp: "0:06", cue: "Delicate rapid pitter-patter of tiny insect feet over damp spongy moss", type: "Foley" },
        { timestamp: "0:07", cue: "Playful airy whoosh as Pip executes a tiny mid-air spin", type: "Foley / Movement" },
        { timestamp: "0:08", cue: "Subtle twinkles and sparkling chime glissando tracking the golden light trail", type: "Magic SFX" },
        { timestamp: "0:09", cue: "Tiny adorable ladybug chuckle / happy squeak", type: "Character Vocal" }
      ],
      directorNotes: "Keep camera at bug's eye level (1.5 cm off bark) to give the fallen log the scale of a grand ancient highway."
    },
    {
      id: 3,
      timeRange: "0:10 - 0:15",
      startSec: 10,
      endSec: 15,
      title: "The Giant Mushroom Haven",
      tagline: "A majestic woodland sanctuary glowing with warm welcome",
      imageSrc: "/src/assets/images/scene3_giant_mushroom_1794292636832.jpg",
      camera: {
        shotType: "Cinematic Low-Angle Wide Establishing Crane Shot",
        motion: "Slow upward tilt and gentle jib rise starting from Pip and Dot at the base up to the magnificent mushroom dome",
        lens: "28mm wide-angle cine lens with minimal distortion, deep focus",
        framing: "Towering mushroom centered with majestic architectural poise; cozy arched doorway at root base"
      },
      lighting: {
        primary: "Golden internal incandescence emanating from under the mushroom gill structure like tiny fairy lanterns",
        ambient: "Surrounding enchanted violet and indigo forest twilight with hundreds of background fireflies",
        atmosphere: "Volumetric god rays streaming downward through morning mist; drifting spores glowing with soft luminescence"
      },
      characters: [
        {
          name: "Pip & Dot (Pair)",
          action: "Arriving at the winding pebble pathway leading to the root entrance, Dot pausing in awe, Pip hovering overhead gesturing forward",
          emotion: "Awe, wonder, relief, homecoming",
          details: "Dot standing on hind legs pointing with joy, Pip doing a glowing figure-eight pulse of celebration"
        },
        {
          name: "The Ladybug Home (Environment)",
          action: "A cozy round wooden hollow door framed by ivy and glowing lantern pods",
          emotion: "Warm, safe, inviting sanctuary",
          details: "Velvet scarlet cap with bioluminescent ivory speckles, wooden mushroom door slightly ajar spilling honey-yellow light"
        }
      ],
      videoPrompt: {
        universal: "4K, 60fps, Unreal Engine 5 render, hyper-detailed, vibrant colors, Pixar style. Breathtaking low-angle wide shot of a towering, whimsical giant mushroom with a velvet scarlet cap and glowing ivory spots. Golden warm lantern light shines from underneath the mushroom gills where a cozy hollow tree-door ladybug house sits. Pip the firefly and baby ladybug Dot approach the entrance along a tiny pebble path. Magical enchanted forest, violet twilight canopy, volumetric god rays, hyper-detailed textures, photorealistic animation, crisp edges --ar 16:9 --v 6.0",
        veo2: "Pixar feature film style, 4K 60fps. Low-angle majestic camera tilting up to reveal a massive magical mushroom with glowing red cap and cozy warm lights underneath. Little baby ladybug Dot and glowing firefly Pip stand at the base in awe. Dreamy woodland atmosphere, misty volumetric rays, Unreal Engine 5 cinematic lighting --ar 16:9.",
        sora: "Epic scale bug-level camera pan up. Pixar animation aesthetic at 4k 60fps. Giant red-and-white spotted mushroom functioning as an enchanted cottage, illuminated by hundreds of tiny warm fairy lights. Dot and Pip reach the cobblestone pathway at the foot of the mushroom. Deep rich colors, lush moss, cinematic realism --ar 16:9.",
        midjourney: "Pixar style 3D animation key visual, 4k 60fps Unreal Engine 5 render. Low angle cinematic view of a towering, whimsical giant mushroom with a velvet scarlet cap and glowing ivory speckles, nestled in an enchanted woodland under a starry twilight canopy. Tiny warm lights glow under the mushroom cap where a cozy ladybug home is nestled. Pip the glowing firefly and baby ladybug Dot approach the grand mossy base, illuminated in warm amber and bioluminescent violet hues. Hyper-detailed, rich vibrant colors --ar 16:9 --v 6.0, ultra-high definition, 4k resolution, cinematic lighting, photorealistic animation, crisp edges"
      },
      voScript: {
        text: "Just past the mossy bend stood the Great Mushroom, glowing with warmth and home.",
        subtext: "Awe-inspired, cozy, magical sense of arrival.",
        pacing: "Expansive and grand, letting the visual scale breathe"
      },
      sfxCues: [
        { timestamp: "0:11", cue: "Majestic brass and woodwind swell with shimmering orchestra celesta", type: "Music Accent" },
        { timestamp: "0:12", cue: "Soft wooden door creak and warm interior laughter hum from inside", type: "Foley / Ambience" },
        { timestamp: "0:13", cue: "Delicate wind chime resonance tuned to pentatonic E major", type: "Magic SFX" },
        { timestamp: "0:14", cue: "Excited baby ladybug gasp: 'Mama! Papa!' (tiny vocal gasp)", type: "Character Vocal" }
      ],
      directorNotes: "Contrast the cold blue forest outside with the furnace of amber love under the mushroom gills."
    },
    {
      id: 4,
      timeRange: "0:15 - 0:20",
      startSec: 15,
      endSec: 20,
      title: "The Warmest Reunion",
      tagline: "Wrapped in love, forever guided by a friend",
      imageSrc: "/src/assets/images/scene4_family_reunion_1794292636500.jpg",
      camera: {
        shotType: "Medium Heartfelt Family Portrait Shot (Golden Hour Macro)",
        motion: "Gentle inward push followed by subtle slow pull-out to let the warm family silhouette settle into heart-shaped composition",
        lens: "50mm portrait cine-lens, f/2.0, dreamlike golden rim glow",
        framing: "Trio of ladybugs embrace center-frame; Pip hovers high-right bathed in backlighting"
      },
      lighting: {
        primary: "Rich honeyed golden hour backlighting pouring through the underside of mushroom gills like a cathedral canopy",
        ambient: "Warm peach, apricot, and soft rose fill light bouncing off the mossy ground",
        atmosphere: "Gentle floating golden dust motes swirling in harmony; volumetric light beams haloing the family"
      },
      characters: [
        {
          name: "Dot & Parents (Ladybug Family)",
          action: "Dot leaping straight into the open embrace of her mother and father; wings flutter with tears of absolute joy",
          emotion: "Overwhelming love, relief, family devotion, warmth",
          details: "Mother ladybug with tender curled antennae and gentle eyes; Father ladybug with sturdy shell and proud smile enveloping Dot"
        },
        {
          name: "Pip (Firefly)",
          action: "Hovering gracefully overhead, hands folded happily behind back, glowing with his brightest, softest emerald-gold aura",
          emotion: "Heartfelt satisfaction, selfless guardian joy, quiet pride",
          details: "Gentle wink to camera/audience before pulsing light once more in triumph"
        }
      ],
      videoPrompt: {
        universal: "4K, 60fps, Unreal Engine 5 render, hyper-detailed, vibrant colors, Pixar style. Heartwarming emotional climax under the glowing golden underside of the giant mushroom cap. Baby ladybug Dot is wrapped in a tearful, loving hug by her overjoyed ladybug mother and father. Pip the cute firefly hovers above them, smiling with pride as his golden light gently bathes the reunited family in a heavenly warm glow. Golden volumetric god rays, rich subsurface scattering, photorealistic animation, crisp edges --ar 16:9 --v 6.0",
        veo2: "Pixar emotional climax scene, 4k 60fps. Under a glowing mushroom canopy, baby ladybug Dot hugs her mom and dad with tears of pure happiness. Pip the glowing firefly smiles above in the golden sunbeams. Unreal Engine 5 cinematic lighting, soft warm bokeh, vibrant red shells, heartwarming feature animation --ar 16:9.",
        sora: "Cinematic Pixar style 3D animation at 60fps 4k. Tender family embrace between baby ladybug Dot and her smiling parents under a massive amber-lit mushroom. Pip the firefly floats happily above, his radiant glow illuminating the tearful reunion. Volumetric golden light, hyper-detailed textures, heartwarming finish --ar 16:9.",
        midjourney: "Pixar style 3D animation key visual, 4k 60fps Unreal Engine 5 render. Warm emotional family reunion under the sheltered amber-lit underside of the giant mushroom cap. Dot the baby ladybug is enveloped in a joyful, loving hug by her smiling mother and father ladybugs with glossy red shells. Hovering affectionately nearby, Pip the firefly radiates a soft, heartwarming golden glow with a proud happy smile. Golden cinematic backlighting, soft volumetric god rays, adorable Pixar character expressions, hyper-detailed --ar 16:9 --v 6.0, ultra-high definition, 4k resolution, cinematic lighting, photorealistic animation, crisp edges"
      },
      voScript: {
        text: "Safe in their loving embrace, Dot knew that no forest was ever too dark with a true friend by your side.",
        subtext: "Heartfelt, deeply emotional conclusion. Warm smile in the voice.",
        pacing: "Gentle decrescendo into peaceful storybook cadence"
      },
      sfxCues: [
        { timestamp: "0:16", cue: "Soft tactile click of glossy ladybug shells meeting in an emotional hug", type: "Foley / Character" },
        { timestamp: "0:17", cue: "Quiet relieved sigh and cheerful murmurs from mother and father", type: "Character Vocal" },
        { timestamp: "0:18", cue: "Warm cello and acoustic harp crescendo into a sweet, resolved major chord", type: "Music Climax" },
        { timestamp: "0:19", cue: "Final magical firefly shimmer chime as Pip pulses warmly", type: "Magic SFX" }
      ],
      directorNotes: "Hold the final frame for 1 second of lingering resonance as the warm light softly blooms before fade-out."
    }
  ],
  voiceover: {
    narratorProfile: "Warm, nurturing, evocative classic storybook narrator (akin to John Hurt in 'The Storyteller' or Emma Thompson in 'Nanny McPhee', or a soothing bedtime parent)",
    tone: "Warm, gentle, reassuring, magical storytelling",
    targetPace: "Moderate-slow (approx. 110 words per minute across 20 seconds, allowing sound effects and music to breathe)",
    microphoneChain: "Neumann U87 into Avalon 737 tube preamp with gentle 2:1 optical compression and high-shelf air boost at 12kHz",
    fullScript: [
      {
        timestamp: "0:00 - 0:05",
        line: "In the hush of twilight, little Dot felt all alone in the great big woods...",
        direction: "Quiet, empathetic, establishing loneliness without despair"
      },
      {
        timestamp: "0:05 - 0:10",
        line: "...until Pip arrived with a spark of hope, lighting up the secret path.",
        direction: "Playful lift, smile entering the vocal timbre as hope ignites"
      },
      {
        timestamp: "0:10 - 0:15",
        line: "Just past the mossy bend stood the Great Mushroom, glowing with warmth and home.",
        direction: "Expansive wonder, cinematic awe and relief"
      },
      {
        timestamp: "0:15 - 0:20",
        line: "Safe in their loving embrace, Dot knew that no forest was ever too dark with a true friend by your side.",
        direction: "Deeply heartwarming, gentle resolution, smiling cadence"
      }
    ]
  },
  music: {
    title: "Pip's Golden Lantern (Theme for Pip & Dot)",
    genre: "Cinematic Children's Animation Score / Whimsical Orchestral Lullaby",
    tempo: "84 BPM, 3/4 Time Signature (gentle waltz feel)",
    key: "E Major (modulating warmly to G Major at 0:15)",
    instrumentation: [
      "Celesta & Glockenspiel (magical firefly sparkle)",
      "Concert Harp (sweeping arpeggiated water ripples)",
      "Solo Clarinet & Warm Cor Anglais (Dot's innocent loneliness)",
      "Pizzicato Violins & Cellos (playful scurrying rhythm)",
      "Lush Symphonic String Section (emotional reunion crescendo)",
      "Low French Horn & Bassoon (reassuring fungal forest depth)"
    ],
    structure: [
      {
        time: "0:00 - 0:05",
        section: "Intro: Twilight Lullaby",
        description: "Solitary warm harp arpeggio over a gentle sustained low string pad in E minor; solitary high celesta note drops like water"
      },
      {
        time: "0:05 - 0:10",
        section: "A-Theme: The Scamper & Spark",
        description: "Pizzicato violins initiate a playful 3/4 waltz rhythm at 84 BPM; bright glockenspiel mirrors Pip's darting lantern flight"
      },
      {
        time: "0:10 - 0:15",
        section: "B-Theme: The Wonder of the Spore Dome",
        description: "Woodwinds (flute & oboe) soar with sweeping harp glissandi; French horns introduce the majestic majestic mushroom motif"
      },
      {
        time: "0:15 - 0:20",
        section: "Coda: Golden Embrace",
        description: "Full string section swells into a tearjerking G Major cadence; final celesta harmonic chime leaves an enduring magical glow"
      }
    ],
    sunoPrompt: "Whimsical Pixar animation score, gentle 3/4 waltz, 84 BPM, celesta, concert harp, warm solo clarinet, playful pizzicato strings, lush emotional orchestral swell, magical enchanted forest, innocent children's film theme, heart-melting family reunion, pristine studio acoustic recording, dynamic crescendo, cinematic mixing",
    udioTags: [
      "cinematic",
      "children animation",
      "pixar style",
      "waltz",
      "orchestral",
      "celesta",
      "acoustic harp",
      "pizzicato",
      "whimsical",
      "heartwarming",
      "fairy tale"
    ]
  },
  sfxOverview: {
    foleyLayer: "Macro organic textures: damp spongy moss footfalls, tactile chitinous carapace rubs, slick dewdrop surface tension pops, soft insect wing whirrs.",
    ambientLayer: "Deep twilight biome: soothing field crickets, subtle canopy breeze, distant gentle burbling brook, warm reverberant mushroom cavern air.",
    magicalLayer: "Bioluminescent sonic design: warm crystalline chime cascades, resonant 432Hz harmonic hums for Pip's glow, sparkle trails synced to particle bursts."
  },
  toolRecommendations: [
    {
      category: "Video Generation (4K 60fps)",
      primaryTool: "Google Veo 2 / OpenAI Sora",
      alternativeTools: ["Runway Gen-3 Alpha Turbo", "Luma Dream Machine 1.5", "Midjourney v6 + Kling 1.5"],
      pipelineRole: "Generates the ultra-detailed 3D Pixar aesthetic, physics of bioluminescent light, and believable character micro-acting.",
      recommendedSettings: "16:9 Aspect Ratio, Motion Score 4, Cinematic Camera Control, Camera Dolly/Pan prompts, Seed locking for character consistency."
    },
    {
      category: "Voiceover & Character Acting",
      primaryTool: "ElevenLabs",
      alternativeTools: ["Google Cloud Text-to-Speech (Journey Voices)", "PlayHT 2.0", "Resemble AI"],
      pipelineRole: "Synthesizes the soothing, maternal/paternal bedtime storyteller performance with warm chest resonance and intimate proximity effect.",
      recommendedSettings: "Voice: 'Charlotte' or 'George', Stability: 0.65, Similarity: 0.85, Style Exaggeration: 0.15 with breath cadence tags."
    },
    {
      category: "AI Score & Soundtrack",
      primaryTool: "Suno v3.5 / Udio 1.5",
      alternativeTools: ["Soundraw", "AIVA (Orchestral Engine)", "Epidemic Sound"],
      pipelineRole: "Composes the bespoke 20-second cinematic cue with celesta, pizzicato strings, and emotional crescendo timed to the script cuts.",
      recommendedSettings: "Instrumental mode, Custom Prompting with BPM (84 BPM) and instrument constraints, 3/4 waltz tags, High Fidelity master export."
    },
    {
      category: "Editing, Foley & Color Grade",
      primaryTool: "DaVinci Resolve Studio 19",
      alternativeTools: ["Adobe Premiere Pro", "Final Cut Pro X", "Topaz Video AI 5"],
      pipelineRole: "Combines 4K clips, syncs 5-second scene transitions, spatial audio foley placement on Fairlight, and 60fps interpolation via Topaz.",
      recommendedSettings: "Timeline 3840x2160 @ 60.000fps, ACEScc color science, Fairlight audio master normalized to -14 LUFS (broadcast children's short)."
    }
  ]
};
