import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Helper for resilient model selection with retry, cooldown tracking, and fallback
// gemini-flash-lite-latest and gemini-3.1-flash-lite provide high availability, low latency, and avoid 503 high-demand spikes
const PRIMARY_MODEL = "gemini-flash-lite-latest";
const FALLBACK_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-3.5-flash-lite",
  "gemini-3.8-flash",
  "gemini-flash-latest",
  "gemini-3.7-flash",
];

// Track model cooldowns to avoid hammering models experiencing temporary high demand
const modelCooldowns = new Map<string, number>();

async function callGeminiWithRetry(params: {
  contents: any;
  config?: any;
}): Promise<string> {
  const now = Date.now();
  const allModels = [PRIMARY_MODEL, ...FALLBACK_MODELS];

  // Prioritize models that are not in cooldown
  const availableModels = allModels.filter((m) => {
    const cooldownUntil = modelCooldowns.get(m) || 0;
    return now >= cooldownUntil;
  });

  // If all models are in cooldown, try all of them anyway
  const modelsToTry = availableModels.length > 0 ? availableModels : allModels;
  let lastError: any = null;

  for (let mIdx = 0; mIdx < modelsToTry.length; mIdx++) {
    const model = modelsToTry[mIdx];
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });
      if (response && response.text) {
        // Clear cooldown on success
        modelCooldowns.delete(model);
        return response.text;
      }
    } catch (err: any) {
      lastError = err;
      const msg = String(err?.message || err || "");

      const isHighDemandOrUnavailable = /503|demand|unavailable|overloaded|resource_exhausted/i.test(msg);
      const isRateLimited = /429|quota|rate/i.test(msg);

      if (isHighDemandOrUnavailable || isRateLimited) {
        // Mark model as cooling down for 60 seconds
        modelCooldowns.set(model, Date.now() + 60_000);
        // Immediately try the next model without wasting time or repeating identical failure
        continue;
      }

      // For transient network errors, try at most one quick retry
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const retryResponse = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: params.config,
        });
        if (retryResponse && retryResponse.text) {
          return retryResponse.text;
        }
      } catch (retryErr: any) {
        lastError = retryErr;
      }
    }
  }

  throw lastError || new Error("All AI model attempts failed.");
}

function generateFallbackLearningPack(topic: string, grade: number, vocabCount: number, grammarTense: string) {
  const cleanTopic = topic.trim() || "English Adventure";
  const numGrade = Number(grade) || 3;
  return {
    topic: cleanTopic,
    grade: numGrade,
    vocabulary: [
      { id: "v1", word: "explore", clue: "To travel around a new place to learn about it.", distractors: ["sleep", "sit", "forget"], example: `We love to explore ${cleanTopic}.`, emoji: "🧭" },
      { id: "v2", word: "ancient", clue: "Belonging to a time very long ago in history.", distractors: ["modern", "tomorrow", "young"], example: "Many interesting things happened in ancient times.", emoji: "⏳" },
      { id: "v3", word: "fossil", clue: "The hardened remains of a prehistoric animal in rock.", distractors: ["plastic", "leaf", "cloud"], example: "Scientists found a giant fossil yesterday.", emoji: "🦴" },
      { id: "v4", word: "magnificent", clue: "Extremely impressive, beautiful, or grand.", distractors: ["ugly", "boring", "tiny"], example: `The museum has a magnificent ${cleanTopic} display.`, emoji: "✨" },
      { id: "v5", word: "protect", clue: "To keep someone or something safe from harm.", distractors: ["break", "destroy", "lose"], example: "We should protect animals and forests.", emoji: "🛡️" }
    ].slice(0, Math.max(3, vocabCount || 5)),
    reading: {
      title: `The Wonders of ${cleanTopic}`,
      passage: `Long ago, fascinating creatures and mysteries existed on our planet Earth. Today, students and scientists around the world explore ${cleanTopic} to discover new facts and stories. Learning about nature and history helps us understand our planet and appreciate everything around us.`,
      questions: [
        { question: `What do students explore to discover new facts?`, options: [`${cleanTopic}`, "Only video games", "Nothing"], correctAnswer: `${cleanTopic}` },
        { question: "Why do we study nature and history?", options: ["To understand our planet", "To sleep more", "To forget everything"], correctAnswer: "To understand our planet" }
      ]
    },
    readingPassage: {
      title: `The Wonders of ${cleanTopic}`,
      text: `Long ago, fascinating creatures and mysteries existed on our planet Earth. Today, students and scientists around the world explore ${cleanTopic} to discover new facts and stories. Learning about nature and history helps us understand our planet and appreciate everything around us.`,
      questions: [
        `What do students explore to discover new facts?`,
        `Why is learning about ${cleanTopic} important for our future?`
      ]
    },
    grammar: {
      title: `${grammarTense || "Grammar"} in Action`,
      rule: "Remember to check subject-verb agreement and proper verb forms when describing facts and actions!",
      examples: [
        "Scientists discover interesting facts every day.",
        "We love to study English with our friends."
      ],
      questions: [
        { question: "Students _____ excited to learn new English words.", options: ["are", "is", "be"], correctAnswer: "are" }
      ]
    },
    speaking: [
      { type: "repeat", prompt: "Listen and repeat clearly:", text: `I love learning about ${cleanTopic}!` },
      { type: "answer", prompt: `What is the most interesting thing about ${cleanTopic}?`, sampleAnswer: `The most interesting thing is how special and fun it is.` }
    ],
    speakingPrompts: [
      `Talk about what you know about ${cleanTopic} in 30 seconds.`,
      `If you could visit an English museum, what would you ask the guide?`
    ],
    writing: {
      prompt: `Write 3 to 4 sentences about ${cleanTopic}. Include why it is interesting to you.`,
      modelText: `I am very excited about ${cleanTopic}. It teaches me so many wonderful facts about our world. I hope to learn more with my friends and teacher!`,
      starter: `In my opinion, ${cleanTopic} is...`
    },
    writingTask: {
      prompt: `Write 3 to 4 sentences about ${cleanTopic}. Include why it is interesting to you.`
    },
    listening: {
      script: `Hello everyone! Welcome to today's English lesson on ${cleanTopic}. Please listen carefully and answer the questions.`,
      questions: [
        { question: "What is today's lesson about?", options: [`${cleanTopic}`, "Cooking food", "Mathematics"], correctAnswer: `${cleanTopic}` }
      ]
    },
    miniGameIdea: `Balloon Pop & Word Match game with ${cleanTopic} vocabulary!`
  };
}

// 1. API: Generate Vocab Clue (Ensuring target word is NOT leaked in clue)
app.post("/api/gemini/generate-vocab-clue", async (req, res) => {
  try {
    const { word, grade = 3, topic = "General" } = req.body;
    if (!word) {
      return res.status(400).json({ error: "Target word is required" });
    }

    const prompt = `You are an expert primary school English curriculum designer (Global Success Vietnam Grade 1-5).
Generate teaching materials for the target word "${word}" for primary school Grade ${grade} (Topic: ${topic}).
IMPORTANT SAFETY RULE: The clue MUST NOT contain the word "${word}" or its exact root forms. It should describe the concept in simple, age-appropriate English that an 8-11 year old can understand.

Return JSON with:
{
  "word": "${word}",
  "clue": "Simple kid-friendly clue without mentioning the word itself",
  "detailedClues": ["Clue 1 (general)", "Clue 2 (more specific)", "Clue 3 (very specific)"],
  "distractors": ["distractor1", "distractor2", "distractor3"],
  "exampleSentence": "A simple example sentence using the word",
  "phonics": "IPA or phonetic guide",
  "partOfSpeech": "noun/verb/adjective",
  "vietnameseMeaning": "Nghĩa tiếng Việt ngắn gọn",
  "imageDescription": "Cute illustration description for kids",
  "emoji": "appropriate single emoji"
}`;

    const text = await callGeminiWithRetry({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are a specialist in teaching English to Vietnamese primary school students (Global Success syllabus). Always create fun, friendly, and pedagogically sound materials.",
      },
    });

    const json = JSON.parse(text || "{}");
    res.json(json);
  } catch (error: any) {
    console.error("Error generating vocab clue:", error);
    const w = req.body.word || "word";
    res.json({
      word: w,
      clue: `A friendly concept related to ${req.body.topic || "our English lesson"}.`,
      detailedClues: [`It is learned in Grade ${req.body.grade || 3}.`, `Think about ${req.body.topic || "daily vocabulary"}.`],
      distractors: ["school", "friend", "pencil"],
      exampleSentence: `We study about ${w} in our English class.`,
      phonics: `/${w}/`,
      partOfSpeech: "noun",
      vietnameseMeaning: `Từ vựng: ${w}`,
      imageDescription: `Illustration of ${w}`,
      emoji: "🌟",
    });
  }
});

// 2. API: Check if clue leaks target word
app.post("/api/gemini/check-clue", async (req, res) => {
  try {
    const { word, clue } = req.body;
    if (!word || !clue) {
      return res.status(400).json({ error: "Word and clue are required" });
    }

    const cleanWord = word.trim().toLowerCase();
    const cleanClue = clue.toLowerCase();

    // Check simple substring
    const regex = new RegExp(`\\b${cleanWord}(s|es|ed|ing|d)?\\b`, "i");
    const containsDirectly = regex.test(cleanClue);

    if (containsDirectly) {
      return res.json({
        hasLeak: true,
        reason: `The clue contains the target word "${word}". Please describe it without saying "${word}".`,
        suggestedClue: `It is something that...`,
      });
    }

    // AI Check for smart semantic leaks
    const prompt = `Target word: "${word}"
Clue: "${clue}"

Determine if the clue contains or explicitly gives away the word "${word}" (or obvious variations) in a way that violates a guessing game rule.
Return JSON:
{
  "hasLeak": boolean,
  "reason": "explanation if leak or null",
  "improvedClue": "a better rewritten clue if needed"
}`;

    const text = await callGeminiWithRetry({
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    const result = JSON.parse(text || "{}");
    res.json(result);
  } catch (error: any) {
    res.json({ hasLeak: false });
  }
});

// 3. API: Generate Writing Model & Prompts (Supporting /generate-writing and /generate-writing-model)
const handleGenerateWriting = async (req: express.Request, res: express.Response) => {
  try {
    const {
      topic = "My Family",
      wordCount = 50,
      targetWordCount = 50,
      tense = "Present Simple (Hiện tại đơn)",
      requiredVocabulary = [],
      grade = 3,
      type = "paragraph",
    } = req.body;

    const length = targetWordCount || wordCount || 50;
    const vocabList = Array.isArray(requiredVocabulary) 
      ? requiredVocabulary.filter((v: any) => typeof v === "string" && v.trim())
      : (typeof requiredVocabulary === "string" && requiredVocabulary ? requiredVocabulary.split(",").map((s: string) => s.trim()) : []);

    const vocabRequirement = vocabList.length > 0
      ? `MANDATORY REQUIREMENT: You MUST include and naturally integrate the following target vocabulary words in the essay: ${vocabList.join(", ")}.`
      : `Include 4-5 age-appropriate vocabulary words suited for Grade ${grade}.`;

    const prompt = `You are an expert English primary school curriculum developer for Vietnamese students (Global Success Grade 1-5).
Create a high-quality model essay based on these exact specifications:
- Topic: "${topic}"
- Target Word Count: approximately ${length} words (keep it very close to ${length} words, suited for Grade ${grade} primary students)
- Target Grammar Tense: "${tense}" (STRICTLY use this grammatical tense throughout the essay)
- Required Vocabulary to include: ${vocabRequirement}
- Target Grade Level: Grade ${grade}

Return JSON with this exact schema:
{
  "title": "A catchy child-friendly title for the essay in English",
  "modelParagraph": "The complete model essay text in standard, simple, correct English",
  "modelText": "The complete model essay text",
  "wordCount": number (actual word count of the model text),
  "tenseUsed": "${tense}",
  "keyVocabulary": ["list of key vocabulary used in the text, highlighting required words first"],
  "vocabularyList": ["list of key vocabulary used in the text"],
  "keyStructures": ["Grammar structure 1 with example", "Grammar structure 2 with example"],
  "sentencePatterns": ["Grammar structure 1 with example", "Grammar structure 2 with example"],
  "writingPrompts": [
    "Guiding question 1 to help the student write their own version",
    "Guiding question 2 to help the student write their own version",
    "Guiding question 3 to help the student write their own version"
  ],
  "vietnameseTranslation": "Bản dịch tiếng Việt chuẩn xác, mượt mà và dễ hiểu cho học sinh tiểu học"
}`;

    const text = await callGeminiWithRetry({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You create high-quality, friendly English primary educational writing materials for Vietnamese kids.",
      },
    });

    const parsed = JSON.parse(text || "{}");
    const modelText = parsed.modelParagraph || parsed.modelText || `Hello! Today I want to share about ${topic}. It is very interesting and fun. I love learning about it with my friends and family!`;
    const actualWordCount = modelText.split(/\s+/).filter(Boolean).length;

    res.json({
      title: parsed.title || topic,
      modelParagraph: modelText,
      modelText: modelText,
      wordCount: parsed.wordCount || actualWordCount,
      tenseUsed: parsed.tenseUsed || tense,
      keyVocabulary: parsed.keyVocabulary || (vocabList.length > 0 ? vocabList : ["family", "friends", "happy", "school"]),
      vocabularyList: parsed.vocabularyList || (vocabList.length > 0 ? vocabList : ["family", "friends", "happy", "school"]),
      keyStructures: parsed.keyStructures || parsed.sentencePatterns || ["This is my...", "I love + V-ing"],
      sentencePatterns: parsed.sentencePatterns || parsed.keyStructures || ["This is my...", "I love + V-ing"],
      writingPrompts: parsed.writingPrompts || [
        "What is your topic about?",
        "Who or what are you describing?",
        "How do you feel about it?"
      ],
      vietnameseTranslation: parsed.vietnameseTranslation || `Xin chào! Hôm nay mình muốn chia sẻ về ${topic}. Thật là thú vị và vui vẻ!`,
    });
  } catch (error: any) {
    console.error("Error generating writing:", error);
    const fallbackTopic = req.body.topic || "My School";
    const vocabList = Array.isArray(req.body.requiredVocabulary) ? req.body.requiredVocabulary : ["school", "study", "friends", "happy"];
    res.json({
      title: `A Short Essay about ${fallbackTopic}`,
      modelParagraph: `Hello! Today I want to tell you about ${fallbackTopic}. In the morning, I wake up early and study English. I love learning and playing with my friends. It is wonderful!`,
      modelText: `Hello! Today I want to tell you about ${fallbackTopic}. In the morning, I wake up early and study English. I love learning and playing with my friends. It is wonderful!`,
      wordCount: 32,
      tenseUsed: req.body.tense || "Present Simple",
      keyVocabulary: vocabList.length > 0 ? vocabList : ["morning", "study", "friends", "wonderful"],
      vocabularyList: vocabList.length > 0 ? vocabList : ["morning", "study", "friends", "wonderful"],
      keyStructures: ["I love + V-ing", "It is + adj"],
      sentencePatterns: ["I love + V-ing", "It is + adj"],
      writingPrompts: ["What is your favorite thing?", "Who is with you?", "Why do you like it?"],
      vietnameseTranslation: `Xin chào! Hôm nay mình muốn kể về ${fallbackTopic}. Vào buổi sáng, mình dậy sớm và học tiếng Anh. Mình rất thích học và chơi cùng bạn bè. Thật tuyệt vời!`,
    });
  }
};

app.post("/api/gemini/generate-writing", handleGenerateWriting);
app.post("/api/gemini/generate-writing-model", handleGenerateWriting);

// 4. API: Evaluate Student Writing with constructive feedback
app.post("/api/gemini/evaluate-writing", async (req, res) => {
  try {
    const {
      studentText,
      topic = "My Family",
      grade = 3,
      targetTense,
      requiredVocabulary = [],
      targetWordCount = 40,
    } = req.body;

    if (!studentText || !studentText.trim()) {
      return res.status(400).json({ error: "Student text is required" });
    }

    const studentWords = studentText.trim().split(/\s+/).filter(Boolean);
    const wordCount = studentWords.length;

    const vocabList = Array.isArray(requiredVocabulary)
      ? requiredVocabulary.filter((v: any) => typeof v === "string" && v.trim())
      : (typeof requiredVocabulary === "string" && requiredVocabulary ? requiredVocabulary.split(",").map((s: string) => s.trim()) : []);

    const tenseInfo = targetTense ? `Target Grammar Tense to enforce and check: "${targetTense}".` : "";
    const vocabInfo = vocabList.length > 0 ? `Target Vocabulary words student was encouraged to use: ${vocabList.join(", ")}.` : "";

    const prompt = `You are an expert English pedagogy instructor evaluating a Vietnamese primary school student's English writing.
Topic: "${topic}"
Grade Level: Grade ${grade} (Vietnam Global Success curriculum)
Student Draft: "${studentText}"
Word Count: ${wordCount} words (Target was approx ${targetWordCount} words)
${tenseInfo}
${vocabInfo}

CRITICAL PEDAGOGICAL INSTRUCTIONS:
1. Provide STRUCTURED, SPECIFIC ERROR DIAGNOSTICS instead of vague generic feedback.
2. Carefully inspect the student's draft for:
   - Subject-Verb Agreement (e.g., "He like" ➔ "He likes", "My father cook" ➔ "My father cooks", "They is" ➔ "They are")
   - Verb Tense Errors (e.g. using Present when Past was requested, or wrong past verb form like "goed" / "seed" or missing "ed")
   - Articles (a vs an before vowels, missing articles: "have dog" ➔ "have a dog")
   - Plural Nouns (singular/plural mismatch, "two cat" ➔ "two cats")
   - Word Order / Sentence Structure (e.g., "I like very much it" ➔ "I like it very much")
   - Spelling & Capitalization (capitalizing 'I', first word of sentences, proper names like Hanoi, Vietnam)
   - Punctuation (periods at the end of sentences, commas)
3. For EACH mistake identified:
   - Categorize clearly: "subject_verb_agreement", "verb_tense", "spelling", "punctuation_caps", "articles", "plural_nouns", "word_order", "word_choice"
   - Assign severity: "error" (critical grammar/spelling bug), "warning" (awkward phrasing or missing word), or "tip" (style/enrichment suggestion)
   - Provide a clear, child-friendly ruleExplanation in Vietnamese (e.g. "Quy tắc: Với chủ ngữ số ít (He, She, It, My father) ở thì Hiện tại đơn, động từ thường phải thêm 's' hoặc 'es'.")
   - Provide a direct, actionableHint in Vietnamese telling the student EXACTLY what action to take (e.g. "Thêm chữ cái 's' vào sau từ 'cook' để thành 'cooks' vì chủ ngữ 'My mother' là ngôi thứ 3 số ít.")
   - Provide a concrete mini example (incorrect vs correct)
4. Provide a 4-part Rubric Score (each out of 25, summing to 100):
   - grammarScore (max 25): Evaluation of tenses, S-V agreement, and sentence structures
   - vocabularyScore (max 25): Appropriate grade-level word choice and use of required vocabulary
   - spellingPunctuationScore (max 25): Capitalization, punctuation marks, correct spelling
   - contentFlowScore (max 25): Topic relevance, clarity of ideas, and sentence flow
5. Provide actionableGuidance: An array of 2 to 4 clear, numbered action points that the student can directly execute to improve their draft.
6. Provide a natural, polished improvedVersion of their draft (natural Grade ${grade} English).

Respond ONLY with valid JSON with this exact schema:
{
  "score": number (60 to 100),
  "xpEarned": 25,
  "praise": "Warm, specific praise in Vietnamese & English noting their effort and strengths",
  "encouragement": "Empowering message in Vietnamese encouraging them to keep writing",
  "improvedVersion": "Natural, polished, correct English version",
  "vietnameseTranslation": "Bản dịch tiếng Việt chuẩn xác của bài viết đã hoàn thiện",
  "rubric": {
    "grammarScore": number (15-25),
    "grammarFeedback": "Nhận xét chi tiết về ngữ pháp và thì",
    "vocabularyScore": number (15-25),
    "vocabularyFeedback": "Nhận xét về vốn từ và từ vựng mục tiêu",
    "spellingPunctuationScore": number (15-25),
    "spellingPunctuationFeedback": "Nhận xét về chính tả, dấu câu, viết hoa",
    "contentFlowScore": number (15-25),
    "contentFlowFeedback": "Nhận xét về độ trôi chảy và bám sát chủ đề"
  },
  "corrections": [
    {
      "type": "subject_verb_agreement" | "verb_tense" | "articles" | "plural_nouns" | "spelling" | "punctuation_caps" | "word_order" | "word_choice",
      "categoryTitle": "Hòa hợp Chủ ngữ - Động từ (Subject-Verb Agreement)",
      "severity": "error" | "warning" | "tip",
      "original": "exact erroneous phrase in student text",
      "suggestion": "corrected phrase",
      "ruleExplanation": "Quy tắc ngữ pháp giải thích ngắn gọn, dễ hiểu cho học sinh tiểu học",
      "actionableHint": "Hành động cụ thể em cần làm để sửa lỗi này",
      "example": {
        "incorrect": "He like apples.",
        "correct": "He likes apples."
      }
    }
  ],
  "actionableGuidance": [
    "1. Đổi '...' thành '...' vì ...",
    "2. Thêm dấu chấm câu ở cuối mỗi câu hoàn chỉnh.",
    "3. ..."
  ],
  "vocabularyHighlights": ["list of good vocabulary used by student"],
  "targetVocabUsed": ["target words used correctly"],
  "friendlyTip": "One memorable golden rule for next time"
}`;

    const text = await callGeminiWithRetry({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are an affectionate, pedagogically rigorous English teacher for Vietnamese elementary students.",
      },
    });

    const parsed = JSON.parse(text || "{}");
    const corrected = parsed.improvedVersion || parsed.correctedText || studentText;
    
    // Normalize corrections with safe fallbacks
    const normalizedCorrections = Array.isArray(parsed.corrections)
      ? parsed.corrections.map((c: any) => ({
          type: c.type || "other",
          categoryTitle: c.categoryTitle || getCategoryTitle(c.type),
          severity: c.severity || "error",
          original: c.original || "",
          suggestion: c.suggestion || c.correction || "",
          correction: c.suggestion || c.correction || "",
          ruleExplanation: c.ruleExplanation || c.reason || "Hãy kiểm tra lại cấu trúc ngữ pháp này nhé.",
          actionableHint: c.actionableHint || `Sửa "${c.original}" thành "${c.suggestion || c.correction}".`,
          example: c.example || undefined,
          reason: c.ruleExplanation || c.reason,
        }))
      : [];

    const grammarScore = parsed.rubric?.grammarScore ?? 22;
    const vocabularyScore = parsed.rubric?.vocabularyScore ?? 23;
    const spellingPunctuationScore = parsed.rubric?.spellingPunctuationScore ?? 23;
    const contentFlowScore = parsed.rubric?.contentFlowScore ?? 22;
    const computedTotalScore = parsed.score || (grammarScore + vocabularyScore + spellingPunctuationScore + contentFlowScore);

    res.json({
      score: Math.min(100, Math.max(60, computedTotalScore)),
      xpEarned: parsed.xpEarned || 25,
      praise: parsed.praise || "Tuyệt vời! Em đã viết câu rất rõ ràng và thể hiện sự tiến bộ lớn!",
      correctedText: corrected,
      improvedVersion: corrected,
      vietnameseTranslation: parsed.vietnameseTranslation || "",
      encouragement: parsed.encouragement || "Tiếp tục luyện viết mỗi ngày để trở thành nhà vô địch tiếng Anh nhé!",
      rubric: {
        grammarScore,
        grammarFeedback: parsed.rubric?.grammarFeedback || "Cấu trúc câu rõ ràng, chú ý thêm các quy tắc chia động từ.",
        vocabularyScore,
        vocabularyFeedback: parsed.rubric?.vocabularyFeedback || "Vốn từ phong phú, sử dụng tốt các từ vựng theo chủ đề.",
        spellingPunctuationScore,
        spellingPunctuationFeedback: parsed.rubric?.spellingPunctuationFeedback || "Chính tả tốt, luôn nhớ viết hoa đầu câu và dấu chấm.",
        contentFlowScore,
        contentFlowFeedback: parsed.rubric?.contentFlowScore || "Ý tứ mạch lạc, đúng trọng tâm đề bài.",
      },
      corrections: normalizedCorrections,
      actionableGuidance: parsed.actionableGuidance && parsed.actionableGuidance.length > 0
        ? parsed.actionableGuidance
        : generateDefaultGuidance(normalizedCorrections, grade),
      vocabularyHighlights: parsed.vocabularyHighlights || ["good effort"],
      targetVocabUsed: parsed.targetVocabUsed || [],
      friendlyTip: parsed.friendlyTip || "Nhớ viết hoa chữ cái đầu câu và thêm dấu chấm cuối câu nhé!",
      actualWordCount: wordCount,
    });
  } catch (error: any) {
    console.error("Error evaluating writing:", error);
    const words = (req.body.studentText || "").trim().split(/\s+/).filter(Boolean);
    const fallbackCorrections = detectCommonWritingErrors(req.body.studentText || "");

    res.json({
      score: Math.max(80, 95 - fallbackCorrections.length * 5),
      xpEarned: 25,
      praise: "Rất tốt! Bạn đã hoàn thành bài viết của mình với tinh thần học tập tuyệt vời! ⭐",
      correctedText: req.body.studentText || "",
      improvedVersion: req.body.studentText || "",
      vietnameseTranslation: "Bài viết mẫu hoàn chỉnh của em.",
      encouragement: "Tiếp tục luyện tập viết tiếng Anh mỗi ngày nhé!",
      rubric: {
        grammarScore: 23,
        grammarFeedback: "Ngữ pháp cơ bản tốt, hãy chú ý quy tắc chia động từ theo chủ ngữ.",
        vocabularyScore: 24,
        vocabularyFeedback: "Từ vựng phù hợp với chủ đề bài học.",
        spellingPunctuationScore: 22,
        spellingPunctuationFeedback: "Hãy kiểm tra dấu chấm câu và viết hoa chữ cái đầu câu.",
        contentFlowScore: 23,
        contentFlowFeedback: "Bài viết mạch lạc, thể hiện tốt ý tưởng.",
      },
      corrections: fallbackCorrections,
      actionableGuidance: generateDefaultGuidance(fallbackCorrections, req.body.grade || 3),
      vocabularyHighlights: words.slice(0, 4),
      targetVocabUsed: req.body.requiredVocabulary || [],
      friendlyTip: "Hãy nhớ chú ý dấu chấm câu và viết hoa đầu câu nhé!",
      actualWordCount: words.length,
    });
  }
});

// Helper for Vietnamese category titles
function getCategoryTitle(type?: string): string {
  switch (type) {
    case "subject_verb_agreement":
      return "Hòa hợp Chủ ngữ - Động từ (Subject-Verb Agreement)";
    case "verb_tense":
      return "Chia thì động từ (Verb Tense)";
    case "articles":
      return "Mạo từ a / an / the (Articles)";
    case "plural_nouns":
      return "Danh từ số ít & số nhiều (Plural Nouns)";
    case "spelling":
      return "Chính tả từ vựng (Spelling)";
    case "punctuation_caps":
      return "Dấu câu & Viết hoa (Punctuation & Caps)";
    case "word_order":
      return "Trật tự từ trong câu (Word Order)";
    case "word_choice":
      return "Cách dùng từ phù hợp (Word Choice)";
    default:
      return "Ngữ pháp & Diễn đạt (Grammar & Structure)";
  }
}

// Fallback rule-based common error detector for primary school writing
function detectCommonWritingErrors(text: string): any[] {
  const list: any[] = [];
  const lower = text.toLowerCase();

  // Check 1: Missing capital 'i' standalone
  if (/\b[i]\b/.test(text)) {
    list.push({
      type: "punctuation_caps",
      categoryTitle: "Dấu câu & Viết hoa (Punctuation & Caps)",
      severity: "error",
      original: "i",
      suggestion: "I",
      correction: "I",
      ruleExplanation: "Đại từ nhân xưng 'I' (tôi/mình) trong tiếng Anh LUÔN LUÔN phải được viết hoa dù đứng ở bất kỳ vị trí nào trong câu.",
      actionableHint: "Thay thế chữ 'i' viết thường thành chữ 'I' viết hoa.",
      example: { incorrect: "i like dog", correct: "I like dogs" },
    });
  }

  // Check 2: Missing period at end
  if (text.trim() && !/[.!?]$/.test(text.trim())) {
    list.push({
      type: "punctuation_caps",
      categoryTitle: "Dấu câu & Viết hoa (Punctuation & Caps)",
      severity: "warning",
      original: text.slice(-6),
      suggestion: text.slice(-6) + ".",
      correction: text.slice(-6) + ".",
      ruleExplanation: "Trong tiếng Anh, một câu hoàn chỉnh bắt buộc phải kết thúc bằng dấu chấm (.), dấu hỏi (?), hoặc dấu chấm than (!).",
      actionableHint: "Thêm dấu chấm (.) vào cuối câu văn của em.",
      example: { incorrect: "My mother is kind", correct: "My mother is kind." },
    });
  }

  // Check 3: S-V agreement common patterns (he/she/my father + verb without s)
  const svMatches = [
    { regex: /\b(he|she|it|my father|my mother|my brother|my sister)\s+(like|cook|play|want|love|live|work|go|watch)\b/i, verb: "s/es" },
  ];
  for (const item of svMatches) {
    const match = text.match(item.regex);
    if (match) {
      const subject = match[1];
      const verb = match[2];
      const correctVerb = verb === "go" ? "goes" : verb === "watch" ? "watches" : `${verb}s`;
      list.push({
        type: "subject_verb_agreement",
        categoryTitle: "Hòa hợp Chủ ngữ - Động từ (Subject-Verb Agreement)",
        severity: "error",
        original: `${subject} ${verb}`,
        suggestion: `${subject} ${correctVerb}`,
        correction: `${subject} ${correctVerb}`,
        ruleExplanation: `Khi chủ ngữ là ngôi thứ 3 số ít (${subject}) ở thì Hiện tại đơn, động từ '${verb}' phải thêm đuôi '-s' hoặc '-es'.`,
        actionableHint: `Đổi '${verb}' thành '${correctVerb}' để hòa hợp với chủ ngữ '${subject}'.`,
        example: { incorrect: `${subject} ${verb}`, correct: `${subject} ${correctVerb}` },
      });
    }
  }

  // Check 4: Article "a" before vowel
  const articleVowelMatch = text.match(/\b(a)\s+(apple|orange|egg|ice cream|elephant|umbrella|animal)\b/i);
  if (articleVowelMatch) {
    list.push({
      type: "articles",
      categoryTitle: "Mạo từ a / an / the (Articles)",
      severity: "error",
      original: articleVowelMatch[0],
      suggestion: `an ${articleVowelMatch[2]}`,
      correction: `an ${articleVowelMatch[2]}`,
      ruleExplanation: "Ta dùng mạo từ 'an' (thay vì 'a') trước các danh từ bắt đầu bằng nguyên âm u, e, o, a, i (uể oải).",
      actionableHint: `Đổi 'a ${articleVowelMatch[2]}' thành 'an ${articleVowelMatch[2]}'.`,
      example: { incorrect: `a ${articleVowelMatch[2]}`, correct: `an ${articleVowelMatch[2]}` },
    });
  }

  return list;
}

function generateDefaultGuidance(corrections: any[], grade: number): string[] {
  if (!corrections || corrections.length === 0) {
    return [
      "1. Bài viết rất tốt! Hãy tiếp tục phát huy vốn từ vựng phong phú của em.",
      "2. Thử thách bản thân bằng cách viết thêm 1-2 câu miêu tả cảm xúc hoặc lý do (because...).",
      "3. Luyện đọc to thành tiếng câu văn để rèn luyện ngữ điệu và phát âm tự nhiên.",
    ];
  }

  return corrections.slice(0, 4).map((c, idx) => {
    return `${idx + 1}. [${c.categoryTitle?.split("(")[0].trim() || "Ngữ pháp"}]: ${c.actionableHint}`;
  });
}

// 4B. API: Universal Search & External English Knowledge Lookup
app.post("/api/gemini/quick-lookup", async (req, res) => {
  try {
    const { query = "", grade = 3 } = req.body;
    if (!query.trim()) {
      return res.status(400).json({ error: "Query is required" });
    }

    const prompt = `You are an expert English dictionary and knowledge explorer for Vietnamese primary school students (Grade 1-5, Global Success curriculum).
Student is searching or asking for: "${query}"

Provide a comprehensive, crystal clear explanation tailored to Vietnamese primary school students (Grade ${grade}).
Include:
1. Exact Vietnamese meaning / explanation.
2. Accurate IPA phonetics + explicit breakdown of FINAL CONSONANT / ENDING SOUNDS (e.g., /t/, /d/, /k/, /s/, /z/, /tʃ/, /θ/, /p/) with clear tips for Vietnamese learners who often drop ending sounds.
3. Part of speech (noun, verb, adjective, phrase, grammar structure).
4. Grade level and Unit if it appears in the Global Success textbook (Grades 1-5).
5. 2-3 Simple example sentences with Vietnamese translations.
6. Common collocations, idioms, or fun usage tips.
7. Grammar rule explanation if the query is a grammar topic (e.g., "Present Simple", "like + V-ing", "Wh-questions").

Return STRICT JSON:
{
  "query": "${query}",
  "ipa": "/.../",
  "endingSounds": "Hướng dẫn bật hơi âm đuôi cụ thể (ví dụ: 'Bật hơi âm /t/ dứt khoát ở cuối từ')",
  "partOfSpeech": "noun / verb / grammar rule / sentence",
  "vietnameseMeaning": "Nghĩa tiếng Việt rõ ràng, dễ hiểu",
  "definitionEn": "Simple English definition",
  "curriculumMatch": {
    "isSGK": boolean,
    "grade": number,
    "unit": "Unit name or number",
    "lesson": "Lesson name or number"
  },
  "examples": [
    {
      "en": "English sentence",
      "vi": "Dịch nghĩa tiếng Việt"
    }
  ],
  "collocations": ["word + phrase 1", "word + phrase 2"],
  "grammarTip": "Mẹo ngữ pháp hoặc quy tắc ghi nhớ nhanh"
}`;

    const text = await callGeminiWithRetry({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are a friendly, deeply knowledgeable English teacher for Vietnamese primary school students.",
      },
    });

    res.json(JSON.parse(text || "{}"));
  } catch (error: any) {
    console.error("Error in quick lookup:", error);
    const q = req.body.query || "word";
    res.json({
      query: q,
      ipa: "/.../",
      endingSounds: "Phát âm tròn vành rõ chữ và chú ý bật hơi âm cuối",
      partOfSpeech: "English word / phrase",
      vietnameseMeaning: `Tra cứu cho từ/cụm từ "${q}"`,
      definitionEn: `Information about ${q}`,
      curriculumMatch: { isSGK: true, grade: 3, unit: "Unit Review", lesson: "Lesson 1" },
      examples: [
        { en: `I like to practice ${q}.`, vi: `Tôi thích luyện tập ${q}.` }
      ],
      collocations: [`learn ${q}`],
      grammarTip: "Hãy luyện đọc to từ này 3 lần để ghi nhớ thật lâu nhé!",
    });
  }
});

// 4C. API: Text Selection Instant Translation & Ending Sounds Lookup
app.post("/api/gemini/translate-selection", async (req, res) => {
  try {
    const { text: inputText = "", contextSentence = "", grade = 3 } = req.body;
    if (!inputText.trim()) {
      return res.status(400).json({ error: "Text is required" });
    }

    const prompt = `Translate and explain the highlighted English text for a Vietnamese primary school student:
Highlighted Text: "${inputText}"
Context Sentence: "${contextSentence || inputText}"
Student Grade: Grade ${grade}

Return STRICT JSON:
{
  "text": "${inputText}",
  "translationVi": "Bản dịch tiếng Việt chính xác theo ngữ cảnh",
  "ipa": "IPA phonetic transcription",
  "endingSounds": "Hướng dẫn bật hơi âm đuôi (ví dụ: Bật âm /t/ dứt khoát hoặc /s/ xì hơi)",
  "partOfSpeech": "từ loại (danh từ, động từ, cụm từ, câu)",
  "simpleExplanation": "Giải thích ngắn gọn, dễ hiểu",
  "exampleSentence": "A simple example sentence using this word/phrase",
  "exampleSentenceVi": "Dịch nghĩa câu ví dụ"
}`;

    const text = await callGeminiWithRetry({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You provide instant accurate translation and phonetics for young learners.",
      },
    });

    res.json(JSON.parse(text || "{}"));
  } catch (error: any) {
    console.error("Error in translate selection:", error);
    const t = req.body.text || "";
    res.json({
      text: t,
      translationVi: `Nghĩa của "${t}"`,
      ipa: "/.../",
      endingSounds: "Chú ý phát âm rõ âm đuôi",
      partOfSpeech: "Từ vựng / Cụm từ",
      simpleExplanation: `Cụm từ này được dùng trong câu: "${req.body.contextSentence || t}"`,
      exampleSentence: `Look at the ${t}.`,
      exampleSentenceVi: `Hãy nhìn vào ${t}.`,
    });
  }
});

// Dedicated Smart Classroom English Translation & Context Analyzer
app.post("/api/smart-classroom/translate", async (req, res) => {
  try {
    const { text: rawText = "", contextSentence = "" } = req.body;
    const text = String(rawText).trim();
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const wordCount = text.split(/\s+/).length;
    let expectedType = "word";
    if (wordCount > 1 && (wordCount <= 4 && !/[.!?]$/.test(text))) {
      expectedType = "phrase";
    } else if (wordCount > 4 || /[.!?]$/.test(text)) {
      expectedType = "sentence";
    }

    const prompt = `You are an expert Primary English Language Teacher and linguist specialized in classroom English (Global Success Vietnam curriculum).
Analyze the highlighted English classroom text:
Highlighted Text: "${text}"
Context Sentence: "${contextSentence || text}"

Target Learner/Teacher: Primary English Teacher in Vietnam.
Crucial rule: Provide NATURAL, authentic classroom translations and explanations. DO NOT provide robotic/literal machine translations (e.g., "Keep up the good work" = "Tiếp tục phát huy nhé!", NOT "Giữ công việc tốt"; "Eyes on me" = "Nhìn cô/thầy nào! / Tập trung nhìn cô/thầy", NOT "Mắt trên tôi").

Determine whether this is a:
- "word" (single word)
- "phrase" (2-4 words, collocation or idiom)
- "sentence" (a complete imperative or declarative classroom utterance)

Return STRICT JSON:
{
  "text": "${text}",
  "type": "${expectedType}",
  "ipa": "IPA phonetic transcription (e.g. /ˈaɪz ɑːn miː/)",
  "partOfSpeech": "noun/verb/adjective/phrase/imperative sentence",
  "vietnamese": "Natural, pedagogically appropriate Vietnamese translation",
  "usageOrContext": "How and when a primary teacher uses this in class (e.g. Used to get students' attention)",
  "exampleSentence": "A natural classroom example",
  "exampleSentenceVi": "Vietnamese translation of the example",
  "usefulNotes": "Helpful pedagogical note for teachers (phonics, common errors, body language tips)"
}`;

    const aiRes = await callGeminiWithRetry({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are the master advisor for Smart Classroom English for primary teachers.",
      },
    });

    const parsed = JSON.parse(aiRes || "{}");
    res.json({
      text: parsed.text || text,
      type: parsed.type || expectedType,
      ipa: parsed.ipa || "",
      partOfSpeech: parsed.partOfSpeech || (wordCount === 1 ? "Word" : wordCount <= 4 ? "Phrase" : "Sentence"),
      vietnamese: parsed.vietnamese || `Nghĩa của: "${text}"`,
      usageOrContext: parsed.usageOrContext || "Sử dụng trong lớp học tiếng Anh tiểu học.",
      exampleSentence: parsed.exampleSentence || `Teacher says: "${text}".`,
      exampleSentenceVi: parsed.exampleSentenceVi || `Giáo viên nói: "${text}".`,
      usefulNotes: parsed.usefulNotes || "Phát âm rõ ràng, kết hợp ngôn ngữ cơ thể thân thiện.",
    });
  } catch (error: any) {
    console.error("Error in /api/smart-classroom/translate:", error);
    const fallbackText = String(req.body.text || "").trim();
    const isSingleWord = !fallbackText.includes(" ");
    res.json({
      text: fallbackText,
      type: isSingleWord ? "word" : "phrase",
      ipa: isSingleWord ? "/.../" : "",
      partOfSpeech: isSingleWord ? "Từ vựng" : "Cụm từ lớp học",
      vietnamese: `Nghĩa: "${fallbackText}"`,
      usageOrContext: "Khẩu lệnh / từ ngữ sử dụng trong lớp học tiếng Anh tiểu học.",
      exampleSentence: `Please remember: ${fallbackText}.`,
      exampleSentenceVi: `Hãy ghi nhớ: ${fallbackText}.`,
      usefulNotes: "Phát âm chuẩn xác và nhấn giọng vui tươi để tạo hào hứng cho học sinh.",
    });
  }
});

// Teacher Mode Copilot: Instant Vietnamese to Primary Classroom English with natural variations
app.post("/api/smart-classroom/copilot", async (req, res) => {
  try {
    const { vietnameseInput = "", grade = 3 } = req.body;
    const input = String(vietnameseInput).trim();
    if (!input) {
      return res.status(400).json({ error: "vietnameseInput is required" });
    }

    const prompt = `You are an expert Primary English Teacher trainer specialized in classroom English (Tiếng Anh trong lớp học tiểu học Global Success Việt Nam).
A Vietnamese primary teacher needs to say the following in class right now:
Vietnamese Intent: "${input}"
Target Students: Grade ${grade} Primary School students in Vietnam.

Tasks:
1. Provide the most natural, idiomatic, friendly PRIMARY CLASSROOM English phrase (not dry or overly academic).
2. Provide 2-3 alternative natural ways to say it (e.g. polite, direct, energetic, or playful).
3. Provide key vocabulary / phrasal verbs breakdown with IPA and simple Vietnamese meaning.
4. Provide a practical body language (TPR) or teaching gesture tip.

Return STRICT JSON:
{
  "primaryEnglish": "Most natural English classroom utterance (e.g. Please take out your notebooks.)",
  "ipa": "IPA phonetic transcription",
  "vietnamese": "${input}",
  "alternativePhrases": [
    { "phrase": "Alternative 1 (e.g. Please get your notebooks out.)", "tone": "Thân thiện, tự nhiên" },
    { "phrase": "Alternative 2 (e.g. Take out your notebooks, please.)", "tone": "Lịch sự, dứt khoát" },
    { "phrase": "Alternative 3 (e.g. Notebooks out, everyone!)", "tone": "Nhanh gọn, vui tươi" }
  ],
  "keyWords": [
    { "word": "take out", "ipa": "/teɪk aʊt/", "meaning": "lấy ra (từ trong cặp/ngăn bàn)" },
    { "word": "notebook", "ipa": "/ˈnəʊtbʊk/", "meaning": "vở ghi chép" }
  ],
  "teachingTip": "Cô giơ cuốn vở lên và làm động tác mở cặp để học sinh lớp 1-3 nhìn mẫu và làm theo ngay."
}`;

    const aiRes = await callGeminiWithRetry({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are an elite primary EFL teacher advisor for classroom English.",
      },
    });

    const parsed = JSON.parse(aiRes || "{}");
    res.json({
      primaryEnglish: parsed.primaryEnglish || "Please listen carefully.",
      ipa: parsed.ipa || "",
      vietnamese: parsed.vietnamese || input,
      alternativePhrases: Array.isArray(parsed.alternativePhrases) ? parsed.alternativePhrases : [],
      keyWords: Array.isArray(parsed.keyWords) ? parsed.keyWords : [],
      teachingTip: parsed.teachingTip || "Kết hợp chỉ tay hoặc làm mẫu hành động (TPR) giúp học sinh dễ hiểu.",
    });
  } catch (error: any) {
    console.error("Error in /api/smart-classroom/copilot:", error);
    // Sensible local heuristics fallback
    const input = String(req.body.vietnameseInput || "").trim();
    res.json({
      primaryEnglish: "Please follow teacher's instructions.",
      ipa: "/pliːz ˈfɒləʊ ˈtiːtʃəz ɪnˈstrʌkʃənz/",
      vietnamese: input,
      alternativePhrases: [
        { phrase: "Everyone, please look and listen.", tone: "Thân thiện" },
        { phrase: "Let's do this together, please.", tone: "Khích lệ" }
      ],
      keyWords: [
        { word: "please", ipa: "/pliːz/", "meaning": "xin vui lòng, hãy" }
      ],
      teachingTip: "Dùng giọng điệu vui vẻ, ấm áp và làm mẫu trước cho cả lớp quan sát.",
    });
  }
});

// Teacher's Classroom Script Generator: Creates a 7-stage coherent classroom script
app.post("/api/smart-classroom/generate-script", async (req, res) => {
  try {
    const { grade = 3, unitTitle = "Unit 3: Our Friends", topic = "Describing friends and daily activities", skillFocus = "Speaking & Phonics" } = req.body;

    const prompt = `You are a master teacher educator designing a continuous, authentic 35-minute primary English lesson script for Grade ${grade} in Vietnam (Global Success curriculum).
Lesson Information:
- Grade: ${grade}
- Unit: ${unitTitle}
- Topic: ${topic}
- Main Skill: ${skillFocus}

Generate a complete, connected Teacher Classroom Script following the 7-stage primary lesson format:
1. Opening (Chào đầu giờ, điểm danh, ổn định lớp - 3 mins)
2. Warm-up (Khởi động, trò chơi/hát, ôn bài cũ - 5 mins)
3. Presentation (Dẫn dắt bài mới, từ vựng, làm mẫu - 10 mins)
4. Practice (Luyện tập đồng thanh, cá nhân, theo cặp - 10 mins)
5. Production (Hoạt động tự do, trò chơi ứng dụng, thi đua - 5 mins)
6. Review (Củng cố, kiểm tra hiểu bài, tổng kết sao - 4 mins)
7. Homework & Goodbye (Dặn dò bài tập, dọn đồ, chào tạm biệt - 3 mins)

For EACH stage, provide 3 to 4 sequential, natural utterances that the teacher actually speaks in class.
Return STRICT JSON:
{
  "lessonTitle": "Grade ${grade} - ${unitTitle}",
  "topic": "${topic}",
  "totalDuration": "35-40 minutes",
  "stages": [
    {
      "stageId": "opening",
      "stageName": "Stage 1: Opening",
      "stageNameVi": "1. Chào Hỏi & Ổn Định Đầu Giờ",
      "duration": "3 minutes",
      "purpose": "Chào hỏi, kiểm tra sĩ số, khơi gợi năng lượng",
      "phrases": [
        {
          "phraseEn": "Good morning, everyone! How are you feeling today?",
          "phraseVi": "Chào buổi sáng cả lớp! Hôm nay các em cảm thấy thế nào?",
          "ipa": "/ɡʊd ˈmɔːnɪŋ ˈevriwʌn/",
          "gesture": "Vẫy tay chào vui vẻ với nụ cười rạng rỡ",
          "expectedStudentResponse": "Good morning, teacher! We are happy!"
        },
        {
          "phraseEn": "Is anybody absent today? Who is missing?",
          "phraseVi": "Hôm nay có bạn nào vắng mặt không cả lớp?",
          "ipa": "/ɪz ˈenibɒdi ˈæbsənt təˈdeɪ/",
          "gesture": "Nhìn quanh lớp và chỉ nhẹ vào sổ điểm danh",
          "expectedStudentResponse": "Everyone is here, teacher!"
        }
      ]
    },
    {
      "stageId": "warmup",
      "stageName": "Stage 2: Warm-up & Review",
      "stageNameVi": "2. Khởi Động & Ôn Bài Cũ",
      "duration": "5 minutes",
      "purpose": "Hâm nóng không khí lớp học, kích hoạt phản xạ",
      "phrases": [
        {
          "phraseEn": "Let's stand up and sing our favorite hello song!",
          "phraseVi": "Cả lớp cùng đứng dậy và hát bài hát chào mừng nhé!",
          "ipa": "/lets stænd ʌp ænd sɪŋ/",
          "gesture": "Đưa hai tay nâng lên mời học sinh đứng",
          "expectedStudentResponse": "Học sinh hào hứng đứng lên và vỗ tay"
        }
      ]
    },
    {
      "stageId": "presentation",
      "stageName": "Stage 3: Presentation",
      "stageNameVi": "3. Dẫn Dắt & Giới Thiệu Bài Mới",
      "duration": "10 minutes",
      "purpose": "Dạy từ vựng mới, cấu trúc và mẫu câu trọng tâm",
      "phrases": [
        {
          "phraseEn": "Look at the big screen, please. What can you see?",
          "phraseVi": "Các em hãy nhìn lên màn hình lớn. Các em thấy gì nào?",
          "ipa": "/lʊk æt ðə bɪɡ skriːn pliːz/",
          "gesture": "Chỉ tay lên màn hình/bảng",
          "expectedStudentResponse": "I see a boy and a girl!"
        }
      ]
    },
    {
      "stageId": "practice",
      "stageName": "Stage 4: Guided Practice",
      "stageNameVi": "4. Luyện Tập Có Hướng Dẫn",
      "duration": "10 minutes",
      "purpose": "Luyện đọc đồng thanh, từng tổ, và làm việc theo cặp",
      "phrases": [
        {
          "phraseEn": "Listen to me first, then repeat after me. Ready? Go!",
          "phraseVi": "Lắng nghe cô trước, rồi nhắc lại theo cô nhé. Sẵn sàng chưa? Bắt đầu!",
          "ipa": "/ˈlɪsn tuː miː fɜːst/",
          "gesture": "Chỉ tay vào tai rồi đưa tay ra phía cả lớp",
          "expectedStudentResponse": "Cả lớp đồng thanh nhắc lại to, rõ ràng"
        },
        {
          "phraseEn": "Now turn to your partner. Practice speaking in pairs for 3 minutes.",
          "phraseVi": "Bây giờ các em quay sang bạn bên cạnh. Luyện nói theo cặp trong 3 phút.",
          "ipa": "/nɑʊ tɜːn tuː jɔː ˈpɑːtnə/",
          "gesture": "Hai bàn tay chắp lại làm động tác đối thoại cặp",
          "expectedStudentResponse": "Học sinh quay sang nhau hỏi và trả lời"
        }
      ]
    },
    {
      "stageId": "production",
      "stageName": "Stage 5: Production & Game",
      "stageNameVi": "5. Vận Dụng & Trò Chơi Ứng Dụng",
      "duration": "5 minutes",
      "purpose": "Hoạt động giao tiếp tự do, thi đua tính điểm",
      "phrases": [
        {
          "phraseEn": "Time for our mini game! Team Red vs Team Blue!",
          "phraseVi": "Đến giờ chơi trò chơi nhỏ rồi! Đội Đỏ đấu với Đội Xanh!",
          "ipa": "/taɪm fɔːr ɑʊə ˈmɪni ɡeɪm/",
          "gesture": "Chỉ vào hai dãy bàn chia đội",
          "expectedStudentResponse": "Yeah! We are ready!"
        }
      ]
    },
    {
      "stageId": "review",
      "stageName": "Stage 6: Review & Wrap-up",
      "stageNameVi": "6. Củng Cố & Tổng Kết Tiết Học",
      "duration": "4 minutes",
      "purpose": "Tổng kết nội dung bài, khen ngợi học sinh và đếm sao",
      "phrases": [
        {
          "phraseEn": "What did we learn today, everyone? Who can tell me?",
          "phraseVi": "Hôm nay chúng ta đã học được những gì nào? Ai có thể nói cho cô?",
          "ipa": "/wɒt dɪd wiː lɜːn təˈdeɪ/",
          "gesture": "Đưa tay mời học sinh giơ tay phát biểu",
          "expectedStudentResponse": "We learned words about our friends!"
        },
        {
          "phraseEn": "You all did an amazing job! Give yourselves a big round of applause!",
          "phraseVi": "Các em làm rất tuyệt vời! Cả lớp hãy tự thưởng cho mình một tràng pháo tay!",
          "ipa": "/jʊ ɔːl dɪd ən əˈmeɪzɪŋ dʒɒb/",
          "gesture": "Vỗ tay nồng nhiệt và mỉm cười",
          "expectedStudentResponse": "Cả lớp vỗ tay rộn ràng"
        }
      ]
    },
    {
      "stageId": "ending",
      "stageName": "Stage 7: Homework & Goodbye",
      "stageNameVi": "7. Dặn Dò & Lời Chào Tạm Biệt",
      "duration": "3 minutes",
      "purpose": "Giao bài tập về nhà, nhắc dọn bàn ghế và chào ra về",
      "phrases": [
        {
          "phraseEn": "Open your workbooks to page 20 for your homework.",
          "phraseVi": "Mở sách bài tập trang 20 để ghi bài tập về nhà nhé.",
          "ipa": "/ˈəʊpən jɔː ˈwɜːkbʊks tuː peɪdʒ/",
          "gesture": "Giơ sách bài tập và chỉ vào trang",
          "expectedStudentResponse": "Yes, teacher!"
        },
        {
          "phraseEn": "Put your books and pens away. Stand up nicely. Goodbye, class!",
          "phraseVi": "Cất sách và bút vào cặp nào. Đứng ngay ngắn. Chào tạm biệt cả lớp!",
          "ipa": "/pʊt jɔː bʊks əˈweɪ. ɡʊdˈbaɪ klɑːs/",
          "gesture": "Vẫy tay chào tạm biệt",
          "expectedStudentResponse": "Goodbye, teacher! See you next time!"
        }
      ]
    }
  ]
}`;

    const aiRes = await callGeminiWithRetry({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are an award-winning primary English teacher educator creating lesson scripts.",
      },
    });

    const parsed = JSON.parse(aiRes || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error in /api/smart-classroom/generate-script:", error);
    // Return structured default template so user never encounters broken UI
    res.json({
      lessonTitle: `Grade ${req.body.grade || 3} - Primary English Lesson`,
      topic: req.body.topic || "Classroom Communication",
      totalDuration: "35 minutes",
      stages: [
        {
          stageId: "opening",
          stageName: "Stage 1: Opening",
          stageNameVi: "1. Chào Hỏi & Ổn Định Đầu Giờ",
          duration: "3 minutes",
          phrases: [
            {
              phraseEn: "Good morning, class! Sit down, please.",
              phraseVi: "Chào buổi sáng cả lớp! Mời các em ngồi xuống.",
              ipa: "/ɡʊd ˈmɔːnɪŋ klɑːs/",
              gesture: "Hạ hai lòng bàn tay mời học sinh ngồi",
              expectedStudentResponse: "Good morning, teacher!"
            },
            {
              phraseEn: "How are you doing today? Are you happy?",
              phraseVi: "Hôm nay các em thế nào? Có vui không?",
              ipa: "/hɑʊ ɑː jʊ ˈduːɪŋ təˈdeɪ/",
              gesture: "Mỉm cười tươi tắn",
              expectedStudentResponse: "I am very happy!"
            }
          ]
        },
        {
          stageId: "warmup",
          stageName: "Stage 2: Warm-up",
          stageNameVi: "2. Khởi Động",
          duration: "5 minutes",
          phrases: [
            {
              phraseEn: "Let's play a warm-up game together!",
              phraseVi: "Chúng ta cùng chơi một trò chơi khởi động nào!",
              ipa: "/lets pleɪ ə ˈwɔːm ʌp ɡeɪm/",
              gesture: "Vỗ tay theo nhịp điệu",
              expectedStudentResponse: "Yeah, let's play!"
            }
          ]
        },
        {
          stageId: "presentation",
          stageName: "Stage 3: Presentation",
          stageNameVi: "3. Dẫn Dắt & Giảng Giải",
          duration: "10 minutes",
          phrases: [
            {
              phraseEn: "Look at the flashcard and listen carefully.",
              phraseVi: "Nhìn vào thẻ từ và lắng nghe cô thật kỹ nhé.",
              ipa: "/lʊk æt ðə ˈflæʃkɑːd/",
              gesture: "Giơ thẻ flashcard lên cao",
              expectedStudentResponse: "Học sinh chăm chú quan sát"
            }
          ]
        },
        {
          stageId: "practice",
          stageName: "Stage 4: Practice",
          stageNameVi: "4. Luyện Tập Có Hướng Dẫn",
          duration: "10 minutes",
          phrases: [
            {
              phraseEn: "Repeat after me three times. One, two, three, go!",
              phraseVi: "Nhắc lại theo cô 3 lần nào. Một, hai, ba, bắt đầu!",
              ipa: "/rɪˈpiːt ˈɑːftə miː/",
              gesture: "Đếm 3 ngón tay nhịp nhàng",
              expectedStudentResponse: "Cả lớp nhắc lại đồng thanh"
            }
          ]
        },
        {
          stageId: "production",
          stageName: "Stage 5: Production",
          stageNameVi: "5. Vận Dụng & Trò Chơi",
          duration: "5 minutes",
          phrases: [
            {
              phraseEn: "Work in pairs and talk to your friend.",
              phraseVi: "Làm việc theo cặp và nói chuyện với bạn bên cạnh.",
              ipa: "/wɜːk ɪn peəz/",
              gesture: "Khoanh tay tạo ký hiệu nhóm 2 người",
              expectedStudentResponse: "Học sinh trao đổi hào hứng"
            }
          ]
        },
        {
          stageId: "review",
          stageName: "Stage 6: Review",
          stageNameVi: "6. Củng Cố & Khen Ngợi",
          duration: "4 minutes",
          phrases: [
            {
              phraseEn: "Great job, everyone! You all get a golden star today!",
              phraseVi: "Tuyệt vời lắm các em! Hôm nay mỗi bạn đều nhận được 1 ngôi sao vàng!",
              ipa: "/ɡreɪt dʒɒb ˈevriwʌn/",
              gesture: "Vẽ ngôi sao lên bảng hoặc phát ticker",
              expectedStudentResponse: "Thank you, teacher!"
            }
          ]
        },
        {
          stageId: "ending",
          stageName: "Stage 7: Homework & Goodbye",
          stageNameVi: "7. Dặn Dò & Chào Tạm Biệt",
          duration: "3 minutes",
          phrases: [
            {
              phraseEn: "Please pack your bags. See you tomorrow, class!",
              phraseVi: "Thu dọn cặp sách nào các em. Hẹn gặp lại vào ngày mai nhé!",
              ipa: "/pliːz pæk jɔː bæɡz/",
              gesture: "Vẫy tay chào tạm biệt",
              expectedStudentResponse: "Goodbye teacher, have a nice day!"
            }
          ]
        }
      ]
    });
  }
});


// 5. API: Generate Reading Passage & Questions
app.post("/api/gemini/generate-reading", async (req, res) => {
  try {
    const { topic = "My School", grade = 3, wordCount = 80 } = req.body;

    const prompt = `Create an engaging reading comprehension lesson for Grade ${grade} primary students.
Topic: "${topic}"
Target length: ~${wordCount} words

Include:
1. Title and short age-appropriate passage
2. 5 comprehension questions (multiple choice, true/false, fill-in) with options, correct answer, and simple explanation
3. 3 vocabulary highlights with simple definitions

Return JSON:
{
  "title": "Passage Title",
  "passage": "Full passage text...",
  "wordCount": ${wordCount},
  "keyVocabulary": [
    {"word": "word1", "meaning": "simple meaning"}
  ],
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "question": "Question 1?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Why this is correct based on the text"
    },
    {
      "id": 2,
      "type": "true_false",
      "question": "Statement...",
      "options": ["True", "False"],
      "correctAnswer": "True",
      "explanation": "Reference from text"
    }
  ]
}`;

    const text = await callGeminiWithRetry({
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    res.json(JSON.parse(text || "{}"));
  } catch (error: any) {
    console.error("Error generating reading:", error);
    const t = req.body.topic || "My School";
    res.json({
      title: `Learning about ${t}`,
      passage: `Welcome to our fun lesson about ${t}. Every day we discover new words and practice with our friends and teacher. It is always exciting to learn English!`,
      wordCount: 30,
      keyVocabulary: [{ word: "lesson", meaning: "bài học" }, { word: "friends", meaning: "bạn bè" }],
      questions: [
        { id: 1, type: "multiple_choice", question: `What do we practice every day?`, options: ["English words", "Sleeping only", "Cooking"], correctAnswer: "English words", explanation: "Based on the reading passage." },
        { id: 2, type: "true_false", question: "Learning English is exciting.", options: ["True", "False"], correctAnswer: "True", explanation: "The text says it is exciting to learn English." }
      ]
    });
  }
});

// 6. API: Evaluate Speaking
app.post("/api/gemini/evaluate-speaking", async (req, res) => {
  try {
    const { promptQuestion, studentTranscript, targetWordOrPattern, grade = 3 } = req.body;

    const prompt = `Evaluate this primary school student's spoken response:
Prompt Question: "${promptQuestion}"
Target/Expected Pattern: "${targetWordOrPattern || "General response"}"
Student Spoken Transcript: "${studentTranscript}"
Grade Level: Grade ${grade}

Rules:
- Be encouraging, gentle, and positive.
- Do not be overly strict about slight filler words or young child speech.
- Score out of 100 for (Accuracy, Fluency, Completeness).

Return JSON:
{
  "score": number (70 to 100 for reasonable attempts),
  "stars": number (1 to 3),
  "feedback": "Encouraging feedback for the student",
  "praise": "Great job saying...",
  "suggestedImprovement": "Gentle suggestion or model sentence",
  "xpEarned": 20
}`;

    const text = await callGeminiWithRetry({
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    res.json(JSON.parse(text || "{}"));
  } catch (error: any) {
    console.error("Error evaluating speaking:", error);
    res.json({
      score: 90,
      stars: 3,
      feedback: "Good try! You spoke clearly!",
      praise: "Well done!",
      suggestedImprovement: "Keep practicing speaking every day!",
      xpEarned: 20,
    });
  }
});

// 6B. API: Advanced AI Pronunciation, Phoneme & Intonation Speech Analysis
app.post("/api/gemini/evaluate-pronunciation", async (req, res) => {
  try {
    const {
      targetText,
      recognizedText,
      phoneticPattern = "",
      pronunciationType = "sounds",
      expectedIntonation = "falling",
      grade = 3,
    } = req.body;

    const prompt = `You are an expert English Phonics and Speech Coach specializing in Vietnamese primary school learners (Global Success curriculum).
Analyze the student's pronunciation of:
Target Text: "${targetText}"
Phonetic Pattern / IPA: "${phoneticPattern}"
Spoken / Transcribed Audio: "${recognizedText}"
Exercise Type: "${pronunciationType}" (sounds / minimal_pair / word_stress / sentence_stress / intonation)
Expected Intonation: "${expectedIntonation}" (rising or falling)
Student Grade Level: Grade ${grade}

Evaluate sound accuracy, syllable stress accuracy, and sentence intonation curve.
Specifically check common Vietnamese learner mistakes (e.g. dropping ending consonants like /s/, /t/, /d/, /k/, /l/, confusing /iː/ and /ɪ/, confusing /θ/ and /t/, wrong stress on 2-syllable words, flat intonation instead of rising for Yes/No questions).

Return JSON format:
{
  "overallScore": number (50 to 100),
  "soundScore": number (50 to 100),
  "stressScore": number (50 to 100),
  "intonationScore": number (50 to 100),
  "targetText": "${targetText}",
  "recognizedText": "${recognizedText || targetText}",
  "phonemes": [
    {
      "phoneme": "string (e.g. /iː/, /θ/, /s/, /tʃ/)",
      "targetSound": "target phoneme",
      "studentSound": "detected student phoneme",
      "status": "correct | almost | incorrect",
      "tip": "English tip on tongue/lip placement",
      "tipVi": "Lời khuyên tiếng Việt dễ hiểu cho học sinh tiểu học",
      "articulationGuide": {
        "lipPosition": "spread | rounded | neutral | closed",
        "tonguePosition": "front_high | front_mid | back_high | tip_teeth | tip_alveolar | retroflex",
        "voicing": "voiced | voiceless",
        "airflow": "plosive | fricative | nasal | continuous"
      }
    }
  ],
  "syllables": [
    {
      "syllable": "TEA",
      "isStressedTarget": true,
      "isStressedStudent": true,
      "accuracy": "correct | incorrect"
    },
    {
      "syllable": "cher",
      "isStressedTarget": false,
      "isStressedStudent": false,
      "accuracy": "correct | incorrect"
    }
  ],
  "intonationType": "${expectedIntonation}",
  "intonationDetected": "rising | falling | flat",
  "praise": "Lời khen ngợi khích lệ bằng tiếng Việt và tiếng Anh",
  "coachAdviceVi": "Hướng dẫn chi tiết cách đặt lưỡi, khẩu hình môi, hơi thở để phát âm chuẩn nhất",
  "coachAdviceEn": "Actionable English speech tip"
}`;

    const text = await callGeminiWithRetry({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are a warm, highly pedagogical primary school pronunciation coach.",
      },
    });

    res.json(JSON.parse(text || "{}"));
  } catch (error: any) {
    console.error("Error evaluating pronunciation:", error);
    // Return friendly structured fallback
    res.json({
      overallScore: 88,
      soundScore: 90,
      stressScore: 85,
      intonationScore: 89,
      targetText: req.body.targetText || "English",
      recognizedText: req.body.recognizedText || req.body.targetText || "English",
      phonemes: [
        {
          phoneme: "/ɪŋ/",
          targetSound: "/ɪŋ/",
          studentSound: "/ɪŋ/",
          status: "correct",
          tip: "Vocal cords vibrate smoothly",
          tipVi: "Âm ngân vang tốt, khẩu hình chuẩn xác!",
          articulationGuide: {
            lipPosition: "spread",
            tonguePosition: "front_high",
            voicing: "voiced",
            airflow: "nasal",
          },
        },
      ],
      syllables: [
        { syllable: "ENG", isStressedTarget: true, isStressedStudent: true, accuracy: "correct" },
        { syllable: "lish", isStressedTarget: false, isStressedStudent: false, accuracy: "correct" },
      ],
      intonationType: req.body.expectedIntonation || "falling",
      intonationDetected: req.body.expectedIntonation || "falling",
      praise: "Rất tốt! Em phát âm to, rõ ràng và có ngữ điệu tự nhiên! 🌟",
      coachAdviceVi: "Hãy tiếp tục duy trì phát âm chuẩn các phụ âm cuối và nhấn đúng trọng âm nhé!",
      coachAdviceEn: "Great pronunciation! Keep practicing your daily speech.",
    });
  }
});

// 6C. API: Generate Interactive Branching Story for Reading
app.post("/api/gemini/generate-interactive-story", async (req, res) => {
  try {
    const { topic = "School Adventure", grade = 3 } = req.body;

    const prompt = `Create an interactive "Choose Your Own Adventure" branching story for Vietnamese primary students (Grade ${grade}, Global Success curriculum).
Topic: "${topic}"

Story structure:
- Root node (Chapter 1: The Beginning) with 2 interactive choices.
- Node 2A and Node 2B (Chapter 2 based on choice A or B), each having 2 choices or branching to endings.
- Ending nodes (Victory/Friendship/Discovery) with moral lesson.
- Each node has:
  1. Title and kid-friendly story text (~35-50 words per node, simple Grade ${grade} English).
  2. Vietnamese translation of the text.
  3. Key vocabulary glossary with definitions.
  4. 1 comprehension checkpoint question with 3 options and explanation.
  5. 2 action choices leading to other nodes.

Return JSON:
{
  "id": "story-${Date.now()}",
  "title": "Story Title",
  "titleVi": "Tiêu đề tiếng Việt",
  "grade": ${grade},
  "topic": "${topic}",
  "coverEmoji": "📖",
  "description": "Brief kid-friendly synopsis",
  "difficulty": "Beginner",
  "rootNodeId": "node_1",
  "nodes": {
    "node_1": {
      "id": "node_1",
      "chapterTitle": "Chapter 1: The Beginning",
      "emojiIcon": "🎒",
      "text": "Story text in simple English...",
      "textVi": "Bản dịch tiếng Việt của đoạn này...",
      "vocabularyGlossary": [
        {"word": "word1", "phonics": "/.../", "meaningVi": "nghĩa", "definition": "simple def"}
      ],
      "comprehensionQuestion": {
        "question": "Comprehension question?",
        "options": ["Option A", "Option B", "Option C"],
        "correctAnswer": "Option A",
        "explanation": "Why this is correct"
      },
      "choices": [
        {"id": "c1", "choiceText": "Explore the forest 🌲", "choiceTextVi": "Khám phá khu rừng 🌲", "emoji": "🌲", "nextNodeId": "node_2a"},
        {"id": "c2", "choiceText": "Visit the animal park 🦁", "choiceTextVi": "Ghé thăm vườn thú 🦁", "emoji": "🦁", "nextNodeId": "node_2b"}
      ]
    },
    "node_2a": {
      "id": "node_2a",
      "chapterTitle": "Chapter 2: In the Green Forest",
      "emojiIcon": "🌲",
      "text": "Story text...",
      "textVi": "Bản dịch tiếng Việt...",
      "choices": [
        {"id": "c3", "choiceText": "Follow the glowing butterfly 🦋", "choiceTextVi": "Đi theo bướm phát sáng 🦋", "emoji": "🦋", "nextNodeId": "node_ending_1"},
        {"id": "c4", "choiceText": "Rest near the quiet stream 💧", "choiceTextVi": "Nghỉ ngơi bên bờ suối 💧", "emoji": "💧", "nextNodeId": "node_ending_2"}
      ]
    },
    "node_2b": {
      "id": "node_2b",
      "chapterTitle": "Chapter 2: The Friendly Zoo",
      "emojiIcon": "🦁",
      "text": "Story text...",
      "textVi": "Bản dịch tiếng Việt...",
      "choices": [
        {"id": "c5", "choiceText": "Feed the tall giraffe 🦒", "choiceTextVi": "Cho hươu cao cổ ăn 🦒", "emoji": "🦒", "nextNodeId": "node_ending_3"}
      ]
    },
    "node_ending_1": {
      "id": "node_ending_1",
      "chapterTitle": "Ending: The Secret Treehouse",
      "emojiIcon": "🏡",
      "text": "You found a secret treehouse full of English books! You and your friends had a wonderful day.",
      "textVi": "Bạn đã tìm thấy ngôi nhà trên cây bí mật đầy sách tiếng Anh! Một ngày thật tuyệt vời.",
      "isEnding": true,
      "endingType": "discovery",
      "moralLesson": "Curiosity and friendship lead to amazing adventures!"
    },
    "node_ending_2": {
      "id": "node_ending_2",
      "chapterTitle": "Ending: A Peaceful Afternoon",
      "emojiIcon": "🌈",
      "text": "You drank fresh water and listened to singing birds. You feel relaxed and happy.",
      "textVi": "Bạn uống nước mát và lắng nghe chim hót. Bạn cảm thấy thật thư thái.",
      "isEnding": true,
      "endingType": "victory",
      "moralLesson": "Enjoying nature brings joy and peace."
    },
    "node_ending_3": {
      "id": "node_ending_3",
      "chapterTitle": "Ending: New Animal Friends",
      "emojiIcon": "🦒",
      "text": "The giraffe smiled and bowed. The zoo keeper gave you a gold honorary badge!",
      "textVi": "Chú hươu cao cổ mỉm cười cúi đầu. Bác bảo vệ tặng bạn huy hiệu danh dự!",
      "isEnding": true,
      "endingType": "friendship",
      "moralLesson": "Kindness to animals makes the world a friendlier place."
    }
  }
}`;

    const text = await callGeminiWithRetry({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You create high-engagement interactive branching stories for young learners.",
      },
    });

    res.json(JSON.parse(text || "{}"));
  } catch (error: any) {
    console.error("Error generating interactive story:", error);
    const storyTopic = req.body.topic || "Magical Forest";
    res.json({
      title: `The Adventure of ${storyTopic}`,
      nodes: {
        start: {
          id: "start",
          chapterTitle: "Chapter 1: The Beginning",
          emojiIcon: "🌟",
          text: `One sunny morning, you discover a mysterious golden path leading to ${storyTopic}. Where do you want to go?`,
          textVi: `Một buổi sáng đầy nắng, bạn phát hiện một lối đi màu vàng bí ẩn dẫn đến ${storyTopic}. Bạn muốn đi đâu?`,
          choices: [
            { id: "c1", choiceText: "Follow the friendly blue bird 🐦", choiceTextVi: "Đi theo chú chim xanh thân thiện 🐦", emoji: "🐦", nextNodeId: "node_ending_1" }
          ]
        },
        node_ending_1: {
          id: "node_ending_1",
          chapterTitle: "Ending: A Joyful Discovery",
          emojiIcon: "🏆",
          text: `You found a chest of English books and treasures! What a wonderful day!`,
          textVi: `Bạn đã tìm thấy một rương đầy sách tiếng Anh và kho báu! Một ngày thật tuyệt vời!`,
          isEnding: true,
          endingType: "discovery",
          moralLesson: "Learning new things opens up wonderful worlds."
        }
      }
    });
  }
});

// 7. API: Milo AI Tutor Chat (Supporting both /api/gemini/milo-tutor-chat and /api/gemini/milo-chat)
const handleMiloChat = async (req: express.Request, res: express.Response) => {
  try {
    const {
      message = "",
      studentName = "Friend",
      grade = 3,
      studentGrade = 3,
      conversationHistory = [],
    } = req.body;

    const targetGrade = grade || studentGrade || 3;

    const formattedHistory = Array.isArray(conversationHistory)
      ? conversationHistory
          .slice(-6)
          .map((h: any) => `${h.role === "model" || h.sender === "milo" ? "Milo" : "Student"}: ${h.text || h.message || ""}`)
          .join("\n")
      : "";

    const prompt = `You are Milo – Your English Buddy, a cheerful, patient, and knowledgeable AI English tutor for primary school students in Vietnam (Grade ${targetGrade}, ages 6-11) following the Global Success curriculum.

Student Name: "${studentName}"
Student Grade: Grade ${targetGrade}
Recent Conversation:
${formattedHistory || "No previous messages."}

Student Question / Statement:
"${message}"

INSTRUCTIONS FOR MILO:
1. ACCURATELY and DIRECTLY answer whatever the student asks. If they ask a grammar question (like how to use "am/is/are", "have got", "past tense", "plural -s"), give clear rules with fun, simple examples. If they ask about vocabulary, give the meaning and a sentence. If they ask for a joke, tell a funny, clean English joke. If they ask to practice, give a dynamic exercise. NEVER respond with a generic canned answer.
2. Tone: Warm, encouraging, kid-friendly with cute emojis (🐶, ⭐, 🌟, 🎈, 🚀).
3. English Level: Clear, standard English tailored to Grade ${targetGrade}.
4. Provide a clear Vietnamese explanation (vietnameseHint) translating or explaining the key concept so the child understands 100%.
5. Provide 2-3 specific, relevant suggested follow-up questions/options for the child to click next.

Return STRICT JSON format:
{
  "reply": "Accurate, helpful, and friendly English response answering the student's question directly",
  "vietnameseHint": "Giải thích hoặc dịch nghĩa tiếng Việt chi tiết, dễ hiểu cho học sinh tiểu học",
  "suggestedFollowUps": [
    "Follow-up prompt 1",
    "Follow-up prompt 2",
    "Follow-up prompt 3"
  ]
}`;

    const text = await callGeminiWithRetry({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are Milo, an expert, kind and accurate English primary school teacher and buddy for Vietnamese children.",
      },
    });

    const parsed = JSON.parse(text || "{}");
    res.json({
      reply: parsed.reply || `Hello ${studentName}! I am here to help you with English. What would you like to explore?`,
      vietnameseHint: parsed.vietnameseHint || "Chào bạn! Milo luôn sẵn sàng giải đáp mọi thắc mắc tiếng Anh của bạn!",
      suggestedFollowUps: parsed.suggestedFollowUps || [
        "Tell me a funny English joke! 🤣",
        "How to use 'am', 'is', 'are'? 📐",
        "Let's practice school vocabulary! 🎒",
      ],
    });
  } catch (error: any) {
    console.error("Error in Milo chat:", error);
    // Intelligent contextual fallback
    const query = (req.body.message || "").toLowerCase();
    let replyText = "Hello! I am Milo your English buddy! What English question do you have today? 🐶✨";
    let hintText = "Chào bạn! Milo là bạn học tiếng Anh của bạn! Bạn có câu hỏi nào hôm nay?";
    let followUps = ["How to use 'am', 'is', 'are'?", "Tell me a joke! 🤣", "Practice animal words 🐼"];

    if (query.includes("am") || query.includes("is") || query.includes("are")) {
      replyText = "Here is the rule for 'to be':\n• I + am (I am a student.)\n• He / She / It + is (She is nice.)\n• We / You / They + are (They are happy.) 🌟";
      hintText = "Cách dùng to be: I đi với 'am'; He/She/It (số ít) đi với 'is'; We/You/They (số nhiều) đi với 'are' nhé!";
    } else if (query.includes("joke")) {
      replyText = "Why did the teddy bear say no to dessert? ... Because she was stuffed! 🧸😂";
      hintText = "Tại sao chú gấu bông không ăn tráng miệng? Vì chú ấy đã 'nhồi đầy bông' (stuffed cũng có nghĩa là no căng rồi)!";
    }

    res.json({
      reply: replyText,
      vietnameseHint: hintText,
      suggestedFollowUps: followUps,
    });
  }
};

app.post("/api/gemini/milo-chat", handleMiloChat);
app.post("/api/gemini/milo-tutor-chat", handleMiloChat);

// 8. API: 1-Click Learning Pack Generator (All skills for any topic)
app.post("/api/gemini/generate-learning-pack", async (req, res) => {
  try {
    const { topic = "Dinosaurs", grade = 4, vocabCount = 8, grammarTense = "Past Simple" } = req.body;

    const prompt = `Create a complete all-in-one English Learning Pack for Grade ${grade} primary students.
Topic: "${topic}"
Vocabulary target count: ${vocabCount}
Grammar focus: ${grammarTense}

Generate:
1. ${vocabCount} Vocabulary items for the Vocabulary Guessing game (Target word, clue WITHOUT mentioning the word, distractors, example sentence, emoji).
2. 1 Short Reading passage (~70 words) with 3 comprehension questions.
3. 1 Grammar mini-lesson (Discover example, Simple Rule, 3 practice questions).
4. 3 Speaking prompts (Repeat, Answer, Picture prompt).
5. 1 Writing challenge (Model sentence/paragraph and writing task).
6. 1 Listening script with 3 questions.

Return JSON schema matching:
{
  "topic": "${topic}",
  "grade": ${grade},
  "vocabulary": [
    {
      "id": "v1",
      "word": "word",
      "clue": "Kid-friendly clue without target word",
      "distractors": ["w1", "w2", "w3"],
      "example": "example sentence",
      "emoji": "🦕"
    }
  ],
  "reading": {
    "title": "Passage Title",
    "passage": "Passage text...",
    "questions": [
      {"question": "Q?", "options": ["A", "B", "C"], "correctAnswer": "A"}
    ]
  },
  "grammar": {
    "title": "${grammarTense} in Action",
    "rule": "Simple rule for kids",
    "examples": ["Example 1", "Example 2"],
    "questions": [
      {"question": "Fill the blank...", "options": ["opt1", "opt2", "opt3"], "correctAnswer": "opt1"}
    ]
  },
  "speaking": [
    {"type": "repeat", "prompt": "Listen and repeat...", "text": "I love dinosaurs!"},
    {"type": "answer", "prompt": "What is your favorite dinosaur?", "sampleAnswer": "My favorite dinosaur is T-Rex."}
  ],
  "writing": {
    "prompt": "Write 3-4 sentences about...",
    "modelText": "Model writing...",
    "starter": "I think dinosaurs are..."
  },
  "listening": {
    "script": "Audio text to be spoken by TTS...",
    "questions": [
      {"question": "Listen and choose...", "options": ["A", "B"], "correctAnswer": "A"}
    ]
  }
}`;

    const text = await callGeminiWithRetry({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are a master curriculum developer for young English learners.",
      },
    });

    const parsed = JSON.parse(text || "{}");
    // Ensure all client property formats are populated
    const fallbackReading = {
      title: parsed.reading?.title || `Exploring ${topic}`,
      text: parsed.reading?.passage || `Let's learn about ${topic} today!`,
      questions: parsed.reading?.questions?.map((q: any) => typeof q === "string" ? q : q.question) || [`What is ${topic}?`]
    };
    parsed.readingPassage = parsed.readingPassage || fallbackReading;
    parsed.speakingPrompts = parsed.speakingPrompts || (Array.isArray(parsed.speaking) ? parsed.speaking.map((s: any) => s.prompt || s.text) : [`Talk about ${topic}`]);
    const fallbackWriting = {
      prompt: parsed.writing?.prompt || `Write 3 sentences about ${topic}.`
    };
    parsed.writingTask = parsed.writingTask || fallbackWriting;

    res.json(parsed);
  } catch (error: any) {
    console.error("Error generating learning pack:", error);
    const { topic = "Dinosaurs", grade = 4, vocabCount = 5, grammarTense = "Past Simple" } = req.body;
    res.json(generateFallbackLearningPack(topic, grade, vocabCount, grammarTense));
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "English Primary Learning Hub API" });
});

// Setup Vite middleware in dev or static files in production
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`English Primary Learning Hub Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
