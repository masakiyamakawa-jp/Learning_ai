// src/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        if (!userId.trim() || !password.trim()) {
            setErr("ID と パスワードを入力してください。");
            return;
        }
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/auth`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userId, password }),
            });

            if (!res.ok) {
                const detail = await res.json().catch(() => ({}));
                throw new Error(detail?.detail || `HTTP ${res.status}`);
            }

            // 成功。超簡易トークン（実運用ではJWTなどを使う）
            localStorage.setItem("auth_ok", "1");
            navigate("/", { replace: true });
        } catch (e) {
            setErr(e.message || "ログインに失敗しました。");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={styles.wrap}>
            <h1 style={styles.title}>ログイン</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    ユーザーID
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        style={styles.input}
                        placeholder="例）user1"
                        autoFocus
                    />
                </label>
                <label style={styles.label}>
                    パスワード
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        placeholder="パスワード"
                    />
                </label>
                {err && <div style={styles.error}>{err}</div>}
                <div style={styles.actions}>
                    <button type="submit" disabled={loading} style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}>
                        {loading ? "送信中..." : "ログイン"}
                    </button>
                </div>
            </form>
            <div style={{ marginTop: 12, fontSize: 13, color: "#64748b" }}>
                サンプル認証：<code>user1 / pass1</code>（バックエンドに定義）
            </div>
        </main>
    );
}

const styles = {
    wrap: { maxWidth: 520, margin: "40px auto", padding: 24, fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,"Noto Sans JP","Hiragino Kaku Gothic ProN","Yu Gothic UI","Yu Gothic",Meiryo,sans-serif' },
    title: { fontSize: 26, marginBottom: 12 },
    form: { display: "grid", gap: 14, padding: 16, border: "1px solid #e5e7eb", borderRadius: 12, background: "#fff" },
    label: { display: "grid", gap: 8, fontSize: 14 },
    input: { padding: "10px 12px", borderRadius: 10, border: "1px solid #cbd5e1", outline: "none" },
    actions: { display: "flex", gap: 10 },
    button: { padding: "10px 16px", borderRadius: 10, border: "1px solid transparent", background: "#0ea5e9", color: "white", cursor: "pointer", fontWeight: 600 },
    error: { color: "#e11d48", fontSize: 13 },
};

export default Login;
