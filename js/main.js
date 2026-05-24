/**
 * Kimchi Education — main entry point
 *
 * Handles year display, math helper evaluation, and contact form feedback.
 */

(function () {
  "use strict";

  const yearEl = document.getElementById("year");
  const mathForm = document.getElementById("math-form");
  const mathInput = document.getElementById("math-input");
  const resultEl = document.getElementById("calculator-result");
  const contactForm = document.getElementById("contact-form");
  const contactFeedback = document.getElementById("contact-feedback");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const sanitizeExpression = (value) => {
    return value.replace(/×/g, "*").replace(/÷/g, "/").trim();
  };

  const isValidExpression = (expression) => {
    return /^[0-9+\-*/().\s]+$/.test(expression);
  };

  const calculate = (expression) => {
    try {
      const sanitized = sanitizeExpression(expression);
      if (!isValidExpression(sanitized)) {
        return { error: "Please use numbers and + - × ÷ ( ) only." };
      }

      // eslint-disable-next-line no-new-func
      const value = new Function(`return ${sanitized}`)();
      if (typeof value !== "number" || !Number.isFinite(value)) {
        return { error: "Unable to calculate that expression." };
      }

      return { value };
    } catch (error) {
      return { error: "Invalid maths expression. Try again." };
    }
  };

  if (mathForm && mathInput && resultEl) {
    mathForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const expression = mathInput.value;
      const { value, error } = calculate(expression);

      if (error) {
        resultEl.textContent = error;
        resultEl.style.color = "#c62828";
      } else {
        resultEl.textContent = `Answer: ${value}`;
        resultEl.style.color = "#444a54";
      }
    });
  }

  if (contactForm && contactFeedback) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      contactFeedback.textContent = "Thanks for your inquiry. We will respond shortly.";
      contactFeedback.style.color = "#238fb2";
      contactForm.reset();
    });
  }
})();
