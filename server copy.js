import express from "express";
import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import slugify from "slugify";
import cors from "cors";
import certTemplate from "./certTemplate.js";
import bootcampTemplate from "./bootcampTemplate.js";



const app = express();
app.use(express.json());
app.use(cors());

/* ===== PATH FIX (ES MODULES) ===== */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===== FIREBASE ADMIN INIT ===== */

const serviceAccount = JSON.parse(
  fs.readFileSync("./newServiceAccount.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();



/* ===== SERVE HTML PAGE ===== */

app.use(express.static(__dirname)); // serve index.html from same folder

app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  console.log("📦 Body:", req.body);
  next();
});
app.set("view engine", "ejs");
app.set("views", __dirname); // put update_certs.ejs here

/* ===== API ENDPOINT ===== */

app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, 'create_cert.html'))
})

app.get("/cert", async (req, res) => {
    res.sendFile(path.join(__dirname, 'create_cert.html'))
})

app.get("/camp", async (req, res) => {
    res.sendFile(path.join(__dirname, 'create_camp.html'))
})

app.post("/cert", async (req, res) => {
  try {
    const {
      title,
      duration,
      ImgLink,
      Highlights,
      Prerequisites,
      KeySkills
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const docId = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    const docData = {
      id: docId, // optional but recommended
      title,
      duration,
      ImgLink,
      Highlights,
      Prerequisites,
      KeySkills,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = db
      .collection("Certifications")
      .doc(docId);

    await docRef.set(docData);

    res.status(201).json({
      success: true,
      id: docId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save certification" });
  }
});



/* Get all Certification document IDs */
app.get("/api/certifications", async (req, res) => {
  const snap = await db.collection("Certifications").get();
  res.json(snap.docs.map(d => d.id));
});

/* Get one Certification */
app.get("/api/certifications/:id", async (req, res) => {
  const doc = await db.collection("Certifications").doc(req.params.id).get();
  res.json(doc.data());
});

/* Update Certification */
app.put("/api/certifications/:id", async (req, res) => {
  await db.collection("Certifications").doc(req.params.id).update(req.body);
  res.json({ success: true });
});

app.get("/update", (req, res) => {
  res.sendFile(path.join(__dirname, "update.html"));
});

app.delete("/admin/pages/:type/:id", async (req, res) => {
  const { type, id } = req.params;

  if (!["Bootcamps", "Certifications"].includes(type)) {
    return res.status(400).json({ error: "Invalid collection" });
  }

  try {
    await db.collection(type).doc(id).delete();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

app.get("/list", async (req, res) => {
  res.sendFile(path.join(__dirname, "list.html"));
}) 

app.get("/admin/pages", async (req, res) => {
  try {
    const bootcampsSnap = await db.collection("Bootcamps").get();
    const certsSnap = await db.collection("Certifications").get();

    const Bootcamps = bootcampsSnap.docs.map(d => ({
      id: d.id,
      type: "Bootcamps"
    }));

    const Certifications = certsSnap.docs.map(d => ({
      id: d.id,
      type: "Certifications"
    }));

    res.json([...Bootcamps, ...Certifications]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch pages" });
  }
});


app.get("/camp/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const docRef = db.collection("Bootcamps").doc(id);
    const snap = await docRef.get();


    if (!snap.exists) {
      return res.status(404).send("Certification not found");
    }

    const data = snap.data();
    // const keySkills = data["Key Skills"];
    // const prerequisites = data["pre-req"];

    const html = bootcampTemplate({
      title: data.title,
      price: data.Price,
      duration: data.duration,
      imageUrl: data.ImgLink,
      prerequisites: data.Prerequisites,
      keySkills: data.Syllabus
    });

    res.setHeader("Content-Type", "text/html");
    console.log(data.Syllabus);
    res.send(html);

  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to render certification page");
  }
});



app.post("/camp", async (req, res) => {
  try {
    const {
    title,
    price,
    duration,
    ImgLink,
    Syllabus,
    Prerequisites,
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const docId = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    const docData = {
      id: docId, // optional but recommended
      title,
      price,
      duration,
      ImgLink,
      Syllabus,
      Prerequisites,
      Highlights: [],                 // 👈 add this
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = db
      .collection("Bootcamps")
      .doc(docId);

    await docRef.set(docData);

    res.status(201).json({
      success: true,
      id: docId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save certification" });
  }
});


// app.get("/update", async (req, res) => {
//   try {
//     const snapshot = await db.collection("Certifications").get();
//     const docs = snapshot.docs.map(doc => ({
//       id: doc.id,
//       title: doc.data().Title,
//       duration: doc.data().duration || "",
//       ImgLink: doc.data().ImgLink || "",
//       Highlights: doc.data().Highlights || [],
//       preReq: doc.data().pre-req || []
//     }));
//     console.log(docs)

//     // Render EJS template and pass all docs
//     res.render("update_certs", { certifications: docs });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Failed to load update page");
//   }
// });

// app.post("/update", async (req, res) => {
//   try {
//     const docId = req.query.docId;
//     if (!docId) return res.status(400).json({ error: "select a page to update!"});
//     const data = req.body;

//     // Optional: if title changed and you want to rename docId
//     // const newDocId = slugify(data.title, { lower: true, strict: true, trim: true });

//     await db.collection("Certifications").doc(docId).update({
//       ...data,
//       updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     res.json({ success: true, id: docId });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to update certification" });
//   }
// });
/* ===== START SERVER + OPEN PAGE ===== */
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const docRef = db.collection("Certifications").doc(id);
    const snap = await docRef.get();


    if (!snap.exists) {
      return res.status(404).send("Certification not found");
    }

    const data = snap.data();
    // const keySkills = data["Key Skills"];
    // const prerequisites = data["pre-req"];

    const html = certTemplate({
      title: data.title,
      price: data.Price,
      duration: data.duration,
      imageUrl: data.ImgLink,
      courseHighlights: data.Highlights,
      prerequisites: data.Prerequisites,
      keySkills: data.KeySkills
    });

    res.setHeader("Content-Type", "text/html");
    res.send(html);

  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to render certification page");
  }
});

const PORT = 3000;

app.listen(PORT, async () => {
  const url = `http://localhost:${PORT}`;
  console.log(`🚀 Server running on ${url}`);
//   await open(url);
});
