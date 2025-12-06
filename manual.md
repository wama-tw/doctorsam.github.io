# 《網站內容修改說明》

（適用沒有程式背景的使用者）

本網站的所有內容（文字、標題、分類、文章…）都可以透過修改 **JSON 檔** 來更新。
JSON 檔就像 Excel 表格，只是以文字方式呈現，格式固定，只要照著現有格式修改內容即可。

請務必注意：
**不要刪掉逗號、引號、大括號 `{}`、中括號 `[]`，只修改裡面的中文字即可。**

---

## 一、重要提醒：不要使用 Word 或記事本（Notepad）

請 **不要用以下工具開啟或編輯 JSON：**

* Microsoft Word
* Windows 記事本（Notepad）
* Mac TextEdit（未切換純文字時）

這些工具會自動更改格式或編碼，**非常容易造成 JSON 壞掉、網站無法顯示**。

### ✔ 建議使用以下工具（免費）

**1. 線上 JSON 編輯器（最推薦）**
只要把 JSON 內容貼上去編輯即可：

* [https://jsoneditoronline.org](https://jsoneditoronline.org)
* [https://jsonlint.com](https://jsonlint.com)

這些工具會：

* 自動檢查格式是否有錯
* 自動排版讓內容更清楚
* 提醒你哪裡少逗號、少引號

**2. VS Code（免費文字編輯器）**
適合想在電腦上編輯的人。

---

## 二、網站內容在哪裡修改？

所有可調整內容都在以下資料夾：

```
data/
```

裡面有不同的 JSON：

| JSON 檔名              | 用途                      |
| -------------------- | ----------------------- |
| site.json            | 網站選單（上方按鈕）、LOGO 文字、頁尾資訊 |
| home.json            | 首頁所有內容                  |
| doctor.json          | 醫師介紹頁內容                 |
| interaction.json     | 醫病互動（列表頁）               |
| interactionArticles/ | 醫病互動每篇文章                |
| disease/index.json   | 病症說明分類列表                |
| diseaseArticles/     | 病症說明文章內容                |
| consult.json         | 醫療諮詢頁內容                 |
| consultArticles/     | 醫療諮詢文章                  |
| faq.json             | 常見問題（FAQ）分類與問答內容        |

只要修改 JSON 檔，重新整理瀏覽器即會看到最新內容。
（目前流程為醫師修改後交給我們上傳，未來若測試無誤會開放自行上網編輯）

---

## 三、如何修改 JSON？

### 1. 請務必使用建議的編輯器

（jsoneditoronline.org 或 VS Code）

打開 JSON 後，你會看到類似這樣：

```json
{
  "title": "醫師介紹",
  "sections": [
    {
      "type": "text",
      "paragraphs": [
        "吳博貴醫師為臺北榮民總醫院骨科部醫師。",
        "專長包含骨腫瘤、軟組織腫瘤、關節置換等。"
      ]
    }
  ]
}
```

你只需要修改中文字：

* `"title"`
* `"paragraphs"` 裡的段落
* 其他像 `"type"`、`[]`、`{}` 不能動！

---

## 四、常見修改範例

---

### 範例 1：修改首頁數字（例、％、篇）

打開：

```
data/home.json
```

找到：

```json
"stats": [
  { "label": "每年治療骨骼肌肉腫瘤", "value": "123 例" },
  { "label": "全台骨肉瘤於本中心治療比例", "value": "123 %" },
  { "label": "SCI 醫學論文", "value": "132 篇" }
]
```

改成你想要的數字，例如：

```json
"132 篇" → "50 篇"
```

存檔 → 重新整理網站即可更新。

---

### 範例 2：修改「醫師介紹」內容

打開：

```
data/doctor.json
```

找到：

```json
"paragraphs": [
  "吳博貴醫師為臺北榮民總醫院骨科部醫師。",
  "專長包含骨腫瘤、軟組織腫瘤、關節置換等。"
]
```

直接改段落文字即可：

```json
"陳山姆醫師臺大醫院現任骨科部醫師。"
```

---

### 範例 3：修改病症分類名稱

打開：

```
data/disease/index.json
```

找到某分類：

```json
{
  "id": "bone-sarcoma",
  "label": "惡性骨腫瘤切除",
  "description": "介紹惡性骨腫瘤的資訊。",
  "articleIds": ["bone-1", "bone-2"]
}
```

你可以修改：

* `"label"`：分類名稱
* `"description"`：分類介紹

**不要修改 `"id"`**（除非你知道會造成什麼影響）

---

### 範例 4：修改某一篇文章

例如：

```
data/interactionArticles/encouragement.json
```

內容：

```json
{
  "id": "encouragement",
  "title": "病友對醫師的鼓勵",
  "date": "2021-05-03",
  "excerpt": "謝謝病友的鼓勵。",
  "sections": [
    {
      "type": "text",
      "paragraphs": [
        "第一段內容在這裡。",
        "第二段內容在這裡。"
      ]
    }
  ]
}
```

可以改：

* `"title"`：文章標題
* `"date"`：日期
* `"excerpt"`：列表頁摘要
* `"paragraphs"`：文章段落

---

### 範例 5：新增一篇文章（例：醫病互動）

1. 到資料夾：

   ```
   data/interactionArticles/
   ```
2. 複製一份現有 JSON（例如 encouragement.json）
3. 改檔名，例如：

   ```
   thanks-2025.json
   ```
4. 打開並修改內容（改中文即可）
5. 最後到：

```
data/interactionArticles/index.json
```

把新文章加入列表：

```json
"articleIds": [
  "encouragement",
  "video-home",
  "thanks-2025"
]
```

→ 新文章就會出現在網站上。

---

## 五、修改後沒顯示？常見原因在這兩種：

### 1. JSON 格式錯誤（最常見）

例如漏逗號：

```json
"第一段文字"
"第二段文字"
```

應改成：

```json
"第一段文字",
"第二段文字"
```

線上 JSON 編輯器會自動提示錯誤，建議務必使用。

---

### 2. 檔名與 `"id"` 不一致

例如：

檔名：

```
thanks-2025.json
```

裡面必須是：

```json
"id": "thanks-2025"
```

否則網站會讀不到。
