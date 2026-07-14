const books = [
  {
    code: 1,
    name: 'תנ"ך שלם',
    category: 'תנ"ך',
    price: 90,
    isBorrowed: false,
    loans: [],
  },
  {
    code: 2,
    name: "ספר תהילים",
    category: 'תנ"ך',
    price: 35,
    isBorrowed: true,
    loans: [{ borrowDate: "2026-06-01", customerCode: 101 }],
  },
  {
    code: 3,
    name: "חמישה חומשי תורה עם רש\"י",
    category: "תורה",
    price: 120,
    isBorrowed: false,
    loans: [],
  },
  {
    code: 4,
    name: "משנה תורה לרמב\"ם",
    category: "תורה",
    price: 150,
    isBorrowed: false,
    loans: [],
  },
  {
    code: 5,
    name: "מדרש רבה",
    category: "מדרש",
    price: 110,
    isBorrowed: true,
    loans: [{ borrowDate: "2026-06-15", customerCode: 104 }],
  },
  {
    code: 6,
    name: "מדרש תנחומא",
    category: "מדרש",
    price: 95,
    isBorrowed: false,
    loans: [],
  },
  {
    code: 7,
    name: "פירוש אבן עזרא על התורה",
    category: "פרשנות",
    price: 85,
    isBorrowed: false,
    loans: [],
  },
  {
    code: 8,
    name: "אור החיים הקדוש",
    category: "פרשנות",
    price: 100,
    isBorrowed: true,
    loans: [{ borrowDate: "2026-07-02", customerCode: 102 }],
  },
];

// console.log(books);

export { books };
