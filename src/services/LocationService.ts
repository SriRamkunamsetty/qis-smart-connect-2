export interface Location {
    lat: number;
    lng: number;
}

export class LocationService {
    static getCurrentLocation(): Promise<Location> {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by your browser'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(error);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        });
    }

    static watchLocation(
        onSuccess: (location: Location) => void,
        onError: (error: GeolocationPositionError) => void
    ): number {
        if (!navigator.geolocation) {
            throw new Error('Geolocation is not supported by your browser');
        }

        return navigator.geolocation.watchPosition(
            (position) => {
                onSuccess({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            onError,
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    }

    static clearWatch(watchId: number) {
        navigator.geolocation.clearWatch(watchId);
    }
}
