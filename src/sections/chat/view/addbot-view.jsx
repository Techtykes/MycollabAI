import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Select, MenuItem, Container, TextField, Typography, InputLabel, FormControl } from '@mui/material';

export default function AddBotView() {
  const [botName, setBotName] = useState('');
  const [botDescription, setBotDescription] = useState('');
  
   const [botPersonality, setBotPersonality] = useState('');
     const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for showing the alert

  // ... Add more states for each setting

 const handleSubmit = async (event) => {
  event.preventDefault();

  const botData = {
    name: botName,
    description: botDescription,
     model: 'Mistral AI', // Always set model to 'Mistral AI'
    personality: botPersonality,
  };

  try {
    const response = await fetch('http://localhost:4000/s/api/bot/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(botData),
    });

    if (!response.ok) throw new Error('Network response was not ok.');

    const result = await response.json();
    console.log(result); // Process success response
      setShowSuccessAlert(true);
      // Hide the alert after a few seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000); // Hide after 3 seconds
  } catch (error) {
    console.error('Error:', error);
  }
};
const handleAlertClose = () => {
  setShowSuccessAlert(false);
};


  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Add New Bot
      </Typography>
        {showSuccessAlert && (
        <div className="alert alert-dismissible alert-success">
         <button type="button" className="btn-close" onClick={handleAlertClose} />

          <strong>Well done!</strong> You successfully added a new bot.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="bot-name"
          label="Bot Name"
          fullWidth
          margin="normal"
          value={botName}
          onChange={(e) => setBotName(e.target.value)}
        />
        <TextField
          id="bot-description"
          label="Bot Description"
          fullWidth
          margin="normal"
          value={botDescription}
          onChange={(e) => setBotDescription(e.target.value)}
        />
       
      <FormControl fullWidth margin="normal">
        <InputLabel id="bot-personality-label">Bot Personality</InputLabel>
        <Select
          labelId="bot-personality-label"
          id="bot-personality"
          value={botPersonality}
          label="Bot Personality"
          onChange={(e) => setBotPersonality(e.target.value)}
        >
          <MenuItem value="Factual">Factual</MenuItem>
          <MenuItem value="Creative">Creative</MenuItem>
          <MenuItem value="Employee help desk">Employee Help Desk</MenuItem>
          <MenuItem value="Technical Support">Technical Support</MenuItem>
          <MenuItem value="Customer Support">Customer Support</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
          <MenuItem value="Guided">Guided</MenuItem>
          <MenuItem value="Base AI">Base AI</MenuItem>
        </Select>
      </FormControl>
        {/* Add more form controls for model selection, personality type, etc. */}
        <Button type="submit" variant="contained" color="primary">
          Create Bot
        </Button>
      </form>
    </Container>
  );
}



