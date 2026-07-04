export type Season = "all-season" | "summer" | "winter" | "all-terrain" | "performance";

export interface Brand {
  id: string;
  name: string;
  slug: string;
  country: string;
  tagline: string;
  logoInitial: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface TireSpec {
  width: number;
  aspectRatio: number;
  diameter: number;
  loadIndex: number;
  speedRating: string;
  season: Season;
  runFlat: boolean;
  studdable: boolean;
}

export interface PerformanceRatings {
  wetGrip: number;
  dryGrip: number;
  treadwear: number;
  noise: number;
  fuelEfficiency: number;
  snowTraction: number;
  comfort: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  categoryId: string;
  spec: TireSpec;
  price: number;
  compareAtPrice?: number;
  currency: "USD";
  images: ProductImage[];
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  badges: Array<"new" | "best-seller" | "staff-pick" | "sale" | "eco">;
  features: string[];
  performance: PerformanceRatings;
  warrantyMiles: number;
  mileageRatingMiles: number;
  description: string;
  highlights: string[];
  weightLbs: number;
  createdAt: string;
}

export interface VehicleTrim {
  id: string;
  name: string;
  oemSize: string;
}

export interface VehicleModel {
  id: string;
  name: string;
  trims: VehicleTrim[];
}

export interface VehicleMake {
  id: string;
  name: string;
  models: VehicleModel[];
}

export interface VehicleYearEntry {
  year: number;
  makes: VehicleMake[];
}

export interface SavedVehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  size: string;
  nickname?: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  title: string;
  body: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
  vehicle?: string;
}

export interface Installer {
  id: string;
  name: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
  distanceMiles: number;
  rating: number;
  reviewCount: number;
  services: string[];
  nextAvailable: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Coupon {
  code: string;
  description: string;
  type: "percentage" | "fixed" | "free-shipping";
  value: number;
  minSubtotal: number;
  expiresAt: string;
}

export type OrderStatus =
  | "processing"
  | "confirmed"
  | "shipped"
  | "out-for-delivery"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  image: string;
  quantity: number;
  price: number;
  size: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  installation?: { installerId: string; installerName: string; date: string; slot: string };
  shippingAddress: Address;
  createdAt: string;
  trackingNumber?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarInitial: string;
  memberSince: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readMinutes: number;
  publishedAt: string;
  coverGradient: string;
}

export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "newest";

export interface ProductFilters {
  q?: string;
  width?: number[];
  aspectRatio?: number[];
  diameter?: number[];
  season?: Season[];
  brandIds?: string[];
  categoryIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sort?: SortOption;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
