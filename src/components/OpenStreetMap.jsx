// eslint-disable-next-line react/prop-types
function OpenStreetMap({ className, latitude, longitude }) {
  return (
    <iframe
      className={className}
      width="425"
      height="350"
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}%2C${longitude}%2C${latitude}&layer=mapnik&marker=${latitude}%2C${longitude}`}
    ></iframe>
  );
}

export default OpenStreetMap;
