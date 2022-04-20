let url;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://127.0.0.1:5000";
} else {
  url = "https://tranquil-dusk-61865.herokuapp.com";
}

export default url