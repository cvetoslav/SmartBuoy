// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBf_wooDbksBIdwma9byynKT91BRjrxZ-s",
    authDomain: "smart-buoy-43856.firebaseapp.com",
    databaseURL: "https://smart-buoy-43856-default-rtdb.firebaseio.com",
    projectId: "smart-buoy-43856",
    storageBucket: "smart-buoy-43856.appspot.com",
    messagingSenderId: "864553218358",
    appId: "1:864553218358:web:e4ac77bdb2ecab559bc397",
    measurementId: "G-T2GY9EKGWV"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  
  import {getDatabase, ref, get, set, child, update, remove} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js';
  const db = getDatabase();


mapboxgl.accessToken = 'pk.eyJ1IjoiZG02NiIsImEiOiJjbDlrNHNyaHYwMjV0M3hwa2R2bXlleXM2In0.Hc2J3HwrcrhVPdcR3eJBGQ';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/dm66/cle1jvggq005d01pdlhsnzhe1',
  center: [27.9, 43.2],
  zoom: 12
});

  
	function get_data()
	{
		const dbref = ref(db);
		var id = 0, f = true;
		while(id<10)
		{
			console.log(f);
			get(child(dbref, 'buoys/' + id)).then((data) =>
			{
				if(data.exists())
				{
					var val = data.val();
					console.log(val);
					const el = document.createElement('div');
					el.id = "marker_" + id;
					  
					if(val.flag == 0) el.className = 'marker-green';
					else if(val.flag == 1) el.className = 'marker-yellow';
					else if(val.flag == 2) el.className = 'marker-red';

					// make a marker for each feature and add to the map
					new mapboxgl.Marker(el, {anchor: 'bottom-left'}).setLngLat([val.loc[1], val.loc[0]])
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }) // add popups
						  .setHTML(
							"<h3>"+ val.name +"</h3><p>Wind: "+ val.wind[0] +"m/s<br>Waves: "+ val.waves[0]*100 +"cm</p>"
						  )
					  ).addTo(map);
				}
				else f = false;
			}).catch((error) => {
			  console.error(error);
			});
			
			id = id + 1;
		}
	}
	
get_data();

console.log(map.getContainer().getElementsByClassName("marker"));