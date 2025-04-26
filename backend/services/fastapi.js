const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');


//Fonction pour envoyer une image à FastAPI et récupérer une description
const sendImageForDescription = async (localImagePath, filename) => {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(localImagePath), filename);

    const fastApiUrl = `${process.env.FASTAPI_URL}/description`;

    const response = await axios.post(
      fastApiUrl,
      form,
      { headers: form.getHeaders() }
    );

    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'appel à FastAPI :", error.response?.data || error.message);
    throw new Error("Erreur lors de l'appel à FastAPI");
  }
};

module.exports = {
  sendImageForDescription,
};
