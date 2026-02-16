import React, { useEffect, useState } from "react";

const LanguageSelector = () => {
    // 1. Initialize state from localStorage or default to 'en'
    const [currentLang, setCurrentLang] = useState(localStorage.getItem("transLang") || "en");

    useEffect(() => {
        // MutationObserver to hide the Google UI
        const observer = new MutationObserver(() => {
            const googleDiv = document.querySelector(".skiptranslate");
            if (googleDiv) {
                googleDiv.style.display = "none";
                googleDiv.style.visibility = "hidden";
            }
            if (document.body.style.top !== "0px") {
                document.body.style.top = "0px";
            }

            // 2. IMPORTANT: Sync the Google Engine with our stored language on refresh
            const googleCombo = document.querySelector(".goog-te-combo");
            if (googleCombo && googleCombo.value !== currentLang) {
                googleCombo.value = currentLang;
                googleCombo.dispatchEvent(new Event("change"));
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [currentLang]); // Re-run if currentLang changes

    const onChangeLanguage = (e) => {
        const lang = e.target.value;

        // 3. Update State and LocalStorage
        setCurrentLang(lang);
        localStorage.setItem("transLang", lang);

        const googleCombo = document.querySelector(".goog-te-combo");
        if (googleCombo) {
            googleCombo.value = lang;
            googleCombo.dispatchEvent(new Event("change"));
        } else {
            console.error("Google Translate not ready.");
        }
    };

    return (
        /* 4. Use the 'value' prop to keep the UI in sync with state */
        <select
            value={currentLang}
            onChange={onChangeLanguage}
            className="notranslate"
            style={customStyles}
        >
            <option value="en">English</option>
            <option value="hi">Hindi (हिन्दी)</option>
            <option value="mr">Marathi (मराठी)</option>
        </select>
    );
};

const customStyles = {
    padding: "8px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "1px solid #ccc"
};

export default LanguageSelector;