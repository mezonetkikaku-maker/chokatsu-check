"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  { id: "cold", text: "最近、冷えを感じやすい" },
  { id: "bowel", text: "便通が不安定だと感じる" },
  { id: "stress", text: "ストレスや疲れがたまりやすい" },
  { id: "sleep", text: "睡眠の質が気になる" },
  { id: "diet", text: "食生活が乱れがち" },
  { id: "refresh", text: "身体をすっきりさせたい気分が強い" },
] as const;

const choices = [
  { label: "あてはまる", value: 4 },
  { label: "ややあてはまる", value: 3 },
  { label: "どちらでもない", value: 2 },
  { label: "あまりあてはまらない", value: 1 },
  { label: "あてはまらない", value: 0 },
] as const;

export default function CheckPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleChange = (id: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const params = new URLSearchParams();
    Object.entries(answers).forEach(([key, value]) => {
      params.set(key, String(value));
    });
    router.push(`/result?${params.toString()}`);
  };

  const completed = questions.every((q) => answers[q.id] !== undefined);

  return (
    <main className="container">
      <section className="hero">
        <span className="eyebrow">QUESTION</span>
        <h1 className="title">あなたの今に合う入浴体験をチェック</h1>
        <p className="lead">
          すべての質問にお答えください。回答内容から、おすすめの過ごし方をご提案します。
        </p>
      </section>

      {questions.map((q, index) => (
        <section key={q.id} className="questionCard">
          <h2 className="questionTitle">
            Q{index + 1}. {q.text}
          </h2>
          <div className="choiceGroup">
            {choices.map((choice) => (
              <label key={choice.value} className="choiceLabel">
                <input
                  type="radio"
                  name={q.id}
                  value={choice.value}
                  checked={answers[q.id] === choice.value}
                  onChange={() => handleChange(q.id, choice.value)}
                />
                {choice.label}
              </label>
            ))}
          </div>
        </section>
      ))}

      <div className="actions">
        <button className="button" onClick={handleSubmit} disabled={!completed}>
          結果を見る
        </button>
      </div>
    </main>
  );
}
