$(function () {
  let $form = $("#bid");
  let id = $form.data("id");
  let sku = $form.data("sku");
  let refresh = parseInt($form.data("refresh"));

  renderHighestBid(id, sku);

  if (refresh) {
    setInterval(() => {
      renderHighestBid(id, sku);
    }, refresh * 1000);
  }

  $form.submit((e) => {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: `bid.php?id=${id}&sku=${sku}`,
      data: formToJSON($("#bid")),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    })
      .then((res) => {
        if ($form.data("success")) {
          window.location.href = $form.data("success");
        }
      })
      .catch((err) => {
        console.error(err);
        if ($form.data("error")) {
          window.location.href = $form.data("error");
        } else {
          alert("An error occurred. Please try again.");
        }
      });
  });
});

/**
 * Turns form data into JSON
 */
function formToJSON($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};
  $.map(unindexed_array, function (n, i) {
    indexed_array[n["name"]] = n["value"];
  });
  return JSON.stringify(indexed_array);
}

/**
 * Fetches the highest bid from the server
 */
function renderHighestBid(id, sku) {
  $.get(`highest.php?id=${id}&sku=${sku}`).then((res) => {
    let data = JSON.parse(res);
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    $("#currentBid").html(formatter.format(data.highestBid));
  });
}
