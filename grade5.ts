import { GlobalSuccessUnit } from "../../types";

export const GRADE_5_UNITS: GlobalSuccessUnit[] = [
  // ==========================================
  // SEMESTER 1 (UNITS 1 - 10) - GLOBAL SUCCESS 5 (GDPT 2018)
  // ==========================================
  {
    grade: 5,
    unitNumber: 1,
    unitTitle: "All about me!",
    unitTitleVi: "Tất cả về mình!",
    theme: "Me and My Friends",
    icon: "👦",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Introducing Yourself (Class & Living Area)",
        focus: "vocabulary_phonics",
        phonicsSound: "/s/ in city vs /k/ in countryside",
        vocabulary: [
          {
            id: "g5-u1-l1-v1",
            word: "city",
            clue: "A large and busy town with tall buildings and many vehicles",
            vietnameseMeaning: "thành phố",
            phonics: "/ˈsɪti/",
            emoji: "🏙️",
            grade: 5,
            unit: 1,
            topic: "Living Areas",
            exampleSentence: "I live in a busy and modern city.",
            distractors: ["river", "forest", "desert"]
          },
          {
            id: "g5-u1-l1-v2",
            word: "countryside",
            clue: "Land outside towns and cities with green fields and farms",
            vietnameseMeaning: "vùng nông thôn, quê",
            phonics: "/ˈkʌntrisaɪd/",
            emoji: "🌾",
            grade: 5,
            unit: 1,
            topic: "Living Areas",
            exampleSentence: "My grandparents live in the peaceful countryside.",
            distractors: ["airport", "supermarket", "stadium"]
          },
          {
            id: "g5-u1-l1-v3",
            word: "class",
            clue: "A group of students who meet together to study a subject",
            vietnameseMeaning: "lớp học",
            phonics: "/klɑːs/",
            emoji: "🏫",
            grade: 5,
            unit: 1,
            topic: "School Life",
            exampleSentence: "I am in Class 5A at Nguyen Du Primary School.",
            distractors: ["hotel", "hospital", "cinema"]
          },
          {
            id: "g5-u1-l1-v4",
            word: "tell",
            clue: "To speak to someone to give them information",
            vietnameseMeaning: "kể, nói cho biết",
            phonics: "/tel/",
            emoji: "🗣️",
            grade: 5,
            unit: 1,
            topic: "Communication",
            exampleSentence: "Can you tell me about yourself?",
            distractors: ["listen", "watch", "sleep"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Can you tell me about yourself? - I'm in Class [name]. I live in the [city / countryside].",
            vietnameseMeaning: "Bạn có thể kể cho mình nghe về bạn không? - Mình học lớp [tên lớp]. Mình sống ở [thành phố / nông thôn].",
            sampleDialogue: [
              { speaker: "Mary", text: "Can you tell me about yourself, An?", textVi: "Bạn có thể kể cho mình về bạn được không, An?" },
              { speaker: "An", text: "I'm in Class 5A. I live in the city with my parents.", textVi: "Mình học lớp 5A. Mình sống ở thành phố cùng bố mẹ." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Talking about Favourite Things",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u1-l2-v1",
            word: "dolphin",
            clue: "A friendly and highly intelligent sea mammal that jumps above waves",
            vietnameseMeaning: "con cá heo",
            phonics: "/ˈdɒlfɪn/",
            emoji: "🐬",
            grade: 5,
            unit: 1,
            topic: "Favourite Animals",
            exampleSentence: "My favourite sea animal is the dolphin.",
            distractors: ["crocodile", "snake", "spider"]
          },
          {
            id: "g5-u1-l2-v2",
            word: "table tennis",
            clue: "An indoor game played with small bats and a lightweight ball over a table",
            vietnameseMeaning: "môn bóng bàn",
            phonics: "/ˈteɪbl tenɪs/",
            emoji: "🏓",
            grade: 5,
            unit: 1,
            topic: "Sports & Hobbies",
            exampleSentence: "What's your favourite sport? - It's table tennis.",
            distractors: ["chess", "boxing", "surfing"]
          },
          {
            id: "g5-u1-l2-v3",
            word: "sandwich",
            clue: "Two slices of bread with meat, cheese, or salad between them",
            vietnameseMeaning: "bánh mì kẹp",
            phonics: "/ˈsænwɪtʃ/",
            emoji: "🥪",
            grade: 5,
            unit: 1,
            topic: "Food & Drinks",
            exampleSentence: "I usually have a delicious chicken sandwich for breakfast.",
            distractors: ["soup", "tea", "candy"]
          },
          {
            id: "g5-u1-l2-v4",
            word: "pink",
            clue: "A gentle pale red colour",
            vietnameseMeaning: "màu hồng",
            phonics: "/pɪŋk/",
            emoji: "🩷",
            grade: 5,
            unit: 1,
            topic: "Colours",
            exampleSentence: "Her favourite colour is pink.",
            distractors: ["black", "grey", "brown"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What's your favourite [colour / sport / food / animal]? - It's [item]. / I like [item].",
            vietnameseMeaning: "[Màu sắc / môn thể thao / đồ ăn / động vật] yêu thích của bạn là gì? - Đó là [món/con vật].",
            sampleDialogue: [
              { speaker: "Ben", text: "What's your favourite sport, Nam?", textVi: "Môn thể thao yêu thích của cậu là gì hả Nam?" },
              { speaker: "Nam", text: "It's table tennis. I play it with my brother every afternoon.", textVi: "Đó là bóng bàn. Mình chơi với anh trai mỗi buổi chiều." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: An's Self-Introduction",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "I'm [Name]. I'm in Class [5A]. My favourite [thing] is [item].",
            vietnameseMeaning: "Mình tên là [Tên]. Mình học lớp [5A]. [Thứ] yêu thích của mình là [đồ vật/môn].",
            sampleDialogue: [
              { speaker: "Teacher", text: "Please introduce yourself to the class, An.", textVi: "Mời em An giới thiệu bản thân trước lớp nào." },
              { speaker: "An", text: "Hello everyone! I'm An. I'm ten years old and I love dolphins and table tennis.", textVi: "Xin chào mọi người! Mình là An. Mình 10 tuổi và rất thích cá heo cùng môn bóng bàn." }
            ]
          }
        ],
        readingMiniStory: {
          title: "All About An",
          text: "Hello! My name is An. I am ten years old. I am in Class 5A at Hoa Binh Primary School. I live in the vibrant city of Da Nang with my family. My favourite sport is table tennis and my favourite animal is the clever dolphin. At weekends, I enjoy eating tasty tuna sandwiches by the Han River. I am excited to make many new friends in Grade 5!",
          translationVi: "Xin chào! Mình tên là An. Năm nay mình mười tuổi. Mình học lớp 5A trường Tiểu học Hòa Bình. Mình sống ở thành phố Đà Nẵng sôi động cùng gia đình. Môn thể thao yêu thích của mình là bóng bàn và loài vật yêu thích là những chú cá heo thông minh. Cuối tuần, mình thích ăn bánh mì kẹp cá ngừ ngon lành bên bờ sông Hàn. Mình rất háo hức được kết bạn với nhiều bạn mới trong năm học lớp 5 này!"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 2,
    unitTitle: "Our homes",
    unitTitleVi: "Ngôi nhà của chúng mình",
    theme: "Me and My Friends",
    icon: "🏠",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Asking and Answering about Addresses & Numbers",
        focus: "vocabulary_phonics",
        phonicsSound: "/θ/ in thirty-eight vs /eɪt/ in eighty",
        vocabulary: [
          {
            id: "g5-u2-l1-v1",
            word: "twenty-three",
            clue: "The number 23",
            vietnameseMeaning: "hai mươi ba (số 23)",
            phonics: "/ˈtwenti θriː/",
            emoji: "2️⃣3️⃣",
            grade: 5,
            unit: 2,
            topic: "Numbers & Addresses",
            exampleSentence: "My house is at number twenty-three Cau Giay Street.",
            distractors: ["thirty-three", "twenty-two", "twelve"]
          },
          {
            id: "g5-u2-l1-v2",
            word: "thirty-eight",
            clue: "The number 38",
            vietnameseMeaning: "ba mươi tám (số 38)",
            phonics: "/ˈθɜːti eɪt/",
            emoji: "3️⃣8️⃣",
            grade: 5,
            unit: 2,
            topic: "Numbers & Addresses",
            exampleSentence: "She lives at thirty-eight Quang Trung Road.",
            distractors: ["forty-eight", "twenty-eight", "eighteen"]
          },
          {
            id: "g5-u2-l1-v3",
            word: "ninety-three",
            clue: "The number 93",
            vietnameseMeaning: "chín mươi ba (số 93)",
            phonics: "/ˈnaɪnti θriː/",
            emoji: "9️⃣3️⃣",
            grade: 5,
            unit: 2,
            topic: "Numbers & Addresses",
            exampleSentence: "His address is ninety-three Tran Phu Street.",
            distractors: ["eighty-three", "nineteen", "thirty-nine"]
          },
          {
            id: "g5-u2-l1-v4",
            word: "one hundred and sixteen",
            clue: "The number 116",
            vietnameseMeaning: "một trăm mười sáu (số 116)",
            phonics: "/wʌn ˈhʌndrəd ənd sɪkˈstiːn/",
            emoji: "🔢",
            grade: 5,
            unit: 2,
            topic: "Numbers & Addresses",
            exampleSentence: "Our school is at one hundred and sixteen Nguyen Trai Street.",
            distractors: ["one hundred and sixty", "sixteen", "one hundred and six"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What's your address? - It's [house number + street name].",
            vietnameseMeaning: "Địa chỉ của bạn là gì? - Đó là số [số nhà] đường [tên đường].",
            sampleDialogue: [
              { speaker: "Mai", text: "What's your address, Linda?", textVi: "Địa chỉ nhà bạn là gì thế Linda?" },
              { speaker: "Linda", text: "It's 130 Cau Giay Street.", textVi: "Đó là số 130 đường Cầu Giấy." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Do you live in this/that house or building?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u2-l2-v1",
            word: "building",
            clue: "A structure with a roof and walls, such as a school or block of flats",
            vietnameseMeaning: "tòa nhà",
            phonics: "/ˈbɪldɪŋ/",
            emoji: "🏢",
            grade: 5,
            unit: 2,
            topic: "Types of Dwellings",
            exampleSentence: "Do you live in that tall white building?",
            distractors: ["park", "garden", "bridge"]
          },
          {
            id: "g5-u2-l2-v2",
            word: "flat",
            clue: "A set of rooms for living in, usually on one floor of a big building",
            vietnameseMeaning: "căn hộ",
            phonics: "/flæt/",
            emoji: "🚪",
            grade: 5,
            unit: 2,
            topic: "Types of Dwellings",
            exampleSentence: "I live in a comfortable flat on the fifth floor.",
            distractors: ["field", "lake", "tent"]
          },
          {
            id: "g5-u2-l2-v3",
            word: "tower",
            clue: "A very tall building that rises high into the skyline",
            vietnameseMeaning: "tòa tháp, cao ốc",
            phonics: "/ˈtaʊər/",
            emoji: "🗼",
            grade: 5,
            unit: 2,
            topic: "Types of Dwellings",
            exampleSentence: "Does your uncle live in that modern tower?",
            distractors: ["boat", "tunnel", "car"]
          },
          {
            id: "g5-u2-l2-v4",
            word: "house",
            clue: "A building for people, usually one family, to live in",
            vietnameseMeaning: "ngôi nhà",
            phonics: "/haʊs/",
            emoji: "🏡",
            grade: 5,
            unit: 2,
            topic: "Types of Dwellings",
            exampleSentence: "We live in a nice yellow house with a flower garden.",
            distractors: ["shop", "station", "stadium"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Do you live in this/that [house / flat / building / tower]? - Yes, I do. / No, I don't.",
            vietnameseMeaning: "Bạn sống ở [ngôi nhà / căn hộ / tòa nhà / tòa tháp] này/kia phải không? - Vâng, đúng vậy. / Không phải.",
            sampleDialogue: [
              { speaker: "Peter", text: "Do you live in that new building, Tony?", textVi: "Bạn sống ở tòa nhà mới kia phải không Tony?" },
              { speaker: "Tony", text: "No, I don't. I live in that green house over there.", textVi: "Không phải đâu. Mình sống trong ngôi nhà màu xanh lá đằng kia." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Our Homes Across the Town",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "My friend lives at [address]. It is a [modern flat / cozy house].",
            vietnameseMeaning: "Bạn mình sống tại [địa chỉ]. Đó là một [căn hộ hiện đại / ngôi nhà ấm cúng].",
            sampleDialogue: [
              { speaker: "Lan", text: "Where does Nam live?", textVi: "Nam sống ở đâu vậy?" },
              { speaker: "Mai", text: "He lives at 45 Nguyen Hue Street in a sunny flat.", textVi: "Cậu ấy sống tại số 45 đường Nguyễn Huệ trong một căn hộ tràn ngập ánh nắng." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Visiting My Classmates' Homes",
          text: "Today, our English study group visited each other's homes. Phong lives at 38 Le Loi Street in a bright house with lots of red roses. Lucy lives at 93 Hoang Hoa Tham Road in Flat 12 of a tall tower. My address is 116 Tran Phu Street. Although our homes look different, they are all warm, cozy, and filled with love!",
          translationVi: "Hôm nay, nhóm học tiếng Anh của chúng mình đã ghé thăm nhà nhau. Phong sống ở số 38 đường Lê Lợi trong một ngôi nhà rực rỡ với rất nhiều hoa hồng đỏ. Lucy sống ở số 93 đường Hoàng Hoa Thám trong Căn hộ 12 của một tòa tháp cao. Địa chỉ của mình là số 116 đường Trần Phú. Dù nhà của mỗi bạn trông khác nhau, nhưng tất cả đều ấm cúng và ngập tràn tình yêu thương!"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 3,
    unitTitle: "My foreign friends",
    unitTitleVi: "Những người bạn nước ngoài của mình",
    theme: "Me and My Friends",
    icon: "🌏",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Countries & Nationalities",
        focus: "vocabulary_phonics",
        phonicsSound: "/ʃ/ in British vs /tʃ/ in Chinese",
        vocabulary: [
          {
            id: "g5-u3-l1-v1",
            word: "Australia",
            clue: "A large island continent country famous for kangaroos and Sydney Opera House",
            vietnameseMeaning: "nước Úc",
            phonics: "/ɒˈstreɪliə/",
            emoji: "🇦🇺",
            grade: 5,
            unit: 3,
            topic: "Countries",
            exampleSentence: "Where is he from? - He is from Australia. He is Australian.",
            distractors: ["Japan", "Vietnam", "Britain"]
          },
          {
            id: "g5-u3-l1-v2",
            word: "America",
            clue: "The United States of America (USA)",
            vietnameseMeaning: "nước Mỹ, Hoa Kỳ",
            phonics: "/əˈmerɪkə/",
            emoji: "🇺🇸",
            grade: 5,
            unit: 3,
            topic: "Countries",
            exampleSentence: "David is from America. He is American.",
            distractors: ["Malaysia", "India", "China"]
          },
          {
            id: "g5-u3-l1-v3",
            word: "Britain",
            clue: "The United Kingdom (UK), containing England, Scotland, and Wales",
            vietnameseMeaning: "nước Anh (Vương quốc Anh)",
            phonics: "/ˈbrɪtn/",
            emoji: "🇬🇧",
            grade: 5,
            unit: 3,
            topic: "Countries",
            exampleSentence: "Tony is from Britain. His nationality is British.",
            distractors: ["Australia", "Japan", "America"]
          },
          {
            id: "g5-u3-l1-v4",
            word: "Japan",
            clue: "An Asian island country famous for cherry blossoms and Mount Fuji",
            vietnameseMeaning: "nước Nhật Bản",
            phonics: "/dʒəˈpæn/",
            emoji: "🇯🇵",
            grade: 5,
            unit: 3,
            topic: "Countries",
            exampleSentence: "Akiko comes from Japan. She is Japanese.",
            distractors: ["Malaysia", "Britain", "Vietnam"]
          },
          {
            id: "g5-u3-l1-v5",
            word: "Malaysia",
            clue: "A Southeast Asian country with the capital Kuala Lumpur",
            vietnameseMeaning: "nước Ma-lai-xi-a",
            phonics: "/məˈleɪʒə/",
            emoji: "🇲🇾",
            grade: 5,
            unit: 3,
            topic: "Countries",
            exampleSentence: "Zack is from Malaysia. He is Malaysian.",
            distractors: ["America", "Australia", "Japan"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Where is he/she from? - He/She is from [Country]. What nationality is he/she? - He/She is [Nationality].",
            vietnameseMeaning: "Cậu ấy/Cô ấy đến từ đâu? - Cậu ấy/Cô ấy đến từ [Đất nước]. Cậu ấy/Cô ấy mang quốc tịch gì? - Cậu ấy/Cô ấy là người [Quốc tịch].",
            sampleDialogue: [
              { speaker: "Nam", text: "Where is your penfriend from, Mai?", textVi: "Bạn qua thư của cậu đến từ đâu vậy Mai?" },
              { speaker: "Mai", text: "She is from Australia. She is Australian.", textVi: "Bạn ấy đến từ nước Úc. Bạn ấy là người Úc." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What is he/she like? (Personality)",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u3-l2-v1",
            word: "friendly",
            clue: "Behaving kindly and pleasantly towards people",
            vietnameseMeaning: "thân thiện, cởi mở",
            phonics: "/ˈfrendli/",
            emoji: "😊",
            grade: 5,
            unit: 3,
            topic: "Personality",
            exampleSentence: "What is she like? - She is very friendly and cheerful.",
            distractors: ["angry", "lazy", "cold"]
          },
          {
            id: "g5-u3-l2-v2",
            word: "helpful",
            clue: "Willing to help other people with warmth",
            vietnameseMeaning: "tốt bụng, hay giúp đỡ",
            phonics: "/ˈhelpfl/",
            emoji: "🤝",
            grade: 5,
            unit: 3,
            topic: "Personality",
            exampleSentence: "Tom is helpful; he always assists classmates with English.",
            distractors: ["careless", "selfish", "sleepy"]
          },
          {
            id: "g5-u3-l2-v3",
            word: "clever",
            clue: "Quick at understanding and learning things; smart",
            vietnameseMeaning: "thông minh, nhanh dạ",
            phonics: "/ˈklevər/",
            emoji: "🧠",
            grade: 5,
            unit: 3,
            topic: "Personality",
            exampleSentence: "Mary is clever; she solves maths riddles quickly.",
            distractors: ["clumsy", "dull", "slow"]
          },
          {
            id: "g5-u3-l2-v4",
            word: "active",
            clue: "Energetic and lively, taking part in many physical activities",
            vietnameseMeaning: "năng động, hoạt bát",
            phonics: "/ˈæktɪv/",
            emoji: "🏃",
            grade: 5,
            unit: 3,
            topic: "Personality",
            exampleSentence: "Ken is active; he plays football and swims every week.",
            distractors: ["tired", "shy", "quiet"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What is he/she like? - He/She is [friendly / helpful / clever / active].",
            vietnameseMeaning: "Cậu ấy/Cô ấy là người như thế nào? - Cậu ấy/Cô ấy rất [thân thiện / tốt bụng / thông minh / năng động].",
            sampleDialogue: [
              { speaker: "Tony", text: "What is Zack like?", textVi: "Zack là người như thế nào?" },
              { speaker: "Phong", text: "He is very clever and helpful.", textVi: "Cậu ấy rất thông minh và nhiệt tình giúp đỡ bạn bè." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Friends from Different Lands",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "I have a foreign friend named [Name]. He/She is [Nationality] and [adjective].",
            vietnameseMeaning: "Mình có một người bạn nước ngoài tên là [Tên]. Bạn ấy là người [Quốc tịch] và rất [tính từ].",
            sampleDialogue: [
              { speaker: "Akiko", text: "Do you have friends from other countries?", textVi: "Bạn có bạn bè từ các nước khác không?" },
              { speaker: "Nam", text: "Yes, I chat online with Emma from Australia every Sunday.", textVi: "Có chứ, mình trò chuyện trực tuyến với bạn Emma người Úc vào mỗi Chủ Nhật." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Penfriends Around the World",
          text: "In our international school club, we have friends from many countries. David is American; he is active and plays basketball skillfully. Mary is British; she is cheerful and extremely helpful in our language workshops. Kenji is Japanese; he is quiet but very clever at origami art. We share our local cultures and learn together with joy!",
          translationVi: "Tại câu lạc bộ trường quốc tế của chúng mình, chúng mình có bạn bè từ rất nhiều quốc gia. David là người Mỹ; cậu ấy năng động và chơi bóng rổ rất giỏi. Mary là người Anh; cô bạn vui tươi và cực kỳ nhiệt tình trong các buổi học ngôn ngữ. Kenji là người Nhật; bạn ấy ít nói nhưng gấp giấy origami siêu thông minh. Chúng mình chia sẻ văn hóa quê hương và cùng nhau học tập thật vui vẻ!"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 4,
    unitTitle: "Our free-time activities",
    unitTitleVi: "Các hoạt động lúc rảnh rỗi của chúng mình",
    theme: "Me and My Friends",
    icon: "🎨",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: What do you like doing in your free time?",
        focus: "vocabulary_phonics",
        phonicsSound: "/aɪ/ in violin vs /ɜː/ in surf",
        vocabulary: [
          {
            id: "g5-u4-l1-v1",
            word: "play the violin",
            clue: "To make music by playing a four-stringed wooden instrument with a bow",
            vietnameseMeaning: "chơi đàn vĩ cầm (violin)",
            phonics: "/pleɪ ðə ˌvaɪəˈlɪn/",
            emoji: "🎻",
            grade: 5,
            unit: 4,
            topic: "Free-time Activities",
            exampleSentence: "I like playing the violin in my free time.",
            distractors: ["ride horse", "wash dishes", "cut grass"]
          },
          {
            id: "g5-u4-l1-v2",
            word: "surf the Internet",
            clue: "To look at various websites on the internet for fun or learning",
            vietnameseMeaning: "lướt mạng Internet",
            phonics: "/sɜːf ði ˈɪntənet/",
            emoji: "🌐",
            grade: 5,
            unit: 4,
            topic: "Free-time Activities",
            exampleSentence: "She likes surfing the Internet to find English podcasts.",
            distractors: ["sleep all day", "wash car", "fix doors"]
          },
          {
            id: "g5-u4-l1-v3",
            word: "go for a walk",
            clue: "To take a relaxing stroll outdoors for fresh air and light exercise",
            vietnameseMeaning: "đi dạo",
            phonics: "/ɡəʊ fər ə wɔːk/",
            emoji: "🚶",
            grade: 5,
            unit: 4,
            topic: "Free-time Activities",
            exampleSentence: "My grandfather and I go for a walk in the park every morning.",
            distractors: ["climb trees", "drive train", "cook meals"]
          },
          {
            id: "g5-u4-l1-v4",
            word: "water the flowers",
            clue: "To pour water on plants and flowers in the garden",
            vietnameseMeaning: "tưới hoa",
            phonics: "/ˈwɔːtər ðə ˈflaʊəz/",
            emoji: "🚿",
            grade: 5,
            unit: 4,
            topic: "Free-time Activities",
            exampleSentence: "My sister likes watering the flowers in our sunny balcony.",
            distractors: ["burn paper", "break pots", "catch mice"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What do you like doing in your free time? - I like + V-ing [playing the violin / surfing the Internet].",
            vietnameseMeaning: "Bạn thích làm gì trong thời gian rảnh? - Mình thích [chơi đàn violin / lướt mạng].",
            sampleDialogue: [
              { speaker: "Tony", text: "What do you like doing in your free time, Mai?", textVi: "Cậu thích làm gì lúc rảnh rỗi hả Mai?" },
              { speaker: "Mai", text: "I like playing the violin and watering the flowers.", textVi: "Mình thích chơi đàn violin và tưới hoa." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What do you do at the weekend? (Frequency)",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u4-l2-v1",
            word: "read stories",
            clue: "To read interesting tales, fairy stories, or comic books",
            vietnameseMeaning: "đọc truyện",
            phonics: "/riːd ˈstɔːriz/",
            emoji: "📚",
            grade: 5,
            unit: 4,
            topic: "Weekend Pastimes",
            exampleSentence: "I always read stories in the school library at the weekend.",
            distractors: ["throw rocks", "break toys", "shout loud"]
          },
          {
            id: "g5-u4-l2-v2",
            word: "ride my bike",
            clue: "To pedal a bicycle around the streets or park",
            vietnameseMeaning: "đạp xe đạp của mình",
            phonics: "/raɪd maɪ baɪk/",
            emoji: "🚴",
            grade: 5,
            unit: 4,
            topic: "Weekend Pastimes",
            exampleSentence: "I often ride my bike around West Lake on Saturdays.",
            distractors: ["fly plane", "sail ship", "drive bus"]
          },
          {
            id: "g5-u4-l2-v3",
            word: "watch cartoons",
            clue: "To watch animated animated films or shows on television",
            vietnameseMeaning: "xem phim hoạt hình",
            phonics: "/wɒtʃ kɑːˈtuːnz/",
            emoji: "📺",
            grade: 5,
            unit: 4,
            topic: "Weekend Pastimes",
            exampleSentence: "My little brother sometimes watches cartoons on Sunday mornings.",
            distractors: ["wash clothes", "iron shirts", "paint walls"]
          },
          {
            id: "g5-u4-l2-v4",
            word: "always",
            clue: "At all times; 100% of the time",
            vietnameseMeaning: "luôn luôn",
            phonics: "/ˈɔːlweɪz/",
            emoji: "💯",
            grade: 5,
            unit: 4,
            topic: "Adverbs of Frequency",
            exampleSentence: "I always wash my hands before eating.",
            distractors: ["never", "rarely", "hardly"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What do you do at the weekend? - I [always / usually / often / sometimes] [activity].",
            vietnameseMeaning: "Bạn làm gì vào cuối tuần? - Mình [luôn luôn / thường xuyên / thỉnh thoảng] [hoạt động].",
            sampleDialogue: [
              { speaker: "Peter", text: "What do you do at the weekend, Quan?", textVi: "Cậu làm gì vào cuối tuần hả Quân?" },
              { speaker: "Quan", text: "I often ride my bike and sometimes read stories.", textVi: "Mình thường đạp xe và thỉnh thoảng đọc truyện." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Joyful Weekends of Class 5B",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "At the weekend, I like [activity] because it helps me relax.",
            vietnameseMeaning: "Vào cuối tuần, mình thích [hoạt động] bởi vì nó giúp mình thư giãn.",
            sampleDialogue: [
              { speaker: "Linda", text: "How do you spend your Sunday afternoons?", textVi: "Bạn dành buổi chiều Chủ Nhật làm gì?" },
              { speaker: "Hoa", text: "I like going for a walk with my mother and watering our garden flowers.", textVi: "Mình thích đi dạo cùng mẹ và tưới hoa trong vườn." }
            ]
          }
        ],
        readingMiniStory: {
          title: "How We Relax at the Weekend",
          text: "After a busy school week, students in Class 5B have wonderful ways to spend their free time. Minh likes playing the violin in the school music room. Lan loves watering the flowers and going for a walk around the green lake. Quan usually rides his bike with friends, while Linh often curls up on the sofa reading Vietnamese folk stories. Meaningful hobbies make our weekends bright and relaxing!",
          translationVi: "Sau một tuần học tập bận rộn, các bạn học sinh lớp 5B có những cách tuyệt vời để tận hưởng thời gian rảnh rỗi. Minh thích chơi đàn violin tại phòng âm nhạc của trường. Lan thích tưới hoa và đi dạo quanh hồ nước xanh mát. Quân thường đạp xe cùng bạn bè, còn Linh thích nằm cuộn tròn trên ghế sofa đọc truyện dân gian Việt Nam. Những sở thích ý nghĩa giúp ngày cuối tuần của chúng mình luôn rạng rỡ và thư thái!"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 5,
    unitTitle: "My future job",
    unitTitleVi: "Nghề nghiệp tương lai của mình",
    theme: "Me and My Friends",
    icon: "💼",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: What would you like to be in the future?",
        focus: "vocabulary_phonics",
        phonicsSound: "/f/ in firefighter vs /r/ in reporter",
        vocabulary: [
          {
            id: "g5-u5-l1-v1",
            word: "firefighter",
            clue: "A brave person whose job is to put out fires and rescue people",
            vietnameseMeaning: "lính cứu hỏa",
            phonics: "/ˈfaɪəfaɪtər/",
            emoji: "👨‍🚒",
            grade: 5,
            unit: 5,
            topic: "Occupations",
            exampleSentence: "What would you like to be? - I'd like to be a firefighter.",
            distractors: ["gardener", "reporter", "writer"]
          },
          {
            id: "g5-u5-l1-v2",
            word: "reporter",
            clue: "A person whose job is to investigate news and report on TV or in newspapers",
            vietnameseMeaning: "phóng viên, nhà báo",
            phonics: "/rɪˈpɔːtər/",
            emoji: "🎤",
            grade: 5,
            unit: 5,
            topic: "Occupations",
            exampleSentence: "She wants to be a reporter to interview famous athletes.",
            distractors: ["firefighter", "dentist", "pilot"]
          },
          {
            id: "g5-u5-l1-v3",
            word: "gardener",
            clue: "A person whose job is to take care of plants, trees, and flowers in a garden",
            vietnameseMeaning: "người làm vườn",
            phonics: "/ˈɡɑːdnər/",
            emoji: "🧑‍🌾",
            grade: 5,
            unit: 5,
            topic: "Occupations",
            exampleSentence: "My grandfather is a skilled gardener in Da Lat.",
            distractors: ["architect", "astronaut", "pilot"]
          },
          {
            id: "g5-u5-l1-v4",
            word: "writer",
            clue: "A person who writes books, novels, or articles",
            vietnameseMeaning: "nhà văn",
            phonics: "/ˈraɪtər/",
            emoji: "✍️",
            grade: 5,
            unit: 5,
            topic: "Occupations",
            exampleSentence: "He'd like to be a writer to create thrilling adventure stories.",
            distractors: ["vet", "builder", "hairdresser"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What would you like to be in the future? - I'd like to be a/an [firefighter / reporter / gardener / writer].",
            vietnameseMeaning: "Bạn muốn trở thành người làm nghề gì trong tương lai? - Mình muốn trở thành một [lính cứu hỏa / phóng viên / người làm vườn / nhà văn].",
            sampleDialogue: [
              { speaker: "Tony", text: "What would you like to be in the future, Nam?", textVi: "Cậu muốn làm nghề gì trong tương lai thế Nam?" },
              { speaker: "Nam", text: "I'd like to be a firefighter to help people.", textVi: "Mình muốn trở thành lính cứu hỏa để giúp đỡ mọi người." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Why would you like to do that job?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u5-l2-v1",
            word: "report the news",
            clue: "To gather and broadcast daily events to the public",
            vietnameseMeaning: "đưa tin tức, phát tin",
            phonics: "/rɪˈpɔːt ðə njuːz/",
            emoji: "📰",
            grade: 5,
            unit: 5,
            topic: "Job Responsibilities",
            exampleSentence: "Why would you like to be a reporter? - Because I'd like to report the news.",
            distractors: ["cook dinner", "fly kites", "paint chairs"]
          },
          {
            id: "g5-u5-l2-v2",
            word: "grow flowers",
            clue: "To plant and nurture blooming flowers in an orchard or park",
            vietnameseMeaning: "trồng hoa",
            phonics: "/ɡrəʊ ˈflaʊəz/",
            emoji: "🌻",
            grade: 5,
            unit: 5,
            topic: "Job Responsibilities",
            exampleSentence: "Because I'd like to grow flowers and make our town colourful.",
            distractors: ["catch fish", "repair bikes", "build fences"]
          },
          {
            id: "g5-u5-l2-v3",
            word: "write stories",
            clue: "To imagine and put into words exciting tales for children",
            vietnameseMeaning: "viết truyện",
            phonics: "/raɪt ˈstɔːriz/",
            emoji: "📖",
            grade: 5,
            unit: 5,
            topic: "Job Responsibilities",
            exampleSentence: "Why would she like to be a writer? - Because she'd like to write stories for children.",
            distractors: ["cut hair", "drive trains", "pull weeds"]
          },
          {
            id: "g5-u5-l2-v4",
            word: "help people",
            clue: "To assist individuals who are in danger, need, or difficulty",
            vietnameseMeaning: "giúp đỡ mọi người",
            phonics: "/help ˈpiːpl/",
            emoji: "🦸",
            grade: 5,
            unit: 5,
            topic: "Job Responsibilities",
            exampleSentence: "Firefighters bravely risk their lives to help people.",
            distractors: ["watch movies", "eat snacks", "play games"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Why would you like to be a/an [job]? - Because I'd like to [action].",
            vietnameseMeaning: "Tại sao bạn muốn làm [nghề nghiệp]? - Bởi vì mình muốn [hành động].",
            sampleDialogue: [
              { speaker: "Mai", text: "Why would you like to be a reporter?", textVi: "Vì sao bạn muốn trở thành phóng viên?" },
              { speaker: "Hoa", text: "Because I'd like to report the news and travel everywhere.", textVi: "Bởi vì mình muốn đưa tin tức và được đi du lịch khắp nơi." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Our Big Dreams for the Future",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "I study hard every day to become a great [profession] in the future.",
            vietnameseMeaning: "Mình học tập chăm chỉ mỗi ngày để trở thành một [nghề nghiệp] xuất sắc trong tương lai.",
            sampleDialogue: [
              { speaker: "Teacher", text: "What do you do to pursue your dream?", textVi: "Em làm gì để theo đuổi ước mơ của mình?" },
              { speaker: "Duc", text: "I read books and practice writing stories every evening.", textVi: "Em đọc sách và luyện viết truyện vào mỗi buổi tối ạ." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Dreaming Big in Grade 5",
          text: "In our English project, we talked about what we would like to be in the future. Binh dreams of becoming a firefighter because he wants to help people in emergencies. Ngoc would like to be a passionate gardener in Da Lat to grow sweet-smelling flowers. Lam wants to be a television reporter to report interesting news to everyone. Whatever our dreams are, we study diligently to achieve them!",
          translationVi: "Trong dự án tiếng Anh, chúng mình đã thảo luận về nghề nghiệp tương lai mơ ước. Bình ước mơ làm lính cứu hỏa vì cậu ấy muốn giúp đỡ mọi người trong cơn nguy cấp. Ngọc muốn trở thành một người làm vườn tâm huyết tại Đà Lạt để trồng những bông hoa thơm ngát. Lâm muốn làm phóng viên truyền hình để đưa những bản tin thú vị đến mọi người. Dù ước mơ là gì, chúng mình đều chăm chỉ học hành để vươn tới tương lai!"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 6,
    unitTitle: "Our school rooms",
    unitTitleVi: "Các phòng học ở trường của chúng mình",
    theme: "Me and My School",
    icon: "🏫",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Rooms & Floors in Our School",
        focus: "vocabulary_phonics",
        phonicsSound: "/st/ in first vs /nd/ in second",
        vocabulary: [
          {
            id: "g5-u6-l1-v1",
            word: "music room",
            clue: "A special room where students sing songs and play musical instruments",
            vietnameseMeaning: "phòng âm nhạc",
            phonics: "/ˈmjuːzɪk ruːm/",
            emoji: "🎵",
            grade: 5,
            unit: 6,
            topic: "School Rooms",
            exampleSentence: "Where's the music room? - It's on the first floor.",
            distractors: ["stadium", "canteen", "garden"]
          },
          {
            id: "g5-u6-l1-v2",
            word: "computer room",
            clue: "A modern room equipped with desktop computers for IT lessons",
            vietnameseMeaning: "phòng máy tính, tin học",
            phonics: "/kəmˈpjuːtər ruːm/",
            emoji: "💻",
            grade: 5,
            unit: 6,
            topic: "School Rooms",
            exampleSentence: "Our computer room is on the second floor.",
            distractors: ["bedroom", "playground", "garage"]
          },
          {
            id: "g5-u6-l1-v3",
            word: "library",
            clue: "A quiet room containing shelves of books for reading and borrowing",
            vietnameseMeaning: "thư viện",
            phonics: "/ˈlaɪbrəri/",
            emoji: "📖",
            grade: 5,
            unit: 6,
            topic: "School Rooms",
            exampleSentence: "We read science books in the library at break time.",
            distractors: ["kitchen", "gym", "yard"]
          },
          {
            id: "g5-u6-l1-v4",
            word: "ground floor",
            clue: "The floor of a building that is level with the ground outside",
            vietnameseMeaning: "tầng trệt",
            phonics: "/ɡraʊnd flɔːr/",
            emoji: "1️⃣",
            grade: 5,
            unit: 6,
            topic: "Building Floors",
            exampleSentence: "The principal's office is on the ground floor.",
            distractors: ["roof", "cellar", "balcony"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Where's the [school room]? - It's on the [ground / first / second / third] floor.",
            vietnameseMeaning: "[Phòng học] ở đâu vậy? - Nó ở trên tầng [trệt / 1 / 2 / 3].",
            sampleDialogue: [
              { speaker: "Ben", text: "Where's the computer room?", textVi: "Phòng máy tính ở đâu thế bạn?" },
              { speaker: "Mai", text: "It's on the second floor, next to the art room.", textVi: "Nó ở trên tầng hai, cạnh phòng mỹ thuật." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Asking for and Giving Directions in School",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u6-l2-v1",
            word: "go upstairs",
            clue: "To walk up the flight of stairs to a higher floor",
            vietnameseMeaning: "đi lên lầu, lên tầng trên",
            phonics: "/ɡəʊ ˌʌpˈsteəz/",
            emoji: "🆙",
            grade: 5,
            unit: 6,
            topic: "Directions",
            exampleSentence: "Go upstairs and turn left to find the science room.",
            distractors: ["fall down", "sit quietly", "close door"]
          },
          {
            id: "g5-u6-l2-v2",
            word: "go along the corridor",
            clue: "To walk straight down the long hallway connecting school rooms",
            vietnameseMeaning: "đi dọc theo hành lang",
            phonics: "/ɡəʊ əˈlɒŋ ðə ˈkɒrɪdɔːr/",
            emoji: "🚶‍♂️",
            grade: 5,
            unit: 6,
            topic: "Directions",
            exampleSentence: "Go along the corridor and it is on your right.",
            distractors: ["jump over fence", "dig hole", "open window"]
          },
          {
            id: "g5-u6-l2-v3",
            word: "turn left",
            clue: "To change direction towards the left side",
            vietnameseMeaning: "rẽ trái",
            phonics: "/tɜːn left/",
            emoji: "⬅️",
            grade: 5,
            unit: 6,
            topic: "Directions",
            exampleSentence: "Turn left after the library and you will see the music room.",
            distractors: ["run fast", "turn right", "stop immediately"]
          },
          {
            id: "g5-u6-l2-v4",
            word: "turn right",
            clue: "To change direction towards the right side",
            vietnameseMeaning: "rẽ phải",
            phonics: "/tɜːn raɪt/",
            emoji: "➡️",
            grade: 5,
            unit: 6,
            topic: "Directions",
            exampleSentence: "Turn right at the end of the hallway.",
            distractors: ["turn left", "sit down", "go back"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Could you tell me the way to the [room], please? - [Go upstairs / Go along the corridor / Turn left / Turn right].",
            vietnameseMeaning: "Bạn làm ơn chỉ giúp mình đường đến [phòng học] được không? - [Đi lên tầng / Đi dọc hành lang / Rẽ trái / Rẽ phải].",
            sampleDialogue: [
              { speaker: "Visitor", text: "Could you tell me the way to the art room, please?", textVi: "Cháu làm ơn chỉ giúp cô đường đến phòng mỹ thuật được không?" },
              { speaker: "Nam", text: "Go upstairs, go along the corridor, and turn right.", textVi: "Cô đi lên tầng, đi dọc theo hành lang rồi rẽ phải ạ." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: A Guided Tour of Our School",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Our school has [number] floors. On the [first floor], there is [room].",
            vietnameseMeaning: "Trường chúng mình có [số] tầng. Ở [tầng một], có [phòng học].",
            sampleDialogue: [
              { speaker: "Student", text: "Welcome to our bright primary school!", textVi: "Chào mừng các bạn đến với ngôi trường tiểu học khang trang của chúng mình!" },
              { speaker: "Guest", text: "Your school is very modern and easy to navigate.", textVi: "Trường các em rất hiện đại và dễ tìm đường đi." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Navigating Nguyen Trai Primary School",
          text: "Welcome to Nguyen Trai Primary School! Our school has three large floors. On the ground floor, you can find the principal's office, the canteen, and a medical room. If you go upstairs to the first floor, you will see our colorful art room and the spacious library. The computer room and the music room are on the second floor. Big signs along the corridors make it easy for everyone to find their way!",
          translationVi: "Chào mừng bạn đến với Trường Tiểu học Nguyễn Trãi! Trường chúng mình gồm ba tầng khang trang. Ở tầng trệt có phòng hiệu trưởng, nhà ăn và phòng y tế. Nếu đi lên tầng một, bạn sẽ thấy phòng mỹ thuật rực rỡ sắc màu và thư viện rộng rãi. Phòng máy tính và phòng âm nhạc nằm trên tầng hai. Những biển chỉ dẫn lớn dọc theo các hành lang giúp mọi người dễ dàng tìm được đường đi!"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 7,
    unitTitle: "Our favourite school activities",
    unitTitleVi: "Các hoạt động trường học yêu thích",
    theme: "Me and My School",
    icon: "⚽",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: What school activity do you like?",
        focus: "vocabulary_phonics",
        phonicsSound: "/pr/ in project vs /pl/ in play",
        vocabulary: [
          {
            id: "g5-u7-l1-v1",
            word: "do projects",
            clue: "To work together in groups researching and making presentations",
            vietnameseMeaning: "làm các dự án học tập",
            phonics: "/duː ˈprɒdʒekts/",
            emoji: "📋",
            grade: 5,
            unit: 7,
            topic: "School Activities",
            exampleSentence: "What school activity do you like? - I like doing projects.",
            distractors: ["sleep in class", "break rules", "shout loud"]
          },
          {
            id: "g5-u7-l1-v2",
            word: "solve maths problems",
            clue: "To calculate and find correct answers to numerical questions",
            vietnameseMeaning: "giải bài toán",
            phonics: "/sɒlv mæθs ˈprɒbləmz/",
            emoji: "🔢",
            grade: 5,
            unit: 7,
            topic: "School Activities",
            exampleSentence: "Minh is clever and likes solving maths problems.",
            distractors: ["sing songs", "water plants", "wash dishes"]
          },
          {
            id: "g5-u7-l1-v3",
            word: "play games",
            clue: "To participate in fun learning or playground games with classmates",
            vietnameseMeaning: "chơi trò chơi",
            phonics: "/pleɪ ɡeɪmz/",
            emoji: "🎲",
            grade: 5,
            unit: 7,
            topic: "School Activities",
            exampleSentence: "We like playing English word games at the start of class.",
            distractors: ["clean floor", "erase board", "close windows"]
          },
          {
            id: "g5-u7-l1-v4",
            word: "read books",
            clue: "To look at written words in storybooks or textbooks",
            vietnameseMeaning: "đọc sách",
            phonics: "/riːd bʊks/",
            emoji: "📚",
            grade: 5,
            unit: 7,
            topic: "School Activities",
            exampleSentence: "She likes reading books in the peaceful library.",
            distractors: ["run fast", "throw balls", "jump rope"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What school activity do you like? - I like + V-ing [doing projects / solving maths problems / playing games / reading books].",
            vietnameseMeaning: "Bạn thích hoạt động trường học nào? - Mình thích [làm dự án / giải toán / chơi trò chơi / đọc sách].",
            sampleDialogue: [
              { speaker: "Tony", text: "What school activity do you like, Mai?", textVi: "Cậu thích hoạt động trường học nào hả Mai?" },
              { speaker: "Mai", text: "I like doing science projects with my friends.", textVi: "Mình thích làm dự án khoa học cùng các bạn." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Why do you like that activity?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u7-l2-v1",
            word: "interesting",
            clue: "Attracting your attention and curiosity; engaging",
            vietnameseMeaning: "thú vị, hấp dẫn",
            phonics: "/ˈɪntrəstɪŋ/",
            emoji: "✨",
            grade: 5,
            unit: 7,
            topic: "Adjectives",
            exampleSentence: "Why do you like solving maths problems? - Because I think it's interesting.",
            distractors: ["boring", "tiring", "sad"]
          },
          {
            id: "g5-u7-l2-v2",
            word: "useful",
            clue: "Helping you to do or get what you want; practical",
            vietnameseMeaning: "hữu ích, bổ ích",
            phonics: "/ˈjuːsfəl/",
            emoji: "💡",
            grade: 5,
            unit: 7,
            topic: "Adjectives",
            exampleSentence: "Reading science books is very useful for our knowledge.",
            distractors: ["useless", "dull", "harmful"]
          },
          {
            id: "g5-u7-l2-v3",
            word: "fun",
            clue: "Enjoyable and amusing",
            vietnameseMeaning: "vui nhộn, vui vẻ",
            phonics: "/fʌn/",
            emoji: "🎉",
            grade: 5,
            unit: 7,
            topic: "Adjectives",
            exampleSentence: "Playing English language games is always great fun.",
            distractors: ["scary", "difficult", "heavy"]
          },
          {
            id: "g5-u7-l2-v4",
            word: "group work",
            clue: "Working cooperatively as a team on assigned tasks",
            vietnameseMeaning: "làm việc nhóm",
            phonics: "/ɡruːp wɜːk/",
            emoji: "👥",
            grade: 5,
            unit: 7,
            topic: "Learning Styles",
            exampleSentence: "Group work teaches us how to listen and cooperate.",
            distractors: ["solo study", "punishment", "homework test"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Why do you like [activity / V-ing]? - Because I think it's [interesting / useful / fun].",
            vietnameseMeaning: "Tại sao bạn thích [hoạt động]? - Bởi vì mình nghĩ nó [thú vị / hữu ích / vui vẻ].",
            sampleDialogue: [
              { speaker: "Peter", text: "Why do you like doing projects?", textVi: "Vì sao bạn thích làm dự án?" },
              { speaker: "Linda", text: "Because I think it's useful and promotes good teamwork.", textVi: "Bởi vì mình nghĩ nó rất bổ ích và rèn luyện kỹ năng làm việc nhóm." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Project Day in Class 5C",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "We love [school activity] because it makes learning [exciting / memorable].",
            vietnameseMeaning: "Chúng mình yêu thích [hoạt động học tập] vì nó khiến việc học trở nên [hào hứng / đáng nhớ].",
            sampleDialogue: [
              { speaker: "Nam", text: "Which activity did you enjoy most today?", textVi: "Hôm nay cậu thích hoạt động nào nhất?" },
              { speaker: "Hoa", text: "The English trivia game! It was super fun and engaging.", textVi: "Trò chơi đố vui tiếng Anh! Nó siêu vui và lôi cuốn." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Our Exciting Project Exhibition",
          text: "Friday is always the most anticipated day at our school. In Class 5C, we presented our science projects about environmental protection. Phong's team made a model windmill, while Lan's group solved challenging maths puzzles about recycling. We love doing projects because it is useful and exciting. Learning by doing brings genuine smiles to everyone's faces!",
          translationVi: "Thứ Sáu luôn là ngày được mong chờ nhất ở trường chúng mình. Tại lớp 5C, chúng mình đã thuyết trình các dự án khoa học về bảo vệ môi trường. Nhóm của Phong đã làm một mô hình cối xay gió, trong khi nhóm của Lan giải những câu đố toán hóc búa về tái chế rác thải. Chúng mình rất thích làm dự án vì hoạt động này vừa bổ ích vừa hào hứng. Học qua thực hành mang lại nụ cười rạng rỡ cho tất cả mọi người!"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 8,
    unitTitle: "In our classroom",
    unitTitleVi: "Trong phòng học của chúng mình",
    theme: "Me and My School",
    icon: "🎒",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Classroom Supplies & Locations",
        focus: "vocabulary_phonics",
        phonicsSound: "/skw/ in set square vs /kr/ in crayon",
        vocabulary: [
          {
            id: "g5-u8-l1-v1",
            word: "crayon",
            clue: "A stick of colored wax used for drawing pictures",
            vietnameseMeaning: "bút sáp màu",
            phonics: "/ˈkreɪən/",
            emoji: "🖍️",
            grade: 5,
            unit: 8,
            topic: "Classroom Supplies",
            exampleSentence: "Where are the crayons? - They are on the teacher's desk.",
            distractors: ["ruler", "rubber", "notebook"]
          },
          {
            id: "g5-u8-l1-v2",
            word: "glue stick",
            clue: "A small tube of solid adhesive used for sticking craft paper",
            vietnameseMeaning: "lọ keo khô, hồ dán",
            phonics: "/ɡluː stɪk/",
            emoji: "🧴",
            grade: 5,
            unit: 8,
            topic: "Classroom Supplies",
            exampleSentence: "Where is the glue stick? - It is in the craft box.",
            distractors: ["scissors", "pencil", "pen"]
          },
          {
            id: "g5-u8-l1-v3",
            word: "pencil sharpener",
            clue: "A small tool used to sharpen pencils to a point",
            vietnameseMeaning: "cái gọt bút chì",
            phonics: "/ˈpensl ʃɑːpnər/",
            emoji: "✏️",
            grade: 5,
            unit: 8,
            topic: "Classroom Supplies",
            exampleSentence: "Can I borrow your pencil sharpener, please?",
            distractors: ["sharp knife", "stapler", "folder"]
          },
          {
            id: "g5-u8-l1-v4",
            word: "set square",
            clue: "A triangular plastic ruler used for drawing straight lines and right angles",
            vietnameseMeaning: "thước ê-ke hình tam giác",
            phonics: "/ˈset skweər/",
            emoji: "📐",
            grade: 5,
            unit: 8,
            topic: "Classroom Supplies",
            exampleSentence: "We use a set square in geometry lessons to draw right angles.",
            distractors: ["compass", "calculator", "tape"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Where is/are the [stationery]? - It is / They are [on / under / beside / in front of] the [table/shelf].",
            vietnameseMeaning: "[Đồ dùng học tập] ở đâu? - Nó/Chúng ở [trên / dưới / bên cạnh / phía trước] [bàn/kệ].",
            sampleDialogue: [
              { speaker: "Lan", text: "Where are the colorful crayons?", textVi: "Những chiếc bút sáp màu ở đâu thế?" },
              { speaker: "Minh", text: "They are in the drawer under the teacher's table.", textVi: "Chúng ở trong ngăn kéo dưới bàn giáo viên." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Whose is this? (Asking about Ownership)",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u8-l2-v1",
            word: "above",
            clue: "In a higher position than something else",
            vietnameseMeaning: "ở phía trên",
            phonics: "/əˈbʌv/",
            emoji: "⬆️",
            grade: 5,
            unit: 8,
            topic: "Prepositions",
            exampleSentence: "The wall clock hangs above the whiteboard.",
            distractors: ["under", "behind", "below"]
          },
          {
            id: "g5-u8-l2-v2",
            word: "beside",
            clue: "At the side of; next to",
            vietnameseMeaning: "bên cạnh",
            phonics: "/bɪˈsaɪd/",
            emoji: "↔️",
            grade: 5,
            unit: 8,
            topic: "Prepositions",
            exampleSentence: "My backpack is beside Nam's desk.",
            distractors: ["far", "across", "inside"]
          },
          {
            id: "g5-u8-l2-v3",
            word: "in front of",
            clue: "Directly ahead of someone or something",
            vietnameseMeaning: "ở phía trước",
            phonics: "/ɪn frʌnt əv/",
            emoji: "🔽",
            grade: 5,
            unit: 8,
            topic: "Prepositions",
            exampleSentence: "The teacher stands in front of the classroom.",
            distractors: ["behind", "under", "outside"]
          },
          {
            id: "g5-u8-l2-v4",
            word: "under",
            clue: "Below the surface of something; beneath",
            vietnameseMeaning: "ở phía dưới, bên dưới",
            phonics: "/ˈʌndər/",
            emoji: "⬇️",
            grade: 5,
            unit: 8,
            topic: "Prepositions",
            exampleSentence: "The set square dropped under the wooden chair.",
            distractors: ["above", "on top", "high up"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Whose [object] is this? - It's [Name]'s / It's my [object].",
            vietnameseMeaning: "[Đồ vật] này là của ai? - Đó là của [Tên] / Đó là [đồ vật] của mình.",
            sampleDialogue: [
              { speaker: "Teacher", text: "Whose pencil sharpener is this on the floor?", textVi: "Cái gọt bút chì dưới sàn này là của ai vậy?" },
              { speaker: "Nam", text: "It's mine, teacher! Thank you for picking it up.", textVi: "Dạ của em thưa cô! Em cảm ơn cô đã nhặt giúp em." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: A Tidy and Caring Classroom",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "We always keep our classroom [tidy / clean / organized] after every lesson.",
            vietnameseMeaning: "Chúng mình luôn giữ phòng học [ngăn nắp / sạch sẽ / gọn gàng] sau mỗi tiết học.",
            sampleDialogue: [
              { speaker: "Monitor", text: "Whose set square is still on the art table?", textVi: "Thước ê-ke của ai vẫn còn trên bàn mỹ thuật thế?" },
              { speaker: "Linh", text: "It's Quan's. I will put it into his backpack.", textVi: "Của bạn Quân đấy. Mình sẽ cất vào ba lô cho bạn ấy." }
            ]
          }
        ],
        readingMiniStory: {
          title: "The Classroom Lost and Found Box",
          text: "At the back of Class 5A, beside the book corner, stands a lovely wooden box labeled 'Lost and Found'. Whenever students spot a lost crayon, a glue stick, or a set square dropped under a chair, they gently place it inside. At the end of the day, class monitor Lan checks the items and returns them to their owners. Everyone in our class learns to take care of our learning tools!",
          translationVi: "Ở phía cuối lớp 5A, bên cạnh góc đọc sách, có một chiếc hộp gỗ xinh xắn đề biển 'Đồ thất lạc'. Mỗi khi các bạn nhìn thấy một chiếc bút sáp màu, một lọ keo khô hay một chiếc thước ê-ke rơi dưới gầm ghế, các bạn đều nhẹ nhàng cất vào trong hộp. Cuối ngày, lớp trưởng Lan kiểm tra và trả lại đúng đồ cho các bạn. Tất cả mọi người trong lớp đều học được cách giữ gìn đồ dùng học tập!"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 9,
    unitTitle: "Our outdoor activities",
    unitTitleVi: "Các hoạt động ngoài trời của chúng mình",
    theme: "Me and My School",
    icon: "🏕️",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Outdoor Locations & Were you at the...?",
        focus: "vocabulary_phonics",
        phonicsSound: "/eə/ in campsite vs /ɪə/ in theatre",
        vocabulary: [
          {
            id: "g5-u9-l1-v1",
            word: "campsite",
            clue: "A designated outdoor place where people pitch tents to camp",
            vietnameseMeaning: "khu cắm trại, địa điểm cắm trại",
            phonics: "/ˈkæmpsaɪt/",
            emoji: "⛺",
            grade: 5,
            unit: 9,
            topic: "Outdoor Places",
            exampleSentence: "Were you at the campsite last weekend? - Yes, I was.",
            distractors: ["airport", "supermarket", "bank"]
          },
          {
            id: "g5-u9-l1-v2",
            word: "aquarium",
            clue: "A large public facility where aquatic animals and fish are kept for viewing",
            vietnameseMeaning: "thủy cung, viện hải dương học",
            phonics: "/əˈkweəriəm/",
            emoji: "🐟",
            grade: 5,
            unit: 9,
            topic: "Outdoor Places",
            exampleSentence: "We saw colorful sea turtles and sharks at the aquarium.",
            distractors: ["library", "hospital", "pharmacy"]
          },
          {
            id: "g5-u9-l1-v3",
            word: "funfair",
            clue: "An outdoor event with amusement rides, fairground games, and food stalls",
            vietnameseMeaning: "hội chợ vui chơi giải trí",
            phonics: "/ˈfʌnfeər/",
            emoji: "🎡",
            grade: 5,
            unit: 9,
            topic: "Outdoor Places",
            exampleSentence: "Children rode the merry-go-round at the weekend funfair.",
            distractors: ["post office", "factory", "stadium"]
          },
          {
            id: "g5-u9-l1-v4",
            word: "theatre",
            clue: "A building or outdoor stage where plays and performances are given",
            vietnameseMeaning: "nhà hát, rạp kịch",
            phonics: "/ˈθɪətər/",
            emoji: "🎭",
            grade: 5,
            unit: 9,
            topic: "Outdoor Places",
            exampleSentence: "We watched a magical water puppet show at the theatre.",
            distractors: ["bakery", "clinic", "garage"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Were you at the [campsite / aquarium / funfair / theatre] last weekend? - Yes, I was. / No, I wasn't.",
            vietnameseMeaning: "Bạn có ở [khu cắm trại / thủy cung / hội chợ / nhà hát] cuối tuần trước không? - Vâng, đúng vậy. / Không phải.",
            sampleDialogue: [
              { speaker: "Tony", text: "Were you at the campsite last weekend, Nam?", textVi: "Cuối tuần trước cậu có ở khu cắm trại không Nam?" },
              { speaker: "Nam", text: "Yes, I was! We had a brilliant campout by the lake.", textVi: "Có chứ! Tụi mình đã có một chuyến cắm trại tuyệt vời bên hồ." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What did you do there? (Past Simple)",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u9-l2-v1",
            word: "dance around the campfire",
            clue: "To dance hand-in-hand in a circle around an outdoor blazing campfire",
            vietnameseMeaning: "nhảy múa quanh đống lửa trại",
            phonics: "/dɑːns əˈraʊnd ðə ˈkæmpfaɪər/",
            emoji: "🔥",
            grade: 5,
            unit: 9,
            topic: "Outdoor Activities",
            exampleSentence: "At the campsite, we danced around the campfire and sang songs.",
            distractors: ["wash floors", "type computer", "write essays"]
          },
          {
            id: "g5-u9-l2-v2",
            word: "watch the fish",
            clue: "To look at exotic swimming fish through transparent glass tanks",
            vietnameseMeaning: "ngắm cá bơi",
            phonics: "/wɒtʃ ðə fɪʃ/",
            emoji: "🐠",
            grade: 5,
            unit: 9,
            topic: "Outdoor Activities",
            exampleSentence: "What did you do at the aquarium? - We watched the fish.",
            distractors: ["climb mountains", "bake cakes", "sleep in bed"]
          },
          {
            id: "g5-u9-l2-v3",
            word: "listen to music",
            clue: "To hear melodic songs played live on stage or through earphones",
            vietnameseMeaning: "nghe nhạc",
            phonics: "/ˈlɪsn tuː ˈmjuːzɪk/",
            emoji: "🎶",
            grade: 5,
            unit: 9,
            topic: "Outdoor Activities",
            exampleSentence: "We listened to joyful folk music at the cultural fair.",
            distractors: ["cut hair", "repair watches", "wash shoes"]
          },
          {
            id: "g5-u9-l2-v4",
            word: "play chess",
            clue: "To play a strategic board game of knights, rooks, and kings",
            vietnameseMeaning: "chơi cờ vua",
            phonics: "/pleɪ tʃes/",
            emoji: "♟️",
            grade: 5,
            unit: 9,
            topic: "Outdoor Activities",
            exampleSentence: "Under the shady banyan tree, the boys played chess calmly.",
            distractors: ["drive tractors", "fly helicopters", "row boats"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What did you do there? - We [danced around the campfire / watched the fish / listened to music].",
            vietnameseMeaning: "Các bạn đã làm gì ở đó? - Chúng mình đã [nhảy múa quanh lửa trại / ngắm cá / nghe nhạc].",
            sampleDialogue: [
              { speaker: "Linda", text: "What did you do at the funfair?", textVi: "Các bạn đã làm gì ở hội chợ vui chơi?" },
              { speaker: "Mai", text: "We played chess, listened to lively music, and rode the carousel.", textVi: "Chúng mình chơi cờ, nghe nhạc sôi động và đi vòng quay ngựa gỗ." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: A Sunny Saturday Out",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Last weekend was memorable. We visited [place] and had so much fun [activity].",
            vietnameseMeaning: "Cuối tuần trước thật đáng nhớ. Chúng mình đã đến thăm [địa điểm] và rất vui khi [hoạt động].",
            sampleDialogue: [
              { speaker: "Peter", text: "Did you enjoy the outdoor trip?", textVi: "Bạn có thích chuyến đi ngoài trời không?" },
              { speaker: "Phong", text: "Yes, immensely! Watching glowing jellyfish at the aquarium was wonderful.", textVi: "Có chứ, tuyệt lắm! Được ngắm những con sứa phát sáng ở thủy cung thật kỳ diệu." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Saturday at Pine Tree Campsite",
          text: "Last Saturday, our scout team traveled to Pine Tree Campsite in the suburbs. The weather was breezy and sunny. We pitched our sturdy green tents on the grass. In the afternoon, we played chess and sang cheerful campfire songs. When darkness fell, we lit the campfire, danced together, and roasted sweet corn. It was our most thrilling outdoor experience this term!",
          translationVi: "Thứ Bảy tuần trước, đội hướng đạo sinh của chúng mình đã đến Khu cắm trại Rừng Thông ở ngoại ô. Thời tiết nhiều gió mát và nắng ấm. Chúng mình cùng nhau dựng những chiếc lều xanh chắc chắn trên bãi cỏ. Buổi chiều, cả đội chơi cờ và cất cao các bài ca lửa trại vui nhộn. Khi trời tối, chúng mình nhóm lửa, cùng nhau nhảy múa và nướng ngô ngọt. Đó là trải nghiệm ngoài trời thú vị nhất của tụi mình trong học kỳ này!"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 10,
    unitTitle: "Our school trip",
    unitTitleVi: "Chuyến đi dã ngoại của trường",
    theme: "Me and My School",
    icon: "🚌",
    semester: 1,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Famous Trip Destinations (Were you at...?)",
        focus: "vocabulary_phonics",
        phonicsSound: "/eɪ/ in lake vs /ɪ/ in hill",
        vocabulary: [
          {
            id: "g5-u10-l1-v1",
            word: "hill",
            clue: "An area of land that is naturally raised higher than the land around it",
            vietnameseMeaning: "ngọn đồi",
            phonics: "/hɪl/",
            emoji: "⛰️",
            grade: 5,
            unit: 10,
            topic: "Trip Destinations",
            exampleSentence: "Were you at Ba Na Hills on your school trip? - Yes, I was.",
            distractors: ["valley", "beach", "tunnel"]
          },
          {
            id: "g5-u10-l1-v2",
            word: "lake",
            clue: "A large body of water surrounded completely by land",
            vietnameseMeaning: "hồ nước",
            phonics: "/leɪk/",
            emoji: "🏞️",
            grade: 5,
            unit: 10,
            topic: "Trip Destinations",
            exampleSentence: "We strolled peacefully around Hoan Kiem Lake in Hanoi.",
            distractors: ["desert", "volcano", "motorway"]
          },
          {
            id: "g5-u10-l1-v3",
            word: "pagoda",
            clue: "A Buddhist temple or sacred building with a tiered tower",
            vietnameseMeaning: "ngôi chùa",
            phonics: "/pəˈɡəʊdə/",
            emoji: "⛩️",
            grade: 5,
            unit: 10,
            topic: "Trip Destinations",
            exampleSentence: "Our class visited Bai Dinh Pagoda in Ninh Binh.",
            distractors: ["cinema", "hotel", "supermarket"]
          },
          {
            id: "g5-u10-l1-v4",
            word: "theme park",
            clue: "A large amusement park with themed rides, roller coasters, and shows",
            vietnameseMeaning: "công viên giải trí theo chủ đề",
            phonics: "/ˈθiːm pɑːk/",
            emoji: "🎡",
            grade: 5,
            unit: 10,
            topic: "Trip Destinations",
            exampleSentence: "Students had a wonderful adventure at Suoi Tien Theme Park.",
            distractors: ["hospital", "post office", "factory"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Were you at [Ba Na Hills / Hoan Kiem Lake / Bai Dinh Pagoda] yesterday? - Yes, I was. / No, I wasn't.",
            vietnameseMeaning: "Hôm qua bạn có ở [Bà Nà Hills / Hồ Hoàn Kiếm / Chùa Bái Đính] không? - Vâng, đúng vậy. / Không phải.",
            sampleDialogue: [
              { speaker: "Tony", text: "Were you at Ba Na Hills yesterday, Mai?", textVi: "Hôm qua cậu có ở Bà Nà Hills không Mai?" },
              { speaker: "Mai", text: "Yes, I was! Our class took the Golden Bridge tour.", textVi: "Có chứ! Lớp mình đã đi tham quan Cầu Vàng." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What did you do on your school trip?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u10-l2-v1",
            word: "visit the old buildings",
            clue: "To explore historical architecture and ancient traditional houses",
            vietnameseMeaning: "thăm các tòa nhà cổ / di tích cổ",
            phonics: "/ˈvɪzɪt ði əʊld ˈbɪldɪŋz/",
            emoji: "🏛️",
            grade: 5,
            unit: 10,
            topic: "Trip Activities",
            exampleSentence: "We visited the old buildings and took many photos.",
            distractors: ["paint walls", "break windows", "clean carpets"]
          },
          {
            id: "g5-u10-l2-v2",
            word: "walk around the lake",
            clue: "To walk around the scenic shore of a body of fresh water",
            vietnameseMeaning: "đi dạo quanh bờ hồ",
            phonics: "/wɔːk əˈraʊnd ðə leɪk/",
            emoji: "🚶‍♀️",
            grade: 5,
            unit: 10,
            topic: "Trip Activities",
            exampleSentence: "In the cool morning breeze, we walked around the lake.",
            distractors: ["swim deep", "drive trucks", "sleep soundly"]
          },
          {
            id: "g5-u10-l2-v3",
            word: "plant trees",
            clue: "To place young saplings into the soil to grow",
            vietnameseMeaning: "trồng cây xanh",
            phonics: "/plɑːnt triːz/",
            emoji: "🌱",
            grade: 5,
            unit: 10,
            topic: "Trip Activities",
            exampleSentence: "At the eco-resort, our class planted green fruit trees.",
            distractors: ["cut trees", "burn wood", "pick leaves"]
          },
          {
            id: "g5-u10-l2-v4",
            word: "famous",
            clue: "Known and recognized by many people across regions",
            vietnameseMeaning: "nổi tiếng",
            phonics: "/ˈfeɪməs/",
            emoji: "⭐",
            grade: 5,
            unit: 10,
            topic: "Adjectives",
            exampleSentence: "Bai Dinh is one of the most famous pagodas in Southeast Asia.",
            distractors: ["secret", "lonely", "tiny"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What did you do on your school trip? - We [visited the old buildings / walked around the lake / planted trees].",
            vietnameseMeaning: "Các bạn đã làm gì trong chuyến dã ngoại của trường? - Chúng mình đã [thăm các tòa nhà cổ / đi dạo quanh hồ / trồng cây].",
            sampleDialogue: [
              { speaker: "Linda", text: "What did you do on your school trip to Ninh Binh?", textVi: "Các cậu đã làm gì trong chuyến dã ngoại đến Ninh Bình?" },
              { speaker: "Nam", text: "We visited the ancient pagoda and planted five pine trees.", textVi: "Tụi mình thăm ngôi chùa cổ kính và trồng năm cây thông." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Memories from Our Trip to the Hills",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "The school trip was [fantastic / educational]. We learned about [culture / nature].",
            vietnameseMeaning: "Chuyến dã ngoại thật [tuyệt vời / bổ ích]. Chúng mình đã học thêm về [văn hóa / thiên nhiên].",
            sampleDialogue: [
              { speaker: "Ben", text: "Did you take photos during the trip?", textVi: "Cậu có chụp ảnh trong chuyến đi không?" },
              { speaker: "Lan", text: "Yes, our teacher helped us photograph the grand golden bridge in the mist!", textVi: "Có chứ, cô giáo đã giúp tụi mình chụp lại cây cầu vàng rực rỡ trong làn sương mù!" }
            ]
          }
        ],
        readingMiniStory: {
          title: "A Day to Remember at Ba Na Hills",
          text: "Last Thursday, all fifth graders went on a memorable school trip to Ba Na Hills. We departed by bus early at 7:00 a.m. When we arrived, the mountain air was cool and misty. First, we walked across the renowned Golden Bridge held by giant stone hands. Next, we visited ancient French architectural buildings and planted flower bushes in the garden. It was the happiest school trip ever!",
          translationVi: "Thứ Năm tuần trước, toàn thể học sinh khối 5 đã có một chuyến dã ngoại đáng nhớ tại Bà Nà Hills. Chúng mình khởi hành bằng xe buýt từ 7:00 sáng sớm. Khi đến nơi, không khí miền núi mát lạnh và bảng lảng sương mù. Đầu tiên, chúng mình dạo bước qua Cầu Vàng nổi tiếng được nâng niu bởi đôi bàn tay đá khổng lồ. Tiếp đó, tụi mình tham quan các tòa nhà kiến trúc Pháp cổ kính và trồng những luống hoa trong vườn. Đó là chuyến tham quan hạnh phúc nhất từ trước đến nay!"
        }
      }
    ]
  },

  // ==========================================
  // SEMESTER 2 (UNITS 11 - 20) - GLOBAL SUCCESS 5 (GDPT 2018)
  // ==========================================
  {
    grade: 5,
    unitNumber: 11,
    unitTitle: "Family time",
    unitTitleVi: "Thời gian bên gia đình",
    theme: "Me and My Family",
    icon: "👨‍👩‍👧‍👦",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Did you swim in the sea? (Yes/No Past Questions)",
        focus: "vocabulary_phonics",
        phonicsSound: "/iː/ in beach vs /ɪ/ in swim",
        vocabulary: [
          {
            id: "g5-u11-l1-v1",
            word: "swim in the sea",
            clue: "To move through ocean water for leisure and cooling off",
            vietnameseMeaning: "bơi ở biển, tắm biển",
            phonics: "/swɪm ɪn ðə siː/",
            emoji: "🏊",
            grade: 5,
            unit: 11,
            topic: "Beach Activities",
            exampleSentence: "Did you swim in the sea? - Yes, I did. The water was azure and refreshing.",
            distractors: ["climb mountains", "bake pies", "sweep dust"]
          },
          {
            id: "g5-u11-l1-v2",
            word: "take photos",
            clue: "To use a camera or smartphone to capture memorable snapshots",
            vietnameseMeaning: "chụp ảnh",
            phonics: "/teɪk ˈfəʊtəʊz/",
            emoji: "📸",
            grade: 5,
            unit: 11,
            topic: "Holiday Activities",
            exampleSentence: "My dad took wonderful photos of the sunrise on the beach.",
            distractors: ["break lenses", "lose tickets", "drop bags"]
          },
          {
            id: "g5-u11-l1-v3",
            word: "collect seashells",
            clue: "To search along the sandy shore for colorful empty shells left by molluscs",
            vietnameseMeaning: "nhặt vỏ sò, nhặt ốc biển",
            phonics: "/kəˈlekt ˈsiːʃelz/",
            emoji: "🐚",
            grade: 5,
            unit: 11,
            topic: "Beach Activities",
            exampleSentence: "My little sister loves collecting spiral seashells on the sand.",
            distractors: ["throw rubbish", "dig gold", "catch crabs"]
          },
          {
            id: "g5-u11-l1-v4",
            word: "walk on the beach",
            clue: "To take a relaxing stroll barefoot or in sandals along the water's edge",
            vietnameseMeaning: "đi dạo trên bãi biển",
            phonics: "/wɔːk ɒn ðə biːtʃ/",
            emoji: "🏖️",
            grade: 5,
            unit: 11,
            topic: "Beach Activities",
            exampleSentence: "Every evening, my parents walk on the beach together.",
            distractors: ["ride elevator", "watch television", "wash car"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Did you [swim in the sea / take photos / collect seashells / walk on the beach]? - Yes, I did. / No, I didn't.",
            vietnameseMeaning: "Bạn đã [bơi ở biển / chụp ảnh / nhặt vỏ sò / đi dạo trên bãi biển] phải không? - Vâng, đúng vậy. / Không phải.",
            sampleDialogue: [
              { speaker: "Mai", text: "Did you swim in the sea during your holiday, Tony?", textVi: "Kỳ nghỉ vừa rồi cậu có tắm biển không Tony?" },
              { speaker: "Tony", text: "Yes, I did! We swam every morning in Da Nang.", textVi: "Có chứ! Sáng nào tụi mình cũng tắm biển ở Đà Nẵng." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What did your family do? (Wh- Past Questions)",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u11-l2-v1",
            word: "eat seafood",
            clue: "To dine on delicious prawns, fish, crabs, and oysters from the sea",
            vietnameseMeaning: "ăn hải sản tươi ngon",
            phonics: "/iːt ˈsiːfuːd/",
            emoji: "🦀",
            grade: 5,
            unit: 11,
            topic: "Family Activities",
            exampleSentence: "What did your family do? - We ate fresh seafood by the sea.",
            distractors: ["burn grass", "sell vegetables", "drink ink"]
          },
          {
            id: "g5-u11-l2-v2",
            word: "take a boat trip around the bay",
            clue: "To sail on a scenic wooden cruise ship across calm sea waters",
            vietnameseMeaning: "đi thuyền ngắm cảnh quanh vịnh",
            phonics: "/teɪk ə bəʊt trɪp əˈraʊnd ðə beɪ/",
            emoji: "⛵",
            grade: 5,
            unit: 11,
            topic: "Family Activities",
            exampleSentence: "We took a wonderful boat trip around Ha Long Bay.",
            distractors: ["fly space rocket", "dig underground", "drive racecar"]
          },
          {
            id: "g5-u11-l2-v3",
            word: "buy souvenirs",
            clue: "To purchase small mementos or handicrafts to remember a holiday",
            vietnameseMeaning: "mua quà lưu niệm",
            phonics: "/baɪ ˌsuːvəˈnɪəz/",
            emoji: "🎁",
            grade: 5,
            unit: 11,
            topic: "Family Activities",
            exampleSentence: "Mom bought beautiful shell necklaces as souvenirs for friends.",
            distractors: ["throw coins", "lose keys", "waste tickets"]
          },
          {
            id: "g5-u11-l2-v4",
            word: "explore the cave",
            clue: "To enter and discover rock stalactites inside an underground cavern",
            vietnameseMeaning: "khám phá hang động",
            phonics: "/ɪkˈsplɔːr ðə keɪv/",
            emoji: "🔦",
            grade: 5,
            unit: 11,
            topic: "Family Activities",
            exampleSentence: "We explored Sung Sot Cave with a friendly tour guide.",
            distractors: ["paint roof", "lock doors", "wash windows"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What did your family do in [destination]? - We [took a boat trip / ate seafood / explored the cave / bought souvenirs].",
            vietnameseMeaning: "Gia đình bạn đã làm gì ở [địa điểm]? - Chúng mình đã [đi thuyền / ăn hải sản / khám phá hang động / mua quà lưu niệm].",
            sampleDialogue: [
              { speaker: "Linda", text: "What did your family do in Ha Long Bay?", textVi: "Gia đình bạn đã làm gì ở Vịnh Hạ Long?" },
              { speaker: "Nam", text: "We took a boat trip around the bay and ate grilled squid.", textVi: "Tụi mình đã đi thuyền quanh vịnh và ăn món mực nướng thơm lừng." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Golden Sunset in Nha Trang",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Spending holiday time with family makes us feel [warm / happy / connected].",
            vietnameseMeaning: "Kỳ nghỉ quây quần bên gia đình khiến chúng mình cảm thấy [ấm áp / hạnh phúc / gắn kết].",
            sampleDialogue: [
              { speaker: "Akiko", text: "Did your family enjoy the trip?", textVi: "Gia đình bạn có thích chuyến đi không?" },
              { speaker: "Phong", text: "Yes! Walking together under coconut palm trees was the sweetest moment.", textVi: "Có chứ! Cùng nhau rảo bước dưới những rặng dừa xanh là khoảnh khắc ngọt ngào nhất." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Warm Family Memories by the Shore",
          text: "Last month, Quan's family spent four sunny days in Nha Trang. In the morning, Quan and his father swam in the clear blue sea while mother walked on the beach collecting pink seashells. At noon, they ate delicious seafood at a local seaside restaurant. In the afternoon, they took a peaceful boat trip around Mun Island. Quan felt blessed for such heartwarming family time!",
          translationVi: "Tháng trước, gia đình Quân đã có bốn ngày nắng ấm ở Nha Trang. Buổi sáng, Quân cùng bố tắm biển trong làn nước xanh trong, còn mẹ thong thả dạo bước nhặt những chiếc vỏ ốc màu hồng. Buổi trưa, cả nhà thưởng thức hải sản thơm ngon tại một nhà hàng ven biển. Chiều đến, gia đình đi thuyền ngắm cảnh quanh Đảo Mun. Quân cảm thấy thật hạnh phúc khi có khoảng thời gian ấm áp bên gia đình!"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 12,
    unitTitle: "Our Tet holiday",
    unitTitleVi: "Dịp Tết của chúng mình",
    theme: "Me and My Family",
    icon: "🧧",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Preparations for Tet (Future Simple with Will)",
        focus: "vocabulary_phonics",
        phonicsSound: "/tʃ/ in peach vs /dʒ/ in jam",
        vocabulary: [
          {
            id: "g5-u12-l1-v1",
            word: "buy a branch of peach blossoms",
            clue: "Purchasing a leafy branch of pink flowers to bring spring luck into northern Vietnamese homes",
            vietnameseMeaning: "mua một cành hoa đào",
            phonics: "/baɪ ə brɑːntʃ əv ˈpiːtʃ ˈblɒsəmz/",
            emoji: "🌸",
            grade: 5,
            unit: 12,
            topic: "Tet Traditions",
            exampleSentence: "Will you buy a branch of peach blossoms at Tet? - Yes, we will.",
            distractors: ["cut grass", "burn wood", "sell stones"]
          },
          {
            id: "g5-u12-l1-v2",
            word: "decorate the house",
            clue: "To make rooms look festive and welcoming with red banners and flower pots",
            vietnameseMeaning: "trang hoàng nhà cửa",
            phonics: "/ˈdekəreɪt ðə haʊs/",
            emoji: "🏮",
            grade: 5,
            unit: 12,
            topic: "Tet Preparations",
            exampleSentence: "We will decorate the house before New Year's Eve.",
            distractors: ["break tables", "lock doors", "paint fences black"]
          },
          {
            id: "g5-u12-l1-v3",
            word: "make banh chung",
            clue: "To wrap traditional square sticky rice cakes with mung bean and pork in green dong leaves",
            vietnameseMeaning: "gói bánh chưng",
            phonics: "/meɪk bæn tʃʊŋ/",
            emoji: "🟩",
            grade: 5,
            unit: 12,
            topic: "Tet Foods",
            exampleSentence: "My grandparents will make banh chung tomorrow evening.",
            distractors: ["bake pizza", "fry potatoes", "boil pasta"]
          },
          {
            id: "g5-u12-l1-v4",
            word: "make spring rolls",
            clue: "To wrap seasoned minced meat, mushrooms, and noodles in thin rice paper and fry until crispy",
            vietnameseMeaning: "làm nem rán, chả giò",
            phonics: "/meɪk ˈsprɪŋ rəʊlz/",
            emoji: "🥢",
            grade: 5,
            unit: 12,
            topic: "Tet Foods",
            exampleSentence: "Mother and I will make spring rolls for our festive feast.",
            distractors: ["make ice cream", "bake bread", "drink tea"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Will you [buy peach blossoms / decorate the house / make banh chung] at Tet? - Yes, I/we will. / No, I/we won't.",
            vietnameseMeaning: "Bạn sẽ [mua cành đào / trang trí nhà / gói bánh chưng] vào dịp Tết chứ? - Vâng, tụi mình sẽ làm. / Không, tụi mình sẽ không.",
            sampleDialogue: [
              { speaker: "Tony", text: "Will you make banh chung at Tet, Mai?", textVi: "Cậu có gói bánh chưng vào dịp Tết không Mai?" },
              { speaker: "Mai", text: "Yes, we will! We sit around the big warm pot all night.", textVi: "Có chứ! Cả nhà mình cùng thức quanh nồi bánh chưng ấm áp suốt đêm." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Where will you go and what will you do at Tet?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u12-l2-v1",
            word: "visit relatives",
            clue: "Going to see extended family members, grandparents, uncles, and aunts",
            vietnameseMeaning: "đi thăm họ hàng, chúc Tết",
            phonics: "/ˈvɪzɪt ˈrelətɪvz/",
            emoji: "👨‍👩‍👦",
            grade: 5,
            unit: 12,
            topic: "Tet Customs",
            exampleSentence: "Where will you go at Tet? - I will visit my relatives in the countryside.",
            distractors: ["stay alone", "go to factory", "take school exam"]
          },
          {
            id: "g5-u12-l2-v2",
            word: "get lucky money",
            clue: "Receiving crisp new banknotes tucked inside bright red envelopes for good health and wisdom",
            vietnameseMeaning: "nhận tiền lì xì",
            phonics: "/ɡet ˈlʌki ˈmʌni/",
            emoji: "🧧",
            grade: 5,
            unit: 12,
            topic: "Tet Customs",
            exampleSentence: "Children wear new clothes and get lucky money from elders.",
            distractors: ["pay traffic fine", "lose coins", "lend books"]
          },
          {
            id: "g5-u12-l2-v3",
            word: "wear new clothes",
            clue: "Dressing in fresh, colorful garments symbolizing a prosperous start",
            vietnameseMeaning: "mặc quần áo mới",
            phonics: "/weər njuː kləʊðz/",
            emoji: "👗",
            grade: 5,
            unit: 12,
            topic: "Tet Customs",
            exampleSentence: "On the first day of Tet, we wear traditional ao dai or new clothes.",
            distractors: ["wear muddy boots", "wear old rags", "wear pajamas"]
          },
          {
            id: "g5-u12-l2-v4",
            word: "fireworks show",
            clue: "A spectacular public display of colorful sparks bursting across the midnight sky",
            vietnameseMeaning: "màn trình diễn pháo hoa",
            phonics: "/ˈfaɪəwɜːks ʃəʊ/",
            emoji: "🎆",
            grade: 5,
            unit: 12,
            topic: "Tet Events",
            exampleSentence: "We will watch the dazzling fireworks show on New Year's Eve.",
            distractors: ["dust storm", "thunder rain", "foggy mist"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Where will you go at Tet? - I will go to [destination]. What will you do? - I will [visit relatives / get lucky money].",
            vietnameseMeaning: "Bạn sẽ đi đâu vào dịp Tết? - Mình sẽ đến [địa điểm]. Bạn sẽ làm gì? - Mình sẽ [thăm họ hàng / nhận lì xì].",
            sampleDialogue: [
              { speaker: "Peter", text: "Where will you go at Tet, Nam?", textVi: "Tết này cậu sẽ đi đâu thế Nam?" },
              { speaker: "Nam", text: "I will go to my grandparents' hometown and visit my relatives.", textVi: "Mình sẽ về quê thăm ông bà và chúc Tết họ hàng." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Spring Breeze and Warm Wishes",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "I wish you a happy, healthy, and successful New Year!",
            vietnameseMeaning: "Chúc bạn một năm mới an khang, mạnh khỏe và vạn sự như ý!",
            sampleDialogue: [
              { speaker: "Mai", text: "Happy New Year, David! May peace and luck be with you!", textVi: "Chúc mừng năm mới David! Chúc bạn luôn bình an và may mắn!" },
              { speaker: "David", text: "Happy New Year! Thank you for sharing Vietnamese traditions with me!", textVi: "Chúc mừng năm mới! Cảm ơn bạn đã chia sẻ phong tục Tết Việt Nam với mình nhé!" }
            ]
          }
        ],
        readingMiniStory: {
          title: "The Joy of Lunar New Year in Vietnam",
          text: "Tet is the most beloved celebration in Vietnam. Three days before Tet, Lan's family cleaned every corner and decorated their living room with a glowing branch of peach blossoms. On the 30th evening, they wrapped and cooked twenty fragrant square banh chung. On New Year's Day, Lan put on a graceful red ao dai, wished her grandparents longevity, and joyfully received lucky money envelopes. Tet is truly a time of reunion and love!",
          translationVi: "Tết là ngày lễ thiêng liêng và được yêu quý nhất tại Việt Nam. Ba ngày trước Tết, gia đình Lan dọn dẹp mọi ngóc ngách và trang hoàng phòng khách với một cành đào rực rỡ sắc xuân. Tối 30, cả nhà quây quần gói và nấu hai mươi chiếc bánh chưng thơm phức. Sáng mùng một, Lan diện chiếc áo dài đỏ duyên dáng, kính cẩn chúc thọ ông bà và hân hoan đón nhận những phong bao lì xì đỏ thắm. Tết thật sự là khoảng thời gian của sum vầy và yêu thương!"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 13,
    unitTitle: "Our special days",
    unitTitleVi: "Những ngày đặc biệt của chúng mình",
    theme: "Me and My Family",
    icon: "🎉",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Festivals & What will you do at/on...?",
        focus: "vocabulary_phonics",
        phonicsSound: "/ɒn/ before Day vs /æt/ before Festivals",
        vocabulary: [
          {
            id: "g5-u13-l1-v1",
            word: "Mid-Autumn Festival",
            clue: "A harvest festival on the 15th of the 8th lunar month celebrating the full moon and children",
            vietnameseMeaning: "Tết Trung thu",
            phonics: "/ˌmɪd ˈɔːtəm ˈfestɪvl/",
            emoji: "🥮",
            grade: 5,
            unit: 13,
            topic: "Special Days",
            exampleSentence: "What will you do at Mid-Autumn Festival? - We'll carry star lanterns.",
            distractors: ["Christmas", "Easter", "Halloween"]
          },
          {
            id: "g5-u13-l1-v2",
            word: "Teachers' Day",
            clue: "A special day on 20th November in Vietnam to honor and show gratitude to teachers",
            vietnameseMeaning: "Ngày Nhà giáo Việt Nam (20/11)",
            phonics: "/ˈtiːtʃəz deɪ/",
            emoji: "💐",
            grade: 5,
            unit: 13,
            topic: "Special Days",
            exampleSentence: "On Teachers' Day, we will present red roses to our teachers.",
            distractors: ["Sports Day", "Labour Day", "Earth Day"]
          },
          {
            id: "g5-u13-l1-v3",
            word: "Children's Day",
            clue: "International festival celebrated on the first of June to celebrate kids",
            vietnameseMeaning: "Ngày Quốc tế Thiếu nhi (1/6)",
            phonics: "/ˈtʃɪldrənz deɪ/",
            emoji: "🎈",
            grade: 5,
            unit: 13,
            topic: "Special Days",
            exampleSentence: "What will you do on Children's Day? - We will play fun games in the park.",
            distractors: ["New Year's Day", "National Day", "Winter Break"]
          },
          {
            id: "g5-u13-l1-v4",
            word: "Sports Day",
            clue: "A vibrant day when students compete in running races, tug-of-war, and relays",
            vietnameseMeaning: "Ngày hội thể thao",
            phonics: "/spɔːts deɪ/",
            emoji: "🏃‍♂️",
            grade: 5,
            unit: 13,
            topic: "Special Days",
            exampleSentence: "On Sports Day, Quan will run in the 100-meter race.",
            distractors: ["Book Day", "Art Fair", "Math League"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What will you do [at Mid-Autumn Festival / on Teachers' Day / on Children's Day]? - We'll [action].",
            vietnameseMeaning: "Bạn sẽ làm gì [vào dịp Tết Trung thu / ngày Nhà giáo / ngày Thiếu nhi]? - Tụi mình sẽ [hành động].",
            sampleDialogue: [
              { speaker: "Tony", text: "What will you do at Mid-Autumn Festival, Mai?", textVi: "Cậu sẽ làm gì vào dịp Tết Trung thu vậy Mai?" },
              { speaker: "Mai", text: "We'll join the star lantern parade and eat sweet mooncakes.", textVi: "Tụi mình sẽ tham gia rước đèn ông sao và ăn bánh trung thu ngọt lịm." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What food and drink will you have at the party?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u13-l2-v1",
            word: "apple juice",
            clue: "A delicious, sweet fruit juice pressed from ripe apples",
            vietnameseMeaning: "nước ép táo",
            phonics: "/ˈæpl dʒuːs/",
            emoji: "🧃",
            grade: 5,
            unit: 13,
            topic: "Party Food & Drinks",
            exampleSentence: "What drink will you have? - I'll have some fresh apple juice.",
            distractors: ["hot coffee", "fizzy soda", "cold soup"]
          },
          {
            id: "g5-u13-l2-v2",
            word: "lemonade",
            clue: "A refreshing drink made from lemon juice, water, and sugar",
            vietnameseMeaning: "nước chanh",
            phonics: "/ˌleməˈneɪd/",
            emoji: "🍋",
            grade: 5,
            unit: 13,
            topic: "Party Food & Drinks",
            exampleSentence: "We will make iced lemonade for our Children's Day party.",
            distractors: ["salty brine", "warm milk", "black tea"]
          },
          {
            id: "g5-u13-l2-v3",
            word: "milk tea",
            clue: "A popular sweetened tea mixed with rich milk and tapioca pearls",
            vietnameseMeaning: "trà sữa",
            phonics: "/mɪlk tiː/",
            emoji: "🧋",
            grade: 5,
            unit: 13,
            topic: "Party Food & Drinks",
            exampleSentence: "Many students love drinking brown sugar milk tea at class parties.",
            distractors: ["vinegar", "spicy broth", "pure oil"]
          },
          {
            id: "g5-u13-l2-v4",
            word: "pizza",
            clue: "A round baked flatbread topped with tomato sauce, melted cheese, and toppings",
            vietnameseMeaning: "bánh pít-za (pizza)",
            phonics: "/ˈpiːtsə/",
            emoji: "🍕",
            grade: 5,
            unit: 13,
            topic: "Party Food & Drinks",
            exampleSentence: "What food will you have at the celebration? - We'll have hot cheese pizza.",
            distractors: ["plain rice", "dry crackers", "raw onions"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What food/drink will you have at the party? - I'll / We'll have [pizza / apple juice / milk tea / lemonade].",
            vietnameseMeaning: "Bạn sẽ dùng món ăn/đồ uống gì ở bữa tiệc? - Mình sẽ dùng [pizza / nước ép táo / trà sữa / nước chanh].",
            sampleDialogue: [
              { speaker: "Linda", text: "What drink will you have at the party, Quan?", textVi: "Cậu sẽ uống gì trong bữa tiệc thế Quân?" },
              { speaker: "Quan", text: "I'll have some chilled apple juice and a slice of pizza.", textVi: "Mình sẽ uống nước ép táo mát lạnh và ăn một miếng pizza." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: A Joyful Mid-Autumn Night",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "On [special day], we celebrate together with our beloved teachers and classmates.",
            vietnameseMeaning: "Vào [ngày lễ đặc biệt], chúng mình cùng nhau đón chào bên thầy cô và bạn bè thân yêu.",
            sampleDialogue: [
              { speaker: "Peter", text: "Are you ready for the lantern parade tonight?", textVi: "Tối nay các cậu đã sẵn sàng cho lễ rước đèn chưa?" },
              { speaker: "Hoa", text: "Yes, our five-pointed star lanterns glow bright yellow and red!", textVi: "Rồi chứ, những chiếc đèn lồng ông sao năm cánh của tụi mình đang sáng rực rỡ màu vàng đỏ!" }
            ]
          }
        ],
        readingMiniStory: {
          title: "Full Moon Celebration in Class 5A",
          text: "Tonight is Mid-Autumn Festival, one of our favorite special days. The school yard is decorated with hundreds of colorful star lanterns. Students gathered to watch a thrilling lion dance accompanied by pounding drums. Afterwards, our teacher shared sweet lotus-seed mooncakes, crispy chips, and cool apple juice. Everyone laughed merrily under the silvery moonlight!",
          translationVi: "Tối nay là Tết Trung thu, một trong những ngày lễ đặc biệt mà chúng mình yêu thích nhất. Sân trường được trang hoàng với hàng trăm chiếc đèn ông sao rực rỡ sắc màu. Các bạn học sinh tụ họp reo hò xem màn múa lân sư rồng sôi động hòa cùng tiếng trống rộn rã. Sau đó, cô giáo chia cho chúng mình những chiếc bánh trung thu hạt sen ngọt ngào, khoai tây giòn rụm và nước ép táo mát lành. Ai nấy đều cười rạng rỡ dưới ánh trăng rằm sáng vằng vặc!"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 14,
    unitTitle: "Staying healthy",
    unitTitleVi: "Giữ gìn sức khỏe",
    theme: "Me and My Family",
    icon: "🥗",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: How do you stay healthy? (Habits)",
        focus: "vocabulary_phonics",
        phonicsSound: "/eə/ in exercise vs /əʊ/ in yoga",
        vocabulary: [
          {
            id: "g5-u14-l1-v1",
            word: "do morning exercise",
            clue: "To stretch and move your body each morning to wake up muscles",
            vietnameseMeaning: "tập thể dục buổi sáng",
            phonics: "/duː ˈmɔːnɪŋ ˈeksəsaɪz/",
            emoji: "🤸",
            grade: 5,
            unit: 14,
            topic: "Healthy Living",
            exampleSentence: "How do you stay healthy? - I do morning exercise every day.",
            distractors: ["sleep late", "eat chips", "watch phone"]
          },
          {
            id: "g5-u14-l1-v2",
            word: "do yoga",
            clue: "A Hindu spiritual and physical discipline of postures, breathing, and meditation",
            vietnameseMeaning: "tập yoga",
            phonics: "/duː ˈjəʊɡə/",
            emoji: "🧘",
            grade: 5,
            unit: 14,
            topic: "Healthy Living",
            exampleSentence: "How does your mother stay healthy? - She does yoga twice a week.",
            distractors: ["fight enemies", "lift cars", "run in mud"]
          },
          {
            id: "g5-u14-l1-v3",
            word: "do judo",
            clue: "A Japanese martial art emphasizing throws and balance",
            vietnameseMeaning: "tập võ judo",
            phonics: "/duː ˈdʒuːdəʊ/",
            emoji: "🥋",
            grade: 5,
            unit: 14,
            topic: "Healthy Living",
            exampleSentence: "Phong stays fit and strong because he does judo three times a week.",
            distractors: ["eat sweets", "stay indoors", "read comics in bed"]
          },
          {
            id: "g5-u14-l1-v4",
            word: "eat healthy food",
            clue: "Nutritious balanced meals with fresh vegetables, fruit, fish, and clean water",
            vietnameseMeaning: "ăn thức ăn lành mạnh, bổ dưỡng",
            phonics: "/iːt ˈhelθi fuːd/",
            emoji: "🥦",
            grade: 5,
            unit: 14,
            topic: "Healthy Living",
            exampleSentence: "You should eat healthy food like green vegetables and fresh eggs.",
            distractors: ["eat too many candies", "drink salty soda", "skip breakfast"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "How do/does [you / he / she] stay healthy? - [I / He / She] [do/does morning exercise / do/does yoga / play/plays sports].",
            vietnameseMeaning: "Làm thế nào để [bạn / cậu ấy / cô ấy] giữ gìn sức khỏe? - [Mình / Cậu ấy / Cô ấy] [tập thể dục buổi sáng / tập yoga / chơi thể thao].",
            sampleDialogue: [
              { speaker: "Doctor", text: "How do you stay healthy, Nam?", textVi: "Cháu rèn luyện sức khỏe như thế nào vậy Nam?" },
              { speaker: "Nam", text: "I do morning exercise every day and play badminton after school.", textVi: "Cháu tập thể dục buổi sáng mỗi ngày và chơi cầu lông sau giờ học ạ." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: How often do you...? (Frequency Expressions)",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u14-l2-v1",
            word: "drink fresh juice",
            clue: "Drinking freshly squeezed juice from oranges, watermelons, or carrots",
            vietnameseMeaning: "uống nước ép trái cây tươi",
            phonics: "/drɪŋk freʃ dʒuːs/",
            emoji: "🍹",
            grade: 5,
            unit: 14,
            topic: "Healthy Habits",
            exampleSentence: "How often does he drink fresh juice? - He drinks it every day.",
            distractors: ["drink boiling oil", "drink dirty water", "skip fluids"]
          },
          {
            id: "g5-u14-l2-v2",
            word: "eat vegetables",
            clue: "Consuming greens like spinach, carrots, cabbage, and broccoli",
            vietnameseMeaning: "ăn rau củ quả",
            phonics: "/iːt ˈvedʒtəblz/",
            emoji: "🥕",
            grade: 5,
            unit: 14,
            topic: "Healthy Habits",
            exampleSentence: "Eating vegetables every day provides vital vitamins and fiber.",
            distractors: ["eat plastic bags", "eat sugar cubes", "eat spoiled bread"]
          },
          {
            id: "g5-u14-l2-v3",
            word: "every day",
            clue: "Each day without skipping; daily",
            vietnameseMeaning: "mỗi ngày, hằng ngày",
            phonics: "/ˈevri deɪ/",
            emoji: "📅",
            grade: 5,
            unit: 14,
            topic: "Frequency Expressions",
            exampleSentence: "I drink two liters of pure water every day.",
            distractors: ["once a year", "never", "hardly"]
          },
          {
            id: "g5-u14-l2-v4",
            word: "twice a week",
            clue: "Happening two times within seven days",
            vietnameseMeaning: "hai lần một tuần",
            phonics: "/twaɪs ə wiːk/",
            emoji: "✌️",
            grade: 5,
            unit: 14,
            topic: "Frequency Expressions",
            exampleSentence: "She practices swimming twice a week at the community pool.",
            distractors: ["ten times an hour", "never", "every second"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "How often do/does [subject] [habit]? - [Subject] [action] [every day / twice a week / three times a week].",
            vietnameseMeaning: "[Ai đó] có thường [làm thói quen] không? - [Ai đó] làm việc đó [mỗi ngày / hai lần một tuần / ba lần một tuần].",
            sampleDialogue: [
              { speaker: "Peter", text: "How often do you drink fresh orange juice?", textVi: "Bạn có thường uống nước cam ép tươi không?" },
              { speaker: "Mai", text: "I drink it three times a week after my sports practice.", textVi: "Mình uống ba lần một tuần sau khi luyện tập thể thao." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: A Daily Plan for Health and Energy",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Maintaining regular exercise and healthy food gives us boundless energy to study well.",
            vietnameseMeaning: "Duy trì tập thể dục đều đặn và ăn uống lành mạnh mang lại năng lượng tràn đầy để học tốt.",
            sampleDialogue: [
              { speaker: "Teacher", text: "Why is physical health important for fifth graders?", textVi: "Tại sao sức khỏe thể chất lại quan trọng với học sinh lớp 5?" },
              { speaker: "An", text: "Because a healthy body keeps our mind clear, active, and cheerful!", textVi: "Bởi vì một cơ thể khỏe mạnh giúp trí óc chúng em minh mẫn, năng động và vui tươi!" }
            ]
          }
        ],
        readingMiniStory: {
          title: "Minh's Secrets to an Energetic Day",
          text: "Minh is known as the most active boy in Class 5A. When asked how he stays healthy, Minh smiles: 'I start every morning with fifteen minutes of exercise. I drink fresh carrot juice every day and eat lots of green vegetables at lunch. In the afternoon, I do judo twice a week with my instructor. Regular habits keep me strong, happy, and ready for any challenge!'",
          translationVi: "Minh được biết đến là cậu bạn năng động nhất lớp 5A. Khi được hỏi làm thế nào để luôn giữ gìn sức khỏe, Minh mỉm cười: 'Mỗi sáng tớ đều bắt đầu bằng mười lăm phút tập thể dục. Tớ uống nước ép cà rốt tươi mỗi ngày và ăn thật nhiều rau xanh vào bữa trưa. Buổi chiều, tớ tập võ judo hai lần một tuần cùng thầy giáo. Những thói quen điều độ giúp tớ khỏe mạnh, vui vẻ và sẵn sàng đón nhận mọi thử thách!'"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 15,
    unitTitle: "Our health",
    unitTitleVi: "Sức khỏe của chúng mình",
    theme: "Me and My Family",
    icon: "🩺",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Common Ailments & What's the matter with you?",
        focus: "vocabulary_phonics",
        phonicsSound: "/eɪk/ in toothache, headache, stomachache",
        vocabulary: [
          {
            id: "g5-u15-l1-v1",
            word: "toothache",
            clue: "A sharp or throbbing pain located in a tooth or jaw",
            vietnameseMeaning: "bệnh đau răng",
            phonics: "/ˈtuːθeɪk/",
            emoji: "🦷",
            grade: 5,
            unit: 15,
            topic: "Health Problems",
            exampleSentence: "What's the matter with you? - I have a bad toothache.",
            distractors: ["fever", "cut", "cough"]
          },
          {
            id: "g5-u15-l1-v2",
            word: "headache",
            clue: "A continuous pain in your head",
            vietnameseMeaning: "đau đầu, nhức đầu",
            phonics: "/ˈhedeɪk/",
            emoji: "🤕",
            grade: 5,
            unit: 15,
            topic: "Health Problems",
            exampleSentence: "He worked on the computer for hours and now has a headache.",
            distractors: ["broken arm", "sore throat", "bruise"]
          },
          {
            id: "g5-u15-l1-v3",
            word: "sore throat",
            clue: "A painful and irritated feeling in the throat when swallowing",
            vietnameseMeaning: "viêm họng, rát họng",
            phonics: "/sɔː θrəʊt/",
            emoji: "🗣️",
            grade: 5,
            unit: 15,
            topic: "Health Problems",
            exampleSentence: "She has a sore throat, so she cannot sing today.",
            distractors: ["toothache", "stomachache", "sprain"]
          },
          {
            id: "g5-u15-l1-v4",
            word: "stomachache",
            clue: "Pain in your stomach or abdomen, often caused by indigestion",
            vietnameseMeaning: "đau bụng, đau dạ dày",
            phonics: "/ˈstʌmək eɪk/",
            emoji: "🤢",
            grade: 5,
            unit: 15,
            topic: "Health Problems",
            exampleSentence: "Phong has a stomachache because he ate unripe green mangoes.",
            distractors: ["headache", "cold", "flu"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What's the matter with you / him / her? - I / He / She have/has a [toothache / headache / sore throat / stomachache].",
            vietnameseMeaning: "Có chuyện gì với [bạn / cậu ấy / cô ấy] vậy? - [Tôi / Cậu ấy / Cô ấy] bị [đau răng / đau đầu / đau họng / đau bụng].",
            sampleDialogue: [
              { speaker: "Tony", text: "What's the matter with you, Quan?", textVi: "Cậu bị làm sao thế Quân?" },
              { speaker: "Quan", text: "I have a sore throat and feel quite tired.", textVi: "Mình bị đau rát họng và thấy người khá mệt." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Giving Advice with Should and Shouldn't",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u15-l2-v1",
            word: "go to the dentist",
            clue: "Visiting a licensed dental practitioner to treat tooth decay or pain",
            vietnameseMeaning: "đi khám nha sĩ",
            phonics: "/ɡəʊ tuː ðə ˈdentɪst/",
            emoji: "🥼",
            grade: 5,
            unit: 15,
            topic: "Health Advice",
            exampleSentence: "You have a toothache; you should go to the dentist.",
            distractors: ["eat candies", "drink icy cola", "bite bones"]
          },
          {
            id: "g5-u15-l2-v2",
            word: "have a rest",
            clue: "To stop working and lie down in a quiet room to recover",
            vietnameseMeaning: "nghỉ ngơi tĩnh dưỡng",
            phonics: "/hæv ə rest/",
            emoji: "🛌",
            grade: 5,
            unit: 15,
            topic: "Health Advice",
            exampleSentence: "You look exhausted; you should have a rest.",
            distractors: ["run a marathon", "lift heavy boxes", "dance all night"]
          },
          {
            id: "g5-u15-l2-v3",
            word: "drink warm water",
            clue: "Consuming warm water or herbal infusion to soothe the vocal cords",
            vietnameseMeaning: "uống nước ấm",
            phonics: "/drɪŋk wɔːm ˈwɔːtər/",
            emoji: "🍵",
            grade: 5,
            unit: 15,
            topic: "Health Advice",
            exampleSentence: "When you have a sore throat, you should drink warm water.",
            distractors: ["drink ice water", "eat spicy chili", "shout loud"]
          },
          {
            id: "g5-u15-l2-v4",
            word: "take some medicine",
            clue: "Swallowing prescribed medicinal pills or syrup to alleviate illness",
            vietnameseMeaning: "uống thuốc (theo chỉ dẫn)",
            phonics: "/teɪk sʌm ˈmedsn/",
            emoji: "💊",
            grade: 5,
            unit: 15,
            topic: "Health Advice",
            exampleSentence: "The school nurse told him to take some medicine and rest.",
            distractors: ["eat junk food", "go swimming", "play football"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "You should [go to the dentist / have a rest / drink warm water]. You shouldn't [eat too many sweets / stay up late].",
            vietnameseMeaning: "Bạn nên [đi khám nha sĩ / nghỉ ngơi / uống nước ấm]. Bạn không nên [ăn quá nhiều kẹo / thức khuya].",
            sampleDialogue: [
              { speaker: "Lan", text: "My tooth hurts terribly, teacher.", textVi: "Răng em đau buốt quá cô ơi." },
              { speaker: "Teacher", text: "You should go to the dentist right away, and you shouldn't eat hard candy.", textVi: "Em nên đi khám nha sĩ ngay, và tuyệt đối không nên ăn kẹo cứng nhé." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: A Visit to the School Clinic",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "I hope you get well soon! Remember to follow the doctor's advice.",
            vietnameseMeaning: "Mong bạn sớm khỏe lại nhé! Nhớ làm theo lời khuyên của bác sĩ.",
            sampleDialogue: [
              { speaker: "Nam", text: "How is your throat today, David?", textVi: "Họng của bạn hôm nay đỡ chưa David?" },
              { speaker: "David", text: "Much better! I drank warm honey water and took a long rest.", textVi: "Đỡ nhiều rồi! Mình đã uống nước mật ong ấm và nghỉ ngơi thật nhiều." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Care at the School Medical Room",
          text: "During third period, Mary felt a sharp headache and a sore throat. Her classmate helped her walk downstairs to the school clinic. Nurse Hanh warmly examined Mary and checked her temperature. 'You have caught a mild cold, Mary. You should drink this warm water and have a rest on the clinic bed. Also, you shouldn't drink iced water today.' With gentle care, Mary felt relieved and rested peacefully.",
          translationVi: "Vào tiết học thứ ba, Mary cảm thấy đau đầu và rát họng dữ dội. Bạn cùng lớp đã dìu Mary xuống phòng y tế trường. Cô Hạnh - nhân viên y tế - ân cần thăm khám và cặp nhiệt độ cho Mary: 'Em bị cảm lạnh nhẹ rồi Mary à. Em nên uống cốc nước ấm này và nằm nghỉ trên giường y tế nhé. Ngoài ra, hôm nay em tuyệt đối không nên uống nước đá.' Nhờ sự chăm sóc dịu dàng, Mary đã cảm thấy đỡ hơn và yên tâm nghỉ ngơi."
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 16,
    unitTitle: "Seasons and the weather",
    unitTitleVi: "Các mùa và thời tiết",
    theme: "The World Around Us",
    icon: "🌦️",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Seasons & What's the weather like in...?",
        focus: "vocabulary_phonics",
        phonicsSound: "/ɔː/ in autumn vs /ɪ/ in winter",
        vocabulary: [
          {
            id: "g5-u16-l1-v1",
            word: "spring",
            clue: "The fresh season between winter and summer when trees sprout new buds",
            vietnameseMeaning: "mùa xuân",
            phonics: "/sprɪŋ/",
            emoji: "🌱",
            grade: 5,
            unit: 16,
            topic: "Seasons",
            exampleSentence: "What's the weather like in spring? - It's warm and humid.",
            distractors: ["summer", "autumn", "winter"]
          },
          {
            id: "g5-u16-l1-v2",
            word: "summer",
            clue: "The hottest season of the year with plenty of sunshine and cicada songs",
            vietnameseMeaning: "mùa hè, mùa hạ",
            phonics: "/ˈsʌmər/",
            emoji: "☀️",
            grade: 5,
            unit: 16,
            topic: "Seasons",
            exampleSentence: "Summer in Central Vietnam is very hot and sunny.",
            distractors: ["winter", "autumn", "spring"]
          },
          {
            id: "g5-u16-l1-v3",
            word: "autumn",
            clue: "The cool romantic season when tree leaves turn amber and fall to earth",
            vietnameseMeaning: "mùa thu",
            phonics: "/ˈɔːtəm/",
            emoji: "🍂",
            grade: 5,
            unit: 16,
            topic: "Seasons",
            exampleSentence: "Autumn in Hanoi is cool, breezy, and pleasant.",
            distractors: ["spring", "summer", "snowstorm"]
          },
          {
            id: "g5-u16-l1-v4",
            word: "winter",
            clue: "The coldest season of the year when north winds blow chilly air",
            vietnameseMeaning: "mùa đông",
            phonics: "/ˈwɪntər/",
            emoji: "❄️",
            grade: 5,
            unit: 16,
            topic: "Seasons",
            exampleSentence: "In winter, people bundle up in thick woollen coats.",
            distractors: ["summer", "hot period", "dry season"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What's the weather like in [spring / summer / autumn / winter]? - It's [warm / hot and sunny / cool and windy / cold].",
            vietnameseMeaning: "Thời tiết vào [mùa xuân / mùa hè / mùa thu / mùa đông] như thế nào? - Trời [ấm áp / nóng có nắng / mát mẻ có gió / giá lạnh].",
            sampleDialogue: [
              { speaker: "Tony", text: "What's the weather like in autumn in Hanoi, Mai?", textVi: "Thời tiết mùa thu ở Hà Nội như thế nào vậy Mai?" },
              { speaker: "Mai", text: "It's cool, breezy, and very pleasant with golden sunshine.", textVi: "Trời mát mẻ, có gió heo may nhẹ và ánh nắng vàng hanh rất dễ chịu." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What do you wear in...? (Weather Clothes)",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u16-l2-v1",
            word: "coat",
            clue: "An outer garment with sleeves worn outdoors for extra warmth",
            vietnameseMeaning: "áo khoác ấm, áo măng-tô",
            phonics: "/kəʊt/",
            emoji: "🧥",
            grade: 5,
            unit: 16,
            topic: "Clothes",
            exampleSentence: "What do you wear in winter? - I wear a thick warm coat.",
            distractors: ["swimsuit", "sandals", "sunglasses"]
          },
          {
            id: "g5-u16-l2-v2",
            word: "scarf",
            clue: "A strip of warm wool or silk worn around the neck",
            vietnameseMeaning: "khăn choàng cổ",
            phonics: "/skɑːf/",
            emoji: "🧣",
            grade: 5,
            unit: 16,
            topic: "Clothes",
            exampleSentence: "My mother knitted a lovely red scarf for me.",
            distractors: ["belt", "goggles", "slippers"]
          },
          {
            id: "g5-u16-l2-v3",
            word: "cap",
            clue: "A close-fitting hat with a front visor to shield eyes from the sun",
            vietnameseMeaning: "mũ lưỡi trai",
            phonics: "/kæp/",
            emoji: "🧢",
            grade: 5,
            unit: 16,
            topic: "Clothes",
            exampleSentence: "When it's hot and sunny, I wear a T-shirt and a cap.",
            distractors: ["rain boots", "thick gloves", "fur muffler"]
          },
          {
            id: "g5-u16-l2-v4",
            word: "jacket",
            clue: "A waist- or hip-length lightweight outer coat",
            vietnameseMeaning: "áo khoác lửng, áo jacket",
            phonics: "/ˈdʒækɪt/",
            emoji: "🧥",
            grade: 5,
            unit: 16,
            topic: "Clothes",
            exampleSentence: "Put on your light jacket; the autumn morning is windy.",
            distractors: ["shorts", "swim fins", "towel"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What do you wear in [winter / summer / cold weather]? - I wear a [coat / scarf / T-shirt and cap / jacket].",
            vietnameseMeaning: "Bạn mặc gì vào [mùa đông / mùa hè / trời lạnh]? - Mình mặc [áo khoác / quàng khăn / áo phông và đội mũ / áo jacket].",
            sampleDialogue: [
              { speaker: "Peter", text: "What do you wear in winter, Quan?", textVi: "Cậu mặc gì vào mùa đông hả Quân?" },
              { speaker: "Quan", text: "I wear a warm down jacket and a woollen scarf.", textVi: "Mình mặc áo phao ấm và quàng khăn len." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: The Changing Seasons Across Vietnam",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Every season brings its own beauty and unique charm.",
            vietnameseMeaning: "Mỗi mùa đều mang một vẻ đẹp và nét quyến rũ riêng.",
            sampleDialogue: [
              { speaker: "Lucy", text: "Which season do you like best?", textVi: "Bạn thích mùa nào nhất?" },
              { speaker: "Hoa", text: "I love autumn best because the weather is mild and comfortable for outdoor cycling.", textVi: "Mình thích mùa thu nhất vì thời tiết mát dịu, đạp xe ngoài trời rất thích." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Four Seasons of Hanoi",
          text: "Hanoi is renowned for having four clearly marked seasons. In spring, delicate drizzles nourish pink peach blossoms across Nhat Tan gardens. Summer arrives with bright sunlight, blooming red flamboyant flowers, and lively cicadas. In autumn, the fragrance of milky flowers fills the cool breeze. Winter turns chilly, prompting everyone to put on warm jackets and colourful scarves. Each season paints our city in poetic beauty!",
          translationVi: "Hà Nội nổi tiếng với bốn mùa rõ rệt trong năm. Vào mùa xuân, những hạt mưa phùn nhẹ nhàng tưới mát cho những luống hoa đào Nhật Tân bung nở. Mùa hè đến cùng ánh nắng rực rỡ, sắc hoa phượng vĩ đỏ thắm và tiếng ve ngân vang. Mùa thu mang hương hoa sữa nồng nàn lan tỏa trong làn gió mát lành. Mùa đông trời chuyển rét, mọi người khoác lên mình những chiếc áo ấm và khăn quàng rực rỡ. Mỗi mùa đều tô điểm cho thủ đô vẻ đẹp thật nên thơ!"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 17,
    unitTitle: "Stories for children",
    unitTitleVi: "Những câu chuyện dành cho thiếu nhi",
    theme: "The World Around Us",
    icon: "📖",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Main Characters in Stories (Who are they?)",
        focus: "vocabulary_phonics",
        phonicsSound: "/eə/ in hare vs /ɔː/ in tortoise",
        vocabulary: [
          {
            id: "g5-u17-l1-v1",
            word: "hare",
            clue: "A fast-running mammal resembling a large rabbit with long ears and strong hind legs",
            vietnameseMeaning: "con thỏ rừng",
            phonics: "/heər/",
            emoji: "🐇",
            grade: 5,
            unit: 17,
            topic: "Story Characters",
            exampleSentence: "Who are the main characters in the fable? - They're the hare and the tortoise.",
            distractors: ["bear", "lion", "tiger"]
          },
          {
            id: "g5-u17-l1-v2",
            word: "tortoise",
            clue: "A slow-moving land reptile with a hard rounded shell",
            vietnameseMeaning: "con rùa",
            phonics: "/ˈtɔːtəs/",
            emoji: "🐢",
            grade: 5,
            unit: 17,
            topic: "Story Characters",
            exampleSentence: "The tortoise walked steadily and won the race in the end.",
            distractors: ["frog", "lizard", "snail"]
          },
          {
            id: "g5-u17-l1-v3",
            word: "ant",
            clue: "A small, industrious insect that lives in colonies and works hard all summer",
            vietnameseMeaning: "con kiến",
            phonics: "/ænt/",
            emoji: "🐜",
            grade: 5,
            unit: 17,
            topic: "Story Characters",
            exampleSentence: "The ant worked tirelessly to gather food for the winter.",
            distractors: ["bee", "wasp", "fly"]
          },
          {
            id: "g5-u17-l1-v4",
            word: "grasshopper",
            clue: "A plant-eating insect that sings and jumps with long hind legs",
            vietnameseMeaning: "con châu chấu",
            phonics: "/ˈɡrɑːshɒpər/",
            emoji: "🦗",
            grade: 5,
            unit: 17,
            topic: "Story Characters",
            exampleSentence: "The grasshopper sang beautifully all summer but forgot to save food.",
            distractors: ["beetle", "spider", "caterpillar"]
          },
          {
            id: "g5-u17-l1-v5",
            word: "Snow White",
            clue: "A beloved fairy tale princess with skin as white as snow and seven little dwarf friends",
            vietnameseMeaning: "Nàng Bạch Tuyết",
            phonics: "/snəʊ waɪt/",
            emoji: "👸",
            grade: 5,
            unit: 17,
            topic: "Story Characters",
            exampleSentence: "Do you like Snow White? - Yes, I do. She is gentle and kind.",
            distractors: ["Cinderella", "Rapunzel", "Ariel"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Who are the main characters in the story? - They're [the hare and the tortoise / Snow White and the dwarfs].",
            vietnameseMeaning: "Ai là các nhân vật chính trong câu chuyện? - Đó là [thỏ và rùa / Bạch Tuyết và bảy chú lùn].",
            sampleDialogue: [
              { speaker: "Tony", text: "Who are the main characters in 'The Tortoise and the Hare'?", textVi: "Ai là những nhân vật chính trong truyện 'Rùa và Thỏ'?" },
              { speaker: "Mai", text: "They're a proud hare and a patient tortoise.", textVi: "Đó là một chú thỏ kiêu ngạo và một bác rùa kiên trì." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What is the character like? (Traits & Actions)",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u17-l2-v1",
            word: "run fast",
            clue: "To sprint with great speed across the track",
            vietnameseMeaning: "chạy nhanh",
            phonics: "/rʌn fɑːst/",
            emoji: "💨",
            grade: 5,
            unit: 17,
            topic: "Character Actions",
            exampleSentence: "The hare can run very fast, but he was overconfident.",
            distractors: ["walk slowly", "crawl down", "swim deep"]
          },
          {
            id: "g5-u17-l2-v2",
            word: "work hard",
            clue: "To put diligent, persistent effort into labor without quitting",
            vietnameseMeaning: "làm việc chăm chỉ",
            phonics: "/wɜːk hɑːd/",
            emoji: "💪",
            grade: 5,
            unit: 17,
            topic: "Character Actions",
            exampleSentence: "The little ant worked hard all summer long.",
            distractors: ["sleep all day", "waste time", "play video games"]
          },
          {
            id: "g5-u17-l2-v3",
            word: "sing beautifully",
            clue: "To produce sweet and melodious vocal songs",
            vietnameseMeaning: "hát rất hay",
            phonics: "/sɪŋ ˈbjuːtɪfli/",
            emoji: "🎤",
            grade: 5,
            unit: 17,
            topic: "Character Actions",
            exampleSentence: "The grasshopper sang beautifully on sunny branches.",
            distractors: ["cry loudly", "bark fierce", "whisper low"]
          },
          {
            id: "g5-u17-l2-v4",
            word: "cook well",
            clue: "To prepare delicious and nourishing meals skillfully",
            vietnameseMeaning: "nấu ăn giỏi, nấu ăn ngon",
            phonics: "/kʊk wel/",
            emoji: "🍳",
            grade: 5,
            unit: 17,
            topic: "Character Actions",
            exampleSentence: "Snow White cooked well for the seven friendly dwarfs.",
            distractors: ["burn bread", "spill soup", "break plates"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What is [character] like? - He/She/It is [hard-working / clever / kind / patient].",
            vietnameseMeaning: "[Nhân vật] là người/con vật như thế nào? - Cậu ấy/Cô ấy/Nó rất [chăm chỉ / thông minh / tốt bụng / kiên nhẫn].",
            sampleDialogue: [
              { speaker: "Linda", text: "What is the tortoise like?", textVi: "Chú rùa là người như thế nào?" },
              { speaker: "Nam", text: "It is patient, hard-working, and never gives up.", textVi: "Nó rất kiên trì, cần mẫn và không bao giờ bỏ cuộc." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: The Timeless Tale of the Race",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "The story teaches us that [slow and steady wins the race / hard work pays off].",
            vietnameseMeaning: "Câu chuyện dạy chúng ta bài học rằng [chậm mà chắc sẽ chiến thắng / chăm chỉ ắt có thành quả].",
            sampleDialogue: [
              { speaker: "Teacher", text: "What moral lesson does the fable give us?", textVi: "Truyện ngụ ngôn đem đến bài học đạo đức gì cho chúng ta?" },
              { speaker: "An", text: "We should never be arrogant, but stay humble and persistent like the tortoise!", textVi: "Chúng ta không nên kiêu ngạo, mà hãy luôn khiêm tốn và kiên định như chú rùa ạ!" }
            ]
          }
        ],
        readingMiniStory: {
          title: "The Race in the Green Forest",
          text: "Once upon a time, a proud hare laughed at a slow tortoise. The tortoise challenged the hare to a running contest through the forest. Confident of winning easily, the hare stopped to take a long nap under an oak tree. Meanwhile, the tortoise walked steadily step by step without resting. When the hare awoke, the tortoise had already crossed the finish line! All forest animals cheered for the persevering tortoise.",
          translationVi: "Ngày xửa ngày xưa, một chú thỏ kiêu ngạo đã chế giễu bác rùa bước đi chậm chạp. Bác rùa liền thách đấu thỏ trong một cuộc chạy đua xuyên rừng. Tự tin sẽ thắng dễ dàng, thỏ đã dừng lại đánh một giấc ngủ say sưa dưới bóng cây sồi. Trong khi đó, rùa từng bước từng bước vững vàng tiến lên mà không hề nghỉ ngơi. Khi thỏ tỉnh giấc, rùa đã cán đích từ lâu! Muôn thú trong rừng reo hò chúc mừng chú rùa kiên trì bền bỉ."
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 18,
    unitTitle: "Means of transport",
    unitTitleVi: "Các phương tiện giao thông",
    theme: "The World Around Us",
    icon: "🚆",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Where do you want to visit? (Landmarks)",
        focus: "vocabulary_phonics",
        phonicsSound: "/br/ in bridge vs /skw/ in square",
        vocabulary: [
          {
            id: "g5-u18-l1-v1",
            word: "Dragon Bridge",
            clue: "An iconic yellow steel dragon-shaped bridge in Da Nang crossing the Han River",
            vietnameseMeaning: "Cầu Rồng (Đà Nẵng)",
            phonics: "/ˈdræɡən brɪdʒ/",
            emoji: "🌉",
            grade: 5,
            unit: 18,
            topic: "Landmarks",
            exampleSentence: "Where do you want to visit? - I want to visit Dragon Bridge.",
            distractors: ["Golden Gate", "Eiffel Tower", "Big Ben"]
          },
          {
            id: "g5-u18-l1-v2",
            word: "Ha Noi Opera House",
            clue: "A historical French architectural neoclassical opera auditorium in central Hanoi",
            vietnameseMeaning: "Nhà hát Lớn Hà Nội",
            phonics: "/hæ ˈnɔɪ ˈɒprə haʊs/",
            emoji: "🏛️",
            grade: 5,
            unit: 18,
            topic: "Landmarks",
            exampleSentence: "She wants to visit Ha Noi Opera House this Sunday.",
            distractors: ["airport", "stadium", "market"]
          },
          {
            id: "g5-u18-l1-v3",
            word: "Ngo Mon Square",
            clue: "The grand ceremonial plaza in front of the Meridian Gate of Hue Imperial Citadel",
            vietnameseMeaning: "Quảng trường Ngọ Môn (Huế)",
            phonics: "/ŋɔ mɔn skweər/",
            emoji: "🏯",
            grade: 5,
            unit: 18,
            topic: "Landmarks",
            exampleSentence: "We explored Ngo Mon Square in the ancient royal city of Hue.",
            distractors: ["Times Square", "Trafalgar Square", "Red Square"]
          },
          {
            id: "g5-u18-l1-v4",
            word: "Ho Chi Minh City Museum",
            clue: "A prominent historical and cultural museum housed in a majestic mansion in HCMC",
            vietnameseMeaning: "Bảo tàng Thành phố Hồ Chí Minh",
            phonics: "/həʊ tʃiː mɪn ˈsɪti mjuːˈziːəm/",
            emoji: "🏛️",
            grade: 5,
            unit: 18,
            topic: "Landmarks",
            exampleSentence: "Our class toured Ho Chi Minh City Museum to study national history.",
            distractors: ["supermarket", "water park", "cinema"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Where do you want to visit? - I want to visit [Dragon Bridge / Ha Noi Opera House / Ngo Mon Square / Ho Chi Minh City Museum].",
            vietnameseMeaning: "Bạn muốn đi tham quan nơi nào? - Mình muốn đến thăm [Cầu Rồng / Nhà hát Lớn / Quảng trường Ngọ Môn / Bảo tàng TP.HCM].",
            sampleDialogue: [
              { speaker: "Tony", text: "Where do you want to visit in Da Nang, Nam?", textVi: "Cậu muốn đi thăm nơi nào ở Đà Nẵng thế Nam?" },
              { speaker: "Nam", text: "I want to visit Dragon Bridge to see it breathe fire and water.", textVi: "Mình muốn thăm Cầu Rồng để xem cầu phun lửa và nước." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: How do you get there? (Means of Transport)",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u18-l2-v1",
            word: "by train",
            clue: "Travelling on railway passenger carriages pulled by a locomotive",
            vietnameseMeaning: "bằng tàu hỏa, xe lửa",
            phonics: "/baɪ treɪn/",
            emoji: "🚆",
            grade: 5,
            unit: 18,
            topic: "Means of Transport",
            exampleSentence: "How do you get to Da Nang? - I get there by train.",
            distractors: ["by skateboard", "by helicopter", "by parachute"]
          },
          {
            id: "g5-u18-l2-v2",
            word: "by bus",
            clue: "Travelling by public large road vehicle with seats along urban routes",
            vietnameseMeaning: "bằng xe buýt",
            phonics: "/baɪ bʌs/",
            emoji: "🚌",
            grade: 5,
            unit: 18,
            topic: "Means of Transport",
            exampleSentence: "How does she get to the museum? - She gets there by bus.",
            distractors: ["by boat", "by plane", "on horseback"]
          },
          {
            id: "g5-u18-l2-v3",
            word: "by motorbike",
            clue: "Riding on a two-wheeled motorized vehicle with a safety helmet",
            vietnameseMeaning: "bằng xe máy",
            phonics: "/baɪ ˈməʊtəbaɪk/",
            emoji: "🛵",
            grade: 5,
            unit: 18,
            topic: "Means of Transport",
            exampleSentence: "Father took me to the opera house by motorbike.",
            distractors: ["by submarine", "by rocket", "by tractor"]
          },
          {
            id: "g5-u18-l2-v4",
            word: "by plane",
            clue: "Flying high through clouds in a commercial airliner",
            vietnameseMeaning: "bằng máy bay",
            phonics: "/baɪ pleɪn/",
            emoji: "✈️",
            grade: 5,
            unit: 18,
            topic: "Means of Transport",
            exampleSentence: "From Hanoi to Ho Chi Minh City, we travel by plane in two hours.",
            distractors: ["by bicycle", "on foot", "by canoe"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "How do you get to [destination]? - I get there by [train / bus / motorbike / plane / bicycle / on foot].",
            vietnameseMeaning: "Bạn đến [địa điểm] bằng phương tiện gì? - Mình đến đó bằng [tàu hỏa / xe buýt / xe máy / máy bay / xe đạp / đi bộ].",
            sampleDialogue: [
              { speaker: "Linda", text: "How do you get to Dragon Bridge?", textVi: "Bạn đến Cầu Rồng bằng phương tiện gì?" },
              { speaker: "Phong", text: "I get there by bicycle because it is close to my hotel.", textVi: "Mình đạp xe đến đó vì cầu khá gần khách sạn." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Travelling Across Heritage Cities",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Taking a [train / open-top bus] is a fantastic way to view scenic landscapes.",
            vietnameseMeaning: "Đi bằng [tàu hỏa / xe buýt mui trần] là cách tuyệt vời để thưởng ngoạn cảnh sắc.",
            sampleDialogue: [
              { speaker: "Akiko", text: "What is your favourite means of transport?", textVi: "Phương tiện giao thông yêu thích của bạn là gì?" },
              { speaker: "Mai", text: "I love the coastal train because looking out at green mountains and blue sea is breathtaking.", textVi: "Mình thích tàu hỏa ven biển vì ngắm nhìn núi non trùng điệp và biển xanh thật ngoạn mục." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Exploring Da Nang and Hue",
          text: "Last summer, Peter's family took a fascinating journey to central Vietnam. First, they flew by plane from Hanoi to Da Nang. In Da Nang, they rented bicycles to ride across the impressive Dragon Bridge. Next, they boarded the scenic train through Hai Van Pass to reach Hue. In Hue, they visited Ngo Mon Square on foot. Traveling by different means of transport made their discovery trip unforgettable!",
          translationVi: "Mùa hè năm ngoái, gia đình Peter đã có một chuyến hành trình hấp dẫn đến miền Trung Việt Nam. Đầu tiên, cả nhà bay từ Hà Nội vào Đà Nẵng bằng máy bay. Tại Đà Nẵng, họ thuê xe đạp để thong thả dạo qua Cầu Rồng ấn tượng. Tiếp đó, gia đình lên chuyến tàu hỏa ngắm cảnh qua Đèo Hải Vân để đến Huế. Ở Huế, họ đi bộ tham quan Quảng trường Ngọ Môn. Việc di chuyển bằng nhiều phương tiện khác nhau đã khiến chuyến khám phá của họ trở nên khó quên!"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 19,
    unitTitle: "Places of interest",
    unitTitleVi: "Những địa danh nổi tiếng",
    theme: "The World Around Us",
    icon: "🏛️",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: What do you think of this place? (Impressions)",
        focus: "vocabulary_phonics",
        phonicsSound: "/f/ in fantastic vs /p/ in peaceful",
        vocabulary: [
          {
            id: "g5-u19-l1-v1",
            word: "beautiful",
            clue: "Pleasing the senses or mind aesthetically; gorgeous",
            vietnameseMeaning: "xinh đẹp, tươi đẹp",
            phonics: "/ˈbjuːtɪfl/",
            emoji: "🌸",
            grade: 5,
            unit: 19,
            topic: "Descriptive Adjectives",
            exampleSentence: "What do you think of Da Lat? - I think it's cool and beautiful.",
            distractors: ["ugly", "dirty", "boring"]
          },
          {
            id: "g5-u19-l1-v2",
            word: "peaceful",
            clue: "Free from disturbance; tranquil, quiet, and calm",
            vietnameseMeaning: "yên bình, thanh tịnh",
            phonics: "/ˈpiːsfl/",
            emoji: "🕊️",
            grade: 5,
            unit: 19,
            topic: "Descriptive Adjectives",
            exampleSentence: "Hoi An Ancient Town is peaceful and historic in the evening.",
            distractors: ["noisy", "crowded", "chaotic"]
          },
          {
            id: "g5-u19-l1-v3",
            word: "fantastic",
            clue: "Extraordinarily good, attractive, or striking; wonderful",
            vietnameseMeaning: "tuyệt vời, kỳ diệu",
            phonics: "/fænˈtæstɪk/",
            emoji: "✨",
            grade: 5,
            unit: 19,
            topic: "Descriptive Adjectives",
            exampleSentence: "What does she think of Ha Long Bay? - She thinks it's fantastic.",
            distractors: ["terrible", "awful", "dull"]
          },
          {
            id: "g5-u19-l1-v4",
            word: "exciting",
            clue: "Causing great enthusiasm and eagerness; thrilling",
            vietnameseMeaning: "sôi động, hào hứng, náo nhiệt",
            phonics: "/ɪkˈsaɪtɪŋ/",
            emoji: "🤩",
            grade: 5,
            unit: 19,
            topic: "Descriptive Adjectives",
            exampleSentence: "VinWonders theme park is very exciting with high-speed rides.",
            distractors: ["sleepy", "sad", "empty"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What do you think of [place / Da Lat / Ha Long Bay]? - I think it's [beautiful / peaceful / fantastic / exciting / cool].",
            vietnameseMeaning: "Bạn nghĩ gì về [địa danh]? - Mình nghĩ nơi đó [đẹp / yên bình / tuyệt vời / sôi động / mát mẻ].",
            sampleDialogue: [
              { speaker: "Ben", text: "What do you think of Da Lat?", textVi: "Bạn nghĩ gì về Đà Lạt?" },
              { speaker: "Mai", text: "I think it's cool, green, and extraordinarily beautiful.", textVi: "Mình nghĩ nơi ấy mát mẻ, xanh tươi và đẹp tuyệt vời." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: How far is it from... to...? (Distances)",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u19-l2-v1",
            word: "kilometres",
            clue: "Metric units of length equal to 1,000 metres (km)",
            vietnameseMeaning: "ki-lô-mét (km)",
            phonics: "/ˈkɪləmiːtəz/",
            emoji: "🛣️",
            grade: 5,
            unit: 19,
            topic: "Distance",
            exampleSentence: "How far is it from Ha Noi to Hai Phong? - It's about 120 kilometres.",
            distractors: ["seconds", "litres", "grams"]
          },
          {
            id: "g5-u19-l2-v2",
            word: "twenty-nine",
            clue: "The number 29",
            vietnameseMeaning: "hai mươi chín (29)",
            phonics: "/ˈtwenti naɪn/",
            emoji: "2️⃣9️⃣",
            grade: 5,
            unit: 19,
            topic: "Numbers",
            exampleSentence: "It is twenty-nine kilometres from our school to the scenic waterfall.",
            distractors: ["nineteen", "thirty-nine", "ninety-two"]
          },
          {
            id: "g5-u19-l2-v3",
            word: "forty",
            clue: "The number 40",
            vietnameseMeaning: "bốn mươi (40)",
            phonics: "/ˈfɔːti/",
            emoji: "4️⃣0️⃣",
            grade: 5,
            unit: 19,
            topic: "Numbers",
            exampleSentence: "It is about forty kilometres from the city center to the eco-village.",
            distractors: ["fourteen", "four", "fifty"]
          },
          {
            id: "g5-u19-l2-v4",
            word: "one hundred and twenty-nine",
            clue: "The number 129",
            vietnameseMeaning: "một trăm hai mươi chín (129)",
            phonics: "/wʌn ˈhʌndrəd ənd ˈtwenti naɪn/",
            emoji: "🔢",
            grade: 5,
            unit: 19,
            topic: "Numbers",
            exampleSentence: "It takes two hours to drive one hundred and twenty-nine kilometres.",
            distractors: ["one hundred and twenty", "twenty-nine", "two hundred"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "How far is it from [Place A] to [Place B]? - It's (about) [number] kilometres.",
            vietnameseMeaning: "Từ [Nơi A] đến [Nơi B] cách bao xa? - Cách khoảng [số] ki-lô-mét.",
            sampleDialogue: [
              { speaker: "Tony", text: "How far is it from Ha Noi to Hai Phong?", textVi: "Từ Hà Nội đến Hải Phòng cách bao xa?" },
              { speaker: "Nam", text: "It's about 120 kilometres along the modern expressway.", textVi: "Khoảng 120 ki-lô-mét dọc theo tuyến cao tốc hiện đại." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Wonders of Vietnam from North to South",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Vietnam has countless famous places that captivate travellers from all over the world.",
            vietnameseMeaning: "Việt Nam có vô số danh lam thắng cảnh làm say lòng du khách khắp năm châu.",
            sampleDialogue: [
              { speaker: "Emma", text: "Is Son Doong Cave far from Phong Nha?", textVi: "Hang Sơn Đoòng có cách xa Phong Nha không?" },
              { speaker: "Phong", text: "It's deep inside the national park, surrounded by fantastic ancient rainforests!", textVi: "Hang nằm sâu trong vườn quốc gia, được bao bọc bởi những cánh rừng nguyên sinh kỳ vĩ!" }
            ]
          }
        ],
        readingMiniStory: {
          title: "Impressions of Our Homeland",
          text: "Vietnam is gifted with breathtaking landmarks. In the north, Ha Long Bay is famous worldwide for thousands of emerald islands. In the central highlands, Da Lat is cool, peaceful, and scented with pine trees and blossoms. It is about three hundred kilometres from Ho Chi Minh City to Da Lat. Wherever you visit in our country, warm local hospitality and stunning landscapes make every journey fantastic!",
          translationVi: "Việt Nam được thiên nhiên ưu đãi với những thắng cảnh đẹp đến nghẹt thở. Ở miền Bắc, Vịnh Hạ Long nổi tiếng khắp thế giới với hàng ngàn hòn đảo đá vôi màu ngọc bích. Trên cao nguyên miền Trung, Đà Lạt luôn mát mẻ, yên bình và ngát hương thông cùng hoa cỏ. Từ TP. Hồ Chí Minh lên Đà Lạt khoảng 300 ki-lô-mét. Dù đặt chân đến bất cứ nơi đâu trên đất nước mình, sự hiếu khách nồng hậu cùng phong cảnh tuyệt mỹ đều khiến mỗi chuyến đi trở nên diệu kỳ!"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 20,
    unitTitle: "Our summer holiday",
    unitTitleVi: "Kỳ nghỉ hè của chúng mình",
    theme: "The World Around Us",
    icon: "🏖️",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Where are you going to visit this summer? (Near Future)",
        focus: "vocabulary_phonics",
        phonicsSound: "Falling intonation in Wh-questions (Where are you going to visit?)",
        vocabulary: [
          {
            id: "g5-u20-l1-v1",
            word: "Dam Sen Aquarium",
            clue: "A famous aquatic center with glass underwater tunnel in Ho Chi Minh City",
            vietnameseMeaning: "Thủy cung Đầm Sen",
            phonics: "/ˈdæm sen əˈkweəriəm/",
            emoji: "🐟",
            grade: 5,
            unit: 20,
            topic: "Summer Destinations",
            exampleSentence: "Where are you going to visit this summer? - I'm going to visit Dam Sen Aquarium.",
            distractors: ["supermarket", "train station", "airport"]
          },
          {
            id: "g5-u20-l1-v2",
            word: "Huong River",
            clue: "The poetic Perfume River flowing through the heart of Hue Imperial City",
            vietnameseMeaning: "sông Hương (Huế)",
            phonics: "/hʊəŋ ˈrɪvər/",
            emoji: "🌊",
            grade: 5,
            unit: 20,
            topic: "Summer Destinations",
            exampleSentence: "We are going to take a dragon boat along the poetic Huong River.",
            distractors: ["desert", "volcano", "coal mine"]
          },
          {
            id: "g5-u20-l1-v3",
            word: "Phong Nha Cave",
            clue: "A world-renowned UNESCO limestone cave with subterranean rivers in Quang Binh",
            vietnameseMeaning: "Động Phong Nha",
            phonics: "/fɒŋ naː keɪv/",
            emoji: "🏞️",
            grade: 5,
            unit: 20,
            topic: "Summer Destinations",
            exampleSentence: "Are you going to visit Phong Nha Cave this July? - Yes, I am.",
            distractors: ["amusement park", "library", "stadium"]
          },
          {
            id: "g5-u20-l1-v4",
            word: "Phu Quoc Island",
            clue: "Vietnam's largest island known for turquoise waters and white sandy beaches",
            vietnameseMeaning: "Đảo Phú Quốc",
            phonics: "/fuː kwɒk ˈaɪlənd/",
            emoji: "🏝️",
            grade: 5,
            unit: 20,
            topic: "Summer Destinations",
            exampleSentence: "I'm going to visit Phu Quoc Island with my parents this summer.",
            distractors: ["mountains", "subway", "factory"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Where are you going to visit this summer? - I'm going to visit [Phu Quoc Island / Dam Sen Aquarium / Huong River / Phong Nha Cave].",
            vietnameseMeaning: "Mùa hè này bạn dự định đi thăm nơi nào? - Mình dự định đi thăm [Đảo Phú Quốc / Thủy cung Đầm Sen / Sông Hương / Động Phong Nha].",
            sampleDialogue: [
              { speaker: "Tony", text: "Where are you going to visit this summer, Mai?", textVi: "Mùa hè này cậu định đi thăm nơi nào vậy Mai?" },
              { speaker: "Mai", text: "I'm going to visit Phu Quoc Island to swim in crystal waters.", textVi: "Mình dự định đi đảo Phú Quốc để tắm trong làn nước trong vắt." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What are you going to do this summer? (Activities)",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u20-l2-v1",
            word: "go camping",
            clue: "Setting up a tent outdoors in nature to sleep under the stars",
            vietnameseMeaning: "đi cắm trại",
            phonics: "/ɡəʊ ˈkæmpɪŋ/",
            emoji: "⛺",
            grade: 5,
            unit: 20,
            topic: "Summer Activities",
            exampleSentence: "What are you going to do this summer? - I'm going to go camping in the hills.",
            distractors: ["wash dishes", "take exams", "paint desks"]
          },
          {
            id: "g5-u20-l2-v2",
            word: "join a music club",
            clue: "Becoming a member of an ensemble to practice singing or instruments",
            vietnameseMeaning: "tham gia câu lạc bộ âm nhạc",
            phonics: "/dʒɔɪn ə ˈmjuːzɪk klʌb/",
            emoji: "🎸",
            grade: 5,
            unit: 20,
            topic: "Summer Activities",
            exampleSentence: "I'm going to join a music club to learn how to play acoustic guitar.",
            distractors: ["cut trees", "dig canals", "clean streets"]
          },
          {
            id: "g5-u20-l2-v3",
            word: "practise swimming",
            clue: "Training strokes in the water to become an adept, safe swimmer",
            vietnameseMeaning: "luyện tập bơi lội",
            phonics: "/ˈpræktɪs ˈswɪmɪŋ/",
            emoji: "🏊‍♂️",
            grade: 5,
            unit: 20,
            topic: "Summer Activities",
            exampleSentence: "Every summer morning, I practise swimming at the sports club.",
            distractors: ["sleep late", "eat chips in bed", "watch scary films"]
          },
          {
            id: "g5-u20-l2-v4",
            word: "visit an eco-farm",
            clue: "Travelling to a sustainable organic farm to pick fruits and feed farm animals",
            vietnameseMeaning: "thăm trang trại sinh thái",
            phonics: "/ˈvɪzɪt ən ˈiːkəʊ fɑːm/",
            emoji: "🌾",
            grade: 5,
            unit: 20,
            topic: "Summer Activities",
            exampleSentence: "We are going to visit an eco-farm and harvest organic tomatoes.",
            distractors: ["stay inside room", "waste paper", "burn leaves"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What are you going to do this summer? - I'm going to [go camping / join a music club / practise swimming / visit an eco-farm].",
            vietnameseMeaning: "Mùa hè này bạn dự định sẽ làm gì? - Mình dự định sẽ [đi cắm trại / vào CLB âm nhạc / tập bơi / thăm trang trại sinh thái].",
            sampleDialogue: [
              { speaker: "Linda", text: "What are you going to do this summer, Quan?", textVi: "Mùa hè này bạn dự định làm gì thế Quân?" },
              { speaker: "Quan", text: "I'm going to practise swimming and visit an eco-farm with my family.", textVi: "Mình sẽ đi tập bơi và cùng gia đình ghé thăm một trang trại sinh thái." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Hello Summer, Welcome New Adventures!",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "We wish all students a wonderful, safe, and joy-filled summer holiday!",
            vietnameseMeaning: "Chúc tất cả các bạn học sinh một kỳ nghỉ hè tuyệt vời, an toàn và tràn ngập niềm vui!",
            sampleDialogue: [
              { speaker: "Teacher", text: "Have an unforgettable summer holiday, fifth graders!", textVi: "Chúc các em học sinh khối 5 có một kỳ nghỉ hè thật đáng nhớ!" },
              { speaker: "Students", text: "Thank you teacher! We will see you in secondary school!", textVi: "Chúng em cảm ơn cô ạ! Hẹn gặp lại cô ở cấp hai nhé!" }
            ]
          }
        ],
        readingMiniStory: {
          title: "Exciting Summer Plans Ahead",
          text: "The final school bell announces the arrival of summer vacation. The fifth graders of Class 5A are bubbling with excitement. Minh is going to visit Dam Sen Aquarium in Ho Chi Minh City. Lan is going to cruise along the poetic Huong River in Hue. Quan plans to go camping by Ba Vi mountain and practise swimming. A sun-drenched summer filled with discoveries and joy welcomes them all!",
          translationVi: "Hồi chuông bế giảng vang lên rộn rã báo hiệu kỳ nghỉ hè đã tới. Các bạn học sinh lớp 5A ngập tràn niềm háo hức. Minh dự định sẽ tham quan Thủy cung Đầm Sen ở TP. Hồ Chí Minh. Lan sẽ đi thuyền trên dòng sông Hương thơ mộng ở Huế. Quân lên kế hoạch đi cắm trại ở núi Ba Vì và chăm chỉ luyện tập bơi lội. Một mùa hè tràn ngập ánh nắng, những chuyến khám phá và niềm vui đang chào đón tất cả các bạn!"
        }
      }
    ]
  }
];
