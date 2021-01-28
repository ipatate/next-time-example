import axios from "axios";
import { useEffect, useState } from "react";

const options = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

export default function Home({ date }) {
  const d = new Date(date);
  const [time, setTime] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setTime(time + 1);
    }, 1000);
  }, [time]);
  return (
    <div className="container">
      <h1>{time}</h1>
      <h2>Time refresh : {d.toLocaleDateString("fr-FR", options)}</h2>
    </div>
  );
}

export async function getStaticProps({ params }) {
  let response;
  try {
    response = await axios.get("http://localhost:3001/");
  } catch (error) {
    console.log(error);
  }

  const { date } = response?.data;
  return {
    revalidate: 20,
    props: {
      date,
    },
  };
}
