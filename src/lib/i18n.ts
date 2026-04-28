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
    label: 'პერიოდი',
    hours1: '1 საათი',
    hours3: '3 საათი',
    hours6: '6 საათი',
    hours12: '12 საათი',
    hours24: '24 საათი',
  },

  card: {
    views: 'ნახვა',
    customsPassed: 'განბაჟებული',
    customsDue: 'განბაჟება',
    steeringPrefix: 'საჭე',
    georgia: 'საქართველო',
    usa: 'ა.შ.შ.',
    inTransit: 'გზაში',
    allListings: 'ყველა განცხადება',
    yearSuffix: 'წ',
    photo: 'ფოტო',
    priceNegotiable: 'ფასი შეთანხმებით',
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
    gearById: {
      1: 'მექანიკა',
      2: 'ავტომატიკა',
      3: 'ტიპტრონიკი',
      4: 'ვარიატორი',
    } as Record<number, string>,
    fuelById: {
      2: 'ბენზინი',
      3: 'დიზელი',
      6: 'ჰიბრიდი',
      7: 'ელექტრო',
      9: 'თხევადი გაზი',
    } as Record<number, string>,
  },
} as const;
