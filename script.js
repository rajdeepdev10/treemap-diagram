fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json')
.then(response => response.json())
.then(data => {

    drawTreemap(data);
    createLegend();

});

function drawTreemap(data){
    const svgWidth = 750;
    const svgHeight = 500;

    const tooltip = d3.select("#tooltip");

    const svg = d3.select("svg")
                    .attr("width", svgWidth)
                    .attr("height", svgHeight);


    const hierarchy = d3.hierarchy(data, node => node.children);    //  node.children tells where are the childrens are located to create hierarchy

    hierarchy.sum(node => node.value)   // quantifying value of the node
                .sort((node1, node2) => node2.value - node1.value)  // sort from highest to lowest

    const createTreeMap = d3.treemap()  //create a createTreemap function
                            .size([svgWidth, svgHeight]);   //width and height of treemap

    createTreeMap(hierarchy);   // put data fields in treemap

    // console.log(hierarchy.leaves())

    let tile = svg.selectAll("g")  //  create seperate movie tiles
                    .data(hierarchy.leaves())
                    .enter()
                    .append("g")
                    .attr("transform", movie => `translate(${movie.x0}, ${movie.y0})`);

    // appending movie 'blocks'
    tile.append("rect")
            .attr("class", "tile")
            .attr("fill", movie => {
                let category = movie.data.category;
                switch (category){
                    case "Adventure":
                        return "green";
                    case "Action":
                        return "blue";
                    case "Animation":
                        return "pink";
                    case "Biography":
                        return "brown";
                    case "Comedy":
                        return "yellow";
                    case "Drama":
                        return "red";
                    case "Family":
                        return "orange";
                }
            })
            .attr("data-name", movie => movie.data.name)
            .attr("data-category", movie => movie.data.category)
            .attr("data-value", movie => movie.data.value)
            .attr("width", movie => movie.x1 - movie.x0)
            .attr("height", movie => movie.y1 - movie.y0)

            /*~~~~~~~~~~~~~~~~~~~~~~~  tooltip code   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            .on("mouseover", (event, movie) => {
                tooltip.transition()
                    .duration(200)
                    .style("visibility", "visible")
                    .style("opacity", 0.9);

                tooltip.html(`
                    ${movie.data.name}<br>
                    Category: ${movie.data.category}<br>
                    Value: $${movie.value}
                `)

                tooltip.style("left", (event.pageX + 10)  + 'px')
                        .style("top", (event.pageY + 10) + 'px');

                tooltip.attr("data-value", movie.value);

            })
            .on("mouseout", () => {
                tooltip.transition()
                        .duration(500)
                        .style("visibility", "hidden");
            });
            /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/




    // appending text inside the blocks
    tile.append("text")
            .text(movie => movie.data.name)
            .attr("x", "0")
            .attr("y", "40")
            .attr("class", "legend-font");

}







function createLegend(){
    const legendWidth = 100;
    const legendHeight = 250;
    const legendPadding = 15;

    const legend = d3.select("#legend")
                        .attr("width", legendWidth)
                        .attr("height", legendHeight)
                        .attr("id", "legend");

    const genre_colors = ["green", "blue", "pink", "brown", "yellow", "red", "orange"];

    legend.selectAll("rect")
            .data(genre_colors)
            .enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", (d, i) => (legendHeight / 7) * i + legendPadding)
            .attr("width", legendWidth / 5)
            .attr("height", (legendHeight / 7) - legendPadding)
            .attr("fill", c => c)
            .attr("class", "legend-item");
}