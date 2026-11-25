# SPEC.md — STAYWISE
> Phiên bản: 1.0.0
> Loại sản phẩm: Urban Living Cost Analysis & Housing Decision Platform
> Ngôn ngữ giao diện: Tiếng Việt
> Thị trường mục tiêu: Hà Nội và TP. Hồ Chí Minh
> Đối tượng: Sinh viên, người đi làm và người đang tìm kiếm nơi ở phù hợp.

---

# 1. TỔNG QUAN SẢN PHẨM

## 1.1. Tên sản phẩm

**StayWise — Lựa chọn nơi sống thông minh.**

StayWise là nền tảng công nghệ hỗ trợ người dùng khám phá, phân tích và so sánh chi phí sinh hoạt tại các khu vực đô thị. Sản phẩm giúp người dùng đưa ra quyết định thuê trọ và lựa chọn nơi sinh sống dựa trên ngân sách, nhu cầu cá nhân, địa điểm học tập/làm việc và chất lượng môi trường sống.

StayWise không phải website đăng tin bất động sản truyền thống. Sản phẩm tập trung vào:

- Phân tích dữ liệu chi phí sinh hoạt.
- Trực quan hóa dữ liệu không gian trên bản đồ.
- So sánh các khu vực dựa trên nhiều tiêu chí.
- Đề xuất khu vực phù hợp với từng người dùng.
- Khai thác đánh giá và trải nghiệm sinh sống từ cộng đồng.
- Thu thập, xác thực và quản lý dữ liệu khu vực.

## 1.2. Vấn đề cần giải quyết

Người tìm thuê trọ thường chỉ quan tâm đến giá phòng mà chưa đánh giá đầy đủ các khoản chi phí phát sinh như:

- Tiền thuê nhà.
- Tiền ăn uống.
- Điện, nước và Internet.
- Chi phí đi lại.
- Chi phí sinh hoạt cá nhân.
- Chi phí phát sinh khác.

Ngoài ra, người dùng còn gặp khó khăn khi đánh giá:

- Khu vực có phù hợp với ngân sách không?
- Khoảng cách từ nơi ở đến trường học hoặc nơi làm việc có hợp lý không?
- Khu vực có nhiều tiện ích thiết yếu không?
- Môi trường sống có an toàn, yên tĩnh không?
- Khu vực có thường xuyên xảy ra ngập lụt hoặc ùn tắc giao thông không?
- Chi phí sinh hoạt thực tế có khác biệt nhiều so với giá thuê phòng không?

StayWise giải quyết vấn đề này bằng cách kết hợp bản đồ, dữ liệu chi phí, công cụ tính toán, hệ thống đánh giá cộng đồng và thuật toán gợi ý minh bạch.

## 1.3. Mục tiêu sản phẩm

1. Giúp người dùng xác định tổng chi phí sinh hoạt hàng tháng tại từng khu vực.
2. Cho phép khám phá dữ liệu chi phí sinh hoạt bằng bản đồ tương tác và Heatmap.
3. Gợi ý những khu vực phù hợp với ngân sách và nhu cầu cá nhân.
4. Cho phép so sánh trực tiếp nhiều khu vực.
5. Cung cấp thông tin về tiện ích, giao thông và môi trường sống.
6. Xây dựng hệ thống đánh giá, đóng góp và xác thực dữ liệu từ cộng đồng.
7. Cung cấp Dashboard giúp người dùng phân tích thông tin trực quan.
8. Cung cấp giao diện Admin để quản lý dữ liệu và kiểm duyệt đóng góp.

## 1.4. Đối tượng người dùng

### Nhóm 1: Sinh viên

Nhu cầu:
- Tìm khu vực thuê trọ giá hợp lý.
- Tìm nơi ở gần trường học.
- Ước tính chi phí sinh hoạt hàng tháng.
- Tìm nơi có chợ, siêu thị, quán ăn bình dân và trạm xe buýt.
- Hạn chế các khoản chi phí phát sinh.

### Nhóm 2: Người đi làm

Nhu cầu:
- Tìm khu vực phù hợp với mức thu nhập.
- Tối ưu khoảng cách đến nơi làm việc.
- Đánh giá giao thông và thời gian di chuyển.
- Cân bằng tiền thuê nhà và chất lượng môi trường sống.

### Nhóm 3: Admin

Nhu cầu:
- Quản lý dữ liệu khu vực.
- Theo dõi đóng góp của người dùng.
- Duyệt, từ chối hoặc chỉnh sửa dữ liệu.
- Theo dõi thống kê và chất lượng dữ liệu.

---

# 2. TECH STACK VÀ KIẾN TRÚC

## 2.1. Tech stack bắt buộc

Sử dụng công nghệ hiện đại, ưu tiên khả năng chạy ổn định ở local và không yêu cầu API key trả phí.

| Hạng mục | Công nghệ |
|---|---|
| Framework | Next.js App Router |
| Ngôn ngữ | TypeScript |
| UI | React |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Charts | Recharts |
| Map | Leaflet |
| React Map Integration | React Leaflet |
| Heatmap | Leaflet.heat |
| Forms | React Hook Form |
| Validation | Zod |
| State Management | React Context / React Hooks |
| Local Persistence | Browser localStorage |
| Date Formatting | date-fns |
| Utility Styling | clsx, tailwind-merge |
| Testing | Vitest, React Testing Library |
| Browser Testing | Google Antigravity Integrated Browser |

## 2.2. Quy tắc triển khai bản đồ

Sử dụng:

- Leaflet.
- React Leaflet.
- Leaflet.heat.
- OpenStreetMap tiles.
- GeoJSON hoặc dữ liệu tọa độ cục bộ.

Yêu cầu:

1. Không sử dụng Google Maps API.
2. Không sử dụng Mapbox API yêu cầu API key.
3. Không yêu cầu tài khoản dịch vụ bản đồ trả phí.
4. Không phụ thuộc vào API Geocoding bên ngoài.
5. Tất cả dữ liệu khu vực, tọa độ, mức giá và điểm Heatmap phải được lưu trong dự án.
6. Sử dụng OpenStreetMap làm lớp bản đồ nền trong môi trường phát triển.
7. Phải có attribution phù hợp cho OpenStreetMap.
8. Nếu không có kết nối Internet hoặc bản đồ nền không tải được, phải hiển thị lớp bản đồ minh họa sử dụng dữ liệu cục bộ, không để trang bị trắng hoặc crash.
9. Không sử dụng ảnh marker mặc định tải từ URL bên ngoài. Ưu tiên sử dụng CircleMarker hoặc DivIcon.
10. Map component phải được load phía client bằng dynamic import với SSR disabled để tránh lỗi `window is not defined`.

Heatmap:

- Sử dụng Leaflet.heat để trực quan hóa mật độ chi phí.
- Màu sắc biểu thị mức chi phí từ thấp đến cao.
- Cường độ Heatmap được tính toán từ dữ liệu mẫu.
- Cho phép bật/tắt lớp Heatmap.
- Cho phép chuyển đổi loại dữ liệu hiển thị.
- Khi click vào một khu vực, hiển thị thông tin chi phí tương ứng.
- Có Legend giải thích thang màu.

Các chế độ hiển thị:

- Giá thuê phòng.
- Tổng chi phí sinh hoạt.
- Chi phí ăn uống.
- Chi phí đi lại.
- Mức độ tiện ích.
- Chỉ số chất lượng môi trường sống.

Lưu ý: Bản đồ nền có thể cần Internet để tải tile OpenStreetMap. Tuy nhiên, dữ liệu khu vực, bộ lọc, Heatmap và các thao tác phân tích phải hoạt động bằng dữ liệu local, không phụ thuộc API trả phí.

## 2.3. Kiến trúc tổng thể

Triển khai theo hướng Frontend-first, Local-first.

```text
STAYWISE
│
├── Next.js App Router
│
├── Presentation Layer
│   ├── Pages
│   ├── Layouts
│   ├── Components
│   └── UI Components
│
├── Application Layer
│   ├── Area Services
│   ├── Recommendation Engine
│   ├── Cost Calculator
│   ├── Comparison Engine
│   └── Contribution Moderation
│
├── Data Layer
│   ├── Static Seed Data
│   ├── Local GeoJSON
│   ├── LocalStorage
│   └── Data Persistence Utilities
│
└── Visualization Layer
    ├── Leaflet Map
    ├── Heatmap
    └── Recharts Dashboard

2.4. Quy tắc xử lý dữ liệu
Giai đoạn đầu không yêu cầu Backend hoặc Database thật.

Sử dụng:
- TypeScript để định nghĩa dữ liệu.
- Static seed data để tạo dữ liệu ban đầu.
- React state để quản lý trạng thái giao diện.
- localStorage để lưu dữ liệu đóng góp, bình luận, trạng thái duyệt và lựa chọn của người dùng.
- Service functions để tách riêng nghiệp vụ tính toán.
Không được nhúng toàn bộ logic xử lý dữ liệu trực tiếp vào các component giao diện.

Tổ chức các nghiệp vụ thành các module riêng:
- calculateMonthlyCost()
- calculateAreaScore()
- recommendAreas()
- compareAreas()
- calculateDistance()
- filterAreas()
- submitContribution()
- approveContribution()
- rejectContribution()
Mọi dữ liệu được đọc từ localStorage phải có kiểm tra, xử lý trường hợp JSON không hợp lệ và fallback về dữ liệu mặc định.

Không ghi đè dữ liệu mẫu gốc khi người dùng thực hiện thao tác.

3. THIẾT KẾ GIAO DIỆN VÀ DESIGN SYSTEM
3.1. Phong cách tổng thể
Phong cách: Modern SaaS, Data-driven, Minimal, Friendly.

StayWise phải tạo cảm giác của một nền tảng công nghệ phân tích dữ liệu đô thị, không giống website đăng tin bất động sản.

Ưu tiên:
- Giao diện sáng.
- Nền trắng hoặc xám rất nhạt.
- Card layout.
- Bo góc nhẹ.
- Typography rõ ràng.
- Khoảng trắng hợp lý.
- Biểu đồ hiện đại.
- Bản đồ là thành phần quan trọng.
- Nội dung trực quan, dễ hiểu.
- Hạn chế trang trí không cần thiết.
3.2. Color Palette
Sử dụng hệ màu nhất quán.
Primary — Green
- Primary: #16A36A
- Primary Hover: #128456
- Primary Light: #E8F7EF
- Primary Dark: #08734A
Ý nghĩa: Sự sống, phát triển, môi trường và tính bền vững.
Secondary — Navy
- Navy: #17324D
- Navy Light: #EAF0F6
- Navy Dark: #102438
Ý nghĩa: Độ tin cậy, chuyên nghiệp và tính công nghệ.
Neutral
- Background: #F7F9FC
- Surface: #FFFFFF
- Border: #E5EAF0
- Text Primary: #182230
- Text Secondary: #667085
- Text Muted: #98A2B3
Accent
- Warning: #F5A623
- Warning Light: #FFF4DB
- Danger: #E45A5A
- Danger Light: #FDECEC
- Info: #3B82F6
- Info Light: #EAF3FF
3.3. Typography
Ưu tiên font:
- Inter.
- Hoặc Geist Sans.
- Có fallback phù hợp cho tiếng Việt.
Typography phải có hierarchy rõ ràng.

Không sử dụng quá nhiều font size, font weight hoặc màu chữ khác nhau.
3.4. Component Design
Các thành phần phải thống nhất:
- Button.
- Input.
- Select.
- Search Bar.
- Filter Chips.
- Cards.
- Statistic Cards.
- Chart Cards.
- Modal.
- Drawer.
- Tooltip.
- Badge.
- Tabs.
- Dropdown.
- Pagination.
- Toast Notification.
- Empty State.
- Loading State.
- Confirmation Dialog.
3.5. Responsive
Bắt buộc hỗ trợ:
Thiết bị	Kích thước kiểm thử
Desktop	1440 × 900
Laptop	1280 × 800
Tablet	768 × 1024
Mobile	390 × 844
Mobile nhỏ	375 × 812

Quy tắc:
- Desktop: sử dụng sidebar hoặc top navigation tùy trang.
- Tablet: bố trí lại sidebar và các card.
- Mobile: chuyển sidebar thành mobile navigation/drawer.
- Không xuất hiện horizontal overflow ngoài các vùng được thiết kế để cuộn ngang.
- Các bảng dữ liệu phải có responsive layout.
- Các biểu đồ phải tự điều chỉnh kích thước.
- Bản đồ phải sử dụng được trên màn hình nhỏ.
- Các thao tác quan trọng phải có kích thước vùng chạm phù hợp.

4. DỮ LIỆU MẪU
4.1. Nguyên tắc dữ liệu
Bắt buộc có dữ liệu mẫu cho 10 khu vực tham chiếu tại Hà Nội và TP. Hồ Chí Minh.

Dữ liệu dùng để minh họa hoạt động của sản phẩm, không được trình bày như số liệu khảo sát chính thức hoặc dữ liệu thống kê nhà nước.

Tất cả dữ liệu mẫu phải được đánh dấu:

Dữ liệu minh họa — Không thay thế số liệu khảo sát thực tế.

Tên khu vực là các tên gọi địa lý quen thuộc, phục vụ tham chiếu thị trường. Không khẳng định chúng là ranh giới hành chính hiện hành hoặc GeoJSON ranh giới chính thức.

Đơn vị chi phí: triệu đồng/tháng.
4.2. Bộ dữ liệu 10 khu vực
Thành phố	Khu vực	Giá thuê trung bình	Ăn uống	Đi lại	Điện nước + Internet	Khác
Hà Nội	Cầu Giấy	4.2	2.6	0.8	0.65	1.1
Hà Nội	Mỹ Đình	3.8	2.5	0.85	0.65	1.0
Hà Nội	Hà Đông	3.2	2.4	0.9	0.62	0.95
Hà Nội	Đống Đa	4.5	2.8	0.75	0.7	1.2
Hà Nội	Long Biên	3.3	2.5	0.9	0.65	1.0
TP.HCM	Thủ Đức	3.8	2.8	1.0	0.7	1.2
TP.HCM	Bình Thạnh	4.6	2.9	0.85	0.72	1.2
TP.HCM	Gò Vấp	3.3	2.6	1.0	0.65	1.0
TP.HCM	Tân Bình	4.2	2.8	0.85	0.7	1.15
TP.HCM	Khu vực Quận 7	4.8	3.0	0.9	0.75	1.3

Tổng chi phí tham chiếu phải được tính bằng:

Tổng chi phí = Tiền thuê + Ăn uống + Đi lại + Điện nước/Internet + Chi phí khác

Không nhập tổng chi phí cố định nếu có thể tính trực tiếp từ các khoản thành phần.
4.3. Chỉ số chất lượng môi trường sống
Mỗi khu vực cần có các chỉ số từ 1 đến 5:
- Safety Score: Mức độ an ninh.
- Quietness Score: Mức độ yên tĩnh.
- Traffic Score: Mức độ thuận tiện giao thông.
- Environment Score: Chất lượng môi trường.
- Flood Risk Score: Nguy cơ ngập lụt.
Quy ước:
- Các chỉ số tốt: điểm càng cao càng tốt.
- Flood Risk Score: điểm càng cao nghĩa là nguy cơ ngập càng cao.
- Traffic Score: điểm càng cao nghĩa là giao thông càng thuận tiện.
Các điểm số là dữ liệu giả lập phục vụ demo.
4.4. Tọa độ tham chiếu
Mỗi khu vực phải có latitude và longitude để hiển thị trên bản đồ.
Khu vực	Latitude	Longitude
Cầu Giấy	21.030	105.790
Mỹ Đình	21.028	105.770
Hà Đông	20.971	105.779
Đống Đa	21.018	105.826
Long Biên	21.046	105.895
Thủ Đức	10.850	106.770
Bình Thạnh	10.810	106.710
Gò Vấp	10.840	106.670
Tân Bình	10.800	106.650
Khu vực Quận 7	10.730	106.720

Sử dụng tọa độ để:
- Hiển thị marker.
- Tạo Heatmap.
- Tính khoảng cách đường chim bay.
- Lựa chọn khu vực gần trường học hoặc nơi làm việc.
Khoảng cách tính từ tọa độ phải được ghi rõ là khoảng cách ước tính theo đường chim bay, không được nhầm lẫn với quãng đường di chuyển thực tế.
4.5. Tiện ích xung quanh
Mỗi khu vực phải có dữ liệu tiện ích mẫu:
- Restaurant: Quán ăn.
- Affordable Food: Quán ăn bình dân.
- Supermarket: Siêu thị.
- Market: Chợ.
- School: Trường học.
- Hospital: Bệnh viện.
- Bus Stop: Trạm xe buýt.
- Pharmacy: Nhà thuốc.
- Convenience Store: Cửa hàng tiện lợi.
Mỗi tiện ích cần có:
- ID.
- Name.
- Category.
- Area ID.
- Latitude.
- Longitude.
- Description.
- Distance hoặc khoảng cách ước tính.
Không bắt buộc phải hiển thị mọi tiện ích dưới dạng marker cùng lúc. Cần hỗ trợ bật/tắt từng nhóm tiện ích để tránh bản đồ quá tải.


5. CẤU TRÚC DỮ LIỆU VÀ NGHIỆP VỤ
5.1. Area
type Area = {
  id: string;
  slug: string;
  name: string;
  city: "hanoi" | "hcm";
  displayCity: string;
  latitude: number;
  longitude: number;

  rent: {
    min: number;
    max: number;
    average: number;
  };

  monthlyExpenses: {
    food: number;
    transportation: number;
    utilities: number;
    other: number;
  };

  livingScores: {
    safety: number;
    quietness: number;
    trafficConvenience: number;
    environment: number;
    floodRisk: number;
  };

  amenities: {
    restaurants: number;
    affordableFood: number;
    supermarkets: number;
    markets: number;
    schools: number;
    hospitals: number;
    busStops: number;
    pharmacies: number;
    convenienceStores: number;
  };

  description: string;
  highlights: string[];
  updatedAt: string;
};


5.2. Contribution
type Contribution = {
  id: string;
  areaId: string;
  authorName: string;

  category:
    | "security"
    | "quietness"
    | "flooding"
    | "traffic"
    | "utilities"
    | "rental"
    | "general";

  rating: number;
  content: string;

  status: "pending" | "approved" | "rejected";

  createdAt: string;
  updatedAt?: string;
};
5.3. Area Review
type AreaReview = {
  id: string;
  areaId: string;
  authorName: string;
  overallRating: number;
  securityRating: number;
  quietnessRating: number;
  trafficRating: number;
  floodingRating: number;
  utilityRating: number;
  content: string;
  createdAt: string;
};

5.4. Recommendation Preferences

type RecommendationPreferences = {
  city: "hanoi" | "hcm";
  monthlyBudget: number;
  maximumRent: number;

  destination: {
    label: string;
    latitude: number;
    longitude: number;
  } | null;

  maximumDistanceKm: number;

  priorities: {
    affordableCost: number;
    commute: number;
    amenities: number;
    environment: number;
  };
};
5.5. Recommendation Engine
Không sử dụng AI API hoặc mô hình trả phí.

Sử dụng thuật toán chấm điểm đa tiêu chí có thể giải thích được.

Các thành phần:
- Budget Fit: 40%.
- Commute Fit: 25%.
- Amenities Fit: 15%.
- Environment Fit: 20%.
Cho phép điều chỉnh trọng số ưu tiên trong giao diện; khi điều chỉnh, hệ thống phải chuẩn hóa trọng số để tổng bằng 100%.

Công thức:

Total Score = Budget Score × W1 + Commute Score × W2 + Amenities Score × W3 + Environment Score × W4

Trong đó:
- Budget Score: dựa trên tổng chi phí ước tính so với ngân sách.
- Commute Score: dựa trên khoảng cách tới điểm đến.
- Amenities Score: dựa trên số lượng tiện ích và nhu cầu được chọn.
- Environment Score: dựa trên an ninh, yên tĩnh, giao thông thuận tiện, môi trường và nguy cơ ngập.
Mọi thành phần điểm phải nằm trong khoảng 0–100.

Các khu vực vượt ngân sách phải bị trừ điểm tương ứng; không được cố tình xếp hạng cao chỉ vì có nhiều tiện ích.

Phải hiển thị lý do gợi ý, ví dụ:
- Tổng chi phí thấp hơn ngân sách.
- Gần địa điểm học tập/làm việc.
- Có nhiều tiện ích thiết yếu.
- Mức độ yên tĩnh tốt.
- Nguy cơ ngập thấp hơn các khu vực còn lại.
Không được sử dụng từ ngữ khẳng định hệ thống là AI nếu thực tế chỉ sử dụng thuật toán tính điểm.
5.6. Cost Calculator
Tất cả phép tính phải chạy phía client.

Đầu vào:
- Ngân sách hàng tháng.
- Tiền thuê phòng.
- Ăn uống.
- Đi lại.
- Điện.
- Nước.
- Internet.
- Chi phí cá nhân.
- Chi phí phát sinh.
Đầu ra:
- Tổng chi phí hàng tháng.
- Số tiền còn lại.
- Tỷ lệ chi phí thuê nhà.
- Tỷ lệ chi phí sinh hoạt.
- Trạng thái so với ngân sách.
- Biểu đồ phân bổ chi phí.
Cho phép người dùng chỉnh sửa giá trị ngay trên giao diện.

Khi thay đổi một giá trị, mọi tổng tiền, tỷ lệ, thông báo và biểu đồ liên quan phải cập nhật ngay.

Hỗ trợ chức năng Reset.
5.7. Comparison Engine
Cho phép chọn tối đa 4 khu vực để so sánh.

Tiêu chí:
- Giá thuê trung bình.
- Tổng chi phí sinh hoạt.
- Chi phí ăn uống.
- Chi phí đi lại.
- Điện nước/Internet.
- Khoảng cách đến điểm đến.
- Tiện ích.
- An ninh.
- Yên tĩnh.
- Giao thông.
- Môi trường.
- Nguy cơ ngập.
Cần hỗ trợ:
- Bảng so sánh trực tiếp.
- Biểu đồ cột.
- Highlight khu vực có chỉ số tốt nhất.
- Highlight các khoản chi phí cao nhất.
- Xóa khu vực khỏi danh sách so sánh.
- Thay thế khu vực khác.
- Lưu lựa chọn so sánh bằng localStorage.
Không dùng dữ liệu tĩnh cho kết quả so sánh. Phải tính từ dữ liệu của các khu vực đang được chọn.

6. DANH SÁCH TRANG VÀ CHỨC NĂNG
6.1. Trang chủ — /
Mục tiêu:

Giới thiệu sản phẩm và dẫn dắt người dùng tới trải nghiệm khám phá khu vực.
Section 1: Navigation
Có:
- Logo StayWise.
- Trang chủ.
- Khám phá khu vực.
- Tính chi phí.
- So sánh.
- Cộng đồng.
- Dashboard.
- Nút Đăng nhập hoặc Tài khoản.
- Mobile navigation.
Logo phải được xây dựng bằng text và/hoặc Lucide Icon, không cần ảnh logo từ URL bên ngoài.
Section 2: Hero
Thông điệp chính:

Tìm nơi sống phù hợp. Sống thông minh hơn.

Mô tả:

"Khám phá khu vực sống, phân tích chi phí và lựa chọn nơi ở phù hợp với ngân sách và phong cách sống của bạn."

Thành phần:
- Hero heading nổi bật.
- Subtitle.
- Search Bar tìm kiếm khu vực.
- City Selector.
- CTA Khám phá ngay.
- CTA Tính chi phí sinh hoạt.
- Các chỉ số thống kê nổi bật.
- Minh họa bản đồ hoặc dữ liệu đô thị.
Search Bar phải có gợi ý khu vực từ bộ dữ liệu local và điều hướng đến trang khám phá hoặc trang chi tiết.
Section 3: Quick Statistics
Hiển thị:
- Số khu vực đang được phân tích.
- Giá thuê trung bình tham chiếu.
- Tổng chi phí tham chiếu.
- Số đánh giá cộng đồng.
Các số liệu phải lấy từ dữ liệu thật đang được hiển thị, không hardcode ngẫu nhiên.
Section 4: Explore Map Preview
- Bản đồ khu vực.
- Marker cho các khu vực.
- Màu sắc thể hiện mức chi phí.
- Nút chuyển sang Heatmap.
- Popup chi tiết khi click.
- CTA Xem bản đồ đầy đủ.
Section 5: Featured Areas
Hiển thị các khu vực nổi bật dưới dạng card.

Mỗi card có:
- Tên khu vực.
- Thành phố.
- Giá thuê trung bình.
- Tổng chi phí tham chiếu.
- Điểm chất lượng môi trường sống.
- Điểm mạnh nổi bật.
- Nút Xem chi tiết.
- Nút So sánh.
Section 6: Cost Calculator Preview
Giới thiệu công cụ tính chi phí.

Có form nhập ngân sách đơn giản và CTA mở trang tính chi phí.
Section 7: How StayWise Works
Trình bày 3 bước:
1. Khám phá khu vực.
2. Phân tích và so sánh chi phí.
3. Chọn nơi sống phù hợp.
Section 8: Community Insights
Hiển thị những đánh giá cộng đồng mới nhất đã được duyệt.
Section 9: Footer
Có:
- Logo.
- Giới thiệu.
- Điều khoản sử dụng.
- Chính sách dữ liệu mẫu.
- Điều hướng.
- Thông tin liên hệ dạng placeholder hợp lý.

6.2. Trang Khám phá khu vực — /explore
Đây là một trong những trang quan trọng nhất của sản phẩm.
Layout
- Header và Search.
- Bộ lọc bên trái hoặc dạng drawer.
- Bản đồ chiếm phần lớn diện tích.
- Danh sách khu vực hiển thị cạnh bản đồ.
- Mobile chuyển thành tab Bản đồ/Danh sách.
Bộ lọc
- Thành phố.
- Khoảng giá thuê.
- Tổng chi phí sinh hoạt.
- Mức ngân sách.
- Mức độ an ninh.
- Mức độ yên tĩnh.
- Giao thông.
- Nguy cơ ngập.
- Tiện ích.
Tất cả bộ lọc phải hoạt động thực tế.
Map Controls
- Zoom in/out.
- Fit bounds.
- Chọn khu vực.
- Hiển thị marker.
- Bật/tắt Heatmap.
- Chuyển chế độ màu.
- Bật/tắt tiện ích.
- Hiển thị Legend.
Heatmap Controls
Cho phép chọn dữ liệu:
- Giá thuê.
- Tổng chi phí.
- Chi phí ăn uống.
- Chi phí đi lại.
- Chất lượng môi trường sống.
Thay đổi loại dữ liệu phải cập nhật Heatmap và Legend ngay lập tức.
Area List
Card của khu vực phải có:
- Tên.
- Thành phố.
- Giá thuê.
- Tổng chi phí.
- Chỉ số môi trường sống.
- Khoảng cách nếu người dùng đã nhập điểm đến.
- Nút xem chi tiết.
- Nút thêm vào so sánh.
Có sắp xếp:
- Chi phí thấp nhất.
- Giá thuê thấp nhất.
- Điểm môi trường sống cao nhất.
- Khoảng cách gần nhất.
Có Empty State khi không tìm thấy khu vực phù hợp.

6.3. Trang Chi tiết khu vực — /areas/[slug]
Section 1: Area Header
- Tên khu vực.
- Thành phố.
- Mô tả.
- Giá thuê trung bình.
- Tổng chi phí tham chiếu.
- Nút So sánh.
- Nút Đánh giá.
Section 2: Cost Overview
Biểu đồ phân bổ:
- Tiền thuê.
- Ăn uống.
- Đi lại.
- Điện nước/Internet.
- Khác.
Hiển thị tổng chi phí hàng tháng.
Section 3: Area Map
- Bản đồ vị trí.
- Marker tiện ích.
- Điểm đến tham chiếu.
- Khoảng cách ước tính.
Section 4: Living Quality
Hiển thị các điểm số:
- An ninh.
- Yên tĩnh.
- Giao thông.
- Môi trường.
- Nguy cơ ngập.
Có giải thích cách hiểu điểm số.
Section 5: Nearby Amenities
Có danh sách tiện ích.

Bộ lọc:
- Quán ăn.
- Siêu thị.
- Chợ.
- Trường học.
- Bệnh viện.
- Trạm xe buýt.
- Nhà thuốc.
- Cửa hàng tiện lợi.
Section 6: Community Reviews
- Rating trung bình.
- Phân bổ đánh giá.
- Danh sách nhận xét.
- Nhãn trạng thái đã duyệt.
- Nút Đóng góp đánh giá.
Không hiển thị những contribution chưa được duyệt.
Section 7: Related Areas
Đề xuất các khu vực tương tự dựa trên thành phố và mức chi phí.

6.4. Trang Tính chi phí — /calculator
Mục tiêu:

Cho phép người dùng xây dựng một kế hoạch chi tiêu cá nhân.
Input Section
Thông tin:
- Thành phố.
- Khu vực đang cân nhắc.
- Ngân sách hàng tháng.
- Tiền thuê nhà.
- Ăn uống.
- Đi lại.
- Tiền điện.
- Tiền nước.
- Internet.
- Chi tiêu cá nhân.
- Chi phí phát sinh.
Có thể lấy dữ liệu mặc định từ khu vực được chọn, nhưng người dùng phải chỉnh sửa được.
Result Section
Hiển thị:
- Tổng chi phí.
- Ngân sách.
- Số tiền còn lại.
- Tỷ lệ sử dụng ngân sách.
- Trạng thái tiết kiệm/vượt ngân sách.
Charts
Sử dụng Recharts:
- Pie Chart: Cơ cấu chi tiêu.
- Bar Chart: So sánh chi phí với ngân sách.
- Có tooltip.
- Có legend.
- Có responsive container.
Actions
- Reset.
- Lưu kế hoạch trên localStorage.
- Đặt lại ngân sách.
- So sánh với khu vực khác.
Khi người dùng thay đổi Input, kết quả phải cập nhật theo thời gian thực.

6.5. Trang Gợi ý khu vực — /recommendations
Mục tiêu:

Tìm những nơi sống phù hợp nhất với người dùng.
Section 1: Preference Form
Thông tin:
- Thành phố.
- Ngân sách tối đa mỗi tháng.
- Tiền thuê tối đa.
- Điểm đến học tập/làm việc.
- Khoảng cách chấp nhận được.
- Ưu tiên tiết kiệm.
- Ưu tiên đi lại.
- Ưu tiên tiện ích.
- Ưu tiên môi trường sống.
Cho phép chọn điểm đến từ danh sách địa điểm tham chiếu hoặc lựa chọn một vị trí trên bản đồ.

Không cần tích hợp dịch vụ Geocoding.
Section 2: Recommendation Result
Hiển thị danh sách theo điểm phù hợp giảm dần.

Mỗi card có:
- Vị trí xếp hạng.
- Tên khu vực.
- Điểm phù hợp.
- Tổng chi phí tham chiếu.
- Số tiền còn lại.
- Khoảng cách ước tính.
- Điểm tiện ích.
- Điểm môi trường sống.
- Lý do được đề xuất.
Section 3: Recommendation Analysis
Biểu đồ so sánh:
- Điểm phù hợp.
- Tổng chi phí.
- Khoảng cách.
- Chất lượng môi trường sống.
Cho phép thay đổi ưu tiên và tính toán lại ngay.

Nếu không có kết quả đạt điều kiện, hiển thị thông báo và đề xuất nới lỏng tiêu chí.

6.6. Trang So sánh — /compare
Section 1: Area Selector
- Chọn thành phố.
- Tìm khu vực.
- Thêm khu vực.
- Xóa khu vực.
- Tối đa 4 khu vực.
Section 2: Comparison Summary
Hiển thị bảng so sánh:
Tiêu chí	Khu vực A	Khu vực B	Khu vực C
Giá thuê	...	...	...
Ăn uống	...	...	...
Đi lại	...	...	...
Tổng chi phí	...	...	...
An ninh	...	...	...
Yên tĩnh	...	...	...
Giao thông	...	...	...
Môi trường	...	...	...
Nguy cơ ngập	...	...	...

Section 3: Charts
- Bar Chart so sánh chi phí.
- Bar Chart so sánh chất lượng môi trường sống.
- Radar Chart so sánh nhiều tiêu chí.
Section 4: Conclusion
Tổng kết:
- Khu vực tiết kiệm nhất.
- Khu vực gần điểm đến nhất.
- Khu vực có chất lượng môi trường sống tốt nhất.
- Khu vực có tiện ích tốt nhất.
Không được chọn khu vực tốt nhất nếu dữ liệu không đủ.

Tất cả kết luận phải dựa trên dữ liệu hiện tại.

6.7. Trang Cộng đồng — /community
Section 1: Community Overview
- Tổng số đánh giá đã duyệt.
- Số khu vực có đánh giá.
- Điểm đánh giá trung bình.
Section 2: Review Feed
Danh sách đánh giá được duyệt.

Có bộ lọc:
- Thành phố.
- Khu vực.
- Chủ đề đánh giá.
- Điểm số.
- Mới nhất.
Section 3: Community Topics
Chủ đề:
- An ninh.
- Yên tĩnh.
- Ngập lụt.
- Giao thông.
- Giá điện nước.
- Chi phí sinh hoạt.
- Trải nghiệm thực tế.
Section 4: Contribution CTA
Nút Đóng góp dữ liệu.
Section 5: Data Trust
Giải thích:
- Đóng góp của người dùng được kiểm duyệt.
- Nội dung chưa duyệt không được hiển thị công khai.
- Dữ liệu mẫu không phải số liệu khảo sát chính thức.
- Người dùng cần đóng góp thông tin trung thực.

6.8. Trang Đóng góp dữ liệu — /contribute
Cho phép người dùng gửi thông tin mới hoặc cập nhật thông tin khu vực.
Contribution Form
Các trường:
- Tên người đóng góp.
- Thành phố.
- Khu vực.
- Loại đóng góp.
- Điểm đánh giá.
- Nội dung.
- Ngày đóng góp.
Loại đóng góp:
- An ninh.
- Độ yên tĩnh.
- Ngập lụt.
- Giao thông.
- Giá điện nước.
- Giá thuê.
- Trải nghiệm sinh sống.
Validation:
- Không cho phép gửi dữ liệu rỗng.
- Điểm đánh giá nằm trong khoảng 1–5.
- Nội dung có giới hạn độ dài hợp lý.
- Hiển thị lỗi dưới trường tương ứng.
- Hiển thị thông báo khi gửi thành công.
Sau khi submit:
1. Tạo Contribution ID.
2. Lưu dữ liệu vào localStorage.
3. Gán status = pending.
4. Thông báo đang chờ Admin xác nhận.
5. Không tự động cập nhật dữ liệu công khai.
Phải có trang hoặc khu vực hiển thị trạng thái đóng góp của người dùng.

6.9. Trang Dashboard — /dashboard
Mục tiêu:

Tổng hợp dữ liệu và cung cấp khả năng phân tích.
Section 1: Dashboard Header
- Tiêu đề.
- Bộ lọc thành phố.
- Bộ lọc khu vực.
- Bộ lọc khoảng giá.
Section 2: KPI Cards
- Tổng số khu vực.
- Giá thuê trung bình.
- Tổng chi phí trung bình.
- Điểm môi trường sống trung bình.
- Tổng số đánh giá đã duyệt.
Section 3: Expense Analysis
- Biểu đồ phân bổ chi phí.
- So sánh giá thuê giữa các khu vực.
- So sánh tổng chi phí giữa hai thành phố.
Section 4: Living Quality Analysis
- Biểu đồ so sánh an ninh.
- Biểu đồ yên tĩnh.
- Biểu đồ giao thông.
- Biểu đồ môi trường.
- Biểu đồ nguy cơ ngập.
Section 5: Area Ranking
Bảng xếp hạng:
- Khu vực tiết kiệm nhất.
- Khu vực đắt đỏ nhất.
- Khu vực có môi trường tốt nhất.
- Khu vực có nhiều tiện ích nhất.
Section 6: Map Overview
Bản đồ và Heatmap.

Mọi bộ lọc trên Dashboard phải tác động đến KPI, charts, ranking và dữ liệu bản đồ tương ứng.

6.10. Admin Dashboard — /admin
Giao diện Admin nằm trong cùng ứng dụng.

Lưu ý: Đây là chế độ quản trị demo chạy local. Không được tuyên bố rằng localStorage hoặc việc ẩn/hiện trang Admin cung cấp bảo mật thực tế. Không có xác thực Backend trong phiên bản này.
Admin Layout
Sidebar:
- Tổng quan.
- Quản lý khu vực.
- Quản lý đóng góp.
- Quản lý đánh giá.
- Báo cáo dữ liệu.
- Cài đặt.
Admin Overview
KPI:
- Tổng khu vực.
- Tổng đóng góp.
- Đang chờ duyệt.
- Đã duyệt.
- Bị từ chối.
- Tổng đánh giá.
Charts:
- Đóng góp theo thời gian.
- Trạng thái duyệt.
- Đánh giá theo khu vực.
- Phân bố chi phí.
6.11. Quản lý khu vực — /admin/areas
Có:
- Danh sách khu vực.
- Tìm kiếm.
- Lọc theo thành phố.
- Sắp xếp.
- Xem chi tiết.
- Thêm khu vực.
- Chỉnh sửa khu vực.
- Xóa khu vực với Confirmation Dialog.
Thay đổi phải cập nhật giao diện và localStorage.

Không được xóa dữ liệu gốc một cách không thể khôi phục khi có thao tác demo.
6.12. Quản lý đóng góp — /admin/contributions
Hiển thị danh sách:
- Pending.
- Approved.
- Rejected.
Bộ lọc:
- Trạng thái.
- Khu vực.
- Danh mục.
- Ngày đóng góp.
Admin có thể:
- Xem nội dung.
- Duyệt.
- Từ chối.
- Chỉnh sửa nội dung trước khi duyệt nếu cần.
Khi duyệt:
1. Cập nhật trạng thái Approved.
2. Lưu trạng thái vào localStorage.
3. Cập nhật phần thống kê.
4. Cho phép dữ liệu đã duyệt xuất hiện trong khu vực Cộng đồng.
Khi từ chối:
1. Cập nhật trạng thái Rejected.
2. Lưu trạng thái vào localStorage.
3. Không hiển thị nội dung này ở cộng đồng.
Tất cả thao tác phải hoạt động thực tế.
6.13. Báo cáo Admin — /admin/reports
Hiển thị:
- Số lượng đóng góp.
- Tỷ lệ duyệt.
- Tỷ lệ từ chối.
- Khu vực có nhiều đóng góp.
- Khu vực có nhiều đánh giá.
- Thống kê biến động dữ liệu.
Có nút xuất CSV dữ liệu hiện tại.

CSV phải được tạo từ dữ liệu thực tế đang được lưu trong ứng dụng.
6.14. Các trang phụ
- /login: giao diện đăng nhập demo nếu cần.
- /not-found: trang 404.
- Error Boundary.
- Loading State.
- Empty State.
Không cần kết nối dịch vụ đăng nhập bên ngoài.

7. GLOBAL INTERACTION REQUIREMENTS
Đây là yêu cầu bắt buộc.

StayWise không được chỉ là một bản thiết kế tĩnh.

Tất cả chức năng sau phải tương tác thật:
7.1. Navigation
- Tất cả menu hoạt động.
- Tất cả CTA hoạt động.
- Không có link # không có mục đích.
- Không có nút bấm trang trí nhưng không có chức năng.
- Breadcrumb hoạt động.
- Điều hướng về trang trước phù hợp.
7.2. Search
- Tìm kiếm theo tên khu vực.
- Gợi ý kết quả.
- Enter để chọn.
- Click để điều hướng.
- Có Empty State.
7.3. Filter
- Lọc theo thành phố.
- Lọc giá thuê.
- Lọc tổng chi phí.
- Lọc môi trường sống.
- Lọc tiện ích.
- Reset Filter.
- Kết hợp nhiều điều kiện.
7.4. Map
- Marker có thể click.
- Popup hiển thị thông tin.
- Heatmap bật/tắt.
- Legend cập nhật.
- Layer tiện ích bật/tắt.
- Bộ lọc cập nhật các khu vực.
- Click vào khu vực có thể mở trang chi tiết.
7.5. Calculator
- Tính toán tức thời.
- Cập nhật biểu đồ.
- Cập nhật ngân sách còn lại.
- Validation.
- Reset.
7.6. Comparison
- Thêm khu vực.
- Xóa khu vực.
- Không thêm trùng.
- Giới hạn tối đa 4 khu vực.
- Bảng và biểu đồ thay đổi theo lựa chọn.
7.7. Recommendation
- Nhập ngân sách.
- Chọn thành phố.
- Chọn điểm đến.
- Thay đổi trọng số.
- Tính toán lại.
- Sắp xếp theo điểm phù hợp.
- Hiển thị lý do đề xuất.
7.8. Contribution
- Validation.
- Submit.
- Lưu localStorage.
- Pending status.
- Thông báo kết quả.
7.9. Admin
- Tìm kiếm.
- Lọc.
- Duyệt.
- Từ chối.
- Chỉnh sửa.
- Xóa.
- Khôi phục dữ liệu demo.
- Export CSV.
7.10. Persistence
Dữ liệu sau phải tồn tại khi reload:
- Đóng góp.
- Trạng thái kiểm duyệt.
- Đánh giá.
- Khu vực Admin thêm hoặc chỉnh sửa.
- Danh sách so sánh.
- Kế hoạch chi phí đã lưu.
- Preferences.
Có chức năng khôi phục dữ liệu demo ban đầu.

8. KIẾN TRÚC THƯ MỤC ĐỀ XUẤT
Antigravity có thể điều chỉnh cấu trúc trong giai đoạn Planning nhưng phải đảm bảo tách biệt nghiệp vụ và giao diện.

staywise/
│
├── public/
│   └── assets/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── explore/
│   │   │   └── page.tsx
│   │   │
│   │   ├── areas/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── calculator/
│   │   │   └── page.tsx
│   │   │
│   │   ├── recommendations/
│   │   │   └── page.tsx
│   │   │
│   │   ├── compare/
│   │   │   └── page.tsx
│   │   │
│   │   ├── community/
│   │   │   └── page.tsx
│   │   │
│   │   ├── contribute/
│   │   │   └── page.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   │
│   │   └── admin/
│   │       ├── page.tsx
│   │       ├── areas/
│   │       ├── contributions/
│   │       └── reports/
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── common/
│   │   ├── cards/
│   │   ├── charts/
│   │   ├── map/
│   │   ├── forms/
│   │   └── admin/
│   │
│   ├── features/
│   │   ├── explore/
│   │   ├── calculator/
│   │   ├── recommendations/
│   │   ├── comparison/
│   │   ├── community/
│   │   └── moderation/
│   │
│   ├── data/
│   │   ├── areas.ts
│   │   ├── amenities.ts
│   │   ├── reviews.ts
│   │   ├── contributions.ts
│   │   ├── destinations.ts
│   │   └── geo/
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │   ├── calculations/
│   │   ├── recommendations/
│   │   ├── storage/
│   │   ├── map/
│   │   ├── formatting/
│   │   ├── validation/
│   │   └── utils.ts
│   │
│   ├── types/
│   │
│   └── providers/
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── artifacts/
│   ├── screenshots/
│   └── reports/
│
├── SPEC.md
├── package.json
├── tsconfig.json
└── README.md

9. QUY TẮC KỸ THUẬT BẮT BUỘC
9.1. Code Quality
- TypeScript strict mode.
- Không lạm dụng any.
- Không để code trùng lặp không cần thiết.
- Không nhồi toàn bộ logic vào một file.
- Tách component theo chức năng.
- Tách calculation functions ra khỏi UI.
- Đặt tên biến và function có ý nghĩa.
- Xử lý lỗi có chủ đích.
9.2. Next.js
- Sử dụng App Router.
- Dùng Server Component khi phù hợp.
- Dùng Client Component cho chức năng cần state, event hoặc browser APIs.
- Không sử dụng window hoặc localStorage trực tiếp trong Server Component.
- Xử lý hydration mismatch.
- Các trang động phải có xử lý slug không hợp lệ.
9.3. Map
- Không gây lỗi SSR.
- Không crash khi không tải được tiles.
- Có fallback.
- Marker hiển thị chính xác vị trí tham chiếu.
- Heatmap phải thay đổi theo bộ dữ liệu được chọn.
- Không để bản đồ chặn thao tác cuộn trên mobile.
9.4. Charts
- Sử dụng Recharts.
- Responsive.
- Tooltip.
- Legend.
- Không hiển thị NaN, undefined hoặc dữ liệu không hợp lệ.
- Format tiền tệ thống nhất.
- Không dùng dữ liệu chart hardcode khi đã có dữ liệu nguồn.
9.5. LocalStorage
- Có key naming convention.
- Có default state.
- Có parse error handling.
- Có data validation.
- Có reset seed data.
- Không gây hydration mismatch.
9.6. UI
- 100% tiếng Việt.
- Không trộn ngôn ngữ giao diện không cần thiết.
- Không có Lorem Ipsum.
- Không có link ảnh chết.
- Không phụ thuộc stock image bên ngoài để hoàn thiện giao diện.
- Ưu tiên CSS, SVG và Lucide Icons.
- Không dùng emoji làm icon chính của hệ thống.
- Loading State và Empty State phải được thiết kế đầy đủ.
- Có Toast hoặc thông báo cho thao tác thành công/thất bại.
9.7. Security và Data Integrity
- Validate toàn bộ input.
- Không render HTML người dùng đóng góp bằng dangerouslySetInnerHTML.
- Escape nội dung người dùng.
- Không lưu secret hoặc API key.
- Không tuyên bố localStorage là hệ thống xác thực bảo mật.
- Admin demo phải được ghi rõ là giao diện quản trị mô phỏng.

10. ACCEPTANCE CRITERIA — TIÊU CHÍ NGHIỆM THU
Sản phẩm chỉ được xem là hoàn thành khi đáp ứng đầy đủ các tiêu chí dưới đây.
10.1. Build
- npm install thành công.
- npm run dev hoạt động.
- npm run build thành công.
- npm run lint không có lỗi.
- npm run typecheck không có lỗi.
- Test scripts chạy thành công nếu được cấu hình.
10.2. Functional
Kiểm tra:
- Navigation.
- Search.
- Filter.
- Sort.
- Map.
- Heatmap.
- Calculator.
- Recommendation.
- Comparison.
- Community Reviews.
- Contribution.
- Admin Moderation.
- LocalStorage Persistence.
- CSV Export.
Không có chức năng chính nào chỉ là UI giả.
10.3. Visual
Kiểm thử trên:
- Desktop.
- Tablet.
- Mobile.
Không có:
- Horizontal overflow không chủ đích.
- Text bị tràn.
- Card bị chồng lấn.
- Modal vượt khỏi màn hình.
- Chart biến mất.
- Map không thể thao tác.
- Sidebar che nội dung.
- Button quá nhỏ trên mobile.
- Layout bị vỡ.
10.4. Console
Không được có:
- Uncaught exceptions.
- React hydration errors.
- Missing key warnings.
- Failed imports.
- Invalid DOM nesting.
- Unhandled promise rejections.
- Các error nghiêm trọng khi tương tác với Map hoặc Charts.
Các lỗi mạng tile OpenStreetMap khi offline phải được xử lý bằng fallback, không làm ứng dụng crash.
10.5. End-to-end Scenarios
Phải kiểm thử ít nhất các kịch bản:

Scenario 1 — Khám phá
1. Mở trang chủ.
2. Click Khám phá.
3. Chọn Hà Nội.
4. Lọc giá thuê.
5. Click một marker.
6. Mở trang chi tiết.
Scenario 2 — Tính chi phí
1. Mở Calculator.
2. Nhập ngân sách.
3. Điều chỉnh tiền thuê.
4. Điều chỉnh ăn uống.
5. Kiểm tra tổng chi phí.
6. Kiểm tra biểu đồ cập nhật.
Scenario 3 — Recommendation
1. Chọn thành phố.
2. Nhập ngân sách.
3. Chọn điểm đến.
4. Điều chỉnh ưu tiên.
5. Tính gợi ý.
6. Kiểm tra thứ tự kết quả và lý do đề xuất.
Scenario 4 — Comparison
1. Chọn 2 khu vực.
2. Thêm khu vực thứ 3.
3. Kiểm tra bảng.
4. Kiểm tra biểu đồ.
5. Xóa khu vực.
6. Kiểm tra dữ liệu cập nhật.
Scenario 5 — Contribution
1. Mở trang đóng góp.
2. Nhập thông tin.
3. Submit.
4. Xác nhận được lưu.
5. Reload trang.
6. Kiểm tra dữ liệu vẫn tồn tại.
Scenario 6 — Admin Moderation
1. Mở Admin.
2. Vào danh sách đóng góp.
3. Lọc Pending.
4. Duyệt một đóng góp.
5. Kiểm tra trạng thái thay đổi.
6. Mở Community.
7. Xác nhận dữ liệu đã duyệt hiển thị.
Scenario 7 — Responsive
1. Kiểm thử các trang ở desktop.
2. Thu nhỏ về tablet.
3. Chuyển sang mobile.
4. Kiểm tra navigation.
5. Kiểm tra card và chart.
6. Kiểm tra map.
7. Kiểm tra modal và form.

11. BÀN GIAO SẢN PHẨM
Sau khi hoàn thành, dự án cần có:
1. Source code hoàn chỉnh.
2. Cấu trúc thư mục rõ ràng.
3. Bộ dữ liệu mẫu cho 10 khu vực.
4. README hướng dẫn cài đặt và chạy local.
5. Các trang hoạt động.
6. Chức năng tương tác thực tế.
7. Kết quả build và test.
8. Ảnh chụp màn hình từng trang ở desktop.
9. Ảnh chụp màn hình từng trang ở mobile.
10. Báo cáo nghiệm thu trong artifacts/ACCEPTANCE_REPORT.md.
Không được tuyên bố hoàn thành nếu chưa thực sự chạy build và kiểm thử.

Nếu có chức năng không thể hoàn thành, phải ghi rõ:
- Chức năng nào chưa hoàn thành.
- Nguyên nhân.
- Mức độ ảnh hưởng.
- Cách khắc phục tiếp theo.
ĐỊNH HƯỚNG CUỐI CÙNG

StayWise phải là một nền tảng phân tích chi phí sinh hoạt trực quan, dễ sử dụng và có tính tương tác cao.

Trọng tâm trải nghiệm là:

EXPLORE → ANALYZE → COMPARE → RECOMMEND → DECIDE

Không đánh đổi chất lượng trải nghiệm để tạo ra quá nhiều trang giao diện sơ sài.

