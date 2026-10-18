export function installPointer() {
  if (window !== window.top) return;
  addEventListener("DOMContentLoaded", () => {
    const style = document.createElement("style");
    style.textContent = `*{cursor:none!important} #capture-pointer{position:fixed;left:0;top:0;width:28px;height:32px;z-index:2147483647;pointer-events:none;transform:translate(1250px,70px);filter:drop-shadow(0 2px 3px #0005)} #capture-pulse{position:fixed;left:0;top:0;width:42px;height:42px;margin:-21px;border:3px solid #edae7d;border-radius:50%;pointer-events:none;z-index:2147483646;opacity:0} #capture-highlight{position:fixed;border:3px solid #edae7d;border-radius:9px;box-shadow:0 0 0 4px #edae7d25;pointer-events:none;z-index:2147483645;display:none} @keyframes capture-click{0%{opacity:.9;scale:.55}100%{opacity:0;scale:1.5}}`;
    document.head.append(style);
    const pointer = document.createElement("div");
    pointer.id = "capture-pointer";
    pointer.innerHTML = `<svg width="28" height="32" viewBox="0 0 28 32"><path d="M3 2v24l6-6 5 10 5-3-5-9h9Z" fill="#fff" stroke="#152230" stroke-width="2" stroke-linejoin="round"/></svg>`;
    const pulse = document.createElement("div");
    pulse.id = "capture-pulse";
    const highlight = document.createElement("div");
    highlight.id = "capture-highlight";
    document.body.append(pointer, pulse, highlight);
    // Native dialogs occupy the browser's top layer, above every body z-index.
    // Keep the capture annotations in that layer while a dialog is open.
    const attach = () => {
      const target =
        [...document.querySelectorAll("dialog[open]")].at(-1) ?? document.body;
      for (const element of [pointer, pulse, highlight]) {
        if (element.parentElement !== target) target.append(element);
      }
    };
    new MutationObserver(attach).observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    let point = { x: 1250, y: 70 };
    addEventListener(
      "pointermove",
      (event) => {
        point = { x: event.clientX, y: event.clientY };
        pointer.style.transform = `translate(${point.x}px,${point.y}px)`;
      },
      true,
    );
    function click() {
      pulse.style.left = `${point.x}px`;
      pulse.style.top = `${point.y}px`;
      pulse.style.setProperty("animation", "none", "important");
      void pulse.offsetWidth;
      pulse.style.setProperty(
        "animation",
        "capture-click .45s ease-out forwards",
        "important",
      );
    }
    addEventListener("pointerdown", click, true);
    window.captureAnnotations = {
      move(x, y) {
        point = {x, y};
        pointer.style.transform = `translate(${x}px,${y}px)`;
      },
      click,
      sync() {
        const marker = document.createElement("div");
        Object.assign(marker.style, {
          position: "fixed",
          left: "0",
          top: "0",
          width: "8px",
          height: "8px",
          background: "rgb(0,0,255)",
          zIndex: "2147483647",
          pointerEvents: "none",
        });
        document.body.append(marker);
        setTimeout(() => marker.remove(), 200);
      },
      highlight(rect, duration) {
        Object.assign(highlight.style, {
          display: "block",
          left: `${rect.x - 5}px`,
          top: `${rect.y - 5}px`,
          width: `${rect.width + 10}px`,
          height: `${rect.height + 10}px`,
        });
        setTimeout(() => {
          highlight.style.display = "none";
        }, duration);
      },
    };
  });
}
