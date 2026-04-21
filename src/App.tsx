import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Loader2, Flame, Wheat, Droplet, Beef, Leaf, Utensils, Coffee, Cake, ChevronRight, Globe, Building2, MapPin, Phone, Calendar, Users, Clock, User, CheckCircle2, X } from 'lucide-react';
import { searchNutrition, NutritionInfo } from './services/nutritionService';

const TRANSLATIONS = {
  English: {
    subtitle: "The Botanical Cafe",
    menuFolders: "Menu Folders",
    categories: {
      morning: "Morning Pastries",
      green: "Garden Bowls",
      mains: "Main Plates",
      sides: "Side Dishes",
      vegan: "Vegan Specials",
      beverages: "Hot Beverages",
      desserts: "Desserts"
    },
    searchPlaceholder: "Search for an apple, a cheeseburger, etc...",
    analyze: "Analyze",
    popular: "Popular:",
    servingSize: "Serving size:",
    totalCalories: "Total Calories",
    kcal: "kcal",
    protein: "Protein",
    carbs: "Carbs",
    fat: "Fat",
    ingredientsTitle: "Components / Base Ingredients",
    detailedNutrition: "Comprehensive Nutritional Profile",
    errorNotFound: "We couldn't find nutritional info for that. Try another food item.",
    errorGeneric: "An error occurred while analyzing the food. Please try again.",
    uniName: "Middlesex University Dubai",
    uniAddress: "Dubai Knowledge Park",
    uniCity: "Dubai, United Arab Emirates",
    uniPhone: "585837577",
    viewOnMaps: "View on Google Maps",
    bookTable: "Book a Table",
    reservation: "Reservation",
    resName: "Full Name",
    resDate: "Date",
    resTime: "Time",
    resGuests: "Number of People",
    confirmRes: "Confirm Booking",
    successRes: "Table Reserved Successfully!"
  },
  Hindi: {
    subtitle: "द बोटैनिकल कैफे",
    menuFolders: "मेनू फ़ोल्डर",
    categories: {
      morning: "सुबह की पेस्ट्री",
      green: "गार्डन बाउल",
      mains: "मुख्य प्लेटें",
      sides: "साइड डिश",
      vegan: "शाकाहारी विशेष",
      beverages: "गर्म पेय",
      desserts: "मिठाइयाँ"
    },
    searchPlaceholder: "सेब, चीज़बर्गर आदि खोजें...",
    analyze: "विश्लेषण करें",
    popular: "लोकप्रिय:",
    servingSize: "परोसने की मात्रा:",
    totalCalories: "कुल कैलोरी",
    kcal: "किलोकैलोरी",
    protein: "प्रोटीन",
    carbs: "कार्ब्स",
    fat: "वसा",
    ingredientsTitle: "घटक / मुख्य सामग्री",
    detailedNutrition: "व्यापक पोषण प्रोफ़ाइल",
    errorNotFound: "हमें उसके लिए पोषण संबंधी जानकारी नहीं मिली। कोई अन्य भोजन आजज़माएं।",
    errorGeneric: "भोजन का विश्लेषण करते समय एक त्रुटि हुई। कृपया पुन: प्रयास करें。",
    uniName: "मिडलसेक्स विश्वविद्यालय दुबई",
    uniAddress: "दुबई नॉलेज पार्क",
    uniCity: "दुबई, संयुक्त अरब अमीरात",
    uniPhone: "585837577",
    viewOnMaps: "Google Maps पर देखें",
    bookTable: "टेबल बुक करें",
    reservation: "आरक्षण",
    resName: "पूरा नाम",
    resDate: "तारीख",
    resTime: "समय",
    resGuests: "लोगों की संख्या",
    confirmRes: "बुकिंग की पुष्टि करें",
    successRes: "टेबल सफलतापूर्वक आरक्षित!"
  },
  Arabic: {
    subtitle: "المقهى النباتي",
    menuFolders: "مجلدات القائمة",
    categories: {
      morning: "معجنات الصباح",
      green: "أوعية الحديقة",
      mains: "الأطباق الرئيسية",
      sides: "أطباق جانبية",
      vegan: "عروض نباتية",
      beverages: "مشروبات ساخنة",
      desserts: "حلويات"
    },
    searchPlaceholder: "ابحث عن تفاحة، تشيز برجر، إلخ...",
    analyze: "تحليل",
    popular: "شائع:",
    servingSize: "حجم الحصة:",
    totalCalories: "إجمالي السعرات الحرارية",
    kcal: "كيلو كالوري",
    protein: "بروتين",
    carbs: "كربوهيدرات",
    fat: "دهون",
    ingredientsTitle: "المكونات / المكونات الأساسية",
    detailedNutrition: "الملف الغذائي الشامل",
    errorNotFound: "لم نتمكن من العثور على معلومات غذائية لذلك. جرب عنصر غذائي آخر.",
    errorGeneric: "حدث خطأ أثناء تحليل الطعام. يرجى المحاولة مرة أخرى.",
    uniName: "جامعة ميدلسكس دبي",
    uniAddress: "مجمع دبي للمعرفة",
    uniCity: "دبي، الإمارات العربية المتحدة",
    uniPhone: "585837577",
    viewOnMaps: "عرض على خرائط جوجل",
    bookTable: "احجز طاولة",
    reservation: "حجز",
    resName: "الاسم الكامل",
    resDate: "التاريخ",
    resTime: "الوقت",
    resGuests: "عدد الأشخاص",
    confirmRes: "تأكيد الحجز",
    successRes: "تم حجز الطاولة بنجاح!"
  }
};

const MENU_CATEGORIES = [
  { 
    id: 'morning', 
    icon: <Coffee size={18} />, 
    items: [
      "Butter Croissant", "Avocado Toast", "Acai Bowl", "Cinnamon Roll", "Blueberry Muffin", 
      "Chocolate Croissant", "Almond Croissant", "Plain Bagel", "Everything Bagel", "Scone with Jam", 
      "Banana Bread", "Lemon Poppy Seed Muffin", "French Toast", "Pancakes with Syrup", "Belgian Waffle", 
      "Breakfast Burrito", "Egg White Florentine", "Hash Browns", "Oatmeal with Berries", "Fruit Salad", 
      "Breakfast Sandwich", "English Muffin", "Danish Pastry", "Bran Muffin", "Breakfast Parfait", 
      "Smoked Salmon Bagel", "Apple Turnover", "Cheese Danish", "Spinach Quiche", "Bacon and Egg Croissant"
    ] 
  },
  { 
    id: 'green', 
    icon: <Leaf size={18} />, 
    items: [
      "Caesar Salad", "Greek Salad", "Kale Quinoa Bowl", "Cobb Salad", "Caprese Salad", 
      "Spinach Salad", "Nicoise Salad", "Waldorf Salad", "Chef Salad", "Panzanella", 
      "Taco Salad", "Asian Noodle Salad", "Watermelon Feta Salad", "Beet and Goat Cheese Salad", "Arugula Parmesan Salad", 
      "Spring Mix Salad", "Edamame Salad", "Roasted Chickpea Bowl", "Lentil Salad", "Farro Salad", 
      "Tabouleh", "Quinoa Black Bean Bowl", "Chicken Avocado Salad", "Grilled Shrimp Salad", "Tuna Poke Bowl", 
      "Tofu Power Bowl", "Buddha Bowl", "Broccoli Apple Salad", "Tomato Cucumber Salad", "Sweet Potato Bowl"
    ] 
  },
  { 
    id: 'mains', 
    icon: <Utensils size={18} />, 
    items: [
      "Grilled Salmon", "Steak Frites", "Mushroom Risotto", "Chicken Parmesan", "Spaghetti Bolognese", 
      "Ribeye Steak", "Fish and Chips", "Chicken Alfredo", "Pad Thai", "Beef Stroganoff", 
      "Eggplant Parmesan", "Lobster Ravioli", "Filet Mignon", "Roast Chicken", "Pork Belly", 
      "Lamb Chops", "Shrimp Scampi", "Chicken Tikka Masala", "Beef Tacos", "Pulled Pork Sandwich", 
      "BBQ Ribs", "Lasagna", "Seafood Paella", "Chicken Marsala", "Veal Piccata", 
      "Turkey Meatballs", "Pan-seared Scallops", "Macaroni and Cheese", "Beef Pot Roast", "Chicken Pot Pie"
    ] 
  },
  { 
    id: 'sides', 
    icon: <Flame size={18} />, 
    items: [
      "Sweet Potato Fries", "Garlic Bread", "Onion Rings", "French Fries", "Mashed Potatoes", 
      "Roasted Asparagus", "Steamed Broccoli", "Mac Salad", "Potato Salad", "Coleslaw", 
      "Baked Beans", "Creamed Spinach", "Roasted Brussels Sprouts", "Rice Pilaf", "Quinoa Pilaf", 
      "Side Salad", "Side Mac and Cheese", "Tater Tots", "Hush Puppies", "Corn on the Cob", 
      "Grilled Zucchini", "Sautéed Mushrooms", "Green Bean Almondine", "Butternut Squash", "Sautéed Kale", 
      "Refried Beans", "Fried Plantains", "Scalloped Potatoes", "Garlic Knots", "Steamed Carrots"
    ] 
  },
  { 
    id: 'vegan', 
    icon: <Wheat size={18} />, 
    items: [
      "Tofu Scramble", "Vegan Burger", "Falafel Wrap", "Vegan Pad Thai", "Lentil Soup", 
      "Vegan Mac and Cheese", "Black Bean Burger", "Vegan Pizza", "Jackfruit Tacos", "Veggie Stir Fry", 
      "Vegan Chili", "Chickpea Curry", "Vegan Sushi", "Tempeh Sandwich", "Seitan Wings", 
      "Vegan Meatballs", "Vegetable Samosas", "Eggplant Toast", "Vegan Spinach Dip", "Vegan Caesar Salad", 
      "Vegan Mushroom Stroganoff", "Vegan Ramen", "Tofu Banh Mi", "Veggie Dumplings", "Vegan BBQ Sandwich", 
      "Cauliflower Wings", "Vegan Burrito", "Quinoa Stuffed Peppers", "Tomato Basil Soup", "Vegan Lasagna"
    ] 
  },
  { 
    id: 'beverages', 
    icon: <Droplet size={18} />, 
    items: [
      "Matcha Latte", "Espresso", "Cappuccino", "Flat White", "Americano", 
      "Mocha", "Macchiato", "Chai Latte", "Hot Chocolate", "Earl Grey Tea", 
      "Chamomile Tea", "Peppermint Tea", "Green Tea", "Black Tea", "Oolong Tea", 
      "White Tea", "Herbal Tea", "Cortado", "Affogato", "Irish Coffee", 
      "Turmeric Latte", "London Fog", "Vanilla Latte", "Caramel Macchiato", "Hazelnut Coffee", 
      "Decaf Coffee", "Pour Over Coffee", "French Press Coffee", "Hot Apple Cider", "Hot Toddy"
    ] 
  },
  { 
    id: 'desserts', 
    icon: <Cake size={18} />, 
    items: [
      "Chocolate Lava Cake", "Tiramisu", "Berry Tart", "Cheesecake", "Creme Brulee", 
      "Apple Pie", "Brownie Sundae", "Lemon Meringue Pie", "Key Lime Pie", "Panna Cotta", 
      "Carrot Cake", "Cupcake", "Macaron", "Gelato", "Churros", 
      "Baklava", "Eclair", "Profiteroles", "Trifle", "Bananas Foster", 
      "Pecan Pie", "Sticky Toffee Pudding", "Peach Cobbler", "Strawberry Shortcake", "Red Velvet Cake", 
      "Chocolate Mousse", "Vanilla Bean Ice Cream", "Bread Pudding", "Mille-feuille", "Cannoli"
    ] 
  }
];

const POPULAR_SEARCHES = ["🥑 Avocado Toast", "🍵 Matcha Latte", "🍳 Egg Sandwich", "🫐 Acai Bowl"];

export default function App() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<NutritionInfo | null>(null);
  const [errorType, setErrorType] = useState<'NOT_FOUND' | 'GENERIC' | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>('morning');
  const [language, setLanguage] = useState<string>('English');

  // Reservation State
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isReservationSuccess, setIsReservationSuccess] = useState(false);
  const [resName, setResName] = useState('');
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('');
  const [resGuests, setResGuests] = useState('2');

  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS.English;
  const isRtl = language === 'Arabic';

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReservationSuccess(true);
    setTimeout(() => {
      setIsReservationOpen(false);
      setIsReservationSuccess(false);
      setResName('');
      setResDate('');
      setResTime('');
      setResGuests('2');
    }, 2500);
  };

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setQuery(searchQuery);
    setIsLoading(true);
    setErrorType(null);
    setResult(null);
    setHasSearched(true);

    try {
      const data = await searchNutrition(searchQuery.trim(), language);
      if (data) {
        setResult(data);
      } else {
        setErrorType('NOT_FOUND');
      }
    } catch (err) {
      setErrorType('GENERIC');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  // Rough daily recommended values for visual scale scaling (based on 2000 cal diet)
  const DAILY_CALORIES = 2000;
  const DAILY_PROTEIN = 50;
  const DAILY_CARBS = 275;
  const DAILY_FAT = 78;

  const getProgressWidth = (value: number, max: number) => {
    return `${Math.min((value / max) * 100, 100)}%`;
  };

  return (
    <>
      {/* Warm Ambience Restaurant Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2070&q=80" 
          alt="Warm elegant restaurant ambiance background" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Adjusted semi-transparent overlays to keep UI elements glowing while preserving photo ambiance */}
        <div className="absolute inset-0 bg-[#FFFBEB]/30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[4px]" />
        
        {/* Stronger vignette to frame the dashboard and focus the middle light */}
        <div className="absolute inset-0 shadow-[inset_0_0_250px_rgba(40,20,0,0.3)]" />
      </div>

      {/* Top Right Action Header */}
      <div className={`absolute top-6 ${isRtl ? 'left-6 lg:left-12' : 'right-6 lg:right-12'} z-50 flex items-center gap-3`}>
        {/* Reservation Button */}
        <button 
          onClick={() => setIsReservationOpen(true)}
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white border border-emerald-900/10 rounded-full px-4 py-2 card-shadow shadow-sm transition-colors text-sm font-bold"
        >
          <Calendar className="w-4 h-4" />
          <span className="hidden sm:inline">{t.bookTable}</span>
        </button>

        {/* Language Selector */}
        <div className="relative inline-block text-left">
           <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-emerald-900/10 rounded-full pl-4 pr-3 py-2 card-shadow shadow-sm">
             <Globe className="w-4 h-4 text-emerald-700" />
             <select 
               value={language} 
               onChange={(e) => setLanguage(e.target.value)}
               className="appearance-none bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer pr-4"
             >
               <option value="English">English</option>
               <option value="Hindi">हिंदी (Hindi)</option>
               <option value="Arabic">العربية (Arabic)</option>
             </select>
             <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-emerald-700">
               <ChevronRight className="w-4 h-4 rotate-90" />
             </div>
           </div>
        </div>
      </div>

      {/* Reservation Modal */}
      <AnimatePresence>
        {isReservationOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-[30px] p-6 sm:p-8 w-full max-w-md relative card-shadow border border-emerald-900/10"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              <button 
                onClick={() => setIsReservationOpen(false)} 
                className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} text-slate-400 hover:text-slate-700 transition-colors bg-slate-100 p-2 rounded-full`}
              >
                <X className="w-5 h-5" />
              </button>

              {isReservationSuccess ? (
                <div className="py-10 text-center flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">{t.successRes}</h3>
                  <p className="text-slate-500">{resDate} • {resTime}</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Utensils className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-black font-serif text-slate-800">{t.reservation}</h2>
                  </div>

                  <form onSubmit={handleReservationSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">{t.resName}</label>
                      <div className="relative">
                        <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                          <User className="w-4 h-4 text-emerald-600" />
                        </div>
                        <input 
                          type="text" 
                          required
                          value={resName}
                          onChange={(e) => setResName(e.target.value)}
                          className={`w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 focus:bg-white rounded-xl py-3 ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'} text-slate-700 font-medium outline-none transition-all`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">{t.resDate}</label>
                        <div className="relative">
                          <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                            <Calendar className="w-4 h-4 text-emerald-600" />
                          </div>
                          <input 
                            type="date" 
                            required
                            value={resDate}
                            onChange={(e) => setResDate(e.target.value)}
                            className={`w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 focus:bg-white rounded-xl py-3 ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'} text-slate-700 font-medium outline-none transition-all`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">{t.resTime}</label>
                        <div className="relative">
                          <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                            <Clock className="w-4 h-4 text-emerald-600" />
                          </div>
                          <input 
                            type="time" 
                            required
                            value={resTime}
                            onChange={(e) => setResTime(e.target.value)}
                            className={`w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 focus:bg-white rounded-xl py-3 ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'} text-slate-700 font-medium outline-none transition-all`}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">{t.resGuests}</label>
                      <div className="relative">
                        <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                          <Users className="w-4 h-4 text-emerald-600" />
                        </div>
                        <input 
                          type="number" 
                          min="1"
                          max="20"
                          required
                          value={resGuests}
                          onChange={(e) => setResGuests(e.target.value)}
                          className={`w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 focus:bg-white rounded-xl py-3 ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'} text-slate-700 font-medium outline-none transition-all`}
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-4 font-black tracking-widest uppercase text-sm transition-all shadow-lg shadow-emerald-600/30"
                    >
                      {t.confirmRes}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row min-h-screen relative z-10 w-full max-w-[1600px] mx-auto" dir={isRtl ? 'rtl' : 'ltr'}>
        {/* Vertical Sidebar */}
        <aside className={`w-full md:w-72 lg:w-[22rem] md:min-h-screen border-emerald-900/10 bg-white/70 backdrop-blur-3xl p-6 lg:p-8 shrink-0 flex flex-col md:sticky top-0 md:h-screen overflow-y-auto card-shadow z-20 ${isRtl ? 'md:border-l' : 'md:border-r'}`}>
          {/* Header Branding Moved to Sidebar */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mb-10 pt-2 pb-8 border-b border-emerald-900/10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 bg-emerald-700 border-4 border-emerald-100 rounded-full flex items-center justify-center text-white mb-4 card-shadow shadow-emerald-700/20"
            >
              <Leaf size={28} fill="currentColor" className="opacity-90" />
            </motion.div>
            <h1 className="text-4xl lg:text-5xl font-black font-serif text-slate-800 tracking-tight leading-none">
              NutriTrack<span className="text-emerald-600">.</span>
            </h1>
            <p className="text-slate-500 font-medium text-[10px] uppercase tracking-widest mt-2 md:px-1">
              {t.subtitle}
            </p>
          </div>

          <h3 className="text-xs uppercase tracking-widest font-black text-slate-400 mb-6 flex items-center gap-2">
            <Utensils className="w-4 h-4" /> {t.menuFolders}
          </h3>
          
          <div className="space-y-4 flex-1">
            {MENU_CATEGORIES.map(category => (
              <div key={category.id} className="border-b last:border-0 border-slate-100 pb-4 last:pb-0">
                <button 
                  onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                  className={`w-full flex items-center justify-between font-bold lg:text-lg transition-colors ${activeCategory === category.id ? 'text-emerald-700' : 'text-slate-600 hover:text-emerald-600'}`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`p-2 rounded-xl ${activeCategory === category.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-50 text-slate-400'}`}>
                      {category.icon}
                    </span>
                    {t.categories[category.id as keyof typeof t.categories]}
                  </span>
                  <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${activeCategory === category.id ? (isRtl ? '-rotate-90' : 'rotate-90') : (isRtl ? 'rotate-180' : '')}`} />
                </button>
                
                <AnimatePresence>
                  {activeCategory === category.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`pt-4 ${isRtl ? 'pr-12' : 'pl-12'} space-y-3`}>
                        {category.items.map((item, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => performSearch(item)}
                            className="text-slate-500 font-medium hover:text-amber-600 cursor-pointer transition-colors flex items-center gap-2 text-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* University Info Footer */}
          <div className="mt-10 pt-6 border-t border-emerald-900/10 text-slate-500 text-xs shrink-0">
            <div className="flex items-center gap-2 font-bold text-emerald-800 mb-3">
              <Building2 className="w-4 h-4" />
              {t.uniName}
            </div>
            <div className="flex items-start gap-2 mb-4">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p>{t.uniAddress}</p>
                <p className="mb-1">{t.uniCity}</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Middlesex+University+Dubai+Knowledge+Park" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-amber-600 hover:text-amber-700 transition-colors underline underline-offset-2"
                >
                  <Globe className="w-3 h-3" />
                  {t.viewOnMaps}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0" />
              <a href={`tel:${t.uniPhone}`} className="hover:text-emerald-700 transition-colors font-medium">
                {t.uniPhone}
              </a>
            </div>
          </div>
        </aside>

        {/* Main Area: Search & Results */}
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 pt-8 md:pt-12 pb-24 max-w-5xl mx-auto flex flex-col">
            <motion.div 
              initial={false}
              animate={{ y: hasSearched ? 0 : 100 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
              className="w-full max-w-3xl lg:max-w-none mx-auto"
            >
              <form onSubmit={handleSearch} className="relative group">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-6' : 'left-0 pl-6'} flex items-center pointer-events-none`}>
                  <Search className="h-5 w-5 text-amber-400 group-focus-within:text-amber-500 transition-colors" />
                </div>
                <input
                  type="text"
                  className={`block w-full py-5 rounded-full border-2 border-amber-200 focus:border-amber-500 focus:outline-none shadow-none bg-white text-lg placeholder:text-slate-400 text-slate-700 font-bold transition-all card-shadow ${isRtl ? 'pr-14 pl-32' : 'pl-14 pr-32'}`}
                  placeholder={t.searchPlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !query.trim()}
                  className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-3 bottom-3 px-8 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white rounded-full font-black tracking-widest uppercase text-xs transition-all flex items-center justify-center min-w-[120px] shadow-lg shadow-emerald-600/30`}
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : t.analyze}
                </button>
              </form>

              {/* Popular Searches */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className={`text-xs uppercase tracking-widest font-bold text-slate-400 ${isRtl ? 'ml-2' : 'mr-2'}`}>
                  {t.popular}
                </span>
                {POPULAR_SEARCHES.map((search, idx) => (
                  <button
                    key={idx}
                    onClick={() => performSearch(search)}
                    disabled={isLoading}
                    className="bg-white/60 hover:bg-white border-2 border-amber-100 hover:border-amber-400 text-slate-600 text-sm font-bold py-2 px-4 rounded-full transition-all cursor-pointer shadow-sm"
                  >
                    {search}
                  </button>
                ))}
              </div>

              <div className="mt-12 w-full">
                <AnimatePresence mode="wait">
          {errorType && (
            <motion.div 
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-50 text-red-600 p-4 rounded-3xl text-center border-2 border-red-200 font-bold"
            >
              {errorType === 'NOT_FOUND' ? t.errorNotFound : t.errorGeneric}
            </motion.div>
          )}

          {result && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[40px] p-6 md:p-10 card-shadow flex flex-col relative overflow-hidden">
                <div className={`absolute -top-10 ${isRtl ? '-left-10' : '-right-10'} w-40 h-40 bg-emerald-100 rounded-full opacity-50`}></div>
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 z-10">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-[#FFFBEB] rounded-full flex items-center justify-center text-amber-700 border border-amber-200 shadow-inner">
                      <Utensils className="w-10 h-10" />
                    </div>
                    <div>
                      <h2 className="text-5xl md:text-6xl font-black font-serif text-slate-800 tracking-tight capitalize mb-2">
                        {result.foodName}
                      </h2>
                      <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">
                        {t.servingSize} <span className="text-emerald-700 font-bold">{result.servingSize}</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 text-center bg-amber-400 p-6 rounded-3xl text-white self-start shadow-xl shadow-amber-400/20">
                    <div className="text-sm font-bold uppercase tracking-widest opacity-80">{t.totalCalories}</div>
                    <div className="text-5xl font-black">{result.calories}</div>
                    <div className="text-sm font-bold">{t.kcal}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 z-10">
                  {/* Protein */}
                  <div className="bg-slate-50 p-6 rounded-3xl flex flex-col items-center justify-center border-b-4 border-blue-500">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-blue-100 text-blue-600 font-bold">
                      <Beef className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-black text-slate-800">{result.protein}g</div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{t.protein}</div>
                    
                    <div className="w-full mt-6 h-2 bg-slate-200 rounded-full overflow-hidden" dir="ltr">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: getProgressWidth(result.protein, DAILY_PROTEIN) }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Carbs */}
                  <div className="bg-slate-50 p-6 rounded-3xl flex flex-col items-center justify-center border-b-4 border-emerald-500">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-emerald-100 text-emerald-600 font-bold">
                      <Wheat className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-black text-slate-800">{result.carbs}g</div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{t.carbs}</div>
                    
                    <div className="w-full mt-6 h-2 bg-slate-200 rounded-full overflow-hidden" dir="ltr">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: getProgressWidth(result.carbs, DAILY_CARBS) }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Fat */}
                  <div className="bg-slate-50 p-6 rounded-3xl flex flex-col items-center justify-center border-b-4 border-orange-500">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-orange-100 text-orange-600 font-bold">
                      <Droplet className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-black text-slate-800">{result.fat}g</div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{t.fat}</div>
                    
                    <div className="w-full mt-6 h-2 bg-slate-200 rounded-full overflow-hidden" dir="ltr">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: getProgressWidth(result.fat, DAILY_FAT) }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-full bg-orange-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Detailed Nutrients Grid */}
                {result.additionalNutrients && result.additionalNutrients.length > 0 && (
                  <div className="mt-8 pt-8 border-t-2 border-slate-50 z-10 w-full">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">
                      {t.detailedNutrition}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {result.additionalNutrients.map((nut, idx) => (
                        <div key={idx} className="bg-[#FFFBEB] border border-amber-100 p-4 rounded-3xl flex flex-col items-center justify-center text-center hover:scale-105 transition-transform">
                          <div className="text-xl font-black text-slate-800">{nut.amount}</div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 opacity-80">{nut.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.ingredients && result.ingredients.length > 0 && (
                  <div className="mt-8 pt-8 border-t-2 border-slate-50 z-10">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">
                      {t.ingredientsTitle}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.ingredients.map((ingredient, idx) => (
                        <div key={idx} className="bg-amber-50 border-2 border-amber-100 px-4 py-2 rounded-2xl text-sm font-bold text-slate-600">
                          {ingredient}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
                </AnimatePresence>
              </div>
            </motion.div>
          </main>
        </div>
    </>
  );
}

