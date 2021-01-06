# DynamicRanking.js
link: https://dynrank.herokuapp.com/

Getting Started
        <p>First download this js file to where you want to use it. To use it you have to first include jQuery in you
            html head.
            Then include this library in your html file.</p>
        <code> &ltscript defer type="text/javascript" src="yourFolder/dynRank.js">&lt/script> </code>
        <p>Create a new file under the same directory. This is where you want to load your data and make the graph,
            say it examples.js</p>
        <p>Also include that examples.jsin your html file.</p>
        <p>Within your examples.js, first create a new Object that helps us make the graph:</p>
        <code> const cf = new chartFactory(0)</code>
        <p> Note that we pass 0 into the constructor, whihc is a automatically play flag. If you want your graph to
            automatically play, set it to 1.
        </p>
        <p>Then you need some hard-coded data in such form:</p>
        <code> dataSet = [{"legend": "1970", "data": [{"label": "a", "value": 1}, {{"label": "b", "value": 2}, 
            {{"label": "c", "value": 3}]}, {}, {}, ...] </code>
        <p>This dataSet could be a little complex.</p> 
        <p> Basically you should input an array. And each item of the array 
            is an object, which has two key-value pairs: -legend: a string which is the directional variable, usually time.
            And -data: the data you want to draw the graph with. Inside this data is another array of objects which is the 
            label and the value of the objects. 
        </p>
        <p> Once you hard-coded your dataSet, you can load it into our library by doing so:</p>
        <code> cf.loadData(dataSet) </code>
        <p>Then you have to set the colors for each object. If you do want to set colors you self then you can pass in 
            an empty array then the library will use random colors.
        </p>
        <code> cf.setColors([]) </code>
        <p> Then you can set the id, size, parent element of this graph.</p>
        <code> cf.createContainer(id, width, height, pid) </code>
        <p> Here id is the id of this graph and pid is the id of its parent element. In your html file where you want 
            to put this graph, include:
        </p>
        <code> &ltdiv id=pid>&lt/div> </code>
        <p> Back to our examples.js, now you have the container of this graph, then you can let it draw the sequence of charts</p>
        <code> cf.drawChartSeq(id) </code>
        <p> The last step depends on whether you want this graph automatically play or not. If it plays automatically, call:</p>
        <code> cf.Play(i, time) </code>
        <p>Here time is the time interval between two charts. And if you want it to be controlled by buttons, call: </p>
        <code> cf.defineButtons(id) </code>
        <p><strong>Important:</strong> Only when you pass in 0 to the constructor you can call defineButtons</p>
        
 See documentation here: https://dynrank.herokuapp.com/documentation.html
