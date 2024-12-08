const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Veritabanı bağlantısı
let db = new sqlite3.Database('./ekolojik_kredi.db', (err) => {
    if (err) {
        console.error('SQLite bağlantısı başarısız:', err);
    } else {
        console.log('SQLite bağlantısı başarılı');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Öğrenci kayıt işlemi
app.post('/kayit-ol', (req, res) => {
    const { isim, soyisim, il, ilce, okul, okul_numarasi, email } = req.body;
    const puan = 0;
    db.run(`INSERT INTO ogrenciler (isim, soyisim, il, ilce, okul, okul_numarasi, email, puan) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [isim, soyisim, il, ilce, okul, okul_numarasi, email, puan],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            res.send('Kayıt başarıyla tamamlandı!');
        });
});

// Veritabanını başlatma ve tabloları oluşturma
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS ogrenciler (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        isim TEXT,
        soyisim TEXT,
        il TEXT,
        ilce TEXT,
        okul TEXT,
        okul_numarasi TEXT,
        email TEXT,
        puan INTEGER DEFAULT 0
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS atiklar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ogrenci_id INTEGER,
        atik_turu TEXT,
        miktar REAL,
        puan INTEGER,
        dogru_ayristirma INTEGER,
        teslim_alan TEXT,
        FOREIGN KEY (ogrenci_id) REFERENCES ogrenciler(id)
    )`);
});
