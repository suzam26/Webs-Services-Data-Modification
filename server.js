const cors = require('cors');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let vehicles = [
  {
    id: 1,
    make: "Honda",
    model: "Accord",
    year: 2020,
    color: "grey",
    plateNumber: "ES6 3G6",
    vin: "1G1ZT51806F128009"
  },
  {
    id: 2,
    make: "Infiniti",
    model: "G37",
    year: 2009,
    color: "blue",
    plateNumber: "RW4 993",
    vin: "JH4KA3240HC002301"
  },
  {
    id: 3,
    make: "Porsche",
    model: "Macan",
    year: 2019,
    color: "red",
    plateNumber: "6HG 2ER",
    vin: "JH4KA3160KC018606"
  }
];
app.use(express.static("public"));

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/vehicles", (req, res) => {
  return res.send(vehicles);
});

app.get("/vehicles/:vehicleId", (req, res) => {
  return res.send(
    vehicles.find((vehicle) => vehicle.id == req.params.vehicleId)
  );
});

app.post("/vehicles", (req, res) => {
  const vehicle = req.body;

  vehicles.push(vehicle);

  // output the vehicle to the console for debugging
  console.log(vehicles);

  return res.send("Vehicle has been added to inventory");
});

app.post("/vehicles/:vehicleId", (req, res) => {
  return modifyVehicle(req, res);
});

app.put("/vehicles/:vehicleId", (req, res) => {
  return modifyVehicle(req, res);
});

app.delete("/vehicles/:vehicleId", (req, res) => {
  // Read the vehicleId from the URL
  const vehicleId = req.params.vehicleId;
  const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id == vehicleId);

  if (vehicleIndex === -1) {
    return res.status(404).send(`No vehicle with ID ${vehicleId}!`);
  } else {
    vehicles.splice(vehicleIndex, 1);

    // output the vehicle to the console for debugging
    console.log(vehicles);

    return res.send(`Vehicle ${vehicleId} has been deleted.`);
  }
});

function modifyVehicle(req, res) {
  // Read the vehicleId from the URL
  const vehicleId = req.params.vehicleId;
  console.log(vehicleId);
  const newVehicle = req.body;
  const vehicleIndex = vehicles.findIndex(
    (vehicle) => vehicle.id == vehicleId
  );

  if (vehicleIndex === -1) {
    return res.status(404).send(`No vehicle with ID ${vehicleId}!`);
  } else {
    vehicles[vehicleIndex] = newVehicle;

    // output the vehicle to the console for debugging
    console.log(vehicles);

    return res.send(`Vehicle ${vehicleId} has been updated via ${req.method}.`);
  }
}
