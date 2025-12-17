# On Liberty & Power

Political essays in the rhetorical tradition of 1750-1789 liberty writers, addressing contemporary events through an 18th-century philosophical lens.

## Site

**Live at:** [onliberty.press](https://onliberty.press)

## Structure

```
/
├── index.html          # Main page with article listing
├── article.html        # Individual essay view
├── styles.css          # Parchment/pamphlet aesthetic
├── main.js             # Article loading and pagination
├── articles.json       # Master article index
├── CNAME               # Custom domain configuration
├── site.webmanifest    # PWA manifest
└── /YYYY/MM/           # Article content by date
    └── DD-XX.json      # Individual articles (DD = day, XX = sequence)
```

## Article JSON Format

Individual articles (`/YYYY/MM/DD-XX.json`):

```json
{
  "headline": "Essay Title",
  "timestamp": "2025-12-17T12:00:00.000Z",
  "author": "In the Style of Thomas Paine",
  "penName": "COMMON SENSE",
  "preview": "First paragraph preview for index page...",
  "content": "<p>Full essay content in HTML...</p>",
  "image": "/images/illustration.jpg",
  "imageCaption": "Optional caption",
  "source": "BBC",
  "sourceUrl": "https://...",
  "detailPage": "/article.html?date=2025-12-17&seq=01"
}
```

## Writers

Essays may be written in the voice of:

- **Hamilton** - Systematic argument, economic reasoning
- **Madison** - Constitutional philosophy, faction theory
- **Adams** - Legal argument with moral weight
- **Patrick Henry** - Urgent emotional appeals
- **Paine** - Accessible prose, common voice, sharp wit
- **Jefferson** - Elegant declarations, natural rights philosophy

## License

Content © Sean FitzGerald. All rights reserved.
