const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const DiseaseInfo = require('./models/DiseaseInfo');
require('dotenv').config();

// Connect to MongoDB Atlas using env variable or fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://nihan:Killer888beats@nihan.3jzvm5.mongodb.net/plantDiseaseScanner?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => {
        console.error('Could not connect to MongoDB Atlas:', err);
        process.exit(1);
    });

// Read the JSON file
// Trying to locate the file in multiple possible locations
const possiblePaths = [
    path.join(__dirname, '..', 'plantDiseaseScanner.diseaseinfos.json'),
    path.join(__dirname, 'plantDiseaseScanner.diseaseinfos.json'),
    'C:/Users/nihan/OneDrive/Desktop/hackathon/plant desiase scanner/plantDiseaseScanner.diseaseinfos.json'
];

let diseaseData = null;

for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
        console.log(`Found data file at: ${p}`);
        try {
            const fileContent = fs.readFileSync(p, 'utf8');
            diseaseData = JSON.parse(fileContent);
            break;
        } catch (e) {
            console.error(`Error reading/parsing file at ${p}:`, e);
        }
    }
}

if (!diseaseData) {
    console.error('Could not find plantDiseaseScanner.diseaseinfos.json in any expected location.');
    process.exit(1);
}

// Ensure data is an array
const diseasesToImport = Array.isArray(diseaseData) ? diseaseData : [diseaseData];

const importData = async () => {
    try {
        // Clear existing data
        await DiseaseInfo.deleteMany({});
        console.log('Cleared existing DiseaseInfo data');

        // Prepare data for insertion (remove _id to let Mongo generate new ones, or keep if compatible)
        // The provided JSON has "$oid" format which might need handling if we want to preserve exact IDs
        // For simplicity, we'll let Mongoose generate new ObjectIDs to avoid format issues, 
        // unless you specifically need those exact IDs. Given the context (doc lookup), 
        // usually looking up by diseaseName is key, not the specific ID.

        const preparedData = diseasesToImport.map(disease => {
            // Remove the mongo export specific fields if necessary
            const cleanDisease = { ...disease };
            delete cleanDisease._id;
            delete cleanDisease.__v;
            return cleanDisease;
        });

        // Insert new data
        await DiseaseInfo.insertMany(preparedData);
        console.log(`Successfully imported ${preparedData.length} disease records`);

        // Verify one record
        const count = await DiseaseInfo.countDocuments();
        console.log(`Total documents in DiseaseInfo collection: ${count}`);

        process.exit(0);
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

importData();
