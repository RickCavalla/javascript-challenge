// from data.js
var ufoData = data;

// YOUR CODE HERE!
var ufo_button = d3.select("#filter-btn");

var ufo_select = d3.select("#filter-shape");

var ufoShapes = data.map(ufo => ufo.shape);
var shapeSet = new Set(ufoShapes);
var uniqueShapes = Array.from(shapeSet);

console.log(uniqueShapes);

var select_item = ufo_select.append("option");

select_item.attr("value", "ALL");
select_item.text("ALL");

uniqueShapes.forEach((ufoShape) => {
    console.log(ufoShape);
    var select_item = ufo_select.append("option");

    select_item.attr("value", ufoShape);
    select_item.text(ufoShape);
});

ufo_button.on("click", function() {

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#ufo-datetime");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
  
    console.log(inputValue);

    var filteredData = ufoData.filter(ufo => ufo.datetime === inputValue);

    console.log(filteredData);
    console.log(ufo_select.property("value"));

    if (ufo_select.property("value") != "ALL") {
        filteredData = filteredData.filter(ufo => ufo.shape === ufo_select.property("value"))
    }

    console.log(filteredData);

    var ufo_tbody = d3.select("tbody");
    ufo_tbody.html("");

    filteredData.forEach((ufoReport) => {
        var ufo_tr = ufo_tbody.append("tr");

        var ufo_td = ufo_tr.append("td");
        ufo_td.text(ufoReport.datetime);

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