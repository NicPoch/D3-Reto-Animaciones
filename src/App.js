import { useEffect, useRef ,useState} from "react";
import "./App.css";
import * as d3 from "d3";

function App() {
  let datosInit= [
    { name: "Medellín", index2005: 3, index2006: 33 },
    { name: "Cali", index2005: 39, index2006: 45 },
    { name: "Bogotá", index2005: 7, index2006: 31 },
    { name: "Pereira", index2005: 35, index2006: 36 },
    { name: "Bucaramanga", index2005: 16, index2006: 23 },
    { name: "Cúcuta", index2005: 45, index2006: 45 },
    { name: "Armenia", index2005: 6, index2006: 16 }
  ];
  const [datos, setdatos] = useState(datosInit);
  const canvas = useRef();
  const datos2005=useRef();
  const datos2006=useRef();

  const drawChart = () => {
    const width = 700;
    const height = 500;
    const margin = { top:10, left:50, bottom: 40, right: 10};
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top -margin.bottom;

    const svg = d3
      .select(canvas.current).append("svg");
      svg.attr("width", width);
      svg.attr("height", height);

    let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear() 
        .domain([0, 50])
        .range([iheight, 0]);

    const x = d3.scaleBand()
    .domain(datos.map(d => d.name) ) 
    .range([0, iwidth])
    .padding(0.1); 
    const bars = g.selectAll("rect").data(datos);
    bars
    .enter().append("rect")
    .attr("class", "bar")
    .style("fill", "steelblue")
    .attr("x", d => x(d.name))
    .attr("y", d => y(0))
    .attr("height", d => iheight - y(0))
    .attr("width", x.bandwidth())  

    g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);  

    g.append("g")
    .classed("y--axis", true)
    .call(d3.axisLeft(y));


    d3.select(datos2005.current).on("click",()=>{
      d3.selectAll("rect").transition()
      .duration(1000)
      .attr("y", d => y(d.index2005))
      .attr("height", d => iheight - y(d.index2005))
      .style("fill","green");
    });
    d3.select(datos2006.current).on("click",()=>{
      d3.selectAll("rect").transition()
      .duration(1000)
      .attr("y", d => y(d.index2006))
      .attr("height", d => iheight - y(d.index2006))
      .style("fill","red");
    });
  };
  useEffect(() => {
    //obtener los datos
    drawChart();
  });

  
  return (
    <div>
      <div ref={canvas}></div>
      <span>
        <button ref={datos2005}>2005</button>
        <button ref={datos2006}>2006</button>
      </span>
    </div>
  );
}
export default App;