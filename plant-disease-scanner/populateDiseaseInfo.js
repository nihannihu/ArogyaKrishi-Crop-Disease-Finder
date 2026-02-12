const mongoose = require('mongoose');
const DiseaseInfo = require('./models/DiseaseInfo');

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://nihan:Killer888beats@nihan.3jzvm5.mongodb.net/climate-sustainability?retryWrites=true&w=majority&appName=nihan');

// Disease documentation data for all 35 diseases
const diseaseData = [
  {
    diseaseName: "Apple___Apple_scab",
    plantType: "Apple",
    scientificName: "Venturia inaequalis",
    description: "Apple scab is a common fungal disease that affects apple trees, causing dark, scabby lesions on leaves and fruit.",
    symptoms: [
      "Dark olive-green spots on leaves that turn black and velvety",
      "Cracked, corky lesions on fruit",
      "Premature leaf drop"
    ],
    causes: [
      "Fungal pathogen Venturia inaequalis",
      "Wet weather during spring"
    ],
    prevention: [
      "Plant resistant apple varieties",
      "Ensure good air circulation by proper spacing"
    ],
    treatment: [
      "Apply fungicides during bloom period",
      "Remove and destroy infected plant material"
    ],
    fertilizers: [
      "Balanced NPK fertilizer (10-10-10)",
      "Calcium nitrate to strengthen cell walls"
    ],
    pesticides: [
      "Captan fungicide",
      "Myclobutanil"
    ],
    naturalRemedies: [
      "Neem oil spray",
      "Baking soda solution (1 tsp per quart water)"
    ],
    bestPractices: [
      "Regular monitoring during wet seasons",
      "Proper pruning techniques"
    ]
  },
  {
    diseaseName: "Apple___Black_rot",
    plantType: "Apple",
    scientificName: "Botryosphaeria obtusa",
    description: "Black rot is a fungal disease that affects apples, causing dark, sunken lesions on fruit and cankers on branches.",
    symptoms: [
      "Purple-bordered lesions on fruit that turn black",
      "Concentric rings in rotting areas",
      "Cankers on branches and trunk"
    ],
    causes: [
      "Fungal pathogen Botryosphaeria obtusa",
      "Wounds on fruit from insects or hail"
    ],
    prevention: [
      "Remove mummified fruit from trees",
      "Prune out dead or diseased wood"
    ],
    treatment: [
      "Apply fungicides during bloom",
      "Remove and destroy infected fruit"
    ],
    fertilizers: [
      "Balanced fertilizer with micronutrients",
      "Calcium supplements for fruit firmness"
    ],
    pesticides: [
      "Captan fungicide",
      "Thiophanate-methyl"
    ],
    naturalRemedies: [
      "Copper-based fungicides",
      "Compost tea applications"
    ],
    bestPractices: [
      "Regular orchard sanitation",
      "Proper pruning timing"
    ]
  },
  {
    diseaseName: "Apple___Cedar_apple_rust",
    plantType: "Apple",
    scientificName: "Gymnosporangium juniperi-virginianae",
    description: "Cedar apple rust is a fungal disease that requires two hosts to complete its life cycle: apple trees and eastern red cedar.",
    symptoms: [
      "Bright yellow spots on upper leaf surface",
      "Brownish tubes on lower leaf surface",
      "Premature leaf drop"
    ],
    causes: [
      "Fungal pathogen Gymnosporangium juniperi-virginianae",
      "Presence of eastern red cedar trees nearby"
    ],
    prevention: [
      "Separate apple orchards from cedar trees",
      "Plant resistant apple varieties"
    ],
    treatment: [
      "Apply fungicides in early spring",
      "Remove cedar galls before spring rains"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Iron sulfate for chlorophyll production"
    ],
    pesticides: [
      "Myclobutanil",
      "Propiconazole"
    ],
    naturalRemedies: [
      "Neem oil applications",
      "Baking soda spray"
    ],
    bestPractices: [
      "Orchard planning with host separation",
      "Regular monitoring during spring"
    ]
  },
  {
    diseaseName: "Apple___healthy",
    plantType: "Apple",
    scientificName: "Healthy Plant",
    description: "This indicates a healthy apple tree with no visible signs of disease.",
    symptoms: [
      "Vibrant green leaves without spots or discoloration",
      "Healthy fruit development",
      "Strong branch structure"
    ],
    causes: [
      "Proper planting and care",
      "Adequate watering"
    ],
    prevention: [
      "Regular monitoring for early signs of problems",
      "Proper watering schedule"
    ],
    treatment: [
      "Continue current care practices",
      "Monitor for any changes"
    ],
    fertilizers: [
      "Balanced NPK fertilizer (10-10-10)",
      "Organic compost"
    ],
    pesticides: [
      "No pesticides needed for healthy plants",
      "Preventive dormant oil spray"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Mulching for moisture retention"
    ],
    bestPractices: [
      "Regular inspection schedule",
      "Proper watering techniques"
    ]
  },
  {
    diseaseName: "Blueberry___healthy",
    plantType: "Blueberry",
    scientificName: "Healthy Plant",
    description: "This indicates a healthy blueberry plant with no visible signs of disease.",
    symptoms: [
      "Vibrant green leaves without spots",
      "Healthy stem growth",
      "Abundant fruit production"
    ],
    causes: [
      "Proper soil pH (4.5-5.5)",
      "Adequate watering"
    ],
    prevention: [
      "Maintain proper soil acidity",
      "Mulch with pine needles or bark"
    ],
    treatment: [
      "Continue current care practices",
      "Monitor for any changes"
    ],
    fertilizers: [
      "Acid-forming fertilizers",
      "Ammonium sulfate"
    ],
    pesticides: [
      "No pesticides needed for healthy plants",
      "Beneficial insect habitat"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Coffee grounds for acidity"
    ],
    bestPractices: [
      "Regular soil pH testing",
      "Proper watering techniques"
    ]
  },
  {
    diseaseName: "Cherry_(including_sour)___Powdery_mildew",
    plantType: "Cherry",
    scientificName: "Podosphaera clandestina",
    description: "Powdery mildew is a common fungal disease that appears as white, powdery coating on cherry leaves, shoots, and fruit.",
    symptoms: [
      "White, powdery coating on leaves",
      "Curling and distortion of leaves",
      "Stunted shoot growth"
    ],
    causes: [
      "Fungal pathogen Podosphaera clandestina",
      "Warm days and cool nights"
    ],
    prevention: [
      "Plant resistant varieties",
      "Ensure good air circulation"
    ],
    treatment: [
      "Apply fungicides at first sign",
      "Prune to improve air flow"
    ],
    fertilizers: [
      "Low-nitrogen fertilizers",
      "Potassium for disease resistance"
    ],
    pesticides: [
      "Sulfur-based fungicides",
      "Potassium bicarbonate"
    ],
    naturalRemedies: [
      "Milk spray (1:10 ratio)",
      "Baking soda solution"
    ],
    bestPractices: [
      "Regular monitoring during warm seasons",
      "Proper pruning techniques"
    ]
  },
  {
    diseaseName: "Cherry_(including_sour)___healthy",
    plantType: "Cherry",
    scientificName: "Healthy Plant",
    description: "This indicates a healthy cherry tree with no visible signs of disease.",
    symptoms: [
      "Vibrant green leaves without spots",
      "Healthy fruit development",
      "Strong branch structure"
    ],
    causes: [
      "Proper planting and care",
      "Adequate watering"
    ],
    prevention: [
      "Regular monitoring for early signs",
      "Proper watering schedule"
    ],
    treatment: [
      "Continue current care practices",
      "Monitor for any changes"
    ],
    fertilizers: [
      "Balanced NPK fertilizer (10-10-10)",
      "Organic compost"
    ],
    pesticides: [
      "No pesticides needed for healthy plants",
      "Preventive dormant oil spray"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Mulching for moisture retention"
    ],
    bestPractices: [
      "Regular inspection schedule",
      "Proper watering techniques"
    ]
  },
  {
    diseaseName: "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    plantType: "Corn",
    scientificName: "Cercospora zeae-maydis",
    description: "Gray leaf spot is a serious fungal disease of corn that causes grayish spots on leaves, leading to reduced photosynthesis and yield loss.",
    symptoms: [
      "Grayish rectangular lesions on leaves",
      "Lesions between leaf veins",
      "Tan to brown spots"
    ],
    causes: [
      "Fungal pathogen Cercospora zeae-maydis",
      "Warm, humid weather"
    ],
    prevention: [
      "Crop rotation with non-host plants",
      "Plant resistant varieties"
    ],
    treatment: [
      "Apply fungicides during tasseling",
      "Remove crop residue"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Potassium for disease resistance"
    ],
    pesticides: [
      "Azoxystrobin fungicides",
      "Propiconazole"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Crop rotation practices",
      "Residue management"
    ]
  },
  {
    diseaseName: "Corn_(maize)___Common_rust",
    plantType: "Corn",
    scientificName: "Puccinia sorghi",
    description: "Common rust is a fungal disease that produces reddish-brown pustules on corn leaves.",
    symptoms: [
      "Small, circular rust-colored pustules",
      "Pustules on upper and lower leaf surfaces",
      "Leaf yellowing and death"
    ],
    causes: [
      "Fungal pathogen Puccinia sorghi",
      "Cool, humid weather"
    ],
    prevention: [
      "Plant resistant varieties",
      "Early planting"
    ],
    treatment: [
      "Apply fungicides if severe",
      "Remove volunteer corn"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Potassium for stress resistance"
    ],
    pesticides: [
      "Azoxystrobin fungicides",
      "Propiconazole"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial fungi inoculants"
    ],
    bestPractices: [
      "Variety selection",
      "Planting date management"
    ]
  },
  {
    diseaseName: "Corn_(maize)___Northern_Leaf_Blight",
    plantType: "Corn",
    scientificName: "Exserohilum turcicum",
    description: "Northern leaf blight is a fungal disease that causes cigar-shaped lesions on corn leaves, leading to significant yield losses.",
    symptoms: [
      "Long, elliptical grayish-green lesions",
      "Lesions parallel to leaf veins",
      "Tan to gray centers with dark borders"
    ],
    causes: [
      "Fungal pathogen Exserohilum turcicum",
      "Cool, wet weather"
    ],
    prevention: [
      "Crop rotation",
      "Plant resistant varieties"
    ],
    treatment: [
      "Apply fungicides during critical growth stages",
      "Tillage to bury residue"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Potassium for disease resistance"
    ],
    pesticides: [
      "Azoxystrobin fungicides",
      "Propiconazole"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Crop rotation practices",
      "Residue management"
    ]
  },
  {
    diseaseName: "Corn_(maize)___healthy",
    plantType: "Corn",
    scientificName: "Healthy Plant",
    description: "This indicates a healthy corn plant with no visible signs of disease.",
    symptoms: [
      "Vibrant green leaves without spots",
      "Healthy stalk development",
      "Normal tassel formation"
    ],
    causes: [
      "Proper planting and care",
      "Adequate watering"
    ],
    prevention: [
      "Regular monitoring for early signs",
      "Proper watering schedule"
    ],
    treatment: [
      "Continue current care practices",
      "Monitor for any changes"
    ],
    fertilizers: [
      "Balanced NPK fertilizer (10-10-10)",
      "Organic compost"
    ],
    pesticides: [
      "No pesticides needed for healthy plants",
      "Beneficial insect habitat"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Mulching for moisture retention"
    ],
    bestPractices: [
      "Regular inspection schedule",
      "Proper watering techniques"
    ]
  },
  {
    diseaseName: "Grape___Black_rot",
    plantType: "Grape",
    scientificName: "Guignardia bidwellii",
    description: "Black rot is a serious fungal disease of grapes that causes dark, circular spots on leaves and fruit, leading to significant crop losses.",
    symptoms: [
      "Circular brown spots on leaves",
      "Black, mummified berries",
      "Concentric rings in leaf spots"
    ],
    causes: [
      "Fungal pathogen Guignardia bidwellii",
      "Warm, wet weather during bloom"
    ],
    prevention: [
      "Plant resistant varieties",
      "Proper vine spacing"
    ],
    treatment: [
      "Apply fungicides during bloom",
      "Remove and destroy mummies"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Calcium for fruit firmness"
    ],
    pesticides: [
      "Captan fungicide",
      "Myclobutanil"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Vineyard sanitation",
      "Proper pruning techniques"
    ]
  },
  {
    diseaseName: "Grape___Esca_(Black_Measles)",
    plantType: "Grape",
    scientificName: "Phaeoacremonium spp.",
    description: "Esca, also known as black measles, is a complex wood disease of grapevines that causes leaf discoloration and can lead to vine decline and death.",
    symptoms: [
      "Tiger stripe pattern on leaves",
      "Black spots on fruit",
      "Wood discoloration"
    ],
    causes: [
      "Fungal pathogens Phaeoacremonium spp.",
      "Wounds from pruning"
    ],
    prevention: [
      "Use clean propagation material",
      "Proper pruning techniques"
    ],
    treatment: [
      "Remove infected vines",
      "Proper wound care"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Organic matter"
    ],
    pesticides: [
      "Trunk injection fungicides",
      "Copper-based products"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial fungi inoculants"
    ],
    bestPractices: [
      "Proper pruning timing",
      "Wound protection"
    ]
  },
  {
    diseaseName: "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    plantType: "Grape",
    scientificName: "Pseudocercospora vitis",
    description: "Leaf blight, also known as Isariopsis leaf spot, is a fungal disease that causes angular spots on grape leaves, leading to premature defoliation and reduced yields.",
    symptoms: [
      "Angular brown spots on leaves",
      "Black fungal structures in spots",
      "Premature leaf drop"
    ],
    causes: [
      "Fungal pathogen Pseudocercospora vitis",
      "Warm, humid conditions"
    ],
    prevention: [
      "Plant resistant varieties",
      "Improve air circulation"
    ],
    treatment: [
      "Apply fungicides during wet periods",
      "Pruning to improve air flow"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Potassium for disease resistance"
    ],
    pesticides: [
      "Captan fungicide",
      "Myclobutanil"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Vineyard design for air flow",
      "Water management"
    ]
  },
  {
    diseaseName: "Grape___healthy",
    plantType: "Grape",
    scientificName: "Healthy Plant",
    description: "This indicates a healthy grapevine with no visible signs of disease.",
    symptoms: [
      "Vibrant green leaves without spots",
      "Healthy cane growth",
      "Normal fruit development"
    ],
    causes: [
      "Proper planting and care",
      "Adequate watering"
    ],
    prevention: [
      "Regular monitoring for early signs",
      "Proper watering schedule"
    ],
    treatment: [
      "Continue current care practices",
      "Monitor for any changes"
    ],
    fertilizers: [
      "Balanced NPK fertilizer (10-10-10)",
      "Organic compost"
    ],
    pesticides: [
      "No pesticides needed for healthy plants",
      "Beneficial insect habitat"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Mulching for moisture retention"
    ],
    bestPractices: [
      "Regular inspection schedule",
      "Proper watering techniques"
    ]
  },
  {
    diseaseName: "Orange___Haunglongbing_(Citrus_greening)",
    plantType: "Orange",
    scientificName: "Candidatus Liberibacter asiaticus",
    description: "Huanglongbing (HLB), also known as citrus greening, is a devastating bacterial disease spread by psyllid insects.",
    symptoms: [
      "Asymmetrical leaf yellowing",
      "Blotchy mottling",
      "Small, lopsided fruit"
    ],
    causes: [
      "Bacterium Candidatus Liberibacter asiaticus",
      "Asian citrus psyllid vector"
    ],
    prevention: [
      "Use certified, disease-free plants",
      "Psyllid control"
    ],
    treatment: [
      "Remove infected trees",
      "Intensive psyllid control"
    ],
    fertilizers: [
      "High-nitrogen fertilizers",
      "Micronutrient supplements"
    ],
    pesticides: [
      "Neonicotinoid insecticides",
      "Pyrethroid insecticides"
    ],
    naturalRemedies: [
      "Beneficial insect habitat",
      "Companion planting"
    ],
    bestPractices: [
      "Regular inspection",
      "Psyllid monitoring"
    ]
  },
  {
    diseaseName: "Peach___Bacterial_spot",
    plantType: "Peach",
    scientificName: "Xanthomonas arboricola pv. pruni",
    description: "Bacterial spot is a serious disease of peaches that causes spots on leaves, fruit, and twigs.",
    symptoms: [
      "Water-soaked spots on leaves",
      "Brown spots on fruit",
      "Twig cankers"
    ],
    causes: [
      "Bacterium Xanthomonas arboricola pv. pruni",
      "Warm, humid weather"
    ],
    prevention: [
      "Plant resistant varieties",
      "Avoid overhead watering"
    ],
    treatment: [
      "Apply copper-based bactericides",
      "Remove infected material"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Calcium for fruit firmness"
    ],
    pesticides: [
      "Copper-based bactericides",
      "Streptomycin"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Variety selection",
      "Water management"
    ]
  },
  {
    diseaseName: "Peach___healthy",
    plantType: "Peach",
    scientificName: "Healthy Plant",
    description: "This indicates a healthy peach tree with no visible signs of disease.",
    symptoms: [
      "Vibrant green leaves without spots",
      "Healthy fruit development",
      "Strong branch structure"
    ],
    causes: [
      "Proper planting and care",
      "Adequate watering"
    ],
    prevention: [
      "Regular monitoring for early signs",
      "Proper watering schedule"
    ],
    treatment: [
      "Continue current care practices",
      "Monitor for any changes"
    ],
    fertilizers: [
      "Balanced NPK fertilizer (10-10-10)",
      "Organic compost"
    ],
    pesticides: [
      "No pesticides needed for healthy plants",
      "Preventive dormant oil spray"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Mulching for moisture retention"
    ],
    bestPractices: [
      "Regular inspection schedule",
      "Proper watering techniques"
    ]
  },
  {
    diseaseName: "Pepper,_bell___Bacterial_spot",
    plantType: "Bell Pepper",
    scientificName: "Xanthomonas campestris pv. vesicatoria",
    description: "Bacterial spot is a common disease of peppers that causes small, water-soaked spots on leaves and fruit.",
    symptoms: [
      "Small, water-soaked spots on leaves",
      "Brown spots on fruit",
      "Leaf drop"
    ],
    causes: [
      "Bacterium Xanthomonas campestris pv. vesicatoria",
      "Warm, humid weather"
    ],
    prevention: [
      "Use disease-free seeds",
      "Avoid overhead watering"
    ],
    treatment: [
      "Apply copper-based bactericides",
      "Remove infected plants"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Calcium for fruit firmness"
    ],
    pesticides: [
      "Copper-based bactericides",
      "Streptomycin"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Seed treatment",
      "Water management"
    ]
  },
  {
    diseaseName: "Pepper,_bell___healthy",
    plantType: "Bell Pepper",
    scientificName: "Healthy Plant",
    description: "This indicates a healthy bell pepper plant with no visible signs of disease.",
    symptoms: [
      "Vibrant green leaves without spots",
      "Healthy fruit development",
      "Strong stem structure"
    ],
    causes: [
      "Proper planting and care",
      "Adequate watering"
    ],
    prevention: [
      "Regular monitoring for early signs",
      "Proper watering schedule"
    ],
    treatment: [
      "Continue current care practices",
      "Monitor for any changes"
    ],
    fertilizers: [
      "Balanced NPK fertilizer (10-10-10)",
      "Organic compost"
    ],
    pesticides: [
      "No pesticides needed for healthy plants",
      "Beneficial insect habitat"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Mulching for moisture retention"
    ],
    bestPractices: [
      "Regular inspection schedule",
      "Proper watering techniques"
    ]
  },
  {
    diseaseName: "Potato___Early_blight",
    plantType: "Potato",
    scientificName: "Alternaria solani",
    description: "Early blight is a common fungal disease of potatoes that causes dark, target-like spots on leaves, leading to premature defoliation and reduced tuber size.",
    symptoms: [
      "Dark concentric rings on leaves",
      "Target-like spots",
      "Yellowing around spots"
    ],
    causes: [
      "Fungal pathogen Alternaria solani",
      "Warm, humid weather"
    ],
    prevention: [
      "Crop rotation",
      "Proper spacing"
    ],
    treatment: [
      "Apply fungicides at first sign",
      "Remove infected leaves"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Potassium for disease resistance"
    ],
    pesticides: [
      "Chlorothalonil fungicides",
      "Mancozeb"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Crop rotation",
      "Water management"
    ]
  },
  {
    diseaseName: "Potato___Late_blight",
    plantType: "Potato",
    scientificName: "Phytophthora infestans",
    description: "Late blight is a devastating fungal disease that caused the Irish potato famine.",
    symptoms: [
      "Water-soaked lesions on leaves",
      "White fungal growth on undersides",
      "Brown, greasy spots"
    ],
    causes: [
      "Fungal pathogen Phytophthora infestans",
      "Cool, wet weather"
    ],
    prevention: [
      "Use certified seed potatoes",
      "Crop rotation"
    ],
    treatment: [
      "Apply fungicides preventively",
      "Remove infected plants"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Potassium for disease resistance"
    ],
    pesticides: [
      "Metalaxyl fungicides",
      "Mancozeb"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Seed potato selection",
      "Weather monitoring"
    ]
  },
  {
    diseaseName: "Potato___healthy",
    plantType: "Potato",
    scientificName: "Healthy Plant",
    description: "This indicates a healthy potato plant with no visible signs of disease.",
    symptoms: [
      "Vibrant green leaves without spots",
      "Healthy stem development",
      "Normal flowering"
    ],
    causes: [
      "Proper planting and care",
      "Adequate watering"
    ],
    prevention: [
      "Regular monitoring for early signs",
      "Proper watering schedule"
    ],
    treatment: [
      "Continue current care practices",
      "Monitor for any changes"
    ],
    fertilizers: [
      "Balanced NPK fertilizer (10-10-10)",
      "Organic compost"
    ],
    pesticides: [
      "No pesticides needed for healthy plants",
      "Beneficial insect habitat"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Mulching for moisture retention"
    ],
    bestPractices: [
      "Regular inspection schedule",
      "Proper watering techniques"
    ]
  },
  {
    diseaseName: "Raspberry___healthy",
    plantType: "Raspberry",
    scientificName: "Healthy Plant",
    description: "This indicates a healthy raspberry plant with no visible signs of disease.",
    symptoms: [
      "Vibrant green leaves without spots",
      "Healthy cane growth",
      "Normal fruit development"
    ],
    causes: [
      "Proper planting and care",
      "Adequate watering"
    ],
    prevention: [
      "Regular monitoring for early signs",
      "Proper watering schedule"
    ],
    treatment: [
      "Continue current care practices",
      "Monitor for any changes"
    ],
    fertilizers: [
      "Balanced NPK fertilizer (10-10-10)",
      "Organic compost"
    ],
    pesticides: [
      "No pesticides needed for healthy plants",
      "Beneficial insect habitat"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Mulching for moisture retention"
    ],
    bestPractices: [
      "Regular inspection schedule",
      "Proper watering techniques"
    ]
  },
  {
    diseaseName: "Soybean___healthy",
    plantType: "Soybean",
    scientificName: "Healthy Plant",
    description: "This indicates a healthy soybean plant with no visible signs of disease.",
    symptoms: [
      "Vibrant green leaves without spots",
      "Healthy stem development",
      "Normal pod formation"
    ],
    causes: [
      "Proper planting and care",
      "Adequate watering"
    ],
    prevention: [
      "Regular monitoring for early signs",
      "Proper watering schedule"
    ],
    treatment: [
      "Continue current care practices",
      "Monitor for any changes"
    ],
    fertilizers: [
      "Balanced NPK fertilizer (10-10-10)",
      "Organic compost"
    ],
    pesticides: [
      "No pesticides needed for healthy plants",
      "Beneficial insect habitat"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Mulching for moisture retention"
    ],
    bestPractices: [
      "Regular inspection schedule",
      "Proper watering techniques"
    ]
  },
  {
    diseaseName: "Squash___Powdery_mildew",
    plantType: "Squash",
    scientificName: "Podosphaera xanthii",
    description: "Powdery mildew is a common fungal disease that appears as white, powdery coating on squash leaves, stems, and fruit.",
    symptoms: [
      "White, powdery coating on leaves",
      "Leaf curling and distortion",
      "Premature leaf drop"
    ],
    causes: [
      "Fungal pathogen Podosphaera xanthii",
      "Warm days and cool nights"
    ],
    prevention: [
      "Plant resistant varieties",
      "Ensure good air circulation"
    ],
    treatment: [
      "Apply fungicides at first sign",
      "Prune to improve air flow"
    ],
    fertilizers: [
      "Low-nitrogen fertilizers",
      "Potassium for disease resistance"
    ],
    pesticides: [
      "Sulfur-based fungicides",
      "Potassium bicarbonate"
    ],
    naturalRemedies: [
      "Milk spray (1:10 ratio)",
      "Baking soda solution"
    ],
    bestPractices: [
      "Regular monitoring during warm seasons",
      "Proper pruning techniques"
    ]
  },
  {
    diseaseName: "Strawberry___Leaf_scorch",
    plantType: "Strawberry",
    scientificName: "Diplocarpon earlianum",
    description: "Leaf scorch is a fungal disease that causes purple-red spots on strawberry leaves, leading to leaf death and reduced fruit production.",
    symptoms: [
      "Purple-red angular spots on leaves",
      "Lesions between leaf veins",
      "Brown centers in spots"
    ],
    causes: [
      "Fungal pathogen Diplocarpon earlianum",
      "Wet weather during spring"
    ],
    prevention: [
      "Plant resistant varieties",
      "Improve air circulation"
    ],
    treatment: [
      "Apply fungicides during bloom",
      "Remove infected leaves"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Potassium for disease resistance"
    ],
    pesticides: [
      "Captan fungicide",
      "Myclobutanumil"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Water management",
      "Regular monitoring"
    ]
  },
  {
    diseaseName: "Strawberry___healthy",
    plantType: "Strawberry",
    scientificName: "Healthy Plant",
    description: "This indicates a healthy strawberry plant with no visible signs of disease.",
    symptoms: [
      "Vibrant green leaves without spots",
      "Healthy runner production",
      "Normal fruit development"
    ],
    causes: [
      "Proper planting and care",
      "Adequate watering"
    ],
    prevention: [
      "Regular monitoring for early signs",
      "Proper watering schedule"
    ],
    treatment: [
      "Continue current care practices",
      "Monitor for any changes"
    ],
    fertilizers: [
      "Balanced NPK fertilizer (10-10-10)",
      "Organic compost"
    ],
    pesticides: [
      "No pesticides needed for healthy plants",
      "Beneficial insect habitat"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Mulching for moisture retention"
    ],
    bestPractices: [
      "Regular inspection schedule",
      "Proper watering techniques"
    ]
  },
  {
    diseaseName: "Tomato___Bacterial_spot",
    plantType: "Tomato",
    scientificName: "Xanthomonas campestris pv. vesicatoria",
    description: "Bacterial spot is a common disease of tomatoes that causes small, water-soaked spots on leaves and fruit.",
    symptoms: [
      "Small, water-soaked spots on leaves",
      "Brown spots on fruit",
      "Leaf drop"
    ],
    causes: [
      "Bacterium Xanthomonas campestris pv. vesicatoria",
      "Warm, humid weather"
    ],
    prevention: [
      "Use disease-free seeds",
      "Avoid overhead watering"
    ],
    treatment: [
      "Apply copper-based bactericides",
      "Remove infected plants"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Calcium for fruit firmness"
    ],
    pesticides: [
      "Copper-based bactericides",
      "Streptomycin"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Seed treatment",
      "Water management"
    ]
  },
  {
    diseaseName: "Tomato___Early_blight",
    plantType: "Tomato",
    scientificName: "Alternaria solani",
    description: "Early blight is a common fungal disease of tomatoes that causes dark, target-like spots on leaves, leading to premature defoliation and reduced fruit size.",
    symptoms: [
      "Dark concentric rings on leaves",
      "Target-like spots",
      "Yellowing around spots"
    ],
    causes: [
      "Fungal pathogen Alternaria solani",
      "Warm, humid weather"
    ],
    prevention: [
      "Crop rotation",
      "Proper spacing"
    ],
    treatment: [
      "Apply fungicides at first sign",
      "Remove infected leaves"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Potassium for disease resistance"
    ],
    pesticides: [
      "Chlorothalonil fungicides",
      "Mancozeb"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Crop rotation",
      "Water management"
    ]
  },
  {
    diseaseName: "Tomato___Late_blight",
    plantType: "Tomato",
    scientificName: "Phytophthora infestans",
    description: "Late blight is a devastating fungal disease that caused the Irish potato famine.",
    symptoms: [
      "Water-soaked lesions on leaves",
      "White fungal growth on undersides",
      "Brown, greasy spots"
    ],
    causes: [
      "Fungal pathogen Phytophthora infestans",
      "Cool, wet weather"
    ],
    prevention: [
      "Crop rotation",
      "Proper spacing"
    ],
    treatment: [
      "Apply fungicides preventively",
      "Remove infected plants"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Potassium for disease resistance"
    ],
    pesticides: [
      "Metalaxyl fungicides",
      "Mancozeb"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Weather monitoring",
      "Regular scouting"
    ]
  },
  {
    diseaseName: "Tomato___Leaf_Mold",
    plantType: "Tomato",
    scientificName: "Passalora fulva",
    description: "Leaf mold is a fungal disease that causes yellow spots on the upper surface of tomato leaves and olive-green mold on the undersides.",
    symptoms: [
      "Yellow spots on upper leaf surface",
      "Olive-green mold on lower surface",
      "Leaf curling and drop"
    ],
    causes: [
      "Fungal pathogen Passalora fulva",
      "High humidity in greenhouse"
    ],
    prevention: [
      "Improve air circulation",
      "Control humidity levels"
    ],
    treatment: [
      "Apply fungicides at first sign",
      "Improve ventilation"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Potassium for disease resistance"
    ],
    pesticides: [
      "Chlorothalonil fungicides",
      "Mancozeb"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Greenhouse ventilation",
      "Humidity management"
    ]
  },
  {
    diseaseName: "Tomato___Septoria_leaf_spot",
    plantType: "Tomato",
    scientificName: "Septoria lycopersici",
    description: "Septoria leaf spot is a common fungal disease that causes small, circular spots with dark borders and light centers on tomato leaves.",
    symptoms: [
      "Small circular spots with dark borders",
      "Light tan centers in spots",
      "Yellowing around spots"
    ],
    causes: [
      "Fungal pathogen Septoria lycopersici",
      "Warm, humid weather"
    ],
    prevention: [
      "Crop rotation",
      "Avoid overhead watering"
    ],
    treatment: [
      "Apply fungicides at first sign",
      "Remove infected leaves"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Potassium for disease resistance"
    ],
    pesticides: [
      "Chlorothalonil fungicides",
      "Mancozeb"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Crop rotation",
      "Water management"
    ]
  },
  {
    diseaseName: "Tomato___Spider_mites Two-spotted_spider_mite",
    plantType: "Tomato",
    scientificName: "Tetranychus urticae",
    description: "Two-spotted spider mites are tiny pests that suck plant juices, causing stippling, yellowing, and webbing on tomato leaves.",
    symptoms: [
      "Fine webbing on leaves",
      "Stippled yellow spots",
      "Leaf yellowing and drop"
    ],
    causes: [
      "Pest mite Tetranychus urticae",
      "Hot, dry weather"
    ],
    prevention: [
      "Maintain proper watering",
      "Increase humidity"
    ],
    treatment: [
      "Apply miticides if severe",
      "Increase watering and humidity"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Silicon for plant strength"
    ],
    pesticides: [
      "Insecticidal soaps",
      "Neem oil"
    ],
    naturalRemedies: [
      "Water spray to dislodge mites",
      "Beneficial predator release"
    ],
    bestPractices: [
      "Regular inspection",
      "Water management"
    ]
  },
  {
    diseaseName: "Tomato___Target_Spot",
    plantType: "Tomato",
    scientificName: "Corynespora cassiicola",
    description: "Target spot is a fungal disease that causes concentric ring patterns on tomato leaves and fruit, resembling a target.",
    symptoms: [
      "Concentric ring patterns on leaves",
      "Brown spots with target appearance",
      "Leaf yellowing and drop"
    ],
    causes: [
      "Fungal pathogen Corynespora cassiicola",
      "Warm, humid weather"
    ],
    prevention: [
      "Crop rotation",
      "Avoid overhead watering"
    ],
    treatment: [
      "Apply fungicides at first sign",
      "Remove infected leaves"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Potassium for disease resistance"
    ],
    pesticides: [
      "Chlorothalonil fungicides",
      "Mancozeb"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Crop rotation",
      "Water management"
    ]
  },
  {
    diseaseName: "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    plantType: "Tomato",
    scientificName: "Tomato yellow leaf curl virus (TYLCV)",
    description: "Tomato yellow leaf curl virus is a devastating viral disease spread by whiteflies.",
    symptoms: [
      "Yellowing of leaf veins",
      "Upward leaf curling",
      "Stunted plant growth"
    ],
    causes: [
      "Virus Tomato yellow leaf curl virus (TYLCV)",
      "Whitefly vector"
    ],
    prevention: [
      "Use resistant varieties",
      "Whitefly control"
    ],
    treatment: [
      "Remove infected plants",
      "Intensive whitefly control"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Micronutrient supplements"
    ],
    pesticides: [
      "Neonicotinoid insecticides",
      "Pyrethroid insecticides"
    ],
    naturalRemedies: [
      "Beneficial insect habitat",
      "Companion planting"
    ],
    bestPractices: [
      "Regular inspection",
      "Whitefly monitoring"
    ]
  },
  {
    diseaseName: "Tomato___Tomato_mosaic_virus",
    plantType: "Tomato",
    scientificName: "Tomato mosaic virus (ToMV)",
    description: "Tomato mosaic virus is a viral disease that causes mottled patterns on leaves, stunted growth, and reduced fruit production.",
    symptoms: [
      "Mottled light and dark green patterns",
      "Leaf distortion",
      "Stunted growth"
    ],
    causes: [
      "Virus Tomato mosaic virus (ToMV)",
      "Human contact with infected plants"
    ],
    prevention: [
      "Use virus-free seeds",
      "Sanitize tools regularly"
    ],
    treatment: [
      "Remove infected plants",
      "Sanitize tools and hands"
    ],
    fertilizers: [
      "Balanced NPK fertilizer",
      "Micronutrient supplements"
    ],
    pesticides: [
      "Insecticidal soaps",
      "Neem oil"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Beneficial microbe inoculants"
    ],
    bestPractices: [
      "Tool sanitation",
      "Hand washing"
    ]
  },
  {
    diseaseName: "Tomato___healthy",
    plantType: "Tomato",
    scientificName: "Healthy Plant",
    description: "This indicates a healthy tomato plant with no visible signs of disease.",
    symptoms: [
      "Vibrant green leaves without spots",
      "Healthy stem development",
      "Normal fruit development"
    ],
    causes: [
      "Proper planting and care",
      "Adequate watering"
    ],
    prevention: [
      "Regular monitoring for early signs",
      "Proper watering schedule"
    ],
    treatment: [
      "Continue current care practices",
      "Monitor for any changes"
    ],
    fertilizers: [
      "Balanced NPK fertilizer (10-10-10)",
      "Organic compost"
    ],
    pesticides: [
      "No pesticides needed for healthy plants",
      "Beneficial insect habitat"
    ],
    naturalRemedies: [
      "Compost tea applications",
      "Mulching for moisture retention"
    ],
    bestPractices: [
      "Regular inspection schedule",
      "Proper watering techniques"
    ]
  }
];

// Function to populate the database
async function populateDiseaseInfo() {
  try {
    // Clear existing data
    await DiseaseInfo.deleteMany({});
    
    // Insert new data
    await DiseaseInfo.insertMany(diseaseData);
    
    console.log('Disease information populated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error populating disease information:', error);
    process.exit(1);
  }
}

// Run the population function
if (require.main === module) {
  populateDiseaseInfo();
}