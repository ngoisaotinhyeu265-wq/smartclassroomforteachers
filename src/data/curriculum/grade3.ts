import { GlobalSuccessUnit } from "../../types";

export const GRADE_3_UNITS: GlobalSuccessUnit[] = [
  {
    grade: 3, unitNumber: 1, unitTitle: "Hello", unitTitleVi: "Xin chào", theme: "Greetings & Friends", icon: "👋", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Greetings & Self-Introduction", focus: "vocabulary_phonics", phonicsSound: "Sounds /h/ (hello) & /b/ (bye)",
        vocabulary: [
          { id: "g3-u1-hello", word: "hello", clue: "A polite greeting when meeting someone.", vietnameseMeaning: "xin chào", phonics: "/heˈləʊ/", emoji: "👋", grade: 3, unit: 1, topic: "Greetings", exampleSentence: "Hello, I'm Ben.", distractors: ["bye", "thanks", "fine"] },
          { id: "g3-u1-hi", word: "hi", clue: "An informal greeting to friends.", vietnameseMeaning: "chào bạn", phonics: "/haɪ/", emoji: "✋", grade: 3, unit: 1, topic: "Greetings", exampleSentence: "Hi, Mai! Nice to meet you.", distractors: ["bye", "how", "what"] },
          { id: "g3-u1-goodbye", word: "goodbye", clue: "Said when parting from someone.", vietnameseMeaning: "tạm biệt", phonics: "/ˌɡʊdˈbaɪ/", emoji: "👋", grade: 3, unit: 1, topic: "Greetings", exampleSentence: "Goodbye, see you tomorrow.", distractors: ["hello", "fine", "nice"] },
          { id: "g3-u1-fine", word: "fine", clue: "In good health or condition.", vietnameseMeaning: "khỏe / tốt", phonics: "/faɪn/", emoji: "😊", grade: 3, unit: 1, topic: "Feelings", exampleSentence: "I'm fine, thank you.", distractors: ["bad", "tired", "sad"] },
        ],
        sentenceStructures: [{ pattern: "Hello, I'm [Name]. / How are you? ➔ I'm fine, thank you.", vietnameseMeaning: "Xin chào, mình là [Tên]. / Bạn có khỏe không? ➔ Mình khỏe, cảm ơn bạn.", sampleDialogue: [{ speaker: "Ben", text: "Hello, I'm Ben. How are you?", textVi: "Xin chào, mình là Ben. Bạn có khỏe không?" }, { speaker: "Mai", text: "Hi, Ben. I'm fine, thank you. And you?", textVi: "Chào Ben. Mình khỏe, cảm ơn bạn. Còn bạn?" }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Meeting New Friends", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Nice to meet you. ➔ Nice to meet you, too.", vietnameseMeaning: "Rất vui được gặp bạn. ➔ Mình cũng rất vui được gặp bạn.", sampleDialogue: [{ speaker: "Nam", text: "Nice to meet you, Lucy!", textVi: "Rất vui được gặp bạn, Lucy!" }, { speaker: "Lucy", text: "Nice to meet you, too, Nam!", textVi: "Mình cũng rất vui được gặp bạn, Nam!" }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: New School Year Story", focus: "reading_communication", readingMiniStory: { title: "First Day at School", text: "On the first day of Grade 3, Mai meets Ben and Lucy. They wave happily, introduce themselves, and say 'Nice to meet you!' with bright smiles.", translationVi: "Vào ngày đầu tiên của lớp 3, Mai gặp Ben và Lucy. Các bạn vui vẻ vẫy tay, giới thiệu bản thân và nói 'Rất vui được gặp bạn!' với nụ cười rạng rỡ." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 2, unitTitle: "Our Names", unitTitleVi: "Tên của chúng mình", theme: "Names & Spelling", icon: "🏷️", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Asking Names & Phonics", focus: "vocabulary_phonics", phonicsSound: "Sounds /m/ (Mary) & /p/ (Peter)",
        vocabulary: [
          { id: "g3-u2-name", word: "name", clue: "A word by which a person is addressed.", vietnameseMeaning: "tên gọi", phonics: "/neɪm/", emoji: "🏷️", grade: 3, unit: 2, topic: "Identity", exampleSentence: "My name is Linh.", distractors: ["spell", "friend", "class"] },
          { id: "g3-u2-spell", word: "spell", clue: "To name the letters of a word.", vietnameseMeaning: "đánh vần", phonics: "/spel/", emoji: "🔤", grade: 3, unit: 2, topic: "Language", exampleSentence: "How do you spell your name?", distractors: ["read", "write", "say"] },
          { id: "g3-u2-friend", word: "friend", clue: "A person you like and trust.", vietnameseMeaning: "người bạn", phonics: "/frend/", emoji: "👫", grade: 3, unit: 2, topic: "People", exampleSentence: "This is my friend, Mary.", distractors: ["teacher", "family", "name"] },
          { id: "g3-u2-classmate", word: "classmate", clue: "Someone in your school class.", vietnameseMeaning: "bạn cùng lớp", phonics: "/ˈklɑːs.meɪt/", emoji: "🧑‍🤝‍🧑", grade: 3, unit: 2, topic: "School", exampleSentence: "Peter is my classmate.", distractors: ["teacher", "parent", "sister"] },
        ],
        sentenceStructures: [{ pattern: "What's your name? ➔ My name is [Name]. / How do you spell your name? ➔ [L-E-T-T-E-R-S].", vietnameseMeaning: "Tên bạn là gì? ➔ Tên mình là [Tên]. / Bạn đánh vần tên như thế nào? ➔ [C-Á-C C-H-Ữ C-Á-I].", sampleDialogue: [{ speaker: "Teacher", text: "What's your name?", textVi: "Tên em là gì?" }, { speaker: "Mary", text: "My name is Mary. M-A-R-Y.", textVi: "Tên em là Mary. M-A-R-Y ạ." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Spelling Practice", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "How do you spell [Word]?", vietnameseMeaning: "Bạn đánh vần [Từ] như thế nào?", sampleDialogue: [{ speaker: "Nam", text: "How do you spell 'Linh'?", textVi: "Bạn đánh vần chữ 'Linh' thế nào?" }, { speaker: "Linh", text: "L-I-N-H.", textVi: "L-I-N-H." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Name Badge Story", focus: "reading_communication", readingMiniStory: { title: "Making Name Badges", text: "In English class, we make colorful name badges. We write our names and spell them clearly for our new foreign teacher.", translationVi: "Trong giờ tiếng Anh, chúng mình làm bảng tên sắc màu. Chúng mình viết tên và đánh vần rõ ràng cho giáo viên nước ngoài mới nghe." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 3, unitTitle: "Our Friends", unitTitleVi: "Bạn bè của chúng mình", theme: "Friends & Introductions", icon: "🤝", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Introducing Friends", focus: "vocabulary_phonics", phonicsSound: "Sounds /ð/ (this, that) & /tʃ/ (teacher)",
        vocabulary: [
          { id: "g3-u3-this", word: "this", clue: "Referring to a person or thing nearby.", vietnameseMeaning: "đây / người này", phonics: "/ðɪs/", emoji: "👉", grade: 3, unit: 3, topic: "Grammar", exampleSentence: "This is my friend, Bill.", distractors: ["that", "they", "we"] },
          { id: "g3-u3-that", word: "that", clue: "Referring to a person or thing farther away.", vietnameseMeaning: "kia / người kia", phonics: "/ðæt/", emoji: "👉", grade: 3, unit: 3, topic: "Grammar", exampleSentence: "That is Mai over there.", distractors: ["this", "these", "those"] },
          { id: "g3-u3-yes", word: "yes", clue: "Affirmative response.", vietnameseMeaning: "vâng / đúng vậy", phonics: "/jes/", emoji: "✅", grade: 3, unit: 3, topic: "Communication", exampleSentence: "Yes, it is.", distractors: ["no", "not", "never"] },
          { id: "g3-u3-no", word: "no", clue: "Negative response.", vietnameseMeaning: "không phải", phonics: "/nəʊ/", emoji: "❌", grade: 3, unit: 3, topic: "Communication", exampleSentence: "No, it isn't.", distractors: ["yes", "ok", "fine"] },
        ],
        sentenceStructures: [{ pattern: "This is [Name]. / Is that [Name]? ➔ Yes, it is. / No, it isn't.", vietnameseMeaning: "Đây là [Tên]. / Kia có phải là [Tên] không? ➔ Đúng vậy. / Không phải.", sampleDialogue: [{ speaker: "Mai", text: "This is my friend, Mary.", textVi: "Đây là bạn mình, Mary." }, { speaker: "Nam", text: "Is that Peter over there?", textVi: "Kia có phải Peter đằng kia không?" }, { speaker: "Mai", text: "Yes, it is.", textVi: "Đúng vậy đó." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Asking About People", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Who is that? ➔ That is [Name].", vietnameseMeaning: "Kia là ai thế? ➔ Đó là [Tên].", sampleDialogue: [{ speaker: "Tony", text: "Who is that boy?", textVi: "Cậu bé kia là ai thế?" }, { speaker: "Nam", text: "That is my friend, Quan.", textVi: "Đó là bạn Quân của mình." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Best Friends Story", focus: "reading_communication", readingMiniStory: { title: "Good Friends in Class 3A", text: "Look at our cheerful classroom. This is Mary and that is Peter. We share books, play football, and study English happily together.", translationVi: "Hãy nhìn lớp học vui tươi của chúng mình. Đây là Mary và kia là Peter. Chúng mình chia sẻ sách, đá bóng và cùng nhau học tiếng Anh vui vẻ." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 4, unitTitle: "Our Bodies", unitTitleVi: "Cơ thể của chúng mình", theme: "Body Parts & Health", icon: "👀", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Parts of the Face & Body", focus: "vocabulary_phonics", phonicsSound: "Sounds /t/ (touch) & /əʊ/ (nose)",
        vocabulary: [
          { id: "g3-u4-eye", word: "eye", clue: "Organ of vision.", vietnameseMeaning: "mắt", phonics: "/aɪ/", emoji: "👁️", grade: 3, unit: 4, topic: "Body", exampleSentence: "Open your eyes.", distractors: ["ear", "nose", "mouth"] },
          { id: "g3-u4-ear", word: "ear", clue: "Organ of hearing.", vietnameseMeaning: "tai", phonics: "/ɪər/", emoji: "👂", grade: 3, unit: 4, topic: "Body", exampleSentence: "Touch your ears.", distractors: ["eye", "nose", "hand"] },
          { id: "g3-u4-nose", word: "nose", clue: "Facial feature for smelling.", vietnameseMeaning: "mũi", phonics: "/nəʊz/", emoji: "👃", grade: 3, unit: 4, topic: "Body", exampleSentence: "This is my nose.", distractors: ["mouth", "eye", "ear"] },
          { id: "g3-u4-mouth", word: "mouth", clue: "Opening for speaking and eating.", vietnameseMeaning: "miệng", phonics: "/maʊθ/", emoji: "👄", grade: 3, unit: 4, topic: "Body", exampleSentence: "Open your mouth.", distractors: ["nose", "face", "hand"] },
          { id: "g3-u4-hand", word: "hand", clue: "Body part at end of arm with five fingers.", vietnameseMeaning: "bàn tay", phonics: "/hænd/", emoji: "✋", grade: 3, unit: 4, topic: "Body", exampleSentence: "Clap your hands.", distractors: ["foot", "leg", "arm"] },
        ],
        sentenceStructures: [{ pattern: "Touch your [Body part]! / Open your [Body part]!", vietnameseMeaning: "Hãy chạm vào [Bộ phận cơ thể]! / Hãy mở [Bộ phận cơ thể]!", sampleDialogue: [{ speaker: "Simon", text: "Touch your ears!", textVi: "Hãy chạm vào tai bạn!" }, { speaker: "Students", text: "We are touching our ears!", textVi: "Chúng em đang chạm vào tai ạ!" }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Simon Says Game", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "What is this? ➔ It's my [Body part].", vietnameseMeaning: "Đây là cái gì? ➔ Đây là [Bộ phận cơ thể] của mình.", sampleDialogue: [{ speaker: "Teacher", text: "What is this?", textVi: "Đây là gì nào?" }, { speaker: "Mai", text: "It's my nose.", textVi: "Đây là mũi của em ạ." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Healthy Body Story", focus: "reading_communication", readingMiniStory: { title: "Morning Exercise", text: "Every morning, we do exercise. We touch our toes, clap our hands, and stretch our arms. We keep our bodies strong and healthy!", translationVi: "Mỗi buổi sáng, chúng mình tập thể dục. Chúng mình chạm ngón chân, vỗ tay và vươn vai. Chúng mình giữ cơ thể luôn khỏe mạnh!" }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 5, unitTitle: "My Hobbies", unitTitleVi: "Sở thích của mình", theme: "Hobbies & Pastimes", icon: "🎨", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Action Hobbies", focus: "vocabulary_phonics", phonicsSound: "Sounds /s/ (singing) & /sw/ (swimming)",
        vocabulary: [
          { id: "g3-u5-singing", word: "singing", clue: "Making musical sounds with voice.", vietnameseMeaning: "ca hát", phonics: "/ˈsɪŋ.ɪŋ/", emoji: "🎤", grade: 3, unit: 5, topic: "Hobbies", exampleSentence: "I like singing English songs.", distractors: ["dancing", "drawing", "reading"] },
          { id: "g3-u5-dancing", word: "dancing", clue: "Moving body rhythmically to music.", vietnameseMeaning: "nhảy múa", phonics: "/ˈdɑːn.sɪŋ/", emoji: "💃", grade: 3, unit: 5, topic: "Hobbies", exampleSentence: "She likes dancing.", distractors: ["singing", "swimming", "running"] },
          { id: "g3-u5-drawing", word: "drawing", clue: "Making pictures with pencils or crayons.", vietnameseMeaning: "vẽ tranh", phonics: "/ˈdrɔː.ɪŋ/", emoji: "🎨", grade: 3, unit: 5, topic: "Hobbies", exampleSentence: "My hobby is drawing animals.", distractors: ["reading", "cooking", "dancing"] },
          { id: "g3-u5-swimming", word: "swimming", clue: "Moving through water for sport.", vietnameseMeaning: "bơi lội", phonics: "/ˈswɪm.ɪŋ/", emoji: "🏊", grade: 3, unit: 5, topic: "Hobbies", exampleSentence: "We love swimming in summer.", distractors: ["running", "singing", "dancing"] },
        ],
        sentenceStructures: [{ pattern: "What's your hobby? ➔ I like [V-ing].", vietnameseMeaning: "Sở thích của bạn là gì? ➔ Mình thích [Làm việc gì đó].", sampleDialogue: [{ speaker: "Tony", text: "What's your hobby, Mai?", textVi: "Sở thích của bạn là gì thế Mai?" }, { speaker: "Mai", text: "I like singing and drawing.", textVi: "Mình thích ca hát và vẽ tranh." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Talking About Hobbies", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Do you like [V-ing]? ➔ Yes, I do. / No, I don't.", vietnameseMeaning: "Bạn có thích [Làm gì] không? ➔ Có, mình thích. / Không, mình không thích.", sampleDialogue: [{ speaker: "Peter", text: "Do you like swimming?", textVi: "Bạn có thích bơi không?" }, { speaker: "Nam", text: "Yes, I do. It's so refreshing!", textVi: "Có chứ. Rất sảng khoái!" }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Hobby Club Story", focus: "reading_communication", readingMiniStory: { title: "Our School Hobby Club", text: "Our school has wonderful hobby clubs. Mai sings like a bird, Nam swims fast in the pool, and Quan paints colorful pictures.", translationVi: "Trường chúng mình có những câu lạc bộ sở thích tuyệt vời. Mai hát hay như chim, Nam bơi nhanh trong hồ và Quân vẽ những bức tranh đầy màu sắc." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 6, unitTitle: "Our School", unitTitleVi: "Trường học của chúng mình", theme: "School Facilities", icon: "🏫", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: School Rooms", focus: "vocabulary_phonics", phonicsSound: "Sounds /sk/ (school) & /kl/ (classroom)",
        vocabulary: [
          { id: "g3-u6-school", word: "school", clue: "Place where children receive education.", vietnameseMeaning: "trường học", phonics: "/skuːl/", emoji: "🏫", grade: 3, unit: 6, topic: "School", exampleSentence: "Our school is big and new.", distractors: ["home", "park", "shop"] },
          { id: "g3-u6-classroom", word: "classroom", clue: "A room where lessons take place.", vietnameseMeaning: "phòng học", phonics: "/ˈklɑːs.ruːm/", emoji: "🏫", grade: 3, unit: 6, topic: "School", exampleSentence: "Our classroom is bright.", distractors: ["library", "gym", "garden"] },
          { id: "g3-u6-library", word: "library", clue: "Room containing books for reading.", vietnameseMeaning: "thư viện", phonics: "/ˈlaɪ.brər.i/", emoji: "📚", grade: 3, unit: 6, topic: "School", exampleSentence: "We read books in the library.", distractors: ["gym", "playground", "canteen"] },
          { id: "g3-u6-playground", word: "playground", clue: "Outdoor recreation area at school.", vietnameseMeaning: "sân trường/sân chơi", phonics: "/ˈpleɪ.ɡraʊnd/", emoji: "🛝", grade: 3, unit: 6, topic: "School", exampleSentence: "Play football in the playground.", distractors: ["classroom", "library", "gym"] },
        ],
        sentenceStructures: [{ pattern: "Is this/that our [Facility]? ➔ Yes, it is. / No, it isn't.", vietnameseMeaning: "Đây/kia có phải là [Phòng/Khu vực] của trường mình không? ➔ Đúng vậy. / Không phải.", sampleDialogue: [{ speaker: "Visitor", text: "Is that your school library?", textVi: "Kia có phải là thư viện trường bạn không?" }, { speaker: "Linh", text: "Yes, it is. It has many storybooks.", textVi: "Đúng vậy. Ở đó có rất nhiều sách truyện." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: School Tour", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Let's go to the [Facility]!", vietnameseMeaning: "Cùng đến [Khu vực] nào!", sampleDialogue: [{ speaker: "Nam", text: "Let's go to the computer room!", textVi: "Cùng đến phòng tin học nào!" }, { speaker: "Peter", text: "Great! Let's practice English!", textVi: "Tuyệt! Cùng luyện tiếng Anh nhé!" }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: School Pride Story", focus: "reading_communication", readingMiniStory: { title: "Welcome to Our School", text: "Welcome to Thang Long Primary School! Our school is big and clean. We have modern classrooms, a spacious library, and a lively green playground.", translationVi: "Chào mừng bạn đến với Trường Tiểu học Thăng Long! Trường chúng mình to đẹp và sạch sẽ. Chúng mình có phòng học hiện đại, thư viện rộng rãi và sân chơi xanh tươi rộn ràng." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 7, unitTitle: "Classroom Instructions", unitTitleVi: "Hiệu lệnh trong lớp học", theme: "Classroom Rules & Commands", icon: "📋", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Common Commands", focus: "vocabulary_phonics", phonicsSound: "Sounds /st/ (stand) & /sɪ/ (sit)",
        vocabulary: [
          { id: "g3-u7-stand-up", word: "stand up", clue: "Rise from sitting to feet.", vietnameseMeaning: "đứng lên", phonics: "/ˌstænd ˈʌp/", emoji: "🧍", grade: 3, unit: 7, topic: "Commands", exampleSentence: "Stand up, please.", distractors: ["sit down", "open", "close"] },
          { id: "g3-u7-sit-down", word: "sit down", clue: "Take a seat on a chair.", vietnameseMeaning: "ngồi xuống", phonics: "/ˌsɪt ˈdaʊn/", emoji: "🪑", grade: 3, unit: 7, topic: "Commands", exampleSentence: "Sit down, please.", distractors: ["stand up", "come in", "go out"] },
          { id: "g3-u7-open-book", word: "open your book", clue: "Unfold textbook pages to read.", vietnameseMeaning: "mở sách ra", phonics: "/ˈəʊ.pən jɔːr bʊk/", emoji: "📖", grade: 3, unit: 7, topic: "Commands", exampleSentence: "Open your books to page 10.", distractors: ["close your book", "stand up", "speak"] },
          { id: "g3-u7-ask-question", word: "ask a question", clue: "Raise hand to inquire something.", vietnameseMeaning: "đặt câu hỏi", phonics: "/ɑːsk ə ˈkwes.tʃən/", emoji: "🙋", grade: 3, unit: 7, topic: "Commands", exampleSentence: "May I ask a question?", distractors: ["sit down", "open book", "close book"] },
        ],
        sentenceStructures: [{ pattern: "May I [Action], please? ➔ Yes, you may. / No, you can't.", vietnameseMeaning: "Em xin phép [Làm việc gì] được không ạ? ➔ Được, em được phép. / Không được.", sampleDialogue: [{ speaker: "Mai", text: "May I come in, please, Teacher?", textVi: "Thưa cô, em xin phép vào lớp ạ?" }, { speaker: "Teacher", text: "Yes, you may. Sit down, please.", textVi: "Được, em vào đi. Mời em ngồi xuống." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Polite Permissions", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "May I go out, please? ➔ Yes, you may.", vietnameseMeaning: "Thưa cô/thầy, em xin phép ra ngoài ạ? ➔ Được, em ra đi.", sampleDialogue: [{ speaker: "Nam", text: "May I go out, please?", textVi: "Em xin phép ra ngoài ạ?" }, { speaker: "Teacher", text: "Yes, you may. Be quick!", textVi: "Được, em đi nhanh nhé!" }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Polite Students Story", focus: "reading_communication", readingMiniStory: { title: "Polite Class 3B", text: "Our teacher enters the room. We stand up politely and greet her. When we want to ask, we raise our hands and ask 'May I ask a question, please?'", translationVi: "Cô giáo bước vào phòng. Chúng mình đứng lên lễ phép chào cô. Khi muốn hỏi, chúng mình giơ tay và nói 'Thưa cô, em xin phép hỏi một câu ạ?'" }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 8, unitTitle: "My School Things", unitTitleVi: "Đồ dùng học tập của mình", theme: "School Stationery", icon: "🎒", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: School Supplies", focus: "vocabulary_phonics", phonicsSound: "Sounds /p/ (pen) & /r/ (ruler)",
        vocabulary: [
          { id: "g3-u8-pen", word: "pen", clue: "Writing tool using ink.", vietnameseMeaning: "bút mực", phonics: "/pen/", emoji: "🖊️", grade: 3, unit: 8, topic: "School Things", exampleSentence: "I have a blue pen.", distractors: ["pencil", "ruler", "eraser"] },
          { id: "g3-u8-pencil", word: "pencil", clue: "Wood-cased graphite writing tool.", vietnameseMeaning: "bút chì", phonics: "/ˈpen.səl/", emoji: "✏️", grade: 3, unit: 8, topic: "School Things", exampleSentence: "Sharpen the pencil.", distractors: ["pen", "rubber", "book"] },
          { id: "g3-u8-ruler", word: "ruler", clue: "Measuring straight strip.", vietnameseMeaning: "thước kẻ", phonics: "/ˈruː.lər/", emoji: "📏", grade: 3, unit: 8, topic: "School Things", exampleSentence: "A 20-centimetre ruler.", distractors: ["pen", "pencil", "rubber"] },
          { id: "g3-u8-eraser", word: "eraser", clue: "Rubber block for removing pencil marks.", vietnameseMeaning: "cục tẩy / gôm", phonics: "/ɪˈreɪ.zər/", emoji: "🧼", grade: 3, unit: 8, topic: "School Things", exampleSentence: "Erase mistakes with an eraser.", distractors: ["ruler", "pencil", "pen"] },
          { id: "g3-u8-schoolbag", word: "school bag", clue: "Backpack holding books and supplies.", vietnameseMeaning: "cặp sách", phonics: "/ˈskuːl bæɡ/", emoji: "🎒", grade: 3, unit: 8, topic: "School Things", exampleSentence: "My new school bag.", distractors: ["pencil case", "box", "desk"] },
        ],
        sentenceStructures: [{ pattern: "I have a [Item]. / Do you have a [Item]? ➔ Yes, I do. / No, I don't.", vietnameseMeaning: "Mình có một [Đồ dùng]. / Bạn có [Đồ dùng] không? ➔ Có, mình có. / Không, mình không có.", sampleDialogue: [{ speaker: "Tony", text: "Do you have a ruler, Mai?", textVi: "Bạn có thước kẻ không, Mai?" }, { speaker: "Mai", text: "Yes, I do. Here you are.", textVi: "Có chứ. Của bạn đây." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Plural School Things", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "I have [Number] [Items].", vietnameseMeaning: "Mình có [Số lượng] [Đồ dùng].", sampleDialogue: [{ speaker: "Nam", text: "I have three pencils and two pens.", textVi: "Mình có 3 chiếc bút chì và 2 chiếc bút mực." }, { speaker: "Ben", text: "They are in your colorful pencil case!", textVi: "Chúng nằm trong chiếc hộp bút sắc màu của bạn!" }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Stationery Kit Story", focus: "reading_communication", readingMiniStory: { title: "Ready for English Lesson", text: "I pack my school bag before class. I have notebooks, two sharp pencils, a long ruler, and a soft eraser. I am ready to learn!", translationVi: "Mình soạn cặp sách trước giờ học. Mình có vở viết, hai chiếc bút chì gọt sắc, một chiếc thước kẻ dài và cục tẩy mềm. Mình đã sẵn sàng học bài!" }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 9, unitTitle: "Colours", unitTitleVi: "Màu sắc", theme: "Colours & Painting", icon: "🎨", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Asking Colors", focus: "vocabulary_phonics", phonicsSound: "Sounds /bl/ (blue, black) & /br/ (brown)",
        vocabulary: [
          { id: "g3-u9-red", word: "red", clue: "Primary color like fire and apples.", vietnameseMeaning: "màu đỏ", phonics: "/red/", emoji: "🔴", grade: 3, unit: 9, topic: "Colours", exampleSentence: "A bright red apple.", distractors: ["blue", "yellow", "green"] },
          { id: "g3-u9-blue", word: "blue", clue: "Color of clear sky and oceans.", vietnameseMeaning: "màu xanh da trời", phonics: "/bluː/", emoji: "🔵", grade: 3, unit: 9, topic: "Colours", exampleSentence: "The sky is deep blue.", distractors: ["red", "black", "brown"] },
          { id: "g3-u9-yellow", word: "yellow", clue: "Color of sunlight and ripe bananas.", vietnameseMeaning: "màu vàng", phonics: "/ˈjel.əʊ/", emoji: "🟡", grade: 3, unit: 9, topic: "Colours", exampleSentence: "Yellow sunflowers.", distractors: ["orange", "white", "pink"] },
          { id: "g3-u9-green", word: "green", clue: "Color of fresh leaves and grass.", vietnameseMeaning: "màu xanh lá cây", phonics: "/ɡriːn/", emoji: "🟢", grade: 3, unit: 9, topic: "Colours", exampleSentence: "Green grass in spring.", distractors: ["yellow", "blue", "black"] },
        ],
        sentenceStructures: [{ pattern: "What colour is it? ➔ It's [Colour]. / What colour are they? ➔ They're [Colour].", vietnameseMeaning: "Nó màu gì? ➔ Nó màu [Màu sắc]. / Chúng màu gì? ➔ Chúng màu [Màu sắc].", sampleDialogue: [{ speaker: "Mai", text: "What colour is your new bag?", textVi: "Chiếc cặp mới của bạn màu gì thế?" }, { speaker: "Linh", text: "It's bright yellow and blue.", textVi: "Nó màu vàng sáng và xanh da trời." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Plural Colours", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "What colour are your pencils? ➔ They are red and green.", vietnameseMeaning: "Những chiếc bút chì của bạn màu gì? ➔ Chúng màu đỏ và xanh lá.", sampleDialogue: [{ speaker: "Nam", text: "What colour are the notebooks?", textVi: "Những quyển vở màu gì thế?" }, { speaker: "Ben", text: "They're orange and purple.", textVi: "Chúng màu cam và tím." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Rainbow World Story", focus: "reading_communication", readingMiniStory: { title: "Rainbow in the Sky", text: "After the rain, a magnificent rainbow appears with red, orange, yellow, green, blue, indigo, and violet. The world is full of beautiful colours!", translationVi: "Sau cơn mưa, một chiếc cầu vồng tuyệt đẹp hiện ra với màu đỏ, cam, vàng, xanh lá, xanh lam, chàm và tím. Thế giới tràn ngập những màu sắc tươi đẹp!" }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 10, unitTitle: "Break Time Activities", unitTitleVi: "Các hoạt động giờ ra chơi", theme: "Break Time & Games", icon: "⚽", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Playground Games", focus: "vocabulary_phonics", phonicsSound: "Sounds /f/ (football) & /tʃ/ (chess)",
        vocabulary: [
          { id: "g3-u10-football", word: "football", clue: "Team game kicking a round ball into goals.", vietnameseMeaning: "bóng đá", phonics: "/ˈfʊt.bɔːl/", emoji: "⚽", grade: 3, unit: 10, topic: "Games", exampleSentence: "We play football at break time.", distractors: ["chess", "badminton", "basketball"] },
          { id: "g3-u10-badminton", word: "badminton", clue: "Racket sport hitting a shuttlecock.", vietnameseMeaning: "cầu lông", phonics: "/ˈbæd.mɪn.tən/", emoji: "🏸", grade: 3, unit: 10, topic: "Games", exampleSentence: "Play badminton in the yard.", distractors: ["football", "chess", "table tennis"] },
          { id: "g3-u10-chess", word: "chess", clue: "Two-player strategic board game with kings and queens.", vietnameseMeaning: "cờ vua", phonics: "/tʃes/", emoji: "♟️", grade: 3, unit: 10, topic: "Games", exampleSentence: "I play chess with Nam.", distractors: ["football", "basketball", "cards"] },
          { id: "g3-u10-word-puzzles", word: "word puzzles", clue: "Brain games unscrambling letters and words.", vietnameseMeaning: "trò chơi đố chữ", phonics: "/wɜːd ˈpʌz.əlz/", emoji: "🧩", grade: 3, unit: 10, topic: "Games", exampleSentence: "Solve fun word puzzles.", distractors: ["chess", "football", "badminton"] },
        ],
        sentenceStructures: [{ pattern: "What do you do at break time? ➔ I play [Game].", vietnameseMeaning: "Bạn làm gì vào giờ ra chơi? ➔ Mình chơi [Trò chơi].", sampleDialogue: [{ speaker: "Peter", text: "What do you do at break time, Nam?", textVi: "Bạn làm gì vào giờ ra chơi thế Nam?" }, { speaker: "Nam", text: "I play football with my classmates.", textVi: "Mình đá bóng cùng các bạn cùng lớp." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Joining Games", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Let's play [Game] together! ➔ OK, let's play.", vietnameseMeaning: "Cùng chơi [Trò chơi] nào! ➔ Được thôi, cùng chơi nào.", sampleDialogue: [{ speaker: "Mai", text: "Let's play badminton!", textVi: "Cùng chơi cầu lông nhé!" }, { speaker: "Linda", text: "Great idea! I have rackets.", textVi: "Ý kiến hay quá! Mình có vợt này." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Lively Yard Story", focus: "reading_communication", readingMiniStory: { title: "Lively Break Time", text: "When the school bell rings, the schoolyard fills with joy. Boys play thrilling football matches while girls play badminton and solve crossword puzzles.", translationVi: "Khi tiếng chuông trường vang lên, sân trường tràn ngập niềm vui. Các bạn nam chơi những trận bóng sôi nổi trong khi các bạn nữ đánh cầu lông và giải ô chữ." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 11, unitTitle: "My Family", unitTitleVi: "Gia đình của mình", theme: "Family Members", icon: "👨‍👩‍👧‍👦", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Family Members", focus: "vocabulary_phonics", phonicsSound: "Sounds /f/ (father) & /m/ (mother)",
        vocabulary: [
          { id: "g3-u11-father", word: "father", clue: "Male parent (dad).", vietnameseMeaning: "bố / cha", phonics: "/ˈfɑː.ðər/", emoji: "👨", grade: 3, unit: 11, topic: "Family", exampleSentence: "My father is a kind doctor.", distractors: ["mother", "brother", "sister"] },
          { id: "g3-u11-mother", word: "mother", clue: "Female parent (mom).", vietnameseMeaning: "mẹ", phonics: "/ˈmʌð.ər/", emoji: "👩", grade: 3, unit: 11, topic: "Family", exampleSentence: "My mother is a teacher.", distractors: ["father", "sister", "brother"] },
          { id: "g3-u11-brother", word: "brother", clue: "Male sibling.", vietnameseMeaning: "anh/em trai", phonics: "/ˈbrʌð.ər/", emoji: "👦", grade: 3, unit: 11, topic: "Family", exampleSentence: "I play with my brother.", distractors: ["sister", "father", "mother"] },
          { id: "g3-u11-sister", word: "sister", clue: "Female sibling.", vietnameseMeaning: "chị/em gái", phonics: "/ˈsɪs.tər/", emoji: "👧", grade: 3, unit: 11, topic: "Family", exampleSentence: "My little sister is five.", distractors: ["brother", "mother", "father"] },
        ],
        sentenceStructures: [{ pattern: "Who's this/that? ➔ He's/She's my [Family member].", vietnameseMeaning: "Đây/kia là ai? ➔ Ông/Bà/Anh/Chị ấy là [Thành viên] của mình.", sampleDialogue: [{ speaker: "Mary", text: "Who's that man?", textVi: "Người đàn ông kia là ai thế?" }, { speaker: "Mai", text: "He's my father. He's very gentle.", textVi: "Đó là bố mình. Bố rất hiền hậu." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Describing Family", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "How old is he/she? ➔ He's/She's [Age] years old.", vietnameseMeaning: "Anh/chị ấy bao nhiêu tuổi? ➔ Anh/chị ấy [Tuổi] tuổi.", sampleDialogue: [{ speaker: "Tony", text: "How old is your sister?", textVi: "Em gái bạn bao nhiêu tuổi?" }, { speaker: "Mai", text: "She's eight years old.", textVi: "Em ấy 8 tuổi." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Warm Family Story", focus: "reading_communication", readingMiniStory: { title: "Sunday with My Family", text: "There are four people in my family: my father, mother, brother, and me. On Sundays, we cook delicious meals together and watch movies in the living room.", translationVi: "Gia đình mình có bốn người: bố, mẹ, anh trai và mình. Vào các ngày Chủ nhật, cả nhà cùng nhau nấu những bữa ăn ngon và xem phim trong phòng khách." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 12, unitTitle: "This Is My House", unitTitleVi: "Đây là ngôi nhà của mình", theme: "House & Rooms", icon: "🏡", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Rooms in the House", focus: "vocabulary_phonics", phonicsSound: "Sounds /h/ (house) & /l/ (living room)",
        vocabulary: [
          { id: "g3-u12-house", word: "house", clue: "Building where a family lives.", vietnameseMeaning: "ngôi nhà", phonics: "/haʊs/", emoji: "🏡", grade: 3, unit: 12, topic: "House", exampleSentence: "This is my lovely house.", distractors: ["room", "school", "park"] },
          { id: "g3-u12-living-room", word: "living room", clue: "Room where family sits together.", vietnameseMeaning: "phòng khách", phonics: "/ˈlɪv.ɪŋ ˌruːm/", emoji: "🛋️", grade: 3, unit: 12, topic: "House", exampleSentence: "There is a sofa in the living room.", distractors: ["kitchen", "bedroom", "bathroom"] },
          { id: "g3-u12-kitchen", word: "kitchen", clue: "Room for cooking food.", vietnameseMeaning: "nhà bếp", phonics: "/ˈkɪtʃ.ən/", emoji: "🍳", grade: 3, unit: 12, topic: "House", exampleSentence: "Mom is cooking in the kitchen.", distractors: ["bedroom", "bathroom", "garden"] },
          { id: "g3-u12-garden", word: "garden", clue: "Outdoor plot growing flowers and plants.", vietnameseMeaning: "khu vườn", phonics: "/ˈɡɑː.dən/", emoji: "🌻", grade: 3, unit: 12, topic: "House", exampleSentence: "There is a green garden.", distractors: ["kitchen", "house", "room"] },
        ],
        sentenceStructures: [{ pattern: "There is a [Room/Feature] in my house.", vietnameseMeaning: "Có một [Phòng/Khu vực] trong nhà của mình.", sampleDialogue: [{ speaker: "Nam", text: "This is my house. There is a cozy living room.", textVi: "Đây là nhà mình. Có một phòng khách ấm cúng." }, { speaker: "Peter", text: "Wow, and your garden is so green!", textVi: "Oa, và khu vườn của bạn thật xanh mát!" }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: House Tour", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Is there a [Feature] in your house? ➔ Yes, there is. / No, there isn't.", vietnameseMeaning: "Có [Đặc điểm] trong nhà bạn không? ➔ Có. / Không có.", sampleDialogue: [{ speaker: "Mai", text: "Is there a big garden behind your house?", textVi: "Có khu vườn lớn sau nhà bạn không?" }, { speaker: "Nam", text: "Yes, there is! With lots of roses.", textVi: "Có chứ! Với rất nhiều hoa hồng." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Dream Home Story", focus: "reading_communication", readingMiniStory: { title: "Our Sweet Home", text: "My house has two floors. Downstairs, there is a living room and a bright kitchen. Upstairs, there are two cozy bedrooms. I love our sweet home!", translationVi: "Nhà mình có hai tầng. Tầng dưới có phòng khách và nhà bếp sáng sủa. Tầng trên có hai phòng ngủ ấm cúng. Mình yêu mái ấm thân thương của chúng mình!" }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 13, unitTitle: "Where's My Book?", unitTitleVi: "Quyển sách của mình ở đâu?", theme: "Prepositions of Place", icon: "🔍", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Prepositions of Place", focus: "vocabulary_phonics", phonicsSound: "Sounds /ɪn/ (in) & /ɒn/ (on)",
        vocabulary: [
          { id: "g3-u13-in", word: "in", clue: "Inside a container or room.", vietnameseMeaning: "ở bên trong", phonics: "/ɪn/", emoji: "📥", grade: 3, unit: 13, topic: "Prepositions", exampleSentence: "The book is in the bag.", distractors: ["on", "under", "behind"] },
          { id: "g3-u13-on", word: "on", clue: "Resting on top surface.", vietnameseMeaning: "ở trên", phonics: "/ɒn/", emoji: "🔛", grade: 3, unit: 13, topic: "Prepositions", exampleSentence: "The lamp is on the table.", distractors: ["in", "under", "near"] },
          { id: "g3-u13-under", word: "under", clue: "Below or beneath an object.", vietnameseMeaning: "ở phía dưới", phonics: "/ˈʌn.dər/", emoji: "⬇️", grade: 3, unit: 13, topic: "Prepositions", exampleSentence: "The cat is under the chair.", distractors: ["on", "in", "above"] },
          { id: "g3-u13-behind", word: "behind", clue: "At the back side of something.", vietnameseMeaning: "ở phía sau", phonics: "/bɪˈhaɪnd/", emoji: "🔙", grade: 3, unit: 13, topic: "Prepositions", exampleSentence: "The ball is behind the door.", distractors: ["in", "on", "under"] },
        ],
        sentenceStructures: [{ pattern: "Where's the [Item]? ➔ It's [Preposition] the [Location]. / Where are the [Items]? ➔ They're [Preposition] the [Location].", vietnameseMeaning: "[Đồ vật] ở đâu? ➔ Nó ở [Vị trí] [Vật thể].", sampleDialogue: [{ speaker: "Mai", text: "Where's my English book?", textVi: "Quyển sách tiếng Anh của mình ở đâu rồi?" }, { speaker: "Nam", text: "It's on your study desk.", textVi: "Nó ở trên bàn học của bạn kìa." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Finding Multiple Items", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Where are my pens? ➔ They are in the pencil case.", vietnameseMeaning: "Những chiếc bút của mình ở đâu? ➔ Chúng ở trong hộp bút.", sampleDialogue: [{ speaker: "Tony", text: "Where are my crayons?", textVi: "Những chiếc bút màu của mình ở đâu?" }, { speaker: "Ben", text: "They're under the chair!", textVi: "Chúng ở dưới gầm ghế kìa!" }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Detective Search Story", focus: "reading_communication", readingMiniStory: { title: "Looking for School Things", text: "Before going to school, Tom looks for his supplies. His notebook is in the bag, his ruler is on the desk, and his shoes are under the bed.", translationVi: "Trước khi đến trường, Tom tìm kiếm đồ dùng của mình. Vở ghi ở trong cặp, thước kẻ ở trên bàn và đôi giày ở dưới gầm giường." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 14, unitTitle: "My Toys", unitTitleVi: "Đồ chơi của mình", theme: "Toys & Possessions", icon: "🧸", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Naming Favorite Toys", focus: "vocabulary_phonics", phonicsSound: "Sounds /d/ (doll) & /k/ (car)",
        vocabulary: [
          { id: "g3-u14-doll", word: "doll", clue: "Small model of a human for playing.", vietnameseMeaning: "búp bê", phonics: "/dɒl/", emoji: "🪆", grade: 3, unit: 14, topic: "Toys", exampleSentence: "I have a pretty doll.", distractors: ["car", "robot", "teddy bear"] },
          { id: "g3-u14-robot", word: "robot", clue: "Mechanical toy that moves.", vietnameseMeaning: "người máy / rô bốt", phonics: "/ˈrəʊ.bɒt/", emoji: "🤖", grade: 3, unit: 14, topic: "Toys", exampleSentence: "My robot walks and talks.", distractors: ["doll", "kite", "plane"] },
          { id: "g3-u14-car", word: "car", clue: "Small toy vehicle on four wheels.", vietnameseMeaning: "ô tô đồ chơi", phonics: "/kɑːr/", emoji: "🚗", grade: 3, unit: 14, topic: "Toys", exampleSentence: "A fast red toy car.", distractors: ["doll", "robot", "ball"] },
          { id: "g3-u14-kite", word: "kite", clue: "Light frame flown high in the breeze.", vietnameseMeaning: "con diều", phonics: "/kaɪt/", emoji: "🪁", grade: 3, unit: 14, topic: "Toys", exampleSentence: "Fly a diamond kite.", distractors: ["car", "doll", "robot"] },
        ],
        sentenceStructures: [{ pattern: "I have a [Toy]. / Do you have a [Toy]? ➔ Yes, I do. / No, I don't.", vietnameseMeaning: "Mình có một [Đồ chơi]. / Bạn có [Đồ chơi] không? ➔ Có, mình có. / Không, mình không có.", sampleDialogue: [{ speaker: "Tony", text: "I have a new robot. What toys do you have?", textVi: "Mình có một bạn người máy mới. Bạn có đồ chơi gì?" }, { speaker: "Mai", text: "I have a sweet doll and a kite.", textVi: "Mình có một bạn búp bê xinh và một con diều." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Sharing Toys", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Let's share and play with the [Toy]!", vietnameseMeaning: "Cùng chia sẻ và chơi với [Đồ chơi] nhé!", sampleDialogue: [{ speaker: "Nam", text: "Let's race our toy cars!", textVi: "Cùng đua ô tô đồ chơi nào!" }, { speaker: "Ben", text: "Ready, set, go!", textVi: "Sẵn sàng, bắt đầu!" }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Toy Box Story", focus: "reading_communication", readingMiniStory: { title: "My Favorite Toy Box", text: "Inside my colorful toy box, there are speed cars, a glowing robot, and a high-flying kite. My friends and I share our toys every weekend.", translationVi: "Bên trong chiếc hộp đồ chơi đầy màu sắc của mình có những chiếc ô tô tốc độ, một chú rô-bốt phát sáng và con diều bay cao. Mình và các bạn cùng chia sẻ đồ chơi mỗi dịp cuối tuần." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 15, unitTitle: "Do You Have Any Toys?", unitTitleVi: "Bạn có món đồ chơi nào không?", theme: "Quantity & Toys", icon: "🪀", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Asking Quantities of Toys", focus: "vocabulary_phonics", phonicsSound: "Sounds /tr/ (train) & /pl/ (plane)",
        vocabulary: [
          { id: "g3-u15-train", word: "train", clue: "Toy rail locomotives and carriages.", vietnameseMeaning: "tàu hỏa đồ chơi", phonics: "/treɪn/", emoji: "🚂", grade: 3, unit: 15, topic: "Toys", exampleSentence: "I have two toy trains.", distractors: ["plane", "ship", "truck"] },
          { id: "g3-u15-plane", word: "plane", clue: "Toy aircraft with wings.", vietnameseMeaning: "máy bay đồ chơi", phonics: "/pleɪn/", emoji: "✈️", grade: 3, unit: 15, topic: "Toys", exampleSentence: "A silver toy plane.", distractors: ["train", "kite", "car"] },
          { id: "g3-u15-truck", word: "truck", clue: "Toy vehicle for carrying heavy loads.", vietnameseMeaning: "xe tải đồ chơi", phonics: "/trʌk/", emoji: "🚛", grade: 3, unit: 15, topic: "Toys", exampleSentence: "A big yellow truck.", distractors: ["plane", "train", "boat"] },
          { id: "g3-u15-ship", word: "ship", clue: "Toy vessel sailing on water.", vietnameseMeaning: "tàu thủy đồ chơi", phonics: "/ʃɪp/", emoji: "🚢", grade: 3, unit: 15, topic: "Toys", exampleSentence: "A white toy ship.", distractors: ["truck", "plane", "train"] },
        ],
        sentenceStructures: [{ pattern: "Do you have any [Toys]? ➔ Yes, I do. I have [Number] [Toys].", vietnameseMeaning: "Bạn có [Đồ chơi] nào không? ➔ Có, mình có [Số lượng] [Đồ chơi].", sampleDialogue: [{ speaker: "Mai", text: "Do you have any toy planes, Tony?", textVi: "Bạn có máy bay đồ chơi nào không, Tony?" }, { speaker: "Tony", text: "Yes, I do. I have three toy planes.", textVi: "Có chứ. Mình có ba chiếc máy bay đồ chơi." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Negative Answers", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Do you have any [Toys]? ➔ No, I don't, but I have a [Other toy].", vietnameseMeaning: "Bạn có [Đồ chơi] không? ➔ Không, nhưng mình có một [Đồ chơi khác].", sampleDialogue: [{ speaker: "Nam", text: "Do you have any toy trains?", textVi: "Bạn có tàu hỏa đồ chơi không?" }, { speaker: "Linda", text: "No, I don't. But I have two dolls.", textVi: "Không, nhưng mình có hai bạn búp bê." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Toy Exhibition Story", focus: "reading_communication", readingMiniStory: { title: "Class Toy Day", text: "Today is Toy Day in Class 3C! Tony brings his electric train, Mai brings her cute dolls, and Nam shows his yellow truck. We have so much fun together!", translationVi: "Hôm nay là Ngày hội Đồ chơi của lớp 3C! Tony mang đến đoàn tàu hỏa chạy điện, Mai mang búp bê xinh xắn và Nam khoe chiếc xe tải màu vàng. Chúng mình cùng chơi thật vui!" }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 16, unitTitle: "Do You Have Any Pets?", unitTitleVi: "Bạn có nuôi thú cưng nào không?", theme: "Pets & Animals", icon: "🐶", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Pet Animals", focus: "vocabulary_phonics", phonicsSound: "Sounds /d/ (dog) & /k/ (cat)",
        vocabulary: [
          { id: "g3-u16-dog", word: "dog", clue: "Loyal barking four-legged pet.", vietnameseMeaning: "con chó", phonics: "/dɒɡ/", emoji: "🐶", grade: 3, unit: 16, topic: "Pets", exampleSentence: "I have a cute puppy.", distractors: ["cat", "bird", "fish"] },
          { id: "g3-u16-cat", word: "cat", clue: "Furry purring pet with whiskers.", vietnameseMeaning: "con mèo", phonics: "/kæt/", emoji: "🐱", grade: 3, unit: 16, topic: "Pets", exampleSentence: "My cat loves sleeping.", distractors: ["dog", "parrot", "rabbit"] },
          { id: "g3-u16-bird", word: "bird", clue: "Feathered creature that sings and flies.", vietnameseMeaning: "con chim", phonics: "/bɜːd/", emoji: "🐦", grade: 3, unit: 16, topic: "Pets", exampleSentence: "A singing yellow bird.", distractors: ["dog", "cat", "fish"] },
          { id: "g3-u16-goldfish", word: "goldfish", clue: "Small orange aquarium fish.", vietnameseMeaning: "cá vàng", phonics: "/ˈɡəʊld.fɪʃ/", emoji: "🐠", grade: 3, unit: 16, topic: "Pets", exampleSentence: "Two goldfish swim in the bowl.", distractors: ["parrot", "dog", "cat"] },
          { id: "g3-u16-parrot", word: "parrot", clue: "Colorful bird that can mimic speech.", vietnameseMeaning: "con vẹt", phonics: "/ˈpær.ət/", emoji: "🦜", grade: 3, unit: 16, topic: "Pets", exampleSentence: "A green talking parrot.", distractors: ["goldfish", "rabbit", "cat"] },
        ],
        sentenceStructures: [{ pattern: "Do you have any pets? ➔ Yes, I do. I have a [Pet]. / No, I don't.", vietnameseMeaning: "Bạn có nuôi thú cưng nào không? ➔ Có, mình nuôi một chú [Thú cưng]. / Không, mình không nuôi.", sampleDialogue: [{ speaker: "Peter", text: "Do you have any pets, Mai?", textVi: "Bạn có nuôi thú cưng nào không Mai?" }, { speaker: "Mai", text: "Yes, I do. I have a fluffy white cat.", textVi: "Có chứ. Mình có một chú mèo trắng lông xù." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Where are the Pets?", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Where is your [Pet]? ➔ It's in the [Place].", vietnameseMeaning: "[Thú cưng] của bạn ở đâu? ➔ Nó ở trong [Địa điểm].", sampleDialogue: [{ speaker: "Nam", text: "Where is your dog?", textVi: "Chú cún của bạn ở đâu rồi?" }, { speaker: "Tony", text: "It's in the garden chasing butterflies.", textVi: "Nó đang ở trong vườn đuổi bướm." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Loving Our Pets Story", focus: "reading_communication", readingMiniStory: { title: "Caring for Our Pets", text: "Pets are our loving animal friends. Mai feeds her goldfish in the aquarium, Peter plays catch with his puppy, and Quan listens to his smart green parrot.", translationVi: "Thú cưng là những người bạn động vật đáng yêu của chúng mình. Mai cho đàn cá vàng ăn trong bể, Peter chơi ném bóng với cún con và Quân lắng nghe chú vẹt xanh thông minh trò chuyện." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 17, unitTitle: "What Toys Do You Like?", unitTitleVi: "Bạn thích món đồ chơi nào?", theme: "Preferences & Toys", icon: "🎯", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Stating Toy Preferences", focus: "vocabulary_phonics", phonicsSound: "Sounds /k/ (cars) & /k/ (kites)",
        vocabulary: [
          { id: "g3-u17-cars", word: "cars", clue: "Vehicles with wheels for racing.", vietnameseMeaning: "những chiếc ô tô", phonics: "/kɑːrz/", emoji: "🚗", grade: 3, unit: 17, topic: "Toys", exampleSentence: "I like racing cars.", distractors: ["dolls", "kites", "ships"] },
          { id: "g3-u17-dolls", word: "dolls", clue: "Human figures for nurturing play.", vietnameseMeaning: "những bạn búp bê", phonics: "/dɒlz/", emoji: "🪆", grade: 3, unit: 17, topic: "Toys", exampleSentence: "She likes sweet dolls.", distractors: ["cars", "robots", "kites"] },
          { id: "g3-u17-kites", word: "kites", clue: "Tethered aircraft flown outdoors.", vietnameseMeaning: "những con diều", phonics: "/kaɪts/", emoji: "🪁", grade: 3, unit: 17, topic: "Toys", exampleSentence: "We fly kites in the field.", distractors: ["cars", "dolls", "trains"] },
          { id: "g3-u17-teddy-bears", word: "teddy bears", clue: "Soft stuffed toy bears.", vietnameseMeaning: "những chú gấu bông", phonics: "/ˈted.i beərz/", emoji: "🧸", grade: 3, unit: 17, topic: "Toys", exampleSentence: "I collect soft teddy bears.", distractors: ["robots", "planes", "ships"] },
        ],
        sentenceStructures: [{ pattern: "What toys do you like? ➔ I like [Plural Toys].", vietnameseMeaning: "Bạn thích đồ chơi nào? ➔ Mình thích [Đồ chơi số nhiều].", sampleDialogue: [{ speaker: "Tony", text: "What toys do you like, Nam?", textVi: "Bạn thích đồ chơi nào thế Nam?" }, { speaker: "Nam", text: "I like toy cars and planes.", textVi: "Mình thích ô tô và máy bay đồ chơi." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Asking He/She", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "What toys does he/she like? ➔ He/She likes [Toys].", vietnameseMeaning: "Anh/cô ấy thích đồ chơi nào? ➔ Anh/cô ấy thích [Đồ chơi].", sampleDialogue: [{ speaker: "Mai", text: "What toys does Linda like?", textVi: "Linda thích đồ chơi nào thế?" }, { speaker: "Mary", text: "She likes dolls and teddy bears.", textVi: "Bạn ấy thích búp bê và gấu bông." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Birthday Wishlist Story", focus: "reading_communication", readingMiniStory: { title: "Birthday Toy Wishes", text: "Before his 9th birthday, Nam writes a wishlist. He likes fast racing cars and flying kites. His parents prepare a fantastic surprise gift for him!", translationVi: "Trước ngày sinh nhật 9 tuổi, Nam viết một danh sách điều ước. Cậu thích ô tô đua tốc độ và những cánh diều bay lượn. Bố mẹ đã chuẩn bị một món quà bất ngờ tuyệt vời dành cho cậu!" }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 18, unitTitle: "What Are You Doing?", unitTitleVi: "Bạn đang làm gì đấy?", theme: "Present Continuous Actions", icon: "🏃", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Present Actions", focus: "vocabulary_phonics", phonicsSound: "Sounds /r/ (reading) & /d/ (drawing)",
        vocabulary: [
          { id: "g3-u18-reading", word: "reading", clue: "Looking at and comprehending written words.", vietnameseMeaning: "đang đọc sách", phonics: "/ˈriː.dɪŋ/", emoji: "📖", grade: 3, unit: 18, topic: "Actions", exampleSentence: "I am reading a storybook.", distractors: ["writing", "singing", "drawing"] },
          { id: "g3-u18-writing", word: "writing", clue: "Inscribing letters and words with a pen.", vietnameseMeaning: "đang viết", phonics: "/ˈraɪ.tɪŋ/", emoji: "✍️", grade: 3, unit: 18, topic: "Actions", exampleSentence: "She is writing an English dictation.", distractors: ["reading", "listening", "singing"] },
          { id: "g3-u18-singing", word: "singing", clue: "Producing musical vocal tones.", vietnameseMeaning: "đang hát", phonics: "/ˈsɪŋ.ɪŋ/", emoji: "🎤", grade: 3, unit: 18, topic: "Actions", exampleSentence: "He is singing a cheerful song.", distractors: ["dancing", "reading", "cooking"] },
          { id: "g3-u18-drawing", word: "drawing", clue: "Creating pictures with pencils.", vietnameseMeaning: "đang vẽ tranh", phonics: "/ˈdrɔː.ɪŋ/", emoji: "🎨", grade: 3, unit: 18, topic: "Actions", exampleSentence: "We are drawing a village scene.", distractors: ["writing", "reading", "running"] },
        ],
        sentenceStructures: [{ pattern: "What are you doing? ➔ I'm [V-ing]. / What is he/she doing? ➔ He's/She's [V-ing].", vietnameseMeaning: "Bạn đang làm gì thế? ➔ Mình đang [Làm gì]. / Anh/cô ấy đang làm gì? ➔ Anh/cô ấy đang [Làm gì].", sampleDialogue: [{ speaker: "Mai", text: "What are you doing, Nam?", textVi: "Bạn đang làm gì thế Nam?" }, { speaker: "Nam", text: "I'm reading an exciting comic book.", textVi: "Mình đang đọc một cuốn truyện tranh hấp dẫn." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Group Activities", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "What are they doing? ➔ They are [V-ing].", vietnameseMeaning: "Họ đang làm gì thế? ➔ Họ đang [Làm gì].", sampleDialogue: [{ speaker: "Teacher", text: "What are the students doing in the art room?", textVi: "Các em học sinh đang làm gì trong phòng mỹ thuật?" }, { speaker: "Student", text: "They are painting landscapes!", textVi: "Các bạn đang vẽ tranh phong cảnh ạ!" }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: After-School Activities Story", focus: "reading_communication", readingMiniStory: { title: "Busy Afternoon at School", text: "In the afternoon club, children are active. Mai is singing in the music room, Nam is writing an essay in the library, and Ben is drawing the school garden.", translationVi: "Ở câu lạc bộ chiều, các bạn nhỏ đều bận rộn. Mai đang hát trong phòng âm nhạc, Nam đang viết văn trong thư viện và Ben đang vẽ khu vườn trường." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 19, unitTitle: "Our Favourite Animals", unitTitleVi: "Những loài động vật yêu thích của chúng mình", theme: "Zoo & Wild Animals", icon: "🐘", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Wild Animals", focus: "vocabulary_phonics", phonicsSound: "Sounds /m/ (monkey) & /t/ (tiger)",
        vocabulary: [
          { id: "g3-u19-tiger", word: "tiger", clue: "Striped powerful wild cat.", vietnameseMeaning: "con hổ", phonics: "/ˈtaɪ.ɡər/", emoji: "🐯", grade: 3, unit: 19, topic: "Animals", exampleSentence: "The tiger is roaring.", distractors: ["lion", "elephant", "monkey"] },
          { id: "g3-u19-elephant", word: "elephant", clue: "Gigantic mammal with big ears and trunk.", vietnameseMeaning: "con voi", phonics: "/ˈel.ɪ.fənt/", emoji: "🐘", grade: 3, unit: 19, topic: "Animals", exampleSentence: "The elephant has a long trunk.", distractors: ["tiger", "zebra", "giraffe"] },
          { id: "g3-u19-monkey", word: "monkey", clue: "Agile tree-climbing mammal.", vietnameseMeaning: "con khỉ", phonics: "/ˈmʌŋ.ki/", emoji: "🐒", grade: 3, unit: 19, topic: "Animals", exampleSentence: "The monkey eats bananas.", distractors: ["tiger", "bear", "lion"] },
          { id: "g3-u19-bear", word: "bear", clue: "Large furry mammal that loves honey and fish.", vietnameseMeaning: "con gấu", phonics: "/beər/", emoji: "🐻", grade: 3, unit: 19, topic: "Animals", exampleSentence: "A strong brown bear.", distractors: ["tiger", "monkey", "elephant"] },
        ],
        sentenceStructures: [{ pattern: "What animal do you want to see? ➔ I want to see [Animals]. / What animal is it? ➔ It's a [Animal].", vietnameseMeaning: "Bạn muốn xem con vật nào? ➔ Mình muốn xem [Con vật]. / Đó là con gì? ➔ Đó là một con [Con vật].", sampleDialogue: [{ speaker: "Tony", text: "What animal do you want to see at the zoo?", textVi: "Bạn muốn xem con vật nào ở sở thú?" }, { speaker: "Mai", text: "I want to see elephants and monkeys.", textVi: "Mình muốn xem voi và khỉ." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Describing Animals", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "I like [Animals] because they are [Adjective].", vietnameseMeaning: "Mình thích [Con vật] vì chúng rất [Tính từ].", sampleDialogue: [{ speaker: "Nam", text: "Why do you like monkeys?", textVi: "Tại sao bạn thích khỉ?" }, { speaker: "Ben", text: "Because they are so funny and clever!", textVi: "Vì chúng rất vui nhộn và thông minh!" }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Safari Park Story", focus: "reading_communication", readingMiniStory: { title: "A Day at the Safari Zoo", text: "We take a tour bus around the safari park. We see giant elephants spraying water, clever monkeys swinging from branches, and regal tigers resting in the grass.", translationVi: "Chúng mình đi xe buýt tham quan quanh công viên safari. Chúng mình thấy những chú voi khổng lồ phun nước, những chú khỉ tinh khôn đu cành và đàn hổ dũng mãnh nghỉ ngơi trên bãi cỏ." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 3, unitNumber: 20, unitTitle: "In the Park", unitTitleVi: "Trong công viên", theme: "Weather & Park Fun", icon: "🌳", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Weather & Activities", focus: "vocabulary_phonics", phonicsSound: "Sounds /s/ (sunny) & /r/ (rainy)",
        vocabulary: [
          { id: "g3-u20-sunny", word: "sunny", clue: "Bright with plenty of sunshine.", vietnameseMeaning: "trời nắng", phonics: "/ˈsʌn.i/", emoji: "☀️", grade: 3, unit: 20, topic: "Weather", exampleSentence: "It is sunny and warm today.", distractors: ["rainy", "windy", "cloudy"] },
          { id: "g3-u20-rainy", word: "rainy", clue: "Wet with rain falling.", vietnameseMeaning: "trời mưa", phonics: "/ˈreɪ.ni/", emoji: "🌧️", grade: 3, unit: 20, topic: "Weather", exampleSentence: "Take an umbrella on rainy days.", distractors: ["sunny", "windy", "hot"] },
          { id: "g3-u20-windy", word: "windy", clue: "Blowing with strong air currents.", vietnameseMeaning: "trời có gió", phonics: "/ˈwɪn.di/", emoji: "💨", grade: 3, unit: 20, topic: "Weather", exampleSentence: "It is windy, perfect for kites.", distractors: ["sunny", "rainy", "cloudy"] },
          { id: "g3-u20-cloudy", word: "cloudy", clue: "Sky covered with gray or white clouds.", vietnameseMeaning: "trời nhiều mây", phonics: "/ˈklaʊ.di/", emoji: "☁️", grade: 3, unit: 20, topic: "Weather", exampleSentence: "A cool cloudy morning.", distractors: ["sunny", "hot", "rainy"] },
        ],
        sentenceStructures: [{ pattern: "What's the weather like today? ➔ It's [Weather]. / What are people doing in the park? ➔ They are [V-ing].", vietnameseMeaning: "Thời tiết hôm nay thế nào? ➔ Trời [Thời tiết]. / Mọi người đang làm gì trong công viên? ➔ Họ đang [Hành động].", sampleDialogue: [{ speaker: "Mai", text: "What's the weather like today in Hanoi?", textVi: "Thời tiết hôm nay ở Hà Nội thế nào?" }, { speaker: "Nam", text: "It's sunny and windy. Let's go to the park!", textVi: "Trời nắng và có gió. Cùng ra công viên nào!" }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Outdoor Sports in the Park", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "What are you doing in the park? ➔ I am riding a bike.", vietnameseMeaning: "Bạn đang làm gì trong công viên? ➔ Mình đang đạp xe.", sampleDialogue: [{ speaker: "Linda", text: "What are you doing in the park?", textVi: "Bạn đang làm gì trong công viên thế?" }, { speaker: "Tony", text: "I'm roller-skating with my brother.", textVi: "Mình đang trượt pa-tin cùng anh trai." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Park Weekend Story", focus: "reading_communication", readingMiniStory: { title: "Sunny Weekend in the Park", text: "On a bright sunny Sunday, the city park is full of laughter. Families picnic under shade trees, children cycle along scenic paths, and colorful kites dance in the gentle breeze.", translationVi: "Vào một ngày Chủ nhật ngập nắng ấm, công viên thành phố rộn rã tiếng cười. Các gia đình dã ngoại dưới bóng cây râm mát, trẻ em đạp xe dọc theo những lối đi và những cánh diều sắc màu nhảy múa trong làn gió nhẹ." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
];
