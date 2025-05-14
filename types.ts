export interface Activity {
  id: string;
  type: 'Check In' | 'Check Out';
  time: string;
  date: string;
  status: 'On Time' | 'Late' | 'Early' | 'N/A';
  location?: { latitude: number; longitude: number };
}

export interface LocationStatus {
  latitude: number;
  longitude: number;
  isOutsideArea: boolean;
  timestamp: string;
}

export interface DesignatedArea {
  latitude: number;
  longitude: number;
  radius: number;
  name: string;
}

export const ASYNC_STORAGE_KEYS = {
  USER_PHONE: 'attendanceAppUserPhone',
  FCM_TOKEN: 'attendanceAppFcmToken',
  DESIGNATED_AREA: 'attendanceAppDesignatedArea',
  ATTENDANCE_LOG: 'attendanceAppAttendanceLog',
  LAST_LOCATION_STATUS: 'attendanceAppLastLocationStatus',
};

export const DEFAULT_DESIGNATED_AREA: DesignatedArea = {
  latitude: 34.0522,
  longitude: -118.2437,
  radius: 500,
  name: 'Default Office Area',
};
