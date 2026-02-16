import React, { useEffect } from "react";

const GoogleTranslateBridge = () => {
  useEffect(() => {
    // Define the init function Google expects
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,mr", // Only English, Hindi, Marathi
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Check if script already exists to prevent duplicates on re-renders
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }
  }, []);

  return (
    // We render the widget but keep it hidden
    <div id="google_translate_element" style={{ display: "none" }} />
  );
};

export default GoogleTranslateBridge;