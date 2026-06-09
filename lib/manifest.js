(function () {
  "use strict";
  window.__PENUMBRA__ = {
    brand: {
      name: "Penumbra",
      tagline: "Donde la noche baja la voz.",
      slogan: "Un bar para que la noche dure de verdad.",
      type: "Bar de copas · Coctelería de autor",
      address: "Calle del Pez 18",
      neighborhood: "Malasaña, Madrid",
      metro: "Noviciado / Tribunal",
      phone: "910 22 33 44",
      whatsapp: "34910223344",
      instagram: "penumbra.madrid",
      instagramUrl: "https://instagram.com/penumbra.madrid",
      hours: "Miércoles a domingo",
      hoursDetail: "19:00 → 02:30",
      established: "EST. 2024 · MAD",
      capacity: "60 personas",
      reservationNote: "Recomendada jue–sáb"
    },
    cocktails: [
      {
        id: "penumbra",
        name: "Penumbra",
        series: "Casa",
        glass: "coupe",
        subtitle: "La copa de la casa",
        ingredients: ["Mezcal ahumado", "Vermut oscuro", "Toque de café"],
        description: "Ahumado, amargo y largo. Un sorbo lento para empezar la noche en su tono justo. Copa coupe sobre hielo de mano.",
        liquidColor: "#7a2a1c",
        accentColor: "#FF3D8B"
      },
      {
        id: "neon",
        name: "Neón",
        series: "Casa",
        glass: "highball",
        subtitle: "Gin tonic de autor",
        ingredients: ["Ginebra cítrica", "Tónica seca", "Piel de pomelo"],
        description: "Burbuja viva, cítrico afilado y un brillo que recuerda al letrero de la entrada. Highball alto, hielo limpio.",
        liquidColor: "#3DE2FF",
        accentColor: "#3DE2FF"
      },
      {
        id: "medianoche",
        name: "Medianoche",
        series: "Casa",
        glass: "martini",
        subtitle: "Espresso martini",
        ingredients: ["Espresso reciente", "Vodka", "Licor de café"],
        description: "Café recién hecho y vodka helado, batido hasta dejar la espuma del color del cobre. Para la hora en que la pista calienta.",
        liquidColor: "#1c0e08",
        accentColor: "#C9A35B"
      },
      {
        id: "brasa",
        name: "Brasa",
        series: "Casa",
        glass: "old_fashioned",
        subtitle: "Negroni con tequila",
        ingredients: ["Tequila reposado", "Campari", "Vermut rojo"],
        description: "Negroni reescrito con el ahumado del tequila reposado. Old fashioned, hielo macizo, piel de naranja quemada al pase.",
        liquidColor: "#b73422",
        accentColor: "#FF3D8B"
      },
      {
        id: "vermut-negro",
        name: "Vermut Negro",
        series: "Temporada",
        glass: "rocks",
        subtitle: "Vermut largo de la casa",
        ingredients: ["Vermut casa", "Naranja confitada", "Hielo macizo"],
        description: "Vermut servido sobre hielo de mano, con una naranja confitada en la propia barra. Pensado para los que entran y aún no piden.",
        liquidColor: "#3a1a0e",
        accentColor: "#C9A35B"
      },
      {
        id: "sereno",
        name: "Sereno",
        series: "Temporada",
        glass: "wine",
        subtitle: "Spritz oscuro",
        ingredients: ["Aperol", "Cava seco", "Soda"],
        description: "Spritz reescrito en clave nocturna. Aperol, cava seco y soda fría. Para empezar sin pesar.",
        liquidColor: "#cc4a26",
        accentColor: "#FF3D8B"
      },
      {
        id: "aurora",
        name: "Aurora",
        series: "Temporada",
        glass: "flute",
        subtitle: "French 75 con vermut",
        ingredients: ["Cava brut", "Ginebra", "Limón"],
        description: "Cava, ginebra y un toque de vermut blanco. Sube rápido, baja despacio.",
        liquidColor: "#e8c780",
        accentColor: "#C9A35B"
      },
      {
        id: "ultima-hora",
        name: "Última Hora",
        series: "Temporada",
        glass: "mug",
        subtitle: "Café final de noche",
        ingredients: ["Espresso", "Ron añejo", "Crema"],
        description: "Para los que se quedan al cierre. Espresso, ron añejo y una nube de crema. Servido en taza pequeña.",
        liquidColor: "#1a0d05",
        accentColor: "#C9A35B"
      },
      {
        id: "veneno",
        name: "Veneno",
        series: "Temporada",
        glass: "snifter",
        subtitle: "Pisco sour de la casa",
        ingredients: ["Pisco", "Limón", "Cardamomo"],
        description: "Pisco peruano, limón y un golpe de cardamomo verde. Suave en boca, largo en cabeza.",
        liquidColor: "#d8c272",
        accentColor: "#3DE2FF"
      },
      {
        id: "vertigo",
        name: "Vértigo",
        series: "Temporada",
        glass: "hurricane",
        subtitle: "Mai tai oscuro",
        ingredients: ["Ron añejo", "Curaçao seco", "Lima"],
        description: "Mai tai reescrito con ron añejo y curaçao seco. La copa que se pide cuando ya hay confianza.",
        liquidColor: "#a8341a",
        accentColor: "#FF3D8B"
      }
    ],
    sessions: [
      { day: "Jueves",  genre: "Soul & Funk",             tagline: "Vinilo entero, sin prisa.",                icon: "vinyl", accent: "#C9A35B" },
      { day: "Viernes", genre: "House",                   tagline: "Selección de la casa.",               icon: "house", accent: "#FF3D8B" },
      { day: "Sábado", genre: "Disco & Nu-Disco",    tagline: "Pista llena, pies sueltos.",               icon: "disco", accent: "#3DE2FF" },
      { day: "Domingo", genre: "Jazz & Electrónica suave", tagline: "Sesión lenta para cerrar la semana.", icon: "wave", accent: "#C9A35B" }
    ],
    gallery: [
      { src: "assets/img/gal-1.jpg",   alt: "Cóctel con humo" },
      { src: "assets/img/gal-2.jpg",   alt: "Whisky en macro" },
      { src: "assets/img/gal-3.jpg",   alt: "Señal neón nocturna" },
      { src: "assets/img/gal-4.jpg",   alt: "Bartender con coctelera" },
      { src: "assets/img/gal-5.jpg",   alt: "Hielo en macro" },
      { src: "assets/img/gal-6.jpg",   alt: "Burbujas de cava" },
      { src: "assets/img/gal-7.jpg",   alt: "Interior del local" },
      { src: "assets/img/gal-8.jpg",   alt: "Gin tonic con cítricos" },
      { src: "assets/img/gal-9.jpg",   alt: "Café y cóctel" },
      { src: "assets/img/gal-11.jpg",  alt: "Barra de bar nocturna" },
      { src: "assets/img/gal-12.jpg",  alt: "Martini oscuro" },
      { src: "assets/img/local-1.jpg", alt: "Interior Penumbra" },
      { src: "assets/img/local-2.jpg", alt: "Cóctel con luz neón" },
      { src: "assets/img/local-3.jpg", alt: "Lounge de bar" },
      { src: "assets/img/hero.jpg",    alt: "Bar Penumbra ambiente" },
      { src: "assets/img/events.jpg",  alt: "Evento en Penumbra" }
    ]
  };
})();
