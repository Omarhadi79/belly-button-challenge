//Data from URL to declare a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Use the D3 library to get JSON data
d3.json(url).then(function(data) {
  console.log(data);
});
    let dropdownMenu = d3.select("#selDataset");
 
//Create init function in JavaScript
function init() {

    //Use D3.js to create a drop-down options
    d3.json(url).then((data) => {
        
        //Extract the value of the names' variable
        let names = data.names;

        // Place the names within the dropdown menu.
        names.forEach((id) => {

            // Display the id value at each loop iteration.
            console.log(id);
            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

           // Select the first element from the list.
           let sample_one = names[0];    

        // Print the value of sample_one
        console.log(sample_one);


        // Create the starting plots
        buildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one);
    });
};

// Method for filling metadata information.
function buildMetadata(sample) {

    // Use D3 library to gather complete dataset.
    d3.json(url).then((data) => {

        // Obtain all available metadata.
        let metadata = data.metadata;

        // Use the sample value to apply a filter.
        let value = metadata.filter(result => result.id == sample);

        //Log the metadata objects array post-filtering
        console.log(value)

        // Obtain the first position in the array
        let valueData = value[0];

        // Remove all metadata records
        d3.select("#sample-metadata").html("");

        // Use Object.entries to populate the panel with every key/value pair.
        Object.entries(valueData).forEach(([key,value]) => {

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};
            // Display or log the key and its corresponding value as they are being added to the metadata panel.
            //console.log(key,value);



    // Create function that generates the bar chart.
    function buildBarChart(sample) {

    // Use D3 library to retrieve all data entries
    d3.json(url).then((data) => {

        // Obtain and retrieve all samples
        let sampleInfo = data.samples;

        // Use the sample value to apply a filter.
        let value = sampleInfo.filter(result => result.id == sample);

        // Obtain the initial position from the array
        let valueData = value[0];

        // Collect the otu_ids, labels, and sample values.
        let otu_ids = valueData.otu_ids;
        let sample_values = valueData.sample_values;
        let otu_labels = valueData.otu_labels;
        

        // Print the data on the console
        console.log(otu_ids,otu_labels,sample_values);

        // Sort and select the top ten items to show in a descending manner
        let labels = otu_labels.slice(0,10).reverse();
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        
        // Prepare the trace layout for the bar chart
        let trace = {
            y: yticks,
            x: xticks,
            type: "bar",
            text: labels,
            orientation: "h"
        };

        // Setup the layout
        let layout = {
        
        };

        // Use Plotly to generate the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Create function that creates the bubble chart
function buildBubbleChart(sample) {

    // Use D3 library to retrieve all data entries
    d3.json(url).then((data) => {
        
        // Obtain all data samples
        let sampleInfo = data.samples;

        // Use the sample value to apply a filter
        let value = sampleInfo.filter(result => result.id == sample);

        // Obtain the initial position from the array
        let valueData = value[0];

        // Collect the otu_ids, labels, and sample values.
        let sample_values = valueData.sample_values;
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        
        // Create the trace layout for the bubble chart
        let trace1 = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers", marker: {size: sample_values, color: otu_ids,colorscale: "Earth"}};

        // Prepare the layout
        let layout = {
            xaxis: {title: "OTU ID"},
            hovermode: "closest",
        };

        // Use Plotly to display the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Create a function that refreshes the dashboard when the sample is modified
function optionChanged(value) { 

    // Log value
    console.log(value); 

    // Apply all the functions 
    buildBubbleChart(value);
    buildBarChart(value);
    buildMetadata(value);
    
};

// Apply the initialize function
init();

