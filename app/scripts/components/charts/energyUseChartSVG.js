'use strict';
import d3 from 'd3'

//TODO: need to add redux action callers here so we can interact with the data

export default class EnergyUseChartSVG { //we dont inherit from REACT component

  constructor(options) {
    // super(options.store);

    //we have the option to pass data from REACT states as options parameter. You can also pass actions and it will be called here
    this.element = options.element;
    this.isRendered = false;
    this.openModalForm = options.openModalForm;

    this.element.className += " energy-use-wrapper";

    this.svg = d3.select('.energy-use-wrapper')
                .append('svg');
    // this.getProjects = options.getProjects;

    // this.buildChart();
  }

  handleClick = () => {
      
  }

  buildChart = () => {
    let svg = this.svg
      , modalOpenHandler = this.openModalForm;

    svg.attr('class', 'svg')
                .attr('width', 960)
                .attr('height', 500);

    // if(this.isRendered)
    //   svg = d3.select('.energy-use-wrapper').select('svg');
    // else
    //   svg = d3.select('.energy-use-wrapper')
    //             .append('svg')
    //             .attr('class', 'svg')
    //             .attr('width', 960)
    //             .attr('height', 500);

    // this.svg = d3.select(".svg").append("g");
    // // this.createSVG();

    let energyUse = this.energyUse;

    //temporarily making a field map here until I figure out how to do the chart without this
    let fieldMap = []
      , keys = Object.keys(energyUse[0].usage);

    for(let i=0; i<keys.length; i++){
      fieldMap.push({ fieldName: keys[i] })
    }
    // = [
    //     { fieldName: "heating" }
    //   , { fieldName: "cooling" }
    //   , { fieldName: "lighting" }
    //   , { fieldName: "electronics" }
    // ]


    var n = fieldMap.length, // number of layers
    m = energyUse.length, // number of samples per layer (this holds the months)
    stack = d3.layout.stack(),
    layers = stack(fieldMap.map((field) => { 
            // return bumpLayer(m, .1);
          return energyUse.map((eu) => {
            //this should return objects in this format {x:0, y:0, y0: 0}
            if(eu.usage[field.fieldName])
              return {monthName: eu.monthName, x:eu.month, y:eu.usage[field.fieldName], y0: 0, fieldName: field.fieldName, value: eu.usage[field.fieldName]};
          }); 
        })), // stack() function creates a stack array
    // d3.range(n) this function just expands a number into arrays
    yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
    yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); }); // this gets the most upper bound value from the layers


    var margin = {top: 40, right: 10, bottom: 20, left: 10},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal() // x is the one handling the X axis computation of a given value.
        .domain(energyUse.map((eu) => eu.monthName))//d3.range(m)) // domain is like the data bound, we pass an array here of the months we want to appear at the bottom
        .rangeRoundBands([0, width], .08); //this just sets the width of the barchart based on the width of the SVG

    var y = d3.scale.linear() // y is the one handling the Y axis computation of a given value.
        .domain([0, yStackMax])
        .range([height, 0]);

    var color = d3.scale.linear()
        .domain([0, n - 1])
        .range(["#aad", "#556"]);

    var xAxis = d3.svg.axis() // this is what writes the x axis scale
        .scale(x)
        .tickSize(0)
        .tickPadding(6)
        .orient("bottom");

    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var layer = svg.selectAll(".layer") // layer is the actual months
        .data(layers)
      
    layer.enter().append("g")

    var rect = layer.selectAll("rect")
        .data(function(d) { 
          return d; 
        })

    rect.enter().append("rect");
        
    
    var txt = layer.selectAll("text")
        .data(function(d) { 
          return d; 
        })
        
    txt.enter().append("text"); //let's add the text of the category here
        // .attr("transform", "rotate(-90)")

    update();

    layer.exit().remove();
    rect.exit().remove();
    txt.exit().remove();

    rect.transition()
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    d3.selectAll(".chart-view-select").on("change", change);

    rect.on("click", function(d){
      modalOpenHandler(d);
    });

    this.isRendered = true;

    // var timeout = setTimeout(function() {
    //   d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
    // }, 2000);


    function update() {
      layer.attr("class", "layer")
        .style("fill", function(d, i) { return color(i); });

      rect.attr("x", function(d) { 
          return x(d.monthName); // calling x() here and passing the monthName returns the scaled coordinate for our X axis
        })
        .attr("y", height)
        .attr("width", x.rangeBand())
        .attr("height", 0);

      txt.attr("y", function(d) { return y(d.y0 + d.y) + 5; })
        .attr("x", function(d) { return x(d.monthName) + 5; })
        .attr("dy", ".71em")
        .attr("fill", "white")
        // .style("text-anchor", "end")
        .text(function(d){
          return d.fieldName;
        }); //
    }

    function change() {
      // clearTimeout(timeout);
      if (this.value === "grouped") transitionGrouped();
      else transitionStacked();
    }

    function transitionGrouped() {
      y.domain([0, yGroupMax]);

      rect.transition()
          .duration(500)
          .delay(function(d, i) { return i * 10; })
          .attr("x", function(d, i, j) { return x(d.monthName) + x.rangeBand() / n * j; })
          .attr("width", x.rangeBand() / n)
        .transition()
          .attr("y", function(d) { return y(d.y); })
          .attr("height", function(d) { return height - y(d.y); });

      txt.classed("hidden", true);
    }

    function transitionStacked() {
      y.domain([0, yStackMax]);

      rect.transition()
          .duration(500)
          .delay(function(d, i) { return i * 10; })
          .attr("y", function(d) { return y(d.y0 + d.y); })
          .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
        .transition()
          .attr("x", function(d) { return x(d.monthName); })
          .attr("width", x.rangeBand());

      setTimeout(function(){
                    txt.classed("hidden", false);
            }, 500);
    }

    // Inspired by Lee Byron's test data generator.
    function bumpLayer(n, o) {

      function bump(a) {
        var x = 1 / (.1 + Math.random()),
            y = 2 * Math.random() - .5,
            z = 10 / (.1 + Math.random());
        for (var i = 0; i < n; i++) {
          var w = (i / n - y) * z;
          a[i] += x * Math.exp(-w * w);
        }
      }

      var a = [], i;
      for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
      for (i = 0; i < 5; ++i) bump(a);
      return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
    }
  }

  reactToData = () => {
    // console.log(this.energyUse)
    this.buildChart();
    // this.createSVG(this.projData)
  }

}
