export const translations = {
  en: {
    dashboard: {
      map: "Map View",
      list: "List View",
      saved: "Saved",
      reviews: "Reviews",
      profile: "Profile"
    },
    profile: {
      settings: "Settings",
      manage_prefs: "Manage your preferences",
      edit_profile: "Edit Profile",
      share_stats: "Share Stats",
      account_info: "Account Information",
      accessibility: "Accessibility",
      app_settings: "App Settings",
      language: "Language",
      dark_mode: "Dark Mode",
      offline_maps: "Offline Maps"
    },
    bathrooms: {
      available: "Available Restrooms",
      locations_found: "premium locations found near you",
      sort_distance: "Sort by Distance",
      sort_rating: "Sort by Rating"
    }
  },
  fr: {
    dashboard: {
      map: "Carte",
      list: "Liste",
      saved: "Enregistrés",
      reviews: "Avis",
      profile: "Profil"
    },
    profile: {
      settings: "Paramètres",
      manage_prefs: "Gérez vos préférences",
      edit_profile: "Modifier le profil",
      share_stats: "Partager les stats",
      account_info: "Informations du compte",
      accessibility: "Accessibilité",
      app_settings: "Paramètres de l'app",
      language: "Langue",
      dark_mode: "Mode Sombre",
      offline_maps: "Cartes Hors Ligne"
    },
    bathrooms: {
      available: "Toilettes Disponibles",
      locations_found: "lieux premium trouvés près de chez vous",
      sort_distance: "Trier par Distance",
      sort_rating: "Trier par Note"
    }
  },
  es: {
    dashboard: {
      map: "Mapa",
      list: "Lista",
      saved: "Guardados",
      reviews: "Reseñas",
      profile: "Perfil"
    },
    profile: {
      settings: "Ajustes",
      manage_prefs: "Gestiona tus preferencias",
      edit_profile: "Editar Perfil",
      share_stats: "Compartir Estadísticas",
      account_info: "Información de la Cuenta",
      accessibility: "Accesibilidad",
      app_settings: "Ajustes de la App",
      language: "Idioma",
      dark_mode: "Modo Oscuro",
      offline_maps: "Mapas Sin Conexión"
    },
    bathrooms: {
      available: "Baños Disponibles",
      locations_found: "lugares premium encontrados cerca de ti",
      sort_distance: "Ordenar por Distancia",
      sort_rating: "Ordenar por Puntuación"
    }
  }
};

export type Language = 'en' | 'fr' | 'es';
export type TranslationKey = keyof typeof translations.en;
