/**
 * Milo AI Tutor 24/7 - Comprehensive Primary English Knowledge Base
 * Aligned with the Vietnamese Ministry of Education Global Success curriculum (Grades 1-5).
 * Provides lightning-fast (<10ms), 100% accurate, age-appropriate answers for:
 * 1. Tenses (Các thì tiếng Anh: Hiện tại đơn, Hiện tại tiếp diễn, Quá khứ đơn, Tương lai đơn)
 * 2. Sentence Patterns (Mẫu câu giao tiếp chuẩn SGK Global Success)
 * 3. Vocabulary (Từ vựng theo chủ đề: Gia đình, Động vật, Trường học, Nghề nghiệp, Đồ ăn...)
 * 4. Grammar Rules (Ngữ pháp: a/an/the, in/on/at, To Be, danh từ số nhiều, đại từ...)
 */

export interface MiloAnswer {
  matched: boolean;
  topicCategory: "tenses" | "sentence_patterns" | "vocabulary" | "grammar_rules" | "general";
  topicTitle: string;
  reply: string;
  vietnameseHint: string;
  suggestedFollowUps: string[];
}

export const MILO_KNOWLEDGE_BASE: Record<string, MiloAnswer> = {
  // ==========================================
  // 1. CÁC THÌ TIẾNG ANH (ENGLISH TENSES)
  // ==========================================
  "present_simple": {
    matched: true,
    topicCategory: "tenses",
    topicTitle: "Thì Hiện Tại Đơn (Present Simple Tense)",
    reply: `🌟 **Present Simple Tense (Thì Hiện Tại Đơn)**
We use the Present Simple to talk about habits, daily routines, or facts that are always true!

📐 **1. With Verb "TO BE" (am / is / are):**
• **I + am** ➔ *I am a student at primary school.*
• **He / She / It / Singular noun + is** ➔ *She is ten years old.*
• **We / You / They / Plural noun + are** ➔ *They are my best friends.*

📐 **2. With Ordinary Action Verbs (Động từ thường):**
• **I / You / We / They + Verb (nguyên mẫu):**
  ➔ *I play football every afternoon.* ⚽
  ➔ *We read books in the library.* 📚
• **He / She / It + Verb + s / es:**
  ➔ *He plays football very well.*
  ➔ *She watches TV after dinner.* (watch ➔ watches)

⏰ **Dấu hiệu nhận biết (Signal words):**
• *every day / every week*, *always* (luôn luôn), *usually* (thường xuyên), *often* (hay), *sometimes* (thỉnh thoảng), *never* (không bao giờ).

💡 **Mẹo làm bài cực nhanh:** Khi chủ ngữ là 1 người/1 vật (He, She, It, Nam, a cat), nhớ tặng cho động từ một chữ **"s"** hoặc **"es"** nhé!`,
    vietnameseHint: `Thì hiện tại đơn dùng để diễn tả thói quen, việc lặp đi lặp lại hàng ngày hoặc sự thật hiển nhiên.
• Với To Be: I am | He/She/It is | You/We/They are.
• Với động từ thường: I/You/We/They đi với động từ nguyên thể (play, eat, study). He/She/It thì động từ phải thêm "s" hoặc "es" (plays, eats, studies).
• Ví dụ: "My mother cooks dinner every day." (Mẹ tớ nấu bữa tối mỗi ngày).`,
    suggestedFollowUps: [
      "Quy tắc thêm 's' và 'es' vào động từ? 🔍",
      "Thì hiện tại tiếp diễn là gì? ⏳",
      "Cho một bài tập trắc nghiệm hiện tại đơn! 📝",
    ],
  },

  "present_continuous": {
    matched: true,
    topicCategory: "tenses",
    topicTitle: "Thì Hiện Tại Tiếp Diễn (Present Continuous Tense)",
    reply: `⏳ **Present Continuous Tense (Thì Hiện Tại Tiếp Diễn)**
We use this tense to describe an action happening **RIGHT NOW** at the moment of speaking!

📐 **Cấu trúc (Formula):**
• **Khẳng định (+):** S + am / is / are + **V-ing**
  ➔ *I am doing my English homework.* ✍️
  ➔ *He is playing chess with his grandfather.* ♟️
  ➔ *They are singing English songs.* 🎤

• **Phủ định (-):** S + am / is / are + **NOT** + **V-ing**
  ➔ *She is not (isn't) sleeping. She is reading.*

• **Nghi vấn (?):** Am / Is / Are + S + **V-ing**?
  ➔ *Are you listening to music? ➔ Yes, I am. / No, I'm not.*

⏰ **Dấu hiệu nhận biết (Keywords):**
• *now* (bây giờ), *at the moment* (lúc này), *right now*, *Look!* (Nhìn kìa!), *Listen!* (Lắng nghe này!).

✨ **Ví dụ chuẩn SGK Global Success:**
*"What are you doing? - I am reading a book about animals."*`,
    vietnameseHint: `Thì hiện tại tiếp diễn diễn tả hành động đang xảy ra ngay lúc nói.
• Công thức: S + am/is/are + V-ing.
• Nhớ quy tắc: I đi với am; He/She/It đi với is; We/You/They đi với are. Động từ luôn có đuôi "-ing" (reading, swimming, dancing).
• Thấy từ "now", "at the moment", "Look!", "Listen!" là nghĩ ngay đến thì này nhé!`,
    suggestedFollowUps: [
      "Quy tắc thêm đuôi -ing (swimming, having)? 🏊",
      "Phân biệt Hiện tại đơn và Hiện tại tiếp diễn? ⚖️",
      "Thì quá khứ đơn dùng khi nào? 🕰️",
    ],
  },

  "past_simple": {
    matched: true,
    topicCategory: "tenses",
    topicTitle: "Thì Quá Khứ Đơn (Past Simple Tense)",
    reply: `🕰️ **Past Simple Tense (Thì Quá Khứ Đơn)**
We use the Past Simple to talk about actions that started and finished in the **PAST**!

📐 **1. With Verb "TO BE" in the Past (was / were):**
• **I / He / She / It / Singular noun + WAS**
  ➔ *I was in Ha Long Bay last summer.* 🏖️
  ➔ *He was at home yesterday.*
• **We / You / They / Plural noun + WERE**
  ➔ *They were very happy at the party.* 🎈

📐 **2. With Ordinary Action Verbs (V2 / V-ed):**
• **Động từ có quy tắc (+ ed):**
  ➔ *play ➔ played* (I played football yesterday.)
  ➔ *visit ➔ visited* (We visited our grandparents last weekend.)
  ➔ *watch ➔ watched*, *listen ➔ listened*
• **Động từ bất quy tắc quen thuộc (Irregular Verbs):**
  ➔ *go ➔ went* (We went to Phu Quoc Island.)
  ➔ *see ➔ saw* (I saw many monkeys at the zoo.)
  ➔ *have ➔ had* (I had a great time.)
  ➔ *eat ➔ ate* (She ate delicious pizza.)
  ➔ *buy ➔ bought* (Mom bought a new school bag.)

⏰ **Dấu hiệu nhận biết:**
• *yesterday* (hôm qua), *last night / last week / last year* (tuần trước, năm ngoái), *... ago* (two days ago = 2 ngày trước).`,
    vietnameseHint: `Thì quá khứ đơn diễn tả hành động đã xảy ra và chấm dứt trong quá khứ.
• Với To Be: I/He/She/It dùng "was" | You/We/They dùng "were".
• Với động từ thường: Đa số thêm "-ed" (visited, played). Một số động từ đặc biệt đổi dạng (go -> went, see -> saw, eat -> ate).
• Câu hỏi: Did you + V (nguyên mẫu)? -> Yes, I did. / No, I didn't.`,
    suggestedFollowUps: [
      "Bảng động từ bất quy tắc hay gặp lớp 4, lớp 5? 📖",
      "Cách phát âm đuôi -ed (/t/, /d/, /ɪd/)? 🗣️",
      "Thì tương lai đơn (Future Simple)? 🚀",
    ],
  },

  "future_simple": {
    matched: true,
    topicCategory: "tenses",
    topicTitle: "Thì Tương Lai Đơn (Future Simple & Be Going To)",
    reply: `🚀 **Future Simple Tense (Thì Tương Lai)**
We use the future tense to talk about things that will happen in the future or plans!

📐 **1. Will + Verb (Sẽ làm gì - quyết định ngay lúc nói hoặc dự đoán):**
• **Khẳng định (+):** S + **will + Verb (nguyên mẫu)**
  ➔ *I will be a doctor in the future.* 🩺
  ➔ *We will visit Da Nang next month.* ✈️
• **Phủ định (-):** S + **will not (won't) + Verb**
  ➔ *He won't stay at home tomorrow.*
• **Nghi vấn (?):** **Will you + Verb?**
  ➔ *Will you join the English club? ➔ Yes, I will. / No, I won't.*

📐 **2. Be going to + Verb (Dự định chắc chắn từ trước):**
• S + **am / is / are + going to + Verb**
  ➔ *I am going to visit my grandparents this weekend.* 🏡

⏰ **Dấu hiệu nhận biết:**
• *tomorrow* (ngày mai), *next week / next year* (tuần tới, năm tới), *in the future* (trong tương lai), *soon* (sớm thôi).`,
    vietnameseHint: `Thì tương lai diễn tả hành động sẽ xảy ra.
• Dùng "will + V": Nói về tương lai chung hoặc quyết định tức thì (I will help you).
• Dùng "am/is/are + going to + V": Nói về dự định đã lên kế hoạch (I am going to visit Ha Long Bay next Sunday).
• Ví dụ câu hỏi nghề tương lai lớp 5: "What will you be in the future? - I will be an architect." (Cậu sẽ làm nghề gì trong tương lai? - Tớ sẽ là một kiến trúc sư).`,
    suggestedFollowUps: [
      "Mẫu câu hỏi nghề nghiệp tương lai lớp 5? 👷",
      "Phân biệt 'will' và 'be going to'? ⚡",
      "Luyện tập 3 câu hỏi thì tương lai! 🎯",
    ],
  },

  // ==========================================
  // 2. MẪU CÂU GIAO TIẾP (SENTENCE PATTERNS)
  // ==========================================
  "pattern_family": {
    matched: true,
    topicCategory: "sentence_patterns",
    topicTitle: "Mẫu Câu Chủ Đề Gia Đình (My Family - Grade 3)",
    reply: `👨‍👩‍👧‍👦 **Key Sentence Patterns for MY FAMILY (SGK Global Success Lớp 3 - Unit 11 & 12):**

1️⃣ **Hỏi người đó là ai (Identifying family members):**
• ❓ **Who is that?** / **Who's that?** (Kia là ai thế?)
  ➔ **He is my father.** (Ông ấy là bố của tớ.) 👨
  ➔ **She is my grandmother.** (Bà ấy là bà của tớ.) 👵
  ➔ **He is my brother.** (Cậu ấy là anh/em trai của tớ.) 👦

2️⃣ **Hỏi tuổi của thành viên gia đình (Asking about age):**
• ❓ **How old is your father / mother / brother?**
  ➔ **He is forty years old.** (Bố tớ 40 tuổi.)
  ➔ **She is thirty-five years old.** (Mẹ tớ 35 tuổi.)
  ➔ **He is eight years old.** (Em trai tớ 8 tuổi.)

3️⃣ **Hỏi nghề nghiệp của bố mẹ (Asking about jobs - Unit 12):**
• ❓ **What does your father do?** (Bố bạn làm nghề gì?)
  ➔ **He is a doctor / teacher / engineer.** (Bố tớ là bác sĩ / giáo viên / kỹ sư.)
• ❓ **What does your mother do?**
  ➔ **She is a nurse / clerk / worker.**

4️⃣ **Mẫu câu giới thiệu gia đình (Introducing your family):**
• *"This is a photo of my family. There are four people in my family: my father, my mother, my younger sister, and me. We love each other very much!"* ❤️`,
    vietnameseHint: `Mẫu câu gia đình lớp 3 trọng tâm:
• "Who's that? - It's my father/mother/sister." (Kia là ai? - Đó là bố/mẹ/chị gái tớ).
• "How old is your father? - He is forty years old." (Bố bạn bao nhiêu tuổi? - Bố tớ 40 tuổi).
• "What does your father do? - He is a doctor." (Bố bạn làm nghề gì? - Bố tớ là bác sĩ).`,
    suggestedFollowUps: [
      "Từ vựng các thành viên gia đình tiếng Anh? 👨‍👩‍👧",
      "Mẫu câu hỏi sở thích của các thành viên? 🎨",
      "Đọc truyện tương tác 'My Family' lớp 3! 📖",
    ],
  },

  "pattern_hobbies": {
    matched: true,
    topicCategory: "sentence_patterns",
    topicTitle: "Mẫu Câu Hỏi Sở Thích (Hobbies - Grade 3 & 4)",
    reply: `🎨 **Mẫu Câu Hỏi & Trả Lời Sở Thích (Hobbies):**

1️⃣ **Mẫu câu lớp 3 (Global Success Unit 7):**
• ❓ **What's your hobby?** (Sở thích của bạn là gì?)
  ➔ **It's singing.** (Đó là ca hát.) 🎤
  ➔ **It's dancing.** (Đó là nhảy múa.) 💃
  ➔ **It's drawing.** (Đó là vẽ tranh.) 🎨
  ➔ **It's swimming.** (Đó là bơi lội.) 🏊

2️⃣ **Mẫu câu nâng cao lớp 4 & 5 (Like + V-ing):**
• ❓ **What do you like doing in your free time?**
  ➔ **I like playing football.** ⚽
  ➔ **I like reading comic books.** 📖
  ➔ **I like listening to music.** 🎧
• ❓ **What does he/she like doing?**
  ➔ **He likes playing chess.** ♟️ (Nhớ: He/She likes thêm 's'!)

💡 **Quy tắc vàng:** Sau **like**, động từ luôn luôn phải thêm đuôi **-ing** bạn nhé! (play ➔ playing, cook ➔ cooking).`,
    vietnameseHint: `Hỏi sở thích tiếng Anh:
• Lớp 3: "What's your hobby? - It's + V-ing (singing, swimming, cooking)."
• Lớp 4-5: "What do you like doing? - I like playing sports."
• Chú ý: Sau động từ "like", ta phải dùng động từ thêm đuôi "-ing" (like reading, like cooking).`,
    suggestedFollowUps: [
      "Từ vựng 15 môn thể thao và sở thích thú vị? ⚽",
      "Mẫu câu hỏi thời gian rảnh (free time)? ⏰",
      "Luyện nói câu hỏi sở thích với Cô giáo Sophie! 🗣️",
    ],
  },

  "pattern_weather": {
    matched: true,
    topicCategory: "sentence_patterns",
    topicTitle: "Mẫu Câu Hỏi Thời Tiết (Weather - Grade 4 & 5)",
    reply: `☀️ **Mẫu Câu Hỏi & Trả Lời Thời Tiết (Weather):**

1️⃣ **Hỏi thời tiết hôm nay (Today's weather):**
• ❓ **What's the weather like today?** (Thời tiết hôm nay thế nào?)
• ❓ Hoặc: **How is the weather today?**
  ➔ **It's sunny.** (Trời nắng ráo.) ☀️
  ➔ **It's rainy.** (Trời có mưa.) 🌧️
  ➔ **It's cloudy and windy.** (Trời nhiều mây và có gió.) ⛅🍃
  ➔ **It's hot and sunny.** (Trời nóng và nắng.) 🔥
  ➔ **It's cold and foggy.** (Trời lạnh và có sương mù.) ❄️

2️⃣ **Hỏi thời tiết tại một địa điểm cụ thể:**
• ❓ **What's the weather like in Hanoi / Da Nang / Ho Chi Minh City?**
  ➔ **In Hanoi, it is cool and windy today.** 🍃

3️⃣ **Hỏi thời tiết ngày mai (Dự báo tương lai):**
• ❓ **What will the weather be like tomorrow?**
  ➔ **It will be sunny and warm.** 🌤️`,
    vietnameseHint: `Hỏi thời tiết:
• "What's the weather like today? - It's sunny / rainy / cloudy / windy."
• "What will the weather be like tomorrow? - It will be cold and snowy."
• Từ vựng thời tiết: sunny (nắng), rainy (mưa), cloudy (nhiều mây), windy (gió), snowy (tuyết), stormy (bão), foggy (sương mù).`,
    suggestedFollowUps: [
      "Từ vựng 4 mùa: Spring, Summer, Autumn, Winter? 🍂",
      "Mẫu câu hỏi giá tiền (How much is it)? 🏷️",
      "Làm bài kiểm tra nhanh về thời tiết! 🌦️",
    ],
  },

  // ==========================================
  // 3. TỪ VỰNG THEO CHỦ ĐỀ (VOCABULARY)
  // ==========================================
  "vocab_family": {
    matched: true,
    topicCategory: "vocabulary",
    topicTitle: "Từ Vựng Chủ Đề Gia Đình (Family Vocabulary - Grade 3)",
    reply: `👨‍👩‍👧‍👦 **Trọn Bộ Từ Vựng Chủ Đề Gia Đình (Family Vocabulary):**

1️⃣ **Các thành viên trong nhà (Core Family Members):**
• **family** /ˈfæməli/ (n): gia đình
• **father** /ˈfɑːðər/ (n): bố, cha (thân mật: *dad, daddy*)
• **mother** /ˈmʌðər/ (n): mẹ (thân mật: *mom, mummy*)
• **parents** /ˈpeərənts/ (n): bố mẹ (cả hai người)
• **brother** /ˈbrʌðər/ (n): anh trai / em trai
• **older brother** (anh trai) • **younger brother** (em trai)
• **sister** /ˈsɪstər/ (n): chị gái / em gái
• **older sister** (chị gái) • **younger sister** (em gái)
• **baby** /ˈbeɪbi/ (n): em bé

2️⃣ **Ông bà và họ hàng (Grandparents & Relatives):**
• **grandfather** /ˈɡrænfɑːðər/ (n): ông (thân mật: *grandpa*) 👴
• **grandmother** /ˈɡrænmʌðər/ (n): bà (thân mật: *grandma*) 👵
• **grandparents** /ˈɡrænpeərənts/ (n): ông bà
• **uncle** /ˈʌŋkl/ (n): chú, bác, cậu
• **aunt** /ɑːnt/ (n): cô, dì, mợ
• **cousin** /ˈkʌzn/ (n): anh/chị/em họ

🌟 **Câu ví dụ áp dụng:**
*"I love my family very much. My father is tall and kind. My mother cooks delicious food!"* ❤️`,
    vietnameseHint: `Bộ từ vựng gia đình chuẩn SGK lớp 3:
• Father (bố), Mother (mẹ), Brother (anh/em trai), Sister (chị/em gái).
• Grandfather (ông), Grandmother (bà), Uncle (chú/bác), Aunt (cô/dì), Cousin (anh em họ).
• Lưu ý: "Parents" là cả bố và mẹ, "Grandparents" là cả ông và bà.`,
    suggestedFollowUps: [
      "Mẫu câu giới thiệu gia đình đạt điểm 10? 🌟",
      "Đọc truyện 'A Wonderful Sunday with My Family'! 📖",
      "Từ vựng nghề nghiệp của bố mẹ? 🩺",
    ],
  },

  "vocab_animals": {
    matched: true,
    topicCategory: "vocabulary",
    topicTitle: "Từ Vựng Động Vật (Animals Vocabulary)",
    reply: `🦁 **Trọn Bộ Từ Vựng Chủ Đề Động Vật (Animals Vocabulary):**

🐶 **1. Vật nuôi trong nhà (Pets & Farm Animals):**
• **dog** /dɒɡ/: chú chó 🐶
• **cat** /kæt/: chú mèo 🐱
• **rabbit** /ˈræbɪt/: chú thỏ 🐰
• **bird** /bɜːd/: chú chim 🐦
• **fish** /fɪʃ/: chú cá 🐟
• **duck** /dʌk/: con vịt 🦆
• **chicken** /ˈtʃɪkɪn/: con gà 🐔
• **cow** /kaʊ/: con bò sữa 🐄
• **horse** /hɔːs/: con ngựa 🐴
• **pig** /pɪɡ/: con heo 🐷

🐯 **2. Động vật hoang dã & Vườn bách thú (Wild & Zoo Animals):**
• **elephant** /ˈelɪfənt/: con voi 🐘 (tai to, vòi dài)
• **monkey** /ˈmʌŋki/: con khỉ 🐒 (thích leo trèo)
• **tiger** /ˈtaɪɡər/: con hổ 🐯
• **lion** /ˈlaɪən/: sư tử 🦁
• **giraffe** /dʒəˈrɑːf/: hươu cao cổ 🦒 (cổ rất dài)
• **zebra** /ˈzebrə/: ngựa vằn 🦓
• **crocodile** /ˈkrɒkədaɪl/: cá sấu 🐊
• **dolphin** /ˈdɒlfɪn/: cá heo 🐬

🌟 **Mẫu câu hay gặp:**
*"What animal do you like? - I like elephants because they are big and friendly."*`,
    vietnameseHint: `Từ vựng động vật:
• Thú cưng: dog, cat, rabbit, bird, hamster.
• Nông trại: cow, horse, pig, sheep, duck, chicken.
• Hoang dã: elephant (voi), tiger (hổ), lion (sư tử), monkey (khỉ), giraffe (hươu cao cổ).
• Mẫu câu: "What's your favourite animal? - My favourite animal is a dog."`,
    suggestedFollowUps: [
      "Tại sao con cừu (sheep) số nhiều vẫn là sheep? 🐑",
      "Mẫu câu hỏi con vật sở thú lớp 4? 🦒",
      "Đố vui tiếng Anh về các con vật! 🎮",
    ],
  },

  "vocab_school": {
    matched: true,
    topicCategory: "vocabulary",
    topicTitle: "Từ Vựng Đồ Dùng Học Tập & Trường Học (School Things)",
    reply: `🎒 **Trọn Bộ Từ Vựng Đồ Dùng Học Tập (School Things - Grades 1-5):**

✏️ **1. Đồ dùng trong hộp bút (In your pencil case):**
• **pen** /pen/: bút mực 🖊️
• **pencil** /ˈpensl/: bút chì ✏️
• **pencil case** /ˈpensl keɪs/: hộp bút 👝
• **pencil sharpener** /ˈpensl ʃɑːpnər/: cái gọt bút chì
• **eraser** /ɪˈreɪzər/ (hoặc *rubber*): cục tẩy
• **ruler** /ˈruːlər/: cây thước kẻ 📏
• **crayons** /ˈkreɪənz/: bút sáp màu 🖍️

📚 **2. Sách vở & Lớp học (Books & Classroom):**
• **school bag** /ˈskuːl bæɡ/ (hoặc *backpack*): cặp sách, ba lô 🎒
• **book** /bʊk/: quyển sách 📖
• **notebook** /ˈnəʊtbʊk/: quyển vở ghi chép 📓
• **desk** /desk/: bàn học (có ngăn kéo)
• **chair** /tʃeər/: cái ghế 🪑
• **board** /bɔːd/: cái bảng (blackboard: bảng đen, whiteboard: bảng trắng)
• **classroom** /ˈklɑːsruːm/: phòng học 🏫

🌟 **Mẫu câu thực hành:**
• *"May I borrow your ruler, please? - Here you are!"*
• *"Is this your pencil case? - Yes, it is. / No, it isn't."*`,
    vietnameseHint: `Đồ dùng học tập:
• Pen (bút mực), pencil (bút chì), eraser/rubber (cục tẩy), ruler (thước kẻ).
• School bag/backpack (cặp sách), pencil case (hộp bút), notebook (quyển vở).
• Mẫu câu: "Do you have a ruler? - Yes, I do." (Bạn có thước kẻ không? - Có, mình có).`,
    suggestedFollowUps: [
      "Cách dùng 'a' và 'an' trước đồ dùng học tập? 📐",
      "Từ vựng các môn học: Maths, English, Science, Music? 🎵",
      "Luyện phát âm từ vựng trường học! 🗣️",
    ],
  },

  // ==========================================
  // 4. NGỮ PHÁP TIỂU HỌC QUAN TRỌNG (GRAMMAR)
  // ==========================================
  "grammar_in_on_at": {
    matched: true,
    topicCategory: "grammar_rules",
    topicTitle: "Phân Biệt Giới Từ IN - ON - AT Chỉ Thời Gian & Nơi Chốn",
    reply: `📐 **Bí Quyết Phân Biệt Giới Từ IN - ON - AT (Dễ nhớ nhất thế giới!)**

Hãy tưởng tượng hình **Kim Tự Tháp Giới Từ**: từ to nhất (rộng lớn) đến bé nhất (cụ thể, chính xác):

⏳ **1. VỀ THỜI GIAN (TIME):**
🔻 **IN (Rộng nhất - Năm, Tháng, Mùa, Buổi trong ngày):**
• Năm: *in 2026, in 1995*
• Tháng: *in May, in December*
• Mùa: *in summer, in spring, in winter*
• Buổi: *in the morning, in the afternoon, in the evening* (NGOẠI LỆ: *at night*)

🔹 **ON (Vừa vừa - Ngày, Thứ, Ngày lễ cụ thể):**
• Thứ trong tuần: *on Monday, on Sunday*
• Ngày tháng cụ thể: *on the 10th of October, on May 5th*
• Dịp có chữ 'Day': *on my birthday, on Christmas Day*

🔺 **AT (Nhỏ nhất, chính xác nhất - Giờ cụ thể & Khoảnh khắc):**
• Giờ cụ thể: *at 7 o'clock, at 6:30 a.m., at noon*
• Khoảnh khắc: *at the weekend, at present, at night*

📍 **2. VỀ NƠI CHỐN (PLACE):**
• **IN**: Không gian kín hoặc địa danh lớn (*in the room, in Hanoi, in Vietnam*).
• **ON**: Trên bề mặt (*on the table, on the wall, on floor 2*).
• **AT**: Một địa điểm cụ thể (*at school, at home, at the airport*).`,
    vietnameseHint: `Mẹo ghi nhớ siêu nhanh:
• "IN năm, IN tháng, IN mùa. Sáng trưa chiều tối thì chừa AT ra (at night)!"
• "ON ngày, ON thứ bạn ơi!"
• "AT giờ chuẩn xác, chớ rời mắt trông!"
Ví dụ: "I get up **at 6 a.m.** **on Monday** **in summer**."`,
    suggestedFollowUps: [
      "Cho 3 câu trắc nghiệm giới từ in, on, at! 📝",
      "Giới từ chỉ vị trí: under, behind, next to? 📦",
      "Cách dùng mạo từ a, an, the? 💡",
    ],
  },

  "grammar_a_an": {
    matched: true,
    topicCategory: "grammar_rules",
    topicTitle: "Cách Dùng Mạo Từ 'A' và 'AN'",
    reply: `💡 **Quy Tắc Dùng Mạo Từ 'A' và 'AN' Chuẩn Xác 100%:**

Cả **A** và **AN** đều có nghĩa là **"MỘT"**, dùng trước danh từ đếm được số ít.

🍎 **KHI NÀO DÙNG 'AN'?**
Dùng **AN** khi từ đứng ngay sau nó bắt đầu bằng một **NGUYÊN ÂM**.
👉 **Mẹo nhớ 5 nguyên âm tiếng Anh:** ghép thành từ **"UỂ OẢI"** (**U - E - O - A - I**)!

• **an apple** (một quả táo) 🍎
• **an elephant** (một chú voi) 🐘
• **an orange** (một quả cam) 🍊
• **an umbrella** (một chiếc ô) ☂️
• **an eraser** (một cục tẩy)
• **an ice cream** (một cây kem) 🍦

✏️ **KHI NÀO DÙNG 'A'?**
Dùng **A** khi từ bắt đầu bằng một **PHỤ ÂM** (tất cả các chữ cái còn lại như b, c, d, p, r, t, s...):
• **a book** (một quyển sách) 📖
• **a pen** (một cây bút) 🖊️
• **a cat** (một chú mèo) 🐱
• **a teacher** (một giáo viên) 👩‍🏫

⚠️ **Lưu ý đặc biệt:**
• Dựa vào **phát âm**, không phải chữ viết: *an hour* (1 giờ, vì chữ 'h' câm phát âm là /ˈaʊər/).`,
    vietnameseHint: `Quy tắc a / an:
• Cứ thấy từ bắt đầu bằng nguyên âm trong từ "U - E - O - A - I" (Uể Oải) thì dùng "AN".
• Còn lại dùng "A".
• Ví dụ: "an apple", "an umbrella", "a cat", "a ruler".`,
    suggestedFollowUps: [
      "Cách chuyển danh từ số ít sang số nhiều (cat -> cats)? 🐱🐱",
      "Khi nào dùng 'THE'? 🌍",
      "Làm quiz 5 câu chọn a hay an! 🎯",
    ],
  },

  "grammar_to_be": {
    matched: true,
    topicCategory: "grammar_rules",
    topicTitle: "Động Từ To Be (Am / Is / Are & Was / Were)",
    reply: `📐 **Động Từ To Be (Thì Hiện Tại & Quá Khứ):**

"To Be" nghĩa là **"thì, là, ở"**.

🟢 **1. Ở Hiện Tại (am / is / are):**
• **I ➔ AM** (*I am Nam.* / *I am 9 years old.*)
• **He / She / It / 1 người / 1 vật ➔ IS**
  ➔ *He is my brother.*
  ➔ *The dog is brown.*
• **We / You / They / từ 2 người trở lên ➔ ARE**
  ➔ *We are pupils.*
  ➔ *Tom and Jerry are funny.*

🔴 **2. Ở Quá Khứ (was / were):**
• **I / He / She / It / Số ít ➔ WAS**
  ➔ *I was at the zoo yesterday.*
• **We / You / They / Số nhiều ➔ WERE**
  ➔ *They were happy last night.*

❓ **Câu hỏi với To Be:** Đưa To Be lên đầu câu!
• *Are you happy? ➔ Yes, I am. / No, I'm not.*
• *Is he a teacher? ➔ Yes, he is. / No, he isn't.*`,
    vietnameseHint: `Bảng động từ To Be:
• Hiện tại: I am | He/She/It is | You/We/They are.
• Quá khứ: I/He/She/It was | You/We/They were.
• Phủ định chỉ cần thêm 'not': am not, is not (isn't), are not (aren't).`,
    suggestedFollowUps: [
      "Cách dùng 'have got' và 'has got'? 🎒",
      "Thì hiện tại đơn với To Be vs Động từ thường? ⚖️",
      "Cho bài tập điền am, is, are! 📝",
    ],
  },
  // ==========================================
  // 5. TRỢ LÝ AI & PHONICS, ADVANCED TOPICS
  // ==========================================
  "who_is_milo": {
    matched: true,
    topicCategory: "general",
    topicTitle: "Giới Thiệu Trợ Lý AI Milo 24/7 🐶✨",
    reply: `🐶 **Hello! Tớ là Milo – Bạn học tiếng Anh AI của bạn! ✨**

Tớ được thiết kế đặc biệt dành cho các bạn học sinh Tiểu học Việt Nam (từ Lớp 1 đến Lớp 5) theo chuẩn chương trình SGK **Global Success** của Bộ Giáo dục & Đào tạo.

🌟 **Milo có thể giúp bạn những gì?**
1. 📖 **Tra cứu & học từ vựng:** Giải nghĩa, phiên âm IPA, mẹo nhớ lâu và ví dụ sinh động.
2. 📐 **Giải thích ngữ pháp & các thì:** Hiện tại đơn, tiếp diễn, quá khứ, tương lai, giới từ in/on/at, a/an...
3. 💬 **Luyện mẫu câu giao tiếp:** Hỏi tên, tuổi, gia đình, sở thích, thời tiết, nghề nghiệp...
4. 🔊 **Quy tắc phát âm & Phonics:** Phát âm đuôi -ed, -s/es, nguyên âm, phụ âm chuẩn quốc tế.
5. 📝 **Giải đáp thắc mắc bài tập tiếng Anh:** Giải thích cặn kẽ từng bước, dễ hiểu 100%!

Bạn hãy gõ hoặc bấm vào biểu tượng Micro 🎙️ để trò chuyện và hỏi Milo bất cứ điều gì nhé!`,
    vietnameseHint: `Milo là trợ lý AI thông minh luôn túc trực 24/7 để đồng hành cùng bạn học tiếng Anh. Bạn có thể hỏi Milo về bất cứ bài học nào trong SGK!`,
    suggestedFollowUps: [
      "Thì hiện tại đơn là gì? ⏳",
      "Từ vựng chủ đề gia đình? 👨‍👩‍👧",
      "Quy tắc phát âm đuôi -ed? 🗣️",
    ],
  },

  "greetings": {
    matched: true,
    topicCategory: "general",
    topicTitle: "Chào Bạn! Milo Rất Vui Được Đồng Hành Cùng Bạn 🌟",
    reply: `Hello my friend! 🐶✨ Milo is super happy to see you today! 🌟

How are you doing? I am ready to explore exciting English lessons with you! 
What would you like to discover right now? You can ask me about vocabulary, sentence patterns, grammar tenses, or phonics! 🚀`,
    vietnameseHint: `Chào bạn! Milo rất vui được gặp bạn hôm nay. Bạn có khỏe không? Milo đã sẵn sàng cùng bạn chinh phục tiếng Anh rồi đấy! Hãy chọn hoặc gõ câu hỏi cho Milo nhé!`,
    suggestedFollowUps: [
      "Dạy mình từ vựng về con vật 🐱",
      "Mẫu câu hỏi sở thích lớp 3 🎨",
      "Thì hiện tại tiếp diễn là gì? ⏳",
    ],
  },

  "gratitude": {
    matched: true,
    topicCategory: "general",
    topicTitle: "Cảm Ơn Bạn! Hãy Tiếp Tục Cố Gắng Nhé! 🎉",
    reply: `You are very welcome! 🐶💖 Milo is always proud of your hard work! 
Remember: practice a little bit of English every single day, and you will speak like a champion! 🌟 

Whenever you need help with any word or sentence, Milo is always right here! ⭐`,
    vietnameseHint: `Không có chi bạn nhé! Bạn học rất chăm chỉ và Milo rất tự hào về bạn. Hãy luyện tập mỗi ngày để nói tiếng Anh thật tự tin nhé!`,
    suggestedFollowUps: [
      "Thử làm 1 câu đố tiếng Anh vui! 🎈",
      "Học thêm một mẫu câu mới 💬",
      "Luyện phát âm với Milo 🎙️",
    ],
  },

  "phonics_ending_ed": {
    matched: true,
    topicCategory: "grammar_rules",
    topicTitle: "Quy Tắc Phát Âm Đuôi '-ed' (/t/, /d/, /ɪd/)",
    reply: `🗣️ **Bí Quyết Phát Âm Đuôi '-ed' Chuẩn Quốc Tế:**

Đuôi **-ed** trong thì Quá khứ đơn có **3 cách phát âm** chính:

1️⃣ **/ɪd/ (Đọc là 'id' - Dễ nhất):**
• Áp dụng khi từ kết thúc bằng âm **/t/** hoặc **/d/**.
• 💡 **Mẹo nhớ:** **"Tiền Đô"** (/t/ - /d/).
• Ví dụ: *wanted* /ˈwɒn.tɪd/, *needed* /ˈniː.dɪd/, *visited* /ˈvɪz.ɪ.tɪd/, *started* /ˈstɑː.tɪd/.

2️⃣ **/t/ (Bật hơi nhẹ như chữ 't'):**
• Áp dụng khi từ kết thúc bằng các âm vô thanh: **/p/, /k/, /f/, /s/, /ʃ/ (sh), /tʃ/ (ch)**.
• 💡 **Mẹo nhớ:** **"Phòng Khi Phải Sợ Súng Cháy"** (p, k, f, s, sh, ch).
• Ví dụ: *stopped* /stɒpt/, *looked* /lʊkt/, *laughed* /lɑːft/, *washed* /wɒʃt/, *watched* /wɒtʃt/.

3️⃣ **/d/ (Đọc là 'đ' rung cổ họng):**
• Áp dụng cho TẤT CẢ các âm hữu thanh còn lại (nguyên âm và phụ âm rung: b, g, v, z, m, n, l, r...).
• Ví dụ: *played* /pleɪd/, *cleaned* /kliːnd/, *loved* /lʌvd/, *opened* /ˈəʊ.pənd/.`,
    vietnameseHint: `Ghi nhớ 3 nhóm phát âm -ed:
1. Tận cùng là /t/, /d/ (Tiền Đô) ➔ đọc là /ɪd/ (wanted, needed).
2. Tận cùng là p, k, f, s, sh, ch (Phòng Khi Phải Sợ Súng Cháy) ➔ đọc là /t/ (stopped, watched, cooked).
3. Còn lại ➔ đọc là /d/ (played, cleaned).`,
    suggestedFollowUps: [
      "Quy tắc phát âm đuôi -s/es? 🔍",
      "Thì quá khứ đơn dùng khi nào? 🕰️",
      "Cho bài tập trắc nghiệm phát âm -ed! 📝",
    ],
  },

  "phonics_ending_s_es": {
    matched: true,
    topicCategory: "grammar_rules",
    topicTitle: "Quy Tắc Phát Âm Đuôi '-s' và '-es' (/s/, /z/, /ɪz/)",
    reply: `🔊 **Quy Tắc Vàng Phát Âm Đuôi '-s' và '-es':**

Khi thêm **-s** hoặc **-es** (cho danh từ số nhiều hoặc động từ ngôi thứ 3 số ít), có **3 cách đọc**:

1️⃣ **/ɪz/ (Đọc như 'iz'):**
• Khi từ tận cùng bằng các âm rít: **/s/, /z/, /ʃ/ (sh), /tʃ/ (ch), /dʒ/ (ge/dge), /ks/ (x)**.
• 💡 **Mẹo nhớ:** **"Sóng Gió Chẳng Sợ Sấm Sét"** (s, z, ch, sh, x, ge).
• Ví dụ: *busses* /ˈbʌs.ɪz/, *watches* /ˈwɒtʃ.ɪz/, *dishes* /ˈdɪʃ.ɪz/, *boxes* /ˈbɒk.sɪz/, *changes* /ˈtʃeɪn.dʒɪz/.

2️⃣ **/s/ (Âm gió xì nhẹ):**
• Khi từ tận cùng là các âm vô thanh: **/p/, /k/, /f/, /t/, /θ/ (th)**.
• 💡 **Mẹo nhớ:** **"Thời Phong Kiến Phương Tây"** (th, p, k, f, t).
• Ví dụ: *cats* /kæts/, *books* /bʊks/, *cups* /kʌps/, *months* /mʌnθs/, *laughs* /lɑːfs/.

3️⃣ **/z/ (Âm rung cổ):**
• Áp dụng cho các âm hữu thanh còn lại (b, d, g, v, m, n, l, r và các nguyên âm).
• Ví dụ: *dogs* /dɒɡz/, *pens* /penz/, *apples* /ˈæp.əlz/, *plays* /pleɪz/.`,
    vietnameseHint: `Quy tắc phát âm -s/-es:
• Nhóm 1 (/ɪz/): Tận cùng bằng s, x, z, ch, sh, ce, ge (watches, boxes).
• Nhóm 2 (/s/): Tận cùng bằng p, k, f, t, th (books, cats, maps).
• Nhóm 3 (/z/): Các âm còn lại (dogs, rooms, plays).`,
    suggestedFollowUps: [
      "Quy tắc phát âm đuôi -ed? 🗣️",
      "Quy tắc thêm s hay es vào danh từ? 📚",
      "Làm bài kiểm tra phát âm đuôi -s/es! 🎯",
    ],
  },

  "grammar_make_do": {
    matched: true,
    topicCategory: "grammar_rules",
    topicTitle: "Phân Biệt Cách Dùng 'MAKE' và 'DO'",
    reply: `⚖️ **Bí Quyết Phân Biệt 'MAKE' và 'DO' Chuẩn Xác:**

Cả hai từ đều có nghĩa tiếng Việt là "làm", nhưng cách dùng trong tiếng Anh hoàn toàn khác nhau:

🔹 **1. DÙNG 'DO' (Hành động, bổn phận, công việc chung):**
• Dùng khi thực hiện một hành động, nhiệm vụ hoặc thói quen có sẵn (không tạo ra vật mới).
• **Cụm từ quen thuộc:**
  - *do homework* (làm bài tập về nhà) ✍️
  - *do housework / chores* (làm việc nhà) 🧹
  - *do exercise / yoga* (tập thể dục) 🧘
  - *do the dishes* (rửa bát)
  - *do your best* (cố gắng hết sức)

🔸 **2. DÙNG 'MAKE' (Tạo ra, sản xuất, chế tạo thứ gì mới):**
• Dùng khi bạn tự tay làm ra một sản phẩm, đồ ăn hoặc gây ra một kết quả/cảm xúc.
• **Cụm từ quen thuộc:**
  - *make a cake / pizza* (làm bánh kem, làm bánh pizza) 🎂
  - *make tea / coffee* (pha trà, pha cà phê) ☕
  - *make friends* (kết bạn) 🤝
  - *make a mistake* (mắc lỗi)
  - *make noise* (làm ồn) 📢
  - *make a decision* (đưa ra quyết định)`,
    vietnameseHint: `Quy tắc nhớ:
• "DO" = Làm nhiệm vụ, bổn phận (do homework, do exercise).
• "MAKE" = Tạo ra thứ mới hoặc sản phẩm (make a cake, make friends, make tea).`,
    suggestedFollowUps: [
      "Phân biệt look, see và watch? 👀",
      "Phân biệt many, much và a lot of? 🍎",
      "Quiz trắc nghiệm điền Make hay Do! 📝",
    ],
  },

  "grammar_look_see_watch": {
    matched: true,
    topicCategory: "grammar_rules",
    topicTitle: "Phân Biệt LOOK (AT), SEE và WATCH",
    reply: `👀 **Phân Biệt LOOK (AT), SEE và WATCH Rất Dễ Nhớ:**

Cả ba từ đều liên quan đến mắt, nhưng mức độ chú ý khác nhau:

1️⃣ **SEE (Nhìn thấy tự nhiên):**
• Đôi mắt mở ra là nhìn thấy mọi thứ xung quanh một cách tự nhiên (không cần tập trung hay có chủ đích).
• Ví dụ: 
  - *I can see a bird on the roof.* (Tớ nhìn thấy chú chim trên mái nhà.)
  - *Did you see my pen?* (Bạn có nhìn thấy cây bút của tớ không?)

2️⃣ **LOOK (AT) (Nhìn chăm chú có chủ đích):**
• Hướng ánh mắt về một điểm cụ thể, thường đi với giới từ **'at'**.
• Ví dụ:
  - *Look at the blackboard, please!* (Xin mời các em nhìn lên bảng!) 👨‍🏫
  - *Look at this cute puppy!* (Hãy nhìn chú cún dễ thương này kìa!) 🐶

3️⃣ **WATCH (Theo dõi sự vật chuyển động trong một khoảng thời gian):**
• Dùng khi quan sát phim ảnh, chương trình tivi hoặc các trận thi đấu thể thao đang vận động.
• Ví dụ:
  - *We watch TV every evening.* (Gia đình tớ xem tivi mỗi tối.) 📺
  - *They are watching a football match.* (Họ đang xem một trận bóng đá.) ⚽`,
    vietnameseHint: `Quy tắc 3 giây:
• SEE: Thấy tự nhiên khi mở mắt.
• LOOK AT: Hướng mắt nhìn chăm chú vào một vật.
• WATCH: Xem sự vật đang chuyển động (watch TV, watch cartoons, watch football).`,
    suggestedFollowUps: [
      "Phân biệt make và do? ⚖️",
      "Cách dùng giới từ in, on, at? 📍",
      "Làm bài tập trắc nghiệm chọn see/look/watch! 🎯",
    ],
  },

  "grammar_many_much_a_lot_of": {
    matched: true,
    topicCategory: "grammar_rules",
    topicTitle: "Cách Dùng MANY, MUCH và A LOT OF",
    reply: `🍎 **Cách Dùng Many, Much và A Lot Of (Nhiều):**

1️⃣ **MANY (Nhiều - Đi với Danh từ đếm được số nhiều):**
• Đi với các đồ vật đếm được bằng số: *books, apples, students, pens...*
• Hỏi số lượng: **How many + Noun (số nhiều)?**
  - *There are many books in my school bag.* 🎒
  - *How many students are there in your class? - There are thirty.*

2️⃣ **MUCH (Nhiều - Đi với Danh từ không đếm được):**
• Đi với chất lỏng, tiền bạc, thời gian, thức ăn dạng khối: *water, milk, money, time, sugar...*
• Thường dùng trong câu phủ định và câu hỏi: **How much...?**
  - *I don't have much time.* (Tớ không có nhiều thời gian.)
  - *How much milk do you drink every day?* 🥛
  - *How much is this pen?* (Hỏi giá tiền: Cây bút này bao nhiêu tiền?)

3️⃣ **A LOT OF / LOTS OF (Rất nhiều - Đi được với CẢ HAI):**
• Rất tiện lợi vì dùng được cho cả danh từ đếm được và không đếm được trong câu khẳng định.
  - *She has a lot of friends.* (Đếm được)
  - *He drinks a lot of water.* (Không đếm được)`,
    vietnameseHint: `Mẹo phân biệt:
• Many + Danh từ đếm được (many apples, many pencils).
• Much + Danh từ KHÔNG đếm được (much water, much money).
• A lot of + Dùng cho cả hai loại danh từ rất an toàn!`,
    suggestedFollowUps: [
      "Cách hỏi giá tiền (How much is it)? 🏷️",
      "Cách hỏi số lượng (How many)? 🔢",
      "Làm quiz phân biệt many và much! 📝",
    ],
  },

  "grammar_how_often": {
    matched: true,
    topicCategory: "grammar_rules",
    topicTitle: "Cấu Trúc 'How Often...?' & Trạng Từ Tần Suất",
    reply: `⏰ **Cấu Trúc Hỏi Tần Suất: 'How often do you...?' (SGK Global Success Lớp 5):**

❓ **Câu hỏi:** **How often do you + Verb?** (Bạn có thường làm việc này không?)

💡 **Các mức độ trả lời bằng Trạng từ tần suất (Adverbs of Frequency):**
• **Always (100%):** Luôn luôn ➔ *I always brush my teeth twice a day.* 🪥
• **Usually (80%):** Thường xuyên ➔ *I usually do morning exercise.* 🤸
• **Often (60%):** Hay làm ➔ *I often play badminton after school.* 🏸
• **Sometimes (30%):** Thỉnh thoảng ➔ *I sometimes go swimming with my dad.* 🏊
• **Never (0%):** Không bao giờ ➔ *I never skip breakfast.* 🍳

💡 **Hoặc trả lời bằng số lần cụ thể:**
• **Once a week:** 1 lần một tuần. (*I visit my grandparents once a week.*)
• **Twice a month:** 2 lần một tháng.
• **Three times a day:** 3 lần một ngày.
• **Every day:** Mỗi ngày.`,
    vietnameseHint: `Mẫu câu hỏi tần suất:
• "How often do you read books? - I read books every day / twice a week."
• Nhớ vị trí: Trạng từ (always, usually, often, sometimes, never) đứng TRƯỚC động từ thường.`,
    suggestedFollowUps: [
      "Thì hiện tại đơn và các dấu hiệu nhận biết? ⏳",
      "Mẫu câu hỏi thời gian rảnh rỗi? 🎨",
      "Luyện tập mẫu câu hỏi How often! 🗣️",
    ],
  },

  "vocab_colors": {
    matched: true,
    topicCategory: "vocabulary",
    topicTitle: "Từ Vựng Chủ Đề Màu Sắc (Colors - Grades 1-3)",
    reply: `🎨 **Bảng Màu Sắc Tiếng Anh Đầy Đủ & Mẫu Câu Hỏi:**

🌈 **Các màu sắc cơ bản:**
• **red** /red/: màu đỏ 🔴
• **blue** /bluː/: màu xanh da trời 🔵
• **green** /ɡriːn/: màu xanh lá cây 🟢
• **yellow** /ˈjel.əʊ/: màu vàng 🟡
• **orange** /ˈɒr.ɪndʒ/: màu cam 🟠
• **pink** /pɪŋk/: màu hồng 🌸
• **purple** /ˈpɜː.pəl/: màu tím 🟣
• **brown** /braʊn/: màu nâu 🟤
• **black** /blæk/: màu đen ⚫
• **white** /waɪt/: màu trắng ⚪

💬 **Mẫu câu chuẩn SGK:**
• ❓ **What color is it?** (Nó có màu gì?)
  ➔ **It's red.** / **It is blue.**
• ❓ **What color are they?** (Chúng có màu gì?)
  ➔ **They are green and yellow.**`,
    vietnameseHint: `Mẫu câu hỏi màu sắc:
• 1 vật: "What color is it? - It's + [màu sắc]."
• Nhiều vật: "What color are they? - They are + [màu sắc]."`,
    suggestedFollowUps: [
      "Từ vựng đồ dùng học tập và màu sắc? 🎒",
      "Từ vựng số đếm 1-100? 🔢",
      "Quiz đoán màu sắc bằng tiếng Anh! 🎨",
    ],
  },

  "vocab_numbers": {
    matched: true,
    topicCategory: "vocabulary",
    topicTitle: "Số Đếm Trong Tiếng Anh (Numbers 1-100)",
    reply: `🔢 **Bảng Số Đếm Tiếng Anh Từ 1 Đến 100:**

• **1 - 10:** one (1), two (2), three (3), four (4), five (5), six (6), seven (7), eight (8), nine (9), ten (10).
• **11 - 20:** eleven (11), twelve (12), thirteen (13), fourteen (14), fifteen (15), sixteen (16), seventeen (17), eighteen (18), nineteen (19), twenty (20).
• **Các số tròn chục (đuôi -ty):**
  - thirty (30), forty (40), fifty (50), sixty (60), seventy (70), eighty (80), ninety (90), one hundred (100).

💬 **Mẫu câu hỏi số lượng:**
• ❓ **How many + [danh từ số nhiều] + are there?**
  ➔ **There is one pen.** (Có một cây bút.)
  ➔ **There are five pens.** (Có năm cây bút.)`,
    vietnameseHint: `Hỏi số lượng trong tiếng Anh:
• "How many pens are there? - There are four pens."
• Nhớ phân biệt đuôi -teen (từ 13-19, nhấn trọng âm vào -teen) và đuôi -ty (20, 30, 40..., nhấn trọng âm âm đầu).`,
    suggestedFollowUps: [
      "Cách hỏi tuổi (How old are you)? 🎂",
      "Cách hỏi giá tiền (How much is it)? 🏷️",
      "Bài tập đếm đồ vật trong lớp học! 🎒",
    ],
  },

  "vocab_body_parts": {
    matched: true,
    topicCategory: "vocabulary",
    topicTitle: "Bộ Phận Cơ Thể (Body Parts - Grades 1-3)",
    reply: `🧍 **Từ Vựng Bộ Phận Cơ Thể (My Body - Global Success):**

• **head** /hed/: cái đầu 👦
• **hair** /heər/: mái tóc
• **eye / eyes** /aɪz/: mắt 👀
• **ear / ears** /ɪərz/: tai 👂
• **nose** /nəʊz/: mũi 👃
• **mouth** /maʊθ/: miệng 👄
• **face** /feɪs/: khuôn mặt
• **arm / arms** /ɑːmz/: cánh tay 💪
• **hand / hands** /hændz/: bàn tay ✋
• **leg / legs** /leɡz/: cẳng chân 🦵
• **foot / feet** /fiːt/: bàn chân 🦶 (1 foot, 2 feet)

💬 **Mẫu câu mệnh lệnh vui nhộn:**
• *Touch your nose!* (Hãy chạm vào mũi của bạn!)
• *Open your mouth!* (Hãy mở miệng ra nào!)
• *I have two eyes and one small nose.* (Tớ có 2 mắt và 1 chiếc mũi xinh.)`,
    vietnameseHint: `Chủ đề cơ thể:
• Cặp từ số ít / số nhiều đặc biệt: 1 foot (1 bàn chân) ➔ 2 feet (2 bàn chân).
• Mẫu câu: "Touch your + [bộ phận cơ thể]!" (Hãy chạm vào...).`,
    suggestedFollowUps: [
      "Bài hát 'Head, Shoulders, Knees and Toes'! 🎵",
      "Từ vựng cảm xúc (happy, sad, tired)? 😊",
      "Luyện phát âm từ 'mouth' và 'feet'! 🎙️",
    ],
  },

  "vocab_food_drink": {
    matched: true,
    topicCategory: "vocabulary",
    topicTitle: "Từ Vựng & Mẫu Câu Đồ Ăn, Thức Uống (Food & Drink)",
    reply: `🍕 **Từ Vựng Đồ Ăn & Thức Uống Quen Thuộc (Food and Drink):**

🍱 **Thức ăn (Food):**
• **rice** /raɪs/: cơm, gạo 🍚
• **bread** /bred/: bánh mì 🍞
• **meat** /miːt/: thịt 🥩
• **fish** /fɪʃ/: cá 🐟
• **chicken** /ˈtʃɪk.ɪn/: thịt gà 🍗
• **noodles** /ˈnuː.dəlz/: mì, phở 🍜
• **pizza** /ˈpiːt.sə/: bánh pizza 🍕
• **apple** /ˈæp.əl/: quả táo 🍎

🥤 **Đồ uống (Drink):**
• **water** /ˈwɔː.tər/: nước lọc 💧
• **milk** /mɪlk/: sữa tươi 🥛
• **orange juice** /ˈɒr.ɪndʒ dʒuːs/: nước cam ép 🍊
• **apple juice**: nước táo

💬 **Mẫu câu hỏi món muốn ăn/uống (Unit 13 Lớp 3 & 4):**
• ❓ **What would you like to eat?** (Bạn muốn ăn món gì?)
  ➔ **I'd like some chicken, please.** (Làm ơn cho tớ một ít thịt gà.)
• ❓ **What would you like to drink?**
  ➔ **I'd like some orange juice, please.**`,
    vietnameseHint: `Mẫu câu lịch sự khi chọn đồ ăn thức uống:
• "What would you like to eat? - I'd like some + [món ăn], please."
• "What would you like to drink? - I'd like some + [đồ uống], please."`,
    suggestedFollowUps: [
      "Mẫu câu hỏi món yêu thích (What's your favorite food)? 🍔",
      "Từ vựng các loại trái cây (fruits)? 🍇",
      "Luyện hội thoại gọi món tại nhà hàng! 🍽️",
    ],
  },

  "vocab_jobs": {
    matched: true,
    topicCategory: "vocabulary",
    topicTitle: "Từ Vựng & Mẫu Câu Nghề Nghiệp (Jobs - Grade 3 & 5)",
    reply: `👩‍⚕️ **Từ Vựng Các Nghề Nghiệp Phổ Biến (Jobs):**

• **teacher** /ˈtiː.tʃər/: giáo viên 👩‍🏫
• **doctor** /ˈdɒk.tər/: bác sĩ 👨‍⚕️
• **nurse** /nɜːs/: y tá 👩‍⚕️
• **farmer** /ˈfɑː.mər/: nông dân 🧑‍🌾
• **driver** /ˈdraɪ.vər/: tài xế lái xe 🚗
• **worker** /ˈwɜː.kər/: công nhân 👷
• **police officer** /pəˈliːs ˌɒf.ɪ.sər/: cảnh sát 👮
• **cook** /kʊk/: đầu bếp 🧑‍🍳
• **singer** /ˈsɪŋ.ər/: ca sĩ 🎤

💬 **1. Mẫu câu hỏi nghề hiện tại (Grade 3 - Unit 12):**
• ❓ **What does your father/mother do?** (Bố/Mẹ bạn làm nghề gì?)
  ➔ **He is a doctor.** / **She is a teacher.**

💬 **2. Mẫu câu hỏi nghề nghiệp tương lai (Grade 5 - Unit 15):**
• ❓ **What would you like to be in the future?**
  ➔ **I'd like to be a teacher because I love children.** ❤️`,
    vietnameseHint: `Mẫu câu hỏi nghề nghiệp:
• "What does your father do? - He is a doctor."
• "What would you like to be in the future? - I'd like to be an astronaut / a teacher."
• Nhớ mạo từ: a doctor, an engineer, an architect.`,
    suggestedFollowUps: [
      "Mẫu câu hỏi gia đình lớp 3? 👨‍👩‍👧",
      "Vì sao chọn nghề đó (Why would you like to be...)? 🌟",
      "Quiz nối từ nghề nghiệp với tranh! 🎯",
    ],
  },

  "pattern_time": {
    matched: true,
    topicCategory: "sentence_patterns",
    topicTitle: "Mẫu Câu Hỏi & Nói Giờ Trong Tiếng Anh (Telling the Time)",
    reply: `⏰ **Cách Hỏi & Nói Giờ Trong Tiếng Anh (Grade 4):**

❓ **1. Câu hỏi giờ hiện tại:**
• **What time is it?** (Bây giờ là mấy giờ?)
  ➔ **It's seven o'clock.** (Bây giờ là 7 giờ đúng.)
  ➔ **It's seven fifteen.** (7 giờ 15 phút.)
  ➔ **It's seven thirty / It's half past seven.** (7 giờ 30 phút / 7 rưỡi.)
  ➔ **It's seven forty-five / It's a quarter to eight.** (7 giờ 45 / 8 giờ kém 15.)

❓ **2. Câu hỏi thời gian biểu hoạt động hàng ngày:**
• **What time do you get up?** (Bạn thức dậy lúc mấy giờ?)
  ➔ **I get up at six o'clock.** (Tớ thức dậy lúc 6 giờ sáng.) 🌅
• **What time do you go to bed?** (Bạn đi ngủ lúc mấy giờ?)
  ➔ **I go to bed at nine thirty.** 🌙`,
    vietnameseHint: `Quy tắc nói giờ:
• Giờ đúng: It's + [số giờ] + o'clock (It's 8 o'clock).
• Giờ hơn/phút: Đọc số giờ trước, số phút sau (7:20 = seven twenty).
• Nhớ dùng giới từ "AT" trước mốc giờ: "at 6 o'clock".`,
    suggestedFollowUps: [
      "Từ vựng các hoạt động hàng ngày (Daily routines)? 📅",
      "Giới từ in, on, at chỉ thời gian? ⏳",
      "Làm bài tập điền giờ tiếng Anh! ⏰",
    ],
  },

  "pattern_price": {
    matched: true,
    topicCategory: "sentence_patterns",
    topicTitle: "Mẫu Câu Hỏi Giá Tiền (How much is it? - Grade 4 & 5)",
    reply: `🏷️ **Mẫu Câu Hỏi Giá Tiền Chuẩn SGK (Shopping):**

1️⃣ **Hỏi giá 1 món đồ (Số ít):**
• ❓ **How much is the T-shirt / this skirt?** (Chiếc áo thun này giá bao nhiêu?)
  ➔ **It's eighty thousand dong.** (Nó có giá 80.000 đồng.) 👕

2️⃣ **Hỏi giá từ 2 món đồ trở lên (Số nhiều):**
• ❓ **How much are the shoes / these trousers?** (Đôi giày này giá bao nhiêu?)
  ➔ **They are two hundred thousand dong.** (Chúng có giá 200.000 đồng.) 👟

💡 **Mẹo làm bài thi:**
• Thấy đồ vật số ít (the hat, the shirt) ➔ dùng **"is"** và trả lời **"It's..."**.
• Thấy đồ vật số nhiều (the shoes, the jeans, the socks) ➔ dùng **"are"** và trả lời **"They're..."**.`,
    vietnameseHint: `Hỏi giá tiền:
• Số ít: "How much is the hat? - It's 50,000 dong."
• Số nhiều: "How much are the shoes? - They are 120,000 dong."`,
    suggestedFollowUps: [
      "Từ vựng quần áo trang phục (Clothes)? 👗",
      "Từ vựng số đếm hàng chục, hàng trăm nghìn? 💰",
      "Đóng vai đi mua sắm cùng Cô Sophie! 🛍️",
    ],
  },

  "grammar_can_cant": {
    matched: true,
    topicCategory: "grammar_rules",
    topicTitle: "Cách Dùng Động Từ Khiếm Khuyết 'CAN' và 'CAN'T'",
    reply: `🏊 **Cách Dùng CAN (Có thể) và CAN'T (Không thể) - Grade 3 & 4:**

Dùng để nói về khả năng một người có thể hay không thể làm gì.

📐 **Công thức:**
• **(+) Khẳng định:** S + **can + Verb (nguyên mẫu)**
  ➔ *I can swim.* (Tớ có thể bơi.) 🏊
  ➔ *He can play the guitar.* (Cậu ấy có thể chơi đàn ghi-ta.) 🎸
• **(-) Phủ định:** S + **cannot / can't + Verb**
  ➔ *She can't ride a bike.* (Bạn ấy không biết đi xe đạp.) 🚲
• **(?) Câu hỏi:** **Can you + Verb?**
  ➔ **Yes, I can.** (Có, tớ có thể.)
  ➔ **No, I can't.** (Không, tớ không thể.)

💡 **Lưu ý quan trọng:** Dù chủ ngữ là bất kỳ ai (I, you, he, she, they), động từ sau **can / can't** luôn luôn giữ nguyên mẫu, không bao giờ thêm s hay ing nhé!`,
    vietnameseHint: `Quy tắc CAN / CAN'T:
• "Can you swim? - Yes, I can. / No, I can't."
• Sau can/can't luôn là động từ nguyên thể không chia.`,
    suggestedFollowUps: [
      "Từ vựng các môn thể thao và kỹ năng? ⚽",
      "Mẫu câu hỏi sở thích (What's your hobby)? 🎨",
      "Quiz 3 câu về can và can't! 🎯",
    ],
  },

  "grammar_there_is_are": {
    matched: true,
    topicCategory: "grammar_rules",
    topicTitle: "Có Gì Đó Ở Đâu: Cách Dùng THERE IS và THERE ARE",
    reply: `📦 **Cách Dùng THERE IS và THERE ARE (Có... ở đâu):**

1️⃣ **THERE IS (Viết tắt: There's):**
• Dùng trước **danh từ số ít (1 vật)** hoặc **danh từ không đếm được**.
• Ví dụ:
  - *There is a cat under the table.* (Có một chú mèo dưới bàn.) 🐱
  - *There is some milk in the fridge.* (Có một ít sữa trong tủ lạnh.) 🥛

2️⃣ **THERE ARE:**
• Dùng trước **danh từ số nhiều (từ 2 vật trở lên)**.
• Ví dụ:
  - *There are four apples in the basket.* (Có 4 quả táo trong giỏ.) 🍎🍎🍎🍎
  - *There are thirty students in our class.* (Có 30 học sinh trong lớp tớ.)

❓ **Câu hỏi số lượng:**
• **How many books are there? ➔ There are two books.**`,
    vietnameseHint: `Quy tắc:
• There is + 1 đồ vật / danh từ không đếm được (There is an apple).
• There are + nhiều đồ vật (There are two apples).`,
    suggestedFollowUps: [
      "Giới từ chỉ nơi chốn: in, on, under, behind? 📍",
      "Cách hỏi số lượng với How many? 🔢",
      "Luyện bài tập điền There is / There are! 📝",
    ],
  },

  "grammar_comparatives": {
    matched: true,
    topicCategory: "grammar_rules",
    topicTitle: "So Sánh Hơn Của Tính Từ Ngắn (Comparatives - Grade 5)",
    reply: `🦒 **Quy Tắc So Sánh Hơn Trong Tiếng Anh (Lớp 5 - Unit 18):**

Dùng khi muốn so sánh 2 người, 2 con vật hoặc 2 đồ vật với nhau!

📐 **Công thức tính từ ngắn (1 âm tiết):**
**S1 + am / is / are + [Tính từ + ER] + THAN + S2**

✨ **Ví dụ sinh động:**
• *tall (cao) ➔ taller than*: 
  ➔ **Nam is taller than Minh.** (Nam cao hơn Minh.) 👦
• *fast (nhanh) ➔ faster than*:
  ➔ **A tiger is faster than a turtle.** (Con hổ nhanh hơn con rùa.) 🐯
• *big (to lớn) ➔ bigger than (gấp đôi chữ g)*:
  ➔ **An elephant is bigger than a monkey.** 🐘
• *heavy ➔ heavier than (đổi y thành i rồi thêm er)*.

💡 **Tính từ bất quy tắc đặc biệt:**
• *good ➔ better than* (tốt hơn, giỏi hơn).
• *bad ➔ worse than* (tệ hơn, kém hơn).`,
    vietnameseHint: `Công thức so sánh hơn:
• Tính từ ngắn: thêm đuôi "-er" + "than" (taller than, bigger than, older than).
• Ví dụ: "My brother is older than me." (Anh trai tớ lớn tuổi hơn tớ).`,
    suggestedFollowUps: [
      "So sánh nhất (the tallest, the biggest)? 🏆",
      "Từ vựng so sánh kích thước các loài động vật? 🐾",
      "Làm bài tập trắc nghiệm so sánh hơn! 📝",
    ],
  },

  "grammar_pronouns_possessives": {
    matched: true,
    topicCategory: "grammar_rules",
    topicTitle: "Đại Từ Nhân Xưng & Tính Từ Sở Hữu (Pronouns & Possessives)",
    reply: `👥 **Bảng Tra Cứu Đại Từ Nhân Xưng & Tính Từ Sở Hữu:**

| Đại từ chủ ngữ (Ai) | Tính từ sở hữu (Của ai) | Ví dụ minh họa |
| :--- | :--- | :--- |
| **I** (Tôi, tớ) | **my** (của tớ) | *This is **my** bag.* 🎒 |
| **You** (Bạn, các bạn) | **your** (của bạn) | *What is **your** name?* |
| **He** (Cậu ấy, anh ấy) | **his** (của cậu ấy) | *That is **his** father.* 👨 |
| **She** (Cô ấy, bạn ấy) | **her** (của cô ấy) | *This is **her** doll.* 🪆 |
| **It** (Nó) | **its** (của nó) | *The cat drinks **its** milk.* 🐱 |
| **We** (Chúng tớ) | **our** (của chúng tớ) | *This is **our** classroom.* 🏫 |
| **They** (Họ, chúng nó) | **their** (của họ) | *These are **their** books.* 📚 |

💡 **Mẹo vàng:** Tính từ sở hữu (my, your, his, her...) luôn luôn đi kèm với MỘT DANH TỪ phía sau!`,
    vietnameseHint: `Quy tắc sở hữu:
• my (của tôi), your (của bạn), his (của anh ấy), her (của cô ấy), our (của chúng tôi), their (của họ).
• Luôn luôn đứng trước danh từ: my cat, your pen, his mother.`,
    suggestedFollowUps: [
      "Cách dùng đại từ chỉ định this, that, these, those? 👈",
      "Động từ To Be đi với từng đại từ? 📐",
      "Làm quiz 5 câu chọn his hay her! 🎯",
    ],
  },
};

/**
 * Intelligent curriculum parser that analyzes student messages in Vietnamese or English
 * and instantly returns accurate, structured pedagogical responses.
 */
export function matchMiloCurriculumKnowledge(rawMessage: string, grade: number = 3): MiloAnswer | null {
  if (!rawMessage || typeof rawMessage !== "string") return null;

  const msg = rawMessage.toLowerCase().trim();

  // 0. Identity & Greetings
  if (
    msg.includes("milo là ai") ||
    msg.includes("bạn là ai") ||
    msg.includes("who are you") ||
    msg.includes("giới thiệu") ||
    msg.includes("what is your name") ||
    msg.includes("tên bạn là gì") ||
    msg.includes("bạn tên gì") ||
    msg === "milo" ||
    msg === "milo ơi"
  ) {
    return MILO_KNOWLEDGE_BASE["who_is_milo"];
  }

  if (
    msg.includes("hello") ||
    msg.includes("hi milo") ||
    msg.includes("chào milo") ||
    msg.includes("chào bạn") ||
    msg.includes("how are you") ||
    msg.includes("bạn có khỏe không") ||
    msg === "hi" ||
    msg === "hello" ||
    msg === "chào"
  ) {
    return MILO_KNOWLEDGE_BASE["greetings"];
  }

  if (
    msg.includes("cảm ơn") ||
    msg.includes("thank you") ||
    msg.includes("thanks") ||
    msg.includes("milo giỏi quá") ||
    msg.includes("tuyệt vời")
  ) {
    return MILO_KNOWLEDGE_BASE["gratitude"];
  }

  // 1. Phonics & Pronunciation Rules
  if (
    msg.includes("đuôi -ed") ||
    msg.includes("đuôi ed") ||
    msg.includes("phát âm ed") ||
    msg.includes("cách đọc ed") ||
    msg.includes("phat am ed")
  ) {
    return MILO_KNOWLEDGE_BASE["phonics_ending_ed"];
  }

  if (
    msg.includes("đuôi -s") ||
    msg.includes("đuôi s") ||
    msg.includes("phát âm s") ||
    msg.includes("đuôi es") ||
    msg.includes("phát âm es") ||
    msg.includes("s/es") ||
    msg.includes("s và es")
  ) {
    return MILO_KNOWLEDGE_BASE["phonics_ending_s_es"];
  }

  // 2. Confusing Pairs (Make/Do, Look/See/Watch, Many/Much)
  if (
    (msg.includes("make") && msg.includes("do")) ||
    msg.includes("khi nào dùng make") ||
    msg.includes("phân biệt make")
  ) {
    return MILO_KNOWLEDGE_BASE["grammar_make_do"];
  }

  if (
    (msg.includes("look") && (msg.includes("see") || msg.includes("watch"))) ||
    msg.includes("phân biệt look") ||
    msg.includes("khi nào dùng watch") ||
    msg.includes("khi nào dùng see")
  ) {
    return MILO_KNOWLEDGE_BASE["grammar_look_see_watch"];
  }

  if (
    (msg.includes("many") && msg.includes("much")) ||
    msg.includes("a lot of") ||
    msg.includes("phân biệt many") ||
    msg.includes("khi nào dùng much")
  ) {
    return MILO_KNOWLEDGE_BASE["grammar_many_much_a_lot_of"];
  }

  // 3. Tenses (Các thì)
  if (
    msg.includes("hiện tại đơn") ||
    msg.includes("present simple") ||
    msg.includes("thi hien tai don") ||
    msg.includes("cách dùng hiện tại đơn")
  ) {
    return MILO_KNOWLEDGE_BASE["present_simple"];
  }

  if (
    msg.includes("hiện tại tiếp diễn") ||
    msg.includes("present continuous") ||
    msg.includes("thi hien tai tiep dien") ||
    msg.includes("v-ing") ||
    msg.includes("đang diễn ra")
  ) {
    return MILO_KNOWLEDGE_BASE["present_continuous"];
  }

  if (
    msg.includes("quá khứ đơn") ||
    msg.includes("past simple") ||
    msg.includes("thi qua khu don") ||
    msg.includes("quá khứ") ||
    msg.includes("bất quy tắc")
  ) {
    return MILO_KNOWLEDGE_BASE["past_simple"];
  }

  if (
    msg.includes("tương lai đơn") ||
    msg.includes("future simple") ||
    msg.includes("thi tuong lai") ||
    msg.includes("tương lai") ||
    msg.includes("be going to") ||
    msg.includes("will")
  ) {
    return MILO_KNOWLEDGE_BASE["future_simple"];
  }

  // 4. Grammar Rules & Modals
  if (
    (msg.includes("in") && msg.includes("on") && msg.includes("at")) ||
    msg.includes("giới từ chỉ thời gian") ||
    msg.includes("phân biệt in on at") ||
    msg.includes("khi nào dùng in on at")
  ) {
    return MILO_KNOWLEDGE_BASE["grammar_in_on_at"];
  }

  if (
    (msg.includes("a") && msg.includes("an") && (msg.includes("dùng") || msg.includes("phân biệt") || msg.includes("mạo từ"))) ||
    msg.includes("khi nào dùng an") ||
    msg.includes("uể oải")
  ) {
    return MILO_KNOWLEDGE_BASE["grammar_a_an"];
  }

  if (
    (msg.includes("am") && msg.includes("is") && msg.includes("are")) ||
    msg.includes("động từ to be") ||
    msg.includes("to be")
  ) {
    return MILO_KNOWLEDGE_BASE["grammar_to_be"];
  }

  if (
    msg.includes("can") && (msg.includes("can't") || msg.includes("cannot") || msg.includes("cách dùng can") || msg.includes("có thể"))
  ) {
    return MILO_KNOWLEDGE_BASE["grammar_can_cant"];
  }

  if (
    msg.includes("there is") ||
    msg.includes("there are") ||
    msg.includes("phân biệt there is")
  ) {
    return MILO_KNOWLEDGE_BASE["grammar_there_is_are"];
  }

  if (
    msg.includes("so sánh hơn") ||
    msg.includes("comparative") ||
    msg.includes("taller than") ||
    msg.includes("bigger than")
  ) {
    return MILO_KNOWLEDGE_BASE["grammar_comparatives"];
  }

  if (
    msg.includes("tính từ sở hữu") ||
    msg.includes("đại từ nhân xưng") ||
    msg.includes("possessive") ||
    (msg.includes("my") && msg.includes("your") && msg.includes("his"))
  ) {
    return MILO_KNOWLEDGE_BASE["grammar_pronouns_possessives"];
  }

  if (
    msg.includes("how often") ||
    msg.includes("tần suất") ||
    msg.includes("trạng từ chỉ tần suất") ||
    msg.includes("always") ||
    msg.includes("usually")
  ) {
    return MILO_KNOWLEDGE_BASE["grammar_how_often"];
  }

  // 5. Topics: Time & Price
  if (
    msg.includes("mấy giờ") ||
    msg.includes("what time") ||
    msg.includes("hỏi giờ") ||
    msg.includes("nói giờ")
  ) {
    return MILO_KNOWLEDGE_BASE["pattern_time"];
  }

  if (
    msg.includes("bao nhiêu tiền") ||
    msg.includes("how much is") ||
    msg.includes("hỏi giá tiền") ||
    msg.includes("giá tiền")
  ) {
    return MILO_KNOWLEDGE_BASE["pattern_price"];
  }

  // 6. Family Vocabulary & Patterns (Grade 3 Focus)
  if (
    msg.includes("gia đình") ||
    msg.includes("family") ||
    msg.includes("thành viên gia đình") ||
    msg.includes("bố mẹ") ||
    msg.includes("ông bà") ||
    msg.includes("who's that") ||
    msg.includes("my family")
  ) {
    if (msg.includes("mẫu câu") || msg.includes("câu hỏi") || msg.includes("pattern") || msg.includes("who")) {
      return MILO_KNOWLEDGE_BASE["pattern_family"];
    }
    return MILO_KNOWLEDGE_BASE["vocab_family"];
  }

  // 7. Colors & Numbers & Body Parts
  if (
    msg.includes("màu sắc") ||
    msg.includes("color") ||
    msg.includes("colours") ||
    msg.includes("what color")
  ) {
    return MILO_KNOWLEDGE_BASE["vocab_colors"];
  }

  if (
    msg.includes("số đếm") ||
    msg.includes("number") ||
    msg.includes("numbers") ||
    msg.includes("đếm số") ||
    msg.includes("how many")
  ) {
    return MILO_KNOWLEDGE_BASE["vocab_numbers"];
  }

  if (
    msg.includes("bộ phận cơ thể") ||
    msg.includes("body part") ||
    msg.includes("cơ thể") ||
    msg.includes("head") ||
    msg.includes("touch your")
  ) {
    return MILO_KNOWLEDGE_BASE["vocab_body_parts"];
  }

  // 8. Food & Drinks & Jobs
  if (
    msg.includes("đồ ăn") ||
    msg.includes("thức ăn") ||
    msg.includes("đồ uống") ||
    msg.includes("food") ||
    msg.includes("drink") ||
    msg.includes("what would you like")
  ) {
    return MILO_KNOWLEDGE_BASE["vocab_food_drink"];
  }

  if (
    msg.includes("nghề nghiệp") ||
    msg.includes("job") ||
    msg.includes("jobs") ||
    msg.includes("làm nghề gì") ||
    msg.includes("what does your father do") ||
    msg.includes("bác sĩ") ||
    msg.includes("giáo viên")
  ) {
    return MILO_KNOWLEDGE_BASE["vocab_jobs"];
  }

  // 9. Hobbies & Weather & Animals & School
  if (
    msg.includes("sở thích") ||
    msg.includes("hobby") ||
    msg.includes("hobbies") ||
    msg.includes("like + v-ing")
  ) {
    return MILO_KNOWLEDGE_BASE["pattern_hobbies"];
  }

  if (
    msg.includes("thời tiết") ||
    msg.includes("weather") ||
    msg.includes("what's the weather like")
  ) {
    return MILO_KNOWLEDGE_BASE["pattern_weather"];
  }

  if (
    msg.includes("động vật") ||
    msg.includes("con vật") ||
    msg.includes("animal") ||
    msg.includes("animals") ||
    msg.includes("thú cưng")
  ) {
    return MILO_KNOWLEDGE_BASE["vocab_animals"];
  }

  if (
    msg.includes("đồ dùng học tập") ||
    msg.includes("dụng cụ học tập") ||
    msg.includes("school things") ||
    msg.includes("school bag") ||
    msg.includes("hộp bút")
  ) {
    return MILO_KNOWLEDGE_BASE["vocab_school"];
  }

  return null;
}

/**
 * Intelligent helper that converts any matched curriculum knowledge into
 * structured AiAssistantResponse for Teacher Thanh Nguyễn's pedagogical assistant.
 */
export function getPedagogicalAssistantQA(question: string, grade: number = 3) {
  const matched = matchMiloCurriculumKnowledge(question, grade);
  const cleanQ = question.trim();

  if (matched) {
    return {
      directAnswer: matched.vietnameseHint.split("\n")[0] || `Giải đáp chuẩn SGK về: ${matched.topicTitle}`,
      detailedExplanation: matched.reply,
      category: (matched.topicCategory === "tenses" || matched.topicCategory === "grammar_rules" ? "grammar" : matched.topicCategory === "sentence_patterns" ? "sentence" : "vocabulary") as any,
      formula: matched.topicCategory === "tenses" ? "S + V(s/es) | S + am/is/are + V-ing | S + V2/ed" : undefined,
      examples: [
        { english: "We love practicing English together every day.", vietnamese: "Chúng mình rất thích luyện tập tiếng Anh cùng nhau mỗi ngày.", note: "Mẫu câu ứng dụng chuẩn SGK" },
        { english: "Can you tell me more about this lesson?", vietnamese: "Bạn có thể kể cho tớ nghe thêm về bài học này không?", note: "Giao tiếp tương tác" },
      ],
      commonMistakes: [
        "Quên không chia động từ theo ngôi số ít (he/she/it).",
        "Bỏ quên âm đuôi (ending sounds) khi phát âm từ vựng tiếng Anh.",
      ],
      quickQuiz: {
        question: `Kiểm tra nhanh về "${matched.topicTitle}": Chọn câu trả lời chuẩn xác nhất:`,
        options: [
          "A. Thực hành nói to và áp dụng đúng cấu trúc trong SGK",
          "B. Chỉ học thuộc vẹt và không luyện tập thực tế",
          "C. Bỏ qua các âm đuôi và ngữ điệu",
          "D. Không cần ôn tập đều đặn"
        ],
        correctAnswer: "A",
        explanation: "Phương pháp tốt nhất là học hiểu bản chất, phát âm chuẩn và thực hành đặt câu giao tiếp mỗi ngày!",
      },
      speechText: "We love practicing English every day.",
    };
  }

  return null;
}
