import React, { useMemo } from "react";
import { useEffect, useState } from 'react';
import { mothProd } from '../server/Prod';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Container } from "reactstrap";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const options = {
    fill: true,
    responsive: true,
    scales: {
        y: {
            min: 0,
        },
    },
    plugins: {
        legend: {
            display: true,
        },
    },
};

const scores1 = [];
const labels = [];



const Graficos = () => {

    const [status, setStatus] = useState(null);

    const data = useMemo(function (props) {
        return {
            datasets: [
                {
                    label: "INVENTARIO",
                    data: scores1,
                    tension: 0.3,
                    borderColor: "rgb(75, 192, 192)",
                    pointRadius: 6,
                    pointBackgroundColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgba(75, 192, 192, 0.3)",
                },
            ],
            labels,
        };

    }, []);

    const obtenerDatos = async () => {
        try {
            setStatus(false);
            scores1.splice(0, scores1.length);
            labels.splice(0, labels.length);
            const res = await mothProd.getProd();
            if (res.status === 200) {
                res.data.map((d) => (
                    scores1.push(d.prod_cantidad),
                    labels.push(d.prod_descrip + " " + d.prod_codigo)
                ));
            }
            setStatus(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtenerDatos();
    }, []);


    return (
        <Container>
            {status === true &&
                <div className="App">
                    <Bar data={data} options={options} />
                </div>
            }
        </Container>
    );

}
export default Graficos;