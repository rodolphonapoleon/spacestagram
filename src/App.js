import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { Card, Container, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import { nanoid } from "nanoid";

function App() {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [url, setUrl] = useState(
    `https://api.nasa.gov/planetary/apod?start_date=${startDate.getFullYear()}-${
      startDate.getMonth() + 1
    }-${startDate.getDate()}&api_key=jUILYoEl0kN83G4zxQmNesR0H7Ty7KoZtvXqqyok`
  );
  const [isLoading, setIsLoading] = useState(false);
  console.log("Rendering App");

  const updatedData = data.map((item) => {
    return { ...item, like: false, id: nanoid() };
  });

  const classes = () => {
    return "btn btn-outline-dark";
  };

  useEffect(() => {
    setUrl(
      `https://api.nasa.gov/planetary/apod?start_date=${startDate.getFullYear()}-${
        startDate.getMonth() + 1
      }-${startDate.getDate()}&api_key=jUILYoEl0kN83G4zxQmNesR0H7Ty7KoZtvXqqyok`
    );
  }, [startDate]);

  useEffect(() => {
    // Handles the LifeCycle Events
    console.log("Fetching data...");
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  return (
    <Container>
      <div
        className="my-5 mx-auto pb-4 border-white shadow rounded"
        style={{ width: "34rem" }}
      >
        <h1 className="fs-1 pt-5 px-5">Spacestagram</h1>
        <h5 className="px-5 pb-2 text-muted">
          Brought to you by NASA's Astronomy Photo of the Day (APOD) API
        </h5>
        <h5 className="px-5">Choose a date to start browsing</h5>
        <DatePicker
          className="mx-5"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
        />
        {isError && <div>Something went wrong ...</div>}

        {isLoading ? (
          <Button className="mx-5 mt-4" variant="outline-dark" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        ) : (
          // <div>Loading ...</div>
          <ul style={{ listStyleType: "none" }}>
            {updatedData.map((item, index) => (
              <Card
                border="success"
                className="my-5 border-white align-items-center shadow rounded"
                id={item.id}
                key={index}
                style={{ width: "30rem", listStyleType: "none" }}
              >
                <a href={item.url}>
                  <Card.Img variant="top" src={item.url} />
                </a>
                <Card.Body>
                  <Card.Title className="fs-1">{item.title}</Card.Title>
                  <Card.Title>{item.date}</Card.Title>
                  <Card.Text>{item.explanation}</Card.Text>
                  <button id={item.id} className={classes()} onClick={() => {}}>
                    Like
                  </button>
                </Card.Body>
              </Card>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}

export default App;
