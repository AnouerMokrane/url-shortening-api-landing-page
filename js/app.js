let toggler = document.querySelector("header .toggler");
let nav = document.querySelector("header nav");
let input = document.querySelector(".statistics .url-container .my-input");
let submitBtn = document.querySelector(
  ".statistics .url-container .submit-btn "
);
let linksHolder = document.querySelector(".links-holder");

toggler.addEventListener("click", () => {
  toggler.classList.toggle("active");
  nav.classList.toggle("show");
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value !== "") {
    const accessToken = "8d21756005b4e9ee4acb9548e92ce22b23140cc4";
    const longUrl = input.value;

    fetch(`https://api-ssl.bitly.com/v4/shorten`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        long_url: longUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "MONTHLY_ENCODE_LIMIT_REACHED") {
          let myObj = {
            longUrl: data.long_url,
            shortUrl: data.link,
          };
          addDataToPage(longUrl, myObj.shortUrl);
          input.value = "";
        } else {
          linksHolder.innerHTML = `<p>${data.description}</p>`;
        }
      })
      .catch((error) => {
        linksHolder.innerHTML = "There is an err try again";
      });
  }
});

function addDataToPage(longUrl, shortUrl) {
  let linkDiv = document.createElement("div");
  linkDiv.className = "link";

  let longUrlDiv = document.createElement("div");
  longUrlDiv.className = "long-url";
  longUrlDiv.appendChild(document.createTextNode(longUrl));

  let shortUrlDiv = document.createElement("div");
  shortUrlDiv.className = "short-link";
  shortUrlDiv.appendChild(document.createTextNode(shortUrl));

  let span = document.createElement("span");
  span.className = "copy";
  span.textContent = "Copy";

  linkDiv.appendChild(longUrlDiv);
  linkDiv.appendChild(shortUrlDiv);
  linkDiv.appendChild(span);

  linksHolder.appendChild(linkDiv);

  //copy the url
  let copySpan = document.querySelector(".copy");

  copySpan.addEventListener("click", (e) => {
    navigator.clipboard.writeText(shortUrl);
    e.currentTarget.textContent = "Copied";
    e.currentTarget.style.backgroundColor = "hsl(257, 27%, 26%)";
  });
}
