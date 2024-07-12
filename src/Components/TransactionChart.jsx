import CanvasJSReact from "@canvasjs/react-charts";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const App = () => {
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState();

  const locaition = useLocation().pathname;

  const user_id = locaition.slice(locaition.lastIndexOf("/") + 1);

  const fetchUserName = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/customers`);
      const user = response.data?.filter(
        (user) => user.id == user_id
      );
      setUserName(user[0].name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/transactions`);
      const transactions = response.data?.filter(
        (item) => item.customer_id == user_id
      );
      setData(transactions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    
    fetchUserName();
    fetchData();

  }, [user_id]);


  const structure = data?.map((item) => ({
    x: new Date(item.date),
    y: item.amount,
  }));

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1",
    title: {
      text:`${userName} Transactions Charts`,
      horizontalAlign: "left",
    },
    axisY: {
      includeZero: false,
    },
    axisX: {
      valueFormatString: "DD MMM YYYY",
      intervalType: "day",
    },
    data: [
      {
        type: "column",
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: structure,
      },
    ],
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CanvasJSChart options={options} />
      </Box>
    </>
  );
};

export default App;
