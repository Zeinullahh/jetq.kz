import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика использования cookie — JetQ",
  description:
    "Узнайте, как JetQ использует файлы cookie и локальное хранилище для сохранения выбранного города и улучшения работы сайта.",
};

export default function CookiePolicyPage() {
  return (
    <section className="min-h-screen bg-background py-24 text-foreground">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-center text-3xl font-normal uppercase tracking-tight md:text-4xl">
          Политика использования cookie
        </h1>

        <div className="mt-12 space-y-8 text-base leading-relaxed text-muted-foreground">
          <p>
            Настоящая Политика объясняет, как сайт JetQ использует файлы cookie
            и схожие технологии локального хранилища браузера (localStorage) при
            посещении вами нашего сайта.
          </p>

          <div>
            <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
              Что такое cookie
            </h2>
            <p className="mt-2">
              Cookie — это небольшие текстовые файлы, которые веб-сайт сохраняет
              на вашем устройстве. Они помогают сайту запоминать информацию о
              вашем визите, например, выбранный язык или регион, и обеспечивать
              более удобную работу.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
              Как мы используем cookie и localStorage
            </h2>
            <p className="mt-2">
              Мы используем локальное хранилище браузера (localStorage) для
              сохранения информации о том, из какого города вы предпочитаете
              заказывать автомобиль — Алматы или Астана. Это позволяет:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>
                автоматически направлять вас на страницу выбранного города при
                повторном посещении;
              </li>
              <li>
                показывать актуальные контакты, адреса и автомобили в наличии
                для вашего города;
              </li>
              <li>
                не запрашивать выбор города каждый раз при переходе на главную
                страницу.
              </li>
            </ul>
            <p className="mt-2">
              Эти данные хранятся только на вашем устройстве и не передаются на
              наши серверы третьим лицам.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
              Управление cookie
            </h2>
            <p className="mt-2">
              Вы можете в любой момент удалить сохранённую информацию о городе,
              очистив локальное хранилище браузера или удалив cookie для сайта
              jetq.kz. Обратите внимание: после этого при следующем посещении
              главной страницы вам снова будет предложено выбрать город.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
              Изменения в Политике
            </h2>
            <p className="mt-2">
              Мы можем время от времени обновлять настоящую Политику. Актуальная
              версия всегда доступна на этой странице.
            </p>
          </div>

          <p className="text-sm text-white/50">
            Последнее обновление: {new Date().getFullYear()}.
          </p>
        </div>
      </div>
    </section>
  );
}
