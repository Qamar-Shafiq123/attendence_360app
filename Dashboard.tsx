import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Activity {
  type: 'Check In' | 'Check Out';
  time: string;
  date: string;
  status: 'On Time' | 'Late';
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const onChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (date) setSelectedDate(date);
  };

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const yesterday = new Date(selectedDate);
  yesterday.setDate(selectedDate.getDate() - 1);
  const formattedYesterday = yesterday.toDateString();
  const formattedToday = selectedDate.toDateString();

  const activities: Activity[] = [
    {
      type: 'Check In',
      time: '09:00 AM',
      date: formattedToday,
      status: 'On Time',
    },
    {
      type: 'Check Out',
      time: '06:45 PM',
      date: formattedToday,
      status: 'On Time',
    },
    {
      type: 'Check In',
      time: '09:05 AM',
      date: formattedYesterday,
      status: 'Late',
    },
    {
      type: 'Check Out',
      time: '06:35 PM',
      date: formattedYesterday,
      status: 'On Time',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('./assets/images/logo.png')}
          style={styles.logo}
        />
        <View>
          <Text style={styles.name}>Sheikh Usama</Text>
          <Text style={styles.role}>Lead UI/UX Designer</Text>
        </View>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Ionicons name="calendar-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Time Section */}
        <View style={styles.timeSection}>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.time}>{currentTime}</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '60%' }]} />
          </View>
          <Text style={styles.timeLeft}>10:45:05 hr Left</Text>
        </View>

        {/* Activity Log */}
        <View style={styles.activitySection}>
          <Text style={styles.activityTitle}>Your Activity</Text>
          <Text style={styles.activityDate}>{formattedDate}</Text>

          {activities.map((item, index) => {
            const isPreviousDay = item.date !== formattedToday;

            return (
              <View key={index}>
                {index > 1 && isPreviousDay && activities[index - 1].date === formattedToday && (
                  <Text style={[styles.activityDate, { marginTop: 10 }]}>Previous Day</Text>
                )}
                <View style={styles.activityCard}>
                  <View style={styles.iconPlaceholder}>
                    <Ionicons
                      name={item.type === 'Check In' ? 'log-in-outline' : 'log-out-outline'}
                      size={20}
                      color="#fff"
                    />
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityType}>{item.type}</Text>
                    <Text style={styles.activityDateText}>{item.date}</Text>
                  </View>
                  <View style={styles.activityTime}>
                    <Text style={styles.activityHour}>{item.time}</Text>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating Check Out */}
      <View style={styles.floatingBtn}>
        <View style={styles.iconPlaceholder}>
          <Ionicons name="exit-outline" size={20} color="#fff" />
        </View>
        <Text style={styles.checkOutText}>Check Out</Text>
        <Text style={styles.checkOutTime}>{currentTime}</Text>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  scrollContainer: {
    paddingBottom: 100, // Space at the bottom to ensure floating button isn't hidden
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 30,
    resizeMode: 'contain',
  },
  name: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  role: {
    color: '#aaa',
    fontSize: 12,
  },
  timeSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  dateText: {
    color: '#aaa',
    fontSize: 12,
  },
  time: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  progressBarContainer: {
    height: 4,
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 2,
    marginVertical: 5,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e50914',
    borderRadius: 2,
  },
  timeLeft: {
    color: '#aaa',
    fontSize: 12,
  },
  activitySection: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  activityTitle: {
    color: '#fff',
    fontWeight: '700',
    marginBottom: 10,
  },
  activityDate: {
    color: '#ccc',
    marginBottom: 10,
    fontSize: 16,
  },
  activityCard: {
    backgroundColor: '#121212',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconPlaceholder: {
    width: 30,
    height: 30,
    backgroundColor: '#e50914',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  activityInfo: {
    flex: 1,
  },
  activityType: {
    color: '#fff',
    fontWeight: '600',
  },
  activityDateText: {
    color: '#aaa',
    fontSize: 12,
  },
  activityTime: {
    alignItems: 'flex-end',
  },
  activityHour: {
    color: '#fff',
    fontWeight: '600',
  },
  statusText: {
    color: '#0f0',
    fontSize: 12,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#e50914',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkOutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  checkOutTime: {
    color: '#fff',
    fontSize: 16,
  },
});
