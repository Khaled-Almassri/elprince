/* ============================================================
   EL PRINCE – Main JS
   ============================================================ */

// ── NAV SCROLL EFFECT ──────────────────────────────────────
const navbar = document.getElementById('navbar');
let mobileMenuOpen = false;

function updateNavBg(instant) {
  if (instant) navbar.style.transition = 'none';
  if (window.scrollY > 60 || mobileMenuOpen) {
    navbar.classList.add('bg-brand-bg/95', 'backdrop-blur', 'shadow-lg');
  } else {
    navbar.classList.remove('bg-brand-bg/95', 'backdrop-blur', 'shadow-lg');
  }
  if (instant) requestAnimationFrame(() => { navbar.style.transition = ''; });
}

window.addEventListener('scroll', () => updateNavBg(false), { passive: true });

// ── MOBILE MENU ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  Object.assign(mobileMenu.style, {
    overflow: 'hidden',
    transition: 'max-height 0.35s ease, opacity 0.25s ease',
  });

  function openMenu() {
    mobileMenuOpen = true;
    mobileMenu.classList.remove('hidden');
    mobileMenu.style.maxHeight = '0';
    mobileMenu.style.opacity = '0';
    mobileMenu.offsetHeight; // force reflow so transition triggers
    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
    mobileMenu.style.opacity = '1';
    updateNavBg(true);
  }

  function closeMenu() {
    mobileMenuOpen = false;
    mobileMenu.style.maxHeight = '0';
    mobileMenu.style.opacity = '0';
    updateNavBg(true);
    mobileMenu.addEventListener('transitionend', () => {
      if (!mobileMenuOpen) mobileMenu.classList.add('hidden');
    }, { once: true });
  }

  hamburger.addEventListener('click', () => mobileMenuOpen ? closeMenu() : openMenu());
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

// ── REVEAL ON SCROLL ───────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

// ── SMOOTH ANCHOR SCROLL ──────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 68;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

// ── DETECT LANGUAGE (ar / en) ─────────────────────────────
const isArabic = document.documentElement.lang === 'ar';

// ── MENU DATA ─────────────────────────────────────────────
// Format: { id, labelAr, labelEn, items: [{ nameAr, nameEn, descAr, descEn, price, options:[{labelAr,labelEn,price}] }] }

const menuCategories = [
  {
    id: 'fatteh',
    labelAr: 'الفتة',
    labelEn: 'Fatteh',
    items: [
      { nameAr: 'موزة فتة (فيلة / أرز)', nameEn: 'Mutton Shank Fatteh',      price: 50 },
      { nameAr: 'فتة عكاوي',             nameEn: 'Akkawi Fatteh',             price: 52.50 },
      { nameAr: 'فتة كوارع',             nameEn: 'Knuckles Fatteh',           price: 52.20 },
      { nameAr: 'فتة الكبد الإسكندراني', nameEn: 'Alexandrian Liver Fatteh',  price: 36.50 },
      { nameAr: 'فتة لحمة',              nameEn: 'Meat Fatteh',               price: 47 },
    ]
  },
  {
    id: 'grills',
    labelAr: 'مشاوي البرنس',
    labelEn: 'Prince Grills',
    items: [
      { nameAr: 'مشاوي مشكل', nameEn: 'Mix Grills', descAr: 'كفتة، كباب، شيش طاووق', descEn: 'Kofta, kebab, sheesh Tawook',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 47.50 }, { labelAr: 'كبير', labelEn: 'L', price: 147 }] },
      { nameAr: 'مشاوي البرنس', nameEn: 'Prince Grills', descAr: 'كفتة، كباب، شيش طاووق، ريش', descEn: 'Kofta, kebab, sheesh Tawook, Ribs',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 63 }, { labelAr: 'كبير', labelEn: 'L', price: 168 }] },
      { nameAr: 'مشاوي لحوم البرنس', nameEn: 'El Prince Meat Grills', descAr: 'كباب، كفتة، ريش، طرب، حواوشي، ممبار', descEn: 'kebab, Kofta, Ribs, Tarb, Hawawshi, Mombar',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 89 }, { labelAr: 'كبير', labelEn: 'L', price: 195 }] },
      { nameAr: 'مكس كباب وكفتة', nameEn: 'Mix kebab and kofta',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 45 }, { labelAr: 'كبير', labelEn: 'L', price: 147 }] },
      { nameAr: 'مكس ريش وكباب', nameEn: 'Mix ribs and Kebab',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 63 }, { labelAr: 'كبير', labelEn: 'L', price: 168 }] },
      { nameAr: 'مكس ريش وكفتة', nameEn: 'Mix ribs and kofta',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 63 }, { labelAr: 'كبير', labelEn: 'L', price: 168 }] },
      { nameAr: 'مكس كفتة وطرب', nameEn: 'Mix kofta and tarb',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 45 }, { labelAr: 'كبير', labelEn: 'L', price: 147 }] },
      { nameAr: 'مكس طرب وريش', nameEn: 'Mix Tarab and Ribs',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 63 }, { labelAr: 'كبير', labelEn: 'L', price: 168 }] },
      { nameAr: 'كفتة لحم ضاني', nameEn: 'Lamb meat kofta',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 42 }, { labelAr: 'كبير', labelEn: 'L', price: 147 }] },
      { nameAr: 'طرب',                    nameEn: 'Tarab',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 47.50 }, { labelAr: 'كبير', labelEn: 'L', price: 152 }] },
      { nameAr: 'ريش',                    nameEn: 'Ribs',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 63 }, { labelAr: 'كبير', labelEn: 'L', price: 168 }] },
      { nameAr: 'سجق مشوي',              nameEn: 'Grilled Sausage',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 110 }] },
      { nameAr: 'ممبار مشوي',             nameEn: 'Grilled Mambar',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 110 }] },
      { nameAr: 'نيفة',                   nameEn: 'Neva',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 52 }, { labelAr: 'كبير', labelEn: 'L', price: 147 }] },
      { nameAr: 'كباب شيش',              nameEn: 'Lamb kebab',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 45 }, { labelAr: 'كبير', labelEn: 'L', price: 147 }] },
      { nameAr: 'كبدة مشوية',            nameEn: 'Grilled Liver',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 42 }, { labelAr: 'كبير', labelEn: 'L', price: 115 }] },
      { nameAr: 'موزة مشوية',            nameEn: 'Grilled moza',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 50 }, { labelAr: 'كبير', labelEn: 'L', price: 105 }] },
      { nameAr: 'فراخ مشوية عالفحم',     nameEn: 'Charcoal Grilled Chicken',  price: 42 },
      { nameAr: '½ فراخ مشوية عالفحم',  nameEn: '1/2 Charcoal Grilled Chicken', price: 26.25 },
      { nameAr: 'فراخ مكلية عالفحم',     nameEn: 'Charcoal Boneless Chicken',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 52.50 }, { labelAr: 'كبير', labelEn: 'L', price: 85 }] },
      { nameAr: '½ فراخ مكلية عالفحم',  nameEn: '1/2 Charcoal Boneless Chicken',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 110 }] },
      { nameAr: 'فرد حمام مشوي',         nameEn: 'Grilled pigeon 1 pcs',      price: 50 },
      { nameAr: '٢ فرد حمام مشوي',       nameEn: 'Grilled pigeon 2 pcs',      price: 90 },
      { nameAr: 'شيش طاووق',             nameEn: 'Sheesh Tawook',
        options: [{ labelAr: 'صغير', labelEn: 'S', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 115 }] },
    ]
  },
  {
    id: 'tajines',
    labelAr: 'طواجن خاصة',
    labelEn: 'Special Tajins',
    items: [
      { nameAr: 'بطاطس / بامية / بسلة بالدجاج', nameEn: 'Potato/green peas/okra mixed vegetables (Chicken tajin)', price: 40 },
      { nameAr: 'ملوخية (لحم أو دجاج)',  nameEn: 'Molokhia (Beef or Chicken)',  price: 42 },
      { nameAr: 'لسان عصفور (لحم أو دجاج)', nameEn: 'Tongue (Beef or Chicken)', price: 40 },
      { nameAr: 'فريك (لحم أو دجاج)',    nameEn: 'FricK (Beef or Chicken)',     price: 40 },
      { nameAr: 'مسقعة باللحمة المفرومة', nameEn: 'Mesaka with Minced meat',    price: 36.75 },
      { nameAr: 'ملوخية بالجمبري',       nameEn: 'Molokhyia with Shrimps',     price: 36.75 },
      { nameAr: 'عكاوي (لحم أو البصل)',  nameEn: 'Oxtail (vegetables or onion)', price: 50 },
      { nameAr: 'لحمة بالبصل',           nameEn: 'Meat with Onion',             price: 42 },
      { nameAr: 'خضار باللحمة الضاني',   nameEn: 'Vegetables with Lamb meat',   price: 47.75 },
      { nameAr: 'كوارع مع ورق عنب',      nameEn: 'knuckles with grape leaves',  price: 52.50 },
      { nameAr: 'عكاوي مع ورق عنب',     nameEn: 'Oxtail with grape leaves',    price: 52.50 },
      { nameAr: 'لحمة مع ورق عنب',      nameEn: 'Meat with grape Leaves',      price: 47.75 },
      { nameAr: 'لحم ضاني مع ورق عنب',  nameEn: 'lamp lamb with grape leaves', price: 52.50 },
      { nameAr: 'موزة مع خضار',          nameEn: 'Lamb soulder with Vegetables', price: 55 },
    ]
  },
  {
    id: 'pasta',
    labelAr: 'المكرونة',
    labelEn: 'Pasta',
    items: [
      { nameAr: 'مكرونة بالدجاج',        nameEn: 'Macaroni with chicken',              price: 31.50 },
      { nameAr: 'مكرونة صلصة الطماطم',   nameEn: 'Tomato sauce pasta',                 price: 15 },
      { nameAr: 'مكرونة مع دجاج بالية',  nameEn: 'Chicken pane with macaroni',         price: 36.25 },
      { nameAr: 'مكرونة بشاميل',          nameEn: 'Macaroni Bachamel',                  price: 22 },
      { nameAr: 'مكرونة بلحم',           nameEn: 'Macaroni with Meat',                 price: 26.25 },
      { nameAr: 'مكرونة بسجق',           nameEn: 'Macaroni with Sausage',              price: 35 },
      { nameAr: 'مكرونة بكبدة',          nameEn: 'Macaroni with Liver',                price: 26.50 },
      { nameAr: 'مكرونة بجمبري',         nameEn: 'Macaroni with Shrimp',               price: 36.50 },
      { nameAr: 'إسباجيتي مع دجاج بانية', nameEn: 'Spaghetti with Chicken Pane',       price: 35 },
      { nameAr: 'مكرونة المأكولات البحرية', nameEn: 'Seafood macaroni',                price: 41 },
    ]
  },
  
  {
    id: 'stuffed',
    labelAr: 'المحاشي',
    labelEn: 'Stuffeds',
    items: [
      { nameAr: 'ورق عنب',     nameEn: 'Grapes Leaves', price: 32 },
      { nameAr: 'ملفوف',       nameEn: 'Cabbage',        price: 31.50 },
      { nameAr: 'باذنجان',     nameEn: 'Eggplant',       price: 31.50 },
      { nameAr: 'كوسة',        nameEn: 'Zucchini',       price: 31.50 },
      { nameAr: 'محاشي مشكل', nameEn: 'Mix Mahashi',    price: 35 },
    ]
  },
  {
    id: 'breakfast',
    labelAr: 'وجبات الإفطار',
    labelEn: 'Breakfast',
    items: [
      // Foul & Falafel Sandwiches
      { nameAr: 'فول بالزيت والليمون',    nameEn: 'Foul with Oil and Lemon',   price: 5.25 },
      { nameAr: 'فول بالبيض',             nameEn: 'Foul with Eggs',            price: 6.25 },
      { nameAr: 'فول مع طعمية',           nameEn: 'Foul with Taamia',          price: 6.25 },
      { nameAr: 'بطاطس مهروسة',           nameEn: 'Mashed Potato',             price: 6.25 },
      { nameAr: 'بطاطس مهروسة بالبيض',   nameEn: 'Mashed Potato with Eggs',   price: 7.25 },
      { nameAr: 'بطاطس محمرة',            nameEn: 'French Fries',              price: 6.25 },
      { nameAr: 'مسقعة',                  nameEn: 'Mosakaa',                   price: 5.25 },
      { nameAr: 'طعمية سادة',             nameEn: 'Taamia Plain',              price: 5.25 },
      { nameAr: 'طعمية بالبيض',           nameEn: 'Taamia with Eggs',          price: 6.25 },
      { nameAr: 'ساندويتش بيض بالسجق',   nameEn: 'Egg with Pastrami',         price: 8 },
      { nameAr: 'ساندويتش طعمية مع نقلية', nameEn: 'Taamia with Taklia',      price: 5.25 },
      { nameAr: 'طعمية بالسجق',           nameEn: 'Taamia with Pastrami',      price: 7.50 },
      { nameAr: 'بطاطس بجبن تركي',       nameEn: 'French Fries with Turkey Cheese', price: 7.50 },
      { nameAr: 'شكشوكة',                nameEn: 'Shakshouka',                price: 6.25 },
      { nameAr: 'جبنة بيضاء بالطماطم',  nameEn: 'White cheese with tomato',  price: 6.25 },
      // Foul & Falafel Plates
      { nameAr: 'طبق فول بالبيض',        nameEn: 'Foul with Eggs (plate)',    price: 15 },
      { nameAr: 'ميكس سرويس',            nameEn: 'Mix Service',               price: 31.50 },
      { nameAr: 'طبق مسقعة',             nameEn: 'Moussaka',                  price: 12.50 },
      { nameAr: 'فول إسكندراني',         nameEn: 'Alex Beans',                price: 12.50 },
      { nameAr: 'طبق شكشوكة',            nameEn: 'Shakshouka (plate)',        price: 16.75 },
      { nameAr: 'طبق بيض بالسجق',        nameEn: 'Eggs and Pastrami',         price: 17.75 },
      { nameAr: 'طبق بطاطس محمرة',       nameEn: 'French Fries (plate)',      price: 12 },
      { nameAr: 'طبق فول بالسجق',        nameEn: 'Foul with Sausage',         price: 21 },
      { nameAr: 'طبق باذنجان مقلي',      nameEn: 'Fried Eggplant',            price: 15 },
      { nameAr: 'فلافل',                 nameEn: 'Falafel',                   price: 10.50 },
      { nameAr: 'بيض مقلي',              nameEn: 'Fried Egg',                 price: 10.50 },
      { nameAr: 'بطاطس مهروسة',          nameEn: 'Mashed Potato (plate)',     price: 12.50 },
      { nameAr: 'جبنة بالطماطم',         nameEn: 'Cheese with tomato',        price: 12.50 },
      { nameAr: 'صينية البرنس',          nameEn: 'Synet El Prince', price: 72,
        descAr: 'طبق فول بالزيت والليمون أو الطحينية، بطاطس مهروسة، طبق موسقعة، فلافل، بيض بالسجق، بطاطس محمرة، طبق مخلل، خبز، شرائح بصل، فلفل أخضر، ٤ كوب شاي بالنعناع',
        descEn: 'Beans plate with lemon oil or tahini mashed potato plate, Moussaka plate, Falafel, Egg plate, pickled tomato, Mixed Pickled, bread, onion slice, green onion – four cups of tea with mint' },
      { nameAr: 'صينية الصباح',          nameEn: 'Synet El Sohab', price: 62,
        descAr: 'طبق فول بالزيت أو الطحينية، جبنة بيضاء مع الطماطم، طبق بيض بالسجق، طبق مخلل، خبز، بصل مخلل، شرائح بصل أخضر، ٣ كوب شاي بالنعناع',
        descEn: 'Beans plate with lemon oil or tahini, cheese with tomatoes, Moussaka plate, Egg with pastrami, pickled tomato, Mixed Pickled, bread, onion slice, green onion – three cups of tea with mint' },
      { nameAr: 'صينية التوفير',         nameEn: 'Synet El Tawfeer', price: 41,
        descAr: 'طبق فول بالزيت أو الطحينية، مطبقة فتة، جبنة بيضاء، طبق مخلل، طماطم، ميكس مخلل، شرائح بصل أخضر، ٢ كوب شاي بالنعناع',
        descEn: 'Beans plate with lemon oil or tahini mashed potato plate, falafel plate, pickled tomato, Mixed pickled, bread, green onion slice – two cups of tea with mint' },
    ]
  },
  {
    id: 'soups',
    labelAr: 'الشوربات',
    labelEn: 'Soups',
    items: [
      { nameAr: 'شوربة كوارع',        nameEn: 'Knuckles soup',    price: 26.25 },
      { nameAr: 'شوربة خضار',         nameEn: 'Vegetable soup',   price: 11.50 },
      { nameAr: 'شوربة لسان عصفور',   nameEn: 'Tongue soup',      price: 11.50 },
      { nameAr: 'شوربة العدس',         nameEn: 'Lentil soup',      price: 11.50 },
      { nameAr: 'شوربة لحم',          nameEn: 'Veal meat soup',   price: 10 },
      { nameAr: 'شوربة حمام',         nameEn: 'Pigeon soup',      price: 26.25 },
      { nameAr: 'شوربة المأكولات البحرية', nameEn: 'Sea food soup', price: 26.25 },
    ]
  },
  {
    id: 'sandwiches',
    labelAr: 'ساندويتشات اللحم',
    labelEn: 'Meat Sandwiches',
    items: [
      { nameAr: 'شيش طاووق',         nameEn: 'Shish Tawook',             price: 15.75 },
      { nameAr: 'كباب لحم',           nameEn: 'Lamb kebab',               price: 15.75 },
      { nameAr: 'طرب لحم',            nameEn: 'Lamb Tarab',               price: 15.75 },
      { nameAr: 'كفتة ضاني',          nameEn: 'Lamb kofta',               price: 15.75 },
      { nameAr: 'كبدة إسكندراني',     nameEn: 'Alex. Liver',              price: 12 },
      { nameAr: 'سجق إسكندراني',      nameEn: 'Alex. Sausage',            price: 12 },
      { nameAr: 'كبدة بالية',         nameEn: 'Beef liver pane',          price: 12 },
      { nameAr: 'مخ بالية',           nameEn: 'Fried brain',              price: 14 },
      { nameAr: 'هواوشي بالحمة',      nameEn: 'Hawawshi Meat',            price: 21 },
      { nameAr: 'هواوشي لحم بالجبنة', nameEn: 'Meat With Cheese Hawawshi', price: 24.50 },
      { nameAr: 'هواوشي بالسجق',      nameEn: 'Hawawshi Sausage',          price: 22.50 },
      { nameAr: 'هواوشي سجق بالجبنة', nameEn: 'Sausage with cheese Hawawshi', price: 26.25 },
      { nameAr: 'دجاج بانية',          nameEn: 'Chicken pane',             price: 12 },
      { nameAr: 'جمبري',              nameEn: 'Shrimps',                  price: 15.75 },
      { nameAr: 'ريف مشكل كبدة ومخ',  nameEn: 'Mixed Liver & Brain',      price: 15 },
      { nameAr: 'ريف مشكل سمين',      nameEn: 'Mix Smeen',                price: 15 },
      { nameAr: 'طحال بلدي',          nameEn: 'Baladi spleen',            price: 15 },
      { nameAr: 'رغيف لحمة رأس ولسان', nameEn: 'Head Meat & Tongue',     price: 15 },
    ]
  },
  {
    id: 'pizza',
    labelAr: 'البيتزا',
    labelEn: 'Pizza',
    items: [
      { nameAr: 'بيتزا مارجريتا',   nameEn: 'Margarita pizza',   options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.25 }, { labelAr: 'كبير', labelEn: 'L', price: 36.50 }] },
      { nameAr: 'بيتزا لحم',        nameEn: 'Meat pizza',        options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.25 }, { labelAr: 'كبير', labelEn: 'L', price: 36.50 }] },
      { nameAr: 'بيتزا هوت دوق',    nameEn: 'Pizza Hotdog',      options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.25 }, { labelAr: 'كبير', labelEn: 'L', price: 36.50 }] },
      { nameAr: 'بيتزا بسطرمة',     nameEn: 'Pizza Basturma',    options: [{ labelAr: 'وسط', labelEn: 'M', price: 36.50 }, { labelAr: 'كبير', labelEn: 'L', price: 42.75 }] },
      { nameAr: 'بيتزا دجاج',       nameEn: 'Chicken pizza',     options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.25 }, { labelAr: 'كبير', labelEn: 'L', price: 36.25 }] },
      { nameAr: 'بيتزا سجق',        nameEn: 'Sausage pizza',     options: [{ labelAr: 'وسط', labelEn: 'M', price: 36.50 }, { labelAr: 'كبير', labelEn: 'L', price: 42.25 }] },
      { nameAr: 'بيتزا سي فود',     nameEn: 'Pizza Seafood',     options: [{ labelAr: 'وسط', labelEn: 'M', price: 47 }, { labelAr: 'كبير', labelEn: 'L', price: 57.50 }] },
      { nameAr: 'بيتزا تونا',       nameEn: 'Pizza Tuna',        options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.25 }, { labelAr: 'كبير', labelEn: 'L', price: 36.50 }] },
    ]
  },
  {
    id: 'koshari',
    labelAr: 'الكشري',
    labelEn: 'Koshari',
    items: [
      { nameAr: 'كشري عادي',    nameEn: 'Koshari Original',  options: [{ labelAr: 'صغير', labelEn: 'S', price: 15 }, { labelAr: 'وسط', labelEn: 'M', price: 20 }, { labelAr: 'عائلي', labelEn: 'Family', price: 40 }] },
      { nameAr: 'كشري سبيشيال', nameEn: 'Koshari Special',   options: [{ labelAr: 'صغير', labelEn: 'S', price: 18 }, { labelAr: 'وسط', labelEn: 'M', price: 23 }, { labelAr: 'عائلي', labelEn: 'Family', price: 46 }] },
      { nameAr: 'كشري دجاج',    nameEn: 'Koshari Chicken',   options: [{ labelAr: 'صغير', labelEn: 'S', price: 21 }, { labelAr: 'وسط', labelEn: 'M', price: 26.25 }] },
      { nameAr: 'كشري لحم',     nameEn: 'Koshari Meat',      options: [{ labelAr: 'صغير', labelEn: 'S', price: 21 }, { labelAr: 'وسط', labelEn: 'M', price: 26.25 }] },
      { nameAr: 'كشري كبدة',    nameEn: 'Koshari Liver',     options: [{ labelAr: 'صغير', labelEn: 'S', price: 21 }, { labelAr: 'وسط', labelEn: 'M', price: 26.25 }] },
      { nameAr: 'كشري هوت دوج', nameEn: 'Koshari Hotdog',    options: [{ labelAr: 'صغير', labelEn: 'S', price: 21 }, { labelAr: 'وسط', labelEn: 'M', price: 26.25 }] },
      { nameAr: 'كشري تونا',    nameEn: 'Koshari Tuna',      options: [{ labelAr: 'صغير', labelEn: 'S', price: 21 }, { labelAr: 'وسط', labelEn: 'M', price: 26.25 }] },
      { nameAr: 'كشري جمبري',   nameEn: 'Koshari Shrimp',    options: [{ labelAr: 'صغير', labelEn: 'S', price: 21 }, { labelAr: 'وسط', labelEn: 'M', price: 26.25 }] },
      { nameAr: 'كشري سجق',     nameEn: 'Koshari Sausage',   options: [{ labelAr: 'صغير', labelEn: 'S', price: 21 }, { labelAr: 'وسط', labelEn: 'M', price: 26.25 }] },
    ]
  },
  {
    id: 'hotmoshaltet',
    labelAr: 'مشلتت حار',
    labelEn: 'Hot Moshaltet',
    items: [
      { nameAr: 'دجاج',         nameEn: 'Chicken',    options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 42 }] },
      { nameAr: 'هوت دوج',      nameEn: 'Hotdog',     options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 42 }] },
      { nameAr: 'لحمة مفرومة',  nameEn: 'Meat',       options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 42 }] },
      { nameAr: 'مشكل جبن',     nameEn: 'Mix cheese', options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 42 }] },
      { nameAr: 'سجق',          nameEn: 'Sausage',    options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 42 }] },
      { nameAr: 'بسطرمة',       nameEn: 'Bastrama',   options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 42 }] },
      { nameAr: 'تونة',         nameEn: 'Tuna',       options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 42 }] },
      { nameAr: 'مكس سي فود',   nameEn: 'Sea food',   options: [{ labelAr: 'وسط', labelEn: 'M', price: 40 }, { labelAr: 'كبير', labelEn: 'L', price: 50 }] },
      { nameAr: 'روبيان',       nameEn: 'Shrimp',     options: [{ labelAr: 'وسط', labelEn: 'M', price: 40 }, { labelAr: 'كبير', labelEn: 'L', price: 50 }] },
    ]
  },
  {
    id: 'sweetmoshaltet',
    labelAr: 'مشلتت حلو',
    labelEn: 'Sweet Moshaltet',
    items: [
      { nameAr: 'كاستر',             nameEn: 'Caster',            options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 35.75 }] },
      { nameAr: 'الكرافت والعسل',    nameEn: 'Kraft with Honey',  options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 36.75 }] },
      { nameAr: 'فشتقة وعسل',        nameEn: 'Cream with Honey',  options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 36.75 }] },
      { nameAr: 'سادة (سكر وعسل)',   nameEn: 'Plain',             options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 42 }] },
      { nameAr: 'بغاشة',             nameEn: 'Bogasha',           options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 36.75 }] },
      { nameAr: 'نوتيلا',            nameEn: 'Nutella',           options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 42 }] },
      { nameAr: 'كنافة',             nameEn: 'Kunafa',            options: [{ labelAr: 'وسط', labelEn: 'M', price: 31.50 }, { labelAr: 'كبير', labelEn: 'L', price: 36.75 }] },
    ]
  },
  {
    id: 'semeen',
    labelAr: 'فراكس السمين',
    labelEn: 'Semeen',
    items: [
      { nameAr: 'سمين مشكل',      nameEn: 'Mixed semeen',          price: 36.50 },
      { nameAr: 'قلوب',           nameEn: 'Hearts', descAr: 'قلوب الكبد مع السلطات', descEn: 'Hearts of calf with salads', price: 31.50 },
      { nameAr: 'لسان',           nameEn: 'Tounge', descAr: 'لسان الكبد مع السلطات', descEn: 'Tongue of calf with salads', price: 31.50 },
      { nameAr: 'طحال مقلي',      nameEn: 'Fried Tohal',           price: 31.50 },
      { nameAr: 'مبارز مقلي',     nameEn: 'Fried spices Spaghetti', price: 31.50 },
      { nameAr: 'ممبار مقلي',     nameEn: 'Fried Mombar', descAr: 'ممبار مقلي محشو بالأرز', price: 31.50 },
      { nameAr: 'لحمة الرأس',     nameEn: 'Head meat',              price: 31.50 },
    ]
  },
  {
    id: 'rice',
    labelAr: 'الأرز',
    labelEn: 'Rice',
    items: [
      { nameAr: 'أرز الشعيرية',       nameEn: 'Vermicelli rice',      price: 13 },
      { nameAr: 'أرز بالخلطة',        nameEn: 'Mixed rice',           price: 18 },
      { nameAr: 'الأرز الأبيض',       nameEn: 'White rice',           price: 10.50 },
      { nameAr: 'فتة',                nameEn: 'Fatteh',               price: 18 },
      { nameAr: 'أرز معمر سادة',      nameEn: 'Moaamer rice',         price: 20 },
      { nameAr: 'أرز معمر بالدجاج',   nameEn: 'Moaamer chicken',      price: 30 },
      { nameAr: 'أرز معمر باللحم',    nameEn: 'Moaamer meat',         price: 35 },
      { nameAr: 'أرز معمر بالجمبري',  nameEn: 'Moaamer shrimps',      price: 35 },
    ]
  },
  {
    id: 'salads',
    labelAr: 'السلطات والمقبلات',
    labelEn: 'Salads & Appetizers',
    items: [
      { nameAr: 'سلطة عربي',        nameEn: 'Arabic Salad',           price: 11.50 },
      { nameAr: 'سلطة فتوش',        nameEn: 'Fattoush Salad',         price: 15.75 },
      { nameAr: 'باذنجان مخلل',      nameEn: 'Pickled Eggplant',       price: 7.50 },
      { nameAr: 'سلطة طحينية',       nameEn: 'Tahina Salad',           price: 9.50 },
      { nameAr: 'سلطة مشكل',        nameEn: 'Mixed Salad',            price: 11.50 },
      { nameAr: 'طماطم مخللة مشكلة', nameEn: 'Pickled Tomato',        price: 7.50 },
      { nameAr: 'سلطة الحمص',       nameEn: 'Hummus salad',           price: 12.50 },
      { nameAr: 'سلطة الثومية',      nameEn: 'Garlic Salad',          price: 8.50 },
    ]
  },
  {
    id: 'hotcrape',
    labelAr: 'الكريب الحار',
    labelEn: 'Hot Crape',
    items: [
      { nameAr: 'فاهيتا دجاج',        nameEn: 'Chicken Fajita',     price: 26.25 },
      { nameAr: 'فاهيتا لحمة',        nameEn: 'Meat Fajita',        price: 26.25 },
      { nameAr: 'مكس جبنة',           nameEn: 'Mix Cheese',         price: 26.25 },
      { nameAr: 'مكس لحوم',           nameEn: 'Mix meat',           price: 26.25 },
      { nameAr: 'سجق',                nameEn: 'Sausage',            price: 31.50 },
      { nameAr: 'كبدة إسكندراني',     nameEn: 'Iskandrani liver',   price: 26.25 },
    ]
  },
  {
    id: 'sweetcrape',
    labelAr: 'الكريب الحلو',
    labelEn: 'Sweet Crape',
    items: [
      { nameAr: 'نوتيلا',            nameEn: 'Nutella',         price: 31.50 },
      { nameAr: 'لوتس',              nameEn: 'Lotus',           price: 26.25 },
      { nameAr: 'وايت شوكليت',       nameEn: 'White Chocolate', price: 26.25 },
      { nameAr: 'باستيشيو',          nameEn: 'Pasticheo',       price: 26.25 },
      { nameAr: 'مكس شوكليت',        nameEn: 'Mix Chocolate',   price: 31.50 },
    ]
  },
  {
    id: 'desserts',
    labelAr: 'الحلويات',
    labelEn: 'Desserts',
    items: [
      { nameAr: 'أم علي',                  nameEn: 'Umm Ali',                    price: 15.75 },
      { nameAr: 'طاجن أرز باللبن',         nameEn: 'Oven rice pudding tajin',    price: 15.75 },
      { nameAr: 'أرز باللبن',              nameEn: 'Rice pudding',               price: 9.50 },
      { nameAr: 'كنافة بالمانجو (صغير)',   nameEn: 'Kunafa with mango (S)',      price: 15.75 },
      { nameAr: 'كنافة بالمانجو (كبير)',   nameEn: 'Kunafa with mango (L)',      price: 78.50 },
      { nameAr: 'كاسترد',                  nameEn: 'Custard',                    price: 6.25 },
      { nameAr: 'أرز باللبن بالمكسرات',   nameEn: 'Rice Milk with Nuts',        price: 13 },
    ]
  },
  {
    id: 'drinks',
    labelAr: 'المشروبات',
    labelEn: 'Juices & Beverages',
    items: [
      { nameAr: 'مياه معدنية', nameEn: 'Mineral water', price: 2.25 },
      { nameAr: 'مشروبات غازية', nameEn: 'Soft drinks',  price: 4.25 },
      { nameAr: 'شاي', nameEn: 'Tea',              price: 3.25 },
      { nameAr: 'عنب', nameEn: 'Annab',            options: [{ labelAr: 'صغير', labelEn: 'S', price: 10.50 }, { labelAr: 'كبير', labelEn: 'L', price: 21 }] },
      { nameAr: 'سوبيا', nameEn: 'Sobia',          options: [{ labelAr: 'صغير', labelEn: 'S', price: 10.50 }, { labelAr: 'كبير', labelEn: 'L', price: 21 }] },
      { nameAr: 'تمر هندي', nameEn: 'Tamarind',    options: [{ labelAr: 'صغير', labelEn: 'S', price: 10.50 }, { labelAr: 'كبير', labelEn: 'L', price: 21 }] },
      { nameAr: 'خروب', nameEn: 'Kharob',          options: [{ labelAr: 'صغير', labelEn: 'S', price: 10.50 }, { labelAr: 'كبير', labelEn: 'L', price: 21 }] },
      { nameAr: 'قصب سكر', nameEn: 'Sugar Cane',   options: [{ labelAr: 'صغير', labelEn: 'S', price: 15.75 }, { labelAr: 'كبير', labelEn: 'L', price: 31.50 }] },
    ]
  },
  {
    id: 'kids',
    labelAr: 'قائمة الأطفال',
    labelEn: 'Kids Menu',
    items: [
      { nameAr: 'قطع الدجاج', nameEn: 'Chicken nuggets',  price: 15.50 },
      { nameAr: 'شيكن ستراس', nameEn: 'Checkin Strips',   price: 15.50 },
    ]
  },
  {
    id: 'economic',
    labelAr: 'الوجبات الاقتصادية',
    labelEn: 'Economic Meals',
    items: [
      { nameAr: 'دجاج محمر مع خضار اليوم',  nameEn: 'Roasted Chicken with Vegetables', price: 25 },
      { nameAr: 'دجاج مشوي مع خضار اليوم',  nameEn: 'Grilled Chicken with Vegetables', price: 25 },
      { nameAr: 'لحم محمر مع خضار اليوم',   nameEn: 'Fried beef with Vegetables',      price: 25 },
      { nameAr: 'كفتة مع الأرز',             nameEn: 'Kufta with Rice',                 price: 25 },
      { nameAr: 'دجاج بانية مع مكرونة',      nameEn: 'Chicken Pane with Pasta',         price: 25 },
    ]
  },
  {
    id: 'special',
    labelAr: 'وجبات مميزة',
    labelEn: 'Special Meals',
    items: [
      { nameAr: 'وجبة حمام محشي',           nameEn: 'Stuffed pigeon 1pcs', price: 50,
        descAr: 'الأرز بالزبادي والريحان، طبق سلطة، خبز / بقسماط / تحميص', descEn: 'Khalta rice or freeka served with soup/salad/Pickles/tahina/bread' },
      { nameAr: 'وجبة لحمة البرنس كوارع',   nameEn: 'Meal Pepper meat Al Prince', price: 47.25,
        descAr: 'الأرز / السلطة / السلطة / الشوربة / خبز / بقسماط', descEn: 'rice/soup/salad/pickled/tahina/bread' },
      { nameAr: 'وجبة ½ بطة محمرة',         nameEn: '1/2 Duck served',      price: 75,
        descAr: 'أرز / سلطة / مخلل / شوربة / شاي / خبز', descEn: 'rice/soup/salad/Pickles/tahina/bread' },
      { nameAr: 'وجبة ¼ بطة محمرة',         nameEn: '1/4 Duck served',      price: 50,
        descAr: 'أرز / سلطة / مخلل / شوربة / شاي / خبز', descEn: 'rice/soup/salad/pickled/tahina/bread' },
      { nameAr: 'وجبة دجاجة كاملة محمرة',   nameEn: 'Fried whole chicken meal', price: 52.50,
        descAr: 'أرز / سلطة / مخلل / شوربة / خبز', descEn: 'rice / soup/ salad/pickled/tahina/bread' },
      { nameAr: 'وجبة موزة محمرة',           nameEn: 'Meal lamp soulder with mixed stuffeds served', price: 78,
        descAr: 'السلطة / الشوربة / مخلل / طحينية / خبز', descEn: 'soup/salad/pickled/tahina/bread' },
      { nameAr: 'وجبة ٢ فرد حمام محشي',     nameEn: 'Egyptian stuffed pigeon 2pcs', price: 95,
        descAr: 'الأرز بالزبادي والريحان مع الشوربة، سلطة، خبز / بقسماط', descEn: 'Khalta rice or freeka served with soup/salad/Pickles/tahina/bread' },
      { nameAr: 'وجبة بطة مصرية محشية',     nameEn: 'Egyptian stuffed DUCK', price: 138,
        descAr: 'الأرز بالزبادي والريحان مع الشوربة، سلطة، مخلل', descEn: 'Khalta rice or freeka served with soup/salad/Pickles' },
      { nameAr: 'وجبة بطة مصرية محشية كاملة', nameEn: 'Egyptian stuffed duck', price: 160,
        descAr: 'الأرز بالزبادي والريحان مع الشوربة، سلطة، مخلل', descEn: 'Khalta rice or freeka served with soup/salad/Pickles' },
      { nameAr: 'وجبة بطة محشية + حمام محشي', nameEn: 'Egyptian stuffed duck + Stuffed pigeon (1pcs)', price: 220,
        descAr: 'أرز مشكل / محشي / ميكس مشكل / شوربة / سلطة / مخلل / طحينة / خبز', descEn: 'Mixed rice, mahshi, Soup, salad, pickled, tahina, bread' },
    ]
  },
  {
    id: 'elprince',
    labelAr: 'أطباق البرنس',
    labelEn: 'EL Prince Dishes',
    items: [
      { nameAr: 'طبق كبدة إسكندراني', nameEn: 'Alex Liver',    options: [{ labelAr: 'طبق', labelEn: 'Plate', price: 26.25 }, { labelAr: 'كجم', labelEn: 'Kg', price: 68.25 }] },
      { nameAr: 'طبق كبدة بالية',     nameEn: 'Liver Pane',    options: [{ labelAr: 'طبق', labelEn: 'Plate', price: 26.25 }, { labelAr: 'كجم', labelEn: 'Kg', price: 84 }] },
      { nameAr: 'طبق مخ بالية',       nameEn: 'Fried Brain',   options: [{ labelAr: 'طبق', labelEn: 'Plate', price: 31.5 }, { labelAr: 'كجم', labelEn: 'Kg', price: 84 }] },
      { nameAr: 'طبق سجق إسكندراني', nameEn: 'Alex Sausage',  options: [{ labelAr: 'طبق', labelEn: 'Plate', price: 31.5 }, { labelAr: 'كجم', labelEn: 'Kg', price: 89.25 }] },
      { nameAr: 'طبق دجاج بانية',     nameEn: 'Chicken pane',  price: 26.25 },
    ]
  },
  {
    id: 'vegetables',
    labelAr: 'أطباق الخضار',
    labelEn: 'Vegetable Dishes',
    items: [
      { nameAr: 'طبق الفاصوليا البيضاء', nameEn: 'White beans plate',  price: 17 },
      { nameAr: 'طبق بامية',             nameEn: 'Okra plate',          price: 17 },
      { nameAr: 'طبق بسلة خضراء',        nameEn: 'Green peas plate',    price: 17 },
      { nameAr: 'طبق البطاطس',           nameEn: 'Potato plate',        price: 17 },
      { nameAr: 'خضار مشكل',             nameEn: 'Mix vegetables',      price: 17 },
      { nameAr: 'ملوخية',                nameEn: 'Molokheya with tasha', price: 21 },
    ]
  },
];

// ── BUILD MENU ─────────────────────────────────────────────
function buildMenu() {
  const tabBar   = document.getElementById('tab-bar');
  const panels   = document.getElementById('menu-panels');
  if (!tabBar || !panels) return;

  menuCategories.forEach((cat, idx) => {
    const label = isArabic ? cat.labelAr : cat.labelEn;

    // Tab button
    const tab = document.createElement('button');
    tab.className = `menu-tab whitespace-nowrap px-4 py-2 text-xs sm:text-sm font-bold border border-brand-border text-brand-muted hover:text-brand-cream transition-all flex-shrink-0 ${idx === 0 ? 'active' : ''}`;
    tab.dataset.cat = cat.id;
    tab.textContent = label;
    tab.addEventListener('click', () => switchTab(cat.id));
    tabBar.appendChild(tab);

    // Panel
    const panel = document.createElement('div');
    panel.id = `panel-${cat.id}`;
    panel.className = `menu-panel ${idx === 0 ? 'active' : ''}`;

    let html = `<div class="flex items-center gap-3 mb-6"><div class="h-7 w-1.5 bg-brand-red rounded-full"></div><h3 class="text-xl sm:text-2xl font-black text-brand-cream">${label}</h3></div>`;
    html += `<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">`;

    cat.items.forEach(item => {
      const name = isArabic ? item.nameAr : item.nameEn;
      const desc = isArabic ? (item.descAr || '') : (item.descEn || '');

      html += `<div class="menu-item bg-brand-raised border border-brand-border rounded-lg p-4 transition-colors relative overflow-hidden">`;
      html += `<div class="absolute inset-y-0 start-0 w-1 bg-brand-red rounded-s-lg"></div>`;
      html += `<div class="flex items-start justify-between gap-2 ps-2">`;
      html += `<h4 class="font-bold text-brand-cream text-sm leading-snug flex-1">${name}</h4>`;

      if (item.price && !item.options) {
        html += `<span class="text-brand-gold font-black text-sm whitespace-nowrap">${item.price} <span class="text-brand-muted font-normal text-xs">د.إ</span></span>`;
      }
      html += `</div>`;

      if (desc) {
        html += `<p class="text-brand-muted text-xs leading-relaxed mt-1">${desc}</p>`;
      }

      if (item.options && item.options.length) {
        html += `<div class="flex flex-wrap gap-1.5 mt-2">`;
        item.options.forEach(opt => {
          const ol = isArabic ? opt.labelAr : opt.labelEn;
          html += `<span class="inline-flex items-center gap-1.5 bg-brand-surface border border-brand-border rounded-full px-2.5 py-1 text-xs">
            <span class="text-brand-muted">${ol}</span>
            <span class="text-brand-gold font-bold">${opt.price}</span>
          </span>`;
        });
        html += `</div>`;
      }

      html += `</div>`;
    });

    html += `</div>`;
    html += `<p class="text-brand-muted/40 text-xs mt-6 text-${isArabic ? 'right' : 'left'}">جميع الأسعار شاملة ضريبة القيمة المضافة 5٪</p>`;
    panel.innerHTML = html;
    panels.appendChild(panel);
  });
}

function switchTab(catId) {
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  const tab = document.querySelector(`.menu-tab[data-cat="${catId}"]`);
  const panel = document.getElementById(`panel-${catId}`);
  if (tab) tab.classList.add('active');
  if (panel) panel.classList.add('active');
  // Scroll tab into view and reset panel scroll position
  if (tab) tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  const panelsEl = document.getElementById('menu-panels');
  if (panelsEl) panelsEl.scrollTop = 0;
}

// Init
buildMenu();

// ── TICKER STRIP ──────────────────────────────────────────
(function () {
  const section = document.querySelector('.ticker-section');
  if (!section) return;

  const track  = section.querySelector('.ticker-track');
  const source = track.querySelector('.ticker-list');

  function build() {
    // Remove all clones, keeping only the original source list
    while (track.children.length > 1) track.removeChild(track.lastChild);

    // Cut animation before remeasuring
    track.classList.remove('ticker-running');
    void track.offsetWidth; // force reflow

    const vw    = window.innerWidth;
    const listW = source.offsetWidth;
    if (!listW) return;

    // Total copies must be even so translateX(-50%) lands on a copy boundary
    let copies = Math.ceil((2 * vw) / listW);
    if (copies % 2 !== 0) copies++;
    copies = Math.max(copies, 2);

    for (let i = 1; i < copies; i++) {
      track.appendChild(source.cloneNode(true));
    }

    // Duration keeps visual speed at ~40 px/s
    const duration = ((listW * copies) / 2) / 40;
    track.style.setProperty('--ticker-duration', duration.toFixed(2) + 's');
    track.classList.add('ticker-running');
  }

  // Measure after fonts are ready so offsetWidth is accurate
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(build);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 150);
  }, { passive: true });
})();