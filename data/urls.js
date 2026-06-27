require(dotenv).config();
function required(value, name) {    
if (!value) {
    throw new Error(`${name} is required but was not provided.`);
  }
  return value;
}
 const urls = {
  url : required(process.env.URL, 'URL'),
  sitUrl : required(process.env.SITE_URL, 'SITE_URL'),

 };
 module.exports = {urls};






