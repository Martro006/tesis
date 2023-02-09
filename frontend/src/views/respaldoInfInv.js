import React, { useMemo, useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Bar } from "react-chartjs-2";
import { mothProd } from '../server/Prod';
import { Button } from "reactstrap";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

const options = {
    fill: true,
    animations: false,
    scales: {
        y: {
            min: 0,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            display: true,
        },
    },
};

export default function BarChart() {

    const [data, setData] = useState([]);
    const [estado, setEstado] = useState(false);
    const [estado2, setEstado2] = useState(false);

    const ejeY = [];
    let labels = [];
    let res = [];
    async function obtenerDatos() {
        if (!estado) {
            res = await mothProd.getProd();

            if (res.status === 200) {
                setData(res.data);
                setEstado(true);
                // console.log(res.data);
            }
        }
    }

    function llenar() {
        if (!estado2) {
            data.map((d) => (
                ejeY.push(d.prod_cantidad),
                labels.push(d.prod_codigo + " " + d.prod_descrip)
            ));
            ejeY.pop();
            labels.pop();
            ejeY.pop();
            labels.pop();
            console.log(ejeY);
            console.log(labels);
            setEstado2(true);
        }
    }

    useEffect(() => {
        obtenerDatos();
        if (estado) {
            llenar();
        }
        // llenar();
    },);// hasta aqui tengo los datos

    const dato = useMemo(function () {
        return {
            datasets: [
                {
                    label: "Inventario",
                    tension: 0.3,
                    data: ejeY,
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgba(75, 192, 192, 0.3)",
                },
            ],
            labels,
        };
    }, []);


    return (
        <div className="App">
            {estado2 ?
                <Bar data={dato} options={options} />
                :<div></div>
            }
        </div>
    );
}

