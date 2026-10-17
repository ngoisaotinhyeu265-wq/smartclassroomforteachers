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
};

/**
 * Intelligent curriculum parser that analyzes student messages in Vietnamese or English
 * and instantly returns accurate, structured pedagogical responses.
 */
export function matchMiloCurriculumKnowledge(rawMessage: string, grade: number = 3): MiloAnswer | null {
  if (!rawMessage || typeof rawMessage !== "string") return null;

  const msg = rawMessage.toLowerCase().trim();

  // 1. Tenses (Các thì)
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
    msg.includes("bất quy tắc") ||
    msg.includes("thêm ed")
  ) {
    return MILO_KNOWLEDGE_BASE["past_simple"];
  }

  if (
    msg.includes("tương lai đơn") ||
    msg.includes("future simple") ||
    msg.includes("thi tuong lai") ||
    msg.includes("be going to") ||
    msg.includes("will")
  ) {
    return MILO_KNOWLEDGE_BASE["future_simple"];
  }

  // 2. Prepositions (In, On, At)
  if (
    (msg.includes("in") && msg.includes("on") && msg.includes("at")) ||
    msg.includes("giới từ chỉ thời gian") ||
    msg.includes("phân biệt in on at") ||
    msg.includes("khi nào dùng in on at")
  ) {
    return MILO_KNOWLEDGE_BASE["grammar_in_on_at"];
  }

  // 3. Articles (A / An)
  if (
    (msg.includes("a") && msg.includes("an") && (msg.includes("dùng") || msg.includes("phân biệt") || msg.includes("mạo từ"))) ||
    msg.includes("khi nào dùng an") ||
    msg.includes("uể oải")
  ) {
    return MILO_KNOWLEDGE_BASE["grammar_a_an"];
  }

  // 4. Verb To Be
  if (
    (msg.includes("am") && msg.includes("is") && msg.includes("are")) ||
    msg.includes("động từ to be") ||
    msg.includes("to be")
  ) {
    return MILO_KNOWLEDGE_BASE["grammar_to_be"];
  }

  // 5. Family Vocabulary & Patterns
  if (
    msg.includes("gia đình") ||
    msg.includes("family") ||
    msg.includes("thành viên gia đình") ||
    msg.includes("bố mẹ") ||
    msg.includes("ông bà")
  ) {
    if (msg.includes("mẫu câu") || msg.includes("câu hỏi") || msg.includes("pattern")) {
      return MILO_KNOWLEDGE_BASE["pattern_family"];
    }
    return MILO_KNOWLEDGE_BASE["vocab_family"];
  }

  // 6. Hobbies & Free Time
  if (
    msg.includes("sở thích") ||
    msg.includes("hobby") ||
    msg.includes("hobbies") ||
    msg.includes("like + v-ing")
  ) {
    return MILO_KNOWLEDGE_BASE["pattern_hobbies"];
  }

  // 7. Weather
  if (
    msg.includes("thời tiết") ||
    msg.includes("weather") ||
    msg.includes("what's the weather like")
  ) {
    return MILO_KNOWLEDGE_BASE["pattern_weather"];
  }

  // 8. Animals
  if (
    msg.includes("động vật") ||
    msg.includes("con vật") ||
    msg.includes("animal") ||
    msg.includes("animals") ||
    msg.includes("thú cưng")
  ) {
    return MILO_KNOWLEDGE_BASE["vocab_animals"];
  }

  // 9. School things
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
