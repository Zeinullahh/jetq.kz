import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — JetQ",
  description:
    "Политика конфиденциальности JetQ. Какие данные собираются, как используются, передача третьим лицам, cookie и локальное хранилище, права субъекта данных.",
};

export default function PrivacyPolicyPage() {
  const year = new Date().getFullYear();

  return (
    <LegalPage
      title="Политика конфиденциальности"
      lastUpdated={`Последнее обновление: ${year}.`}
    >
      <div>
        <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
          1. Общие положения
        </h2>
        <p className="mt-2">
          Настоящая Политика конфиденциальности (далее — «Политика») определяет
          порядок сбора, обработки, хранения и защиты персональных данных
          Пользователей сайта{" "}
          <a
            href="https://jetq.kz"
            className="text-foreground underline underline-offset-4"
          >
            jetq.kz
          </a>{" "}
          и мобильного приложения JetQ (далее — «Платформа»).
        </p>
        <p className="mt-2">
          Оператором персональных данных является ТОО «JETQ GROUP».
        </p>
        <p className="mt-2">
          Обработка персональных данных осуществляется в соответствии с Законом
          Республики Казахстан «О персональных данных и их защите».
        </p>
      </div>

      <div>
        <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
          2. Какие данные мы собираем
        </h2>
        <p className="mt-2">
          В зависимости от того, каким образом Пользователь взаимодействует с
          Платформой, могут собираться следующие категории данных:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>
            <strong>Контактная информация:</strong> имя, номер телефона —
            указываются Пользователем в формах обратной связи и при регистрации
            в мобильном приложении.
          </li>
          <li>
            <strong>Данные учётной записи:</strong> номер телефона, история
            заказов и бронирований, предпочтения.
          </li>
          <li>
            <strong>Документы:</strong> сканированные копии удостоверения
            личности и водительского удостоверения — при оформлении аренды
            автомобиля; обрабатываются исключительно для целей модерации и
            передачи партнёру-арендодателю.
          </li>
          <li>
            <strong>Геолокация:</strong> данные о местоположении устройства —
            используются для отображения ближайших зарядных станций и адресов
            на карте (только с согласия Пользователя в настройках устройства).
          </li>
          <li>
            <strong>Платёжные данные:</strong> данные банковских карт и иных
            платёжных средств обрабатываются исключительно платёжными
            провайдерами (Halyk Pay, Robokassa) и не хранятся на серверах JetQ.
          </li>
          <li>
            <strong>Технические данные:</strong> IP-адрес, тип браузера и
            устройства, операционная система, история посещений страниц,
            источник перехода — собираются автоматически при использовании
            Платформы.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
          3. Цели обработки данных
        </h2>
        <p className="mt-2">
          JetQ обрабатывает персональные данные Пользователей в следующих целях:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>регистрация и аутентификация Пользователя в мобильном приложении;</li>
          <li>оформление и обработка заказов товаров и услуг;</li>
          <li>передача необходимых данных партнёрам для исполнения заказа;</li>
          <li>модерация документов при оформлении аренды;</li>
          <li>информирование о статусе заказа, отправка уведомлений;</li>
          <li>
            анализ использования Платформы для улучшения её работы (веб-аналитика);
          </li>
          <li>аналитика звонков и коммуникаций (коллтрекинг);</li>
          <li>связь с Пользователем по вопросам поддержки.</li>
        </ul>
        <p className="mt-2">
          JetQ не использует персональные данные для принятия решений,
          порождающих юридические последствия, основанных исключительно на
          автоматизированной обработке.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
          4. Передача данных третьим лицам
        </h2>
        <p className="mt-2">
          JetQ передаёт персональные данные третьим лицам исключительно в
          объёме, необходимом для достижения целей обработки:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>
            партнёрам Платформы (автосалонам, арендодателям, операторам
            зарядных станций, сервисным центрам) — для исполнения заказов и
            оказания услуг;
          </li>
          <li>
            платёжным провайдерам (Halyk Pay, Robokassa) — для обработки
            платежей;
          </li>
          <li>
            Google (сервисы Google Analytics 4, Google Tag Manager) — для
            веб-аналитики;
          </li>
          <li>
            CallGear — для аналитики звонков и коллтрекинга.
          </li>
        </ul>
        <p className="mt-2">
          Во всех случаях передача осуществляется с соблюдением требований
          законодательства Республики Казахстан о персональных данных.
        </p>
      </div>

      <div id="cookies">
        <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
          5. Файлы cookie и локальное хранилище
        </h2>
        <p className="mt-2">
          Настоящий раздел объясняет, как Платформа использует файлы cookie и
          схожие технологии локального хранилища браузера (localStorage) при
          посещении вами сайта jetq.kz.
        </p>

        <div className="mt-4">
          <h3 className="text-base font-normal uppercase tracking-wide text-foreground">
            Что такое cookie
          </h3>
          <p className="mt-2">
            Cookie — это небольшие текстовые файлы, которые веб-сайт сохраняет
            на вашем устройстве. Они помогают сайту запоминать информацию о
            вашем визите, например, выбранный язык или регион, и обеспечивать
            более удобную работу.
          </p>
        </div>

        <div className="mt-4">
          <h3 className="text-base font-normal uppercase tracking-wide text-foreground">
            Какие технологии мы используем
          </h3>
          <p className="mt-2">
            На сайте применяются файлы cookie, локальное хранилище браузера
            (localStorage) и скрипты сторонних сервисов. Ниже перечислены
            основные цели их использования.
          </p>
        </div>

        <div className="mt-4">
          <h3 className="text-base font-normal uppercase tracking-wide text-foreground">
            Необходимые и функциональные cookie
          </h3>
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
              показывать актуальные контакты, адреса и автомобили в наличии для
              вашего города;
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

        <div className="mt-4">
          <h3 className="text-base font-normal uppercase tracking-wide text-foreground">
            Аналитика и отслеживание конверсий
          </h3>
          <p className="mt-2">
            Для понимания того, как пользователи взаимодействуют с сайтом, мы
            используем сервисы Google Tag Manager (идентификатор GTM-K5NFX68B)
            и Google Analytics 4 (идентификатор G-J05Y4WBEHN). Google может
            устанавливать cookie и собирать технические данные, такие как:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1">
            <li>идентификаторы устройства и браузера;</li>
            <li>IP-адрес (может обрабатываться в анонимизированном виде);</li>
            <li>история посещений страниц и совершённых действий;</li>
            <li>источник перехода на сайт.</li>
          </ul>
          <p className="mt-2">
            Эти данные помогают нам анализировать посещаемость сайта и не
            передаются третьим лицам вне экосистемы Google. Подробнее о том, как
            Google использует cookie, можно узнать в{" "}
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

        <div className="mt-4">
          <h3 className="text-base font-normal uppercase tracking-wide text-foreground">
            Коллтрекинг и коммуникации
          </h3>
          <p className="mt-2">
            На сайте подключены сервисы CallGear (скрипты с доменов
            app.callgear.com и custom.callgear.com). Они используются для
            аналитики звонков, подмены номеров и улучшения качества коммуникации
            с клиентами. CallGear может использовать cookie, локальное хранилище
            и другие технологии для:
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

        <div className="mt-4">
          <h3 className="text-base font-normal uppercase tracking-wide text-foreground">
            Управление cookie и отказ от отслеживания
          </h3>
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
            . Большинство браузеров также позволяют блокировать сторонние cookie
            в настройках приватности.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
          6. Права субъекта данных
        </h2>
        <p className="mt-2">
          В соответствии с законодательством Республики Казахстан Пользователь
          имеет право:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>получать информацию о сборе и обработке своих персональных данных;</li>
          <li>
            требовать изменения или дополнения персональных данных в случае их
            неполноты или неточности;
          </li>
          <li>
            требовать удаления персональных данных, за исключением случаев, когда
            их хранение требуется в силу законодательства;
          </li>
          <li>
            отозвать согласие на обработку персональных данных в любой момент,
            направив соответствующий запрос оператору;
          </li>
          <li>обжаловать действия оператора в уполномоченный орган или суд.</li>
        </ul>
        <p className="mt-2">
          Для реализации своих прав Пользователь может обратиться в службу
          поддержки JetQ по контактам, указанным в разделе 8.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
          7. Хранение и защита данных
        </h2>
        <p className="mt-2">
          JetQ принимает необходимые организационные и технические меры для
          защиты персональных данных от неправомерного доступа, изменения,
          раскрытия или уничтожения.
        </p>
        <p className="mt-2">
          Персональные данные хранятся не дольше, чем этого требуют цели
          обработки, если иной срок не установлен законодательством Республики
          Казахстан. По достижении целей обработки или при отзыве согласия
          данные подлежат уничтожению.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-normal uppercase tracking-wide text-foreground">
          8. Изменения в Политике и контакты
        </h2>
        <p className="mt-2">
          JetQ может время от времени обновлять настоящую Политику. Актуальная
          версия всегда доступна на странице{" "}
          <a
            href="https://jetq.kz/privacy-policy/"
            className="text-foreground underline underline-offset-4"
          >
            jetq.kz/privacy-policy
          </a>
          .
        </p>
        <p className="mt-2">
          По всем вопросам, связанным с обработкой персональных данных,
          обращайтесь:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>
            Телефон:{" "}
            <a
              href="tel:+77750061411"
              className="text-foreground underline underline-offset-4"
            >
              +7 (775) 006-14-11
            </a>
          </li>
          <li>
            Email:{" "}
            <a
              href="mailto:info@jetq.kz"
              className="text-foreground underline underline-offset-4"
            >
              info@jetq.kz
            </a>
          </li>
        </ul>
      </div>
    </LegalPage>
  );
}
