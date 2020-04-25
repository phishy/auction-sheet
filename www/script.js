$(function () {
  let id = $("#bid").data("id");
  let sku = $("#bid").data("sku");

  getHighestBid(id, sku);

  setInterval(() => {
    getHighestBid(id, sku);
  }, 5000);

  $("#bid").submit((e) => {
    $.ajax({
      method: "POST",
      url: `bid.php?id=${id}&sku=${sku}`,
      data: getFormData($("#bid")),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    }).then(res => {
      window.location.href = $('#bid').data('success');
    });
    return e.preventDefault();
  });
});

/**
 * Turns form data into JSON
 */
function getFormData($form) {
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
function getHighestBid(id, sku) {
  $.get(`highest.php?id=${id}&sku=${sku}`).then((res) => {
    let data = JSON.parse(res);
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    $("#currentBid").html(formatter.format(data.highestBid));
  });
}
