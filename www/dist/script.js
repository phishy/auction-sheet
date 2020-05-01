$(function () {
  let $form = $("#bid");
  let doc = $form.data("doc");
  let sheet = $form.data("sheet");
  let animate = $form.data("animate");
  let refresh = parseInt($form.data("refresh"));

  window.highestBid = 0;

  renderHighestBid(doc, sheet, animate);

  if (refresh) {
    setInterval(() => {
      renderHighestBid(doc, sheet, animate);
    }, refresh * 1000);
  }

  /**
   * Captures the form submit, and places a bid. If the current bid is lower than
   * or equal to the current highest bid, it renders an error message.
   */
  $form.submit((e) => {

    e.preventDefault();

    // check to see if bid is high enough
    let data = formToJSON($("#bid"));
    if (parseInt(JSON.parse(data).bid) <= parseInt(highestBid)) {
      $('#error').html('You must place a higher bid');
      return;
    }

    // places the bid
    $.ajax({
      method: "POST",
      url: `bid.php?doc=${doc}&sheet=${sheet}`,
      data: data,
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
function renderHighestBid(doc, sheet, animate) {
  $.get(`highest.php?doc=${doc}&sheet=${sheet}`).then((res) => {
    let data = JSON.parse(res);
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    window.highestBid = data.highestBid;
    if (animate == true) {
      $("#highestBid").html(data.highestBid);
    } else {
      $("#highestBid").html(formatter.format(data.highestBid));
    }
  });
}
