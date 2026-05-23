"""Mock knowledge base content for v1.

Each entry is (collection, doc_id, text, metadata).
"""

KNOWLEDGE: list[tuple[str, str, str, dict]] = [
    # --- SESS Products ---
    (
        "sess_products",
        "prod_starter",
        "Produk: SESS Starter Kit. Target: rumah tangga kecil hingga menengah (tagihan listrik Rp 300.000 - Rp 700.000 / bulan, 2-3 kamar, < 80 m²). "
        "Mencakup: 1 Whole House Energy Meter + 4 Smart Plugs + akses aplikasi mobile. "
        "Manfaat: pemantauan real-time, jadwal otomatis perangkat hemat daya. "
        "Rentang harga: Rp 2.500.000 - Rp 3.500.000. Estimasi ROI: 12-18 bulan.",
        {"collection": "sess_products", "product": "SESS Starter Kit"},
    ),
    (
        "sess_products",
        "prod_home",
        "Produk: SESS Home Pro. Target: rumah tangga menengah-besar (tagihan Rp 700.000 - Rp 1.500.000 / bulan, 3-5 kamar, 80-150 m²). "
        "Mencakup: Whole House Energy Meter + 8 Smart Plugs + 2 Smart Switches + dashboard ruangan. "
        "Manfaat: kontrol per-ruangan, deteksi perangkat boros, laporan bulanan otomatis. "
        "Rentang harga: Rp 4.500.000 - Rp 6.000.000. Estimasi ROI: 10-14 bulan.",
        {"collection": "sess_products", "product": "SESS Home Pro"},
    ),
    (
        "sess_products",
        "prod_solar",
        "Produk: SESS Solar Sync. Target: rumah yang sudah atau akan memasang panel surya (sebagian / penuh). "
        "Mencakup: SESS Home Pro + Solar Production Meter + Otonomi Energi Tracker. "
        "Manfaat: lacak persentase listrik mandiri vs PLN, optimasi waktu pakai perangkat di jam surya. "
        "Rentang harga: Rp 6.500.000 - Rp 8.500.000. Estimasi ROI: 8-12 bulan jika sudah punya panel surya.",
        {"collection": "sess_products", "product": "SESS Solar Sync"},
    ),
    (
        "sess_products",
        "prod_estate",
        "Produk: SESS Estate. Target: rumah besar (tagihan > Rp 1.500.000 / bulan, > 5 kamar atau > 150 m², 2 lantai+). "
        "Mencakup: semua fitur Home Pro + 16 Smart Plugs + 4 Smart Switches + multi-zone control + analitik AI. "
        "Manfaat: penghematan agresif untuk konsumsi tinggi, prediksi tagihan, deteksi anomali. "
        "Rentang harga: Rp 9.000.000 - Rp 12.000.000. Estimasi ROI: 10-14 bulan.",
        {"collection": "sess_products", "product": "SESS Estate"},
    ),
    # --- Savings benchmarks ---
    (
        "savings_benchmarks",
        "bench_small",
        "Benchmark penghematan SESS untuk rumah kecil (< 80 m², 2-3 kamar, tagihan Rp 300.000 - Rp 700.000): "
        "rata-rata penghematan 15-20% dari tagihan bulanan. Sumber utama penghematan: jadwal otomatis AC dan kulkas, deteksi standby power.",
        {"collection": "savings_benchmarks", "tier": "small"},
    ),
    (
        "savings_benchmarks",
        "bench_medium",
        "Benchmark penghematan SESS untuk rumah menengah (80-150 m², 3-5 kamar, tagihan Rp 700.000 - Rp 1.500.000): "
        "rata-rata penghematan 20-28% dari tagihan bulanan. Sumber utama: kontrol per-ruangan AC, optimasi pemanas air, deteksi perangkat boros.",
        {"collection": "savings_benchmarks", "tier": "medium"},
    ),
    (
        "savings_benchmarks",
        "bench_large",
        "Benchmark penghematan SESS untuk rumah besar (> 150 m² atau > 5 kamar, tagihan > Rp 1.500.000): "
        "rata-rata penghematan 25-35% dari tagihan bulanan. Sumber utama: multi-zone HVAC scheduling, analitik AI mendeteksi anomali konsumsi, pengaturan beban puncak.",
        {"collection": "savings_benchmarks", "tier": "large"},
    ),
    # --- Solar adjustments ---
    (
        "solar_adjustments",
        "solar_none",
        "Penyesuaian solar — pengguna BELUM punya panel surya: gunakan benchmark penghematan dasar tanpa modifikasi. "
        "Rekomendasikan produk non-Solar (Starter/Home Pro/Estate).",
        {"collection": "solar_adjustments", "status": "none"},
    ),
    (
        "solar_adjustments",
        "solar_partial",
        "Penyesuaian solar — pengguna punya panel surya SEBAGIAN (sebagian listrik dari surya): tambahkan 5-8% penghematan ekstra "
        "karena SESS Solar Sync mengoptimasi waktu pakai perangkat selama jam produksi surya. Rekomendasikan SESS Solar Sync.",
        {"collection": "solar_adjustments", "status": "partial"},
    ),
    (
        "solar_adjustments",
        "solar_full",
        "Penyesuaian solar — pengguna punya panel surya PENUH (mandiri energi mayoritas): tambahkan 8-12% penghematan ekstra dengan "
        "optimasi load-shifting dan tracking otonomi energi. Rekomendasikan SESS Solar Sync — fokus pada maksimasi self-consumption.",
        {"collection": "solar_adjustments", "status": "full"},
    ),
    # --- PLN tariffs ---
    (
        "pln_tariffs",
        "pln_r1_900",
        "Tarif PLN R-1/TR 900 VA non-subsidi (rumah tangga kecil): Rp 1.352 per kWh. Cocok untuk tagihan < Rp 400.000/bulan.",
        {"collection": "pln_tariffs", "tier": "R-1 900 VA"},
    ),
    (
        "pln_tariffs",
        "pln_r1_1300",
        "Tarif PLN R-1/TR 1.300 VA: Rp 1.444,70 per kWh. Cocok untuk tagihan Rp 400.000 - Rp 900.000/bulan, rumah menengah.",
        {"collection": "pln_tariffs", "tier": "R-1 1300 VA"},
    ),
    (
        "pln_tariffs",
        "pln_r1_2200",
        "Tarif PLN R-1/TR 2.200 VA: Rp 1.444,70 per kWh. Cocok untuk tagihan Rp 900.000 - Rp 1.500.000/bulan, rumah menengah-besar.",
        {"collection": "pln_tariffs", "tier": "R-1 2200 VA"},
    ),
    (
        "pln_tariffs",
        "pln_r2",
        "Tarif PLN R-2/TR 3.500 - 5.500 VA: Rp 1.699,53 per kWh. Cocok untuk rumah besar dengan tagihan Rp 1.500.000 - Rp 3.500.000/bulan.",
        {"collection": "pln_tariffs", "tier": "R-2"},
    ),
    (
        "pln_tariffs",
        "pln_r3",
        "Tarif PLN R-3/TR 6.600 VA ke atas: Rp 1.699,53 per kWh. Cocok untuk rumah mewah / multi-lantai, tagihan > Rp 3.500.000/bulan.",
        {"collection": "pln_tariffs", "tier": "R-3"},
    ),
    # --- Calculation methodology ---
    (
        "calculation_methodology",
        "calc_method",
        "Metodologi perhitungan estimasi penghematan SESS: "
        "(1) Identifikasi tier rumah berdasarkan tagihan bulanan, ukuran, dan jumlah kamar. "
        "(2) Ambil persentase penghematan rata-rata dari benchmark tier tersebut. "
        "(3) Sesuaikan dengan status panel surya (none / partial / full). "
        "(4) Estimasi penghematan bulanan = tagihan_bulanan × (persen_benchmark + penyesuaian_solar). "
        "Selalu gunakan rentang konservatif (batas bawah benchmark) jika data pengguna ambigu.",
        {"collection": "calculation_methodology"},
    ),
    # --- FAQs ---
    (
        "faqs",
        "faq_install",
        "T: Apakah instalasi SESS rumit? J: Tidak. Tim teknis SESS akan datang ke rumah Anda untuk instalasi (1-3 jam tergantung paket). "
        "Anda tidak perlu mengganti panel listrik utama — perangkat dipasang non-invasif.",
        {"collection": "faqs", "topic": "instalasi"},
    ),
    (
        "faqs",
        "faq_warranty",
        "T: Berapa lama garansinya? J: Garansi resmi 2 tahun untuk semua perangkat keras SESS, plus update aplikasi seumur hidup.",
        {"collection": "faqs", "topic": "garansi"},
    ),
    (
        "faqs",
        "faq_internet",
        "T: Apakah perlu internet? J: Ya. SESS terhubung ke aplikasi mobile via Wi-Fi rumah. Jika internet down, perangkat tetap berfungsi lokal "
        "tapi pemantauan jarak jauh tidak aktif.",
        {"collection": "faqs", "topic": "internet"},
    ),
    (
        "faqs",
        "faq_compat_solar",
        "T: Kompatibel dengan panel surya merek apa? J: SESS Solar Sync kompatibel dengan mayoritas inverter on-grid dan hybrid populer di Indonesia "
        "(SMA, Huawei, Solis, Goodwe). Konfirmasi merek inverter Anda saat konsultasi.",
        {"collection": "faqs", "topic": "kompatibilitas"},
    ),
    (
        "faqs",
        "faq_payment",
        "T: Apakah ada cicilan? J: Ya. SESS bekerja sama dengan beberapa bank untuk cicilan 0% hingga 12 bulan. Detail tersedia saat konsultasi WhatsApp.",
        {"collection": "faqs", "topic": "pembayaran"},
    ),
    (
        "faqs",
        "faq_apps",
        "T: Aplikasi tersedia di mana? J: Tersedia di App Store (iOS 14+) dan Google Play (Android 9+). Satu akun bisa dipakai banyak anggota keluarga.",
        {"collection": "faqs", "topic": "aplikasi"},
    ),
    (
        "faqs",
        "faq_data",
        "T: Apakah data saya aman? J: Data konsumsi disimpan terenkripsi di cloud regional Indonesia. Tidak dibagikan ke pihak ketiga tanpa izin.",
        {"collection": "faqs", "topic": "privasi"},
    ),
    (
        "faqs",
        "faq_savings_promise",
        "T: Berapa penghematan yang dijanjikan? J: Rata-rata pelanggan SESS menghemat 15-30% tagihan listrik bulanan, tergantung profil rumah dan kebiasaan. "
        "Estimasi personal dapat dihitung oleh chatbot ini.",
        {"collection": "faqs", "topic": "penghematan"},
    ),
    (
        "faqs",
        "faq_demo",
        "T: Bisa coba demo dulu? J: Bisa. Tim SESS menyediakan demo dashboard online dan kunjungan ke rumah klien existing (di Jakarta, Bandung, Surabaya). "
        "Hubungi via WhatsApp untuk jadwal.",
        {"collection": "faqs", "topic": "demo"},
    ),
    (
        "faqs",
        "faq_service_area",
        "T: SESS tersedia di kota mana? J: Saat ini Jabodetabek, Bandung, Surabaya, Semarang, Yogyakarta, Bali, dan Medan. "
        "Kota lain dapat dilayani dengan tambahan biaya ongkir & instalasi.",
        {"collection": "faqs", "topic": "area layanan"},
    ),
]
