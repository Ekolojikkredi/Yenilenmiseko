document.getElementById('veri-girisi').addEventListener('click', function() {
    let veriGirisiForm = `
        <h2>Veri Girişi</h2>
        <form action="/veri-girisi" method="post">
            <label for="ogrenci_id">Öğrenci ID:</label>
            <input type="number" id="ogrenci_id" name="ogrenci_id" required><br>
            <label for="atik_turu">Atık Türü:</label>
            <select id="atik_turu" name="atik_turu" required>
                <option value="kağıt">Kağıt</option>
                <option value="plastik">Plastik</option>
                <option value="cam">Cam</option>
                <option value="metal">Metal</option>
                <option value="elektronik">Elektronik</option>
                <option value="yağ">Yağ</option>
                <option value="tekstil">Tekstil</option>
            </select><br>
            <label for="miktar">Miktar (kg):</label>
            <input type="number" id="miktar" name="miktar" step="0.01" required><br>
            <label for="dogru_ayristirma">Doğru Ayrıştırma:</label>
            <select id="dogru_ayristirma" name="dogru_ayristirma" required>
                <option value="1">Evet</option>
                <option value="0">Hayır</option>
            </select><br>
            <label for="teslim_alan">Teslim Alan:</label>
            <input type="text" id="teslim_alan" name="teslim_alan" required><br>
            <button type="submit">Veri Girişi</button>
        </form>
    `;
    document.querySelector('.right-column').innerHTML = veriGirisiForm;
});
