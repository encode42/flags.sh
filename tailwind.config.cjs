/** @type {import('tailwindcss').Config} */
module.exports = {
    "content": [
        "./src/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    "theme": {
        "extend": {}
    },
    "daisyui": {
        "themes": [{
            "mytheme": {
                "primary": "#69db7c",
                "secondary": "#94d82d",
                "accent": "#94d82d",
                "neutral": "#495057",
                "base-100": "#212529",
                "info": "#4dabf7",
                "success": "#69db7c",
                "warning": "#ffd43b",
                "error": "#ff8787",
            }
        }]
    },
    "plugins": [
        require("@tailwindcss/typography"),
        require("daisyui")
    ]
};
