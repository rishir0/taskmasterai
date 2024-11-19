document.addEventListener('DOMContentLoaded', function() {
    const lightThemeStyles = `
:root {
    --primary-color: #56c6d2; /* Winterberry: A rich berry red for headers and highlights */
    --secondary-color: #006400; /* Pine Green: Dark green to complement the primary red */
    --accent-color: #009300; /* Gold: For a festive sparkle */
    --text-color: white; /* Snowdrift White: Clean and readable on a dark background */
    --bg-color:  #016c97; /* Deep Navy Blue: Evokes a peaceful, starry winter night */
    --card-bg: rgba(255, 255, 255, 0.142);/* Frosted glass effect for consistency */
    --glass-bg: rgba(255, 255, 255, 0.1);
    --hover-bg: rgba(255, 255, 255, 0.2); /* Slightly lighter background on hover */
    --border-radius: 15px;
}

/* Force all text color to white, overriding any other styles */
h2, span, a, li, td, th, div, p {
    color: white !important; /* Applies to text elements only */
}

    
    body {
        font-family: 'Poppins', sans-serif;
        line-height: 1.6;
        color: var(--text-color);
        background: var( --bg-color);
        background-size: 400% 400%;
        animation: gradientBG 10s ease infinite;
        backdrop-filter: blur(10px);
    }
    
    @keyframes gradientBG {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

.upgrade-btn2 {
    background-color: var(--accent-color);
    color: var(--text-color);
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 25px; /* Increased border-radius for a rounder look */
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease;
    position: relative; /* Ensure the SVG is positioned relative to the button */
}

.ai-generated-tag .icon {
    width: 2em;  /* Keep the icon size */
    height: 2em; /* Keep the icon size */
    fill: white; /* Set the SVG color to white */
    margin-right: -2px;
    margin-left: -6px;  /* Space between icon and text */
}

/* General styling for SVG icons in the AI Summary section */
.header-section svg.icon2,
.header-section button svg {
    width: 74px !important;          /* Ensures a consistent size */
    height: 74px !important;         /* Adjust as needed */
    fill: white !important;        /* Sets a visible dark color; change as needed */
    display: inline-block !important;
    vertical-align: middle !important;
    margin-top: -15px !important;
    margin-right: -15px !important;
}



<span style="font-size: 12px; color: white; margin-left: 10px; display: inline-block; vertical-align: middle;"></span>


.feature-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    fill: white;
}

.feature-icon path {
  fill: white;
}
    



/* Date styling */
.note-item span.date {
    font-size: 0.9rem; /* Date size */
    color: white; /* Date color */
    display: inline; /* Keep date inline */
}










.upgrade-btn {
    background: var(--hover-bg);
    color: var(--text-color);
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    cursor: pointer;
    margin-top: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease, transform 0.3s ease;
    backdrop-filter: blur(10px);
    background-color: var(--accent-color);
}



/* Set placeholder text to white for all input fields */
input::placeholder, 
textarea::placeholder {
    color: white; /* Change placeholder color to white */
    opacity: 1;   /* Ensure full opacity for all browsers */
}

.sub-heading {
    font-size: 1.5rem;
    color: var(--sub-heading-color, #fffff);
    margin-bottom: -60px;
    margin-left: -412px;
}

.note-option-card p {
    font-size: 1rem;
    color: var(--sub-text-color, #fffff);
}

.section h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: white;
}

.ai-generated-tag .icon {
    width: 2em;  /* Keep the icon size */
    height: 2em; /* Keep the icon size */
    fill: white; /* Set the SVG color to white */
    margin-right: -2px;
    margin-left: -6px;  /* Space between icon and text */
}

/* General styling for SVG icons in the AI Summary section */
.header-section svg.icon2,
.header-section button svg {
    width: 74px !important;          /* Ensures a consistent size */
    height: 74px !important;         /* Adjust as needed */
    fill: white !important;        /* Sets a visible dark color; change as needed */
    display: inline-block !important;
    vertical-align: middle !important;
    margin-top: -15px !important;
    margin-right: -15px !important;
}

.section-content {
    font-size: 16px; /* Adjust the font size */
    color: white; /* Set the text color */
    line-height: 1.6; /* Add line height for better readability */
    margin: 10px 0; /* Add vertical margin for spacing */
    padding: 8px; /* Add padding inside the paragraph */
    background-color: var(--card-bg);
    border-radius: 10px; /* Rounded corners for the background */
    word-wrap: break-word; /* Ensure text wraps properly */
}

.summary-section h3 {
    display: flex;
    align-items: center;
    font-size: 18px; /* Adjust font size if needed */
    color: white;  
}

<span style="font-size: 12px; color: white; margin-left: 10px; display: inline-block; vertical-align: middle;"></span>


.feature-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    fill: white;
}

.feature-icon path {
  fill: white;
}

      /* Snowflake container */
        body {
            position: relative;
            overflow: hidden;
        }

/* Snowflake wrapper */
.snowflakes {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    z-index: -1 !important; /* Snowflakes behind content */
    pointer-events: none !important; /* Prevent snowflakes from interfering with interactions */
    overflow: hidden !important;
}


        /* Snowflake */
        .snowflake {
            position: absolute;
            top: -10%;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0.7;
            background-color: white;
            border-radius: 50%;
            animation: fall 5s linear infinite;
        }

        /* Snowflake fall animation */
        @keyframes fall {
            0% {
                transform: translateX(-50%) translateY(-10%);
            }
            100% {
                transform: translateX(-50%) translateY(100vh);
            }
        }












    `;

    const darkThemeStyles = `
:root {
    --primary-color: #009bf5; /* Keep primary color white */
    --secondary-color: #8d8aaf; /* Consistent secondary color */
    --accent-color: #003366; /* Consistent accent color */
    --text-color: #ffffff; /* Keep text color white */
    --bg-color: rgba(31, 31, 31, 0.9); /* Darker background color */
    --card-bg: rgba(31, 31, 31, 0.9); /* Darker card background */
    --glass-bg: rgba(31, 31, 31, 0.9); /* Darker glass background */
    --hover-bg: rgba(55, 55, 55, 0.9); /* Darker hover background */
    --border-radius: 15px;
}

body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background: linear-gradient(135deg, rgba(5, 5, 5, 0.9), rgba(5, 5, 5, 0.9), rgba(5, 5, 5, 0.9));
    background-size: 400% 400%;
    animation: gradientBG 10s ease infinite;
    backdrop-filter: blur(10px);
}


.card {
    background-color: var(--card-bg);
    color: var(--text-color);
    margin-bottom: 20px;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Slight shadow for depth */
}

.card-header {
    background-color: var(--secondary-color);
    border-bottom: 1px solid #333333; /* Darker border */
    padding: 10px 15px;
    border-radius: var(--border-radius) var(--border-radius) 0 0; /* Rounded top corners */
}

.card-body {
    padding: 15px;
    border-radius: 0 0 var(--border-radius) var(--border-radius); /* Rounded bottom corners */
}

.upgrade-btn {
    background: var(--accent-color);
    color: var(--text-color);
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    cursor: pointer;
    margin-top: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease, transform 0.3s ease;
    backdrop-filter: blur(10px);
    background-color: var(--accent-color);
}

.upgrade-btn svg {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

.upgrade-btn:hover {
    transform: scale(1.05);
}
    `;


        // Function to create a snowflake
        function createSnowflake() {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');

            // Randomize the size and speed of the snowflake
            const size = Math.random() * 10 + 5; // Random size between 5px and 15px
            const animationDuration = Math.random() * 3 + 5; // Random duration between 5s and 8s

            // Set random size and animation duration
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            snowflake.style.animationDuration = `${animationDuration}s`;

            // Position the snowflake randomly across the top
            snowflake.style.left = `${Math.random() * 100}%`;

            return snowflake;
        }

        // Function to create and append snowflakes to the container
        function generateSnowflakes() {
            const snowflakesContainer = document.querySelector('.snowflakes');

            // Number of snowflakes to generate
            const numberOfSnowflakes = 50;

            // Create and append snowflakes
            for (let i = 0; i < numberOfSnowflakes; i++) {
                const snowflake = createSnowflake();
                snowflakesContainer.appendChild(snowflake);
            }
        }

        // Call the function to generate snowflakes when the page loads
        window.onload = generateSnowflakes;







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
