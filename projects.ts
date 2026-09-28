export type ProjectImage = { src: string; srcset: string; width?: number; height?: number };

export type Project = {
  id: string;
  slug: string;
  title: string;
  name: string;
  city: string;
  year: string;
  tag: string;
  context: string;
  system: string;
  material: string;
  finish?: string;
  bullets: string[];
  figures: unknown[];
  mainImg: ProjectImage;
  gallery: ProjectImage[];
};

export const PROJECTS: Project[] = [
  {
    id: "cae-lyon",
    slug: "cae-lyon",
    name: "CAE – Lyon 3",
    system: "Façade complète et ossatures",
    material: "Galva, alu 20/10, inox recuit brillant",
    finish: "Golden Beach (AKZO NOBEL), RAL 9003",
    title: "CAE –\nLyon 3",
    city: "Lyon",
    year: "2023",
    tag: "ENVELOPPE BÂTIMENT",
    context: "Façade complète & ossatures GALVA\nAlu 20/10 teinte Golden Beach – AKZO NOBEL – Alu 20/10 RAL 9003 & Inox recuit brillant",
    bullets: [],
    figures: [],
    mainImg: {
      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771517735/CAE-1200px_cdhouc.webp",
      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771517735/CAE-800px_qbsmn7.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771517735/CAE-1200px_cdhouc.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771517735/CAE-1600px_fnjqom.webp 1600w",
      width: 1200,
      height: 799
    },
    gallery: [
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771518042/CAE2-1200px_sr3dgl.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771518042/CAE2-800px_vdpclz.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771518042/CAE2-1200px_sr3dgl.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771518043/CAE2-1600px_zy3fgw.webp 1600w",
        width: 1200,
        height: 1600
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE3-1200px_ppn5ny.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE3-800px_gwscnh.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE3-1200px_ppn5ny.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE3-1600px_xan9en.webp 1600w",
        width: 1200,
        height: 1600
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE4-1200px_bn46ch.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE4-800px_ue2hxt.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE4-1200px_bn46ch.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE4-1600px_hd9e2x.webp 1600w",
        width: 1200,
        height: 900
      }
    ]
  },
  {
    id: "zento-grenoble",
    slug: "zento-grenoble",
    name: "ZENTO – Grenoble",
    system: "Cassettes et habillages",
    material: "Alu 20/10",
    finish: "Copper (ARCONIC)",
    title: "ZENTO –\nGrenoble",
    city: "Grenoble",
    year: "2023",
    tag: "INFRASTRUCTURE",
    context: "Cassettes et divers habillages\nAlu 20/10 teinte Copper – ARCONIC",
    bullets: [],
    figures: [],
    mainImg: {
      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521475/ZENTO1-1200px_w66src.webp",
      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521475/ZENTO1-800px_qdiule.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521475/ZENTO1-1200px_w66src.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521475/ZENTO1-1600px_jzf8p6.webp 1600w",
      width: 1200,
      height: 670
    },
    gallery: [
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521598/ZENTO2-1200px_qbazyy.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521598/ZENTO2-800px_f5tlje.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521598/ZENTO2-1200px_qbazyy.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521599/ZENTO2-1600px_b21uca.webp 1600w",
        width: 1200,
        height: 1391
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949058/ZENTO3-1200px_yxeeg4.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949057/ZENTO3-800px_ns6mdx.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949058/ZENTO3-1200px_yxeeg4.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949058/ZENTO3-1600px_jmjum8.webp 1600w",
        width: 1200,
        height: 675
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949058/ZENTO4-900px_dfrnpd.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949058/ZENTO4-800px_xx1due.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949058/ZENTO4-900px_dfrnpd.webp 900w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949058/ZENTO4-1000px_p8wclq.webp 1000w",
        width: 900,
        height: 900
      }
    ]
  },
  {
    id: "bureau-le-e",
    slug: "bureau-le-e",
    name: "Bureau Le E – Annecy",
    system: "Cassettes et embrasures de fenêtres",
    material: "Alu 20/10",
    finish: "WhiteGold (ARCONIC), RAL 7012",
    title: "Bureau Le E –\nAnnecy",
    city: "Annecy",
    year: "2024",
    tag: "AMÉNAGEMENT TERTIAIRE",
    context: "Cassettes & embrasures fenêtres\nAlu 20/10 teinte WhiteGold – ARCONIC – Alu 20/10 RAL 7012",
    bullets: [],
    figures: [],
    mainImg: {
      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950836/BureauleE-1200px_lnhelx.webp",
      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950836/BureauleE-1200px_lnhelx.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950837/BureauleE-1600px_e6bjlf.webp 1600w",
      width: 1200,
      height: 556
    },
    gallery: [
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950837/BureauLeE2-1200px_tuijwj.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950836/BureauLeE2-800px_agi9kx.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950837/BureauLeE2-1200px_tuijwj.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950837/BureauLeE2-1600px_qfjcl7.webp 1600w",
        width: 1200,
        height: 1674
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950840/BureauleE3-1200px_fbq7tc.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950839/BureauleE3-800px_qlojmp.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950840/BureauleE3-1200px_fbq7tc.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950840/BureauleE3-1600px_by8yfo.webp 1600w",
        width: 1200,
        height: 1600
      }
    ]
  },
  {
    id: "welink-lyon",
    slug: "welink-lyon",
    name: "WeLink – Lyon 7",
    system: "Cassettes et embrasures",
    material: "Alu 20/10",
    finish: "Copper DS 0010 (ADAPTA)",
    title: "WeLink –\nLyon 7",
    city: "Lyon",
    year: "2023",
    tag: "ENVELOPPE BÂTIMENT",
    context: "Cassettes & Embrasures\nAlu 20/10 teinte Copper DS 0010 – ADAPTA",
    bullets: [],
    figures: [],
    mainImg: {
      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772021847/Welink-1200px_mu1jnb.webp",
      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772021847/Welink-800px_baz4br.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772021847/Welink-1200px_mu1jnb.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772021847/Welink-1600px_ewa46q.webp 1600w",
      width: 1200,
      height: 896
    },
    gallery: [
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022202/Welink2-1200_jwu2kg.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022202/Welink2-800px_qcsvgi.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022202/Welink2-1200_jwu2kg.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022203/Welink2-1600px_gwf5ps.webp 1600w",
        width: 1200,
        height: 1607
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022204/Welink3-1200px_txkxlg.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022203/Welink3-800px_gcjpgc.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022204/Welink3-1200px_txkxlg.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022205/Welink3-1600px_bhbrah.webp 1600w",
        width: 1200,
        height: 1600
      }
    ]
  },
  {
    id: "odyssey-venissieux",
    slug: "odyssey-venissieux",
    name: "ODYSSEY – Vénissieux",
    system: "Cassettes et corniches",
    material: "Alu anodisé",
    title: "ODYSSEY –\nVénissieux",
    city: "Vénissieux",
    year: "2022",
    tag: "ENVELOPPE BÂTIMENT",
    context: "Cassettes et corniches\nAlu Anodisé",
    bullets: [],
    figures: [],
    mainImg: {
      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022576/Odyssey-1200px_no3wvs.webp",
      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022576/Odyssey-800px_avcotk.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022576/Odyssey-1200px_no3wvs.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022577/Odyssey-1600px_tyiqrw.webp 1600w",
      width: 1200,
      height: 1607
    },
    gallery: [
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022578/Odyssey2-1000px_ykklhf.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022577/Odyssey2-800px_leqwve.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022578/Odyssey2-1000px_ykklhf.webp 1000w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022579/Odyssey2-1300px_dath5e.webp 1300w",
        width: 1000,
        height: 1250
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022581/Odyssey3-1200px_ys8g6a.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022580/Odyssey3-800px_ozd9cr.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022581/Odyssey3-1200px_ys8g6a.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022582/Odyssey3-1500px_abgjsc.webp 1500w",
        width: 1200,
        height: 1600
      }
    ]
  },
  {
    id: "lycee-delorme",
    slug: "lycee-delorme",
    name: "Lycée DELORME – L'Isle-d'Abeau",
    system: "Cassettes architecturales poinçonnées sur mesure",
    material: "Alu 20/10",
    finish: "RAL 9003",
    title: "Lycée DELORME –\nL'Isle-d'Abeau",
    city: "L'Isle-d'Abeau",
    year: "2021",
    tag: "INFRASTRUCTURE SCOLAIRE",
    context: "Cassettes architecturales poinçonnées sur-mesure\nAlu 20/10 RAL 9003",
    bullets: [],
    figures: [],
    mainImg: {
      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772023237/Delorme-1200w-1600h_stzzy6.webp",
      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772023237/Delorme-800px_w_qyojcr.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772023237/Delorme-1200w-1600h_stzzy6.webp 1200w",
      width: 1200,
      height: 1600
    },
    gallery: [
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772023238/Delorme2-1000px_pbjbv6.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772023238/Delorme2-800px_rthkko.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772023238/Delorme2-1000px_pbjbv6.webp 1000w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772023240/Delorme2-1400px_cf8jjj.webp 1400w",
        width: 1000,
        height: 1333
      }
    ]
  },
  {
    id: "le-binome-meylan",
    slug: "le-binome-meylan",
    name: "LE BINÔME – Meylan",
    system: "Cassettes",
    material: "Alu 20/10",
    finish: "RAL 9001 et 7022",
    title: "LE BINÔME –\nMeylan",
    city: "Meylan",
    year: "2025",
    tag: "ENVELOPPE BÂTIMENT",
    context: "Cassettes\nAlu 20/10 RAL 9001 & 7022",
    bullets: [],
    figures: [],
    mainImg: {
      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024165/Binome-1200px_qkj7mo.webp",
      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024164/Binome-800px_yp6iyd.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024165/Binome-1200px_qkj7mo.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024166/Binome-1600px_t9ezo1.webp 1600w",
      width: 1200,
      height: 800
    },
    gallery: [
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024172/Binome2-1200px_acuij5.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024167/Binome2-800px_izeja2.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024172/Binome2-1200px_acuij5.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024168/Binome2-1600px_uqtoij.webp 1600w",
        width: 1200,
        height: 800
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024170/Binome3-1200px_myhlcp.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024169/Binome3-800px_bcseb7.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024170/Binome3-1200px_myhlcp.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024171/Binome3-1600px_ekj7au.webp 1600w",
        width: 1200,
        height: 2132
      }
    ]
  },
  {
    id: "iut-lyon-1",
    slug: "iut-lyon-1",
    name: "IUT LYON 1 – Villeurbanne",
    system: "Précadres soudés de fenêtres, angles cintrés",
    material: "Acier 15/10 galva",
    finish: "Post-laquage RAL 5005",
    title: "IUT LYON 1 –\nVilleurbanne",
    city: "Villeurbanne",
    year: "2024",
    tag: "INFRASTRUCTURE SCOLAIRE",
    context: "Précadres soudés de fenêtres avec angles cintrés\nAcier 15/10 Galva + post-laquage RAL 5005",
    bullets: [],
    figures: [],
    mainImg: {
      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024666/IUT-1000px_dfobep.webp",
      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024666/IUT-800px_uzbk7y.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024666/IUT-1000px_dfobep.webp 1000w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024667/IUT-1350px_vzgsip.webp 1350w",
      width: 1000,
      height: 666
    },
    gallery: [
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024671/IUT3-1200px_imymvc.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024670/IUT3-800px_airmf3.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024671/IUT3-1200px_imymvc.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024672/IUT3-1600px_v3fs37.webp 1600w",
        width: 1200,
        height: 900
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024670/IUT2-1000px_jy3ixk.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024668/IUT2-800px_thggsu.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024670/IUT2-1000px_jy3ixk.webp 1000w",
        width: 1000,
        height: 666
      }
    ]
  },
  {
    id: "voisin-lyon",
    slug: "voisin-lyon",
    name: "VOISIN – Lyon 9",
    system: "Cassettes intérieures (siège social)",
    material: "Alu 20/10",
    finish: "Tasilaq Sable YW2304I (AKZO NOBEL)",
    title: "VOISIN –\nLyon 9",
    city: "Lyon",
    year: "2024",
    tag: "CASSETTES INTÉRIEURES",
    context: "Cassettes intérieures – Siège social Voisin\nAlu 20/10 teinte Tasilaq Sable YW2304I – AKZO NOBEL",
    bullets: [],
    figures: [],
    mainImg: {
      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025154/Voisin-1200px_ijhnru.webp",
      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025154/Voisin-800px_fuwtrc.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025154/Voisin-1200px_ijhnru.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025155/Voisin-1500px_nfhbwn.webp 1500w",
      width: 1200,
      height: 842
    },
    gallery: [
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025158/Voisin2-1200px_onphxp.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025158/Voisin2-800px_blcc7r.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025158/Voisin2-1200px_onphxp.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025158/Voisin2-1500px_dkkryk.webp 1500w",
        width: 1200,
        height: 1600
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025161/Voisin3-1200px_loppcz.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025160/Voisin3-800px_vlnobd.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025161/Voisin3-1200px_loppcz.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025162/Voisin3-1500px_t8ocr4.webp 1500w",
        width: 1200,
        height: 1600
      }
    ]
  },
  {
    id: "incurve-dardilly",
    slug: "incurve-dardilly",
    name: "INCURVE – Dardilly",
    system: "Cassettes",
    material: "Alu",
    finish: "RAL 7022",
    title: "INCURVE –\nDardilly",
    city: "Dardilly",
    year: "2022",
    tag: "ENVELOPPE BÂTIMENT",
    context: "Cassettes\nAlu RAL 7022",
    bullets: [],
    figures: [],
    mainImg: {
      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034002/Incurve-1200px_fnikjw.webp",
      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034001/Incurve-800px_dy2zys.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034002/Incurve-1200px_fnikjw.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034004/Incurve-1600px_qfkpgk.webp 1600w",
      width: 1200,
      height: 675
    },
    gallery: [
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034006/Incurve2-1200px_mlw60j.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034005/Incurve2-800px_okqd0h.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034006/Incurve2-1200px_mlw60j.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034008/Incurve2-1600px_zxwtqr.webp 1600w",
        width: 1200,
        height: 1646
      }
    ]
  },
  {
    id: "alpina-seyssinet",
    slug: "alpina-seyssinet",
    name: "ALPINA – Seyssinet",
    system: "Cassettes",
    material: "Alu 20/10",
    finish: "RAL 7021, Golden Beach (AKZO NOBEL)",
    title: "ALPINA –\nSeyssinet",
    city: "Seyssinet",
    year: "2021",
    tag: "ENVELOPPE BÂTIMENT",
    context: "Cassettes\nAlu 20/10 RAL 7021 & teinte Golden Beach – AKZO NOBEL",
    bullets: [],
    figures: [],
    mainImg: {
      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034486/Alpina-1200px_xja4fb.webp",
      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034486/Alpina-800px_vvnv2g.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034486/Alpina-1200px_xja4fb.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034488/Alpina-1600px_iyjnz6.webp 1600w",
      width: 1200,
      height: 810
    },
    gallery: [
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034492/Alpina2-1200px_muu0jg.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034490/Alpina2-800px_czpkbe.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034492/Alpina2-1200px_muu0jg.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034494/Alpina2-1600px_njhwi7.webp 1600w",
        width: 1200,
        height: 675
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034499/Alpina3-1200px_z8gy7n.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034496/Alpina3-800px_qd9l3u.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034499/Alpina3-1200px_z8gy7n.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034500/Alpina3-1600px_vs13lp.webp 1600w",
        width: 1200,
        height: 1421
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034503/Alpina4-1200px_h1t2sb.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034502/Alpina4-800px_wisl3f.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034503/Alpina4-1200px_h1t2sb.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034505/Alpina4-1600px_piloq2.webp 1600w",
        width: 1200,
        height: 567
      }
    ]
  },
  {
    id: "bataille",
    slug: "bataille-lyon-8",
    name: "Bataille – Lyon 8",
    system: "Cassettes perforées et bavettes",
    material: "Aluminium",
    finish: "RAL 7034",
    title: "Bataille – Lyon 8",
    city: "Lyon",
    year: "2020",
    tag: "ENVELOPPE BÂTIMENT",
    context: "Cassettes perforées et bavettes en aluminium RAL 7034.\nTravail sur éléments perforés et protections de façade associant technicité, ventilation et finition architecturale.",
    bullets: [],
    figures: [],
    mainImg: {
      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035499/Bataille-1200px_iied0g.webp",
      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035497/Bataille-800px_mextnn.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035499/Bataille-1200px_iied0g.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035500/Bataille-1600px_afmbmz.webp 1600w",
      width: 1200,
      height: 811
    },
    gallery: [
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035504/Bataille2-1200px_xbd2ga.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035502/Bataille2-800px_by9hei.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035504/Bataille2-1200px_xbd2ga.webp 1200w",
        width: 1200,
        height: 1686
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035507/Bataille3-1200px_cb5owq.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035505/Bataille3-800_w9pryy.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035507/Bataille3-1200px_cb5owq.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035509/Bataille3-1600px_qig9ho.webp 1600w",
        width: 1200,
        height: 1055
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035512/Bataille4-1200px_aiwowm.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035510/Bataille4-800px_ngcwkq.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035512/Bataille4-1200px_aiwowm.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035515/Bataille4-1600px_tnz6wx.webp 1600w",
        width: 1200,
        height: 900
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035517/Bataille5-1200px_urkxh9.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035516/Bataille5-800px_x6wgwx.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035517/Bataille5-1200px_urkxh9.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035520/Bataille5-1600px_ykuiv8.webp 1600w",
        width: 1200,
        height: 1600
      }
    ]
  },
  {
    id: "nexity",
    slug: "le-quartz-grand-parilly",
    name: "LE QUARTZ – Grand Parilly",
    system: "Clins, encadrements, habillages de balcons et couvertines",
    material: "Alu",
    finish: "Anodic Gold (AXALTA)",
    title: "LE QUARTZ –\nGrand Parilly",
    city: "Grand Parilly",
    year: "2023",
    tag: "ENVELOPPE BÂTIMENT",
    context: "Clins, encadrements, habillages balcons & couvertines\nAlu teinte Anodic Gold – AXALTA",
    bullets: [],
    figures: [],
    mainImg: {
      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037000/Nexity-1200px_g8svfo.webp",
      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772036998/Nexity-800px_kstdls.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037000/Nexity-1200px_g8svfo.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037003/Nexity-1500px_nt4an0.webp 1500w",
      width: 1200,
      height: 1600
    },
    gallery: [
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037006/Nexity2-1200px_uymlvt.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037004/Nexity2-800px_dqxfiy.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037006/Nexity2-1200px_uymlvt.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037008/Nexity2-1500px_kseshd.webp 1500w",
        width: 1200,
        height: 1600
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037011/Nexity3-1000px_aw92dv.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037009/Nexity3-800px_swmvse.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037011/Nexity3-1000px_aw92dv.webp 1000w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037014/Nexity3-1250px_pbtmug.webp 1250w",
        width: 1000,
        height: 876
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037017/Nexity4-1200px_vkxldt.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037016/Nexity4-800px_alqsqg.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037017/Nexity4-1200px_vkxldt.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037019/Nexity4-1500px_p581ck.webp 1500w",
        width: 1200,
        height: 1600
      },
      {
        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037023/Nexity5-1200px_jvfvdd.webp",
        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037021/Nexity5-800px_lgr1d9.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037023/Nexity5-1200px_jvfvdd.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037025/Nexity5-1500px_udzg1s.webp 1500w",
        width: 1200,
        height: 1600
      }
    ]
  }
];

export const getProjectImages = (p: Project): ProjectImage[] => [p.mainImg, ...p.gallery];

export const getProjectImageAlt = (p: Project, index: number): string =>
  `${p.name} : ${p.system.toLowerCase()}, photo ${index + 1} sur ${getProjectImages(p).length}`;
