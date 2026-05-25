# Yêu cầu Dự án: Quản lý Người dùng, Sản phẩm và Đơn hàng

## Mô tả
Ứng dụng web quản lý người dùng, sản phẩm và đơn hàng.
Xây dựng bằng Nuxt 4, TypeScript, Tailwind CSS và Prisma ORM kết nối PostgreSQL.

---

## Công nghệ sử dụng
- **Framework**: Nuxt 4 (v4.x), Vue 3 Composition API
- **Ngôn ngữ**: TypeScript (strict mode, không dùng `any`)
- **Styling**: Tailwind CSS (utility classes)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **State Management**: useState (Nuxt built-in)

---

## Cấu trúc thư mục cần tạo

```
my-project/
├── .clinerules
├── .env
├── .env.example
├── nuxt.config.ts
├── tsconfig.json
├── prisma/
│   └── schema.prisma
├── server/
│   ├── lib/
│   │   └── prisma.ts          ← Prisma client singleton
│   └── api/
│       ├── users/
│       │   ├── index.get.ts   ← GET /api/users
│       │   └── index.post.ts  ← POST /api/users
│       ├── products/
│       │   ├── index.get.ts   ← GET /api/products
│       │   └── index.post.ts  ← POST /api/products
│       └── orders/
│           ├── index.get.ts   ← GET /api/orders
│           └── index.post.ts  ← POST /api/orders
├── pages/
│   ├── index.vue              ← Trang chủ / Dashboard
│   ├── users/
│   │   └── index.vue          ← Danh sách người dùng
│   ├── products/
│   │   └── index.vue          ← Danh sách sản phẩm
│   └── orders/
│       └── index.vue          ← Danh sách đơn hàng
├── components/
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   ├── AppNavbar.vue
│   └── AppTable.vue           ← Component bảng dùng chung
└── layouts/
    └── default.vue
```

---

## 3 Bảng Database

### Bảng 1: User (Người dùng)
| Trường | Kiểu | Ghi chú |
|---|---|---|
| Id | Int | Khóa chính, tự tăng |
| Name | String | Họ tên |
| Email | String | Email, duy nhất |
| CreatedAt | DateTime | Ngày tạo, mặc định now() |

Quan hệ: Một User có nhiều Order

### Bảng 2: Product (Sản phẩm)
| Trường | Kiểu | Ghi chú |
|---|---|---|
| Id | Int | Khóa chính, tự tăng |
| Name | String | Tên sản phẩm |
| Price | Decimal | Giá sản phẩm |
| Stock | Int | Số lượng tồn kho, mặc định 0 |
| CreatedAt | DateTime | Ngày tạo, mặc định now() |

### Bảng 3: Order (Đơn hàng)
| Trường | Kiểu | Ghi chú |
|---|---|---|
| Id | Int | Khóa chính, tự tăng |
| UserId | Int | Khóa ngoại liên kết User |
| Total | Decimal | Tổng tiền đơn hàng |
| CreatedAt | DateTime | Ngày tạo, mặc định now() |

Quan hệ: Một Order thuộc về một User

---

## Prisma Schema (prisma/schema.prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  Id        Int      @id @default(autoincrement())
  Name      String
  Email     String   @unique
  CreatedAt DateTime @default(now())
  Orders    Order[]
}

model Product {
  Id        Int      @id @default(autoincrement())
  Name      String
  Price     Decimal  @db.Decimal(10, 2)
  Stock     Int      @default(0)
  CreatedAt DateTime @default(now())
}

model Order {
  Id        Int      @id @default(autoincrement())
  UserId    Int
  Total     Decimal  @db.Decimal(10, 2)
  CreatedAt DateTime @default(now())
  User      User     @relation(fields: [userId], references: [id])
}
```

---

## Biến môi trường (.env)

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/crudgenbyai"
```

> Thay `postgres`, `password`, `mydb` bằng thông tin PostgreSQL thật của bạn.

---

## Prisma Client Singleton (server/lib/prisma.ts)

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
```

---

## API Routes cần tạo

### Users API
- `GET /api/users` → Lấy toàn bộ danh sách users, sắp xếp theo createdAt mới nhất
- `POST /api/users` → Tạo user mới, validate email không trùng

### Products API
- `GET /api/products` → Lấy toàn bộ danh sách products, sắp xếp theo createdAt mới nhất
- `POST /api/products` → Tạo product mới, validate price > 0

### Orders API
- `GET /api/orders` → Lấy toàn bộ danh sách orders kèm thông tin user (include: { user: true })
- `POST /api/orders` → Tạo order mới, validate userId tồn tại

---

## Các trang cần tạo (Pages)

### Trang chủ - Dashboard (pages/index.vue)
- Hiển thị 3 thẻ thống kê: tổng số User, Product, Order
- Dùng `useAsyncData` để fetch từ 3 API
- Navigation đến từng trang quản lý

### Trang Users (pages/users/index.vue)
- Tiêu đề: "Quản lý Người dùng"
- Bảng hiển thị: ID | Tên | Email | Ngày tạo
- Dùng `useFetch('/api/users')`
- Có form thêm user mới (name, email)

### Trang Products (pages/products/index.vue)
- Tiêu đề: "Quản lý Sản phẩm"
- Bảng hiển thị: ID | Tên sản phẩm | Giá | Tồn kho | Ngày tạo
- Dùng `useFetch('/api/products')`
- Có form thêm product mới (name, price, stock)

### Trang Orders (pages/orders/index.vue)
- Tiêu đề: "Quản lý Đơn hàng"
- Bảng hiển thị: ID | Tên người dùng | Tổng tiền | Ngày tạo
- Dùng `useFetch('/api/orders')`
- Có form thêm order mới (userId, total)

---

## Quy tắc Coding (bắt buộc tuân thủ)

- Dùng `<script setup lang="ts">` cho tất cả component và page
- Không dùng `any` trong TypeScript, định nghĩa đầy đủ interface/type
- Đặt tên component: PascalCase (AppHeader.vue, AppTable.vue)
- Đặt tên page: kebab-case (user-profile.vue)
- Đặt tên composable: camelCase bắt đầu bằng `use` (useUsers.ts)
- Không import thủ công ref, computed, useFetch, useAsyncData (Nuxt auto-import)
- Dùng `useFetch` hoặc `useAsyncData` để fetch dữ liệu, không dùng axios
- Dùng `<NuxtLink>` thay vì `<a>` cho internal links
- Server API dùng `defineEventHandler` và `prisma` từ `~/server/lib/prisma`

---

## TypeScript Interfaces cần định nghĩa

```typescript
interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

interface Product {
  id: number
  name: string
  price: number
  stock: number
  createdAt: string
}

interface Order {
  id: number
  userId: number
  total: number
  createdAt: string
  user: User
}
```

---

## Lệnh chạy sau khi Cline tạo xong

```bash
# 1. Cài dependencies
npm install

# 2. Cài Prisma
npm install prisma @prisma/client

# 3. Khởi tạo Prisma (nếu chưa có thư mục prisma/)
npx prisma init

# 4. Tạo Prisma client từ schema
npx prisma generate

# 5. Đẩy schema lên PostgreSQL
npx prisma db push

# 6. (Tuỳ chọn) Xem database qua giao diện
npx prisma studio

# 7. Chạy development server
npm run dev
```

---

## Câu lệnh gõ vào Cline để bắt đầu

```
@requirements.md Đọc toàn bộ file này.
Hãy tạo project Nuxt 4 theo đúng yêu cầu:
- Tạo đầy đủ cấu trúc thư mục
- Tạo prisma/schema.prisma với 3 bảng User, Product, Order
- Tạo server/lib/prisma.ts
- Tạo 6 API routes (GET + POST cho mỗi bảng)
- Tạo 4 trang: index, users, products, orders
- Tạo các component: AppHeader, AppFooter, AppNavbar, AppTable
- Tạo layouts/default.vue
- Tạo file .env.example
- Tuân thủ nghiêm ngặt quy tắc TypeScript strict, không dùng any
```