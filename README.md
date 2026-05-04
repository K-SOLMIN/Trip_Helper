# 폰가이즈 (PhoneGuides)

AI 여행 가이드 서비스입니다. 항공권 검색/예약, 좌석 선택, eSIM 구매, 숙소 검색/가예약, 투어 및 액티비티 검색을 하나의 흐름으로 제공합니다.

## 주요 API

### Duffel API

항공권 검색, 오퍼 조회, 주문 생성, 좌석맵 조회에 사용합니다.

1. https://app.duffel.com 에서 계정을 생성합니다.
2. Settings > API Keys > Create test key로 테스트 키를 발급합니다.
3. `backend/.env`의 `DUFFEL_ACCESS_TOKEN`에 입력합니다.

### Hotelbeds API

숙소 검색, 숙소 상세 정보 조회, 예약 가능 여부 확인에 사용합니다.

### Google Maps / Places API

투어 검색, 장소 상세 정보, 지도 임베드 URL 생성에 사용합니다.

### Email SMTP

항공권/eSIM/숙소 예약 확인 메일 발송에 사용합니다. 필요하지 않으면 이메일 관련 환경변수를 비워도 서버는 실행됩니다.

## 환경변수

백엔드:

```bash
cd backend
cp .env.example .env
```

프론트엔드:

```bash
cd frontend
cp .env.example .env
```

로컬 개발에서는 `frontend/.env`의 `VITE_API_BASE`를 비워두면 Vite dev server가 `/api` 요청을 `http://localhost:3001`로 프록시합니다.

배포 시에는 다음처럼 실제 주소를 넣습니다.

```env
# frontend/.env
VITE_API_BASE=https://your-backend.example.com

# backend/.env
BACKEND_URL=https://your-backend.example.com
FRONTEND_URL=https://your-frontend.example.com
```

`VITE_API_BASE`에는 `/api`를 붙이지 않습니다. 프론트 코드가 자동으로 `/api`를 붙입니다.

## 설치

```bash
cd backend
npm install

cd ../frontend
npm install
```

## 실행

터미널 1:

```bash
cd backend
npm run dev
```

터미널 2:

```bash
cd frontend
npm run dev
```

| 서비스 | 주소 |
| --- | --- |
| 프론트엔드 | http://localhost:5173 |
| 백엔드 API | http://localhost:3001 |
| Swagger UI | http://localhost:3001/api-docs |

## 프로젝트 구조

```text
air/
  backend/
    config/
    controllers/
    data/
    middlewares/
    routes/
    services/
    index.js
  frontend/
    src/
      api/
      components/
      data/
      hooks/
      pages/
      store/
      styles/
      utils/
      App.jsx
```

## 주요 기능

| 기능 | 설명 |
| --- | --- |
| 항공권 검색 | 출발지, 도착지, 날짜, 승객 수 기반 실시간 항공권 검색 |
| 좌석 선택 | Duffel 좌석맵 조회 및 유료/무료 좌석 선택 |
| 예약 생성 | 승객 정보 입력 후 테스트 예약 생성 및 확인 메일 발송 |
| eSIM 구매 | 국가, 기간, 데이터 플랜 선택 후 활성화 코드 발급 |
| 숙소 검색 | 국가, 체크인/체크아웃, 인원 기반 숙소 검색 |
| 투어 검색 | Google Places 기반 투어/액티비티 검색 및 상세 조회 |

## 배포 순서

1. AWS에 백엔드를 먼저 배포합니다.
2. 백엔드 URL을 확인합니다.
3. Vercel 프론트엔드 환경변수 `VITE_API_BASE`에 백엔드 URL을 입력합니다.
4. Vercel에 프론트엔드를 배포합니다.
5. 프론트엔드 URL을 백엔드 `FRONTEND_URL`에 입력한 뒤 백엔드를 재시작합니다.
