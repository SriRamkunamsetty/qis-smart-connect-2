export class DirectionsService {
    private directionsService: google.maps.DirectionsService | null = null;

    constructor() {
        if (typeof google !== 'undefined' && google.maps) {
            this.directionsService = new google.maps.DirectionsService();
        }
    }

    async calculateRoute(
        origin: google.maps.LatLngLiteral,
        destination: google.maps.LatLngLiteral,
        travelMode: google.maps.TravelMode
    ): Promise<google.maps.DirectionsResult> {
        if (!this.directionsService) {
            throw new Error('Google Maps API not loaded');
        }

        return new Promise((resolve, reject) => {
            this.directionsService?.route(
                {
                    origin,
                    destination,
                    travelMode,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK && result) {
                        resolve(result);
                    } else {
                        reject(new Error(`Directions request failed with status: ${status}`));
                    }
                }
            );
        });
    }
}
