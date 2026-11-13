// World 1 · Hello, This Is Me — content. Grammar focus: am / is / are (the subject decides the form).
// Facts follow READVENTURE Book Chapter 1: Sari is 11, Bayu is 6, Rudi is 12, Lina is 15, Rudi's father drives a bus.

export const WORDS = [
  { key: "family", phrase: "family", meaning: "keluarga", ex: "This **is** my family.", img: "vocab/family.webp" },
  { key: "mother", phrase: "mother", meaning: "ibu", ex: "My mother **is** kind.", img: "vocab/mother.webp" },
  { key: "father", phrase: "father", meaning: "ayah", ex: "My father **is** tall.", img: "vocab/father.webp" },
  { key: "brother", phrase: "brother", meaning: "saudara laki-laki", ex: "Bayu **is** my little brother.", img: "vocab/brother.webp" },
  { key: "sister", phrase: "sister", meaning: "saudara perempuan", ex: "Lina **is** Rudi's big sister.", img: "vocab/sister.webp" },
  { key: "grandmother", phrase: "grandmother", meaning: "nenek", ex: "My grandmother **is** a great cook.", img: "vocab/grandmother.webp" },
  { key: "grandfather", phrase: "grandfather", meaning: "kakek", ex: "My grandfather **is** in the garden.", img: "vocab/grandfather.webp" },
  { key: "friend", phrase: "friend", meaning: "teman", ex: "Sari and Aisyah **are** friends.", img: "vocab/friend.webp" },
];

export const STORY = {
  title: "Sari and Rudi",
  img: "vocab/family.webp",
  sentences: [
    "Hello! I am Sari.",
    "I am eleven [years old|tahun (umur)].",
    "This is my [family|keluarga].",
    "My [father|ayah] is tall, and my [mother|ibu] is [kind|baik hati].",
    "Bayu is my [little|kecil, lebih muda] [brother|saudara laki-laki].",
    "He is six.",
    "We are a happy family.",
    "Rudi is my [friend|teman].",
    "He is twelve years old.",
    "Lina is his big [sister|saudara perempuan].",
    "She is fifteen.",
    "Rudi and I are in Class 6A.",
  ],
  questions: [
    { q: "Who is eleven years old?", qid: "Siapa yang berumur sebelas tahun?", a: "sari" },
    { q: "Who is twelve years old?", qid: "Siapa yang berumur dua belas tahun?", a: "rudi" },
    { q: "Who is Bayu's sister?", qid: "Siapa kakak perempuan Bayu?", a: "sari" },
    { q: "Who is Lina's brother?", qid: "Siapa adik laki-laki Lina?", a: "rudi" },
  ],
};

export const PAIRS = [
  { t: "I am Sari.", subj: [0], verb: [1], note: { en: "I → am", id: "I (aku) → am" } },
  { t: "My father is tall.", subj: [0, 1], verb: [2], note: { en: "My father = he → is", id: "My father = he (dia) → is" } },
  { t: "He is six.", subj: [0], verb: [1], note: { en: "He → is", id: "He (dia) → is" } },
  { t: "We are a happy family.", subj: [0], verb: [1], note: { en: "We → are", id: "We (kami) → are" } },
  { t: "Lina is his big sister.", subj: [0], verb: [1], note: { en: "Lina = she → is", id: "Lina = she (dia) → is" } },
  { t: "Rudi and I are in Class 6A.", subj: [0, 1, 2], verb: [3], note: { en: "Rudi and I = we → are", id: "Rudi and I = we (kami) → are" } },
];

export const PRACTICE = [
  { t: "I ___ Sari.", who: "I", o: ["am", "is"], a: "am", r: "am" },
  { t: "My mother ___ kind.", who: "My mother = she", o: ["is", "are"], a: "is", r: "is" },
  { t: "Bayu ___ six years old.", who: "Bayu = he", o: ["am", "is"], a: "is", r: "is" },
  { t: "We ___ a happy family.", who: "We", o: ["is", "are"], a: "are", r: "are" },
  { t: "Rudi ___ twelve.", who: "Rudi = he", o: ["am", "is"], a: "is", r: "is" },
  { t: "Rudi and I ___ friends.", who: "Rudi and I = we", o: ["is", "are"], a: "are", r: "are" },
];

export const ROUNDS = [
  {
    n: 1,
    kind: "choose",
    name: { en: "Choose", id: "Pilih" },
    task: { en: "Find the subject. Then choose am, is, or are.", id: "Cari subjeknya. Lalu pilih am, is, atau are." },
    variants: [
      {
        title: "Aisyah's Family",
        items: [
          { t: "I ___ Aisyah.", who: "I", o: ["am", "is"], a: "am", r: "am" },
          { t: "My mother ___ a teacher.", who: "My mother = she", o: ["is", "are"], a: "is", r: "is" },
          { t: "My father ___ a nurse.", who: "My father = he", o: ["am", "is"], a: "is", r: "is" },
          { t: "My parents ___ very kind.", who: "My parents = they", o: ["is", "are"], a: "are", r: "are" },
          { t: "Grandma ___ at home with us.", who: "Grandma = she", o: ["is", "are"], a: "is", r: "is" },
          { t: "We ___ a happy family.", who: "We", o: ["am", "are"], a: "are", r: "are" },
        ],
      },
      {
        title: "Dimas and His Cat",
        items: [
          { t: "Dimas ___ twelve years old.", who: "Dimas = he", o: ["is", "are"], a: "is", r: "is" },
          { t: "He ___ very tall.", who: "He", o: ["am", "is"], a: "is", r: "is" },
          { t: "His cat ___ white.", who: "His cat = it", o: ["is", "are"], a: "is", r: "is" },
          { t: "I ___ his friend.", who: "I", o: ["am", "is"], a: "am", r: "am" },
          { t: "Dimas and I ___ in Class 6A.", who: "Dimas and I = we", o: ["is", "are"], a: "are", r: "are" },
          { t: "You ___ in Class 6A too!", who: "You", o: ["is", "are"], a: "are", r: "are" },
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
        title: "At School",
        items: [
          { t: "___ you Sari?", who: "You", o: ["Is", "Are"], a: "Are", r: "are" },
          { t: "Yes, I ___.", who: "I", o: ["am", "is"], a: "am", r: "am" },
          { t: "___ Rudi in Class 6A?", who: "Rudi = he", o: ["Is", "Are"], a: "Is", r: "is" },
          { t: "Yes, he ___.", who: "He", o: ["is", "are"], a: "is", r: "is" },
          { t: "___ Lina eleven?", who: "Lina = she", o: ["Is", "Are"], a: "Is", r: "is" },
          { t: "No, she ___. She is fifteen.", who: "She", o: ["isn't", "aren't"], a: "isn't", r: "is" },
        ],
      },
      {
        title: "Family Photo",
        items: [
          { t: "___ this your brother?", who: "This = one person", o: ["Is", "Are"], a: "Is", r: "is" },
          { t: "Yes, it ___. He is Bayu.", who: "It", o: ["is", "are"], a: "is", r: "is" },
          { t: "___ your parents at home?", who: "Your parents = they", o: ["Is", "Are"], a: "Are", r: "are" },
          { t: "No, they ___. They are at work.", who: "They", o: ["isn't", "aren't"], a: "aren't", r: "are" },
          { t: "I ___ not in the photo.", who: "I", o: ["am", "is"], a: "am", r: "am" },
          { t: "Mimi the cat ___ in the photo!", who: "Mimi = it", o: ["is", "are"], a: "is", r: "is" },
        ],
      },
    ],
  },
  {
    n: 3,
    kind: "fix",
    name: { en: "Fix it", id: "Perbaiki" },
    task: { en: "One word is wrong. Tap it, then choose am, is, or are.", id: "Ada satu kata yang salah. Ketuk, lalu pilih am, is, atau are." },
    variants: [
      {
        title: "My Friends",
        items: [
          { t: "Aisyah are my friend.", who: "Aisyah = she", w: 1, o: ["is", "are"], a: "is", r: "is" },
          { t: "She am eleven years old.", who: "She", w: 1, o: ["am", "is"], a: "is", r: "is" },
          { t: "I is twelve.", who: "I", w: 1, o: ["am", "is"], a: "am", r: "am" },
          { t: "Rudi and Dimas is in Class 6A.", who: "Rudi and Dimas = they", w: 3, o: ["is", "are"], a: "are", r: "are" },
          { t: "They is good at football.", who: "They", w: 1, o: ["is", "are"], a: "are", r: "are" },
          { t: "Is you in Class 6A too?", who: "You", w: 0, o: ["Is", "Are"], a: "Are", r: "are" },
        ],
      },
      {
        title: "Rudi's Family",
        items: [
          { t: "Rudi's father are a bus driver.", who: "Rudi's father = he", w: 2, o: ["is", "are"], a: "is", r: "is" },
          { t: "His mother am kind.", who: "His mother = she", w: 2, o: ["am", "is"], a: "is", r: "is" },
          { t: "Lina are fifteen.", who: "Lina = she", w: 1, o: ["is", "are"], a: "is", r: "is" },
          { t: "Rudi and Lina is at home.", who: "Rudi and Lina = they", w: 3, o: ["is", "are"], a: "are", r: "are" },
          { t: "We is good friends.", who: "We", w: 1, o: ["is", "are"], a: "are", r: "are" },
          { t: "Are he your brother?", who: "He", w: 0, o: ["Is", "Are"], a: "Is", r: "is" },
        ],
      },
    ],
  },
];

// 10 items from a new short text: 3 am, 4 is, 3 are · 6 choose + 4 correct.
export const CHECK = {
  title: "A Letter from Rudi",
  items: [
    { kind: "choose", t: "Hello! I ___ Rudi.", o: ["am", "is"], a: "am", r: "am" },
    { kind: "choose", t: "I ___ twelve years old.", o: ["am", "are"], a: "am", r: "am" },
    { kind: "choose", t: "My sister Lina ___ fifteen.", o: ["is", "are"], a: "is", r: "is" },
    { kind: "fix", t: "My parents is kind.", w: 2, o: ["is", "are"], a: "are", r: "are" },
    { kind: "choose", t: "My father ___ a bus driver.", o: ["is", "are"], a: "is", r: "is" },
    { kind: "fix", t: "His bus are big and blue.", w: 2, o: ["is", "are"], a: "is", r: "is" },
    { kind: "choose", t: "Dimas and I ___ good friends.", o: ["is", "are"], a: "are", r: "are" },
    { kind: "fix", t: "He are very tall!", w: 1, o: ["is", "are"], a: "is", r: "is" },
    { kind: "choose", t: "___ you twelve too?", o: ["Is", "Are"], a: "Are", r: "are" },
    { kind: "fix", t: "I is happy to have a pen pal.", w: 1, o: ["am", "is"], a: "am", r: "am" },
  ],
};

export const META = {
  bg: "world/bg_world1_family.webp",
  stageImg: { words: "vocab/family.webp", read: "vocab/friend.webp", pairs: "vocab/sister.webp", practice: "vocab/mother.webp", rounds: "vocab/brother.webp", check: "vocab/grandfather.webp" },
  groups: ["am", "is", "are"],
  wordsDone: { en: "You know 8 family words now. They are in your Word Bag!", id: "Sekarang kamu tahu 8 kata tentang keluarga. Semuanya ada di kantong katamu!" },
  verbPrompt: { en: "Now tap the <b class='c-verb'>verb</b>: am, is, or are?", id: "Sekarang ketuk <b>kata kerja</b>: am, is, atau are?" },
  practiceGuide: { en: "First find the subject. Then choose am, is, or are.", id: "Cari subjeknya dulu. Lalu pilih am, is, atau are." },
  goal: { en: "I can choose am, is, or are for the subject.", id: "Aku bisa memilih am, is, atau are sesuai subjeknya." },
};
