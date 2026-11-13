// All learning content for Island 3 · "My Day".
// Edit this file to change texts and items. No other file needs to change.
//
// Rule keys (used for feedback, hints, and the result breakdown):
//   s3     he / she / it / one person  -> verb + s/es (gets, reads, goes, watches)
//   plural I / you / we / they / 2+    -> no -s/-es  (get, read, go, watch)
//   has    he / she / it / one person  -> has
//   have   I / you / we / they / 2+    -> have
//   does   he / she / it / one person  -> does / doesn't
//   do     I / you / we / they / 2+    -> do / don't
//   base   after do / does / don't / doesn't -> verb with no -s

export const RULES = {
  s3: {
    en: "He, she, it, or one person → verb + s/es (gets, goes, watches).",
    id: "He, she, it, atau satu orang → kata kerja + s/es (gets, goes, watches).",
  },
  plural: {
    en: "I, you, we, they, or two or more people → no -s/-es.",
    id: "I, you, we, they, atau lebih dari satu → tanpa -s/-es.",
  },
  has: {
    en: "He, she, it, or one person → has.",
    id: "He, she, it, atau satu orang → has.",
  },
  have: {
    en: "I, you, we, they, or two or more people → have.",
    id: "I, you, we, they, atau lebih dari satu → have.",
  },
  does: {
    en: "He, she, it, or one person → does / doesn't.",
    id: "He, she, it, atau satu orang → does / doesn't.",
  },
  do: {
    en: "I, you, we, they, or two or more people → do / don't.",
    id: "I, you, we, they, atau lebih dari satu → do / don't.",
  },
  base: {
    en: "After do, does, don't, or doesn't → the verb has no -s/-es.",
    id: "Setelah do, does, don't, atau doesn't → kata kerja tanpa -s/-es.",
  },
  am: {
    en: "I → am (am not).",
    id: "I → am (am not).",
  },
  is: {
    en: "He, she, it, or one person → is (isn't).",
    id: "He, she, it, atau satu orang → is (isn't).",
  },
  are: {
    en: "You, we, they, or two or more people → are (aren't).",
    id: "You, we, they, atau lebih dari satu → are (aren't).",
  },
  thereis: {
    en: "One thing → There is (There isn't · Is there …?).",
    id: "Satu benda → There is (There isn't · Is there …?).",
  },
  thereare: {
    en: "Two or more things → There are (There aren't · Are there …?).",
    id: "Dua benda atau lebih → There are (There aren't · Are there …?).",
  },
};

export const GROUP_OF = { s3: "s", plural: "s", has: "have", have: "have", does: "do", do: "do", base: "do", am: "am", is: "is", are: "are", thereis: "one", thereare: "many" };

export const GROUPS = {
  s: { en: "verb + s/es", id: "kata kerja + s/es" },
  have: { en: "has / have", id: "has / have" },
  do: { en: "do / does", id: "do / does" },
  am: { en: "I → am", id: "I → am" },
  is: { en: "he / she / it → is", id: "he / she / it → is" },
  are: { en: "you / we / they → are", id: "you / we / they → are" },
  one: { en: "one thing → there is", id: "satu benda → there is" },
  many: { en: "many things → there are", id: "banyak benda → there are" },
};

export const HINTS = {
  s: {
    en: "Who is the subject? One person (he/she/it) → add -s/-es. I/you/we/they → no -s/-es.",
    id: "Siapa subjeknya? Satu orang (he/she/it) → tambah -s/-es. I/you/we/they → tanpa -s/-es.",
  },
  have: {
    en: "he / she / it → has · I / you / we / they → have",
    id: "he / she / it → has · I / you / we / they → have",
  },
  do: {
    en: "he / she / it → does · I / you / we / they → do · after do/does → no -s/-es",
    id: "he / she / it → does · I / you / we / they → do · setelah do/does → tanpa -s/-es",
  },
};

// Short rule shown with the subject in item hints ("Rudi = he → verb + s/es").
export const SHORT = {
  s3: { en: "he / she / it → verb + s/es", id: "he / she / it → kata kerja + s/es" },
  plural: { en: "I / you / we / they → no -s/-es", id: "I / you / we / they → tanpa -s/-es" },
  has: { en: "he / she / it → has", id: "he / she / it → has" },
  have: { en: "I / you / we / they → have", id: "I / you / we / they → have" },
  does: { en: "he / she / it → does / doesn't", id: "he / she / it → does / doesn't" },
  do: { en: "I / you / we / they → do / don't", id: "I / you / we / they → do / don't" },
  base: { en: "after do / does / don't / doesn't → no -s/-es", id: "setelah do / does / don't / doesn't → tanpa -s/-es" },
  am: { en: "I → am / am not", id: "I → am / am not" },
  is: { en: "he / she / it → is / isn't", id: "he / she / it → is / isn't" },
  are: { en: "you / we / they → are / aren't", id: "you / we / they → are / aren't" },
  thereis: { en: "There is / There isn't", id: "There is / There isn't" },
  thereare: { en: "There are / There aren't", id: "There are / There aren't" },
};

export const PRAISE = [
  { en: "Great!", id: "Hebat!" },
  { en: "Yes, that's right!", id: "Ya, benar!" },
  { en: "Well done!", id: "Bagus sekali!" },
  { en: "Nice reading!", id: "Membacamu bagus!" },
];

export const TRY_AGAIN = [
  { en: "Almost! Try again.", id: "Hampir! Coba lagi." },
  { en: "Look at the subject again.", id: "Lihat subjeknya lagi." },
  { en: "Not yet. You can do it!", id: "Belum. Kamu pasti bisa!" },
];

// ---------- Stage 1: Words ----------
export const WORDS = [
  { key: "get_up", phrase: "get up", meaning: "bangun (dari tempat tidur)", ex: "Sari **gets up** at five.", img: "vocab/get_up.webp" },
  { key: "have_breakfast", phrase: "have breakfast", meaning: "sarapan", ex: "Rudi **has** breakfast at six.", img: "vocab/have_breakfast.webp" },
  { key: "go_to_school", phrase: "go to school", meaning: "pergi ke sekolah", ex: "Sari **goes** to school every day.", img: "vocab/go_to_school.webp" },
  { key: "do_homework", phrase: "do homework", meaning: "mengerjakan PR", ex: "Rudi **does** his homework.", img: "vocab/do_homework.webp" },
  { key: "read_book", phrase: "read a book", meaning: "membaca buku", ex: "Sari **reads** a book.", img: "vocab/read_book.webp" },
  { key: "play_friends", phrase: "play with friends", meaning: "bermain dengan teman", ex: "Rudi **plays** with his friends.", img: "vocab/play_with_friends.webp" },
  { key: "help_mother", phrase: "help Mother", meaning: "membantu Ibu", ex: "Sari **helps** her mother.", img: "vocab/help_mother.webp" },
  { key: "sleep", phrase: "sleep", meaning: "tidur", ex: "Rudi **sleeps** at nine.", img: "vocab/sleep.webp" },
];

// ---------- Stage 2: Read ----------
// [word|meaning] marks a word the learner can tap for help.
export const STORY = {
  title: "Sari's Day",
  sentences: [
    "Hi! My name is Sari.",
    "I [get up|bangun] at five o'clock [every day|setiap hari].",
    "My brother Rudi gets up at six.",
    "We [have breakfast|sarapan] [together|bersama-sama].",
    "Rudi has rice [porridge|bubur] with an egg.",
    "[Then|lalu] I go to school with my friends.",
    "In the [afternoon|sore hari], Rudi does his [homework|PR].",
    "I read a book after school.",
    "My mother [cooks|memasak] in the [kitchen|dapur], and I [help|membantu] her.",
    "Rudi does not like [vegetables|sayuran]!",
    "At night, we [sleep|tidur] [early|lebih awal].",
  ],
  questions: [
    { q: "Who gets up at five o'clock?", qid: "Siapa yang bangun jam lima?", a: "sari" },
    { q: "Who has rice porridge with an egg?", qid: "Siapa yang makan bubur dengan telur?", a: "rudi" },
    { q: "Who helps Mother in the kitchen?", qid: "Siapa yang membantu Ibu di dapur?", a: "sari" },
    { q: "Who does not like vegetables?", qid: "Siapa yang tidak suka sayur?", a: "rudi" },
  ],
};

// ---------- Stage 3: Find the pairs (noticing) ----------
export const PAIRS = [
  { t: "I get up at five o'clock.", subj: [0], verb: [1], note: { en: "I → get (no -s/-es)", id: "I → get (tanpa -s/-es)" } },
  { t: "My brother Rudi gets up at six.", subj: [0, 1, 2], verb: [3], note: { en: "Rudi = he → gets", id: "Rudi = he (dia) → gets" } },
  { t: "We have breakfast together.", subj: [0], verb: [1], note: { en: "We → have", id: "We (kami) → have" } },
  { t: "Rudi has rice porridge.", subj: [0], verb: [1], note: { en: "Rudi = he → has", id: "Rudi = he (dia) → has" } },
  { t: "My mother cooks in the kitchen.", subj: [0, 1], verb: [2], note: { en: "My mother = she → cooks", id: "My mother = she (dia) → cooks" } },
  { t: "Rudi does not like vegetables.", subj: [0], verb: [1, 2, 3], note: { en: "Rudi = he → does not like (like has no -s/-es)", id: "Rudi = he → does not like (like tanpa -s/-es)" } },
];

// ---------- Stage 4: Guided practice ----------
export const PRACTICE = [
  { t: "Rudi ___ up at six.", who: "Rudi = he", o: ["get", "gets"], a: "gets", r: "s3" },
  { t: "We ___ breakfast together.", who: "We", o: ["have", "has"], a: "have", r: "have" },
  { t: "Rudi ___ rice porridge.", who: "Rudi = he", o: ["have", "has"], a: "has", r: "has" },
  { t: "Sari ___ to school with her friends.", who: "Sari = she", o: ["go", "goes"], a: "goes", r: "s3" },
  { t: "___ Rudi like vegetables?", who: "Rudi = he", o: ["Do", "Does"], a: "Does", r: "does" },
  { t: "I ___ a book after school.", who: "I", o: ["read", "reads"], a: "read", r: "plural" },
];

// ---------- Stage 5: Game rounds ----------
// kind "choose": pick the word for the blank.
// kind "fix": tap the wrong word (index w), then pick the right form.
export const ROUNDS = [
  {
    n: 1,
    kind: "choose",
    name: { en: "Choose", id: "Pilih" },
    task: { en: "Find the subject. Then choose the verb.", id: "Cari subjeknya. Lalu pilih kata kerjanya." },
    variants: [
      {
        title: "A Busy Morning",
        items: [
          { t: "Sari ___ up at five.", who: "Sari = she", o: ["get", "gets"], a: "gets", r: "s3" },
          { t: "Mother and Father ___ tea.", who: "Mother and Father = they", o: ["drink", "drinks"], a: "drink", r: "plural" },
          { t: "Rudi ___ his teeth.", who: "Rudi = he", o: ["brush", "brushes"], a: "brushes", r: "s3" },
          { t: "We ___ breakfast together.", who: "We", o: ["have", "has"], a: "have", r: "have" },
          { t: "The cat ___ milk.", who: "The cat = it", o: ["have", "has"], a: "has", r: "has" },
          { t: "Sari and Rudi ___ to school.", who: "Sari and Rudi = they", o: ["go", "goes"], a: "go", r: "plural" },
        ],
      },
      {
        title: "After School",
        items: [
          { t: "Rudi ___ home at one.", who: "Rudi = he", o: ["come", "comes"], a: "comes", r: "s3" },
          { t: "He ___ a big lunch.", who: "He", o: ["have", "has"], a: "has", r: "has" },
          { t: "Sari ___ her mother.", who: "Sari = she", o: ["help", "helps"], a: "helps", r: "s3" },
          { t: "Rudi's friends ___ football.", who: "Rudi's friends = they", o: ["play", "plays"], a: "play", r: "plural" },
          { t: "I ___ a lot of homework.", who: "I", o: ["have", "has"], a: "have", r: "have" },
          { t: "Sari ___ TV in the evening.", who: "Sari = she", o: ["watch", "watches"], a: "watches", r: "s3" },
        ],
      },
    ],
  },
  {
    n: 2,
    kind: "choose",
    name: { en: "Questions and NOT", id: "Pertanyaan dan NOT" },
    task: { en: "Complete the questions and the NOT sentences.", id: "Lengkapi kalimat tanya dan kalimat NOT (tidak)." },
    variants: [
      {
        title: "Questions for Rudi",
        items: [
          { t: "___ Rudi like vegetables?", who: "Rudi = he", o: ["Do", "Does"], a: "Does", r: "does" },
          { t: "No, he ___ like carrots.", who: "He", o: ["don't", "doesn't"], a: "doesn't", r: "does" },
          { t: "___ you like vegetables, Sari?", who: "You", o: ["Do", "Does"], a: "Do", r: "do" },
          { t: "I ___ like chili.", who: "I", o: ["don't", "doesn't"], a: "don't", r: "do" },
          { t: "Does Rudi ___ milk?", o: ["drink", "drinks"], a: "drink", r: "base" },
          { t: "Yes, he ___.", who: "He", o: ["do", "does"], a: "does", r: "does" },
        ],
      },
      {
        title: "Sunday Plans",
        items: [
          { t: "___ Sari and Rudi go to school on Sunday?", who: "Sari and Rudi = they", o: ["Do", "Does"], a: "Do", r: "do" },
          { t: "No, they ___.", who: "They", o: ["don't", "doesn't"], a: "don't", r: "do" },
          { t: "___ Rudi watch TV on Sunday?", who: "Rudi = he", o: ["Do", "Does"], a: "Does", r: "does" },
          { t: "He ___ watch TV in the morning.", who: "He", o: ["don't", "doesn't"], a: "doesn't", r: "does" },
          { t: "Does Sari ___ her room?", o: ["clean", "cleans"], a: "clean", r: "base" },
          { t: "She ___ her room every Sunday.", who: "She", o: ["clean", "cleans"], a: "cleans", r: "s3" },
        ],
      },
    ],
  },
  {
    n: 3,
    kind: "fix",
    name: { en: "Fix it", id: "Perbaiki" },
    task: { en: "One verb is wrong. Tap it, then choose the right form.", id: "Ada satu kata kerja yang salah. Ketuk, lalu pilih bentuk yang benar." },
    variants: [
      {
        title: "Rudi and Sari",
        items: [
          { t: "Rudi play football after school.", who: "Rudi = he", w: 1, o: ["play", "plays"], a: "plays", r: "s3" },
          { t: "His friends plays with him.", who: "His friends = they", w: 2, o: ["play", "plays"], a: "play", r: "plural" },
          { t: "Sari have a new book.", who: "Sari = she", w: 1, o: ["have", "has"], a: "has", r: "has" },
          { t: "She go to school every day.", who: "She", w: 1, o: ["go", "goes"], a: "goes", r: "s3" },
          { t: "Rudi don't read comics.", who: "Rudi = he", w: 1, o: ["don't", "doesn't"], a: "doesn't", r: "does" },
          { t: "Does he likes comics?", w: 2, o: ["like", "likes"], a: "like", r: "base" },
        ],
      },
      {
        title: "Mother's Kitchen",
        items: [
          { t: "My mother cook every morning.", who: "My mother = she", w: 2, o: ["cook", "cooks"], a: "cooks", r: "s3" },
          { t: "She have a big pot.", who: "She", w: 1, o: ["have", "has"], a: "has", r: "has" },
          { t: "Sari and I helps her.", who: "Sari and I = we", w: 3, o: ["help", "helps"], a: "help", r: "plural" },
          { t: "Rudi do the dishes.", who: "Rudi = he", w: 1, o: ["do", "does"], a: "does", r: "does" },
          { t: "Do Mother like chili?", who: "Mother = she", w: 0, o: ["Do", "Does"], a: "Does", r: "does" },
          { t: "We doesn't eat chili.", who: "We", w: 1, o: ["don't", "doesn't"], a: "don't", r: "do" },
        ],
      },
    ],
  },
];

// ---------- Stage 6: Independent check (no hints) ----------
// 10 items from a new short text: 4 verb + s/es, 3 has/have, 3 do/does.
export const CHECK = {
  title: "Sunday at Grandma's House",
  items: [
    { kind: "choose", t: "Grandma ___ in a small village.", o: ["live", "lives"], a: "lives", r: "s3" },
    { kind: "choose", t: "She ___ up very early.", o: ["get", "gets"], a: "gets", r: "s3" },
    { kind: "choose", t: "Grandpa ___ a big garden.", o: ["have", "has"], a: "has", r: "has" },
    { kind: "fix", t: "He water the plants every morning.", w: 1, o: ["water", "waters"], a: "waters", r: "s3" },
    { kind: "choose", t: "Sari and Rudi ___ lunch with Grandma.", o: ["have", "has"], a: "have", r: "have" },
    { kind: "choose", t: "___ Grandma cook fried rice? Yes, she does!", o: ["Do", "Does"], a: "Does", r: "does" },
    { kind: "choose", t: "The cats ___ under the table.", o: ["sleep", "sleeps"], a: "sleep", r: "plural" },
    { kind: "fix", t: "Rudi don't eat the chili.", w: 1, o: ["don't", "doesn't"], a: "doesn't", r: "does" },
    { kind: "fix", t: "Does Grandpa likes his garden? Yes, he loves it.", w: 2, o: ["like", "likes"], a: "like", r: "base" },
    { kind: "fix", t: "We has a lot of fun there.", w: 1, o: ["have", "has"], a: "have", r: "have" },
  ],
};

// ---------- World 3 lesson path ----------
export const STAGES = [
  { id: "words", n: 1, img: "vocab/get_up.webp", guide: "sari",
    name: { en: "Words", id: "Kosakata" },
    desc: { en: "Meet 8 new words, then play Picture Match.", id: "Kenali 8 kata baru, lalu main Cocokkan Gambar." } },
  { id: "read", n: 2, img: "vocab/read_book.webp", guide: "aisyah",
    name: { en: "Read", id: "Membaca" },
    desc: { en: "Read and listen to \"Sari's Day\". Then answer: who?", id: "Baca dan dengarkan \"Sari's Day\". Lalu jawab: siapa?" } },
  { id: "pairs", n: 3, img: "vocab/help_mother.webp", guide: "dimas",
    name: { en: "Find the pairs", id: "Cari pasangan" },
    desc: { en: "Find the subject and its verb in each sentence.", id: "Temukan subjek dan kata kerjanya di setiap kalimat." } },
  { id: "practice", n: 4, img: "vocab/do_homework.webp", guide: "sari",
    name: { en: "Practice", id: "Latihan" },
    desc: { en: "Find the subject, then choose the verb. You can use a hint.", id: "Cari subjeknya, lalu pilih kata kerjanya. Boleh pakai petunjuk." } },
  { id: "rounds", n: 5, img: "vocab/play_with_friends.webp", guide: "rudi",
    name: { en: "Game rounds", id: "Ronde permainan" },
    desc: { en: "Three short rounds: choose, questions and NOT, fix it.", id: "Tiga ronde pendek: pilih, kalimat tanya dan NOT, perbaiki." } },
  { id: "check", n: 6, img: "vocab/go_to_school.webp", guide: "sari",
    name: { en: "My check", id: "Cek mandiri" },
    desc: { en: "10 sentences, no hints. Show what you can do!", id: "10 kalimat, tanpa petunjuk. Tunjukkan kemampuanmu!" } },
  { id: "result", n: 7, img: "brand/glowing_book.webp", guide: "sari",
    name: { en: "My results", id: "Hasilku" },
    desc: { en: "See your score and what to practise next.", id: "Lihat skor dan apa yang perlu dilatih." } },
];

// ---------- The six worlds (x / y = position on the world map, in %) ----------
// Only World 3 is playable in this version. Texts get longer from world to world.
export const WORLDS = [
  { n: 1, short: "Me", x: 51.8, y: 77.1, open: true, name: "Hello, This Is Me", id: "Halo, Ini Aku",
    topic: { en: "Me, my family, my friends", id: "Aku, keluargaku, temanku" },
    reading: { en: "Words with pictures → 1 sentence → 2–3 sentences", id: "Kata bergambar → 1 kalimat → 2–3 kalimat" } },
  { n: 2, short: "School", x: 56.6, y: 63.5, open: true, name: "My School World", id: "Dunia Sekolahku",
    topic: { en: "Classroom, school, things I like", id: "Kelas, sekolah, hal yang kusukai" },
    reading: { en: "Short descriptions (3–6 sentences)", id: "Deskripsi pendek (3–6 kalimat)" } },
  { n: 3, short: "My Day", x: 51.8, y: 47.5, open: true, name: "My Day", id: "Hariku",
    topic: { en: "Daily routines and habits", id: "Kegiatan dan kebiasaan sehari-hari" },
    reading: { en: "Short stories about a day (6–11 sentences)", id: "Cerita pendek tentang satu hari (6–11 kalimat)" } },
  { n: 4, short: "Healthy Living", x: 46.9, y: 35.4, open: false, name: "Free Time & Healthy Living", id: "Waktu Luang & Hidup Sehat",
    topic: { en: "Hobbies, food, healthy habits", id: "Hobi, makanan, kebiasaan sehat" },
    reading: { en: "Posters, menus, and short advice texts", id: "Poster, menu, dan teks saran pendek" } },
  { n: 5, short: "Around Me", x: 58.2, y: 26, open: false, name: "My World Around Me", id: "Dunia di Sekitarku",
    topic: { en: "Places, directions, weather, shopping", id: "Tempat, arah, cuaca, belanja" },
    reading: { en: "Directions, signs, and short guides", id: "Petunjuk arah, tanda, dan panduan pendek" } },
  { n: 6, short: "Then & Now", x: 66.2, y: 12.1, open: false, name: "Then and Now", id: "Dulu dan Sekarang",
    topic: { en: "Yesterday, holidays, memories (past)", id: "Kemarin, liburan, kenangan (masa lalu)" },
    reading: { en: "Short stories about the past", id: "Cerita pendek tentang masa lalu" } },
];

// ---------- Stepping stones on the world map (27 in total) ----------
// In path order from the school (bottom) to the ruins (top). x / y / s = % of the map width/height.
// World 3 uses its 6 stones for lessons 1-6. The other stones are future levels (built step by step).
export const MAP_STONES = [
  { w: 1, x: 56.59, y: 81.18, s: 6.15 },
  { w: 1, x: 51.86, y: 77.12, s: 6.05 },
  { w: 1, x: 40.97, y: 74.71, s: 5.76 },
  { w: 1, x: 32.96, y: 71.35, s: 5.57 },
  { w: 2, x: 35.99, y: 67.19, s: 5.37 },
  { w: 2, x: 46.04, y: 64.94, s: 5.37 },
  { w: 2, x: 56.93, y: 63.38, s: 5.27 },
  { w: 2, x: 61.62, y: 59.73, s: 5.08 },
  { w: 3, x: 54.35, y: 56.58, s: 5.18 },
  { w: 3, x: 43.8, y: 55.27, s: 5.18 },
  { w: 3, x: 41.94, y: 48.8, s: 5.18 },
  { w: 3, x: 35.11, y: 52.08, s: 5.18 },
  { w: 3, x: 51.9, y: 47.3, s: 5.18 },
  { w: 3, x: 61.57, y: 45.18, s: 5.18 },
  { w: 4, x: 64.65, y: 40.3, s: 5.08 },
  { w: 4, x: 57.13, y: 37.24, s: 5.08 },
  { w: 4, x: 47.12, y: 35.42, s: 4.98 },
  { w: 4, x: 38.53, y: 32.49, s: 4.98 },
  { w: 5, x: 41.41, y: 28.94, s: 4.88 },
  { w: 5, x: 49.27, y: 27.15, s: 4.79 },
  { w: 5, x: 58.25, y: 26.01, s: 4.79 },
  { w: 5, x: 62.21, y: 20.48, s: 4.49 },
  { w: 6, x: 67.97, y: 22.88, s: 4.49 },
  { w: 6, x: 53.81, y: 19.34, s: 4.49 },
  { w: 6, x: 47.66, y: 17.35, s: 4.3 },
  { w: 6, x: 51.51, y: 14.62, s: 4.2 },
  { w: 6, x: 59.57, y: 13.35, s: 4.1 }
];
