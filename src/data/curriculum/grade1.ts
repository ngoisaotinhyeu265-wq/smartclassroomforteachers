import { GlobalSuccessUnit } from "../../types";

export const GRADE_1_UNITS: GlobalSuccessUnit[] = [
  {
    grade: 1,
    unitNumber: 1,
    unitTitle: "In the School Playground",
    unitTitleVi: "Tại sân trường",
    theme: "School & Friends",
    icon: "🏫",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /b/ & Vocabulary",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Bb - sound /b/",
        vocabulary: [
          { id: "g1-u1-bill", word: "Bill", clue: "A friendly schoolboy waving hello.", vietnameseMeaning: "bạn Bill", phonics: "/bɪl/", emoji: "👦", grade: 1, unit: 1, topic: "School", exampleSentence: "Hi, I'm Bill.", distractors: ["Ba", "car", "dog"] },
          { id: "g1-u1-book", word: "book", clue: "Pages bound together for reading.", vietnameseMeaning: "quyển sách", phonics: "/bʊk/", emoji: "📖", grade: 1, unit: 1, topic: "School", exampleSentence: "I have a green book.", distractors: ["ball", "bike", "pen"] },
          { id: "g1-u1-ball", word: "ball", clue: "A round object kicked in sports.", vietnameseMeaning: "quả bóng", phonics: "/bɔːl/", emoji: "⚽", grade: 1, unit: 1, topic: "School", exampleSentence: "Look at the red ball.", distractors: ["bike", "book", "cake"] },
          { id: "g1-u1-bike", word: "bike", clue: "A two-wheeled vehicle you pedal.", vietnameseMeaning: "xe đạp", phonics: "/baɪk/", emoji: "🚲", grade: 1, unit: 1, topic: "School", exampleSentence: "He rides a blue bike.", distractors: ["bag", "car", "boat"] },
        ],
        sentenceStructures: [
          {
            pattern: "Hi, I'm [Name]. / Hello, I'm [Name].",
            vietnameseMeaning: "Chào bạn, mình là [Tên].",
            sampleDialogue: [
              { speaker: "Bill", text: "Hi, I'm Bill.", textVi: "Chào bạn, mình là Bill." },
              { speaker: "Ba", text: "Hello, I'm Ba.", textVi: "Xin chào, mình là Ba." },
            ],
          },
        ],
        chantOrAudioScript: "B-b-Bill, b-b-book, b-b-ball, b-b-bike! Let's play together in the playground!",
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Sentence Structure Practice",
        focus: "sentence_patterns",
        vocabulary: [
          { id: "g1-u1-bag", word: "bag", clue: "Carried on your back to hold books.", vietnameseMeaning: "cặp sách", phonics: "/bæɡ/", emoji: "🎒", grade: 1, unit: 1, topic: "School", exampleSentence: "This is my school bag.", distractors: ["box", "bed", "ball"] },
        ],
        sentenceStructures: [
          {
            pattern: "Look at the [Item]! / Point to the [Item]!",
            vietnameseMeaning: "Hãy nhìn vào [Đồ vật]! / Hãy chỉ vào [Đồ vật]!",
            sampleDialogue: [
              { speaker: "Teacher", text: "Look at the book and ball.", textVi: "Hãy nhìn vào quyển sách và quả bóng." },
              { speaker: "Students", text: "Yes, teacher!", textVi: "Vâng ạ!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading & Review",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Fun in the Playground",
          text: "Hi, I'm Bill. I am in the school playground with Ba. Look! A red ball and a blue bike. We love playing at school!",
          translationVi: "Chào bạn, mình là Bill. Mình đang ở sân trường cùng bạn Ba. Nhìn kìa! Một quả bóng đỏ và một chiếc xe đạp xanh. Chúng mình rất thích chơi ở trường!",
        },
        vocabulary: [
          { id: "g1-u1-playground", word: "playground", clue: "Outdoor area at school for playing games.", vietnameseMeaning: "sân chơi", phonics: "/ˈpleɪ.ɡraʊnd/", emoji: "🛝", grade: 1, unit: 1, topic: "School", exampleSentence: "We run in the playground.", distractors: ["classroom", "home", "shop"] },
        ],
        sentenceStructures: [
          {
            pattern: "Let's play with the [Item]!",
            vietnameseMeaning: "Cùng chơi với [Đồ vật] nào!",
            sampleDialogue: [
              { speaker: "Bill", text: "Let's play with the ball!", textVi: "Cùng chơi với quả bóng nào!" },
              { speaker: "Ba", text: "Great idea!", textVi: "Ý kiến tuyệt vời!" },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: 1,
    unitNumber: 2,
    unitTitle: "In the Dining Room",
    unitTitleVi: "Trong phòng ăn",
    theme: "Family & Dining",
    icon: "🍽️",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /k/ & Food Words",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Cc - sound /k/",
        vocabulary: [
          { id: "g1-u2-cake", word: "cake", clue: "Sweet baked food eaten at celebrations.", vietnameseMeaning: "bánh ngọt", phonics: "/keɪk/", emoji: "🎂", grade: 1, unit: 2, topic: "Dining", exampleSentence: "I have a birthday cake.", distractors: ["car", "cat", "cup"] },
          { id: "g1-u2-car", word: "car", clue: "A four-wheeled road vehicle.", vietnameseMeaning: "xe ô tô", phonics: "/kɑːr/", emoji: "🚗", grade: 1, unit: 2, topic: "Toys", exampleSentence: "Look at the toy car.", distractors: ["cake", "cup", "can"] },
          { id: "g1-u2-cat", word: "cat", clue: "A small furry pet that meows.", vietnameseMeaning: "con mèo", phonics: "/kæt/", emoji: "🐱", grade: 1, unit: 2, topic: "Animals", exampleSentence: "The cat is on the chair.", distractors: ["car", "cake", "cup"] },
          { id: "g1-u2-cup", word: "cup", clue: "A small container with a handle for tea or milk.", vietnameseMeaning: "cái tách/cốc", phonics: "/kʌp/", emoji: "☕", grade: 1, unit: 2, topic: "Dining", exampleSentence: "A cup of warm milk.", distractors: ["cap", "cat", "cake"] },
        ],
        sentenceStructures: [
          {
            pattern: "I have a [Item]. / Look at the [Item].",
            vietnameseMeaning: "Tôi có một [Đồ vật]. / Hãy nhìn [Đồ vật].",
            sampleDialogue: [
              { speaker: "Mai", text: "I have a cake.", textVi: "Mình có một chiếc bánh ngọt." },
              { speaker: "Nam", text: "Look at the cute cat!", textVi: "Hãy nhìn chú mèo dễ thương kìa!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Sentence Patterns",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Pass me the [Item], please.",
            vietnameseMeaning: "Làm ơn đưa cho mình [Đồ vật] nhé.",
            sampleDialogue: [
              { speaker: "Mom", text: "Pass me the cup, please.", textVi: "Làm ơn đưa mẹ cái cốc nhé." },
              { speaker: "Lan", text: "Here you are, Mom.", textVi: "Của mẹ đây ạ." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Story & Communication",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Tea Time with Family",
          text: "In the dining room, Mom drinks tea from a blue cup. Dad eats sweet cake. The little cat plays with a toy car.",
          translationVi: "Trong phòng ăn, mẹ uống trà từ chiếc cốc xanh. Bố ăn bánh ngọt. Chú mèo nhỏ chơi với chiếc ô tô đồ chơi.",
        },
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "This is a delicious [Food].",
            vietnameseMeaning: "Đây là một món [Thức ăn] rất ngon.",
            sampleDialogue: [
              { speaker: "Dad", text: "This is a delicious cake!", textVi: "Chiếc bánh này ngon quá!" },
              { speaker: "Mom", text: "Thank you!", textVi: "Cảm ơn anh!" },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: 1,
    unitNumber: 3,
    unitTitle: "At the Street Market",
    unitTitleVi: "Tại chợ phố",
    theme: "Market & Fruits",
    icon: "🛒",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /æ/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Aa - sound /æ/",
        vocabulary: [
          { id: "g1-u3-apple", word: "apple", clue: "A crisp round red or green fruit.", vietnameseMeaning: "quả táo", phonics: "/ˈæp.əl/", emoji: "🍎", grade: 1, unit: 3, topic: "Fruits", exampleSentence: "I have a red apple.", distractors: ["bag", "can", "hat"] },
          { id: "g1-u3-bag", word: "bag", clue: "A container used for holding items.", vietnameseMeaning: "cái túi / cái cặp", phonics: "/bæɡ/", emoji: "👜", grade: 1, unit: 3, topic: "Market", exampleSentence: "Put apples in the bag.", distractors: ["apple", "hat", "can"] },
          { id: "g1-u3-can", word: "can", clue: "A metal cylindrical container for drinks.", vietnameseMeaning: "lon nước", phonics: "/kæn/", emoji: "🥫", grade: 1, unit: 3, topic: "Drinks", exampleSentence: "A can of lemonade.", distractors: ["bag", "apple", "hat"] },
          { id: "g1-u3-hat", word: "hat", clue: "A covering for the head worn outdoors.", vietnameseMeaning: "cái mũ/nón", phonics: "/hæt/", emoji: "👒", grade: 1, unit: 3, topic: "Clothes", exampleSentence: "A nice yellow hat.", distractors: ["can", "bag", "apple"] },
        ],
        sentenceStructures: [
          {
            pattern: "I have an [Item]. / I see a [Item].",
            vietnameseMeaning: "Mình có một [Đồ vật]. / Mình thấy một [Đồ vật].",
            sampleDialogue: [
              { speaker: "Lan", text: "I have a red apple.", textVi: "Mình có một quả táo đỏ." },
              { speaker: "Ben", text: "I have a new bag.", textVi: "Mình có một chiếc túi mới." },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Sentence Practice",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "How many [Items]?",
            vietnameseMeaning: "Có bao nhiêu [Đồ vật]?",
            sampleDialogue: [
              { speaker: "Seller", text: "How many apples?", textVi: "Bao nhiêu quả táo ạ?" },
              { speaker: "Buyer", text: "Two apples, please.", textVi: "Cho tôi 2 quả nhé." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Market Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "At the Busy Street Market",
          text: "At the street market, we buy fresh red apples and put them in a big bag. Dad wears a straw hat and holds a can of juice.",
          translationVi: "Tại khu chợ phố, chúng mình mua táo đỏ tươi và đựng trong chiếc túi to. Bố đội mũ cói và cầm một lon nước ép.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 1,
    unitNumber: 4,
    unitTitle: "In the Bedroom",
    unitTitleVi: "Trong phòng ngủ",
    theme: "Home & Bedroom",
    icon: "🛏️",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /d/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Dd - sound /d/",
        vocabulary: [
          { id: "g1-u4-door", word: "door", clue: "Hinged barrier used to close an entrance.", vietnameseMeaning: "cánh cửa", phonics: "/dɔːr/", emoji: "🚪", grade: 1, unit: 4, topic: "Home", exampleSentence: "Open the door.", distractors: ["desk", "dog", "duck"] },
          { id: "g1-u4-desk", word: "desk", clue: "A study table with flat surface.", vietnameseMeaning: "bàn học", phonics: "/desk/", emoji: "🛋️", grade: 1, unit: 4, topic: "Home", exampleSentence: "My book is on the desk.", distractors: ["door", "bed", "chair"] },
          { id: "g1-u4-dog", word: "dog", clue: "A loyal barking domestic pet.", vietnameseMeaning: "con chó", phonics: "/dɒɡ/", emoji: "🐶", grade: 1, unit: 4, topic: "Animals", exampleSentence: "The friendly dog sleeps.", distractors: ["duck", "door", "desk"] },
          { id: "g1-u4-duck", word: "duck", clue: "A water bird that quacks and swims.", vietnameseMeaning: "con vịt", phonics: "/dʌk/", emoji: "🦆", grade: 1, unit: 4, topic: "Animals", exampleSentence: "A yellow toy duck.", distractors: ["dog", "bird", "fish"] },
        ],
        sentenceStructures: [
          {
            pattern: "This is my [Object]. / Open the [Object].",
            vietnameseMeaning: "Đây là [Đồ vật] của mình. / Mở [Đồ vật].",
            sampleDialogue: [
              { speaker: "Tony", text: "This is my wooden desk.", textVi: "Đây là bàn học gỗ của mình." },
              { speaker: "Mary", text: "Open the door, please.", textVi: "Làm ơn mở cửa nhé." },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Practice",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Where is the [Item]?",
            vietnameseMeaning: "[Đồ vật] ở đâu?",
            sampleDialogue: [
              { speaker: "Mai", text: "Where is the duck?", textVi: "Chú vịt ở đâu?" },
              { speaker: "Nam", text: "It is near the door.", textVi: "Nó ở gần cửa." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Bedroom Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "My Cozy Room",
          text: "This is my clean bedroom. I have a wooden desk near the window and a yellow toy duck. My good dog sleeps quietly.",
          translationVi: "Đây là phòng ngủ ngăn nắp của mình. Mình có bàn học gỗ gần cửa sổ và chú vịt đồ chơi vàng. Chú cún ngoan ngủ yên lành.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 1,
    unitNumber: 5,
    unitTitle: "At the Fish and Chip Shop",
    unitTitleVi: "Ở tiệm cá & khoai tây chiên",
    theme: "Food & Meals",
    icon: "🍟",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /f/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Ff - sound /f/",
        vocabulary: [
          { id: "g1-u5-fish", word: "fish", clue: "An animal with fins that swims in water.", vietnameseMeaning: "con cá", phonics: "/fɪʃ/", emoji: "🐟", grade: 1, unit: 5, topic: "Food", exampleSentence: "I like fried fish.", distractors: ["chips", "flag", "fox"] },
          { id: "g1-u5-chips", word: "chips", clue: "Crispy fried potato slices/strips.", vietnameseMeaning: "khoai tây chiên", phonics: "/tʃɪps/", emoji: "🍟", grade: 1, unit: 5, topic: "Food", exampleSentence: "Hot chips are delicious.", distractors: ["fish", "cake", "bread"] },
          { id: "g1-u5-flag", word: "flag", clue: "A piece of cloth with national symbols.", vietnameseMeaning: "lá cờ", phonics: "/flæɡ/", emoji: "🚩", grade: 1, unit: 5, topic: "Objects", exampleSentence: "Look at the red flag.", distractors: ["fox", "fish", "bag"] },
          { id: "g1-u5-fox", word: "fox", clue: "A clever wild mammal with a bushy tail.", vietnameseMeaning: "con cáo", phonics: "/fɒks/", emoji: "🦊", grade: 1, unit: 5, topic: "Animals", exampleSentence: "A clever brown fox.", distractors: ["flag", "fish", "dog"] },
        ],
        sentenceStructures: [
          {
            pattern: "I'd like some [Food], please.",
            vietnameseMeaning: "Cho tôi xin một ít [Món ăn].",
            sampleDialogue: [
              { speaker: "Customer", text: "Fish and chips, please.", textVi: "Cho tôi phần cá và khoai tây chiên nhé." },
              { speaker: "Seller", text: "Here you are! Enjoy your meal.", textVi: "Của bạn đây! Chúc ngon miệng." },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Ordering Food",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Do you like [Food]? ➔ Yes, I do.",
            vietnameseMeaning: "Bạn có thích [Món ăn] không? ➔ Có, mình thích.",
            sampleDialogue: [
              { speaker: "Lan", text: "Do you like fish?", textVi: "Bạn có thích cá không?" },
              { speaker: "Ben", text: "Yes, I do. It is yummy.", textVi: "Có chứ. Rất ngon." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Lunch Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Yummy Lunch",
          text: "We visit the fish and chip shop with Dad. Look at the national flag! The crispy fish is yummy.",
          translationVi: "Chúng mình đi tiệm cá và khoai tây chiên với bố. Nhìn lá cờ kìa! Món cá chiên giòn thật ngon miệng.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 1,
    unitNumber: 6,
    unitTitle: "In the Classroom",
    unitTitleVi: "Trong lớp học",
    theme: "Classroom Supplies",
    icon: "✏️",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /p/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Pp - sound /p/",
        vocabulary: [
          { id: "g1-u6-pen", word: "pen", clue: "Writing tool that uses ink.", vietnameseMeaning: "bút mực", phonics: "/pen/", emoji: "🖊️", grade: 1, unit: 6, topic: "School", exampleSentence: "This is a blue pen.", distractors: ["pencil", "pencil case", "picture"] },
          { id: "g1-u6-pencil", word: "pencil", clue: "Writing instrument with graphite lead.", vietnameseMeaning: "bút chì", phonics: "/ˈpen.səl/", emoji: "✏️", grade: 1, unit: 6, topic: "School", exampleSentence: "Sharpen your pencil.", distractors: ["pen", "ruler", "rubber"] },
          { id: "g1-u6-pencil-case", word: "pencil case", clue: "Pouch for holding school stationery.", vietnameseMeaning: "hộp bút", phonics: "/ˈpen.səl keɪs/", emoji: "👝", grade: 1, unit: 6, topic: "School", exampleSentence: "Put pencils in the case.", distractors: ["bag", "box", "desk"] },
          { id: "g1-u6-picture", word: "picture", clue: "Visual drawing or photograph.", vietnameseMeaning: "bức tranh", phonics: "/ˈpɪk.tʃər/", emoji: "🖼️", grade: 1, unit: 6, topic: "Art", exampleSentence: "Draw a nice picture.", distractors: ["pen", "book", "board"] },
        ],
        sentenceStructures: [
          {
            pattern: "Point to the [Item]. / This is a [Item].",
            vietnameseMeaning: "Chỉ vào [Đồ vật]. / Đây là một [Đồ vật].",
            sampleDialogue: [
              { speaker: "Teacher", text: "Point to the picture, please.", textVi: "Hãy chỉ vào bức tranh nào." },
              { speaker: "Student", text: "This is my red pencil case.", textVi: "Đây là hộp bút màu đỏ của em." },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Instructions",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Show me your [Item].",
            vietnameseMeaning: "Cho cô xem [Đồ vật] của em nào.",
            sampleDialogue: [
              { speaker: "Teacher", text: "Show me your pencil.", textVi: "Cho cô xem bút chì của em nào." },
              { speaker: "Student", text: "Here is my yellow pencil.", textVi: "Đây là bút chì vàng của em ạ." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Classroom Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Our Cheerful Class",
          text: "In our classroom, we have pens, pencils, and colorful pictures. We study English and sing songs together!",
          translationVi: "Trong lớp học, chúng mình có bút mực, bút chì và nhiều bức tranh rực rỡ. Chúng mình học tiếng Anh và hát vang cùng nhau!",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 1,
    unitNumber: 7,
    unitTitle: "In the Garden",
    unitTitleVi: "Trong vườn",
    theme: "Nature & Garden",
    icon: "🌻",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /ɡ/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Gg - sound /ɡ/",
        vocabulary: [
          { id: "g1-u7-gate", word: "gate", clue: "Movable barrier in an outdoor fence.", vietnameseMeaning: "cái cổng", phonics: "/ɡeɪt/", emoji: "🚪", grade: 1, unit: 7, topic: "Garden", exampleSentence: "Open the garden gate.", distractors: ["goat", "girl", "goose"] },
          { id: "g1-u7-goat", word: "goat", clue: "Horned farm animal that eats grass.", vietnameseMeaning: "con dê", phonics: "/ɡəʊt/", emoji: "🐐", grade: 1, unit: 7, topic: "Animals", exampleSentence: "The goat is eating leaves.", distractors: ["gate", "girl", "dog"] },
          { id: "g1-u7-girl", word: "girl", clue: "A young female child.", vietnameseMeaning: "bé gái", phonics: "/ɡɜːl/", emoji: "👧", grade: 1, unit: 7, topic: "People", exampleSentence: "The girl wears a hat.", distractors: ["boy", "gate", "goat"] },
          { id: "g1-u7-goose", word: "goose", clue: "Large long-necked water bird.", vietnameseMeaning: "con ngỗng", phonics: "/ɡuːs/", emoji: "🪿", grade: 1, unit: 7, topic: "Animals", exampleSentence: "A white goose in the pond.", distractors: ["duck", "goat", "hen"] },
        ],
        sentenceStructures: [
          {
            pattern: "There is a [Animal/Item] in the garden.",
            vietnameseMeaning: "Có một [Con vật/Đồ vật] ở trong vườn.",
            sampleDialogue: [
              { speaker: "Girl", text: "Look! A goat is near the gate.", textVi: "Nhìn kìa! Chú dê ở gần cổng." },
              { speaker: "Boy", text: "And a white goose is swimming.", textVi: "Và chú ngỗng trắng đang bơi." },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Animals in the Garden",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "What is that? ➔ It's a [Animal].",
            vietnameseMeaning: "Đó là con gì? ➔ Đó là một con [Con vật].",
            sampleDialogue: [
              { speaker: "Mai", text: "What is that by the tree?", textVi: "Con gì ở cạnh cây thế?" },
              { speaker: "Nam", text: "It's a cute goat.", textVi: "Đó là một chú dê dễ thương." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Garden Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Grandpa's Green Garden",
          text: "Grandpa has a big green garden. The girl opens the wooden gate to see flowers and the friendly goat.",
          translationVi: "Ông có một khu vườn xanh mát. Bé gái mở cổng gỗ để ngắm hoa và chú dê thân thiện.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 1,
    unitNumber: 8,
    unitTitle: "In the Park",
    unitTitleVi: "Trong công viên",
    theme: "Park & Outdoor",
    icon: "🌳",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /l/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Ll - sound /l/",
        vocabulary: [
          { id: "g1-u8-lake", word: "lake", clue: "A large body of freshwater.", vietnameseMeaning: "hồ nước", phonics: "/leɪk/", emoji: "🌊", grade: 1, unit: 8, topic: "Nature", exampleSentence: "Ducks swim in the lake.", distractors: ["leaf", "lemon", "lock"] },
          { id: "g1-u8-leaf", word: "leaf", clue: "Green foliage growing on trees.", vietnameseMeaning: "chiếc lá", phonics: "/liːf/", emoji: "🍃", grade: 1, unit: 8, topic: "Nature", exampleSentence: "A green leaf falls.", distractors: ["lake", "lock", "flower"] },
          { id: "g1-u8-lemon", word: "lemon", clue: "Sour yellow citrus fruit.", vietnameseMeaning: "quả chanh vàng", phonics: "/ˈlem.ən/", emoji: "🍋", grade: 1, unit: 8, topic: "Food", exampleSentence: "Cold lemonade with lemon.", distractors: ["apple", "leaf", "lake"] },
          { id: "g1-u8-lock", word: "lock", clue: "Mechanism opened with a key.", vietnameseMeaning: "ổ khóa", phonics: "/lɒk/", emoji: "🔒", grade: 1, unit: 8, topic: "Objects", exampleSentence: "Lock the park gate.", distractors: ["key", "leaf", "lemon"] },
        ],
        sentenceStructures: [
          {
            pattern: "Let's go to the [Place]! / Look at the [Item]!",
            vietnameseMeaning: "Cùng đến [Địa điểm] nào! / Nhìn vào [Đồ vật] kìa!",
            sampleDialogue: [
              { speaker: "Tim", text: "Let's walk around the lake.", textVi: "Cùng đi dạo quanh hồ nhé." },
              { speaker: "Hoa", text: "Look at the green leaves on the tree!", textVi: "Hãy nhìn những chiếc lá xanh trên cây kìa!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Park Activities",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "I can see a [Item].",
            vietnameseMeaning: "Mình có thể nhìn thấy [Đồ vật].",
            sampleDialogue: [
              { speaker: "Nam", text: "I can see the blue lake.", textVi: "Mình thấy hồ nước xanh." },
              { speaker: "Linh", text: "And pretty birds singing!", textVi: "Và chim hót thật hay!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Park Day",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Sunny Day in the Park",
          text: "On Sunday, we play happily in the park. We drink fresh lemonade and watch swans swimming in the blue lake.",
          translationVi: "Chủ nhật, chúng mình chơi vui vẻ trong công viên. Chúng mình uống nước chanh mát lạnh và ngắm thiên nga bơi trên hồ xanh.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 1,
    unitNumber: 9,
    unitTitle: "In the Shop",
    unitTitleVi: "Trong cửa hàng",
    theme: "Shopping & Items",
    icon: "🏬",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /s/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Ss - sound /s/",
        vocabulary: [
          { id: "g1-u9-sun", word: "sun", clue: "The bright star lighting our day.", vietnameseMeaning: "mặt trời", phonics: "/sʌn/", emoji: "☀️", grade: 1, unit: 9, topic: "Nature", exampleSentence: "The morning sun shines.", distractors: ["soap", "socks", "sea"] },
          { id: "g1-u9-soap", word: "soap", clue: "Cleanser used with water for washing.", vietnameseMeaning: "bánh xà phòng", phonics: "/səʊp/", emoji: "🧼", grade: 1, unit: 9, topic: "Shopping", exampleSentence: "Wash hands with soap.", distractors: ["sun", "socks", "soup"] },
          { id: "g1-u9-socks", word: "socks", clue: "Soft garments worn on feet inside shoes.", vietnameseMeaning: "đôi tất", phonics: "/sɒks/", emoji: "🧦", grade: 1, unit: 9, topic: "Clothes", exampleSentence: "A pair of warm socks.", distractors: ["shoes", "sun", "soap"] },
          { id: "g1-u9-sea", word: "sea", clue: "Vast expanse of salt water.", vietnameseMeaning: "biển", phonics: "/siː/", emoji: "🌊", grade: 1, unit: 9, topic: "Nature", exampleSentence: "Swim in the blue sea.", distractors: ["sun", "sand", "lake"] },
        ],
        sentenceStructures: [
          {
            pattern: "I want some [Item]. / Buy some [Item].",
            vietnameseMeaning: "Mình muốn mua [Đồ vật]. / Hãy mua [Đồ vật].",
            sampleDialogue: [
              { speaker: "Mom", text: "Let's buy warm socks in the shop.", textVi: "Hãy mua đôi tất ấm trong cửa hàng nhé." },
              { speaker: "Child", text: "And fragrant soap for washing hands!", textVi: "Và xà phòng thơm để rửa tay nữa ạ!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Choosing Items",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "How much is the [Item]?",
            vietnameseMeaning: "[Món đồ] này giá bao nhiêu?",
            sampleDialogue: [
              { speaker: "Buyer", text: "How much are the blue socks?", textVi: "Đôi tất xanh này giá bao nhiêu?" },
              { speaker: "Seller", text: "They are very cheap!", textVi: "Rất rẻ bạn nhé!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Shopping Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Weekend Shopping",
          text: "The morning sun is bright. Mom and I go into the shop to buy blue socks and rose soap.",
          translationVi: "Mặt trời buổi sáng rực rỡ. Mẹ và em vào cửa hàng mua đôi tất xanh và xà phòng hoa hồng.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 1,
    unitNumber: 10,
    unitTitle: "At the Zoo",
    unitTitleVi: "Tại sở thú",
    theme: "Wild Animals",
    icon: "🦁",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /z/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Zz - sound /z/",
        vocabulary: [
          { id: "g1-u10-zoo", word: "zoo", clue: "A park where wild animals live for people to visit.", vietnameseMeaning: "sở thú", phonics: "/zuː/", emoji: "🦁", grade: 1, unit: 10, topic: "Animals", exampleSentence: "Let's visit the city zoo.", distractors: ["zebra", "zip", "zero"] },
          { id: "g1-u10-zebra", word: "zebra", clue: "Striped black-and-white animal.", vietnameseMeaning: "ngựa vằn", phonics: "/ˈzeb.rə/", emoji: "🦓", grade: 1, unit: 10, topic: "Animals", exampleSentence: "The zebra runs fast.", distractors: ["zoo", "horse", "tiger"] },
          { id: "g1-u10-zip", word: "zip", clue: "Fastener with interlocking teeth on clothes.", vietnameseMeaning: "khóa kéo", phonics: "/zɪp/", emoji: "🤐", grade: 1, unit: 10, topic: "Objects", exampleSentence: "Pull up the jacket zip.", distractors: ["zero", "zoo", "zebra"] },
          { id: "g1-u10-zero", word: "zero", clue: "The number 0.", vietnameseMeaning: "số 0", phonics: "/ˈzɪə.rəʊ/", emoji: "0️⃣", grade: 1, unit: 10, topic: "Numbers", exampleSentence: "Count from zero to ten.", distractors: ["one", "zip", "zoo"] },
        ],
        sentenceStructures: [
          {
            pattern: "Look at the [Animal] at the zoo!",
            vietnameseMeaning: "Hãy nhìn [Con vật] ở sở thú kìa!",
            sampleDialogue: [
              { speaker: "Guide", text: "Look at the zebra with striped fur.", textVi: "Hãy nhìn chú ngựa vằn có lông sọc kìa." },
              { speaker: "Kids", text: "The zoo is so exciting!", textVi: "Sở thú thật là thú vị!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Animals at the Zoo",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Do you see the [Animal]? ➔ Yes, I do.",
            vietnameseMeaning: "Bạn có thấy [Con vật] không? ➔ Có, mình thấy.",
            sampleDialogue: [
              { speaker: "Tony", text: "Do you see the zebra?", textVi: "Bạn có thấy ngựa vằn không?" },
              { speaker: "Mai", text: "Yes, it is running fast.", textVi: "Có, nó đang chạy rất nhanh." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Zoo Trip",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Exciting Zoo Trip",
          text: "Today our class visits the zoo. We see zebras running fast and monkeys swinging in the green trees.",
          translationVi: "Hôm nay lớp mình đi thăm sở thú. Chúng mình thấy ngựa vằn chạy nhanh và khỉ đu cành cây xanh.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 1,
    unitNumber: 11,
    unitTitle: "At the Bus Stop",
    unitTitleVi: "Tại điểm dừng xe buýt",
    theme: "Transport & Phonics /ʌ/",
    icon: "🚌",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /ʌ/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Uu - sound /ʌ/",
        vocabulary: [
          { id: "g1-u11-bus", word: "bus", clue: "A large motor vehicle carrying passengers.", vietnameseMeaning: "xe buýt", phonics: "/bʌs/", emoji: "🚌", grade: 1, unit: 11, topic: "Transport", exampleSentence: "The yellow bus arrives.", distractors: ["truck", "sun", "cup"] },
          { id: "g1-u11-truck", word: "truck", clue: "A heavy motor vehicle for transporting goods.", vietnameseMeaning: "xe tải", phonics: "/trʌk/", emoji: "🚚", grade: 1, unit: 11, topic: "Transport", exampleSentence: "A big blue truck.", distractors: ["bus", "car", "bike"] },
          { id: "g1-u11-sun", word: "sun", clue: "The shining star in the sky.", vietnameseMeaning: "mặt trời", phonics: "/sʌn/", emoji: "☀️", grade: 1, unit: 11, topic: "Nature", exampleSentence: "The sun is shining bright.", distractors: ["bus", "cup", "truck"] },
          { id: "g1-u11-cup", word: "cup", clue: "A small bowl-shaped container for drinking.", vietnameseMeaning: "cái cốc/tách", phonics: "/kʌp/", emoji: "🥤", grade: 1, unit: 11, topic: "Objects", exampleSentence: "Hold the cup carefully.", distractors: ["bus", "truck", "sun"] },
        ],
        sentenceStructures: [
          {
            pattern: "Look at the [Vehicle/Object] at the bus stop.",
            vietnameseMeaning: "Hãy nhìn [Phương tiện/Đồ vật] tại trạm xe buýt kìa.",
            sampleDialogue: [
              { speaker: "Mai", text: "Look at the big bus!", textVi: "Nhìn chiếc xe buýt lớn kìa!" },
              { speaker: "Nam", text: "And a blue truck is coming too!", textVi: "Và một chiếc xe tải xanh cũng đang tới!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Waiting for the Bus",
        focus: "sentence_patterns",
        vocabulary: [
          { id: "g1-u11-runner", word: "runner", clue: "A person who runs for sport.", vietnameseMeaning: "người chạy bộ", phonics: "/ˈrʌn.ər/", emoji: "🏃", grade: 1, unit: 11, topic: "People", exampleSentence: "The fast runner runs past.", distractors: ["bus", "truck", "driver"] },
        ],
        sentenceStructures: [
          {
            pattern: "I see a [Person/Vehicle].",
            vietnameseMeaning: "Mình thấy một [Người/Phương tiện].",
            sampleDialogue: [
              { speaker: "Ben", text: "I see the school bus coming.", textVi: "Mình thấy xe buýt trường đang tới." },
              { speaker: "Lan", text: "Let's get on the bus together!", textVi: "Cùng lên xe buýt nào!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Bus Stop Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Morning at the Bus Stop",
          text: "Under the bright morning sun, we wait at the bus stop. A yellow bus and a red truck drive past. We wave happily to our friends!",
          translationVi: "Dưới ánh mặt trời buổi sáng, chúng mình đợi ở trạm xe buýt. Một chiếc xe buýt vàng và chiếc xe tải đỏ chạy qua. Chúng mình vui vẻ vẫy tay chào bạn bè!",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 1,
    unitNumber: 12,
    unitTitle: "At the Lake",
    unitTitleVi: "Tại hồ nước",
    theme: "Nature & Phonics /e/",
    icon: "🌊",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /e/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Ee - sound /e/",
        vocabulary: [
          { id: "g1-u12-bell", word: "bell", clue: "A hollow metallic device that rings.", vietnameseMeaning: "cái chuông", phonics: "/bel/", emoji: "🔔", grade: 1, unit: 12, topic: "Objects", exampleSentence: "Ring the little bell.", distractors: ["red", "pen", "ten"] },
          { id: "g1-u12-red", word: "red", clue: "The color of strawberries and apples.", vietnameseMeaning: "màu đỏ", phonics: "/red/", emoji: "🔴", grade: 1, unit: 12, topic: "Colors", exampleSentence: "A red boat on the lake.", distractors: ["bell", "pen", "leg"] },
          { id: "g1-u12-pen", word: "pen", clue: "An instrument for writing with ink.", vietnameseMeaning: "cái bút mực", phonics: "/pen/", emoji: "🖊️", grade: 1, unit: 12, topic: "School", exampleSentence: "Write with a red pen.", distractors: ["ten", "bell", "red"] },
          { id: "g1-u12-ten", word: "ten", clue: "The number 10.", vietnameseMeaning: "số 10", phonics: "/ten/", emoji: "🔟", grade: 1, unit: 12, topic: "Numbers", exampleSentence: "Count to ten ducks.", distractors: ["red", "pen", "bell"] },
        ],
        sentenceStructures: [
          {
            pattern: "I see [Number] [Objects] at the lake.",
            vietnameseMeaning: "Mình thấy [Số lượng] [Đồ vật] ở hồ nước.",
            sampleDialogue: [
              { speaker: "Lan", text: "Look at the red boat near the lake!", textVi: "Nhìn chiếc thuyền đỏ gần hồ nước kìa!" },
              { speaker: "Tony", text: "I count ten little bells.", textVi: "Mình đếm được mười chiếc chuông nhỏ." },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Lake Colours & Numbers",
        focus: "sentence_patterns",
        vocabulary: [
          { id: "g1-u12-leg", word: "leg", clue: "Limb used for standing and walking.", vietnameseMeaning: "cái chân", phonics: "/leɡ/", emoji: "🦵", grade: 1, unit: 12, topic: "Body", exampleSentence: "Stand on one leg.", distractors: ["pen", "red", "bell"] },
        ],
        sentenceStructures: [
          {
            pattern: "How many [Items] can you see?",
            vietnameseMeaning: "Bạn nhìn thấy bao nhiêu [Đồ vật]?",
            sampleDialogue: [
              { speaker: "Teacher", text: "How many red pens do you have?", textVi: "Em có bao nhiêu chiếc bút đỏ?" },
              { speaker: "Student", text: "I have ten red pens!", textVi: "Em có mười chiếc bút đỏ ạ!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Lake Picnic Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Picnic by the Lake",
          text: "We have a fun picnic by the lake. We draw pictures with red pens, ring small bells, and count ten white swans swimming peacefully.",
          translationVi: "Chúng mình có buổi dã ngoại vui vẻ bên hồ nước. Chúng mình vẽ tranh bằng bút đỏ, rung những chiếc chuông nhỏ và đếm 10 chú thiên nga trắng đang thong thả bơi lội.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 1,
    unitNumber: 13,
    unitTitle: "In the School Canteen",
    unitTitleVi: "Trong căng tin trường",
    theme: "Canteen & Food",
    icon: "🍲",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /n/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Nn - sound /n/",
        vocabulary: [
          { id: "g1-u13-nuts", word: "nuts", clue: "Hard-shelled nutritious dry seeds.", vietnameseMeaning: "các loại hạt", phonics: "/nʌts/", emoji: "🥜", grade: 1, unit: 13, topic: "Food", exampleSentence: "Eat healthy nuts.", distractors: ["noodles", "banana", "nose"] },
          { id: "g1-u13-noodles", word: "noodles", clue: "Long thin strands of cooked pasta/rice.", vietnameseMeaning: "mì / bún", phonics: "/ˈnuː.dəlz/", emoji: "🍜", grade: 1, unit: 13, topic: "Food", exampleSentence: "A bowl of hot noodles.", distractors: ["nuts", "rice", "soup"] },
          { id: "g1-u13-banana", word: "banana", clue: "Long curved sweet yellow fruit.", vietnameseMeaning: "quả chuối", phonics: "/bəˈnɑː.nə/", emoji: "🍌", grade: 1, unit: 13, topic: "Fruits", exampleSentence: "Peel the yellow banana.", distractors: ["nuts", "apple", "mango"] },
          { id: "g1-u13-nose", word: "nose", clue: "Facial feature for smelling.", vietnameseMeaning: "cái mũi", phonics: "/nəʊz/", emoji: "👃", grade: 1, unit: 13, topic: "Body", exampleSentence: "Touch your nose.", distractors: ["nuts", "noodles", "ear"] },
        ],
        sentenceStructures: [
          {
            pattern: "I have [Food] for lunch.",
            vietnameseMeaning: "Mình có món [Thức ăn] cho bữa trưa.",
            sampleDialogue: [
              { speaker: "Huy", text: "I have warm noodles for lunch.", textVi: "Mình ăn mì nóng cho bữa trưa." },
              { speaker: "Nga", text: "And I have a sweet banana!", textVi: "Và mình có một quả chuối ngọt!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Canteen Choices",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "What do you have? ➔ I have [Food].",
            vietnameseMeaning: "Bạn có món gì? ➔ Mình có [Món ăn].",
            sampleDialogue: [
              { speaker: "Mai", text: "What do you have for lunch?", textVi: "Bạn ăn gì trưa nay?" },
              { speaker: "Nam", text: "I have noodles and nuts.", textVi: "Mình ăn mì và hạt dinh dưỡng." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Canteen Break Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Canteen Lunch Break",
          text: "During break time, students gather in the school canteen. Some eat yummy noodles, and some share crunchy nuts and bananas.",
          translationVi: "Giờ giải lao, học sinh tụ họp ở căng tin trường. Bạn ăn mì ngon lành, bạn cùng chia sẻ những hạt giòn thơm và chuối ngọt.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 1,
    unitNumber: 14,
    unitTitle: "In the Toy Shop",
    unitTitleVi: "Trong tiệm đồ chơi",
    theme: "Toys & Games",
    icon: "🧸",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /t/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Tt - sound /t/",
        vocabulary: [
          { id: "g1-u14-teddy-bear", word: "teddy bear", clue: "Soft stuffed plush toy bear.", vietnameseMeaning: "gấu bông", phonics: "/ˈted.i beər/", emoji: "🧸", grade: 1, unit: 14, topic: "Toys", exampleSentence: "Hug the soft teddy bear.", distractors: ["tiger", "top", "turtle"] },
          { id: "g1-u14-tiger", word: "tiger", clue: "Striped wild toy cat.", vietnameseMeaning: "con hổ", phonics: "/ˈtaɪ.ɡər/", emoji: "🐯", grade: 1, unit: 14, topic: "Toys", exampleSentence: "Look at the toy tiger.", distractors: ["teddy bear", "top", "turtle"] },
          { id: "g1-u14-top", word: "top", clue: "A spinning toy on a peg.", vietnameseMeaning: "con quay", phonics: "/tɒp/", emoji: "🪀", grade: 1, unit: 14, topic: "Toys", exampleSentence: "Spin the colorful top.", distractors: ["tiger", "teddy bear", "ball"] },
          { id: "g1-u14-turtle", word: "turtle", clue: "A slow reptile with a hard shell.", vietnameseMeaning: "con rùa", phonics: "/ˈtɜː.təl/", emoji: "🐢", grade: 1, unit: 14, topic: "Toys", exampleSentence: "A cute green turtle toy.", distractors: ["top", "tiger", "bear"] },
        ],
        sentenceStructures: [
          {
            pattern: "I want a [Toy]. / Look at the [Toy]!",
            vietnameseMeaning: "Mình muốn một [Đồ chơi]. / Hãy nhìn [Đồ chơi] kìa!",
            sampleDialogue: [
              { speaker: "Child", text: "Look at the cute teddy bear!", textVi: "Nhìn chú gấu bông xinh xắn kìa!" },
              { speaker: "Dad", text: "And a spinning top on the shelf!", textVi: "Và một con quay đang quay trên kệ kìa!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Choosing Toys",
        focus: "sentence_patterns",
        vocabulary: [
          { id: "g1-u14-table", word: "table", clue: "Piece of furniture with flat top and legs.", vietnameseMeaning: "cái bàn", phonics: "/ˈteɪ.bəl/", emoji: "🪵", grade: 1, unit: 14, topic: "Furniture", exampleSentence: "Toys on the table.", distractors: ["chair", "desk", "bed"] },
        ],
        sentenceStructures: [
          {
            pattern: "Do you like the [Toy]? ➔ Yes, I do.",
            vietnameseMeaning: "Bạn có thích [Đồ chơi] không? ➔ Có, mình thích.",
            sampleDialogue: [
              { speaker: "Lan", text: "Do you like this teddy bear?", textVi: "Bạn có thích gấu bông này không?" },
              { speaker: "Hoa", text: "Yes, it is very soft!", textVi: "Có, nó mềm lắm!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Toy Shop Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "The Wonderful Toy Shop",
          text: "The toy shop has spinning tops, toy tigers, green turtles, and soft teddy bears on the table. Every child smiles happily!",
          translationVi: "Tiệm đồ chơi có những con quay, hổ đồ chơi, rùa xanh và gấu bông êm ái trên bàn. Em nhỏ nào cũng cười rạng rỡ!",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 1,
    unitNumber: 15,
    unitTitle: "At the Football Match",
    unitTitleVi: "Tại trận đấu bóng đá",
    theme: "Sports & Phonics /ɪ/",
    icon: "⚽",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /ɪ/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Ii - sound /ɪ/",
        vocabulary: [
          { id: "g1-u15-kick", word: "kick", clue: "To strike forcefully with the foot.", vietnameseMeaning: "đá (bóng)", phonics: "/kɪk/", emoji: "🦵", grade: 1, unit: 15, topic: "Sports", exampleSentence: "Kick the ball into the goal!", distractors: ["milk", "chicken", "big"] },
          { id: "g1-u15-milk", word: "milk", clue: "Nutritious white liquid drink.", vietnameseMeaning: "sữa tươi", phonics: "/mɪlk/", emoji: "🥛", grade: 1, unit: 15, topic: "Drinks", exampleSentence: "Drink cold milk after playing.", distractors: ["kick", "chicken", "fit"] },
          { id: "g1-u15-chicken", word: "chicken", clue: "A domestic fowl kept for eggs or meat.", vietnameseMeaning: "thịt gà / con gà", phonics: "/ˈtʃɪk.ɪn/", emoji: "🍗", grade: 1, unit: 15, topic: "Food", exampleSentence: "Delicious roast chicken.", distractors: ["milk", "kick", "big"] },
          { id: "g1-u15-big", word: "big", clue: "Of considerable size or extent.", vietnameseMeaning: "to lớn / khổng lồ", phonics: "/bɪɡ/", emoji: "🐘", grade: 1, unit: 15, topic: "Adjectives", exampleSentence: "A big football stadium.", distractors: ["kick", "milk", "chicken"] },
        ],
        sentenceStructures: [
          {
            pattern: "Kick the [Item]! / Drink some [Drink]!",
            vietnameseMeaning: "Đá [Đồ vật]! / Uống một ít [Đồ uống]!",
            sampleDialogue: [
              { speaker: "Coach", text: "Kick the ball, Bill!", textVi: "Đá bóng đi, Bill ơi!" },
              { speaker: "Bill", text: "Goal! We scored a goal!", textVi: "Vào rồi! Chúng mình ghi bàn rồi!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Football Actions",
        focus: "sentence_patterns",
        vocabulary: [
          { id: "g1-u15-fit", word: "fit", clue: "In good physical health and condition.", vietnameseMeaning: "khỏe khoắn / cân đối", phonics: "/fɪt/", emoji: "💪", grade: 1, unit: 15, topic: "Health", exampleSentence: "Running keeps us fit.", distractors: ["big", "kick", "milk"] },
        ],
        sentenceStructures: [
          {
            pattern: "Can you kick the ball? ➔ Yes, I can.",
            vietnameseMeaning: "Bạn có thể đá bóng không? ➔ Có, mình có thể.",
            sampleDialogue: [
              { speaker: "Ba", text: "Can you kick the football?", textVi: "Bạn có biết đá bóng không?" },
              { speaker: "Ben", text: "Yes, I can kick it very far!", textVi: "Có chứ, mình đá xa lắm!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Football Match Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Exciting Football Match",
          text: "At the big football stadium, our class cheers loudly. Bill kicks the ball into the goal! After the match, we drink fresh milk together.",
          translationVi: "Tại sân vận động bóng đá lớn, cả lớp reo hò cổ vũ cuồng nhiệt. Bạn Bill đá bóng thẳng vào khung thành! Sau trận đấu, cả nhóm cùng uống sữa tươi mát.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 1,
    unitNumber: 16,
    unitTitle: "At Home",
    unitTitleVi: "Ở nhà",
    theme: "Home & Phonics /h/",
    icon: "🏡",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /h/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Hh - sound /h/",
        vocabulary: [
          { id: "g1-u16-hat", word: "hat", clue: "Headwear worn for warmth or sun protection.", vietnameseMeaning: "cái mũ/nón", phonics: "/hæt/", emoji: "👒", grade: 1, unit: 16, topic: "Clothes", exampleSentence: "Wear a yellow sun hat.", distractors: ["house", "horse", "hand"] },
          { id: "g1-u16-house", word: "house", clue: "A building for human habitation.", vietnameseMeaning: "ngôi nhà", phonics: "/haʊs/", emoji: "🏡", grade: 1, unit: 16, topic: "Home", exampleSentence: "Our sweet home house.", distractors: ["hat", "horse", "hand"] },
          { id: "g1-u16-horse", word: "horse", clue: "A large four-legged animal that gallops.", vietnameseMeaning: "con ngựa", phonics: "/hɔːs/", emoji: "🐴", grade: 1, unit: 16, topic: "Animals", exampleSentence: "A toy brown horse.", distractors: ["house", "hat", "hand"] },
          { id: "g1-u16-hand", word: "hand", clue: "The end part of a person's arm beyond the wrist.", vietnameseMeaning: "bàn tay", phonics: "/hænd/", emoji: "✋", grade: 1, unit: 16, topic: "Body", exampleSentence: "Clap your hands.", distractors: ["hat", "house", "horse"] },
        ],
        sentenceStructures: [
          {
            pattern: "I am at home. / This is my [Item/Family].",
            vietnameseMeaning: "Mình đang ở nhà. / Đây là [Đồ vật/Gia đình] của mình.",
            sampleDialogue: [
              { speaker: "Tony", text: "This is my cozy house.", textVi: "Đây là ngôi nhà ấm cúng của mình." },
              { speaker: "Mai", text: "Look! A toy horse is on the chair.", textVi: "Nhìn kìa! Một chú ngựa đồ chơi ở trên ghế." },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Family & Home Routines",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Wave your [Body part]! / Put on your [Item]!",
            vietnameseMeaning: "Vẫy [Bộ phận cơ thể] nào! / Đội [Đồ vật] vào nào!",
            sampleDialogue: [
              { speaker: "Mom", text: "Wave your hand and say hello!", textVi: "Hãy vẫy tay và nói xin chào nào!" },
              { speaker: "Child", text: "Hello! Welcome to our house!", textVi: "Xin chào! Chào mừng đến với nhà của chúng em!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Sweet Home Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Happy Days at Home",
          text: "At home on Sunday, we clap our hands and sing English songs. Dad wears his funny hat, and we play with our toy horse in the living room.",
          translationVi: "Ở nhà vào Chủ nhật, chúng mình vỗ tay và hát những bài hát tiếng Anh. Bố đội chiếc mũ ngộ nghĩnh và chúng mình chơi với chú ngựa đồ chơi ở phòng khách.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
];
