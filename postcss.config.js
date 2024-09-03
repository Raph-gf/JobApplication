module.exports = {
  plugins: [
    require("autoprefixer"), // Ajoute des préfixes CSS pour la compatibilité entre navigateurs
    require("cssnano"), // Minifie le CSS pour la production
    require("postcss-pxtorem")({
      propList: ["*"], // Convertit les unités px en rem pour toutes les propriétés
    }),
  ],
};
