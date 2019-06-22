function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "cars-list.json", true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function datediff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

function sortBy(data, criterie) {
  let sorted = data.sort((a, b) =>
    parseFloat(a[1][criterie]) > parseFloat(b[1][criterie]) ? 1 : -1
  );
  return sorted;
}

function createExtras(element, extrases) {
  element.innerHTML = "";

  for (let k = 0; k < extrases.length; k++) {
    let div = document.createElement("div");
    div.setAttribute("class", "col-lg-6 col-md-6 col-sm-6 col-sm-6");

    if (extrases[k].type == 1) {
      // i
      let i = document.createElement("i");
      i.setAttribute("class", extrases[k].image);
      div.appendChild(i);
    } else if (extrases[k].type == 2) {
      // img
      let img = document.createElement("img");
      img.setAttribute("src", extrases[k].image);
      img.setAttribute("width", "25px");
      div.appendChild(img);
    }

    div.innerHTML += extrases[k].title;
    element.appendChild(div);
  }
}

function createFooterExtras(element, footer_extrases) {
  element.innerHTML = "";

  for (let k = 0; k < footer_extrases.length; k++) {
    let div = document.createElement("div");
    div.setAttribute("class", "col-lg-3 col-md-3 col-sm-3 col-sm-3");

    if (footer_extrases[k].type == 1) {
      // i
      let i = document.createElement("i");
      i.setAttribute("class", footer_extrases[k].image);
      div.appendChild(i);
    } else if (footer_extrases[k].type == 2) {
      // img
      let img = document.createElement("img");
      img.setAttribute("src", footer_extrases[k].image);
      img.setAttribute("width", "25px");
      div.appendChild(img);
    }

    div.innerHTML += footer_extrases[k].title;
    element.appendChild(div);
  }
}

function filterCars(data) {
  var price = [];
  var speed = [];
  var engine = [];
  var brand = [];
  var type = [];

  $.each($("input[name='price']:checked"), function () {
    price.push($(this).val());
  });

  $.each($("input[name='speed']:checked"), function () {
    speed.push($(this).val());
  });

  $.each($("input[name='engine']:checked"), function () {
    engine.push($(this).val());
  });

  $.each($("input[name='brand']:checked"), function () {
    brand.push($(this).val());
  });

  $.each($("input[name='type']:checked"), function () {
    type.push($(this).val());
  });

  let fullData = data;

  if (price.length > 0) {
    data = [];
    price.forEach(x => {
      let res = x.match(/\d+€/g);
      let values = res.map(x => {
        let number = x.substring(0, x.length - 1);
        return parseFloat(number);
      });

      let tmp = fullData.filter(y => {
        let number = parseFloat(y[1].price);
        if (number >= values[0] && number <= values[1]) {
          return true;
        } else {
          return false;
        }
      });

      Array.prototype.push.apply(data, tmp);
    });
  }

  if (brand.length > 0) data = data.filter(x => brand.includes(x[1].brand));
  if (speed.length > 0) data = data.filter(x => speed.includes(x[1].speed));
  if (engine.length > 0) data = data.filter(x => engine.includes(x[1].engine));
  if (type.length > 0) data = data.filter(x => type.includes(x[1].type));

  createCarList(data);

  return data;
}

function appendLeadingZeroes(n) {
  if (n < 9) {
    return "0" + n;
  }
  return n;
}

function getFormattedDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return (
    appendLeadingZeroes(day) + "." + appendLeadingZeroes(month) + "." + year
  );
}

function clearCarList(count) {
  for (let i = 1; i <= count; i++) {
    let id = "car_" + i;
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
  }
}

function createCarList(data) {
  let index = 0;

  data.forEach(x => {
    index++;
    let id = "car_" + index;
    g = document.createElement("div");
    g.setAttribute("id", id);
    g.setAttribute("class", "car");

    let extrases = document.getElementById("extrases");
    createExtras(extrases, x[1].extrases);

    let footer_extrases = document.getElementById("footer_extrases");
    createFooterExtras(footer_extrases, x[1].footer_extrases);

    g.innerHTML = document
      .getElementById("car-template")
      .innerHTML.replace(/\{(\w*?)\}/g, (match, name) => x[1][name]);

    document.getElementById("car-list").appendChild(g);
  });
}
// Back to Top
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) $("#back-to-top").fadeIn();
    else $("#back-to-top").fadeOut();
  });

  // scroll body to 0px on click
  $("#back-to-top").click(function () {
    $("body,html").animate({ scrollTop: 0 }, 800);
    return false;
  });

  $(".sidebar-box-header").click(function () {
    $(this)
      .find("i")
      .not(".fa-filter")
      .toggleClass("fa-plus fa-minus");
  });

  var today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  document.getElementById("date").innerHTML = getFormattedDate(today);
  var start = today;
  var end = today;

  $("#startDate").datepicker({
    uiLibrary: "bootstrap4",
    iconsLibrary: "fontawesome",
    format: "dd.mm.yyyy",
    value: getFormattedDate(today),
    minDate: today,
    change: function (e) {
      var str = $("#startDate").val();
      var parts = str.split(".");
      start = new Date(parts[2], parts[1] - 1, parts[0]);

      let days = datediff(start, end);
      if (days == 0 || days == 1) {
        days = 1 + " ден";
      } else if (days < 0) {
        days = 0 + " дни";
      } else {
        days = days + " дни";
      }
      document.getElementById("days").innerHTML = days;
      document.getElementById("date").innerHTML = str;
      $datepickerEnd.value(str);
    }
  });

  var $datepickerEnd = $("#endDate").datepicker({
    uiLibrary: "bootstrap4",
    iconsLibrary: "fontawesome",
    format: "dd.mm.yyyy",
    value: getFormattedDate(today),
    minDate: function () {
      return $("#startDate").val();
    },
    change: function (e) {
      var str = $("#endDate").val();
      var parts = str.split(".");
      end = new Date(parts[2], parts[1] - 1, parts[0]);
      let days = datediff(start, end);

      if (days == 0 || days == 1) {
        days = 1 + " ден";
      } else if (days < 0) {
        days = 0 + " дни";
      } else {
        days = days + " дни";
      }
      document.getElementById("days").innerHTML = days;
    }
  });

  document.getElementById("car-template").style.display = "none";

  let data = null;
  let fullData = null;
  loadJSON(function (response) {
    // Parse JSON string into object
    data = JSON.parse(response);
    data = Object.keys(data).map(function (key) {
      return [key, data[key]];
    });
    data = sortBy(data, "price");
    fullData = data;
    createCarList(data);
  });

  $("input[type='checkbox']").change(function () {
    clearCarList(data.length);
    data = filterCars(fullData);
  });

  $("#sel1").change(function (e) {
    clearCarList(data.length);
    data = sortBy(data, e.target.value);
    createCarList(data);
  });
});
