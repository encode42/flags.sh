const baseTheme = {
    "primary": "#69db7c",
    "secondary": "#94d82d",
    "accent": "#94d82d",
    "neutral": "#495057",
    "info": "#4dabf7",
    "success": "#69db7c",
    "warning": "#ffd43b",
    "error": "#ff8787",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    "content": [
        "./src/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    "daisyui": {
        "themes": [{
            "light": {
                ...baseTheme,
                "base-100": "#f8f9fa",
            }
        }, {
            "dark": {
                ...baseTheme,
                "base-100": "#212529",
            }
        }]
    },
    "plugins": [
        require("@tailwindcss/typography"),
        require("daisyui")
    ]
};
