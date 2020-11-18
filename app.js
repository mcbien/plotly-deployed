// // Use d3.json to read local json file
// //      Set path to data file

// // ***** Review of samples.json: key and structure
// //          names = simple array
// //          metadata = array of objects
// //              object keys: id, ethnicity, gender, age, location, bbtype, wfreq
// //          samples = array of objects contaning arrays
// //              object keys: id, otu_ids, sample_values, otu_labels


// // Review of screenshots:
// //  dashboard_part1.png & dashboard_part 2:
// //     1. Select Sample: dropdown using ID: 940 >> metadata: id
// //     2. Sample MetaData: Unordered list with:
// //          Age: 24 >> metadata: age
// //          BBTYPE: I >> metadata: bbtype
// //          ETHNICITY: Caucasian >> metadata: ethnicity
// //          GENDER: F >> metadata: gender
// //          LOCATION: Beaufort/NC >> mwetadata: location
// //          WFREQ: 2 >> metadata: wfreq
// //          sample: 940 >> metadata: id
// //     3. pie chart: % by samples: otu_id, samples: otu_id as label
// //     4. bubble chart:
// //           x-axis: >> samples: otu_id
// //           y-axis: >> samples: sample_values
// //           marker size >> samples: sample_values
// //           marker color >> samples: otu_id
// //           bubble label: >> samples: otu_labels
// //     5. Belly Button Washing Frequency speedometer
// //          Scrubs per week: >> metadata: wfreq
// //  hw01.png: Horizontal bar
// //          y-axis: samples: otu_ids
// //          x-axis: samples: sample_values
// //    

// // Pseudo Code:
// // 1. Pull required data out of json and into variables using map
// // 2. Filter data based on id entered.  Note: id is a key in 
// // 2. Use plotly to build charts Note: will need to cast metadata: sample values as integer for graphing
// // 3. Configure on change event with dropdowm



// // Set path to json data file
// var filepath = "../samples.json"

// // Create function to parse the json
// function importData() {

//     d3.json(filepath).then(function (data) {
//         // console.log(data);
//         // console.log("Keys");
//         // console.log(Object.keys(data));
//         // console.log("Values");
//         // console.log(Object.values(data));
//         // console.log("Entries");
//         // console.log(Object.entries(data));

//         //Break data object into component parts
//         var names = data.names;
//         console.log("Names");
//         console.log(names);
//         var metadata = data.metadata;
//         console.log("Metadata");
//         console.log(metadata)
//         console.log("Samples");
//         var samples = data.samples;
//         console.log(samples);

//         // Use forEach to create option for dropdown
//         // Select select element
//         var selectElement = d3.select("#selDataset");
//         // data.names.forEach(name => {
//         //     console.log(name);
//         Object.entries(data.names).forEach(([key, value]) => {
//             // console.log(key, value);
//             var option = selectElement.append("option");
//             option.property('value', value);
//             option.text(value);
//         })

//         // Grab selected id from dropdown
//         // dropdownSelection = select.property(onchange.value)
//         // console.log(dropdownSelect);
//         var selection = d3.select("#selDataset").node().value
//         console.log(selection)

//         // filter data
//         var tempId = "940";
//         var sampleFiltered = samples.filter(sample => sample.id === selection);
//         console.log("sampleFiltered");
//         console.log(sampleFiltered);
//         var metadataFiltered = metadata.filter(meta => meta.id.toString() === selection);
//         console.log("metadataFiltered");
//         console.log(metadataFiltered);

//         // Isolate Sample Data chunks
//         otuIdsAll = sampleFiltered[0].otu_ids
//         console.log("sampleFiltered otu_ids");
//         console.log(otuIdsAll);
//         otuSampleValues = sampleFiltered[0].sample_values;
//         console.log("sampleFiltered sample_values");
//         console.log(otuSampleValues);
//         otuLabels = sampleFiltered[0].otu_labels;
//         console.log("sampleFiltered otu_labels");
//         console.log(otuLabels);

//         // Create plotly bar chart
//         //var otuIdsTop10 = sampleFiltered[0].otu_ids.slice(0, 10).reverse();
//         var otuIdsTop10 = otuIdsAll.slice(0, 10).reverse();
//         console.log(otuIdsTop10);
//         var labels = otuIdsTop10.map(item => "OTU ID " + item);
//         console.log(labels);
//         //var sampleValuesTop10 = sampleFiltered[0].sample_values.slice(0, 10).reverse();
//         var sampleValuesTop10 = otuSampleValues.slice(0, 10).reverse();
//         console.log(sampleValuesTop10);

//         var hbarTrace = {
//             type: "bar",
//             orientation: "h",
//             x: sampleValuesTop10,
//             y: labels
//         };

//         var hbarData = [hbarTrace];

//         var hbarLayout = {
//             title: "Top 10 OTU IDs",
//         };

//         Plotly.newPlot("bar", hbarData, hbarLayout);

//         // Create plotly bubble chart

//         var bubbleTrace = {
//             x: otuIdsAll,
//             y: otuSampleValues,
//             text: otuLabels,
//             mode: "markers",
//             marker: {
//                 color: otuSampleValues,
//                 size: otuSampleValues
//             }
//         }

//         var bubbleData = [bubbleTrace];

//         var bubbleLayout = {
//             title: "Sample Values by OTU ID",
//             showlegend: false,
//             xaxis: { title: "OTU ID" },
//             yaxis: { title: "Sample Values" }
//         }

//         Plotly.newPlot("bubble", bubbleData, bubbleLayout);


//     })

// }

// // Call function
// importData()

// // Use map to enumerate the values within metadata
// //var metadataId = data.metadata.map(item => item.id);

//commented ALL above

console.log("STARTING OVER");



function buildDropdown() {

    d3.json("samples.json").then(function (data) {
        console.log(data);
        var names = data.names;
        console.log(names);
        //// Use forEach to create options for dropdown
        // Select the select html element
        var selectElement = d3.select("#selDataset");
        Object.entries(data.names).forEach(([key, value]) => {
            var option = selectElement.append("option");
            option.property("value", value);
            option.text(value);

        })
    })
};

// Call function
buildDropdown()

// My need to remove selectedElement below
d3.select("#selDataset").on("change", function () {
    // on change: sharp stick in eye, grab value, get data, filter, build chart, make chart on page
    // Grab selection
    var selection = d3.select("#selDataset").node().value
    console.log(selection)

    // Grab data
    d3.json("samples.json").then(function (data) {
        // console.log(data);
        // console.log("Keys");
        // console.log(Object.keys(data));
        // console.log("Values");
        // console.log(Object.values(data));
        // console.log("Entries");
        // console.log(Object.entries(data));

        //Break data object into component parts
        var names = data.names;
        console.log("Names");
        console.log(names);
        var metadata = data.metadata;
        console.log("Metadata");
        console.log(metadata)
        console.log("Samples");
        var samples = data.samples;
        console.log(samples);

        // Use forEach to create option for dropdown
        // Select select element
        var selectElement = d3.select("#selDataset");
        // data.names.forEach(name => {
        //     console.log(name);
        Object.entries(data.names).forEach(([key, value]) => {
            // console.log(key, value);
            var option = selectElement.append("option");
            option.property('value', value);
            option.text(value);
        })

        // Grab selected id from dropdown
        // dropdownSelection = select.property(onchange.value)
        // console.log(dropdownSelect);
        // var selection = d3.select("#selDataset").node().value
        // console.log(selection)

        // filter data
        var tempId = "940";
        var sampleFiltered = samples.filter(sample => sample.id === selection);
        console.log("sampleFiltered");
        console.log(sampleFiltered);
        var metadataFiltered = metadata.filter(meta => meta.id.toString() === selection);
        console.log("metadataFiltered");
        console.log(metadataFiltered);

        // Isolate Sample Data chunks
        otuIdsAll = sampleFiltered[0].otu_ids
        console.log("sampleFiltered otu_ids");
        console.log(otuIdsAll);
        otuSampleValues = sampleFiltered[0].sample_values;
        console.log("sampleFiltered sample_values");
        console.log(otuSampleValues);
        otuLabels = sampleFiltered[0].otu_labels;
        console.log("sampleFiltered otu_labels");
        console.log(otuLabels);

        // Create plotly bar chart
        //var otuIdsTop10 = sampleFiltered[0].otu_ids.slice(0, 10).reverse();
        var otuIdsTop10 = otuIdsAll.slice(0, 10).reverse();
        console.log(otuIdsTop10);
        var labels = otuIdsTop10.map(item => "OTU ID " + item);
        console.log(labels);
        //var sampleValuesTop10 = sampleFiltered[0].sample_values.slice(0, 10).reverse();
        var sampleValuesTop10 = otuSampleValues.slice(0, 10).reverse();
        console.log(sampleValuesTop10);

        var hbarTrace = {
            type: "bar",
            orientation: "h",
            x: sampleValuesTop10,
            y: labels
        };

        var hbarData = [hbarTrace];

        var hbarLayout = {
            title: "Top 10 OTU IDs",
        };

        Plotly.newPlot("bar", hbarData, hbarLayout);

        // Create plotly bubble chart

        var bubbleTrace = {
            x: otuIdsAll,
            y: otuSampleValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                color: otuSampleValues,
                size: otuSampleValues
            }
        }

        var bubbleData = [bubbleTrace];

        var bubbleLayout = {
            title: "Sample Values by OTU ID",
            showlegend: false,
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Sample Values" }
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        // Populate Demographic info
        console.log("Metadata Filtered");
        console.log(metadataFiltered);
        console.log(metadataFiltered[0]);
        // Select html object
        var demoData = d3.select("#sample-metadata");
        //Clear the html
        demoData.html("");

        Object.entries(metadataFiltered[0]).forEach(([a, b]) => {
            demoData.append("h5").text(`${a}: ${b}`);
        });

        // Build pie chart
        console.log("Pie Sample Values");
        console.log(sampleValuesTop10);
        console.log("Pie Labels");
        console.log(otuIdsTop10);

        var pieData = [{
            values: sampleValuesTop10.reverse(),
            labels: otuIdsTop10.reverse(),
            type: 'pie'
        }];

        var pieLayout = {
            title: "Top 10 OTU IDs by Percentage",
            //height: 400,
            //width: 500
        };

        Plotly.newPlot('pie', pieData, pieLayout);

        // Create gauge
        washes = metadataFiltered[0]["wfreq"];
        console.log(washes);

        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washes,
                title: { text: "Wash Frequency" },
                type: "indicator",
                mode: "gauge+number",
                // delta: { reference: 380 },
                gauge: {
                    axis: { range: [null, 9] },
                    steps: [
                        { range: [0, 4], color: "lightgray" },
                        { range: [5, 9], color: "gray" }
                    ],
                    threshold: {
                        line: { color: "red", width: 4 },
                        thickness: 0.75,
                        value: washes
                    }
                }
            }
        ];

        var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);

    })

});
