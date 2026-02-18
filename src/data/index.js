const fs = require('fs');
const path = require('path');
const http = require('http');
const ayakkabilar = [
    // --- Mevcut WENT Listesi ---
    {
        'kod': "WENT 715-07",
        'cate': "WENT Ayakkabılar",
        'link': "https://www.went.com.tr/wp-content/uploads/2021/04/WENT-71507-S1S1P.jpg",
        'aciklama': "S1 S1P standartlarında, nefes alabilir süet saya, delinmeye dirençli kompozit taban ve darbe emici topuk özelliği ile yüksek güvenlik sunar."
    },
    {
        'kod': "WENT 710-17",
        'cate': "WENT Ayakkabılar",
        'link': "https://www.went.com.tr/wp-content/uploads/2021/04/WENT-710-17-S1S1P-1.jpg",
        'aciklama': "S1 S1P koruma sınıfında, kaymaz taban ve antistatik özellikleriyle endüstriyel ortamlarda güvenli kullanım sağlar."
    },
    {
        'kod': "WENT 710-07",
        'cate': "WENT Ayakkabılar",
        'link': "https://www.went.com.tr/wp-content/uploads/2021/04/WENT-710-07-S1S1P-1.jpg",
        'aciklama': "Hafif ve esnek yapısıyla uzun süreli kullanımda konfor sunan, çelik burun korumalı S1P iş ayakkabısı."
    },
    {
        'kod': "WENT 710-17",
        'cate': "WENT Ayakkabılar",
        'link': "https://www.went.com.tr/wp-content/uploads/2021/04/WENT-710-17-S2-S3-1.jpg",
        'aciklama': "Su itici özellikli S2/S3 standartlarında, zorlu çalışma koşullarına dayanıklı, üstün koruma sağlayan iş ayakkabısı."
    },
    {
        'kod': "WENT 711-17",
        'cate': "WENT Ayakkabılar",
        'link': "https://www.went.com.tr/wp-content/uploads/2021/04/WENT-711-17-S1S1P-1.jpg",
        'aciklama': "S1 S1P sertifikalı, yüksek kaliteli deri saya ve nefes alabilir iç astar ile maksimum konfor ve güvenlik."
    },
    {
        'kod': "WENT 716-07",
        'cate': "WENT Ayakkabılar",
        'link': "https://www.went.com.tr/wp-content/uploads/2021/04/WENT-716-07-S1S1P-1.jpg",
        'aciklama': "Modern tasarımı ve S1P koruma özellikleriyle hem şık hem de güvenli bir çalışma deneyimi sunar."
    },
    {
        'kod': "WENT 710-06",
        'cate': "WENT Ayakkabılar",
        'link': "https://www.went.com.tr/wp-content/uploads/2021/04/WENT-710-06-S1S1P-SADE-1.jpg",
        'aciklama': "Sade ve ergonomik tasarımıyla öne çıkan, temel koruma ihtiyaçlarını karşılayan S1P iş ayakkabısı."
    },
    {
        'kod': "WENT 710-16",
        'cate': "WENT Ayakkabılar",
        'link': "https://www.went.com.tr/wp-content/uploads/2021/04/WENT-710-16-S1S1P-1.jpg",
        'aciklama': "Dayanıklı dış yüzeyi ve kaymaz tabanı ile güvenli adımlar atmanızı sağlayan S1P standartlarında iş ayakkabısı."
    },
    {
        'kod': "WENT 715-06",
        'cate': "WENT Ayakkabılar",
        'link': "https://www.went.com.tr/wp-content/uploads/2021/04/WENT-715-06-S1S1P-1.jpg",
        'aciklama': "S1 S1P koruma sınıfında, esnek yapısı ve darbe emici özellikleriyle gün boyu rahatlık sağlar."
    },
    {
        'kod': "WENT 710-06",
        'cate': "WENT Ayakkabılar",
        'link': "https://www.went.com.tr/wp-content/uploads/2021/04/WENT-710-06-S1S1P-1.jpg",
        'aciklama': "Klasik tasarımın modern koruma teknolojileriyle birleştiği, S1P standartlarında güvenilir iş ayakkabısı."
    },
    {
        'kod': "WENT 710-06",
        'cate': "WENT Ayakkabılar",
        'link': "https://www.went.com.tr/wp-content/uploads/2021/04/WENT-710-06-S2-S3-1.jpg",
        'aciklama': "Suya dayanıklı S2/S3 özellikleri ve güçlendirilmiş taban yapısıyla zorlu şartlarda tam koruma."
    },
    {
        'kod': "WENT 736",
        'cate': "WENT Ayakkabılar",
        'link': "https://www.went.com.tr/wp-content/uploads/2021/04/WENT-736-S2S3-2.jpg",
        'aciklama': "S2 S3 standartlarında, yüksek bilek korumalı, zorlu arazi ve şantiye koşulları için ideal iş botu."
    },

    // --- Ayakkabı Serisi ---
    {
        'kod': "YL 702-01",
        'cate': "Ayakkabı Serisi",
        'link': "/assets/ayakkabilarYL702-01.jpg",
        'aciklama': "Standart iş güvenliği gereksinimlerini karşılayan, dayanıklı deri saya ve kaymaz taban özellikli iş ayakkabısı."
    },
    {
        'kod': "YL 702-02",
        'cate': "Ayakkabı Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL702-02.jpg",
        'aciklama': "Ergonomik tasarımı ve nefes alabilir iç yapısıyla uzun süreli çalışmalarda konfor sağlayan iş ayakkabısı."
    },
    {
        'kod': "YL 703",
        'cate': "Ayakkabı Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL703.jpg",
        'aciklama': "Güçlendirilmiş burun koruması ve antistatik taban özelliği ile güvenli bir çalışma ortamı sunar."
    },
    {
        'kod': "YL 719-02",
        'cate': "Ayakkabı Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL719-02.jpg",
        'aciklama': "Sportif görünümü ve hafif yapısıyla hem konfor hem de güvenlik arayanlar için ideal bir seçenek."
    },
    {
        'kod': "YL 719-04",
        'cate': "Ayakkabı Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL719-04.jpg",
        'aciklama': "Esnek taban yapısı ve darbe emici özellikleriyle gün boyu rahatlık sağlayan modern iş ayakkabısı."
    },
    {
        'kod': "YL 730-01",
        'cate': "Ayakkabı Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL730-01.jpg",
        'aciklama': "Klasik iş ayakkabısı tasarımına sahip, dayanıklı ve uzun ömürlü kullanım sunan model."
    },
    {
        'kod': "YL 731-01",
        'cate': "Ayakkabı Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL731-01.jpg",
        'aciklama': "Yüksek kaliteli malzemelerden üretilmiş, kaymaz taban ve burun korumalı güvenli iş ayakkabısı."
    },
    {
        'kod': "YL 734-01",
        'cate': "Ayakkabı Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL734-01.jpg",
        'aciklama': "Zorlu çalışma koşullarına uygun, ekstra dayanıklılık sağlayan dikişli yapısı ve koruyucu özellikleriyle öne çıkar."
    },
    {
        'kod': "YL 734-02",
        'cate': "Ayakkabı Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL734-02.jpg",
        'aciklama': "Konforlu iç taban ve nefes alabilir saya tasarımıyla yorgunluğu azaltan iş ayakkabısı."
    },
    {
        'kod': "YL 734-06",
        'cate': "Ayakkabı Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL734-06.jpg",
        'aciklama': "Özel taban deseni sayesinde üstün zemin tutuşu sağlayan, güvenli ve rahat iş ayakkabısı."
    },
    {
        'kod': "YL 902-01",
        'cate': "Ayakkabı Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL902-01.jpg",
        'aciklama': "Hijyen gerektiren ortamlar için uygun, kolay temizlenebilir ve dayanıklı beyaz iş ayakkabısı."
    },
    {
        'kod': "YL 904-01",
        'cate': "Ayakkabı Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL904-01.jpg",
        'aciklama': "Bağcıksız pratik kullanım sunan, kaymaz tabanlı ve koruyucu özellikli iş ayakkabısı."
    },

    // --- Bot Serisi ---
    {
        'kod': "YL 808-02",
        'cate': "Bot Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL808-02.jpg",
        'aciklama': "Bilek destekli yapısı ve soğuk hava koşullarına dayanıklı malzemesiyle kış ayları için ideal iş botu."
    },
    {
        'kod': "YL 809-02",
        'cate': "Bot Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL809-02.jpg",
        'aciklama': "Zorlu şantiye ortamlarında maksimum koruma sağlayan, su itici özellikli ve çelik burunlu iş botu."
    },
    {
        'kod': "YL 837-02",
        'cate': "Bot Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL2.jpg",
        'aciklama': "Yüksek güvenlik standartlarına sahip, kaymaz ve delinmeye dirençli tabanıyla tam koruma sunan bot."
    },
    {
        'kod': "YL 837-01",
        'cate': "Bot Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL1.jpg",
        'aciklama': "Ergonomik iç yapısı ve dayanıklı dış yüzeyi ile uzun süreli kullanımlarda konfor ve güvenlik sağlar."
    },

    // --- Beyaz Serisi ---
    {
        'kod': "YL 902-02",
        'cate': "Beyaz Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL902-02.jpg",
        'aciklama': "Gıda, sağlık ve hijyen sektörleri için özel olarak tasarlanmış, leke tutmayan beyaz iş ayakkabısı."
    },
    {
        'kod': "YL 904-02",
        'cate': "Beyaz Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL904-02.jpg",
        'aciklama': "Kaymaz taban teknolojisi ve kolay giyilebilir yapısıyla laboratuvar ve mutfak çalışanları için ideal."
    },
    {
        'kod': "YL 730-06",
        'cate': "Beyaz Serisi",
        'link': "/assets/ayakkabilar/kucuk/YL730-06.jpg",
        'aciklama': "Nefes alabilir yapısı ve antibakteriyel iç astarı ile gün boyu hijyen ve konfor sağlayan model."
    },

    // --- Comfort Ayakkabılar ---
    {
        'kod': "YL 404",
        'cate': "Comfort Ayakkabılar",
        'link': "/assets/ayakkabilar/kucuk/893692278.jpg",
        'aciklama': "Günlük kullanımda maksimum rahatlık sunan, yumuşak tabanlı ve ergonomik tasarımlı comfort ayakkabı."
    },
    {
        'kod': "YL 403",
        'cate': "Comfort Ayakkabılar",
        'link': "/assets/ayakkabilar/kucuk/691385351.jpg",
        'aciklama': "Hafif yapısı ve esnek tabanı sayesinde ayak yorgunluğunu minimize eden konfor odaklı model."
    },
    {
        'kod': "YL 402",
        'cate': "Comfort Ayakkabılar",
        'link': "/assets/ayakkabilar/kucuk/812175377.jpg",
        'aciklama': "Şık tasarımı ve ortopedik destekli iç yapısıyla hem iş hem de günlük kullanım için uygundur."
    },
    {
        'kod': "YL 401",
        'cate': "Comfort Ayakkabılar",
        'link': "/assets/ayakkabilar/kucuk/815478445.jpg",
        'aciklama': "Nefes alabilir saya ve darbe emici taban özellikleri ile gün boyu süren konfor sağlar."
    },

    // --- Hafif İş Ayakkabıları ---
    {
        'kod': "YL 503",
        'cate': "Hafif İş Ayakkabıları",
        'link': "/assets/ayakkabilar/kucuk/64505238.jpg",
        'aciklama': "Hafif iş koşulları için tasarlanmış, esnek ve rahat yapısıyla hareket özgürlüğü sunan ayakkabı."
    },
    {
        'kod': "YL 502",
        'cate': "Hafif İş Ayakkabıları",
        'link': "/assets/ayakkabilar/kucuk/181131843.jpg",
        'aciklama': "Modern ve hafif tasarımıyla depo ve lojistik gibi alanlarda çalışanlar için ideal bir tercih."
    },
    {
        'kod': "YL 501",
        'cate': "Hafif İş Ayakkabıları",
        'link': "/assets/ayakkabilar/kucuk/655079163.jpg",
        'aciklama': "Ekstra hafif malzemelerden üretilmiş, uzun süreli ayakta duranlar için konforlu iş ayakkabısı."
    }
];


// Fotoğrafların kaydedileceği klasörü oluştur
const downloadFolder = path.join(__dirname, 'yilmaz_fotolar');
if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder);
    console.log(`📁 '${downloadFolder}' klasörü oluşturuldu.`);
}

// Sadece yilmazayakkabi.com içeren linkleri filtrele
const yilmazLinkleri = ayakkabilar.filter(item => item.link.includes('yilmazayakkabi.com'));

console.log(`🔍 Toplam ${yilmazLinkleri.length} adet Yılmaz Ayakkabı görseli bulundu. İndirme başlıyor...\n`);

// Her bir linki indir
yilmazLinkleri.forEach(item => {
    const url = item.link;
    
    // URL'den dosya adını çıkar (Örn: YL702-01.jpg)
    const fileName = url.substring(url.lastIndexOf('/') + 1);
    const filePath = path.join(downloadFolder, fileName);

    const file = fs.createWriteStream(filePath);

    http.get(url, (response) => {
        // Eğer sayfa yönlendirmesi veya bulunamama durumu varsa uyar
        if (response.statusCode !== 200) {
            console.error(`❌ Hata (${fileName}): Sunucu ${response.statusCode} döndürdü.`);
            return;
        }

        response.pipe(file);
        
        file.on('finish', () => {
            file.close();
            console.log(`✅ İndirildi: ${fileName}`);
        });
    }).on('error', (err) => {
        // Hata olursa yarım kalan dosyayı sil
        fs.unlink(filePath, () => {}); 
        console.error(`❌ İndirme Hatası (${fileName}): ${err.message}`);
    });
});