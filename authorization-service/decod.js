const base64String = "Nicolay_kr=TEST_PASSWORD";

// Decode the base64 string
const decodedBuffer = Buffer.from(base64String, 'base64');
const decodedString = decodedBuffer.toString('utf8');

console.log(decodedString);
