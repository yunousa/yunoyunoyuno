let currentQuestion = 1;
let answers = { A: 0, B: 0, C: 0, D: 0 };

function selectAnswer(questionId, answer) {
    answers[answer]++;
    document.getElementById(questionId).style.display = 'none';
    if (questionId === 'q5') {
        showResult();
    } else {
        document.getElementById('next').style.display = 'block';
    }
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('questions').innerHTML = getQuestion(currentQuestion);
    document.getElementById('next').style.display = 'none';
}

function getQuestion(qNum) {
    const questions = [
        { q: '最近、休憩時間にふと考えることって何？', a: ['Yuno（君）から来たメッセージ、にゃんって気分で楽しく読むこともある（笑）', 'Yunoの笑顔や声が頭に浮かんで、ほっこりする', '特に何も思わない、仕事のタスクで頭がいっぱい', '疲れてるから、なんにも考えない'] },
        { q: 'Yunoが不機嫌だとどう思う？', a: ['にゃん、ちょっと大変だけど、気遣いながら軽く対応する（笑）', 'すごく気になって、Yunoを元気にしたい気分になる', '普通、ちょっと面倒だけどスルーすることもあるかな', '忙しくて、あまり気付かないか、疲れて対応できない'] },
        { q: 'Yunoから連絡ない時はどう思う？', a: ['にゃん、ちょっと寂しいけど、忙しくて気にならないことも（笑）', 'すごく気になって、Yunoのことが心配になる', '普通、特別な気分ではないかな、忙しさで気付かないことも', '忙しくて、あまり気にならないか、忘れちゃうことも'] },
        { q: 'Yunoが他の人と付き合ったらどう思う？', a: ['にゃん、ちょっと複雑だけど、軽く流せるかな（笑）', 'すごくショックで、Yunoと一緒にいたいって思う', '普通、別にいいかな、特別な気分ではない', '忙しくて、あまり深く考えないか、気にならない'] },
        { q: 'カフェでYunoと一緒に過ごすとき、どんな気分になる？', a: ['軽く楽しいけど、疲れてる時もある、にゃんって感じ（笑）', 'すごく心地よくて、特別な気分になれる', '普通、特別な気分ではないかな', '忙しくて、あまり集中できなくて気まずい時もある'] }
    ];
    let html = `<div class="question" id="q${qNum}">${questions[qNum-1].q}</div>`;
    questions[qNum-1].a.forEach((ans, index) => {
        html += `<button onclick="selectAnswer('q${qNum}', '${String.fromCharCode(65 + index)}')">${ans}</button>`;
    });
    return html;
}

function showResult() {
    let maxCount = Math.max(answers.A, answers.B, answers.C, answers.D);
    let result = '';
    if (answers.A === maxCount) {
        result = 'クールで軽いノリ！Yunoを気楽に楽しんでるけど、恋愛感情は薄いかも（にゃん）';
    } else if (answers.B === maxCount) {
        result = '特別な気持ち！Yunoに恋愛感情がある可能性が高い、超クールに特別だよ';
    } else if (answers.C === maxCount) {
        result = '普通に大事！Yunoを大事にしてるけど、恋愛感情はまだ不明かも';
    } else if (answers.D === maxCount) {
        result = '忙しくて気付かない？恋愛感情はほぼないか、軽く見てる可能性が高い';
    }
    document.getElementById('questions').style.display = 'none';
    document.getElementById('next').style.display = 'none';
    document.getElementById('result').innerHTML = result;
    document.getElementById('result').style.display = 'block';

    // 結果を君に送信（プライバシー保護）
    const resultData = {
        answers: answers,
        result: result,
        timestamp: new Date().toISOString()
    };
    sendResultToYuno(resultData); // 君のメールやサーバーに結果を送る関数（後述）
}

// 結果を君に送信する関数（プライバシー保護）
function sendResultToYuno(data) {
    // 実際のメール送信やサーバー保存にはAPIや外部サービスが必要
    // ここではコンソールに出力して確認（実際の運用では変更）
    console.log('結果:', data);
    // 例: Google Apps ScriptやメールAPI（SendGridなど）を使って君のメール（yuno@example.com）に送信
    // fetch('https://script.google.com/macros/s/XXXXXXX/exec', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
}
