import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/appStack/Home';
import MyQueries from '../screens/appStack/MyQueries';
import Community from '../screens/appStack/Community';
import UserProfile from '../screens/appStack/UserProfile';
import CustomBottomStack from './CustomBottomStack';
import MyProfile from '../screens/appStack/MyProfile';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomBottomStack {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Queries" component={MyQueries} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Profile" component={MyProfile} />
    </Tab.Navigator>
  );
}
