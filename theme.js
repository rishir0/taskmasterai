document.addEventListener('DOMContentLoaded', function() {
    const lightThemeStyles = `
     :root {
        --primary-color: rgba(255, 255, 255, 0.1); * Keep primary color white */
        --secondary-color: rgba(255, 255, 255, 0.1); /* Consistent secondary color */
        --accent-color: #333333; /* Consistent accent color */
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

.upgrade-btn2 {
    background-color: rgba(255, 255, 255, 0.1);
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

.feature-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    fill: white;
}

.feature-icon path {
  fill: white;
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

    .logo {


    color: var(--text-color);


}

.section h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: white;
}

/* Date styling */
.note-item span.date {
    font-size: 0.9rem; /* Date size */
    color: white; /* Date color */
    display: inline; /* Keep date inline */
}

.arrow-icon {
    width: 54px;
    height: 54px;
    fill: white; /* Ensure the arrow icon is white */
    margin-bottom: -10px;
}

/* Note text styling */
.note-item p.note-text {
    font-size: 1rem; /* Note text size */
    color: white; /* Note text color */
    margin: 5px 0 0 0; /* Space above note text */
}

/* Title styling */
.note-item strong2 {
    font-size: 1.3rem; /* Title size */
    color: white; /* Title color */
    display: inline; /* Keep title inline */
    margin-right: 10px; /* Space between title and date */
    font-weight: bold; /* Make the title bold */
}

/* Productivity Stats Styling */
.productivity-stats h2, .upcoming-deadlines h3 {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-weight: bold;
}


/* Section Headings */
.tab-content h2 {
    color: white;
    margin-bottom: 20px;
    font-weight: bold;
}

/* Filled part of the Progress Bar */
.progress-fill {
    background-color: white; /* Use primary color for the fill */
    height: 100%;
    border-radius: 10px; /* Ensure rounded corners */
    transition: width 0.3s ease; /* Smooth width change */
}


#tasks-projects .tasks-section h2,
#tasks-projects .projects-section h2,
#tasks-projects .goals-section h2,
#tasks-projects .plans-section h2 {
    color: white;
    margin-bottom: 20px;
    font-weight: bold;
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
    background-color: rgba(255, 255, 255, 0.1);
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
