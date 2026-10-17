import { SophieSpeakingTopic, GradeLevel } from "../types";
import {
  GRADE_1_UNITS,
  GRADE_2_UNITS,
  GRADE_3_UNITS,
  GRADE_4_UNITS,
  GRADE_5_UNITS,
} from "./curriculum";

/**
 * Builds authentic, age-appropriate Teacher Sophie speaking topics
 * directly matching every single Unit in the official Global Success primary textbook.
 * Grade 1: 16 Units (Age 6)
 * Grade 2: 16 Units (Age 7)
 * Grade 3: 20 Units (Age 8)
 * Grade 4: 20 Units (Age 9)
 * Grade 5: 20 Units (Age 10-11)
 * Total: 92 Curriculum Units
 */

interface UnitQuestionPreset {
  q1: string;
  q1Vi: string;
  a1: string;
  a1Vi: string;
  q2: string;
  q2Vi: string;
  a2: string;
  q3: string;
  q3Vi: string;
  a3: string;
}

// Curated dialogues for Grade 1 (Age 6 - Nhận diện, phản xạ từ đơn, câu chào hỏi ngắn)
const GRADE_1_DIALOGUES: Record<number, UnitQuestionPreset> = {
  1: {
    q1: "Hi little friend! I am Teacher Sophie. What is your name?",
    q1Vi: "Xin chào con! Cô là cô giáo Sophie. Tên của con là gì?",
    a1: "Hello Teacher Sophie! My name is Nam.",
    a1Vi: "Xin chào cô Sophie! Con tên là Nam ạ.",
    q2: "Look at the school playground! What can you see?",
    q2Vi: "Hãy nhìn vào sân trường nào! Con nhìn thấy những gì?",
    a2: "I can see a book, a bag, and a red ball.",
    q3: "Can you say: \"Let's play with the ball\"?",
    q3Vi: "Con có thể nói câu rủ bạn chơi: \"Let's play with the ball\" được không?",
    a3: "Let's play with the ball!",
  },
  2: {
    q1: "Welcome to the dining room! Look, do you have a cake or a cup?",
    q1Vi: "Chào mừng con vào phòng ăn! Con nhìn kìa, con có bánh ngọt hay cái cốc không?",
    a1: "I have a sweet cake and a cup.",
    a1Vi: "Con có một chiếc bánh ngọt và một cái tách ạ.",
    q2: "Look at the cute animal under the chair! What is it?",
    q2Vi: "Nhìn con vật dễ thương dưới ghế kìa! Đó là con gì nhỉ?",
    a2: "Look at the cat! It is a cute cat.",
    q3: "Can you say: \"I like cake\" to Teacher Sophie?",
    q3Vi: "Con hãy nói với cô Sophie: \"I like cake\" nhé!",
    a3: "I like cake!",
  },
  3: {
    q1: "We are at the street market! What fruit can you see?",
    q1Vi: "Chúng mình đang ở chợ phố! Con nhìn thấy quả gì nào?",
    a1: "I can see apples and mangoes.",
    a1Vi: "Con thấy táo và xoài ạ.",
    q2: "Look at the fresh red apples! How many apples do you see?",
    q2Vi: "Hãy nhìn những quả táo đỏ tươi kìa! Con thấy bao nhiêu quả táo?",
    a2: "Two apples, please!",
    q3: "Can you say: \"An apple for me, please\"?",
    q3Vi: "Con hãy nói câu mua hàng: \"An apple for me, please\" nào!",
    a3: "An apple for me, please!",
  },
  4: {
    q1: "Welcome to my bedroom! What is on the bed?",
    q1Vi: "Chào mừng con vào phòng ngủ! Trên giường có đồ vật gì nào?",
    a1: "There is a red teddy bear on the bed.",
    a1Vi: "Có một chú gấu bông màu đỏ trên giường ạ.",
    q2: "Can you open your school bag and tell me what is inside?",
    q2Vi: "Con mở cặp sách ra và nói cho cô biết bên trong có gì nhé?",
    a2: "I have a book and a ball in my bag.",
    q3: "Let's say together: \"Good night, bedroom!\"",
    q3Vi: "Chúng mình cùng chúc ngủ ngon: \"Good night, bedroom!\" nào!",
    a3: "Good night, bedroom!",
  },
  5: {
    q1: "Look, we are at the fish pond! Can you see the duck or the fish?",
    q1Vi: "Nhìn kìa, chúng mình đang ở ao cá! Con có nhìn thấy chú vịt hay con cá không?",
    a1: "I can see a yellow duck and a fish.",
    a1Vi: "Con nhìn thấy một chú vịt vàng và một chú cá ạ.",
    q2: "What sound does a duck make? Can you say \"quack quack\"?",
    q2Vi: "Chú vịt kêu như thế nào nhỉ? Con hãy phát âm \"quack quack\" nhé!",
    a2: "Quack, quack! The duck swims in the pond.",
    q3: "Can you say: \"Look at the duck\"?",
    q3Vi: "Con hãy nói câu: \"Look at the duck\" nào!",
    a3: "Look at the duck!",
  },
  6: {
    q1: "Welcome to our classroom! What do you have on your desk?",
    q1Vi: "Chào mừng con vào lớp học! Trên bàn học con có những gì?",
    a1: "I have a pencil, a book, and an eraser.",
    a1Vi: "Con có một chiếc bút chì, một cuốn sách và một cục tẩy ạ.",
    q2: "Stand up and sit down! Can you say: \"Stand up, please\"?",
    q2Vi: "Đứng lên và ngồi xuống nào! Con hãy nói câu: \"Stand up, please\" nhé!",
    a2: "Stand up, please!",
    q3: "Are you happy in your classroom today?",
    q3Vi: "Hôm nay con có vui khi ở trong lớp học không?",
    a3: "Yes, I am very happy in my classroom!",
  },
  7: {
    q1: "In the garden! Can you see the green tree and the red flowers?",
    q1Vi: "Trong khu vườn! Con có nhìn thấy cây xanh và những bông hoa đỏ không?",
    a1: "Yes, I see a tall tree and red flowers.",
    a1Vi: "Vâng, con nhìn thấy một cây cao và hoa đỏ ạ.",
    q2: "What is that flying in the garden? Is it a bird or a bee?",
    q2Vi: "Cái gì đang bay trong vườn thế kia? Đó là chú chim hay chú ong?",
    a2: "It is a little bird singing in the tree.",
    q3: "Can you say: \"I love the garden\"?",
    q3Vi: "Con hãy nói câu: \"I love the garden\" nhé!",
    a3: "I love the garden!",
  },
  8: {
    q1: "In the park! What fun games can we play in the park?",
    q1Vi: "Ở công viên! Chúng mình có thể chơi những trò chơi thú vị nào ở công viên?",
    a1: "We can run, skip, and play with a ball.",
    a1Vi: "Chúng mình có thể chạy, nhảy dây và chơi bóng ạ.",
    q2: "Look at the children running! Can you run fast?",
    q2Vi: "Nhìn các bạn đang chạy kìa! Con có thể chạy nhanh không?",
    a2: "Yes, I can run very fast!",
    q3: "Let's say together: \"Let's play in the park!\"",
    q3Vi: "Chúng mình cùng reo lên: \"Let's play in the park!\" nào!",
    a3: "Let's play in the park!",
  },
  9: {
    q1: "In the shop! What delicious things can we buy in the shop?",
    q1Vi: "Trong cửa hàng! Chúng mình có thể mua những món ngon gì trong cửa hàng?",
    a1: "We can buy milk, bread, and sweet candy.",
    a1Vi: "Chúng mình có thể mua sữa, bánh mì và kẹo ngọt ạ.",
    q2: "Do you like sweet candy or fresh milk?",
    q2Vi: "Con thích kẹo ngọt hay sữa tươi nào?",
    a2: "I like fresh milk and apples.",
    q3: "Can you say politely: \"Can I have milk, please\"?",
    q3Vi: "Con hãy nói lịch sự: \"Can I have milk, please\" nhé!",
    a3: "Can I have milk, please!",
  },
  10: {
    q1: "At the zoo! What wild animal do you see first?",
    q1Vi: "Tại vườn bách thú! Con nhìn thấy con vật hoang dã nào đầu tiên?",
    a1: "I see a big elephant and a monkey.",
    a1Vi: "Con nhìn thấy một chú voi to và một chú khỉ ạ.",
    q2: "Can you roar like a lion or jump like a monkey?",
    q2Vi: "Con có thể gầm như sư tử hay nhảy nhót như chú khỉ không?",
    a2: "I can jump like a funny monkey!",
    q3: "Let's say: \"Look at the funny monkey!\"",
    q3Vi: "Con hãy nói câu: \"Look at the funny monkey!\" nào!",
    a3: "Look at the funny monkey!",
  },
  11: {
    q1: "Look at the colors! What color is your shirt today?",
    q1Vi: "Hãy nhìn vào các màu sắc nào! Hôm nay áo của con màu gì?",
    a1: "My shirt is bright blue and white.",
    a1Vi: "Áo của con màu xanh dương tươi sáng và màu trắng ạ.",
    q2: "Is the sun yellow or blue?",
    q2Vi: "Mặt trời màu vàng hay màu xanh dương hả con?",
    a2: "The sun is bright yellow!",
    q3: "Can you say: \"I love bright colors\"?",
    q3Vi: "Con hãy nói câu: \"I love bright colors\" nhé!",
    a3: "I love bright colors!",
  },
  12: {
    q1: "Count with me! How many fingers do you have on two hands?",
    q1Vi: "Cùng đếm với cô nhé! Con có bao nhiêu ngón tay trên hai bàn tay?",
    a1: "I have ten fingers on my two hands.",
    a1Vi: "Con có mười ngón tay trên hai bàn tay ạ.",
    q2: "Can you count from one to five for Teacher Sophie?",
    q2Vi: "Con hãy đếm từ 1 đến 5 cho cô Sophie nghe nhé!",
    a2: "One, two, three, four, five!",
    q3: "Awesome! Let's say: \"I can count numbers!\"",
    q3Vi: "Tuyệt quá! Chúng mình cùng nói: \"I can count numbers!\" nào!",
    a3: "I can count numbers!",
  },
  13: {
    q1: "In the kitchen! What does your mother cook in the kitchen?",
    q1Vi: "Trong nhà bếp! Mẹ con nấu những món ăn gì trong bếp?",
    a1: "My mother cooks rice, soup, and fish.",
    a1Vi: "Mẹ con nấu cơm, canh và cá ạ.",
    q2: "Do you help your mother wash fruits?",
    q2Vi: "Con có giúp mẹ rửa hoa quả không?",
    a2: "Yes, I help wash apples and oranges.",
    q3: "Can you say: \"Yummy food in the kitchen!\"?",
    q3Vi: "Con hãy reo lên: \"Yummy food in the kitchen!\" nào!",
    a3: "Yummy food in the kitchen!",
  },
  14: {
    q1: "Look at the vehicles! Do you ride a bike or go by bus to school?",
    q1Vi: "Nhìn các phương tiện giao thông kìa! Con đi xe đạp hay đi xe buýt đến trường?",
    a1: "I go to school by bicycle.",
    a1Vi: "Con đi học bằng xe đạp ạ.",
    q2: "What color is your bicycle?",
    q2Vi: "Xe đạp của con màu gì thế?",
    a2: "My bicycle is blue and silver.",
    q3: "Can you say: \"Beep beep! The car is coming!\"?",
    q3Vi: "Con hãy nói vui: \"Beep beep! The car is coming!\" nào!",
    a3: "Beep beep! The car is coming!",
  },
  15: {
    q1: "On the farm! What animals live on the farm?",
    q1Vi: "Trên nông trại! Những con vật nào sống trên nông trại?",
    a1: "There are cows, pigs, horses, and ducks.",
    a1Vi: "Có bò sữa, lợn, ngựa và vịt ạ.",
    q2: "What sound does a cow make? Does it say \"Moo moo\"?",
    q2Vi: "Con bò kêu như thế nào nhỉ? Có phải kêu \"Moo moo\" không?",
    a2: "Moo moo! The big cow gives sweet milk.",
    q3: "Let's say together: \"Old MacDonald had a farm!\"",
    q3Vi: "Chúng mình cùng hát vui: \"Old MacDonald had a farm!\" nhé!",
    a3: "Old MacDonald had a farm!",
  },
  16: {
    q1: "At the school gala! Are you wearing a pretty hat today?",
    q1Vi: "Tại lễ hội trường! Hôm nay con có đội chiếc mũ xinh xắn không?",
    a1: "Yes, I wear a colorful party hat.",
    a1Vi: "Vâng, con đội một chiếc mũ tiệc tùng rực rỡ ạ.",
    q2: "Can you sing and dance on the school stage?",
    q2Vi: "Con có thể hát và múa trên sân khấu trường không?",
    a2: "Yes, I can sing English songs happily!",
    q3: "Let's say loudly: \"Happy school gala, everyone!\"",
    q3Vi: "Chúng mình cùng hô to: \"Happy school gala, everyone!\" nào!",
    a3: "Happy school gala, everyone!",
  },
};

// Curated dialogues for Grade 2 (Age 7 - Câu hỏi đơn giản, sở thích, thức ăn, gia đình, thiên nhiên)
const GRADE_2_DIALOGUES: Record<number, UnitQuestionPreset> = {
  1: {
    q1: "Happy birthday! Welcome to the birthday party! Do you like popcorn and pizza?",
    q1Vi: "Chúc mừng sinh nhật! Chào mừng con đến bữa tiệc! Con có thích bắp rang bơ và bánh pizza không?",
    a1: "Yes, I do! I like yummy popcorn and pizza.",
    a1Vi: "Có chứ ạ! Con thích bắp rang bơ và bánh pizza rất ngon.",
    q2: "Can you ask politely: \"Pass me the pasta, please\"?",
    q2Vi: "Con có thể hỏi lịch sự: \"Pass me the pasta, please\" được không?",
    a2: "Pass me the pasta, please!",
    q3: "What sweet dessert do you want on your birthday?",
    q3Vi: "Con muốn món tráng miệng ngọt ngào nào trong ngày sinh nhật của mình?",
    a3: "I want a big chocolate birthday cake!",
  },
  2: {
    q1: "Look into the backyard! Can you see a kitten or a puppy?",
    q1Vi: "Hãy nhìn vào sân sau nhà! Con có nhìn thấy một chú mèo con hay chú cún con không?",
    a1: "I can see a cute kitten playing in the grass.",
    a1Vi: "Con nhìn thấy một chú mèo con đang chơi trên cỏ ạ.",
    q2: "What is the kitten doing in the backyard?",
    q2Vi: "Chú mèo con đang làm gì ở sân sau thế con?",
    a2: "It is chasing a little butterfly.",
    q3: "Can you say: \"The kitten is very cute!\"?",
    q3Vi: "Con hãy nói câu: \"The kitten is very cute!\" nào!",
    a3: "The kitten is very cute!",
  },
  3: {
    q1: "We are at the seaside! What are you doing on the beach?",
    q1Vi: "Chúng mình đang ở bãi biển! Con đang làm gì trên bờ biển thế?",
    a1: "I am swimming and making a sandcastle.",
    a1Vi: "Con đang bơi và xây lâu đài cát ạ.",
    q2: "Look at the blue sea! Can you see a sailing boat?",
    q2Vi: "Hãy nhìn vào biển xanh kìa! Con có thấy chiếc thuyền buồm không?",
    a2: "Yes, I see a white boat on the water.",
    q3: "Let's say together: \"The sea is beautiful and cool!\"",
    q3Vi: "Chúng mình cùng reo lên: \"The sea is beautiful and cool!\" nhé!",
    a3: "The sea is beautiful and cool!",
  },
  4: {
    q1: "In the countryside! Do you see the rainbow in the sky?",
    q1Vi: "Ở miền quê thanh bình! Con có nhìn thấy cầu vồng trên bầu trời không?",
    a1: "Yes, I see a colorful rainbow after the rain.",
    a1Vi: "Vâng, con thấy cầu vồng rực rỡ sau cơn mưa ạ.",
    q2: "What animals are walking along the road in the village?",
    q2Vi: "Những con vật nào đang đi dọc con đường làng thế?",
    a2: "There is a river and cows eating grass.",
    q3: "Can you say: \"I love the peaceful countryside!\"?",
    q3Vi: "Con hãy nói câu: \"I love the peaceful countryside!\" nào!",
    a3: "I love the peaceful countryside!",
  },
  5: {
    q1: "In our classroom! Where is your school ruler and notebook?",
    q1Vi: "Trong lớp học của chúng mình! Thước kẻ và vở của con ở đâu nào?",
    a1: "They are on my wooden desk.",
    a1Vi: "Chúng ở trên bàn gỗ của con ạ.",
    q2: "What color is your favorite pencil case?",
    q2Vi: "Hộp bút yêu thích của con màu gì thế?",
    a2: "My pencil case is bright yellow and green.",
    q3: "Can you say: \"This is my notebook!\"?",
    q3Vi: "Con hãy nói câu: \"This is my notebook!\" nhé!",
    a3: "This is my notebook!",
  },
  6: {
    q1: "On the farm! What does the horse do in the field?",
    q1Vi: "Ở nông trại! Chú ngựa đang làm gì trên cánh đồng?",
    a1: "The horse is running fast across the field.",
    a1Vi: "Chú ngựa đang phi nhanh qua cánh đồng ạ.",
    q2: "Do you like drinking fresh cow milk in the morning?",
    q2Vi: "Con có thích uống sữa bò tươi vào buổi sáng không?",
    a2: "Yes, I love drinking fresh warm milk.",
    q3: "Let's say: \"The horse runs very fast!\"",
    q3Vi: "Con hãy nói câu: \"The horse runs very fast!\" nào!",
    a3: "The horse runs very fast!",
  },
  7: {
    q1: "In the kitchen! What is cooking in the cooking pot?",
    q1Vi: "Trong nhà bếp! Trong nồi nấu đang sôi món gì thơm thế con?",
    a1: "My grandmother is making delicious chicken soup.",
    a1Vi: "Bà con đang nấu súp gà thơm ngon ạ.",
    q2: "Can you help wash the spoons and plates?",
    q2Vi: "Con có thể giúp rửa thìa và đĩa ăn không?",
    a2: "Yes, I can wash the spoons carefully.",
    q3: "Can you say: \"The soup smells delicious!\"?",
    q3Vi: "Con hãy nói câu khen: \"The soup smells delicious!\" nhé!",
    a3: "The soup smells delicious!",
  },
  8: {
    q1: "In the village! Who is riding a bicycle on the village road?",
    q1Vi: "Ở ngôi làng! Ai đang đạp xe trên con đường làng thế?",
    a1: "My friends are riding bikes under the sunshine.",
    a1Vi: "Các bạn con đang đạp xe dưới ánh nắng ạ.",
    q2: "What fruit trees grow around your village?",
    q2Vi: "Những cây ăn quả nào mọc quanh ngôi làng của con?",
    a2: "There are banana trees and orange trees.",
    q3: "Let's say: \"Our village is so pretty!\"",
    q3Vi: "Chúng mình cùng nói: \"Our village is so pretty!\" nào!",
    a3: "Our village is so pretty!",
  },
  9: {
    q1: "In the grocery store! What fruits would you like to buy?",
    q1Vi: "Trong cửa hàng tạp hóa! Con muốn mua những loại quả nào?",
    a1: "I would like some grapes and sweet strawberries.",
    a1Vi: "Con muốn mua một ít nho và dâu tây ngọt ạ.",
    q2: "How much are the fresh oranges?",
    q2Vi: "Những quả cam tươi giá bao nhiêu vậy con?",
    a2: "They are fresh and sweet. I want three oranges.",
    q3: "Can you say: \"Here is your money, thank you!\"?",
    q3Vi: "Con hãy nói câu thanh toán: \"Here is your money, thank you!\" nhé!",
    a3: "Here is your money, thank you!",
  },
  10: {
    q1: "At the zoo! What animal has a very long neck?",
    q1Vi: "Tại sở thú! Con vật nào có chiếc cổ rất dài nhỉ?",
    a1: "The tall giraffe has a very long neck.",
    a1Vi: "Chú hươu cao cổ có chiếc cổ rất dài ạ.",
    q2: "Do you like watching the monkeys swinging in the trees?",
    q2Vi: "Con có thích xem những chú khỉ chuyền cành trên cây không?",
    a2: "Yes, they are funny and love eating bananas.",
    q3: "Can you say: \"Look at the tall giraffe!\"?",
    q3Vi: "Con hãy nói câu: \"Look at the tall giraffe!\" nào!",
    a3: "Look at the tall giraffe!",
  },
  11: {
    q1: "In the school playground! What game are you playing with your friends?",
    q1Vi: "Trong sân chơi trường học! Con đang chơi trò gì cùng các bạn thế?",
    a1: "We are playing tag and skipping rope.",
    a1Vi: "Chúng con đang chơi đuổi bắt và nhảy dây ạ.",
    q2: "Can you kick the football into the goal?",
    q2Vi: "Con có thể sút bóng vào khung thành không?",
    a2: "Yes, I can score a great goal!",
    q3: "Let's shout happily: \"We are having so much fun!\"",
    q3Vi: "Chúng mình cùng reo vui: \"We are having so much fun!\" nhé!",
    a3: "We are having so much fun!",
  },
  12: {
    q1: "At the cafe! What sweet drink do you want to order?",
    q1Vi: "Tại quán cà phê và trà sữa! Con muốn gọi món đồ uống ngọt ngào nào?",
    a1: "I would like an orange juice and a cupcake.",
    a1Vi: "Con muốn uống nước cam và một chiếc bánh cupcake ạ.",
    q2: "Is your orange juice cold or sweet?",
    q2Vi: "Nước cam của con mát lạnh hay ngọt thanh?",
    a2: "It is cool, fresh, and sweet.",
    q3: "Can you say: \"A glass of juice, please!\"?",
    q3Vi: "Con hãy gọi món lịch sự: \"A glass of juice, please!\" nhé!",
    a3: "A glass of juice, please!",
  },
  13: {
    q1: "In maths class! Can you add two plus three for Teacher Sophie?",
    q1Vi: "Trong giờ học toán! Con hãy cộng hai cộng ba cho cô Sophie nghe nhé?",
    a1: "Two plus three equals five!",
    a1Vi: "Hai cộng ba bằng năm ạ!",
    q2: "How many sides does a triangle have?",
    q2Vi: "Một hình tam giác có bao nhiêu cạnh thế con?",
    a2: "A triangle has three straight sides.",
    q3: "Let's say: \"Maths is fun and exciting!\"",
    q3Vi: "Chúng mình cùng nói: \"Maths is fun and exciting!\" nào!",
    a3: "Maths is fun and exciting!",
  },
  14: {
    q1: "At home! What room do you like best in your sweet home?",
    q1Vi: "Ở nhà! Căn phòng nào con yêu thích nhất trong ngôi nhà thân thương?",
    a1: "I like my bedroom best because it has my toys.",
    a1Vi: "Con thích phòng ngủ nhất vì có đồ chơi của con ạ.",
    q2: "What do you do with your parents in the living room?",
    q2Vi: "Con làm gì cùng bố mẹ ở phòng khách?",
    a2: "We watch cartoons and talk happily together.",
    q3: "Can you say: \"I love my family and my home!\"?",
    q3Vi: "Con hãy nói câu: \"I love my family and my home!\" nhé!",
    a3: "I love my family and my home!",
  },
  15: {
    q1: "In the clothes shop! What new clothes are you looking at?",
    q1Vi: "Trong cửa hàng quần áo! Con đang ngắm những bộ quần áo mới nào?",
    a1: "I am looking at a red T-shirt and blue shorts.",
    a1Vi: "Con đang ngắm một chiếc áo thun đỏ và quần short xanh ạ.",
    q2: "Do you like wearing warm jackets in the winter?",
    q2Vi: "Con có thích mặc áo khoác ấm vào mùa đông không?",
    a2: "Yes, I wear a thick warm coat in winter.",
    q3: "Can you say: \"This T-shirt fits me perfectly!\"?",
    q3Vi: "Con hãy nói câu: \"This T-shirt fits me perfectly!\" nhé!",
    a3: "This T-shirt fits me perfectly!",
  },
  16: {
    q1: "At the campsite! What are we setting up near the trees?",
    q1Vi: "Tại khu cắm trại! Chúng mình đang dựng cái gì gần rặng cây thế con?",
    a1: "We are setting up a big blue tent.",
    a1Vi: "Chúng mình đang dựng một chiếc lều to màu xanh ạ.",
    q2: "Can you sing a campfire song with your friends?",
    q2Vi: "Con có thể hát bài hát lửa trại cùng các bạn không?",
    a2: "Yes, we roast marshmallows and sing together.",
    q3: "Let's say: \"Camping in nature is wonderful!\"",
    q3Vi: "Chúng mình cùng nói: \"Camping in nature is wonderful!\" nào!",
    a3: "Camping in nature is wonderful!",
  },
};

// Helper to make question clean and directed at student
function sanitizeQuestion(text: string, unitTitle: string, unitTitleVi: string): { q: string; qVi: string } {
  let cleaned = text.trim();
  // Remove character tags like "Mai:", "Linda:", "Teacher:"
  cleaned = cleaned.replace(/^[A-Za-z\s]+:\s*/, "");
  // Replace direct names like ", Nam?" or ", Lucy?" with student address
  cleaned = cleaned.replace(/,\s*(Nam|Mai|Ben|Lucy|Mary|Bill|Ba|Linda|Peter|Tony|Tom)\b/gi, "");

  if (cleaned.length < 5 || !cleaned.includes("?")) {
    cleaned = `Hello! What can you tell me about ${unitTitle}?`;
  }

  return {
    q: cleaned,
    qVi: `Cô Sophie hỏi con về chủ đề ${unitTitleVi}: "${cleaned}"`,
  };
}

export function buildCurriculumSpeakingTopics(): SophieSpeakingTopic[] {
  const allUnits = [
    ...GRADE_1_UNITS,
    ...GRADE_2_UNITS,
    ...GRADE_3_UNITS,
    ...GRADE_4_UNITS,
    ...GRADE_5_UNITS,
  ];

  return allUnits.map((u) => {
    const grade = u.grade as GradeLevel;
    const unitNumber = u.unitNumber;
    const l1 = u.lessons?.[0];
    const l2 = u.lessons?.[1];
    const l3 = u.lessons?.[2];

    const allVocab = u.lessons?.flatMap((l) => l.vocabulary?.map((v) => v.word) || []) || [];
    const suggestedKeywords = Array.from(new Set(allVocab)).slice(0, 8);

    // Default Level & Label based on Primary Grade age
    let level: "basic" | "intermediate" | "advanced" = "basic";
    let levelLabel = "Cơ bản / Phản xạ (6-7 tuổi)";

    if (grade === 1) {
      level = "basic";
      levelLabel = "Cơ bản / Phản xạ (6 tuổi - Lớp 1)";
    } else if (grade === 2) {
      level = "basic";
      levelLabel = "Cơ bản / Ghép từ (7 tuổi - Lớp 2)";
    } else if (grade === 3) {
      level = "intermediate";
      levelLabel = "Tự tin / Mẫu câu (8 tuổi - Lớp 3)";
    } else if (grade === 4) {
      level = "intermediate";
      levelLabel = "Tự tin / Hội thoại (9 tuổi - Lớp 4)";
    } else if (grade === 5) {
      level = "advanced";
      levelLabel = "Nâng cao / Phản biện (10-11 tuổi - Lớp 5)";
    }

    // Try Grade 1 special dialogues
    if (grade === 1 && GRADE_1_DIALOGUES[unitNumber]) {
      const g1Preset = GRADE_1_DIALOGUES[unitNumber];
      return {
        id: `gs-g1-u${unitNumber}`,
        name: `Unit ${unitNumber}: ${u.unitTitleVi}`,
        nameEn: `Unit ${unitNumber}: ${u.unitTitle}`,
        grade: 1,
        unitNumber,
        semester: u.semester,
        level,
        levelLabel,
        icon: u.icon,
        descriptionVi: `Luyện nói Unit ${unitNumber} sách Global Success Lớp 1: ${u.unitTitleVi}. Câu hỏi ngắn gọn, vui tươi phù hợp học sinh 6 tuổi.`,
        initialQuestion: g1Preset.q1,
        initialQuestionVi: g1Preset.q1Vi,
        sampleAnswer: g1Preset.a1,
        sampleAnswerVi: g1Preset.a1Vi,
        suggestedKeywords,
        dialogueChain: [
          {
            turn: 1,
            question: g1Preset.q1,
            questionVi: g1Preset.q1Vi,
            sampleAnswer: g1Preset.a1,
          },
          {
            turn: 2,
            question: g1Preset.q2,
            questionVi: g1Preset.q2Vi,
            sampleAnswer: g1Preset.a2,
          },
          {
            turn: 3,
            question: g1Preset.q3,
            questionVi: g1Preset.q3Vi,
            sampleAnswer: g1Preset.a3,
          },
        ],
      };
    }

    // Try Grade 2 special dialogues
    if (grade === 2 && GRADE_2_DIALOGUES[unitNumber]) {
      const g2Preset = GRADE_2_DIALOGUES[unitNumber];
      return {
        id: `gs-g2-u${unitNumber}`,
        name: `Unit ${unitNumber}: ${u.unitTitleVi}`,
        nameEn: `Unit ${unitNumber}: ${u.unitTitle}`,
        grade: 2,
        unitNumber,
        semester: u.semester,
        level,
        levelLabel,
        icon: u.icon,
        descriptionVi: `Luyện nói Unit ${unitNumber} sách Global Success Lớp 2: ${u.unitTitleVi}. Phù hợp tâm lý học sinh 7 tuổi, phát triển từ vựng và câu ngắn.`,
        initialQuestion: g2Preset.q1,
        initialQuestionVi: g2Preset.q1Vi,
        sampleAnswer: g2Preset.a1,
        sampleAnswerVi: g2Preset.a1Vi,
        suggestedKeywords,
        dialogueChain: [
          {
            turn: 1,
            question: g2Preset.q1,
            questionVi: g2Preset.q1Vi,
            sampleAnswer: g2Preset.a1,
          },
          {
            turn: 2,
            question: g2Preset.q2,
            questionVi: g2Preset.q2Vi,
            sampleAnswer: g2Preset.a2,
          },
          {
            turn: 3,
            question: g2Preset.q3,
            questionVi: g2Preset.q3Vi,
            sampleAnswer: g2Preset.a3,
          },
        ],
      };
    }

    // Extract questions and answers from sentence structures and sample dialogues for Grades 3, 4, 5
    const s1 = l1?.sentenceStructures?.[0];
    const s2 = l2?.sentenceStructures?.[0] || l1?.sentenceStructures?.[1];
    const s3 = l3?.sentenceStructures?.[0] || l2?.sentenceStructures?.[1] || l1?.sentenceStructures?.[2];

    const d1List = s1?.sampleDialogue || [];
    const d2List = s2?.sampleDialogue || [];
    const d3List = s3?.sampleDialogue || [];

    const extractTurnPair = (
      dialogueList: typeof d1List,
      structure: typeof s1,
      turnIndex: number
    ) => {
      // Look for a dialogue turn containing a question mark
      const qItem = dialogueList.find((d) => d.text.includes("?"));
      if (qItem) {
        const qIdx = dialogueList.indexOf(qItem);
        const aItem = dialogueList[qIdx + 1];
        const cleaned = sanitizeQuestion(qItem.text, u.unitTitle, u.unitTitleVi);
        return {
          q: cleaned.q,
          qVi: qItem.textVi || cleaned.qVi,
          a: aItem ? aItem.text.replace(/^[A-Za-z\s]+:\s*/, "") : "Yes, I understand and agree!",
          aVi: aItem ? aItem.textVi || "" : "Vâng, con hiểu và đồng ý ạ!",
        };
      }

      // If no question mark in dialogue, craft a natural Teacher Sophie prompt from pattern
      if (structure?.pattern) {
        const patternMain = structure.pattern.split("➔")[0].replace(/[\[\]]/g, "").trim();
        if (turnIndex === 1) {
          return {
            q: `Hello! Let's practice with our Unit ${unitNumber} topic: ${patternMain}?`,
            qVi: `Xin chào con! Chúng mình cùng luyện tập với mẫu câu Unit ${unitNumber}: ${structure.vietnameseMeaning}`,
            a: dialogueList[0]?.text?.replace(/^[A-Za-z\s]+:\s*/, "") || "Hello Teacher Sophie! I am ready.",
            aVi: dialogueList[0]?.textVi || "Xin chào cô Sophie! Con đã sẵn sàng.",
          };
        }
        return {
          q: `Can you tell me: ${patternMain}?`,
          qVi: `Con có thể chia sẻ theo mẫu: ${structure.vietnameseMeaning}?`,
          a: dialogueList[0]?.text?.replace(/^[A-Za-z\s]+:\s*/, "") || "Yes, I can do it!",
          aVi: dialogueList[0]?.textVi || "Vâng, con làm được ạ!",
        };
      }

      // Fallback based on unit theme
      return {
        q: `What can you tell me about ${u.unitTitle} in Unit ${unitNumber}?`,
        qVi: `Con có thể chia sẻ điều gì về chủ đề ${u.unitTitleVi}?`,
        a: `I enjoy learning about ${u.unitTitle} with Teacher Sophie!`,
        aVi: `Con rất thích học về ${u.unitTitleVi} cùng cô Sophie!`,
      };
    };

    const pair1 = extractTurnPair(d1List, s1, 1);
    const pair2 = extractTurnPair(d2List, s2, 2);
    const pair3 = extractTurnPair(d3List, s3, 3);

    return {
      id: `gs-g${grade}-u${unitNumber}`,
      name: `Unit ${unitNumber}: ${u.unitTitleVi}`,
      nameEn: `Unit ${unitNumber}: ${u.unitTitle}`,
      grade,
      unitNumber,
      semester: u.semester,
      level,
      levelLabel,
      icon: u.icon,
      descriptionVi: `Luyện nói Unit ${unitNumber} sách Global Success Lớp ${grade}: ${u.unitTitleVi} (${u.theme}). Thiết kế chuẩn chỉnh theo lứa tuổi học sinh lớp ${grade}.`,
      initialQuestion: pair1.q,
      initialQuestionVi: pair1.qVi,
      sampleAnswer: pair1.a,
      sampleAnswerVi: pair1.aVi,
      suggestedKeywords,
      dialogueChain: [
        {
          turn: 1,
          question: pair1.q,
          questionVi: pair1.qVi,
          sampleAnswer: pair1.a,
        },
        {
          turn: 2,
          question: pair2.q,
          questionVi: pair2.qVi,
          sampleAnswer: pair2.a,
        },
        {
          turn: 3,
          question: pair3.q,
          questionVi: pair3.qVi,
          sampleAnswer: pair3.a,
        },
      ],
    };
  });
}

export const GLOBAL_SUCCESS_SPEAKING_TOPICS = buildCurriculumSpeakingTopics();

/**
 * Returns all units for a given grade
 */
export function getCurriculumTopicsByGrade(grade: number | "all"): SophieSpeakingTopic[] {
  if (grade === "all") return GLOBAL_SUCCESS_SPEAKING_TOPICS;
  return GLOBAL_SUCCESS_SPEAKING_TOPICS.filter((t) => t.grade === grade);
}
