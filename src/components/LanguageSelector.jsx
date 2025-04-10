import { useTranslation } from "react-i18next";

const LanguageSwitcher = (selected) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    console.log("changeLanguage", lang)
    i18n.changeLanguage(lang);
  };

  return (
    <select onChange={(e) => changeLanguage(e.target.value)} value={selected}>
      <option value="en">English</option>
      {/* <option value="es">Spanish</option> */}
      {/* <option value="fr">French</option> */}
    </select>
  );
};

export default LanguageSwitcher;
