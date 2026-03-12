#!/bin/bash
# Turso 데이터베이스에 Prisma 스키마 적용
# 사용법: ./scripts/apply-turso-schema.sh <turso-db-name>

set -e
DB_NAME=${1:?"Turso DB 이름을 입력하세요. 예: your-db-name"}

echo "스키마 생성 중..."
npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel prisma/schema.prisma \
  --script > /tmp/turso-schema.sql

echo "Turso DB ($DB_NAME) 에 스키마 적용 중..."
turso db shell "$DB_NAME" < /tmp/turso-schema.sql

echo "✅ 완료"
