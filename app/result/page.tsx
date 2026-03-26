import Link from "next/link";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

const resultMaster = {
  circulation: {
    title: "めぐりケアタイプ",
    description:
      "内側からすっきり整えたい方に向いた入浴プランです。炭酸泉や軽めのサウナを組み合わせるのがおすすめです。",
    plan: [
      "炭酸泉 10分",
      "サウナ 6〜8分",
      "水風呂は短めに",
      "外気浴または休憩 5〜10分",
    ],
  },
  warming: {
    title: "冷え対策タイプ",
    description:
      "まずはしっかり身体を温めたい方に向いた入浴プランです。穏やかに温度を重ねる流れがおすすめです。",
    plan: [
      "ぬる湯または下湯 5分",
      "主浴槽 8〜10分",
      "休憩をはさみながら2セット",
      "湯上がり後は身体を冷やしすぎない",
    ],
  },
  relax: {
    title: "リラックスタイプ",
    description:
      "疲れや緊張をやわらげたい方に向いた入浴プランです。ぬるめのお湯と長めの休憩がおすすめです。",
    plan: [
      "ぬる湯 10分",
      "深呼吸しながらゆったり入浴",
      "短時間サウナ 5〜6分",
      "休憩長めで無理をしない",
    ],
  },
  sweat: {
    title: "発汗すっきりタイプ",
    description:
      "すっきり感や気分転換を重視したい方に向いた入浴プランです。無理のない範囲で発汗を楽しみます。",
    plan: [
      "下湯 3分",
      "サウナ 8〜10分",
      "水風呂は無理なく短め",
      "外気浴でクールダウン",
    ],
  },
} as const;

function diagnose(answers: Record<string, number>) {
  const score = {
    circulation: 0,
    warming: 0,
    relax: 0,
    sweat: 0,
  };

  score.warming += answers.cold ?? 0;
  score.circulation += (answers.bowel ?? 0) + (answers.diet ?? 0);
  score.relax += (answers.stress ?? 0) + (answers.sleep ?? 0);
  score.sweat += answers.refresh ?? 0;

  return Object.entries(score).sort((a, b) => b[1] - a[1])[0][0] as keyof typeof score;
}

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const getNumber = (value: string | string[] | undefined) => {
    if (Array.isArray(value)) return Number(value[0] ?? 0);
    return Number(value ?? 0);
  };

  const answers = {
    cold: getNumber(params.cold),
    bowel: getNumber(params.bowel),
    stress: getNumber(params.stress),
    sleep: getNumber(params.sleep),
    diet: getNumber(params.diet),
    refresh: getNumber(params.refresh),
  };

  const key = diagnose(answers);
  const result = resultMaster[key];

  return (
    <main className="container">
      <section className="hero">
        <span className="eyebrow">RESULT</span>
        <h1 className="resultTitle">{result.title}</h1>
        <p className="resultDescription">{result.description}</p>
      </section>

      <section className="card">
        <h2 className="sectionTitle">おすすめ入浴プラン</h2>
        <ul className="planList">
          {result.plan.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="actions">
          <Link href="/check" className="button">
            もう一度チェックする
          </Link>
          <Link href="/" className="button">
            トップへ戻る
          </Link>
        </div>
      </section>
    </main>
  );
}
