import { motion } from "framer-motion";
import { Zap, Activity, Home as HomeIcon, Smartphone, Cloud, ArrowRight, ShieldCheck, BarChart3, Clock, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full overflow-hidden bg-background relative selection:bg-primary/30">
      {/* Abstract Grid Background */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-30 z-0"></div>
      
      {/* Decorative ambient glows */}
      <div className="fixed top-0 left-[20%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-[10%] w-[600px] h-[600px] rounded-full bg-secondary/10 blur-[150px] pointer-events-none z-0"></div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">SmartEnergy</span>
          </div>
          <a href="https://wa.me/6282116140638" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="hidden md:flex border-primary/30 hover:bg-primary/10 hover:text-primary transition-colors">
              Konsultasi Gratis
            </Button>
          </a>
        </div>
      </header>

      <main className="flex-1 z-10">
        {/* HERO SECTION */}
        <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="max-w-2xl"
              >
                <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-6">
                  <Activity className="w-4 h-4" />
                  Sistem Pemantauan Energi Masa Depan
                </motion.div>
                <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold leading-tight mb-6 glow-text-primary">
                  Kendali Penuh Tagihan Listrik di Tangan Anda.
                </motion.h1>
                <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  <em>Transform the lives of millions people into goodness with energy saving.</em> Pantau penggunaan listrik, kontrol perangkat di setiap ruangan, dan lacak daya mandiri yang rumah Anda hasilkan. Tekan tagihan bulanan listrik Anda tanpa repot.
                </motion.p>
                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                  <a href="https://wa.me/6282116140638" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                      Hitung Potensi Penghematan Anda
                    </Button>
                  </a>
                  <a href="#solution">
                    <Button size="lg" variant="outline" className="h-14 px-8 text-base border-white/10 hover:bg-white/5">
                      Pelajari Cara Kerjanya
                    </Button>
                  </a>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative z-10 w-full max-w-md mx-auto aspect-[4/5] rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-2xl overflow-hidden shadow-2xl p-6">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                  
                  {/* Mockup Content */}
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <p className="text-sm text-muted-foreground">Whole House Energy Meter</p>
                      <p className="text-3xl font-bold text-white mt-1">2.4 <span className="text-lg text-primary">kW</span></p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center animate-pulse">
                      <ShieldCheck className="w-6 h-6 text-secondary" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: "Living Room", power: "1.2 kW", icon: HomeIcon, color: "text-primary", bg: "bg-primary/10" },
                      { name: "Master Bedroom", power: "0.8 kW", icon: Smartphone, color: "text-secondary", bg: "bg-secondary/10" },
                      { name: "Kitchen", power: "0.4 kW", icon: Zap, color: "text-purple-400", bg: "bg-purple-400/10" },
                    ].map((room, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${room.bg}`}>
                            <room.icon className={`w-5 h-5 ${room.color}`} />
                          </div>
                          <span className="font-medium">{room.name}</span>
                        </div>
                        <span className="font-mono text-muted-foreground">{room.power}</span>
                      </div>
                    ))}
                  </div>

                  {/* Graph mockup */}
                  <div className="mt-8 h-32 w-full flex items-end justify-between gap-2">
                    {[30, 45, 20, 60, 80, 40, 25].map((h, i) => (
                      <div key={i} className="w-full bg-primary/20 rounded-t-sm relative group">
                        <div 
                          className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-1000" 
                          style={{ height: `${h}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative elements behind mockup */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl -z-10 rounded-[3rem]"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AGITATION SECTION */}
        <section className="py-24 px-6 border-y border-white/5 bg-black/20">
          <div className="container mx-auto max-w-5xl text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6 glow-text-secondary"
            >
              Mengapa Membayar Lebih untuk Listrik yang Tidak Anda Gunakan?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-12"
            >
              Mengelola rumah modern seharusnya tidak membuat dompet Anda terkuras. Namun, kenyataannya...
            </motion.p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
                  <BarChart3 className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Tagihan Listrik Membengkak</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Biaya listrik yang tinggi sering kali menjadi beban bulanan yang tidak disadari.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-secondary/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6">
                  <Clock className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Pemborosan Tanpa Sengaja</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kadang kala, kita lupa mematikan perangkat seperti AC atau lampu saat terburu-buru meninggalkan rumah.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SOLUTION SECTION */}
        <section id="solution" className="py-24 px-6 relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              Satu Aplikasi. Seluruh Rumah. <span className="text-primary glow-text-primary">Penghematan Maksimal.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground leading-relaxed"
            >
              Tinggalkan cara lama mengecek sakelar satu per satu. Sistem kami menyediakan <em>centralized control panel</em> untuk semua perangkat di rumah Anda. Melalui <em>cloud-based control panel</em>, Anda dapat memegang kendali penuh di mana pun Anda berada.
            </motion.p>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-24 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold"
              >
                Lebih Pintar, <span className="text-primary glow-text-primary">Lebih Hemat.</span>
              </motion.h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Pemantauan Daya Real-Time",
                  desc: "Lihat Whole House Energy Meter secara langsung. Identifikasi perangkat yang menyedot daya paling besar dan optimalkan penggunaannya.",
                  icon: Activity,
                  color: "primary"
                },
                {
                  title: "Lacak Kemandirian Energi (Autonomy)",
                  desc: "Punya panel surya? Sistem cerdas kami memisahkan data metrik Anda. Pantau secara real-time berapa banyak listrik yang Anda hasilkan (Generate), berapa yang Anda konsumsi (Consume), dan berapa yang masih ditarik dari PLN (From Grid). Semakin tinggi persentase Autonomy Anda, semakin aman dompet Anda!",
                  icon: SunMedium,
                  color: "secondary"
                },
                {
                  title: "Manajemen Cerdas Berbasis Ruangan",
                  desc: "Kelola rumah Anda per zona. Pantau dan matikan atau nyalakan perangkat secara spesifik di ruangan mana pun, dari Living Room, Master Bedroom, hingga Kitchen.",
                  icon: HomeIcon,
                  color: "primary"
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 hover:bg-white/10 transition-all overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:scale-110 text-${feature.color}`}>
                    <feature.icon className="w-32 h-32" />
                  </div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-${feature.color}/10 border border-${feature.color}/20`}>
                    <feature.icon className={`w-7 h-7 text-${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-24 px-6 bg-black/40 border-y border-white/5">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold">Tiga Langkah Menuju <span className="text-primary glow-text-primary">Rumah Pintar</span></h2>
            </div>
            
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-primary/0 via-primary/50 to-secondary/0 hidden md:block -translate-y-1/2"></div>
              
              <div className="grid md:grid-cols-3 gap-12 relative z-10">
                {[
                  {
                    step: "01",
                    title: "Instalasi Mudah",
                    desc: "Pasang perangkat keras pintar kami di panel atau sakelar rumah Anda.",
                    icon: Zap
                  },
                  {
                    step: "02",
                    title: "Integrasi Platform",
                    desc: "Hubungkan semua ruangan dan perangkat ke dalam satu aplikasi cerdas kami.",
                    icon: Cloud
                  },
                  {
                    step: "03",
                    title: "Kendali Penuh",
                    desc: "Perangkat keras dapat langsung dikontrol secara jarak jauh dengan smartphone.",
                    icon: Smartphone
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-background border-2 border-white/10 flex items-center justify-center mb-6 relative group hover:border-primary transition-colors shadow-xl">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <item.icon className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-primary/20 blur-[150px] rounded-t-full pointer-events-none"></div>
          
          <div className="container mx-auto max-w-3xl text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Siap Memangkas Tagihan Listrik Anda Bulan Depan?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
            >
              Bergabunglah dengan pemilik rumah cerdas lainnya yang telah memaksimalkan efisiensi energi dan kemandirian daya mereka.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a href="https://wa.me/6282116140638" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                  Konsultasi Gratis Sekarang <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black/60 relative z-10">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg">SmartEnergy</span>
            </div>
            <p className="text-muted-foreground text-sm text-center md:text-left">
              Membangun rumah cerdas dan hemat energi untuk keluarga Indonesia.
            </p>
            <div className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} SmartEnergy & Saving System. Hak Cipta Dilindungi.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
