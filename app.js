// 最初から用意しておく二次会候補
const defaultChoices =[
  "串とメシにはサケキタル。",
  "イタリアン酒場",
  "KICHIRI",
  "鳥貴族",
  "カラオケまねきねこ",
  "天下一品"
]

// localstorageに以前保存した候補があるか確認
const savedChoices = JSON.parse(localStorage.getItem("choices"));

//保存された候補があればそれ使う
// まだ何も保存されていなかったらdefaltChoices使う
const choices = savedChoices || defaultChoices;
// 二次会候補1件分のDOM要素を作って返す関数
// const renderChoice = (choice) => {
//   // div要素を作る
//   const choiceEl = document.createElement("div");
//   // class名をつける
//   choiceEl.className = "choice";
//   // 候補名を表示する
//   choiceEl.innerText = choice;
//   // 作ったDOM要素を返す
//   return choiceEl;
// };
const renderChoice = (choice) => {
  // 候補全体のdivを作る
  const choiceEl = document.createElement("div");
  choiceEl.className = "choice";
  // 候補名を表示する要素を作る
  const nameEl = document.createElement("span");
  nameEl.innerText = choice;

  // 削除ボタンを作る
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";

  // 削除ボタンが押されたとき
  deleteButton.addEventListener("click", () => {
    // choicesの中から削除する候補の場所を探す
    const index = choices.indexOf(choice);
    // choices配列から削除
    choices.splice(index, 1);
    // 削除後のchoicesをlocalStorageにも保存
    localStorage.setItem(
      "choices",
      JSON.stringify(choices)
    );
    // 画面からも削除
    choiceEl.remove();
  });
  // 候補名を追加
  choiceEl.append(nameEl);
  // 削除ボタンを追加
  choiceEl.append(deleteButton);
  return choiceEl;
};

// 候補一覧を表示する場所を取得
const choiceList = document.querySelector("#choice-list");
// 現在choicesに入っている候補をすべて表示する
for (const choice of choices) {
  choiceList.append(renderChoice(choice));
}

// 入力フォームを取得
const choiceForm = document.querySelector("#choice-form");

// 入力欄を取得
const choiceInput = document.querySelector("#choice-input");

// 「候補を追加」が押されたとき
// console.log(choiceForm);
choiceForm.addEventListener("submit", (event) => {

  // フォーム本来の送信処理を止める
  event.preventDefault();

  // 入力欄に入力された文字を取得
  const newChoice = choiceInput.value;

  // 何も入力されていなかったら終了
  if (newChoice === "") {
    return;
  }

  // choices配列に新しい候補を追加
  choices.push(newChoice);

  // 更新しても消えないようにlocalStorageに保存

  localStorage.setItem(
    "choices",
    JSON.stringify(choices)
  );

  // 新しい候補を候補一覧にも表示
  choiceList.append(renderChoice(newChoice));

  // 入力欄を空に戻す
  choiceInput.value = "";
});

// 「二次会を決める！」ボタンを取得
const randomButton = document.querySelector("#random-button");

// 「二次会を決める！」ボタンが押されたとき
randomButton.addEventListener("click", () => {

  // 候補が1つもない場合
  if (choices.length === 0) {
    const resultEl = document.querySelector("#result");
    resultEl.innerText = "候補を追加してください！";
    return;
  }

  // 0以上1未満のランダムな数字を作る
  const randomNumber = Math.random();

  // 配列の番号として使える整数にする
  const randomIndex = Math.floor(randomNumber * choices.length);
  // ランダムに選ばれた候補を取得する
  const selectedChoice = choices[randomIndex];

  // 結果を表示する場所を取得
  const resultEl = document.querySelector("#result");

  // ランダムに選ばれた二次会候補を表示
  resultEl.innerText =
    "🎉 " + selectedChoice + "!";
});
