// src/Home.js
import { useState } from "react";
function Home() {
    const [name, setName] = useState("");
    const [topic, setTopic] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ name: "", topic: "" });

    const validate = () => {
        const next = { name: "", topic: "" };
        if (!name.trim()) next.name = "名前を入力してください。";
        if (!topic.trim()) next.topic = "相談内容を入力してください。";
        setErrors(next);
        return !next.name && !next.topic;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        // 実際のAPI連携がある場合はここで fetch/axios を使用。
        // ここではデモとして即時に結果を生成します。
        const message =
            `【相談を受け付けました】\n` +
            `お名前：${name}\n` +
            `ご相談：${topic}\n\n` +
            `■ 初期アドバイス（例）\n` +
            `1) 事実・課題・理想を分けて整理しましょう。\n` +
            `2) すぐにできる次の一手を1つ決めましょう。\n` +
            `3) 必要なら追加情報（期限・関係者・制約）を教えてください。`;
        setResult(message);
        setLoading(false);
    };

    const handleReset = () => {
        setName("");
        setTopic("");
        setResult("");
        setErrors({ name: "", topic: "" });
    };

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