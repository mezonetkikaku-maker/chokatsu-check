import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <div className="heroPanel">
          <span className="eyebrow">CHOKATSU CHECK</span>
          <h1 className="title">
            今日の気分と
            <br />
            からだに合う入浴体験をチェック
          </h1>
          <p className="lead">
            いくつかの質問に答えるだけで、今の生活傾向や気分に合わせた
            おすすめ入浴プランをご案内します。温まりたい日、ゆっくり休みたい日、
            すっきりしたい日など、その日の自分に合う過ごし方を見つけるための
            参考としてご利用ください。
          </p>

          <div className="infoBlock">
            <p className="note">
              ※本コンテンツは医療診断ではありません。
              日々の気分や生活傾向にあわせた、入浴の楽しみ方の提案です。
            </p>

            <div className="buttonRow">
              <Link href="/check" className="button">
                チェックをはじめる
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
