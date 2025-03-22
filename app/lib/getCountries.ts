import countries from "world-countries";

// Formatage des pays avec les propriétés nécessaires
const countriesFormatted = countries.map((item) => ({
    value: item.cca2, // Code pays (ex: "FR" pour la France)
    label: item.name.common, // Nom du pays
    flag: item.flag, // Emoji du drapeau
    latLang: item.latlng, // Coordonnées latitude/longitude
    region: item.region, // Région (ex: Europe, Afrique, Asie)
}));

// Hook pour récupérer les pays
export const useCountries = () => {
    const getAllCountries = () => countriesFormatted;

    return {
        getAllCountries,
        getCountryByValue, // On réutilise la fonction exportée
    };
};

// Fonction pour récupérer un pays par sa valeur (code cca2)
export function getCountryByValue(value: string) {
    return countriesFormatted.find((country) => country.value === value);
}
