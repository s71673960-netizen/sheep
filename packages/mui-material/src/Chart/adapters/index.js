import buildBar from './bar';
import buildStackedBar from './stackedBar';
import buildLine from './line';
import buildArea from './area';
import buildScatter from './scatter';
import buildPie from './pie';
import buildDonut from './donut';
import buildFunnel from './funnel';
import buildRadar from './radar';
import buildHeatmap from './heatmap';
import buildCandlestick from './candlestick';
import buildWaterfall from './waterfall';
import buildTreemap from './treemap';
import buildSankey from './sankey';
import buildGauge from './gauge';
import buildMap from './map';

const adapters = {
  bar: buildBar,
  stackedBar: buildStackedBar,
  line: buildLine,
  area: buildArea,
  scatter: buildScatter,
  pie: buildPie,
  donut: buildDonut,
  funnel: buildFunnel,
  radar: buildRadar,
  heatmap: buildHeatmap,
  candlestick: buildCandlestick,
  waterfall: buildWaterfall,
  treemap: buildTreemap,
  sankey: buildSankey,
  gauge: buildGauge,
  map: buildMap,
};

export default adapters;
