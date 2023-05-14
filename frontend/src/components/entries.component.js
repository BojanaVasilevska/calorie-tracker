import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";

import Entry from "./single-entry.component";

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [changeEntry, setChangeEntry] = useState({ change: false, id: 0 });
  const [changeIngredient, setChangeIngredient] = useState({
    change: false,
    id: 0,
  });
  const [newIngredientName, setNewIngredientName] = useState("");
  const [addNewEntry, setAddNewEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    dish: "",
    ingredients: "",
    calories: 0,
    fat: 0,
  });

  useEffect(() => {
    getAllEntries();
  }, []);

  if (refreshData) {
    setRefreshData(false);
    getAllEntries();
  }

  return (
    <div>
      <Container>
        <Button onClick={() => setAddNewEntry(true)}>
          Track today's calories
        </Button>
      </Container>
      <Container>
        {entries != null &&
          entries.map((entry, i) => (
            <Entry
              entryData={entry}
              deleteSingleEntry={deleteSingleEntry}
              setChangeIngredient={setChangeIngredient}
              setChangeEntry={setChangeEntry}
            />
          ))}
      </Container>
      <Modal show={addNewEntry} onHide={() => setAddNewEntry(false)} centred>
        <ModalHeader closeButton>
          <ModalTitle>Add Calorie Entry</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <FormLabel>dish</FormLabel>
            <FormControl
              onChange={(event) => {
                newEntry.dish = event.target.value;
              }}
            ></FormControl>
            <FormLabel>ingredients</FormLabel>
            <FormControl
              onChange={(event) => {
                newEntry.ingredients = event.target.value;
              }}
            ></FormControl>
            <FormLabel>calories</FormLabel>
            <FormControl
              onChange={(event) => {
                newEntry.calories = event.target.value;
              }}
            ></FormControl>
            <FormLabel>fat</FormLabel>
            <FormControl
              type="number"
              onChange={(event) => {
                newEntry.fat = event.target.value;
              }}
            ></FormControl>
          </FormGroup>
          <Button onClick={() => addSingleEntry()}>Add</Button>
          <Button onClick={() => setAddNewEntry(false)}>Cancel</Button>
        </ModalBody>
      </Modal>
      <Modal
        show={changeIngredient.change}
        onHide={() => setChangeIngredient({ change: false, id: 0 })}
        centered
      >
        <ModalHeader closeButton>
          <ModalTitle>Change Ingredients</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <FormLabel>New ingredients</FormLabel>
            <FormControl
              onChange={(event) => {
                setNewIngredientName(event.target.value);
              }}
            ></FormControl>
          </FormGroup>
          <Button onClick={() => changeIngredientForEntry()}>Change</Button>
          <Button onClick={() => setChangeIngredient({ change: false, id: 0 })}>
            Cancel
          </Button>
        </ModalBody>
      </Modal>
      <Modal
        show={changeEntry.change}
        onHide={() => setChangeEntry({ change: false, id: 0 })}
        centered
      >
        <ModalHeader closeButton>
          <ModalTitle>Change Entry</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <FormLabel>dish</FormLabel>
            <FormControl
              onChange={(event) => {
                newEntry.calories = event.target.value;
              }}
            ></FormControl>
            <FormLabel>ingredients</FormLabel>
            <FormControl
              onChange={(event) => {
                newEntry.calories = event.target.value;
              }}
            ></FormControl>
            <FormLabel>calories</FormLabel>
            <FormControl
              onChange={(event) => {
                newEntry.calories = event.target.value;
              }}
            ></FormControl>
            <FormLabel>fat</FormLabel>
            <FormControl
              type="number"
              onChange={(event) => {
                newEntry.calories = event.target.value;
              }}
            ></FormControl>
          </FormGroup>
          <Button onClick={() => changeSingleEnrtry()}>Change</Button>
          <Button
            onClick={() => setChangeEntry({ change: false, id: 0 })}
            centered
          >
            Cancel
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );

  function addSingleEntry() {
    setAddNewEntry(false);
    var url = "http://localhost:8000/entry/create";
    axios
      .post(url, {
        ingredients: newEntry.ingredients,
        dish: newEntry.dish,
        calories: newEntry.calories,
        fat: parseFloat(newEntry.fat),
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          setRefreshData(true);
        }
      });
  }

  function changeSingleEnrtry() {
    changeEntry.change = false;
    var url = "http://localhost:8000/entry/update/" + changeEntry.id;
    axios.put(url, newEntry).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        setRefreshData(true);
      }
    });
  }

  function deleteSingleEntry(id) {
    var url = "http://localhost:8000/entry/delete/";
    axios.delete(url, {}).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        setRefreshData(true);
      }
    });
  }

  function getAllEntries() {
    var url = "http://localhost:8000/entry/entries";
    axios
      .get(url, {
        responseType: "json",
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          setEntries(response.data);
        }
      });
  }

  function changeIngredientForEntry() {
    changeIngredient.change = false;
    var url = "http://localhost:8000/ingredient/update/" + changeIngredient.id;
    axios
      .put(url, {
        ingredients: newIngredientName,
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          setRefreshData(true);
        }
      });
  }
};

export default Entries;
