# Quy ước Git cho dự án PlotFarm (Nhóm 10 - SU26SWP08)

Tài liệu này áp dụng cho cả 2 repo: `plotfarm-fe` và `plotfarm-be`.
Mục tiêu: cả nhóm code theo cùng 1 kiểu, dễ theo dõi, dễ review, tránh xung đột code.

---

## 1. Cấu trúc nhánh (Branch)

| Nhánh | Vai trò |
|---|---|
| `main` | Code ổn định, chỉ merge vào khi đã test kỹ — dùng để deploy/nộp bài |
| `dev` | Nhánh tích hợp chung — tất cả các nhánh feature merge về đây trước |
| `feature/<ten-tinh-nang>-<ten-thanh-vien>` | Nhánh code riêng cho từng task |

**Quy tắc đặt tên nhánh feature:**
- Toàn bộ chữ thường, cách nhau bằng dấu gạch ngang `-`
- Đúng cấu trúc: `feature/<ten-tinh-nang>-<ten-thanh-vien>`

Ví dụ:
```
feature/setup-du
feature/login-register-du
feature/farm-listing-quang
feature/rental-api-phat
feature/monitoring-api-hoang
```

Nếu là sửa lỗi (không phải tính năng mới), dùng tiền tố `fix/`:
```
fix/login-validate-error-du
```

---

## 2. Quy ước commit message

**Cấu trúc:**
```
<loai>: <mo ta ngan gon, khong dau, ro rang>
```

**Các loại (type) thường dùng:**

| Loại | Khi nào dùng |
|---|---|
| `feat` | Thêm tính năng mới |
| `fix` | Sửa lỗi |
| `style` | Chỉnh giao diện/CSS, không đổi logic |
| `refactor` | Sửa lại code cho gọn hơn, không đổi tính năng |
| `docs` | Sửa README, comment, tài liệu |
| `chore` | Việc lặt vặt: cài package, sửa config, dọn file |

**Ví dụ commit message tốt:**
```
feat: them form dang nhap va dang ky
fix: sua loi validate email khong dung dinh dang
style: chinh lai spacing trang chu
chore: cai axios va cau hinh interceptor
refactor: tach component Button dung chung
```

**Tránh commit message kiểu:**
```
update
sua loi
abc
asdasd
```

---

## 3. Quy trình làm việc (Workflow)

1. **Trước khi bắt đầu code**, luôn lấy code mới nhất từ `dev`:
   ```
   git checkout dev
   git pull origin dev
   ```

2. **Tạo nhánh riêng** cho task đang làm:
   ```
   git checkout -b feature/<ten-tinh-nang>-<ten-thanh-vien>
   ```

3. **Code và commit** theo đúng quy ước ở mục 2. Nên commit nhiều lần nhỏ (mỗi lần 1 việc rõ ràng), không dồn hết vào 1 commit to.

4. **Push nhánh lên GitHub:**
   ```
   git push origin feature/<ten-tinh-nang>-<ten-thanh-vien>
   ```

5. **Tạo Pull Request (PR)** từ nhánh feature về `dev` trên GitHub. Ghi rõ trong PR: task này làm gì, có điểm nào cần lưu ý khi review.

6. **Chờ 1 thành viên khác review** trước khi merge — không tự merge PR của chính mình khi có thể tránh được, để có người soát lại code.

7. Sau khi merge vào `dev` và test ổn, `dev` mới được merge vào `main` (thường làm ở cuối mỗi sprint).

---

## 4. Một số lưu ý khác

- Không commit trực tiếp lên `main` hoặc `dev` — luôn qua nhánh feature + Pull Request.
- Không commit file `node_modules/`, `.env`, file build (`dist/`) — đã có `.gitignore` xử lý, kiểm tra `git status` trước khi `git add .`.
- Nếu 2 người cùng sửa 1 file dễ đụng nhau, nên báo trước trong nhóm để tránh conflict.
- Trước khi tạo PR, nên `git pull origin dev` lại 1 lần để cập nhật code mới nhất, tránh conflict khi merge.
