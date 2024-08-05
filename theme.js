document.addEventListener('DOMContentLoaded', function() {
    const lightThemeStyles = `
    :root {
        --primary-color: #ffffff;
        --secondary-color: #3F3D56;
        --accent-color: #009bf5;
        --text-color: #ffffff;
        --bg-color: rgba(255, 255, 255, 0.1);
        --card-bg: rgba(255, 255, 255, 0.1);
        --glass-bg: rgba(255, 255, 255, 0.1);
        --hover-bg: rgba(255, 255, 255, 0.1);
        --border-radius: 15px;
    }
    
    body {
        font-family: 'Poppins', sans-serif;
        line-height: 1.6;
        color: var(--text-color);
        background: linear-gradient(135deg, rgba(35, 35, 35, 0.8), rgba(66, 66, 70, 0.8), rgba(116, 116, 119, 0.8));
        background-size: 400% 400%;
        animation: gradientBG 10s ease infinite;
        backdrop-filter: blur(10px);
    }
    
    @keyframes gradientBG {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    .card {
        margin-bottom: 20px;
    }

    .card-header {
        background-color: #f8f9fa;
        border-bottom: 1px solid #e0e0e0;
        padding: 10px 15px;
    }

    .card-body {
        padding: 15px;
    }
    `;

    const darkThemeStyles = `
:root {
    --primary-color: #0D0D0D; /* Darker primary color */
    --secondary-color: #121212; /* Darker secondary color */
    --accent-color: #009bf5;
    --text-color: #e0e0e0; /* Lighter text color for better contrast */
    --bg-color: rgba(13, 13, 13, 0.9); /* Darker background color */
    --card-bg: rgba(18, 18, 18, 0.9); /* Darker card background */
    --glass-bg: rgba(18, 18, 18, 0.9); /* Darker glass background */
    --hover-bg: rgba(33, 33, 33, 0.3); /* Slightly darker hover background */
    --border-radius: 15px;
}

body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background: linear-gradient(135deg, rgba(13, 13, 13, 0.9), rgba(18, 18, 18, 0.9), rgba(33, 33, 33, 0.9));
    background-size: 400% 400%;
    animation: gradientBG 10s ease infinite;
    backdrop-filter: blur(10px);
}

@keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.card {
    background-color: var(--card-bg); /* Apply card background color */
    color: var(--text-color); /* Ensure text color is consistent */
    margin-bottom: 20px;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Slight shadow for depth */
}

.card-header {
    background-color: var(--secondary-color); /* Use secondary color for header */
    border-bottom: 1px solid #333333; /* Darker border */
    padding: 10px 15px;
    border-radius: var(--border-radius) var(--border-radius) 0 0; /* Rounded top corners */
}

.card-body {
    padding: 15px;
    border-radius: 0 0 var(--border-radius) var(--border-radius); /* Rounded bottom corners */
}

button {
    background-color: var(--secondary-color); /* Consistent button background */
    color: var(--text-color); /* Button text color */
    border: none;
    padding: 10px 20px;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: var(--hover-bg); /* Hover effect */
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
