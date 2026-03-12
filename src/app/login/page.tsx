"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [authConfig, setAuthConfig] = useState<{ google: boolean; email: boolean } | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/auth/status")
      .then((r) => r.json())
      .then((data) => setAuthConfig({ google: data.google, email: data.email }))
      .catch(() => setAuthConfig({ google: false, email: false }));
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: false,
    });
    if (result?.error) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다. 허용된 사용자만 로그인할 수 있습니다.");
    } else if (result?.url) {
      window.location.href = result.url;
    }
  };

  const hasAnyLogin = authConfig && (authConfig.google || authConfig.email);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-800">
          한국 공공도서관 현황 대시보드
        </h1>
        <p className="mb-6 text-center text-slate-600">
          {authConfig?.email ? "이메일과 비밀번호로 로그인하세요." : "Google 계정으로 로그인하여 접속하세요."}
        </p>

        {authConfig?.email && (
          <form onSubmit={handleEmailLogin} className="mb-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-800"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-slate-800 px-4 py-3 font-medium text-white hover:bg-slate-700"
            >
              로그인
            </button>
          </form>
        )}

        {authConfig?.email && authConfig?.google && (
          <div className="mb-6 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
            또는
          </div>
        )}

        {authConfig?.google && (
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google로 로그인
          </button>
        )}

        {!hasAnyLogin && authConfig && (
          <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
            <p className="font-semibold">⚠️ 로그인을 설정해 주세요.</p>
            <p className="mt-2">
              <strong>간편한 방법 (Google 콘솔 불필요):</strong> .env에 추가:
            </p>
            <pre className="mt-2 overflow-x-auto rounded bg-slate-100 p-2 text-xs">
              DEMO_PASSWORD=원하는비밀번호
            </pre>
            <p className="mt-2">
              그 후 허용된 이메일 + 위 비밀번호로 로그인 가능합니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">로딩 중...</div>}>
      <LoginContent />
    </Suspense>
  );
}
