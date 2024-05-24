import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

// ...
export default class PaymentScreen extends Component {
    render() {
        return <WebView source={{ uri: this.props?.payUrl }} onNavigationStateChange={(navState) => {
            // Keep track of going back navigation within component

            if (navState.url === "https://www.lobdho.com.bd/dashboard/my_orders") {
                this.props.setSuccess(true)
                this.props.setPayUrl(null)
                this.props.setModalVisible(false)
            } else if (navState.url === 'https://www.lobdho.com.bd/') {
                this.props.setModalVisible(false)
            } else if (navState.url === 'https://securepay.sslcommerz.com/gwprocess/v4/warning.php') {
                this.props.setModalVisible(false)
            }
        }} />;
    }
}