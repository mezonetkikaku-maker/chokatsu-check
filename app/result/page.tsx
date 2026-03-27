import Link from "next/link";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

const resultMaster = {
  circulation: {
    label: "BALANCE CARE",
    title: "めぐりケアタイプ",
    description:
      "内側からすっきり整えたい方に向いた入浴プランです。天然温泉や軽めのサウナを組み合わせながら、無理なく巡りを意識した過ごし方がおすすめです。",
    plan: [
      "天然温泉にゆっくり 10分",
      "サウナ 6〜8分",
      "水風呂は短めに軽く",
      "外気浴または休憩 5〜10分",
    ],
    caution:
      "体調に不安がある場合は無理をせず、長時間の高温浴は避けてください。",
    point:
      "温まりすぎず、冷やしすぎず、穏やかに流れを整えるイメージで過ごすのがおすすめです。",
  },
  warming: {
    label: "WARMING CARE",
    title: "冷え対策タイプ",
    description:
      "まずはしっかり身体を温めたい方に向いた入浴プランです。急な温冷差よりも、穏やかに温度を重ねていく流れがおすすめです。",
    plan: [
      "週替わり湯で 5分",
      "主浴槽で 8〜10分",
      "休憩をはさみながら2セット",
      "湯上がり後は身体を冷やしすぎない",
    ],
    caution:
      "のぼせやすい方は短めの入浴で調整し、水分補給を意識してください。",
    point:
      "まずはじんわり温まることを優先して、刺激の強い入り方は避けるのが向いています。",
  },
  relax: {
    label: "RELAX CARE",
    title: "リラックスタイプ",
    description:
      "疲れや緊張をやわらげたい方に向いた入浴プランです。ぬるめのお湯と長めの休憩を中心に、ゆるやかに整える流れがおすすめです。",
    plan: [
      "週替わり湯でゆっくり 5分",
      "深呼吸しながら入浴",
      "短時間サウナ 5〜6分",
      "水風呂は短めに軽く",
      "休憩は長めにとる",
    ],
    caution:
      "眠気や強い疲れがある日は、サウナなしで温浴中心にするのもおすすめです。",
    point:
      "すっきり感よりも、力を抜いてゆるめることを重視した入り方が合っています。",
  },
  sweat: {
    label: "REFRESH CARE",
    title: "発汗すっきりタイプ",
    description:
      "すっきり感や気分転換を重視したい方に向いた入浴プランです。短めの下湯から入り、無理のない範囲で発汗を楽しむ流れがおすすめです。",
    plan: [
      "下湯で軽く温める 3分",
      "サウナ 8〜10分",
      "水風呂は無理なく短め",
      "外気浴でクールダウン",
    ],
    caution:
      "発汗量が増えやすいため、入浴前後の水分補給を忘れないようにしてください。",
    point:
      "しゃきっと切り替えたい日に向いたタイプです。無理のない範囲でテンポよく過ごすのがポイントです。",
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

  score.relax += Math.floor((answers.stress ?? 0) / 2);
  score.warming += Math.floor((answers.cold ?? 0) / 2);
  score.circulation += Math.floor((answers.bowel ?? 0) / 2);

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
        <div className="heroPanel">
          <span className="resultBadge">{result.label}</span>
          <h1 className="resultTitle">{result.title}</h1>
          <p className="resultDescription">{result.description}</p>
        </div>
      </section>

      <section className="resultGrid">
        <div className="card">
          <h2 className="resultSectionTitle">おすすめ入浴プラン</h2>
          <ul className="planList">
            {result.plan.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="softPanel">
          <h2 className="resultSectionTitle">このタイプの過ごし方</h2>
          <p className="note">{result.point}</p>

          <h2 className="resultSectionTitle" style={{ marginTop: 20 }}>
            ご利用の目安
          </h2>
          <p className="note">{result.caution}</p>
        </div>
      </section>

      <div className="footerActions">
        <Link href="/check" className="button">
          もう一度チェックする
        </Link>
        <Link href="/" className="button buttonSecondary">
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
