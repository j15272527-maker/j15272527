// --- 1. 結構化資料庫 (以後修改內容只需動這裡) ---
const SKILLS_DATA = {
    "Programming": ["Python (爬蟲與自動化)", "Vanilla JavaScript", "CSS Grid/Flexbox"],
    "AI / ML": ["LLM 旅遊規劃優化", "AI 影像後製", "多國語言翻譯應用"],
    "Web": ["Responsive Design", "SEO 優化", "Web Performance"],
    "Tools": ["Notion 旅遊大腦", "Git / GitHub", "Google Maps API"]
};

const PROJECTS_DATA = [
    {
        name: "台北－東京 72H 極致特攻",
        oneLiner: "運用 Python 爬蟲與 Maps 打造的秒級規劃工具。",
        detailedDesc: "整合多個廉航網站 API，實現自動偵測最低票價並即時生成最佳化路線地圖。",
        techStack: ["Python", "Maps API", "JSON"],
        githubLink: "#",
        demoLink: "#",
        status: "Completed"
    },
    {
        name: "週末特攻行李自動化系統",
        oneLiner: "基於 JS 的動態打包建議系統。",
        detailedDesc: "根據目的地氣象 API 自動篩選 10kg 內最佳行李組合，大幅提升通關速度。",
        techStack: ["Vanilla JS", "Weather API"],
        githubLink: "#",
        demoLink: "#",
        status: "Beta"
    },
    {
        name: "Taipei Escape 攻略網站",
        oneLiner: "高效、簡潔、科技感的旅遊資訊入口。",
        detailedDesc: "採用原生 JS 渲染技術提升頁面加載速度，提供最順暢的移動端閱讀體驗。",
        techStack: ["HTML5", "CSS3", "JS"],
        githubLink: "#",
        demoLink: "#",
        status: "Completed"
    }
];

const COURSES_DATA = [
    {
        name: "自動化資訊擷取實務",
        semester: "2024 Fall",
        category: "Programming",
        skillsLearned: ["Web Scraping", "Data Cleaning"],
        description: "學會透過爬蟲大規模擷取旅遊網站資訊，並將雜亂數據轉化為結構化行程。"
    },
    {
        name: "現代網頁視覺設計與實作",
        semester: "2024 Spring",
        category: "Web Development",
        skillsLearned: ["UI/UX", "Responsive Layout"],
        description: "掌握使用者心理與響應式排版邏輯，設計出清晰易讀的旅遊攻略介面。"
    }
];

// --- 2. 系統初始化與動態渲染器 ---
function init() {
    renderSkills();
    renderProjects();
    renderCourses();
    setupMobileMenu();
    setupSmoothScroll();
    setupBudgetCalculator();
    console.log("台北特攻隊系統完全載入。");
}

function renderSkills() {
    const container = document.getElementById('skills-container');
    if(!container) return;
    container.innerHTML = Object.entries(SKILLS_DATA).map(([cat, items]) => `
        <div class="skill-category">
            <h3>// ${cat}</h3>
            <div class="skill-items">
                ${items.map(s => `<span class="skill-badge">${s}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderProjects() {
    const container = document.getElementById('projects-grid');
    if(!container) return;
    container.innerHTML = PROJECTS_DATA.map(p => `
        <div class="card">
            <span class="card-status">${p.status}</span>
            <h3>${p.name}</h3>
            <p style="color:var(--text-white); margin:10px 0; font-size:0.95rem;">${p.oneLiner}</p>
            <p style="color:var(--text-gray); font-size:0.85rem;">${p.detailedDesc}</p>
            <div class="tech-stack">🔨 ${p.techStack.join(' / ')}</div>
            <div class="project-links">
                ${p.githubLink !== '#' ? `<a href="${p.githubLink}">GitHub</a>` : ''}
                ${p.demoLink !== '#' ? `<a href="${p.demoLink}">Live Demo</a>` : ''}
            </div>
        </div>
    `).join('');
}

function renderCourses() {
    const container = document.getElementById('courses-list');
    if(!container) return;
    container.innerHTML = COURSES_DATA.map(c => `
        <div class="list-item">
            <div class="course-header">
                <h4>${c.name}</h4>
                <span class="course-meta">${c.semester} | ${c.category}</span>
            </div>
            <p style="color:var(--text-gray); font-size:0.9rem;">${c.description}</p>
            <p style="color:var(--primary-orange); font-size:0.8rem; margin-top:8px;">學會技能: ${c.skillsLearned.join(', ')}</p>
        </div>
    `).join('');
}

// --- 3. 核心互動組件 ---

// 手機版選單邏輯
function setupMobileMenu() {
    const menu = document.querySelector('#mobile-menu');
    const links = document.querySelector('.nav-links');
    if(!menu) return;
    
    menu.addEventListener('click', () => {
        menu.classList.toggle('is-active');
        links.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
        menu.classList.remove('is-active');
        links.classList.remove('active');
    }));
}

// 錨點平滑滾動（扣除 Navbar 高度防遮擋）
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 即時預算計算器邏輯
function setupBudgetCalculator() {
    const flightInput = document.getElementById('input-flight');
    const hotelInput = document.getElementById('input-hotel');
    const daysInput = document.getElementById('input-days');
    const foodInput = document.getElementById('input-food');

    const flightVal = document.getElementById('flight-val');
    const hotelVal = document.getElementById('hotel-val');
    const daysVal = document.getElementById('days-val');
    const foodVal = document.getElementById('food-val');

    const totalPriceDisplay = document.getElementById('total-price');
    const panelDisplay = document.getElementById('panel-display');
    const statusIndicator = document.getElementById('budget-status');
    const progressBar = document.getElementById('budget-progress');

    if (!flightInput) return;

    const BUDGET_LIMIT = 15000; // 預算上限天花板

    function calculateTotal() {
        const flight = parseInt(flightInput.value);
        const hotel = parseInt(hotelInput.value);
        const days = parseInt(daysInput.value);
        const food = parseInt(foodInput.value);

        flightVal.innerText = flight.toLocaleString();
        hotelVal.innerText = hotel.toLocaleString();
        daysVal.innerText = days;
        foodVal.innerText = food.toLocaleString();

        // 燃料計算公式：機票 + (住宿 * 天數) + (餐費 * 3餐 * 天數)
        const total = flight + (hotel * days) + (food * 3 * days);
        totalPriceDisplay.innerText = total.toLocaleString();

        const percent = Math.min((total / BUDGET_LIMIT) * 100, 100);
        progressBar.style.width = `${percent}%`;

        if (total > BUDGET_LIMIT) {
            panelDisplay.classList.add('danger-alert');
            statusIndicator.innerText = "❌ 警告：預算超載！";
        } else {
            panelDisplay.classList.remove('danger-alert');
            statusIndicator.innerText = "⚡ 系統狀態：預算安全";
        }
    }

    [flightInput, hotelInput, daysInput, foodInput].forEach(input => {
        input.addEventListener('input', calculateTotal);
    });

    calculateTotal(); // 首次載入先運算一次
}

document.addEventListener('DOMContentLoaded', init);
