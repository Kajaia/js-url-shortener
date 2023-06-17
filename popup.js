document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.getElementById("long-url");
  const shortened = document.getElementById("short-url");
  const shortenButton = document.getElementById("shorten-button");
  const copyButton = document.getElementById("copy-button");
  const shortUrlContainer = document.getElementById("short-url-container");
  const baseUrl = "https://infoajara.com/api/v1";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const longUrl = input.value;

    shortUrlContainer.classList.add("d-none");
    shortenButton.classList.add("disabled");
    shortenButton.innerText = "Shortening...";

    fetch(`${baseUrl}/shorten`, {
      method: "POST",
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: longUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        shortened.value = data.data;

        shortUrlContainer.classList.remove("d-none");
        shortenButton.classList.remove("disabled");
        shortenButton.innerText = "Shorten";
        loading = false;
      })
      .catch(console.error());
  });

  copyButton.addEventListener("click", function () {
    const item = new ClipboardItem({
      "text/plain": new Blob([shortened.value], {
        type: "text/plain",
      }),
    });
    navigator.clipboard.write([item]).then(
      () => {
        copyButton.innerText = "Copied!";
        setTimeout(() => (copyButton.innerText = "Copy"), 1500);
      },
      () => {
        copyButton.innerText = "Copy";
      }
    );
  });
});
