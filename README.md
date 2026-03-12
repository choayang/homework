# 한국 공공도서관 현황 대시보드

한국 공공데이터를 활용한 공공도서관 현황 대시보드 웹 서비스입니다.

## 기능

- 🔐 Google OAuth 로그인
- 👥 허용 사용자만 접근 (Turso DB)
- 📊 총 시설 수 카드
- 📈 지역별 시설 수 차트 (Recharts)
- 🔍 지역/유형 필터
- 📋 도서관 데이터 테이블

## 기술 스택

- Next.js 16 + TypeScript + Tailwind CSS
- NextAuth (Google OAuth)
- Turso (Prisma + libSQL)
- Recharts

## 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example`을 복사하여 `.env.local` 생성 후 값을 채우세요.

```bash
cp .env.example .env.local
```

필수 변수:
- `DATABASE_URL` - 로컬 개발 시 `file:./prisma/dev.db`
- `AUTH_SECRET` - `openssl rand -base64 32`로 생성
- `AUTH_GOOGLE_ID` - Google Cloud Console Client ID
- `AUTH_GOOGLE_SECRET` - Google Cloud Console Client Secret

### 3. 데이터베이스 설정

**로컬 (SQLite):**
```bash
npm run db:push
npm run db:seed
```

**Turso (배포용):**
- [Turso](https://turso.tech)에서 DB 생성
- `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` 설정
- `scripts/apply-turso-schema.sh` 로 스키마 적용
- `npm run db:seed` 로 kts123@kookmin.ac.kr 추가

### 4. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 접속

## 배포 방법 (Vercel)

1. GitHub 저장소에 코드 push
2. [Vercel](https://vercel.com)에서 저장소 연결
3. 환경 변수 설정:
   - `AUTH_SECRET`
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
4. 배포 (push 시 자동 배포)

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 |
| `npm run db:push` | 스키마 적용 |
| `npm run db:seed` | 허용 사용자 시드 (kts123@kookmin.ac.kr) |
| `npm run db:studio` | Prisma Studio |

## 상세 문서

- [PROJECT.md](./PROJECT.md) - 프로젝트 소개 및 주요 구현 내용
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - 배포 체크리스트
