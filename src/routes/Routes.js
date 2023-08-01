import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/splash/index';
import LoginScreen from '../screens/auth/login/index';
import SignupScreen from '../screens/auth/signup/index';
import SignupOtpScreen from '../screens/auth/signup/UserOTP';
import BuisnessDetailsScreen from '../screens/auth/signup/BuisnessDetails';

import UpdatePasswordScreen from '../screens/profile/UpdatePasswordScreen';
import MyAccountScreen from '../screens/profile/MyAccountScreen';
import MyOrderScreen from '../screens/profile/MyOrderScreen';
import MyAddressScreen from '../screens/profile/MyAddressScreen';
import MyCouponsScreen from '../screens/profile/MyCouponsScreen';
// import MyWishlistScreen from '../screens/profile/MyWishlistScreen';
import Tabs from '../routes/tabs/Tabs';
import CartScreen from '../screens/cartScreen/index';
import CheckoutScreen from '../screens/checkoutScreen/index';
import CouponScreen from '../screens/couponScreen/index';

import ConfirmCheckoutScreen from '../screens/checkoutScreen/confirmCheckoutScreen';
import OrderConfirmScreen from '../screens/OrderConfirmScreen';

// import SettingsScreen from '../screens/settingsScreen/index';
import ProductDetailScreen from '../screens/productScreen/ProductDetailScreen';
import ProductInfoScreen from '../screens/productScreen/ProductInfo';
import ProductSizeScreen from '../screens/productScreen/ProductSize';
import SubCategoryScreen from '../screens/subCategoryScreen';
import SubCategoryProductScreen from '../screens/subCategoryProductScreen';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen
          name="signupBuinessDetails"
          component={BuisnessDetailsScreen}
        />
        <Stack.Screen name="signupOtp" component={SignupOtpScreen} />
        <Stack.Screen name="updatepassword" component={UpdatePasswordScreen} />
        <Stack.Screen name="myaccount" component={MyAccountScreen} />
        <Stack.Screen name="myorder" component={MyOrderScreen} />
        <Stack.Screen name="myaddress" component={MyAddressScreen} />
        <Stack.Screen name="mycoupons" component={MyCouponsScreen} />
        {/* <Stack.Screen name="mywishlist" component={MyWishlistScreen} /> */}
        <Stack.Screen name="tab" component={Tabs} />
        <Stack.Screen name="cart" component={CartScreen} />
        <Stack.Screen name="productdetail" component={ProductDetailScreen} />
        <Stack.Screen name="subCategory" component={SubCategoryScreen} />
        <Stack.Screen
          name="subCategoryProductScreen"
          component={SubCategoryProductScreen}
        />
        <Stack.Screen name="productinfo" component={ProductInfoScreen} />
        <Stack.Screen name="productsize" component={ProductSizeScreen} />
        <Stack.Screen name="coupon" component={CouponScreen} />
        <Stack.Screen name="checkout" component={CheckoutScreen} />
        <Stack.Screen
          name="confirmCheckout"
          component={ConfirmCheckoutScreen}
        />
        <Stack.Screen name="orderconfirm" component={OrderConfirmScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
