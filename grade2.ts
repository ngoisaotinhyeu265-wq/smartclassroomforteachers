import { GlobalSuccessUnit } from "../../types";

export const GRADE_2_UNITS: GlobalSuccessUnit[] = [
  {
    grade: 2,
    unitNumber: 1,
    unitTitle: "At My Birthday Party",
    unitTitleVi: "Tại bữa tiệc sinh nhật của mình",
    theme: "Party & Food",
    icon: "🎂",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /p/ & Party Food",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Pp - sound /p/",
        vocabulary: [
          { id: "g2-u1-popcorn", word: "popcorn", clue: "Puffed corn snack eaten at parties or movies.", vietnameseMeaning: "bắp rang bơ", phonics: "/ˈpɒp.kɔːn/", emoji: "🍿", grade: 2, unit: 1, topic: "Food", exampleSentence: "I like sweet popcorn.", distractors: ["pizza", "pasta", "cake"] },
          { id: "g2-u1-pizza", word: "pizza", clue: "Flat round baked dough topped with cheese and tomato.", vietnameseMeaning: "bánh pi-da / bánh pizza", phonics: "/ˈpiːt.sə/", emoji: "🍕", grade: 2, unit: 1, topic: "Food", exampleSentence: "Have a slice of hot pizza.", distractors: ["popcorn", "pasta", "bread"] },
          { id: "g2-u1-pasta", word: "pasta", clue: "Italian noodles served with delicious sauce.", vietnameseMeaning: "mì Ý / nui", phonics: "/ˈpæs.tə/", emoji: "🍝", grade: 2, unit: 1, topic: "Food", exampleSentence: "Delicious cheese pasta.", distractors: ["popcorn", "pizza", "rice"] },
          { id: "g2-u1-party", word: "party", clue: "A celebratory social gathering.", vietnameseMeaning: "bữa tiệc", phonics: "/ˈpɑː.ti/", emoji: "🎉", grade: 2, unit: 1, topic: "Celebration", exampleSentence: "Welcome to my birthday party!", distractors: ["school", "popcorn", "pizza"] },
        ],
        sentenceStructures: [
          {
            pattern: "I like [Food]. / Pass me the [Food], please.",
            vietnameseMeaning: "Mình thích [Món ăn]. / Làm ơn đưa cho mình [Món ăn] nhé.",
            sampleDialogue: [
              { speaker: "Nam", text: "I like warm pizza and popcorn.", textVi: "Mình thích bánh pizza ấm và bắp rang bơ." },
              { speaker: "Mai", text: "Pass me the pasta, please.", textVi: "Làm ơn đưa mình đĩa mì Ý nhé." },
            ],
          },
        ],
        chantOrAudioScript: "P-p-popcorn, p-p-pizza, p-p-pasta, p-p-party! Happy birthday to you!",
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Party Invitations & Food Choices",
        focus: "sentence_patterns",
        vocabulary: [
          { id: "g2-u1-cake", word: "cake", clue: "Sweet birthday baked treat.", vietnameseMeaning: "bánh sinh nhật", phonics: "/keɪk/", emoji: "🎂", grade: 2, unit: 1, topic: "Food", exampleSentence: "Blow out the candles on the cake.", distractors: ["pizza", "popcorn", "pasta"] },
        ],
        sentenceStructures: [
          {
            pattern: "Do you like [Food]? ➔ Yes, I do. / No, I don't.",
            vietnameseMeaning: "Bạn có thích [Món ăn] không? ➔ Có, mình thích. / Không, mình không.",
            sampleDialogue: [
              { speaker: "Host", text: "Do you like popcorn?", textVi: "Bạn có thích bắp rang bơ không?" },
              { speaker: "Guest", text: "Yes, I do! It is yummy.", textVi: "Có chứ! Bắp rang rất ngon." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Birthday Celebration Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "My Joyful Birthday Party",
          text: "Today is my eighth birthday party. My friends bring gifts. We eat delicious pizza, butter popcorn, and pasta. Everyone sings the Happy Birthday song loudly!",
          translationVi: "Hôm nay là tiệc sinh nhật 8 tuổi của mình. Các bạn mang quà đến tặng. Chúng mình ăn bánh pizza thơm ngon, bắp rang bơ và mì Ý. Mọi người cùng hát vang bài ca chúc mừng sinh nhật!",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 2,
    unitNumber: 2,
    unitTitle: "In the Backyard",
    unitTitleVi: "Trong sân sau",
    theme: "Backyard & Toys",
    icon: "🪁",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /k/ & /aɪ/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Kk - sound /k/ & diphthong /aɪ/",
        vocabulary: [
          { id: "g2-u2-kitten", word: "kitten", clue: "A playful young baby cat.", vietnameseMeaning: "mèo con", phonics: "/ˈkɪt.ən/", emoji: "🐱", grade: 2, unit: 2, topic: "Animals", exampleSentence: "The cute kitten plays with yarn.", distractors: ["kite", "bike", "duck"] },
          { id: "g2-u2-kite", word: "kite", clue: "Light toy frame flown high in the wind.", vietnameseMeaning: "con diều", phonics: "/kaɪt/", emoji: "🪁", grade: 2, unit: 2, topic: "Toys", exampleSentence: "Fly a red kite in the backyard.", distractors: ["kitten", "bike", "car"] },
          { id: "g2-u2-bike", word: "bike", clue: "Two-wheeled pedal vehicle.", vietnameseMeaning: "xe đạp", phonics: "/baɪk/", emoji: "🚲", grade: 2, unit: 2, topic: "Vehicles", exampleSentence: "Ride a bike in the yard.", distractors: ["kite", "kitten", "ball"] },
          { id: "g2-u2-yard", word: "yard", clue: "Open grassy ground surrounding a house.", vietnameseMeaning: "sân nhà", phonics: "/jɑːd/", emoji: "🏡", grade: 2, unit: 2, topic: "Home", exampleSentence: "Play games in the green backyard.", distractors: ["kite", "bike", "room"] },
        ],
        sentenceStructures: [
          {
            pattern: "Look at the [Item/Animal] in the backyard!",
            vietnameseMeaning: "Hãy nhìn [Đồ vật/Con vật] ở trong sân sau kìa!",
            sampleDialogue: [
              { speaker: "Tony", text: "Look at the fluffy kitten!", textVi: "Hãy nhìn chú mèo con lông xù kìa!" },
              { speaker: "Mai", text: "And Nam is flying a high kite.", textVi: "Và bạn Nam đang thả một cánh diều bay cao." },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Backyard Games",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "What is he/she doing? ➔ He/She is [Action].",
            vietnameseMeaning: "Cậu/Cô ấy đang làm gì? ➔ Cậu/Cô ấy đang [Hành động].",
            sampleDialogue: [
              { speaker: "Lan", text: "What is Ba doing?", textVi: "Bạn Ba đang làm gì thế?" },
              { speaker: "Huy", text: "He is riding his new bike.", textVi: "Bạn ấy đang đạp chiếc xe mới." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Backyard Fun Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Afternoon in the Backyard",
          text: "In the sunny backyard, green grass smells fresh. A little kitten chases a butterfly while children fly colourful kites and ride bicycles happily.",
          translationVi: "Trong sân sau đầy nắng, cỏ xanh tỏa hương thơm ngát. Chú mèo con đuổi theo chú bướm trong khi các bạn nhỏ thả những cánh diều rực rỡ và đạp xe vui tươi.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 2,
    unitNumber: 3,
    unitTitle: "At the Seaside",
    unitTitleVi: "Bên bờ biển",
    theme: "Seaside & Vacation",
    icon: "🏖️",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /s/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Ss - sound /s/",
        vocabulary: [
          { id: "g2-u3-sea", word: "sea", clue: "Vast expanse of blue salt water.", vietnameseMeaning: "biển", phonics: "/siː/", emoji: "🌊", grade: 2, unit: 3, topic: "Nature", exampleSentence: "The sea is calm and blue.", distractors: ["sand", "sail", "sun"] },
          { id: "g2-u3-sand", word: "sand", clue: "Granular mineral grains on beaches.", vietnameseMeaning: "bãi cát", phonics: "/sænd/", emoji: "🏖️", grade: 2, unit: 3, topic: "Nature", exampleSentence: "We build castles on the sand.", distractors: ["sea", "sail", "sun"] },
          { id: "g2-u3-sail", word: "sail", clue: "Fabric catching wind on a boat.", vietnameseMeaning: "cánh buồm / đi thuyền buồm", phonics: "/seɪl/", emoji: "⛵", grade: 2, unit: 3, topic: "Vehicles", exampleSentence: "A white boat sail.", distractors: ["sea", "sand", "ship"] },
          { id: "g2-u3-sun", word: "sun", clue: "Bright warm celestial star.", vietnameseMeaning: "mặt trời", phonics: "/sʌn/", emoji: "☀️", grade: 2, unit: 3, topic: "Nature", exampleSentence: "The summer sun shines.", distractors: ["sea", "sand", "sail"] },
        ],
        sentenceStructures: [
          {
            pattern: "Look at the [Object] in the sea! / I play on the [Place].",
            vietnameseMeaning: "Hãy nhìn [Đồ vật] trên biển kìa! / Mình chơi trên [Địa điểm].",
            sampleDialogue: [
              { speaker: "Tony", text: "Look! A white sail is on the blue sea.", textVi: "Nhìn kìa! Một cánh buồm trắng trên biển xanh." },
              { speaker: "Peter", text: "Let's build a sandcastle on the golden sand!", textVi: "Cùng xây lâu đài cát trên bãi cát vàng nào!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Beach Fun",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "What are you doing? ➔ I am playing with [Item].",
            vietnameseMeaning: "Bạn đang làm gì thế? ➔ Mình đang chơi với [Đồ vật].",
            sampleDialogue: [
              { speaker: "Mary", text: "What are you doing on the beach?", textVi: "Bạn đang làm gì trên bãi biển thế?" },
              { speaker: "Tony", text: "I'm swimming in the cool sea!", textVi: "Mình đang bơi trong làn nước biển mát lạnh!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Seaside Holiday Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Seaside Holiday",
          text: "Under the golden summer sun, happy children collect shells on the sand and watch sailboats glide across the crystal blue sea.",
          translationVi: "Dưới ánh nắng vàng rực rỡ của mùa hè, các bạn nhỏ vui vẻ nhặt vỏ sò trên bãi cát và ngắm những cánh buồm lướt êm đềm trên làn nước biển xanh trong.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 2,
    unitNumber: 4,
    unitTitle: "In the Countryside",
    unitTitleVi: "Ở miền quê",
    theme: "Countryside & Nature",
    icon: "🌾",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /r/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Rr - sound /r/",
        vocabulary: [
          { id: "g2-u4-rainbow", word: "rainbow", clue: "An arch of colors formed in the sky by sunlight in rain.", vietnameseMeaning: "cầu vồng", phonics: "/ˈreɪn.bəʊ/", emoji: "🌈", grade: 2, unit: 4, topic: "Nature", exampleSentence: "Look at the colorful rainbow.", distractors: ["river", "road", "red"] },
          { id: "g2-u4-river", word: "river", clue: "A large natural stream of water.", vietnameseMeaning: "dòng sông", phonics: "/ˈrɪv.ər/", emoji: "🏞️", grade: 2, unit: 4, topic: "Nature", exampleSentence: "The clear river flows peacefully.", distractors: ["rainbow", "road", "lake"] },
          { id: "g2-u4-road", word: "road", clue: "A wide way leading from one place to another.", vietnameseMeaning: "con đường", phonics: "/rəʊd/", emoji: "🛣️", grade: 2, unit: 4, topic: "Places", exampleSentence: "Walk along the country road.", distractors: ["river", "rainbow", "house"] },
          { id: "g2-u4-hill", word: "hill", clue: "Naturally raised area of land, lower than a mountain.", vietnameseMeaning: "ngọn đồi", phonics: "/hɪl/", emoji: "⛰️", grade: 2, unit: 4, topic: "Nature", exampleSentence: "Climb up the green hill.", distractors: ["road", "river", "rainbow"] },
        ],
        sentenceStructures: [
          {
            pattern: "I can see a [Nature item] on the [Place].",
            vietnameseMeaning: "Mình có thể nhìn thấy [Thiên nhiên] ở trên [Địa điểm].",
            sampleDialogue: [
              { speaker: "Huy", text: "I can see a rainbow across the sky!", textVi: "Mình nhìn thấy một chiếc cầu vồng bắc ngang trời!" },
              { speaker: "Nga", text: "And the long road goes to the river.", textVi: "Và con đường dài dẫn tới bờ sông." },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Countryside Sights",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Look at the [Item]! / It is very [Adjective].",
            vietnameseMeaning: "Hãy nhìn [Đồ vật]! / Nó rất [Tính từ].",
            sampleDialogue: [
              { speaker: "Ba", text: "Look at the quiet river.", textVi: "Hãy nhìn dòng sông êm đềm kìa." },
              { speaker: "Bill", text: "The countryside is so peaceful!", textVi: "Miền quê thật là thanh bình!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Countryside Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "A Peaceful Day in the Countryside",
          text: "After the rain, a magnificent rainbow shines above the green hills. We walk along the quiet road near the river and listen to singing birds.",
          translationVi: "Sau cơn mưa, một chiếc cầu vồng tuyệt đẹp tỏa sáng trên những ngọn đồi xanh. Chúng mình đi dạo dọc theo con đường êm ả gần dòng sông và lắng nghe tiếng chim hót líu lo.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 2,
    unitNumber: 5,
    unitTitle: "In the Classroom",
    unitTitleVi: "Trong lớp học",
    theme: "Classroom & Animals",
    icon: "🦋",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /b/ & /d/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letters Bb & Dd - sounds /b/ & /d/",
        vocabulary: [
          { id: "g2-u5-bird", word: "bird", clue: "A feathered creature that flies in the sky.", vietnameseMeaning: "con chim", phonics: "/bɜːd/", emoji: "🐦", grade: 2, unit: 5, topic: "Animals", exampleSentence: "A little bird sings outside the window.", distractors: ["butterfly", "book", "desk"] },
          { id: "g2-u5-butterfly", word: "butterfly", clue: "An insect with large colorful wings.", vietnameseMeaning: "con bướm", phonics: "/ˈbʌt.ə.flaɪ/", emoji: "🦋", grade: 2, unit: 5, topic: "Animals", exampleSentence: "A colorful butterfly in the classroom.", distractors: ["bird", "book", "desk"] },
          { id: "g2-u5-book", word: "book", clue: "A set of printed pages for reading.", vietnameseMeaning: "quyển sách", phonics: "/bʊk/", emoji: "📖", grade: 2, unit: 5, topic: "School", exampleSentence: "Open your English book.", distractors: ["bird", "butterfly", "desk"] },
          { id: "g2-u5-desk", word: "desk", clue: "A table used for studying in school.", vietnameseMeaning: "bàn học", phonics: "/desk/", emoji: "🛋️", grade: 2, unit: 5, topic: "School", exampleSentence: "Sit nicely at your desk.", distractors: ["book", "bird", "door"] },
        ],
        sentenceStructures: [
          {
            pattern: "There is a [Animal/Item] on the [Object].",
            vietnameseMeaning: "Có một [Con vật/Đồ vật] ở trên [Đồ vật].",
            sampleDialogue: [
              { speaker: "Minh", text: "Look! A butterfly is on my desk.", textVi: "Nhìn kìa! Một chú bướm đang đậu trên bàn học của mình." },
              { speaker: "Hoa", text: "And a bird is singing outside!", textVi: "Và một chú chim đang hót ngoài hiên!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Classroom Observations",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "What is that? ➔ That is a [Item].",
            vietnameseMeaning: "Kia là cái gì? ➔ Kia là một [Đồ vật].",
            sampleDialogue: [
              { speaker: "Teacher", text: "What is that by the window?", textVi: "Cái gì ở gần cửa sổ thế em?" },
              { speaker: "Student", text: "That is a colorful butterfly!", textVi: "Đó là một chú bướm rực rỡ ạ!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Classroom Discovery Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Nature in Our Classroom",
          text: "During our English lesson, a yellow butterfly flutters through the open window and lands gently on my desk. A small bird chirps happily on the tree branch.",
          translationVi: "Trong giờ học tiếng Anh, một chú bướm vàng bay qua ô cửa sổ mở và nhẹ nhàng đậu lên bàn học của em. Một chú chim nhỏ ríu rít vui mừng trên cành cây.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 2,
    unitNumber: 6,
    unitTitle: "On the Farm",
    unitTitleVi: "Ở trang trại",
    theme: "Farm Life & Animals",
    icon: "🚜",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /h/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Hh - sound /h/",
        vocabulary: [
          { id: "g2-u6-horse", word: "horse", clue: "A large four-legged animal that gallops.", vietnameseMeaning: "con ngựa", phonics: "/hɔːs/", emoji: "🐴", grade: 2, unit: 6, topic: "Animals", exampleSentence: "The strong horse runs fast.", distractors: ["house", "hen", "duck"] },
          { id: "g2-u6-house", word: "house", clue: "A building on the farm where people live.", vietnameseMeaning: "ngôi nhà", phonics: "/haʊs/", emoji: "🏡", grade: 2, unit: 6, topic: "Home", exampleSentence: "A lovely farmhouse.", distractors: ["horse", "hen", "hat"] },
          { id: "g2-u6-hen", word: "hen", clue: "A female chicken that lays fresh eggs.", vietnameseMeaning: "con gà mái", phonics: "/hen/", emoji: "🐔", grade: 2, unit: 6, topic: "Animals", exampleSentence: "The hen is in the yard.", distractors: ["horse", "duck", "house"] },
          { id: "g2-u6-duck", word: "duck", clue: "A water bird that swims in the pond.", vietnameseMeaning: "con vịt", phonics: "/dʌk/", emoji: "🦆", grade: 2, unit: 6, topic: "Animals", exampleSentence: "A duck swims on the pond.", distractors: ["hen", "horse", "house"] },
        ],
        sentenceStructures: [
          {
            pattern: "I can see a [Animal] on the farm.",
            vietnameseMeaning: "Mình nhìn thấy một [Con vật] ở trang trại.",
            sampleDialogue: [
              { speaker: "Farmer", text: "Look at the horse and the hen.", textVi: "Hãy nhìn chú ngựa và chú gà mái kìa." },
              { speaker: "Kid", text: "The horse is big and strong!", textVi: "Chú ngựa to lớn và khỏe mạnh quá!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Farm Animals & Counting",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "How many [Animals] are there? ➔ There are [Number] [Animals].",
            vietnameseMeaning: "Có bao nhiêu [Con vật]? ➔ Có [Số lượng] [Con vật].",
            sampleDialogue: [
              { speaker: "Tony", text: "How many hens are there?", textVi: "Có bao nhiêu con gà mái thế?" },
              { speaker: "Farmer", text: "There are four white hens.", textVi: "Có bốn con gà mái trắng." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: A Day on the Farm Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "A Day on Uncle Tom's Farm",
          text: "We visit Uncle Tom's sunny farm. We feed bread to the white hens, pet the brown horse, and see the cozy red farmhouse by the green pond.",
          translationVi: "Chúng mình đến thăm trang trại ngập nắng của chú Tom. Chúng mình cho đàn gà mái trắng ăn bánh mì, vuốt ve chú ngựa nâu và ngắm ngôi nhà nông trại đỏ ấm cúng cạnh ao xanh.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 2,
    unitNumber: 7,
    unitTitle: "In the Kitchen",
    unitTitleVi: "Trong nhà bếp",
    theme: "Kitchen & Cooking",
    icon: "🍳",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /dʒ/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Jj - sound /dʒ/",
        vocabulary: [
          { id: "g2-u7-juice", word: "juice", clue: "Liquid extracted from fresh fruits.", vietnameseMeaning: "nước ép trái cây", phonics: "/dʒuːs/", emoji: "🧃", grade: 2, unit: 7, topic: "Drinks", exampleSentence: "Drink cold orange juice.", distractors: ["jam", "jelly", "milk"] },
          { id: "g2-u7-jam", word: "jam", clue: "Sweet fruit spread for morning bread.", vietnameseMeaning: "mứt hoa quả", phonics: "/dʒæm/", emoji: "🍓", grade: 2, unit: 7, topic: "Food", exampleSentence: "Strawberry jam on toast.", distractors: ["juice", "jelly", "butter"] },
          { id: "g2-u7-jelly", word: "jelly", clue: "Sweet wobbly gelatin dessert.", vietnameseMeaning: "thạch", phonics: "/ˈdʒel.i/", emoji: "🍮", grade: 2, unit: 7, topic: "Food", exampleSentence: "Colorful fruit jelly.", distractors: ["jam", "juice", "cake"] },
          { id: "g2-u7-kitchen", word: "kitchen", clue: "Room where meals are prepared.", vietnameseMeaning: "nhà bếp", phonics: "/ˈkɪtʃ.ən/", emoji: "🍳", grade: 2, unit: 7, topic: "Home", exampleSentence: "Mom cooks in the kitchen.", distractors: ["bedroom", "garden", "room"] },
        ],
        sentenceStructures: [
          {
            pattern: "Would you like some [Food/Drink]? ➔ Yes, please.",
            vietnameseMeaning: "Bạn có muốn dùng một ít [Đồ ăn/Uống] không? ➔ Vâng, cho mình xin.",
            sampleDialogue: [
              { speaker: "Mom", text: "Would you like some orange juice?", textVi: "Con có muốn uống nước cam không?" },
              { speaker: "Lan", text: "Yes, please! I love fruit juice.", textVi: "Vâng ạ! Con rất thích nước ép trái cây." },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Kitchen Breakfast Helpers",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "What is on the table? ➔ There is [Food].",
            vietnameseMeaning: "Có gì trên bàn thế? ➔ Có [Món ăn].",
            sampleDialogue: [
              { speaker: "Dad", text: "What is on the breakfast table?", textVi: "Có gì trên bàn ăn sáng thế?" },
              { speaker: "Lan", text: "There is fresh bread, strawberry jam, and jelly.", textVi: "Có bánh mì tươi, mứt dâu và thạch ạ." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Kitchen Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Sunday Breakfast in the Kitchen",
          text: "In our warm kitchen, Mom toasts bread with sweet strawberry jam. Dad squeezes fresh orange juice, and we enjoy breakfast together with cheerful smiles.",
          translationVi: "Trong gian bếp ấm cúng, mẹ nướng bánh mì phết mứt dâu ngọt ngào. Bố vắt nước cam tươi và cả nhà cùng thưởng thức bữa sáng với những nụ cười rạng rỡ.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 2,
    unitNumber: 8,
    unitTitle: "In the Village",
    unitTitleVi: "Ở ngôi làng",
    theme: "Village & Country",
    icon: "🏘️",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /v/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Vv - sound /v/",
        vocabulary: [
          { id: "g2-u8-village", word: "village", clue: "A small settlement in the countryside.", vietnameseMeaning: "ngôi làng", phonics: "/ˈvɪl.ɪdʒ/", emoji: "🏘️", grade: 2, unit: 8, topic: "Places", exampleSentence: "Our peaceful green village.", distractors: ["van", "volleyball", "town"] },
          { id: "g2-u8-van", word: "van", clue: "A motor vehicle used for carrying people or cargo.", vietnameseMeaning: "xe tải nhỏ / xe thùng", phonics: "/væn/", emoji: "🚐", grade: 2, unit: 8, topic: "Vehicles", exampleSentence: "A blue van drives on the road.", distractors: ["village", "car", "bus"] },
          { id: "g2-u8-volleyball", word: "volleyball", clue: "A game in which a large ball is hit over a high net.", vietnameseMeaning: "môn bóng chuyền / quả bóng chuyền", phonics: "/ˈvɒl.i.bɔːl/", emoji: "🏐", grade: 2, unit: 8, topic: "Sports", exampleSentence: "Play volleyball in the yard.", distractors: ["football", "basketball", "tennis"] },
          { id: "g2-u8-river", word: "river", clue: "A flowing natural water stream through the village.", vietnameseMeaning: "dòng sông", phonics: "/ˈrɪv.ər/", emoji: "🏞️", grade: 2, unit: 8, topic: "Nature", exampleSentence: "A quiet river near the village.", distractors: ["lake", "sea", "village"] },
        ],
        sentenceStructures: [
          {
            pattern: "We visit the [Place]. / We play [Sport].",
            vietnameseMeaning: "Chúng mình thăm [Địa điểm]. / Chúng mình chơi [Môn thể thao].",
            sampleDialogue: [
              { speaker: "Ben", text: "We visit Grandma's village today.", textVi: "Hôm nay chúng mình về thăm làng của bà." },
              { speaker: "Linh", text: "Let's play volleyball by the river!", textVi: "Cùng chơi bóng chuyền bên bờ sông nhé!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Village Life & Activities",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "What can you see in the village?",
            vietnameseMeaning: "Bạn nhìn thấy gì ở ngôi làng?",
            sampleDialogue: [
              { speaker: "Tony", text: "What can you see in the village?", textVi: "Bạn thấy gì ở ngôi làng thế?" },
              { speaker: "Mai", text: "I can see green trees, white vans, and a clean river.", textVi: "Mình thấy cây xanh, những chiếc xe thùng trắng và dòng sông trong lành." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Village Trip Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Visiting Grandma's Village",
          text: "We travel in a blue van to Grandma's village. Children play volleyball happily in the community yard near the bamboo trees and the winding river.",
          translationVi: "Chúng mình đi xe thùng xanh về thăm làng của bà. Các bạn nhỏ chơi bóng chuyền vui vẻ ở sân chung gần hàng tre và dòng sông uốn lượn.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 2,
    unitNumber: 9,
    unitTitle: "In the Grocery Store",
    unitTitleVi: "Trong cửa hàng tạp hóa",
    theme: "Grocery & Shopping",
    icon: "🏬",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /ɡ/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Gg - sound /ɡ/",
        vocabulary: [
          { id: "g2-u9-goat", word: "goat", clue: "A horned farm mammal that eats grass.", vietnameseMeaning: "con dê", phonics: "/ɡəʊt/", emoji: "🐐", grade: 2, unit: 9, topic: "Animals", exampleSentence: "A friendly white goat.", distractors: ["girl", "garden", "grapes"] },
          { id: "g2-u9-girl", word: "girl", clue: "A young female child.", vietnameseMeaning: "bé gái / cô bé", phonics: "/ɡɜːl/", emoji: "👧", grade: 2, unit: 9, topic: "People", exampleSentence: "The girl is holding a basket.", distractors: ["goat", "boy", "garden"] },
          { id: "g2-u9-garden", word: "garden", clue: "A piece of ground used for growing flowers and vegetables.", vietnameseMeaning: "khu vườn", phonics: "/ˈɡɑː.dən/", emoji: "🌻", grade: 2, unit: 9, topic: "Nature", exampleSentence: "A garden with fresh fruits.", distractors: ["store", "goat", "girl"] },
          { id: "g2-u9-grapes", word: "grapes", clue: "Clusters of sweet purple or green berries.", vietnameseMeaning: "chùm nho", phonics: "/ɡreɪps/", emoji: "🍇", grade: 2, unit: 9, topic: "Fruits", exampleSentence: "Sweet purple grapes.", distractors: ["orange", "apple", "mango"] },
        ],
        sentenceStructures: [
          {
            pattern: "How much are the [Fruits]? ➔ They are [Price].",
            vietnameseMeaning: "Những quả [Trái cây] này giá bao nhiêu? ➔ Chúng có giá [Giá].",
            sampleDialogue: [
              { speaker: "Customer", text: "How much are the sweet grapes?", textVi: "Những chùm nho ngọt này giá bao nhiêu?" },
              { speaker: "Shopkeeper", text: "They are very fresh and delicious!", textVi: "Nho rất tươi và ngon ngọt bạn nhé!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Grocery Shopping List",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "I want to buy [Items].",
            vietnameseMeaning: "Mình muốn mua [Món đồ].",
            sampleDialogue: [
              { speaker: "Mom", text: "What do we buy at the grocery store?", textVi: "Chúng ta mua gì ở tiệm tạp hóa thế con?" },
              { speaker: "Girl", text: "We buy fresh grapes and garden vegetables.", textVi: "Chúng ta mua nho tươi và rau trong vườn ạ." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Grocery Store Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Shopping with the Little Girl",
          text: "The little girl walks to the neighborhood grocery store with Mom. They choose purple grapes, see a wooden toy goat, and buy fresh vegetables from the garden.",
          translationVi: "Bé gái cùng mẹ đi bộ đến cửa hàng tạp hóa khu phố. Họ chọn những chùm nho tím, ngắm chú dê đồ chơi bằng gỗ và mua rau tươi từ vườn.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 2,
    unitNumber: 10,
    unitTitle: "At the Zoo",
    unitTitleVi: "Tại sở thú",
    theme: "Zoo Animals & Phonics /m/",
    icon: "🐒",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /m/",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Mm - sound /m/",
        vocabulary: [
          { id: "g2-u10-monkey", word: "monkey", clue: "A playful primate that climbs trees.", vietnameseMeaning: "con khỉ", phonics: "/ˈmʌŋ.ki/", emoji: "🐒", grade: 2, unit: 10, topic: "Animals", exampleSentence: "The monkey eats a mango.", distractors: ["mouse", "mango", "zebra"] },
          { id: "g2-u10-mouse", word: "mouse", clue: "A small rodent with whiskers.", vietnameseMeaning: "con chuột", phonics: "/maʊs/", emoji: "🐭", grade: 2, unit: 10, topic: "Animals", exampleSentence: "A tiny grey mouse.", distractors: ["monkey", "cat", "mango"] },
          { id: "g2-u10-mango", word: "mango", clue: "A sweet tropical yellow fruit.", vietnameseMeaning: "quả xoài", phonics: "/ˈmæŋ.ɡəʊ/", emoji: "🥭", grade: 2, unit: 10, topic: "Fruits", exampleSentence: "The monkey holds a sweet mango.", distractors: ["monkey", "mouse", "apple"] },
          { id: "g2-u10-zebra", word: "zebra", clue: "A wild African animal with black and white stripes.", vietnameseMeaning: "con ngựa vằn", phonics: "/ˈzeb.rə/", emoji: "🦓", grade: 2, unit: 10, topic: "Animals", exampleSentence: "The zebra runs on the grass.", distractors: ["monkey", "horse", "tiger"] },
        ],
        sentenceStructures: [
          {
            pattern: "Look at the [Animal]! / The [Animal] is eating [Food].",
            vietnameseMeaning: "Hãy nhìn [Con vật] kìa! / [Con vật] đang ăn [Thức ăn].",
            sampleDialogue: [
              { speaker: "Guide", text: "Look at the playful monkey in the tree!", textVi: "Hãy nhìn chú khỉ tinh nghịch trên cây kìa!" },
              { speaker: "Kids", text: "It is eating a yellow mango!", textVi: "Nó đang ăn quả xoài vàng!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Describing Animals at the Zoo",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Do you see the [Animal]? ➔ Yes, I do.",
            vietnameseMeaning: "Bạn có nhìn thấy [Con vật] không? ➔ Có, mình thấy.",
            sampleDialogue: [
              { speaker: "Tony", text: "Do you see the little mouse near the tree?", textVi: "Bạn có thấy chú chuột nhỏ gần gốc cây không?" },
              { speaker: "Mai", text: "Yes, it is very quick!", textVi: "Có, nó nhanh nhẹn lắm!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Zoo Adventure Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Exciting Zoo Trip",
          text: "At the city zoo, our class gathers to see wild animals. The funny monkeys swing on vines and eat sweet mangoes, while zebras graze peacefully.",
          translationVi: "Tại sở thú thành phố, lớp chúng mình tụ họp để ngắm các loài động vật hoang dã. Những chú khỉ vui nhộn đu dây và ăn xoài ngọt, trong khi những chú ngựa vằn thong dong gặm cỏ.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 2,
    unitNumber: 11,
    unitTitle: "In the Playground",
    unitTitleVi: "Trong sân chơi",
    theme: "Playground & Action Verbs",
    icon: "🛝",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Action Verbs (Ride, Run, Read, Rope)",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Rr - initial /r/ in action verbs",
        vocabulary: [
          { id: "g2-u11-ride", word: "ride", clue: "To sit on and control a bicycle or horse.", vietnameseMeaning: "lái xe / cưỡi / đi xe", phonics: "/raɪd/", emoji: "🚴", grade: 2, unit: 11, topic: "Actions", exampleSentence: "Ride a bike in the playground.", distractors: ["run", "read", "rope"] },
          { id: "g2-u11-run", word: "run", clue: "To move fast on foot.", vietnameseMeaning: "chạy", phonics: "/rʌn/", emoji: "🏃", grade: 2, unit: 11, topic: "Actions", exampleSentence: "Run fast with your friends.", distractors: ["ride", "read", "walk"] },
          { id: "g2-u11-read", word: "read", clue: "To look at and understand printed words in a book.", vietnameseMeaning: "đọc sách", phonics: "/riːd/", emoji: "📖", grade: 2, unit: 11, topic: "Actions", exampleSentence: "Read a story on the bench.", distractors: ["run", "ride", "write"] },
          { id: "g2-u11-rope", word: "rope", clue: "Thick cord used for skipping games.", vietnameseMeaning: "dây nhảy / sợi dây", phonics: "/rəʊp/", emoji: "🪢", grade: 2, unit: 11, topic: "Playground", exampleSentence: "Skip rope with friends.", distractors: ["ride", "run", "read"] },
        ],
        sentenceStructures: [
          {
            pattern: "I can [Action] in the playground. / Let's [Action]!",
            vietnameseMeaning: "Mình có thể [Hành động] trong sân chơi. / Cùng [Hành động] nào!",
            sampleDialogue: [
              { speaker: "Tony", text: "Let's run and skip rope in the playground!", textVi: "Cùng chạy và nhảy dây trong sân chơi nào!" },
              { speaker: "Linda", text: "Yes! And Mai is reading a comic book on the bench.", textVi: "Được chứ! Và bạn Mai đang đọc truyện trên ghế dài." },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What are you doing in the playground?",
        focus: "sentence_patterns",
        vocabulary: [
          { id: "g2-u11-slide", word: "slide", clue: "Smooth slope to slide down.", vietnameseMeaning: "cầu trượt", phonics: "/slaɪd/", emoji: "🛝", grade: 2, unit: 11, topic: "Playground", exampleSentence: "Slide down the play slide.", distractors: ["rope", "bench", "bike"] },
        ],
        sentenceStructures: [
          {
            pattern: "What are you doing? ➔ I am [Action]-ing.",
            vietnameseMeaning: "Bạn đang làm gì thế? ➔ Mình đang [Hành động].",
            sampleDialogue: [
              { speaker: "Teacher", text: "What are you doing, Nam?", textVi: "Em đang làm gì thế Nam?" },
              { speaker: "Nam", text: "I am riding my bicycle!", textVi: "Em đang đạp xe đạp ạ!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Break Time Fun Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Sunny Break Time",
          text: "The school bell rings! Children rush to the playground. Some run fast, some skip rope, some ride bicycles, and others read stories happily under the shady tree.",
          translationVi: "Chuông trường reo vang! Các bạn nhỏ ùa ra sân chơi. Bạn thì chạy nhanh, bạn nhảy dây, bạn đạp xe và có bạn đọc truyện vui vẻ dưới bóng cây mát.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 2,
    unitNumber: 12,
    unitTitle: "At the Cafe",
    unitTitleVi: "Tại quán cà phê",
    theme: "Cafe & Drinks",
    icon: "☕",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /k/ in Cafe Words",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Cc - sound /k/",
        vocabulary: [
          { id: "g2-u12-cake", word: "cake", clue: "Sweet baked dessert with frosting.", vietnameseMeaning: "bánh ngọt", phonics: "/keɪk/", emoji: "🍰", grade: 2, unit: 12, topic: "Food", exampleSentence: "A piece of chocolate cake.", distractors: ["coffee", "cat", "cup"] },
          { id: "g2-u12-coffee", word: "coffee", clue: "A warm brewed aromatic drink.", vietnameseMeaning: "cà phê", phonics: "/ˈkɒf.i/", emoji: "☕", grade: 2, unit: 12, topic: "Drinks", exampleSentence: "Dad drinks hot coffee.", distractors: ["cake", "milk", "tea"] },
          { id: "g2-u12-cat", word: "cat", clue: "A small furry pet that rests in the cafe.", vietnameseMeaning: "con mèo", phonics: "/kæt/", emoji: "🐱", grade: 2, unit: 12, topic: "Animals", exampleSentence: "A cute cafe cat naps on the chair.", distractors: ["cake", "coffee", "cup"] },
          { id: "g2-u12-cup", word: "cup", clue: "Small drinking vessel with handle.", vietnameseMeaning: "cái cốc / tách", phonics: "/kʌp/", emoji: "🥤", grade: 2, unit: 12, topic: "Dining", exampleSentence: "A cup of warm cocoa.", distractors: ["cake", "coffee", "cat"] },
        ],
        sentenceStructures: [
          {
            pattern: "I'd like a [Item], please. / There is a [Item] in the cafe.",
            vietnameseMeaning: "Cho tôi xin một [Món đồ]. / Có một [Món đồ] ở quán cà phê.",
            sampleDialogue: [
              { speaker: "Customer", text: "I'd like a cup of coffee and a cake, please.", textVi: "Cho tôi một tách cà phê và một chiếc bánh ngọt nhé." },
              { speaker: "Waiter", text: "Here you are! Enjoy your time.", textVi: "Của quý khách đây ạ! Chúc quý khách ngon miệng." },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Ordering at the Cafe",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Do you have [Item]? ➔ Yes, we do.",
            vietnameseMeaning: "Quán có [Món này] không ạ? ➔ Có ạ.",
            sampleDialogue: [
              { speaker: "Lan", text: "Do you have fruit cake?", textVi: "Quán có bánh ngọt trái cây không ạ?" },
              { speaker: "Waiter", text: "Yes, we do. It is fresh today!", textVi: "Có ạ, bánh hôm nay rất tươi ngon!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Cozy Cafe Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Weekend at the Garden Cafe",
          text: "On Sunday morning, we sit at the garden cafe. Dad drinks hot coffee from a white cup, I eat sweet berry cake, and a friendly cat purrs softly beside our table.",
          translationVi: "Sáng Chủ nhật, chúng mình ngồi tại quán cà phê sân vườn. Bố uống cà phê nóng từ chiếc tách trắng, em ăn bánh ngọt dâu tây và chú mèo thân thiện kêu gừ gừ êm ái bên cạnh bàn.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 2,
    unitNumber: 13,
    unitTitle: "In the Maths Class",
    unitTitleVi: "Trong giờ toán",
    theme: "Maths & Numbers",
    icon: "🔢",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Numbers & Counting (Two, Ten, Twelve, Twenty)",
        focus: "vocabulary_phonics",
        phonicsSound: "Sounds /t/ & /n/ in numbers",
        vocabulary: [
          { id: "g2-u13-two", word: "two", clue: "The number 2.", vietnameseMeaning: "số 2", phonics: "/tuː/", emoji: "2️⃣", grade: 2, unit: 13, topic: "Numbers", exampleSentence: "Two plus two is four.", distractors: ["ten", "twelve", "twenty"] },
          { id: "g2-u13-ten", word: "ten", clue: "The number 10.", vietnameseMeaning: "số 10", phonics: "/ten/", emoji: "🔟", grade: 2, unit: 13, topic: "Numbers", exampleSentence: "Ten fingers on two hands.", distractors: ["two", "twelve", "twenty"] },
          { id: "g2-u13-twelve", word: "twelve", clue: "The number 12.", vietnameseMeaning: "số 12", phonics: "/twelv/", emoji: "1️⃣2️⃣", grade: 2, unit: 13, topic: "Numbers", exampleSentence: "Twelve pencils in the box.", distractors: ["two", "ten", "twenty"] },
          { id: "g2-u13-twenty", word: "twenty", clue: "The number 20.", vietnameseMeaning: "số 20", phonics: "/ˈtwen.ti/", emoji: "2️⃣0️⃣", grade: 2, unit: 13, topic: "Numbers", exampleSentence: "Count up to twenty.", distractors: ["ten", "twelve", "two"] },
        ],
        sentenceStructures: [
          {
            pattern: "How many [Items] are there? ➔ There are [Number] [Items].",
            vietnameseMeaning: "Có bao nhiêu [Đồ vật]? ➔ Có [Số lượng] [Đồ vật].",
            sampleDialogue: [
              { speaker: "Teacher", text: "How many books are on the desk?", textVi: "Có bao nhiêu quyển sách trên bàn?" },
              { speaker: "Students", text: "There are twelve books!", textVi: "Có mười hai quyển sách ạ!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Simple Math Addition & Subtraction",
        focus: "sentence_patterns",
        vocabulary: [
          { id: "g2-u13-number", word: "number", clue: "Mathematical symbol used for counting.", vietnameseMeaning: "con số", phonics: "/ˈnʌm.bər/", emoji: "🔢", grade: 2, unit: 13, topic: "Maths", exampleSentence: "Write the number ten.", distractors: ["two", "book", "desk"] },
          { id: "g2-u13-plus", word: "plus", clue: "Addition operator (+).", vietnameseMeaning: "cộng (+)", phonics: "/plʌs/", emoji: "➕", grade: 2, unit: 13, topic: "Maths", exampleSentence: "Ten plus ten is twenty.", distractors: ["minus", "number", "two"] },
        ],
        sentenceStructures: [
          {
            pattern: "What is [Num] plus [Num]? ➔ It is [Result].",
            vietnameseMeaning: "[Số] cộng [Số] bằng bao nhiêu? ➔ Bằng [Kết quả].",
            sampleDialogue: [
              { speaker: "Teacher", text: "What is ten plus two?", textVi: "Mười cộng hai bằng bao nhiêu?" },
              { speaker: "Students", text: "It is twelve!", textVi: "Bằng mười hai ạ!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Fun Maths Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Counting Fun in Maths Class",
          text: "In our energetic maths class, Teacher writes big numbers on the blackboard: two, ten, twelve, and twenty. We count colorful counters quickly and solve math puzzles together!",
          translationVi: "Trong giờ toán đầy hứng khởi, thầy giáo viết các con số lớn lên bảng đen: 2, 10, 12 và 20. Chúng mình đếm que tính sắc màu thật nhanh và cùng nhau giải toán!",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 2,
    unitNumber: 14,
    unitTitle: "At Home",
    unitTitleVi: "Ở nhà",
    theme: "Home & Phonics /w/",
    icon: "🪟",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /w/ (Window, Watch, Water, Wall)",
        focus: "vocabulary_phonics",
        phonicsSound: "Letter Ww - sound /w/",
        vocabulary: [
          { id: "g2-u14-window", word: "window", clue: "Glass opening in a wall to let in light.", vietnameseMeaning: "cửa sổ", phonics: "/ˈwɪn.dəʊ/", emoji: "🪟", grade: 2, unit: 14, topic: "Home", exampleSentence: "Look out the bright window.", distractors: ["watch", "water", "wall"] },
          { id: "g2-u14-watch", word: "watch", clue: "A small timepiece worn on the wrist.", vietnameseMeaning: "đồng hồ đeo tay", phonics: "/wɒtʃ/", emoji: "⌚", grade: 2, unit: 14, topic: "Accessories", exampleSentence: "Check time on the watch.", distractors: ["window", "water", "wall"] },
          { id: "g2-u14-water", word: "water", clue: "Clear essential liquid for drinking.", vietnameseMeaning: "nước uống", phonics: "/ˈwɔː.tər/", emoji: "💧", grade: 2, unit: 14, topic: "Drinks", exampleSentence: "Drink a glass of clean water.", distractors: ["window", "watch", "wall"] },
          { id: "g2-u14-wall", word: "wall", clue: "A continuous vertical brick or wood structure.", vietnameseMeaning: "bức tường", phonics: "/wɔːl/", emoji: "🧱", grade: 2, unit: 14, topic: "Home", exampleSentence: "A picture hangs on the white wall.", distractors: ["window", "watch", "water"] },
        ],
        sentenceStructures: [
          {
            pattern: "Look at the [Item]! / Drink some [Drink].",
            vietnameseMeaning: "Hãy nhìn [Đồ vật]! / Uống một ít [Đồ uống].",
            sampleDialogue: [
              { speaker: "Mom", text: "Look through the clean window.", textVi: "Hãy nhìn qua khung cửa sổ sạch sẽ kìa." },
              { speaker: "Child", text: "And I am drinking a glass of fresh water.", textVi: "Và con đang uống một cốc nước mát ạ." },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: House Rooms & Activities",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Where is the [Item]? ➔ It is on/near the [Place].",
            vietnameseMeaning: "[Đồ vật] ở đâu? ➔ Nó ở trên/gần [Vị trí].",
            sampleDialogue: [
              { speaker: "Dad", text: "Where is my wristwatch?", textVi: "Đồng hồ đeo tay của bố ở đâu thế con?" },
              { speaker: "Lan", text: "It is on the table near the wall.", textVi: "Nó ở trên bàn cạnh bức tường ạ." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Peaceful Afternoon at Home Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Sunny Afternoon at Home",
          text: "At home, sunlight streams through the wide glass window. A picture hangs on the blue wall. Dad checks his wristwatch, and we drink cool water after school.",
          translationVi: "Ở nhà, ánh nắng chiếu qua ô cửa sổ kính rộng. Một bức tranh treo trên bức tường xanh. Bố xem đồng hồ đeo tay và chúng mình uống nước mát sau giờ học.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 2,
    unitNumber: 15,
    unitTitle: "In the Clothes Shop",
    unitTitleVi: "Trong cửa hàng quần áo",
    theme: "Clothes & Phonics /ʃ/",
    icon: "👗",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /ʃ/ (Shirt, Shoes, Shorts)",
        focus: "vocabulary_phonics",
        phonicsSound: "Digraph Sh - sound /ʃ/",
        vocabulary: [
          { id: "g2-u15-shirt", word: "shirt", clue: "A garment for the upper body with sleeves and collar.", vietnameseMeaning: "áo sơ mi", phonics: "/ʃɜːt/", emoji: "👔", grade: 2, unit: 15, topic: "Clothes", exampleSentence: "A smart white shirt.", distractors: ["shoes", "shorts", "skirt"] },
          { id: "g2-u15-shoes", word: "shoes", clue: "Outer foot coverings with sturdy soles.", vietnameseMeaning: "đôi giày", phonics: "/ʃuːz/", emoji: "👟", grade: 2, unit: 15, topic: "Clothes", exampleSentence: "Put on your blue shoes.", distractors: ["shirt", "shorts", "socks"] },
          { id: "g2-u15-shorts", word: "shorts", clue: "Trousers ending above the knees.", vietnameseMeaning: "quần soóc / quần đùi", phonics: "/ʃɔːts/", emoji: "🩳", grade: 2, unit: 15, topic: "Clothes", exampleSentence: "Cool summer shorts.", distractors: ["shirt", "shoes", "skirt"] },
          { id: "g2-u15-skirt", word: "skirt", clue: "Lower-body garment hanging from the waist.", vietnameseMeaning: "chân váy", phonics: "/skɜːt/", emoji: "👗", grade: 2, unit: 15, topic: "Clothes", exampleSentence: "A pretty pink skirt.", distractors: ["shirt", "shorts", "shoes"] },
        ],
        sentenceStructures: [
          {
            pattern: "I want a [Clothing]. / Put on your [Clothing].",
            vietnameseMeaning: "Mình muốn một chiếc [Quần áo]. / Đi/Mặc [Quần áo] vào nào.",
            sampleDialogue: [
              { speaker: "Customer", text: "I want a white shirt and blue shorts.", textVi: "Tôi muốn mua một chiếc áo sơ mi trắng và quần soóc xanh." },
              { speaker: "Shopkeeper", text: "Here they are! They look great on you.", textVi: "Của bạn đây! Bạn mặc trông rất đẹp." },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Choosing New Clothes",
        focus: "sentence_patterns",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Do you like these [Clothes]? ➔ Yes, I do.",
            vietnameseMeaning: "Bạn có thích những [Quần áo] này không? ➔ Có, mình thích.",
            sampleDialogue: [
              { speaker: "Mom", text: "Do you like these new sports shoes?", textVi: "Con có thích đôi giày thể thao mới này không?" },
              { speaker: "Lan", text: "Yes, Mom! They are very comfortable.", textVi: "Có mẹ ơi! Chúng đi êm lắm ạ." },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Clothes Shopping Day Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Shopping for New Summer Clothes",
          text: "We visit the bright clothes shop on Saturday. Dad tries on a white shirt, Mom picks a stylish skirt, and I choose cool blue shorts and comfy shoes for school.",
          translationVi: "Chúng mình đi mua sắm ở cửa hàng quần áo sáng sủa vào thứ Bảy. Bố thử áo sơ mi trắng, mẹ chọn chiếc chân váy thời trang và em chọn quần soóc xanh cùng đôi giày êm ái đến trường.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
  {
    grade: 2,
    unitNumber: 16,
    unitTitle: "At the Campsite",
    unitTitleVi: "Tại khu cắm trại",
    theme: "Camping & Outdoor Adventure",
    icon: "⛺",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Phonics /t/ & /p/ in Camping (Tent, Teapot, Blanket, Campfire)",
        focus: "vocabulary_phonics",
        phonicsSound: "Sounds /t/ & /p/ - tent & teapot",
        vocabulary: [
          { id: "g2-u16-tent", word: "tent", clue: "Portable cloth shelter supported by poles.", vietnameseMeaning: "cái lều", phonics: "/tent/", emoji: "⛺", grade: 2, unit: 16, topic: "Camping", exampleSentence: "We sleep inside the green tent.", distractors: ["teapot", "blanket", "torch"] },
          { id: "g2-u16-teapot", word: "teapot", clue: "A pot with a handle, spout, and lid for brewing tea.", vietnameseMeaning: "ấm trà", phonics: "/ˈtiː.pɒt/", emoji: "🫖", grade: 2, unit: 16, topic: "Camping", exampleSentence: "Boil water in the campsite teapot.", distractors: ["tent", "cup", "blanket"] },
          { id: "g2-u16-blanket", word: "blanket", clue: "A large warm woolen or fabric cover.", vietnameseMeaning: "chiếc chăn ấm", phonics: "/ˈblæŋ.kɪt/", emoji: "🛌", grade: 2, unit: 16, topic: "Camping", exampleSentence: "Wrap up in a warm blanket.", distractors: ["tent", "teapot", "mat"] },
          { id: "g2-u16-campfire", word: "campfire", clue: "An open outdoor fire at a camp.", vietnameseMeaning: "lửa trại", phonics: "/ˈkæmp.faɪər/", emoji: "🔥", grade: 2, unit: 16, topic: "Camping", exampleSentence: "Sing around the bright campfire.", distractors: ["tent", "stars", "teapot"] },
        ],
        sentenceStructures: [
          {
            pattern: "We are at the campsite. / Look at the [Item]!",
            vietnameseMeaning: "Chúng mình đang ở khu cắm trại. / Hãy nhìn [Đồ vật] kìa!",
            sampleDialogue: [
              { speaker: "Guide", text: "Let's set up the big green tent!", textVi: "Cùng dựng chiếc lều xanh lớn nào!" },
              { speaker: "Campers", text: "And warm tea in the teapot by the campfire!", textVi: "Và hâm trà nóng trong ấm bên lửa trại nhé!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Campfire Activities & Songs",
        focus: "sentence_patterns",
        vocabulary: [
          { id: "g2-u16-stars", word: "stars", clue: "Twinkling points of light in the night sky.", vietnameseMeaning: "những ngôi sao", phonics: "/stɑːrz/", emoji: "✨", grade: 2, unit: 16, topic: "Nature", exampleSentence: "Look at the shining stars.", distractors: ["moon", "sun", "tent"] },
        ],
        sentenceStructures: [
          {
            pattern: "What are you doing at the camp? ➔ We are [Action].",
            vietnameseMeaning: "Các bạn đang làm gì ở khu cắm trại? ➔ Chúng mình đang [Hành động].",
            sampleDialogue: [
              { speaker: "Leader", text: "What are you doing tonight?", textVi: "Tối nay các em làm gì thế?" },
              { speaker: "Students", text: "We are singing songs by the campfire under the stars!", textVi: "Chúng em đang hát bên lửa trại dưới những vì sao ạ!" },
            ],
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Starry Camping Night Story",
        focus: "reading_communication",
        readingMiniStory: {
          title: "Magical Night at the Campsite",
          text: "We pitch our tent on the green hill. At night, we brew warm tea in the teapot, wrap in soft blankets, and sing cheerful camp songs around the crackling campfire under thousands of sparkling stars.",
          translationVi: "Chúng mình dựng lều trên đồi cỏ xanh. Ban đêm, chúng mình đun trà ấm trong ấm, quấn chăn mềm và hát vang bài ca cắm trại bên đống lửa bập bùng dưới hàng ngàn vì sao lấp lánh.",
        },
        vocabulary: [],
        sentenceStructures: [],
      },
    ],
  },
];
