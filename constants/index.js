import * as SecureStore from 'expo-secure-store';

export const BASE_URL =
  "https://pakuaapp.com/wp-json/wp/v2/";

  export const AUTH_URL  = "https://pakuaapp.com/wp-json/simple-jwt-login/v1/"

export const AUTH_KEY = "THISISMySpeCiaLAUthCode";


export const mobiledata = [
  {
    title: "tigopesa",
    uri: "https://pakuaapp.com/wp-content/uploads/2024/08/tigopesa_tn.png.jpeg"
  },
  {
    title: "mpesa",
    uri: "https://pakuaapp.com/wp-content/uploads/2024/08/vodacom-logo-BE462FCBD2-seeklogo.com_.png"
  },
  {
    title: "airtelmoney",
    uri: "https://pakuaapp.com/wp-content/uploads/2024/08/Airtel_logo-01.png"
  },
]

export const returnItem = (data, id) => {
  return data?.filter((item) => item?.id === id);
};

export function returnFormat(txt) {
  return new Intl.NumberFormat("en-IN").format(txt);
}

export function formatDate(txt) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    timestamp: "timestap",
  };
  const new_date = new Date(txt).toUTCString("en-us", options);

  return new_date;
}

export function getAWeak() {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var second = first + 1;
  var third = second + 1;
  var fourth = third + 1;
  var fifth = fourth + 1;
  var sixth = fifth + 1;
  var last = sixth + 1; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first)).toUTCString();
  var secondday = new Date(curr.setDate(second)).toUTCString();
  var thirdday = new Date(curr.setDate(third)).toUTCString();
  var fourthday = new Date(curr.setDate(fourth)).toUTCString();
  var fifthday = new Date(curr.setDate(fifth)).toUTCString();
  var sixthday = new Date(curr.setDate(sixth)).toUTCString();
  var lastday = new Date(curr.setDate(last)).toUTCString();

  var aweek = {
    firstday,
    secondday,
    thirdday,
    fourthday,
    fifthday,
    sixthday,
    lastday,
  };

  return aweek;
}

export function getADay() {
  var curr = new Date();
  var first = curr.getDate();
  var firstday = new Date(curr.setDate(first)).toUTCString();
  return { firstday };
}


export async function save(key, value) {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

export async function getValueFor(key, setItem) {
  let result = JSON.parse(await SecureStore.getItemAsync(key));
  if (result) {
    setItem(result) 
  } else {
    setItem(result)
  }
}
