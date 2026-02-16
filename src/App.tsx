import React, { useMemo, useState } from "react";

type FormState = {
  name: string;
  phone: string;
  plan: string;
  city: string;
  goal: string;
};

const CONTACTS = {
  whatsappPhone: "79622260929", // ← ВСТАВЬ СВОЙ номер (79991234567)
  telegramUsername: "+79622260929", // ← ВСТАВЬ СВОЙ username без @
  instagramUrl: "https://www.instagram.com/valeriamaschenko",
};

const HERO_IMAGE = "/hero.jpg"; // ← если файл иначе называется — поменяй тут

function buildWhatsAppLink(text: string) {
  return `https://wa.me/${CONTACTS.whatsappPhone}?text=${encodeURIComponent(text)}`;
}
function buildTelegramLink() {
  return `https://t.me/${CONTACTS.telegramUsername}`;
}

function clsx(...arr: Array<string | false | undefined>) {
  return arr.filter(Boolean).join(" ");
}

const FEATURES = [
  {
    icon: "💪",
    title: "Персональные онлайн-тренировки",
    text: "План под твой уровень, контроль техники и прогресс без перегруза.",
  },
  {
    icon: "🥗",
    title: "Питание и сопровождение",
    text: "Понятные рекомендации, корректировки и поддержка без жёстких диет.",
  },
  {
    icon: "📈",
    title: "Контроль результата",
    text: "Чек-ины, замеры/фото, корректировка программы — чтобы закрепить результат.",
  },
];

const PRICING = [
  {
    tag: "Старт",
    name: "1 месяц",
    price: "₽ 10000",
    hint: "Подойдёт, чтобы начать",
    items: ["План тренировок", "Чек-ин 1 раз в неделю", "Поддержка в чате"],
  },
  {
    tag: "Популярно",
    name: "3 месяца",
    price: "₽ 25000",
    hint: "Лучше для устойчивого результата",
    items: [
      "Тренировки + прогрессия",
      "Питание + корректировки",
      "Еженедельные чек-ины",
    ],
    hot: true,
  },
  {
    tag: "VIP",
    name: "VIP сопровождение",
    price: "₽ 20000",
    hint: "Максимум внимания",
    items: ["Индивидуально 1:1", "Частые корректировки", "Поддержка почти ежедневно"],
  },
] as const;

const TESTIMONIALS = [
  { title: "«Минус 4 кг за месяц»", meta: "Ольга • сопровождение" },
  { title: "«Перестала срываться»", meta: "Марина • питание" },
  { title: "«Тело подтянулось»", meta: "Алина • тренировки" },
];

const FAQ = [
  {
    q: "Нужно ли оборудование?",
    a: "Нет. Можно тренироваться дома без оборудования. Если есть резинки/гантели — отлично, подстрою программу.",
  },
  {
    q: "Если я новичок — подойдёт?",
    a: "Да. Начинаем с базовых движений и мягкой нагрузки. Я объясню технику и дам понятный план.",
  },
  {
    q: "Как проходит сопровождение?",
    a: "Ты получаешь план, мы делаем регулярные чек-ины, корректировки и поддержку в мессенджере.",
  },
  {
    q: "Сколько времени нужно на тренировки?",
    a: "Обычно 30–50 минут, 3–5 раз в неделю (в зависимости от цели и занятости).",
  },
];

function FAQItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="card" style={{ padding: 16, background: "rgba(255,255,255,.03)", boxShadow: "none" }}>
      <button
        onClick={onToggle}
        className="btn"
        type="button"
        style={{
          width: "100%",
          justifyContent: "space-between",
          background: "transparent",
        }}
      >
        <span style={{ textAlign: "left" }}>{q}</span>
        <span style={{ opacity: 0.85 }}>{open ? "–" : "+"}</span>
      </button>

      {open && (
        <div style={{ marginTop: 10, color: "var(--muted)", lineHeight: 1.6 }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    plan: "",
    city: "Благовещенск",
    goal: "",
  });

  const quickMsg = "Здравствуйте! Хочу записаться на онлайн-тренировки и сопровождение.";

  const pickPlan = (plan: string) => {
    setForm((p) => ({ ...p, plan }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const msg =
      `Заявка с сайта "Тренировки Онлайн"\n` +
      `Имя: ${form.name || "-"}\n` +
      `Телефон: ${form.phone || "-"}\n` +
      `Тариф: ${form.plan || "-"}\n` +
      `Город: ${form.city || "-"}\n` +
      `Цель: ${form.goal || "-"}`;

    window.open(buildWhatsAppLink(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="wrap">
      {/* NAV */}
      <header className="nav card">
        <div className="brand">
          <div className="logo" aria-hidden="true" />
          <div>
            <div style={{ fontSize: 14, opacity: 0.95 }}>Тренировки Онлайн</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>
              Благовещенск • Россия
            </div>
          </div>
        </div>

        <nav className="navlinks">
          <a href="#programs">Программы</a>
          <a href="#results">Результаты</a>
          <a href="#pricing">Цены</a>
          <a href="#faq">FAQ</a>
          <a className="btn btnPrimary" href="#contact">
            Записаться
          </a>
        </nav>
      </header>

      {/* HERO PREMIUM */}
      <section className="card heroWrap fadeIn" style={{ marginTop: 18 }}>
        <div className="heroGrid">
          <div>
            <div className="kicker">🔥 Онлайн-тренировки + сопровождение</div>

            <h1 className="heroTitle">
              Тренируйся дома, получай поддержку и видь результат уже через 4 недели
            </h1>

            <p className="heroSub">
              Индивидуальный план тренировок и питания, контроль техники, мотивация и связь с тренером.
              Подходит новичкам и тем, кто хочет вернуться в форму.
            </p>

            <div className="ctaRow">
              <a className="btn btnPrimary" href="#contact">
                Получить консультацию
              </a>
              <a className="btn" href="#programs">
                Смотреть программы
              </a>
            </div>

            <div className="heroPills">
              <div className="pill">✅ План под тебя</div>
              <div className="pill">✅ Контроль прогресса</div>
              <div className="pill">✅ Поддержка в мессенджере</div>
              <div className="pill">✅ Тренировки без зала</div>
            </div>

            <div className="micro">Работаю онлайн по всей России</div>
          </div>

          <div
            className="heroMedia"
            style={
              {
                ["--hero-url" as any]: `url("${HERO_IMAGE}")`,
              } as React.CSSProperties
            }
          >
            <div className="heroBadge">Персональный тренер • 1:1</div>
            <div className="heroCaption">
              <div className="heroName">Валерия Мащенко</div>
              <div className="heroRole">
                Похудение • Тонус • Привычки • Сопровождение без жёстких диет
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
                <a className="btn btnPrimary" href={buildWhatsAppLink(quickMsg)} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
                <a className="btn" href={buildTelegramLink()} target="_blank" rel="noreferrer">
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="programs" className="grid3">
        {FEATURES.map((f) => (
          <div key={f.title} className="card feat">
            <div className="icon">{f.icon}</div>
            <h4>{f.title}</h4>
            <p>{f.text}</p>
          </div>
        ))}
      </section>

      {/* RESULTS / TESTIMONIALS + BENEFITS */}
      <section id="results" className="split">
        <div className="card" style={{ padding: 18 }}>
          <span className="badge">Результаты</span>
          <h2 style={{ margin: "10px 0 8px", letterSpacing: "-.4px" }}>
            Отзывы и “до/после”
          </h2>
          <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>
            Добавь сюда реальные отзывы и фото результатов клиентов. Сейчас — стильные заглушки.
          </p>

          <div className="grid3" style={{ marginTop: 14 }}>
            {TESTIMONIALS.map((t) => (
              <div
                key={t.title}
                className="card"
                style={{ padding: 14, background: "rgba(255,255,255,.03)", boxShadow: "none" }}
              >
                <b>{t.title}</b>
                <div className="hint">{t.meta}</div>
              </div>
            ))}
          </div>

          <div className="hint" style={{ marginTop: 12 }}>
            *Если хочешь — сделаю галерею “до/после” из твоих фото (просто загрузишь в public).
          </div>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <span className="badge">Что получишь</span>
          <ul>
            <li>Личный план тренировок (дом/зал)</li>
            <li>Техника и рекомендации по упражнениям</li>
            <li>Питание и корректировки</li>
            <li>Чек-ины и поддержка в мессенджере</li>
            <li>Отслеживание прогресса</li>
          </ul>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="btn btnPrimary" href="#contact">Хочу начать</a>
            <a className="btn" href="#pricing">Посмотреть цены</a>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="grid3">
        {PRICING.map((p) => (
          <div
            key={p.name}
            className={clsx("card pricing", p.hot && "fadeIn")}
            style={p.hot ? { borderColor: "rgba(255,95,162,.35)" } : undefined}
          >
            <span className="badge">{p.tag}</span>
            <h3 style={{ margin: "10px 0 0" }}>{p.name}</h3>
            <div className="price">{p.price}</div>
            <div className="hint">{p.hint}</div>

            <ul>
              {p.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>

            <div style={{ marginTop: 14 }}>
              <button className="btn btnPrimary" onClick={() => pickPlan(p.name)}>
                Выбрать
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section id="faq" className="split">
        <div className="card" style={{ padding: 18 }}>
          <span className="badge">FAQ</span>
          <h2 style={{ margin: "10px 0 8px", letterSpacing: "-.4px" }}>
            Частые вопросы
          </h2>
          <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>
            Нажми на вопрос — откроется ответ.
          </p>

          <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
            {FAQ.map((x, idx) => (
              <FAQItem
                key={x.q}
                q={x.q}
                a={x.a}
                open={faqOpen === idx}
                onToggle={() => setFaqOpen((p) => (p === idx ? null : idx))}
              />
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <span className="badge">Быстрый старт</span>
          <h3 style={{ margin: "10px 0 6px" }}>Как начать</h3>
          <ol style={{ margin: 0, paddingLeft: 18, color: "var(--muted)", lineHeight: 1.7 }}>
            <li>Заполни форму и напиши цель</li>
            <li>Я задам пару вопросов и подберу программу</li>
            <li>Стартуем: тренировки + сопровождение</li>
          </ol>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="btn btnPrimary" href={buildWhatsAppLink(quickMsg)} target="_blank" rel="noreferrer">
              Написать в WhatsApp
            </a>
            <a className="btn" href={buildTelegramLink()} target="_blank" rel="noreferrer">
              Написать в Telegram
            </a>
          </div>

          <div className="hint" style={{ marginTop: 12 }}>
            *Можно подключить оплату (ЮKassa/CloudPayments) — если хочешь, сделаю следующий шаг.
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="split">
        <div className="card form">
          <h2 style={{ margin: "0 0 8px", letterSpacing: "-.4px" }}>Запись на консультацию</h2>
          <p className="hint" style={{ marginTop: 0 }}>
            Заполни форму — откроется WhatsApp с готовым сообщением. Можно заменить на отправку в Telegram.
          </p>

          <form onSubmit={onSubmit}>
            <div className="row">
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Имя"
                required
              />
              <input
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="Телефон / WhatsApp"
                required
              />
            </div>

            <div className="row" style={{ marginTop: 10 }}>
              <select
                value={form.plan}
                onChange={(e) => setForm((p) => ({ ...p, plan: e.target.value }))}
              >
                <option value="">Выбери программу</option>
                <option value="1 месяц">1 месяц</option>
                <option value="3 месяца">3 месяца</option>
                <option value="VIP сопровождение">VIP сопровождение</option>
              </select>

              <input
                value={form.city}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                placeholder="Город"
              />
            </div>

            <textarea
              value={form.goal}
              onChange={(e) => setForm((p) => ({ ...p, goal: e.target.value }))}
              placeholder="Цель: похудеть / набрать / тонус / восстановиться — напиши пару слов"
              style={{ marginTop: 10 }}
            />

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
              <button className="btn btnPrimary" type="submit">
                Отправить заявку
              </button>
              <a className="btn" href={buildWhatsAppLink(quickMsg)} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a className="btn" href={buildTelegramLink()} target="_blank" rel="noreferrer">
                Telegram
              </a>
            </div>

            <div className="hint" style={{ marginTop: 10 }}>
              Нажимая «Отправить», ты соглашаешься на обработку персональных данных.
            </div>
          </form>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <span className="badge">Контакты</span>
          <h3 style={{ margin: "10px 0 6px" }}>Тренировки Онлайн</h3>
          <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>
            Благовещенск, Россия. Работаю онлайн по всей России.
          </p>

          <div className="social">
            <a href={CONTACTS.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
            <a href={buildWhatsAppLink(quickMsg)} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={buildTelegramLink()} target="_blank" rel="noreferrer">Telegram</a>
          </div>

          <div
            className="card"
            style={{
              marginTop: 14,
              padding: 14,
              background: "rgba(255,255,255,.03)",
              boxShadow: "none",
            }}
          >
            <b>Что нужно для старта</b>
            <ul>
              <li>5 минут на анкету</li>
              <li>Фото/замеры (по желанию)</li>
              <li>Удобный мессенджер для связи</li>
            </ul>
          </div>

          <div className="footer card" style={{ marginTop: 14, background: "rgba(255,255,255,.02)", boxShadow: "none" }}>
            <div>© {year} Тренировки Онлайн</div>
            <div className="hint">Сайт готов • StackBlitz</div>
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div style={{ height: 10 }} />
    </div>
  );
}
