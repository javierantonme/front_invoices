import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js/auto";

export const CharIncome = ({ summation }) => {
  const chartRef = useRef(null); // Referencia para el gráfico

  // Array con los nombres de los meses
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const monthYearLabels = summation.map(
      (row) => `${monthNames[row.Month - 1]} ${row.Year || "2023"}`
    );
  
    const ctx = document.getElementById("acquisitions").getContext("2d");
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: monthYearLabels,
        datasets: [
          {
            label: "Income by Month",
            data: summation.map((row) => parseFloat(row.Income)),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const income = context.raw;
                return `Income: $${income}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Months and Year",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Income",
            },
          },
        },
      },
    });
  
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [summation]);

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-4xl h-96">
        <canvas id="acquisitions"></canvas>
      </div>
    </div>
  );
};

// Validación de `props`
CharIncome.propTypes = {
  summation: PropTypes.arrayOf(
    PropTypes.shape({
      Month: PropTypes.number.isRequired,
      Income: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CharIncome;
