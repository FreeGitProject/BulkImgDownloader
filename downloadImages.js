const fs = require('fs');
const path = require('path');
const axios = require('axios');

// URLs of the images
const imageUrls = [
    "https://rukminim1.flixcart.com/image/416/416/kg8avm80/mobile/s/9/w/apple-iphone-12-pro-dummyapplefsn-original-imafwgbr37gm57f7.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/416/416/kg8avm80/mobile/s/9/w/apple-iphone-12-pro-dummyapplefsn-original-imafwgbrnpyygbv9.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/416/416/kg8avm80/mobile/s/9/w/apple-iphone-12-pro-dummyapplefsn-original-imafwgbrpksqr8zu.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/416/416/kg8avm80/mobile/s/9/w/apple-iphone-12-pro-dummyapplefsn-original-imafwgbrgcctfysm.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/416/416/kg8avm80/mobile/s/9/w/apple-iphone-12-pro-dummyapplefsn-original-imafwgbrqwsxbmuh.jpeg?q=70"
];

// Create a directory to store images if it doesn't exist
const directory = path.join(__dirname, 'images');
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}

// Function to download an image and save it with a unique filename
async function downloadImage(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const filename = generateFilename(url);
        const filePath = path.join(directory, filename);
        fs.writeFileSync(filePath, response.data);
        console.log(`Image ${filename} downloaded successfully.`);
    } catch (error) {
        console.error(`Failed to download image ${url}: ${error.message}`);
    }
}

// Function to generate a unique filename from the URL
function generateFilename(url) {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1].split('?')[0]; // Extract filename and remove query parameters
}

// Download each image
imageUrls.forEach(url => {
    downloadImage(url);
});
