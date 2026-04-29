document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('app-grid');
    const pickupCardContainer = document.getElementById('pickup-card-container');
    const totalApps = 100;

    // 完了したアプリの詳細データ
    // 新しいアプリを追加する場合はここに追記します
    const appsData = {
        1: {
            id: "001",
            folder: "001_Retro-web-app",
            title: "Retro Web App",
            description: "2003年頃の日本の個人サイトを再現したノスタルジックなWebページ。流れる文字、ピコピコBGM、キリ番カウンターなどを搭載しています。",
            date: "2026-04-29"
        }
    };

    // 現在の完了数
    const completedAppsCount = Object.keys(appsData).length;

    // 最新のアプリを取得（キーの数字が一番大きいもの）
    const latestAppKey = Math.max(...Object.keys(appsData).map(Number));
    const latestApp = appsData[latestAppKey];

    // ピックアップセクションの描画
    if (latestApp && pickupCardContainer) {
        pickupCardContainer.innerHTML = `
            <a href="../${latestApp.folder}/index.html" class="pickup-link">
                <div class="pickup-content">
                    <div class="pickup-badge">LATEST</div>
                    <h3 class="pickup-title"><span class="pickup-id">#${latestApp.id}</span> ${latestApp.title}</h3>
                    <p class="pickup-description">${latestApp.description}</p>
                    <div class="pickup-footer">
                        <span class="pickup-date">Created on ${latestApp.date}</span>
                        <span class="pickup-action">View App <span class="arrow">→</span></span>
                    </div>
                </div>
            </a>
        `;
    }

    // 001, 002... のようにゼロ埋めする関数
    const padNumber = (num) => num.toString().padStart(3, '0');

    // アーカイブのカードを生成
    for (let i = 1; i <= totalApps; i++) {
        const paddedNum = padNumber(i);
        const appInfo = appsData[i];

        const card = document.createElement('a');

        if (appInfo) {
            // 完了しているアプリ
            card.href = `../${appInfo.folder}/index.html`;
            card.className = 'app-card fade-in completed';

            card.innerHTML = `
                <div class="card-number">${paddedNum}</div>
                <div class="card-title">${appInfo.title}</div>
            `;
        } else {
            // 未完成のアプリ
            card.href = 'javascript:void(0)';
            card.className = 'app-card fade-in disabled';

            card.innerHTML = `
                <div class="card-number">${paddedNum}</div>
                <div class="card-title">Coming Soon...</div>
            `;
        }

        // アニメーションの遅延を設定して、順番にフワッと表示させる
        card.style.animationDelay = `${i * 0.015}s`;

        gridContainer.appendChild(card);
    }

    // プログレスバーの更新
    const updateProgress = (completed) => {
        const progressBar = document.getElementById('progress-bar');
        const progressCount = document.getElementById('progress-count');
        const percentage = (completed / totalApps) * 100;

        setTimeout(() => {
            if (progressBar) {
                progressBar.style.width = `${percentage}%`;
            }

            // カウントアップアニメーション
            let current = 0;
            if (completed === 0) {
                if (progressCount) progressCount.textContent = 0;
                return;
            }

            const increment = completed / 30; // 30フレームで完了
            const timer = setInterval(() => {
                current += increment;
                if (current >= completed) {
                    current = completed;
                    clearInterval(timer);
                }
                if (progressCount) progressCount.textContent = Math.floor(current);
            }, 30);
        }, 300); // 初期アニメーション後の遅延
    };

    updateProgress(completedAppsCount);
});
