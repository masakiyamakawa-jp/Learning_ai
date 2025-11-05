// src/Home.js
import { useState } from "react";
function Home() {
    const [name, setName] = useState("");
    const [topic, setTopic] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ name: "", topic: "" });

    // add_line: 1
    const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

    const validate = () => {
        const next = { name: "", topic: "" };
        if (!name.trim()) next.name = "名前を入力してください。";
        if (!topic.trim()) next.topic = "相談内容を入力してください。";
        setErrors(next);
        return !next.name && !next.topic;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setResult("");

        // add_line***start
        try {
            // 例：GET /question にアクセス（必要ならクエリを付与）
            const url = new URL(`${API_BASE}/question`);
            url.searchParams.set("name", name);
            url.searchParams.set("topic", topic);

            const res = await fetch(url.toString(), {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();
            // バックエンドは { "message": "Hello World!!" } を返す想定
            const message =
                `【API 実行結果】\n` +
                `お名前：${name}\n` +
                `ご相談：${topic}\n\n` +
                `■ サーバからのメッセージ\n` +
                `${data?.message ?? "(message フィールドなし)"}`;

            setResult(message);
        } catch (err) {
            setResult(
                `【エラー】サーバーへのリクエストに失敗しました。\n` +
                `詳細: ${err?.message ?? err}`
            );
        } finally {
            setLoading(false);
        }
    };
    // add_line***fine

    const handleReset = () => {
        setName("");
        setTopic("");
        setResult("");
        setErrors({ name: "", topic: "" });
    };

    // 以降の JSX は既存を流用（省略可）。submit ボタンや表示はそのままです。
    return (
        <main style={styles.wrap}>
            <h1 style={styles.title}>相談フォーム</h1>

            <form onSubmit={handleSubmit} style={styles.form}>
                {/* 名前フォーム */}
                <label style={styles.label}>
                    名前
                    <input
                        type="text"
                        placeholder="例）山田太郎"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            ...styles.input,
                            borderColor: errors.name ? "#e11d48" : "#cbd5e1",
                        }}
                    />
                    {errors.name && <span style={styles.error}>{errors.name}</span>}
                </label>

                {/* 相談内容フォーム */}
                <label style={styles.label}>
                    相談したいこと
                    <textarea
                        placeholder="困っている点・背景・期限など、わかる範囲で具体的に書いてください。"
                        rows={6}
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        style={{
                            ...styles.textarea,
                            borderColor: errors.topic ? "#e11d48" : "#cbd5e1",
                        }}
                    />
                    {errors.topic && <span style={styles.error}>{errors.topic}</span>}
                </label>

                {/* 実行ボタン */}
                <div style={styles.actions}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}
                    >
                        {loading ? "実行中..." : "実行"}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        style={{ ...styles.button, background: "#e2e8f0", color: "#0f172a" }}
                    >
                        クリア
                    </button>
                </div>
            </form>

            {/* 結果表示フォーム（読み取り専用） */}
            <section style={styles.resultBox}>
                <h2 style={styles.subtitle}>結果</h2>
                <textarea
                    readOnly
                    rows={10}
                    value={result}
                    placeholder="ここに結果が表示されます。"
                    style={styles.output}
                />
            </section>
        </main>
    );
}

const styles = {
    wrap: {
        maxWidth: 760,
        margin: "40px auto",
        padding: 24,
        fontFamily:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,"Noto Sans JP","Hiragino Kaku Gothic ProN","Yu Gothic UI","Yu Gothic",Meiryo,sans-serif',
    },
    title: { fontSize: 26, marginBottom: 12 },
    subtitle: { fontSize: 18, margin: "8px 0" },
    form: {
        display: "grid",
        gap: 14,
        padding: 16,
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        background: "#fff",
    },
    label: { display: "grid", gap: 8, fontSize: 14 },
    input: {
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #cbd5e1",
        outline: "none",
    },
    textarea: {
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #cbd5e1",
        outline: "none",
        resize: "vertical",
    },
    actions: { display: "flex", gap: 10 },
    button: {
        padding: "10px 16px",
        borderRadius: 10,
        border: "1px solid transparent",
        background: "#0ea5e9",
        color: "white",
        cursor: "pointer",
        fontWeight: 600,
    },
    resultBox: {
        marginTop: 18,
        padding: 16,
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        background: "#fafafa",
    },
    output: {
        width: "100%",
        padding: 12,
        borderRadius: 10,
        border: "1px solid #cbd5e1",
        background: "#f8fafc",
        whiteSpace: "pre-wrap",
    },
    error: { color: "#e11d48", fontSize: 12 },
};


export default Home;