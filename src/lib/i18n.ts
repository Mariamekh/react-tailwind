export const t = {
  common: {
    home: 'მთავარი',
    search: 'ძიება',
    searchAction: 'ძებნა',
    loading: 'იტვირთება...',
    notFound: 'არ მოიძებნა',
    error: 'დაფიქსირდა შეცდომა',
    retry: 'ხელახლა ცდა',
    searchPlaceholder: 'ძიება...',
    listings: 'განცხადება',
  },

  filters: {
    title: 'ფილტრი',
    dealType: 'გარიგების ტიპი',
    forSale: 'იყიდება',
    forRent: 'ქირავდება',
    manufacturer: 'მწარმოებელი',
    model: 'მოდელი',
    category: 'კატეგორია',
    allManufacturers: 'ყველა მწარმოებელი',
    allCategories: 'ყველა კატეგორია',
    selectManufacturer: 'აირჩიეთ მწარმოებელი',
    noOptions: 'არჩევანი არ არის',
    price: 'ფასი',
    priceFrom: 'დან',
    priceTo: 'მდე',
    gel: 'ლარი',
    usd: 'დოლარი',
  },

  sort: {
    label: 'დალაგება',
    dateDesc: 'თარიღი კლებადი',
    dateAsc: 'თარიღი ზრდადი',
    priceDesc: 'ფასი კლებადი',
    priceAsc: 'ფასი ზრდადი',
    mileageDesc: 'გარბენი კლებადი',
    mileageAsc: 'გარბენი ზრდადი',
  },

  period: {
    any: 'ნებისმიერი',
    last1h: 'ბოლო 1 საათი',
    last3h: 'ბოლო 3 საათი',
    last1d: 'ბოლო 1 დღე',
    last3d: 'ბოლო 3 დღე',
    last1w: 'ბოლო 1 კვირა',
    last2w: 'ბოლო 2 კვირა',
  },

  card: {
    views: 'ნახვა',
    customsPassed: 'განბაჟებული',
    customsDue: 'განბაჟება',
    steeringPrefix: 'საჭე',
    engineCapacityUnit: 'დატ.',
    georgia: 'საქართველო',
    usa: 'ა.შ.შ.',
    inTransit: 'გზაში',
    allListings: 'ყველა განცხადება',
    yearSuffix: 'წ',
    photo: 'ფოტო',
  },

  list: {
    loadFailed: 'ვერ მოხერხდა მონაცემების ჩატვირთვა',
    noResults: 'მითითებული პარამეტრებით ავტომობილი ვერ მოიძებნა',
  },

  time: {
    now: 'ახლა',
    minutesAgo: (n: number) => `${n} წუთის წინ`,
    hoursAgo: (n: number) => `${n} საათის წინ`,
    daysAgo: (n: number) => `${n} დღის წინ`,
    monthsAgo: (n: number) => `${n} თვის წინ`,
    yearsAgo: (n: number) => `${n} წლის წინ`,
  },

  units: {
    km: 'კმ',
  },

  stickers: {
    intact: 'დაურტყმელი',
    cleanHistory: 'სუფთა ისტორიით',
    newImport: 'ახალი ჩამოყვანილი',
    economic: 'ეკონომიური',
    unpainted: 'შეუღებავი',
    urgent: 'სასწრაფოდ',
    fromEurope: 'ევროპიდან',
    pristine: 'იდეალურ მდგომარეობაში',
    fromAmerica: 'ამერიკიდან',
    centerWarranty: 'ცენტრის გარანტიით',
  },

  specs: {
    category: 'სედანი',
    fuel: 'ბენზინი',
    driveSide: 'მარცხნივ',
    driveSideDesktop: 'მარცხენა',
    gear: 'ავტომატიკა',
  },
} as const;
