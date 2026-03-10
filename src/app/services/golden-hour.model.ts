export interface GetForecastApiResponse {
  time: string;
  location: {
    latitude: string;
    longitude: string;
  };
  grid_location: {
    latitude: string;
    longitude: string;
  };
  data: EventData[];
}

export interface GetEventApiResponse {
  time: string;
  location: {
    latitude: string;
    longitude: string;
  };
  grid_location: {
    latitude: string;
    longitude: string;
  };
  data: EventData;
}

export interface EventData {
  type: 'sunrise' | 'sunset';
  model_data: boolean;
  quality: number;
  cloud_cover: number;
  quality_text: string;
  time: string;
  direction: number;
  magics: Magics;
}

export interface Magics {
  blue_hour: string[];
  golden_hour: string[];
}
