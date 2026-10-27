import { GlobalSuccessUnit } from "../../types";

export const GRADE_5_UNITS: GlobalSuccessUnit[] = [
  // ==========================================
  // SEMESTER 1 (UNITS 1 - 10)
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
        lessonTitle: "Lesson 1: Personal Information & Phonics",
        focus: "vocabulary_phonics",
        phonicsSound: "/eɪ/ as in name, address",
        vocabulary: [
          {
            id: "g5-u1-l1-v1",
            word: "address",
            clue: "The place where someone lives or an organization is located",
            vietnameseMeaning: "địa chỉ",
            phonics: "/əˈdres/",
            emoji: "🏡",
            grade: 5,
            unit: 1,
            topic: "Personal Information",
            exampleSentence: "What's your address? - It's 105 Hoa Binh Lane.",
            distractors: ["school", "country", "hobby"]
          },
          {
            id: "g5-u1-l1-v2",
            word: "lane",
            clue: "A narrow road or street",
            vietnameseMeaning: "ngõ, hẻm nhỏ",
            phonics: "/leɪn/",
            emoji: "🛣️",
            grade: 5,
            unit: 1,
            topic: "Personal Information",
            exampleSentence: "I live in a quiet lane in Hanoi.",
            distractors: ["city", "tower", "floor"]
          },
          {
            id: "g5-u1-l1-v3",
            word: "floor",
            clue: "A level of a building",
            vietnameseMeaning: "tầng (của tòa nhà)",
            phonics: "/flɔːr/",
            emoji: "🏢",
            grade: 5,
            unit: 1,
            topic: "Personal Information",
            exampleSentence: "My flat is on the third floor of Ha Noi Tower.",
            distractors: ["road", "street", "village"]
          },
          {
            id: "g5-u1-l1-v4",
            word: "flat",
            clue: "A set of rooms for living in, usually on one floor of a large building",
            vietnameseMeaning: "căn hộ",
            phonics: "/flæt/",
            emoji: "🚪",
            grade: 5,
            unit: 1,
            topic: "Personal Information",
            exampleSentence: "She lives in Flat 18 on the second floor.",
            distractors: ["mountain", "school", "garden"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What's your address? - It's [number + street/lane/road].",
            vietnameseMeaning: "Địa chỉ của bạn là gì? - Đó là [số nhà + đường/ngõ].",
            sampleDialogue: [
              { speaker: "Linda", text: "What's your address, Nam?", textVi: "Địa chỉ của bạn là gì, Nam?" },
              { speaker: "Nam", text: "It's 81 Tran Hung Dao Street.", textVi: "Đó là số 81 đường Trần Hưng Đạo." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Where do you live?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u1-l2-v1",
            word: "tower",
            clue: "A tall narrow building or part of a building",
            vietnameseMeaning: "tòa tháp, tòa nhà cao tầng",
            phonics: "/ˈtaʊər/",
            emoji: "🗼",
            grade: 5,
            unit: 1,
            topic: "Living Places",
            exampleSentence: "He lives in Green Tower in Da Nang.",
            distractors: ["island", "lane", "bridge"]
          },
          {
            id: "g5-u1-l2-v2",
            word: "village",
            clue: "A group of houses and other buildings in the countryside",
            vietnameseMeaning: "ngôi làng, thôn quê",
            phonics: "/ˈvɪlɪdʒ/",
            emoji: "🌾",
            grade: 5,
            unit: 1,
            topic: "Living Places",
            exampleSentence: "My grandparents live in a small, peaceful village.",
            distractors: ["city", "tower", "classroom"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Where do you live? - I live in [Flat... / Tower... / Village...].",
            vietnameseMeaning: "Bạn sống ở đâu? - Mình sống ở [Căn hộ... / Tòa tháp... / Làng...].",
            sampleDialogue: [
              { speaker: "Mai", text: "Where do you live, Tom?", textVi: "Bạn sống ở đâu vậy Tom?" },
              { speaker: "Tom", text: "I live in Flat 24 on the fifth floor of City Tower.", textVi: "Mình sống ở căn hộ 24 trên tầng 5 của tháp City Tower." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading & Self-Introduction",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "I live with my [family / parents] at [address]. It is [quiet / busy / big].",
            vietnameseMeaning: "Tôi sống cùng [gia đình / bố mẹ] tại [địa chỉ]. Nơi đó [yên tĩnh / nhộn nhịp / rộng lớn].",
            sampleDialogue: [
              { speaker: "Quan", text: "Do you like your new home?", textVi: "Cậu có thích ngôi nhà mới không?" },
              { speaker: "Peter", text: "Yes, I do. It is very modern and quiet.", textVi: "Có chứ, nó rất hiện đại và yên tĩnh." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Nam's New Home",
          text: "Hello! My name is Nam. I am in Class 5A. I live with my parents in Hanoi. Our address is Flat 12, on the fourth floor of Sunrise Tower. It is a big and modern building. From our balcony, I can see a peaceful green park. I love my new home very much!",
          translationVi: "Xin chào! Mình tên là Nam. Mình học lớp 5A. Mình sống cùng bố mẹ ở Hà Nội. Địa chỉ của chúng mình là Căn hộ 12, trên tầng 4 của Sunrise Tower. Đó là một tòa nhà lớn và hiện đại. Từ ban công, mình có thể nhìn thấy một công viên xanh yên bình. Mình rất yêu ngôi nhà mới của mình!"
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
        lessonTitle: "Lesson 1: What is your home like?",
        focus: "vocabulary_phonics",
        phonicsSound: "/aʊ/ as in town, mountain",
        vocabulary: [
          {
            id: "g5-u2-l1-v1",
            word: "city",
            clue: "A large town with many people, shops, and buildings",
            vietnameseMeaning: "thành phố",
            phonics: "/ˈsɪti/",
            emoji: "🏙️",
            grade: 5,
            unit: 2,
            topic: "Homes and Locations",
            exampleSentence: "Hanoi is a big and busy city.",
            distractors: ["countryside", "island", "forest"]
          },
          {
            id: "g5-u2-l1-v2",
            word: "mountain",
            clue: "A very high hill, often with rocks near the top",
            vietnameseMeaning: "núi, vùng núi",
            phonics: "/ˈmaʊntɪn/",
            emoji: "⛰️",
            grade: 5,
            unit: 2,
            topic: "Homes and Locations",
            exampleSentence: "My hometown is up in the high mountains.",
            distractors: ["sea", "city", "lake"]
          },
          {
            id: "g5-u2-l1-v3",
            word: "quiet",
            clue: "Making very little or no noise",
            vietnameseMeaning: "yên tĩnh, thanh bình",
            phonics: "/ˈkwaɪət/",
            emoji: "🤫",
            grade: 5,
            unit: 2,
            topic: "Adjectives for Places",
            exampleSentence: "Our countryside village is quiet and pretty.",
            distractors: ["noisy", "crowded", "busy"]
          },
          {
            id: "g5-u2-l1-v4",
            word: "crowded",
            clue: "Full of people or things",
            vietnameseMeaning: "đông đúc, tấp nập",
            phonics: "/ˈkraʊdɪd/",
            emoji: "👥",
            grade: 5,
            unit: 2,
            topic: "Adjectives for Places",
            exampleSentence: "The streets in the city center are crowded.",
            distractors: ["quiet", "empty", "lonely"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What's the [city/village/town] like? - It's [big/quiet/busy/crowded].",
            vietnameseMeaning: "[Thành phố/Ngôi làng/Thị trấn] trông như thế nào? - Nó [to lớn/yên tĩnh/nhộn nhịp/đông đúc].",
            sampleDialogue: [
              { speaker: "Mai", text: "What's your hometown like, Tony?", textVi: "Quê hương của bạn như thế nào vậy Tony?" },
              { speaker: "Tony", text: "It's small and quiet.", textVi: "Nó nhỏ nhắn và rất yên bình." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Describing Your House & Rooms",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u2-l2-v1",
            word: "modern",
            clue: "Designed and made using the most recent ideas and methods",
            vietnameseMeaning: "hiện đại",
            phonics: "/ˈmɒd.ən/",
            emoji: "🛋️",
            grade: 5,
            unit: 2,
            topic: "Describing Homes",
            exampleSentence: "Their house is new and modern.",
            distractors: ["old", "ancient", "small"]
          },
          {
            id: "g5-u2-l2-v2",
            word: "cottage",
            clue: "A small house, usually in the countryside",
            vietnameseMeaning: "nhà tranh, nhà nhỏ ở nông thôn",
            phonics: "/ˈkɒt.ɪdʒ/",
            emoji: "🏡",
            grade: 5,
            unit: 2,
            topic: "Types of Homes",
            exampleSentence: "My grandparents live in a lovely cottage.",
            distractors: ["skyscraper", "apartment", "supermarket"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What's your house like? - It's a [large/small/modern] house with a [garden/balcony].",
            vietnameseMeaning: "Nhà của bạn như thế nào? - Đó là một ngôi nhà [rộng/nhỏ/hiện đại] có [khu vườn/ban công].",
            sampleDialogue: [
              { speaker: "Phong", text: "What's your house like?", textVi: "Nhà cậu trông như thế nào?" },
              { speaker: "Lucy", text: "It's a big white house with a beautiful flower garden.", textVi: "Đó là một ngôi nhà lớn màu trắng có vườn hoa xinh đẹp." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Life in My Hometown",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "I like living in [place] because it is [reason].",
            vietnameseMeaning: "Tôi thích sống ở [địa điểm] bởi vì nó [lý do].",
            sampleDialogue: [
              { speaker: "Akiko", text: "Do you like living in the city?", textVi: "Cậu có thích sống ở thành phố không?" },
              { speaker: "Nam", text: "Yes, because it is exciting and convenient.", textVi: "Có chứ, vì nó rất thú vị và tiện lợi." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Hoa's Village by the River",
          text: "Hoa lives in a peaceful village in the countryside. Her house is surrounded by green rice fields and fruit trees. The air is fresh and the streets are never crowded. She loves riding her bicycle with friends after school. For Hoa, her village is the best place in the world!",
          translationVi: "Hoa sống tại một ngôi làng yên bình ở vùng nông thôn. Nhà của bạn ấy được bao quanh bởi những cánh đồng lúa xanh ngát và cây ăn trái. Không khí trong lành và đường phố không bao giờ đông đúc. Bạn ấy rất thích đạp xe cùng bạn bè sau giờ học. Đối với Hoa, ngôi làng là nơi tuyệt vời nhất trên thế giới!"
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
        lessonTitle: "Lesson 1: Where are they from?",
        focus: "vocabulary_phonics",
        phonicsSound: "/ʃ/ as in Malaysian, British",
        vocabulary: [
          {
            id: "g5-u3-l1-v1",
            word: "American",
            clue: "Belonging to or relating to the United States of America",
            vietnameseMeaning: "người Mỹ, thuộc về nước Mỹ",
            phonics: "/əˈmer.ɪ.kən/",
            emoji: "🇺🇸",
            grade: 5,
            unit: 3,
            topic: "Nationalities",
            exampleSentence: "David is American. He comes from New York.",
            distractors: ["Vietnamese", "Japanese", "Australian"]
          },
          {
            id: "g5-u3-l1-v2",
            word: "Australian",
            clue: "Belonging to or relating to Australia",
            vietnameseMeaning: "người Úc, thuộc về nước Úc",
            phonics: "/ɒsˈtreɪ.li.ən/",
            emoji: "🇦🇺",
            grade: 5,
            unit: 3,
            topic: "Nationalities",
            exampleSentence: "Emma is Australian. She loves swimming in Sydney.",
            distractors: ["British", "Malaysian", "Korean"]
          },
          {
            id: "g5-u3-l1-v3",
            word: "British",
            clue: "Belonging to or relating to the United Kingdom",
            vietnameseMeaning: "người Anh, thuộc về nước Anh",
            phonics: "/ˈbrɪt.ɪʃ/",
            emoji: "🇬🇧",
            grade: 5,
            unit: 3,
            topic: "Nationalities",
            exampleSentence: "Tony is British. He lives in London.",
            distractors: ["Japanese", "American", "Vietnamese"]
          },
          {
            id: "g5-u3-l1-v4",
            word: "Malaysian",
            clue: "Belonging to or relating to Malaysia",
            vietnameseMeaning: "người Ma-lai-xi-a",
            phonics: "/məˈleɪ.ʒən/",
            emoji: "🇲🇾",
            grade: 5,
            unit: 3,
            topic: "Nationalities",
            exampleSentence: "Zack is Malaysian. He speaks English and Malay.",
            distractors: ["Australian", "American", "Chinese"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Where is he/she from? - He/She is from [Country]. He/She is [Nationality].",
            vietnameseMeaning: "Cậu ấy/Cô ấy đến từ đâu? - Cậu ấy/Cô ấy đến từ [Đất nước]. Cậu ấy/Cô ấy là [Quốc tịch].",
            sampleDialogue: [
              { speaker: "Mai", text: "Where is your penfriend from?", textVi: "Bạn qua thư của bạn đến từ đâu vậy?" },
              { speaker: "Nam", text: "She is from Australia. She is Australian.", textVi: "Bạn ấy đến từ nước Úc. Bạn ấy là người Úc." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What is he/she like?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u3-l2-v1",
            word: "friendly",
            clue: "Behaving in a kind and pleasant way towards someone",
            vietnameseMeaning: "thân thiện, cởi mở",
            phonics: "/ˈfrendli/",
            emoji: "🤝",
            grade: 5,
            unit: 3,
            topic: "Personalities",
            exampleSentence: "My classmates are very friendly and helpful.",
            distractors: ["shy", "angry", "boring"]
          },
          {
            id: "g5-u3-l2-v2",
            word: "active",
            clue: "Busy with or ready to perform energetic physical activities",
            vietnameseMeaning: "năng động, hoạt bát",
            phonics: "/ˈæktɪv/",
            emoji: "🏃",
            grade: 5,
            unit: 3,
            topic: "Personalities",
            exampleSentence: "Tom is very active; he plays football every afternoon.",
            distractors: ["lazy", "quiet", "sleepy"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What is he/she like? - He/She is [friendly / active / clever / kind].",
            vietnameseMeaning: "Cậu ấy/Cô ấy là người như thế nào? - Cậu ấy/Cô ấy rất [thân thiện / năng động / thông minh / tốt bụng].",
            sampleDialogue: [
              { speaker: "Linda", text: "What is Zack like?", textVi: "Zack là người như thế nào?" },
              { speaker: "Peter", text: "He is very kind and clever.", textVi: "Cậu ấy rất tốt bụng và thông minh." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Penfriends Across the World",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "We often [chat online / send emails] on weekends.",
            vietnameseMeaning: "Chúng mình thường [trò chuyện trực tuyến / gửi thư điện tử] vào cuối tuần.",
            sampleDialogue: [
              { speaker: "Hoa", text: "How do you keep in touch with Lucy?", textVi: "Làm thế nào bạn giữ liên lạc với Lucy?" },
              { speaker: "Mai", text: "We send emails to each other every Saturday.", textVi: "Tụi mình gửi email cho nhau vào mỗi thứ Bảy." }
            ]
          }
        ],
        readingMiniStory: {
          title: "My International Classmates",
          text: "At international summer camp, I met Mary from the UK and Kenji from Japan. Mary is British; she is cheerful and loves singing English songs. Kenji is Japanese; he is quiet but very clever at solving puzzles. We exchange messages every week to learn about each other's cultures!",
          translationVi: "Tại trại hè quốc tế, mình đã gặp Mary đến từ Vương quốc Anh và Kenji đến từ Nhật Bản. Mary là người Anh; bạn ấy vui vẻ và rất thích hát những bài hát tiếng Anh. Kenji là người Nhật; bạn ấy ít nói nhưng giải câu đố rất thông minh. Chúng mình trao đổi tin nhắn mỗi tuần để tìm hiểu văn hóa của nhau!"
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
        lessonTitle: "Lesson 1: What do you do in your free time?",
        focus: "vocabulary_phonics",
        phonicsSound: "/ɪŋ/ as in gardening, surfing",
        vocabulary: [
          {
            id: "g5-u4-l1-v1",
            word: "surf the Internet",
            clue: "To spend time looking at different websites on the internet",
            vietnameseMeaning: "lướt mạng Internet",
            phonics: "/sɜːf ði ˈɪntənet/",
            emoji: "🌐",
            grade: 5,
            unit: 4,
            topic: "Free-time Activities",
            exampleSentence: "I usually surf the Internet to search for school projects.",
            distractors: ["clean the floor", "wash dishes", "cut paper"]
          },
          {
            id: "g5-u4-l1-v2",
            word: "do karate",
            clue: "To practice a traditional Japanese martial art",
            vietnameseMeaning: "tập võ karate",
            phonics: "/duː kəˈrɑːti/",
            emoji: "🥋",
            grade: 5,
            unit: 4,
            topic: "Sports and Hobbies",
            exampleSentence: "Phong does karate twice a week at the sports club.",
            distractors: ["play chess", "read comics", "sing songs"]
          },
          {
            id: "g5-u4-l1-v3",
            word: "clean the house",
            clue: "To remove dirt from rooms and tidy up furniture",
            vietnameseMeaning: "dọn dẹp nhà cửa",
            phonics: "/kliːn ðə haʊs/",
            emoji: "🧹",
            grade: 5,
            unit: 4,
            topic: "Chore Activities",
            exampleSentence: "I help my parents clean the house on Sunday mornings.",
            distractors: ["watch TV", "swim in pool", "draw pictures"]
          },
          {
            id: "g5-u4-l1-v4",
            word: "draw pictures",
            clue: "To create images using pencils, pens, or crayons",
            vietnameseMeaning: "vẽ tranh",
            phonics: "/drɔː ˈpɪktʃəz/",
            emoji: "🎨",
            grade: 5,
            unit: 4,
            topic: "Arts and Crafts",
            exampleSentence: "Mai loves drawing pictures of colorful animals.",
            distractors: ["cook dinner", "ride bicycle", "water flowers"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What do you do in your free time? - I [surf the Internet / draw pictures / clean the house].",
            vietnameseMeaning: "Bạn thường làm gì lúc rảnh rỗi? - Mình thường [lướt mạng / vẽ tranh / dọn dẹp nhà].",
            sampleDialogue: [
              { speaker: "Tom", text: "What do you do in your free time, Quân?", textVi: "Cậu thường làm gì lúc rảnh rỗi hả Quân?" },
              { speaker: "Quân", text: "I often do karate with my brother.", textVi: "Mình thường tập võ karate cùng anh trai." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What does he/she do in his/her free time?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u4-l2-v1",
            word: "water the flowers",
            clue: "To pour water on plants and flowers in the garden",
            vietnameseMeaning: "tưới hoa",
            phonics: "/ˈwɔːtər ðə ˈflaʊəz/",
            emoji: "🚿",
            grade: 5,
            unit: 4,
            topic: "Gardening",
            exampleSentence: "My grandfather waters the flowers every morning.",
            distractors: ["play guitar", "cook meals", "read books"]
          },
          {
            id: "g5-u4-l2-v2",
            word: "ride a bike",
            clue: "To travel sitting on a bicycle and making it move",
            vietnameseMeaning: "đạp xe đạp",
            phonics: "/raɪd ə baɪk/",
            emoji: "🚴",
            grade: 5,
            unit: 4,
            topic: "Outdoor Activities",
            exampleSentence: "She rides a bike around West Lake at weekends.",
            distractors: ["catch bus", "drive car", "sail boat"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What does he/she do in his/her free time? - He/She [rides a bike / waters the flowers].",
            vietnameseMeaning: "Cậu ấy/Cô ấy làm gì lúc rảnh rỗi? - Cậu ấy/Cô ấy [đạp xe / tưới hoa].",
            sampleDialogue: [
              { speaker: "Linda", text: "What does your sister do in her free time?", textVi: "Em gái bạn làm gì khi rảnh rỗi?" },
              { speaker: "Hoa", text: "She waters the flowers and reads comic books.", textVi: "Em ấy tưới hoa và đọc truyện tranh." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Weekend Hobbies",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Doing [activity] helps me stay [healthy / relaxed / happy].",
            vietnameseMeaning: "Tập luyện [hoạt động] giúp tôi luôn [khỏe mạnh / thư giãn / vui vẻ].",
            sampleDialogue: [
              { speaker: "Peter", text: "Why do you like doing karate?", textVi: "Tại sao bạn thích tập karate?" },
              { speaker: "Tony", text: "Because it helps me stay strong and healthy.", textVi: "Bởi vì nó giúp tôi khỏe mạnh và dẻo dai." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Our Active Weekends",
          text: "Members of 5B have lots of fun hobbies. Minh loves skateboarding in the local park. Lan prefers staying indoors, surfing the Internet to learn new English songs. Duc and his father enjoy gardening and watering sweet roses. Engaging in hobbies makes our weekends joyful and relaxing!",
          translationVi: "Các bạn lớp 5B có rất nhiều sở thích thú vị. Minh thích trượt ván ở công viên gần nhà. Lan thích ở trong nhà, lướt Internet để học thêm các bài hát tiếng Anh mới. Đức và bố bạn ấy thích làm vườn và tưới những bông hoa hồng ngọt ngào. Tham gia các sở thích giúp cuối tuần tràn ngập niềm vui và thư thái!"
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
        lessonTitle: "Lesson 1: Dream Jobs & Phonics",
        focus: "vocabulary_phonics",
        phonicsSound: "/tʃ/ vs /dʒ/ as in teacher, engineer",
        vocabulary: [
          {
            id: "g5-u5-l1-v1",
            word: "pilot",
            clue: "A person who flies an aircraft such as an airplane",
            vietnameseMeaning: "phi công",
            phonics: "/ˈpaɪ.lət/",
            emoji: "✈️",
            grade: 5,
            unit: 5,
            topic: "Occupations",
            exampleSentence: "He would like to be a pilot and fly planes around the world.",
            distractors: ["architect", "farmer", "dentist"]
          },
          {
            id: "g5-u5-l1-v2",
            word: "architect",
            clue: "A person whose job is to design buildings",
            vietnameseMeaning: "kiến trúc sư",
            phonics: "/ˈɑːrkɪtekt/",
            emoji: "📐",
            grade: 5,
            unit: 5,
            topic: "Occupations",
            exampleSentence: "My cousin is an architect; he designs modern skyscrapers.",
            distractors: ["driver", "cook", "nurse"]
          },
          {
            id: "g5-u5-l1-v3",
            word: "writer",
            clue: "A person who writes books, stories, or articles as a job",
            vietnameseMeaning: "nhà văn",
            phonics: "/ˈraɪ.tər/",
            emoji: "✍️",
            grade: 5,
            unit: 5,
            topic: "Occupations",
            exampleSentence: "Mai loves reading and wants to be a writer.",
            distractors: ["singer", "police officer", "gardener"]
          },
          {
            id: "g5-u5-l1-v4",
            word: "astronaut",
            clue: "A person who travels into space in a spacecraft",
            vietnameseMeaning: "phi hành gia",
            phonics: "/ˈæstrənɔːt/",
            emoji: "👨‍🚀",
            grade: 5,
            unit: 5,
            topic: "Occupations",
            exampleSentence: "Would you like to be an astronaut and visit the Moon?",
            distractors: ["tailor", "mechanic", "carpenter"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What would you like to be in the future? - I'd like to be [a/an + job].",
            vietnameseMeaning: "Bạn muốn làm nghề gì trong tương lai? - Mình muốn trở thành [nghề nghiệp].",
            sampleDialogue: [
              { speaker: "Tony", text: "What would you like to be in the future, Nam?", textVi: "Cậu muốn làm gì trong tương lai thế Nam?" },
              { speaker: "Nam", text: "I'd like to be a pilot.", textVi: "Mình muốn trở thành phi công." }
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
            word: "look after patients",
            clue: "To take medical care of sick people in a hospital",
            vietnameseMeaning: "chăm sóc bệnh nhân",
            phonics: "/lʊk ˈɑːftər ˈpeɪʃnts/",
            emoji: "🩺",
            grade: 5,
            unit: 5,
            topic: "Job Responsibilities",
            exampleSentence: "Doctors and nurses look after patients with care.",
            distractors: ["fly planes", "build houses", "drive trucks"]
          },
          {
            id: "g5-u5-l2-v2",
            word: "design buildings",
            clue: "To draw plans for making new houses and structures",
            vietnameseMeaning: "thiết kế các tòa nhà",
            phonics: "/dɪˈzaɪn ˈbɪldɪŋz/",
            emoji: "🏗️",
            grade: 5,
            unit: 5,
            topic: "Job Responsibilities",
            exampleSentence: "Architects design beautiful green buildings.",
            distractors: ["teach children", "plant flowers", "bake bread"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Why would you like to be [job]? - Because I'd like to [reason].",
            vietnameseMeaning: "Vì sao bạn muốn làm [nghề nghiệp]? - Bởi vì mình muốn [lý do].",
            sampleDialogue: [
              { speaker: "Mai", text: "Why would you like to be a doctor?", textVi: "Vì sao cậu muốn làm bác sĩ?" },
              { speaker: "Hoa", text: "Because I'd like to look after sick people.", textVi: "Bởi vì mình muốn chăm sóc người bệnh." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Big Dreams for Tomorrow",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "To make my dream come true, I need to [study hard / practice every day].",
            vietnameseMeaning: "Để biến ước mơ thành hiện thực, tôi cần [chăm học / luyện tập mỗi ngày].",
            sampleDialogue: [
              { speaker: "Quân", text: "What do you do to become a great writer?", textVi: "Bạn làm gì để trở thành một nhà văn giỏi?" },
              { speaker: "Lan", text: "I read many fairy tales and write short stories every day.", textVi: "Mình đọc nhiều truyện cổ tích và viết truyện ngắn mỗi ngày." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Future Stars of Class 5A",
          text: "Everyone in Class 5A has an inspiring dream. Tom wants to be an astronaut because he dreams of floating in outer space. Linda wants to be an architect to design eco-friendly green houses. Nam desires to be a pilot to take travelers to wonderful places. They all study hard every day to fulfill their dreams!",
          translationVi: "Mọi thành viên lớp 5A đều có một ước mơ truyền cảm hứng. Tom muốn trở thành phi hành gia vì mơ ước bay lơ lửng ngoài vũ trụ. Linda muốn làm kiến trúc sư để thiết kế những ngôi nhà xanh thân thiện với môi trường. Nam khao khát làm phi công đưa hành khách đến những vùng đất tuyệt vời. Các bạn đều chăm chỉ học tập mỗi ngày để biến ước mơ thành hiện thực!"
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
        lessonTitle: "Lesson 1: School Facilities & Floors",
        focus: "vocabulary_phonics",
        phonicsSound: "/st/ vs /nd/ as in first, second",
        vocabulary: [
          {
            id: "g5-u6-l1-v1",
            word: "computer room",
            clue: "A room in a school equipped with computers for learning",
            vietnameseMeaning: "phòng tin học, phòng máy tính",
            phonics: "/kəmˈpjuː.tər ruːm/",
            emoji: "💻",
            grade: 5,
            unit: 6,
            topic: "School Facilities",
            exampleSentence: "Our computer room has thirty modern laptops.",
            distractors: ["school yard", "canteen", "garden"]
          },
          {
            id: "g5-u6-l1-v2",
            word: "art room",
            clue: "A special classroom used for painting, drawing, and crafts",
            vietnameseMeaning: "phòng mỹ thuật",
            phonics: "/ɑːt ruːm/",
            emoji: "🎨",
            grade: 5,
            unit: 6,
            topic: "School Facilities",
            exampleSentence: "We have painting lessons in the art room on Fridays.",
            distractors: ["music room", "gym", "library"]
          },
          {
            id: "g5-u6-l1-v3",
            word: "ground floor",
            clue: "The floor of a building that is at the same level as the ground outside",
            vietnameseMeaning: "tầng trệt, tầng một",
            phonics: "/ɡraʊnd flɔːr/",
            emoji: "1️⃣",
            grade: 5,
            unit: 6,
            topic: "Building Floors",
            exampleSentence: "The principal's office is on the ground floor.",
            distractors: ["roof", "basement", "balcony"]
          },
          {
            id: "g5-u6-l1-v4",
            word: "second floor",
            clue: "The floor that is two levels above the ground",
            vietnameseMeaning: "tầng hai (hoặc tầng ba theo cách đếm Anh-Mỹ)",
            phonics: "/ˈsek.ənd flɔːr/",
            emoji: "2️⃣",
            grade: 5,
            unit: 6,
            topic: "Building Floors",
            exampleSentence: "Our classroom 5C is on the second floor.",
            distractors: ["attic", "cellar", "stadium"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Where is the [school room]? - It's on the [first/second/third/ground] floor.",
            vietnameseMeaning: "[Phòng học] ở đâu vậy? - Nó ở trên tầng [trệt/một/hai/ba].",
            sampleDialogue: [
              { speaker: "Ben", text: "Where is the computer room?", textVi: "Phòng máy tính ở đâu vậy bạn?" },
              { speaker: "Mai", text: "It's on the second floor, next to the library.", textVi: "Nó ở trên tầng hai, cạnh thư viện." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Giving Directions in School",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u6-l2-v1",
            word: "music room",
            clue: "A room where students practice singing and playing musical instruments",
            vietnameseMeaning: "phòng âm nhạc",
            phonics: "/ˈmjuː.zɪk ruːm/",
            emoji: "🎵",
            grade: 5,
            unit: 6,
            topic: "School Facilities",
            exampleSentence: "There is a shiny black piano in the music room.",
            distractors: ["gym", "canteen", "laboratory"]
          },
          {
            id: "g5-u6-l2-v2",
            word: "next to",
            clue: "At the side of someone or something",
            vietnameseMeaning: "bên cạnh, sát bên",
            phonics: "/ˈnekst tuː/",
            emoji: "➡️",
            grade: 5,
            unit: 6,
            topic: "Prepositions of Place",
            exampleSentence: "The science lab is next to the art room.",
            distractors: ["far away", "behind", "under"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Is the [room] on the [first/second] floor? - Yes, it is. / No, it isn't. It's on...",
            vietnameseMeaning: "Có phải [phòng] ở tầng [một/hai] không? - Đúng rồi. / Không, nó ở tầng...",
            sampleDialogue: [
              { speaker: "Peter", text: "Is the music room on the ground floor?", textVi: "Có phải phòng âm nhạc ở tầng trệt không?" },
              { speaker: "Nam", text: "No, it isn't. It's on the first floor.", textVi: "Không phải đâu. Nó ở trên tầng một." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: A Tour Around Our School",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Welcome to our school! Here you can see [facilities].",
            vietnameseMeaning: "Chào mừng đến với trường chúng mình! Ở đây bạn có thể thấy [các phòng học].",
            sampleDialogue: [
              { speaker: "Guide", text: "Follow me to the spacious science laboratory.", textVi: "Mời các bạn theo mình đến phòng thí nghiệm khoa học rộng rãi." },
              { speaker: "Guest", text: "Wow, your school is very well-equipped!", textVi: "Oa, trường của bạn trang bị đầy đủ thật đấy!" }
            ]
          }
        ],
        readingMiniStory: {
          title: "Visiting Nguyen Du Primary School",
          text: "Welcome to Nguyen Du Primary School! Our school has three large buildings. On the ground floor, there is a large canteen and a modern medical room. On the first floor, we have the computer lab and the library with thousands of fascinating books. The music room is on the top floor where we sing happily!",
          translationVi: "Chào mừng bạn đến với Trường Tiểu học Nguyễn Du! Trường của chúng mình gồm 3 tòa nhà lớn. Ở tầng trệt có một nhà ăn rộng và phòng y tế hiện đại. Trên tầng một là phòng máy tính và thư viện với hàng ngàn cuốn sách hấp dẫn. Phòng âm nhạc nằm trên tầng cao nhất, nơi chúng mình cất cao tiếng hát vui tươi!"
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
        lessonTitle: "Lesson 1: What activities do you like at school?",
        focus: "vocabulary_phonics",
        phonicsSound: "/pr/ vs /pl/ as in project, playing",
        vocabulary: [
          {
            id: "g5-u7-l1-v1",
            word: "doing projects",
            clue: "Working collaboratively on a planned piece of school research",
            vietnameseMeaning: "làm dự án học tập",
            phonics: "/ˈduː.ɪŋ ˈprɒdʒekts/",
            emoji: "📋",
            grade: 5,
            unit: 7,
            topic: "School Activities",
            exampleSentence: "We enjoy doing science projects about solar energy.",
            distractors: ["sleeping", "running away", "buying snacks"]
          },
          {
            id: "g5-u7-l1-v2",
            word: "solving maths problems",
            clue: "Finding answers to mathematical equations and calculations",
            vietnameseMeaning: "giải bài toán",
            phonics: "/ˈsɒlvɪŋ mæθs ˈprɒbləmz/",
            emoji: "🔢",
            grade: 5,
            unit: 7,
            topic: "School Activities",
            exampleSentence: "Minh is very clever at solving tricky maths problems.",
            distractors: ["singing songs", "watering plants", "acting plays"]
          },
          {
            id: "g5-u7-l1-v3",
            word: "playing basketball",
            clue: "A team game where players score points by throwing a ball into a hoop",
            vietnameseMeaning: "chơi bóng rổ",
            phonics: "/ˈpleɪ.ɪŋ ˈbɑː.skɪt.bɔːl/",
            emoji: "🏀",
            grade: 5,
            unit: 7,
            topic: "School Sports",
            exampleSentence: "Boys and girls play basketball during recess.",
            distractors: ["writing notes", "erasing boards", "closing doors"]
          },
          {
            id: "g5-u7-l1-v4",
            word: "acting in a play",
            clue: "Performing a role on stage in front of an audience",
            vietnameseMeaning: "đóng kịch, diễn xuất",
            phonics: "/ˈæktɪŋ ɪn ə pleɪ/",
            emoji: "🎭",
            grade: 5,
            unit: 7,
            topic: "Arts and Drama",
            exampleSentence: "Hoa loves acting in our English drama club.",
            distractors: ["washing hands", "opening bags", "eating lunch"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What is your favourite school activity? - It's [doing projects / playing sports].",
            vietnameseMeaning: "Hoạt động trường học yêu thích của bạn là gì? - Đó là [làm dự án / chơi thể thao].",
            sampleDialogue: [
              { speaker: "Tony", text: "What's your favourite school activity, Mai?", textVi: "Hoạt động học tập yêu thích của bạn là gì hả Mai?" },
              { speaker: "Mai", text: "It's doing science projects with my group.", textVi: "Đó là làm dự án khoa học cùng nhóm của mình." }
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
            word: "exciting",
            clue: "Causing great enthusiasm and eagerness",
            vietnameseMeaning: "hào hứng, sôi nổi",
            phonics: "/ɪkˈsaɪtɪŋ/",
            emoji: "🤩",
            grade: 5,
            unit: 7,
            topic: "Opinions",
            exampleSentence: "Basketball matches at break time are really exciting.",
            distractors: ["boring", "tiring", "sad"]
          },
          {
            id: "g5-u7-l2-v2",
            word: "creative",
            clue: "Having the ability to make or think of new things",
            vietnameseMeaning: "sáng tạo",
            phonics: "/kriˈeɪtɪv/",
            emoji: "💡",
            grade: 5,
            unit: 7,
            topic: "Opinions",
            exampleSentence: "Making posters in English class helps us be creative.",
            distractors: ["lazy", "dull", "slow"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Why do you like [activity]? - Because it is [exciting / interesting / creative].",
            vietnameseMeaning: "Vì sao bạn thích [hoạt động]? - Bởi vì nó [hào hứng / thú vị / sáng tạo].",
            sampleDialogue: [
              { speaker: "Peter", text: "Why do you like acting in plays?", textVi: "Vì sao bạn thích diễn kịch?" },
              { speaker: "Linda", text: "Because it is so creative and fun!", textVi: "Vì nó vô cùng sáng tạo và vui nhộn!" }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Friday Club Activities",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Every Friday afternoon, we take part in [club name].",
            vietnameseMeaning: "Mỗi chiều thứ Sáu, chúng mình tham gia câu lạc bộ [tên câu lạc bộ].",
            sampleDialogue: [
              { speaker: "Nam", text: "Which club do you join on Friday?", textVi: "Cậu tham gia câu lạc bộ nào vào thứ Sáu?" },
              { speaker: "Phong", text: "I join the Young Inventors Club to build robot models.", textVi: "Mình vào CLB Nhà sáng chế trẻ để lắp ráp mô hình robot." }
            ]
          }
        ],
        readingMiniStory: {
          title: "School Club Friday!",
          text: "Every Friday afternoon is club time at our school. Some students join the Sports Club to play table tennis and basketball. Others gather in the Art Room to paint colourful ceramic pots. In the English Club, we practice short comedy sketches. Everyone is eager and smiling brightly!",
          translationVi: "Chiều thứ Sáu hằng tuần là giờ câu lạc bộ tại trường chúng mình. Một số bạn tham gia Câu lạc bộ Thể thao để chơi bóng bàn và bóng rổ. Các bạn khác tập trung tại Phòng Mỹ thuật để tô màu những chậu gốm rực rỡ. Tại CLB Tiếng Anh, chúng mình diễn các tiểu phẩm hài ngắn. Ai nấy đều háo hức và nở nụ cười rạng rỡ!"
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
        lessonTitle: "Lesson 1: Possessive Objects & Phonics",
        focus: "vocabulary_phonics",
        phonicsSound: "/z/ vs /s/ in possessive 's",
        vocabulary: [
          {
            id: "g5-u8-l1-v1",
            word: "pencil case",
            clue: "A small container for holding pens, pencils, and erasers",
            vietnameseMeaning: "hộp bút, túi đựng bút",
            phonics: "/ˈpensl keɪs/",
            emoji: "👝",
            grade: 5,
            unit: 8,
            topic: "Classroom Objects",
            exampleSentence: "Whose pencil case is this? - It's Nam's.",
            distractors: ["water bottle", "school bag", "ruler"]
          },
          {
            id: "g5-u8-l1-v2",
            word: "sharpener",
            clue: "A tool used for giving pencils a sharp point",
            vietnameseMeaning: "cái gọt bút chì",
            phonics: "/ˈʃɑːpnər/",
            emoji: "✏️",
            grade: 5,
            unit: 8,
            topic: "Classroom Objects",
            exampleSentence: "Can I borrow your pencil sharpener, please?",
            distractors: ["compass", "globe", "clock"]
          },
          {
            id: "g5-u8-l1-v3",
            word: "notebook",
            clue: "A book of plain or ruled paper for writing notes in",
            vietnameseMeaning: "cuốn vở ghi bài",
            phonics: "/ˈnəʊtbʊk/",
            emoji: "📓",
            grade: 5,
            unit: 8,
            topic: "Classroom Objects",
            exampleSentence: "There is a blue notebook on the teacher's desk.",
            distractors: ["whiteboard", "calendar", "folder"]
          },
          {
            id: "g5-u8-l1-v4",
            word: "calculator",
            clue: "An electronic device used for mathematical calculations",
            vietnameseMeaning: "máy tính cầm tay",
            phonics: "/ˈkælkjuleɪtər/",
            emoji: "🧮",
            grade: 5,
            unit: 8,
            topic: "Classroom Objects",
            exampleSentence: "We use a calculator during advanced maths lessons.",
            distractors: ["dictionary", "scissors", "stapler"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Whose [object] is this/that? - It's [Name]'s.",
            vietnameseMeaning: "[Đồ vật] này/kia của ai? - Đó là của [Tên người].",
            sampleDialogue: [
              { speaker: "Teacher", text: "Whose red backpack is this?", textVi: "Cặp sách màu đỏ này là của ai vậy?" },
              { speaker: "Mai", text: "It's Linh's, teacher.", textVi: "Dạ thưa cô, đó là của bạn Linh ạ." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Plural Classroom Belongings",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u8-l2-v1",
            word: "crayons",
            clue: "Sticks of colored wax used for drawing pictures",
            vietnameseMeaning: "những cây sáp màu",
            phonics: "/ˈkreɪənz/",
            emoji: "🖍️",
            grade: 5,
            unit: 8,
            topic: "Art Supplies",
            exampleSentence: "Whose crayons are those? - They're Peter's.",
            distractors: ["erasers", "rulers", "markers"]
          },
          {
            id: "g5-u8-l2-v2",
            word: "scissors",
            clue: "A cutting tool with two crossed pivoted blades",
            vietnameseMeaning: "cây kéo (cắt thủ công)",
            phonics: "/ˈsɪzəz/",
            emoji: "✂️",
            grade: 5,
            unit: 8,
            topic: "Craft Supplies",
            exampleSentence: "Please use the safety scissors carefully.",
            distractors: ["glue sticks", "paper clips", "paintbrushes"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Whose [plural objects] are these/those? - They're [Name]'s / mine / yours.",
            vietnameseMeaning: "Những [đồ vật số nhiều] này/kia của ai? - Chúng là của [Tên] / của mình / của bạn.",
            sampleDialogue: [
              { speaker: "Ben", text: "Whose colourful crayons are these?", textVi: "Những chiếc bút sáp màu rực rỡ này là của ai?" },
              { speaker: "Lan", text: "They're mine! Thank you for finding them.", textVi: "Của mình đấy! Cảm ơn bạn đã tìm thấy giúp mình." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Lost and Found Corner",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "If you lose something, please check the [Lost and Found box].",
            vietnameseMeaning: "Nếu bạn đánh mất đồ, xin vui lòng kiểm tra tại [hộp Đồ thất lạc].",
            sampleDialogue: [
              { speaker: "Nam", text: "I can't find my green ruler.", textVi: "Mình không tìm thấy chiếc thước kẻ màu xanh." },
              { speaker: "Mai", text: "Go check the Lost and Found box near the classroom door.", textVi: "Hãy đến kiểm tra hộp Đồ thất lạc ở gần cửa lớp nhé." }
            ]
          }
        ],
        readingMiniStory: {
          title: "The Friendly Lost and Found Box",
          text: "In the corner of Class 5C, there is a colourful box labelled 'Lost and Found'. Yesterday, Hoa found a silver watch under her desk. She placed it inside the box. At recess, Huy saw the watch and smiled happily: 'It's mine!' It is great to have honest and kind classmates!",
          translationVi: "Ở góc lớp 5C có một chiếc hộp sặc sỡ đề biển 'Đồ thất lạc'. Hôm qua, Hoa tìm thấy một chiếc đồng hồ màu bạc dưới bàn học. Bạn ấy liền đặt nó vào trong hộp. Giờ ra chơi, Huy nhìn thấy chiếc đồng hồ và mỉm cười hạnh phúc: 'Nó là của tớ!' Thật tuyệt vời khi có những người bạn cùng lớp trung thực và tốt bụng!"
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
        lessonTitle: "Lesson 1: How often do you play outdoors?",
        focus: "vocabulary_phonics",
        phonicsSound: "/ɔː/ vs /aʊ/ as in walk, round",
        vocabulary: [
          {
            id: "g5-u9-l1-v1",
            word: "play badminton",
            clue: "A game played with rackets and a shuttlecock across a net",
            vietnameseMeaning: "chơi cầu lông",
            phonics: "/pleɪ ˈbædmɪntən/",
            emoji: "🏸",
            grade: 5,
            unit: 9,
            topic: "Outdoor Sports",
            exampleSentence: "How often do you play badminton? - Once a week.",
            distractors: ["do homework", "sleep in bed", "cook rice"]
          },
          {
            id: "g5-u9-l1-v2",
            word: "go camping",
            clue: "Staying overnight in a tent in the countryside",
            vietnameseMeaning: "đi cắm trại",
            phonics: "/ɡəʊ ˈkæmpɪŋ/",
            emoji: "⛺",
            grade: 5,
            unit: 9,
            topic: "Outdoor Activities",
            exampleSentence: "Our scout troop goes camping every autumn.",
            distractors: ["go to cinema", "wash clothes", "read library book"]
          },
          {
            id: "g5-u9-l1-v3",
            word: "skip rope",
            clue: "To jump repeatedly over a swinging rope",
            vietnameseMeaning: "nhảy dây",
            phonics: "/skɪp rəʊp/",
            emoji: "🪢",
            grade: 5,
            unit: 9,
            topic: "Yard Games",
            exampleSentence: "Girls enjoy skipping rope under the shady trees.",
            distractors: ["play chess", "type keyboard", "paint walls"]
          },
          {
            id: "g5-u9-l1-v4",
            word: "fly a kite",
            clue: "To fly a light frame covered with paper in the wind",
            vietnameseMeaning: "thả diều",
            phonics: "/flaɪ ə kaɪt/",
            emoji: "🪁",
            grade: 5,
            unit: 9,
            topic: "Outdoor Pastimes",
            exampleSentence: "Children fly colourful kites on windy afternoons.",
            distractors: ["drive bus", "build fire", "row boat"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "How often do you [outdoor activity]? - [Once a week / Twice a week / Every day].",
            vietnameseMeaning: "Bạn có thường [hoạt động ngoài trời] không? - [Mỗi tuần một lần / Hai lần một tuần / Hằng ngày].",
            sampleDialogue: [
              { speaker: "Tony", text: "How often do you play badminton, Nam?", textVi: "Bạn có thường chơi cầu lông không Nam?" },
              { speaker: "Nam", text: "Twice a week, on Tuesday and Saturday.", textVi: "Hai lần một tuần, vào thứ Ba và thứ Bảy." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: In the park and playground",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u9-l2-v1",
            word: "roller skating",
            clue: "Moving on shoes with small wheels underneath",
            vietnameseMeaning: "trượt pa-tanh, trượt giày trượt",
            phonics: "/ˈrəʊ.lə skeɪ.tɪŋ/",
            emoji: "🛼",
            grade: 5,
            unit: 9,
            topic: "Park Sports",
            exampleSentence: "They love roller skating along the lake pathway.",
            distractors: ["swimming", "boxing", "wrestling"]
          },
          {
            id: "g5-u9-l2-v2",
            word: "once a month",
            clue: "Happening one time in every monthly period",
            vietnameseMeaning: "mỗi tháng một lần",
            phonics: "/wʌns ə mʌnθ/",
            emoji: "🗓️",
            grade: 5,
            unit: 9,
            topic: "Frequency Adverbs",
            exampleSentence: "We go hiking in Ba Vi National Park once a month.",
            distractors: ["daily", "hourly", "never"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What are they doing outdoors? - They are [skipping rope / roller skating / playing tag].",
            vietnameseMeaning: "Họ đang làm gì ngoài trời thế? - Họ đang [nhảy dây / trượt pa-tanh / đuổi bắt].",
            sampleDialogue: [
              { speaker: "Linda", text: "What are the boys doing in the school yard?", textVi: "Các bạn nam đang làm gì dưới sân trường vậy?" },
              { speaker: "Mai", text: "They are playing football in the afternoon sun.", textVi: "Các bạn ấy đang đá bóng dưới ánh nắng chiều." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: An Autumn Campout",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Playing outdoors makes us feel [healthy / refreshed / energetic].",
            vietnameseMeaning: "Chơi ngoài trời giúp chúng mình cảm thấy [khỏe khoắn / sảng khoái / tràn đầy năng lượng].",
            sampleDialogue: [
              { speaker: "Akiko", text: "Why do doctors advise children to play outdoors?", textVi: "Vì sao bác sĩ khuyên trẻ em nên chơi ngoài trời?" },
              { speaker: "Tom", text: "Because fresh air and sunshine are good for our bones and eyes.", textVi: "Vì không khí trong lành và ánh nắng rất tốt cho xương và mắt." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Fun Camp by Pine Hill",
          text: "Last weekend, our class went camping near Pine Hill. We pitched yellow tents together under tall green pine trees. In the morning, we flew kites and played badminton in the open field. In the evening, we sang around the campfire. It was an unforgettable outdoor adventure!",
          translationVi: "Cuối tuần trước, lớp chúng mình đi cắm trại gần Đồi Thông. Chúng mình cùng nhau dựng những chiếc lều màu vàng dưới tán thông xanh cao vút. Buổi sáng, tụi mình thả diều và đánh cầu lông trên bãi cỏ rộng. Buổi tối, chúng mình cùng hát quanh đống lửa trại. Đó là một chuyến phiêu lưu ngoài trời khó quên!"
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
        lessonTitle: "Lesson 1: Where did you go?",
        focus: "vocabulary_phonics",
        phonicsSound: "/t/ vs /d/ in past tense -ed",
        vocabulary: [
          {
            id: "g5-u10-l1-v1",
            word: "zoo",
            clue: "A park where wild animals are kept so people can look at them",
            vietnameseMeaning: "sở thú, vườn bách thú",
            phonics: "/zuː/",
            emoji: "🦁",
            grade: 5,
            unit: 10,
            topic: "Trip Destinations",
            exampleSentence: "Where did you go on your school trip? - We went to Thu Le Zoo.",
            distractors: ["market", "bank", "post office"]
          },
          {
            id: "g5-u10-l1-v2",
            word: "museum",
            clue: "A building where objects of historical or scientific interest are exhibited",
            vietnameseMeaning: "bảo tàng",
            phonics: "/mjuːˈziːəm/",
            emoji: "🏛️",
            grade: 5,
            unit: 10,
            topic: "Trip Destinations",
            exampleSentence: "We visited the Vietnam Museum of Ethnology last Friday.",
            distractors: ["bakery", "cinema", "hotel"]
          },
          {
            id: "g5-u10-l1-v3",
            word: "botanical garden",
            clue: "A public garden with rare plants, trees, and flowers for study",
            vietnameseMeaning: "vườn bách thảo",
            phonics: "/bəˈtænɪkl ˈɡɑːdn/",
            emoji: "🌺",
            grade: 5,
            unit: 10,
            topic: "Trip Destinations",
            exampleSentence: "There are enormous ancient trees in Hanoi Botanical Garden.",
            distractors: ["stadium", "airport", "railway"]
          },
          {
            id: "g5-u10-l1-v4",
            word: "amusement park",
            clue: "A park with rides like roller coasters, games, and entertainment",
            vietnameseMeaning: "công viên giải trí",
            phonics: "/əˈmjuːzmənt pɑːk/",
            emoji: "🎡",
            grade: 5,
            unit: 10,
            topic: "Trip Destinations",
            exampleSentence: "We had thrilling rides at the amusement park.",
            distractors: ["hospital", "police station", "library"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Where did you go on your school trip? - We went to [destination].",
            vietnameseMeaning: "Các bạn đã đi đâu trong chuyến dã ngoại của trường? - Chúng mình đã đến [địa điểm].",
            sampleDialogue: [
              { speaker: "Linda", text: "Where did you go on your school trip?", textVi: "Chuyến dã ngoại trường bạn đã đi đâu thế?" },
              { speaker: "Nam", text: "We went to the National History Museum.", textVi: "Chúng mình đã đến Bảo tàng Lịch sử Quốc gia." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What did you do there?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u10-l2-v1",
            word: "take photos",
            clue: "To capture photographs using a camera or smartphone",
            vietnameseMeaning: "chụp ảnh",
            phonics: "/teɪk ˈfəʊtəʊz/",
            emoji: "📸",
            grade: 5,
            unit: 10,
            topic: "Trip Activities",
            exampleSentence: "We took lots of memorable photos with our teacher.",
            distractors: ["wash floors", "write tests", "cook meals"]
          },
          {
            id: "g5-u10-l2-v2",
            word: "feed the animals",
            clue: "To give food to birds, rabbits, or monkeys",
            vietnameseMeaning: "cho động vật ăn",
            phonics: "/fiːd ði ˈænɪmlz/",
            emoji: "🥕",
            grade: 5,
            unit: 10,
            topic: "Trip Activities",
            exampleSentence: "At the farm, children fed friendly sheep and goats.",
            distractors: ["ride planes", "paint ceilings", "fix bikes"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What did you do there? - We [fed the animals / took photos / watched a puppet show].",
            vietnameseMeaning: "Các bạn đã làm gì ở đó? - Chúng mình đã [cho thú ăn / chụp ảnh / xem múa rối nước].",
            sampleDialogue: [
              { speaker: "Mai", text: "What did you do at the eco-farm?", textVi: "Các cậu đã làm gì ở trang trại sinh thái?" },
              { speaker: "Phong", text: "We picked fresh strawberries and fed sheep.", textVi: "Chúng mình hái dâu tây tươi và cho cừu ăn." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Our Unforgettable Eco-Farm Trip",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "The school trip was [great / exciting / wonderful]. I learned a lot about [topic].",
            vietnameseMeaning: "Chuyến dã ngoại thật [tuyệt vời / sôi động]. Tôi đã học được rất nhiều về [chủ đề].",
            sampleDialogue: [
              { speaker: "Peter", text: "Did you enjoy the trip yesterday?", textVi: "Hôm qua bạn có thích chuyến đi không?" },
              { speaker: "Lucy", text: "Yes, immensely! It was both educational and super fun.", textVi: "Có, cực kỳ thích! Chuyến đi vừa bổ ích vừa vui tuyệt đỉnh." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Memories from Sunshine Farm",
          text: "Last Thursday, all fifth graders went on a field trip to Sunshine Eco-Farm. We arrived by school bus at 8:30 a.m. First, a cheerful guide showed us organic vegetables. Next, we planted small corn seeds with our own hands. Before leaving, everyone tasted sweet fresh watermelon. We had a wonderful day together!",
          translationVi: "Thứ Năm tuần trước, toàn bộ học sinh khối 5 đã có chuyến tham quan dã ngoại tại Trang trại Sinh thái Ánh Dương. Chúng mình đến nơi bằng xe buýt lúc 8:30 sáng. Đầu tiên, một bác hướng dẫn viên vui tính dẫn chúng mình đi xem các loại rau hữu cơ. Tiếp đó, chúng mình tự tay gieo những hạt ngô non. Trước khi về, ai cũng được nếm dưa hấu ngọt lịm. Chúng mình đã có một ngày thật tuyệt bên nhau!"
        }
      }
    ]
  },

  // ==========================================
  // SEMESTER 2 (UNITS 11 - 20)
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
        lessonTitle: "Lesson 1: Where did your family go on holiday?",
        focus: "vocabulary_phonics",
        phonicsSound: "/eə/ as in seaside, square",
        vocabulary: [
          {
            id: "g5-u11-l1-v1",
            word: "seaside",
            clue: "An area right next to the sea, especially where people go on holiday",
            vietnameseMeaning: "bờ biển, vùng ven biển",
            phonics: "/ˈsiːsaɪd/",
            emoji: "🏖️",
            grade: 5,
            unit: 11,
            topic: "Family Destinations",
            exampleSentence: "My family went to the seaside in Da Nang last summer.",
            distractors: ["mountains", "desert", "subway"]
          },
          {
            id: "g5-u11-l1-v2",
            word: "hometown",
            clue: "The town or city where you were born or grew up",
            vietnameseMeaning: "quê hương, quê nhà",
            phonics: "/ˈhəʊmtaʊn/",
            emoji: "🏡",
            grade: 5,
            unit: 11,
            topic: "Family Destinations",
            exampleSentence: "We went back to our hometown to visit grandparents.",
            distractors: ["foreign country", "airport", "supermarket"]
          },
          {
            id: "g5-u11-l1-v3",
            word: "ancient town",
            clue: "A historical town preserved from centuries ago",
            vietnameseMeaning: "phố cổ",
            phonics: "/ˈeɪnʃənt taʊn/",
            emoji: "🏮",
            grade: 5,
            unit: 11,
            topic: "Family Destinations",
            exampleSentence: "Hoi An is a world-famous ancient town in central Vietnam.",
            distractors: ["skyscraper", "tunnel", "highway"]
          },
          {
            id: "g5-u11-l1-v4",
            word: "countryside",
            clue: "Land outside towns and cities, with fields, woods, and farms",
            vietnameseMeaning: "vùng nông thôn",
            phonics: "/ˈkʌntrisaɪd/",
            emoji: "🌾",
            grade: 5,
            unit: 11,
            topic: "Family Destinations",
            exampleSentence: "Life in the peaceful countryside is quiet and relaxing.",
            distractors: ["capital city", "factory", "railway station"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Where did you and your family go? - We went to [seaside / hometown / ancient town].",
            vietnameseMeaning: "Bạn và gia đình đã đi đâu? - Chúng mình đã đi [bờ biển / quê hương / phố cổ].",
            sampleDialogue: [
              { speaker: "Linda", text: "Where did you go last weekend, Nam?", textVi: "Cuối tuần trước cậu đã đi đâu vậy Nam?" },
              { speaker: "Nam", text: "My family went to the seaside in Nha Trang.", textVi: "Gia đình mình đã đi nghỉ ở bãi biển Nha Trang." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What did your family do together?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u11-l2-v1",
            word: "build sandcastles",
            clue: "To make models of castles out of wet sand on a beach",
            vietnameseMeaning: "xây lâu đài cát",
            phonics: "/bɪld ˈsændkɑːslz/",
            emoji: "🏰",
            grade: 5,
            unit: 11,
            topic: "Family Activities",
            exampleSentence: "My little sister loves building sandcastles on the beach.",
            distractors: ["cook soup", "study grammar", "drive trucks"]
          },
          {
            id: "g5-u11-l2-v2",
            word: "have a picnic",
            clue: "An occasion when you eat a meal outside, especially in a park or meadow",
            vietnameseMeaning: "đi dã ngoại ngoài trời",
            phonics: "/hæv ə ˈpɪknɪk/",
            emoji: "🧺",
            grade: 5,
            unit: 11,
            topic: "Family Activities",
            exampleSentence: "We had a delicious picnic by the crystal lake.",
            distractors: ["wash dishes", "take exams", "watch movies"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What did you do there? - We [built sandcastles / had a picnic / swam in the sea].",
            vietnameseMeaning: "Các bạn đã làm gì ở đó? - Chúng mình đã [xây lâu đài cát / đi dã ngoại / bơi ở biển].",
            sampleDialogue: [
              { speaker: "Mai", text: "What did you do at the beach?", textVi: "Bạn đã làm gì ở bãi biển?" },
              { speaker: "Peter", text: "We swam in the sea and built giant sandcastles.", textVi: "Chúng mình bơi biển và xây những lâu đài cát khổng lồ." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Precious Moments with Family",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Spending time with family makes me feel [loved / happy / warm].",
            vietnameseMeaning: "Dành thời gian bên gia đình khiến tôi cảm thấy [được yêu thương / hạnh phúc / ấm áp].",
            sampleDialogue: [
              { speaker: "Hoa", text: "What is the best part of your weekend?", textVi: "Khoảnh khắc tuyệt nhất cuối tuần của bạn là gì?" },
              { speaker: "Tom", text: "Cooking a big dinner together with my family.", textVi: "Cùng nhau nấu một bữa tối thật thịnh soạn với gia đình." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Sunday in Grandpa's Orchard",
          text: "Last Sunday was a special family day for Quan. His parents drove him to his grandfather's fruit orchard in Bac Giang. They picked ripe sweet lychees under warm sunshine. At noon, grandma prepared grilled chicken and sticky rice. Quan felt deeply thankful for such warm family moments.",
          translationVi: "Chủ Nhật tuần trước là một ngày gia đình đặc biệt của Quân. Bố mẹ chở bạn ấy về thăm vườn cây ăn trái của ông nội ở Bắc Giang. Cả nhà cùng hái những chùm vải chín mọng ngọt ngào dưới nắng ấm. Buổi trưa, bà nội làm món gà nướng thơm lừng và xôi dẻo. Quân cảm thấy vô cùng biết ơn những giây phút gia đình ấm áp nhường ấy."
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
        lessonTitle: "Lesson 1: Preparations for Tet & Phonics",
        focus: "vocabulary_phonics",
        phonicsSound: "/tʃ/ vs /dʒ/ in peach, jam",
        vocabulary: [
          {
            id: "g5-u12-l1-v1",
            word: "peach blossom",
            clue: "Pink flower blossom typical of Tet in Northern Vietnam",
            vietnameseMeaning: "hoa đào",
            phonics: "/piːtʃ ˈblɒs.əm/",
            emoji: "🌸",
            grade: 5,
            unit: 12,
            topic: "Tet Traditions",
            exampleSentence: "My dad bought a stunning branch of peach blossom.",
            distractors: ["sunflower", "rose", "lotus"]
          },
          {
            id: "g5-u12-l1-v2",
            word: "apricot blossom",
            clue: "Bright yellow flower typical of Tet in Southern Vietnam",
            vietnameseMeaning: "hoa mai",
            phonics: "/ˈeɪ.prɪ.kɒt ˈblɒs.əm/",
            emoji: "🌼",
            grade: 5,
            unit: 12,
            topic: "Tet Traditions",
            exampleSentence: "Yellow apricot blossoms bloom brightly during Tet.",
            distractors: ["tulip", "cactus", "bamboo"]
          },
          {
            id: "g5-u12-l1-v3",
            word: "chung cake",
            clue: "Traditional Vietnamese square sticky rice cake with pork and mung bean",
            vietnameseMeaning: "bánh chưng",
            phonics: "/tʃʊŋ keɪk/",
            emoji: "🟩",
            grade: 5,
            unit: 12,
            topic: "Tet Foods",
            exampleSentence: "My grandmother wraps delicious chung cakes before New Year's Eve.",
            distractors: ["bread", "pizza", "hamburger"]
          },
          {
            id: "g5-u12-l1-v4",
            word: "decorate the house",
            clue: "To make rooms look festive with flowers, red banners, and lights",
            vietnameseMeaning: "trang hoàng nhà cửa",
            phonics: "/ˈdek.ə.reɪt ðə haʊs/",
            emoji: "🏮",
            grade: 5,
            unit: 12,
            topic: "Tet Preparations",
            exampleSentence: "We clean and decorate the house before Tet arrives.",
            distractors: ["break windows", "throw rubbish", "lock doors"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What do you do before Tet? - We [decorate our house / buy flowers / make chung cake].",
            vietnameseMeaning: "Bạn làm gì trước dịp Tết? - Chúng mình [trang hoàng nhà cửa / mua hoa / gói bánh chưng].",
            sampleDialogue: [
              { speaker: "Linda", text: "What do you do before Tet, Mai?", textVi: "Cậu làm gì trước Tết vậy Mai?" },
              { speaker: "Mai", text: "We clean our house and buy yellow apricot blossoms.", textVi: "Chúng mình dọn dẹp nhà và mua những cành mai vàng." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What do you do at Tet?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u12-l2-v1",
            word: "get lucky money",
            clue: "Receiving red envelopes with money from elders for good fortune",
            vietnameseMeaning: "nhận tiền lì xì may mắn",
            phonics: "/ɡet ˈlʌki ˈmʌni/",
            emoji: "🧧",
            grade: 5,
            unit: 12,
            topic: "Tet Customs",
            exampleSentence: "Children wear new clothes and get lucky money from grandparents.",
            distractors: ["pay tax", "lose wallet", "sell toys"]
          },
          {
            id: "g5-u12-l2-v2",
            word: "visit relatives",
            clue: "Going to see uncles, aunts, cousins, and family friends",
            vietnameseMeaning: "đi chúc Tết, thăm họ hàng",
            phonics: "/ˈvɪzɪt ˈrelətɪvz/",
            emoji: "👨‍👩‍👧‍👦",
            grade: 5,
            unit: 12,
            topic: "Tet Customs",
            exampleSentence: "On the first days of Tet, we visit relatives and wish them health.",
            distractors: ["stay alone", "go to work", "take driving tests"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What do you do at Tet? - I [visit my grandparents / get lucky money / wear new clothes].",
            vietnameseMeaning: "Bạn làm gì vào dịp Tết? - Mình [đến thăm ông bà / nhận tiền lì xì / mặc quần áo mới].",
            sampleDialogue: [
              { speaker: "Tony", text: "What do children do at Tet in Vietnam?", textVi: "Trẻ em ở Việt Nam làm gì vào dịp Tết?" },
              { speaker: "Phong", text: "We wear elegant new clothes, visit grandparents, and receive lucky money.", textVi: "Tụi mình mặc quần áo mới thật đẹp, đi chúc Tết ông bà và nhận lì xì." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: The Spirit of Lunar New Year",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "I wish you a [Happy New Year / healthy and prosperous year]!",
            vietnameseMeaning: "Chúc bạn một [Năm mới hạnh phúc / năm mới mạnh khỏe và thịnh vượng]!",
            sampleDialogue: [
              { speaker: "Mai", text: "Happy New Year, Tom! Wishing you health and joy!", textVi: "Chúc mừng năm mới Tom! Chúc bạn dồi dào sức khỏe và niềm vui!" },
              { speaker: "Tom", text: "Happy New Year! May all your wishes come true!", textVi: "Chúc mừng năm mới! Chúc mọi ước mơ của bạn thành hiện thực!" }
            ]
          }
        ],
        readingMiniStory: {
          title: "Warm Tet in Hue",
          text: "Tet is the most significant celebration in Vietnam. Lan's family in Hue gathers to cook a giant pot of square chung cakes. On New Year's Eve, sky-illuminating fireworks burst in bright red and gold. On the first day of the new year, Lan bows politely to wish her grandparents longevity and receives pretty red lucky envelopes.",
          translationVi: "Tết là ngày lễ trọng đại và thiêng liêng nhất ở Việt Nam. Gia đình Lan ở Huế quây quần bên nồi bánh chưng khổng lồ. Đêm giao thừa, pháo hoa rực sáng cả bầu trời trong sắc đỏ vàng may mắn. Ngày mùng một, Lan lễ phép cúi chào chúc thọ ông bà và đón nhận những phong bao lì xì đỏ thắm."
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
        lessonTitle: "Lesson 1: Special Celebrations & Dates",
        focus: "vocabulary_phonics",
        phonicsSound: "/θ/ as in fourth, twentieth",
        vocabulary: [
          {
            id: "g5-u13-l1-v1",
            word: "Teachers' Day",
            clue: "A day celebrated on 20th November in Vietnam to honor teachers",
            vietnameseMeaning: "Ngày Nhà giáo Việt Nam (20/11)",
            phonics: "/ˈtiː.tʃəz deɪ/",
            emoji: "💐",
            grade: 5,
            unit: 13,
            topic: "Special Days",
            exampleSentence: "When is Vietnamese Teachers' Day? - It's on the twentieth of November.",
            distractors: ["Halloween", "Earth Day", "Labour Day"]
          },
          {
            id: "g5-u13-l1-v2",
            word: "Children's Day",
            clue: "International day celebrating kids on the first of June",
            vietnameseMeaning: "Ngày Quốc tế Thiếu nhi (1/6)",
            phonics: "/ˈtʃɪldrənz deɪ/",
            emoji: "🎈",
            grade: 5,
            unit: 13,
            topic: "Special Days",
            exampleSentence: "Children's Day is on the first of June.",
            distractors: ["New Year's Day", "Christmas", "Easter"]
          },
          {
            id: "g5-u13-l1-v3",
            word: "Sports Day",
            clue: "A school day dedicated to sporting competitions and races",
            vietnameseMeaning: "Hội khỏe phù đổng / Ngày hội thể thao",
            phonics: "/spɔːts deɪ/",
            emoji: "🏆",
            grade: 5,
            unit: 13,
            topic: "School Events",
            exampleSentence: "Our school Sports Day will be next month.",
            distractors: ["Book Day", "Math Day", "Music Festival"]
          },
          {
            id: "g5-u13-l1-v4",
            word: "National Day",
            clue: "The day celebrating national independence, 2nd September in Vietnam",
            vietnameseMeaning: "Ngày Quốc khánh (2/9)",
            phonics: "/ˈnæʃnəl deɪ/",
            emoji: "🇻🇳",
            grade: 5,
            unit: 13,
            topic: "Special Days",
            exampleSentence: "Vietnam National Day is on the second of September.",
            distractors: ["Valentine's Day", "Boxing Day", "April Fools"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "When is [special day]? - It's on the [ordinal date] of [month].",
            vietnameseMeaning: "Khi nào là [ngày đặc biệt]? - Đó là vào ngày [ngày] tháng [tháng].",
            sampleDialogue: [
              { speaker: "Tony", text: "When is Vietnamese Teachers' Day?", textVi: "Khi nào là ngày Nhà giáo Việt Nam?" },
              { speaker: "Mai", text: "It's on the twentieth of November.", textVi: "Đó là ngày 20 tháng 11." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What are you going to do on that day?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u13-l2-v1",
            word: "give flowers to teachers",
            clue: "Presenting bouquets to show gratitude to educators",
            vietnameseMeaning: "tặng hoa cho thầy cô giáo",
            phonics: "/ɡɪv ˈflaʊəz tuː ˈtiː.tʃəz/",
            emoji: "🌸",
            grade: 5,
            unit: 13,
            topic: "Event Activities",
            exampleSentence: "We give colourful fresh flowers to our beloved teachers.",
            distractors: ["buy toys", "watch cartoons", "eat ice cream"]
          },
          {
            id: "g5-u13-l2-v2",
            word: "take part in a competition",
            clue: "Participating in a contest to win medals or certificates",
            vietnameseMeaning: "tham gia cuộc thi",
            phonics: "/teɪk pɑːt ɪn ə ˌkɒm.pəˈtɪʃ.ən/",
            emoji: "🥇",
            grade: 5,
            unit: 13,
            topic: "Event Activities",
            exampleSentence: "Nam is going to take part in the 100-meter running race.",
            distractors: ["sleep all day", "read quiet books", "cook alone"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What are you going to do on [event]? - I'm / We're going to [action].",
            vietnameseMeaning: "Bạn dự định làm gì vào [dịp lễ]? - Mình / Tụi mình dự định [hành động].",
            sampleDialogue: [
              { speaker: "Linda", text: "What are you going to do on Teachers' Day?", textVi: "Bạn định làm gì vào ngày Nhà giáo?" },
              { speaker: "Phong", text: "We are going to sing special tribute songs and give flowers to our teachers.", textVi: "Tụi mình sẽ hát những bài ca tri ân và tặng hoa cho các thầy cô." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: A Joyful Sports Festival",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "We look forward to [event] because it brings us together.",
            vietnameseMeaning: "Chúng mình rất mong đợi [sự kiện] vì nó gắn kết mọi người lại với nhau.",
            sampleDialogue: [
              { speaker: "Lucy", text: "Are you ready for Children's Day?", textVi: "Cậu đã sẵn sàng cho ngày Quốc tế Thiếu nhi chưa?" },
              { speaker: "Nam", text: "Yes, our class prepared an enchanting puppet show!", textVi: "Rồi chứ, lớp mình đã chuẩn bị một màn múa rối cực kỳ cuốn hút!" }
            ]
          }
        ],
        readingMiniStory: {
          title: "The Grand School Festival",
          text: "Tomorrow is our annual School Foundation Day. Students from every class are going to take part in exciting contests. Class 5A will enter the tug-of-war competition. Class 5B is going to stage a traditional musical dance. Everyone is rehearsing enthusiastically to bring pride to their class!",
          translationVi: "Ngày mai là Ngày thành lập trường thường niên của chúng mình. Học sinh từ các khối lớp sẽ tham gia vào các cuộc thi sôi nổi. Lớp 5A sẽ tham gia thi đấu kéo co. Lớp 5B dự định biểu diễn một điệu múa âm nhạc truyền thống. Mọi người đều đang nhiệt tình tập dượt để mang lại niềm tự hào cho lớp mình!"
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
        lessonTitle: "Lesson 1: Healthy Habits & Giving Advice",
        focus: "vocabulary_phonics",
        phonicsSound: "/ʃ/ in should vs shouldn't",
        vocabulary: [
          {
            id: "g5-u14-l1-v1",
            word: "eat healthy food",
            clue: "Eating nutritious vegetables, fruit, fish, and clean grains",
            vietnameseMeaning: "ăn thức ăn lành mạnh, bổ dưỡng",
            phonics: "/iːt ˈhelθi fuːd/",
            emoji: "🥦",
            grade: 5,
            unit: 14,
            topic: "Healthy Habits",
            exampleSentence: "You should eat healthy food like greens and fruits every day.",
            distractors: ["eat too many candies", "drink fizzy soda", "skip breakfast"]
          },
          {
            id: "g5-u14-l1-v2",
            word: "do exercise",
            clue: "Physical activity that you do to keep your body fit and strong",
            vietnameseMeaning: "tập thể dục",
            phonics: "/duː ˈeksəsaɪz/",
            emoji: "🏃",
            grade: 5,
            unit: 14,
            topic: "Healthy Habits",
            exampleSentence: "We do morning exercise in the school yard.",
            distractors: ["watch TV late", "stay in bed", "eat junk food"]
          },
          {
            id: "g5-u14-l1-v3",
            word: "go to bed early",
            clue: "Going to sleep at a proper time without staying up late",
            vietnameseMeaning: "đi ngủ sớm",
            phonics: "/ɡəʊ tuː bed ˈɜːli/",
            emoji: "🛌",
            grade: 5,
            unit: 14,
            topic: "Daily Routine",
            exampleSentence: "You shouldn't stay up late; you should go to bed early.",
            distractors: ["play video games late", "drink coffee", "listen to loud music"]
          },
          {
            id: "g5-u14-l1-v4",
            word: "wash your hands",
            clue: "Cleaning hands with soap and water before meals",
            vietnameseMeaning: "rửa tay bằng xà phòng",
            phonics: "/wɒʃ jɔː hændz/",
            emoji: "🧼",
            grade: 5,
            unit: 14,
            topic: "Personal Hygiene",
            exampleSentence: "Wash your hands before eating to keep germs away.",
            distractors: ["rub eyes with dirty hands", "touch raw food", "bite nails"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "You should [do exercise / eat fruit]. You shouldn't [stay up late / eat too many sweets].",
            vietnameseMeaning: "Bạn nên [tập thể dục / ăn trái cây]. Bạn không nên [thức khuya / ăn quá nhiều kẹo].",
            sampleDialogue: [
              { speaker: "Doctor", text: "You should drink plenty of water and do exercise regularly.", textVi: "Cháu nên uống nhiều nước và tập thể dục đều đặn." },
              { speaker: "Nam", text: "Yes, doctor. I will.", textVi: "Vâng thưa bác sĩ, cháu sẽ làm theo ạ." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What should you do to stay fit?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u14-l2-v1",
            word: "drink enough water",
            clue: "Consuming at least 1.5 to 2 liters of pure water daily",
            vietnameseMeaning: "uống đủ nước",
            phonics: "/drɪŋk ɪˈnʌf ˈwɔːtər/",
            emoji: "💧",
            grade: 5,
            unit: 14,
            topic: "Healthy Living",
            exampleSentence: "Drinking enough water keeps your skin and organs healthy.",
            distractors: ["drink sugary cola", "drink icy syrup", "skip water"]
          },
          {
            id: "g5-u14-l2-v2",
            word: "brush your teeth",
            clue: "Cleaning teeth with toothpaste twice a day",
            vietnameseMeaning: "đánh răng",
            phonics: "/brʌʃ jɔː tiːθ/",
            emoji: "🪥",
            grade: 5,
            unit: 14,
            topic: "Personal Hygiene",
            exampleSentence: "Brush your teeth after meals and before sleeping.",
            distractors: ["eat sweets at bedtime", "drink sour juice", "forget to rinse"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What should I do to stay healthy? - You should [action].",
            vietnameseMeaning: "Tôi nên làm gì để giữ gìn sức khỏe? - Bạn nên [hành động].",
            sampleDialogue: [
              { speaker: "Peter", text: "What should I do to keep fit?", textVi: "Mình nên làm gì để giữ vóc dáng cân đối và khỏe mạnh?" },
              { speaker: "Mai", text: "You should eat fresh vegetables and walk every day.", textVi: "Bạn nên ăn rau xanh và đi bộ mỗi ngày." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: A Healthy Lifestyle Guide",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Good health is the greatest wealth. Let's practice healthy habits together!",
            vietnameseMeaning: "Sức khỏe là vốn quý giá nhất. Hãy cùng nhau rèn luyện những thói quen tốt!",
            sampleDialogue: [
              { speaker: "Teacher", text: "Why is breakfast so important?", textVi: "Tại sao bữa sáng lại quan trọng đến vậy?" },
              { speaker: "Linda", text: "Because it gives our brain energy to study and learn all morning.", textVi: "Bởi vì nó cung cấp năng lượng cho não bộ học tập suốt buổi sáng." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Minh's Healthy Secret",
          text: "Minh is always energetic and smiling in class. When asked about his secret, he shares: 'Every morning, I wake up at 6:00 and do fifteen minutes of gymnastics. I always eat a warm nutritious breakfast with milk and eggs. I never skip washing my hands before meals, and I sleep eight hours every night!'",
          translationVi: "Minh lúc nào cũng tràn đầy năng lượng và tươi cười trong lớp. Khi được hỏi về bí quyết của mình, bạn ấy chia sẻ: 'Mỗi sáng, tớ thức dậy lúc 6:00 và tập thể dục mười lăm phút. Tớ luôn ăn bữa sáng nóng sốt, đầy đủ dinh dưỡng cùng sữa và trứng. Tớ không bao giờ quên rửa tay trước bữa ăn và ngủ đủ tám tiếng mỗi đêm!'"
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
        lessonTitle: "Lesson 1: Common Ailments & Inquiries",
        focus: "vocabulary_phonics",
        phonicsSound: "/eɪk/ in headache, toothache, stomach ache",
        vocabulary: [
          {
            id: "g5-u15-l1-v1",
            word: "headache",
            clue: "A continuous pain in your head",
            vietnameseMeaning: "đau đầu, nhức đầu",
            phonics: "/ˈhedeɪk/",
            emoji: "🤕",
            grade: 5,
            unit: 15,
            topic: "Health Problems",
            exampleSentence: "What's the matter with you? - I have a headache.",
            distractors: ["fever", "cut", "bruise"]
          },
          {
            id: "g5-u15-l1-v2",
            word: "toothache",
            clue: "A pain in one of your teeth",
            vietnameseMeaning: "đau răng",
            phonics: "/ˈtuːθeɪk/",
            emoji: "🦷",
            grade: 5,
            unit: 15,
            topic: "Health Problems",
            exampleSentence: "He has a terrible toothache; he should see a dentist.",
            distractors: ["backache", "sore throat", "cough"]
          },
          {
            id: "g5-u15-l1-v3",
            word: "stomach ache",
            clue: "Pain in your stomach or abdomen",
            vietnameseMeaning: "đau bụng, đau dạ dày",
            phonics: "/ˈstʌmək eɪk/",
            emoji: "🤢",
            grade: 5,
            unit: 15,
            topic: "Health Problems",
            exampleSentence: "Mai has a stomach ache because she ate too many sour plums.",
            distractors: ["earache", "cold", "flu"]
          },
          {
            id: "g5-u15-l1-v4",
            word: "sore throat",
            clue: "A condition in which your throat hurts and is inflamed",
            vietnameseMeaning: "viêm họng, đau họng",
            phonics: "/ˌsɔː ˈθrəʊt/",
            emoji: "🗣️",
            grade: 5,
            unit: 15,
            topic: "Health Problems",
            exampleSentence: "I have a sore throat, so I drink warm honey water.",
            distractors: ["broken leg", "runny nose", "measles"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What's the matter with you? - I have a [headache / toothache / stomach ache / sore throat].",
            vietnameseMeaning: "Có chuyện gì với bạn vậy? (Bạn bị làm sao thế?) - Mình bị [đau đầu / đau răng / đau bụng / đau họng].",
            sampleDialogue: [
              { speaker: "Tony", text: "What's the matter with you, Quan?", textVi: "Cậu bị làm sao vậy Quân?" },
              { speaker: "Quan", text: "I have a severe toothache.", textVi: "Mình bị đau răng dữ dội." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: Medical Advice & Remedies",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u15-l2-v1",
            word: "go to the doctor",
            clue: "Visiting a medical clinic to get treated by a physician",
            vietnameseMeaning: "đi khám bác sĩ",
            phonics: "/ɡəʊ tuː ðə ˈdɒk.tər/",
            emoji: "👨‍⚕️",
            grade: 5,
            unit: 15,
            topic: "Medical Care",
            exampleSentence: "You have a high fever; you should go to the doctor immediately.",
            distractors: ["go to shopping mall", "play football", "sing karaoke"]
          },
          {
            id: "g5-u15-l2-v2",
            word: "take a rest",
            clue: "To stop working or exercising and relax to regain strength",
            vietnameseMeaning: "nghỉ ngơi dưỡng sức",
            phonics: "/teɪk ə rest/",
            emoji: "🛋️",
            grade: 5,
            unit: 15,
            topic: "Medical Care",
            exampleSentence: "You look exhausted; you should take a rest in bed.",
            distractors: ["run a marathon", "lift heavy boxes", "swim in cold lake"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "You should [go to the doctor / see a dentist / take a rest]. You shouldn't [carry heavy things].",
            vietnameseMeaning: "Bạn nên [đi khám bác sĩ / khám nha sĩ / nghỉ ngơi]. Bạn không nên [mang vác vật nặng].",
            sampleDialogue: [
              { speaker: "Lan", text: "I have a bad cough and fever.", textVi: "Mình bị ho nặng và sốt." },
              { speaker: "Hoa", text: "You should stay home and take medicine from the doctor.", textVi: "Bạn nên ở nhà và uống thuốc theo đơn của bác sĩ nhé." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: A Visit to the School Nurse",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "I hope you get well soon! Take good care of yourself.",
            vietnameseMeaning: "Mong bạn sớm bình phục! Hãy chăm sóc bản thân thật tốt nhé.",
            sampleDialogue: [
              { speaker: "Nam", text: "How do you feel today?", textVi: "Hôm nay cậu cảm thấy thế nào rồi?" },
              { speaker: "Peter", text: "Much better, thanks! The doctor's advice worked well.", textVi: "Đỡ nhiều rồi, cảm ơn bạn! Lời khuyên của bác sĩ rất hiệu quả." }
            ]
          }
        ],
        readingMiniStory: {
          title: "In Nurse Nga's Warm Office",
          text: "During second period, David felt dizzy and had a sore throat. His classmate guided him to the school medical room. Nurse Nga gently measured his temperature. She said: 'You have a mild fever, David. Drink this warm lemon water and rest on the bed for an hour.' Thanks to Nurse Nga, David felt much better by noon.",
          translationVi: "Vào tiết học thứ hai, David cảm thấy chóng mặt và rát cổ họng. Bạn cùng lớp đã dẫn bạn ấy xuống phòng y tế của trường. Cô Nga - nhân viên y tế - nhẹ nhàng cặp nhiệt độ cho bạn. Cô nói: 'Cháu bị sốt nhẹ rồi David. Hãy uống cốc nước chanh ấm này và nghỉ ngơi trên giường một tiếng nhé.' Nhờ có cô Nga, đến trưa David đã cảm thấy khỏe khoắn hơn nhiều."
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
        lessonTitle: "Lesson 1: Seasons of the Year",
        focus: "vocabulary_phonics",
        phonicsSound: "/s/ vs /z/ in seasons",
        vocabulary: [
          {
            id: "g5-u16-l1-v1",
            word: "spring",
            clue: "The season between winter and summer when plants begin to grow",
            vietnameseMeaning: "mùa xuân",
            phonics: "/sprɪŋ/",
            emoji: "🌱",
            grade: 5,
            unit: 16,
            topic: "Seasons",
            exampleSentence: "In spring, flowers bloom and the weather is warm and humid.",
            distractors: ["autumn", "winter", "rainy season"]
          },
          {
            id: "g5-u16-l1-v2",
            word: "summer",
            clue: "The warmest season of the year, between spring and autumn",
            vietnameseMeaning: "mùa hè",
            phonics: "/ˈsʌm.ər/",
            emoji: "☀️",
            grade: 5,
            unit: 16,
            topic: "Seasons",
            exampleSentence: "Summer in Central Vietnam is very hot and sunny.",
            distractors: ["winter", "dry season", "monsoon"]
          },
          {
            id: "g5-u16-l1-v3",
            word: "autumn",
            clue: "The season between summer and winter when leaves change color and fall",
            vietnameseMeaning: "mùa thu",
            phonics: "/ˈɔːtəm/",
            emoji: "🍂",
            grade: 5,
            unit: 16,
            topic: "Seasons",
            exampleSentence: "Autumn in Hanoi is cool and breezy with pleasant sunshine.",
            distractors: ["spring", "storm", "blizzard"]
          },
          {
            id: "g5-u16-l1-v4",
            word: "winter",
            clue: "The coldest season of the year, between autumn and spring",
            vietnameseMeaning: "mùa đông",
            phonics: "/ˈwɪntər/",
            emoji: "❄️",
            grade: 5,
            unit: 16,
            topic: "Seasons",
            exampleSentence: "In winter, people wear thick coats and warm scarves.",
            distractors: ["summer", "hot season", "dry period"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "How many seasons are there in your area? - There are [four seasons / two seasons].",
            vietnameseMeaning: "Có mấy mùa ở nơi bạn sống? - Có [bốn mùa / hai mùa].",
            sampleDialogue: [
              { speaker: "Tony", text: "How many seasons are there in Northern Vietnam?", textVi: "Ở miền Bắc Việt Nam có mấy mùa?" },
              { speaker: "Mai", text: "There are four seasons: spring, summer, autumn, and winter.", textVi: "Có bốn mùa: xuân, hạ, thu và đông." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What is the weather like?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u16-l2-v1",
            word: "dry season",
            clue: "The period of the year in tropical regions when little rain falls",
            vietnameseMeaning: "mùa khô",
            phonics: "/draɪ ˈsiːzn/",
            emoji: "🌵",
            grade: 5,
            unit: 16,
            topic: "Tropical Climate",
            exampleSentence: "Southern Vietnam has two seasons: the dry season and the rainy season.",
            distractors: ["snowy season", "ice season", "freeze season"]
          },
          {
            id: "g5-u16-l2-v2",
            word: "rainy season",
            clue: "The time of year in tropical areas with frequent heavy rainfall",
            vietnameseMeaning: "mùa mưa",
            phonics: "/ˈreɪni ˈsiːzn/",
            emoji: "🌧️",
            grade: 5,
            unit: 16,
            topic: "Tropical Climate",
            exampleSentence: "In Ho Chi Minh City, it often rains heavily in the afternoon during the rainy season.",
            distractors: ["desert season", "fog season", "frost"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What's the weather like in [season]? - It's usually [hot and sunny / cool and windy / cold and dry].",
            vietnameseMeaning: "Thời tiết vào [mùa] như thế nào? - Trời thường [nóng và có nắng / mát mẻ và nhiều gió / lạnh và khô ráo].",
            sampleDialogue: [
              { speaker: "Peter", text: "What's the weather like in autumn in Hanoi?", textVi: "Thời tiết mùa thu ở Hà Nội như thế nào?" },
              { speaker: "Nam", text: "It's cool, breezy, and very pleasant.", textVi: "Trời mát mẻ, có gió nhẹ và rất dễ chịu." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: The Four Seasons Across Vietnam",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "My favourite season is [season] because I can [activity].",
            vietnameseMeaning: "Mùa yêu thích của tôi là [mùa] bởi vì tôi có thể [hoạt động].",
            sampleDialogue: [
              { speaker: "Lucy", text: "Which season do you like best?", textVi: "Cậu thích mùa nào nhất?" },
              { speaker: "Hoa", text: "I like summer best because I can swim in the sea and travel with family.", textVi: "Mình thích mùa hè nhất vì mình có thể tắm biển và du lịch cùng gia đình." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Weather Variations Across Vietnam",
          text: "Vietnam has diverse weather across regions. The North enjoys four distinct seasons: a fresh spring with drizzles, a vibrant hot summer, a gentle romantic autumn, and a chilly winter. In contrast, the South has only two seasons: the dry season with sunny days and the rainy season with sudden afternoon showers that cool down the bustling cities.",
          translationVi: "Việt Nam có thời tiết vô cùng đa dạng giữa các vùng miền. Miền Bắc có 4 mùa rõ rệt: mùa xuân tươi mới với mưa phùn, mùa hè rực rỡ nắng ấm, mùa thu êm đềm lãng mạn và mùa đông se lạnh. Ngược lại, miền Nam chỉ có hai mùa: mùa khô tràn ngập ánh nắng và mùa mưa với những cơn mưa rào bất chợt làm dịu đi những đô thị nhộn nhịp."
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
        lessonTitle: "Lesson 1: Folk Tales & Famous Characters",
        focus: "vocabulary_phonics",
        phonicsSound: "/st/ vs /sk/ in story, ask",
        vocabulary: [
          {
            id: "g5-u17-l1-v1",
            word: "character",
            clue: "A person or animal in a book, play, or film",
            vietnameseMeaning: "nhân vật (trong truyện, phim)",
            phonics: "/ˈkær.ək.tər/",
            emoji: "🎭",
            grade: 5,
            unit: 17,
            topic: "Literature",
            exampleSentence: "Who is the main character in the story? - It's Mai An Tiem.",
            distractors: ["author", "chapter", "cover"]
          },
          {
            id: "g5-u17-l1-v2",
            word: "clever",
            clue: "Quick at learning and understanding things; smart",
            vietnameseMeaning: "thông minh, lanh lợi",
            phonics: "/ˈklev.ər/",
            emoji: "🦊",
            grade: 5,
            unit: 17,
            topic: "Character Traits",
            exampleSentence: "The fox in fairy tales is often depicted as clever and tricky.",
            distractors: ["clumsy", "foolish", "slow"]
          },
          {
            id: "g5-u17-l1-v3",
            word: "hard-working",
            clue: "Putting a lot of effort and care into work",
            vietnameseMeaning: "chăm chỉ, cần cù",
            phonics: "/ˌhɑːdˈwɜːkɪŋ/",
            emoji: "🐝",
            grade: 5,
            unit: 17,
            topic: "Character Traits",
            exampleSentence: "Mai An Tiem was hard-working and brave on the desert island.",
            distractors: ["lazy", "selfish", "cruel"]
          },
          {
            id: "g5-u17-l1-v4",
            word: "kind",
            clue: "Helpful, friendly, and caring about others",
            vietnameseMeaning: "tốt bụng, hiền hậu",
            phonics: "/kaɪnd/",
            emoji: "💖",
            grade: 5,
            unit: 17,
            topic: "Character Traits",
            exampleSentence: "Cam was jealous, but Tam was very kind and gentle.",
            distractors: ["greedy", "mean", "fierce"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What is [character] like? - He/She is [clever / hard-working / kind / brave].",
            vietnameseMeaning: "[Nhân vật] là người như thế nào? - Cậu ấy/Cô ấy rất [thông minh / chăm chỉ / tốt bụng / dũng cảm].",
            sampleDialogue: [
              { speaker: "Tony", text: "What do you think of Mai An Tiem?", textVi: "Bạn nghĩ gì về nhân vật Mai An Tiêm?" },
              { speaker: "Nam", text: "I think he is very hard-working and resourceful.", textVi: "Mình nghĩ chàng rất cần cù và tháo vát." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What happened in the story?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u17-l2-v1",
            word: "greedy",
            clue: "Wanting a lot more food, money, etc. than you need",
            vietnameseMeaning: "tham lam",
            phonics: "/ˈɡriːdi/",
            emoji: "💰",
            grade: 5,
            unit: 17,
            topic: "Character Traits",
            exampleSentence: "The older brother in 'The Golden Starfruit Tree' was extremely greedy.",
            distractors: ["generous", "helpful", "polite"]
          },
          {
            id: "g5-u17-l2-v2",
            word: "fairy tale",
            clue: "A traditional children's story about magical creatures and events",
            vietnameseMeaning: "truyện cổ tích",
            phonics: "/ˈfeəri teɪl/",
            emoji: "🧚",
            grade: 5,
            unit: 17,
            topic: "Stories",
            exampleSentence: "Vietnamese fairy tales teach children lessons about kindness and justice.",
            distractors: ["newspaper", "dictionary", "atlas"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What happened in the end? - In the end, [moral of the story / resolution].",
            vietnameseMeaning: "Điều gì đã xảy ra ở đoạn kết? - Cuối cùng thì [kết cục / bài học].",
            sampleDialogue: [
              { speaker: "Linda", text: "What happened to the greedy brother?", textVi: "Chuyện gì đã xảy ra với người anh tham lam?" },
              { speaker: "Mai", text: "In the end, he fell into the sea with his heavy gold bag.", textVi: "Cuối cùng, người anh đã rơi xuống biển cùng túi vàng quá nặng." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: The Legend of the Watermelon",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "The story teaches us that [honesty and hard work bring happiness].",
            vietnameseMeaning: "Câu chuyện dạy chúng ta rằng [sự trung thực và chăm chỉ sẽ đem lại hạnh phúc].",
            sampleDialogue: [
              { speaker: "Ben", text: "Why do you love reading folk stories?", textVi: "Tại sao bạn thích đọc truyện dân gian?" },
              { speaker: "Phong", text: "Because each story carries a meaningful life lesson.", textVi: "Bởi vì mỗi câu chuyện đều mang một bài học cuộc sống sâu sắc." }
            ]
          }
        ],
        readingMiniStory: {
          title: "Mai An Tiem and the Black Seeds",
          text: "Long ago, King Hung sent Mai An Tiem and his family to live on a remote deserted island. Instead of despairing, Mai An Tiem worked relentlessly. One day, a flock of birds dropped glossy black seeds. He cultivated them into sweet green watermelons with juicy red flesh. His courage and resilience won the King's respect and love.",
          translationVi: "Ngày xửa ngày xưa, Vua Hùng đày Mai An Tiêm cùng gia đình ra một hòn đảo hoang vắng xa xôi. Thay vì tuyệt vọng, Mai An Tiêm đã không ngừng lao động chăm chỉ. Một ngày nọ, một đàn chim làm rơi những hạt màu đen bóng. Chàng đã gieo trồng chúng thành những trái dưa hấu vỏ xanh, ruột đỏ mọng nước ngọt ngào. Lòng dũng cảm và kiên cường của chàng đã khiến nhà vua khâm phục và đón trở về."
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
        lessonTitle: "Lesson 1: How do you travel? & Phonics",
        focus: "vocabulary_phonics",
        phonicsSound: "/tr/ vs /dr/ in train, drive",
        vocabulary: [
          {
            id: "g5-u18-l1-v1",
            word: "underground",
            clue: "A railway system that runs under the ground; metro",
            vietnameseMeaning: "tàu điện ngầm, hệ thống metro",
            phonics: "/ˈʌn.də.ɡraʊnd/",
            emoji: "🚇",
            grade: 5,
            unit: 18,
            topic: "Transportation",
            exampleSentence: "You can travel fast across the city by underground train.",
            distractors: ["bicycle", "canoe", "scooter"]
          },
          {
            id: "g5-u18-l1-v2",
            word: "coach",
            clue: "A comfortable long-distance passenger bus",
            vietnameseMeaning: "xe khách, xe buýt đường dài",
            phonics: "/kəʊtʃ/",
            emoji: "🚍",
            grade: 5,
            unit: 18,
            topic: "Transportation",
            exampleSentence: "We went from Hanoi to Sapa by sleeper coach.",
            distractors: ["raft", "helicopter", "rocket"]
          },
          {
            id: "g5-u18-l1-v3",
            word: "ferry",
            clue: "A boat or ship for conveying passengers and goods, especially over a short distance",
            vietnameseMeaning: "chuyến phà, thuyền phà",
            phonics: "/ˈfer.i/",
            emoji: "⛴️",
            grade: 5,
            unit: 18,
            topic: "Transportation",
            exampleSentence: "We took a scenic ferry ride across the wide river.",
            distractors: ["train", "taxi", "motorbike"]
          },
          {
            id: "g5-u18-l1-v4",
            word: "airplane",
            clue: "A powered flying vehicle with fixed wings and engines",
            vietnameseMeaning: "máy bay",
            phonics: "/ˈeəpleɪn/",
            emoji: "✈️",
            grade: 5,
            unit: 18,
            topic: "Transportation",
            exampleSentence: "They travelled from Hanoi to Da Nang by airplane in one hour.",
            distractors: ["tractor", "submarine", "cart"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "How do you go to [destination]? - I go by [bike / bus / train / coach / underground].",
            vietnameseMeaning: "Bạn đi đến [địa điểm] bằng phương tiện gì? - Mình đi bằng [xe đạp / xe buýt / tàu hỏa / xe khách / tàu điện ngầm].",
            sampleDialogue: [
              { speaker: "Linda", text: "How do you go to school every day?", textVi: "Bạn đi học hằng ngày bằng phương tiện gì?" },
              { speaker: "Nam", text: "I usually walk or go by bicycle.", textVi: "Mình thường đi bộ hoặc đi bằng xe đạp." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: How far is it from... to...?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u18-l2-v1",
            word: "kilometre",
            clue: "A metric unit of measurement equal to 1,000 metres",
            vietnameseMeaning: "ki-lô-mét (km)",
            phonics: "/ˈkɪləmiːtər/",
            emoji: "📏",
            grade: 5,
            unit: 18,
            topic: "Distance",
            exampleSentence: "It is about thirty kilometres from here to the airport.",
            distractors: ["second", "gram", "degree"]
          },
          {
            id: "g5-u18-l2-v2",
            word: "take time",
            clue: "To require a certain amount of hours or minutes to travel",
            vietnameseMeaning: "mất thời gian bao lâu",
            phonics: "/teɪk taɪm/",
            emoji: "⏱️",
            grade: 5,
            unit: 18,
            topic: "Travel Duration",
            exampleSentence: "How long does it take by coach? - About two hours.",
            distractors: ["waste money", "count stars", "sing loudly"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "How far is it from [Place A] to [Place B]? - It's about [number] kilometres.",
            vietnameseMeaning: "Từ [Nơi A] đến [Nơi B] cách bao xa? - Khoảng [số] ki-lô-mét.",
            sampleDialogue: [
              { speaker: "Tony", text: "How far is it from Hanoi to Hai Phong?", textVi: "Từ Hà Nội đến Hải Phòng bao xa?" },
              { speaker: "Mai", text: "It's about one hundred and twenty kilometres.", textVi: "Khoảng một trăm hai mươi ki-lô-mét." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Travelling Across Vietnam",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Travelling by [transport] is [fast / safe / convenient / interesting].",
            vietnameseMeaning: "Đi du lịch bằng [phương tiện] thì [nhanh / an toàn / tiện lợi / thú vị].",
            sampleDialogue: [
              { speaker: "Akiko", text: "Which means of transport do you prefer for long journeys?", textVi: "Bạn thích phương tiện nào nhất cho chuyến đi xa?" },
              { speaker: "Quan", text: "I prefer the train because I can look out the window at green mountains.", textVi: "Mình thích tàu hỏa vì có thể ngắm nhìn núi non xanh biếc qua cửa sổ." }
            ]
          }
        ],
        readingMiniStory: {
          title: "The Scenic Coastal Train",
          text: "Last month, Peter and his uncle took the Thong Nhat express train from Da Nang to Hue. The railway line wound around Hai Van Pass, overlooking breathtaking azure sea waves. Travelling by train was gentle, peaceful, and permitted them to admire spectacular landscapes of coastal Vietnam without hurry.",
          translationVi: "Tháng trước, Peter cùng chú của bạn ấy đã đi chuyến tàu hỏa Thống Nhất từ Đà Nẵng ra Huế. Tuyến đường sắt uốn lượn qua Đèo Hải Vân, nhìn xuống những con sóng biển xanh ngắt đẹp đến nghẹt thở. Đi bằng tàu hỏa thật êm đềm, thanh bình và giúp hai chú cháu thong thả chiêm ngưỡng khung cảnh ngoạn mục của miền duyên hải Việt Nam."
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
        lessonTitle: "Lesson 1: Famous Landmarks & Phonics",
        focus: "vocabulary_phonics",
        phonicsSound: "/p/ vs /b/ in place, bridge",
        vocabulary: [
          {
            id: "g5-u19-l1-v1",
            word: "pagoda",
            clue: "A Hindu or Buddhist temple or sacred building",
            vietnameseMeaning: "ngôi chùa, tháp chùa",
            phonics: "/pəˈɡəʊdə/",
            emoji: "⛩️",
            grade: 5,
            unit: 19,
            topic: "Landmarks",
            exampleSentence: "One Pillar Pagoda is an iconic historical pagoda in Hanoi.",
            distractors: ["hospital", "fire station", "stadium"]
          },
          {
            id: "g5-u19-l1-v2",
            word: "bridge",
            clue: "A structure carrying a road, path, or railway across a river or valley",
            vietnameseMeaning: "cây cầu",
            phonics: "/brɪdʒ/",
            emoji: "🌉",
            grade: 5,
            unit: 19,
            topic: "Landmarks",
            exampleSentence: "Dragon Bridge in Da Nang breathes dazzling fire and water.",
            distractors: ["tunnel", "tower", "chimney"]
          },
          {
            id: "g5-u19-l1-v3",
            word: "bay",
            clue: "A broad inlet of the sea where the land curves inward",
            vietnameseMeaning: "vịnh (biển)",
            phonics: "/beɪ/",
            emoji: "⛵",
            grade: 5,
            unit: 19,
            topic: "Natural Wonders",
            exampleSentence: "Ha Long Bay is famous worldwide for thousands of limestone islands.",
            distractors: ["volcano", "desert", "glacier"]
          },
          {
            id: "g5-u19-l1-v4",
            word: "island",
            clue: "A piece of land surrounded by water",
            vietnameseMeaning: "hòn đảo",
            phonics: "/ˈaɪlənd/",
            emoji: "🏝️",
            grade: 5,
            unit: 19,
            topic: "Natural Wonders",
            exampleSentence: "Phu Quoc is the largest and most charming island in Vietnam.",
            distractors: ["continent", "mountain peak", "field"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Which place would you like to visit? - I'd like to visit [landmark/place].",
            vietnameseMeaning: "Bạn muốn đến thăm địa danh nào? - Mình muốn đến thăm [địa danh].",
            sampleDialogue: [
              { speaker: "Tony", text: "Which place would you like to visit in Vietnam?", textVi: "Bạn muốn đến thăm nơi nào ở Việt Nam?" },
              { speaker: "Linda", text: "I'd like to visit Ha Long Bay.", textVi: "Mình muốn đến thăm Vịnh Hạ Long." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What do you think of this place?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u19-l2-v1",
            word: "attractive",
            clue: "Pleasing or appealing to the eye; charming",
            vietnameseMeaning: "hấp dẫn, lôi cuốn",
            phonics: "/əˈtræk.tɪv/",
            emoji: "✨",
            grade: 5,
            unit: 19,
            topic: "Impressions",
            exampleSentence: "Trang An scenic landscape is extraordinarily attractive.",
            distractors: ["ugly", "dirty", "unpleasant"]
          },
          {
            id: "g5-u19-l2-v2",
            word: "more beautiful than expected",
            clue: "Surpassing prior anticipation in visual splendour",
            vietnameseMeaning: "đẹp hơn mong đợi / đẹp hơn tưởng tượng",
            phonics: "/mɔː ˈbjuː.tɪ.fəl ðæn ɪkˈspektɪd/",
            emoji: "😍",
            grade: 5,
            unit: 19,
            topic: "Impressions",
            exampleSentence: "Ba Na Hills was even more beautiful than I expected!",
            distractors: ["worse than imagined", "ordinary", "uninteresting"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What do you think of [place]? - It's [more beautiful / more attractive / more peaceful] than I expected.",
            vietnameseMeaning: "Bạn nghĩ gì về [địa danh]? - Nơi đó [đẹp hơn / hấp dẫn hơn / yên bình hơn] mình tưởng tượng.",
            sampleDialogue: [
              { speaker: "Nam", text: "What do you think of Thien Mu Pagoda?", textVi: "Cậu thấy chùa Thiên Mụ thế nào?" },
              { speaker: "Mary", text: "It's more peaceful and historic than I expected.", textVi: "Nơi đó cổ kính và thanh tịnh hơn mình nghĩ nhiều." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Wonders of Vietnam",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "Vietnam has countless famous places that attract travellers from all over the world.",
            vietnameseMeaning: "Việt Nam có vô số danh lam thắng cảnh thu hút du khách khắp nơi trên thế giới.",
            sampleDialogue: [
              { speaker: "Ben", text: "Is Son Doong Cave the biggest cave on Earth?", textVi: "Có phải hang Sơn Đoòng là hang động lớn nhất trái đất không?" },
              { speaker: "Mai", text: "Yes, exactly! It has its own rainforest and underground river.", textVi: "Đúng vậy đó! Trong hang còn có cả một khu rừng nguyên sinh và sông ngầm riêng." }
            ]
          }
        ],
        readingMiniStory: {
          title: "A Cruise on Ha Long Bay",
          text: "Last July, Lan explored Ha Long Bay on a traditional wooden cruise ship. The emerald green water reflected dramatic limestone pillars rising from the sea. She kayaked through mysterious water caves and climbed up Ti Top Island to see the panoramic sunset. Lan exclaimed: 'It's the most magnificent natural wonder I've ever seen!'",
          translationVi: "Tháng Bảy năm ngoái, Lan đã khám phá Vịnh Hạ Long trên một chiếc du thuyền gỗ truyền thống. Mặt nước màu ngọc bích soi bóng những cột đá vôi sừng sững vươn lên từ mặt biển. Bạn ấy đã chèo thuyền kayak qua những hang động nước huyền bí và leo lên đỉnh đảo Ti Tốp để ngắm hoàng hôn bao la. Lan thốt lên: 'Đó là kỳ quan thiên nhiên kỳ vĩ nhất mà mình từng thấy!'"
        }
      }
    ]
  },
  {
    grade: 5,
    unitNumber: 20,
    unitTitle: "Our summer holidays",
    unitTitleVi: "Kỳ nghỉ hè của chúng mình",
    theme: "The World Around Us",
    icon: "🏖️",
    semester: 2,
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: "Lesson 1: Where are you going this summer?",
        focus: "vocabulary_phonics",
        phonicsSound: "/ŋ/ vs /ŋk/ in going, think",
        vocabulary: [
          {
            id: "g5-u20-l1-v1",
            word: "Nha Trang",
            clue: "A coastal city in Vietnam famous for beaches and island diving",
            vietnameseMeaning: "thành phố Nha Trang",
            phonics: "/ɲaː ʈaːŋ/",
            emoji: "🌊",
            grade: 5,
            unit: 20,
            topic: "Holiday Destinations",
            exampleSentence: "Where are you going this summer? - I'm going to Nha Trang.",
            distractors: ["Paris", "Tokyo", "London"]
          },
          {
            id: "g5-u20-l1-v2",
            word: "Da Lat",
            clue: "A romantic highland city renowned for flower gardens and pine woods",
            vietnameseMeaning: "thành phố Đà Lạt",
            phonics: "/daː laːt/",
            emoji: "🌲",
            grade: 5,
            unit: 20,
            topic: "Holiday Destinations",
            exampleSentence: "Da Lat is cool all year round with blooming flowers.",
            distractors: ["desert", "factory zone", "coal mine"]
          },
          {
            id: "g5-u20-l1-v3",
            word: "stay at home",
            clue: "Remaining inside one's house rather than travelling away",
            vietnameseMeaning: "ở nhà",
            phonics: "/steɪ æt həʊm/",
            emoji: "🏠",
            grade: 5,
            unit: 20,
            topic: "Holiday Plans",
            exampleSentence: "I'm going to stay at home to practice swimming and read books.",
            distractors: ["fly to Mars", "climb Everest", "dive in ocean"]
          },
          {
            id: "g5-u20-l1-v4",
            word: "visit grandparents",
            clue: "Travelling to see family elders in the countryside",
            vietnameseMeaning: "về thăm ông bà",
            phonics: "/ˈvɪzɪt ˈɡrænpeərənts/",
            emoji: "👵👴",
            grade: 5,
            unit: 20,
            topic: "Holiday Plans",
            exampleSentence: "Every summer, we visit our grandparents in the countryside.",
            distractors: ["sell old books", "cut trees", "repair roads"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "Where are you going this summer? - I'm going to [destination].",
            vietnameseMeaning: "Hè này bạn dự định đi đâu? - Mình dự định đi [địa điểm].",
            sampleDialogue: [
              { speaker: "Tony", text: "Where are you going this summer, Mai?", textVi: "Hè này cậu định đi đâu thế Mai?" },
              { speaker: "Mai", text: "I'm going to Phu Quoc Island with my parents.", textVi: "Mình sẽ đi đảo Phú Quốc cùng bố mẹ." }
            ]
          }
        ]
      },
      {
        lessonNumber: 2,
        lessonTitle: "Lesson 2: What are you going to do there?",
        focus: "sentence_patterns",
        vocabulary: [
          {
            id: "g5-u20-l2-v1",
            word: "swim in the sea",
            clue: "Moving through seawater for recreational enjoyment",
            vietnameseMeaning: "tắm biển, bơi ở biển",
            phonics: "/swɪm ɪn ðə siː/",
            emoji: "🏊",
            grade: 5,
            unit: 20,
            topic: "Holiday Activities",
            exampleSentence: "We are going to swim in the cool sea early in the morning.",
            distractors: ["bake cookies", "paint fence", "sleep in classroom"]
          },
          {
            id: "g5-u20-l2-v2",
            word: "eat fresh seafood",
            clue: "Enjoying crabs, prawns, fish, and squid caught from the ocean",
            vietnameseMeaning: "thưởng thức hải sản tươi ngon",
            phonics: "/iːt freʃ ˈsiːfuːd/",
            emoji: "🦐",
            grade: 5,
            unit: 20,
            topic: "Holiday Activities",
            exampleSentence: "In Da Nang, tourists enjoy delicious fresh seafood by the beach.",
            distractors: ["eat dry biscuits", "drink salty water", "buy plastic bags"]
          }
        ],
        sentenceStructures: [
          {
            pattern: "What are you going to do there? - I'm going to [swim in the sea / eat seafood / take boat trip].",
            vietnameseMeaning: "Bạn định làm gì ở đó? - Mình định [tắm biển / ăn hải sản / đi thuyền ngắm cảnh].",
            sampleDialogue: [
              { speaker: "Linda", text: "What are you going to do in Nha Trang?", textVi: "Bạn sẽ làm gì ở Nha Trang?" },
              { speaker: "Nam", text: "I'm going to swim in the azure sea and eat fresh seafood.", textVi: "Mình sẽ tắm biển xanh và thưởng thức hải sản tươi ngon." }
            ]
          }
        ]
      },
      {
        lessonNumber: 3,
        lessonTitle: "Lesson 3: Reading: Welcoming a Joyful Summer",
        focus: "reading_communication",
        vocabulary: [],
        sentenceStructures: [
          {
            pattern: "I wish everyone a safe, fun, and memorable summer holiday!",
            vietnameseMeaning: "Chúc mọi người có một kỳ nghỉ hè an toàn, vui tươi và đáng nhớ!",
            sampleDialogue: [
              { speaker: "Teacher", text: "Have a wonderful summer vacation, children!", textVi: "Chúc các em có một kỳ nghỉ hè tuyệt vời!" },
              { speaker: "Students", text: "Thank you teacher! See you in Grade 6!", textVi: "Chúng em cảm ơn cô! Hẹn gặp lại cô ở lớp 6 ạ!" }
            ]
          }
        ],
        readingMiniStory: {
          title: "Dreams of Sunny Summer Days",
          text: "The final school bell rings, signalling the start of summer vacation. The students of Class 5A wave goodbye with bright smiles. Nam is travelling to Da Nang to swim in the gentle ocean waves. Mai is visiting her grandparents' quiet orchard in Ben Tre. A joyful summer filled with sunshine, exploration, and new adventures awaits them all!",
          translationVi: "Hồi chuông bế giảng vang lên, báo hiệu kỳ nghỉ hè bắt đầu. Các bạn học sinh lớp 5A vẫy tay chào tạm biệt với nụ cười rạng rỡ. Nam chuẩn bị đến Đà Nẵng để hòa mình vào những con sóng biển êm đềm. Mai sẽ về thăm vườn cây trái xanh mát của ông bà ở Bến Tre. Một mùa hè tràn ngập ánh nắng, khám phá và những chuyến phiêu lưu mới đang đón chờ tất cả các bạn!"
        }
      }
    ]
  }
];
