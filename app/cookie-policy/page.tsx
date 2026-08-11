import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Политика использования cookie — JetQ",
  description:
    "Узнайте, как JetQ использует файлы cookie и локальное хранилище для сохранения выбранного города, отслеживания конверсий рекламы и аналитики звонков.",
};

export default function CookiePolicyPage() {
  const year = new Date().getFullYear();

  return (
    <LegalPage
      title="Политика использования cookie"
      lastUpdated={`Последнее обновление: ${year}.`}
    >
      <div>
        <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
          Определения
        </h2>
        <p className="mt-2">В настоящей Политике используются следующие термины:</p>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>
            <strong>JetQ (Платформа)</strong> — цифровая платформа-агрегатор,
            управляемая ТОО «JetQ Digital», включая сайт{" "}
            <a href="https://jetq.kz" className="text-link-blue underline underline-offset-4">jetq.kz</a>{" "}
            и мобильное приложение JetQ (iOS и Android);
          </li>
          <li>
            <strong>Cookie (файлы cookie)</strong> — небольшие текстовые
            файлы, сохраняемые веб-сайтом на устройстве Пользователя;
          </li>
          <li>
            <strong>Локальное хранилище (localStorage)</strong> — механизм
            хранения данных в браузере Пользователя без передачи на сервер;
          </li>
          <li>
            <strong>Пользователь</strong> — физическое лицо, посещающее сайт
            или использующее мобильное приложение JetQ.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
          1. Общие положения
        </h2>
        <p className="mt-2">
          Настоящая Политика объясняет, как сайт JetQ использует файлы cookie
          и схожие технологии локального хранилища браузера (localStorage) при
          посещении вами сайта{" "}
          <a
            href="https://jetq.kz"
            className="text-link-blue underline underline-offset-4"
          >
            jetq.kz
          </a>
          .
        </p>
        <p className="mt-2">
          Используя сайт, вы соглашаетесь с применением описанных ниже
          технологий. Полная информация об обработке персональных данных в
          мобильном приложении JetQ содержится в{" "}
          <a
            href="/privacy-policy/"
            className="text-link-blue underline underline-offset-4"
          >
            Политике конфиденциальности
          </a>
          .
        </p>
      </div>

      <div>
        <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
          2. Что такое cookie
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
          3. Какие технологии мы используем
        </h2>
        <p className="mt-2">
          На сайте применяются файлы cookie, локальное хранилище браузера
          (localStorage) и скрипты сторонних сервисов. Ниже перечислены
          основные цели их использования.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
          4. Необходимые и функциональные cookie
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
          5. Аналитика и отслеживание конверсий
        </h2>
        <p className="mt-2">
          Для понимания того, как пользователи взаимодействуют с сайтом,
          мы используем сервисы Google Tag Manager (идентификатор
          GTM-K5NFX68B) и Google Analytics 4 (идентификатор G-J05Y4WBEHN).
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
          Эти данные помогают нам анализировать посещаемость сайта и не
          передаются третьим лицам вне экосистемы Google.
          Подробнее о том, как Google использует cookie, можно узнать в{" "}
          <a
            href="https://policies.google.com/technologies/cookies"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link-blue underline underline-offset-4"
          >
            политике Google
          </a>
          .
        </p>
      </div>

      <div>
        <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
          6. Коллтрекинг и коммуникации
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
            className="text-link-blue underline underline-offset-4"
          >
            политике конфиденциальности CallGear
          </a>
          .
        </p>
      </div>

      <div>
        <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
          7. Управление cookie и отказ от отслеживания
        </h2>
        <p className="mt-2">
          Вы можете в любой момент удалить сохранённую информацию о городе,
          очистив локальное хранилище браузера или удалив cookie для сайта
          jetq.kz. Обратите внимание: после этого при следующем посещении
          главной страницы вам снова будет предложено выбрать город.
        </p>
        <p className="mt-2">
          Вы также можете управлять настройками cookie через параметры
          приватности вашего браузера.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
          8. Изменения в Политике
        </h2>
        <p className="mt-2">
          Мы оставляем за собой право в любое время вносить изменения
          в настоящую Политику, в том числе в связи с изменением
          используемых технологий, подключением новых сервисов аналитики
          или изменением законодательства.
        </p>
        <p className="mt-2">
          Изменения вступают в силу с момента опубликования новой редакции
          на данной странице. Актуальная версия всегда доступна по адресу{" "}
          <a
            href="https://jetq.kz/cookie-policy/"
            className="text-link-blue underline underline-offset-4"
          >
            jetq.kz/cookie-policy
          </a>
          .
        </p>
        <p className="mt-2">
          Продолжение использования сайта после вступления изменений в силу
          означает согласие Пользователя с новой редакцией Политики.
        </p>
        <p className="mt-2">
          Политика обработки персональных данных Пользователей мобильного
          приложения JetQ изложена в{" "}
          <a
            href="/privacy-policy/"
            className="text-link-blue underline underline-offset-4"
          >
            Политике конфиденциальности
          </a>
          .
        </p>
      </div>
    </LegalPage>
  );
}
