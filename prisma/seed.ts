import "dotenv/config";
import { db } from "../src/lib/db";

async function main() {
  const requiredEmail = "kts123@kookmin.ac.kr";

  const existing = await db.allowedUser.findUnique({
    where: { email: requiredEmail },
  });

  if (!existing) {
    await db.allowedUser.create({
      data: { email: requiredEmail },
    });
    console.log(`✅ 허용 사용자 추가됨: ${requiredEmail}`);
  } else {
    console.log(`ℹ️ 이미 존재함: ${requiredEmail}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
