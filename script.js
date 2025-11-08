// ⭐ สร้างดาวพื้นหลัง
const starContainer = document.getElementById('stars-container');

function createStars(count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2 + 1;
    star.classList.add('star');
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    starContainer.appendChild(star);
  }
}

// 🌠 ดาวตก
function createShootingStar() {
  const shooting = document.createElement('div');
  shooting.classList.add('shooting-star');
  shooting.style.top = `${Math.random() * 10}vh`;
  shooting.style.left = `${Math.random() * 100}vw`;
  shooting.style.animationDuration = `${1 + Math.random()}s`;
  document.body.appendChild(shooting);
  setTimeout(() => shooting.remove(), 2000);
}

// ✅ Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');

function handleReveal() {
  for (let el of reveals) {
    const windowHeight = window.innerHeight;
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  }
}
window.addEventListener("scroll", handleReveal);
handleReveal(); // run once on load

// ✅ Tilt 3D สำหรับการ์ดแนะนำตัว
const card = document.getElementById('card');
if (card) {
  const cardInner = card.querySelector('.card-inner');

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;
    cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    cardInner.style.transform = `rotateX(0) rotateY(0)`;
  });
}

// ✅ Loader แล้วค่อยแสดงเนื้อหา
window.addEventListener("load", function () {
  // ⭐ สร้างดาวพื้นหลัง
  createStars(120);

  // 🌠 ดาวตกสุ่มเวลา
  setInterval(() => {
    const numStars = 10;
    for (let i = 0; i < numStars; i++) {
      setTimeout(() => createShootingStar(), Math.random() * 2000);
    }
  }, 2000);

  // ✅ Loader แล้วแสดงเนื้อหา
  const loader = document.querySelector(".loader-wrapper");
  const content = document.getElementById("main-content");

  setTimeout(() => {
    loader.classList.add("fade-out");

    setTimeout(() => {
      loader.style.display = "none";
      content.classList.add("show");
      handleReveal(); // refresh reveal
    }, 1000);
  }, 500);

  // 🔁 Auto Gallery loop
  const gallery = document.getElementById("auto-gallery");
  gallery.innerHTML += gallery.innerHTML;

  function scrollGallery() {
    gallery.scrollLeft += 1;
    if (gallery.scrollLeft >= gallery.scrollWidth / 2) {
      gallery.scrollLeft = 0;
    }
  }

  setInterval(scrollGallery, 20); // ปรับความเร็วได้
});
window.addEventListener("load", function () {
  const gallery = document.getElementById("auto-gallery");

  const images = [
  "ars/IMG_6392.jpeg",
  "ars/IMG_6393.jpeg",
  "ars/IMG_6394.jpeg",
  "ars/IMG_6398.jpeg",
  "ars/IMG_6399.jpeg",
  "ars/IMG_6400.jpeg",
  "ars/IMG_6401.jpeg",
  "ars/IMG_6404.jpeg",
  "ars/IMG_6405.jpeg",
  "ars/IMG_6406.jpeg",
  "ars/IMG_6407.jpeg"
];

  // 🔀 ฟังก์ชันสุ่มเรียงรูปใหม่
  function shuffleArray(arr) {
    return arr
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  // 🚀 โหลดรูปสุ่มใส่ gallery
  function loadRandomGallery() {
    gallery.innerHTML = "";
    const shuffled = shuffleArray(images);

    shuffled.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.className = "gallery-img";
      gallery.appendChild(img);
    });

    // 🔁 Clone เพื่อให้ scroll วนได้
    gallery.innerHTML += gallery.innerHTML;
  }

  loadRandomGallery(); // เรียกตอนเริ่ม

  // ⏱ สุ่มชุดใหม่ทุก 20 วิ
  setInterval(loadRandomGallery, 20000);

  // ➡️ Auto Scroll ซ้าย → ขวา
  function scrollGallery() {
    gallery.scrollLeft += 1;
    if (gallery.scrollLeft >= gallery.scrollWidth / 2) {
      gallery.scrollLeft = 0;
    }
  }

  setInterval(scrollGallery, 20);
});