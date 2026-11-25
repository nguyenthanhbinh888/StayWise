import { Destination } from "@/types/destination";

export const SEED_DESTINATIONS: Destination[] = [
  // Hà Nội
  {
    id: "hnu-cau-giay",
    name: "Đại học Quốc gia Hà Nội (Cầu Giấy)",
    city: "hanoi",
    category: "university",
    latitude: 21.037,
    longitude: 105.782,
  },
  {
    id: "hust-hai-ba-trung",
    name: "Đại học Bách Khoa Hà Nội",
    city: "hanoi",
    category: "university",
    latitude: 21.005,
    longitude: 105.843,
  },
  {
    id: "ftu-dong-da",
    name: "Đại học Ngoại Thương",
    city: "hanoi",
    category: "university",
    latitude: 21.023,
    longitude: 105.805,
  },
  {
    id: "keangnam-nam-tu-liem",
    name: "Tòa nhà Keangnam Landmark 72",
    city: "hanoi",
    category: "workplace",
    latitude: 21.017,
    longitude: 105.784,
  },
  {
    id: "hoan-kiem-center",
    name: "Hồ Hoàn Kiếm (Trung tâm Hà Nội)",
    city: "hanoi",
    category: "landmark",
    latitude: 21.028,
    longitude: 105.854,
  },

  // TP. Hồ Chí Minh
  {
    id: "vnuhcm-thu-duc",
    name: "Khu Đô thị ĐHQG TP.HCM (Làng Đại học)",
    city: "hcm",
    category: "university",
    latitude: 10.870,
    longitude: 106.803,
  },
  {
    id: "hcmut-quan-10",
    name: "Đại học Bách Khoa TP.HCM (Quận 10)",
    city: "hcm",
    category: "university",
    latitude: 10.772,
    longitude: 106.657,
  },
  {
    id: "rmit-quan-7",
    name: "Đại học RMIT Việt Nam (Nam Sài Gòn)",
    city: "hcm",
    category: "university",
    latitude: 10.732,
    longitude: 106.694,
  },
  {
    id: "landmark81-binh-thanh",
    name: "Tòa nhà Landmark 81",
    city: "hcm",
    category: "landmark",
    latitude: 10.795,
    longitude: 106.721,
  },
  {
    id: "bitexco-quan-1",
    name: "Tòa nhà Bitexco Financial Tower (Quận 1)",
    city: "hcm",
    category: "workplace",
    latitude: 10.771,
    longitude: 106.704,
  },
];
