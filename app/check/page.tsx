"use client";

import { useMemo, useState } from "react";
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

  const completedCount = useMemo(function () {
    return questions.filter(function (q) {
      return answers[q.id] !== undefined;
    }).length;
  }, [answers]);

  const progress = Math.round((completedCount / questions.length) * 100);
  const completed = completedCount === questions.length;

  function handleChange(id: string, value: number) {
    setAnswers(function (prev) {
      return {
        ...prev,
        [id]: value,
      };
    });
  }

  function handleSubmit() {
    const params = new URLSearchParams();

    Object.entries(answers).forEach(function ([key, value]) {
      params.set(key, String(value));
    });

    router.push("/result?" + params.toString());
  }

  return (
    <main className="container">
      <header className="pageHeader">
        <span className="eyebrow">QUESTION</span>
        <h1 className="pageTitle">あなたの今に合う入浴体験をチェック</h1>
        <p className="pageLead">
          すべての質問にお答えください。回答内容をもとに、
          今の気分や生活傾向に合わせたおすすめの入浴プランをご提案します。
        </p>
      </header>

      <section className="progressWrap" aria-label="進捗">
        <div className="progressMeta">
          <span>回答状況</span>
          <span>
            {completedCount} / {questions.length}
          </span>
        </div>
        <div className="progressBar" aria-hidden="true">
          <span style={{ width: progress + "%" }}></span>
        </div>
      </section>

      {questions.map(function (q, index) {
        return (
          <section key={q.id} className="questionCard">
            <span className="questionIndex">QUESTION {index + 1}</span>
            <h2 className="questionTitle">{q.text}</h2>

            <div className="choiceGroup">
              {choices.map(function (choice) {
                return (
                  <label key={choice.value} className="choiceLabel">
                    <input
                      className="choiceInput"
                      type="radio"
                      name={q.id}
                      value={choice.value}
                      checked={answers[q.id] === choice.value}
                      onChange={function () {
                        handleChange(q.id, choice.value);
                      }}
                    />
                    <span className="choiceBox">
                      <span className="choiceDot"></span>
                      <span className="choiceText">{choice.label}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>
        );
      })}

      <div className="stickyAction">
        <div className="stickyActionInner">
          <div className="stickyMeta">
            {completed
              ? "すべての回答が完了しました。結果ページへ進めます。"
              : "すべての質問に回答すると、結果を確認できます。"}
          </div>

          <button
            type="button"
            className="button"
            onClick={handleSubmit}
            disabled={!completed}
          >
            結果を見る
          </button>
        </div>
      </div>
    </main>
  );
}
