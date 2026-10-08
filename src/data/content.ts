// Central content file for the Batik Sembagi site.
// All product, testimonial, process, and gallery data lives here.

export const brand = {
  name: 'Adhimas Batik Sembagi',
  tagline: 'Warisan Batik Tulis Handmade',
  whatsappNumber: '6285845987124',
  whatsappDisplay: '+62 858 45987124',
  email: 'halo@adhimasbatik.id',
  phone: '+62 858 45987124',
  instagram: '@adhimasbatik',
  instagramUrl: 'https://instagram.com',
  tiktok: '@adhimasbatik',
  openingHours: 'Senin – Sabtu: 09.00 – 17.00 WIB (Minggu Tutup)',
  address: 'Jl. Mlati Tromol Pos 2, Sleman, Yogyakarta 55281',
  year: 2026,
};

export const whatsappLink = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
  'Halo Adhimas Batik Sembagi, saya tertarik dengan koleksi batik tulis Anda.'
)}`;

export function whatsappProductLink(productName: string) {
  const msg = `Halo, saya tertarik dengan produk ${productName}. Apakah produk ini masih tersedia?`;
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

export function whatsappConsultationLink(topic: string = 'Konsultasi Batik') {
  const msg = `Halo ${brand.name}, saya ingin melakukan ${topic}. Mohon info kelanjutannya.`;
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

export const navLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Koleksi', href: '/koleksi' },
  { label: 'Tentang Kami', href: '/#tentang' },
  { label: 'Proses', href: '/#proses' },
  { label: 'Galeri', href: '/#galeri' },
  { label: 'Kontak', href: '/#kontak' },
];

const img = (id: number, w = 940) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const heroImage = img(32232883, 1400);

export const brandIntroImage = img(35243554, 1000);

// --- Collection product data ---

export type ProductCategory =
  | 'Kain Batik'
  | 'Kemeja Batik'
  | 'Dress Batik'
  | 'Outer Batik'
  | 'Batik Eksklusif'
  | 'Limited Edition';

export type ProductStatus = 'Tersedia' | 'Pre-order' | 'Limited Edition';

export type CollectionProduct = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  motif: string;
  fabric: string;
  price: number;
  priceDisplay: string;
  status: ProductStatus;
  badge?: string;
  image: string;
  description: string;
  popularity: number;
  createdAt: number;
};

export const collectionProducts: CollectionProduct[] = [
  {
    id: '1',
    slug: 'batik-tulis-parang-senja',
    name: 'Batik Tulis Parang Senja',
    category: 'Kain Batik',
    motif: 'Parang',
    fabric: 'Katun Premium',
    price: 850000,
    priceDisplay: 'Rp850.000',
    status: 'Tersedia',
    badge: 'Best Seller',
    image: img(37877554, 800),
    description: 'Kain batik tulis dengan motif Parang dalam gradasi warna senja yang hangat. Dikerjakan manual oleh pengrajin berpengalaman.',
    popularity: 95,
    createdAt: 6,
  },
  {
    id: '2',
    slug: 'batik-tulis-kawung-aruna',
    name: 'Batik Tulis Kawung Aruna',
    category: 'Kain Batik',
    motif: 'Kawung',
    fabric: 'Primisima',
    price: 1200000,
    priceDisplay: 'Rp1.200.000',
    status: 'Tersedia',
    badge: 'New',
    image: img(35296787, 800),
    description: 'Motif Kawung yang melambangkan keseimbangan, dihadirkan pada kain primisima dengan teknik batik tulis penuh ketelitian.',
    popularity: 88,
    createdAt: 14,
  },
  {
    id: '3',
    slug: 'batik-tulis-sido-mukti',
    name: 'Batik Tulis Sido Mukti',
    category: 'Limited Edition',
    motif: 'Sido Mukti',
    fabric: 'Sutra',
    price: 1750000,
    priceDisplay: 'Rp1.750.000',
    status: 'Limited Edition',
    badge: 'Limited',
    image: img(32027613, 800),
    description: 'Edisi terbatas motif Sido Mukti pada kain sutra premium. Setiap helai bernilai harapan akan kehidupan yang penuh kebahagiaan.',
    popularity: 92,
    createdAt: 3,
  },
  {
    id: '4',
    slug: 'batik-tulis-sekar-jagad',
    name: 'Batik Tulis Sekar Jagad',
    category: 'Kain Batik',
    motif: 'Sekar Jagad',
    fabric: 'Katun Premium',
    price: 950000,
    priceDisplay: 'Rp950.000',
    status: 'Tersedia',
    image: img(32232883, 800),
    description: 'Motif Sekar Jagad yang berarti "bunga dunia", melambangkan keindahan keragaman yang dirangkai dalam satu karya.',
    popularity: 80,
    createdAt: 10,
  },
  {
    id: '5',
    slug: 'batik-tulis-truntum-arum',
    name: 'Batik Tulis Truntum Arum',
    category: 'Kain Batik',
    motif: 'Truntum',
    fabric: 'Primisima',
    price: 1050000,
    priceDisplay: 'Rp1.050.000',
    status: 'Tersedia',
    image: img(36520221, 800),
    description: 'Motif Truntum yang melambangkan cinta yang tumbuh kembali, digambar dengan canting pada kain primisima pilihan.',
    popularity: 75,
    createdAt: 8,
  },
  {
    id: '6',
    slug: 'batik-tulis-mega-mendung',
    name: 'Batik Tulis Mega Mendung',
    category: 'Kain Batik',
    motif: 'Mega Mendung',
    fabric: 'Katun',
    price: 780000,
    priceDisplay: 'Rp780.000',
    status: 'Tersedia',
    image: img(36642804, 800),
    description: 'Motif Mega Mendung khas Cirebon dengan gradasi biru yang menenangkan, dikerjakan dengan teknik batik tulis tradisional.',
    popularity: 82,
    createdAt: 12,
  },
  {
    id: '7',
    slug: 'kemeja-batik-parang-klasik',
    name: 'Kemeja Batik Parang Klasik',
    category: 'Kemeja Batik',
    motif: 'Parang',
    fabric: 'Katun Premium',
    price: 650000,
    priceDisplay: 'Rp650.000',
    status: 'Tersedia',
    badge: 'Best Seller',
    image: img(35243199, 800),
    description: 'Kemeja siap pakai dengan motif Parang klasik. Potongan modern yang nyaman untuk acara formal maupun santai.',
    popularity: 90,
    createdAt: 9,
  },
  {
    id: '8',
    slug: 'kemeja-batik-kawung-elegan',
    name: 'Kemeja Batik Kawung Elegan',
    category: 'Kemeja Batik',
    motif: 'Kawung',
    fabric: 'Primisima',
    price: 890000,
    priceDisplay: 'Rp890.000',
    status: 'Tersedia',
    image: img(35243451, 800),
    description: 'Kemeja batik tulis motif Kawung dengan warna earth tone yang elegan. Cocok untuk acara profesional dan budaya.',
    popularity: 78,
    createdAt: 7,
  },
  {
    id: '9',
    slug: 'dress-batik-sekar-jagad',
    name: 'Dress Batik Sekar Jagad',
    category: 'Dress Batik',
    motif: 'Sekar Jagad',
    fabric: 'Katun Premium',
    price: 1100000,
    priceDisplay: 'Rp1.100.000',
    status: 'Tersedia',
    badge: 'New',
    image: img(20672197, 800),
    description: 'Dress dengan motif Sekar Jagad yang feminin dan elegan. Desain kontemporer yang merangkul tradisi.',
    popularity: 85,
    createdAt: 13,
  },
  {
    id: '10',
    slug: 'dress-batik-truntum-malam',
    name: 'Dress Batik Truntum Malam',
    category: 'Dress Batik',
    motif: 'Truntum',
    fabric: 'Sutra',
    price: 1550000,
    priceDisplay: 'Rp1.550.000',
    status: 'Tersedia',
    image: img(39278619, 800),
    description: 'Dress malam dari kain sutra bermotif Truntum. Mewah, eksklusif, dan dikerjakan dengan detail yang sempurna.',
    popularity: 70,
    createdAt: 5,
  },
  {
    id: '11',
    slug: 'outer-batik-mega-mendung',
    name: 'Outer Batik Mega Mendung',
    category: 'Outer Batik',
    motif: 'Mega Mendung',
    fabric: 'Katun',
    price: 720000,
    priceDisplay: 'Rp720.000',
    status: 'Tersedia',
    image: img(35189098, 800),
    description: 'Outer cardigan bermotif Mega Mendung yang serbaguna. Memberikan sentuhan budaya pada setiap tampilan.',
    popularity: 68,
    createdAt: 11,
  },
  {
    id: '12',
    slug: 'outer-batik-parang-modern',
    name: 'Outer Batik Parang Modern',
    category: 'Outer Batik',
    motif: 'Parang',
    fabric: 'Mori',
    price: 680000,
    priceDisplay: 'Rp680.000',
    status: 'Tersedia',
    image: img(35243554, 800),
    description: 'Outer dengan reinterpretasi motif Parang dalam komposisi modern. Ringan, nyaman, dan berkarakter.',
    popularity: 65,
    createdAt: 4,
  },
  {
    id: '13',
    slug: 'batik-eksklusif-sido-mukti-sutra',
    name: 'Batik Eksklusif Sido Mukti Sutra',
    category: 'Batik Eksklusif',
    motif: 'Sido Mukti',
    fabric: 'Sutra',
    price: 2500000,
    priceDisplay: 'Rp2.500.000',
    status: 'Tersedia',
    badge: 'Best Seller',
    image: img(13002518, 800),
    description: 'Karya eksklusif motif Sido Mukti pada kain sutra premium. Warna gold dan maroon yang megah untuk momen istimewa.',
    popularity: 96,
    createdAt: 2,
  },
  {
    id: '14',
    slug: 'batik-eksklusif-kawung-royal',
    name: 'Batik Eksklusif Kawung Royal',
    category: 'Batik Eksklusif',
    motif: 'Kawung',
    fabric: 'Primisima',
    price: 2100000,
    priceDisplay: 'Rp2.100.000',
    status: 'Tersedia',
    image: img(32232887, 800),
    description: 'Motif Kawung dengan warna royal yang megah. Dikerjakan selama berminggu-minggu oleh pengrajin senior.',
    popularity: 87,
    createdAt: 1,
  },
  {
    id: '15',
    slug: 'limited-edition-sekar-jagad-gold',
    name: 'Limited Edition Sekar Jagad Gold',
    category: 'Limited Edition',
    motif: 'Sekar Jagad',
    fabric: 'Sutra',
    price: 3200000,
    priceDisplay: 'Rp3.200.000',
    status: 'Limited Edition',
    badge: 'Limited',
    image: img(11218875, 800),
    description: 'Edisi terbatas hanya 10 helai. Motif Sekar Jagad dengan aksen emas pada kain sutra, dikerjakan oleh master pengrajin.',
    popularity: 98,
    createdAt: 0,
  },
  {
    id: '16',
    slug: 'kemeja-batik-truntum-pre-order',
    name: 'Kemeja Batik Truntum Pre-Order',
    category: 'Kemeja Batik',
    motif: 'Truntum',
    fabric: 'Katun Premium',
    price: 750000,
    priceDisplay: 'Rp750.000',
    status: 'Pre-order',
    badge: 'Pre-order',
    image: img(28855658, 800),
    description: 'Kemeja batik tulis motif Truntum dengan pemesanan pre-order. Dikerjakan selama 3-4 minggu oleh pengrajin.',
    popularity: 60,
    createdAt: 15,
  },
];

export const productCategories = [
  'Semua',
  'Kain Batik',
  'Kemeja Batik',
  'Dress Batik',
  'Outer Batik',
  'Batik Eksklusif',
  'Limited Edition',
] as const;

export const priceRanges = [
  { label: 'Semua Harga', min: 0, max: Infinity },
  { label: '< Rp500.000', min: 0, max: 499999 },
  { label: 'Rp500.000 – Rp1.000.000', min: 500000, max: 1000000 },
  { label: 'Rp1.000.000 – Rp2.000.000', min: 1000001, max: 2000000 },
  { label: '> Rp2.000.000', min: 2000001, max: Infinity },
];

export const motifOptions = [
  'Parang',
  'Kawung',
  'Sido Mukti',
  'Sekar Jagad',
  'Truntum',
  'Mega Mendung',
  'Lainnya',
];

export const fabricOptions = ['Katun', 'Primisima', 'Sutra', 'Mori', 'Lainnya'];

export const statusOptions = ['Tersedia', 'Pre-order', 'Limited Edition'];

// --- Homepage data (unchanged) ---

export type Motif = {
  name: string;
  meaning: string;
  image: string;
};

export const motifs: Motif[] = [
  {
    name: 'Parang',
    meaning: 'Melambangkan semangat dan keteguhan.',
    image: img(34161634, 600),
  },
  {
    name: 'Kawung',
    meaning: 'Melambangkan keseimbangan dan kehidupan.',
    image: img(36642804, 600),
  },
  {
    name: 'Sido Mukti',
    meaning: 'Melambangkan harapan akan kehidupan yang penuh kebahagiaan.',
    image: img(39171732, 600),
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Pemilihan Kain',
    description: 'Kain dipilih dengan standar kualitas tinggi untuk menyerap warna dengan sempurna.',
    icon: 'Layers',
  },
  {
    number: '02',
    title: 'Pembuatan Motif',
    description: 'Motif digambar di atas kain dengan pensil sebagai panduan goresan canting.',
    icon: 'PenTool',
  },
  {
    number: '03',
    title: 'Mencanting',
    description: 'Lilin panas ditorehkan mengikuti motif menggunakan canting dengan ketelitian tinggi.',
    icon: 'Droplet',
  },
  {
    number: '04',
    title: 'Pewarnaan',
    description: 'Kain dicelup berulang ke dalam pewarna alami hingga menghasilkan warna yang diinginkan.',
    icon: 'Palette',
  },
  {
    number: '05',
    title: 'Pelorodan',
    description: 'Lilin dilepas dengan merebus kain dalam air mendidih, memperlihatkan motif yang terbentuk.',
    icon: 'Flame',
  },
  {
    number: '06',
    title: 'Quality Control',
    description: 'Setiap karya diperiksa detail untuk memastikan kualitas layak diberikan kepada Anda.',
    icon: 'CheckCircle',
  },
];

export const processImages = {
  main: img(35243199, 1200),
  canting: img(11218875, 600),
};

export type Artisan = {
  name: string;
  experience: string;
  quote: string;
  image: string;
};

export const artisan: Artisan = {
  name: 'Bu Sumiati',
  experience: 'Pengrajin batik tulis — 35 tahun',
  quote:
    'Setiap garis yang saya buat harus memiliki rasa. Karena batik bukan hanya tentang motif, tetapi tentang proses.',
  image: img(35243545, 800),
};

export type Testimonial = {
  name: string;
  rating: number;
  review: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Anindya Putri',
    rating: 5,
    review:
      'Detail kain dan motifnya jauh lebih indah ketika dilihat langsung. Kualitasnya juga sangat bagus.',
    avatar: img(20672197, 200),
  },
  {
    name: 'Reza Mahendra',
    rating: 5,
    review:
      'Pelayanannya ramah dan membantu memilih batik sesuai kebutuhan. Motifnya terasa eksklusif.',
    avatar: img(13002518, 200),
  },
  {
    name: 'Kartika Dewi',
    rating: 5,
    review:
      'Motifnya terasa eksklusif dan proses handmade-nya benar-benar terasa. Kainnya nyaman dipakai.',
    avatar: img(39278619, 200),
  },
];

export const galleryImages = [
  { src: img(35189098, 800), alt: 'Pengrajin membatik dengan canting', span: 'tall' },
  { src: img(37877554, 800), alt: 'Kain batik dengan beragam warna', span: 'wide' },
  { src: img(11218875, 600), alt: 'Detail tangan mencanting', span: 'normal' },
  { src: img(35243199, 800), alt: 'Pengrajin membuat pola batik', span: 'normal' },
  { src: img(32232883, 600), alt: 'Model mengenakan kain batik', span: 'tall' },
  { src: img(37854208, 800), alt: 'Pengrajin senior mengerjakan batik', span: 'wide' },
  { src: img(36642804, 600), alt: 'Detail canting dan lilin panas', span: 'normal' },
  { src: img(36520221, 600), alt: 'Proses pewarnaan batik', span: 'normal' },
];

export const finalCtaImage = img(35189098, 1600);

export const brandValues = [
  {
    title: 'Batik Tulis Asli',
    description: '100% menggunakan canting dan lilin malam tradisional tanpa cetakan mesin.',
  },
  {
    title: 'Pemberdayaan Pengrajin',
    description: 'Mendukung kehidupan dan kemandirian pengrajin wanita di pedesaan Yogyakarta.',
  },
  {
    title: 'Kelestarian Lingkungan',
    description: 'Menggunakan pewarna alami dari tanaman dan pengelolaan limbah yang bertanggung jawab.',
  },
  {
    title: 'Kualitas Tanpa Kompromi',
    description: 'Setiap lembar kain melalui proses inspeksi ketat untuk memastikan standar karya tinggi.',
  },
];

export const brandMilestones = [
  {
    year: '2010',
    title: 'Awal Berdiri Sanggar',
    description: 'Didirikan sebagai ruang berkarya bagi pengrajin batik tulis tradisional Sleman.',
  },
  {
    year: '2015',
    title: 'Kemitraan Komunitas',
    description: 'Memperluas jangkauan dengan membina lebih dari 20 pembatik lokal.',
  },
  {
    year: '2020',
    title: 'Transformasi Digital',
    description: 'Menjangkau pecinta batik dari seluruh Nusantara melalui platform online.',
  },
  {
    year: '2026',
    title: 'Adhimas Batik Sembagi',
    description: 'Peluncuran merek eksklusif dengan komitmen tinggi pada warisan budaya.',
  },
];

export type GalleryCategory =
  | 'Semua'
  | 'Karya & Produk'
  | 'Pengrajin'
  | 'Workshop & Studio'
  | 'Proses Pembuatan';

export const galleryCategories: GalleryCategory[] = [
  'Semua',
  'Karya & Produk',
  'Pengrajin',
  'Workshop & Studio',
  'Proses Pembuatan',
];

export const galleryItems = [
  {
    id: 'g-1',
    title: 'Pengrajin membatik dengan canting',
    category: 'Proses Pembuatan',
    image: img(35189098, 800),
    alt: 'Pengrajin membatik dengan canting',
    description: 'Proses pencanting canting halus oleh pengrajin berpengalaman di sanggar.',
  },
  {
    id: 'g-2',
    title: 'Kain batik dengan beragam warna',
    category: 'Karya & Produk',
    image: img(37877554, 800),
    alt: 'Kain batik dengan beragam warna',
    description: 'Hasil pengeringan kain batik tulis di bawah sinar matahari alami.',
  },
  {
    id: 'g-3',
    title: 'Detail tangan mencanting',
    category: 'Pengrajin',
    image: img(11218875, 600),
    alt: 'Detail tangan mencanting',
    description: 'Ketelitian jemari pengrajin saat menorehkan cairan malam panas.',
  },
  {
    id: 'g-4',
    title: 'Pengrajin membuat pola batik',
    category: 'Workshop & Studio',
    image: img(35243199, 800),
    alt: 'Pengrajin membuat pola batik',
    description: 'Suasana kerja yang tenang dan tertata di studio batik kami.',
  },
  {
    id: 'g-5',
    title: 'Model mengenakan kain batik',
    category: 'Karya & Produk',
    image: img(32232883, 600),
    alt: 'Model mengenakan kain batik',
    description: 'Peragaan busana batik tulis kontemporer untuk acara formal.',
  },
  {
    id: 'g-6',
    title: 'Pengrajin senior mengerjakan batik',
    category: 'Pengrajin',
    image: img(37854208, 800),
    alt: 'Pengrajin senior mengerjakan batik',
    description: 'Pengrajin senior dengan pengalaman puluhan tahun merawat tradisi.',
  },
  {
    id: 'g-7',
    title: 'Detail canting dan lilin panas',
    category: 'Proses Pembuatan',
    image: img(36642804, 600),
    alt: 'Detail canting dan lilin panas',
    description: 'Penyediaan canting dan lilin malam di atas anglo hangat.',
  },
  {
    id: 'g-8',
    title: 'Proses pewarnaan batik',
    category: 'Proses Pembuatan',
    image: img(36520221, 600),
    alt: 'Proses pewarnaan batik',
    description: 'Pencelupan berulang kali pada bejana warna alami.',
  },
];

export const detailedProcesses = [
  {
    step: '01',
    name: 'Nyungging & Njaprak',
    javaneseName: 'Desain & Pola',
    duration: '1-2 Hari',
    image: img(35243199, 800),
    description: 'Membuat pola dan desain batik di atas kertas lalu memindahkannya ke atas kain mori.',
    detail: 'Pola digambar menggunakan pensil dengan memperhatikan ornamen utama dan isen-isen.',
  },
  {
    step: '02',
    name: 'Nglowong & Ngesek',
    javaneseName: 'Mencanting Utama',
    duration: '1-2 Minggu',
    image: img(11218875, 800),
    description: 'Menorehkan lilin malam menggunakan canting pada garis-garis motif utama.',
    detail: 'Ketebalan lilin dan kerapihan goresan canting menentukan ketajaman motif akhir.',
  },
  {
    step: '03',
    name: 'Ngiseni & Nerusi',
    javaneseName: 'Detail & Dua Sisi',
    duration: '1-2 Minggu',
    image: img(36642804, 800),
    description: 'Mengisi bagian isen-isen dan mencanting sisi balik kain agar motif tembus.',
    detail: 'Batik tulis kualitas terbaik ditandai dengan motif yang terlihat sama jelas di kedua sisi kain.',
  },
  {
    step: '04',
    name: 'Nembok',
    javaneseName: 'Menutup Dasar',
    duration: '2-3 Hari',
    image: img(37854208, 800),
    description: 'Menutup bagian kain yang harus tetap berwarna putih atau warna dasar.',
    detail: 'Malam tembok memiliki formula khusus agar tidak retak saat pencelupan warna.',
  },
  {
    step: '05',
    name: 'Medel & Nyolet',
    javaneseName: 'Pewarnaan Utama',
    duration: '3-5 Hari',
    image: img(36520221, 800),
    description: 'Mencelup kain ke dalam bejana warna alami atau memoles warna pada bagian tertentu.',
    detail: 'Proses pencelupan dilakukan berulang kali hingga memperoleh kepekatan warna yang sempurna.',
  },
  {
    step: '06',
    name: 'Ngerok & Girik',
    javaneseName: 'Pembersihan Lilin Parsial',
    duration: '1-2 Hari',
    image: img(37877554, 800),
    description: 'Kerok lilin malam pada area tertentu sebelum pencelupan warna kedua.',
    detail: 'Memungkinkan terjadinya perpaduan warna dan gradasi khas batik tulis.',
  },
  {
    step: '07',
    name: 'Bithok & Mbabar',
    javaneseName: 'Pewarnaan Kedua',
    duration: '2-3 Hari',
    image: img(35189098, 800),
    description: 'Pencelupan warna tahap akhir untuk mewarnai bidang kain yang baru dibuka.',
    detail: 'Memberikan nuansa soga atau warna tua khas batik klasik.',
  },
  {
    step: '08',
    name: 'Nglorot',
    javaneseName: 'Pelepasan Lilin Total',
    duration: '1 Hari',
    image: img(32232883, 800),
    description: 'Merebus kain dalam air mendidih untuk melarutkan seluruh lilin malam.',
    detail: 'Keajaiban motif dan keindahan warna kain batik tulis secara utuh terpancar setelah lilin lepas.',
  },
];
