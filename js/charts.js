//Bar chart
var barChartElement = document.getElementById('barChart').getContext('2d');
var barChart = new Chart(barChartElement, {
    type: 'bar',
    data: {
        labels: ["Ауди А4", "Ситроен С4", "BMW 316", "Мерцедес Бенз", "Мазда 3"],
        datasets: [{
            label: ' - Най наемана',
            data: [250, 200, 150, 100, 50],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            fontSize: 24,
            fontColor: 'black',
            text: 'ТОП 5 най-наемани коли',
            borderColor: 'black',
            borderWidth: 1
        },
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
    }
});
// End of bar chart

//Pie chart
var pieChartElement = document.getElementById("pieChart").getContext('2d');

var pieChart = new Chart(pieChartElement, {
    type: 'pie',
    data: {
        labels: ["Заети", "Свободен", "Неактивни"],
        datasets: [{
            data: [80, 15, 5], // Specify the data values array

            borderColor: ['rgba(204,66,51, 1)', 'rgba(	24,236,83,1)', 'rgba(195,195,195,1)'], // Add custom color border 
            backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(	24,236,83,0.5)', 'rgba(195,195,195,0.5)'], // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
        }]
    },
    options: {
        title: {
            display: true,
            fontSize: 24,
            fontColor: 'black',
            text: 'Статус на коли',
            borderColor: 'black',
            borderWidth: 5
        },
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
    }
});
//End of pie chart

//Start of line chart
var lineChartData = {
    labels: ['Януари', 'Февруару', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септеври'],
    datasets: [{
        label: 'Кирил Иванов',
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 1)",
        fill: false,
        data: [
            1, 5, 5, 8, 15, 17, 17, 20, 27
        ],
        yAxisID: 'y-axis-1',
    }, {
        label: 'Михаил Петров',
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 1)",
        fill: false,
        data: [
            1, 4, 7, 7, 13, 15, 18, 20, 24
        ]
    }, {
        label: 'Стоян Стоянов',
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 1)",
        fill: false,
        data: [
            1, 3, 5, 8, 8, 12, 18, 22, 28
        ]
    }]
};

window.onload = function() {
    var lineChartElement = document.getElementById('lineChart').getContext('2d');
    window.myLine = Chart.Line(lineChartElement, {
        data: lineChartData,
        options: {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            title: {
                fontSize: 24,
                fontColor: 'black',
                display: true,
                text: 'TOП 4 Служители'
            },
            scales: {
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }],
            }
        }
    });
};

//End of line chart