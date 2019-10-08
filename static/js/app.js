// from data.js
var ufoData = data;

// YOUR CODE HERE!
/* Grab handle of filter button */
var ufo_button = d3.select("#filter-btn");

/* Handles to filter options */
var ufo_date = d3.select("#filter-date");
var ufo_select = d3.select("#filter-shape");
var ufo_contains = d3.select("#filter-contains");

/* Build an array of the unique shapes in data object */
var ufoShapes = data.map(ufo => ufo.shape);
var shapeSet = new Set(ufoShapes);
var uniqueShapes = Array.from(shapeSet);

/* Add an "ALL" option for shapes as default */
var select_item = ufo_select.append("option");
select_item.attr("value", "ALL");
select_item.text("ALL");

/* Convert text dates in data to date variables */
ufoData.forEach((ufo) => {
    var dateSplit = ufo.datetime.split("/");
    ufo.datetime = new Date(dateSplit[2], dateSplit[0] - 1, dateSplit[1]);
});

/* for each uniquie shape in array, add to select options */
uniqueShapes.forEach((ufoShape) => {
    console.log(ufoShape);
    var select_item = ufo_select.append("option");

    select_item.attr("value", ufoShape);
    select_item.text(ufoShape);
});

/* Click the filter button */
ufo_button.on("click", function() {
    var dateValue = ufo_date.property("value");
    var shapeValue = ufo_select.property("value");
    var containsValue = ufo_contains.property("value").toLowerCase();

    /* start with all data */
    filteredData = ufoData;
  
    /* Only filter date if non-blank.  Blank will indicate all dates */
    if (dateValue != "") {
        var dateSplit = dateValue.split("/");
        var dateValue = new Date(dateSplit[2], dateSplit[0] - 1, dateSplit[1]);
        /* Dates in javascript are touchy about equality if you don't convert to
         * number by putting a plus sign in front */
        var filteredData = filteredData.filter(ufo => +ufo.datetime === +dateValue);
    }

    /* Only filter if shape selected is not ALL */
    if (shapeValue != "ALL") {
        filteredData = filteredData.filter(ufo => ufo.shape === shapeValue)
    }

    /* Only do string search if search value is not blank */
    if (containsValue != "") {
        filteredData = filteredData.filter(ufo => ufo.comments.toLowerCase().search(containsValue) >= 0)
    }

    /* select tbody */
    var ufo_tbody = d3.select("tbody");

    /* empty out tbody so we can build new table */
    ufo_tbody.html("");

    /* Go through each ufo report that we have filtered and display as a row */
    filteredData.forEach((ufoReport) => {
        var ufo_tr = ufo_tbody.append("tr");

        var ufo_td = ufo_tr.append("td");
        var dateSimple = 
            (ufoReport.datetime.getMonth() + 1) + "/"
            + ufoReport.datetime.getDate() + "/"
            + ufoReport.datetime.getFullYear();

        ufo_td.text(dateSimple);

        var ufo_td = ufo_tr.append("td");
        ufo_td.text(ufoReport.city);
        
        var ufo_td = ufo_tr.append("td");
        ufo_td.text(ufoReport.state);
        
        var ufo_td = ufo_tr.append("td");
        ufo_td.text(ufoReport.country);

        var ufo_td = ufo_tr.append("td");
        ufo_td.text(ufoReport.shape);

        var ufo_td = ufo_tr.append("td");
        ufo_td.text(ufoReport.durationMinutes);

        var ufo_td = ufo_tr.append("td");
        ufo_td.text(ufoReport.comments);
    });
});