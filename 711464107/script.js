// 等待 DOM 載入
document.addEventListener('DOMContentLoaded', () => {
    
    const navbar = document.querySelector('.navbar');

    // 1. 導覽列捲動效果
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
            navbar.style.background = 'rgba(10, 25, 47, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(10, 25, 47, 0.85)';
        }
    });

    // 2. 簡單的 View Work 按鈕提示 (MVP 階段佔位)
    const viewWorkBtn = document.querySelector('.btn-primary');
    viewWorkBtn.addEventListener('click', (e) => {
        // 如果還沒有文章，先捲動到 About 或彈出提示
        // e.preventDefault();
        console.log('準備跳轉至文章列表區塊...');
    });

    console.log('台北特攻隊網站已啟動！');
});