const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";
export const categoryRadio = [
  {
    category_id: 1,
    category_img: process.env.PUBLIC_URL + `/characters/hobee_face.png`,
    category_descript: "전체",
    value: "",
  },
  {
    category_id: 2,
    category_img: process.env.PUBLIC_URL + `/assets/category2.png`,
    category_descript: "패션의류",
    value: "패션의류",
  },
  {
    category_id: 3,
    category_img: process.env.PUBLIC_URL + `/assets/category3.png`,
    category_descript: "도서",
    value: "도서",
  },
  {
    category_id: 4,
    category_img: process.env.PUBLIC_URL + `/assets/category4.png`,
    category_descript: "생활",
    value: "생활/건강",
  },
  {
    category_id: 5,
    category_img: process.env.PUBLIC_URL + `/assets/category5.png`,
    category_descript: "식품",
    value: "식품",
  },
  {
    category_id: 6,
    category_img: process.env.PUBLIC_URL + `/assets/category6.png`,
    category_descript: "화장품",
    value: "화장품/미용",
  },
  {
    category_id: 7,
    category_img: process.env.PUBLIC_URL + `/assets/category7.png`,
    category_descript: "패션잡화",
    value: "패션잡화",
  },
  {
    category_id: 8,
    category_img: process.env.PUBLIC_URL + `/assets/category8.png`,
    category_descript: "여가",
    value: "여가/생활편의",
  },
  {
    category_id: 9,
    category_img: process.env.PUBLIC_URL + `/assets/category9.png`,
    category_descript: "디지털",
    value: "디지털/가전",
  },
  {
    category_id: 10,
    category_img: process.env.PUBLIC_URL + `/assets/category10.png`,
    category_descript: "가구",
    value: "가구/인테리어",
  },
  {
    category_id: 11,
    category_img: process.env.PUBLIC_URL + `/assets/category11.png`,
    category_descript: "육아",
    value: "출산/육아",
  },
  {
    category_id: 12,
    category_img: process.env.PUBLIC_URL + `/assets/category12.png`,
    category_descript: "스포츠",
    value: "스포츠/레저",
  },
  // {
  //   category_id: 13,
  //   category_img: process.env.PUBLIC_URL + `/assets/category5.png`,
  //   category_descript: "면세점",
  //   value: "면세점",
  // },
];
//여기서 부터 2단계 카테고리
//1번 패션의류
export const categoryRadios = [
  {
    category_id: 1,
    category_img: process.env.PUBLIC_URL + `/assets/category1.png`,
    category_descript: "전체",
    value: "",
  },
  {
    category_id: 2,
    category_img: process.env.PUBLIC_URL + `/assets/category2.png`,
    category_descript: "여성의류",
    value: "여성의류",
  },
  {
    category_id: 3,
    category_img: process.env.PUBLIC_URL + `/assets/category3.png`,
    category_descript: "남성의류/잠옷",
    value: "남성의류/잠옷",
  },
  {
    category_id: 4,
    category_img: process.env.PUBLIC_URL + `/assets/category4.png`,
    category_descript: "여성언더웨어/잠옷",
    value: "여성언더웨어/잠옷",
  },
  {
    category_id: 5,
    category_img: process.env.PUBLIC_URL + `/assets/category4.png`,
    category_descript: "남성언더웨어/잠옷",
    value: "남성언더웨어/잠옷",
  },
];
//2번째 도서
export const categoryRadiod = [
  {
    category_id: 1,
    category_img: process.env.PUBLIC_URL + `/assets/category1.png`,
    category_descript: "전체",
    value: "",
  },
  {
    category_id: 2,
    category_img: process.env.PUBLIC_URL + `/assets/category2.png`,
    category_descript: "여행",
    value: "여행",
  },
  {
    category_id: 3,
    category_img: process.env.PUBLIC_URL + `/assets/category3.png`,
    category_descript: "컴퓨터/IT",
    value: "컴퓨터/IT",
  },
  {
    category_id: 4,
    category_img: process.env.PUBLIC_URL + `/assets/category4.png`,
    category_descript: "만화",
    value: "만화",
  },
  {
    category_id: 5,
    category_img: process.env.PUBLIC_URL + `/assets/category4.png`,
    category_descript: "인문",
    value: "인문",
  },
];
export const categoryList = [
  {
    id: 1,
    value: "place",
    label: "🚩 Places",
  },
  {
    id: 2,
    value: "dish",
    label: "🍕 Dishes",
  },
];

export const ratingList = [
  {
    id: 1,
    value: "1",
    label: "1🌟",
  },
  {
    id: 2,
    value: "2",
    label: "2🌟",
  },
  {
    id: 3,
    value: "3",
    label: "3🌟",
  },
  {
    id: 4,
    value: "4",
    label: "4🌟",
  },
  {
    id: 5,
    value: "5",
    label: "5🌟",
  },
];

export const dataList = [
  {
    id: 1,
    title: "lounge resort",
    serviceTime: "45-60min",
    deliveryFee: 3.44,
    category: "place",
    cuisine: "american",
    rating: 5,
    price: 2500,
    coverSrc: "/images/places/ameri.jpg",
  },
  {
    id: 2,
    title: "door urban",
    serviceTime: "15-20min",
    deliveryFee: 4.94,
    category: "place",
    cuisine: "italian",
    rating: 4,
    price: 1000,
    coverSrc: "/images/places/italian.webp",
  },
  {
    id: 3,
    title: "chow",
    serviceTime: "30-22min",
    deliveryFee: 4.94,
    category: "place",
    cuisine: "chinese",
    rating: 3,
    price: 2000,
    coverSrc: "/images/places/china.jpg",
  },
  {
    id: 4,
    title: "wharf seafood",
    serviceTime: "10-18min",
    deliveryFee: 2.14,
    category: "place",
    cuisine: "american",
    rating: 1,
    price: 1800,
    coverSrc: "/images/places/sea.jpg",
  },
  {
    id: 5,
    title: "Tossin",
    serviceTime: "25-30min",
    deliveryFee: 6.79,
    category: "place",
    cuisine: "italian",
    rating: 5,
    price: 2000,
    coverSrc: "/images/places/italiian.jpg",
  },
  {
    id: 6,
    title: "stories noodles",
    serviceTime: "5-15min",
    deliveryFee: 2.87,
    category: "place",
    cuisine: "chinese",
    rating: 5,
    price: 3500,
    coverSrc: "/images/places/fookyew2.jpg",
  },
  {
    id: 7,
    title: "Nacho cheeseburger",
    serviceTime: "50-65min",
    deliveryFee: 8.5,
    category: "dish",
    cuisine: "american",
    rating: 2,
    price: 2200,
    coverSrc: "/images/dishes/nacho-burger.jpg",
  },
  {
    id: 8,
    title: "Mushroom Risotto",
    serviceTime: "10-15min",
    deliveryFee: 1.8,
    category: "dish",
    cuisine: "italian",
    rating: 1,
    price: 1900,
    coverSrc: "/images/dishes/Mushroom-Risotto-Recipe-1-1200.jpg",
  },
  {
    id: 9,
    title: "Shitake Fried Rice",
    serviceTime: "12-18min",
    deliveryFee: 3.33,
    category: "dish",
    cuisine: "chinese",
    rating: 4,
    price: 2750,
    coverSrc: "/images/dishes/shiitake-salmon-fried-rice-0218-103230720.jpg",
  },
  {
    id: 10,
    title: "Pesto chicken stew",
    serviceTime: "30-38min",
    deliveryFee: 1.9,
    category: "dish",
    cuisine: "american",
    rating: 2,
    price: 4350,
    coverSrc: "/images/dishes/pesto-chicken.jpg",
  },
  {
    id: 11,
    title: "Bruschetta",
    serviceTime: "16-20min",
    deliveryFee: 4.1,
    category: "dish",
    cuisine: "italian",
    rating: 3,
    price: 3300,
    coverSrc: "/images/dishes/as-tomato-bruschetta-articleLarge.jpg",
  },
  {
    id: 12,
    title: "Dim Sums",
    serviceTime: "24-30min",
    deliveryFee: 1.5,
    category: "dish",
    cuisine: "chinese",
    rating: 2,
    price: 4100,
    coverSrc: "/images/dishes/dimsums.jpg",
  },
];
