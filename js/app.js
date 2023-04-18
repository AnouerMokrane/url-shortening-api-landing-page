let toggler = document.querySelector("header .toggler");
let nav = document.querySelector("header nav");
let input = document.querySelector(".statistics .url-container .my-input");
let submitBtn = document.querySelector(
  ".statistics .url-container .submit-btn "
);
let linksHolder = document.querySelector(".links-holder");

let dataArr = [];

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
        let myObj = {
          longUrl: data.long_url,
          shortUrl: data.link,
        };
        dataArr.push(myObj);
        addDataToPage(dataArr);
        input.value = "";

        let copySpan = document.querySelector(".copy");

        copySpan.addEventListener("click", (e) => {
          e.currentTarget.textContent = "Copied";
          e.currentTarget.style.backgroundColor = "hsl(257, 27%, 26%)";
        });
      })
      .catch((error) => console.error(error));
  }
});

function addDataToPage(arr) {
  linksHolder.innerHTML = "";
  let arrDivs = [];
  arr.map((ele) => {
    let myDiv = `
    <div class="link">
      <div class="long-url">${ele.longUrl}</div>
      <div class="short-link">${ele.shortUrl}</div>
      <span class="copy">Copy</span>
    </div>
    `;

    if (!arrDivs.includes(myDiv)) {
      arrDivs.push(myDiv);
    }
    linksHolder.innerHTML = arrDivs.join("");
  });
}
