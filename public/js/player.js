document.addEventListener("DOMContentLoaded", () => {
  const audioElements = Array.from(document.querySelectorAll("audio"));
  for (const el of audioElements) {
    el.addEventListener("ended", () => {
      const index = audioElements.indexOf(el);
      const next = audioElements[index + 1];
      if (next) {
        next.play();
      }
    })
  }
});
