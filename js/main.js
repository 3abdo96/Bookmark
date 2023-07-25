var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var searchBar = document.getElementById("searchBar");

var b = document.getElementById("submitBook");
var siteList;
var mainIndex = 0;

if (localStorage.getItem("sitesList") != null) {
  siteList = JSON.parse(localStorage.getItem("sitesList"));
  displayList(siteList);
} else {
  siteList = [];
}

function addURL() {
  if (b.innerHTML == "Update") {
    b.innerHTML = "Submit";
    var siteInfo = {
      name: siteName.value,
      url: siteURL.value,
    };
    siteList.splice(mainIndex, 1, siteInfo);
  } else {
    var siteInfo = {
      name: siteName.value,
      url: siteURL.value,
    };
    siteList.push(siteInfo);
  }

  localStorage.setItem("sitesList", JSON.stringify(siteList));
  displayList(siteList);
  clearFields();
}

function clearFields() {
  siteName.value = "";
  siteURL.value = "";
}
function displayList(siteContainer) {
  var list = ``;
  for (var i = 0; i < siteContainer.length; i++) {
    list += ` <tr>
            <td>${i}</td>
            <td>${siteContainer[i].name}</td>
            <td>
              <a class="btn btn-info" href="${siteContainer[i].url}" target="_blank">
                <i class="fa-solid fa-eye pe-2"></i>Visit
              </a>
            </td>
            <td>
            <button class="btn btn-success" onclick="updateBookmark(${i})">
              <a>
                <i class="fa-solid fa-pen-to-square pe-2"></i>Update
              </a>
              </button>
            </td>
            <td>
            <button class="btn btn-danger" onclick="deleteBookmark(${i})">
              <a>
                <i class="fa-solid fa-trash-can pe-2"></i>Delete
              </a>
              </button>
            </td>
          </tr>`;
  }

  document.getElementById("tableList").innerHTML = list;
}

function deleteBookmark(index) {
  siteList.splice(index, 1);
  localStorage.setItem("sitesList", JSON.stringify(siteList));
  displayList(siteList);
}

function updateBookmark(index) {
  siteName.value = siteList[index].name;
  siteURL.value = siteList[index].url;
  b.innerHTML = "Update";
}

function searchBookmark(term) {
  var searchList = [];
  for (var i = 0; i < siteList.length; i++) {
    if (siteList[i].name.toLowerCase().includes(term)) {
      searchList.push(siteList[i]);
    }
  }

  displayList(searchList);
}
