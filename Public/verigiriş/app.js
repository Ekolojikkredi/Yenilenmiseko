// Veri girişi işlemi
app.post('/veri-girisi', (req, res) => {
    const { ogrenci_id, atik_turu, miktar, dogru_ayristirma, teslim_alan } = req.body;
    const puan = miktar * 10; // Örnek puan hesaplaması
    db.run(`INSERT INTO atiklar (ogrenci_id, atik_turu, miktar, puan, dogru_ayristirma, teslim_alan) VALUES (?, ?, ?, ?, ?, ?)`,
        [ogrenci_id, atik_turu, miktar, puan, dogru_ayristirma, teslim_alan],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            db.run(`UPDATE ogrenciler SET puan = puan + ? WHERE id = ?`, [puan, ogrenci_id], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                res.send('Veri başarıyla girildi!');
            });
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
