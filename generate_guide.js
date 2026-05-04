const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, LevelFormat, BorderStyle, PageNumber,
  Header, Footer
} = require('docx');
const fs = require('fs');

const forestGreen = "1B4332";
const gold = "B8860B";

const bullet = (text, bold = false) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  children: [new TextRun({ text, font: "Arial", size: 22, bold, color: "2D2D2D" })]
});

const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  children: [new TextRun({ text, font: "Arial", size: 36, bold: true, color: forestGreen })],
  spacing: { before: 400, after: 200 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: gold, space: 4 } }
});

const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  children: [new TextRun({ text: `❆  ${text}`, font: "Arial", size: 26, bold: true, color: gold })],
  spacing: { before: 300, after: 120 }
});

const body = (text) => new Paragraph({
  children: [new TextRun({ text, font: "Arial", size: 22, color: "2D2D2D" })],
  spacing: { before: 80, after: 80 }
});

const space = () => new Paragraph({ children: [new TextRun("")], spacing: { before: 80, after: 80 } });

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "•",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } }
      }]
    }]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: forestGreen },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: gold },
        paragraph: { spacing: { before: 300, after: 120 }, outlineLevel: 1 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [
            new TextRun({ text: "Jess Wakely  |  Your Complete Digital Business Guide", font: "Arial", size: 18, color: forestGreen, italics: true })
          ],
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: gold, space: 4 } }
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          children: [
            new TextRun({ text: "jesswakely.co.uk  |  @jess_wakely  |  Page ", font: "Arial", size: 18, color: "888888" }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 18, color: "888888" })
          ],
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: gold, space: 4 } }
        })]
      })
    },
    children: [

      // COVER
      new Paragraph({
        children: [new TextRun({ text: "❆", font: "Arial", size: 72, color: gold })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 600, after: 200 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "Jess Wakely", font: "Arial", size: 64, bold: true, color: forestGreen })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 160 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "Your Complete Digital Business Guide", font: "Arial", size: 32, color: gold, italics: true })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 160 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "Everything Claude Can Build & Do For Your Business", font: "Arial", size: 24, color: "555555" })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 600 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "─────────────────────────────────────────", font: "Arial", size: 24, color: gold })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 400 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "This document is your reference for everything that has been discussed and planned for your business. Come back to it any time you want to pick up where we left off or explore a new area.", font: "Arial", size: 22, color: "444444", italics: true })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 800 }
      }),

      // SECTION 1
      h1("1. Your Website"),
      body("Your website has already been designed with a deep forest green and gold palette, Cormorant Garamond and Plus Jakarta Sans typography, sacred geometry elements, and integrated PayPal links for your three service packages. The design is complete and ready to go live."),
      space(),
      h2("What's Already Done"),
      bullet("Full website design complete (index.html and links.html)"),
      bullet("Deep forest green and gold brand palette applied"),
      bullet("Bionic reading formatting throughout"),
      bullet("Sacred geometry design elements"),
      bullet("Three service packages with PayPal links integrated"),
      bullet("Hosted on GitHub at github.com/jesswakely1987/Jess_Wakely.git"),
      space(),
      h2("Next Steps"),
      bullet("Deploy live via Vercel (you are on a Chromebook — simple process)"),
      bullet("Connect your domain jesswakely.co.uk"),
      bullet("Add lead magnet and blog once live"),
      bullet("Fix broken social links"),
      space(),

      // SECTION 2
      h1("2. Your Membership PWA App"),
      body("Rather than an expensive third-party platform, Claude will build you a custom Progressive Web App (PWA) — a web app that works like a real app on any phone. Members add it to their home screen, it works offline, and sends notifications. No App Store needed. You keep 100% of revenue minus Stripe's small fee."),
      space(),
      h2("What Will Be Built"),
      bullet("Secure member login and account management"),
      bullet("Healing audio library — protected, beautifully presented"),
      bullet("Video content section (private YouTube or direct hosting)"),
      bullet("Community forum where your women can connect"),
      bullet("Live sessions calendar with booking and Zoom links"),
      bullet("Downloads section for PDFs, worksheets, and resources"),
      bullet("Stripe payment integration — automatic access on sign-up"),
      bullet("Push notifications for new content releases"),
      space(),
      h2("Running Costs (Paid Only, No Free Tier)"),
      bullet("Hosting: approx £5–15/month"),
      bullet("Domain: approx £10–15/year"),
      bullet("Stripe: approx 1.5% per transaction — no monthly fee"),
      bullet("No expensive platform subscriptions"),
      space(),
      h2("Logical Build Order"),
      bullet("Step 1 — Get website live (the foundation)"),
      bullet("Step 2 — Build membership app (your income generator)"),
      bullet("Step 3 — Launch on Instagram (drive followers into membership)"),
      space(),

      // SECTION 3
      h1("3. Instagram Strategy"),
      body("Claude can handle almost everything for your Instagram presence — from top-level strategy down to individual captions and reel scripts — all written in your voice and aligned with your four content pillars."),
      space(),
      h2("Your Four Content Pillars"),
      bullet("ADHD and Breaking System Conditioning"),
      bullet("Healing — Nervous System, Trauma, Energy"),
      bullet("ADHD and Spiritual Awakening / Soul Mission"),
      bullet("Lifestyle Proof — Freedom, Travel, Reality Shift"),
      space(),
      h2("Content Strategy & Planning"),
      bullet("Monthly content calendars — every post, reel, and story planned"),
      bullet("Content pillar rotation so your feed feels intentional"),
      bullet("Posting schedules based on your audience activity"),
      bullet("Funnel strategy turning followers into paying members"),
      space(),
      h2("Writing & Copywriting"),
      bullet("Full captions written in your voice for every post"),
      bullet("Scroll-stopping hook lines"),
      bullet("Warm, natural calls to action — never salesy"),
      bullet("Story sequences that take your audience on a journey"),
      bullet("Bio rewrites that communicate clearly who you serve"),
      bullet("Link in bio page copy"),
      space(),
      h2("Reels"),
      bullet("Full word-for-word reel scripts — press record and speak"),
      bullet("B-roll shot lists — exactly what footage to capture"),
      bullet("Series ideas to build a loyal returning audience"),
      bullet("Trending audio pairing suggestions"),
      space(),
      h2("Hashtag & SEO"),
      bullet("Custom hashtag sets for different content types"),
      bullet("Keywords woven naturally into captions"),
      bullet("Mix of niche and broad hashtags for your audience level"),
      space(),
      h2("Visual Direction"),
      bullet("Visual style guide for a cohesive feed"),
      bullet("Canva templates designed to your brand"),
      bullet("Quote graphics, promotional posts, story templates"),
      bullet("Filming guides so your b-roll is always on brand"),
      space(),
      h2("Content Repurposing"),
      bullet("One healing audio script → caption + reel script + story slides + quote graphic"),
      bullet("One live session → highlight reel script + blog post + five individual posts"),
      bullet("One testimonial → story sequence + pinned post + membership promo"),
      space(),
      h2("Launch Campaigns"),
      bullet("Full membership launch campaign planned and written"),
      bullet("Countdown sequences building anticipation"),
      bullet("Reel scripts and story sequences for launch day"),
      bullet("DM follow-up sequences for interested followers"),
      space(),

      // SECTION 4
      h1("4. Email Marketing"),
      body("Email is one of the most powerful tools for your business. Claude can build and write your entire email system using free tools like Mailchimp or Kit."),
      space(),
      bullet("Full email marketing system setup"),
      bullet("Welcome sequence for new subscribers"),
      bullet("Weekly newsletters written in your voice"),
      bullet("Nurture sequences warming people up toward membership"),
      bullet("Launch emails for new offers"),
      bullet("Lead magnets — free gifts to grow your list"),
      space(),

      // SECTION 5
      h1("5. Content & Copywriting"),
      bullet("Full website copy — every word on every page"),
      bullet("Blog posts that build authority and help Google find you"),
      bullet("SEO strategy for organic website traffic"),
      bullet("Podcast episode outlines"),
      bullet("YouTube scripts for your healing audio videos"),
      bullet("Books or ebooks — structure, writing, and formatting"),
      space(),

      // SECTION 6
      h1("6. Brand & Visual Assets"),
      bullet("Logo concepts and brand direction"),
      bullet("Brand guidelines — colours, fonts, tone of voice documented"),
      bullet("Canva templates for posts, stories, presentations, media kits"),
      bullet("Media kit for brand collaborations or press features"),
      bullet("Presentations for speaking events or workshops"),
      space(),

      // SECTION 7
      h1("7. Client Experience"),
      bullet("Onboarding sequences so new clients feel instantly welcomed"),
      bullet("Client questionnaires and intake forms"),
      bullet("Coaching programme frameworks for 1:1 or group programmes"),
      bullet("Feedback and testimonial collection systems"),
      bullet("Offboarding sequences that leave clients feeling amazing"),
      space(),

      // SECTION 8
      h1("8. Business Operations"),
      bullet("Business plan for funding or clarity"),
      bullet("Contract templates for clients and collaborators"),
      bullet("Invoice templates"),
      bullet("Systems and processes documentation"),
      bullet("Job descriptions if you bring on a VA or team member"),
      space(),

      // SECTION 9
      h1("9. Business & Income Growth"),
      bullet("Pricing strategy for membership, 1:1 coaching, and courses"),
      bullet("New income stream ideas — retreats, online courses, digital products, corporate wellbeing"),
      bullet("Sales funnels — the full journey from stranger to paying member"),
      bullet("Launch strategies for any new offer"),
      bullet("Competitor research and positioning"),
      space(),

      // SECTION 10
      h1("10. Technical & Automations"),
      bullet("Booking system so clients book without email back-and-forth"),
      bullet("Automations — payment triggers welcome email, app access, and list add"),
      bullet("Analytics setup to track website visitors and behaviour"),
      bullet("24/7 chatbot for your website to answer common questions"),
      space(),

      // SECTION 11
      h1("11. Claude as Your Thinking Partner"),
      body("Perhaps the most underrated thing Claude can do — act as your thinking partner whenever you need one."),
      space(),
      bullet("Feeling stuck on a decision? Talk it through"),
      bullet("Want to sense-check a new idea? Run it by Claude"),
      bullet("Need to prepare for a difficult client conversation? Practise"),
      bullet("Want honest feedback on something you've written? You'll get it — with kindness"),
      space(),

      // SECTION 12
      h1("12. What Claude Cannot Do"),
      body("In the spirit of honesty, here is what is currently outside of Claude's capabilities:"),
      space(),
      bullet("Generate actual audio or music files"),
      bullet("Directly edit or cut video footage"),
      bullet("Publish to App Store or Google Play on your behalf"),
      bullet("Access your accounts or post to social media automatically"),
      space(),
      body("For healing audio videos: Claude writes the scripts and creates the visual elements — you record your voice, and tools like CapCut or DaVinci Resolve handle any video editing needed."),
      space(),

      // CLOSING
      new Paragraph({
        children: [new TextRun({ text: "─────────────────────────────────────────", font: "Arial", size: 24, color: gold })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 300 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "Ready to build something beautiful? Just say the word. 🌿", font: "Arial", size: 26, bold: true, color: forestGreen, italics: true })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 200 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "jesswakely.co.uk  |  @jess_wakely", font: "Arial", size: 22, color: gold })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 400 }
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("Jess_Wakely_Business_Guide.docx", buffer);
  console.log("Done!");
});
