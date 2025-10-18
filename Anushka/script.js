document.addEventListener("DOMContentLoaded", () => {

  const typing = document.querySelector(".typing");
  const words = ["a Developer", "an Explorer", "a Learner"];
  let i = 0, j = 0, deleting = false;

  function type() {
    const word = words[i];
    typing.textContent = word.slice(0, j);
    if (!deleting && j < word.length) j++;
    else if (deleting && j > 0) j--;
    else {
      deleting = !deleting;
      if (!deleting) i = (i + 1) % words.length;
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();

  const reveals = document.querySelectorAll(".reveal");
  const onScroll = () => {
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) el.classList.add("visible");
    });
  };
  window.addEventListener("scroll", onScroll);
  onScroll();
});
