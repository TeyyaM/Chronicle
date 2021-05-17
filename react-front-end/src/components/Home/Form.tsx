// to resolve error "Expected an assignment or function call and instead saw an expression"
/* eslint-disable */
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../hooks/UserContext';
import React from 'react';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';



const formStyling = {
  display: 'flex',
  background: 'white',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'black',
  height: 325,
  width: '90%',
  padding: 10,
  margin: 'auto',
};

export default function Form(props) {
  const { entry, setEntry, submitContent } = props;
  const { userRef } = useContext(UserContext);
  const user = userRef.current;

  function submitHandler(event) {
    event.preventDefault();
    console.log("form was submitted");
    submitContent(user.id);
  }

  function titleHandler(event) {
    setEntry(prev => ({ ...prev, title: event.target.value }))
  };

  function contentHandler(event) {
    setEntry((prev) => ({ ...prev, content: event.target.value }))
  };
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<any>([]);
  const [categories, setCategories] = React.useState<any>([]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    axios.get('/api/categories')
      .then((res) => {
        // console.log(res.data)
        setSearchResults(res.data);
        setCategories(res.data);
      })
  }, [])
  useEffect(() => {
    const results = categories.filter(categories =>
      categories.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [categories, searchTerm]);

  return (
    <form style={formStyling} noValidate autoComplete="off" onSubmit={submitHandler}>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        bgcolor="background.paper">

        <TextField
          id="outlined-basic"
          margin="normal"
          label="Title"
          variant="outlined"
          fullWidth
          value={entry.title}
          onInput={titleHandler}
        />


        <TextField
          id="outlined-basic"
          multiline
          rows="10"
          label="Whats on your mind?"
          variant="outlined"
          fullWidth
          value={entry.content}
          onInput={contentHandler}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit" >
          Submit
        </Button>
      </Box>
    </form>

  );
}

