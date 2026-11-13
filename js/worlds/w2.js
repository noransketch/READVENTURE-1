// World 2 · My School World — content. Grammar focus: There is / There are (one thing or many things).
// Facts follow READVENTURE Book Chapter 2 (2.1 Our Classroom, Aisyah's School Bag, Rudi's Messy Desk; 2.3 Aisyah's School).

export const WORDS = [
  { key: "board", phrase: "board", meaning: "papan tulis", ex: "There **is** a big board in Class 6A.", img: "vocab/board.webp" },
  { key: "desk", phrase: "desk", meaning: "meja (sekolah)", ex: "There **are** twenty desks.", img: "vocab/desk.webp" },
  { key: "notebook", phrase: "notebook", meaning: "buku tulis", ex: "There **are** two notebooks in my bag.", img: "vocab/notebook.webp" },
  { key: "eraser", phrase: "eraser", meaning: "penghapus", ex: "There **is** a green eraser.", img: "vocab/eraser.webp" },
  { key: "ruler", phrase: "ruler", meaning: "penggaris", ex: "There **is** a long ruler on the desk.", img: "vocab/ruler.webp" },
  { key: "chair", phrase: "chair", meaning: "kursi", ex: "There **are** twenty chairs.", img: "vocab/chair.webp" },
  { key: "pencil_case", phrase: "pencil case", meaning: "kotak pensil", ex: "There **is** a pencil case on Sari's desk.", img: "vocab/pencil_case.webp" },
  { key: "library", phrase: "library", meaning: "perpustakaan", ex: "There **is** a library next to Class 6A.", img: "vocab/library.webp" },
];

export const STORY = {
  title: "Dimas and Aisyah",
  img: "vocab/board.webp",
  who: ["dimas", "aisyah"],
  sentences: [
    "Hi! I am Dimas.",
    "This is Class 6A.",
    "There is a big [board|papan tulis] in front of the class.",
    "There are twenty [desks|meja] and twenty [chairs|kursi].",
    "There are four [windows|jendela].",
    "My desk is [near|dekat] a window.",
    "There are three books on my desk.",
    "Aisyah sits [next to|di sebelah] me.",
    "There is a purple bag on her chair.",
    "In her bag, there is a [ruler|penggaris] and there are two [notebooks|buku tulis].",
    "There is a [library|perpustakaan] next to our class.",
    "Aisyah loves the library!",
  ],
  questions: [
    { q: "Who sits near a window?", qid: "Siapa yang duduk dekat jendela?", a: "dimas" },
    { q: "Who has a purple bag?", qid: "Siapa yang punya tas ungu?", a: "aisyah" },
    { q: "Who has three books on the desk?", qid: "Siapa yang punya tiga buku di mejanya?", a: "dimas" },
    { q: "Who loves the library?", qid: "Siapa yang suka perpustakaan?", a: "aisyah" },
  ],
};

// subj = the thing (one or many), verb = is / are
export const PAIRS = [
  { t: "There is a big board.", subj: [2, 3, 4], verb: [1], note: { en: "a big board = one → There is", id: "a big board = satu → There is" } },
  { t: "There are twenty desks.", subj: [2, 3], verb: [1], note: { en: "twenty desks = many → There are", id: "twenty desks = banyak → There are" } },
  { t: "There are four windows.", subj: [2, 3], verb: [1], note: { en: "four windows = many → There are", id: "four windows = banyak → There are" } },
  { t: "There is a purple bag on her chair.", subj: [2, 3, 4], verb: [1], note: { en: "a purple bag = one → There is", id: "a purple bag = satu → There is" } },
  { t: "There are three books on my desk.", subj: [2, 3], verb: [1], note: { en: "three books = many → There are", id: "three books = banyak → There are" } },
  { t: "There is a library next to our class.", subj: [2, 3], verb: [1], note: { en: "a library = one → There is", id: "a library = satu → There is" } },
];

export const PRACTICE = [
  { t: "There ___ a big board.", who: "a big board = one", o: ["is", "are"], a: "is", r: "thereis" },
  { t: "There ___ twenty desks.", who: "twenty desks = many", o: ["is", "are"], a: "are", r: "thereare" },
  { t: "There ___ four windows.", who: "four windows = many", o: ["is", "are"], a: "are", r: "thereare" },
  { t: "There ___ a purple bag on the chair.", who: "a purple bag = one", o: ["is", "are"], a: "is", r: "thereis" },
  { t: "There ___ three books on my desk.", who: "three books = many", o: ["is", "are"], a: "are", r: "thereare" },
  { t: "There ___ a library next to our class.", who: "a library = one", o: ["is", "are"], a: "is", r: "thereis" },
];

export const ROUNDS = [
  {
    n: 1,
    kind: "choose",
    name: { en: "Choose", id: "Pilih" },
    task: { en: "One thing or many? Then choose is or are.", id: "Satu benda atau banyak? Lalu pilih is atau are." },
    variants: [
      {
        title: "Aisyah's Bag",
        items: [
          { t: "There ___ two notebooks in my bag.", who: "two notebooks = many", o: ["is", "are"], a: "are", r: "thereare" },
          { t: "There ___ a blue ruler.", who: "a blue ruler = one", o: ["is", "are"], a: "is", r: "thereis" },
          { t: "There ___ three pencils.", who: "three pencils = many", o: ["is", "are"], a: "are", r: "thereare" },
          { t: "There ___ a green eraser.", who: "a green eraser = one", o: ["is", "are"], a: "is", r: "thereis" },
          { t: "There ___ a book about stars.", who: "a book = one", o: ["is", "are"], a: "is", r: "thereis" },
          { t: "There ___ six colored pencils too.", who: "six colored pencils = many", o: ["is", "are"], a: "are", r: "thereare" },
        ],
      },
      {
        title: "Our School",
        items: [
          { t: "There ___ six classrooms in my school.", who: "six classrooms = many", o: ["is", "are"], a: "are", r: "thereare" },
          { t: "There ___ a library next to Class 6A.", who: "a library = one", o: ["is", "are"], a: "is", r: "thereis" },
          { t: "There ___ a big hall.", who: "a big hall = one", o: ["is", "are"], a: "is", r: "thereis" },
          { t: "There ___ two toilets near the office.", who: "two toilets = many", o: ["is", "are"], a: "are", r: "thereare" },
          { t: "There ___ a canteen near the playground.", who: "a canteen = one", o: ["is", "are"], a: "is", r: "thereis" },
          { t: "There ___ many trees behind the field.", who: "many trees = many", o: ["is", "are"], a: "are", r: "thereare" },
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
        title: "Rudi's Messy Desk",
        items: [
          { t: "___ there a cap on Rudi's desk?", who: "a cap = one", o: ["Is", "Are"], a: "Is", r: "thereis" },
          { t: "Yes, there ___. It is red.", who: "a cap = one", o: ["is", "are"], a: "is", r: "thereis" },
          { t: "___ there three books?", who: "three books = many", o: ["Is", "Are"], a: "Are", r: "thereare" },
          { t: "Yes, there ___.", who: "three books = many", o: ["is", "are"], a: "are", r: "thereare" },
          { t: "___ there a ruler?", who: "a ruler = one", o: ["Is", "Are"], a: "Is", r: "thereis" },
          { t: "No, there ___.", who: "a ruler = one", o: ["isn't", "aren't"], a: "isn't", r: "thereis" },
        ],
      },
      {
        title: "Dimas's Classroom",
        items: [
          { t: "___ there a board in Class 6A?", who: "a board = one", o: ["Is", "Are"], a: "Is", r: "thereis" },
          { t: "Yes, there ___.", who: "a board = one", o: ["is", "are"], a: "is", r: "thereis" },
          { t: "___ there ten windows?", who: "ten windows = many", o: ["Is", "Are"], a: "Are", r: "thereare" },
          { t: "No, there ___. There are four.", who: "ten windows = many", o: ["isn't", "aren't"], a: "aren't", r: "thereare" },
          { t: "There ___ a TV in our class.", who: "a TV = one", o: ["isn't", "aren't"], a: "isn't", r: "thereis" },
          { t: "There ___ any posters on the wall.", who: "posters = many", o: ["isn't", "aren't"], a: "aren't", r: "thereare" },
        ],
      },
    ],
  },
  {
    n: 3,
    kind: "fix",
    name: { en: "Fix it", id: "Perbaiki" },
    task: { en: "One word is wrong. Tap it, then choose the right form.", id: "Ada satu kata yang salah. Ketuk, lalu pilih bentuk yang benar." },
    variants: [
      {
        title: "Sari's Desk",
        items: [
          { t: "There are a pencil case on Sari's desk.", who: "a pencil case = one", w: 1, o: ["is", "are"], a: "is", r: "thereis" },
          { t: "There is two notebooks.", who: "two notebooks = many", w: 1, o: ["is", "are"], a: "are", r: "thereare" },
          { t: "There are a ruler too.", who: "a ruler = one", w: 1, o: ["is", "are"], a: "is", r: "thereis" },
          { t: "There is three colored pencils.", who: "three colored pencils = many", w: 1, o: ["is", "are"], a: "are", r: "thereare" },
          { t: "Is there two erasers?", who: "two erasers = many", w: 0, o: ["Is", "Are"], a: "Are", r: "thereare" },
          { t: "There are a window near her desk.", who: "a window = one", w: 1, o: ["is", "are"], a: "is", r: "thereis" },
        ],
      },
      {
        title: "Welcome to Our School",
        items: [
          { t: "There is two gates.", who: "two gates = many", w: 1, o: ["is", "are"], a: "are", r: "thereare" },
          { t: "There are a big field.", who: "a big field = one", w: 1, o: ["is", "are"], a: "is", r: "thereis" },
          { t: "There is many books in the library.", who: "many books = many", w: 1, o: ["is", "are"], a: "are", r: "thereare" },
          { t: "Are there a canteen?", who: "a canteen = one", w: 0, o: ["Is", "Are"], a: "Is", r: "thereis" },
          { t: "There are a hall next to the office.", who: "a hall = one", w: 1, o: ["is", "are"], a: "is", r: "thereis" },
          { t: "There is four teachers in the office.", who: "four teachers = many", w: 1, o: ["is", "are"], a: "are", r: "thereare" },
        ],
      },
    ],
  },
];

// 10 items from a new short text: 5 one-thing (is), 5 many-things (are) · 6 choose + 4 correct.
export const CHECK = {
  title: "My Favorite Place",
  items: [
    { kind: "choose", t: "There ___ many books in the library.", o: ["is", "are"], a: "are", r: "thereare" },
    { kind: "choose", t: "There ___ a big table in the middle.", o: ["is", "are"], a: "is", r: "thereis" },
    { kind: "fix", t: "There is four chairs at the table.", w: 1, o: ["is", "are"], a: "are", r: "thereare" },
    { kind: "choose", t: "There ___ a small window.", o: ["is", "are"], a: "is", r: "thereis" },
    { kind: "choose", t: "___ there a computer?", o: ["Is", "Are"], a: "Is", r: "thereis" },
    { kind: "fix", t: "Yes, there are one computer.", w: 2, o: ["is", "are"], a: "is", r: "thereis" },
    { kind: "choose", t: "There ___ two posters about animals.", o: ["is", "are"], a: "are", r: "thereare" },
    { kind: "fix", t: "There are a reading corner.", w: 1, o: ["is", "are"], a: "is", r: "thereis" },
    { kind: "choose", t: "There ___ any comics.", o: ["isn't", "aren't"], a: "aren't", r: "thereare" },
    { kind: "fix", t: "There is many students after school.", w: 1, o: ["is", "are"], a: "are", r: "thereare" },
  ],
};

export const META = {
  bg: "world/bg_world2_class.webp",
  groups: ["one", "many"],
  stageImg: { words: "vocab/board.webp", read: "vocab/library.webp", pairs: "vocab/desk.webp", practice: "vocab/notebook.webp", rounds: "vocab/ruler.webp", check: "vocab/pencil_case.webp" },
  wordsDone: { en: "You know 8 school words now. They are in your Word Bag!", id: "Sekarang kamu tahu 8 kata tentang sekolah. Semuanya ada di kantong katamu!" },
  subjPrompt: { en: "Tap the <b class='c-subj'>thing</b>: one or many?", id: "Ketuk <b>bendanya</b>: satu atau banyak?" },
  verbPrompt: { en: "Now tap <b class='c-verb'>is</b> or <b class='c-verb'>are</b>.", id: "Sekarang ketuk is atau are." },
  badSubj: { en: "That is not the thing. <b>What</b> is there?", id: "Itu bukan bendanya. <b>Apa</b> yang ada?" },
  badVerb: { en: "Find the word <b>is</b> or <b>are</b>.", id: "Cari kata is atau are." },
  legend: ["thing", "is / are"],
  practiceGuide: { en: "One thing or many? Then choose is or are.", id: "Satu benda atau banyak? Lalu pilih is atau are." },
};
