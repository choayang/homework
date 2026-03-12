# 배포 직전 점검 체크리스트

## 1. 환경 변수

- [ ] `AUTH_SECRET` - 32자 이상 랜덤 문자열
- [ ] `AUTH_GOOGLE_ID` - Google OAuth Client ID
- [ ] `AUTH_GOOGLE_SECRET` - Google OAuth Client Secret
- [ ] `TURSO_DATABASE_URL` - Turso DB URL (libsql://...)
- [ ] `TURSO_AUTH_TOKEN` - Turso 인증 토큰

## 2. Google Cloud Console

- [ ] Google Cloud 프로젝트 생성
- [ ] OAuth 2.0 사용자 인증 정보에서 웹 애플리케이션 생성
- [ ] 승인된 리디렉션 URI: `https://<your-domain>/api/auth/callback/google`
- [ ] 승인된 JavaScript 원본: `https://<your-domain>`

## 3. Turso 설정

- [ ] Turso DB 생성: `turso db create <db-name>`
- [ ] DB URL 확인: `turso db show <db-name>`
- [ ] 인증 토큰 생성: `turso db tokens create <db-name>`
- [ ] 스키마 적용: `./scripts/apply-turso-schema.sh <db-name>`
- [ ] 시드 실행: `TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... npm run db:seed`

## 4. GitHub & Vercel

- [ ] 코드가 GitHub 저장소에 push됨
- [ ] Vercel 프로젝트가 해당 저장소와 연결됨
- [ ] main(또는 기본 브랜치) push 시 자동 배포 설정됨

## 5. 빌드 및 기능

- [ ] 로컬 `npm run build` 성공
- [ ] 로그인 페이지 접근 가능
- [ ] Google 로그인 정상 동작
- [ ] 허용 사용자(kts123@kookmin.ac.kr)로 대시보드 접근 가능
- [ ] 비허용 사용자 접근 불가 페이지 표시 확인

## 6. 보안

- [ ] `.env` 파일이 .gitignore에 포함되어 있으며 커밋되지 않음
- [ ] 프로덕션 환경 변수가 Vercel 대시보드에서만 설정됨
