import { GlobalSuccessUnit } from "../../types";

export const GRADE_4_UNITS: GlobalSuccessUnit[] = [
  {
    grade: 4, unitNumber: 1, unitTitle: "My Friends", unitTitleVi: "Bạn bè của mình", theme: "Nationalities & Countries", icon: "🌏", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Countries & Origins", focus: "vocabulary_phonics", phonicsSound: "Sounds /eɪ/ (Malaysia) & /æ/ (America)",
        vocabulary: [
          { id: "g4-u1-vietnam", word: "Vietnam", clue: "Our beloved country in Southeast Asia.", vietnameseMeaning: "Việt Nam", phonics: "/ˌvjetˈnæm/", emoji: "🇻🇳", grade: 4, unit: 1, topic: "Countries", exampleSentence: "I am from Vietnam.", distractors: ["America", "England", "Japan"] },
          { id: "g4-u1-america", word: "America", clue: "The United States.", vietnameseMeaning: "nước Mỹ / Hoa Kỳ", phonics: "/əˈmer.ɪ.kə/", emoji: "🇺🇸", grade: 4, unit: 1, topic: "Countries", exampleSentence: "Tony is from America.", distractors: ["Australia", "England", "Vietnam"] },
          { id: "g4-u1-england", word: "England", clue: "Country in the United Kingdom where London is.", vietnameseMeaning: "nước Anh", phonics: "/ˈɪŋ.ɡlənd/", emoji: "🇬🇧", grade: 4, unit: 1, topic: "Countries", exampleSentence: "Mary is from England.", distractors: ["Japan", "Malaysia", "Australia"] },
          { id: "g4-u1-japan", word: "Japan", clue: "Island country in East Asia with Tokyo as capital.", vietnameseMeaning: "nước Nhật Bản", phonics: "/dʒəˈpæn/", emoji: "🇯🇵", grade: 4, unit: 1, topic: "Countries", exampleSentence: "Akiko is from Japan.", distractors: ["Vietnam", "America", "England"] },
          { id: "g4-u1-malaysia", word: "Malaysia", clue: "Southeast Asian country with Kuala Lumpur.", vietnameseMeaning: "nước Ma-lai-xi-a", phonics: "/məˈleɪ.ʒə/", emoji: "🇲🇾", grade: 4, unit: 1, topic: "Countries", exampleSentence: "Hakim is from Malaysia.", distractors: ["Australia", "Japan", "Vietnam"] },
          { id: "g4-u1-australia", word: "Australia", clue: "Country and continent famous for kangaroos.", vietnameseMeaning: "nước Úc", phonics: "/ɒsˈtreɪ.li.ə/", emoji: "🇦🇺", grade: 4, unit: 1, topic: "Countries", exampleSentence: "Tom is from Australia.", distractors: ["America", "England", "Japan"] },
        ],
        sentenceStructures: [{ pattern: "Where are you from? ➔ I'm from [Country]. / Where is he/she from? ➔ He's/She's from [Country].", vietnameseMeaning: "Bạn đến từ đâu? ➔ Mình đến từ [Quốc gia]. / Anh/cô ấy đến từ đâu? ➔ Anh/cô ấy đến từ [Quốc gia].", sampleDialogue: [{ speaker: "Mai", text: "Hello! Where are you from, Tony?", textVi: "Xin chào! Bạn đến từ đâu thế Tony?" }, { speaker: "Tony", text: "I'm from America. Nice to meet you!", textVi: "Mình đến từ nước Mỹ. Rất vui được gặp bạn!" }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Nationalities", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "What nationality are you? ➔ I'm [Nationality].", vietnameseMeaning: "Quốc tịch của bạn là gì? ➔ Mình mang quốc tịch [Quốc tịch].", sampleDialogue: [{ speaker: "Hakim", text: "What nationality are you, Mai?", textVi: "Quốc tịch của bạn là gì thế Mai?" }, { speaker: "Mai", text: "I'm Vietnamese.", textVi: "Mình là người Việt Nam." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: International Friends Story", focus: "reading_communication", readingMiniStory: { title: "International Summer Camp", text: "At the International Youth Camp in Da Nang, children from Vietnam, England, America, Japan, and Australia meet together. We exchange cultural gifts and speak English fluently!", translationVi: "Tại Trại hè Thanh thiếu niên Quốc tế ở Đà Nẵng, các bạn nhỏ đến từ Việt Nam, Anh, Mỹ, Nhật Bản và Úc cùng gặp gỡ. Chúng mình trao đổi những món quà văn hóa và nói tiếng Anh thật lưu loát!" }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 2, unitTitle: "Time and Daily Routines", unitTitleVi: "Thời gian và thói quen hằng ngày", theme: "Time & Daily Habits", icon: "⏰", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Telling Time & Routines", focus: "vocabulary_phonics", phonicsSound: "Sounds /t/ (time) & /kl/ (clock)",
        vocabulary: [
          { id: "g4-u2-get-up", word: "get up", clue: "Wake and rise from bed in the morning.", vietnameseMeaning: "thức dậy", phonics: "/ɡet ˈʌp/", emoji: "🌅", grade: 4, unit: 2, topic: "Routines", exampleSentence: "I get up at 6:00 a.m.", distractors: ["go to bed", "have breakfast", "go to school"] },
          { id: "g4-u2-breakfast", word: "have breakfast", clue: "Eat the first meal of the day.", vietnameseMeaning: "ăn bữa sáng", phonics: "/hæv ˈbrek.fəst/", emoji: "🍳", grade: 4, unit: 2, topic: "Routines", exampleSentence: "I have breakfast at 6:30.", distractors: ["have lunch", "have dinner", "go to bed"] },
          { id: "g4-u2-go-school", word: "go to school", clue: "Depart home to attend classes.", vietnameseMeaning: "đi học", phonics: "/ɡəʊ tuː skuːl/", emoji: "🎒", grade: 4, unit: 2, topic: "Routines", exampleSentence: "We go to school at 7:00.", distractors: ["go home", "get up", "watch TV"] },
          { id: "g4-u2-go-bed", word: "go to bed", clue: "Retire to sleep at night.", vietnameseMeaning: "đi ngủ", phonics: "/ɡəʊ tuː bed/", emoji: "🛌", grade: 4, unit: 2, topic: "Routines", exampleSentence: "I go to bed at 9:30 p.m.", distractors: ["get up", "have dinner", "do homework"] },
        ],
        sentenceStructures: [{ pattern: "What time is it? ➔ It's [Time]. / What time do you [Action]? ➔ I [Action] at [Time].", vietnameseMeaning: "Mấy giờ rồi? ➔ Bây giờ là [Giờ]. / Bạn [Làm việc gì] lúc mấy giờ? ➔ Mình [Làm việc gì] lúc [Giờ].", sampleDialogue: [{ speaker: "Linda", text: "What time is it, Tom?", textVi: "Mấy giờ rồi hả Tom?" }, { speaker: "Tom", text: "It's seven o'clock. It's time for school!", textVi: "Bảy giờ đúng rồi. Đến giờ đi học rồi!" }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Daily Schedule", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "What time does he/she [Action]? ➔ He/She [Action]s at [Time].", vietnameseMeaning: "Anh/cô ấy [Làm gì] lúc mấy giờ? ➔ Anh/cô ấy [Làm gì] lúc [Giờ].", sampleDialogue: [{ speaker: "Mai", text: "What time does your brother have dinner?", textVi: "Anh trai bạn ăn tối lúc mấy giờ?" }, { speaker: "Nam", text: "He has dinner at seven thirty.", textVi: "Anh ấy ăn tối lúc 7 giờ 30." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Healthy Routine Story", focus: "reading_communication", readingMiniStory: { title: "A Productive School Day", text: "Linh is an organized Grade 4 pupil. She wakes up at 6:00, eats a healthy breakfast with eggs and milk at 6:30, and arrives at school at 7:15. She completes her homework and sleeps early at 9:30.", translationVi: "Linh là một học sinh lớp 4 rất ngăn nắp, có kế hoạch. Bạn thức dậy lúc 6:00, ăn sáng đủ chất với trứng và sữa lúc 6:30 và đến trường lúc 7:15. Bạn hoàn thành bài tập về nhà và đi ngủ sớm lúc 9:30." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 3, unitTitle: "My Week", unitTitleVi: "Tuần lễ của mình", theme: "Days of the Week", icon: "📅", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Days of the Week", focus: "vocabulary_phonics", phonicsSound: "Sounds /m/ (Monday) & /s/ (Sunday)",
        vocabulary: [
          { id: "g4-u3-monday", word: "Monday", clue: "First working day of the school week.", vietnameseMeaning: "thứ Hai", phonics: "/ˈmʌn.deɪ/", emoji: "🗓️", grade: 4, unit: 3, topic: "Days", exampleSentence: "We have flag salute on Monday.", distractors: ["Tuesday", "Sunday", "Friday"] },
          { id: "g4-u3-tuesday", word: "Tuesday", clue: "Second day of the school week.", vietnameseMeaning: "thứ Ba", phonics: "/ˈtʃuːz.deɪ/", emoji: "🗓️", grade: 4, unit: 3, topic: "Days", exampleSentence: "I have English on Tuesday.", distractors: ["Monday", "Wednesday", "Thursday"] },
          { id: "g4-u3-wednesday", word: "Wednesday", clue: "Middle day of the weekdays.", vietnameseMeaning: "thứ Tư", phonics: "/ˈwenz.deɪ/", emoji: "🗓️", grade: 4, unit: 3, topic: "Days", exampleSentence: "Science class on Wednesday.", distractors: ["Thursday", "Tuesday", "Friday"] },
          { id: "g4-u3-thursday", word: "Thursday", clue: "Day before Friday.", vietnameseMeaning: "thứ Năm", phonics: "/ˈθɜːz.deɪ/", emoji: "🗓️", grade: 4, unit: 3, topic: "Days", exampleSentence: "We practice sports on Thursday.", distractors: ["Tuesday", "Wednesday", "Friday"] },
          { id: "g4-u3-friday", word: "Friday", clue: "Last school day of the working week.", vietnameseMeaning: "thứ Sáu", phonics: "/ˈfraɪ.deɪ/", emoji: "🗓️", grade: 4, unit: 3, topic: "Days", exampleSentence: "Art and Music on Friday.", distractors: ["Saturday", "Monday", "Thursday"] },
          { id: "g4-u3-weekend", word: "weekend", clue: "Saturday and Sunday recreation days.", vietnameseMeaning: "cuối tuần", phonics: "/ˌwiːkˈend/", emoji: "🎉", grade: 4, unit: 3, topic: "Days", exampleSentence: "We relax at the weekend.", distractors: ["Monday", "weekday", "school"] },
        ],
        sentenceStructures: [{ pattern: "What day is it today? ➔ It's [Day]. / What do you do on [Days]? ➔ I [Action].", vietnameseMeaning: "Hôm nay là thứ mấy? ➔ Hôm nay là [Thứ]. / Bạn làm gì vào [Thứ]? ➔ Mình [Làm việc gì].", sampleDialogue: [{ speaker: "Tony", text: "What day is it today, Mai?", textVi: "Hôm nay là thứ mấy thế Mai?" }, { speaker: "Mai", text: "It's Friday. What do you do on Fridays?", textVi: "Hôm nay là thứ Sáu. Bạn thường làm gì vào thứ Sáu?" }, { speaker: "Tony", text: "I play football with my English club.", textVi: "Mình đá bóng với câu lạc bộ tiếng Anh." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Weekend Activities", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "What do you do at the weekend? ➔ I visit my grandparents.", vietnameseMeaning: "Bạn làm gì vào cuối tuần? ➔ Mình về thăm ông bà.", sampleDialogue: [{ speaker: "Nam", text: "What do you do on Sundays?", textVi: "Bạn làm gì vào các ngày Chủ nhật?" }, { speaker: "Mary", text: "I go to the music club and play the piano.", textVi: "Mình đến câu lạc bộ âm nhạc và chơi đàn dương cầm." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Weekly Planner Story", focus: "reading_communication", readingMiniStory: { title: "My Exciting Week", text: "From Monday to Friday, I attend school and study interesting subjects like English and Maths. On Saturday, I go swimming, and on Sunday, my family enjoys a joyful picnic.", translationVi: "Từ thứ Hai đến thứ Sáu, mình đến trường học các môn học thú vị như Tiếng Anh và Toán. Vào thứ Bảy, mình đi bơi và vào Chủ nhật, gia đình mình cùng tận hưởng chuyến dã ngoại ngập tràn niềm vui." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 4, unitTitle: "My Birthday Party", unitTitleVi: "Bữa tiệc sinh nhật của mình", theme: "Birthdays & Months", icon: "🎂", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Months of the Year", focus: "vocabulary_phonics", phonicsSound: "Sounds /dʒ/ (January, June, July) & /m/ (May, March)",
        vocabulary: [
          { id: "g4-u4-january", word: "January", clue: "The 1st month of the year.", vietnameseMeaning: "tháng Một", phonics: "/ˈdʒæn.ju.ə.ri/", emoji: "❄️", grade: 4, unit: 4, topic: "Months", exampleSentence: "New Year in January.", distractors: ["February", "June", "July"] },
          { id: "g4-u4-march", word: "March", clue: "The 3rd month of the year.", vietnameseMeaning: "tháng Ba", phonics: "/mɑːtʃ/", emoji: "🌱", grade: 4, unit: 4, topic: "Months", exampleSentence: "My birthday is in March.", distractors: ["May", "April", "June"] },
          { id: "g4-u4-may", word: "May", clue: "The 5th month with warm sunshine.", vietnameseMeaning: "tháng Năm", phonics: "/meɪ/", emoji: "🌸", grade: 4, unit: 4, topic: "Months", exampleSentence: "Summer begins in May.", distractors: ["March", "June", "July"] },
          { id: "g4-u4-october", word: "October", clue: "The 10th month with autumn breeze.", vietnameseMeaning: "tháng Mười", phonics: "/ɒkˈtəʊ.bər/", emoji: "🍁", grade: 4, unit: 4, topic: "Months", exampleSentence: "Vietnamese Women's Day is in October.", distractors: ["November", "December", "September"] },
          { id: "g4-u4-birthday", word: "birthday", clue: "Anniversary of the day on which a person was born.", vietnameseMeaning: "ngày sinh nhật", phonics: "/ˈbɜːθ.deɪ/", emoji: "🎂", grade: 4, unit: 4, topic: "Celebration", exampleSentence: "Happy birthday to you!", distractors: ["party", "month", "year"] },
        ],
        sentenceStructures: [{ pattern: "When is your birthday? ➔ It's in [Month]. / It's on the [Ordinal] of [Month].", vietnameseMeaning: "Khi nào là sinh nhật của bạn? ➔ Vào [Tháng]. / Vào ngày [Ngày] của [Tháng].", sampleDialogue: [{ speaker: "Mary", text: "When is your birthday, Quan?", textVi: "Khi nào là sinh nhật của bạn thế Quân?" }, { speaker: "Quan", text: "It's in October. Will you come to my party?", textVi: "Vào tháng Mười. Bạn sẽ đến dự tiệc của mình chứ?" }, { speaker: "Mary", text: "Yes, I'd love to!", textVi: "Chắc chắn rồi, mình rất thích!" }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Party Invitations & Treats", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Would you like some [Food/Drink]? ➔ Yes, please. / No, thanks.", vietnameseMeaning: "Bạn có muốn dùng chút [Món ăn/Uống] không? ➔ Vâng, cho mình xin. / Không, cảm ơn bạn.", sampleDialogue: [{ speaker: "Quan", text: "Would you like some birthday cake and fruit juice?", textVi: "Bạn có muốn ăn bánh sinh nhật và uống nước trái cây không?" }, { speaker: "Linda", text: "Yes, please! The strawberry cake looks delicious.", textVi: "Vâng, cho mình xin! Bánh dâu tây trông ngon tuyệt." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Birthday Celebration Story", focus: "reading_communication", readingMiniStory: { title: "Unforgettable 10th Birthday", text: "Today is Quan's 10th birthday party. His room is decorated with balloons, streamers, and a big chocolate cake. Classmates sing 'Happy Birthday' and cheer happily.", translationVi: "Hôm nay là tiệc sinh nhật 10 tuổi của Quân. Căn phòng được trang trí bằng bóng bay, dây kim tuyến và chiếc bánh sô-cô-la lớn. Các bạn cùng lớp hát vang bài ca 'Chúc mừng sinh nhật' và chúc mừng rộn rã." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 5, unitTitle: "Things We Can Do", unitTitleVi: "Những điều chúng mình có thể làm", theme: "Abilities & Talents", icon: "🎸", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Action Abilities", focus: "vocabulary_phonics", phonicsSound: "Sounds /sw/ (swim) & /sk/ (skate)",
        vocabulary: [
          { id: "g4-u5-swim", word: "swim", clue: "Propel body through water.", vietnameseMeaning: "bơi lội", phonics: "/swɪm/", emoji: "🏊", grade: 4, unit: 5, topic: "Abilities", exampleSentence: "I can swim like a dolphin.", distractors: ["skate", "cook", "sing"] },
          { id: "g4-u5-skate", word: "skate", clue: "Glide on roller skates or ice.", vietnameseMeaning: "trượt pa-tin / trượt băng", phonics: "/skeɪt/", emoji: "⛸️", grade: 4, unit: 5, topic: "Abilities", exampleSentence: "She can skate very fast.", distractors: ["swim", "dance", "draw"] },
          { id: "g4-u5-play-guitar", word: "play the guitar", clue: "Strum strings on a musical instrument.", vietnameseMeaning: "chơi đàn ghi-ta", phonics: "/pleɪ ðə ɡɪˈtɑːr/", emoji: "🎸", grade: 4, unit: 5, topic: "Music", exampleSentence: "He can play the guitar nicely.", distractors: ["play chess", "swim", "skate"] },
          { id: "g4-u5-cook", word: "cook", clue: "Prepare savory food with heat.", vietnameseMeaning: "nấu ăn", phonics: "/kʊk/", emoji: "👨‍🍳", grade: 4, unit: 5, topic: "Abilities", exampleSentence: "I can cook delicious fried rice.", distractors: ["skate", "swim", "dance"] },
        ],
        sentenceStructures: [{ pattern: "What can you do? ➔ I can [Action]. / Can you [Action]? ➔ Yes, I can. / No, I can't.", vietnameseMeaning: "Bạn có thể làm được gì? ➔ Mình có thể [Hành động]. / Bạn có thể [Hành động] không? ➔ Có, mình có thể. / Không, mình không thể.", sampleDialogue: [{ speaker: "Peter", text: "What can you do, Nam?", textVi: "Bạn có thể làm được gì thế Nam?" }, { speaker: "Nam", text: "I can play the guitar and swim. What about you?", textVi: "Mình biết chơi đàn ghi-ta và biết bơi. Còn bạn thì sao?" }, { speaker: "Peter", text: "I can skate and speak English.", textVi: "Mình biết trượt pa-tin và nói tiếng Anh." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Talent Show Auditions", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Can he/she [Action]? ➔ Yes, he/she can. / No, he/she can't.", vietnameseMeaning: "Anh/cô ấy có thể [Hành động] không? ➔ Có. / Không.", sampleDialogue: [{ speaker: "Mai", text: "Can Linda sing English songs?", textVi: "Linda có thể hát bài hát tiếng Anh không?" }, { speaker: "Mary", text: "Yes, she can sing beautifully!", textVi: "Có chứ, bạn ấy hát rất hay!" }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: School Talent Show Story", focus: "reading_communication", readingMiniStory: { title: "Our School Talent Festival", text: "Our school hosts an inspiring talent festival. Nam plays the acoustic guitar, Mai dances gracefully, and Tony amazes the audience with roller skating tricks. Everyone has special abilities!", translationVi: "Trường chúng mình tổ chức ngày hội tài năng đầy cảm hứng. Nam chơi đàn ghi-ta mộc, Mai múa thật duyên dáng và Tony làm khán giả trầm trồ với các kỹ thuật trượt pa-tin. Ai cũng có những tài năng đặc biệt!" }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 6, unitTitle: "Our School Facilities", unitTitleVi: "Cơ sở vật chất trường học của chúng mình", theme: "School Buildings & Locations", icon: "🏫", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: School Locations & Rooms", focus: "vocabulary_phonics", phonicsSound: "Sounds /s/ (city) & /v/ (village)",
        vocabulary: [
          { id: "g4-u6-in-city", word: "in the city", clue: "Located within an urban metropolitan area.", vietnameseMeaning: "ở thành phố", phonics: "/ɪn ðə ˈsɪt.i/", emoji: "🏙️", grade: 4, unit: 6, topic: "Locations", exampleSentence: "Our school is in the city.", distractors: ["in the village", "in the mountains", "in the town"] },
          { id: "g4-u6-in-village", word: "in the village", clue: "Located in a rural countryside area.", vietnameseMeaning: "ở trong làng", phonics: "/ɪn ðə ˈvɪl.ɪdʒ/", emoji: "🏘️", grade: 4, unit: 6, topic: "Locations", exampleSentence: "A peaceful school in the village.", distractors: ["in the city", "in the town", "in the street"] },
          { id: "g4-u6-computer-room", word: "computer room", clue: "Laboratory equipped with desktop PCs.", vietnameseMeaning: "phòng máy tính / tin học", phonics: "/kəmˈpjuː.tər ˌruːm/", emoji: "💻", grade: 4, unit: 6, topic: "Facilities", exampleSentence: "We learn coding in the computer room.", distractors: ["gym", "library", "art room"] },
          { id: "g4-u6-gym", word: "gym", clue: "Large indoor hall for physical education.", vietnameseMeaning: "nhà thể chất / phòng tập", phonics: "/dʒɪm/", emoji: "🏋️", grade: 4, unit: 6, topic: "Facilities", exampleSentence: "Play basketball in the gym.", distractors: ["library", "canteen", "garden"] },
        ],
        sentenceStructures: [{ pattern: "Where is your school? ➔ It's in [Location]. / How many [Rooms] are there? ➔ There are [Number].", vietnameseMeaning: "Trường bạn ở đâu? ➔ Ở [Địa điểm]. / Có bao nhiêu [Phòng]? ➔ Có [Số lượng].", sampleDialogue: [{ speaker: "Akiko", text: "Where is your primary school, Mai?", textVi: "Trường tiểu học của bạn ở đâu thế Mai?" }, { speaker: "Mai", text: "It's in Nguyen Du Street in Hanoi. It has 30 classrooms and a big gym.", textVi: "Ở phố Nguyễn Du tại Hà Nội. Trường có 30 phòng học và một nhà thể chất lớn." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Modern Campus Tour", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Is there a [Facility] at your school? ➔ Yes, there is.", vietnameseMeaning: "Có [Cơ sở vật chất] ở trường bạn không? ➔ Có chứ.", sampleDialogue: [{ speaker: "Tony", text: "Is there an English language lab at your school?", textVi: "Có phòng thực hành tiếng Anh ở trường bạn không?" }, { speaker: "Nam", text: "Yes, there is! With modern headphones.", textVi: "Có chứ! Với tai nghe hiện đại." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Modern School Campus Story", focus: "reading_communication", readingMiniStory: { title: "Our Dream School Campus", text: "Nguyen Du Primary School is situated in a green street of Hanoi. Our modern campus features air-conditioned classrooms, a two-storey library, and a spacious sports gym for basketball and gymnastics.", translationVi: "Trường Tiểu học Nguyễn Du tọa lạc trên một con phố rợp bóng cây của Hà Nội. Khuôn viên hiện đại của trường có các phòng học máy lạnh, thư viện hai tầng và nhà thi đấu thể thao rộng rãi cho môn bóng rổ và thể dục dụng cụ." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 7, unitTitle: "Our Timetables", unitTitleVi: "Thời khóa biểu của chúng mình", theme: "School Subjects & Timetables", icon: "📊", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: School Subjects", focus: "vocabulary_phonics", phonicsSound: "Sounds /m/ (Maths) & /s/ (Science)",
        vocabulary: [
          { id: "g4-u7-maths", word: "Maths", clue: "Study of numbers, shapes, and equations.", vietnameseMeaning: "môn Toán", phonics: "/mæθs/", emoji: "📐", grade: 4, unit: 7, topic: "Subjects", exampleSentence: "I study Maths every morning.", distractors: ["English", "Science", "Music"] },
          { id: "g4-u7-english", word: "English", clue: "Global language of communication.", vietnameseMeaning: "môn Tiếng Anh", phonics: "/ˈɪŋ.ɡlɪʃ/", emoji: "🇬🇧", grade: 4, unit: 7, topic: "Subjects", exampleSentence: "We speak English in class.", distractors: ["Maths", "Art", "PE"] },
          { id: "g4-u7-science", word: "Science", clue: "Study of the physical and natural world.", vietnameseMeaning: "môn Khoa học", phonics: "/ˈsaɪ.əns/", emoji: "🔬", grade: 4, unit: 7, topic: "Subjects", exampleSentence: "Exciting experiments in Science.", distractors: ["History", "Music", "Art"] },
          { id: "g4-u7-music", word: "Music", clue: "Study of singing, melodies, and instruments.", vietnameseMeaning: "môn Âm nhạc", phonics: "/ˈmjuː.zɪk/", emoji: "🎵", grade: 4, unit: 7, topic: "Subjects", exampleSentence: "We sing songs in Music class.", distractors: ["PE", "Art", "Maths"] },
          { id: "g4-u7-pe", word: "PE", clue: "Physical Education and sports.", vietnameseMeaning: "môn Thể dục", phonics: "/ˌpiːˈiː/", emoji: "🏃", grade: 4, unit: 7, topic: "Subjects", exampleSentence: "We run and play games in PE.", distractors: ["Science", "Maths", "Music"] },
        ],
        sentenceStructures: [{ pattern: "What subjects do you have today? ➔ I have [Subject 1], [Subject 2] and [Subject 3].", vietnameseMeaning: "Hôm nay bạn có những môn học nào? ➔ Mình có môn [Môn 1], [Môn 2] và [Môn 3].", sampleDialogue: [{ speaker: "Ben", text: "What subjects do you have today, Linh?", textVi: "Hôm nay bạn có những môn học nào thế Linh?" }, { speaker: "Linh", text: "I have Maths, Vietnamese, English, and Science.", textVi: "Mình có môn Toán, Tiếng Việt, Tiếng Anh và Khoa học." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: When Do You Have Subjects?", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "When do you have [Subject]? ➔ I have it on [Days].", vietnameseMeaning: "Khi nào bạn có môn [Môn học]? ➔ Mình có vào [Các thứ].", sampleDialogue: [{ speaker: "Tony", text: "When do you have English?", textVi: "Khi nào bạn có tiết Tiếng Anh?" }, { speaker: "Nam", text: "I have it on Mondays, Wednesdays, and Fridays.", textVi: "Mình có vào thứ Hai, thứ Tư và thứ Sáu." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Smart Timetable Story", focus: "reading_communication", readingMiniStory: { title: "Our Dynamic Timetable", text: "Our school timetable is well balanced. On Monday, we focus on Maths and English. On Wednesday afternoon, we enjoy Science laboratory work, and on Friday, we relax with lively Music and PE.", translationVi: "Thời khóa biểu của chúng mình rất cân đối và khoa học. Thứ Hai tập trung học Toán và Tiếng Anh. Chiều thứ Tư chúng mình thực hành trong phòng thí nghiệm Khoa học, và thứ Sáu thư giãn với các tiết Âm nhạc và Thể dục sôi nổi." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 8, unitTitle: "My Favourite Subjects", unitTitleVi: "Môn học yêu thích của mình", theme: "Favorites & Reasons", icon: "⭐", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Expressing Preferences & Reasons", focus: "vocabulary_phonics", phonicsSound: "Sounds /ɑːt/ (Art) & /aɪtiː/ (IT)",
        vocabulary: [
          { id: "g4-u8-art", word: "Art", clue: "Visual drawing and painting discipline.", vietnameseMeaning: "môn Mỹ thuật", phonics: "/ɑːt/", emoji: "🎨", grade: 4, unit: 8, topic: "Subjects", exampleSentence: "I love drawing in Art.", distractors: ["IT", "PE", "Maths"] },
          { id: "g4-u8-it", word: "IT", clue: "Information Technology and computer skills.", vietnameseMeaning: "môn Tin học", phonics: "/ˌaɪˈtiː/", emoji: "💻", grade: 4, unit: 8, topic: "Subjects", exampleSentence: "We learn typing in IT.", distractors: ["Art", "Music", "Science"] },
          { id: "g4-u8-favourite", word: "favourite", clue: "Preferred above all others of the same kind.", vietnameseMeaning: "yêu thích nhất", phonics: "/ˈfeɪ.vər.ɪt/", emoji: "⭐", grade: 4, unit: 8, topic: "Feelings", exampleSentence: "English is my favourite subject.", distractors: ["difficult", "boring", "hard"] },
          { id: "g4-u8-because", word: "because", clue: "Expressing reason or justification.", vietnameseMeaning: "bởi vì", phonics: "/bɪˈkəz/", emoji: "💡", grade: 4, unit: 8, topic: "Linking", exampleSentence: "I like Music because I love singing.", distractors: ["and", "but", "so"] },
        ],
        sentenceStructures: [{ pattern: "What's your favourite subject? ➔ My favourite subject is [Subject] / I like [Subject] because [Reason].", vietnameseMeaning: "Môn học yêu thích của bạn là gì? ➔ Môn yêu thích của mình là [Môn] / Mình thích [Môn] vì [Lý do].", sampleDialogue: [{ speaker: "Peter", text: "What's your favourite subject, Mai?", textVi: "Môn học yêu thích của bạn là gì thế Mai?" }, { speaker: "Mai", text: "I like English because I want to talk with foreign friends.", textVi: "Mình thích môn Tiếng Anh vì mình muốn trò chuyện với bạn bè quốc tế." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Why Do You Like It?", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Why do you like [Subject]? ➔ Because I want to be a [Profession].", vietnameseMeaning: "Tại sao bạn thích [Môn học]? ➔ Bởi vì mình muốn trở thành [Nghề nghiệp].", sampleDialogue: [{ speaker: "Tony", text: "Why do you like Art, Nam?", textVi: "Tại sao bạn lại thích môn Mỹ thuật thế Nam?" }, { speaker: "Nam", text: "Because I want to be an architect in the future.", textVi: "Bởi vì mình muốn trở thành kiến trúc sư trong tương lai." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Passion for Learning Story", focus: "reading_communication", readingMiniStory: { title: "Passionate Learners in 4A", text: "Every student in Grade 4A has a favourite subject. Nam loves IT because he enjoys building computer games. Mai loves English because she dreams of traveling around the world.", translationVi: "Mỗi học sinh lớp 4A đều có một môn học đam mê riêng. Nam yêu thích Tin học vì thích lập trình game máy tính. Mai yêu môn Tiếng Anh vì ước mơ đi du lịch vòng quanh thế giới." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 9, unitTitle: "Our Sports Day", unitTitleVi: "Ngày hội thể thao của chúng mình", theme: "Sports Day & Events", icon: "🏆", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Sports Events & Dates", focus: "vocabulary_phonics", phonicsSound: "Sounds /sp/ (sports) & /d/ (day)",
        vocabulary: [
          { id: "g4-u9-sports-day", word: "Sports Day", clue: "Annual school day dedicated to athletic contests.", vietnameseMeaning: "ngày hội thể thao", phonics: "/ˈspɔːts ˌdeɪ/", emoji: "🏆", grade: 4, unit: 9, topic: "Events", exampleSentence: "Our Sports Day will be next month.", distractors: ["Teachers' Day", "Children's Day", "New Year"] },
          { id: "g4-u9-race", word: "running race", clue: "Sprint competition on track.", vietnameseMeaning: "cuộc thi chạy đua", phonics: "/ˈrʌn.ɪŋ reɪs/", emoji: "🏃", grade: 4, unit: 9, topic: "Sports", exampleSentence: "Win the 100-metre running race.", distractors: ["tug of war", "swimming", "jumping"] },
          { id: "g4-u9-tug-of-war", word: "tug of war", clue: "Rope-pulling strength contest.", vietnameseMeaning: "trò chơi kéo co", phonics: "/ˌtʌɡ əv ˈwɔːr/", emoji: "🪢", grade: 4, unit: 9, topic: "Sports", exampleSentence: "Our class won the tug of war.", distractors: ["running race", "football", "basketball"] },
          { id: "g4-u9-medal", word: "gold medal", clue: "Prize awarded for first place.", vietnameseMeaning: "huy chương vàng", phonics: "/ˈɡəʊld ˌmed.əl/", emoji: "🥇", grade: 4, unit: 9, topic: "Awards", exampleSentence: "He received a gold medal.", distractors: ["cup", "flag", "badge"] },
        ],
        sentenceStructures: [{ pattern: "When is your Sports Day? ➔ It's in [Month]. / What are you going to do? ➔ I'm going to [Action].", vietnameseMeaning: "Khi nào là Ngày hội Thể thao trường bạn? ➔ Vào [Tháng]. / Bạn dự định sẽ làm gì? ➔ Mình dự định [Hành động].", sampleDialogue: [{ speaker: "Linda", text: "When is your school Sports Day, Quan?", textVi: "Khi nào là Ngày hội Thể thao trường bạn thế Quân?" }, { speaker: "Quan", text: "It's in November. I am going to run in the 100-metre race!", textVi: "Vào tháng Mười Một. Mình dự định sẽ tham gia chạy đua 100 mét!" }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Cheer and Victory", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Who will win the [Event]? ➔ Class 4A will win!", vietnameseMeaning: "Ai sẽ giành chiến thắng ở [Nội dung thi]? ➔ Lớp 4A sẽ chiến thắng!", sampleDialogue: [{ speaker: "Mai", text: "Are you ready for the tug of war?", textVi: "Các bạn đã sẵn sàng cho môn kéo co chưa?" }, { speaker: "Team", text: "Yes! One, two, three, pull!", textVi: "Sẵn sàng! Một, hai, ba, kéo nào!" }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Grand Sports Festival Story", focus: "reading_communication", readingMiniStory: { title: "Golden Medals on Sports Day", text: "The school stadium is decorated with vibrant flags and banners. Athletes from all grades run, jump, and compete fiercely. Our class wins two gold medals in the running race and tug of war!", translationVi: "Sân vận động trường rực rỡ cờ hoa và biểu ngữ. Vận động viên các khối lớp chạy, nhảy và tranh tài sôi nổi. Lớp chúng mình xuất sắc giành hai huy chương vàng ở môn chạy đua và kéo co!" }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 10, unitTitle: "Our School Camp", unitTitleVi: "Hội trại trường của chúng mình", theme: "Past Experiences & Camps", icon: "🏕️", semester: 1,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Past Locations & Activities", focus: "vocabulary_phonics", phonicsSound: "Sounds /wɒz/ (was) & /wɜːr/ (were)",
        vocabulary: [
          { id: "g4-u10-school-camp", word: "school camp", clue: "Outdoor camping organized by school.", vietnameseMeaning: "hội trại trường", phonics: "/ˈskuːl kæmp/", emoji: "🏕️", grade: 4, unit: 10, topic: "Camping", exampleSentence: "We had fun at the school camp.", distractors: ["zoo", "museum", "park"] },
          { id: "g4-u10-yesterday", word: "yesterday", clue: "On the day before today.", vietnameseMeaning: "ngày hôm qua", phonics: "/ˈjes.tə.deɪ/", emoji: "⏮️", grade: 4, unit: 10, topic: "Time", exampleSentence: "Where were you yesterday?", distractors: ["today", "tomorrow", "now"] },
          { id: "g4-u10-at-home", word: "at home", clue: "Inside one's own house.", vietnameseMeaning: "ở nhà", phonics: "/æt ˈhəʊm/", emoji: "🏡", grade: 4, unit: 10, topic: "Locations", exampleSentence: "I was at home studying.", distractors: ["at school", "at camp", "at the zoo"] },
          { id: "g4-u10-on-the-beach", word: "on the beach", clue: "Beside the sandy seashore.", vietnameseMeaning: "ở trên bãi biển", phonics: "/ɒn ðə ˈbiːtʃ/", emoji: "🏖️", grade: 4, unit: 10, topic: "Locations", exampleSentence: "We were on the beach.", distractors: ["in the garden", "in the classroom", "at home"] },
        ],
        sentenceStructures: [{ pattern: "Where were you yesterday? ➔ I was [Location]. / What did you do? ➔ I [Past Action].", vietnameseMeaning: "Hôm qua bạn ở đâu? ➔ Mình đã ở [Địa điểm]. / Bạn đã làm gì? ➔ Mình đã [Hành động trong quá khứ].", sampleDialogue: [{ speaker: "Tom", text: "Where were you yesterday, Nam?", textVi: "Hôm qua bạn ở đâu thế Nam?" }, { speaker: "Nam", text: "I was at the school camp in Ba Vi National Park. We set up tents and sang songs.", textVi: "Mình ở hội trại trường tại Vườn quốc gia Ba Vì. Chúng mình đã dựng lều và hát vang những bài ca." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Campfire Memories", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Were you at the [Place] yesterday? ➔ Yes, I was. / No, I wasn't.", vietnameseMeaning: "Hôm qua bạn có ở [Địa điểm] không? ➔ Có. / Không.", sampleDialogue: [{ speaker: "Mai", text: "Were you at the campsite with Tom?", textVi: "Hôm qua bạn có ở khu cắm trại cùng Tom không?" }, { speaker: "Peter", text: "Yes, I was! The campfire was fantastic.", textVi: "Có chứ! Lửa trại hôm qua tuyệt vời lắm." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Camp Memories Story", focus: "reading_communication", readingMiniStory: { title: "Unforgettable Camp in the Woods", text: "Yesterday, Grade 4 students went on an adventure camp in the pine forest. We pitched vibrant tents, prepared delicious barbecue skewers, and solved riddle maps under the starry sky.", translationVi: "Hôm qua, học sinh khối lớp 4 đã tham gia chuyến cắm trại phiêu lưu trong rừng thông. Chúng mình dựng những chiếc lều rực rỡ, chuẩn bị xiên nướng thơm ngon và giải các bản đồ câu đố dưới bầu trời đầy sao." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 11, unitTitle: "My Home", unitTitleVi: "Mái ấm của mình", theme: "Addresses & Living Areas", icon: "🏡", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Homes & Addresses", focus: "vocabulary_phonics", phonicsSound: "Sounds /fl/ (flat) & /t/ (tower)",
        vocabulary: [
          { id: "g4-u11-flat", word: "flat", clue: "Set of rooms for living in an apartment building.", vietnameseMeaning: "căn hộ chung cư", phonics: "/flæt/", emoji: "🏢", grade: 4, unit: 11, topic: "Housing", exampleSentence: "I live in a modern flat.", distractors: ["house", "tent", "school"] },
          { id: "g4-u11-tower", word: "tower", clue: "Tall high-rise residential building.", vietnameseMeaning: "tòa tháp / tòa nhà cao", phonics: "/ˈtaʊ.ər/", emoji: "🏙️", grade: 4, unit: 11, topic: "Housing", exampleSentence: "Flat 18 in Landmark Tower.", distractors: ["flat", "cottage", "lane"] },
          { id: "g4-u11-lane", word: "lane", clue: "Narrow rural or residential road/alley.", vietnameseMeaning: "ngõ / hẻm", phonics: "/leɪn/", emoji: "🛣️", grade: 4, unit: 11, topic: "Addresses", exampleSentence: "Lane 54, Tran Phu Street.", distractors: ["road", "street", "avenue"] },
          { id: "g4-u11-address", word: "address", clue: "Exact details of where a building is located.", vietnameseMeaning: "địa chỉ", phonics: "/əˈdres/", emoji: "📍", grade: 4, unit: 11, topic: "Addresses", exampleSentence: "What is your home address?", distractors: ["name", "phone", "number"] },
        ],
        sentenceStructures: [{ pattern: "Where do you live? ➔ I live in [Housing/Area]. / What's your address? ➔ It's [Address details].", vietnameseMeaning: "Bạn sống ở đâu? ➔ Mình sống ở [Loại nhà/Khu vực]. / Địa chỉ của bạn là gì? ➔ Là [Chi tiết địa chỉ].", sampleDialogue: [{ speaker: "Tony", text: "Where do you live, Trung?", textVi: "Bạn sống ở đâu thế Trung?" }, { speaker: "Trung", text: "I live in Flat 12B, Green Park Tower in Hanoi.", textVi: "Mình sống ở Căn hộ 12B, Tòa tháp Green Park tại Hà Nội." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Living Environments", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "What is your hometown like? ➔ It's large and peaceful.", vietnameseMeaning: "Quê hương của bạn như thế nào? ➔ Rất rộng lớn và thanh bình.", sampleDialogue: [{ speaker: "Linda", text: "What is your village like?", textVi: "Ngôi làng quê bạn như thế nào?" }, { speaker: "Mai", text: "It's peaceful with green paddy fields.", textVi: "Rất yên bình với những cánh đồng lúa xanh ngát." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: My Cozy Home Story", focus: "reading_communication", readingMiniStory: { title: "Home Sweet Home in the City", text: "I live with my parents in a cozy modern apartment on the 15th floor. From my bedroom window, I can see the glittering city lights, bustling streets, and the serene West Lake.", translationVi: "Mình sống cùng bố mẹ trong một căn hộ hiện đại ấm cúng ở tầng 15. Từ cửa sổ phòng ngủ, mình có thể ngắm nhìn ánh đèn lung linh của thành phố, những đường phố nhộn nhịp và Hồ Tây thanh bình." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 12, unitTitle: "Jobs", unitTitleVi: "Nghề nghiệp", theme: "Professions & Occupations", icon: "👨‍⚕️", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Professions & Workplaces", focus: "vocabulary_phonics", phonicsSound: "Sounds /d/ (doctor) & /t/ (teacher)",
        vocabulary: [
          { id: "g4-u12-doctor", word: "doctor", clue: "Medical professional who cures sick patients.", vietnameseMeaning: "bác sĩ", phonics: "/ˈdɒk.tər/", emoji: "👨‍⚕️", grade: 4, unit: 12, topic: "Jobs", exampleSentence: "My mother is a hospital doctor.", distractors: ["nurse", "teacher", "farmer"] },
          { id: "g4-u12-nurse", word: "nurse", clue: "Healthcare worker caring for hospital patients.", vietnameseMeaning: "y tá / điều dưỡng", phonics: "/nɜːs/", emoji: "👩‍⚕️", grade: 4, unit: 12, topic: "Jobs", exampleSentence: "A gentle caring nurse.", distractors: ["doctor", "pilot", "driver"] },
          { id: "g4-u12-farmer", word: "farmer", clue: "Person who grows crops and raises animals on farms.", vietnameseMeaning: "nông dân", phonics: "/ˈfɑː.mər/", emoji: "🧑‍🌾", grade: 4, unit: 12, topic: "Jobs", exampleSentence: "The farmer works in the field.", distractors: ["worker", "clerk", "cook"] },
          { id: "g4-u12-worker", word: "factory worker", clue: "Person employed in manufacturing plants.", vietnameseMeaning: "công nhân nhà máy", phonics: "/ˈfæktəri ˈwɜːkər/", emoji: "👷", grade: 4, unit: 12, topic: "Jobs", exampleSentence: "He works in a big factory.", distractors: ["farmer", "driver", "teacher"] },
          { id: "g4-u12-driver", word: "driver", clue: "Person who operates buses, cars, or trains.", vietnameseMeaning: "tài xế / người lái xe", phonics: "/ˈdraɪ.vər/", emoji: "🧑‍✈️", grade: 4, unit: 12, topic: "Jobs", exampleSentence: "A careful bus driver.", distractors: ["pilot", "doctor", "cook"] },
        ],
        sentenceStructures: [{ pattern: "What does your father/mother do? ➔ He's/She's a [Job]. / Where does he/she work? ➔ He/She works in a [Workplace].", vietnameseMeaning: "Bố/mẹ bạn làm nghề gì? ➔ Bố/mẹ mình là [Nghề]. / Bố/mẹ làm việc ở đâu? ➔ Làm việc ở [Nơi làm việc].", sampleDialogue: [{ speaker: "Peter", text: "What does your father do, Nam?", textVi: "Bố bạn làm nghề gì thế Nam?" }, { speaker: "Nam", text: "He's a doctor. He works in Bach Mai Hospital.", textVi: "Bố mình là bác sĩ. Bố làm việc ở Bệnh viện Bạch Mai." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Dream Careers", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "What would you like to be in the future? ➔ I'd like to be a [Job].", vietnameseMeaning: "Bạn muốn làm nghề gì trong tương lai? ➔ Mình muốn làm [Nghề nghiệp].", sampleDialogue: [{ speaker: "Mai", text: "What would you like to be in the future?", textVi: "Bạn muốn làm gì trong tương lai?" }, { speaker: "Linda", text: "I'd like to be an English teacher to teach lovely children.", textVi: "Mình muốn trở thành giáo viên tiếng Anh để dạy các em nhỏ đáng yêu." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Proud Occupations Story", focus: "reading_communication", readingMiniStory: { title: "Our Parents' Dedicated Jobs", text: "In Class 4B, we proudly share about our parents. Nam's father is a surgeon saving lives in the hospital, Mai's mother is a devoted teacher, and Minh's uncle designs green eco-friendly buildings.", translationVi: "Trong lớp 4B, chúng mình tự hào chia sẻ về nghề nghiệp của bố mẹ. Bố Nam là bác sĩ phẫu thuật cứu chữa bệnh nhân, mẹ Mai là cô giáo tận tụy và chú của Minh thiết kế những công trình xanh thân thiện với môi trường." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 13, unitTitle: "Appearance", unitTitleVi: "Ngoại hình", theme: "Physical Appearance & Traits", icon: "🧍", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Describing Physical Traits", focus: "vocabulary_phonics", phonicsSound: "Sounds /t/ (tall) & /ʃ/ (short)",
        vocabulary: [
          { id: "g4-u13-tall", word: "tall", clue: "Of greater than average height.", vietnameseMeaning: "cao ráo", phonics: "/tɔːl/", emoji: "🦒", grade: 4, unit: 13, topic: "Appearance", exampleSentence: "My brother is very tall.", distractors: ["short", "slim", "big"] },
          { id: "g4-u13-short", word: "short", clue: "Measuring small distance from top to bottom.", vietnameseMeaning: "thấp / lùn", phonics: "/ʃɔːt/", emoji: "🤏", grade: 4, unit: 13, topic: "Appearance", exampleSentence: "The little puppy is short.", distractors: ["tall", "slim", "fat"] },
          { id: "g4-u13-slim", word: "slim", clue: "Gracefully thin and in good shape.", vietnameseMeaning: "mảnh mai / thon thả", phonics: "/slɪm/", emoji: "🧍", grade: 4, unit: 13, topic: "Appearance", exampleSentence: "She is tall and slim.", distractors: ["fat", "short", "heavy"] },
          { id: "g4-u13-strong", word: "strong", clue: "Having great physical muscular power.", vietnameseMeaning: "khỏe mạnh", phonics: "/strɒŋ/", emoji: "💪", grade: 4, unit: 13, topic: "Appearance", exampleSentence: "A strong football player.", distractors: ["weak", "slim", "short"] },
        ],
        sentenceStructures: [{ pattern: "What does he/she look like? ➔ He's/She's [Adjective]. / Who is taller, [Person A] or [Person B]? ➔ [Person A] is taller.", vietnameseMeaning: "Anh/cô ấy trông như thế nào? ➔ Anh/cô ấy [Tính từ]. / Ai cao hơn, [Người A] hay [Người B]? ➔ [Người A] cao hơn.", sampleDialogue: [{ speaker: "Tony", text: "What does your sister look like, Mai?", textVi: "Chị gái bạn trông như thế nào thế Mai?" }, { speaker: "Mai", text: "She is tall and slim with long black hair.", textVi: "Chị ấy cao và thon thả với mái tóc đen dài." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Comparative Appearance", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "[Person A] is [Adjective-er] than [Person B].", vietnameseMeaning: "[Người A] [Tính từ hơn] [Người B].", sampleDialogue: [{ speaker: "Nam", text: "Who is stronger, your father or brother?", textVi: "Ai khỏe hơn, bố bạn hay anh trai bạn?" }, { speaker: "Ben", text: "My father is stronger than my brother.", textVi: "Bố mình khỏe hơn anh trai mình." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Class Portrait Story", focus: "reading_communication", readingMiniStory: { title: "Our Class 4A Portrait", text: "Look at our cheerful class photograph! Peter is the tallest boy on the basketball team. Mai is charming and slim, and Quan has bright smiling eyes. Everyone is unique and wonderful!", translationVi: "Hãy nhìn bức ảnh kỷ niệm vui vẻ của lớp mình! Peter là bạn nam cao nhất đội bóng rổ. Mai duyên dáng, thon thả và Quân có đôi mắt cười rạng rỡ. Mỗi bạn đều mang vẻ đẹp độc đáo và tuyệt vời!" }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 14, unitTitle: "Daily Activities", unitTitleVi: "Các hoạt động thường ngày", theme: "Habits & Schedules", icon: "🚴", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Afternoon & Evening Routines", focus: "vocabulary_phonics", phonicsSound: "Sounds /w/ (watch) & /d/ (do)",
        vocabulary: [
          { id: "g4-u14-do-homework", word: "do homework", clue: "School tasks completed at home.", vietnameseMeaning: "làm bài tập về nhà", phonics: "/duː ˈhəʊm.wɜːk/", emoji: "📝", grade: 4, unit: 14, topic: "Routines", exampleSentence: "I do homework at 7:30 p.m.", distractors: ["watch TV", "play games", "go out"] },
          { id: "g4-u14-watch-tv", word: "watch TV", clue: "View shows on television.", vietnameseMeaning: "xem ti vi", phonics: "/wɒtʃ ˌtiːˈviː/", emoji: "📺", grade: 4, unit: 14, topic: "Routines", exampleSentence: "Watch cartoons on TV.", distractors: ["listen to music", "read books", "do homework"] },
          { id: "g4-u14-listen-music", word: "listen to music", clue: "Hear songs and melodies through speakers.", vietnameseMeaning: "nghe nhạc", phonics: "/ˈlɪs.ən tuː ˈmjuː.zɪk/", emoji: "🎧", grade: 4, unit: 14, topic: "Routines", exampleSentence: "Relax and listen to music.", distractors: ["watch TV", "do homework", "cook"] },
          { id: "g4-u14-help-parents", word: "help parents", clue: "Assist mom and dad with household chores.", vietnameseMeaning: "giúp đỡ bố mẹ", phonics: "/help ˈpeə.rənts/", emoji: "🤝", grade: 4, unit: 14, topic: "Routines", exampleSentence: "I help parents clean the floor.", distractors: ["watch TV", "play games", "sleep"] },
        ],
        sentenceStructures: [{ pattern: "What do you do in the evening? ➔ I [Action] and then [Action].", vietnameseMeaning: "Bạn làm gì vào buổi tối? ➔ Mình [Làm việc 1] và sau đó [Làm việc 2].", sampleDialogue: [{ speaker: "Linda", text: "What do you usually do in the evening, Quan?", textVi: "Bạn thường làm gì vào buổi tối thế Quân?" }, { speaker: "Quan", text: "I do my English homework, help my parents wash dishes, and read books.", textVi: "Mình làm bài tập tiếng Anh, giúp bố mẹ rửa bát và đọc sách." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Routine Frequency", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "How often do you [Action]? ➔ Every day / Twice a week.", vietnameseMeaning: "Bạn có thường [Làm gì] không? ➔ Hằng ngày / Hai lần một tuần.", sampleDialogue: [{ speaker: "Nam", text: "How often do you help your parents with cooking?", textVi: "Bạn có thường giúp bố mẹ nấu ăn không?" }, { speaker: "Mai", text: "I help them every evening.", textVi: "Mình giúp bố mẹ vào mỗi buổi tối." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Harmonious Evening Story", focus: "reading_communication", readingMiniStory: { title: "A Peaceful Evening Routine", text: "After dinner at 7:00, our family gathers. My brother practices English pronunciation on his tablet, I complete my Maths exercises, and our parents read newspapers in the warm living room.", translationVi: "Sau bữa tối lúc 7:00, gia đình mình quây quần bên nhau. Em trai luyện phát âm tiếng Anh trên máy tính bảng, mình hoàn thành bài tập Toán và bố mẹ đọc báo trong phòng khách ấm áp." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 15, unitTitle: "Free Time Activities", unitTitleVi: "Các hoạt động lúc rảnh rỗi", theme: "Leisure & Weekend Fun", icon: "🎨", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Leisure Pastimes", focus: "vocabulary_phonics", phonicsSound: "Sounds /r/ (ride) & /s/ (surf)",
        vocabulary: [
          { id: "g4-u15-ride-bike", word: "ride a bike", clue: "Cycle pedal bicycle along trails.", vietnameseMeaning: "đạp xe đạp", phonics: "/raɪd ə baɪk/", emoji: "🚴", grade: 4, unit: 15, topic: "Leisure", exampleSentence: "I ride a bike in the park.", distractors: ["surf the internet", "watch cartoons", "draw"] },
          { id: "g4-u15-surf-net", word: "surf the internet", clue: "Browse educational websites online.", vietnameseMeaning: "lướt mạng internet", phonics: "/sɜːf ði ˈɪn.tə.net/", emoji: "🌐", grade: 4, unit: 15, topic: "Leisure", exampleSentence: "Search science news on the internet.", distractors: ["ride a bike", "clean house", "go fishing"] },
          { id: "g4-u15-go-cinema", word: "go to the cinema", clue: "Visit a theatre to watch movies on large screen.", vietnameseMeaning: "đi xem phim chiếu rạp", phonics: "/ɡəʊ tuː ðə ˈsɪn.ə.mɑː/", emoji: "🍿", grade: 4, unit: 15, topic: "Leisure", exampleSentence: "Watch 3D movies at the cinema.", distractors: ["go swimming", "stay home", "do chores"] },
          { id: "g4-u15-clean-house", word: "clean the house", clue: "Sweep, dust, and organize the home.", vietnameseMeaning: "dọn dẹp nhà cửa", phonics: "/kliːn ðə haʊs/", emoji: "🧹", grade: 4, unit: 15, topic: "Chore", exampleSentence: "We clean the house on Saturday.", distractors: ["surf net", "go cinema", "watch TV"] },
        ],
        sentenceStructures: [{ pattern: "What do you do in your free time? ➔ I [Action]. / What does he/she do in his/her free time? ➔ He/She [Action]s.", vietnameseMeaning: "Bạn làm gì trong thời gian rảnh? ➔ Mình [Làm việc gì]. / Anh/cô ấy làm gì trong thời gian rảnh? ➔ Anh/cô ấy [Làm việc gì].", sampleDialogue: [{ speaker: "Tony", text: "What do you do in your free time, Nam?", textVi: "Bạn làm gì vào thời gian rảnh thế Nam?" }, { speaker: "Nam", text: "I ride my bike around the lake and draw pictures of nature.", textVi: "Mình đạp xe quanh hồ và vẽ tranh phong cảnh thiên nhiên." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Family Free Time", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "What does your father do in his free time? ➔ He goes fishing.", vietnameseMeaning: "Bố bạn làm gì khi rảnh rỗi? ➔ Bố mình đi câu cá.", sampleDialogue: [{ speaker: "Mai", text: "What does your mother do on Saturday afternoons?", textVi: "Mẹ bạn làm gì vào chiều thứ Bảy?" }, { speaker: "Linh", text: "She tends roses in the garden and bakes cakes.", textVi: "Mẹ mình chăm hoa hồng trong vườn và làm bánh ngọt." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Weekend Hobbies Story", focus: "reading_communication", readingMiniStory: { title: "Joyful Weekend Pastimes", text: "Weekends bring joyful freedom to Class 4. Quan cycles with his neighborhood friends, Linda practices singing for the choir, and Ben creates digital art on his computer.", translationVi: "Những ngày cuối tuần mang lại niềm vui tự do cho các bạn học sinh lớp 4. Quân đạp xe cùng các bạn trong xóm, Linda luyện hát cho dàn đồng ca và Ben sáng tạo tranh vẽ kỹ thuật số trên máy tính." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 16, unitTitle: "Weather", unitTitleVi: "Thời tiết", theme: "Seasons & Weather Conditions", icon: "⛅", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Weather Conditions", focus: "vocabulary_phonics", phonicsSound: "Sounds /s/ (sunny) & /st/ (stormy)",
        vocabulary: [
          { id: "g4-u16-sunny", word: "sunny", clue: "Bright with clear skies and sunlight.", vietnameseMeaning: "nắng ráo", phonics: "/ˈsʌn.i/", emoji: "☀️", grade: 4, unit: 16, topic: "Weather", exampleSentence: "It's sunny and warm today.", distractors: ["rainy", "stormy", "snowy"] },
          { id: "g4-u16-rainy", word: "rainy", clue: "Precipitation falling from clouds.", vietnameseMeaning: "có mưa", phonics: "/ˈreɪ.ni/", emoji: "🌧️", grade: 4, unit: 16, topic: "Weather", exampleSentence: "Carry a raincoat when rainy.", distractors: ["sunny", "windy", "dry"] },
          { id: "g4-u16-windy", word: "windy", clue: "Strong gusts of air moving.", vietnameseMeaning: "có gió to", phonics: "/ˈwɪn.di/", emoji: "💨", grade: 4, unit: 16, topic: "Weather", exampleSentence: "A windy afternoon for flying kites.", distractors: ["hot", "sunny", "foggy"] },
          { id: "g4-u16-stormy", word: "stormy", clue: "Severe weather with thunder, lightning, and heavy rain.", vietnameseMeaning: "có bão", phonics: "/ˈstɔː.mi/", emoji: "⛈️", grade: 4, unit: 16, topic: "Weather", exampleSentence: "Stay indoors during stormy days.", distractors: ["sunny", "warm", "clear"] },
          { id: "g4-u16-snowy", word: "snowy", clue: "Precipitation of white ice crystals.", vietnameseMeaning: "có tuyết rơi", phonics: "/ˈsnəʊ.i/", emoji: "❄️", grade: 4, unit: 16, topic: "Weather", exampleSentence: "Build snowmen in snowy weather.", distractors: ["hot", "sunny", "rainy"] },
        ],
        sentenceStructures: [{ pattern: "What's the weather like today in [City]? ➔ It's [Weather condition]. / What will the weather be like tomorrow? ➔ It will be [Weather].", vietnameseMeaning: "Thời tiết hôm nay ở [Thành phố] như thế nào? ➔ Trời [Thời tiết]. / Thời tiết ngày mai sẽ ra sao? ➔ Sẽ [Thời tiết].", sampleDialogue: [{ speaker: "Linda", text: "What's the weather like today in Da Nang?", textVi: "Thời tiết hôm nay ở Đà Nẵng thế nào thế?" }, { speaker: "Mai", text: "It's sunny and breezy, perfect for swimming at the beach!", textVi: "Trời nắng và có gió mát, rất lý tưởng để đi tắm biển!" }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Four Seasons", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "What is the weather like in [Season]? ➔ It is usually [Weather].", vietnameseMeaning: "Thời tiết vào [Mùa] như thế nào? ➔ Thường [Thời tiết].", sampleDialogue: [{ speaker: "Tony", text: "What is winter like in Hanoi?", textVi: "Mùa đông ở Hà Nội như thế nào?" }, { speaker: "Nam", text: "It's cold and foggy. We wear warm coats.", textVi: "Trời lạnh và nhiều sương. Chúng mình mặc áo khoác ấm." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Weather Forecast Report Story", focus: "reading_communication", readingMiniStory: { title: "Junior Weather Forecast", text: "Welcome to our English weather broadcast! In Hanoi today, it is sunny and dry with a temperature of 25 degrees. In Da Lat, it is cool and misty with light mountain showers.", translationVi: "Chào mừng quý vị đến với bản tin dự báo thời tiết bằng tiếng Anh! Hôm nay tại Hà Nội, trời nắng ráo với nhiệt độ 25 độ C. Tại Đà Lạt, thời tiết se lạnh và mờ sương với những cơn mưa rào nhẹ trên triền núi." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 17, unitTitle: "Shopping", unitTitleVi: "Mua sắm", theme: "Clothes & Prices", icon: "🛍️", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Clothing Items & Prices", focus: "vocabulary_phonics", phonicsSound: "Sounds /tʃ/ (jacket) & /ʃ/ (shirt)",
        vocabulary: [
          { id: "g4-u17-tshirt", word: "T-shirt", clue: "Short-sleeved casual cotton top.", vietnameseMeaning: "áo phông / áo thun", phonics: "/ˈtiː.ʃɜːt/", emoji: "👕", grade: 4, unit: 17, topic: "Clothes", exampleSentence: "A comfortable white T-shirt.", distractors: ["jacket", "skirt", "trousers"] },
          { id: "g4-u17-jacket", word: "jacket", clue: "Short coat with sleeves and front zip.", vietnameseMeaning: "áo khoác", phonics: "/ˈdʒæk.ɪt/", emoji: "🧥", grade: 4, unit: 17, topic: "Clothes", exampleSentence: "A warm winter jacket.", distractors: ["T-shirt", "shorts", "shoes"] },
          { id: "g4-u17-trousers", word: "trousers", clue: "Two-legged outer garment reaching from waist to ankles.", vietnameseMeaning: "quần dài", phonics: "/ˈtraʊ.zəz/", emoji: "👖", grade: 4, unit: 17, topic: "Clothes", exampleSentence: "Dark blue school trousers.", distractors: ["shorts", "skirt", "jacket"] },
          { id: "g4-u17-shoes", word: "shoes", clue: "Footwear with sturdy soles.", vietnameseMeaning: "đôi giày", phonics: "/ʃuːz/", emoji: "👟", grade: 4, unit: 17, topic: "Clothes", exampleSentence: "White running shoes.", distractors: ["socks", "hat", "belt"] },
        ],
        sentenceStructures: [{ pattern: "How much is the [Item]? ➔ It's [Price] dong. / How much are the [Plural Items]? ➔ They're [Price] dong.", vietnameseMeaning: "[Món đồ] này giá bao nhiêu? ➔ Giá [Giá tiền] đồng. / Những [Món đồ số nhiều] giá bao nhiêu? ➔ Chúng có giá [Giá tiền] đồng.", sampleDialogue: [{ speaker: "Customer", text: "How much is this yellow T-shirt, please?", textVi: "Làm ơn cho hỏi chiếc áo thun vàng này giá bao nhiêu ạ?" }, { speaker: "Shopkeeper", text: "It's 80,000 dong. It's high quality cotton.", textVi: "Chiếc áo giá 80.000 đồng. Chất liệu cotton cao cấp bạn nhé." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Choosing Size & Color", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Can I try this on? ➔ Yes, the fitting room is over there.", vietnameseMeaning: "Tôi có thể thử chiếc này không? ➔ Được chứ, phòng thử đồ ở đằng kia.", sampleDialogue: [{ speaker: "Mai", text: "Can I try on this red jacket?", textVi: "Em có thể thử chiếc áo khoác đỏ này không ạ?" }, { speaker: "Clerk", text: "Certainly! It matches your style.", textVi: "Tất nhiên rồi! Rất hợp phong cách của em." }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Weekend Shopping Mall Story", focus: "reading_communication", readingMiniStory: { title: "Shopping with Family", text: "On Saturday, Mai and her mother visit the shopping centre. Mai buys a warm navy jacket for 200,000 dong and a pair of sporty white sneakers. The sales assistants are helpful and friendly.", translationVi: "Vào thứ Bảy, Mai và mẹ đến trung tâm mua sắm. Mai mua một chiếc áo khoác xanh hải quân ấm áp với giá 200.000 đồng và một đôi giày thể thao trắng năng động. Các cô chú bán hàng rất nhiệt tình và thân thiện." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 18, unitTitle: "Eating Out", unitTitleVi: "Đi ăn nhà hàng", theme: "Dining & Ordering", icon: "🍜", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Food & Beverages", focus: "vocabulary_phonics", phonicsSound: "Sounds /b/ (bowl) & /n/ (noodles)",
        vocabulary: [
          { id: "g4-u18-noodles", word: "bowl of noodles", clue: "Steaming broth with pasta strands and beef.", vietnameseMeaning: "tô phở / bát mì", phonics: "/bəʊl əv ˈnuː.dəlz/", emoji: "🍜", grade: 4, unit: 18, topic: "Food", exampleSentence: "A hot bowl of beef noodles.", distractors: ["bread", "rice", "cake"] },
          { id: "g4-u18-sandwich", word: "sandwich", clue: "Slices of bread with meat and vegetables.", vietnameseMeaning: "bánh mì kẹp", phonics: "/ˈsæn.wɪdʒ/", emoji: "🥪", grade: 4, unit: 18, topic: "Food", exampleSentence: "A ham and cheese sandwich.", distractors: ["noodles", "rice", "soup"] },
          { id: "g4-u18-lemonade", word: "glass of lemonade", clue: "Refreshing chilled sweetened lemon drink.", vietnameseMeaning: "ly nước chanh", phonics: "/ɡlɑːs əv ˌlem.əˈneɪd/", emoji: "🍋", grade: 4, unit: 18, topic: "Drinks", exampleSentence: "Drink lemonade with ice.", distractors: ["water", "milk", "tea"] },
          { id: "g4-u18-mineral-water", word: "mineral water", clue: "Purified natural spring water.", vietnameseMeaning: "nước khoáng", phonics: "/ˈmɪn.ər.əl ˌwɔː.tər/", emoji: "💧", grade: 4, unit: 18, topic: "Drinks", exampleSentence: "A bottle of mineral water.", distractors: ["lemonade", "juice", "soda"] },
        ],
        sentenceStructures: [{ pattern: "What would you like to eat/drink? ➔ I'd like a [Food/Drink], please.", vietnameseMeaning: "Bạn muốn ăn/uống gì? ➔ Cho tôi xin một [Món ăn/Uống].", sampleDialogue: [{ speaker: "Waiter", text: "Good evening! What would you like to eat?", textVi: "Kính chào quý khách! Quý khách muốn dùng món gì ạ?" }, { speaker: "Customer", text: "I'd like a bowl of beef noodles and a glass of lemonade, please.", textVi: "Cho tôi một tô phở bò và một ly nước chanh nhé." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Describing Flavors", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "How does it taste? ➔ It's delicious and savory.", vietnameseMeaning: "Món ăn có vị như thế nào? ➔ Rất ngon và đậm đà.", sampleDialogue: [{ speaker: "Nam", text: "How is your noodle soup, Peter?", textVi: "Tô phở của bạn thế nào hả Peter?" }, { speaker: "Peter", text: "It's rich, aromatic, and fantastic!", textVi: "Rất đậm đà, thơm lừng và tuyệt hảo!" }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Traditional Feast Story", focus: "reading_communication", readingMiniStory: { title: "A Delicious Meal in Hanoi Old Quarter", text: "In the charming Hanoi Old Quarter, our family visits a traditional Vietnamese restaurant. We enjoy famous Pho Bo, crispy spring rolls, and fragrant iced green tea. The cuisine is renowned worldwide!", translationVi: "Tại khu Phố Cổ Hà Nội đầy quyến rũ, gia đình mình ghé thăm một nhà hàng Việt Nam truyền thống. Chúng mình thưởng thức món Phở Bò trứ danh, nem rán giòn rụm và trà xanh đá thơm mát. Ẩm thực Việt Nam thực sự nức tiếng khắp năm châu!" }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 19, unitTitle: "Animals", unitTitleVi: "Thế giới động vật", theme: "Zoo & Wildlife Traits", icon: "🦒", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Animal Descriptions", focus: "vocabulary_phonics", phonicsSound: "Sounds /dʒ/ (giraffe) & /k/ (crocodile)",
        vocabulary: [
          { id: "g4-u19-giraffe", word: "giraffe", clue: "Tallest mammal with extremely long neck.", vietnameseMeaning: "hươu cao cổ", phonics: "/dʒɪˈrɑːf/", emoji: "🦒", grade: 4, unit: 19, topic: "Animals", exampleSentence: "The giraffe eats leaves from tall trees.", distractors: ["crocodile", "kangaroo", "hippo"] },
          { id: "g4-u19-crocodile", word: "crocodile", clue: "Large predatory aquatic reptile with powerful jaws.", vietnameseMeaning: "con cá sấu", phonics: "/ˈkrɒk.ə.daɪl/", emoji: "🐊", grade: 4, unit: 19, topic: "Animals", exampleSentence: "The crocodile swims in the river.", distractors: ["giraffe", "hippo", "zebra"] },
          { id: "g4-u19-kangaroo", word: "kangaroo", clue: "Australian marsupial that hops with a pouch.", vietnameseMeaning: "chuột túi / kang-gu-ru", phonics: "/ˌkæŋ.ɡərˈuː/", emoji: "🦘", grade: 4, unit: 19, topic: "Animals", exampleSentence: "The kangaroo carries its baby.", distractors: ["giraffe", "crocodile", "bear"] },
          { id: "g4-u19-hippo", word: "hippo", clue: "Massive semi-aquatic mammal.", vietnameseMeaning: "hà mã", phonics: "/ˈhɪp.əʊ/", emoji: "🦛", grade: 4, unit: 19, topic: "Animals", exampleSentence: "The hippo bathes in the muddy lake.", distractors: ["giraffe", "kangaroo", "tiger"] },
        ],
        sentenceStructures: [{ pattern: "What does the [Animal] look like? ➔ It has [Features] and [Traits]. / Why do you want to see [Animals]? ➔ Because they are [Adjective].", vietnameseMeaning: "Con [Động vật] trông như thế nào? ➔ Nó có [Đặc điểm]. / Tại sao bạn muốn xem [Động vật]? ➔ Vì chúng rất [Tính từ].", sampleDialogue: [{ speaker: "Mary", text: "What does the giraffe look like?", textVi: "Hươu cao cổ trông như thế nào thế?" }, { speaker: "Mai", text: "It is very tall and has a long graceful neck and spotted fur.", textVi: "Nó rất cao, có chiếc cổ dài duyên dáng và bộ lông đốm." }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Animal Abilities", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Can the [Animal] [Action]? ➔ Yes, it can. It [Action]s very fast.", vietnameseMeaning: "Con [Động vật] có thể [Hành động] không? ➔ Có, nó có thể.", sampleDialogue: [{ speaker: "Tony", text: "Can kangaroos jump high?", textVi: "Chuột túi có thể nhảy cao không?" }, { speaker: "Nam", text: "Yes, they can leap over two metres easily!", textVi: "Có chứ, chúng có thể nhảy vọt qua hai mét một cách dễ dàng!" }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Safari Discovery Story", focus: "reading_communication", readingMiniStory: { title: "Safari Park Adventure", text: "Our school trip visits Vinpearl Safari. We observe giraffes reaching high treetop leaves, fast kangaroos hopping gracefully across grasslands, and peaceful hippos resting in the cool river.", translationVi: "Chuyến dã ngoại trường đưa chúng mình đến Vinpearl Safari. Chúng mình quan sát đàn hươu cao cổ vươn tới những ngọn lá cây cao vút, những chú chuột túi nhảy thoăn thoắt qua đồng cỏ và bầy hà mã thảnh thơi tắm mát trong dòng sông êm đềm." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
  {
    grade: 4, unitNumber: 20, unitTitle: "Summer Holiday", unitTitleVi: "Kỳ nghỉ hè", theme: "Vacations & Travel Destinations", icon: "🏖️", semester: 2,
    lessons: [
      {
        lessonNumber: 1, lessonTitle: "Lesson 1: Vacation Destinations", focus: "vocabulary_phonics", phonicsSound: "Sounds /h/ (Ha Long) & /f/ (Phu Quoc)",
        vocabulary: [
          { id: "g4-u20-ha-long", word: "Ha Long Bay", clue: "Famous UNESCO heritage bay with emerald waters and limestone islets.", vietnameseMeaning: "Vịnh Hạ Long", phonics: "/hɑː lɒŋ beɪ/", emoji: "⛵", grade: 4, unit: 20, topic: "Destinations", exampleSentence: "We will cruise in Ha Long Bay.", distractors: ["Nha Trang", "Phu Quoc", "Da Nang"] },
          { id: "g4-u20-da-nang", word: "Da Nang", clue: "Modern coastal city with Golden Bridge and sandy beaches.", vietnameseMeaning: "thành phố Đà Nẵng", phonics: "/dɑː næŋ/", emoji: "🌉", grade: 4, unit: 20, topic: "Destinations", exampleSentence: "Visit the Golden Bridge in Da Nang.", distractors: ["Ha Long Bay", "Hue", "Sa Pa"] },
          { id: "g4-u20-phu-quoc", word: "Phu Quoc Island", clue: "Tropical paradise pearl island in southern Vietnam.", vietnameseMeaning: "đảo Phú Quốc", phonics: "/fuː kwɒk ˈaɪ.lənd/", emoji: "🏝️", grade: 4, unit: 20, topic: "Destinations", exampleSentence: "Clear blue sea in Phu Quoc Island.", distractors: ["Ha Long Bay", "Da Nang", "Hanoi"] },
          { id: "g4-u20-sa-pa", word: "Sa Pa", clue: "Highland mountain resort with terraced rice fields and Fansipan peak.", vietnameseMeaning: "thị xã Sa Pa", phonics: "/sɑː pɑː/", emoji: "⛰️", grade: 4, unit: 20, topic: "Destinations", exampleSentence: "Cool mountain air in Sa Pa.", distractors: ["Phu Quoc", "Nha Trang", "Vung Tau"] },
        ],
        sentenceStructures: [{ pattern: "Where are you going this summer? ➔ I'm going to [Destination]. / What are you going to do there? ➔ I'm going to [Action].", vietnameseMeaning: "Bạn dự định đi đâu vào mùa hè này? ➔ Mình dự định đi [Điểm đến]. / Bạn dự định làm gì ở đó? ➔ Mình dự định [Hành động].", sampleDialogue: [{ speaker: "Mai", text: "Where are you going this summer holiday, Tony?", textVi: "Mùa hè này bạn dự định đi du lịch ở đâu thế Tony?" }, { speaker: "Tony", text: "I'm going to Ha Long Bay. I'm going to take a boat cruise and explore magnificent caves!", textVi: "Mình sẽ đi Vịnh Hạ Long. Mình dự định đi du thuyền và khám phá những hang động kỳ vĩ!" }] }],
      },
      { lessonNumber: 2, lessonTitle: "Lesson 2: Holiday Plans & Activities", focus: "sentence_patterns", vocabulary: [], sentenceStructures: [{ pattern: "Who are you going with? ➔ I'm going with my family.", vietnameseMeaning: "Bạn đi cùng với ai? ➔ Mình đi cùng gia đình.", sampleDialogue: [{ speaker: "Nam", text: "Who are you going to Phu Quoc with?", textVi: "Bạn đi Phú Quốc cùng với ai thế?" }, { speaker: "Linda", text: "I'm going with my parents and brother. We will swim every day!", textVi: "Mình đi cùng bố mẹ và anh trai. Chúng mình sẽ tắm biển mỗi ngày!" }] }] },
      { lessonNumber: 3, lessonTitle: "Lesson 3: Dream Summer Vacation Story", focus: "reading_communication", readingMiniStory: { title: "Exciting Summer Holiday Plans", text: "Summer vacation is just around the corner! Students in Class 4 share wonderful travel plans. Nam is visiting misty Sa Pa, Mai is going to scenic Da Nang, and Peter is flying to sunny Phu Quoc Island for marine adventures.", translationVi: "Kỳ nghỉ hè rực rỡ đang đến gần! Các bạn học sinh lớp 4 hào hứng chia sẻ những kế hoạch du lịch tuyệt vời. Nam sẽ đến Sa Pa mù sương, Mai đi Đà Nẵng xinh đẹp và Peter bay đến hòn đảo ngọc Phú Quốc để tận hưởng những chuyến phiêu lưu trên biển." }, vocabulary: [], sentenceStructures: [] },
    ],
  },
];
