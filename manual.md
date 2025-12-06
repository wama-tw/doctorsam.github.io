# 《網站內容修改說明》


本網站的所有內容（文字、標題、分類、文章…）都可以透過修改 **JSON 檔** 來更新。
JSON 檔就像 Excel 表格，只是以文字方式呈現，格式固定，只要照著現有格式修改內容就好。

請務必注意：**不要刪掉逗號、引號、大括號 `{}`、中括號 `[]`，只修改裡面的中文字即可。**

---

## 一、我要修改哪裡？

網站的內容都放在以下資料夾：

```
data/
```

裡面有不同的 JSON：

| JSON 檔名              | 用途                       |
| -------------------- | ------------------------ |
| site.json            | 網站選單（上方的按鈕）、LOGO 文字、頁尾文字 |
| home.json            | 首頁所有內容                   |
| doctor.json          | 醫師介紹頁內容                  |
| interaction.json     | 醫病互動（列表頁）                |
| interactionArticles/ | 醫病互動的每篇文章                |
| disease/index.json   | 病症說明的分類列表                |
| diseaseArticles/     | 病症說明的文章內容                |
| consult.json         | 醫療諮詢頁                    |
| consultArticles/     | 醫療諮詢文章                   |
| faq.json             | 常見問題分類與問答內容              |

只要改 JSON 檔內容，重新整理網頁就會更新。

---

## 二、如何修改 JSON？

### 1. 使用記事本 (文字編輯器) 即可

每個 JSON 檔都可以用：

* Windows：記事本
* Mac：TextEdit（文字模式）

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

**你只需要修改裡面的中文字即可。**

---

## 三、常見修改範例

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

直接改成你要顯示的數字，例如：

```json
"123 篇" → "50 篇"
```

存檔後重新整理網頁即可看到更新。

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

把裡面文字改掉即可，例如：

```json
"陳山姆醫師臺大醫院現任骨科部醫師。"
```

---

### 範例 3：修改「病症分類名稱」

打開：

```
data/disease/index.json
```

找到：

```json
{
  "id": "bone-sarcoma",
  "label": "惡性骨腫瘤切除",
  "description": "介紹惡性骨腫瘤的資訊。",
  "articleIds": ["bone-1", "bone-2"]
}
```

你可以修改：

* `"label"` → 類別名稱
* `"description"` → 左邊分類下的簡短介紹

**不要改 `"id"`（除非你知道自己在做什麼）**

---

### 範例 4：修改某一篇文章內容

文章都在：

```
interactionArticles/
diseaseArticles/
consultArticles/
```

每個文章是獨立 JSON，例如：

```
data/interactionArticles/encouragement.json
```

裡面長這樣：

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

你可以修改：

* `"title"`：文章標題
* `"date"`：日期
* `"excerpt"`：文章摘要（顯示在列表頁）
* `"paragraphs"`：文章段落內容

每個段落都是一段文字，想新增段落只要加新的一行，例如：

```json
"paragraphs": [
  "第一段內容。",
  "第二段內容。",
  "第三段內容。"
]
```

---

### 範例 5：新增一篇文章

例如你想新增醫病互動文章：

1. 去 `data/interactionArticles/`
2. 複製一份別的 JSON
3. 改檔名，例如：

   ```
   thanks-2025.json
   ```
4. 打開並修改內容，例如：

```json
{
  "id": "thanks-2025",
  "title": "感謝醫師 2025",
  "date": "2025-01-01",
  "excerpt": "病友分享心得。",
  "sections": [
    {
      "type": "text",
      "paragraphs": [
        "這是一段新的文章內容。",
        "這裡是第二段。"
      ]
    }
  ]
}
```

5. 最後去 `data/interactionArticles/index.json`
   把文章加入列表：

```json
"articleIds": [
  "encouragement",
  "video-home",
  "thanks-2025"
]
```

→ 新的文章就會出現在網頁上了。

---

## 四、修改後沒顯示，怎麼辦？

通常是兩種原因：

### 1. JSON 無法讀取（通常是漏逗號）

例如：

```json
"paragraphs": [
  "第一段文字"
  "第二段文字"
]
```

兩段文字之間**需要逗號**：

```json
"第一段文字",
"第二段文字"
```

### 2. 不要動 `"id"` 或 `.json` 檔名

例如這篇文章：

```
thanks-2025.json
```

裡面的 `"id"` 必須是：

```json
"id": "thanks-2025"
```

否則網站找不到它。

---

## 五、重點整理（最重要的三句）

1. **只改中文字，不要改符號（逗號、括號、引號）**
2. **新增文章只需要複製 JSON 改裡面的文字，然後加入 index.json**
3. **所有頁面都不用改程式，改 JSON 後重新整理就會更新**

---
