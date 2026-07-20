import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика использования cookie — JetQ",
  description:
    "Узнайте, как JetQ использует файлы cookie и локальное хранилище для сохранения выбранного города, отслеживания конверсий рекламы и аналитики звонков.",
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
              Какие технологии мы используем
            </h2>
            <p className="mt-2">
              На сайте применяются файлы cookie, локальное хранилище браузера
              (localStorage) и скрипты сторонних сервисов. Ниже перечислены
              основные цели их использования.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
              1. Необходимые и функциональные cookie
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
              2. Аналитика и отслеживание конверсий
            </h2>
            <p className="mt-2">
              Для измерения эффективности рекламы и понимания того, как
              пользователи взаимодействуют с сайтом, мы используем сервис Google
              Ads (conversion tracking tag, идентификатор AW-17674546420).
              Google может устанавливать cookie и собирать технические данные,
              такие как:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>идентификаторы устройства и браузера;</li>
              <li>IP-адрес (может обрабатываться в анонимизированном виде);</li>
              <li>история посещений страниц и совершённых действий;</li>
              <li>источник перехода на сайт.</li>
            </ul>
            <p className="mt-2">
              Эти данные помогают нам оценивать результативность рекламных
              кампаний и не передаются третьим лицам вне экосистемы Google.
              Подробнее о том, как Google использует cookie, можно узнать в{" "}
              <a
                href="https://policies.google.com/technologies/cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                политике Google
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
              3. Коллтрекинг и коммуникации
            </h2>
            <p className="mt-2">
              На сайте подключены сервисы CallGear (скрипты с доменов
              app.callgear.com и custom.callgear.com). Они используются для
              аналитики звонков, подмены номеров и улучшения качества
              коммуникации с клиентами. CallGear может использовать cookie,
              локальное хранилище и другие технологии для:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>определения источника звонка;</li>
              <li>связи звонка с посещением сайта;</li>
              <li>предоставления удобных каналов связи на сайте.</li>
            </ul>
            <p className="mt-2">
              Подробная информация о данных, которые обрабатывает CallGear,
              доступна в{" "}
              <a
                href="https://callgear.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                политике конфиденциальности CallGear
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
              Управление cookie и отказ от отслеживания
            </h2>
            <p className="mt-2">
              Вы можете в любой момент удалить сохранённую информацию о городе,
              очистив локальное хранилище браузера или удалив cookie для сайта
              jetq.kz. Обратите внимание: после этого при следующем посещении
              главной страницы вам снова будет предложено выбрать город.
            </p>
            <p className="mt-2">
              Чтобы отказаться от персонализированной рекламы Google, вы можете
              использовать{" "}
              <a
                href="https://adssettings.google.com/authenticated"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                настройки рекламы Google
              </a>{" "}
              или установить расширение{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                Google Analytics Opt-out
              </a>
              . Большинство браузеров также позволяют блокировать сторонние
              cookie в настройках приватности.
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
