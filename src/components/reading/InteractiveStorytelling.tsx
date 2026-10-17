import React, { useState, useEffect } from "react";
import {
  InteractiveStory,
  StoryNode,
  StoryChoice,
  PostStoryQuestion,
  UserProgress,
  GradeLevel,
} from "../../types";
import { speakText, stopSpeech } from "../../utils/speech";
import { playSound } from "../../utils/audioEffects";
import { fireConfetti } from "../../utils/confetti";
import { addXpAndRecord } from "../../utils/storage";
import {
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Compass,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Globe,
  Award,
  Zap,
  Heart,
  Star,
  Users,
  Smile,
} from "lucide-react";

interface InteractiveStorytellingProps {
  grade: GradeLevel;
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

// Built-in interactive stories for Grade 1-5 Global Success learners
const BUILT_IN_STORIES: InteractiveStory[] = [
  {
    id: "story-grade3-my-family",
    title: "A Wonderful Sunday with My Family",
    titleVi: "Một Ngày Chủ Nhật Tuyệt Vời Cùng Gia Đình Em",
    topic: "My Family (Gia Đình Của Em)",
    grade: 3,
    unit: 11,
    coverEmoji: "👨‍👩‍👧‍👦",
    description: "Spend a happy Sunday with Nam's family! Help Dad in the garden, bake banana pancakes with Mom, or solve puzzles with Grandma and sister Mai.",
    difficulty: "Beginner",
    rootNodeId: "root",
    nodes: {
      root: {
        id: "root",
        chapterTitle: "Chapter 1: A Sunny Sunday Morning",
        text: "Today is a sunny Sunday in Hanoi. Nam wakes up early to the sweet smell of flowers. In the garden, Dad is watering the plants. In the kitchen, Mom is wearing a blue apron. On the living room carpet, Grandma and little sister Mai are opening a colorful jigsaw puzzle. Where should Nam go first?",
        textVi: "Hôm nay là một ngày Chủ Nhật đầy nắng ở Hà Nội. Nam thức dậy sớm trong hương hoa thơm ngát. Ngoài vườn, Bố đang tưới cây. Trong bếp, Mẹ đang đeo chiếc tạp dề màu xanh. Trên tấm thảm phòng khách, Bà và em gái Mai đang mở một hộp tranh ghép hình rực rỡ. Nam nên đến đâu trước tiên?",
        comprehensionQuestion: {
          question: "What is Mom wearing in the kitchen?",
          options: ["A blue apron", "A yellow raincoat", "A winter coat"],
          correctAnswer: "A blue apron",
          explanation: "The story states that Mom is wearing a blue apron in the kitchen.",
        },
        choices: [
          {
            id: "c1",
            choiceText: "Help Dad in the flower garden! 🌻",
            choiceTextVi: "Ra vườn giúp Bố chăm sóc cây hoa!",
            nextNodeId: "garden_branch",
          },
          {
            id: "c2",
            choiceText: "Help Mom bake banana pancakes in the kitchen! 🥞",
            choiceTextVi: "Vào bếp giúp Mẹ làm bánh kếp chuối!",
            nextNodeId: "kitchen_branch",
          },
          {
            id: "c3",
            choiceText: "Play the animal puzzle with Grandma and sister Mai! 🧩",
            choiceTextVi: "Chơi ghép hình cùng Bà và em gái Mai!",
            nextNodeId: "living_room_branch",
          },
        ],
      },
      garden_branch: {
        id: "garden_branch",
        chapterTitle: "Chapter 2A: The Sunny Flower Garden",
        text: "Nam steps into the green garden. The morning breeze is fresh and cool. Dad hands Nam a small green watering can: 'Good morning, Nam! Look at our red tomatoes and bright sunflowers. Let us water them together!' After watering, Dad asks Nam what project they should do next.",
        textVi: "Nam bước ra khu vườn xanh mát. Làn gió sớm thật trong lành và mát mẻ. Bố đưa cho Nam chiếc bình tưới nhỏ màu xanh: 'Chào buổi sáng, Nam! Hãy nhìn những quả cà chua đỏ mọng và hoa hướng dương rực rỡ này. Bố con mình cùng tưới nước nhé!' Sau khi tưới xong, Bố hỏi Nam muốn làm hoạt động nào tiếp theo.",
        comprehensionQuestion: {
          question: "What color is the small watering can Dad gives Nam?",
          options: ["Green", "Purple", "Pink"],
          correctAnswer: "Green",
          explanation: "Dad hands Nam a small green watering can to water the plants.",
        },
        choices: [
          {
            id: "c1_1",
            choiceText: "Build and paint a cozy wooden bird feeder with Dad! 🐦",
            choiceTextVi: "Cùng Bố đóng và sơn chiếc nhà ăn cho chim bằng gỗ!",
            nextNodeId: "birdhouse_craft",
          },
          {
            id: "c1_2",
            choiceText: "Pick fresh red strawberries from the garden patch! 🍓",
            choiceTextVi: "Hái những trái dâu tây đỏ mọng ngoài vườn cho bữa tráng miệng!",
            nextNodeId: "strawberry_harvest",
          },
        ],
      },
      birdhouse_craft: {
        id: "birdhouse_craft",
        chapterTitle: "Chapter 3A: The Little Birdhouse",
        text: "Nam and Dad measure the wood, hammer small nails gently, and paint the little house bright sky-blue. They hang it on the big mango tree. Within minutes, two chirping yellow songbirds land on the feeder and peck happily at the seeds. Dad pats Nam's shoulder: 'You are so caring and creative, Nam!'",
        textVi: "Nam và Bố đo gỗ, đóng những chiếc đinh nhỏ thật khéo léo và sơn ngôi nhà màu xanh da trời tươi sáng. Hai bố con treo nó lên cành cây xoài lớn. Chỉ vài phút sau, hai chú chim nhỏ hót líu lo sà xuống mổ những hạt ngũ cốc. Bố vỗ vai Nam: 'Con thật chu đáo và sáng tạo, Nam ạ!'",
        comprehensionQuestion: {
          question: "Where do Nam and Dad hang the wooden bird feeder?",
          options: ["On the big mango tree", "On the kitchen wall", "Under the dining table"],
          correctAnswer: "On the big mango tree",
          explanation: "They hang the bird feeder on the big mango tree in their garden.",
        },
        choices: [
          {
            id: "c_end_1",
            choiceText: "Call the whole family to see the cheerful birds! 🌟",
            choiceTextVi: "Gọi cả nhà ra ngắm những chú chim đáng yêu!",
            nextNodeId: "nature_heroes_ending",
          },
        ],
      },
      nature_heroes_ending: {
        id: "nature_heroes_ending",
        chapterTitle: "Happy Ending: The Nature Heroes",
        text: "Mom, Grandma, and sister Mai run into the garden. They marvel at the lovely blue birdhouse and the singing birds. Dad takes a sweet family picture under the mango tree. Nam feels so proud to have helped his Dad create something wonderful for nature and family!",
        textVi: "Mẹ, Bà và em Mai chạy ùa ra vườn. Mọi người đều trầm trồ trước ngôi nhà chim xinh xắn và tiếng chim ca líu lo. Bố chụp một bức ảnh gia đình đầm ấm dưới bóng cây xoài. Nam cảm thấy vô cùng tự hào vì đã cùng Bố tạo nên một điều tuyệt vời cho thiên nhiên và gia đình!",
        isEnding: true,
        endingType: "victory",
        moralLesson: "Building things together and caring for nature makes family moments unforgettable! (Lao động cùng Bố và yêu thiên nhiên mang lại niềm vui bất tận!)",
        choices: [],
      },
      strawberry_harvest: {
        id: "strawberry_harvest",
        chapterTitle: "Chapter 3B: The Sweet Strawberry Patch",
        text: "Nam and Dad kneel beside the strawberry plants. The strawberries are glossy red and smell like summer. Nam fills a woven wooden basket with twenty ripe strawberries! Dad laughs: 'Mom will be overjoyed when she sees these fresh treats for our Sunday lunch dessert!'",
        textVi: "Nam và Bố quỳ gối bên luống dâu tây. Những quả dâu đỏ mọng bóng bẩy và thơm phức hương mùa hè. Nam hái đầy một giỏ gỗ với hai mươi quả dâu chín mọng! Bố cười lớn: 'Mẹ sẽ ngạc nhiên và vui lắm khi thấy món tráng miệng tươi ngon này cho bữa trưa Chủ Nhật!'",
        comprehensionQuestion: {
          question: "How many ripe strawberries did Nam pick in the basket?",
          options: ["Twenty ripe strawberries", "Two strawberries", "Fifty strawberries"],
          correctAnswer: "Twenty ripe strawberries",
          explanation: "Nam filled the basket with twenty ripe strawberries.",
        },
        choices: [
          {
            id: "c_end_2",
            choiceText: "Bring the fresh strawberries to Mom in the kitchen! 🍓",
            choiceTextVi: "Mang giỏ dâu tươi vào bếp tặng Mẹ!",
            nextNodeId: "sweet_harvest_ending",
          },
        ],
      },
      sweet_harvest_ending: {
        id: "sweet_harvest_ending",
        chapterTitle: "Happy Ending: The Sweetest Family Treat",
        text: "Nam proudly presents the basket of strawberries to Mom. Mom gasps with delight: 'Oh Nam, these are wonderful!' Grandma, Mai, Dad, and Nam sit around the table, dipping sweet strawberries into fresh cream. It is the sweetest family lunch ever!",
        textVi: "Nam tự hào dâng giỏ dâu tây tươi tặng Mẹ. Mẹ trầm trồ vui sướng: 'Ôi Nam, những trái dâu này tuyệt quá!' Bà, em Mai, Bố và Nam cùng quây quần bên bàn ăn, chấm dâu ngọt ngào vào kem tươi. Đó là bữa trưa gia đình ngọt ngào và hạnh phúc nhất!",
        isEnding: true,
        endingType: "friendship",
        moralLesson: "Sharing the fruits of your labor brings sweetness to the whole family! (Chia sẻ thành quả lao động mang lại niềm vui ngọt ngào cho cả nhà!)",
        choices: [],
      },
      kitchen_branch: {
        id: "kitchen_branch",
        chapterTitle: "Chapter 2B: The Cozy Kitchen",
        text: "Nam walks into the warm kitchen. The sweet smell of butter and ripe bananas is in the air. Mom hands Nam a clean yellow apron: 'Hello my sweet assistant! We are baking fluffy banana pancakes for Sunday breakfast.' Mom lets Nam choose how they should decorate and serve them.",
        textVi: "Nam bước vào gian bếp ấm cúng. Mùi thơm ngọt ngào của bơ và chuối chín lan tỏa khắp phòng. Mẹ đưa cho Nam chiếc tạp dề màu vàng sạch sẽ: 'Chào phụ bếp đáng yêu của mẹ! Mẹ con mình đang làm bánh kếp chuối bông xốp cho bữa sáng Chủ Nhật đấy.' Mẹ để Nam chọn cách trang trí và phục vụ món bánh.",
        comprehensionQuestion: {
          question: "What fruit is Mom using to make the Sunday pancakes?",
          options: ["Ripe bananas", "Watermelon", "Lemons"],
          correctAnswer: "Ripe bananas",
          explanation: "Mom and Nam are baking fluffy banana pancakes with ripe bananas.",
        },
        choices: [
          {
            id: "c2_1",
            choiceText: "Decorate the pancakes with funny fruit animal faces! 🐻",
            choiceTextVi: "Trang trí bánh thành mặt các con thú ngộ nghĩnh bằng trái cây!",
            nextNodeId: "animal_pancakes",
          },
          {
            id: "c2_2",
            choiceText: "Squeeze sweet fresh oranges to make vitamin juice! 🍊",
            choiceTextVi: "Vắt nước cam tươi ngọt lịm bổ sung vitamin cho cả nhà!",
            nextNodeId: "fresh_orange_juice",
          },
        ],
      },
      animal_pancakes: {
        id: "animal_pancakes",
        chapterTitle: "Chapter 3C: Pancake Art",
        text: "Sizzle! The pancakes puff up golden and warm. Nam carefully arranges blueberries for eyes, strawberry slices for a smiling mouth, and banana slices for ears! He creates a pancake teddy bear for sister Mai, a pancake lion for Dad, and a butterfly for Grandma.",
        textVi: "Xèo xèo! Những chiếc bánh kếp nở phồng vàng ruộm và thơm phức. Nam cẩn thận xếp quả việt quất làm mắt, lát dâu tây làm nụ cười và lát chuối làm tai! Cậu tạo hình chú gấu bông cho em Mai, chú sư tử cho Bố và chú bướm xinh cho Bà.",
        comprehensionQuestion: {
          question: "What does Nam create with the pancake for sister Mai?",
          options: ["A pancake teddy bear", "A toy truck", "A robot"],
          correctAnswer: "A pancake teddy bear",
          explanation: "Nam creates a cute pancake teddy bear for his little sister Mai.",
        },
        choices: [
          {
            id: "c_end_3",
            choiceText: "Serve the delicious pancake art to the breakfast table! 🥞",
            choiceTextVi: "Bưng đĩa bánh nghệ thuật thơm ngon ra bàn ăn sáng!",
            nextNodeId: "master_chef_ending",
          },
        ],
      },
      master_chef_ending: {
        id: "master_chef_ending",
        chapterTitle: "Happy Ending: The Little Master Chef",
        text: "Little sister Mai claps her hands: 'Look at my teddy bear pancake! Thank you brother Nam!' Dad and Grandma eat with huge smiles. Mom kisses Nam's forehead: 'You put so much love and imagination into breakfast today!' Nam beams with happiness.",
        textVi: "Em gái Mai vỗ tay reo hò: 'Nhìn chiếc bánh gấu bông của em này! Cảm ơn anh Nam!' Bố và Bà ăn thật ngon miệng với nụ cười rạng rỡ. Mẹ thơm lên trán Nam: 'Hôm nay con đã dành thật nhiều tình yêu và sự sáng tạo cho bữa sáng!' Nam rạng rỡ niềm vui.",
        isEnding: true,
        endingType: "victory",
        moralLesson: "Cooking with love and creativity turns an ordinary meal into a celebration! (Nấu ăn bằng tình yêu thương biến mỗi bữa ăn thành ngày hội gia đình!)",
        choices: [],
      },
      fresh_orange_juice: {
        id: "fresh_orange_juice",
        chapterTitle: "Chapter 3D: Sunshine in a Glass",
        text: "Nam washes four big juicy oranges. Mom helps him press the wooden squeezer. The bright orange juice flows into tall glass cups with striped paper straws. Nam adds a tiny sprig of fresh garden mint on top. Little Mai takes a sip: 'It tastes like sunshine!'",
        textVi: "Nam rửa bốn quả cam to mọng nước. Mẹ giúp cậu dùng dụng cụ ép gỗ. Từng dòng nước cam tươi óng ả chảy vào những chiếc ly thủy tinh cao có cắm ống hút giấy sọc màu. Nam đặt thêm nhánh bạc hà tươi hái ngoài vườn lên trên. Bé Mai uống một ngụm rồi reo lên: 'Vị như ánh nắng mặt trời vậy!'",
        comprehensionQuestion: {
          question: "How many big juicy oranges did Nam wash to make juice?",
          options: ["Four big oranges", "Ten oranges", "One small orange"],
          correctAnswer: "Four big oranges",
          explanation: "Nam washed four big juicy oranges to make fresh juice for the family.",
        },
        choices: [
          {
            id: "c_end_4",
            choiceText: "Toast glasses with the family for a healthy day! 🥂",
            choiceTextVi: "Cùng cả nhà nâng ly chúc ngày mới khỏe mạnh!",
            nextNodeId: "healthy_family_ending",
          },
        ],
      },
      healthy_family_ending: {
        id: "healthy_family_ending",
        chapterTitle: "Happy Ending: Sunshine Family Toast",
        text: "Everyone raises their juice glasses: 'Cheers to our wonderful family and health!' Dad drinks every drop, Grandma smiles warmly, and Mom thanks Nam for being such a thoughtful helper. Together, they start the Sunday with boundless energy and love.",
        textVi: "Cả nhà cùng nâng ly nước cam: 'Chúc cho gia đình thân yêu luôn mạnh khỏe và hạnh phúc!' Bố uống cạn từng giọt, Bà mỉm cười đôn hậu và Mẹ cảm ơn Nam vì đã là một trợ thủ vô cùng chu đáo. Cả gia đình bắt đầu ngày Chủ Nhật với tràn đầy năng lượng và yêu thương.",
        isEnding: true,
        endingType: "friendship",
        moralLesson: "Caring for family health with love brings everyone closer together! (Chăm lo sức khỏe gia đình bằng tình yêu thương gắn kết mọi người bền chặt!)",
        choices: [],
      },
      living_room_branch: {
        id: "living_room_branch",
        chapterTitle: "Chapter 2C: Fun in the Living Room",
        text: "Nam sits down on the soft red rug beside Grandma and little sister Mai. Grandma adjusts her spectacles and sips jasmine tea. Mai holds a wooden puzzle piece shaped like a baby elephant: 'Brother Nam, where does the baby elephant belong?' Grandma asks Nam which game they should play together.",
        textVi: "Nam ngồi xuống tấm thảm đỏ mềm mại cạnh Bà và em gái Mai. Bà chỉnh lại kính lão và nhấp ngụm trà lài thơm. Mai cầm trên tay một mảnh ghép hình chú voi con: 'Anh Nam ơi, chú voi con nằm ở đâu vậy?' Bà hỏi Nam muốn cùng chơi trò chơi nào tiếp theo.",
        comprehensionQuestion: {
          question: "What is Grandma sipping while sitting on the rug?",
          options: ["Jasmine tea", "Cold soda", "Hot chocolate"],
          correctAnswer: "Jasmine tea",
          explanation: "Grandma is sipping fragrant jasmine tea while playing with Nam and Mai.",
        },
        choices: [
          {
            id: "c3_1",
            choiceText: "Assemble the giant 100-piece animal jungle puzzle! 🧩",
            choiceTextVi: "Hoàn thành bức tranh ghép 100 mảnh về khu rừng động vật!",
            nextNodeId: "jungle_puzzle",
          },
          {
            id: "c3_2",
            choiceText: "Sing English songs and hold a fun family mini-concert! 🎤",
            choiceTextVi: "Hát bài hát tiếng Anh và tổ chức buổi hòa nhạc mini gia đình!",
            nextNodeId: "family_singing",
          },
        ],
      },
      jungle_puzzle: {
        id: "jungle_puzzle",
        chapterTitle: "Chapter 3E: The Jungle Masterpiece",
        text: "Nam, Grandma, and Mai work patiently. Nam connects the tall giraffes and green trees. Mai places the friendly monkeys. Finally, Grandma hands Nam the very last golden piece: the wise owl on top! The puzzle is completed: a stunning vibrant jungle!",
        textVi: "Nam, Bà và em Mai kiên nhẫn làm việc cùng nhau. Nam ghép những chú hươu cao cổ và tán cây xanh. Mai đặt những chú khỉ tinh nghịch vào cành cây. Cuối cùng, Bà trao cho Nam mảnh ghép vàng cuối cùng: chú cú mèo thông thái trên đỉnh ngọn cây! Bức tranh đã hoàn thành: một khu rừng tuyệt đẹp!",
        comprehensionQuestion: {
          question: "What animal is shown on the very last puzzle piece Grandma gives Nam?",
          options: ["The wise owl", "A sleepy bear", "A green crocodile"],
          correctAnswer: "The wise owl",
          explanation: "Grandma hands Nam the last piece featuring the wise owl.",
        },
        choices: [
          {
            id: "c_end_5",
            choiceText: "Display the finished masterpiece for Dad and Mom to see! 🖼️",
            choiceTextVi: "Khoe bức tranh tuyệt đẹp cho Bố và Mẹ cùng chiêm ngưỡng!",
            nextNodeId: "puzzle_heroes_ending",
          },
        ],
      },
      puzzle_heroes_ending: {
        id: "puzzle_heroes_ending",
        chapterTitle: "Happy Ending: The Puzzle Champions",
        text: "Dad and Mom walk in and gasp with admiration: 'What a magnificent masterpiece!' Grandma smiles: 'When generations work together with love, nothing is impossible.' Dad frames the puzzle and hangs it proudly on the living room wall.",
        textVi: "Bố và Mẹ bước vào và trầm trồ thán phục: 'Thật là một kiệt tác tuyệt vời!' Bà mỉm cười: 'Khi các thế hệ trong gia đình cùng chung sức bằng tình yêu thương, không có điều gì là không thể.' Bố lồng khung bức tranh và treo trang trọng trên tường phòng khách.",
        isEnding: true,
        endingType: "victory",
        moralLesson: "Patience and cooperation between generations create true family masterpieces! (Sự kiên nhẫn và gắn kết giữa các thế hệ tạo nên kiệt tác gia đình!)",
        choices: [],
      },
      family_singing: {
        id: "family_singing",
        chapterTitle: "Chapter 3F: The Family Music Band",
        text: "Mai grabs two wooden rhythm spoons. Nam plays his small ukulele. Together with Grandma, they sing the lively English song: 'Daddy finger, daddy finger, where are you? Here I am, here I am, how do you do!' Dad and Mom hear the music, rush into the room, and dance along in a circle!",
        textVi: "Mai cầm hai chiếc thìa gỗ gõ nhịp. Nam gảy cây đàn ukulele nhỏ. Cùng với Bà, ba bà cháu cất vang bài hát tiếng Anh sôi động: 'Daddy finger, daddy finger, where are you? Here I am, here I am, how do you do!' Bố và Mẹ nghe tiếng nhạc liền chạy vào phòng, nắm tay nhau nhảy múa vòng tròn!",
        comprehensionQuestion: {
          question: "What musical instrument does Nam play during the song?",
          options: ["His small ukulele", "A loud drum", "A big piano"],
          correctAnswer: "His small ukulele",
          explanation: "Nam plays his small ukulele to accompany the singing.",
        },
        choices: [
          {
            id: "c_end_6",
            choiceText: "Take a final family bow with huge applause! 👏",
            choiceTextVi: "Cả gia đình cúi chào trong tiếng vỗ tay rộn rã!",
            nextNodeId: "concert_heroes_ending",
          },
        ],
      },
      concert_heroes_ending: {
        id: "concert_heroes_ending",
        chapterTitle: "Happy Ending: The Happiest Family on Earth",
        text: "The living room echoes with cheerful laughter, clapping, and singing. Little sister Mai hugs Nam tightly: 'You are the best brother in the universe!' Grandma wipes tears of joy from her eyes. Nam realizes that family is the warmest, safest, and most wonderful place in the world.",
        textVi: "Phòng khách rộn vang tiếng cười vui, tiếng vỗ tay và lời ca tiếng hát. Bé Mai ôm chặt lấy Nam: 'Anh Nam là người anh tuyệt nhất vũ trụ!' Bà khẽ lau giọt nước mắt vì xúc động và hạnh phúc. Nam hiểu rằng gia đình chính là nơi ấm áp, bình yên và tuyệt vời nhất trên đời.",
        isEnding: true,
        endingType: "friendship",
        moralLesson: "Music, laughter, and affection make home the warmest haven in the world! (Tiếng cười, âm nhạc và tình yêu thương biến ngôi nhà thành tổ ấm tuyệt vời nhất thế giới!)",
        choices: [],
      },
    },
    postStoryQuestions: [
      {
        id: "pq1",
        question: "What day of the week does Nam spend with his family in the story?",
        questionVi: "Câu chuyện diễn ra vào ngày nào trong tuần?",
        options: ["On a sunny Sunday", "On a rainy Monday", "On a cold Friday night"],
        correctAnswer: "On a sunny Sunday",
        explanation: "The story opens on a bright, sunny Sunday morning when Nam spends quality time with his family.",
        explanationVi: "Câu chuyện bắt đầu vào một buổi sáng Chủ Nhật đầy nắng ấm khi Nam sum họp bên gia đình.",
      },
      {
        id: "pq2",
        question: "How many members are in Nam's family in the story?",
        questionVi: "Gia đình của Nam trong câu chuyện gồm có bao nhiêu thành viên?",
        options: [
          "5 members: Dad, Mom, Grandma, little sister Mai, and Nam",
          "3 members: Dad, Mom, and Nam",
          "2 members: Grandma and Nam",
        ],
        correctAnswer: "5 members: Dad, Mom, Grandma, little sister Mai, and Nam",
        explanation: "Nam's family consists of Dad, Mom, Grandma, his 5-year-old sister Mai, and Nam himself.",
        explanationVi: "Gia đình Nam gồm 5 thành viên: Bố, Mẹ, Bà, em gái Mai 5 tuổi và Nam.",
      },
      {
        id: "pq3",
        question: "Which delicious breakfast food did Mom prepare in the kitchen?",
        questionVi: "Món ăn điểm tâm thơm ngon mà Mẹ chuẩn bị trong bếp là gì?",
        options: ["Fluffy banana pancakes", "Spicy noodles", "Fried fish"],
        correctAnswer: "Fluffy banana pancakes",
        explanation: "Mom made fluffy banana pancakes with butter, ripe bananas, milk, and eggs.",
        explanationVi: "Mẹ đã chuẩn bị món bánh kếp chuối thơm ngon xốp mềm từ bơ, chuối chín, sữa và trứng.",
      },
      {
        id: "pq4",
        question: "What English song did the family sing together in the living room?",
        questionVi: "Bài hát tiếng Anh mà gia đình đã cùng nhau cất vang trong phòng khách là gì?",
        options: ["The Finger Family song", "The Alphabet song", "Jingle Bells"],
        correctAnswer: "The Finger Family song",
        explanation: "Nam, little sister Mai, and Grandma sang 'The Finger Family song' while playing rhythm instruments.",
        explanationVi: "Nam, em gái Mai và Bà đã cùng hát bài hát 'The Finger Family' rộn ràng.",
      },
      {
        id: "pq5",
        question: "What is the most important lesson (moral) about 'My Family' in this story?",
        questionVi: "Bài học ý nghĩa nhất về chủ đề 'Gia Đình' qua câu chuyện là gì?",
        options: [
          "Spending time, helping, and loving your family brings true happiness",
          "Staying in your bedroom with headphones is the best way to spend Sunday",
          "Only adults should do chores around the house",
        ],
        correctAnswer: "Spending time, helping, and loving your family brings true happiness",
        explanation: "Helping parents, playing with siblings, and respecting grandparents brings warmth, joy, and strong family bonds.",
        explanationVi: "Dành thời gian, giúp đỡ bố mẹ, vui chơi cùng em gái và kính yêu ông bà mang lại hạnh phúc đích thực và sự gắn kết gia đình bền chặt.",
      },
    ],
  },
  {
    id: "story-magic-backpack",
    title: "The Magic Backpack Adventure",
    titleVi: "Chuyến Phiêu Lưu Của Chiếc Ba Lô Diệu Kỳ",
    topic: "School & Magic",
    grade: 3,
    unit: 3,
    coverEmoji: "🎒",
    description: "Nam finds a glowing blue backpack in his classroom. Where will it take him?",
    difficulty: "Beginner",
    rootNodeId: "root",
    nodes: {
      root: {
        id: "root",
        chapterTitle: "A Mysterious Morning",
        text:
          "One sunny Monday morning, Nam walks into his classroom at Thang Long Primary School. Under his desk, there is a glowing blue backpack! When he touches it, a friendly voice whispers: 'Hello Nam! I am the Magic Explorer Backpack.'",
        textVi:
          "Vào một buổi sáng thứ Hai đầy nắng, Nam bước vào lớp học ở trường Tiểu học Thăng Long. Dưới bàn của cậu có một chiếc ba lô màu xanh đang phát sáng! Khi cậu chạm vào, một giọng nói thân thiện thì thầm: 'Chào Nam! Mình là Chiếc ba lô Thám hiểm Diệu kỳ.'",
        comprehensionQuestion: {
          question: "Where did Nam find the glowing backpack?",
          options: ["In his bedroom", "Under his desk in the classroom", "In the garden"],
          correctAnswer: "Under his desk in the classroom",
          explanation: "Nam found it under his desk at Thang Long Primary School.",
        },
        choices: [
          {
            id: "c1",
            choiceText: "Open the magic backpack and jump in! 🚀",
            nextNodeId: "galaxy_library",
          },
          {
            id: "c2",
            choiceText: "Put your English book inside first! 📚",
            nextNodeId: "enchanted_zoo",
          },
        ],
      },
      galaxy_library: {
        id: "galaxy_library",
        chapterTitle: "The Galaxy Library",
        text:
          "Whoosh! The backpack zooms into the sky! Nam lands in a floating library among the twinkling stars. An alien librarian with three purple eyes smiles and says: 'Welcome! Can you help me read this English story about planet Earth?'",
        textVi:
          "Vùuu! Chiếc ba lô bay vút lên bầu trời! Nam đáp xuống một thư viện lơ lửng giữa những vì sao lấp lánh. Một người thủ thư người ngoài hành tinh có ba mắt màu tím mỉm cười và nói: 'Chào mừng! Bạn có thể giúp tôi đọc câu chuyện tiếng Anh về Trái Đất này không?'",
        comprehensionQuestion: {
          question: "How many eyes does the friendly alien librarian have?",
          options: ["Two eyes", "Three purple eyes", "Ten eyes"],
          correctAnswer: "Three purple eyes",
          explanation: "The alien librarian has three purple eyes.",
        },
        choices: [
          {
            id: "c3",
            choiceText: "Read the story aloud to the stars! ⭐",
            nextNodeId: "happy_hero_ending",
          },
        ],
      },
      enchanted_zoo: {
        id: "enchanted_zoo",
        chapterTitle: "The Singing Animal Zoo",
        text:
          "The backpack glows brightly and opens a door to a green forest! A baby panda is playing the guitar, and two green parrots are singing the ABC song. 'Join our concert!' they chirp happily.",
        textVi:
          "Chiếc ba lô phát sáng rực rỡ và mở ra một cánh cửa dẫn đến khu rừng xanh mát! Một chú gấu trúc con đang chơi đàn ghi-ta, và hai chú vẹt xanh đang hát bài hát ABC. 'Hãy cùng tham gia buổi hòa nhạc của chúng tớ nhé!' các bạn ríu rít vui vẻ.",
        comprehensionQuestion: {
          question: "What song are the green parrots singing?",
          options: ["The ABC song", "A birthday song", "A lullaby"],
          correctAnswer: "The ABC song",
          explanation: "The two green parrots are happily singing the ABC song.",
        },
        choices: [
          {
            id: "c4",
            choiceText: "Sing and dance with the animals! 🎶",
            nextNodeId: "happy_hero_ending",
          },
        ],
      },
      happy_hero_ending: {
        id: "happy_hero_ending",
        chapterTitle: "The Golden Star Badge",
        text:
          "You did an amazing job! The magic backpack sparkles with golden stars. Nam returns to his desk just before the school bell rings. In his pencil case, there is a shiny gold badge that says: 'Master English Storyteller'.",
        textVi:
          "Bạn đã làm rất xuất sắc! Chiếc ba lô diệu kỳ lấp lánh những ngôi sao vàng. Nam quay trở lại bàn học ngay trước khi chuông trường reo. Trong hộp bút của cậu có một chiếc huy hiệu vàng sáng lấp lánh ghi: 'Bậc thầy kể chuyện tiếng Anh'.",
        isEnding: true,
        endingType: "victory",
        moralLesson: "Reading and exploring English brings wonderful adventures!",
        choices: [],
      },
    },
    postStoryQuestions: [
      {
        id: "mbq1",
        question: "Where did Nam find the magic backpack?",
        questionVi: "Nam đã tìm thấy chiếc ba lô kỳ diệu ở đâu?",
        options: ["Under his desk at school", "In the school yard", "At the supermarket"],
        correctAnswer: "Under his desk at school",
        explanation: "Nam discovered the backpack under his classroom desk.",
        explanationVi: "Nam tìm thấy chiếc ba lô dưới gầm bàn học ở lớp.",
      },
      {
        id: "mbq2",
        question: "What musical instrument was the baby panda playing in the forest?",
        questionVi: "Chú gấu trúc con chơi nhạc cụ gì trong khu rừng?",
        options: ["The guitar", "The piano", "The drums"],
        correctAnswer: "The guitar",
        explanation: "The baby panda was playing a little guitar in the enchanted zoo.",
        explanationVi: "Gấu trúc con đang chơi một chiếc đàn ghi-ta nhỏ.",
      },
    ],
  },
  {
    id: "story-lost-puppy",
    title: "The Mystery Puppy at Hoan Kiem Lake",
    titleVi: "Chú Cún Lạc Ở Hồ Hoàn Kiếm",
    topic: "City Adventure & Kindness",
    grade: 4,
    unit: 4,
    coverEmoji: "🐶",
    description: "Mai and Tom find a cute lost puppy wearing a red collar near the Turtle Tower.",
    difficulty: "Intermediate",
    rootNodeId: "root",
    nodes: {
      root: {
        id: "root",
        chapterTitle: "A Sunny Walk by the Lake",
        text:
          "On Sunday afternoon, Mai and Tom are walking around Hoan Kiem Lake. The weather is cool and breezy. Suddenly, a little fluffy golden puppy runs up to them and barks gently: 'Woof woof!' It has a tiny red tag on its collar.",
        textVi:
          "Vào chiều Chủ Nhật, Mai và Tom đang đi dạo quanh hồ Hoàn Kiếm. Thời tiết mát mẻ và thoáng đãng. Đột nhiên, một chú cún con lông vàng xù chạy đến chỗ họ và sủa nhẹ: 'Gâu gâu!' Cún có một tấm thẻ nhỏ màu đỏ trên vòng cổ.",
        comprehensionQuestion: {
          question: "Where are Mai and Tom walking?",
          options: ["At West Lake", "Around Hoan Kiem Lake", "At the airport"],
          correctAnswer: "Around Hoan Kiem Lake",
          explanation: "Mai and Tom are walking around Hoan Kiem Lake.",
        },
        choices: [
          {
            id: "c1",
            choiceText: "Read the English address tag on the collar 🏷️",
            nextNodeId: "read_tag",
          },
          {
            id: "c2",
            choiceText: "Ask the ice-cream vendor if he knows the puppy 🍦",
            nextNodeId: "ask_vendor",
          },
        ],
      },
      read_tag: {
        id: "read_tag",
        chapterTitle: "The Clue on the Collar",
        text:
          "Mai carefully reads the tag: 'Name: Lucky. Address: 12 Trang Tien Street.' Tom cheers: 'That is right next to the bookstore! Let us walk there together!' Lucky wags his tail excitedly.",
        textVi:
          "Mai cẩn thận đọc tấm thẻ: 'Tên: Lucky. Địa chỉ: 12 phố Tràng Tiền.' Tom reo lên: 'Đó ngay cạnh hiệu sách! Chúng mình cùng đi bộ tới đó nào!' Lucky vui sướng vẫy đuôi.",
        comprehensionQuestion: {
          question: "What is the puppy's name?",
          options: ["Buddy", "Lucky", "Max"],
          correctAnswer: "Lucky",
          explanation: "The tag says the puppy's name is Lucky.",
        },
        choices: [
          {
            id: "c3",
            choiceText: "Walk to 12 Trang Tien Street 🏡",
            nextNodeId: "puppy_happy_ending",
          },
        ],
      },
      ask_vendor: {
        id: "ask_vendor",
        chapterTitle: "The Friendly Ice Cream Vendor",
        text:
          "The ice cream vendor smiles warmly: 'Oh! That puppy belongs to Mrs. Lan who works at Trang Tien Bakery! She is looking for him right now.' He gives Mai and Tom two chocolate ice cream cones for helping.",
        textVi:
          "Bác bán kem cười niềm nở: 'Ồ! Chú cún đó là của cô Lan làm ở tiệm bánh Tràng Tiền! Cô ấy đang tìm kiếm cún khắp nơi.' Bác tặng cho Mai và Tom hai que kem sô-cô-la vì đã giúp đỡ.",
        comprehensionQuestion: {
          question: "Where does Lucky's owner work?",
          options: ["At a supermarket", "At Trang Tien Bakery", "At a hospital"],
          correctAnswer: "At Trang Tien Bakery",
          explanation: "Mrs. Lan works at Trang Tien Bakery.",
        },
        choices: [
          {
            id: "c4",
            choiceText: "Take Lucky to the bakery! 🥐",
            nextNodeId: "puppy_happy_ending",
          },
        ],
      },
      puppy_happy_ending: {
        id: "puppy_happy_ending",
        chapterTitle: "A Heartwarming Reunion",
        text:
          "Mrs. Lan hugs Lucky with joyful tears! 'Thank you so much, smart children! You are true young heroes.' Everyone celebrates with delicious fresh pastries and warm smiles.",
        textVi:
          "Cô Lan ôm chầm lấy Lucky với những giọt nước mắt hạnh phúc! 'Cảm ơn các cháu thông minh rất nhiều! Các cháu là những anh hùng nhí thực thụ.' Mọi người cùng chung vui với những chiếc bánh ngọt thơm ngon và nụ cười rạng rỡ.",
        isEnding: true,
        endingType: "friendship",
        moralLesson: "Kindness and teamwork make the world a warmer place.",
        choices: [],
      },
    },
    postStoryQuestions: [
      {
        id: "lpq1",
        question: "What breed or color was the lost puppy Lucky?",
        questionVi: "Chú cún Lucky có đặc điểm gì?",
        options: ["Fluffy golden puppy", "Black spotted bulldog", "White poodle"],
        correctAnswer: "Fluffy golden puppy",
        explanation: "Lucky is described as a little fluffy golden puppy.",
        explanationVi: "Lucky là một chú cún con lông vàng xù đáng yêu.",
      },
      {
        id: "lpq2",
        question: "Where was Lucky's owner Mrs. Lan working?",
        questionVi: "Chủ của Lucky - cô Lan - làm việc ở đâu?",
        options: ["At Trang Tien Bakery", "At the library", "At the cinema"],
        correctAnswer: "At Trang Tien Bakery",
        explanation: "Mrs. Lan works at Trang Tien Bakery on Trang Tien street.",
        explanationVi: "Cô Lan làm việc tại Tiệm bánh Tràng Tiền.",
      },
    ],
  },
];

export const InteractiveStorytelling: React.FC<InteractiveStorytellingProps> = ({
  grade,
  progress,
  onUpdateProgress,
}) => {
  // Choose default story matching grade (default to My Family for Grade 3)
  const defaultStory =
    BUILT_IN_STORIES.find((s) => s.grade === grade && s.id === "story-grade3-my-family") ||
    BUILT_IN_STORIES.find((s) => s.grade === grade) ||
    BUILT_IN_STORIES[0];

  const [selectedStory, setSelectedStory] = useState<InteractiveStory>(defaultStory);
  const [currentNodeId, setCurrentNodeId] = useState<string>("root");
  const [nodeHistory, setNodeHistory] = useState<string[]>([]);
  const [showViTranslation, setShowViTranslation] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // In-node Comprehension question state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState<boolean>(false);
  const [isQuestionCorrect, setIsQuestionCorrect] = useState<boolean | null>(null);

  // Post-Story Comprehension Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizXpAwarded, setQuizXpAwarded] = useState<boolean>(false);

  // AI Story Generator
  const [customStoryPrompt, setCustomStoryPrompt] = useState<string>("");
  const [isGeneratingStory, setIsGeneratingStory] = useState<boolean>(false);

  // Sync when grade changes
  useEffect(() => {
    const matched =
      BUILT_IN_STORIES.find((s) => s.grade === grade && s.id === "story-grade3-my-family") ||
      BUILT_IN_STORIES.find((s) => s.grade === grade) ||
      BUILT_IN_STORIES[0];

    setSelectedStory(matched);
    setCurrentNodeId(matched.rootNodeId || "root");
    setNodeHistory([]);
    resetQuestionAndQuizState();
  }, [grade]);

  const resetQuestionAndQuizState = () => {
    stopSpeech();
    setIsPlayingAudio(false);
    setSelectedAnswer(null);
    setIsQuestionAnswered(false);
    setIsQuestionCorrect(null);
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(0);
    setQuizXpAwarded(false);
  };

  // Safe currentNode resolution with complete fallbacks
  const currentNode: StoryNode = React.useMemo(() => {
    if (selectedStory?.nodes && selectedStory.nodes[currentNodeId]) {
      return selectedStory.nodes[currentNodeId];
    }
    if (selectedStory?.nodes && selectedStory.nodes[selectedStory.rootNodeId]) {
      return selectedStory.nodes[selectedStory.rootNodeId];
    }
    if (selectedStory?.nodes && selectedStory.nodes["root"]) {
      return selectedStory.nodes["root"];
    }
    const firstNode = selectedStory?.nodes ? Object.values(selectedStory.nodes)[0] : undefined;
    if (firstNode) return firstNode;

    return {
      id: "root",
      chapterTitle: "Chapter 1: A Sunny Sunday Morning",
      text: "Today is a sunny Sunday in Hanoi. Nam wakes up early to the sweet smell of flowers. In the garden, Dad is watering the plants. In the kitchen, Mom is wearing a blue apron. On the living room carpet, Grandma and little sister Mai are opening a colorful jigsaw puzzle. Where should Nam go first?",
      textVi: "Hôm nay là một ngày Chủ Nhật đầy nắng ở Hà Nội. Nam thức dậy sớm trong hương hoa thơm ngát. Nam nên đến đâu trước tiên?",
      choices: [
        {
          id: "c1",
          choiceText: "Help Dad in the flower garden! 🌻",
          choiceTextVi: "Ra vườn giúp Bố chăm sóc cây hoa!",
          nextNodeId: "garden_branch",
        },
        {
          id: "c2",
          choiceText: "Help Mom bake banana pancakes in the kitchen! 🥞",
          choiceTextVi: "Vào bếp giúp Mẹ làm bánh kếp chuối!",
          nextNodeId: "kitchen_branch",
        },
      ],
    };
  }, [selectedStory, currentNodeId]);

  const handleReadAloud = (textToRead?: string) => {
    const text = textToRead || currentNode.text;
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      return;
    }
    playSound("click");
    setIsPlayingAudio(true);
    speakText(text, {
      rate: 0.9,
      onEnd: () => setIsPlayingAudio(false),
    });
  };

  const handleCheckInNodeQuestion = (chosenOption: string) => {
    if (!currentNode.comprehensionQuestion) return;

    setSelectedAnswer(chosenOption);
    const correct =
      chosenOption.trim().toLowerCase() ===
      currentNode.comprehensionQuestion.correctAnswer.trim().toLowerCase();

    if (correct) {
      playSound("correct");
      fireConfetti();
      setIsQuestionCorrect(true);
      setIsQuestionAnswered(true);
      const { updatedProgress } = addXpAndRecord("reading", 10, true);
      onUpdateProgress(updatedProgress);
    } else {
      playSound("wrong");
      setIsQuestionCorrect(false);
    }
  };

  const handleChoosePath = (nextNodeId: string) => {
    playSound("click");
    stopSpeech();
    setIsPlayingAudio(false);

    // Save history for back navigation
    setNodeHistory((prev) => [...prev, currentNodeId]);
    setCurrentNodeId(nextNodeId);
    setSelectedAnswer(null);
    setIsQuestionAnswered(false);
    setIsQuestionCorrect(null);

    const nextNode = selectedStory.nodes?.[nextNodeId];
    if (nextNode?.isEnding) {
      playSound("star");
      fireConfetti();
      const { updatedProgress } = addXpAndRecord("reading", 30, true);
      onUpdateProgress(updatedProgress);
    }
  };

  const handleBackStep = () => {
    if (nodeHistory.length === 0) return;
    playSound("click");
    stopSpeech();
    setIsPlayingAudio(false);

    const previousId = nodeHistory[nodeHistory.length - 1];
    setNodeHistory((prev) => prev.slice(0, -1));
    setCurrentNodeId(previousId);
    setSelectedAnswer(null);
    setIsQuestionAnswered(false);
    setIsQuestionCorrect(null);
  };

  const handleRestartStory = () => {
    playSound("click");
    stopSpeech();
    setIsPlayingAudio(false);
    resetQuestionAndQuizState();
    setNodeHistory([]);
    setCurrentNodeId(selectedStory.rootNodeId || "root");
  };

  // Post-Story Quiz Handlers
  const handleSelectQuizOption = (questionId: string, option: string) => {
    if (isQuizSubmitted) return;
    playSound("click");
    setQuizAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmitQuiz = () => {
    const questions = selectedStory.postStoryQuestions || [];
    if (questions.length === 0 || isQuizSubmitted) return;

    let correctCount = 0;
    questions.forEach((q) => {
      if (
        quizAnswers[q.id] &&
        quizAnswers[q.id].trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
      ) {
        correctCount += 1;
      }
    });

    setQuizScore(correctCount);
    setIsQuizSubmitted(true);

    if (correctCount >= Math.ceil(questions.length * 0.6)) {
      playSound("star");
      fireConfetti();
      if (!quizXpAwarded) {
        const bonusXp = correctCount * 10;
        const { updatedProgress } = addXpAndRecord("reading", bonusXp, true);
        onUpdateProgress(updatedProgress);
        setQuizXpAwarded(true);
      }
    } else {
      playSound("wrong");
    }
  };

  const handleGenerateAIStory = async () => {
    if (!customStoryPrompt.trim()) return;
    setIsGeneratingStory(true);
    playSound("click");

    try {
      const res = await fetch("/api/gemini/generate-interactive-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: customStoryPrompt,
          grade,
        }),
      });

      const storyData = await res.json();
      if (storyData.nodes) {
        setSelectedStory(storyData);
        setCurrentNodeId(storyData.rootNodeId || "root");
        resetQuestionAndQuizState();
        playSound("star");
        fireConfetti();
      }
    } catch (e) {
      console.error("AI Story generation failed:", e);
    } finally {
      setIsGeneratingStory(false);
    }
  };

  const postQuestions = selectedStory.postStoryQuestions || [];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Story Selection & AI Generator */}
      <div className="bg-white rounded-3xl p-6 border-2 border-indigo-200 shadow-[0_6px_0_0_#C7D2FE] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-black shadow-md">
              ✨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-black text-xl text-slate-900">
                  Interactive Storytelling (Truyện Tương Tác Phân Nhánh)
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-black border border-indigo-300">
                  Khối {grade}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Lựa chọn của bạn định hình cốt truyện • Trả lời câu hỏi đọc hiểu mở khóa chương mới và nhận huy hiệu!
              </p>
            </div>
          </div>
        </div>

        {/* Story Picker Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          {BUILT_IN_STORIES.map((st) => (
            <button
              key={st.id}
              onClick={() => {
                playSound("click");
                setSelectedStory(st);
                setCurrentNodeId(st.rootNodeId || "root");
                setNodeHistory([]);
                resetQuestionAndQuizState();
              }}
              className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-all relative cursor-pointer ${
                selectedStory.id === st.id
                  ? "bg-indigo-50 border-indigo-600 shadow-[0_3px_0_0_#3730A3]"
                  : "bg-slate-50 border-slate-200 hover:border-indigo-300"
              }`}
            >
              <span className="text-3xl shrink-0">{st.coverEmoji || "📖"}</span>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-black text-indigo-950 block">{st.title}</span>
                </div>
                {st.id === "story-grade3-my-family" && (
                  <span className="inline-block px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
                    ⭐ Đề xuất Lớp 3: My Family
                  </span>
                )}
                <p className="text-[11px] text-slate-500 line-clamp-2">{st.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* AI Story Generation Bar */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-2xl border border-purple-200 space-y-2">
          <span className="text-xs font-black text-purple-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Tạo truyện tương tác AI theo chủ đề bạn yêu thích:
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={customStoryPrompt}
              onChange={(e) => setCustomStoryPrompt(e.target.value)}
              placeholder="VD: My Family camping in Ba Vi, A dinosaur visiting our school..."
              className="flex-1 bg-white px-3.5 py-2 rounded-xl text-xs font-medium border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={handleGenerateAIStory}
              disabled={isGeneratingStory || !customStoryPrompt.trim()}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-black rounded-xl border-2 border-purple-800 shadow-[0_2px_0_0_#581C87] flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGeneratingStory ? "AI Đang Soạn..." : "Tạo Truyện AI"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Story Theater */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-indigo-200 shadow-[0_8px_0_0_#C7D2FE] space-y-6">
        {/* Node Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-purple-100 text-purple-900 text-xs font-black border border-purple-300">
              {currentNode?.chapterTitle || "Chapter"}
            </span>
            {selectedStory?.topic && (
              <span className="px-3 py-1 rounded-xl bg-indigo-100 text-indigo-900 text-xs font-black border border-indigo-300">
                {selectedStory.topic}
              </span>
            )}
            {currentNode.isEnding && (
              <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-black border border-emerald-300">
                🎉 Grand Finale (Kết thúc câu chuyện)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowViTranslation(!showViTranslation)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>{showViTranslation ? "Ẩn dịch" : "Dịch Tiếng Việt"}</span>
            </button>

            <button
              onClick={() => handleReadAloud()}
              className={`p-2 rounded-xl border transition-all ${
                isPlayingAudio
                  ? "bg-rose-500 text-white border-rose-600"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-700 shadow-xs"
              }`}
              title="Đọc to truyện"
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Story Text Box */}
        <div className="bg-gradient-to-b from-indigo-50/60 to-purple-50/40 rounded-3xl p-6 border border-indigo-100 space-y-4">
          <p className="font-display font-medium text-lg sm:text-xl text-slate-800 leading-relaxed">
            {currentNode.text}
          </p>

          {showViTranslation && currentNode.textVi && (
            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 font-medium leading-relaxed animate-in fade-in">
              🇻🇳 <span className="font-black">Bản dịch:</span> {currentNode.textVi}
            </div>
          )}
        </div>

        {/* In-node Comprehension Checkpoint (Optional bonus +10 XP) */}
        {currentNode.comprehensionQuestion && !currentNode.isEnding && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-5 border-2 border-indigo-200 space-y-3 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-black text-indigo-950">
                  💡 Thử thách đọc hiểu nhanh (+10 XP) - Em có thể trả lời hoặc bấm lựa chọn bên dưới để tiếp tục câu chuyện ngay:
                </span>
              </div>
              <span className="text-[10px] font-black bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full border border-indigo-200">
                Tùy chọn
              </span>
            </div>

            <p className="text-xs font-bold text-slate-800">
              {currentNode.comprehensionQuestion.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentNode.comprehensionQuestion.options.map((opt, oIdx) => {
                const isSelected = selectedAnswer === opt;
                const isCorrect =
                  opt.trim().toLowerCase() ===
                  currentNode.comprehensionQuestion!.correctAnswer.trim().toLowerCase();
                let btnStyle = "bg-white text-slate-700 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 cursor-pointer";

                if (isQuestionAnswered && isCorrect) {
                  btnStyle = "bg-emerald-500 text-white border-emerald-700 shadow-xs font-black";
                } else if (isSelected && isQuestionCorrect === false) {
                  btnStyle = "bg-rose-500 text-white border-rose-700 shadow-xs font-black";
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleCheckInNodeQuestion(opt)}
                    className={`p-3 rounded-xl border-2 text-xs font-bold transition-all text-left ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {isQuestionCorrect === false && (
              <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1.5">
                <span>⚠️ Chưa chính xác, em có thể đọc lại đoạn văn ở trên và bấm chọn lại, hoặc bấm lựa chọn hướng đi bên dưới nhé!</span>
              </p>
            )}

            {isQuestionAnswered && (
              <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Chính xác (+10 XP)! Giờ hãy chọn hướng đi tiếp theo của câu chuyện nào!</span>
              </p>
            )}
          </div>
        )}

        {/* Branch Choices (Always unlocked and interactive) */}
        {!currentNode.isEnding && currentNode.choices && currentNode.choices.length > 0 && (
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                  Lựa chọn bước tiếp theo của bạn (Em muốn làm gì tiếp theo?):
                </span>
              </div>
              <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                {currentNode.choices.length} Lựa chọn
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentNode.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoosePath(choice.nextNodeId)}
                  className="p-4 rounded-2xl border-2 text-left font-black text-xs transition-all flex items-center justify-between gap-3 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-indigo-800 shadow-[0_4px_0_0_#3730A3] hover:translate-y-[-2px] active:translate-y-1 cursor-pointer group"
                >
                  <div className="space-y-1">
                    <span className="text-sm font-black block group-hover:underline">{choice.choiceText}</span>
                    {choice.choiceTextVi && (
                      <span className="block text-[11px] font-medium text-indigo-200">
                        🇻🇳 {choice.choiceTextVi}
                      </span>
                    )}
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </button>
              ))}
            </div>

            {/* Back & Restart Controls */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              {nodeHistory.length > 0 ? (
                <button
                  type="button"
                  onClick={handleBackStep}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-300"
                >
                  <span>⬅️ Quay lại lựa chọn trước</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-400 font-semibold">Chương đầu câu chuyện</span>
              )}

              <button
                type="button"
                onClick={handleRestartStory}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Bắt đầu lại</span>
              </button>
            </div>
          </div>
        )}

        {/* Ending Screen & Post-Story Comprehension Quiz */}
        {currentNode.isEnding && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Ending Celebration Card */}
            <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-3xl p-6 sm:p-8 text-white text-center space-y-4 border-2 border-amber-500 shadow-lg">
              <div className="text-5xl animate-bounce">🏆</div>
              <div>
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black tracking-wide uppercase">
                  Hoàn Thành Câu Chuyện
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl mt-2">
                  Chúc Mừng Bạn Đã Khám Phá Trọn Vẹn Câu Chuyện!
                </h3>
                <p className="text-sm font-bold text-amber-950 mt-2 max-w-xl mx-auto bg-white/30 backdrop-blur-xs p-3 rounded-2xl">
                  {currentNode.moralLesson || "🌟 Hoàn thành xuất sắc chuyến phiêu lưu đọc hiểu (+30 XP)!"}
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handleRestartStory}
                  className="px-5 py-2.5 rounded-2xl bg-white text-amber-950 font-black text-xs border-2 border-amber-200 shadow-md inline-flex items-center gap-2 hover:scale-105 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Đọc Lại Từ Đầu / Thử Nhánh Khác</span>
                </button>
              </div>
            </div>

            {/* Post-Story Comprehension Questions Section */}
            {postQuestions.length > 0 && (
              <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border-2 border-indigo-200 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">
                      📝
                    </div>
                    <div>
                      <h4 className="font-display font-black text-lg text-slate-900">
                        Bài Tập Đọc Hiểu Tổng Kết Sau Câu Chuyện (Post-Story Quiz)
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Trả lời {postQuestions.length} câu hỏi đọc hiểu về câu chuyện vừa đọc để đạt điểm 10 và nhận thêm XP!
                      </p>
                    </div>
                  </div>

                  {isQuizSubmitted && (
                    <div className="flex items-center gap-2 bg-indigo-100 text-indigo-900 px-3.5 py-1.5 rounded-2xl border border-indigo-300 font-black text-xs">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>
                        Điểm số: {quizScore} / {postQuestions.length}
                      </span>
                    </div>
                  )}
                </div>

                {/* Questions List */}
                <div className="space-y-6">
                  {postQuestions.map((q, idx) => {
                    const chosen = quizAnswers[q.id];
                    const isCorrect =
                      chosen &&
                      chosen.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

                    return (
                      <div
                        key={q.id}
                        className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-0.5">
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-wide">
                              Câu {idx + 1}
                            </span>
                            <h5 className="font-bold text-sm text-slate-800">{q.question}</h5>
                            {q.questionVi && (
                              <p className="text-xs text-slate-500 font-medium italic">
                                🇻🇳 {q.questionVi}
                              </p>
                            )}
                          </div>

                          {isQuizSubmitted && (
                            <div>
                              {isCorrect ? (
                                <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200">
                                  <XCircle className="w-3.5 h-3.5" /> Chưa đúng
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {q.options.map((opt, oIdx) => {
                            const isSelected = chosen === opt;
                            const isOptionCorrect =
                              opt.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

                            let optClass =
                              "bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300";

                            if (isQuizSubmitted) {
                              if (isOptionCorrect) {
                                optClass =
                                  "bg-emerald-500 text-white border-emerald-700 font-black shadow-xs";
                              } else if (isSelected && !isOptionCorrect) {
                                optClass =
                                  "bg-rose-500 text-white border-rose-700 font-black shadow-xs";
                              }
                            } else if (isSelected) {
                              optClass =
                                "bg-indigo-600 text-white border-indigo-800 font-black shadow-xs";
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleSelectQuizOption(q.id, opt)}
                                disabled={isQuizSubmitted}
                                className={`p-3 rounded-xl border-2 text-xs font-bold transition-all text-left ${optClass}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {/* Post-submit explanation */}
                        {isQuizSubmitted && (
                          <div
                            className={`p-3 rounded-xl text-xs font-medium space-y-1 ${
                              isCorrect
                                ? "bg-emerald-50 text-emerald-950 border border-emerald-200"
                                : "bg-amber-50 text-amber-950 border border-amber-200"
                            }`}
                          >
                            <span className="font-black block">
                              💡 Giải thích: {q.explanation}
                            </span>
                            {q.explanationVi && (
                              <span className="block italic text-[11px] text-slate-600">
                                {q.explanationVi}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submit Quiz Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 font-bold">
                    Đã trả lời {Object.keys(quizAnswers).length} / {postQuestions.length} câu
                  </div>

                  {!isQuizSubmitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(quizAnswers).length < postQuestions.length}
                      className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-black text-xs border-2 border-indigo-800 shadow-[0_4px_0_0_#3730A3] transition-all flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Nộp Bài Đọc Hiểu & Nhận Thưởng (+50 XP)</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          playSound("click");
                          setQuizAnswers({});
                          setIsQuizSubmitted(false);
                          setQuizScore(0);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs"
                      >
                        Làm Lại Bài Đọc Hiểu
                      </button>
                      <button
                        onClick={handleRestartStory}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs"
                      >
                        Khám Phá Nhánh Truyện Khác 🚀
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
