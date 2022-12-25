import React from "react";

const About = (): JSX.Element => {
 return (
    <div>
         <h1>Про проект</h1>
    <div className="cards_container">
      <div className="card">
        <h3>Як ми використовуємо дохід?</h3>

        <p><em><strong>50% коштів, що виручені від кампанії, будуть передані Збройним силам України.</strong></em></p>
        <p><em>Кошти від цієї кампанії будуть розподілені до підрозділів ЗСУ , щоб вони могли ефективно боротися з
            ворогом. Зкожного перепродажу покупцем NFU (вторинний продаж/розподіл доходу) ми, автоматично отримуємо 10%
            від чистої ціни покупки шляхом переказу відповідної суми криптовалюти в наш гаманець NFU або інший
            гаманець.</em></p>
      </div>
      <div className="card">
        <h3>Що таке NFT?</h3>
        <p><em>NFT розшифровується як «Non-Fungible Token».</em></p>
        <p><em>Якщо щось не можна замінити, оскільки воно унікальне, воно є «незамінним».
            Багато творів мистецтва, наприклад картини, є унікальними. Картину можна сфотографувати або купити копію,
            але
            оригінал завжди буде один.
            У цифровому світі ці унікальні активи називаються NFT. Їх можна купувати і продавати, як і будь-який інший
            об’єкт, але вони не є матеріальними.</em></p>
        <p><em>Оскільки цифрові файли можна дуже легко копіювати нескінченно, існують цифрові токени (сертифікати),
            які
            функціонують як сертифікати власності на віртуальні активи. Таким чином, NFT залишаються унікальними та
            захищеними від підробок.</em></p>
      </div>
      <div className="card">
        <h3>Що таке NFU?</h3>
        <p><em>NFU розшифровується як «Non-Fungible Ukraine».</em></p>
        <p><em>Як і NFT, NFU унікальні, оскільки існують лише в обмеженій кількості.</em></p>
      </div>
    </div>
    </div>
 )
}

export default About