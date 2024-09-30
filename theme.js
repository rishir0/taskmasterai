document.addEventListener('DOMContentLoaded', function() {
    const lightThemeStyles = `
    :root {
        --primary-color: #009bf5 !important; /* Keep primary color white */
        --secondary-color: #8d8aaf !important; /* Consistent secondary color */
        --accent-color: #003366 !important; /* Consistent accent color */
        --text-color: #ffffff !important;
        --bg-color: rgba(255, 255, 255, 0.1) !important;
        --card-bg: rgba(255, 255, 255, 0.1) !important;
        --glass-bg: rgba(255, 255, 255, 0.1) !important;
        --hover-bg: rgba(255, 255, 255, 0.1) !important;
        --border-radius: 15px !important;
    }
    
    body {
        font-family: 'Poppins', sans-serif !important;
        line-height: 1.6 !important;
        color: var(--text-color) !important;
        background: linear-gradient(135deg, rgba(35, 35, 35, 0.8), rgba(66, 66, 70, 0.8), rgba(116, 116, 119, 0.8)) !important;
        background-size: 400% 400% !important;
        animation: gradientBG 10s ease infinite !important;
        backdrop-filter: blur(10px) !important;
    }
    
    @keyframes gradientBG {
        0% { background-position: 0% 50% !important; }
        50% { background-position: 100% 50% !important; }
        100% { background-position: 0% 50% !important; }
    }
    
    .card {
        margin-bottom: 20px !important;
    }

    .card-header {
        background-color: #f8f9fa !important;
        border-bottom: 1px solid #e0e0e0 !important;
        padding: 10px 15px !important;
    }

    .card-body {
        padding: 15px !important;
    }
    `;



const darkThemeStyles = `
:root {
    --primary-color: #009bf5 !important; /* Keep primary color white */
    --secondary-color: #8d8aaf !important; /* Consistent secondary color */
    --accent-color: #003366 !important; /* Consistent accent color */
    --text-color: #ffffff !important; /* Keep text color white */
    --bg-color: rgba(31, 31, 31, 0.9) !important; /* Darker background color */
    --card-bg: rgba(31, 31, 31, 0.9) !important; /* Darker card background */
    --glass-bg: rgba(31, 31, 31, 0.9) !important; /* Darker glass background */
    --hover-bg: rgba(55, 55, 55, 0.9) !important; /* Darker hover background */
    --border-radius: 15px !important;
}

body {
    font-family: 'Poppins', sans-serif !important;
    line-height: 1.6 !important;
    color: var(--text-color) !important;
    background: linear-gradient(135deg, rgba(5, 5, 5, 0.9), rgba(15, 15, 15, 0.9), rgba(25, 25, 25, 0.9)) !important;
    background-size: 400% 400% !important;
    animation: gradientBG 10s ease infinite !important;
    backdrop-filter: blur(10px) !important;
}

@keyframes gradientBG {
    0% { background-position: 0% 50% !important; }
    50% { background-position: 100% 50% !important; }
    100% { background-position: 0% 50% !important; }
}

.card {
    background-color: var(--card-bg) !important;
    color: var(--text-color) !important;
    margin-bottom: 20px !important;
    border-radius: var(--border-radius) !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important; /* Slight shadow for depth */
}

.card-header {
    background-color: var(--secondary-color) !important;
    border-bottom: 1px solid #333333 !important; /* Darker border */
    padding: 10px 15px !important;
    border-radius: var(--border-radius) var(--border-radius) 0 0 !important; /* Rounded top corners */
}

.card-body {
    padding: 15px !important;
    border-radius: 0 0 var(--border-radius) var(--border-radius) !important; /* Rounded bottom corners */
}


    `;

    function applyTheme(styles, themeName) {
        removeTheme();
        let styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.id = "theme-styles";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        // Save the theme to localStorage
        localStorage.setItem('selectedTheme', themeName);
    }

    function removeTheme() {
        let styleSheet = document.getElementById("theme-styles");
        if (styleSheet) {
            styleSheet.remove();
        }
    }

    function applySavedTheme() {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            if (savedTheme === 'light') {
                applyTheme(lightThemeStyles, 'light');
            } else if (savedTheme === 'dark') {
                applyTheme(darkThemeStyles, 'dark');
            }
        }
    }

    // Apply the saved theme when the page loads
    applySavedTheme();

    // Check if we are on account.html and add event listeners if so
    if (window.location.pathname.endsWith('account.html')) {
        const applyLightThemeBtn = document.getElementById('apply-light-theme');
        const removeLightThemeBtn = document.getElementById('remove-light-theme');
        const applyDarkThemeBtn = document.getElementById('apply-dark-theme');
        const removeDarkThemeBtn = document.getElementById('remove-dark-theme');

        applyLightThemeBtn.addEventListener('click', function() {
            applyTheme(lightThemeStyles, 'light');
            applyLightThemeBtn.style.display = 'none';
            removeLightThemeBtn.style.display = 'inline-block';
            applyDarkThemeBtn.style.display = 'inline-block';
            removeDarkThemeBtn.style.display = 'none';
        });

        removeLightThemeBtn.addEventListener('click', function() {
            removeTheme();
            localStorage.removeItem('selectedTheme');
            applyLightThemeBtn.style.display = 'inline-block';
            removeLightThemeBtn.style.display = 'none';
            applyDarkThemeBtn.style.display = 'inline-block';
            removeDarkThemeBtn.style.display = 'none';
        });

        applyDarkThemeBtn.addEventListener('click', function() {
            applyTheme(darkThemeStyles, 'dark');
            applyLightThemeBtn.style.display = 'inline-block';
            removeLightThemeBtn.style.display = 'none';
            applyDarkThemeBtn.style.display = 'none';
            removeDarkThemeBtn.style.display = 'inline-block';
        });

        removeDarkThemeBtn.addEventListener('click', function() {
            removeTheme();
            localStorage.removeItem('selectedTheme');
            applyLightThemeBtn.style.display = 'inline-block';
            removeLightThemeBtn.style.display = 'none';
            applyDarkThemeBtn.style.display = 'inline-block';
            removeDarkThemeBtn.style.display = 'none';
        });
    }
});
