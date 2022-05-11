import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import {BASE_URL} from '../helper/Constants';

class APICallService {
  constructor(apiName, reqMethod, token, params = null) {
    // apiName = /api/v1/products,,, reqMethod = "Post"/"GET"/"POST_FORM"/etc.,,,  token="authToken",,, params = {}
    this.reqUrl = apiName;
    this.reqToken = token;
    this.reqMethod = reqMethod;
    this.reqObject = params;
  }

  async callAPI() {
    const deviceNetwork = await NetInfo.fetch();
    if (!deviceNetwork.isConnected) {
      Toast.show({
        text1: 'Check your internet connection',
        visibilityTime: 3000,
        autoHide: true,
        position: 'top',
        type: 'error',
      });
      return {
        code: 899,
        message: 'No internet connection, please try again later.',
      };
    } else {
      this.apiRequestOption = await this.requestOptionMethod(
        this.reqUrl,
        this.reqToken,
        this.reqObject,
      );

      console.log(this.apiRequestOption);

      return fetch(this.apiRequestOption.url, this.apiRequestOption)
        .then(async res => {
          if (res._bodyInit._data.size > 0) {
            const serverResponse = await res.json();
            const tmpResponse = {
              code: serverResponse.code
                ? serverResponse.code
                : res.status
                ? res.status
                : 'No Status Code get',
              message: serverResponse.message
                ? serverResponse.message
                : res.message
                ? res.message
                : 'No Message Available',
              response: serverResponse,
            };
            return tmpResponse;
          } else {
            return {
              code: res.status,
              response:
                res && res.message ? res.message : 'server response failed',
            };
          }
        })
        .catch(err => {
          const successRes = {code: 899, message: JSON.stringify(err)};
          return successRes;
        });
    }
  }

  async requestOptionMethod(reqUrl, token, params) {
    const resourceURL = `${BASE_URL}${reqUrl}`;
    var myHeaders = new Headers();
    if (token) {
      myHeaders.append('Authorization', 'Bearer ' + token);
    }
    var requestOptions = {
      url: resourceURL,
      headers: myHeaders,
    };
    switch (this.reqMethod) {
      case 'GET':
        requestOptions.method = 'GET';
        break;
      case 'POST_RAW':
        myHeaders.append('Content-Type', 'application/json');
        requestOptions.headers = myHeaders;
        requestOptions.method = 'POST';
        requestOptions.body = JSON.stringify(params);
        break;
      case 'POST':
        requestOptions.headers = myHeaders;
        requestOptions.method = 'POST';
        break;
      case 'POST_FORM':
        requestOptions.headers = myHeaders;
        requestOptions.method = 'POST';
        requestOptions.body = this.objToFormData(params);
        break;
      case 'MULTI_PART':
        myHeaders.append('Content-Type', 'multipart/form-data');
        myHeaders.append('Accept', 'application/json');
        requestOptions.headers = myHeaders;
        requestOptions.method = 'POST';
        requestOptions.body = this.objToFormData(params);
        break;
      default:
        requestOptions.method = 'GET';
        break;
    }
    return requestOptions;
  }

  objToFormData = obj => {
    const form = new FormData();
    for (const key in obj) {
      form.append(key, obj[key]);
    }
    console.log(form, obj, '12345');

    return form;
  };
}

export default APICallService;
