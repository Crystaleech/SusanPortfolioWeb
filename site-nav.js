(function () {
  function closeAll(except) {
    document.querySelectorAll(".site-bar.is-open, .case-nav.is-open").forEach(function (node) {
      if (node !== except) {
        node.classList.remove("is-open");
        var button = node.querySelector("[aria-expanded]");
        if (button) button.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-menu-toggle]");
    if (button) {
      var bar = button.closest(".site-bar, .case-nav");
      var open = !bar.classList.contains("is-open");
      closeAll(open ? bar : null);
      bar.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", open ? "true" : "false");
      return;
    }
    if (!event.target.closest(".site-menu, .case-menu, [data-menu-toggle]")) closeAll(null);
    if (event.target.closest(".site-menu a, .case-menu a")) closeAll(null);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeAll(null);
  });
})();
