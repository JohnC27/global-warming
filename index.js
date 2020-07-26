google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

const getData = async () => {
  const res = await fetch('./data.csv');
  const data = await res.text()
  return data
}

async function drawChart() {
  const csv = await getData()
  const dataArr = [];
  const rows = csv.split('\n').slice(1, -1)

  rows.map(item => {
    const row = item.split(',')
    dataArr.push([row[0], +row[1] + 14])
  })

  const options = {
    title: 'Global warming chart',
    curveType: 'smooth',
    legend: { position: 'none' }
  };

  const data = google.visualization.arrayToDataTable([
    ['Year', 'Degrees'],
    ...dataArr
  ]);



  const chart = new google.visualization.LineChart(document.querySelector('.chart'));

  chart.draw(data, options);
}
