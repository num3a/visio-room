const staticMarkerImage =  (latitude, longitude, width = 400, height = 400, zoom = 18, color = 'red')  => {
  if(!latitude || !longitude){
    return 'https://placeholdit.imgix.net/~text?txtsize=33&txt=Address%20Not%20Found&w=400&h=200';
  }
  return `https://maps.googleapis.com/maps/api/staticmap?&center=${latitude},${longitude}&markers=color:${color}%7C${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&key=AIzaSyBPeaZKHCuq8vY0QDQqNbz4cX5RsIyi7E4`;
};

export {
  staticMarkerImage
};