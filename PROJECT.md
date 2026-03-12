# 한국 공공도서관 현황 대시보드

## 프로젝트 소개

본 프로젝트는 **한국 공공데이터를 활용한 대시보드 웹 서비스**로, 한국 전역의 공공도서관 현황을 한눈에 조회할 수 있는 관리자형 대시보드입니다.

### 주요 목표

- 한국 공공도서관 데이터를 시각화하여 제공
- 허용된 사용자만 접근 가능한 보안된 대시보드
- Google OAuth 기반 간편 로그인
- Turso 데이터베이스를 활용한 허용 사용자 관리

---

## 주요 구현 내용

### 1. 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| 인증 | NextAuth.js v5 (Auth.js) + Google OAuth |
| 데이터베이스 | Turso (libSQL) / SQLite (로컬 개발) |
| ORM | Prisma |
| 차트 | Recharts |

### 2. 인증 및 접근 제어

- **Google OAuth**: 사용자가 Google 계정으로 로그인
- **허용 사용자 목록**: Turso DB의 `allowed_users` 테이블에 저장
- **접근 제어 흐름**:
  1. 미로그인 → 로그인 페이지로 리다이렉트
  2. 로그인 후 허용 목록에 없음 → 접근 불가 페이지
  3. 허용 사용자 → 대시보드 접근 가능

### 3. 대시보드 기능

- **총 시설 수 카드**: 전체/필터 적용 시 시설 개수 표시
- **지역별 시설 수 차트**: Recharts BarChart로 지역별 분포 시각화
- **필터 기능**: 지역(시도), 시설 유형(국립/공공) 필터링
- **데이터 테이블**: 도서관 목록 (이름, 지역, 유형, 주소)

### 4. 데이터

- **데이터 소스**: JSON 정적 데이터 (`src/data/libraries.json`)
- **구조**: 35개 시설, 지역(서울/부산/대구/인천/광주/대전/울산/세종/경기/강원/충북/충남/전북/전남/경북/경남/제주), 유형(국립/공공)
- **확장**: 실시간 API 연결 시 해당 모듈만 교체 가능

### 5. 배포

- **플랫폼**: Vercel
- **CI/CD**: GitHub 저장소 push 시 자동 배포
- **환경 변수**: Vercel 대시보드에서 AUTH_*, TURSO_* 등 설정

---

## 프로젝트 구조

```
src/
├── app/
│   ├── api/auth/[...nextauth]/   # NextAuth API
│   ├── dashboard/                # 대시보드 (보호된 라우트)
│   ├── login/                    # 로그인 페이지
│   ├── denied/                   # 접근 불가 페이지
│   └── layout.tsx, page.tsx
├── components/
│   ├── dashboard-client.tsx      # 대시보드 클라이언트 컴포넌트
│   └── protected-layout.tsx      # 허용 사용자 검증 레이아웃
├── data/
│   └── libraries.json            # 공공도서관 정적 데이터
├── lib/
│   ├── auth.ts                   # NextAuth 설정
│   ├── db.ts                     # Prisma 클라이언트 (Turso/SQLite)
│   ├── allowed-users.ts          # 허용 사용자 검증
│   └── library-data.ts           # 도서관 데이터 유틸
└── middleware.ts                 # 인증 미들웨어
```

---

## 필수 허용 사용자

- `kts123@kookmin.ac.kr` 계정은 seed 스크립트를 통해 자동으로 `allowed_users` 테이블에 추가됩니다.
