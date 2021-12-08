chartData()

async function getData() {
    const xlabels = [];
    const ytemps = []
    const ytemps2 = []
    const ytemps3 = []
    
    const resp = await fetch('ZonAnn.Ts+dSST.csv')
    const data = (await resp.text()).trim()

    // split data to rows and take rows from (1 to end) => []
    const rows = data.split('\n').slice(1)
    rows.forEach(row => {
        const cells = row.split(',').slice(0, 4)
        console.log(cells);
        xlabels.push(cells[0])
        ytemps.push(parseFloat(cells[1]) + 14)
        ytemps2.push(parseFloat(cells[2]) + 14)
        ytemps3.push(parseFloat(cells[3]) + 14)
    })
    return {xlabels, ytemps, ytemps2, ytemps3}
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
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            },
            {
                label : 'Second parameter',
                data: data.ytemps2,
                borderColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2
            },
            {
                label : 'Third parameter',
                data: data.ytemps3,
                borderColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }
        ]
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