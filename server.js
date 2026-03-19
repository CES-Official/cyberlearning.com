import express from "express";
import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";
import certTemplate from "./certTemplate.js";
import bootcampTemplate from "./bootcampTemplate.js";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv"; // import the module as a variable
// server.js
// import express from "express";

dotenv.config();
const app = express();

/* ================= FIREBASE INIT ================= */

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { db };


/* =========================================================
   🔓 SECURITY HEADERS
   ========================================================= */
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));
const ALLOWED_ORIGINS = [
  "https://cyberlearningindia.com",
  "https://www.cyberlearningindia.com",
  "http://localhost:3000"
];

app.use(cors({
  origin: ALLOWED_ORIGINS,
  credentials: true
}));

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      "script-src-attr": ["'unsafe-inline'"],
      "style-src": [
        "'self'",
        "'unsafe-inline'",
        "https://cdn.jsdelivr.net",
        "https://fonts.googleapis.com",
        "https://cdnjs.cloudflare.com"
      ],
      "font-src": ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      "img-src": [
        "'self'",
        "data:",
        "blob:",
        "https://*.flaticon.com",
        "https://*.pngall.com",
        "https://www.pngall.com",
        "https://*.uxwing.com",
        "https://uxwing.com",
        "https://learn.microsoft.com",
        "https://images.credly.com",
        "https://*.udemycdn.com",
      ],
      "connect-src": ["'self'", "https://cdn.jsdelivr.net"],
      "worker-src": ["'self'", "blob:"],
      "object-src": ["'none'"],
      "base-uri": ["'self'"],
      "form-action": ["'self'"]
    }
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

/* ================= PATH FIX ================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* ================= FIREBASE INIT ================= */

app.use(express.static(path.join(__dirname)));

/* ================= API RATE LIMIT ================= */

// app.use((req, res, next) => {
//   console.log("➡️", req.method, req.url);
//   next();
// });

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", apiLimiter);

app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

/* =========================================================
   🔓 PUBLIC HTML PAGES
   ========================================================= */
console.log("File exists?", fs.existsSync(path.join(__dirname, "meetings.html")));

/* Home */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

/* Public list pages */
app.get("/bootcamps", (req, res) => {
  res.sendFile(path.join(__dirname, "bootcamps.html"));
});

app.get("/certifications", (req, res) => {
  res.sendFile(path.join(__dirname, "certifications.html"));
});

app.get("/brochure", (req, res) => {
  res.sendFile(path.join(__dirname, "brochure.pdf"));
});

app.get("/bootcamps/:id", async (req, res) => {
  try {
    const docId = req.params.id.toLowerCase();

    const snap = await db.collection("Bootcamps").doc(docId).get();

    if (!snap.exists) {
      return res.status(404).send(`
        <h1>Bootcamp Not Found</h1>
        <p>Could not find a bootcamp with ID: ${docId}</p>
        <a href="/">Return Home</a>
      `);
    }

    const d = snap.data();

    res.send(
      bootcampTemplate({
        title: d.title,
        price: d.price,
        duration: d.duration,
        imageUrl: d.ImgLink,
        prerequisites: d.Prerequisites || [],
        keySkills: d.Syllabus || []
      })
    );
    
  } catch (err) {
    console.error("Error fetching bootcamp:", err);
    res.status(500).send("Failed to load bootcamp page.");
  }
});

app.get("/certifications/:id", async (req, res) => { try { const snap = await db.collection("Certifications").doc(req.params.id).get(); if (!snap.exists) return res.status(404).send("Certification not found"); const d = snap.data(); res.send( certTemplate({ title: d.title, price: d.price, duration: d.duration, imageUrl: d.ImgLink, courseHighlights: d.Highlights, prerequisites: d.Prerequisites, keySkills: d.KeySkills, }) ); } catch (err) { console.error(err); res.status(500).send("Failed to load certification"); } });

/* =========================================================
   🔓 PUBLIC API (READ ONLY)
   ========================================================= */

app.get("/api/bootcamps", async (req, res) => {
  const snap = await db.collection("Bootcamps").get();
  res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
});

app.get("/api/certifications", async (req, res) => {
  const snap = await db.collection("Certifications").get();
  res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
});



/* =========================================================
   🚀 START SERVER
   ========================================================= */

const PORT = "3000";

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});