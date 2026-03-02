export interface Stop {
  name: string;
  time: string;
}

export interface TransportRoute {
  id: string;
  route_name: string;
  bus_number: string;
  stops: Stop[];
  departure_time: string;
  estimated_arrival: string;
  distance_km: number;
  fee_per_year: number;
  driver_name: string | null;
  driver_phone: string | null;
  is_active: boolean;
}

export const transportRoutes: TransportRoute[] = [
  {
    id: '1', route_name: 'Ongole City → Campus', bus_number: 'QIS-01',
    stops: [
      { name: 'Ongole Bus Stand', time: '7:00 AM' },
      { name: 'Kurnool Road Junction', time: '7:15 AM' },
      { name: 'Bhagya Nagar', time: '7:25 AM' },
      { name: 'Vengamukkapalem', time: '7:40 AM' },
      { name: 'QISCET Campus', time: '7:50 AM' },
    ],
    departure_time: '07:00', estimated_arrival: '07:50', distance_km: 18,
    fee_per_year: 25000, driver_name: 'Ramesh Kumar', driver_phone: '9876543210', is_active: true,
  },
  {
    id: '2', route_name: 'Chirala → Campus', bus_number: 'QIS-02',
    stops: [
      { name: 'Chirala Bus Stand', time: '6:30 AM' },
      { name: 'Vetapalem', time: '6:50 AM' },
      { name: 'Singarayakonda', time: '7:10 AM' },
      { name: 'QISCET Campus', time: '7:45 AM' },
    ],
    departure_time: '06:30', estimated_arrival: '07:45', distance_km: 35,
    fee_per_year: 30000, driver_name: 'Suresh Babu', driver_phone: '9876543211', is_active: true,
  },
  {
    id: '3', route_name: 'Markapur → Campus', bus_number: 'QIS-03',
    stops: [
      { name: 'Markapur Center', time: '6:00 AM' },
      { name: 'Giddalur', time: '6:30 AM' },
      { name: 'Darsi', time: '7:00 AM' },
      { name: 'QISCET Campus', time: '7:50 AM' },
    ],
    departure_time: '06:00', estimated_arrival: '07:50', distance_km: 65,
    fee_per_year: 35000, driver_name: 'Venkat Rao', driver_phone: '9876543212', is_active: true,
  },
];
