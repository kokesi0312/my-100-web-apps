document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('app-grid');
    const totalApps = 100;
    let completedApps = 0; // 現在の完了数（将来的に取得できるように変数化）

    // 001, 002... のようにゼロ埋めする関数
    const padNumber = (num) => num.toString().padStart(3, '0');

    // カードを生成
    for (let i = 1; i <= totalApps; i++) {
        const paddedNum = padNumber(i);
        const folderName = `${paddedNum}`; // フォルダ名のルールに合わせて変更
        
        const card = document.createElement('a');
        card.href = `../${folderName}/index.html`; // リンク先
        card.className = 'app-card fade-in';
        // アニメーションの遅延を設定して、順番にフワッと表示させる
        card.style.animationDelay = `${i * 0.02}s`;
        
        const numberSpan = document.createElement('span');
        numberSpan.className = 'card-number';
        numberSpan.textContent = paddedNum;
        
        card.appendChild(numberSpan);
        gridContainer.appendChild(card);
    }

    // プログレスバーの更新（例として、将来的に完了数を設定した際のアニメーション）
    const updateProgress = (completed) => {
        const progressBar = document.getElementById('progress-bar');
        const progressCount = document.getElementById('progress-count');
        const percentage = (completed / totalApps) * 100;
        
        setTimeout(() => {
            progressBar.style.width = `${percentage}%`;
            
            // カウントアップアニメーション
            let current = 0;
            // 0の場合はアニメーションさせない
            if (completed === 0) {
                progressCount.textContent = 0;
                return;
            }
            
            const increment = completed / 50; // 50フレームでアニメーション
            const timer = setInterval(() => {
                current += increment;
                if (current >= completed) {
                    current = completed;
                    clearInterval(timer);
                }
                progressCount.textContent = Math.floor(current);
            }, 20);
        }, 500); // 初期アニメーション後の遅延
    };

    // 初期プログレスバーの更新（とりあえず0）
    updateProgress(0);
});
