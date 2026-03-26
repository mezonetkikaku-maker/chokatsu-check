import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <span className="eyebrow">CHOKATSU CHECK</span>
        <h1 className="title">腸活チェック</h1>
        <p className="lead">
          いくつかの質問に答えるだけで、
          今の気分や生活傾向に合わせたおすすめ入浴体験をご案内します。
        </p>
        <div className="card">
          <p className="note">
            ※本コンテンツは医療診断ではありません。
            日々の気分や生活傾向にあわせた入浴の参考としてご利用ください。
          </p>
          <div className="actions">
            <Link href="/check" className="button">
              チェックをはじめる
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
