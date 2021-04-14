// from data.js
var tableData = data;

// function to display UFO sightings
function tableDisplay(ufoSightings) {
    var tbody = d3.select("tbody");
    ufoSightings.forEach((ufoRecord) => {
        var row = tbody.append("tr");
        Object.entries(ufoRecord).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.html(value);
        });
    });
};


// clear the table for new data
function deleteTbody() {
    d3.select("tbody")
      .selectAll("tr").remove()
      .selectAll("td").remove();
};

// Initial display of UFO sightings
console.log(tableData);
tableDisplay(tableData);

// 'Filter Table' button
var button = d3.select("#filter-btn");

// filter and display the database
button.on("click", function(event) {
    d3.event.preventDefault();
    deleteTbody();
    var dateInput = d3.select("#datetime").property("value");

    if (dateInput.trim() === "") {
        // display whole database if date field has no date
        var filteredData = tableData;
    }   else {
        // otherwise, display filtered dataset
        var filteredData = tableData.filter(ufoSighting =>
            ufoSighting.datetime === dateInput.trim());
    };

    // if no records are found, display this message
    if (filteredData.length == 0) {
        d3.select("tbody")
          .append("tr")
          .append("td")
            .attr("colspan", 7)
            .html("<h4>No Records Found</h4>");
    };

    console.log(filteredData);
    tableDisplay(filteredData);
});