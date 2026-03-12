import Link from "next/link";

export default function DeniedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">접근 불가</h1>
        <p className="mb-6 text-slate-600">
          이 서비스는 허용된 사용자만 이용할 수 있습니다.
          <br />
          관리자에게 접근 권한을 요청하세요.
        </p>
        <Link
          href="/api/auth/signout"
          className="inline-block rounded-lg bg-slate-800 px-6 py-2 font-medium text-white hover:bg-slate-700"
        >
          로그아웃
        </Link>
      </div>
    </div>
  );
}
