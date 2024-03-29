/* JS Library */
"use strict";

(function (global, document, $) {
  function ChartFactory(autoFlag) {
    this.chartSeq = [];
    this.dataSet = [];
    this.colors = [];
    if (autoFlag) {
      this.autoPlay = true;
    } else {
      this.autoPlay = false;
    }
  }

  // Helper function to create control button
  function createControlBut(action) {
    const controlBut = document.createElement("button");
    controlBut.setAttribute("id", action);
    controlBut.innerHTML = `<span>${action}</span>`;
    controlBut.style =
      "margin: 5px; border: 1px solid transparent; border-radius: 0.25rem; box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%), 0 2px 10px 0 rgb(0 0 0 / 15%)";
    return controlBut;
  }

  // Helper function to generate random color array by given length
  function genarateRandomColors(len) {
    const materialColors = [
      "#F44336",
      "#FF8A80",
      "#FF5252",
      "#AD1457",
      "#FF4081",
      "#EA80FC",
      "#AB47BC",
      "#7C4DFF",
      "#5E35B1",
      "#3949AB",
      "#283593",
      "#3D5AFE",
      "#1976D2",
      "#2196F3",
      "#2979FF",
      "#00B0FF",
      "#0277BD",
      "#00695C",
      "#00897B",
      "#00BFA5",
      "#00E676",
      "#FF6F00",
      "#F57C00",
      "#FF5722",
      "#607D8B",
    ];
    const colors = [];
    for (let i = 0; i < len; i++) {
      colors.push(
        materialColors[Math.floor(Math.random() * materialColors.length)]
      );
    }
    return colors;
  }

  ChartFactory.prototype = {
    // load data from csv file
    loadData: function (dataSet) {
      // sort the data by decreasing order since we are doing a ranking
      dataSet.forEach((el) => {
        el.data.sort((a, b) => b.value - a.value);
      });
      this.dataSet = dataSet;
    },

    // color setting, if provide a empty list, using random color
    setColors: function (colors) {
      const numObj = this.dataSet[0].data.length;
      if (colors.length === 0 || colors.length !== numObj) {
        this.colors = genarateRandomColors(numObj);
      } else {
        this.colors = colors;
      }
      // add color key for every entry in the whole dataset
      for (let i = 0; i < numObj; i++) {
        this.dataSet[0].data[i].color = this.colors[i];
      }
      for (let i = 1; i < this.dataSet.length; i++) {
        for (let j = 0; j < numObj; j++) {
          for (let k = 0; k < numObj; k++) {
            if (
              this.dataSet[i].data[j].label === this.dataSet[0].data[k].label
            ) {
              this.dataSet[i].data[j].color = this.dataSet[0].data[k].color;
            }
          }
        }
      }
    },

    createContainer: function (id, w, h, pid) {
      //the main block to display the chart
      const chartContainer = document.createElement("div");
      chartContainer.setAttribute("id", id);
      chartContainer.style = `width: ${w}px; height: ${h}px; border: 1px solid gainsboro; line-height: 100%;
                                         border-radius: 0.25rem; margin: 10px auto 10px auto;
                                          position: relative; background-color: #E0E0E0; box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%), 0 2px 10px 0 rgb(0 0 0 / 15%);`;
      if (!this.autoPlay) {
        // the three buttons at the bottom to control the chart sequence
        const controlPanel = document.createElement("div");
        controlPanel.setAttribute("id", "control-bar");
        controlPanel.style = `width: ${w}px; border-Top: 1px solid transparent; align-items: center; justify-content: center;
                                    bottom: 0; position: absolute; display: flex;`;

        controlPanel.appendChild(createControlBut("BACK"));
        controlPanel.appendChild(createControlBut("NEXT"));
        chartContainer.appendChild(controlPanel);
      }
      // add to the html where use this one
      const ddvContainer = document.getElementById(pid);
      console.log(ddvContainer);
      ddvContainer.appendChild(chartContainer);
    },

    drawSingleChart: function (id, i) {
      const dataToDraw = this.dataSet[i].data;
      // find the container we want to draw charts in
      const chartContainer = document.getElementById(id);

      const singleChart = document.createElement("div");
      singleChart.setAttribute("id", this.dataSet[i].legend);
      singleChart.style = `width: ${parseInt(
        chartContainer.style.width
      )}px - 10; height: ${parseInt(chartContainer.style.height) - 50}px; 
                                    margin: 5px`;

      // const will be used when draw bars
      const numBars = dataToDraw.length;
      const barHeight = !this.autoPlay
        ? parseInt(singleChart.style.height) / numBars - 10
        : parseInt(chartContainer.style.height) / numBars - 15;
      const maxValue = dataToDraw[0].value;

      // draw bars
      dataToDraw.forEach((item, index) => {
        const barToDraw = document.createElement("div");
        const barLength = Math.ceil((item.value / maxValue) * 100 - 1);
        barToDraw.style = `width: ${barLength}%; height: ${barHeight}px; margin: 10px 5px 10px 5px; padding: 0px; display: flex; justify-content: flex-end;
                                        border: 1px solid transparent; background-color: ${this.dataSet[i].data[index].color}; 
                                        text-align: right; border-radius: 0.25rem; box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%), 0 2px 10px 0 rgb(0 0 0 / 15%); transition: width 0.2s ease-in-out`;
        const barLabel = document.createElement("div");
        barLabel.style = `margin-top: ${(barHeight - 20) / 2
          }px; font-family: "Quicksand"; font-size: 100%`;
        barLabel.innerHTML = `${item.label}: ${item.value}`;
        barToDraw.appendChild(barLabel);

        singleChart.appendChild(barToDraw);
      });

      // draw Legend
      const chartLegend = document.createElement("div");
      chartLegend.innerHTML = `<strong> ${this.dataSet[i].legend} <strong>`;
      chartLegend.style = `position: absolute; bottom: 10%; right: 5%; font-family: "Quicksand"; font-size: 300%`;
      singleChart.appendChild(chartLegend);

      this.chartSeq.push(singleChart);
    },

    drawChartSeq: function (id) {
      this.dataSet.forEach((item, index) => {
        this.drawSingleChart(id, index);
      });
      const chartContainer = document.getElementById(id);
      chartContainer.appendChild(this.chartSeq[0]);
    },

    Play: function (id, time) {
      const chartContainer = document.getElementById(id);
      let curr = this.chartSeq.indexOf(chartContainer.lastChild);
      setInterval(
        () => {
          if (curr === 0 || curr < this.chartSeq.length - 1) {
            curr += 1;
            chartContainer.removeChild(chartContainer.lastChild);
            chartContainer.appendChild(this.chartSeq[curr]);
          } else if (curr === this.chartSeq.length - 1) {
            curr = 0;
            chartContainer.removeChild(chartContainer.lastChild);
            chartContainer.appendChild(this.chartSeq[curr]);
          }
        },
        time,
        chartContainer,
        this.chartSeq,
        curr
      );
    },

    defineButtons: function (id) {
      const chartContainer = document.getElementById(id);
      let curr = this.chartSeq.indexOf(chartContainer.lastChild);
      // define the play back
      const backBut = document.getElementById("BACK");
      backBut.onclick = () => {
        if (curr === 0) {
          console.log("already at first chart");
        } else {
          chartContainer.removeChild(chartContainer.lastChild);
          chartContainer.append(this.chartSeq[curr - 1]);
          curr -= 1;
        }
      };
      // define next
      const nextBut = document.getElementById("NEXT");
      nextBut.onclick = () => {
        if (curr === this.chartSeq.length - 1) {
          console.log("already at last chart");
        } else {
          chartContainer.removeChild(chartContainer.lastChild);
          chartContainer.append(this.chartSeq[curr + 1]);
          curr += 1;
        }
      };
    },
  };
  global.ChartFactory = global.ChartFactory || ChartFactory;
})(window, window.document, $);
