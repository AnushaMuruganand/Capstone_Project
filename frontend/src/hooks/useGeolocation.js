import { useEffect, useState} from "react";

/** Custom hook for getting the user current location coordinates
 * 
 * The effect runs just once when this hook is rendered
 * - and gets the lattitude and longitude values of the current user location
 * 
 *   const [coords] = useGeolocation()
 */

function useGeolocation() {

  const [coord, setCoords] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function getPosition(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setCoords({ lat, lng });
    });
  }, []);
  

  return coord;
}

export default useGeolocation;
