export interface ProfileConfig {
  id: number
  nom: string
  description: string
  utilite: string
  origine: 'PLIALU' | 'Baukom'
  images: {
    small: string
    medium: string
    large: string
  }
  zoom: {
    x: number
    y: number
    scale: number
    transformOrigin: string
  }
  hotspot: {
    top: string
    left: string
  }
}

export const iteProfiles: ProfileConfig[] = [
  {
    id: 1,
    nom: "Couronnement",
    description: "Profil posé en sommet de mur pour couvrir et protéger le bord supérieur de l'isolant.",
    utilite: "Empêche les infiltrations d'eau par le dessus du système ITE.",
    origine: 'PLIALU',
    images: {
      small: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830839/Couronnement-800px_knca7e.webp",
      medium: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830838/Couronnement_1200px_lleba7.webp",
      large: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830839/Couronnement-1600px_jc1kpe.webp"
    },
    zoom: { x: -12, y: 0, scale: 1.6, transformOrigin: 'top center' },
    hotspot: { top: '7%', left: '62%' }
  },
  {
    id: 2,
    nom: "Goutte d'eau entoilée",
    description: "Profil placé sous les appuis de fenêtres et aux changements de niveau de la façade.",
    utilite: "Force l'eau de ruissellement à tomber en goutte et non à couler sur la façade.",
    origine: 'Baukom',
    images: {
      small: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830839/GE-entoile%CC%81e-800px_rm0344.webp",
      medium: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830839/GE-entoi-1200px_vmylvg.webp",
      large: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830840/GE-entoile%CC%81e-1600px_gpo7rj.webp"
    },
    zoom: { x: -3, y: 0, scale: 1.6, transformOrigin: 'top center' },
    hotspot: { top: '27%', left: '53%' }
  },
  {
    id: 3,
    nom: "Cornière entoilée",
    description: "Profil en L posé sur tous les angles saillants du bâtiment et autour des ouvertures.",
    utilite: "Protège mécaniquement les angles contre les chocs et évite la fissuration de l'enduit.",
    origine: 'Baukom',
    images: {
      small: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830835/Cornie%CC%80re-entoile%CC%81e-800px_k05dg4.webp",
      medium: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830839/Cornie%CC%80re-entoile%CC%81e-1200px_d7dj1n.webp",
      large: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830835/Cornie%CC%80re-entoile%CC%81e-1600px_elm27v.webp"
    },
    zoom: { x: 0, y: -2, scale: 1.6, transformOrigin: 'center left' },
    hotspot: { top: '62%', left: '35%' }
  },
  {
    id: 4,
    nom: "Appui de fenêtre avec relevés latéraux",
    description: "Profil tablette inclinée posé à la base de chaque fenêtre, avec retours latéraux.",
    utilite: "Assure l'étanchéité sous la fenêtre et évacue les eaux de pluie vers l'extérieur.",
    origine: 'PLIALU',
    images: {
      small: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830838/Appui-800px_rq4rdp.webp",
      medium: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830833/Appui-1200px_dezc9q.webp",
      large: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830834/Appui-1600px_xrmr89.webp"
    },
    zoom: { x: -2, y: -10, scale: 1.6, transformOrigin: 'center center' },
    hotspot: { top: '72%', left: '48%' }
  },
  {
    id: 5,
    nom: "Rail de départ",
    description: "Profil horizontal posé en pied de façade, base du système ITE.",
    utilite: "Supporte les premières plaques d'isolant et crée une goutte d'eau en pied de mur.",
    origine: 'PLIALU',
    images: {
      small: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830834/Rail-depart-800px_ybm7g2.webp",
      medium: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830834/Rail-depart-1200px_eb5fq6.webp",
      large: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830834/Rail-depart-1600px_jdhka4.webp"
    },
    zoom: { x: -17, y: 0, scale: 1.6, transformOrigin: 'bottom center' },
    hotspot: { top: '88%', left: '58%' }
  },
  {
    id: 6,
    nom: "Couvre-joint PVC entoilé",
    description: "Profil posé sur les joints de dilatation du bâtiment, reste flexible.",
    utilite: "Recouvre et protège les joints de dilatation tout en absorbant les mouvements thermiques.",
    origine: 'Baukom',
    images: {
      small: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830834/CJ-PVC-entoile%CC%81-800px_hupj3w.webp",
      medium: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830834/CJ-PVC-entoile%CC%81-1200px_s2hazk.webp",
      large: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773830834/CJ-PVC-entoile%CC%81-1600px_atmojf.webp"
    },
    zoom: { x: 0, y: 0, scale: 1.6, transformOrigin: 'bottom left' },
    hotspot: { top: '80%', left: '25%' }
  }
]

export const schemaImages = {
  small: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773832608/Sche%CC%81ma-1100px_euakre.webp",
  medium: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773832608/Sche%CC%81ma-1500px_aqoufg.webp",
  large: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773832609/Sche%CC%81ma-2000px_e7obaz.webp"
}
