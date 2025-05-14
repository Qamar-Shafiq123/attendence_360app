import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Geolocation from 'react-native-geolocation-service';
import { showLocalNotification } from './LocalNotificationService';
import { RootStackParamList } from './Navigations';
import { Activity, LocationStatus, DesignatedArea, ASYNC_STORAGE_KEYS } from './types';
import { stopBackgroundLocationUpdates } from './BackgroundLocationService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Dashboard: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [currentLocationStatus, setCurrentLocationStatus] = useState<LocationStatus | null>(null);
  const [designatedAreaInfo, setDesignatedAreaInfo] = useState<DesignatedArea | null>(null);
  const [userName, setUserName] = useState<string>('Employee');

  const loadData = useCallback(async () => {
    const areaString = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.DESIGNATED_AREA);
    if (areaString) setDesignatedAreaInfo(JSON.parse(areaString));

    const logString = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.ATTENDANCE_LOG);
    const activities: Activity[] = logString ? JSON.parse(logString) : [];
    setActivities(activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()));

    const statusString = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.LAST_LOCATION_STATUS);
    if (statusString) setCurrentLocationStatus(JSON.parse(statusString));

    const phone = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.USER_PHONE);
    if (phone) setUserName(`User: ...${phone.slice(-4)}`);
  }, []);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  }, [loadData]);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadData().finally(() => setIsLoading(false));
      const intervalId = setInterval(async () => {
        const statusString = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.LAST_LOCATION_STATUS);
        if (statusString) setCurrentLocationStatus(JSON.parse(statusString));
      }, 10000);
      return () => clearInterval(intervalId);
    }, [loadData])
  );

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  const getUserLocation = async (): Promise<{ latitude: number; longitude: number } | null> => {
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Failed to get user location:', error);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };

  const handleAttendanceEvent = async (type: 'Check In' | 'Check Out') => {
    const latestActivity = activities.length > 0 ? activities[0] : null;
    if (type === 'Check In' && latestActivity && latestActivity.type === 'Check In') {
      Alert.alert('Already Checked In', 'You have an active Check In. Please Check Out first.');
      return;
    }
    if (type === 'Check Out' && (!latestActivity || latestActivity.type === 'Check Out')) {
      Alert.alert('Not Checked In', 'You need to Check In before you can Check Out.');
      return;
    }

    Alert.alert(`Confirm ${type}`, `Are you sure you want to ${type.toLowerCase()}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Confirm',
        onPress: async () => {
          setIsLoading(true);
          try {
            const now = new Date();
            const currentLoc = await getUserLocation();
            const newActivity: Activity = {
              id: now.toISOString() + Math.random().toString(36).substring(2, 15),
              type,
              time: now.toISOString(),
              date: now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
              status: 'N/A',
              location: currentLoc || undefined,
            };
            const updatedActivities = [newActivity, ...activities];
            await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.ATTENDANCE_LOG, JSON.stringify(updatedActivities));
            setActivities(updatedActivities);
            showLocalNotification(
              `${type} Successful`,
              `You have ${type.toLowerCase()} at ${now.toLocaleTimeString()}`
            );
          } catch (e) {
            console.error(`Failed to ${type.toLowerCase()}:`, e);
            Alert.alert('Error', `Could not complete ${type}.`);
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  const onChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (date) setSelectedDate(date);
  };

  const formattedSelectedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const todayDateString = new Date().toDateString();
  const selectedDateString = selectedDate.toDateString();

  const filteredActivities = activities.filter((act) => new Date(act.time).toDateString() === selectedDateString);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout and stop location tracking?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await stopBackgroundLocationUpdates();
          await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.USER_PHONE);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          );
        },
      },
    ]);
  };

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (isLoading && !isRefreshing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#e50914" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/images/logo.png')} style={styles.logo} />
        <View style={styles.headerUser}>
          <Text style={styles.greeting}>{getGreeting()},</Text>
          <Text style={styles.name}>{userName}</Text>
        </View>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Ionicons name="calendar-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={{ marginLeft: 10 }}>
          <Ionicons name="log-out-outline" size={28} color="#e50914" />
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor="#e50914" />}
      >
        <View style={styles.timeSection}>
          <Text style={styles.dateTextDisplay}>
            {selectedDateString === todayDateString ? 'Today' : formattedSelectedDate}
          </Text>
          <Text style={styles.time}>{currentTime}</Text>
          {currentLocationStatus ? (
            <Text
              style={currentLocationStatus.isOutsideArea ? styles.locationStatusOut : styles.locationStatusIn}
            >
              {currentLocationStatus.isOutsideArea
                ? `⚠️ Outside ${designatedAreaInfo?.name || 'Area'}`
                : `✅ Within ${designatedAreaInfo?.name || 'Area'}`}
              <Text style={styles.coordsText}>
                {' '}
                (as of{' '}
                {new Date(currentLocationStatus.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                )
              </Text>
            </Text>
          ) : (
            <Text style={styles.locationStatus}>Location status loading...</Text>
          )}
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.checkInButton]}
            onPress={() => handleAttendanceEvent('Check In')}
          >
            <Ionicons name="log-in-outline" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Check In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.checkOutButton]}
            onPress={() => handleAttendanceEvent('Check Out')}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Check Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activitySection}>
          <Text style={styles.activityTitle}>
            Activity Log ({selectedDateString === todayDateString ? 'Today' : formattedSelectedDate})
          </Text>
          {filteredActivities.length === 0 ? (
            <Text style={styles.noActivityText}>No activity recorded for this day.</Text>
          ) : (
            filteredActivities.map((item) => (
              <View key={item.id} style={styles.activityCard}>
                <View
                  style={[styles.iconPlaceholder, item.type === 'Check In' ? styles.checkInIconBg : styles.checkOutIconBg]}
                >
                  <Ionicons
                    name={item.type === 'Check In' ? 'arrow-down-circle-outline' : 'arrow-up-circle-outline'}
                    size={24}
                    color="#fff"
                  />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityType}>{item.type}</Text>
                  <Text style={styles.activityDateText}>
                    {new Date(item.time).toLocaleDateString([], { month: 'short', day: 'numeric' })} at{' '}
                    {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                  {item.location && (
                    <Text style={styles.activityLocationText}>
                      Loc: {item.location.latitude.toFixed(3)}, {item.location.longitude.toFixed(3)}
                    </Text>
                  )}
                </View>
                <Text style={item.status === 'Late' ? styles.statusTextLate : styles.statusTextOnTime}>
                  {item.status}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0e0e', paddingTop: Platform.OS === 'android' ? 25 : 50, paddingHorizontal: 15 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0e0e0e' },
  scrollContainer: { paddingBottom: 80 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  logo: { width: 100, height: 35, resizeMode: 'contain' },
  headerUser: { flex: 1, alignItems: 'center' },
  greeting: { color: '#aaa', fontSize: 12 },
  name: { color: '#fff', fontWeight: '700', fontSize: 16 },
  timeSection: { alignItems: 'center', marginVertical: 20, padding: 15, backgroundColor: '#1c1c1c', borderRadius: 15 },
  dateTextDisplay: { color: '#aaa', fontSize: 14, marginBottom: 5 },
  time: { color: '#fff', fontSize: 48, fontWeight: 'bold', marginVertical: 5 },
  locationStatus: { color: '#ccc', fontSize: 12, textAlign: 'center', marginTop: 5 },
  locationStatusIn: { color: '#4CAF50', fontSize: 13, fontWeight: 'bold' },
  locationStatusOut: { color: '#FF9800', fontSize: 13, fontWeight: 'bold' },
  coordsText: { color: '#888', fontSize: 10 },
  actionButtonsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 25, elevation: 3 },
  checkInButton: { backgroundColor: '#4CAF50' },
  checkOutButton: { backgroundColor: '#e50914' },
  actionButtonText: { color: '#fff', fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
  activitySection: { backgroundColor: '#1c1c1c', borderRadius: 20, padding: 20, marginTop: 10 },
  activityTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  noActivityText: { color: '#888', textAlign: 'center', marginTop: 20, fontStyle: 'italic' },
  activityCard: {
    backgroundColor: '#2b2b2b',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  iconPlaceholder: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  checkInIconBg: { backgroundColor: 'rgba(76, 175, 80, 0.3)' },
  checkOutIconBg: { backgroundColor: 'rgba(229, 9, 20, 0.3)' },
  activityInfo: { flex: 1 },
  activityType: { color: '#fff', fontWeight: '600', fontSize: 16 },
  activityDateText: { color: '#aaa', fontSize: 12 },
  activityLocationText: { color: '#888', fontSize: 10, fontStyle: 'italic' },
  statusTextOnTime: { color: '#4CAF50', fontSize: 12, fontWeight: 'bold' },
  statusTextLate: { color: '#FFC107', fontSize: 12, fontWeight: 'bold' },
});