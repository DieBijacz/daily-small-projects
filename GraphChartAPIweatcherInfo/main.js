chartData()

async function getData() {
    const xlabels = [];
    const ytemps = []
    const resp = await fetch('ZonAnn.Ts+dSST.csv')
    const data = (await resp.text()).trim()

    // split data to rows and take rows from (1 to end) => []
    const rows = data.split('\n').slice(1)
    rows.forEach(row => {
        const cells = row.split(',').slice(0, 2)
        const year = cells[0]
        xlabels.push(year)
        const temp = cells[1]
        ytemps.push(parseFloat(temp) + 14)
    })
    return {xlabels, ytemps}
}

async function chartData() {
    const data = await getData()
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xlabels,
            datasets: [{
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in °C',
                data: data.ytemps,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return value + '°C';
                        }
                    }
                }
            }
        }
    });
}