const select = document.getElementById("bootcampSelect");
const form = document.getElementById("bootcampForm");

let currentId = null;

// Load dropdown
async function loadBootcamps() {
  const res = await fetch("/admin/api/bootcamps");
  const data = await res.json();

  data.forEach(b => {
    const opt = document.createElement("option");
    opt.value = b.id;
    opt.textContent = b.title;
    select.appendChild(opt);
  });
}

select.addEventListener("change", async () => {
  currentId = select.value;
  if (!currentId) return;

  const res = await fetch(`/admin/api/bootcamps/${currentId}`);
  const d = await res.json();

  document.getElementById("title").value = d.title || "";
  document.getElementById("price").value = d.price || "";
  document.getElementById("duration").value = d.duration || "";
  document.getElementById("ImgLink").value = d.ImgLink || "";
  document.getElementById("Syllabus").value = (d.Syllabus || []).join(", ");
  document.getElementById("Prerequisites").value = (d.Prerequisites || []).join(", ");
});

form.addEventListener("submit", async e => {
  e.preventDefault();
  if (!currentId) return alert("Select a bootcamp first");

  const payload = {
    title: title.value,
    price: price.value,
    duration: duration.value,
    ImgLink: ImgLink.value,
    Syllabus: Syllabus.value.split(",").map(s => s.trim()).filter(Boolean),
    Prerequisites: Prerequisites.value.split(",").map(p => p.trim()).filter(Boolean)
  };

  const res = await fetch(`/admin/api/bootcamps/${currentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) alert("Bootcamp updated!");
  else alert("Update failed");
});

loadBootcamps();
